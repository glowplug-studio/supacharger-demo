'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Image, Video, ClipboardCopy, ExternalLink, Calendar, QrCode, Play, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UnifiedBadge } from '@/components/ui/unified-badge';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import QRModal from '@/components/ui/qr-modal';

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

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const router = useRouter();

  // Use the same date formatting functions from PhonePreviewEventCard
  const formatEventDate = () => {
    if (!event.startDate) return '';
    
    const startDateObj = new Date(event.startDate);
    const endDateObj = event.endDate ? new Date(event.endDate) : null;
    
    const formatTime = (time: string) => {
      if (!time) return '';
      const [hours, minutes] = time.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      });
    };

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    };

    if (endDateObj && endDateObj.toDateString() !== startDateObj.toDateString()) {
      return `${formatTime(event.startTime || '')} ${formatDate(startDateObj)} - ${formatTime(event.endTime || '')} ${formatDate(endDateObj)}`;
    } else {
      const timeRange = event.startTime && event.endTime 
        ? `${formatTime(event.startTime)} - ${formatTime(event.endTime)}`
        : event.startTime 
          ? formatTime(event.startTime)
          : '';
      return `${timeRange} ${formatDate(startDateObj)}`;
    }
  };

  const formatSubmissionTime = (dateStr: string, timeStr: string, label: string) => {
    if (!dateStr || !timeStr) return '';
    
    const date = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      });
    };

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    };

    return `${label}: ${formatTime(date)} ${formatDate(date)}`;
  };

  const getTimeDifference = (dateStr: string, timeStr: string) => {
    if (!dateStr || !timeStr) return '';
    
    const date = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffMs < 0) return 'Expired';
    if (diffDays > 0) return `${diffDays}d ${diffHours}h ${diffMinutes}m`;
    if (diffHours > 0) return `${diffHours}h ${diffMinutes}m`;
    return `${diffMinutes}m`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const handleManageClick = () => {
    router.push('/events/event-detail');
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-lg border-0">
      {/* Taller Header with Background Image */}
      <div className="relative">
        <div className="m-1">
        <div className="rounded-lg overflow-hidden"
        >
        <div
          className="relative h-48 bg-cover bg-center"
          style={{
            backgroundImage: event.headerImage 
              ? `url('${event.headerImage}')` 
              : `url('https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800')`
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
          
          {/* Event Code Pill - Top Right */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center space-x-2">
              <div 
                className="bg-white/90 text-gray-900 font-mono text-xs px-2 py-1 backdrop-blur-sm rounded-full cursor-pointer hover:bg-white transition-colors"
                onClick={() => copyToClipboard(event.id, 'Event ID')}
                title="Click to copy Event ID"
              >
                {event.id}
              </div>
              <UnifiedBadge 
                type={event.type as 'free' | 'pro' | 'unlimited'} 
                size="sm"
                className="bg-white/90 backdrop-blur-sm"
              />
            </div>
          </div>
          
          {/* Live Uploads Pill - Top Left */}
          {(() => {
            const now = new Date();
            const uploadWindowStart = event.submissionOpenDate && event.submissionOpenTime 
              ? new Date(`${event.submissionOpenDate}T${event.submissionOpenTime}`)
              : null;
            const uploadWindowEnd = event.submissionCloseDate && event.submissionCloseTime 
              ? new Date(`${event.submissionCloseDate}T${event.submissionCloseTime}`)
              : null;
            
            // Upload window start date < now AND upload window end date > now
            const isLive = uploadWindowStart && uploadWindowEnd && 
              uploadWindowStart < now && uploadWindowEnd > now;
            
            return isLive ? (
              <div className="absolute top-3 left-3">
                <div className="flex items-center space-x-2 bg-black text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>uploads live now</span>
                </div>
              </div>
            ) : null;
          })()}
          
          {/* Content positioned at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-bold mb-2 leading-tight hover:text-gray-200 transition-colors cursor-pointer">
              <Link href="/events/event-detail" className="block">
                {event.title}
              </Link>
            </h3>
            
            <div className="space-y-1 mb-3">
              <div className="flex items-center text-white/90 text-sm">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{event.location || 'Location TBD'}</span>
              </div>
              
              <div className="flex items-center text-white/90 text-sm">
                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{formatEventDate()}</span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Image className="w-4 h-4 text-white/90" />
                <span className="text-sm font-medium text-white">{event.photoCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Video className="w-4 h-4 text-white/90" />
                <span className="text-sm font-medium text-white">{event.videoCount}</span>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Action Buttons Section */}
        <div className="space-y-4 mb-6">
          {/* Upload Form Actions */}
          <div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(event.uploadFormLink || '', 'Upload form link')}
                disabled={!event.uploadFormLink}
                className="flex-1 flex items-center space-x-2"
                title="Copy upload form link to clipboard"
              >
                <ClipboardCopy className="w-4 h-4" />
                <span className="flex-1 text-center">Copy Upload Link</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openLink(event.uploadFormLink || '')}
                disabled={!event.uploadFormLink}
                className="px-3"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            
          </div>

          {/* Gallery Actions */}
          <div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(event.galleryLink || '', 'Gallery link')}
                disabled={!event.galleryLink}
                className="flex-1 flex items-center space-x-2"
                title="Copy gallery link to clipboard"
              >
                <ClipboardCopy className="w-4 h-4" />
                <span className="flex-1 text-center">Copy Gallery Link</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openLink(event.galleryLink || '')}
                disabled={!event.galleryLink}
                className="px-3"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Expires info */}
            <div className="text-xs text-gray-500 mt-2">
              {event.expiresInDays ? `Expires in ${event.expiresInDays} days` : 'Expiry date not set'}
            </div>
          </div>

          {/* QR Code Button */}
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsQRModalOpen(true)}
              className="w-full flex items-center justify-center space-x-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Show QR Code</span>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200">
          <Button
            variant="default"
            className="w-full"
            onClick={handleManageClick}
          >
            Manage Event
          </Button>
        </div>
      </CardContent>
      
      {/* QR Modal */}
      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        eventId={event.id}
        eventTitle={event.title}
        uploadFormLink={event.uploadFormLink}
      />
    </Card>
  );
}