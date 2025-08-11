'use client';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface SubmissionsChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SubmissionsChartModal({ 
  isOpen, 
  onClose, 
  children 
}: SubmissionsChartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-6xl mx-4 max-h-[90vh] overflow-auto">
        <div className="bg-white rounded-lg shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Submissions Over Time - Full View
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Chart Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}