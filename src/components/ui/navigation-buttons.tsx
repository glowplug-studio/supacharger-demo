'use client';

import { ArrowLeft,ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface NavigationButtonsProps {
  onBack?: () => void;
  onContinue?: () => void;
  backLabel?: string;
  continueLabel?: string;
  showBack?: boolean;
  showContinue?: boolean;
}

export function NavigationButtons({
  onBack,
  onContinue,
  backLabel = "Back",
  continueLabel = "Continue",
  showBack = true,
  showContinue = true
}: NavigationButtonsProps) {
  const handleContinue = () => {
    // Smooth scroll to top with easing
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Small delay to allow scroll to start, then call the continue function
    setTimeout(() => {
      if (onContinue) {
        onContinue();
      }
    }, 100);
  };

  return (
    <div className="flex justify-between items-center">
      {showBack ? (
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </Button>
      ) : (
        <div />
      )}
      
      {showContinue && (
        <Button
          onClick={handleContinue}
          className="flex items-center space-x-2"
        >
          <span>{continueLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

export function ContinueButton({
  onClick,
  label = "Continue"
}: {
  onClick?: () => void;
  label?: string;
}) {
  const handleClick = () => {
    // Smooth scroll to top with easing
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Small delay to allow scroll to start, then call the onClick function
    setTimeout(() => {
      if (onClick) {
        onClick();
      }
    }, 100);
  };

  return (
    <Button
      onClick={handleClick}
      className="flex items-center space-x-2"
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4" />
    </Button>
  );
}