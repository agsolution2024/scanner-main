import React from 'react';
import type { Metadata } from 'next';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'Component Showcase - Atomic Design System',
  description: 'A showcase of our atomic design system components',
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background px-container lg:px-container-lg py-4 shadow">
        <div className="mx-auto max-w-4xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Atomic Design System</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              A showcase of our reusable components built with React and Tailwind CSS
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="px-container lg:px-container-lg py-8">
        {children}
      </main>
    </div>
  );
} 