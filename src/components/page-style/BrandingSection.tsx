'use client';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ColorPicker } from '@/components/ui/color-picker';
import FontPicker from '@/components/ui/font-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PositionSelector from '@/components/ui/position-selector';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UnifiedBadge } from '@/components/ui/unified-badge';
import { useGlobalState } from '@/hooks/useGlobalState';
import { cn } from '@/lib/utils';

interface BrandingSectionProps {
  needBrandingOptions: boolean;
  logoFile: File | null;
  logoPreview: string;
  logoPosition: string;
  commentFont: string;
  commentBoxColor: string;
  commentTextColor: string;
  cornerRounding: string;
  onBrandingToggle: (checked: boolean) => void;
  onLogoFileChange: (file: File | null) => void;
  onLogoPositionChange: (value: string) => void;
  onCommentFontChange: (value: string) => void;
  onCommentBoxColorChange: (value: string) => void;
  onCommentTextColorChange: (value: string) => void;
  onCornerRoundingChange: (value: string) => void;
}

export default function BrandingSection({
  needBrandingOptions,
  logoFile,
  logoPreview,
  logoPosition,
  commentFont,
  commentBoxColor,
  commentTextColor,
  cornerRounding,
  onBrandingToggle,
  onLogoFileChange,
  onLogoPositionChange,
  onCommentFontChange,
  onCommentBoxColorChange,
  onCommentTextColorChange,
  onCornerRoundingChange
}: BrandingSectionProps) {
  const { unlimitedActive, addUnlimitedFeature, removeUnlimitedFeature } = useGlobalState();

  const handleBrandingToggle = (checked: boolean) => {
    if (checked) {
      addUnlimitedFeature('needBrandingOptions');
    } else {
      removeUnlimitedFeature('needBrandingOptions');
    }
    onBrandingToggle(checked);
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-gray-900">Branding</h4>
      </div>

      {/* Need Branding Options */}
      <div className={`rounded-lg p-4 ${needBrandingOptions ? 'bg-white border border-gray-200' : 'bg-gray-100'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Need Branding Options?</p>
            <p className="text-xs text-gray-600">Get Experienced</p>
          </div>
          <div className="flex items-center space-x-2">
            <UnifiedBadge type="unlimited" />
            <Switch 
              checked={needBrandingOptions}
              onCheckedChange={handleBrandingToggle}
              className="data-[state=checked]:bg-green-600"
            />
          </div>
        </div>
      </div>

      {/* Branding Fields in Box */}
      <div className={`border border-gray-200 rounded-lg p-4 space-y-6 ${needBrandingOptions ? 'bg-white' : 'bg-gray-100'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Add your logo</Label>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center overflow-hidden">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-gray-400 text-xs">No logo</span>
                  )}
                </div>
                
                <div className="flex-1 space-y-2">
                  {!logoFile ? (
                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => onLogoFileChange(e.target.files?.[0] || null)}
                                className="hidden"
                                id="logo-upload"
                                disabled={!needBrandingOptions}
                              />
                              <Button 
                                variant="outline" 
                                asChild
                                disabled={!needBrandingOptions}
                                className={cn(!needBrandingOptions && "opacity-50 cursor-not-allowed")}
                              >
                                <label htmlFor="logo-upload" className={cn("cursor-pointer", !needBrandingOptions && "cursor-not-allowed")}>
                                  Choose file
                                </label>
                              </Button>
                            </div>
                          </TooltipTrigger>
                          {!needBrandingOptions && (
                            <TooltipContent>
                              <p>Enable "Need Branding Options?" to upload a logo</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
                        <span className="text-sm text-gray-700">{logoFile.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onLogoFileChange(null)}
                        className="p-1 h-auto text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Logo Position */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Logo position</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <PositionSelector
                        value={logoPosition} 
                        onChange={onLogoPositionChange}
                        disabled={!needBrandingOptions}
                        className={cn(!needBrandingOptions && "opacity-50")}
                      />
                    </div>
                  </TooltipTrigger>
                  {!needBrandingOptions && (
                    <TooltipContent>
                      <p>Enable "Need Branding Options?" to set logo position</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Comment Styling Title */}
            <div>
              <h5 className="text-sm font-semibold text-gray-900 mb-3">Comment Styling</h5>
            </div>

            {/* Comment Google Font */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Comment Google Font</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <FontPicker
                        value={commentFont}
                        onChange={onCommentFontChange}
                        disabled={!needBrandingOptions}
                        className={cn(!needBrandingOptions && "opacity-50 cursor-not-allowed")}
                      />
                    </div>
                  </TooltipTrigger>
                  {!needBrandingOptions && (
                    <TooltipContent>
                      <p>Enable "Need Branding Options?" to customize comment font</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Comment Box Background Color */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Background Color</Label>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ColorPicker
                        value={commentBoxColor || '#F3F4F6'}
                        onChange={onCommentBoxColorChange}
                        className={cn(!needBrandingOptions && "opacity-50 pointer-events-none")}
                      />
                    </div>
                  </TooltipTrigger>
                  {!needBrandingOptions && (
                    <TooltipContent>
                      <p>Enable "Need Branding Options?" to customize comment box background color</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Corner Rounding */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Corner Rounding</Label>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <Slider
                          value={[['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'].indexOf(cornerRounding)]}
                          onValueChange={(value) => {
                            const radiusOptions = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
                            onCornerRoundingChange(radiusOptions[value[0]]);
                          }}
                          max={6}
                          step={1}
                          disabled={!needBrandingOptions}
                          className={cn("flex-1", !needBrandingOptions && "opacity-50")}
                        />
                        <span className="text-sm text-gray-600 w-12 text-center">{cornerRounding}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>none</span>
                        <span>sm</span>
                        <span>md</span>
                        <span>lg</span>
                        <span>xl</span>
                        <span>2xl</span>
                        <span>full</span>
                      </div>
                    </div>
                  </TooltipTrigger>
                  {!needBrandingOptions && (
                    <TooltipContent>
                      <p>Enable "Need Branding Options?" to customize corner rounding</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Text Color */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Text Color</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ColorPicker
                        value={commentTextColor || '#1F2937'}
                        onChange={onCommentTextColorChange}
                        className={cn(!needBrandingOptions && "opacity-50 pointer-events-none")}
                      />
                    </div>
                  </TooltipTrigger>
                  {!needBrandingOptions && (
                    <TooltipContent>
                      <p>Enable "Need Branding Options?" to customize comment text color</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}