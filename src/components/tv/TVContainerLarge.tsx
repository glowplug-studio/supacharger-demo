'use client';

import TVScreenLarge from './TVScreenLarge';

interface TVContainerLargeProps {
  className?: string;
}

export default function TVContainerLarge({ className = "" }: TVContainerLargeProps) {
  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      {/* TV Screen - Larger version */}
      <div className="w-full bg-black rounded-lg p-1 shadow-2xl border border-gray-700">
        <TVScreenLarge />
      </div>
    </div>
  );
}