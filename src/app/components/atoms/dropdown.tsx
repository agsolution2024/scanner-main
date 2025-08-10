'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  menuClassName?: string;
}

const widthStyles = {
  auto: 'w-auto',
  sm: 'w-48',
  md: 'w-56',
  lg: 'w-64',
  full: 'w-full'
};

export const Dropdown = ({
  trigger,
  items,
  align = 'left',
  width = 'md',
  className,
  menuClassName
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5',
            align === 'left' ? 'left-0' : 'right-0',
            widthStyles[width],
            menuClassName
          )}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
          >
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                className={cn(
                  'flex w-full items-center px-4 py-2 text-sm text-gray-700',
                  'hover:bg-gray-100 hover:text-gray-900',
                  'focus:bg-gray-100 focus:text-gray-900 focus:outline-none',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  item.disabled && 'cursor-not-allowed opacity-50'
                )}
                disabled={item.disabled}
                role="menuitem"
              >
                {item.icon && (
                  <span className="mr-2 h-4 w-4">{item.icon}</span>
                )}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown; 