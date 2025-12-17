/**
 * Card Component Tokens
 *
 * Component-level design tokens for Card component.
 * Maps foundation tokens (spacing, radius, shadows) to card-specific usage.
 *
 * Prepared for future size variants (sm, md, lg).
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Card Component Tokens
 *
 * Defines spacing, radius, and shadow tokens for Card component.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const CARD_TOKENS = {
  /**
   * Padding for card sections (CardHeader, CardContent, CardFooter)
   */
  padding: {
    sm: "p-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    md: "p-lg", // 24px (1.5rem) - current default - maps to semanticSpacing.lg
    lg: "p-xl", // 32px (2rem) - for future lg variant - maps to semanticSpacing.xl
  } as const,

  /**
   * Border radius for cards
   */
  radius: {
    sm: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
    md: "rounded-xl", // 12px (0.75rem) - current default - maps to borderRadius.xl
    lg: "rounded-2xl", // 16px (1rem) - for future lg variant - maps to borderRadius["2xl"]
  } as const,

  /**
   * Vertical spacing within card sections
   * Used for CardHeader spacing
   */
  spacing: {
    vertical: {
      xs: "space-y-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      sm: "space-y-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      md: "space-y-md", // 16px (1rem) - maps to semanticSpacing.md
    },
  } as const,

  /**
   * Shadow (elevation) for cards
   * Maps to foundation elevation shadow tokens
   */
  shadow: {
    default: "shadow", // Maps to elevationShadows.xs (default elevation)
    sm: "shadow-sm", // Maps to elevationShadows.sm
    md: "shadow-md", // Maps to elevationShadows.md
    lg: "shadow-lg", // Maps to elevationShadows.lg
  } as const,

  /**
   * Size-based token structure
   * Organized by size for easy access
   */
  size: {
    sm: {
      padding: "p-sm",
      radius: "rounded-md",
      shadow: "shadow-sm",
      spacing: {
        vertical: "space-y-xs",
      },
    },
    md: {
      padding: "p-lg",
      radius: "rounded-xl",
      shadow: "shadow",
      spacing: {
        vertical: "space-y-xs",
      },
    },
    lg: {
      padding: "p-xl",
      radius: "rounded-2xl",
      shadow: "shadow-md",
      spacing: {
        vertical: "space-y-sm",
      },
    },
  } as const,
} as const;

/**
 * Type exports for Card tokens
 */
export type CardPadding = keyof typeof CARD_TOKENS.padding;
export type CardRadius = keyof typeof CARD_TOKENS.radius;
export type CardSpacingVertical = keyof typeof CARD_TOKENS.spacing.vertical;
export type CardShadow = keyof typeof CARD_TOKENS.shadow;
export type CardSize = keyof typeof CARD_TOKENS.size;
