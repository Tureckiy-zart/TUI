"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { TEXT_TOKENS } from "@/tokens/components/text";

const bodyVariants = cva("font-sans text-foreground", {
  variants: {
    size: {
      md: `${TEXT_TOKENS.fontSize.md} ${TEXT_TOKENS.lineHeight.relaxed} ${TEXT_TOKENS.letterSpacing.normal}`,
      lg: `${TEXT_TOKENS.fontSize.lg} ${TEXT_TOKENS.lineHeight.relaxed} ${TEXT_TOKENS.letterSpacing.normal}`,
    },
    weight: {
      normal: TEXT_TOKENS.fontWeight.normal,
      medium: TEXT_TOKENS.fontWeight.medium,
      semibold: TEXT_TOKENS.fontWeight.semibold,
      bold: TEXT_TOKENS.fontWeight.bold,
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
