/**
 * Pagination Component Tokens
 *
 * Component-level design tokens for Pagination component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to pagination-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * This is an isolated token domain - tokens are specific to Pagination component only.
 * No other components should import or use PAGINATION_TOKENS.
 *
 * Note: Pagination may also use shared tokens like ICON_TOKENS for icon sizing
 * and MOTION_TOKENS for transitions, but pagination-specific styling uses this domain.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Pagination Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Pagination component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const PAGINATION_TOKENS = {
  /**
   * Container tokens
   * For pagination root container
   */
  container: {
    layout: "flex items-center", // Container layout
    gap: "gap-xs", // 4px (0.25rem) - gap between items - maps to semanticSpacing.xs
  } as const,

  /**
   * Item size tokens
   * For pagination item dimensions
   */
  sizes: {
    md: {
      height: "h-9", // 36px (2.25rem)
      padding: {
        horizontal: "px-md", // 16px (1rem) - maps to semanticSpacing.md
        vertical: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      },
      fontSize: "text-sm", // Maps to fontSize.sm[0]
    },
  } as const,

  /**
   * Border radius for pagination items
   */
  radius: {
    default: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
  } as const,

  /**
   * Typography tokens for pagination
   */
  typography: {
    fontWeight: {
      medium: "font-medium", // Medium font weight
    },
  } as const,

  /**
   * State-based tokens for pagination items
   * Colors, backgrounds, and borders for different states
   */
  states: {
    default: {
      background: "bg-transparent",
      text: "text-foreground",
      border: "border-transparent border-input", // Border with input color
      hover: {
        background: "hover:bg-accent",
        text: "hover:text-accent-foreground",
      },
    },
    selected: {
      background: "bg-primary",
      text: "text-primary-foreground",
      border: "border-primary",
      shadow: "shadow-sm", // Maps to elevationShadows.sm
    },
    disabled: {
      cursor: "disabled:cursor-not-allowed",
    },
  } as const,

  /**
   * Icon tokens
   * For pagination navigation icons (prev/next)
   * Note: Icon size/color should use ICON_TOKENS, but icon container styling is here
   */
  icon: {
    size: "h-4 w-4", // 16px (1rem) - icon size
    srOnly: "sr-only", // Screen reader only text
  } as const,
} as const;

/**
 * Type exports for Pagination tokens
 */
export type PaginationSize = keyof typeof PAGINATION_TOKENS.sizes;
export type PaginationState = keyof typeof PAGINATION_TOKENS.states;
