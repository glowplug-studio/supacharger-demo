'use client';

interface TVScreenProps {
  className?: string;
}

export default function TVScreen({ className = "" }: TVScreenProps) {
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

      {/* QR Code - Bottom Left */}
      <div className="absolute bottom-4 left-4">
        <div className="bg-white p-1.5 rounded">
          <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM19 13h2v2h-2zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2zM19 19h2v2h-2z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Avatar and Quote - Bottom Center */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-3">
          {/* Avatar with name */}
          <div className="bg-black bg-opacity-70 text-white px-2 py-1.5 rounded-full flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-white">Alex</span>
          </div>
          
          {/* Quote with same styling as avatar */}
          <div className="bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-full">
            <p className="text-xs text-gray-300" style={{ fontSize: '10px' }}>"Adventure is worthwhile in itself"</p>
          </div>
        </div>
      </div>

      {/* Brand Logo - Bottom Right */}
      <div className="absolute bottom-4 right-4">
        <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-xs">
          logo
        </div>
      </div>

      {/* Photo counter or status indicator - Top Right */}
      <div className="absolute top-4 right-4">
        <div className="w-6 h-6 border-2 border-white rounded-full">
        </div>
      </div>
    </div>
  );
}