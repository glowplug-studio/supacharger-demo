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

interface FileQualitySectionProps {
  preserveOriginals: boolean;
  onToggle: (field: keyof MarketingData) => void;
}

export default function FileQualitySection({
  preserveOriginals,
  onToggle
}: FileQualitySectionProps) {
  const { addProFeature, removeProFeature } = useGlobalState();

  const handlePreserveOriginalsToggle = () => {
    const newValue = !preserveOriginals;
    onToggle('preserveOriginals');
    
    if (newValue) {
      addProFeature('preserveOriginals');
    } else {
      removeProFeature('preserveOriginals');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">File Quality</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <Label className="text-sm font-medium text-gray-700">Preserve Originals</Label>
            <UnifiedBadge type="pro" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Keep the high res originals</p>
          <p className="text-xs text-gray-500">Keep the original files uploaded.</p>
          <p className="text-xs text-gray-500">Files uploaded to SnapScreen will be compressed and optimised for fast viewing and downloading in multiple formats.</p>
          <p className="text-xs text-gray-500">Check "Preserve Originals" if you want to keep the original uncompressed JPG and PNG files your guests upload.</p>
        </div>
        <Switch 
          checked={preserveOriginals}
          onCheckedChange={handlePreserveOriginalsToggle}
        />
      </div>
    </div>
  );
}