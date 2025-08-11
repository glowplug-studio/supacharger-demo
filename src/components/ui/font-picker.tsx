'use client';

import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const fonts = [
  { value: 'inter', label: 'Inter', family: 'Inter, sans-serif' },
  { value: 'roboto', label: 'Roboto', family: 'Roboto, sans-serif' },
  { value: 'open-sans', label: 'Open Sans', family: 'Open Sans, sans-serif' },
  { value: 'lato', label: 'Lato', family: 'Lato, sans-serif' },
  { value: 'montserrat', label: 'Montserrat', family: 'Montserrat, sans-serif' },
  { value: 'poppins', label: 'Poppins', family: 'Poppins, sans-serif' },
  { value: 'nunito', label: 'Nunito', family: 'Nunito, sans-serif' },
  { value: 'source-sans-pro', label: 'Source Sans Pro', family: 'Source Sans Pro, sans-serif' },
  { value: 'raleway', label: 'Raleway', family: 'Raleway, sans-serif' },
  { value: 'ubuntu', label: 'Ubuntu', family: 'Ubuntu, sans-serif' },
  { value: 'playfair-display', label: 'Playfair Display', family: 'Playfair Display, serif' },
  { value: 'merriweather', label: 'Merriweather', family: 'Merriweather, serif' },
  { value: 'crimson-text', label: 'Crimson Text', family: 'Crimson Text, serif' },
  { value: 'libre-baskerville', label: 'Libre Baskerville', family: 'Libre Baskerville, serif' }
];

interface FontPickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export default function FontPicker({
  value,
  onChange,
  disabled = false,
  className = "",
  placeholder = "Select font..."
}: FontPickerProps) {
  const [open, setOpen] = useState(false);

  const selectedFont = fonts.find((font) => font.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between",
            !selectedFont && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <span 
            style={{ 
              fontFamily: selectedFont?.family || 'inherit'
            }}
          >
            {selectedFont ? selectedFont.label : placeholder}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search fonts..." />
          <CommandEmpty>No font found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {fonts.map((font) => (
              <CommandItem
                key={font.value}
                value={font.value}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === font.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <span 
                  style={{ fontFamily: font.family }}
                  className="flex-1"
                >
                  {font.label}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  {font.family.split(',')[0]}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}