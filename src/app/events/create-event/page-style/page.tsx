'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import PageStyleHeader from '@/components/page-style/PageStyleHeader';
import BackgroundSection from '@/components/page-style/BackgroundSection';
import ColorAndFontSection from '@/components/page-style/ColorAndFontSection';
import DesignStyleSection from '@/components/page-style/DesignStyleSection';
import { NavigationButtons } from '@/components/ui/navigation-buttons';

interface PageStyleData {
  backgroundColor: string;
  backgroundImage: File | null;
  primaryColor: string;
  textColor: string;
  font: string;
  designStyle: string;
  backgroundBlur: number;
}

export default function PageStyle() {
  const router = useRouter();
  const [formData, setFormData] = useState<PageStyleData>({
    backgroundColor: '',
    backgroundImage: null,
    primaryColor: '',
    textColor: '',
    font: 'inter',
    designStyle: 'rounded-friendly',
    backgroundBlur: 0
  });

  const [backgroundPreview, setBackgroundPreview] = useState<string>('');

  useEffect(() => {
    // Initialize with default values but don't load from localStorage
    const initialData = {
      ...formData,
      backgroundColor: '#ffffff',
      primaryColor: '#A9A9A9',
      textColor: '#1F2937',
      backgroundBlur: 0
    };
    setFormData(initialData);
    
    // Dispatch initial event for preview
    window.dispatchEvent(new CustomEvent('pageStyleUpdate', { detail: initialData }));
  }, []);

  const handleInputChange = (field: string, value: string | boolean | File | null | number) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Dispatch custom event for real-time preview updates
    window.dispatchEvent(new CustomEvent('pageStyleUpdate', { detail: newFormData }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    handleInputChange(field, file);
    
    if (file) {
      const url = URL.createObjectURL(file);
      if (field === 'backgroundImage') {
        setBackgroundPreview(url);
        // Dispatch event for preview update
        const newFormData = { ...formData, [field]: file };
        window.dispatchEvent(new CustomEvent('pageStyleUpdate', { 
          detail: { ...newFormData, backgroundImageUrl: url, backgroundBlur: formData.backgroundBlur }
        }));
      }
    } else {
      if (field === 'backgroundImage') {
        setBackgroundPreview('');
        // Dispatch event for preview update
        const newFormData = { ...formData, [field]: file };
        window.dispatchEvent(new CustomEvent('pageStyleUpdate', { 
          detail: { ...newFormData, backgroundImageUrl: '', backgroundBlur: formData.backgroundBlur }
        }));
      }
    }
  };

  const handleBack = () => {
    router.push('/create-event/event-basics');
  };

  const handleContinue = () => {
    router.push('/create-event/slideshow-settings');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageStyleHeader 
        title="Page Style"
        description="Customise the Image Upload and Gallery page Styles"
      />

      {/* Event Page Section */}
      <div className="space-y-4">
        <BackgroundSection
          backgroundColor={formData.backgroundColor}
          backgroundImage={formData.backgroundImage}
          backgroundBlur={formData.backgroundBlur}
          backgroundPreview={backgroundPreview}
          onColorChange={(value) => handleInputChange('backgroundColor', value)}
          onFileChange={(file) => handleFileChange('backgroundImage', file)}
          onBlurChange={(value) => handleInputChange('backgroundBlur', value)}
        />

        <ColorAndFontSection
          primaryColor={formData.primaryColor}
          textColor={formData.textColor}
          font={formData.font}
          onPrimaryColorChange={(value) => handleInputChange('primaryColor', value)}
          onTextColorChange={(value) => handleInputChange('textColor', value)}
          onFontChange={(value) => handleInputChange('font', value)}
        />

        <DesignStyleSection
          designStyle={formData.designStyle}
          font={formData.font}
          onDesignStyleChange={(value) => handleInputChange('designStyle', value)}
          onFontChange={(value) => handleInputChange('font', value)}
        />
      </div>

      <Separator />

      <NavigationButtons
        onBack={handleBack}
        onContinue={handleContinue}
      />
    </div>
  );
}