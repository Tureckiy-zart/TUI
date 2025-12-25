"use client";

/**
 * RangeSlider Component
 *
 * A fully accessible, token-driven range slider component for numeric range selection.
 * Built on Radix UI Slider primitive with two thumbs for min-max range control.
 *
 * @example
 * ```tsx
 * <RangeSlider
 *   variant="primary"
 *   size="md"
 *   min={0}
 *   max={100}
 *   defaultValue={[25, 75]}
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 */

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import { rangeSliderVariants } from "./range-slider-variants";

export type RangeSliderSize = "sm" | "md" | "lg";
export type RangeSliderVariant = "primary" | "secondary" | "outline";

export interface RangeSliderProps {
  /**
   * Current value of the range slider (controlled)
   * Tuple of [min, max]
   */
  value?: [number, number];

  /**
   * Default value of the range slider (uncontrolled)
   * Tuple of [min, max]
   * @default [25, 75]
   */
  defaultValue?: [number, number];

  /**
   * Callback fired when the value changes
   */
  onValueChange?: (value: [number, number]) => void;

  /**
   * Minimum value
   * @default 0
   */
  min?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Step increment
   * @default 1
   */
  step?: number;

  /**
   * Visual size variant
   * @default "md"
   */
  size?: RangeSliderSize;

  /**
   * Visual style variant
   * @default "primary"
   */
  variant?: RangeSliderVariant;

  /**
   * Whether the range slider is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Accessible label for the range slider
   */
  "aria-label"?: string;

  /**
   * Name attribute for form submission
   */
  name?: string;
}

/**
 * RangeSlider component
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Uses Radix UI Slider primitive with minStepsBetweenThumbs
 * - ✅ Follows Extension Authority Contract
 * - ✅ Interactive Size Scale Authority (sm/md/lg)
 * - ✅ InteractiveVariant subset (primary/secondary/outline)
 * - ✅ CVA pattern for variants and sizes
 */
const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  RangeSliderProps
>(
  (
    {
      value,
      defaultValue = [25, 75],
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      size = "md",
      variant = "primary",
      disabled = false,
      "aria-label": ariaLabel,
      name,
    },
    ref,
  ) => {
    // Convert tuple to array for Radix API
    const handleValueChange = React.useCallback(
      (values: number[]) => {
        if (values.length === 2 && values[0] !== undefined && values[1] !== undefined) {
          onValueChange?.([values[0], values[1]]);
        }
      },
      [onValueChange],
    );

    // Get variant classes from CVA
    const { root, track, range, thumb } = rangeSliderVariants({ size, variant });

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(root())}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={1}
        disabled={disabled}
        aria-label={ariaLabel}
        name={name}
      >
        <SliderPrimitive.Track className={cn(track())}>
          <SliderPrimitive.Range className={cn(range())} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={cn(thumb())} />
        <SliderPrimitive.Thumb className={cn(thumb())} />
      </SliderPrimitive.Root>
    );
  },
);

RangeSlider.displayName = "RangeSlider";

export { RangeSlider };
