'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UnifiedBadge } from '@/components/ui/unified-badge';
import { useGlobalState } from '@/hooks/useGlobalState';

// Import MarketingData type from the parent page
type MarketingData = {
  submissionRequiresEmail: boolean;
  submitterEmailVerification: boolean;
  snapscreenPromotionalOffers: boolean;
  enableExportMailList: boolean;
  passwordProtectUpload: boolean;
  uploadPassword: string;
  passwordProtectGallery: boolean;
  galleryPassword: string;
  approvedUploadsOnly: boolean;
  guestsBulkDownload: boolean;
  turnOffSnapscreenAds: boolean;
  preserveOriginals: boolean;
};

interface SecuritySharingSectionProps {
  passwordProtectUpload: boolean;
  uploadPassword: string;
  passwordProtectGallery: boolean;
  galleryPassword: string;
  approvedUploadsOnly: boolean;
  guestsBulkDownload: boolean;
  onToggle: (field: keyof MarketingData) => void;
  onInputChange: (field: keyof MarketingData, value: string) => void;
}

export default function SecuritySharingSection({
  passwordProtectUpload,
  uploadPassword,
  passwordProtectGallery,
  galleryPassword,
  approvedUploadsOnly,
  guestsBulkDownload,
  onToggle,
  onInputChange
}: SecuritySharingSectionProps) {
  const { addProFeature, removeProFeature } = useGlobalState();

  const handlePasswordProtectGalleryToggle = () => {
    const newValue = !passwordProtectGallery;
    onToggle('passwordProtectGallery');
    
    if (newValue) {
      addProFeature('passwordProtectGallery');
    } else {
      removeProFeature('passwordProtectGallery');
    }
  };

  const handleApprovedUploadsToggle = () => {
    const newValue = !approvedUploadsOnly;
    onToggle('approvedUploadsOnly');
    
    if (newValue) {
      addProFeature('approvedUploadsOnly');
    } else {
      removeProFeature('approvedUploadsOnly');
    }
  };

  const handleGuestsBulkDownloadToggle = () => {
    const newValue = !guestsBulkDownload;
    onToggle('guestsBulkDownload');
    
    if (newValue) {
      addProFeature('guestsBulkDownload');
    } else {
      removeProFeature('guestsBulkDownload');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Security and Sharing</h3>
      <p className="text-sm text-gray-600 mb-6">Users will only be asked to enter the password once</p>
      
      <div className="space-y-6">
        {/* Password Protect Upload Page */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label className="text-sm font-medium text-gray-700">Password Protect Upload Page</Label>
            {passwordProtectUpload && (
              <div className="mt-2 border-l-2 border-dotted border-gray-300 pl-4">
                <Label className="text-sm text-gray-600">Password</Label>
                <Input
                  type="password"
                  value={uploadPassword}
                  onChange={(e) => onInputChange('uploadPassword', e.target.value)}
                  className="mt-1 w-64"
                  placeholder="Enter password"
                />
              </div>
            )}
          </div>
          <Switch 
            checked={passwordProtectUpload}
            onCheckedChange={() => onToggle('passwordProtectUpload')}
          />
        </div>

        {/* Password Protect Gallery Page */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-gray-700">Password Protect Gallery Page</Label>
              <UnifiedBadge type="pro" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Enable Gallery Password</p>
            {passwordProtectGallery && (
              <div className="mt-2 border-l-2 border-dotted border-gray-300 pl-4">
                <Label className="text-sm text-gray-600">Password</Label>
                <Input
                  type="password"
                  value={galleryPassword}
                  onChange={(e) => onInputChange('galleryPassword', e.target.value)}
                  className="mt-1 w-64"
                  placeholder="Enter password"
                />
              </div>
            )}
          </div>
          <Switch 
            checked={passwordProtectGallery}
            onCheckedChange={handlePasswordProtectGalleryToggle}
          />
        </div>

        {/* Approved uploads only */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-gray-700">Approved uploads only</Label>
              <UnifiedBadge type="pro" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Enable moderation Tools</p>
            <p className="text-xs text-gray-500">Moderate items so that you can only allow approved content</p>
            <p className="text-xs text-gray-500">Note this will require someone to manually monitor incoming uploads and view / approve content, this can be turned off during the day of the event.</p>
          </div>
          <Switch 
            checked={approvedUploadsOnly}
            onCheckedChange={handleApprovedUploadsToggle}
          />
        </div>

        {/* Guests can bulk download albums */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-gray-700">Guests can bulk download albums</Label>
             <UnifiedBadge type="pro" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Enable bulk downloads</p>
            <p className="text-xs text-gray-500">Guests can download a Zip of the album once the event has concluded.</p>
          </div>
          <Switch 
            checked={guestsBulkDownload}
            onCheckedChange={handleGuestsBulkDownloadToggle}
          />
        </div>
      </div>
    </div>
  );
}