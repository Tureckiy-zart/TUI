/**
 * StickyBar Component Tokens
 *
 * Component-level design tokens for StickyBar component.
 * Maps foundation tokens (color, elevation) to stickybar-specific usage.
 *
 * Defines tokens for canonical StickyBarTone names: default, elevated, muted.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * StickyBar Component Tokens
 *
 * Defines background, shadow, and z-index tokens for StickyBar component variants.
 * Values are mapped to Tailwind utility classes for direct use.
 * Uses canonical StickyBarTone names: default, elevated, muted.
 */
export const STICKYBAR_TOKENS = {
  /**
   * Z-index value for sticky positioning
   * Maps to zIndex.sticky (20) from ELEVATION_AUTHORITY
   * Applied via inline style in component
   */
  zIndex: 20, // zIndex.sticky = 20

  /**
   * Position tokens for sticky positioning
   */
  position: {
    top: "sticky top-0",
    bottom: "sticky bottom-0",
  } as const,

  /**
   * Tone variant tokens
   * Maps to background color tokens and elevation shadows
   */
  tone: {
    default: "bg-[hsl(var(--tm-surface-base))]",
    elevated: "bg-[hsl(var(--tm-surface-raised))] shadow-sm",
    muted: "bg-[hsl(var(--tm-muted))]/50",
  } as const,
} as const;

/**
 * Type exports for StickyBar tokens
 */
export type StickyBarPosition = keyof typeof STICKYBAR_TOKENS.position;
export type StickyBarTone = keyof typeof STICKYBAR_TOKENS.tone;
