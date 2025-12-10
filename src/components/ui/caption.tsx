"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const captionVariants = cva("font-sans text-foreground", {
  variants: {
    weight: {
      normal: "font-normal",
      medium: "font-medium",
    },
    muted: {
      true: "text-muted-foreground",
      false: "",
    },
  },
  defaultVariants: {
    weight: "normal",
    muted: true,
  },
});

export interface CaptionProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof captionVariants> {
  as?: "span" | "p" | "div";
}

const Caption = React.forwardRef<HTMLElement, CaptionProps>(
  ({ className, weight, muted, as = "span", children, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref as any}
        className={cn(
          "text-xs leading-tight tracking-wide",
          captionVariants({ weight, muted }),
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Caption.displayName = "Caption";

export { Caption, captionVariants };
