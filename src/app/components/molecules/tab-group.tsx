'use client';

import React from 'react';
import { Button } from '@/app/components/atoms/button';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
}

const variantStyles = {
  default: {
    container: 'flex gap-4 mb-6',
    tab: 'px-4 py-2 rounded-lg',
    active: 'bg-primary text-white',
    inactive: 'hover:bg-gray-100',
  },
  pills: {
    container: 'flex gap-2 p-1 bg-gray-100 rounded-lg mb-6',
    tab: 'px-4 py-2 rounded-md',
    active: 'bg-white shadow',
    inactive: 'hover:bg-gray-200',
  },
  underline: {
    container: 'flex gap-4 border-b mb-6',
    tab: 'px-4 py-2 -mb-px border-b-2',
    active: 'border-primary text-primary',
    inactive: 'border-transparent hover:border-gray-300',
  },
};

export const TabGroup = React.forwardRef<HTMLDivElement, TabGroupProps>(
  ({ tabs, activeTab, onTabChange, variant = 'default', className, ...props }, ref) => {
    const styles = variantStyles[variant];

    return (
      <div
        ref={ref}
        className={cn(styles.container, className)}
        {...props}
      >
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            className={cn(
              styles.tab,
              tab.id === activeTab ? styles.active : styles.inactive,
              'flex items-center gap-2'
            )}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </div>
    );
  }
);

TabGroup.displayName = 'TabGroup'; 