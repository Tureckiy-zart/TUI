"use client";

/**
 * Stack Primitive Component
 *
 * Stack is the primary layout composition primitive for vertical and horizontal flows.
 * It provides semantic spacing between items and handles flexbox layout composition.
 * Uses Box internally as the base container.
 *
 * All spacing uses token-based values only.
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

import { getBaseValue, getSpacingCSSVar } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";

import { Box, type BoxProps } from "./Box";
import type { ResponsiveSpacing, SpacingValue } from "./layout.types";

export interface StackProps extends Omit<BoxProps, "display" | "flexDirection" | "gap"> {
  /**
   * Stack direction - vertical (column) or horizontal (row)
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";

  /**
   * Spacing between stack items - token-based (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
   * This is the canonical prop for spacing. Use `spacing` instead of `gap` for clarity.
   */
  spacing?: ResponsiveSpacing;

  /**
   * Gap between stack items - token-based (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
   * @deprecated Use `spacing` prop instead. This prop is kept for backward compatibility.
   */
  gap?: ResponsiveSpacing;

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
  ({ direction = "vertical", spacing, gap, align, justify, className, style, ...props }, ref) => {
    // Use spacing as primary prop (more semantic), fallback to gap for backward compatibility
    const gapValue = spacing ?? gap;
    const gapBaseValue = getBaseValue<SpacingValue>(gapValue);

    // Build flex classes
    const flexClasses = cn(
      "flex",
      direction === "horizontal" ? "flex-row" : "flex-col",
      alignToClass(align),
      justifyToClass(justify),
      className,
    );

    // Handle gap via inline style
    const inlineStyles: React.CSSProperties = {
      ...(gapBaseValue !== undefined && { gap: getSpacingCSSVar(String(gapBaseValue)) }),
      ...style,
    };

    return (
      <Box
        ref={ref}
        className={flexClasses}
        style={Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined}
        {...props}
      />
    );
  },
);

Stack.displayName = "Stack";

export { Stack };
