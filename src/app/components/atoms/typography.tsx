'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'overline';
  component?: React.ElementType;
  gutterBottom?: boolean;
}

const variantStyles = {
  h1: 'text-4xl font-bold tracking-tight',
  h2: 'text-3xl font-bold tracking-tight',
  h3: 'text-2xl font-bold tracking-tight',
  h4: 'text-xl font-bold tracking-tight',
  h5: 'text-lg font-bold tracking-tight',
  h6: 'text-base font-bold tracking-tight',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
  overline: 'text-xs uppercase tracking-wider'
};

const defaultComponents = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span'
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ 
    variant = 'body1',
    component,
    gutterBottom = false,
    className,
    children,
    ...props
  }, ref) => {
    const Component = component || defaultComponents[variant];

    return (
      <Component
        ref={ref}
        className={cn(
          variantStyles[variant],
          gutterBottom && 'mb-4',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

export default Typography; 