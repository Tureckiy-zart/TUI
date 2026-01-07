"use client";

/**
 * Flex Primitive Component
 *
 * Flex is an advanced flexbox container extension of Box. It provides full control
 * over flexbox properties (direction, wrap, grow, shrink, basis, alignment, spacing).
 * Uses Box internally as the base container.
 *
 * Use Flex when you need advanced flexbox control beyond what Stack provides.
 * For simple vertical/horizontal layouts, prefer Stack.
 *
 * @enforcement TUNG_FLEX_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL spacing values MUST be token-based (ResponsiveSpacing)
 * - Gap prop accepts ResponsiveSpacing (semantic spacing tokens: xs, sm, md, lg, xl, etc.)
 * - Basis prop accepts ResponsiveFlexBasis (spacing tokens or semantic CSS values)
 * - NO raw CSS spacing values allowed
 * - NO raw numeric values allowed
 * - Gap is applied via inline styles using CSS variables (--spacing-*)
 * - Basis is applied via inline styles using CSS variables (--spacing-*) or semantic CSS values
 * - Structural utilities (flex, flex-row, flex-col, items-*, justify-*, etc.) are ALLOWED
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Gap prop accepts ResponsiveSpacing (semantic spacing tokens: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
 * - Gap is applied via inline styles using CSS variables (--spacing-*)
 * - NO raw Tailwind gap classes (gap-4, gap-md, etc.) allowed
 *
 * Layout Authority Rules:
 * - Flex uses CSS Flexbox layout system
 * - Direction, wrap, grow, shrink use Tailwind flex utilities
 * - Alignment and justification use Tailwind flex utilities (items-*, justify-*)
 * - Basis uses spacing tokens via CSS variables or semantic CSS values
 *
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Spacing Authority: Flex uses spacing token system exclusively for gap and basis via CSS variables
 * - Layout Authority: Flex follows CSS Flexbox layout composition patterns
 *
 * Token-only contract:
 * - All spacing values are defined in spacing token system (src/FOUNDATION/tokens/spacing.ts)
 * - Spacing tokens reference foundation spacing scale (8px grid system)
 * - Gap and basis are applied via inline styles using CSS variables (--spacing-*)
 * - No raw CSS spacing values are allowed
 * - TypeScript enforces valid spacing token values at compile time
 *
 * @example
 * ```tsx
 * // Advanced flexbox with wrap and grow
 * <Flex direction="row" wrap="wrap" gap="md" grow={1}>
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 * </Flex>
 * ```
 */

import * as React from "react";

import { getBaseValue, getSpacingCSSVar } from "@/FOUNDATION/lib/responsive-props";
import { cn } from "@/FOUNDATION/lib/utils";
import type { FlexBasisToken, ResponsiveFlexBasis } from "@/FOUNDATION/tokens/types";

import { Box, type BoxProps } from "../Box";
import type {
  ResponsiveAlignment,
  ResponsiveFlexDirection,
  ResponsiveFlexWrap,
  ResponsiveJustify,
  ResponsiveSpacing,
  SpacingValue,
} from "../layout.types";

export interface FlexProps extends Omit<
  BoxProps,
  "display" | "flexDirection" | "align" | "justify"
> {
  /**
   * Flex direction
   */
  direction?: ResponsiveFlexDirection;

  /**
   * Flex wrap
   */
  wrap?: ResponsiveFlexWrap;

  /**
   * Flex grow (0 or 1, or use Tailwind flex-grow-*)
   */
  grow?: 0 | 1 | boolean;

  /**
   * Flex shrink (0 or 1, or use Tailwind flex-shrink-*)
   */
  shrink?: 0 | 1 | boolean;

  /**
   * Flex basis - token-based
   * Accepts spacing tokens (xs, sm, md, lg, etc.) or semantic CSS values (auto, 0, 100%, fit-content, max-content, min-content)
   * @example basis="md" // Uses spacing token
   * @example basis="auto" // Semantic CSS value
   * @example basis={{ base: "sm", md: "lg" }} // Responsive
   */
  basis?: ResponsiveFlexBasis;

  /**
   * Align items
   */
  align?: ResponsiveAlignment;

  /**
   * Justify content
   */
  justify?: ResponsiveJustify;

  /**
   * Gap between flex items - token-based
   */
  gap?: ResponsiveSpacing;
}

/**
 * Get base value from responsive value (local helper for flex-specific types)
 */
function getFlexBaseValue<T>(
  value:
    | ResponsiveFlexDirection
    | ResponsiveFlexWrap
    | ResponsiveAlignment
    | ResponsiveJustify
    | ResponsiveFlexBasis
    | T
    | undefined,
): T | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  // Check if it's a responsive value object
  if (typeof value === "object" && !Array.isArray(value) && value !== null) {
    if ("base" in value && value.base !== undefined) {
      return value.base as T;
    }
    if ("sm" in value && value.sm !== undefined) {
      return value.sm as T;
    }
    if ("md" in value && value.md !== undefined) {
      return value.md as T;
    }
    if ("lg" in value && value.lg !== undefined) {
      return value.lg as T;
    }
  }

  return value as T;
}

