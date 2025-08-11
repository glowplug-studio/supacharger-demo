'use client';

import PhonePreviewContent from './PhonePreviewContent';

export default function PhonePreview() {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8 h-full" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
          <div className="flex justify-center">
            <div className="w-64 h-[500px] bg-black rounded-[2rem] p-2 shadow-xl">
              <div className="w-full h-full bg-gray-100 rounded-[1.5rem] overflow-hidden">
                <PhonePreviewContent />
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}