"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { TEXT_TOKENS } from "@/tokens/components/text";

const leadVariants = cva("font-sans text-foreground", {
  variants: {
    size: {
      lg: `${TEXT_TOKENS.fontSize.lg} ${TEXT_TOKENS.lineHeight.normal} ${TEXT_TOKENS.letterSpacing.normal}`,
      xl: `${TEXT_TOKENS.fontSize.xl} ${TEXT_TOKENS.lineHeight.normal} ${TEXT_TOKENS.letterSpacing.normal}`,
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
