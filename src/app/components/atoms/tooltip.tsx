'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverPlacement } from './popover';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: PopoverPlacement;
  className?: string;
  contentClassName?: string;
  delay?: number;
  arrow?: boolean;
}

export const Tooltip = ({
  content,
  children,
  placement = 'top',
  className,
  contentClassName,
  delay = 200,
  arrow = true
}: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Popover
      trigger={
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={className}
        >
          {children}
        </div>
      }
      content={
        <div className={cn('px-2 py-1 text-sm', contentClassName)}>
          {content}
        </div>
      }
      placement={placement}
      open={isOpen}
      onOpenChange={setIsOpen}
      arrow={arrow}
      offset={4}
      closeOnClickOutside={false}
      closeOnEscape={true}
    />
  );
};

export default Tooltip; 