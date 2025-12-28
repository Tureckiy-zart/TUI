/**
 * Separator Component Tokens
 *
 * Token definitions for Separator component thickness values.
 * Separator uses 1px and 2px thickness values which are not part of the standard spacing scale.
 */

/**
 * Separator thickness tokens
 * Maps thickness values (1, 2) to Tailwind height/width classes
 */
export const SEPARATOR_TOKENS = {
  /**
   * Thickness tokens for separator component
   * These are component-specific tokens for 1px and 2px thickness values
   */
  thickness: {
    "1": "h-px", // 1px height (standard Tailwind class)
    "2": "h-0.5", // 2px height (0.125rem) - standard Tailwind class, maps to spacing[0.5]
  },
  /**
   * Width tokens for vertical separators
   */
  width: {
    "1": "w-px", // 1px width (standard Tailwind class)
    "2": "w-0.5", // 2px width (0.125rem) - standard Tailwind class, maps to spacing[0.5]
  },
} as const;
