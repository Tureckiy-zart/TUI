"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const displayVariants = cva("font-display text-foreground", {
  variants: {
    size: {
      xl: "text-xl leading-normal tracking-normal",
      "2xl": "text-2xl leading-tight tracking-tight",
      "3xl": "text-3xl leading-tight tracking-tight",
      "4xl": "text-4xl leading-none tracking-tight",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    muted: {
      true: "text-muted-foreground",
      false: "",
    },
  },
  defaultVariants: {
    size: "4xl",
    weight: "bold",
    muted: false,
  },
});

export interface DisplayProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof displayVariants> {
  as?: "h1" | "h2" | "div";
}

const Display = React.forwardRef<HTMLElement, DisplayProps>(
  ({ className, size, weight, muted, as = "h1", children, ...props }, ref) => {
    const Component = (() => {
      if (as === "h1") return "h1";
      if (as === "h2") return "h2";
      return "div";
    })();

    return (
      <Component
        ref={ref as any}
        className={cn(displayVariants({ size, weight, muted }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Display.displayName = "Display";

export { Display, displayVariants };
