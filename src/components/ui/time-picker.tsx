import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TimePicker({ value, onChange, disabled = false }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const [hour, minute] = value ? value.split(':') : ['', ''];

  const handleHourChange = (newHour: string) => {
    const newTime = `${newHour}:${minute || '00'}`;
    onChange(newTime);
  };

  const handleMinuteChange = (newMinute: string) => {
    const newTime = `${hour || '00'}:${newMinute}`;
    onChange(newTime);
  };

  return (
    <div className="flex space-x-1">
      <Select value={hour} onValueChange={handleHourChange} disabled={disabled}>
        <SelectTrigger className="w-16">
          <SelectValue placeholder="HH" />
        </SelectTrigger>
        <SelectContent>
          {hours.map((h) => (
            <SelectItem key={h} value={h}>
              {h}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="flex items-center text-gray-500">:</span>
      <Select value={minute} onValueChange={handleMinuteChange} disabled={disabled}>
        <SelectTrigger className="w-16">
          <SelectValue placeholder="MM" />
        </SelectTrigger>
        <SelectContent>
          {minutes.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}