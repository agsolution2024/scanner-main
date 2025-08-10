'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import Typography from '@/app/components/atoms/typography';
import { Info, Smartphone, Globe } from 'lucide-react';

const CameraTroubleshooting = () => {
  const getBrowserInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('chrome') && userAgent.includes('mobile')) {
      return {
        browser: 'Chrome Mobile',
        icon: <Globe className="h-5 w-5" />,
        steps: [
          'Tap the camera icon in the address bar',
          'Select "Allow" for camera access',
          'If blocked, tap the lock icon → Site settings → Camera → Allow',
          'Refresh the page'
        ]
      };
    } else if (userAgent.includes('safari') && userAgent.includes('mobile')) {
      return {
        browser: 'Safari Mobile',
        icon: <Globe className="h-5 w-5" />,
        steps: [
          'Tap the "aA" icon in the address bar',
          'Select "Website Settings"',
          'Enable Camera access',
          'Refresh the page'
        ]
      };
    } else if (userAgent.includes('firefox') && userAgent.includes('mobile')) {
      return {
        browser: 'Firefox Mobile',
        icon: <Globe className="h-5 w-5" />,
        steps: [
          'Tap the shield icon in the address bar',
          'Turn off "Enhanced Tracking Protection" for this site',
          'Allow camera access when prompted',
          'Refresh the page'
        ]
      };
    } else {
      return {
        browser: 'Mobile Browser',
        icon: <Globe className="h-5 w-5" />,
        steps: [
          'Look for a camera icon in the address bar',
          'Allow camera access when prompted',
          'Check browser settings for camera permissions',
          'Refresh the page after granting permission'
        ]
      };
    }
  };

  const browserInfo = getBrowserInstructions();

  return (
    <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="space-y-3">
          <Typography variant="body2" className="font-medium text-blue-900 dark:text-blue-100">
            Camera Access Troubleshooting
          </Typography>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {browserInfo.icon}
              <Typography variant="body2" className="font-medium text-blue-800 dark:text-blue-200">
                {browserInfo.browser} Instructions:
              </Typography>
            </div>
            
            <ol className="list-decimal list-inside space-y-1 ml-7">
              {browserInfo.steps.map((step, index) => (
                <li key={index} className="text-sm text-blue-700 dark:text-blue-300">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <Typography variant="body2" className="font-medium text-blue-800 dark:text-blue-200">
                General Mobile Tips:
              </Typography>
            </div>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Ensure you&apos;re using HTTPS (secure connection)</li>
              <li>• Try refreshing the page after granting permission</li>
              <li>• Close other apps that might be using the camera</li>
              <li>• Try switching to a different browser if issues persist</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CameraTroubleshooting;
