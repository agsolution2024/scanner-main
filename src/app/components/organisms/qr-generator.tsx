'use client';

import React, { useState } from 'react';
import Button from '@/app/components/atoms/button';
import Typography from '@/app/components/atoms/typography';
import { Card } from '@/components/ui/card';
import { useAttendeeStore } from '@/stores/attendee';
import { 
  QRGeneratorPageSkeleton, 
  QRCardSkeleton 
} from '@/app/components/molecules/qr-generator-skeleton';

const QRCodeGenerator = () => {
  const { attendees } = useAttendeeStore();
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = (qrCode: string) => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCode)}`;
    return qrCodeUrl;
  };

  const generateAllCodes = async () => {
    setIsGenerating(true);
    
    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const codes = attendees.map(attendee => attendee.qrCode);
    setGeneratedCodes(codes);
    setIsGenerating(false);
  };

  // Initialize component
  React.useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Show skeleton while loading
  if (isLoading) {
    return <QRGeneratorPageSkeleton />;
  }

  const downloadQRCode = (qrCode: string, attendeeName: string) => {
    const qrCodeUrl = generateQRCode(qrCode);
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${attendeeName}-${qrCode}.png`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <Typography variant="h2" className="mb-2">
          QR Code Generator
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Generate QR codes for testing the scanner
        </Typography>
      </div>

      <Card className="p-6 mb-6">
        <Button 
          onClick={generateAllCodes} 
          className="mb-4"
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate All QR Codes'}
        </Button>
        
        {isGenerating ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: Math.min(attendees.length, 6) }).map((_, index) => (
              <QRCardSkeleton key={index} />
            ))}
          </div>
        ) : generatedCodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendees.map((attendee) => (
              <Card key={attendee.id} className="p-4 text-center">
                <Typography variant="h6" className="mb-2">
                  {attendee.name}
                </Typography>
                <Typography variant="caption" className="text-gray-500 mb-4">
                  {attendee.qrCode}
                </Typography>
                <img
                  src={generateQRCode(attendee.qrCode)}
                  alt={`QR Code for ${attendee.name}`}
                  className="mx-auto mb-4"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadQRCode(attendee.qrCode, attendee.name)}
                  className="w-full"
                >
                  Download
                </Button>
              </Card>
            ))}
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
