/**
 * Divider Component Tokens
 *
 * Component-level design tokens for Divider component.
 * Maps foundation tokens to divider-specific usage.
 */

/**
 * Divider Component Tokens
 *
 * Defines tokens for divider width, height, tone colors, and inset spacing.
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

  /**
   * Tone color tokens
   * Maps tone variants to background color classes
   */
  tone: {
    border: "bg-border", // Border color (default)
    muted: "bg-muted", // Muted color
    primary: "bg-primary/20", // Primary color with opacity
    secondary: "bg-secondary/20", // Secondary color with opacity
    accent: "bg-accent/20", // Accent color with opacity
  } as const,

  /**
   * Inset spacing tokens
   * Fixed spacing for inset padding (when inset=true)
   * Uses semantic spacing token (md = 16px)
   */
  inset: {
    horizontal: "px-md", // Horizontal padding for horizontal divider (16px)
    vertical: "py-md", // Vertical padding for vertical divider (16px)
  } as const,
} as const;

/**
 * Type exports for Divider tokens
 */
export type DividerWidth = keyof typeof DIVIDER_TOKENS.width;
export type DividerHeight = keyof typeof DIVIDER_TOKENS.height;
export type DividerTone = keyof typeof DIVIDER_TOKENS.tone;
