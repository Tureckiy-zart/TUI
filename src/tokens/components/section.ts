/**
 * Section Component Tokens
 *
 * Component-level design tokens for Section component.
 * Maps foundation tokens (spacing) to section-specific usage for page/landing layout composition.
 *
 * Defines tokens for vertical padding and content spacing within sections.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Section Component Tokens
 *
 * Defines padding and spacing tokens for Section component.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const SECTION_TOKENS = {
  /**
   * Vertical padding for sections
   * Used for spacing between major page sections
   */
  padding: {
    sm: "py-md", // 16px (1rem) - maps to semanticSpacing.md
    md: "py-xl", // 32px (2rem) - maps to semanticSpacing.xl
    lg: "py-2xl", // 48px (3rem) - maps to semanticSpacing.2xl
    xl: "py-3xl", // 64px (4rem) - maps to semanticSpacing.3xl
  } as const,

  /**
   * Gap spacing for content blocks within sections
   * Used for spacing between content elements in a section
   */
  spacing: {
    sm: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    md: "gap-md", // 16px (1rem) - maps to semanticSpacing.md
    lg: "gap-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
    xl: "gap-xl", // 32px (2rem) - maps to semanticSpacing.xl
  } as const,
} as const;

/**
 * Type exports for Section tokens
 */
export type SectionPadding = keyof typeof SECTION_TOKENS.padding;
export type SectionGap = keyof typeof SECTION_TOKENS.spacing;
