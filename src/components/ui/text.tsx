"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
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

export interface TextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className, size, weight, muted, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(textVariants({ size, weight, muted }), className)} {...props} />
    );
  },
);
Text.displayName = "Text";

export type TextSize = VariantProps<typeof textVariants>["size"];
export type TextWeight = VariantProps<typeof textVariants>["weight"];

export { Text, textVariants };
