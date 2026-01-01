"use client";

/**
 * Inset Layout Primitive Component
 *
 * Inset provides canonical inner spacing wrapper for any content without controlling
 * layout direction, alignment, or gap between children.
 *
 * Inset IS: A thin layout primitive for inner spacing only
 * Inset IS NOT: A layout composition component (use Stack for gap), a variant-driven component,
 * or a replacement for Box (px/py) or Section (vertical padding)
 *
 * All spacing uses token-based values only.
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
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Does NOT duplicate Stack gap behavior
 * - ✅ Does NOT duplicate Box px/py props
 * - ✅ Does NOT duplicate Section vertical padding
 * - ✅ Motion: NO MOTION BY DESIGN (pure layout wrapper, no state/spatial changes)
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
