'use client';

import { Card, CardContent } from '@/components/ui/card';
import FontPicker from '@/components/ui/font-picker';
import { Label } from '@/components/ui/label';

interface DesignStyleSectionProps {
  designStyle: string;
  font: string;
  onDesignStyleChange: (value: string) => void;
  onFontChange: (value: string) => void;
}

export default function DesignStyleSection({
  designStyle,
  font,
  onDesignStyleChange,
  onFontChange
}: DesignStyleSectionProps) {
  return (
    <div className="space-y-4">
      {/* Feel Title */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900">Feel</h4>
      </div>

      {/* Feel Content in White Box */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Design Style */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Rounded or Square Design?</Label>
            <p className="text-xs text-gray-500">Which design style suits your event?</p>
            <div className="flex space-x-4">
              <Card 
                className={`cursor-pointer transition-all ${designStyle === 'rounded-friendly' ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => onDesignStyleChange('rounded-friendly')}
              >
                <CardContent className="p-4 text-center">
                  <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm mb-2">
                    Rounded n Friendly
                  </div>
                </CardContent>
              </Card>
              <Card 
                className={`cursor-pointer transition-all ${designStyle === 'square-elegant' ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => onDesignStyleChange('square-elegant')}
              >
                <CardContent className="p-4 text-center">
                  <div className="bg-gray-800 text-white px-3 py-1 text-sm mb-2 font-serif">
                    Square & Elegant
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Font */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Font</Label>
            <p className="text-xs text-gray-500">Choose a suitable font</p>
            <div className="w-48">
              <FontPicker
                value={font}
                onChange={onFontChange}
                placeholder="Select font..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}