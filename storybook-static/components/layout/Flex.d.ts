import { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const flexVariants: (
  props?:
    | ({
        direction?: "row" | "row-reverse" | "column" | "column-reverse" | null | undefined;
        wrap?: "wrap" | "nowrap" | "wrap-reverse" | null | undefined;
        justify?: "center" | "end" | "start" | "between" | "around" | "evenly" | null | undefined;
        align?: "center" | "end" | "baseline" | "start" | "stretch" | null | undefined;
        gap?: 0 | 1 | 2 | 4 | 6 | 8 | 12 | 16 | 20 | 24 | 3 | 5 | 10 | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}
declare const Flex: React.ForwardRefExoticComponent<
  FlexProps & React.RefAttributes<HTMLDivElement>
>;
export { Flex, flexVariants };
//# sourceMappingURL=Flex.d.ts.map
