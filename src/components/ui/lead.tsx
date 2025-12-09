"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const leadVariants = cva("font-sans text-foreground", {
  variants: {
    size: {
      lg: "text-lg leading-normal tracking-normal",
      xl: "text-xl leading-normal tracking-normal",
    },
    muted: {
      true: "text-muted-foreground",
      false: "",
    },
  },
  defaultVariants: {
    size: "lg",
    muted: true,
  },
});

export interface LeadProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof leadVariants> {
  as?: "p" | "span" | "div";
}

const Lead = React.forwardRef<HTMLElement, LeadProps>(
  ({ className, size, muted, as = "p", children, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref as any}
        className={cn(leadVariants({ size, muted }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Lead.displayName = "Lead";

export { Lead, leadVariants };
