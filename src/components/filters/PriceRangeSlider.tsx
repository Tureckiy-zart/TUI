"use client";

import * as React from "react";
import { Input } from "@/components/primitives/Input";
import { Label } from "@/components/primitives/Label";
import { cn } from "@/lib/utils";

export interface PriceRange {
  min: number | null;
  max: number | null;
}

export interface PriceRangeSliderProps {
  value: PriceRange;
  onChange: (range: PriceRange) => void;
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
  className?: string;
}

export function PriceRangeSlider({
  value,
  onChange,
  min = 0,
  max = 1000,
  step = 10,
  currency = "€",
  className,
}: PriceRangeSliderProps) {
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

  const handleSliderChange = (type: 'min' | 'max', sliderValue: number) => {
    if (type === 'min') {
      const newMin = Math.max(min, Math.min(max, sliderValue));
      const newMax = value.max ? Math.max(newMin, value.max) : null;
      onChange({ min: newMin, max: newMax });
    } else {
      const newMax = Math.max(min, Math.min(max, sliderValue));
      const newMin = value.min ? Math.min(newMax, value.min) : null;
      onChange({ min: newMin, max: newMax });
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
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Label htmlFor={minPriceId} className="text-xs text-muted-foreground">
              Min
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
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
                className="pl-8"
              />
            </div>
          </div>
          <div className="flex-1">
            <Label htmlFor={maxPriceId} className="text-xs text-muted-foreground">
              Max
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
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
                className="pl-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <div className="relative">
          <input
            type="range"
            id={`${minPriceId}-slider`}
            name={`min-price-slider-${minPriceId}`}
            min={min}
            max={max}
            step={step}
            value={minSliderValue}
            onChange={(e) => handleSliderChange('min', parseInt(e.target.value))}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
            aria-label="Minimum price"
          />
          <input
            type="range"
            id={`${maxPriceId}-slider`}
            name={`max-price-slider-${maxPriceId}`}
            min={min}
            max={max}
            step={step}
            value={maxSliderValue}
            onChange={(e) => handleSliderChange('max', parseInt(e.target.value))}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
            aria-label="Maximum price"
          />
          <div className="h-2 bg-muted rounded-full">
            <div
              className="h-2 bg-primary rounded-full"
              style={{
                left: `${((minSliderValue - min) / (max - min)) * 100}%`,
                width: `${((maxSliderValue - minSliderValue) / (max - min)) * 100}%`,
              }}
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{currency}{min}</span>
          <span>{currency}{max}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {value.min !== null || value.max !== null
            ? `${currency}${value.min || min} - ${currency}${value.max || max}`
            : "Any price"}
        </span>
        <button
          type="button"
          onClick={clearRange}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Clear
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
