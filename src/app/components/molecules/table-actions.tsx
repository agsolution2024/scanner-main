'use client';

import React from 'react';
import { Button } from '@/app/components/atoms/button';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  hideEdit?: boolean;
  hideDelete?: boolean;
  hideView?: boolean;
  confirmDelete?: boolean;
}

export const TableActions = React.forwardRef<HTMLDivElement, TableActionsProps>(
  ({ 
    onEdit, 
    onDelete, 
    onView,
    hideEdit,
    hideDelete,
    hideView,
    confirmDelete,
    className,
    ...props 
  }, ref) => {
    const [showConfirm, setShowConfirm] = React.useState(false);

    const handleDelete = () => {
      if (confirmDelete && !showConfirm) {
        setShowConfirm(true);
        return;
      }
      onDelete?.();
      setShowConfirm(false);
    };

    return (
      <div 
        ref={ref} 
        className={cn('flex justify-end gap-2', className)} 
        {...props}
      >
        {!hideView && onView && (
          <Button variant="outline" size="icon" onClick={onView}>
            <Eye className="h-4 w-4" />
          </Button>
        )}
        {!hideEdit && onEdit && (
          <Button variant="outline" size="icon" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
        )}
        {!hideDelete && onDelete && (
          <Button
            variant={showConfirm ? 'default' : 'destructive'}
            size="icon"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
);

TableActions.displayName = 'TableActions'; 