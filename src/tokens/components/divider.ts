/**
 * Divider Component Tokens
 *
 * Component-level design tokens for Divider component.
 * Maps foundation tokens to divider-specific usage.
 */

/**
 * Divider Component Tokens
 *
 * Defines tokens for divider width and height.
 */
export const DIVIDER_TOKENS = {
  /**
   * Width tokens
   */
  width: {
    full: "w-full", // Full width (100%)
  } as const,

  /**
   * Height tokens
   */
  height: {
    full: "h-full", // Full height (100%)
  } as const,
} as const;

/**
 * Type exports for Divider tokens
 */
export type DividerWidth = keyof typeof DIVIDER_TOKENS.width;
export type DividerHeight = keyof typeof DIVIDER_TOKENS.height;
