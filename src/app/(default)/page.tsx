'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import Typography from "@/app/components/atoms/typography";

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <img
              src="/rrhi_logo.png"
              alt="RRHI Logo"
              className="mx-auto h-16 w-auto"
            />
          </div>
          <Typography variant="h4" className="text-gray-800 mb-2">
            Getting Ready
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            We&apos;re setting things up for you...
          </Typography>
        </div>

        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
} 