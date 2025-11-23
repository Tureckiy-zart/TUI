export interface PriceRange {
  min: number | null;
  max: number | null;
}
export interface PriceRangeSliderProps {
  value: PriceRange;
  onChange: (range: PriceRange) => void;
  min: number;
  max: number;
  step: number;
  currency: string;
  priceRangeLabel: string;
  minLabel: string;
  maxLabel: string;
  anyPriceLabel: string;
  clearLabel: string;
  minAriaLabel: string;
  maxAriaLabel: string;
  className?: string;
}
export declare function PriceRangeSlider({
  value,
  onChange,
  min,
  max,
  step,
  currency,
  priceRangeLabel,
  minLabel,
  maxLabel,
  anyPriceLabel,
  clearLabel,
  minAriaLabel,
  maxAriaLabel,
  className,
}: PriceRangeSliderProps): import("react/jsx-runtime").JSX.Element;
export declare function usePriceRange(initialRange?: PriceRange): {
  range: PriceRange;
  setPriceRange: (newRange: PriceRange) => void;
  clearRange: () => void;
  isRangeSet: boolean;
};
//# sourceMappingURL=PriceRangeSlider.d.ts.map
