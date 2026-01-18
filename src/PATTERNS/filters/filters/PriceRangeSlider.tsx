"use client";

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { Input } from "@/PRIMITIVES/Input";
import { Label } from "@/PRIMITIVES/Label";

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

export function PriceRangeSlider({
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
}: PriceRangeSliderProps) {
  if (typeof min !== "number" || isNaN(min)) {
    throw new Error('PriceRangeSlider: "min" prop is required and must be a number');
  }
  if (typeof max !== "number" || isNaN(max)) {
    throw new Error('PriceRangeSlider: "max" prop is required and must be a number');
  }
  if (typeof step !== "number" || isNaN(step) || step <= 0) {
    throw new Error('PriceRangeSlider: "step" prop is required and must be a positive number');
  }
  if (!currency || currency.trim() === "") {
    throw new Error('PriceRangeSlider: "currency" prop is required and cannot be empty');
  }
  if (!priceRangeLabel || priceRangeLabel.trim() === "") {
    throw new Error('PriceRangeSlider: "priceRangeLabel" prop is required and cannot be empty');
  }
  if (!minLabel || minLabel.trim() === "") {
    throw new Error('PriceRangeSlider: "minLabel" prop is required and cannot be empty');
  }
  if (!maxLabel || maxLabel.trim() === "") {
    throw new Error('PriceRangeSlider: "maxLabel" prop is required and cannot be empty');
  }
  if (!anyPriceLabel || anyPriceLabel.trim() === "") {
    throw new Error('PriceRangeSlider: "anyPriceLabel" prop is required and cannot be empty');
  }
  if (!clearLabel || clearLabel.trim() === "") {
    throw new Error('PriceRangeSlider: "clearLabel" prop is required and cannot be empty');
  }
  if (!minAriaLabel || minAriaLabel.trim() === "") {
    throw new Error('PriceRangeSlider: "minAriaLabel" prop is required and cannot be empty');
  }
  if (!maxAriaLabel || maxAriaLabel.trim() === "") {
    throw new Error('PriceRangeSlider: "maxAriaLabel" prop is required and cannot be empty');
  }
  // Generate unique IDs for each instance to avoid duplicates
  const minPriceId = React.useId();
  const maxPriceId = React.useId();

  const [localMin, setLocalMin] = React.useState(value.min?.toString() || "");
  const [localMax, setLocalMax] = React.useState(value.max?.toString() || "");

  React.useEffect(() => {
    setLocalMin(value.min?.toString() || "");
    setLocalMax(value.max?.toString() || "");
  }, [value.min, value.max]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = e.target.value;
    setLocalMin(newMin);

    const minValue = newMin === "" ? null : Math.max(min, parseInt(newMin) || min);
    const maxValue = value.max ? Math.min(max, value.max) : null;

    if (minValue !== null && maxValue !== null && minValue > maxValue) {
      onChange({ min: minValue, max: minValue });
    } else {
      onChange({ min: minValue, max: maxValue });
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = e.target.value;
    setLocalMax(newMax);

    const maxValue = newMax === "" ? null : Math.min(max, parseInt(newMax) || max);
    const minValue = value.min ? Math.max(min, value.min) : null;

    if (minValue !== null && maxValue !== null && minValue > maxValue) {
      onChange({ min: maxValue, max: maxValue });
    } else {
      onChange({ min: minValue, max: maxValue });
    }
  };

  const handleSliderChange = (type: "min" | "max", sliderValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, sliderValue));

    if (type === "min") {
      // When changing min, ensure it doesn't exceed current max (or max if max is not set)
      const currentMax = value.max !== null ? value.max : max;
      const finalMin = Math.min(clampedValue, currentMax);
      // Keep max value if it was set, otherwise set it to max
      const finalMax = value.max !== null ? currentMax : null;
      onChange({ min: finalMin, max: finalMax });
    } else {
      // When changing max, ensure it doesn't go below current min (or min if min is not set)
      const currentMin = value.min !== null ? value.min : min;
      const finalMax = Math.max(clampedValue, currentMin);
      // Keep min value if it was set, otherwise set it to min
      const finalMin = value.min !== null ? currentMin : null;
      onChange({ min: finalMin, max: finalMax });
    }
  };

  const clearRange = () => {
    setLocalMin("");
    setLocalMax("");
    onChange({ min: null, max: null });
  };

  const minSliderValue = value.min || min;
  const maxSliderValue = value.max || max;

  return (
    <div className={cn("space-y-md", className)}>
      <div className="space-y-sm">
        <Label>{priceRangeLabel}</Label>
        <div className="flex items-center space-x-sm">
          <div className="flex-1">
            <Label htmlFor={minPriceId}>{minLabel}</Label>
            <div className="relative [&>input]:pl-8">
              <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm text-[hsl(var(--tm-text-muted))]">
                {currency}
              </span>
              <Input
                id={minPriceId}
                name={`min-price-${minPriceId}`}
                type="number"
                value={localMin}
                onChange={handleMinChange}
                placeholder={min.toString()}
                min={min}
                max={max}
                step={step}
              />
            </div>
          </div>
          <div className="flex-1">
            <Label htmlFor={maxPriceId}>{maxLabel}</Label>
            <div className="relative [&>input]:pl-8">
              <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm text-[hsl(var(--tm-text-muted))]">
                {currency}
              </span>
              <Input
                id={maxPriceId}
                name={`max-price-${maxPriceId}`}
                type="number"
                value={localMax}
                onChange={handleMaxChange}
                placeholder={max.toString()}
                min={min}
                max={max}
                step={step}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-sm">
        <div className="relative h-2">
          {/* Track background */}
          <div className="absolute h-2 w-full rounded-full bg-[hsl(var(--tm-muted))]" />

          {/* Active range */}
          <div
            className="absolute h-2 rounded-full bg-[hsl(var(--tm-primary))]"
            style={{
              left: `${((minSliderValue - min) / (max - min)) * 100}%`,
              width: `${((maxSliderValue - minSliderValue) / (max - min)) * 100}%`,
            }}
          />

          {/* Min slider */}
          <input
            type="range"
            id={`${minPriceId}-slider`}
            name={`min-price-slider-${minPriceId}`}
            min={min}
            max={max}
            step={step}
            value={minSliderValue}
            onChange={(e) => handleSliderChange("min", parseInt(e.target.value))}
            onInput={(e) =>
              handleSliderChange("min", parseInt((e.target as HTMLInputElement).value))
            }
            className="absolute h-2 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[hsl(var(--tm-primary))] [&::-moz-range-thumb]:shadow-sm [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[hsl(var(--tm-primary))] [&::-webkit-slider-thumb]:shadow-sm"
            style={{ zIndex: 2 }}
            aria-label={minAriaLabel}
          />

          {/* Max slider */}
          <input
            type="range"
            id={`${maxPriceId}-slider`}
            name={`max-price-slider-${maxPriceId}`}
            min={min}
            max={max}
            step={step}
            value={maxSliderValue}
            onChange={(e) => handleSliderChange("max", parseInt(e.target.value))}
            onInput={(e) =>
              handleSliderChange("max", parseInt((e.target as HTMLInputElement).value))
            }
            className="absolute h-2 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[hsl(var(--tm-primary))] [&::-moz-range-thumb]:shadow-sm [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[hsl(var(--tm-primary))] [&::-webkit-slider-thumb]:shadow-sm"
            style={{ zIndex: 3 }}
            aria-label={maxAriaLabel}
          />
        </div>
        <div className="flex justify-between text-xs text-[hsl(var(--tm-text-muted))]">
          <span>
            {currency}
            {min}
          </span>
          <span>
            {currency}
            {max}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-[hsl(var(--tm-text-muted))]">
          {value.min !== null || value.max !== null
            ? `${currency}${value.min || min} - ${currency}${value.max || max}`
            : anyPriceLabel}
        </span>
        <button
          type="button"
          onClick={clearRange}
          className="text-xs text-[hsl(var(--tm-text-muted))] hover:text-[hsl(var(--tm-text-primary))]"
        >
          {clearLabel}
        </button>
      </div>
    </div>
  );
}

// Hook for price range management
export function usePriceRange(initialRange: PriceRange = { min: null, max: null }) {
  const [range, setRange] = React.useState<PriceRange>(initialRange);

  const setPriceRange = React.useCallback((newRange: PriceRange) => {
    setRange(newRange);
  }, []);

  const clearRange = React.useCallback(() => {
    setRange({ min: null, max: null });
  }, []);

  const isRangeSet = range.min !== null || range.max !== null;

  return {
    range,
    setPriceRange,
    clearRange,
    isRangeSet,
  };
}
