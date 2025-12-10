"use client";

/**
 * Row Primitive Component
 *
 * Token-driven horizontal layout component (flex row). Uses Box internally
 * with flex display and row direction. All spacing uses token-based values.
 */

import * as React from "react";

import { Box, type BoxProps } from "./Box";
import type { ResponsiveSpacing } from "./layout.types";

export interface RowProps extends Omit<BoxProps, "display" | "flexDirection"> {
  /**
   * Gap between row items - token-based (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
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
 * Row component - horizontal layout using flex row
 */
const Row = React.forwardRef<HTMLDivElement, RowProps>(({ gap, align, justify, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection="row"
      gap={gap}
      align={align}
      justify={justify}
      {...props}
    />
  );
});

Row.displayName = "Row";

export { Row };
