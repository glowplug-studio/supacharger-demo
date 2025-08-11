'use client';

interface BackgroundProps {
  backgroundColor: string;
  backgroundImageUrl: string;
  backgroundBlur?: number;
  children: React.ReactNode;
}

export default function PhonePreviewBackground({
  backgroundColor,
  backgroundImageUrl,
  backgroundBlur = 0,
  children
}: BackgroundProps) {
  // Determine if we should show checkered pattern (default state)
  const isDefaultBackground = (!backgroundColor || backgroundColor === '#ffffff') && !backgroundImageUrl;

  return (
    <div className="w-full h-full overflow-auto phone-preview-scroll relative">
      {/* Background Layer */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: isDefaultBackground ? 'transparent' : (backgroundColor || '#ffffff'),
          backgroundImage: backgroundImageUrl 
            ? `url(${backgroundImageUrl})` 
            : isDefaultBackground
              ? `
                linear-gradient(45deg, rgba(200,200,200,0.5) 25%, transparent 25%), 
                linear-gradient(-45deg, rgba(200,200,200,0.5) 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, rgba(200,200,200,0.5) 75%), 
                linear-gradient(-45deg, transparent 75%, rgba(200,200,200,0.5) 75%)
              `
              : 'none',
          backgroundSize: backgroundImageUrl 
            ? 'cover' 
            : isDefaultBackground 
              ? '20px 20px' 
              : 'auto',
          backgroundPosition: backgroundImageUrl 
            ? 'center' 
            : isDefaultBackground 
              ? '0 0, 0 10px, 10px -10px, -10px 0px' 
              : 'initial',
          backgroundRepeat: backgroundImageUrl ? 'no-repeat' : 'repeat',
          transition: 'background-color 0.3s ease, background-image 0.3s ease, filter 0.3s ease',
          filter: backgroundImageUrl && backgroundBlur > 0 ? `blur(${backgroundBlur}px)` : 'none'
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10 space-y-4 p-1">
        {children}
      </div>
    </div>
  );
}