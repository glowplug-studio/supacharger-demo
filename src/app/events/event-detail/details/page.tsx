'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UnifiedBadge } from '@/components/ui/unified-badge';
import Header from '@/components/Header';

export default function EventDetailsTab() {
  const router = useRouter();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Static event data
  const event = {
    id: "LIVE-NOW-123",
    type: "pro",
    title: "New Year's Eve Party 2024",
    location: "Downtown Convention Center",
    startDate: "2024-12-31",
    startTime: "20:00",
    endDate: "2025-01-01",
    endTime: "02:00",
    submissionOpenDate: "2024-12-31",
    submissionOpenTime: "19:30",
    submissionCloseDate: "2025-01-01",
    submissionCloseTime: "03:00",
    photoCount: 156,
    videoCount: 12,
    uploadFormLink: "https://app.snapscreen.co/event/LIVE-NOW-123",
    galleryLink: "https://gallery.snapscreen.co/event/LIVE-NOW-123",
    expiresInDays: 30,
    status: "active"
  };

  const handleBack = () => {
    router.push('/events');
  };

  // Check if event is currently live
  const isEventLive = (() => {
    const now = new Date();
    const uploadWindowStart = event.submissionOpenDate && event.submissionOpenTime 
      ? new Date(`${event.submissionOpenDate}T${event.submissionOpenTime}`)
      : null;
    const uploadWindowEnd = event.submissionCloseDate && event.submissionCloseTime 
      ? new Date(`${event.submissionCloseDate}T${event.submissionCloseTime}`)
      : null;
    
    // Upload window start date < now AND upload window end date > now
    return uploadWindowStart && uploadWindowEnd && 
      uploadWindowStart < now && uploadWindowEnd > now;
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Yellow My Events Header */}
      <div className="bg-[#FFE51F] text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center space-x-2 text-black hover:text-gray-700 hover:bg-yellow-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>My Events</span>
              </Button>
              
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold">{event.title}</h1>
                
                {/* Live Icon */}
                {isEventLive && (
                  <div className="flex items-center space-x-2 bg-black text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>LIVE</span>
                  </div>
                )}
                
                {/* Package Type Badge */}
                <UnifiedBadge 
                  type={event.type as 'free' | 'pro' | 'unlimited'} 
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="details" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger 
                value="content"
                onClick={() => router.push('/events/event-detail')}
              >
                Content
              </TabsTrigger>
              <TabsTrigger 
                value="details"
                onClick={() => router.push('/events/event-detail/details')}
              >
                Details
              </TabsTrigger>
            </TabsList>
            
            {/* Upload Files Button */}
            <Button
              onClick={() => setUploadModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Files</span>
            </Button>
          </div>
          
          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Event Details Form */}
              <div className="lg:col-span-2">
                <EventDetailsForm event={event} />
              </div>
              
              {/* Right Column - Event Timing */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Timing</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
                          <p className="text-gray-900">{event.startDate} at {event.startTime}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
                          <p className="text-gray-900">{event.endDate} at {event.endTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Event Details Form Component
function EventDetailsForm({ event }: { event: any }) {
  const [formData, setFormData] = useState({
    title: event.title,
    description: 'Join us for an unforgettable New Year\'s Eve celebration at the Downtown Convention Center. Ring in 2025 with music, dancing, and great company. Don\'t forget to capture and share your favorite moments throughout the night!'
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving event details:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      title: event.title,
      description: 'Join us for an unforgettable New Year\'s Eve celebration at the Downtown Convention Center. Ring in 2025 with music, dancing, and great company. Don\'t forget to capture and share your favorite moments throughout the night!'
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="text-sm"
          >
            Edit Details
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Event Title */}
        <div>
          <Label htmlFor="event-title" className="text-sm font-medium text-gray-700 mb-2 block">
            Event Title
          </Label>
          {isEditing ? (
            <input
              id="event-title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter event title"
            />
          ) : (
            <p className="text-gray-900 py-2">{formData.title}</p>
          )}
        </div>
        
        {/* Event Description */}
        <div>
          <Label htmlFor="event-description" className="text-sm font-medium text-gray-700 mb-2 block">
            Event Description
          </Label>
          {isEditing ? (
            <textarea
              id="event-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Enter event description"
            />
          ) : (
            <div className="text-gray-900 py-2 whitespace-pre-wrap">
              {formData.description || 'No description provided'}
            </div>
          )}
          {isEditing && (
            <p className="text-xs text-gray-500 mt-1">
              Describe your event. This will be shown to guests on the event page.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}