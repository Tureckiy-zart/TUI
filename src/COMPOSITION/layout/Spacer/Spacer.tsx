"use client";

/**
 * Spacer Utility Component
 *
 * Pure utility component for inserting spacing between elements.
 * Spacer provides single-axis spacing (vertical or horizontal) using
 * spacing tokens only. No layout logic beyond spacing insertion.
 *
 * @enforcement TUNG_SPACER_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL spacing values MUST be token-based (SpacingToken)
 * - Spacer uses token-based spacing values converted to CSS variables
 * - NO raw Tailwind classes allowed (component uses inline styles with token values)
 * - size prop uses SpacingToken (token union)
 * - Spacing values are converted to CSS variables via getSpacingCSSVar
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - size uses SpacingToken (base spacing, semantic spacing, layout spacing)
 * - NO raw Tailwind spacing classes (h-4, w-4, etc.) allowed
 *
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Spacing Authority: Spacer uses spacing token system exclusively
 * - Layout Authority: Spacer provides spacing insertion only (no layout logic)
 *
 * Token-only contract:
 * - size accepts SpacingToken (token union)
 * - All spacing values are converted to CSS variables
 * - No raw Tailwind classes are used (component uses inline styles with token values)
 * - TypeScript enforces valid SpacingToken values at compile time
 *
 * Spacer IS: A minimal spacing inserter utility
 * Spacer IS NOT: A layout composition component, a Box replacement, or a margin/padding wrapper
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
