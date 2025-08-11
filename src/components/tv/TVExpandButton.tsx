'use client';

import { Maximize2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface TVExpandButtonProps {
  onClick: () => void;
  className?: string;
}

export default function TVExpandButton({ onClick, className = "" }: TVExpandButtonProps) {
  return (
    <div className={`flex justify-center mt-4 ${className}`}>
      <Button
        onClick={onClick}
        variant="outline"
        className="flex items-center space-x-2"
      >
        <Maximize2 className="w-4 h-4" />
        <span>Expand TV Preview</span>
      </Button>
    </div>
  );
}