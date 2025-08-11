'use client';

import { User } from 'lucide-react';

interface DescriptionCardProps {
  description: string;
  hostsName: string;
  hostAvatarUrl: string;
  designStyle: string;
  onAvatarClick: () => void;
}

export default function PhonePreviewDescriptionCard({
  description,
  hostsName,
  hostAvatarUrl,
  designStyle,
  onAvatarClick
}: DescriptionCardProps) {
  // Show description section if there's a description
  const showDescription = !!description;
  
  // Show hosts section if there's either a name OR an avatar
  const showHosts = !!(hostsName || hostAvatarUrl);
  
  // Only show avatar if there's actually an avatar image uploaded
  const showAvatar = !!hostAvatarUrl;
  
  // Only show the entire card if there's any content to display
  if (!showDescription && !showHosts) {
    return null;
  }

  return (
    <div className={`bg-white shadow-sm ${designStyle === 'square-elegant' ? 'p-2' : 'p-4 rounded-2xl'}`}>
      {/* Description */}
      {showDescription && (
        <p className="text-gray-700 text-sm leading-relaxed overflow-hidden text-ellipsis line-clamp-3 mb-3">
          {description}
        </p>
      )}
      
      {/* Hosts Section - Show if either name OR avatar exists */}
      {showHosts && (
        <div className="flex items-center space-x-3">
          {/* Only show avatar circle if there's an actual avatar image */}
          {showAvatar && (
            <div 
              className={`w-12 h-12 bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer hover:bg-gray-200 transition-all ${designStyle === 'square-elegant' ? '' : 'rounded-full'}`}
              onClick={onAvatarClick}
            >
              <img 
                src={hostAvatarUrl} 
                alt="Host avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {hostsName && (
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {hostsName}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}