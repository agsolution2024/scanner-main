'use client';

import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  username?: string;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
 
      <main className="mx-auto max-w-7xl px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;