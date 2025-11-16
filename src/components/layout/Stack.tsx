import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stackVariants = cva("flex flex-col", {
  variants: {
    spacing: {
      0: "space-y-0",
      1: "space-y-1",
      2: "space-y-2",
      3: "space-y-3",
      4: "space-y-4",
      5: "space-y-5",
      6: "space-y-6",
      8: "space-y-8",
      10: "space-y-10",
      12: "space-y-12",
      16: "space-y-16",
      20: "space-y-20",
      24: "space-y-24"
    },
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      stretch: "items-stretch"
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around"
    }
  },
  defaultVariants: {
    spacing: 4,
    align: "stretch",
    justify: "start"
  }
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
  }
);
Stack.displayName = "Stack";

export { Stack, stackVariants };
