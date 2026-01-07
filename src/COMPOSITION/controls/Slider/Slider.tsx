"use client";

/**
 * Slider Component
 *
 * A fully accessible, token-driven slider component for numeric value control.
 * Built on Radix UI Slider primitive with variant and size support.
 *
 * @enforcement TUNG_SLIDER_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use SLIDER_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL typography values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling (sliderVariants)
 * - Size variants use SLIDER_TOKENS.root.size, track.size, thumb.size
 * - Variant colors use SLIDER_TOKENS.track.variant, range.variant, thumb.variant
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from SLIDER_TOKENS for track, range, and thumb styling
 * - Track variant colors use SLIDER_TOKENS.track.variant
 * - Range variant colors use SLIDER_TOKENS.range.variant
 * - Thumb variant colors use SLIDER_TOKENS.thumb.variant
 * - NO raw Tailwind color classes (bg-red-500, text-primary, etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Root size uses SLIDER_TOKENS.root.size (height/width)
 * - Track size uses SLIDER_TOKENS.track.size (height/width)
 * - Thumb size uses SLIDER_TOKENS.thumb.size (height/width)
 * - Mark spacing uses SLIDER_TOKENS.mark.label.marginTop and marginLeft
 * - NO raw Tailwind spacing classes (h-4, w-4, p-2, etc.) allowed
 *
 * Typography Authority Rules:
 * - ALL typography values MUST come from typography token system
 * - Mark label typography uses SLIDER_TOKENS.mark.label.fontSize
 * - NO raw Tailwind typography classes allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: Slider uses color token system exclusively via SLIDER_TOKENS
 * - Spacing Authority: Slider uses spacing token system exclusively via SLIDER_TOKENS
 * - Typography Authority: Slider uses typography token system exclusively via SLIDER_TOKENS
 * - Layout Authority: Slider composes Radix Slider primitive
 *
 * Token-only contract:
 * - All styling is defined in SLIDER_TOKENS (src/FOUNDATION/tokens/components/slider.ts)
 * - SLIDER_TOKENS reference foundation tokens from spacing, color, and typography systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/typography classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant/size/orientation values at compile time
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
export type SliderOrientation = "horizontal" | "vertical";

export interface SliderMark {
  /**
   * Value at which the mark should be placed
   */
  value: number;
  /**
   * Optional label to display at the mark
   */
  label?: string | React.ReactNode;
}

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
   * Orientation of the slider
   * @default "horizontal"
   */
  orientation?: SliderOrientation;

  /**
   * Marks to display on the slider
   * Can be an array of mark objects or just an array of values
   */
  marks?: SliderMark[] | number[];

  /**
   * Whether to show labels for marks
   * @default false
   */
  showMarkLabels?: boolean;

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
      orientation = "horizontal",
      marks,
      showMarkLabels = false,
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
    const { root, track, range, thumb, mark, markDot, markLabel } = sliderVariants({
      size,
      variant,
      orientation,
    });

    // Normalize marks to array of SliderMark objects
    const normalizedMarks = React.useMemo(() => {
      if (!marks || marks.length === 0) return [];
      return marks
        .map((m) => (typeof m === "number" ? { value: m } : m))
        .filter((m) => m.value >= min && m.value <= max); // Filter out-of-bounds marks
    }, [marks, min, max]);

    // Render marks
    const renderMarks = () => {
      if (normalizedMarks.length === 0) return null;
      if (max === min) return null; // Prevent division by zero

      return (
        <div className="pointer-events-none absolute inset-0">
          {normalizedMarks.map((markItem) => {
            const percent = ((markItem.value - min) / (max - min)) * 100;
            const style =
              orientation === "horizontal" ? { left: `${percent}%` } : { bottom: `${percent}%` };

            return (
              <div key={markItem.value} className={cn(mark())} style={style}>
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
        value={value !== undefined ? [value] : undefined}
        defaultValue={[defaultValue]}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
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
      </SliderPrimitive.Root>
    );
  },
);

Slider.displayName = "Slider";

export { Slider };
