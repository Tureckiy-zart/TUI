/**
 * Textarea Component Tokens
 *
 * Component-level design tokens for Textarea component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to textarea-specific usage.
 * All color values use CSS variables for theme-aware styling.
 *
 * Note: This token domain maintains semantic separation from INPUT_TOKENS to allow
 * independent evolution. Values are currently identical to INPUT_TOKENS but may diverge
 * in the future without affecting Input component.
 */

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Textarea Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for Textarea component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 */
export const TEXTAREA_TOKENS = {
  /**
   * Textarea padding by size
   * Horizontal and vertical padding values
   */
  padding: {
    horizontal: {
      xs: "px-xs", // 4px (0.25rem)
      sm: "px-sm", // 8px (0.5rem)
      md: "px-sm", // 8px (0.5rem) - default
      lg: "px-md", // 16px (1rem)
      xl: "px-lg", // 24px (1.5rem)
    },
    vertical: {
      xs: "py-xs", // 4px (0.25rem)
      sm: "py-xs", // 4px (0.25rem)
      md: "py-xs", // 4px (0.25rem) - default
      lg: "py-sm", // 8px (0.5rem)
      xl: "py-md", // 16px (1rem)
    },
  } as const,

  /**
   * Border radius by size
   */
  radius: {
    xs: "rounded-sm", // 4px (0.25rem)
    sm: "rounded-md", // 6px (0.375rem)
    md: "rounded-md", // 6px (0.375rem) - default
    lg: "rounded-md", // 6px (0.375rem)
    xl: "rounded-lg", // 8px (0.5rem)
  } as const,

  /**
   * Font sizes by size variant
   * Maps to foundation typography fontSize tokens
   */
  fontSize: {
    xs: "text-xs", // Maps to fontSize.xs[0]
    sm: "text-sm", // Maps to fontSize.sm[0]
    md: "text-base", // Maps to fontSize.base[0] - default
    lg: "text-base", // Maps to fontSize.base[0]
    xl: "text-lg", // Maps to fontSize.lg[0]
  } as const,

  /**
   * Responsive font size (md breakpoint)
   */
  fontSizeResponsive: {
    md: "md:text-sm", // Maps to fontSize.sm[0] at md breakpoint
  } as const,

  /**
   * Shadow token
   * Maps to foundation elevation shadow tokens
   */
  shadow: "shadow-sm", // Maps to elevationShadows.sm

  /**
   * Variant-based tokens (SurfaceVariant dictionary)
   * Border, background, and text colors for different surface variants
   * All use CSS variable references for theme support
   *
   * Note: Textarea uses SurfaceVariant (not InteractiveVariant) because it's a
   * form input surface that receives content, not an interactive control that triggers actions.
   */
  variant: {
    default: {
      border: "border-[hsl(var(--input))]", // Default surface border color
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--foreground))]", // Default foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    elevated: {
      border: "border-[hsl(var(--input))]", // Elevated surface border color
      background: "bg-[hsl(var(--card))]", // Card background for elevated appearance
      text: "text-[hsl(var(--card-foreground))]", // Card foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    outlined: {
      border: "border-[hsl(var(--input))]", // Outlined surface border color (emphasized)
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--foreground))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    filled: {
      border: "border-transparent", // No border for filled variant
      background: "bg-[hsl(var(--muted))]", // Muted background for filled appearance
      text: "text-[hsl(var(--foreground))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    subtle: {
      border: "border-transparent", // No border for subtle variant
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--muted-foreground))]", // Muted foreground text color
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
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Focus ring using CSS var
      error: "border-[hsl(var(--destructive))]", // Error state border using CSS var
      success: "border-[hsl(var(--semantic-success))]", // Success state border using CSS var
      disabled: "border-[hsl(var(--input))]", // Disabled state border (same as default)
    },
    background: {
      default: "bg-transparent", // Default background
      disabled: "bg-transparent", // Disabled background (same as default)
    },
    text: {
      default: "text-[hsl(var(--foreground))]", // Default text color using CSS var
      placeholder: "placeholder:text-[hsl(var(--muted-foreground))]", // Placeholder text color using CSS var
      disabled: "disabled:opacity-50", // Disabled text opacity
    },
  } as const,

  /**
   * Width tokens
   * Common width utilities
   */
  width: {
    full: "w-full", // Full width (100%)
  } as const,

  /**
   * Minimum height token
   * Used for default textarea height
   */
  minHeight: "min-h-[80px]", // 80px - default minimum height for textarea

  /**
   * Message tokens
   * Spacing, positioning, and styling for helper text and error messages
   */
  message: {
    spacing: "space-y-sm", // 8px (0.5rem) - spacing between control and message
    position: {
      bottom: "bottom-sm", // 8px (0.5rem) - bottom position for character counter
      right: "right-sm", // 8px (0.5rem) - right position for character counter
    },
    color: {
      default: "text-[hsl(var(--muted-foreground))]", // Default message color
      error: "text-[hsl(var(--destructive))]", // Error message color
      success: "text-[hsl(var(--semantic-success))]", // Success message color
    },
  } as const,

  /**
   * Size-based token structure
   * Organized by size for easy access
   */
  size: {
    xs: {
      padding: {
        horizontal: "px-xs",
        vertical: "py-xs",
      },
      radius: "rounded-sm",
      fontSize: "text-xs",
      shadow: "shadow-sm",
    },
    sm: {
      padding: {
        horizontal: "px-sm",
        vertical: "py-xs",
      },
      radius: "rounded-md",
      fontSize: "text-sm",
      shadow: "shadow-sm",
    },
    md: {
      padding: {
        horizontal: "px-sm",
        vertical: "py-xs",
      },
      radius: "rounded-md",
      fontSize: "text-base",
      fontSizeResponsive: "md:text-sm",
      shadow: "shadow-sm",
    },
    lg: {
      padding: {
        horizontal: "px-md",
        vertical: "py-sm",
      },
      radius: "rounded-md",
      fontSize: "text-base",
      shadow: "shadow-sm",
    },
    xl: {
      padding: {
        horizontal: "px-lg",
        vertical: "py-md",
      },
      radius: "rounded-lg",
      fontSize: "text-lg",
      shadow: "shadow-sm",
    },
  } as const,
} as const;

/**
 * Type exports for Textarea tokens
 */
export type TextareaPaddingHorizontal = keyof typeof TEXTAREA_TOKENS.padding.horizontal;
export type TextareaPaddingVertical = keyof typeof TEXTAREA_TOKENS.padding.vertical;
export type TextareaRadius = keyof typeof TEXTAREA_TOKENS.radius;
export type TextareaFontSize = keyof typeof TEXTAREA_TOKENS.fontSize;
export type TextareaSize = keyof typeof TEXTAREA_TOKENS.size;
export type TextareaState = keyof typeof TEXTAREA_TOKENS.state.border;
export type TextareaVariant = keyof typeof TEXTAREA_TOKENS.variant;
