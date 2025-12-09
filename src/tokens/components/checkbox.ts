/**
 * Checkbox Component Tokens
 *
 * Component-level design tokens for Checkbox component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to checkbox-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Checkbox Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for Checkbox component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 * Checkbox sizes are typically smaller than input fields.
 */
export const CHECKBOX_TOKENS = {
  /**
   * Checkbox sizes by size variant
   * Supports xs, sm, md, lg, xl sizes
   * Checkboxes are typically square and smaller than input fields
   */
  size: {
    xs: {
      width: "w-3.5", // 14px (0.875rem)
      height: "h-3.5", // 14px (0.875rem)
      radius: "rounded-sm", // 4px (0.25rem)
      iconSize: "size-2.5", // 10px (0.625rem)
    },
    sm: {
      width: "w-4", // 16px (1rem)
      height: "h-4", // 16px (1rem)
      radius: "rounded-sm", // 4px (0.25rem)
      iconSize: "size-3", // 12px (0.75rem)
    },
    md: {
      width: "w-4.5", // 18px (1.125rem) - default
      height: "h-4.5", // 18px (1.125rem) - default
      radius: "rounded-md", // 6px (0.375rem)
      iconSize: "size-3.5", // 14px (0.875rem)
    },
    lg: {
      width: "w-5", // 20px (1.25rem)
      height: "h-5", // 20px (1.25rem)
      radius: "rounded-md", // 6px (0.375rem)
      iconSize: "size-4", // 16px (1rem)
    },
    xl: {
      width: "w-6", // 24px (1.5rem)
      height: "h-6", // 24px (1.5rem)
      radius: "rounded-md", // 6px (0.375rem)
      iconSize: "size-5", // 20px (1.25rem)
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
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text color (for checkmark)
      focus: "focus-visible:shadow-[var(--focus-ring-primary)]", // Primary focus ring
    },
    secondary: {
      border: "border-[hsl(var(--tm-secondary))]", // Secondary border color
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text color (for checkmark)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    outline: {
      border: "border-[hsl(var(--input))]", // Input border color
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--foreground))]", // Foreground text color (for checkmark)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--foreground))]", // Foreground text color (for checkmark)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    destructive: {
      border: "border-[hsl(var(--destructive))]", // Destructive border color
      background: "bg-[hsl(var(--destructive))]", // Destructive background
      text: "text-[hsl(var(--destructive-foreground))]", // Destructive text color (for checkmark)
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
      indeterminate: "border-[hsl(var(--tm-primary))]", // Indeterminate state border
      error: "border-[hsl(var(--destructive))]", // Error state border using CSS var
      disabled: "border-[hsl(var(--input))]", // Disabled state border (same as default)
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Focus ring using CSS var
    },
    background: {
      default: "bg-transparent", // Default background
      checked: "bg-[hsl(var(--tm-primary))]", // Checked state background
      indeterminate: "bg-[hsl(var(--tm-primary))]", // Indeterminate state background
      disabled: "bg-transparent", // Disabled background (same as default)
      disabledChecked: "bg-[hsl(var(--muted))]", // Disabled checked background
    },
    text: {
      default: "text-[hsl(var(--foreground))]", // Default text color using CSS var
      checked: "text-[hsl(var(--tm-primary-foreground))]", // Checked state text (for checkmark)
      indeterminate: "text-[hsl(var(--tm-primary-foreground))]", // Indeterminate state text
      disabled: "disabled:opacity-50", // Disabled text opacity
    },
  } as const,

  /**
   * Icon tokens
   * Size and styling for checkmark icon within checkbox
   */
  icon: {
    size: {
      xs: "size-2.5", // 10px (0.625rem)
      sm: "size-3", // 12px (0.75rem)
      md: "size-3.5", // 14px (0.875rem) - default
      lg: "size-4", // 16px (1rem)
      xl: "size-5", // 20px (1.25rem)
    },
    stroke: "stroke-2", // 2px stroke width for checkmark
    color: {
      default: "text-[hsl(var(--tm-primary-foreground))]", // Default checkmark color
      disabled: "text-[hsl(var(--muted-foreground))]", // Disabled checkmark color
    },
  } as const,

  /**
   * Indeterminate indicator tokens
   * Styling for indeterminate state (horizontal line)
   */
  indeterminate: {
    width: "w-2", // Width of indeterminate indicator
    height: "h-0.5", // Height of indeterminate indicator (horizontal line)
    color: "bg-[hsl(var(--tm-primary-foreground))]", // Color of indeterminate indicator
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
 * Type exports for Checkbox tokens
 */
export type CheckboxSize = keyof typeof CHECKBOX_TOKENS.size;
export type CheckboxVariant = keyof typeof CHECKBOX_TOKENS.variant;
export type CheckboxState = keyof typeof CHECKBOX_TOKENS.state.border;
