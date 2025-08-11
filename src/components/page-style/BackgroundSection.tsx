'use client';

import { Image,X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ColorPicker } from '@/components/ui/color-picker';
import { Label } from '@/components/ui/label';

interface BackgroundSectionProps {
  backgroundColor: string;
  backgroundImage: File | null;
  backgroundBlur: number;
  backgroundPreview: string;
  onColorChange: (value: string) => void;
  onFileChange: (file: File | null) => void;
  onBlurChange: (value: number) => void;
}

export default function BackgroundSection({
  backgroundColor,
  backgroundImage,
  backgroundBlur,
  backgroundPreview,
  onColorChange,
  onFileChange,
  onBlurChange
}: BackgroundSectionProps) {
  return (
    <div className="space-y-4">
      {/* Background Title */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900">Background</h4>
      </div>

      {/* Background Content in White Box */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Background Color */}
          <div className="space-y-2">
            <div>
              <Label className="text-sm font-medium text-gray-700">Background Colour</Label>
              <p className="text-xs text-gray-500">This will be the background colour of the page</p>
            </div>
            <ColorPicker
              value={backgroundColor || '#ffffff'}
              onChange={onColorChange}
            />
          </div>

          {/* Right Column - Background Image */}
          <div className="space-y-2">
            <div>
              <Label className="text-sm font-medium text-gray-700">Background Image</Label>
              <p className="text-xs text-gray-500">We recommend uploading an image 4 by 3. Or maybe like focal point will be the center.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-48 h-36 bg-gray-200 rounded border flex items-center justify-center overflow-hidden">
                {backgroundPreview ? (
                  <img src={backgroundPreview} alt="Background preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <Image className="w-12 h-12 text-gray-400" />
                    <span className="text-xs text-gray-500">No image</span>
                  </div>
                )}
              </div>
              
              <div>
                {!backgroundImage ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                      className="hidden"
                      id="background-upload"
                    />
                    <Button variant="outline" asChild>
                      <label htmlFor="background-upload" className="cursor-pointer">
                        Choose file
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
                      <span className="text-sm text-gray-700">{backgroundImage.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFileChange(null)}
                      className="p-1 h-auto text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Background Blur - Show when image is selected */}
              {backgroundImage && (
                <div className="space-y-2 border-l-2 border-dotted border-gray-300 pl-4">
                  <Label className="text-sm font-medium text-gray-700">Background Blur</Label>
                  <p className="text-xs text-gray-500">Apply blur effect to the background image</p>
                  <div className="flex items-center space-x-4 max-w-xs">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="1"
                      value={backgroundBlur}
                      onChange={(e) => onBlurChange(parseInt(e.target.value))}
                      className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 w-12">{backgroundBlur}px</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}