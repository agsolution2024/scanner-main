'use client';

import React from 'react';
import { 
  Breadcrumb,
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <Breadcrumb className={className}>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          <BreadcrumbItem className="flex items-center">
            <BreadcrumbLink href={item.href} className="flex items-center">
              {item.icon && (
                <span className="mr-2 flex items-center">{item.icon}</span>
              )}
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground">{item.label}</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {index < items.length - 1 && (
            <BreadcrumbSeparator className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            </BreadcrumbSeparator>
          )}
        </React.Fragment>
      ))}
    </Breadcrumb>
  );
}; 