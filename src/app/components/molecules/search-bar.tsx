'use client';

import React from 'react';
import { Input } from '@/app/components/atoms/input';
import { Button } from '@/app/components/atoms/button';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  showSearchButton?: boolean;
  showClearButton?: boolean;
  className?: string;
  inputClassName?: string;
}

export const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  ({
    value,
    onChange,
    onSearch,
    placeholder = 'Search...',
    showSearchButton = true,
    showClearButton = true,
    className,
    inputClassName,
    ...props
  }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch();
      }
    };

    const handleClear = () => {
      onChange('');
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-2 items-center',
          className
        )}
      >
        <div className="relative flex-1">
          <Input
            {...props}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              'pl-10',
              inputClassName
            )}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          {showClearButton && value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {showSearchButton && onSearch && (
          <Button onClick={onSearch}>
            Search
          </Button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar'; 