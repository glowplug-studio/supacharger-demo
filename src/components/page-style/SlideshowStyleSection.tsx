'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SlideshowStyleSectionProps {
  slideshowStyle: string;
  slideInterval: string;
  onSlideshowStyleChange: (value: string) => void;
  onSlideIntervalChange: (value: string) => void;
}

export default function SlideshowStyleSection({
  slideshowStyle,
  slideInterval,
  onSlideshowStyleChange,
  onSlideIntervalChange
}: SlideshowStyleSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-gray-900">Slideshow Style</h4>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card 
          className={`cursor-pointer transition-all ${slideshowStyle === 'ken-burns-crossfade' ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => onSlideshowStyleChange('ken-burns-crossfade')}
        >
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">✓</span>
            </div>
            <p className="text-sm font-medium">Ken burns crossfade</p>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-600">Queue and current</p>
              <p className="text-xs text-gray-600">• Only available to paid events</p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${slideshowStyle === 'flowing-images' ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => onSlideshowStyleChange('flowing-images')}
        >
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">✓</span>
            </div>
            <p className="text-sm font-medium">Flowing Images</p>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-600">Queue and current</p>
              <p className="text-xs text-gray-600">• Only available to paid events</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Slide Interval */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Slide Interval</Label>
        <Select value={slideInterval} onValueChange={onSlideIntervalChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 second</SelectItem>
            <SelectItem value="2">2 seconds</SelectItem>
            <SelectItem value="3">3 seconds</SelectItem>
            <SelectItem value="5">5 seconds</SelectItem>
            <SelectItem value="7">7 seconds</SelectItem>
            <SelectItem value="10">10 seconds</SelectItem>
            <SelectItem value="15">15 seconds</SelectItem>
            <SelectItem value="20">20 seconds</SelectItem>
            <SelectItem value="30">30 seconds</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}