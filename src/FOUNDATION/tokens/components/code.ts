/**
 * Code Component Tokens
 *
 * Component-level design tokens for Code component.
 * Maps foundation tokens to code-specific usage patterns.
 */

/**
 * Code Component Tokens
 *
 * Defines tokens for Code component.
 * All values reference foundation tokens to ensure consistency.
 */
export const CODE_TOKENS = {
  /**
   * Background color tokens
   * Uses semantic color tokens
   */
  background: {
    muted: "bg-muted", // Muted background for code blocks
  } as const,

  /**
   * Border radius tokens
   * Maps to foundation borderRadius tokens
   */
  radius: {
    inline: "rounded", // Small radius for inline code
    block: "rounded-md", // Medium radius for code blocks
  } as const,

  /**
   * Padding tokens
   * Maps to foundation spacing tokens
   */
  padding: {
    inline: "px-xs py-0.5", // 4px horizontal, 4px vertical for inline code
    block: "p-md", // 16px padding for code blocks
  } as const,
} as const;

/**
 * Type exports for Code tokens
 */
export type CodeBackground = keyof typeof CODE_TOKENS.background;
export type CodeRadius = keyof typeof CODE_TOKENS.radius;
