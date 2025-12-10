"use client";

/**
 * Surface Primitive Component
 *
 * Variant component for surface elevation (flat, raised, sunken).
 * Uses CVA for variants and token-based background, border, and shadow only.
 */

import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Box, type BoxProps } from "./Box";
import type { SurfaceVariant } from "./layout.types";

const surfaceVariants = cva("", {
  variants: {
    variant: {
      flat: "bg-background border border-border shadow-none",
      raised: "bg-card border border-border shadow-sm",
      sunken: "bg-muted border border-border shadow-none",
    },
  },
  defaultVariants: {
    variant: "flat",
  },
});

export interface SurfaceProps extends Omit<BoxProps, "bg" | "shadow"> {
  /**
   * Surface variant
   */
  variant?: SurfaceVariant;

  /**
   * Border radius - token-based
   */
  radius?: BoxProps["radius"];
}

/**
 * Surface component - elevation variant component
 */
const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ variant, radius, className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn(surfaceVariants({ variant }), className)}
        radius={radius}
        {...props}
      />
    );
  },
);

Surface.displayName = "Surface";

export { Surface, surfaceVariants };
