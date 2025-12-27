/**
 * Slider Component Tokens
 *
 * Token definitions for Slider component.
 * All visual properties use token references exclusively.
 */

/**
 * Slider Tokens
 *
 * Defines size tokens for root container, track, thumb, and marks.
 * Supports size variants: sm, md, lg (subset of GlobalSize scale).
 */
export const SLIDER_TOKENS = {
  /**
   * Root container size tokens per size variant
   * Maps to GlobalSize scale subset: sm, md, lg
   */
  root: {
    size: {
      sm: {
        height: "h-4", // Small: 16px
        width: "w-4", // Small: 16px (vertical)
      },
      md: {
        height: "h-5", // Medium: 20px - DEFAULT
        width: "w-5", // Medium: 20px (vertical)
      },
      lg: {
        height: "h-6", // Large: 24px
        width: "w-6", // Large: 24px (vertical)
      },
    },
  },

  /**
   * Track (background bar) size tokens
   */
  track: {
    size: {
      sm: {
        height: "h-1", // Small: 4px
        width: "w-1", // Small: 4px (vertical)
      },
      md: {
        height: "h-1.5", // Medium: 6px - DEFAULT
        width: "w-1.5", // Medium: 6px (vertical)
      },
      lg: {
        height: "h-2", // Large: 8px
        width: "w-2", // Large: 8px (vertical)
      },
    },
  },

  /**
   * Thumb (draggable handle) size tokens
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
  },

  /**
   * Mark dot size tokens
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
        sm: "mt-1", // Small: 4px
        md: "mt-1.5", // Medium: 6px
        lg: "mt-2", // Large: 8px
      },
      marginLeft: {
        sm: "ml-1", // Small: 4px (vertical)
        md: "ml-1.5", // Medium: 6px (vertical)
        lg: "ml-2", // Large: 8px (vertical)
      },
    },
  },
} as const;
