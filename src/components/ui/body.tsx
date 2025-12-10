"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const bodyVariants = cva("font-sans text-foreground", {
  variants: {
    size: {
      md: "text-md leading-relaxed tracking-normal",
      lg: "text-lg leading-relaxed tracking-normal",
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
    size: "md",
    weight: "normal",
    muted: false,
  },
});

export interface BodyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof bodyVariants> {
  as?: "p" | "span" | "div";
}

const Body = React.forwardRef<HTMLElement, BodyProps>(
  ({ className, size, weight, muted, as = "p", children, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref as any}
        className={cn(bodyVariants({ size, weight, muted }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Body.displayName = "Body";

export { Body, bodyVariants };
