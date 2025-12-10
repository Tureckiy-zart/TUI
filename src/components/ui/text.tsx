"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { TEXT_TOKENS } from "@/tokens/components/text";

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: TEXT_TOKENS.fontSize.xs,
      sm: TEXT_TOKENS.fontSize.sm,
      md: TEXT_TOKENS.fontSize.md,
      lg: TEXT_TOKENS.fontSize.lg,
      xl: TEXT_TOKENS.fontSize.xl,
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
    /**
     * @deprecated Use muted prop or semantic text colors instead
     */
    variant: {
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      accent: "text-accent-foreground",
      outline: "text-foreground",
      ghost: "text-foreground",
      link: "text-primary hover:underline",
      destructive: "text-destructive",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
    muted: false,
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  /**
   * @deprecated Use muted prop or semantic text colors instead
   */
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "muted";
}

const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className, size, weight, muted, variant, ...props }, ref) => {
    // Handle deprecated variant prop
    const isMuted = muted !== undefined ? muted : variant === "muted";

    return (
      <span
        ref={ref}
        className={cn(textVariants({ size, weight, muted: isMuted, variant }), className)}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export type TextSize = VariantProps<typeof textVariants>["size"];
export type TextWeight = VariantProps<typeof textVariants>["weight"];

export { Text, textVariants };
