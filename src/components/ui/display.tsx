"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { TEXT_TOKENS } from "@/tokens/components/text";

const displayVariants = cva("font-display text-foreground", {
  variants: {
    size: {
      xl: `${TEXT_TOKENS.fontSize.xl} ${TEXT_TOKENS.lineHeight.normal} ${TEXT_TOKENS.letterSpacing.normal}`,
      "2xl": `${TEXT_TOKENS.fontSize["2xl"]} ${TEXT_TOKENS.lineHeight.tight} ${TEXT_TOKENS.letterSpacing.tight}`,
      "3xl": `${TEXT_TOKENS.fontSize["3xl"]} ${TEXT_TOKENS.lineHeight.tight} ${TEXT_TOKENS.letterSpacing.tight}`,
      "4xl": `${TEXT_TOKENS.fontSize["4xl"]} ${TEXT_TOKENS.lineHeight.none} ${TEXT_TOKENS.letterSpacing.tight}`,
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
