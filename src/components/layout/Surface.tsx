"use client";

/**
 * Surface Primitive Component
 *
 * Surface is a variant component extension of Box. It provides surface elevation
 * variants (flat, raised, sunken) with token-based styling.
 * Uses Box internally as the base container and CVA for variant management.
 *
 * Use Surface when you need semantic elevation variants. For custom styling,
 * use Box directly with bg, shadow, and radius props.
 *
 * @example
 * ```tsx
 * // Surface with elevation variant
 * <Surface variant="raised" radius="lg" p="md">
 *   Content
 * </Surface>
 * ```
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
