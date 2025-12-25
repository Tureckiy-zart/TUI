"use client";

/**
 * Slider Component
 *
 * A fully accessible, token-driven slider component for numeric value control.
 * Built on Radix UI Slider primitive with variant and size support.
 *
 * @example
 * ```tsx
 * <Slider
 *   variant="primary"
 *   size="md"
 *   min={0}
 *   max={100}
 *   defaultValue={50}
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 */

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import { sliderVariants } from "./slider-variants";

export type SliderSize = "sm" | "md" | "lg";
export type SliderVariant = "primary" | "secondary" | "outline";

export interface SliderProps {
  /**
   * Current value of the slider (controlled)
   */
  value?: number;

  /**
   * Default value of the slider (uncontrolled)
   * @default 50
   */
  defaultValue?: number;

  /**
   * Callback fired when the value changes
   */
  onValueChange?: (value: number) => void;

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
  size?: SliderSize;

  /**
   * Visual style variant
   * @default "primary"
   */
  variant?: SliderVariant;

  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Accessible label for the slider
   */
  "aria-label"?: string;

  /**
   * Name attribute for form submission
   */
  name?: string;
}

/**
 * Slider component
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Uses Radix UI Slider primitive
 * - ✅ Follows Extension Authority Contract
 * - ✅ Interactive Size Scale Authority (sm/md/lg)
 * - ✅ InteractiveVariant subset (primary/secondary/outline)
 * - ✅ CVA pattern for variants and sizes
 */
const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      value,
      defaultValue = 50,
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
    // Convert single value to array for Radix API
    const handleValueChange = React.useCallback(
      (values: number[]) => {
        if (values[0] !== undefined) {
          onValueChange?.(values[0]);
        }
      },
      [onValueChange],
    );

    // Get variant classes from CVA
    const { root, track, range, thumb } = sliderVariants({ size, variant });

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(root())}
        value={value !== undefined ? [value] : undefined}
        defaultValue={[defaultValue]}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-label={ariaLabel}
        name={name}
      >
        <SliderPrimitive.Track className={cn(track())}>
          <SliderPrimitive.Range className={cn(range())} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={cn(thumb())} />
      </SliderPrimitive.Root>
    );
  },
);

Slider.displayName = "Slider";

export { Slider };
