import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

export const ButtonGroup = ({
  children,
  className,
  spacing = 'md',
}: ButtonGroupProps) => {
  const spacingClasses = {
    sm: 'space-x-2',
    md: 'space-x-4',
    lg: 'space-x-6',
  };

  return (
    <div className={twMerge('flex items-center', spacingClasses[spacing], className)}>
      {children}
    </div>
  );
};

export default ButtonGroup; 