/**
 * Popover Component Tokens
 *
 * Component-level design tokens for Popover component.
 * Maps foundation tokens (spacing, radius, shadows, motion) to popover-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Popover Component Tokens
 *
 * Defines tokens for popover content, arrow, and animations.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const POPOVER_TOKENS = {
  /**
   * Popover content tokens by size
   * Maps to foundation spacing, radius, and shadow tokens
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
      sm: "p-sm", // 8px - maps to semanticSpacing.sm
      md: "p-md", // 16px - maps to semanticSpacing.md
      lg: "p-lg", // 24px - maps to semanticSpacing.lg
    } as const,
    radius: {
      sm: "rounded-md", // 6px - maps to borderRadius.md
      md: "rounded-lg", // 8px - maps to borderRadius.lg
    } as const,
    shadow: {
      sm: "shadow-md", // Maps to elevationShadows.md
      md: "shadow-lg", // Maps to elevationShadows.lg
    } as const,
    width: {
      xs: "w-40", // 160px - maps to spacing[40]
      sm: "w-48", // 192px - maps to spacing[48]
      md: "w-72", // 288px - maps to spacing[72]
      lg: "w-96", // 384px - maps to spacing[96]
      xl: "w-[32rem]", // 512px - custom large size
    } as const,
  } as const,

  /**
   * Popover arrow tokens
   * Maps to foundation spacing tokens
   */
  arrow: {
    size: {
      sm: "w-2 h-2", // 8px - maps to spacing[2]
      md: "w-3 h-3", // 12px - maps to spacing[3]
    } as const,
    offset: {
      sm: "-translate-x-1/2", // Center horizontally - standard Tailwind utility
      md: "-translate-x-1/2", // Center horizontally - standard Tailwind utility
    } as const,
  } as const,

  /**
   * Animation tokens for popover enter/exit animations
   * Maps to Motion V2 utility classes
   * Uses CSS-only animations from motion/v2.ts
   */
  animation: {
    enter: "tm-motion-fade-scale", // Motion V2 fade + scale animation
    exit: "tm-motion-fade-scale-out", // Motion V2 fade + scale exit animation
  } as const,
} as const;

/**
 * Type exports for Popover tokens
 */
export type PopoverContentPadding = keyof typeof POPOVER_TOKENS.content.padding;
export type PopoverContentRadius = keyof typeof POPOVER_TOKENS.content.radius;
export type PopoverContentShadow = keyof typeof POPOVER_TOKENS.content.shadow;
export type PopoverContentWidth = keyof typeof POPOVER_TOKENS.content.width;
export type PopoverArrowSize = keyof typeof POPOVER_TOKENS.arrow.size;
export type PopoverArrowOffset = keyof typeof POPOVER_TOKENS.arrow.offset;
