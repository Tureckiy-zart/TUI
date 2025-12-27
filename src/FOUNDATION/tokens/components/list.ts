/**
 * List Component Tokens
 *
 * Component-level design tokens for List component.
 * Maps foundation tokens (spacing, typography, radius) to list-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * This is an isolated token domain - tokens are specific to List component only.
 * No other components should import or use LIST_TOKENS.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * List Component Tokens
 *
 * Defines all spacing, sizing, typography, radius, and visual tokens for List component.
 * Values are mapped to Tailwind utility classes for direct use in component.
 */
export const LIST_TOKENS = {
  /**
   * Spacing tokens for List container
   * Maps to semantic spacing tokens
   */
  spacing: {
    gap: "space-y-sm", // 8px (0.5rem) - gap between list items - maps to semanticSpacing.sm
  } as const,

  /**
   * List item tokens
   * For individual list item styling
   */
  item: {
    /**
     * Padding tokens for item container
     * Maps to semantic spacing tokens
     */
    padding: "p-md", // 16px (1rem) - item padding - maps to semanticSpacing.md

    /**
     * Border radius tokens for item container
     * Maps to foundation radius tokens
     */
    radius: "rounded-lg", // 8px (0.5rem) - item border radius - maps to borderRadius.lg

    /**
     * Border token
     */
    border: "border", // Standard border

    /**
     * Transition token
     */
    transition: "transition-colors", // Color transitions

    /**
     * Hover state tokens
     */
    hover: {
      background: "hover:bg-muted/50", // Hover background - maps to muted color with 50% opacity
    },
  } as const,

  /**
   * Title tokens
   * For list item title styling
   */
  title: {
    fontWeight: "font-medium", // Medium font weight
    color: "text-foreground", // Foreground text color
  } as const,

  /**
   * Description tokens
   * For list item description styling
   */
  description: {
    /**
     * Margin top token
     * Maps to semantic spacing tokens
     */
    marginTop: "mt-xs", // 4px (0.25rem) - margin top - maps to semanticSpacing.xs

    /**
     * Font size token
     * Maps to foundation typography tokens
     */
    fontSize: "text-sm", // Small font size - maps to fontSize.sm

    /**
     * Text color token
     */
    color: "text-muted-foreground", // Muted foreground text color
  } as const,
} as const;
