import React, { useState } from 'react';
import { Check,Copy } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (!newValue.startsWith('#')) {
      newValue = '#' + newValue;
    }
    onChange(newValue);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleHexFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* Color Square */}
      <div className="relative">
        <div
          className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => document.getElementById(`color-input-${value}`)?.click()}
        />
        <input
          id={`color-input-${value}`}
          type="color"
          value={value}
          onChange={handleColorChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* Hex Input */}
      <input
        type="text"
        value={value}
        onChange={handleHexChange}
        onFocus={handleHexFocus}
        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="#000000"
      />

      {/* Copy Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopy}
              className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              type="button"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? 'Copied!' : 'Copy hex value'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}