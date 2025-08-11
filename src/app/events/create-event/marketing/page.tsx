'use client';

import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft,ArrowRight } from 'lucide-react';

import AdFreeSection from '@/components/marketing/AdFreeSection';
import EmailsMarketingSection from '@/components/marketing/EmailsMarketingSection';
import FileQualitySection from '@/components/marketing/FileQualitySection';
import GalleryDownloadingSection from '@/components/marketing/GalleryDownloadingSection';
import SecuritySharingSection from '@/components/marketing/SecuritySharingSection';
import { NavigationButtons } from '@/components/ui/navigation-buttons';

interface MarketingData {
  passwordProtectUpload: boolean;
  uploadPassword: string;
  passwordProtectGallery: boolean;
  galleryPassword: string;
  approvedUploadsOnly: boolean;
  guestsBulkDownload: boolean;
  submissionRequiresEmail: boolean;
  submitterEmailVerification: boolean;
  snapscreenPromotionalOffers: boolean;
  enableExportMailList: boolean;
  turnOffSnapscreenAds: boolean;
  preserveOriginals: boolean;
  downloadOptions: string;
}

export default function Marketing() {
  const router = useRouter();
  const [formData, setFormData] = useState<MarketingData>({
    passwordProtectUpload: false,
    uploadPassword: '',
    passwordProtectGallery: false,
    galleryPassword: '',
    approvedUploadsOnly: false,
    guestsBulkDownload: false,
    submissionRequiresEmail: false,
    submitterEmailVerification: false,
    snapscreenPromotionalOffers: false,
    enableExportMailList: false,
    turnOffSnapscreenAds: false,
    preserveOriginals: false,
    downloadOptions: 'manual'
  });

  useEffect(() => {
    // Don't load from localStorage to ensure defaults are always false
    // const savedData = localStorage.getItem('marketingData');
    // if (savedData) {
    //   setFormData(JSON.parse(savedData));
    // }
  }, []);

  const handleToggle = (field: keyof MarketingData) => {
    const newFormData = { ...formData, [field]: !formData[field] };
    setFormData(newFormData);
    localStorage.setItem('marketingData', JSON.stringify(newFormData));
  };

  const handleInputChange = (field: keyof MarketingData, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    localStorage.setItem('marketingData', JSON.stringify(newFormData));
  };

  const handleBack = () => {
    router.push('/create-event/slideshow-settings');
  };

  const handleContinue = () => {
    router.push('/create-event/review');
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Marketing, Tools & Security</h2>
        <p className="text-gray-600 mt-1">Configure sharing options and security settings</p>
      </div>

      {/* Two-column layout for sections above Gallery and Downloading */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <SecuritySharingSection
            passwordProtectUpload={formData.passwordProtectUpload}
            uploadPassword={formData.uploadPassword}
            passwordProtectGallery={formData.passwordProtectGallery}
            galleryPassword={formData.galleryPassword}
            approvedUploadsOnly={formData.approvedUploadsOnly}
            guestsBulkDownload={formData.guestsBulkDownload}
            onToggle={handleToggle}
            onInputChange={handleInputChange}
          />

          <div className="border-t border-gray-200"></div>

          <EmailsMarketingSection
            submissionRequiresEmail={formData.submissionRequiresEmail}
            submitterEmailVerification={formData.submitterEmailVerification}
            snapscreenPromotionalOffers={formData.snapscreenPromotionalOffers}
            enableExportMailList={formData.enableExportMailList}
            onToggle={handleToggle}
          />

          <div className="border-t border-gray-200"></div>

          <AdFreeSection
            turnOffSnapscreenAds={formData.turnOffSnapscreenAds}
            onToggle={handleToggle}
          />

          <div className="border-t border-gray-200"></div>

          <FileQualitySection
            preserveOriginals={formData.preserveOriginals}
            onToggle={handleToggle}
          />
        </div>
        
        {/* Empty third column */}
        <div className="col-span-1">
          {/* Intentionally empty */}
        </div>
      </div>

      {/* Gallery and Downloading section spans full width */}
      <div className="border-t border-gray-200"></div>
      
      <div className="space-y-8">
        <GalleryDownloadingSection
          downloadOptions={formData.downloadOptions}
          onInputChange={handleInputChange}
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <NavigationButtons
              onBack={handleBack}
              onContinue={handleContinue}
              backLabel="Previous"
            />
          </div>
          <div className="col-span-1">
            {/* Empty third column */}
          </div>
        </div>
      </div>
    </div>
  );
}