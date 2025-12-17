/**
 * Radio Component Tokens
 *
 * Component-level design tokens for Radio component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to radio-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Radio Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for Radio component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 * Radio sizes are typically smaller than input fields.
 */
export const RADIO_TOKENS = {
  /**
   * Radio sizes by size variant
   * Supports xs, sm, md, lg, xl sizes
   * Radios are typically circular and smaller than input fields
   */
  size: {
    xs: {
      width: "w-3.5", // 14px (0.875rem)
      height: "h-3.5", // 14px (0.875rem)
      radius: "rounded-full", // Fully circular
      dotSize: "size-1.5", // 6px (0.375rem) - inner dot
    },
    sm: {
      width: "w-4", // 16px (1rem)
      height: "h-4", // 16px (1rem)
      radius: "rounded-full", // Fully circular
      dotSize: "size-2", // 8px (0.5rem) - inner dot
    },
    md: {
      width: "w-4.5", // 18px (1.125rem) - default
      height: "h-4.5", // 18px (1.125rem) - default
      radius: "rounded-full", // Fully circular
      dotSize: "size-2.5", // 10px (0.625rem) - inner dot
    },
    lg: {
      width: "w-5", // 20px (1.25rem)
      height: "h-5", // 20px (1.25rem)
      radius: "rounded-full", // Fully circular
      dotSize: "size-3", // 12px (0.75rem) - inner dot
    },
    xl: {
      width: "w-6", // 24px (1.5rem)
      height: "h-6", // 24px (1.5rem)
      radius: "rounded-full", // Fully circular
      dotSize: "size-3.5", // 14px (0.875rem) - inner dot
    },
  } as const,

  /**
   * Variant-based tokens
   * Border, background, and text colors for different variants
   * All use CSS variable references for theme support
   */
  variant: {
    primary: {
      border: "border-[hsl(var(--tm-primary))]", // Primary border color
      background: "bg-[hsl(var(--tm-primary))]", // Primary background
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text color (for dot)
      focus: "focus-visible:shadow-[var(--focus-ring-primary)]", // Primary focus ring
    },
    secondary: {
      border: "border-[hsl(var(--tm-secondary))]", // Secondary border color
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text color (for dot)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    outline: {
      border: "border-[hsl(var(--input))]", // Input border color
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--foreground))]", // Foreground text color (for dot)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--foreground))]", // Foreground text color (for dot)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    destructive: {
      border: "border-[hsl(var(--destructive))]", // Destructive border color
      background: "bg-[hsl(var(--destructive))]", // Destructive background
      text: "text-[hsl(var(--destructive-foreground))]", // Destructive text color (for dot)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
  } as const,

  /**
   * State-based tokens
   * Border, background, and text colors for different states
   * All use CSS variable references for theme support
   */
  state: {
    border: {
      default: "border-[hsl(var(--input))]", // Default border color using CSS var
      checked: "border-[hsl(var(--tm-primary))]", // Checked state border
      error: "border-[hsl(var(--destructive))]", // Error state border using CSS var
      disabled: "border-[hsl(var(--input))]", // Disabled state border (same as default)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Focus ring using CSS var
    },
    background: {
      default: "bg-transparent", // Default background
      checked: "bg-[hsl(var(--tm-primary))]", // Checked state background
      disabled: "bg-transparent", // Disabled background (same as default)
      disabledChecked: "bg-[hsl(var(--muted))]", // Disabled checked background
    },
    text: {
      default: "text-[hsl(var(--foreground))]", // Default text color using CSS var
      checked: "text-[hsl(var(--tm-primary-foreground))]", // Checked state text (for dot)
      disabled: "disabled:opacity-50", // Disabled text opacity
    },
  } as const,

  /**
   * Dot tokens (inner filled circle indicator)
   * Size and styling for radio dot within radio button
   */
  dot: {
    size: {
      xs: "size-1.5", // 6px (0.375rem)
      sm: "size-2", // 8px (0.5rem)
      md: "size-2.5", // 10px (0.625rem) - default
      lg: "size-3", // 12px (0.75rem)
      xl: "size-3.5", // 14px (0.875rem)
    },
    color: {
      default: "bg-[hsl(var(--tm-primary-foreground))]", // Default dot color
      disabled: "bg-[hsl(var(--muted-foreground))]", // Disabled dot color
    },
    radius: "rounded-full", // Fully circular dot
  } as const,

  /**
   * Shadow token
   * Maps to foundation elevation shadow tokens
   */
  shadow: "shadow-sm", // Maps to elevationShadows.sm

  /**
   * Transition tokens
   * Smooth transitions for state changes
   */
  transition: "transition-all duration-200 ease-in-out", // Smooth transitions
} as const;

/**
 * Type exports for Radio tokens
 */
export type RadioSize = keyof typeof RADIO_TOKENS.size;
export type RadioVariant = keyof typeof RADIO_TOKENS.variant;
export type RadioState = keyof typeof RADIO_TOKENS.state.border;
