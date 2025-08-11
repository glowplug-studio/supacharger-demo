'use client';

import { 
  ArrowDown, 
  ArrowDownLeft, 
  ArrowDownRight, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  ArrowUpLeft, 
  ArrowUpRight, 
  Circle} from 'lucide-react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface PositionSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const positions = [
  { value: 'top-left', label: 'Top Left', icon: ArrowUpLeft },
  { value: 'top-center', label: 'Top Center', icon: ArrowUp },
  { value: 'top-right', label: 'Top Right', icon: ArrowUpRight },
  { value: 'center-left', label: 'Center Left', icon: ArrowLeft },
  { value: 'center', label: 'Center', icon: Circle },
  { value: 'center-right', label: 'Center Right', icon: ArrowRight },
  { value: 'bottom-left', label: 'Bottom Left', icon: ArrowDownLeft },
  { value: 'bottom-center', label: 'Bottom Center', icon: ArrowDown },
  { value: 'bottom-right', label: 'Bottom Right', icon: ArrowDownRight },
];

export default function PositionSelector({ 
  value, 
  onChange, 
  disabled = false, 
  className = "" 
}: PositionSelectorProps) {
  return (
    <TooltipProvider>
      <div className={cn("grid grid-cols-3 gap-1 w-24 h-24", className)}>
        {positions.map((position) => {
          const IconComponent = position.icon;
          return (
            <Tooltip key={position.value} delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => !disabled && onChange(position.value)}
                  disabled={disabled}
                  className={cn(
                    "w-7 h-7 border-2 rounded flex items-center justify-center transition-all",
                    value === position.value 
                      ? "bg-blue-500 border-blue-500 text-white" 
                      : "bg-white border-gray-300 text-gray-600 hover:border-gray-400",
                    disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <IconComponent className="w-3 h-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{position.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}