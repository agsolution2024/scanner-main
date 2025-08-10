'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import DashboardLayout from '@/app/components/templates/dashboard-layout';
import AttendeesList from '@/app/components/organisms/attendees-list';
import { AttendeesPageSkeleton } from '@/app/components/molecules/attendees-skeleton';

export default function AttendeesPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      // Simulate page loading
      const timer = setTimeout(() => {
        setIsPageLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <DashboardLayout currentPage="attendees">
      {isPageLoading ? <AttendeesPageSkeleton /> : <AttendeesList />}
    </DashboardLayout>
  );
}
