import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
      none: "grid-cols-none",
    },
    rows: {
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      5: "grid-rows-5",
      6: "grid-rows-6",
      none: "grid-rows-none",
    },
    gap: {
      0: "gap-0",
      1: "gap-xs",
      2: "gap-sm",
      3: "gap-sm",
      4: "gap-md",
      5: "gap-md",
      6: "gap-lg",
      8: "gap-xl",
      10: "gap-2xl",
      12: "gap-2xl",
      16: "gap-3xl",
      20: "gap-4xl",
      24: "gap-5xl",
    },
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    flow: {
      row: "grid-flow-row",
      col: "grid-flow-col",
      dense: "grid-flow-dense",
      "row-dense": "grid-flow-row-dense",
      "col-dense": "grid-flow-col-dense",
    },
  },
  defaultVariants: {
    cols: 1,
    rows: "none",
    gap: 0,
    align: "stretch",
    justify: "start",
    flow: "row",
  },
});

type ColumnValue = 1 | 2 | 3 | 4 | 5 | 6 | 12 | "none";

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /**
   * Number of columns for medium breakpoint (768px+)
   */
  md?: ColumnValue;
  /**
   * Number of columns for large breakpoint (1024px+)
   */
  lg?: ColumnValue;
  /**
   * Number of columns for extra large breakpoint (1280px+)
   */
  xl?: ColumnValue;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, md, lg, xl, rows, gap, align, justify, flow, ...props }, ref) => {
    // Build responsive column classes
    const baseColsClass = cols ? `grid-cols-${cols}` : "grid-cols-1";
    const responsiveCols = [
      baseColsClass,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`,
    ]
      .filter(Boolean)
      .join(" ");

    // Get base grid classes - use cols only if no responsive props provided
    const hasResponsiveProps = md || lg || xl;
    const baseClasses = gridVariants({
      cols: hasResponsiveProps ? undefined : cols,
      rows,
      gap,
      align,
      justify,
      flow,
    });

    return (
      <div
        ref={ref}
        className={cn(baseClasses, hasResponsiveProps && responsiveCols, className)}
        {...props}
      />
    );
  },
);
Grid.displayName = "Grid";

export { Grid, gridVariants };
