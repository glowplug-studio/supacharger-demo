'use client';

interface TVScreenLargeProps {
  className?: string;
}

export default function TVScreenLarge({ className = "" }: TVScreenLargeProps) {
  return (
    <div 
      className={`w-full h-full bg-gray-900 rounded overflow-hidden relative ${className}`}
      style={{ aspectRatio: '16/9' }}
    >
      {/* Background Image - Times Square */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560439513-74b037a25d84?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
        }}
      >
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* QR Code - Bottom Left - Larger */}
      <div className="absolute bottom-8 left-8">
        <div className="bg-white p-3 rounded">
          <div className="w-12 h-12 bg-black rounded flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2zM19 19h2v2h-2z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Avatar and Quote - Bottom Center - Larger */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-6">
          {/* Avatar with name */}
          <div className="bg-black bg-opacity-70 text-white px-4 py-3 rounded-full flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg text-white">Alex</span>
          </div>
          
          {/* Quote with same styling as avatar */}
          <div className="bg-black bg-opacity-70 text-white px-6 py-3 rounded-full">
            <p className="text-lg text-gray-300">"Adventure is worthwhile in itself"</p>
          </div>
        </div>
      </div>

      {/* Brand Logo - Bottom Right - Larger */}
      <div className="absolute bottom-8 right-8">
        <div className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-lg">
          logo
        </div>
      </div>

      {/* Photo counter or status indicator - Top Right - Larger */}
      <div className="absolute top-8 right-8">
        <div className="w-12 h-12 border-4 border-white rounded-full">
        </div>
      </div>
    </div>
  );
}