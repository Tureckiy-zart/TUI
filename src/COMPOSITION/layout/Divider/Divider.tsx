"use client";

/**
 * Divider Component
 *
 * Layout component for visually separating sections and content blocks.
 * Supports horizontal and vertical orientations, tone variants, and optional inset padding.
 *
 * Divider is a layout component (not a control). It does NOT replace Separator,
 * which is a control component with Radix primitive for semantic separation.
 *
 * @example
 * ```tsx
 * // Horizontal divider (default)
 * <Divider />
 *
 * // Vertical divider
 * <Divider orientation="vertical" />
 *
 * // Divider with inset padding
 * <Divider inset />
 *
 * // Divider with tone variant
 * <Divider tone="primary" />
 * ```
 */

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { DIVIDER_TOKENS } from "@/FOUNDATION/tokens/components/divider";

/**
 * Divider Orientation Types
 *
 * Explicit union types for Divider component orientation.
 */
export type DividerOrientation = "horizontal" | "vertical";

/**
 * Divider Tone Types
 *
 * Explicit union types for Divider component tone variants.
 */
export type DividerTone = "border" | "muted" | "primary" | "secondary" | "accent";

/**
 * Divider variants using tokenCVA
 *
 * Token-based styling for:
 * - Orientation (horizontal/vertical)
 * - Tone variants (border, muted, primary, secondary, accent)
 * - Inset padding (boolean pattern)
 */
const dividerVariants = tokenCVA({
  // Base styles - common to all dividers
  base: "shrink-0",
  variants: {
    /**
     * Orientation of the divider
     */
    orientation: {
      horizontal: `h-px ${DIVIDER_TOKENS.width.full}`,

      vertical: `${DIVIDER_TOKENS.height.full} w-px`,
    },
    /**
     * Tone variant (color)
     */
    tone: {
      border: DIVIDER_TOKENS.tone.border,

      muted: DIVIDER_TOKENS.tone.muted,

      primary: DIVIDER_TOKENS.tone.primary,

      secondary: DIVIDER_TOKENS.tone.secondary,

      accent: DIVIDER_TOKENS.tone.accent,
    } satisfies Record<DividerTone, string>,
    /**
     * Inset padding (boolean pattern)
     * "false"/undefined → full width/height (no padding)
     * "true" → inset padding from edges
     */
    inset: {
      false: "", // No padding (full width/height)
      true: "", // Inset padding (handled in compoundVariants)
    },
  },
  compoundVariants: [
    // Horizontal + inset
    {
      orientation: "horizontal",
      inset: "true",
      className: DIVIDER_TOKENS.inset.horizontal,
    },
    // Vertical + inset
    {
      orientation: "vertical",
      inset: "true",
      className: DIVIDER_TOKENS.inset.vertical,
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    tone: "border",
    inset: "false" as const,
  },
});

export interface DividerProps {
  /**
   * Orientation of the divider
   * @default "horizontal"
   */
  orientation?: DividerOrientation;

  /**
   * Color tone variant
   * @default "border"
   */
  tone?: DividerTone;

  /**
   * Add inset padding (spacing from edges)
   * false/undefined → divider на всю ширину контейнера
   * true → divider с внутренним отступом (по дизайн-токену)
   * @default false
   */
  inset?: boolean;
}

/**
 * Divider component
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token-based styling (tokenCVA, DIVIDER_TOKENS)
 * - ✅ Supports horizontal and vertical orientations
 * - ✅ Supports tone variants (border, muted, primary, secondary, accent)
 * - ✅ Supports inset padding pattern (boolean)
 * - ✅ Uses semantic `<hr>` element for horizontal divider
 * - ✅ Uses `<div>` element for vertical divider
 * - ✅ Decorative element (role="none" or aria-hidden="true")
 * - ✅ Follows Extension Authority Contract
 * - ✅ Explicit union types (DividerOrientation, DividerTone)
 * - ✅ Type constraints (satisfies Record<Type, string>)
 * - ✅ NO forbidden props (px, py, color, size, thickness, children)
 */
const Divider = React.forwardRef<HTMLHRElement | HTMLDivElement, DividerProps>(
  ({ orientation = "horizontal", tone = "border", inset = false, ...props }, ref) => {
    const baseClassName = dividerVariants({ orientation, tone });

    // Add inset padding classes conditionally (boolean pattern)
    let insetClassName = "";
    if (inset) {
      insetClassName =
        orientation === "horizontal"
          ? DIVIDER_TOKENS.inset.horizontal
          : DIVIDER_TOKENS.inset.vertical;
    }

    const className = cn(baseClassName, insetClassName);

    // Use semantic <hr> for horizontal divider, <div> for vertical
    if (orientation === "horizontal") {
      return (
        <hr
          ref={ref as React.Ref<HTMLHRElement>}
          className={cn(className, "border-0")}
          role="none"
          aria-hidden="true"
          {...(props as React.HTMLAttributes<HTMLHRElement>)}
        />
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(className)}
        role="none"
        aria-hidden="true"
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      />
    );
  },
);

Divider.displayName = "Divider";

export { Divider, dividerVariants };
