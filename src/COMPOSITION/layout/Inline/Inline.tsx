"use client";

/**
 * Inline Primitive Component
 *
 * Inline is a DX-enhancer for inline-flex layout composition.
 * It provides semantic spacing between items and handles inline-flex layout.
 *
 * @enforcement TUNG_INLINE_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL spacing values MUST be token-based (ResponsiveSpacing)
 * - Inline uses token-based spacing values converted to CSS variables
 * - NO raw Tailwind classes allowed (component uses inline styles with token values)
 * - gap prop uses ResponsiveSpacing (token-based)
 * - Spacing values are converted to CSS variables via getSpacingCSSVar
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - gap uses ResponsiveSpacing (token-based, converted to CSS variables)
 * - NO raw Tailwind spacing classes (gap-4, p-2, etc.) allowed
 *
 * Layout Authority Rules:
 * - Inline provides inline-flex layout composition
 * - Alignment and wrap are handled via Tailwind classes (layout utilities)
 * - NO raw Tailwind layout classes for spacing (gap uses CSS variables)
 *
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Spacing Authority: Inline uses spacing token system exclusively
 * - Layout Authority: Inline provides inline-flex layout composition
 *
 * Token-only contract:
 * - gap accepts ResponsiveSpacing (token-based)
 * - All spacing values are converted to CSS variables
 * - No raw Tailwind spacing classes are used (component uses inline styles with token values)
 * - TypeScript enforces valid ResponsiveSpacing values at compile time
 *
 * Inline is NOT a replacement for Stack. Use Stack for flex (block-level) layouts,
 * use Inline for inline-flex (inline-level) layouts.
 *
 * @example
 * ```tsx
 * // Basic inline layout with gap
 * <Inline gap="md">
 *   <Text>Item 1</Text>
 *   <Text>Item 2</Text>
 * </Inline>
 *
 * // With alignment and wrap
 * <Inline gap="sm" align="center" wrap>
 *   <Badge>Tag 1</Badge>
 *   <Badge>Tag 2</Badge>
 * </Inline>
 * ```
 */

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { getBaseValue, getSpacingCSSVar } from "@/FOUNDATION/lib/responsive-props";
import { cn } from "@/FOUNDATION/lib/utils";

import type { ResponsiveSpacing, SpacingValue } from "../layout.types";

export interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Spacing between inline items - token-based (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
   * This is the canonical prop for spacing.
   */
  gap?: ResponsiveSpacing;

  /**
   * Align items along the cross axis
   */
  align?: "start" | "center" | "end" | "baseline";

  /**
   * Whether items should wrap to next line
   * @default false
   */
  wrap?: boolean;

  /**
   * Render as child element (composition pattern via Radix Slot)
   * When true, renders children through Slot component instead of <div>
   */
  asChild?: boolean;
}

/**
 * Convert align to Tailwind class
 */
function alignToClass(
  value: "start" | "center" | "end" | "baseline" | undefined,
): string | undefined {
  if (!value) return undefined;
  if (value === "start") return "items-start";
  if (value === "center") return "items-center";
  if (value === "end") return "items-end";
  if (value === "baseline") return "items-baseline";
  return undefined;
}

/**
 * Inline component - DX-enhancer for inline-flex layout
 */
const Inline = React.forwardRef<HTMLDivElement, InlineProps>(
  ({ gap, align, wrap = false, asChild = false, ...props }, ref) => {
    const gapBaseValue = getBaseValue<SpacingValue>(gap);

    // Build flex classes
    const flexClasses = cn("inline-flex", alignToClass(align), wrap ? "flex-wrap" : "flex-nowrap");

    // Handle gap via inline style
    const inlineStyles: React.CSSProperties = {
      ...(gapBaseValue !== undefined && { gap: getSpacingCSSVar(String(gapBaseValue)) }),
    };

    // If asChild is true, use Radix Slot for composition
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={flexClasses}
          style={Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined}
          {...props}
        />
      );
    }

    // Default: render as div element
    return (
      <div
        ref={ref}
        className={flexClasses}
        style={Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined}
        {...props}
      />
    );
  },
);

Inline.displayName = "Inline";

export { Inline };
