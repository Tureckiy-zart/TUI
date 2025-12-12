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
   * Width tokens for toast layout
   * Maps to width utilities
   */
  width: {
    full: "w-full", // Full width (100%)
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
   * Maps to Motion V2 utility classes and Radix data attributes
   * Uses CSS-only animations from motion/v2.ts
   * Radix Toast provides data-[state=open] and data-[state=closed] attributes
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
    /**
     * Radix Toast data attribute classes
     * These are applied automatically by Radix based on toast state
     */
    radix: {
      /**
       * Base classes for Radix Toast Root
       * Includes swipe handling and state-based animations
       */
      root: "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out",
      /**
       * State-based animation classes
       */
      state: {
        open: "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
        closed:
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
      } as const,
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

  /**
   * Content layout tokens
   * For toast content container
   */
  content: {
    layout: "flex flex-1 items-start", // Content container layout
    gap: "gap-sm", // Gap between content elements - maps to spacing.gap
    verticalSpacing: "space-y-xs", // Vertical spacing between title and description (4px)
  } as const,

  /**
   * Title typography tokens
   * Maps to TEXT_TOKENS for font sizing and weight
   */
  title: {
    fontSize: "text-sm", // Maps to TEXT_TOKENS.fontSize.sm
    fontWeight: "font-semibold", // Maps to TEXT_TOKENS.fontWeight.semibold
  } as const,

  /**
   * Description typography tokens
   * Maps to TEXT_TOKENS for font sizing
   */
  description: {
    fontSize: "text-sm", // Maps to TEXT_TOKENS.fontSize.sm
    opacity: "opacity-90", // Description text opacity (90%)
  } as const,

  /**
   * Action button tokens
   * For toast action button sizing
   */
  action: {
    height: "h-8", // Action button height (32px)
    padding: "px-xs", // Action button horizontal padding
    fontSize: "text-xs", // Maps to TEXT_TOKENS.fontSize.xs
  } as const,

  /**
   * Dismiss button tokens
   * For toast dismiss button styling
   */
  dismiss: {
    position: "absolute right-xs top-xs", // Dismiss button positioning
    size: "h-6 w-6", // Dismiss button size (24px)
    radius: "rounded-md", // Dismiss button border radius (6px)
    padding: "p-xs", // Dismiss button padding
    transition: "transition-opacity", // Maps to MOTION_TOKENS.transition.opacity
    colors: {
      default: "text-foreground/50", // Default text color with 50% opacity
      hover: "hover:text-foreground", // Hover text color
    } as const,
    states: {
      default: "opacity-0", // Default opacity (hidden)
      groupHover: "group-hover:opacity-100", // Visible on group hover
      focus: "focus:opacity-100", // Visible on focus
      focusRing: "focus:outline-none focus:ring-1", // Focus ring styling
    } as const,
  } as const,
} as const;

/**
 * Type exports for Toast tokens
 */
export type ToastVariant = keyof typeof TOAST_TOKENS.surface;
