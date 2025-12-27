/**
 * Progress Component Tokens
 *
 * Token-driven styling for Progress component.
 * All visual properties reference tokens only.
 *
 * @module FOUNDATION/tokens/components/progress
 */

/**
 * Progress Tokens
 *
 * Defines height, radius, colors, and transitions for Progress component.
 * Supports size variants: sm, md, lg (subset of GlobalSize scale).
 */
export const PROGRESS_TOKENS = {
  /**
   * Height tokens per size variant
   * Maps to GlobalSize scale subset: sm, md, lg
   */
  height: {
    sm: "h-1", // Small: 4px (0.25rem)
    md: "h-2", // Medium: 8px (0.5rem) - DEFAULT
    lg: "h-3", // Large: 12px (0.75rem)
  },

  /**
   * Width token for track (container)
   * Full width by default
   */
  width: {
    full: "w-full", // 100% width
  },

  /**
   * Border radius token
   * Shared by track and fill (rounded pill shape)
   */
  radius: "rounded-full",

  /**
   * Track (background bar) styling
   */
  track: {
    bg: "bg-secondary", // Track background color (semantic secondary)
  },

  /**
   * Fill (progress bar) styling
   */
  fill: {
    bg: "bg-primary", // Fill background color (semantic primary)
  },

  /**
   * Transition token
   * Smooth width animation for progress changes
   */
  transition: "transition-[width] duration-normal",
} as const;

/**
 * Type exports for Progress tokens
 */
export type ProgressHeight = keyof typeof PROGRESS_TOKENS.height;
