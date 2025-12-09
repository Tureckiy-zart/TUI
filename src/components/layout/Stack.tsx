"use client";

/**
 * Stack Primitive Component
 *
 * Token-driven vertical layout component (flex column). Uses Box internally
 * with flex display and column direction. All spacing uses token-based values.
 */

import * as React from "react";

import { Box, type BoxProps } from "./Box";
import type { ResponsiveSpacing } from "./layout.types";

export interface StackProps extends Omit<BoxProps, "display" | "flexDirection" | "gap"> {
  /**
   * Stack direction - vertical (column) or horizontal (row)
   */
  direction?: "vertical" | "horizontal";

  /**
   * Spacing between stack items - token-based (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
   * Alias for gap prop
   */
  spacing?: ResponsiveSpacing;

  /**
   * Gap between stack items - token-based (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
   * Alias for spacing prop
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
 * Stack component - vertical layout using flex column by default
 */
const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ direction = "vertical", spacing, gap, align, justify, ...props }, ref) => {
    // Use spacing if provided, otherwise use gap
    const gapValue = spacing ?? gap;

    return (
      <Box
        ref={ref}
        display="flex"
        flexDirection={direction === "horizontal" ? "row" : "column"}
        gap={gapValue}
        align={align}
        justify={justify}
        {...props}
      />
    );
  },
);

Stack.displayName = "Stack";

export { Stack };
