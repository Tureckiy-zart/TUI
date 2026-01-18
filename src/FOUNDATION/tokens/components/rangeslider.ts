/**
 * RangeSlider Component Tokens
 *
 * Token definitions for RangeSlider component.
 * All visual properties use token references exclusively.
 *
 * Authority Compliance:
 * - Spacing Authority: Uses spacing tokens (h-4, h-5, h-6, etc.)
 * - Typography Authority: References fontSize tokens (text-xs, text-sm, text-base)
 * - Color Authority: Uses semantic color tokens (bg-primary-*, bg-secondary-*, bg-border)
 * - Radius Authority: Uses rounded-full for track and thumb
 * - Motion Authority: Uses transition-colors
 */

/**
 * RangeSlider Tokens
 *
 * Defines size tokens for root container, track, thumb, and marks.
 * Defines variant tokens for track, range, and thumb colors.
 * Supports size variants: sm, md, lg (subset of GlobalSize scale).
 * Supports variant: primary, secondary, outline (subset of InteractiveVariant).
 */
export const RANGESLIDER_TOKENS = {
  /**
   * Root container size tokens per size variant
   * Maps to GlobalSize scale subset: sm, md, lg
   */
  root: {
    size: {
      sm: {
        height: "h-4", // Small: 16px
        width: "w-6", // Small: 24px (vertical)
      },
      md: {
        height: "h-5", // Medium: 20px - DEFAULT
        width: "w-7", // Medium: 28px (vertical)
      },
      lg: {
        height: "h-6", // Large: 24px
        width: "w-8", // Large: 32px (vertical)
      },
    },
  },

  /**
   * Track (background bar) size and variant tokens
   */
  track: {
    size: {
      sm: {
        height: "h-1", // Small: 4px
        width: "w-1.5", // Small: 6px (vertical)
      },
      md: {
        height: "h-1.5", // Medium: 6px - DEFAULT
        width: "w-2", // Medium: 8px (vertical)
      },
      lg: {
        height: "h-2", // Large: 8px
        width: "w-2.5", // Large: 10px (vertical)
      },
    },
    variant: {
      primary: "bg-primary-200 dark:bg-primary-800",
      secondary: "bg-secondary-200 dark:bg-secondary-800",
      outline: "bg-border",
    },
  },

  /**
   * Range (filled portion) variant tokens
   */
  range: {
    variant: {
      primary: "bg-primary-600 dark:bg-primary-500",
      secondary: "bg-secondary-600 dark:bg-secondary-500",
      outline: "bg-primary-600 dark:bg-primary-500",
    },
  },

  /**
   * Thumb (draggable handle) size and variant tokens
   */
  thumb: {
    size: {
      sm: {
        height: "h-4", // Small: 16px
        width: "w-4", // Small: 16px
      },
      md: {
        height: "h-5", // Medium: 20px - DEFAULT
        width: "w-5", // Medium: 20px
      },
      lg: {
        height: "h-6", // Large: 24px
        width: "w-6", // Large: 24px
      },
    },
    variant: {
      primary: {
        border: "border-primary-600 dark:border-primary-500",
        background: "bg-background",
        focusRing: "focus-visible:ring-primary-600 dark:focus-visible:ring-primary-500",
      },
      secondary: {
        border: "border-secondary-600 dark:border-secondary-500",
        background: "bg-background",
        focusRing: "focus-visible:ring-secondary-600 dark:focus-visible:ring-secondary-500",
      },
      outline: {
        border: "border-primary-600 dark:border-primary-500",
        background: "bg-background",
        focusRing: "focus-visible:ring-primary-600 dark:focus-visible:ring-primary-500",
      },
    },
    border: "border-2",
    focusRing: "focus-visible:ring-2 focus-visible:ring-offset-2",
  },

  /**
   * Mark (visual tick marks) size tokens
   */
  mark: {
    dot: {
      size: {
        sm: {
          height: "h-1", // Small: 4px
          width: "w-1", // Small: 4px
        },
        md: {
          height: "h-1.5", // Medium: 6px - DEFAULT
          width: "w-1.5", // Medium: 6px
        },
        lg: {
          height: "h-2", // Large: 8px
          width: "w-2", // Large: 8px
        },
      },
    },
    label: {
      fontSize: {
        sm: "text-xs", // Small: 12px
        md: "text-sm", // Medium: 14px - DEFAULT
        lg: "text-base", // Large: 16px
      },
      marginTop: {
        sm: "mt-xs", // Small: 4px - maps to semanticSpacing.xs
        md: "mt-1.5", // Medium: 6px - standard Tailwind class (spacing[1.5])
        lg: "mt-sm", // Large: 8px - maps to semanticSpacing.sm
      },
      marginLeft: {
        sm: "ml-xs", // Small: 4px (vertical) - maps to semanticSpacing.xs
        md: "ml-1.5", // Medium: 6px (vertical) - standard Tailwind class (spacing[1.5])
        lg: "ml-sm", // Large: 8px (vertical) - maps to semanticSpacing.sm
      },
    },
  },
} as const;
