/**
 * Toast Component Tokens
 *
 * Component-level design tokens for Toast components.
 * Maps foundation tokens (spacing, radius, shadows, motion) to toast-specific usage.
 *
 * All values use Tailwind utility classes that map to foundation tokens.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Toast Component Tokens
 *
 * Defines tokens for toast spacing, radius, shadow, surface variants, and animations.
 * Values are mapped to Tailwind utility classes for direct use.
 */
export const TOAST_TOKENS = {
  /**
   * Spacing tokens for toast layout
   * Maps to semanticSpacing tokens
   */
  spacing: {
    gap: "gap-sm", // 8px - maps to semanticSpacing.sm
    padding: "p-md", // 16px - maps to semanticSpacing.md
    paddingHorizontal: "px-md", // 16px horizontal padding
    paddingVertical: "py-md", // 16px vertical padding
  } as const,

  /**
   * Border radius for toasts
   * Maps to componentRadius.toast
   */
  radius: {
    default: "rounded-lg", // 8px - maps to borderRadius.lg / componentRadius.toast.md
  } as const,

  /**
   * Shadow for toasts
   * Maps to elevationShadows
   */
  shadow: {
    default: "shadow-lg", // Maps to elevationShadows.lg
  } as const,

  /**
   * Surface tokens for toast variants
   * Maps to SURFACE_TOKENS for background colors
   */
  surface: {
    success: "bg-success/10 border-success/20 text-success-foreground",
    info: "bg-info/10 border-info/20 text-info-foreground",
    warning: "bg-warning/10 border-warning/20 text-warning-foreground",
    danger: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
    default: "bg-background border border-border text-foreground",
  } as const,

  /**
   * Animation tokens for toast enter/exit animations
   * Maps to Motion V2 utility classes
   * Uses CSS-only animations from motion/v2.ts
   */
  animation: {
    enter: {
      slideUp: "tm-motion-fade-slide-up", // Motion V2 fade + slide up
      fadeIn: "tm-motion-fade-in", // Motion V2 fade in
      combined: "tm-motion-fade-slide-right", // Motion V2 fade + slide right (for toast from right)
    } as const,
    exit: {
      slideOutRight: "tm-motion-fade-slide-left-out", // Motion V2 fade + slide left out
      fadeOut: "tm-motion-fade-out", // Motion V2 fade out
      combined: "tm-motion-fade-slide-left-out", // Motion V2 fade + slide left out
    } as const,
  } as const,

  /**
   * Position tokens for toast viewport
   * Maps to spacing tokens for positioning
   */
  position: {
    spacing: {
      top: "top-md", // 16px - maps to semanticSpacing.md
      right: "right-md", // 16px - maps to semanticSpacing.md
      bottom: "bottom-md", // 16px - maps to semanticSpacing.md
      left: "left-md", // 16px - maps to semanticSpacing.md
    } as const,
  } as const,
} as const;

/**
 * Type exports for Toast tokens
 */
export type ToastVariant = keyof typeof TOAST_TOKENS.surface;
