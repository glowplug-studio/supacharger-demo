'use client';

import { useEffect,useState } from 'react';
import { Download, X } from 'lucide-react';
import * as QRCode from 'qrcode';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
  uploadFormLink: string;
}

export default function QRModal({ isOpen, onClose, eventId, eventTitle, uploadFormLink }: QRModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && uploadFormLink) {
      generateQRCode();
    }
  }, [isOpen, uploadFormLink]);

  const generateQRCode = async () => {
    try {
      const qrDataUrl = await QRCode.toDataURL(uploadFormLink, {
        width: 300,
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

  const handleDownloadQR = () => {
    if (qrCodeUrl) {
      fetch(qrCodeUrl)
        .then(res => res.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${eventId}-qr-code.png`;
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>QR Code for {eventTitle}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          {qrCodeUrl ? (
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <img 
                src={qrCodeUrl} 
                alt="Event QR Code" 
                className="w-64 h-64"
              />
            </div>
          ) : (
            <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Generating QR code...</span>
            </div>
          )}
          
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Scan this QR code to access the event upload page
            </p>
            <p className="text-xs text-gray-500 font-mono">
              Event ID: {eventId}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleDownloadQR}
              disabled={!qrCodeUrl}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download QR Code</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}