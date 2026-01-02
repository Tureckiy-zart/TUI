"use client";

/**
 * Surface Container Component
 *
 * Variant-driven surface elevation container component that extends Box to provide semantic,
 * token-constrained surface styling through predefined variants. Surface bundles background,
 * border, and shadow into cohesive elevation patterns (via SurfaceVariant dictionary),
 * ensuring consistent visual hierarchy while maintaining a single-variant API.
 *
 * Surface IS: A variant-driven surface styling container, semantic abstraction over Box,
 * token-constrained component that maps variants to SURFACE_TOKENS.
 *
 * Surface IS NOT: A generic container (Box), structured content container (Card),
 * layout composition primitive (Stack/Flex/Grid), or interactive component.
 *
 * Uses tokenCVA for variants and maps strictly to SURFACE_TOKENS.
 * All styling uses tokens exclusively (no raw CSS values).
 *
 * @see docs/architecture/VARIANTS_SIZE_CANON.md for canonical variant dictionary
 */

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { SURFACE_TOKENS } from "@/FOUNDATION/tokens/components/surface";

import { Box, type BoxProps } from "../Box";
import type { ResponsiveRadius, ResponsiveSpacing } from "../layout.types";

/**
 * Surface variant type (canonical SurfaceVariant dictionary)
 * @see docs/architecture/VARIANTS_SIZE_CANON.md for canonical variant dictionary
 */
export type SurfaceVariantType = "default" | "elevated" | "outlined" | "filled" | "subtle";

const surfaceVariants = tokenCVA({
  variants: {
    variant: {
      default: `${SURFACE_TOKENS.variant.default.bg} ${SURFACE_TOKENS.variant.default.border} ${SURFACE_TOKENS.variant.default.shadow}`,
      elevated: `${SURFACE_TOKENS.variant.elevated.bg} ${SURFACE_TOKENS.variant.elevated.border} ${SURFACE_TOKENS.variant.elevated.shadow}`,
      outlined: `${SURFACE_TOKENS.variant.outlined.bg} ${SURFACE_TOKENS.variant.outlined.border} ${SURFACE_TOKENS.variant.outlined.shadow}`,
      filled: `${SURFACE_TOKENS.variant.filled.bg} ${SURFACE_TOKENS.variant.filled.border} ${SURFACE_TOKENS.variant.filled.shadow}`,
      subtle: `${SURFACE_TOKENS.variant.subtle.bg} ${SURFACE_TOKENS.variant.subtle.border} ${SURFACE_TOKENS.variant.subtle.shadow}`,
    } satisfies Record<SurfaceVariantType, string>,
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SurfaceProps extends Omit<BoxProps, "bg" | "shadow" | "radius" | "p"> {
  /**
   * Surface variant (canonical SurfaceVariant dictionary)
   */
  variant?: SurfaceVariantType;

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
  ({ variant = "default", p, radius, className, ...props }, ref) => {
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
        px={paddingValue}
        py={paddingValue}
        radius={radiusValue}
        {...props}
      />
    );
  },
);

Surface.displayName = "Surface";

export { Surface, surfaceVariants };
