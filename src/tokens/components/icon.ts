/**
 * Icon Component Tokens
 *
 * Component-level design tokens for Icon component.
 * Maps foundation tokens (spacing, colors) to icon-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Icon Component Tokens
 *
 * Defines all sizing, stroke, and color tokens for Icon component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const ICON_TOKENS = {
  /**
   * Icon sizes
   * Maps to Tailwind size utilities for consistent icon sizing
   */
  sizes: {
    xs: "h-2.5 w-2.5", // 10px (0.625rem) - extra small icons
    sm: "h-3 w-3", // 12px (0.75rem) - maps to spacing[3]
    md: "h-4 w-4", // 16px (1rem) - maps to spacing[4] (default)
    lg: "h-5 w-5", // 20px (1.25rem) - maps to spacing[5]
    xl: "h-6 w-6", // 24px (1.5rem) - maps to spacing[6]
    "2xl": "h-8 w-8", // 32px (2rem) - maps to spacing[8]
    "3xl": "h-10 w-10", // 40px (2.5rem) - maps to spacing[10]
    "4xl": "h-12 w-12", // 48px (3rem) - maps to spacing[12]
  } as const,

  /**
   * Stroke width variants
   * Maps to Tailwind stroke-width utilities
   */
  stroke: {
    thin: "stroke-[1px]", // 1px stroke width
    normal: "stroke-[1.5px]", // 1.5px stroke width
    bold: "stroke-2", // 2px stroke width
  } as const,

  /**
   * Color variants
   * Maps to semantic text color tokens
   */
  colors: {
    default: "text-foreground", // Default foreground color
    muted: "text-muted-foreground", // Muted foreground color
    success: "text-success", // Semantic success color
    warning: "text-warning", // Semantic warning color
    danger: "text-destructive", // Semantic destructive/danger color
    info: "text-info", // Semantic info color
  } as const,
} as const;

/**
 * Type exports for Icon tokens
 */
export type IconSize = keyof typeof ICON_TOKENS.sizes;
export type IconStroke = keyof typeof ICON_TOKENS.stroke;
export type IconColor = keyof typeof ICON_TOKENS.colors;
