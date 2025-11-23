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
export declare function DateRangePicker({
  value,
  onChange,
  placeholder,
  selectDateRangeLabel,
  clearLabel,
  closeLabel,
  className,
  disabled,
}: DateRangePickerProps): import("react/jsx-runtime").JSX.Element;
export declare function useDateRange(initialRange?: DateRange): {
  range: DateRange;
  setDateRange: (newRange: DateRange) => void;
  clearRange: () => void;
  isRangeComplete: Date | undefined;
};
//# sourceMappingURL=DateRangePicker.d.ts.map
