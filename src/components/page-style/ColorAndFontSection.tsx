'use client';

import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/color-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ColorAndFontSectionProps {
  primaryColor: string;
  textColor: string;
  font: string;
  onPrimaryColorChange: (value: string) => void;
  onTextColorChange: (value: string) => void;
  onFontChange: (value: string) => void;
}

export default function ColorAndFontSection({
  primaryColor,
  textColor,
  font,
  onPrimaryColorChange,
  onTextColorChange,
  onFontChange
}: ColorAndFontSectionProps) {
  return (
    <div className="space-y-4">
      {/* Colors Title */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900">Colors</h4>
      </div>

      {/* Colors Content in White Box */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Primary Color and Text Color in two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Primary Colour</Label>
            <p className="text-xs text-gray-500">This will be the colour of the page fill and buttons.</p>
            <ColorPicker
              value={primaryColor || '#A9A9A9'}
              onChange={onPrimaryColorChange}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Text Color</Label>
            <p className="text-xs text-gray-500">This will be the color of the text on the page.</p>
            <ColorPicker
              value={textColor || '#1F2937'}
              onChange={onTextColorChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}