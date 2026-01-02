"use client";

/**
 * Spacer Utility Component
 *
 * Pure utility component for inserting spacing between elements.
 * Spacer provides single-axis spacing (vertical or horizontal) using
 * spacing tokens only. No layout logic beyond spacing insertion.
 *
 * Spacer IS: A minimal spacing inserter utility
 * Spacer IS NOT: A layout composition component, a Box replacement, or a margin/padding wrapper
 *
 * All spacing uses token-based values only (no raw CSS values).
 *
 * @example
 * ```tsx
 * // Vertical spacer (default)
 * <Spacer size="md" />
 *
 * // Horizontal spacer
 * <Spacer orientation="horizontal" size="lg" />
 *
 * // Using semantic spacing tokens
 * <Spacer size="xl" />
 *
 * // Using layout spacing tokens
 * <Spacer size="section-md" />
 * ```
 */

import * as React from "react";

import { getSpacingCSSVar } from "@/FOUNDATION/lib/responsive-props";
import type { SpacingToken } from "@/FOUNDATION/tokens/types";

/**
 * Spacer orientation types
 */
export type SpacerOrientation = "horizontal" | "vertical";

/**
 * Spacer component props
 */
export interface SpacerProps {
  /**
   * Orientation of the spacer
   * - "vertical" (default): creates vertical spacing (height)
   * - "horizontal": creates horizontal spacing (width)
   * @default "vertical"
   */
  orientation?: SpacerOrientation;

  /**
   * Spacing size - token-based (required)
   * Accepts all spacing tokens:
   * - Base spacing: 0, 1, 2, 4, 6, 8, etc.
   * - Semantic spacing: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, none
   * - Layout spacing: section-xs, container-md, grid-lg, stack-sm, component-xl
   * @example size="md"
   * @example size="section-lg"
   */
  size: SpacingToken;
}

/**
 * Spacer component - utility spacing inserter
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Single-axis spacing only (vertical or horizontal)
 * - ✅ No layout logic beyond spacing insertion
 * - ✅ No margin/padding props (uses width/height only)
 * - ✅ No responsive behavior (single token value)
 * - ✅ No variant/state props (pure utility)
 * - ✅ No className/style props (per constraints)
 * - ✅ Decorative element (aria-hidden="true")
 * - ✅ Follows Extension Authority Contract
 * - ✅ Tree-shakable and minimal
 */
const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ orientation = "vertical", size }, ref) => {
    // Convert spacing token to CSS variable
    const spacingValue = getSpacingCSSVar(String(size));

    // Build inline styles based on orientation
    const inlineStyles: React.CSSProperties =
      orientation === "vertical"
        ? {
            height: spacingValue,
            width: "100%",
          }
        : {
            width: spacingValue,
            height: "100%",
          };

    return <div ref={ref} style={inlineStyles} aria-hidden="true" role="none" />;
  },
);

Spacer.displayName = "Spacer";

export { Spacer };
