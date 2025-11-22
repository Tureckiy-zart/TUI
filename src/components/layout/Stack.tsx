import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const stackVariants = cva("flex flex-col", {
  variants: {
    spacing: {
      0: "space-y-0",
      1: "space-y-xs",
      2: "space-y-sm",
      3: "space-y-sm",
      4: "space-y-md",
      5: "space-y-md",
      6: "space-y-lg",
      8: "space-y-xl",
      10: "space-y-2xl",
      12: "space-y-2xl",
      16: "space-y-3xl",
      20: "space-y-4xl",
      24: "space-y-5xl",
    },
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
    },
  },
  defaultVariants: {
    spacing: 4,
    align: "stretch",
    justify: "start",
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing, align, justify, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(stackVariants({ spacing, align, justify, className }))}
        {...props}
      />
    );
  },
);
Stack.displayName = "Stack";

export { Stack, stackVariants };
