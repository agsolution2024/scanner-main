'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const variantStyles = {
  info: {
    container: 'bg-primary-50 text-primary-800',
    icon: 'text-primary-400',
    title: 'text-primary-800',
    close: 'text-primary-500 hover:bg-primary-100'
  },
  success: {
    container: 'bg-success-50 text-success-800',
    icon: 'text-success-400',
    title: 'text-success-800',
    close: 'text-success-500 hover:bg-success-100'
  },
  warning: {
    container: 'bg-warning-50 text-warning-800',
    icon: 'text-warning-400',
    title: 'text-warning-800',
    close: 'text-warning-500 hover:bg-warning-100'
  },
  error: {
    container: 'bg-error-50 text-error-800',
    icon: 'text-error-400',
    title: 'text-error-800',
    close: 'text-error-500 hover:bg-error-100'
  }
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    variant = 'info',
    title,
    icon,
    onClose,
    className,
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-lg p-4',
          variantStyles[variant].container,
          className
        )}
        role="alert"
        {...props}
      >
        <div className="flex">
          {icon && (
            <div className={cn('mr-3 flex-shrink-0', variantStyles[variant].icon)}>
              {icon}
            </div>
          )}
          <div className="flex-1">
            {title && (
              <h3 className={cn('mb-1 font-medium', variantStyles[variant].title)}>
                {title}
              </h3>
            )}
            <div className="text-sm">{children}</div>
          </div>
          {onClose && (
            <button
              type="button"
              className={cn(
                'ml-3 inline-flex rounded-lg p-1.5',
                variantStyles[variant].close
              )}
              onClick={onClose}
              aria-label="Close"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert; 