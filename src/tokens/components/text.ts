/**
 * Text Component Tokens
 *
 * Component-level design tokens for Text component.
 * Maps foundation typography tokens to text-specific usage patterns.
 *
 * These tokens serve as second-level abstractions that reference foundation
 * typography tokens (fontSize, fontWeight, lineHeight, letterSpacing).
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Text Component Tokens
 *
 * Defines typography tokens for Text component.
 * All values reference foundation typography tokens to ensure consistency.
 */
export const TEXT_TOKENS = {
  /**
   * Font sizes by text size variant
   * Maps to foundation fontSize tokens
   */
  fontSize: {
    xs: "text-xs", // Maps to fontSize.xs[0]
    sm: "text-sm", // Maps to fontSize.sm[0]
    md: "text-base", // Maps to fontSize.base[0]
    lg: "text-lg", // Maps to fontSize.lg[0]
    xl: "text-xl", // Maps to fontSize.xl[0]
  } as const,

  /**
   * Font weights by weight variant
   * Maps to foundation fontWeight tokens
   */
  fontWeight: {
    normal: "font-normal", // Maps to fontWeight.normal (400)
    medium: "font-medium", // Maps to fontWeight.medium (500)
    semibold: "font-semibold", // Maps to fontWeight.semibold (600)
    bold: "font-bold", // Maps to fontWeight.bold (700)
  } as const,

  /**
   * Line heights (if component-specific)
   * Maps to foundation lineHeight tokens
   */
  lineHeight: {
    none: "leading-none", // Maps to lineHeight.none
    tight: "leading-tight", // Maps to lineHeight.tight
    normal: "leading-normal", // Maps to lineHeight.normal
    relaxed: "leading-relaxed", // Maps to lineHeight.relaxed
    loose: "leading-loose", // Maps to lineHeight.loose
  } as const,

  /**
   * Letter spacing (tracking) values
   * Maps to foundation letterSpacing tokens
   */
  letterSpacing: {
    tighter: "tracking-tighter", // Maps to letterSpacing.tighter
    tight: "tracking-tight", // Maps to letterSpacing.tight
    normal: "tracking-normal", // Maps to letterSpacing.normal
    wide: "tracking-wide", // Maps to letterSpacing.wide
    wider: "tracking-wider", // Maps to letterSpacing.wider
    widest: "tracking-widest", // Maps to letterSpacing.widest
  } as const,
} as const;

/**
 * Type exports for Text tokens
 */
export type TextFontSize = keyof typeof TEXT_TOKENS.fontSize;
export type TextFontWeight = keyof typeof TEXT_TOKENS.fontWeight;
export type TextLineHeight = keyof typeof TEXT_TOKENS.lineHeight;
export type TextLetterSpacing = keyof typeof TEXT_TOKENS.letterSpacing;
