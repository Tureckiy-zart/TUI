"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { TEXT_TOKENS } from "@/tokens/components/text";

/**
 * Caption component variants
 *
 * Note: fontSize, lineHeight, and letterSpacing are intentionally fixed in the base class
 * rather than variants, as Caption always uses a consistent small size (xs) with tight
 * line height and wide letter spacing. This design decision ensures caption text maintains
 * its distinctive appearance across all use cases.
 */
const captionVariants = cva(
  [
    "font-sans",
    "text-foreground",
    TEXT_TOKENS.fontSize.xs,
    TEXT_TOKENS.lineHeight.tight,
    TEXT_TOKENS.letterSpacing.wide,
  ]
    .filter(Boolean)
    .join(" "),
  {
    variants: {
      weight: {
        normal: TEXT_TOKENS.fontWeight.normal,
        medium: TEXT_TOKENS.fontWeight.medium,
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
  },
);

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
        className={cn(captionVariants({ weight, muted }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Caption.displayName = "Caption";

export { Caption, captionVariants };
