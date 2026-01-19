"use client";

/**
 * Surface Container Component
 *
 * Variant-driven surface elevation container component that extends Box to provide semantic,
 * token-constrained surface styling through predefined variants. Surface bundles background,
 * border, and shadow into cohesive elevation patterns (via SurfaceVariant dictionary),
 * ensuring consistent visual hierarchy while maintaining a single-variant API.
 *
 * @enforcement TUNG_SURFACE_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use SURFACE_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL radius values MUST be token-based
 * - ALL shadow values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling (surfaceVariants)
 * - Variant styling uses SURFACE_TOKENS.variant (bg, border, shadow, padding, radius)
 * - Surface composes Box component (delegates additional styling to Box)
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from SURFACE_TOKENS.variant for variant styling
 * - Background colors use SURFACE_TOKENS.variant[variant].bg
 * - Border colors use SURFACE_TOKENS.variant[variant].border
 * - NO raw Tailwind color classes (bg-red-500, text-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Padding uses SURFACE_TOKENS.variant[variant].padding
 * - Padding can be overridden via p prop (token-based)
 * - NO raw Tailwind spacing classes (p-4, px-2, etc.) allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Radius uses SURFACE_TOKENS.variant[variant].radius
 * - Radius can be overridden via radius prop (token-based)
 * - NO raw Tailwind radius classes (rounded-md, rounded-lg, etc.) allowed
 *
 * Elevation Authority Rules:
 * - ALL shadow values MUST come from shadow token system
 * - Shadows use SURFACE_TOKENS.variant[variant].shadow
 * - NO raw Tailwind shadow classes allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/ELEVATION_AUTHORITY.md
 * @see docs/architecture/VARIANTS_SIZE_CANON.md for canonical variant dictionary
 *
 * Authority Compliance:
 * - Color Authority: Surface uses color token system exclusively via SURFACE_TOKENS
 * - Spacing Authority: Surface uses spacing token system exclusively via SURFACE_TOKENS
 * - Radius Authority: Surface uses radius token system exclusively via SURFACE_TOKENS
 * - Elevation Authority: Surface uses shadow tokens via SURFACE_TOKENS
 * - Layout Authority: Surface composes Box component
 *
 * Token-only contract:
 * - All styling is defined in SURFACE_TOKENS (src/FOUNDATION/tokens/components/surface.ts)
 * - SURFACE_TOKENS reference foundation tokens from spacing, radius, color, and shadow systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/radius/shadow classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant values at compile time
 *
 * Surface IS: A variant-driven surface styling container, semantic abstraction over Box,
 * token-constrained component that maps variants to SURFACE_TOKENS.
 *
 * Surface IS NOT: A generic container (Box), structured content container (Card),
 * layout composition primitive (Stack/Flex/Grid), or interactive component.
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
