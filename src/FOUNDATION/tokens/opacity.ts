/**
 * Opacity Tokens
 *
 * Component-level opacity tokens for disabled states and overlays.
 * Maps to Tailwind opacity utilities.
 */

/**
 * Opacity Component Tokens
 *
 * Defines opacity values for common use cases like disabled states.
 */
export const OPACITY_TOKENS = {
  /**
   * Disabled state opacity
   * Used for disabled form controls and interactive elements
   */
  disabled: "opacity-50", // 50% opacity for disabled state
} as const;

/**
 * Type exports for Opacity tokens
 */
export type OpacityToken = keyof typeof OPACITY_TOKENS;
