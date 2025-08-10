'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

export type PopoverPlacement = 
  | 'top' 
  | 'top-start' 
  | 'top-end' 
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end' 
  | 'left' 
  | 'right';

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  placement?: PopoverPlacement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  contentClassName?: string;
  arrow?: boolean;
  offset?: number;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
}

const getPlacementStyles = (placement: PopoverPlacement, offset: number = 8) => {
  const base = 'absolute z-50';
  const placements = {
    'top': `bottom-full left-1/2 -translate-x-1/2 mb-${offset}`,
    'top-start': `bottom-full left-0 mb-${offset}`,
    'top-end': `bottom-full right-0 mb-${offset}`,
    'bottom': `top-full left-1/2 -translate-x-1/2 mt-${offset}`,
    'bottom-start': `top-full left-0 mt-${offset}`,
    'bottom-end': `top-full right-0 mt-${offset}`,
    'left': `right-full top-1/2 -translate-y-1/2 mr-${offset}`,
    'right': `left-full top-1/2 -translate-y-1/2 ml-${offset}`
  };

  return cn(base, placements[placement]);
};

const getArrowStyles = (placement: PopoverPlacement) => {
  const base = 'absolute h-2 w-2 rotate-45 bg-white';
  const placements = {
    'top': 'bottom-[-4px] left-1/2 -translate-x-1/2',
    'top-start': 'bottom-[-4px] left-4',
    'top-end': 'bottom-[-4px] right-4',
    'bottom': 'top-[-4px] left-1/2 -translate-x-1/2',
    'bottom-start': 'top-[-4px] left-4',
    'bottom-end': 'top-[-4px] right-4',
    'left': 'right-[-4px] top-1/2 -translate-y-1/2',
    'right': 'left-[-4px] top-1/2 -translate-y-1/2'
  };

  return cn(base, placements[placement]);
};

export const Popover = ({
  trigger,
  content,
  placement = 'bottom',
  open: controlledOpen,
  onOpenChange,
  className,
  contentClassName,
  arrow = true,
  offset = 2,
  closeOnClickOutside = true,
  closeOnEscape = true
}: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [isControlled, onOpenChange]);

  useEffect(() => {
    if (!open || !closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        handleOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, closeOnClickOutside, handleOpen]);

  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, handleOpen]);

  return (
    <div className={cn('relative inline-block', className)} ref={popoverRef}>
      <div onClick={() => handleOpen(!open)}>{trigger}</div>

      {open && (
        <div
          className={cn(
            'rounded-lg bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5',
            getPlacementStyles(placement, offset),
            contentClassName
          )}
          role="tooltip"
        >
          {arrow && (
            <div
              className={cn(
                getArrowStyles(placement),
                'border border-gray-200'
              )}
            />
          )}
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover; 