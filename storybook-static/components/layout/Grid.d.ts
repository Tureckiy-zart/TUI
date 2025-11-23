import { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const gridVariants: (
  props?:
    | ({
        cols?: 1 | "none" | 2 | 4 | 6 | 12 | 3 | 5 | null | undefined;
        rows?: 1 | "none" | 2 | 4 | 6 | 3 | 5 | null | undefined;
        gap?: 0 | 1 | 2 | 4 | 6 | 8 | 12 | 16 | 20 | 24 | 3 | 5 | 10 | null | undefined;
        flow?: "row" | "col" | "dense" | "row-dense" | "col-dense" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}
declare const Grid: React.ForwardRefExoticComponent<
  GridProps & React.RefAttributes<HTMLDivElement>
>;
export { Grid, gridVariants };
//# sourceMappingURL=Grid.d.ts.map
