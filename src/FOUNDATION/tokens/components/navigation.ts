/**
 * Navigation Component Tokens
 *
 * Component-level design tokens for Navigation components (Tabs, SegmentedControl, Breadcrumbs, Pagination, Stepper).
 * Maps foundation tokens (spacing, typography, radius, shadows) to navigation-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Navigation Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Navigation components.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const NAVIGATION_TOKENS = {
  /**
   * Navigation item heights by size
   * Maps to Tailwind height utilities: h-8, h-9, h-10
   */
  sizes: {
    sm: {
      height: "h-8", // 32px (2rem)
      width: "w-8", // 32px (2rem) - for square indicators
      padding: {
        horizontal: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
        vertical: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      },
      fontSize: "text-xs", // Maps to fontSize.xs[0]
      gap: "gap-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
    },
    md: {
      height: "h-9", // 36px (2.25rem)
      padding: {
        horizontal: "px-md", // 16px (1rem) - maps to semanticSpacing.md
        vertical: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      },
      fontSize: "text-sm", // Maps to fontSize.sm[0]
      gap: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    },
    lg: {
      height: "h-10", // 40px (2.5rem)
      padding: {
        horizontal: "px-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
        vertical: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      },
      fontSize: "text-base", // Maps to fontSize.base[0]
      gap: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    },
  } as const,

  /**
   * Border radius for navigation items
   */
  radius: {
    default: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
    sm: "rounded-sm", // 4px (0.25rem) - maps to borderRadius.sm
    md: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
    lg: "rounded-lg", // 8px (0.5rem) - maps to borderRadius.lg
    full: "rounded-full", // 9999px - maps to borderRadius.full
  } as const,

  /**
   * Spacing tokens for navigation components
   */
  spacing: {
    itemPadding: {
      sm: "px-sm py-xs", // 8px horizontal, 4px vertical
      md: "px-md py-sm", // 16px horizontal, 8px vertical
      lg: "px-lg py-sm", // 24px horizontal, 8px vertical
    },
    listGap: {
      xs: "gap-xs", // 4px (0.25rem)
      sm: "gap-sm", // 8px (0.5rem)
      md: "gap-md", // 16px (1rem)
      lg: "gap-lg", // 24px (1.5rem)
    },
    content: {
      marginTop: "mt-md", // 16px (1rem) - spacing above content sections
    } as const,
  } as const,

  /**
   * Typography tokens for navigation components
   */
  typography: {
    default: "text-sm", // Maps to fontSize.sm[0]
    sm: "text-xs", // Maps to fontSize.xs[0]
    md: "text-sm", // Maps to fontSize.sm[0]
    lg: "text-base", // Maps to fontSize.base[0]
    fontWeight: {
      default: "font-medium",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
  } as const,

  /**
   * State-based tokens for navigation items
   * Colors, backgrounds, and borders for different states
   */
  states: {
    default: {
      background: "bg-transparent",
      text: "text-foreground",
      border: "border-transparent",
    },
    hover: {
      background: "hover:bg-accent",
      text: "hover:text-accent-foreground",
      border: "hover:border-accent",
    },
    active: {
      background: "bg-accent",
      text: "text-accent-foreground",
      border: "border-accent",
    },
    selected: {
      background: "bg-primary",
      text: "text-primary-foreground",
      border: "border-primary",
    },
    disabled: {
      background: "bg-transparent",
      text: "text-muted-foreground disabled:opacity-50",
      border: "border-transparent",
      cursor: "disabled:cursor-not-allowed",
    },
  } as const,

  /**
   * Indicator tokens for Tabs component
   * Used for underline/indicator animation
   */
  indicator: {
    height: "h-0.5", // 2px - thin underline
    radius: "rounded-full", // Fully rounded
    transition: "transition-all duration-normal ease-out", // Maps to motion tokens
    background: "bg-primary", // Primary color for indicator
    position: "absolute bottom-0 left-0 right-0", // Position at bottom
  } as const,

  /**
   * Shadow tokens for navigation components
   */
  shadow: {
    none: "shadow-none",
    sm: "shadow-sm", // Maps to elevationShadows.sm
    default: "shadow-sm", // Maps to elevationShadows.sm
    md: "shadow", // Maps to elevationShadows.xs
  } as const,

  /**
   * Focus ring tokens for accessibility
   */
  focus: {
    ring: "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2",
    ringOffset: "focus-visible:ring-offset-2",
  } as const,

  /**
   * Container background tokens
   * For segmented control and tab container backgrounds
   */
  container: {
    background: {
      muted: "bg-muted", // Muted background for container
    } as const,
    padding: {
      xs: "p-xs", // 4px padding
      sm: "p-sm", // 8px padding
    } as const,
  } as const,

  /**
   * Border color tokens
   */
  border: {
    muted: "border-muted-foreground", // Muted border color
  } as const,
} as const;

/**
 * Type exports for Navigation tokens
 */
export type NavigationSize = keyof typeof NAVIGATION_TOKENS.sizes;
export type NavigationRadius = keyof typeof NAVIGATION_TOKENS.radius;
export type NavigationState = keyof typeof NAVIGATION_TOKENS.states;
export type NavigationShadow = keyof typeof NAVIGATION_TOKENS.shadow;
export type NavigationListGap = keyof typeof NAVIGATION_TOKENS.spacing.listGap;
export type NavigationItemPadding = keyof typeof NAVIGATION_TOKENS.spacing.itemPadding;
