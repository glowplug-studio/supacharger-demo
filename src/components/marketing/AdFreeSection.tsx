'use client';

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

interface AdFreeSectionProps {
  turnOffSnapscreenAds: boolean;
  onToggle: (field: keyof MarketingData) => void;
}

export default function AdFreeSection({
  turnOffSnapscreenAds,
  onToggle
}: AdFreeSectionProps) {
  const { addProFeature, removeProFeature } = useGlobalState();

  const handleTurnOffAdsToggle = () => {
    const newValue = !turnOffSnapscreenAds;
    onToggle('turnOffSnapscreenAds');
    
    if (newValue) {
      addProFeature('turnOffSnapscreenAds');
    } else {
      removeProFeature('turnOffSnapscreenAds');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Go Ad Free</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Label className="text-sm font-medium text-gray-700">Turn off snapscreen Ads</Label>
            <UnifiedBadge type="pro" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Add free experience</p>
          <p className="text-xs text-gray-500">Extremely slide through images even if all have been shown once already. Turning this off the SnapScreen will stop until a new image is uploaded.</p>
        </div>
        <Switch 
          checked={turnOffSnapscreenAds}
          onCheckedChange={handleTurnOffAdsToggle}
        />
      </div>
    </div>
  );
}