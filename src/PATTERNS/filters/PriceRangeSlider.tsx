"use client";

import * as React from "react";

import { Box, Button, Input, Label } from "@/index";

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
    <Box>
      <Box>
        <Label>{priceRangeLabel}</Label>
        <Box>
          <Box>
            <Label htmlFor={minPriceId}>{minLabel}</Label>
            <Box>
              <Box
                as="span"
                className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm text-[hsl(var(--tm-text-muted))]"
              >
                {currency}
              </Box>
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
            </Box>
          </Box>
          <Box>
            <Label htmlFor={maxPriceId}>{maxLabel}</Label>
            <Box>
              <Box
                as="span"
                className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm text-[hsl(var(--tm-text-muted))]"
              >
                {currency}
              </Box>
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
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Slider */}
      <Box>
        <Box>
          {/* Track background */}
          <Box className="absolute h-2 w-full rounded-full bg-[hsl(var(--tm-muted))]" />

          {/* Active range */}
          <Box
            className="absolute h-2 rounded-full bg-[hsl(var(--tm-primary))]"
            style={{
              left: `${((minSliderValue - min) / (max - min)) * 100}%`,
              width: `${((maxSliderValue - minSliderValue) / (max - min)) * 100}%`,
            }}
          />

          {/* Min slider */}
          <Input
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
            aria-label={minAriaLabel}
          />

          {/* Max slider */}
          <Input
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
            aria-label={maxAriaLabel}
          />
        </Box>
        <Box>
          <Box as="span">
            {currency}
            {min}
          </Box>
          <Box as="span">
            {currency}
            {max}
          </Box>
        </Box>
      </Box>

      <Box>
        <Box as="span">
          {value.min !== null || value.max !== null
            ? `${currency}${value.min || min} - ${currency}${value.max || max}`
            : anyPriceLabel}
        </Box>
        <Button type="button" variant="ghost" size="sm" onClick={clearRange}>
          {clearLabel}
        </Button>
      </Box>
    </Box>
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
