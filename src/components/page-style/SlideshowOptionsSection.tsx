'use client';

import { ArrowUpDown, Shuffle } from 'lucide-react';

import { Label } from '@/components/ui/label';
import PositionSelector from '@/components/ui/position-selector';
import { Switch } from '@/components/ui/switch';

interface SlideshowOptionsSectionProps {
  showUploadQR: boolean;
  qrPosition: string;
  allowComments: boolean;
  showAuthor: boolean;
  loopPlayback: boolean;
  showSlideCountdown: boolean;
  ring: string;
  displayOrder: string;
  onShowUploadQRChange: (checked: boolean) => void;
  onQRPositionChange: (value: string) => void;
  onAllowCommentsChange: (checked: boolean) => void;
  onShowAuthorChange: (checked: boolean) => void;
  onLoopPlaybackChange: (checked: boolean) => void;
  onShowSlideCountdownChange: (checked: boolean) => void;
  onRingChange: (value: string) => void;
  onDisplayOrderChange: (value: string) => void;
}

export default function SlideshowOptionsSection({
  showUploadQR,
  qrPosition,
  allowComments,
  showAuthor,
  loopPlayback,
  showSlideCountdown,
  ring,
  displayOrder,
  onShowUploadQRChange,
  onQRPositionChange,
  onAllowCommentsChange,
  onShowAuthorChange,
  onLoopPlaybackChange,
  onShowSlideCountdownChange,
  onRingChange,
  onDisplayOrderChange
}: SlideshowOptionsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium text-gray-700">Show scan to Upload QR</Label>
        </div>
        <Switch 
          checked={showUploadQR}
          onCheckedChange={onShowUploadQRChange}
        />
      </div>

      {showUploadQR && (
        <div className="space-y-2 ml-4 border-l-2 border-dotted border-gray-300 pl-4">
          <Label className="text-sm font-medium text-gray-700">QR position</Label>
          <PositionSelector
            value={qrPosition}
            onChange={onQRPositionChange}
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium text-gray-700">Allow comments</Label>
        </div>
        <Switch 
          checked={allowComments}
          onCheckedChange={onAllowCommentsChange}
        />
      </div>

      {allowComments && (
        <div className="flex items-center justify-between ml-4 border-l-2 border-dotted border-gray-300 pl-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Show author</Label>
            <p className="text-xs text-gray-500">Show a photo and name of the photo author.<br />This photo will be shown on the slideshow on the upload page.<br />The guest may choose to be anonymous.</p>
          </div>
          <Switch 
            checked={showAuthor}
            onCheckedChange={onShowAuthorChange}
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium text-gray-700">Loop playback</Label>
          <p className="text-xs text-gray-500">Endlessly slide through images even if all have been shown once already.<br />During this all the slideshow will loop until a new image is uploaded.</p>
        </div>
        <Switch 
          checked={loopPlayback}
          onCheckedChange={onLoopPlaybackChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium text-gray-700">Show slide time countdown ring</Label>
          <p className="text-xs text-gray-500">Show a white ring which counts down to the next slide</p>
        </div>
        <Switch 
          checked={showSlideCountdown}
          onCheckedChange={onShowSlideCountdownChange}
        />
      </div>

      {showSlideCountdown && (
        <div className="space-y-2 ml-4 border-l-2 border-dotted border-gray-300 pl-4">
          <Label className="text-sm font-medium text-gray-700">Ring Position</Label>
          <PositionSelector
            value={ring}
            onChange={onRingChange}
          />
        </div>
      )}

      {/* Display Order */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">Display Order</Label>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Upload Order */}
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                displayOrder === 'upload-order' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onDisplayOrderChange('upload-order')}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-full ${
                  displayOrder === 'upload-order' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <ArrowUpDown className="w-4 h-4" />
                </div>
                <h4 className="font-medium text-gray-900">Upload Order</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Images are displayed based on the time they are uploaded to the event. This is the default option.
              </p>
              <p className="text-xs text-gray-500">
                They are submitted and inserted in the queue at its earliest playback position.
              </p>
            </div>

            {/* Random Order */}
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                displayOrder === 'random-order' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onDisplayOrderChange('random-order')}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-full ${
                  displayOrder === 'random-order' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Shuffle className="w-4 h-4" />
                </div>
                <h4 className="font-medium text-gray-900">Random Order</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Images are uploaded to a pool and displayed in random order.
              </p>
              <p className="text-xs text-gray-500">
                Better for people to see their images appear quickly. Less restrictive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}