"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Box, Button } from "@/index";

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
  disabled?: boolean;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder,
  selectDateRangeLabel,
  clearLabel,
  closeLabel,
  disabled = false,
}: DateRangePickerProps) {
  if (!placeholder || placeholder.trim() === "") {
    throw new Error('DateRangePicker: "placeholder" prop is required and cannot be empty');
  }
  if (!selectDateRangeLabel || selectDateRangeLabel.trim() === "") {
    throw new Error('DateRangePicker: "selectDateRangeLabel" prop is required and cannot be empty');
  }
  if (!clearLabel || clearLabel.trim() === "") {
    throw new Error('DateRangePicker: "clearLabel" prop is required and cannot be empty');
  }
  if (!closeLabel || closeLabel.trim() === "") {
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
    <Box>
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} disabled={disabled}>
        <CalendarIcon className="mr-sm h-4 w-4" />
        {formatDateRange(value)}
      </Button>

      {isOpen && (
        <Box>
          <Box>
            <Box>{selectDateRangeLabel}</Box>
            <Box>
              {/* Calendar header */}
              {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                <Box
                  key={day}
                  className="p-sm text-center font-medium text-[hsl(var(--tm-text-muted))]"
                >
                  {day}
                </Box>
              ))}

              {/* Calendar days - simplified version */}
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - date.getDay() + i);

                return (
                  <Button key={i} variant="ghost" size="sm" onClick={() => handleDateSelect(date)}>
                    {date.getDate()}
                  </Button>
                );
              })}
            </Box>

            <Box>
              <Button variant="outline" size="sm" onClick={clearRange}>
                {clearLabel}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                {closeLabel}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
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
