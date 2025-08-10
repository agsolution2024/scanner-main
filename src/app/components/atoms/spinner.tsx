'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'white';
}

const sizeStyles = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-3'
};

const variantStyles = {
  primary: 'border-primary-200 border-t-primary-600',
  secondary: 'border-gray-200 border-t-gray-600',
  white: 'border-white/30 border-t-white'
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ 
    size = 'md',
    variant = 'primary',
    className,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-block animate-spin rounded-full',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

export default Spinner; 