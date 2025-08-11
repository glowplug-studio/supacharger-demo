'use client';

import React from 'react';
import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { UnifiedBadge } from '@/components/ui/unified-badge';
import { useGlobalState } from '@/hooks/useGlobalState';

interface MarketingData {
  downloadOptions: string;
}

interface GalleryDownloadingSectionProps {
  downloadOptions: string;
  onInputChange: (field: keyof MarketingData, value: string) => void;
}

export default function GalleryDownloadingSection({
  downloadOptions,
  onInputChange
}: GalleryDownloadingSectionProps) {
  const { 
    gallerySubscription, 
    setGallerySubscription, 
    extendedGallerySubscription, 
    setExtendedGallerySubscription,
    proActive,
    unlimitedActive 
  } = useGlobalState();

  // Determine if a plan is selected based on global state
  const isFreeSelected = !proActive && !unlimitedActive;
  const isProSelected = proActive && !unlimitedActive;
  const isUnlimitedSelected = unlimitedActive;

  const handleExtendedGalleryChange = (option: 'free-extended' | 'pro-extended', checked: boolean) => {
    // Don't allow checking extended gallery if unlimited is active
    if (checked && isUnlimitedSelected) {
      return;
    }
    
    if (checked) {
      setExtendedGallerySubscription(option);
    } else {
      setExtendedGallerySubscription('');
    }
  };

  // Auto-uncheck extended gallery when unlimited becomes active
  React.useEffect(() => {
    if (isUnlimitedSelected && extendedGallerySubscription) {
      setExtendedGallerySubscription('');
    }
  }, [isUnlimitedSelected, extendedGallerySubscription, setExtendedGallerySubscription]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery and Downloading</h3>
      <div className="p-4 bg-yellow-100 rounded-xl mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">Keep your files longer with Extended Gallery</h4>
        <p className="text-sm text-gray-600">Keep your photos in the cloud in the gallery for your guests to see longer</p>
      </div>
      
      {/* Storage Plans Table */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="font-medium text-sm text-gray-700"></div>
          <div className="text-center">
            <div className="font-medium text-sm">Free</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <UnifiedBadge type="pro" />
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <UnifiedBadge type="unlimited" />
            </div>
          </div>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200">
            <div className="text-gray-700">Files that can be uploaded</div>
            <div className="text-center">Unlimited<br/><span className="text-xs text-gray-500">Limit 100GB</span></div>
            <div className="text-center">Unlimited<br/><span className="text-xs text-gray-500">Limit 100GB</span></div>
            <div className="text-center">Unlimited<br/><span className="text-xs text-gray-500">Limit 100GB</span></div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200">
            <div className="text-gray-700">Files in slideshow</div>
            <div className="text-center">100</div>
            <div className="text-center">Unlimited</div>
            <div className="text-center">Unlimited</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200">
            <div className="text-gray-700">
              Files are erased after this period
              <div className="text-xs text-gray-500 mt-1">* Files can not be recovered once deleted</div>
            </div>
            <div className="text-center">
              <div>
                <div>3 days after event</div>
                <div className={`p-3 rounded-xl mt-2 ${isFreeSelected ? 'bg-yellow-100 border-2 border-yellow-300' : 'bg-gray-100'}`}>
                  <div className="flex items-center justify-center mb-2 space-x-2">
                    <Checkbox
                      checked={extendedGallerySubscription === 'free-extended' && !isUnlimitedSelected}
                      onCheckedChange={(checked) => handleExtendedGalleryChange('free-extended', checked as boolean)}
                      className="w-6 h-6"
                      disabled={!isFreeSelected || isUnlimitedSelected}
                    />
                    <span className={`text-sm font-medium ${!isFreeSelected || isUnlimitedSelected ? 'text-gray-400' : ''}`}>Extended Gallery</span>
                  </div>
                  <div className={`text-xs text-center ${!isFreeSelected || isUnlimitedSelected ? 'text-gray-400' : 'text-gray-600'}`}>Add 12 months<br/>(Total 12 months 1 week)</div>
                  <div className={`text-xs font-medium text-center mt-1 ${!isFreeSelected || isUnlimitedSelected ? 'text-gray-400' : ''}`}>3USD/mo (year)</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div>
                <div>2 months after event</div>
                <div className={`p-3 rounded-xl mt-2 ${isProSelected ? 'bg-yellow-100 border-2 border-yellow-300' : 'bg-gray-100'}`}>
                  <div className="flex items-center justify-center mb-2 space-x-2">
                    <Checkbox
                      checked={extendedGallerySubscription === 'pro-extended' && !isUnlimitedSelected}
                      onCheckedChange={(checked) => handleExtendedGalleryChange('pro-extended', checked as boolean)}
                      className="w-6 h-6"
                      disabled={!isProSelected || isUnlimitedSelected}
                    />
                    <span className={`text-sm font-medium ${!isProSelected || isUnlimitedSelected ? 'text-gray-400' : ''}`}>Pro Extended Gallery</span>
                  </div>
                  <div className={`text-xs text-center ${!isProSelected || isUnlimitedSelected ? 'text-gray-400' : 'text-gray-600'}`}>Add 12 Months<br/>(Total 14 Months)</div>
                  <div className={`text-xs font-medium text-center mt-1 ${!isProSelected || isUnlimitedSelected ? 'text-gray-400' : ''}`}>3USD/mo (year)</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div>Duration of active subscription</div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200">
            <div className="text-gray-700">Download options</div>
            <div className="text-center">
              <div className="text-xs space-y-1">
                <div>- Guests can download individual</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs space-y-1">
                <div>- Guests can download individual</div>
                <div>- Guest can download all</div>
                <div>- Admin can download all</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs space-y-1">
                <div>- Guests can download individual</div>
                <div>- Guest can download all</div>
                <div>- Admin can download all</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 py-2 border-b border-gray-200">
            <div className="text-gray-700">Concurrent Events</div>
            <div className="text-center">1</div>
            <div className="text-center">3</div>
            <div className="text-center">Unlimited</div>
          </div>
          
          {/* Plan Selection Row - No background, changes based on global selection */}
          <div className="grid grid-cols-4 gap-4 py-3">
            <div className="text-gray-700 font-medium">Selected Plan</div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div id="indicator-free-selected" className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isFreeSelected 
                    ? 'bg-green-600 border-green-600' 
                    : 'bg-gray-300 border-gray-300'
                }`}>
                  {isFreeSelected && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div id="indicator-pro-selected"  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isProSelected 
                    ? 'bg-green-600 border-green-600' 
                    : 'bg-gray-300 border-gray-300'
                }`}>
                  {isProSelected && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div id="indicator-unlimited-selected"  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isUnlimitedSelected 
                    ? 'bg-green-600 border-green-600' 
                    : 'bg-gray-300 border-gray-300'
                }`}>
                  {isUnlimitedSelected && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}