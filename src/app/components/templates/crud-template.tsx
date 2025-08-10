'use client';

import React from 'react';
import { Typography } from '@/app/components/atoms/typography';
import { TabGroup } from '@/app/components/molecules/tab-group';

interface CrudTemplateProps {
  title: string;
  tabs?: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const CrudTemplate: React.FC<CrudTemplateProps> = ({
  title,
  tabs,
  activeTab,
  onTabChange,
  actions,
  children,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Typography variant="h1">{title}</Typography>
        {actions}
      </div>

      {tabs && activeTab && onTabChange && (
        <TabGroup
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          className="mb-6"
        />
      )}

      {children}
    </div>
  );
}; 