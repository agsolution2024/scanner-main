'use client';

import React, { useState } from 'react';
import Button from '@/app/components/atoms/button';
import Typography from '@/app/components/atoms/typography';
import { Card } from '@/components/ui/card';

const CameraTest = () => {
  const [result, setResult] = useState<string>('');
  const [isTestingBasic, setIsTestingBasic] = useState(false);
  const [isTestingQrScanner, setIsTestingQrScanner] = useState(false);

  const testBasicCamera = async () => {
    setIsTestingBasic(true);
    try {
      setResult('Testing basic camera access...');
      console.log('=== Basic Camera Test ===');
      
      // Test basic camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      console.log('✅ Basic camera access successful!', stream);
      setResult('✅ Basic camera access successful!');
      
      // Stop the stream
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('❌ Basic camera error:', error);
      setResult(`❌ Basic camera error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsTestingBasic(false);
    }
  };

  const testQrScannerLibrary = async () => {
    setIsTestingQrScanner(true);
    try {
      setResult('Testing QR Scanner library...');
      console.log('=== QR Scanner Library Test ===');
      
      // Check if QrScanner is available using dynamic import
      console.log('Attempting dynamic import of qr-scanner...');
      const QrScannerModule = await import('qr-scanner');
      const QrScanner = QrScannerModule.default;
      console.log('QrScanner imported successfully:', QrScanner);
      
      // Test QrScanner hasCamera
      console.log('Testing QrScanner.hasCamera()...');
      const hasCamera = await QrScanner.hasCamera();
      console.log('QrScanner.hasCamera():', hasCamera);
      
      if (hasCamera) {
        setResult('✅ QR Scanner library working and camera detected!');
      } else {
        setResult('⚠️ QR Scanner library loaded but no camera detected');
      }
    } catch (error) {
      console.error('❌ QR Scanner library error:', error);
      const errorMsg = error instanceof Error ? error.message : String(error);
      setResult(`❌ QR Scanner library error: ${errorMsg}`);
      
      // Additional debugging for chunk loading errors
      if (errorMsg.includes('Loading chunk') || errorMsg.includes('404')) {
        console.error('This appears to be a chunk loading error - check network tab');
        setResult(`❌ QR Scanner library failed to load (chunk error): ${errorMsg}`);
      }
    } finally {
      setIsTestingQrScanner(false);
    }
  };

  const runFullDiagnostic = async () => {
    setResult('Running full diagnostic...');
    console.log('=== Full Camera Diagnostic ===');
    
    // Environment info
    const envInfo = {
      userAgent: navigator.userAgent,
      isSecureContext: window.isSecureContext,
      location: window.location.href,
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      hasGetUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
      permissions: 'permissions' in navigator
    };
    
    console.log('Environment:', envInfo);
    
    // Check permissions
    if (navigator.permissions) {
      try {
        const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
        console.log('Camera permission:', cameraPermission.state);
      } catch (error) {
        console.log('Permission check error:', error);
      }
    }
    
    // Check devices
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      console.log('Video devices found:', videoDevices.length);
      console.log('Video devices:', videoDevices);
    } catch (error) {
      console.log('Device enumeration error:', error);
    }
    
    setResult('✅ Full diagnostic complete - check console for details');
  };

  return (
    <Card className="p-4 mb-4 bg-blue-50 dark:bg-blue-900/20">
      <Typography variant="h4" className="mb-4">Camera Diagnostic Tool</Typography>
      
      <div className="space-y-3">
        <Button 
          onClick={testBasicCamera} 
          disabled={isTestingBasic}
          className="w-full"
        >
          {isTestingBasic ? 'Testing...' : 'Test Basic Camera Access'}
        </Button>
        
        <Button 
          onClick={testQrScannerLibrary} 
          disabled={isTestingQrScanner}
          variant="outline"
          className="w-full"
        >
          {isTestingQrScanner ? 'Testing...' : 'Test QR Scanner Library'}
        </Button>
        
        <Button 
          onClick={runFullDiagnostic}
          variant="outline"
          className="w-full"
        >
          Run Full Diagnostic
        </Button>
      </div>
      
      {result && (
        <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border">
          <Typography variant="body2">{result}</Typography>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-600 dark:text-gray-400">
        💡 Open browser console (F12) to see detailed logs
      </div>
    </Card>
  );
};

export default CameraTest;
