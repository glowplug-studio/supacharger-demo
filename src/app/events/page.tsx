'use client';

import { useEffect,useState } from 'react';
import Link from 'next/link';
import { Calendar, SortAsc, SortDesc, Type } from 'lucide-react';
import { Plus } from 'lucide-react';

import EventCard from '@/components/EventCard';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import eventsData from '@/config/events.json';

interface Event {
  id: string;
  type: string;
  title: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  submissionOpenDate: string;
  submissionOpenTime: string;
  submissionCloseDate: string;
  submissionCloseTime: string;
  photoCount: number;
  videoCount: number;
  uploadFormLink: string;
  galleryLink: string;
  expiresInDays: number;
  status: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [hideFinished, setHideFinished] = useState(false);
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name-desc' | 'name-asc'>('date-desc');

  useEffect(() => {
    let filteredEvents = [...eventsData];
    
    // Filter out finished events if toggle is enabled
    if (hideFinished) {
      const now = new Date();
      filteredEvents = filteredEvents.filter(event => {
        // Check if upload window is still open based on submission close date/time
        const uploadCloseDate = event.submissionCloseDate && event.submissionCloseTime 
          ? new Date(`${event.submissionCloseDate}T${event.submissionCloseTime}`)
            : null;
        
        // Only show events where upload window is still open
        return !uploadCloseDate || now <= uploadCloseDate;
      });
    }
    
    // Sort events
    filteredEvents.sort((a, b) => {
      if (sortBy.startsWith('date')) {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return sortBy === 'date-asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else {
        // Sort by name
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (sortBy === 'name-asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      }
    });
    
    setEvents(filteredEvents);
  }, [hideFinished, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* My Events Header with Filters */}
      <div className="bg-[#FFE51F] text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Title and Create Button */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">My Events</h1>
            <Link href="/create-event/event-basics">
              <Button className="bg-black text-white hover:bg-gray-800 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Event</span>
              </Button>
            </Link>
          </div>
          
          {/* Filters and Sorting Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Label htmlFor="sort-by" className="text-sm text-gray-900 whitespace-nowrap">Sort by:</Label>
              </div>
              <Select value={sortBy} onValueChange={(value: 'date-desc' | 'date-asc' | 'name-desc' | 'name-asc') => setSortBy(value)}>
                <SelectTrigger className="w-40 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Date (Newest)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="hide-finished"
                  checked={hideFinished}
                  onCheckedChange={setHideFinished}
                />
                <Label htmlFor="hide-finished" className="text-sm text-gray-900 whitespace-nowrap">
                  Hide finished events
                </Label>
              </div>
            </div>
            
            {/* Results count */}
            <div className="flex-shrink-0">
              <p className="text-sm text-gray-700">
                Showing {events.length} of {eventsData.length} events
                {hideFinished && ' (finished events hidden)'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* White separator for better visual separation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-1"></div>
        </div>
      </div>

      {/* Events Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">
              {hideFinished 
                ? 'All events are finished. Try showing finished events to see your complete event history.'
                : 'You haven\'t created any events yet.'
              }
            </p>
            {hideFinished && (
              <Button
                variant="outline"
                onClick={() => setHideFinished(false)}
              >
                Show finished events
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}