'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Share2, Copy, Download, ExternalLink, Home, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as QRCode from 'qrcode';
import * as confetti from 'canvas-confetti';

export default function TryItOut() {
  const router = useRouter();
  const [eventData, setEventData] = useState<any>({});
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiInstanceRef = useRef<any>(null);

  const eventUrl = 'https://app.snapscreen.co/event/7HS-SDF-3NK';
  const galleryUrl = 'https://gallery.snapscreen.co/event/7HS-SDF-3NK';

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Load event data
    const eventBasics = localStorage.getItem('eventBasicsData');
    if (eventBasics) {
      setEventData(JSON.parse(eventBasics));
    }

    // Generate QR code
    generateQRCode();

    // Fire confetti when page loads
    if (canvasRef.current) {
      confettiInstanceRef.current = (confetti as any).create(canvasRef.current, {
        resize: true,
        useWorker: true
      });

      // Fire confetti burst
      confettiInstanceRef.current({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Clean up after 3 seconds
      timeoutId = setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.display = 'none';
        }
      }, 3000);
    }

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (confettiInstanceRef.current && typeof confettiInstanceRef.current.reset === 'function') {
        confettiInstanceRef.current.reset();
      }
    };
  }, []);

  const generateQRCode = async () => {
    try {
      const qrDataUrl = await QRCode.toDataURL(eventUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyGalleryLink = () => {
    navigator.clipboard.writeText(galleryUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVisitEventPage = () => {
    window.open(eventUrl, '_blank');
  };

  const handleDownloadQR = () => {
    if (qrCodeUrl) {
      // Convert data URL to blob
      fetch(qrCodeUrl)
        .then(res => res.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'event-qr-code.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch(error => {
          console.error('Error downloading QR code:', error);
        });
    }
  };

  const handleGoHome = () => {
    // Clear localStorage and go to events page
    localStorage.removeItem('eventBasicsData');
    localStorage.removeItem('pageStyleData');
    localStorage.removeItem('marketingData');
    router.push('/events');
  };

  return (
    <div className="relative space-y-8">
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-50"
        style={{ zIndex: 9999 }}
      />

      {/* Full Width Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Event Created Successfully!</h2>
        <p className="text-gray-600 mt-2">Your event "{eventData.eventName || 'New Event'}" is now live and ready to share</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - What's Next */}
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">What's Next?</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-medium">1</span>
                </div>
                <div>
                  <p className="font-medium text-green-900">Share your event link</p>
                  <p className="text-sm text-green-700">Send the link to your guests so they can access the event page</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-medium">2</span>
                </div>
                <div>
                  <p className="font-medium text-green-900">Upload your photos</p>
                  <p className="text-sm text-green-700">Add photos to your event gallery for guests to view and download</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-medium">3</span>
                </div>
                <div>
                  <p className="font-medium text-green-900">Monitor engagement</p>
                  <p className="text-sm text-green-700">Track views, downloads, and guest activity through your dashboard</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-medium">4</span>
                </div>
                <div>
                  <p className="font-medium text-green-900">Go to Events Dashboard</p>
                  <p className="text-sm text-green-700">Manage all your events from your dashboard</p>
                  <Button
                    onClick={handleGoHome}
                    className="flex items-center space-x-2 mt-2 px-4 py-2 text-sm"
                  >
                    <Home className="w-4 h-4" />
                    <span>Go to Events Dashboard</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Event Details</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Event ID:</span>
                  <span className="ml-2 font-mono text-gray-900">7HS-SDF-3NK</span>
                </div>
                <div>
                  <span className="text-gray-600">Created:</span>
                  <span className="ml-2 text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
                <div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-600">Event Start Time:</span>
                      <span className="ml-2 text-gray-900">
                        {eventData.startTime && eventData.startDate 
                          ? `${eventData.startTime}, ${new Date(eventData.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`
                          : '18:00, 15 July, 2024'
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Event End Time:</span>
                      <span className="ml-2 text-gray-900">
                        {eventData.endTime && eventData.endDate 
                          ? `${eventData.endTime}, ${new Date(eventData.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`
                          : '22:00, 15 July, 2024'
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Uploads Accepted from:</span>
                      <span className="ml-2 text-gray-900">
                        {eventData.submissionOpenTime && eventData.submissionOpenDate 
                          ? `${eventData.submissionOpenTime}, ${new Date(eventData.submissionOpenDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`
                          : '18:00, 15 July, 2024'
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Uploads Close:</span>
                      <span className="ml-2 text-gray-900">
                        {eventData.submissionCloseTime && eventData.submissionCloseDate 
                          ? `${eventData.submissionCloseTime}, ${new Date(eventData.submissionCloseDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`
                          : '22:00, 15 July, 2024'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="link" className="w-full justify-start text-sm text-blue-600 hover:text-blue-800 p-0 h-auto">
                  View Event Dashboard
                </Button>
                <Button variant="link" className="w-full justify-start text-sm text-blue-600 hover:text-blue-800 p-0 h-auto">
                  Upload Photos
                </Button>
                <Button variant="link" className="w-full justify-start text-sm text-blue-600 hover:text-blue-800 p-0 h-auto">
                  Edit Event Settings
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Share Your Event */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              Share Your Event Upload Page
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={eventUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-blue-300 rounded-md bg-white text-sm"
                />
                <Button
                  onClick={handleCopyLink}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                  onClick={handleVisitEventPage}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Event Page</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                  onClick={handleDownloadQR}
                >
                  <Download className="w-4 h-4" />
                  <span>Download QR Code</span>
                </Button>
              </div>

              {/* QR Code Display */}
              {qrCodeUrl && (
                <div className="mt-6 text-center">
                  <div className="inline-block p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                    <img 
                      src={qrCodeUrl} 
                      alt="Event QR Code" 
                      className="w-48 h-48 mx-auto"
                    />
                    <p className="text-xs text-gray-600 mt-2">Scan to access event</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Display your gallery */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              Display your gallery
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={galleryUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-purple-300 rounded-md bg-white text-sm"
                />
                <Button
                  onClick={handleCopyGalleryLink}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                  onClick={() => window.open(galleryUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Gallery Page</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}