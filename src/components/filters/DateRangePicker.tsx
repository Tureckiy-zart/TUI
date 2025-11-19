"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  placeholder: string;
  selectDateRangeLabel: string;
  clearLabel: string;
  closeLabel: string;
  className?: string;
  disabled?: boolean;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder,
  selectDateRangeLabel,
  clearLabel,
  closeLabel,
  className,
  disabled = false,
}: DateRangePickerProps) {
  if (!placeholder || placeholder.trim() === '') {
    throw new Error('DateRangePicker: "placeholder" prop is required and cannot be empty');
  }
  if (!selectDateRangeLabel || selectDateRangeLabel.trim() === '') {
    throw new Error('DateRangePicker: "selectDateRangeLabel" prop is required and cannot be empty');
  }
  if (!clearLabel || clearLabel.trim() === '') {
    throw new Error('DateRangePicker: "clearLabel" prop is required and cannot be empty');
  }
  if (!closeLabel || closeLabel.trim() === '') {
    throw new Error('DateRangePicker: "closeLabel" prop is required and cannot be empty');
  }
  const [isOpen, setIsOpen] = React.useState(false);

  const formatDateRange = (range: DateRange) => {
    if (!range.from) return placeholder;
    
    if (!range.to) {
      return format(range.from, "LLL dd, y");
    }
    
    return `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange({ from: undefined, to: undefined });
      return;
    }

    if (!value.from || (value.from && value.to)) {
      // Start new range
      onChange({ from: date, to: undefined });
    } else if (value.from && !value.to) {
      // Complete the range
      if (date < value.from) {
        // If selected date is before start date, swap them
        onChange({ from: date, to: value.from });
      } else {
        onChange({ from: value.from, to: date });
      }
      setIsOpen(false);
    }
  };

  const clearRange = () => {
    onChange({ from: undefined, to: undefined });
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal",
          !value.from && "text-muted-foreground"
        )}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {formatDateRange(value)}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-md border bg-popover p-3 shadow-lg">
          <div className="space-y-2">
            <div className="text-sm font-medium">{selectDateRangeLabel}</div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {/* Calendar header */}
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              
              {/* Calendar days - simplified version */}
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - date.getDay() + i);
                const isSelected = 
                  (value.from && date.toDateString() === value.from.toDateString()) ||
                  (value.to && date.toDateString() === value.to.toDateString());
                const isInRange = 
                  value.from && value.to && 
                  date > value.from && date < value.to;
                
                return (
                  <button
                    key={i}
                    className={cn(
                      "h-8 w-8 rounded text-sm hover:bg-accent",
                      isSelected && "bg-primary text-primary-foreground",
                      isInRange && "bg-accent/50"
                    )}
                    onClick={() => handleDateSelect(date)}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
            
            <div className="flex justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearRange}
              >
                {clearLabel}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                {closeLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Hook for date range management
export function useDateRange(initialRange: DateRange = { from: undefined, to: undefined }) {
  const [range, setRange] = React.useState<DateRange>(initialRange);

  const setDateRange = React.useCallback((newRange: DateRange) => {
    setRange(newRange);
  }, []);

  const clearRange = React.useCallback(() => {
    setRange({ from: undefined, to: undefined });
  }, []);

  const isRangeComplete = range.from && range.to;

  return {
    range,
    setDateRange,
    clearRange,
    isRangeComplete,
  };
}
