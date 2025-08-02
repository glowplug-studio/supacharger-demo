'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import PageStyleHeader from '@/components/page-style/PageStyleHeader';
import BrandingSection from '@/components/page-style/BrandingSection';
import SlideshowStyleSection from '@/components/page-style/SlideshowStyleSection';
import SlideshowOptionsSection from '@/components/page-style/SlideshowOptionsSection';
import { NavigationButtons } from '@/components/ui/navigation-buttons';

interface SlideshowSettingsData {
  slideshowStyle: string;
  logoFile: File | null;
  logoPosition: string;
  commentFont: string;
  commentBoxColor: string;
  commentTextColor: string;
  cornerRounding: string;
  slideInterval: string;
  showUploadQR: boolean;
  qrPosition: string;
  allowComments: boolean;
  showAuthor: boolean;
  loopPlayback: boolean;
  showSlideCountdown: boolean;
  ring: string;
  displayOrder: string;
  needBrandingOptions: boolean;
}

export default function SlideshowSettings() {
  const router = useRouter();
  const [formData, setFormData] = useState<SlideshowSettingsData>({
    slideshowStyle: 'ken-burns-crossfade',
    logoFile: null,
    logoPosition: 'bottom-right',
    commentFont: 'inter',
    commentBoxColor: '',
    commentTextColor: '',
    cornerRounding: 'medium',
    slideInterval: '5',
    showUploadQR: false,
    qrPosition: 'bottom-right',
    allowComments: false,
    showAuthor: false,
    loopPlayback: false,
    showSlideCountdown: false,
    ring: 'top-right',
    displayOrder: 'upload-order',
    needBrandingOptions: false
  });

  const [logoPreview, setLogoPreview] = useState<string>('');

  useEffect(() => {
    // Initialize with default values
    const initialData = {
      ...formData,
      commentBoxColor: '#F3F4F6',
      commentTextColor: '#1F2937'
    };
    setFormData(initialData);
  }, []);

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
  };

  const handleFileChange = (field: string, file: File | null) => {
    handleInputChange(field, file);
    
    if (file) {
      const url = URL.createObjectURL(file);
      if (field === 'logoFile') {
        setLogoPreview(url);
      }
    } else {
      if (field === 'logoFile') {
        setLogoPreview('');
      }
    }
  };

  const handleBack = () => {
    router.push('/create-event/page-style');
  };

  const handleContinue = () => {
    router.push('/create-event/marketing');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageStyleHeader 
        title="Slideshow Settings"
        description="Configure your slideshow style, branding, and display options"
      />

      {/* Slideshow Settings */}
      <div className="space-y-6">
        <BrandingSection
          needBrandingOptions={formData.needBrandingOptions}
          logoFile={formData.logoFile}
          logoPreview={logoPreview}
          logoPosition={formData.logoPosition}
          commentFont={formData.commentFont}
          commentBoxColor={formData.commentBoxColor}
          commentTextColor={formData.commentTextColor}
          cornerRounding={formData.cornerRounding}
          onBrandingToggle={(checked) => handleInputChange('needBrandingOptions', checked)}
          onLogoFileChange={(file) => handleFileChange('logoFile', file)}
          onLogoPositionChange={(value) => handleInputChange('logoPosition', value)}
          onCommentFontChange={(value) => handleInputChange('commentFont', value)}
          onCommentBoxColorChange={(value) => handleInputChange('commentBoxColor', value)}
          onCommentTextColorChange={(value) => handleInputChange('commentTextColor', value)}
          onCornerRoundingChange={(value) => handleInputChange('cornerRounding', value)}
        />

        <Separator />

        <SlideshowStyleSection
          slideshowStyle={formData.slideshowStyle}
          slideInterval={formData.slideInterval}
          onSlideshowStyleChange={(value) => handleInputChange('slideshowStyle', value)}
          onSlideIntervalChange={(value) => handleInputChange('slideInterval', value)}
        />

        <Separator />

        <SlideshowOptionsSection
          showUploadQR={formData.showUploadQR}
          qrPosition={formData.qrPosition}
          allowComments={formData.allowComments}
          showAuthor={formData.showAuthor}
          loopPlayback={formData.loopPlayback}
          showSlideCountdown={formData.showSlideCountdown}
          ring={formData.ring}
          displayOrder={formData.displayOrder}
          onShowUploadQRChange={(checked) => handleInputChange('showUploadQR', checked)}
          onQRPositionChange={(value) => handleInputChange('qrPosition', value)}
          onAllowCommentsChange={(checked) => handleInputChange('allowComments', checked)}
          onShowAuthorChange={(checked) => handleInputChange('showAuthor', checked)}
          onLoopPlaybackChange={(checked) => handleInputChange('loopPlayback', checked)}
          onShowSlideCountdownChange={(checked) => handleInputChange('showSlideCountdown', checked)}
          onRingChange={(value) => handleInputChange('ring', value)}
          onDisplayOrderChange={(value) => handleInputChange('displayOrder', value)}
        />
      </div>

      <Separator />

      <NavigationButtons
        onBack={handleBack}
        onContinue={handleContinue}
      />

      {/* Expand TV Preview Button */}
      <div className="flex justify-center py-4">
        <Button
          onClick={() => {
            // Dispatch event to open TV modal
            window.dispatchEvent(new CustomEvent('openTVModal'));
          }}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Maximize2 className="w-4 h-4" />
          <span>Expand TV Preview</span>
        </Button>
      </div>
    </div>
  );
}