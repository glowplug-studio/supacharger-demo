'use client';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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

interface EmailsMarketingSectionProps {
  submissionRequiresEmail: boolean;
  submitterEmailVerification: boolean;
  snapscreenPromotionalOffers: boolean;
  enableExportMailList: boolean;
  onToggle: (field: keyof MarketingData) => void;
}

export default function EmailsMarketingSection({
  submissionRequiresEmail,
  submitterEmailVerification,
  snapscreenPromotionalOffers,
  enableExportMailList,
  onToggle
}: EmailsMarketingSectionProps) {
  const { addUnlimitedFeature, removeUnlimitedFeature } = useGlobalState();

  const handleExportMailListToggle = () => {
    const newValue = !enableExportMailList;
    onToggle('enableExportMailList');
    
    if (newValue) {
      addUnlimitedFeature('enableExportMailList');
    } else {
      removeUnlimitedFeature('enableExportMailList');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Emails & Marketing Options</h3>
      
      <div className="space-y-6">
        {/* Submitter Email Collection */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Submitter Email Collection</Label>
          <p className="text-xs text-gray-500 mb-4">Submission Requires an Email Address</p>
          
          <div className="flex items-center justify-between mb-4">
            <Label className="text-sm font-medium text-gray-700">Submitter Email Verification</Label>
            <Switch 
              checked={submitterEmailVerification}
              onCheckedChange={() => onToggle('submitterEmailVerification')}
            />
          </div>
          <p className="text-xs text-gray-500 mb-4">Emails of submitters must verify their email by clicking a link for photos to go live</p>
          
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">SnapScreen may contact Submitters with promotional offers.</Label>
            <Switch 
              checked={snapscreenPromotionalOffers}
              onCheckedChange={() => onToggle('snapscreenPromotionalOffers')}
            />
          </div>
        </div>

        {/* Enable export mail list to CSV */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-gray-700">Enable export mail list to CSV?</Label>
              <UnifiedBadge type="unlimited" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Upgrade to a snap unlimited account so you don't have to worry about your email exports from the admin panel</p>
          </div>
          <Switch 
            checked={enableExportMailList}
            onCheckedChange={handleExportMailListToggle}
          />
        </div>
      </div>
    </div>
  );
}