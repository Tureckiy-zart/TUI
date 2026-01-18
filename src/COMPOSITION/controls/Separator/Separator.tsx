"use client";

/**
 * Separator Component
 *
 * Visual separator for content sections, menus, and lists.
 * Supports both semantic and decorative modes with horizontal/vertical orientations.
 *
 * @enforcement TUNG_SEPARATOR_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use SEPARATOR_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL thickness values MUST use SEPARATOR_TOKENS.thickness and SEPARATOR_TOKENS.width
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling
 * - Orientation variants use SEPARATOR_TOKENS for thickness/width
 * - Color variants use semantic Tailwind classes
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors use semantic Tailwind classes (bg-[hsl(var(--tm-border-default))], bg-[hsl(var(--tm-muted))], bg-[hsl(var(--tm-primary))]/20, etc.)
 * - Color variants map to semantic color tokens
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Thickness uses SEPARATOR_TOKENS.thickness[thickness] for horizontal orientation
 * - Width uses SEPARATOR_TOKENS.width[thickness] for vertical orientation
 * - NO raw Tailwind spacing classes (h-1, w-1, etc.) allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 *
 * Authority Compliance:
 * - Color Authority: Separator uses color token system exclusively via semantic Tailwind classes
 * - Spacing Authority: Separator uses spacing token system exclusively via SEPARATOR_TOKENS
 *
 * Token-only contract:
 * - All styling is defined in SEPARATOR_TOKENS (src/FOUNDATION/tokens/components/separator.ts)
 * - SEPARATOR_TOKENS reference foundation tokens from spacing and color systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid orientation/color/thickness values at compile time
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
  base: "shrink-0 bg-[hsl(var(--tm-border-default))]",
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
      border: "bg-[hsl(var(--tm-border-default))]",
      muted: "bg-[hsl(var(--tm-muted))]",
      primary: "bg-[hsl(var(--tm-primary))]/20",
      secondary: "bg-[hsl(var(--tm-secondary))]/20",
      accent: "bg-[hsl(var(--tm-accent))]/20",
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
