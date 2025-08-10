'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import DashboardLayout from '../../components/templates/dashboard-layout';
import QRCodeGenerator from '@/app/components/organisms/qr-generator';
import { QRGeneratorPageSkeleton } from '@/app/components/molecules/qr-generator-skeleton';

export default function QRGeneratorPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'admin') {
      router.push('/dashboard/attendees');
    } else {
      // Simulate page loading
      const timer = setTimeout(() => {
        setIsPageLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null; // Will redirect
  }

  return (
    <DashboardLayout currentPage="attendees">
      {isPageLoading ? <QRGeneratorPageSkeleton /> : <QRCodeGenerator />}
    </DashboardLayout>
  );
}
