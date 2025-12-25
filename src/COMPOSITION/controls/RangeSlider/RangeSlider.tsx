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
export type RangeSliderOrientation = "horizontal" | "vertical";

export interface RangeSliderMark {
  /**
   * Value at which the mark should be placed
   */
  value: number;
  /**
   * Optional label to display at the mark
   */
  label?: string | React.ReactNode;
}

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
   * Orientation of the range slider
   * @default "horizontal"
   */
  orientation?: RangeSliderOrientation;

  /**
   * Marks to display on the range slider
   * Can be an array of mark objects or just an array of values
   */
  marks?: RangeSliderMark[] | number[];

  /**
   * Whether to show labels for marks
   * @default false
   */
  showMarkLabels?: boolean;

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
      orientation = "horizontal",
      marks,
      showMarkLabels = false,
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
    const { root, track, range, thumb, mark, markDot, markLabel } = rangeSliderVariants({
      size,
      variant,
      orientation,
    });

    // Normalize marks to array of RangeSliderMark objects
    const normalizedMarks = React.useMemo(() => {
      if (!marks || marks.length === 0) return [];
      return marks.map((m) => (typeof m === "number" ? { value: m } : m));
    }, [marks]);

    // Render marks
    const renderMarks = () => {
      if (normalizedMarks.length === 0) return null;

      return (
        <div className="pointer-events-none absolute inset-0">
          {normalizedMarks.map((markItem, idx) => {
            const percent = ((markItem.value - min) / (max - min)) * 100;
            const style =
              orientation === "horizontal" ? { left: `${percent}%` } : { bottom: `${percent}%` };

            return (
              <div key={idx} className={cn(mark())} style={style}>
                <div className={cn(markDot())} />
                {showMarkLabels && markItem.label && (
                  <div className={cn(markLabel())}>{markItem.label}</div>
                )}
              </div>
            );
          })}
        </div>
      );
    };

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
        orientation={orientation}
        aria-label={ariaLabel}
        name={name}
      >
        <SliderPrimitive.Track className={cn(track())}>
          <SliderPrimitive.Range className={cn(range())} />
          {renderMarks()}
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={cn(thumb())} />
        <SliderPrimitive.Thumb className={cn(thumb())} />
      </SliderPrimitive.Root>
    );
  },
);

RangeSlider.displayName = "RangeSlider";

export { RangeSlider };
