/**
 * Tooltip Component Tokens
 *
 * Component-level design tokens for Tooltip component.
 * Maps foundation tokens (spacing, radius, shadows, typography) to tooltip-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Tooltip Component Tokens
 *
 * Defines tokens for tooltip content styling.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const TOOLTIP_TOKENS = {
  /**
   * Tooltip content tokens
   * Maps to foundation spacing, radius, shadow, and typography tokens
   */
  content: {
    border: {
      default: "border", // Border utility
      color: "border-border", // Border color using token
    } as const,
    background: {
      default: "bg-popover", // Background using token
    } as const,
    text: {
      default: "text-popover-foreground", // Text color using token
    } as const,
    padding: {
      horizontal: "px-sm", // 8px horizontal - maps to semanticSpacing.sm
      vertical: "py-xs", // 4px vertical - maps to semanticSpacing.xs
    } as const,
    radius: {
      sm: "rounded-sm", // 4px - maps to borderRadius.sm
      md: "rounded-md", // 6px - maps to borderRadius.md (default)
    } as const,
    shadow: {
      sm: "shadow-sm", // Maps to elevationShadows.sm
      md: "shadow-md", // Maps to elevationShadows.md (default)
    } as const,
    fontSize: {
      sm: "text-sm", // Maps to fontSize.sm (default)
    } as const,
  } as const,
} as const;

/**
 * Type exports for Tooltip tokens
 */
export type TooltipContentRadius = keyof typeof TOOLTIP_TOKENS.content.radius;
export type TooltipContentShadow = keyof typeof TOOLTIP_TOKENS.content.shadow;
