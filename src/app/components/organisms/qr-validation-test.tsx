'use client';

import React, { useState } from 'react';
import { useAttendeeStore } from '@/stores/attendee';
import Button from '@/app/components/atoms/button';
import Typography from '@/app/components/atoms/typography';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Attendee } from '@/types/attendee';

const QRValidationTest = () => {
  const [testCode, setTestCode] = useState('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errorMessage?: string;
    attendee?: Attendee;
  } | null>(null);
  const { validateQRCode } = useAttendeeStore();

  const testValidation = () => {
    if (!testCode.trim()) return;
    
    const result = validateQRCode(testCode);
    setValidationResult(result);
  };

  const testCodes = [
    'ATT001', // Valid - John Doe
    'ATT002', // Valid - Jane Smith
    'ATT003', // Invalid - Bob Johnson (already checked in)
    'ATT999', // Invalid - Not found
    'INVALID', // Invalid format
    '', // Empty
    'att001', // Valid but lowercase
  ];

  return (
    <Card className="p-6 max-w-md mx-auto">
      <Typography variant="h3" className="mb-4">QR Code Validation Test</Typography>
      
      <div className="space-y-4">
        <div>
          <Input
            placeholder="Enter QR code to test"
            value={testCode}
            onChange={(e) => setTestCode(e.target.value)}
            className="mb-2"
          />
          <Button onClick={testValidation} className="w-full">
            Test Validation
          </Button>
        </div>

        {validationResult && (
          <div className={`p-3 rounded-lg ${validationResult.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <Typography variant="body2" className={validationResult.isValid ? 'text-green-800' : 'text-red-800'}>
              <strong>Result:</strong> {validationResult.isValid ? 'Valid' : 'Invalid'}
            </Typography>
            {validationResult.errorMessage && (
              <Typography variant="body2" className="text-red-600 mt-1">
                <strong>Error:</strong> {validationResult.errorMessage}
              </Typography>
            )}
            {validationResult.attendee && (
              <Typography variant="body2" className="text-blue-600 mt-1">
                <strong>Attendee:</strong> {validationResult.attendee.name}
              </Typography>
            )}
          </div>
        )}

        <div>
          <Typography variant="h4" className="mb-2">Test Codes:</Typography>
          <div className="grid grid-cols-2 gap-2">
            {testCodes.map((code, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setTestCode(code)}
                className="text-xs"
              >
                {code || '(empty)'}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QRValidationTest;
