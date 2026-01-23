/**
 * Avatar Component Tokens
 *
 * Component-level design tokens for Avatar component.
 * Maps foundation tokens (spacing, typography, radius, colors) to avatar-specific usage.
 *
 * All values reference foundation tokens via Tailwind utility classes to ensure consistency.
 */

/**
 * Avatar Component Tokens
 *
 * Defines all sizing, typography, radius, and color tokens for Avatar component.
 * Values are mapped to Tailwind utility classes that correspond to foundation tokens.
 */
export const AVATAR_TOKENS = {
  /**
   * Avatar size tokens
   * Maps to Tailwind spacing utilities for consistent avatar sizing
   */
  size: {
    xs: "h-6 w-6", // 24px (1.5rem) - maps to spacing[6]
    sm: "h-8 w-8", // 32px (2rem) - maps to spacing[8]
    md: "h-10 w-10", // 40px (2.5rem) - maps to spacing[10] (default)
    lg: "h-12 w-12", // 48px (3rem) - maps to spacing[12]
    xl: "h-14 w-14", // 56px (3.5rem) - maps to spacing[14]
    "2xl": "h-16 w-16", // 64px (4rem) - maps to spacing[16]
  } as const,

  /**
   * Avatar fallback text size tokens
   * Maps to Tailwind typography utilities for initials text sizing
   */
  fallbackTextSize: {
    xs: "text-xs", // 12px (0.75rem)
    sm: "text-sm", // 14px (0.875rem)
    md: "text-base", // 16px (1rem) (default)
    lg: "text-lg", // 18px (1.125rem)
    xl: "text-xl", // 20px (1.25rem)
    "2xl": "text-2xl", // 24px (1.5rem)
  } as const,

  /**
   * Avatar shape tokens (border radius)
   * Maps to Tailwind radius utilities
   */
  shape: {
    circle: "rounded-full", // Full circular (9999px)
    square: "rounded-md", // Medium radius (6px)
  } as const,

  /**
   * Avatar status indicator size tokens
   * Scales with avatar size
   */
  statusSize: {
    xs: "h-1.5 w-1.5", // 6px
    sm: "h-2 w-2", // 8px
    md: "h-2.5 w-2.5", // 10px (default)
    lg: "h-3 w-3", // 12px
    xl: "h-3.5 w-3.5", // 14px
    "2xl": "h-4 w-4", // 16px
  } as const,

  /**
   * Avatar status color tokens
   * Maps to semantic color utilities
   */
  statusColor: {
    online: "bg-success", // Green
    offline: "bg-muted", // Gray
    busy: "bg-warning", // Yellow/Orange
  } as const,

  /**
   * Avatar fallback background and text colors
   */
  fallbackColors: {
    bg: "bg-muted",
    text: "text-[hsl(var(--tm-text-muted))]",
  } as const,

  /**
   * Avatar image and fallback fill tokens
   * Ensures content fills container (100% height/width)
   */
  fill: {
    container: "h-full w-full",
  } as const,

  /**
   * Avatar status border tokens
   * Border width and color for status indicator
   * Uses standard border (1px) - sufficient for status indicator visibility
   */
  statusBorder: {
    width: "border", // Standard 1px border width
    color: "border-[hsl(var(--tm-surface-base))]",
  } as const,

  /**
   * Avatar status shape tokens
   * Border radius for status indicator (always circular)
   * Uses rounded-full same as shape.circle
   */
  statusShape: {
    circle: "rounded-full", // Full circular (9999px) - same as shape.circle
  } as const,

  /**
   * Avatar status position tokens
   * Absolute positioning for status indicator at bottom-right corner
   * Note: Uses standard Tailwind positioning utilities (bottom-0, right-0)
   * which are part of Tailwind's core spacing system, not numeric custom values
   */
  statusPosition: {
    alignment: "bottom-0 right-0", // Align to bottom-right using standard Tailwind utilities
  } as const,
} as const;

/**
 * Type exports for Avatar tokens
 */
export type AvatarTokenSize = keyof typeof AVATAR_TOKENS.size;
export type AvatarTokenShape = keyof typeof AVATAR_TOKENS.shape;
export type AvatarTokenStatus = keyof typeof AVATAR_TOKENS.statusColor;
