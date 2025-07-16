'use client';

import TVScreen from './TVScreen';

interface TVContainerProps {
  className?: string;
}

export default function TVContainer({ className = "" }: TVContainerProps) {
  return (
    <div className={`relative w-full max-w-2xl ${className}`}>
      {/* TV Screen */}
      <div className="w-full bg-black rounded-lg p-0.5 shadow-2xl border border-gray-700">
        <TVScreen />
      </div>
    </div>
  );
}