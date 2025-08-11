'use client';

import { usePathname } from 'next/navigation';

import Header from '@/components/Header';
import PhonePreview from '@/components/PhonePreview';
import ProgressBar from '@/components/ProgressBar';
import TVPreview from '@/components/TVPreview';

interface EventLayoutProps {
  children: React.ReactNode;
}

export default function EventLayout({ children }: EventLayoutProps) {
  const pathname = usePathname();
  
  // Determine which preview to show based on the current page
  const showPhonePreview = pathname === '/create-event/event-basics' || pathname === '/create-event/page-style';
  const showTVPreview = pathname === '/create-event/slideshow-settings';
  const showNoPreview = pathname === '/create-event/marketing' || pathname === '/create-event/review' || pathname === '/create-event/try-it-out' || pathname === '/create-event/confirmation';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProgressBar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${showNoPreview ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          {/* Form Column */}
          <div className={showNoPreview ? '' : 'lg:col-span-2'}>
            <div className="p-6">
            {children}
            </div>
          </div>

          {/* Preview Column - conditionally render based on page */}
          {showPhonePreview && <PhonePreview />}
          {showTVPreview && <TVPreview />}
        </div>
      </main>
    </div>
  );
}