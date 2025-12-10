/**
 * Switch Component Tokens
 *
 * Component-level design tokens for Switch component.
 * Maps foundation tokens (spacing, typography, radius, shadows, motion) to switch-specific usage.
 * All color values use CSS variables for theme-aware styling.
 *
 * Switch consists of a track (container) and handle (thumb) that slides within the track.
 */

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Switch Component Tokens
 *
 * Defines spacing, sizing, and visual tokens for Switch component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 * Switch track is wider than tall, with a circular handle that slides within.
 */
export const SWITCH_TOKENS = {
  /**
   * Track sizes by size variant
   * Supports xs, sm, md, lg, xl sizes
   * Track is wider than tall (typical switch proportions)
   */
  track: {
    xs: {
      width: "w-8", // 32px (2rem)
      height: "h-4", // 16px (1rem)
      radius: "rounded-full", // Fully rounded
    },
    sm: {
      width: "w-9", // 36px (2.25rem)
      height: "h-5", // 20px (1.25rem)
      radius: "rounded-full", // Fully rounded
    },
    md: {
      width: "w-11", // 44px (2.75rem) - default
      height: "h-6", // 24px (1.5rem) - default
      radius: "rounded-full", // Fully rounded
    },
    lg: {
      width: "w-14", // 56px (3.5rem)
      height: "h-7", // 28px (1.75rem)
      radius: "rounded-full", // Fully rounded
    },
    xl: {
      width: "w-16", // 64px (4rem)
      height: "h-8", // 32px (2rem)
      radius: "rounded-full", // Fully rounded
    },
  } as const,

  /**
   * Handle sizes by size variant
   * Circular thumb that slides within the track
   * Slightly smaller than track height to allow for padding
   */
  handle: {
    xs: {
      width: "w-3", // 12px (0.75rem)
      height: "h-3", // 12px (0.75rem)
      radius: "rounded-full", // Fully rounded
      translate: "translate-x-4", // Distance to move when checked (32px - 12px - 4px padding = 16px)
    },
    sm: {
      width: "w-4", // 16px (1rem)
      height: "h-4", // 16px (1rem)
      radius: "rounded-full", // Fully rounded
      translate: "translate-x-4", // Distance to move when checked (36px - 16px - 4px padding = 16px)
    },
    md: {
      width: "w-5", // 20px (1.25rem) - default
      height: "h-5", // 20px (1.25rem) - default
      radius: "rounded-full", // Fully rounded
      translate: "translate-x-5", // Distance to move when checked (44px - 20px - 4px padding = 20px)
    },
    lg: {
      width: "w-6", // 24px (1.5rem)
      height: "h-6", // 24px (1.5rem)
      radius: "rounded-full", // Fully rounded
      translate: "translate-x-7", // Distance to move when checked (56px - 24px - 4px padding = 28px)
    },
    xl: {
      width: "w-7", // 28px (1.75rem)
      height: "h-7", // 28px (1.75rem)
      radius: "rounded-full", // Fully rounded
      translate: "translate-x-8", // Distance to move when checked (64px - 28px - 4px padding = 32px)
    },
    /**
     * Handle positioning tokens
     * For absolute positioning within the track
     */
    position: {
      left: "left-xs", // 4px (0.125rem) - small offset from track edge
      top: "top-1/2", // Center vertically (50%)
      center: "-translate-y-1/2", // Center vertically using transform
    } as const,
  } as const,

  /**
   * Variant-based tokens
   * Track and handle colors for different variants
   * All use CSS variable references for theme support
   */
  variant: {
    primary: {
      track: {
        unchecked: "bg-[hsl(var(--input))]", // Input border color when unchecked
        checked: "bg-[hsl(var(--tm-primary))]", // Primary color when checked
      },
      handle: {
        unchecked: "bg-[hsl(var(--muted))]", // Muted color when unchecked
        checked: "bg-[hsl(var(--tm-primary-foreground))]", // Primary foreground when checked
      },
      focus: "focus-visible:shadow-[var(--focus-ring-primary)]", // Primary focus ring
    },
    secondary: {
      track: {
        unchecked: "bg-[hsl(var(--input))]", // Input border color when unchecked
        checked: "bg-[hsl(var(--tm-secondary))]", // Secondary color when checked
      },
      handle: {
        unchecked: "bg-[hsl(var(--muted))]", // Muted color when unchecked
        checked: "bg-[hsl(var(--tm-secondary-foreground))]", // Secondary foreground when checked
      },
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    outline: {
      track: {
        unchecked: "bg-[hsl(var(--input))]", // Input border color when unchecked
        checked: "bg-[hsl(var(--tm-primary))]", // Primary color when checked
      },
      handle: {
        unchecked: "bg-[hsl(var(--muted))]", // Muted color when unchecked
        checked: "bg-[hsl(var(--tm-primary-foreground))]", // Primary foreground when checked
      },
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    ghost: {
      track: {
        unchecked: "bg-[hsl(var(--muted))]", // Muted background when unchecked
        checked: "bg-[hsl(var(--tm-primary))]", // Primary color when checked
      },
      handle: {
        unchecked: "bg-[hsl(var(--muted-foreground))]", // Muted foreground when unchecked
        checked: "bg-[hsl(var(--tm-primary-foreground))]", // Primary foreground when checked
      },
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    destructive: {
      track: {
        unchecked: "bg-[hsl(var(--input))]", // Input border color when unchecked
        checked: "bg-[hsl(var(--destructive))]", // Destructive color when checked
      },
      handle: {
        unchecked: "bg-[hsl(var(--muted))]", // Muted color when unchecked
        checked: "bg-[hsl(var(--destructive-foreground))]", // Destructive foreground when checked
      },
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
  } as const,

  /**
   * State-based tokens
   * Track and handle colors for different states
   * All use CSS variable references for theme support
   */
  state: {
    track: {
      default: "bg-[hsl(var(--input))]", // Default track color using CSS var
      checked: "bg-[hsl(var(--tm-primary))]", // Checked state track
      disabled: "bg-[hsl(var(--muted))]", // Disabled state track
      disabledChecked: "bg-[hsl(var(--muted))]", // Disabled checked track
      error: "bg-[hsl(var(--destructive))]", // Error state track using CSS var
    },
    handle: {
      default: "bg-[hsl(var(--muted-foreground))]", // Default handle color using CSS var
      checked: "bg-[hsl(var(--tm-primary-foreground))]", // Checked state handle
      disabled: "bg-[hsl(var(--muted-foreground))]", // Disabled state handle
      disabledChecked: "bg-[hsl(var(--muted-foreground))]", // Disabled checked handle
      error: "bg-[hsl(var(--destructive-foreground))]", // Error state handle
    },
    opacity: {
      disabled: "opacity-50", // Disabled opacity
    },
  } as const,

  /**
   * Transition tokens
   * Smooth transitions for handle animation and state changes
   * Uses motion tokens for duration and easing
   */
  transition: {
    handle: "transition-transform duration-300 ease-in-out", // Handle slide animation
    track: "transition-colors duration-300 ease-in-out", // Track color transition
    combined: "transition-all duration-300 ease-in-out", // Combined transitions
  } as const,

  /**
   * Shadow token
   * Maps to foundation elevation shadow tokens
   */
  shadow: "shadow-sm", // Maps to elevationShadows.sm

  /**
   * Padding token
   * Space between track edge and handle
   */
  padding: "p-0.5", // 2px padding around handle
} as const;

/**
 * Type exports for Switch tokens
 */
export type SwitchSize = keyof typeof SWITCH_TOKENS.track;
export type SwitchVariant = keyof typeof SWITCH_TOKENS.variant;
export type SwitchState = keyof typeof SWITCH_TOKENS.state.track;
