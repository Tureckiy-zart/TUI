"use client";

/**
 * Stack Primitive Component
 *
 * Stack is the primary layout composition primitive for vertical and horizontal flows.
 * It provides semantic spacing between items and handles flexbox layout composition.
 * Uses Box internally as the base container.
 *
 * @enforcement TUNG_STACK_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL spacing values MUST be token-based (ResponsiveSpacing)
 * - NO raw CSS spacing values allowed
 * - Spacing uses getSpacingCSSVar() to convert tokens to CSS variables
 * - Structural utilities (flex, flex-row, flex-col, items-*, justify-*) are ALLOWED
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Spacing prop accepts ResponsiveSpacing (semantic spacing tokens: xs, sm, md, lg, xl, etc.)
 * - Gap is applied via inline styles using CSS variables (--spacing-*)
 * - NO raw Tailwind gap classes (gap-4, gap-md, etc.) allowed
 *
 * Token-only contract:
 * - All spacing values are defined in spacing token system (src/FOUNDATION/tokens/spacing.ts)
 * - Spacing tokens reference foundation spacing scale (8px grid system)
 * - No raw CSS spacing values are allowed
 * - TypeScript enforces valid spacing token values at compile time
 *
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Spacing Authority: Stack uses spacing token system exclusively
 * - Layout Authority: Stack follows layout composition patterns
 *
 * @example
 * ```tsx
 * // Vertical stack (default)
 * <Stack direction="vertical" spacing="md">
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 * </Stack>
 *
 * // Horizontal stack
 * <Stack direction="horizontal" spacing="lg" align="center">
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 * </Stack>
 * ```
 */

import * as React from "react";

import { getBaseValue, getSpacingCSSVar } from "@/FOUNDATION/lib/responsive-props";
import { cn } from "@/FOUNDATION/lib/utils";

import { Box, type BoxProps } from "../Box";
import type { ResponsiveSpacing, SpacingValue } from "../layout.types";

export interface StackProps extends Omit<BoxProps, "display" | "flexDirection" | "gap"> {
  /**
   * Stack direction - vertical (column) or horizontal (row)
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";

  /**
   * Spacing between stack items - token-based (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
   * This is the canonical prop for spacing.
   */
  spacing?: ResponsiveSpacing;

  /**
   * Align items
   */
  align?: "start" | "end" | "center" | "baseline" | "stretch";

  /**
   * Justify content
   */
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
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
 * Stack component - primary layout composition primitive
 */
const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ direction = "vertical", spacing, align, justify, className, style, ...props }, ref) => {
    const gapBaseValue = getBaseValue<SpacingValue>(spacing);

    // Build flex classes
    const flexClasses = cn(
      "flex",
      direction === "horizontal" ? "flex-row" : "flex-col",
      alignToClass(align),
      justifyToClass(justify),
      className,
    );

    // Build inline styles with CSS variables
    const inlineStyles: React.CSSProperties = {
      ...(gapBaseValue !== undefined && { gap: getSpacingCSSVar(String(gapBaseValue)) }),
    };

    // Build final style combining inline styles and passed style prop
    const finalStyle =
      Object.keys(inlineStyles).length > 0 || style ? { ...inlineStyles, ...style } : undefined;

    return <Box ref={ref} className={flexClasses} style={finalStyle} {...props} />;
  },
);

Stack.displayName = "Stack";

export { Stack };
