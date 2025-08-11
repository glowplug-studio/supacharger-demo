'use client';

import { Calendar, Camera, Image,MapPin } from 'lucide-react';

interface EventCardProps {
  eventName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  primaryColor: string;
  textColor: string;
  designStyle: string;
  submissionOpenDate?: string;
  submissionOpenTime?: string;
  submissionCloseDate?: string;
  submissionCloseTime?: string;
}

export default function PhonePreviewEventCard({
  eventName,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  primaryColor = '#A9A9A9',
  textColor = '#1F2937',
  designStyle,
  submissionOpenDate,
  submissionOpenTime,
  submissionCloseDate,
  submissionCloseTime
}: EventCardProps) {
  const formatEventDate = () => {
    if (!startDate) return '';
    
    const startDateObj = new Date(startDate);
    const endDateObj = endDate ? new Date(endDate) : null;
    
    const formatTime = (time: string) => {
      if (!time) return '';
      const [hours, minutes] = time.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    };

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    };

    if (endDateObj && endDateObj.toDateString() !== startDateObj.toDateString()) {
      return `${formatTime(startTime || '')} ${formatDate(startDateObj)} - ${formatTime(endTime || '')} ${formatDate(endDateObj)}`;
    } else {
      const timeRange = startTime && endTime 
        ? `${formatTime(startTime)} - ${formatTime(endTime)}`
        : startTime 
          ? formatTime(startTime)
          : '';
      return `${timeRange} ${formatDate(startDateObj)}`;
    }
  };

  const getUploadStatus = () => {
    // Use submission dates if available, otherwise fall back to event dates
    const openDate = submissionOpenDate || startDate;
    const openTime = submissionOpenTime || startTime;
    const closeDate = submissionCloseDate || endDate;
    const closeTime = submissionCloseTime || endTime;
    
    if (!openDate || !openTime) return null;
    
    const now = new Date();
    const openDateTime = new Date(`${openDate}T${openTime}`);
    const closeDateTime = closeDate && closeTime ? new Date(`${closeDate}T${closeTime}`) : null;
    
    if (now < openDateTime) {
      // Uploads not available yet
      const timeDiff = openDateTime.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      return `Uploads available in ${days}d ${hours}h ${minutes}m`;
    } else if (closeDateTime && now <= closeDateTime) {
      // Uploads are open
      const timeDiff = closeDateTime.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      return `Open for ${days}d ${hours}h ${minutes}m`;
    } else if (closeDateTime && now > closeDateTime) {
      // Uploads have closed
      return "This event isn't taking uploads anymore";
    } else {
      // No close date set, assume still open
      return "Open for uploads";
    }
  };

  const getDisplayDate = () => {
    if (startDate) {
      return formatEventDate();
    }
    return '6:00 PM July 15, 2024';
  };

  const getDisplayLocation = () => {
    return location || 'Venue Location';
  };

  return (
    <div 
      className={`relative overflow-hidden shadow-lg ${designStyle === 'square-elegant' ? 'p-2' : 'p-2 rounded-3xl'}`}
      style={{ backgroundColor: primaryColor || '#A9A9A9' }}
    >
      <div 
        className="relative z-10 flex flex-col justify-between"
        style={{ color: (textColor === '#1F2937' || !textColor) ? '#ffffff' : textColor }}
      >
        {/* Event Title and Details */}
        <div className="flex-1 flex flex-col justify-end pb-6 space-y-3">
          <h1 className="text-2xl font-bold leading-tight text-center px-4">
            {eventName || 'Your Event Name'}
          </h1>
          
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-medium">{getDisplayDate()}</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-medium">{getDisplayLocation()}</span>
            </div>
          </div>
        </div>

        {/* Add Photos Section */}
        <div className={`bg-white bg-opacity-95 p-4 mb-2 flex flex-col ${designStyle === 'square-elegant' ? '' : 'rounded-2xl'}`}>
          <h3 className="text-gray-900 font-medium text-center mb-3 text-sm">Add your photos</h3>
          
          <div className="flex space-x-3 mb-3">
            <button 
              className={`flex-1 py-2 px-2 flex items-center justify-center space-x-1 text-xs ${designStyle === 'square-elegant' ? '' : 'rounded-xl'}`}
              style={{ 
                backgroundColor: primaryColor || '#A9A9A9',
                color: (textColor === '#1F2937' || !textColor) ? '#ffffff' : textColor
              }}
            >
              <Camera className="w-4 h-4" style={{ color: (textColor === '#1F2937' || !textColor) ? '#ffffff' : textColor }} />
              <span>Camera</span>
            </button>
            <button 
              className={`flex-1 py-2 px-2 flex items-center justify-center space-x-1 text-xs ${designStyle === 'square-elegant' ? '' : 'rounded-xl'}`}
              style={{ 
                backgroundColor: primaryColor || '#A9A9A9',
                color: (textColor === '#1F2937' || !textColor) ? '#ffffff' : textColor
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: (textColor === '#1F2937' || !textColor) ? '#ffffff' : textColor }}>
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <span>Select</span>
            </button>
          </div>
          
          {/* Upload Status */}
          <p className="text-xs text-gray-600 text-center">
            {getUploadStatus() || "Ready for uploads"}
          </p>
        </div>
      </div>
    </div>
  );
}