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
    flow: "row",
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, rows, gap, flow, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols, rows, gap, flow, className }))}
        {...props}
      />
    );
  },
);
Grid.displayName = "Grid";

export { Grid, gridVariants };
