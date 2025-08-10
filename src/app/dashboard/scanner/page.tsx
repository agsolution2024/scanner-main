'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import DashboardLayout from '@/app/components/templates/dashboard-layout';
import QRScanner from '@/app/components/organisms/qr-scanner';

export default function ScannerPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <DashboardLayout currentPage="scanner">
      <QRScanner />
    </DashboardLayout>
  );
}
