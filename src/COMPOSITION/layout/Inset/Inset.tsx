"use client";

/**
 * Inset Layout Primitive Component
 *
 * Inset provides canonical inner spacing wrapper for any content without controlling
 * layout direction, alignment, or gap between children.
 *
 * @enforcement TUNG_INSET_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL spacing values MUST be token-based (ResponsiveSpacing)
 * - Inset uses token-based spacing values converted to CSS variables
 * - NO raw Tailwind classes allowed (component uses inline styles with token values)
 * - padding prop uses ResponsiveSpacing (token-based)
 * - Spacing values are converted to CSS variables via getSpacingCSSVar
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - padding uses ResponsiveSpacing (token-based, converted to CSS variables)
 * - NO raw Tailwind spacing classes (p-4, px-2, etc.) allowed
 *
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Spacing Authority: Inset uses spacing token system exclusively
 * - Layout Authority: Inset provides inner spacing only (no layout logic)
 *
 * Token-only contract:
 * - padding accepts ResponsiveSpacing (token-based)
 * - All spacing values are converted to CSS variables
 * - No raw Tailwind classes are used (component uses inline styles with token values)
 * - TypeScript enforces valid ResponsiveSpacing values at compile time
 *
 * Inset IS: A thin layout primitive for inner spacing only
 * Inset IS NOT: A layout composition component (use Stack for gap), a variant-driven component,
 * or a replacement for Box (px/py) or Section (vertical padding)
 *
 * @example
 * ```tsx
 * // Basic usage with padding
 * <Inset padding="md">
 *   Content
 * </Inset>
 *
 * // Responsive padding
 * <Inset padding={{ base: "sm", lg: "xl" }}>
 *   Content
 * </Inset>
 *
 * // Wrapping Card component
 * <Inset padding="lg">
 *   <Card>Card content</Card>
 * </Inset>
 * ```
 */

import * as React from "react";

import { getBaseValue, getSpacingCSSVar } from "@/FOUNDATION/lib/responsive-props";

import type { ResponsiveSpacing, SpacingValue } from "../layout.types";

export interface InsetProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Padding (all sides) - token-based
   * Accepts spacing tokens (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl) or responsive object
   * @example padding="md"
   * @example padding={{ base: "sm", lg: "xl" }}
   */
  padding?: ResponsiveSpacing;
}

/**
 * Inset component - inner spacing wrapper primitive
 */
const Inset = React.forwardRef<HTMLDivElement, InsetProps>(
  ({ padding, className, style, ...props }, ref) => {
    // Get base value for CSS variable
    const paddingValue = getBaseValue<SpacingValue>(padding);

    // Build inline styles with CSS variables
    const inlineStyles: React.CSSProperties = {
      ...(paddingValue !== undefined && {
        padding: getSpacingCSSVar(String(paddingValue)),
      }),
    };

    // Merge custom style with computed styles (style comes last to allow overrides)
    const finalStyle =
      Object.keys(inlineStyles).length > 0 || style ? { ...inlineStyles, ...style } : undefined;

    return <div ref={ref} className={className} style={finalStyle} {...props} />;
  },
);

Inset.displayName = "Inset";

export { Inset };
