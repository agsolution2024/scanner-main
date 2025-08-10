'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useAttendeeStore } from '@/stores/attendee';
import Button from '@/app/components/atoms/button';
import Typography from '@/app/components/atoms/typography';
import CameraTroubleshooting from '@/app/components/molecules/camera-troubleshooting';
import CameraTest from '@/app/components/molecules/camera-test';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Camera, CameraOff } from 'lucide-react';

// Use the actual QrScanner types - let TypeScript infer them
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let QrScannerClass: any = null;

const QRScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const qrScannerRef = useRef<any>(null);
  const lastScannedRef = useRef<string>('');
  const lastScanTimeRef = useRef<number>(0);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualQrCode, setManualQrCode] = useState('');
  const [cameraError, setCameraError] = useState<string>('');
  const { markPresent, validateQRCode } = useAttendeeStore();

  const handleScan = useCallback((result: { data: string }) => {
    const qrCode = result.data;
    const currentTime = Date.now();
    
    // Prevent rapid successive scans of the same code (debounce)
    if (lastScannedRef.current === qrCode && currentTime - lastScanTimeRef.current < 2000) {
      return; // Ignore scan if same code was scanned within 2 seconds
    }
    
    lastScannedRef.current = qrCode;
    lastScanTimeRef.current = currentTime;
    
    // Use enhanced validation
    const validation = validateQRCode(qrCode);
    
    if (!validation.isValid) {
      toast.error(validation.errorMessage || 'Invalid QR code', {
        duration: 3000,
      });
      return;
    }

    // If validation passed, mark as present
    const success = markPresent(qrCode);
    
    if (success && validation.attendee) {
      toast.success(`Welcome ${validation.attendee.name}!`, {
        duration: 3000,
        icon: '🎉',
      });
    } else {
      // If markPresent failed, it means the attendee was already checked in
      // or there was an error. Re-validate to get the exact error message.
      const revalidation = validateQRCode(qrCode);
      toast.error(revalidation.errorMessage || 'Failed to check in', {
        duration: 3000,
      });
    }

    // Remove the timeout since toast handles auto-dismiss
  }, [markPresent, validateQRCode]);

  const startScanning = useCallback(async () => {
    if (!videoRef.current) {
      console.error('Video element not found');
      return;
    }

    // Reset states when starting
    setCameraError('');
    setIsLoading(true);

    // Check if QrScanner is available
    if (!QrScannerClass) {
      console.error('QrScanner library not loaded');
      const errorMsg = 'QR Scanner library failed to load. Please refresh the page.';
      setCameraError(errorMsg);
      toast.error(errorMsg);
      setHasCamera(false);
      setIsLoading(false);
      return;
    }

    try {
      // Check if element is still in DOM
      if (!document.contains(videoRef.current)) {
        console.warn('Video element not in DOM');
        return;
      }

      // Enhanced HTTPS check
      console.log('Security context check:', {
        isSecureContext: window.isSecureContext,
        protocol: window.location.protocol,
        hostname: window.location.hostname
      });

      if (!window.isSecureContext) {
        console.error('Camera access requires HTTPS');
        const errorMsg = 'Camera access requires HTTPS. Please use HTTPS to access this page.';
        setCameraError(errorMsg);
        toast.error(errorMsg);
        setHasCamera(false);
        setIsLoading(false);
        return;
      }

      // Check QrScanner capabilities
      console.log('QrScanner capabilities check...');
      if (!QrScannerClass) {
        console.error('QrScanner not loaded');
        setCameraError('QR Scanner library not loaded');
        setHasCamera(false);
        setIsLoading(false);
        return;
      }
      
      const hasCamera = await QrScannerClass.hasCamera();
      console.log('QrScanner.hasCamera():', hasCamera);
      
      if (!hasCamera) {
        console.log('No camera detected by QrScanner');
        setCameraError('No camera detected on this device');
        setHasCamera(false);
        setIsLoading(false);
        return;
      }

      // Enhanced permission request with more options
      console.log('Requesting camera permission...');
      try {
        const constraints = {
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };
        
        console.log('getUserMedia constraints:', constraints);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log('Camera permission granted, stream:', stream);
        
        // Log stream details
        const videoTracks = stream.getVideoTracks();
        console.log('Video tracks:', videoTracks.map(track => ({
          id: track.id,
          label: track.label,
          enabled: track.enabled,
          readyState: track.readyState,
          settings: track.getSettings()
        })));
        
        // Stop the stream immediately as QrScanner will handle it
        stream.getTracks().forEach(track => track.stop());
      } catch (permissionError) {
        console.error('Camera permission denied:', permissionError);
        console.error('Permission error details:', {
          name: permissionError instanceof Error ? permissionError.name : 'Unknown',
          message: permissionError instanceof Error ? permissionError.message : String(permissionError),
          stack: permissionError instanceof Error ? permissionError.stack : undefined
        });
        
        const errorMsg = 'Camera permission is required for QR scanning. Please allow camera access.';
        setCameraError(errorMsg);
        toast.error(errorMsg);
        setHasCamera(false);
        setIsLoading(false);
        return;
      }

      // Clean up any existing scanner
      if (qrScannerRef.current) {
        try {
          qrScannerRef.current.stop();
          qrScannerRef.current.destroy();
        } catch (error) {
          console.warn('Error cleaning up previous scanner:', error);
        }
      }

      console.log('Creating QrScanner instance...');
      if (!QrScannerClass) {
        console.error('QrScanner not available');
        setCameraError('QR Scanner library not loaded');
        setHasCamera(false);
        setIsLoading(false);
        return;
      }
      
      qrScannerRef.current = new QrScannerClass(
        videoRef.current,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any) => {
          console.log('QR Code scanned:', result);
          // Handle both string and ScanResult types
          const qrData = typeof result === 'string' ? result : result.data;
          handleScan({ data: qrData });
        },
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onDecodeError: (error: any) => {
            // Only log decode errors in development
            if (process.env.NODE_ENV === 'development') {
              console.debug('QR decode error (normal):', error);
            }
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: 'environment',
          maxScansPerSecond: 5,
        }
      );

      console.log('Starting QrScanner...');
      await qrScannerRef.current.start();
      console.log('QrScanner started successfully');
      
      setIsScanning(true);
      setIsLoading(false);
      setCameraError(''); // Clear any previous errors
      toast.success('Camera started successfully!', { duration: 2000 });
    } catch (error) {
      console.error('Error starting QR scanner:', error);
      console.error('Error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      let userMessage = '';
      
      if (errorMessage.includes('NotAllowedError') || errorMessage.includes('Permission')) {
        userMessage = 'Camera permission denied. Please allow camera access and try again.';
      } else if (errorMessage.includes('NotFoundError')) {
        userMessage = 'No camera found on this device.';
      } else if (errorMessage.includes('NotSupportedError')) {
        userMessage = 'Camera not supported on this device/browser.';
      } else if (errorMessage.includes('NotReadableError')) {
        userMessage = 'Camera is already in use by another application.';
      } else if (errorMessage.includes('OverconstrainedError')) {
        userMessage = 'Camera constraints not supported. Trying with basic settings...';
        // Try again with basic constraints
        setTimeout(() => startScanning(), 1000);
        return;
      } else {
        userMessage = `Failed to start camera: ${errorMessage}`;
      }
      
      setCameraError(userMessage);
      toast.error(userMessage);
      setHasCamera(false);
      setIsLoading(false);
    }
  }, [handleScan]);

  // Auto-start camera when component mounts
  useEffect(() => {
    let mounted = true;
    
    const loadQrScanner = async () => {
      try {
        console.log('Loading QR Scanner library...');
        const QrScannerModule = await import('qr-scanner');
        console.log('QR Scanner library loaded successfully');
        
        if (mounted) {
          QrScannerClass = QrScannerModule.default;
        }
      } catch (error) {
        console.error('Failed to load QR Scanner library:', error);
        if (mounted) {
          setCameraError('Failed to load QR Scanner library. Please refresh the page.');
          setHasCamera(false);
          setIsLoading(false);
        }
      }
    };
    
    const initializeCamera = async () => {
      if (!mounted) return;
      
      // Enhanced debug information
      console.log('=== QR Scanner Debug Info ===');
      console.log('Environment:', {
        userAgent: navigator.userAgent,
        isSecureContext: window.isSecureContext,
        location: window.location.href,
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        hasGetUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
        hasVideoElement: !!videoRef.current,
        isVideoInDOM: videoRef.current ? document.contains(videoRef.current) : false,
        nodeEnv: process.env.NODE_ENV
      });

      // Check camera permissions status
      if (navigator.permissions) {
        try {
          const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });
          console.log('Camera permission status:', cameraPermission.state);
        } catch (error) {
          console.log('Unable to check camera permissions:', error);
        }
      }

      // Check available devices
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('Available video devices:', videoDevices.length);
        console.log('Video devices:', videoDevices.map(d => ({ deviceId: d.deviceId, label: d.label })));
      } catch (error) {
        console.log('Unable to enumerate devices:', error);
      }
      
      // Small delay to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!mounted) return;
      
      try {
        await startScanning();
      } catch (error) {
        console.error('Failed to initialize camera:', error);
        if (mounted) {
          setHasCamera(false);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Load QR Scanner first, then initialize camera
    loadQrScanner().then(() => {
      if (mounted) {
        initializeCamera();
      }
    });

    return () => {
      mounted = false;
      if (qrScannerRef.current) {
        try {
          qrScannerRef.current.stop();
          qrScannerRef.current.destroy();
        } catch (error) {
          console.error('Error cleaning up scanner:', error);
        }
        qrScannerRef.current = null;
      }
    };
  }, [startScanning]);

  const stopScanning = () => {
    if (qrScannerRef.current) {
      try {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      } catch (error) {
        console.warn('Error stopping scanner:', error);
      }
      qrScannerRef.current = null;
      setIsScanning(false);
    }
  };

  const openManualInput = () => {
    setManualQrCode('');
    setIsManualModalOpen(true);
  };

  const handleManualSubmit = () => {
    if (manualQrCode.trim()) {
      handleScan({ data: manualQrCode.trim() });
      setIsManualModalOpen(false);
      setManualQrCode('');
    }
  };

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleManualSubmit();
    }
  };

  if (!hasCamera) {
    return (
      <div className="h-full">
        <div className="max-w-md mx-auto p-6">
          <Card className="p-6 text-center">
            <CameraOff className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <Typography variant="h3" className="mb-4">
              Camera Not Available
            </Typography>
            <Typography variant="body1" className="mb-6 text-gray-600">
              {cameraError || 'Unable to access camera for QR scanning. You can still enter QR codes manually.'}
            </Typography>
            
            <div className="mb-6">
              <CameraTest />
            </div>
            
            <div className="mb-6">
              <CameraTroubleshooting />
            </div>
            
            {cameraError.includes('permission') && (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <Typography variant="body2" className="text-yellow-800 dark:text-yellow-200">
                  💡 To enable camera access:
                  <br />• Look for a camera icon in your browser&apos;s address bar
                  <br />• Go to browser settings and allow camera for this site
                  <br />• Refresh the page after granting permission
                </Typography>
              </div>
            )}
            <div className="space-y-3">
              <Button onClick={startScanning} className="w-full">
                Try Camera Again
              </Button>
              <Button onClick={openManualInput} variant="outline" className="w-full">
                Enter QR Code Manually
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="max-w-md mx-auto p-6">
        <div className="text-center mb-6">
          <Typography variant="h2" className="mb-2 text-gray-900 dark:text-white">
            QR Scanner
          </Typography>
          <Typography variant="body1" className="text-gray-600 dark:text-gray-300">
            {isScanning ? 'Point your camera at a QR code' : 'Setting up camera...'}
          </Typography>
        </div>

      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="relative mb-6">
          <video
            ref={videoRef}
            className="w-full h-64 object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
            autoPlay
            playsInline
            muted
          />
          
          {/* Scanning overlay */}
          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 border-2 border-white dark:border-gray-200 rounded-lg opacity-80">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-red-500 dark:border-red-400 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-red-500 dark:border-red-400 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-red-500 dark:border-red-400 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-red-500 dark:border-red-400 rounded-br-lg"></div>
                
                {/* Scanning line animation */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 dark:via-red-400 to-transparent animate-pulse"></div>
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4 animate-pulse" />
                <Typography variant="body1" className="text-gray-500 dark:text-gray-400">
                  Initializing camera...
                </Typography>
              </div>
            </div>
          )}

          {!isScanning && !isLoading && !hasCamera && (
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <CameraOff className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                <Typography variant="body1" className="text-gray-500 dark:text-gray-400 mb-4">
                  Camera failed to start
                </Typography>
                <Button onClick={startScanning} size="sm">
                  <Camera className="mr-2 h-4 w-4" />
                  Retry Camera
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {isScanning && (
            <div className="text-center">
              <Typography variant="body2" className="text-green-600 dark:text-green-400 font-medium">
                🎯 Camera is active - Point at QR code to scan
              </Typography>
              <Button onClick={stopScanning} variant="outline" className="mt-3 w-full" size="sm">
                <CameraOff className="mr-2 h-4 w-4" />
                Stop Camera
              </Button>
            </div>
          )}

          <Button onClick={openManualInput} variant="outline" className="w-full">
            Enter QR Code Manually
          </Button>
        </div>
      </Card>
      </div>

      {/* Manual QR Code Input Modal */}
      <Dialog open={isManualModalOpen} onOpenChange={setIsManualModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter QR Code Manually</DialogTitle>
            <DialogDescription>
              Type or paste the QR code content below to check in the attendee.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter QR code here..."
              value={manualQrCode}
              onChange={(e) => setManualQrCode(e.target.value)}
              onKeyDown={handleModalKeyDown}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsManualModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleManualSubmit}
              disabled={!manualQrCode.trim()}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QRScanner;
