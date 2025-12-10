"use client";

/**
 * Surface Container Component
 *
 * Token-driven surface component for elevation variants (flat, raised, sunken, outline, subtle).
 * Uses CVA for variants and maps strictly to SURFACE_TOKENS.
 * All styling uses tokens exclusively (no raw CSS values).
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { SURFACE_TOKENS } from "@/tokens/components/surface";

import { Box, type BoxProps } from "../layout/Box";
import type { ResponsiveRadius, ResponsiveSpacing } from "../layout/layout.types";

const surfaceVariants = cva("", {
  variants: {
    variant: {
      flat: `${SURFACE_TOKENS.variant.flat.bg} ${SURFACE_TOKENS.variant.flat.border} ${SURFACE_TOKENS.variant.flat.shadow}`,
      raised: `${SURFACE_TOKENS.variant.raised.bg} ${SURFACE_TOKENS.variant.raised.border} ${SURFACE_TOKENS.variant.raised.shadow}`,
      sunken: `${SURFACE_TOKENS.variant.sunken.bg} ${SURFACE_TOKENS.variant.sunken.border} ${SURFACE_TOKENS.variant.sunken.shadow}`,
      outline: `${SURFACE_TOKENS.variant.outline.bg} ${SURFACE_TOKENS.variant.outline.border} ${SURFACE_TOKENS.variant.outline.shadow}`,
      subtle: `${SURFACE_TOKENS.variant.subtle.bg} ${SURFACE_TOKENS.variant.subtle.border} ${SURFACE_TOKENS.variant.subtle.shadow}`,
    },
  },
  defaultVariants: {
    variant: "flat",
  },
});

export interface SurfaceProps
  extends Omit<BoxProps, "bg" | "shadow" | "radius" | "p">,
    VariantProps<typeof surfaceVariants> {
  /**
   * Surface variant
   */
  variant?: "flat" | "raised" | "sunken" | "outline" | "subtle";

  /**
   * Padding - token-based (sm, md, lg, xl)
   * Overrides default variant padding
   */
  p?: ResponsiveSpacing;

  /**
   * Border radius - token-based (sm, md, lg, xl, 2xl, 3xl, full)
   * Overrides default variant radius
   */
  radius?: ResponsiveRadius;
}

/**
 * Surface component - elevation variant container
 */
const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ variant = "flat", p, radius, className, ...props }, ref) => {
    // Get default padding and radius from variant if not provided
    // Extract token name from class string (e.g., "p-md" -> "md")
    const variantPadding = SURFACE_TOKENS.variant[variant].padding;
    const defaultPadding = variantPadding.replace("p-", "") as ResponsiveSpacing;

    const variantRadius = SURFACE_TOKENS.variant[variant].radius;
    const defaultRadius = variantRadius.replace("rounded-", "") as ResponsiveRadius;

    // Use provided props or fall back to variant defaults
    const paddingValue = p ?? defaultPadding;
    const radiusValue = radius ?? defaultRadius;

    return (
      <Box
        ref={ref}
        className={cn(surfaceVariants({ variant }), className)}
        p={paddingValue}
        radius={radiusValue}
        {...props}
      />
    );
  },
);

Surface.displayName = "Surface";

export { Surface, surfaceVariants };