/**
 * Convert flex direction to Tailwind class
 */
function flexDirectionToClass(
  value: "row" | "column" | "row-reverse" | "column-reverse" | undefined,
): string | undefined {
  if (!value) return undefined;
  if (value === "row") return "flex-row";
  if (value === "column") return "flex-col";
  if (value === "row-reverse") return "flex-row-reverse";
  if (value === "column-reverse") return "flex-col-reverse";
  return undefined;
}

/**
 * Convert flex wrap to Tailwind class
 */
function flexWrapToClass(
  value: "nowrap" | "wrap" | "wrap-reverse" | undefined,
): string | undefined {
  if (!value) return undefined;
  if (value === "nowrap") return "flex-nowrap";
  if (value === "wrap") return "flex-wrap";
  if (value === "wrap-reverse") return "flex-wrap-reverse";
  return undefined;
}

/**
 * Convert align to Tailwind class
 */
function alignToClass(
  value: "start" | "end" | "center" | "baseline" | "stretch" | undefined,
): string | undefined {
  if (!value) return undefined;
  if (value === "start") return "items-start";
  if (value === "end") return "items-end";
  if (value === "center") return "items-center";
  if (value === "baseline") return "items-baseline";
  if (value === "stretch") return "items-stretch";
  return undefined;
}

/**
 * Convert justify to Tailwind class
 */
function justifyToClass(
  value: "start" | "end" | "center" | "between" | "around" | "evenly" | undefined,
): string | undefined {
  if (!value) return undefined;
  if (value === "start") return "justify-start";
  if (value === "end") return "justify-end";
  if (value === "center") return "justify-center";
  if (value === "between") return "justify-between";
  if (value === "around") return "justify-around";
  if (value === "evenly") return "justify-evenly";
  return undefined;
}

/**
 * Convert grow to Tailwind class
 */
function growToClass(value: 0 | 1 | boolean | undefined): string | undefined {
  if (value === undefined || value === false || value === 0) return undefined;
  if (value === true || value === 1) return "grow";
  return undefined;
}

/**
 * Convert shrink to Tailwind class
 */
function shrinkToClass(value: 0 | 1 | boolean | undefined): string | undefined {
  if (value === undefined || value === false || value === 0) return undefined;
  if (value === true || value === 1) return "shrink";
  return undefined;
}

/**
 * Flex component
 */
const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    { direction, wrap, grow, shrink, basis, align, justify, gap, className, style, ...props },
    ref,
  ) => {
    // Get base values
    const directionValue = getFlexBaseValue<"row" | "column" | "row-reverse" | "column-reverse">(
      direction,
    );
    const wrapValue = getFlexBaseValue<"nowrap" | "wrap" | "wrap-reverse">(wrap);
    const alignValue = getFlexBaseValue<"start" | "end" | "center" | "baseline" | "stretch">(align);
    const justifyValue = getFlexBaseValue<
      "start" | "end" | "center" | "between" | "around" | "evenly"
    >(justify);
    const basisValue = getFlexBaseValue<FlexBasisToken>(basis);

    // Get gap base value for inline style
    const gapBaseValue = getBaseValue<SpacingValue>(gap);

    // Build additional classes
    const flexClasses = cn(
      "flex",
      flexDirectionToClass(directionValue),
      flexWrapToClass(wrapValue),
      growToClass(grow),
      shrinkToClass(shrink),
      alignToClass(alignValue),
      justifyToClass(justifyValue),
      className,
    );

    // Convert basis token to CSS value
    const flexBasisCSS = (() => {
      if (!basisValue) return undefined;

      // Convert to string first (basisValue could be string or number from union)
      const basisString = String(basisValue);

      // Check if it's a semantic CSS value (auto, 0, 100%, etc.)
      const semanticValues = ["auto", "0", "100%", "fit-content", "max-content", "min-content"];
      if (semanticValues.includes(basisString)) {
        return basisString;
      }

      // Otherwise, treat as spacing token
      return getSpacingCSSVar(basisString);
    })();

    // Handle basis and gap via style if provided
    const flexStyle: React.CSSProperties = {
      ...(flexBasisCSS ? { flexBasis: flexBasisCSS } : {}),
      ...(gapBaseValue !== undefined && { gap: getSpacingCSSVar(String(gapBaseValue)) }),
      ...style,
    };

    return (
      <Box
        ref={ref}
        className={flexClasses}
        style={Object.keys(flexStyle).length > 0 ? flexStyle : undefined}
        {...props}
      />
    );
  },
);

Flex.displayName = "Flex";

export { Flex };
