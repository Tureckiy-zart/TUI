/**
 * EmptyState Component Tokens
 *
 * Component-level design tokens for EmptyState component.
 * Maps foundation tokens (spacing, typography, radius) to empty-state-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * This is an isolated token domain - tokens are specific to EmptyState component only.
 * No other components should import or use EMPTY_STATE_TOKENS.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * EmptyState Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for EmptyState component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const EMPTY_STATE_TOKENS = {
  /**
   * Spacing tokens for EmptyState
   * Maps to semantic spacing tokens
   */
  spacing: {
    gap: "gap-md", // 16px (1rem) - gap between elements - maps to semanticSpacing.md
    padding: "p-lg", // 24px (1.5rem) - container padding - maps to semanticSpacing.lg
    action: "mt-2", // Action button margin top - maps to semanticSpacing.xs
  } as const,

  /**
   * Border radius for EmptyState container
   */
  radius: {
    default: "rounded-xl", // 12px (0.75rem) - maps to borderRadius.xl
  } as const,

  /**
   * Icon sizes by variant
   * Maps to Tailwind size utilities
   */
  icon: {
    size: {
      sm: "size-8", // 32px (2rem)
      md: "size-12", // 48px (3rem)
      lg: "size-16", // 64px (4rem)
    },
    container: "flex items-center justify-center text-muted-foreground", // Icon container styles
  } as const,

  /**
   * Typography tokens for EmptyState
   * Maps to foundation typography tokens
   */
  typography: {
    title: {
      fontSize: "text-lg", // Maps to fontSize.lg[0]
      fontWeight: "font-semibold", // Maps to fontWeight.semibold
      color: "text-foreground", // Title text color
    },
    description: {
      fontSize: "text-sm", // Maps to fontSize.sm[0]
      fontWeight: "font-normal", // Maps to fontWeight.normal
      color: "text-muted-foreground", // Description text color
      maxWidth: "max-w-md", // Maximum width for description
    },
  } as const,

  /**
   * Alignment tokens
   * For text alignment in EmptyState
   */
  alignment: {
    center: "text-center", // Center alignment
    left: "text-left", // Left alignment
    right: "text-right", // Right alignment
  } as const,
} as const;

/**
 * Type exports for EmptyState tokens
 */
export type EmptyStateIconSize = keyof typeof EMPTY_STATE_TOKENS.icon.size;
export type EmptyStateAlignment = keyof typeof EMPTY_STATE_TOKENS.alignment;
