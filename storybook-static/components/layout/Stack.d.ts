import { VariantProps } from "class-variance-authority";
import * as React from "react";
declare const stackVariants: (
  props?:
    | ({
        spacing?: 0 | 1 | 2 | 4 | 6 | 8 | 12 | 16 | 20 | 24 | 3 | 5 | 10 | null | undefined;
        align?: "center" | "end" | "start" | "stretch" | null | undefined;
        justify?: "center" | "end" | "start" | "between" | "around" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}
declare const Stack: React.ForwardRefExoticComponent<
  StackProps & React.RefAttributes<HTMLDivElement>
>;
export { Stack, stackVariants };
//# sourceMappingURL=Stack.d.ts.map
