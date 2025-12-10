/**
 * Surface Component Tokens
 *
 * Component-level design tokens for Surface component.
 * Maps foundation tokens (spacing, radius, shadows) to surface-specific usage.
 *
 * Defines tokens for flat, raised, sunken, outline, and subtle surface variants.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Surface Component Tokens
 *
 * Defines spacing, radius, and shadow tokens for Surface component variants.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const SURFACE_TOKENS = {
  /**
   * Padding values for surface variants
   * Can be customized per variant if needed
   */
  padding: {
    default: "p-md", // 16px (1rem) - maps to semanticSpacing.md
    sm: "p-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    md: "p-md", // 16px (1rem) - maps to semanticSpacing.md
    lg: "p-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
  } as const,

  /**
   * Border radius for surfaces
   */
  radius: {
    default: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
    sm: "rounded-sm", // 4px (0.25rem) - maps to borderRadius.sm
    md: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
    lg: "rounded-lg", // 8px (0.5rem) - maps to borderRadius.lg
  } as const,

  /**
   * Shadow tokens by surface variant
   * Maps to foundation elevation shadow tokens
   */
  shadow: {
    flat: "shadow-none", // No shadow - maps to elevationShadows.none
    raised: "shadow-sm", // Small shadow - maps to elevationShadows.sm
    sunken: "shadow-none", // No shadow - maps to elevationShadows.none
    outline: "shadow-none", // No shadow - border-focused variant
    subtle: "shadow-none", // No shadow - minimal background difference
  } as const,

  /**
   * Variant-based token structure
   * Organized by variant for easy access
   */
  variant: {
    flat: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-background",
      border: "border border-border",
    },
    raised: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-sm",
      bg: "bg-card",
      border: "border border-border",
    },
    sunken: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-muted",
      border: "border border-border",
    },
    outline: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-transparent",
      border: "border-2 border-border",
    },
    subtle: {
      padding: "p-md",
      radius: "rounded-md",
      shadow: "shadow-none",
      bg: "bg-muted/50",
      border: "border border-border/50",
    },
  } as const,
} as const;

/**
 * Type exports for Surface tokens
 */
export type SurfacePadding = keyof typeof SURFACE_TOKENS.padding;
export type SurfaceRadius = keyof typeof SURFACE_TOKENS.radius;
export type SurfaceShadow = keyof typeof SURFACE_TOKENS.shadow;
export type SurfaceVariant = keyof typeof SURFACE_TOKENS.variant;
