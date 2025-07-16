'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PreviewTabs from '@/components/PreviewTabs';
import { useGlobalState } from '@/hooks/useGlobalState';

export default function Review() {
  const router = useRouter();
  const [eventData, setEventData] = useState<any>({});
  const { proActive, unlimitedActive, gallerySubscription, extendedGallerySubscription } = useGlobalState();

  useEffect(() => {
    // Load event data
    const eventBasics = localStorage.getItem('eventBasicsData');
    if (eventBasics) {
      setEventData(JSON.parse(eventBasics));
    }
  }, []);

  const handleGoBack = () => {
    router.push('/create-event/marketing');
  };

  const handleTryItOut = () => {
    router.push('/create-event/try-it-out');
  };

  const handlePay = () => {
    // Handle payment processing
    console.log('Processing payment...');
    // After successful payment, redirect to try-it-out
    router.push('/create-event/try-it-out');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Order Summary */}
      <div className="lg:col-span-2">
        <div className="max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={handleGoBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go back and make changes</span>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Almost There</h1>
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
            
            {/* One Offs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">One Offs</h3>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">
                  {unlimitedActive ? 'Unlimited Event' : 'Pro Event'}
                </span>
                <span className="text-xl font-bold">
                  {unlimitedActive ? '50 USD' : '25 USD'}
                </span>
              </div>
              
              {!proActive && !unlimitedActive && !gallerySubscription && (
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Free Event</span>
                  <span className="text-xl font-bold">0 USD</span>
                </div>
              )}
            </div>

            {/* Subscription */}
            {!unlimitedActive && (gallerySubscription || extendedGallerySubscription) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription</h3>
                
                <div className="space-y-4">
                  {/* Extended Gallery Subscription */}
                  {extendedGallerySubscription && (
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-gray-700">
                          {extendedGallerySubscription === 'free-extended' ? 'Extended Gallery (Free + 12 months)' :
                           extendedGallerySubscription === 'pro-extended' ? 'Pro Extended Gallery (Pro + 12 months)' :
                           'Extended Gallery'}
                        </div>
                        <div className="text-sm text-gray-500">
                          Start: 08:30 25th Feb 2024<br/>
                          Renew: 08:30 25th Feb 2025
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">36 USD</div>
                        <div className="text-sm text-gray-500">/ Year</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Regular Gallery Subscription (if any) */}
                  {gallerySubscription && (
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-gray-700">
                          {gallerySubscription === 'free-12-months' ? 'Free Gallery (12 months)' :
                           gallerySubscription === 'pro-12-months' ? 'Pro Gallery (12 months)' :
                           gallerySubscription === 'unlimited-12-months' ? 'Unlimited Gallery (12 months)' :
                           'Gallery Subscription'}
                        </div>
                        <div className="text-sm text-gray-500">
                          Start: 08:30 25th Feb 2024<br/>
                          Renew: 08:30 25th Feb 2025
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">36 USD</div>
                        <div className="text-sm text-gray-500">/ Year</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Total */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Total</span>
                <span className="text-2xl font-bold">
                  {(() => {
                    let total = 0;
                    
                    // Add Pro Event cost if any pro/unlimited features are active
                    if (unlimitedActive) {
                      total += 50;
                    } else if (proActive) {
                      total += 25;
                    }
                    
                    // Add subscription costs (only if not unlimited)
                    if (!unlimitedActive && gallerySubscription) {
                      total += 36;
                    }
                    
                    if (!unlimitedActive && extendedGallerySubscription) {
                      total += 36;
                    }
                    
                    return total === 0 ? '0 USD' : `${total} USD`;
                  })()}
                </span>
              </div>
              
              {(() => {
                let total = 0;
                if (unlimitedActive) {
                  total += 50;
                } else if (proActive) {
                  total += 25;
                }
                if (!unlimitedActive && gallerySubscription) total += 36;
                if (!unlimitedActive && extendedGallerySubscription) total += 36;
                return total > 0;
              })() ? (
                <Button
                  onClick={handlePay}
                  className="w-full py-4 text-lg font-medium"
                  size="lg"
                >
                  Pay
                </Button>
              ) : (
                <Button
                  onClick={handleTryItOut}
                  className="w-full py-4 text-lg font-medium"
                  size="lg"
                >
                  Create Free Event
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Column - Preview Tabs */}
      <div className="lg:col-span-1">
        <PreviewTabs />
      </div>
    </div>
  );
}