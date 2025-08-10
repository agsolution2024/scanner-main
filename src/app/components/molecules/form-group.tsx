'use client';

import React from 'react';
import { Typography } from '@/app/components/atoms/typography';
import { cn } from '@/lib/utils';

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ label, htmlFor, error, required, helperText, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        <label htmlFor={htmlFor} className="block">
          <Typography variant="body2" className="inline-flex gap-1">
            {label}
            {required && <span className="text-red-500">*</span>}
          </Typography>
        </label>
        {children}
        {(error || helperText) && (
          <Typography
            variant="caption"
            className={cn(
              error ? 'text-red-500' : 'text-gray-500'
            )}
          >
            {error || helperText}
          </Typography>
        )}
      </div>
    );
  }
);

FormGroup.displayName = 'FormGroup'; 