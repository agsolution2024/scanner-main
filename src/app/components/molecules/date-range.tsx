import React from 'react';
import { addDays } from 'date-fns';
import { DatePicker } from '../atoms/date-picker';

interface DateRangeProps {
  startDate?: Date;
  endDate?: Date;
  onStartDateChange?: (date?: Date) => void;
  onEndDateChange?: (date?: Date) => void;
  className?: string;
  disabled?: boolean;
  separator?: string;
}

export function DateRange({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className,
  disabled = false,
  separator = 'to',
}: DateRangeProps) {
  const handleStartDateChange = (date?: Date) => {
    onStartDateChange?.(date);
    // If end date is before new start date, adjust it
    if (date && endDate && date > endDate) {
      onEndDateChange?.(addDays(date, 1));
    }
  };

  const handleEndDateChange = (date?: Date) => {
    onEndDateChange?.(date);
    // If start date is after new end date, adjust it
    if (date && startDate && startDate > date) {
      onStartDateChange?.(addDays(date, -1));
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className || ''}`}>
      <DatePicker
        date={startDate}
        onDateChange={handleStartDateChange}
        placeholder="Start date"
        disabled={disabled}
      />
      <span className="text-muted-foreground">{separator}</span>
      <DatePicker
        date={endDate}
        onDateChange={handleEndDateChange}
        placeholder="End date"
        disabled={disabled}
      />
    </div>
  );
} 