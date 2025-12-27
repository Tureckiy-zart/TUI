"use client";

/**
 * Separator Component
 *
 * Visual separator for content sections, menus, and lists.
 * Supports both semantic and decorative modes with horizontal/vertical orientations.
 *
 * @example
 * ```tsx
 * // Horizontal separator (default)
 * <Separator />
 *
 * // Vertical separator
 * <Separator orientation="vertical" />
 *
 * // Decorative separator (no semantic meaning)
 * <Separator decorative />
 * ```
 */

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { SEPARATOR_TOKENS } from "@/FOUNDATION/tokens/components/separator";

/**
 * Separator Color Variant Types
 *
 * Explicit union types for Separator component color variants.
 */
export type SeparatorColor = "border" | "muted" | "primary" | "secondary" | "accent";

/**
 * Separator Thickness Types
 *
 * Explicit union types for Separator component thickness variants.
 */
export type SeparatorThickness = "1" | "2";

/**
 * Separator variants using tokenCVA
 *
 * Token-based styling for:
 * - Orientation (horizontal/vertical)
 * - Color variants
 * - Thickness variants
 */
const separatorVariants = tokenCVA({
  // Base styles - common to all separators
  base: "shrink-0 bg-border",
  variants: {
    /**
     * Orientation of the separator
     */
    orientation: {
      // eslint-disable-next-line no-restricted-syntax -- SEPARATOR_TOKENS is canonical source, tokens excluded from linting
      horizontal: `${SEPARATOR_TOKENS.thickness["1"]} w-full`,
      // eslint-disable-next-line no-restricted-syntax -- SEPARATOR_TOKENS is canonical source, tokens excluded from linting
      vertical: `h-full ${SEPARATOR_TOKENS.width["1"]}`,
    },
    /**
     * Color variant
     */
    color: {
      border: "bg-border",
      muted: "bg-muted",
      primary: "bg-primary/20",
      secondary: "bg-secondary/20",
      accent: "bg-accent/20",
    } satisfies Record<SeparatorColor, string>,
    /**
     * Thickness variant
     */
    thickness: {
      "1": "", // Default 1px (set in orientation)
      "2": "", // 2px
    } satisfies Record<SeparatorThickness, string>,
  },
  compoundVariants: [
    // Horizontal + thickness 2
    {
      orientation: "horizontal",
      thickness: "2",
      // eslint-disable-next-line no-restricted-syntax -- SEPARATOR_TOKENS is canonical source, tokens excluded from linting
      className: `${SEPARATOR_TOKENS.thickness["2"]} w-full`,
    },
    // Vertical + thickness 2
    {
      orientation: "vertical",
      thickness: "2",
      // eslint-disable-next-line no-restricted-syntax -- SEPARATOR_TOKENS is canonical source, tokens excluded from linting
      className: `h-full ${SEPARATOR_TOKENS.width["2"]}`,
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    color: "border",
    thickness: "1",
  },
});

export interface SeparatorProps extends React.ComponentPropsWithoutRef<
  typeof SeparatorPrimitive.Root
> {
  /**
   * Orientation of the separator
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Whether the separator is decorative (no semantic meaning)
   * @default true
   */
  decorative?: boolean;

  /**
   * Color variant
   * @default "border"
   */
  color?: SeparatorColor;

  /**
   * Thickness variant
   * @default "1"
   */
  thickness?: SeparatorThickness;
}

/**
 * Separator component
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses @radix-ui/react-separator for behavior
 * - ✅ Token-based styling (tokenCVA, SEPARATOR_TOKENS)
 * - ✅ Supports horizontal and vertical orientations
 * - ✅ Semantic (role="separator") vs decorative (role="none")
 * - ✅ ARIA attributes handled by Radix
 * - ✅ Follows Extension Authority Contract
 * - ✅ Explicit union types (SeparatorColor, SeparatorThickness)
 * - ✅ Type constraints (satisfies Record<Type, string>)
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      color = "border",
      thickness = "1",
      ...props
    },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ orientation, color, thickness }), className)}
      {...props}
    />
  ),
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator, separatorVariants };
