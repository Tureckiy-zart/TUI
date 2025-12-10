/**
 * Input Component Tokens
 *
 * Component-level design tokens for Input component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to input-specific usage.
 * All color values use CSS variables for theme-aware styling.
 */

// Foundation tokens are referenced in comments for documentation
// All color values use CSS variable references for theme support

/**
 * Input Component Tokens
 *
 * Defines spacing, sizing, typography, and visual tokens for Input component.
 * All colors use CSS variable references (hsl(var(--token))) for theme-aware styling.
 */
export const INPUT_TOKENS = {
  /**
   * Input heights by size
   * Supports xs, sm, md, lg, xl sizes
   */
  height: {
    xs: "h-7", // 28px (1.75rem)
    sm: "h-8", // 32px (2rem)
    md: "h-9", // 36px (2.25rem) - default
    lg: "h-10", // 40px (2.5rem)
    xl: "h-11", // 44px (2.75rem)
  } as const,

  /**
   * Input padding by size
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
   * File input tokens
   * Styling for file input elements
   */
  file: {
    text: "text-[hsl(var(--foreground))]", // File input text color using CSS var
  } as const,

  /**
   * Select listbox tokens
   * Styling for select dropdown container
   */
  selectListbox: {
    border: "border border-[hsl(var(--border))]", // Border color using CSS var
    background: "bg-[hsl(var(--popover))]", // Background using CSS var
    text: "text-[hsl(var(--popover-foreground))]", // Text color using CSS var
    radius: "rounded-md", // Radius token (6px)
    shadow: "shadow-md", // Shadow token
  } as const,

  /**
   * Select option tokens
   * Styling for select option items
   */
  selectOption: {
    focus: {
      background: "focus:bg-[hsl(var(--accent))]", // Focus background using CSS var
      text: "focus:text-[hsl(var(--accent-foreground))]", // Focus text using CSS var
    } as const,
    selected: {
      background: "bg-[hsl(var(--accent))]", // Selected background using CSS var
      text: "text-[hsl(var(--accent-foreground))]", // Selected text using CSS var
    } as const,
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
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text color
      focus: "focus-visible:shadow-[var(--focus-ring-primary)]", // Primary focus ring
    },
    secondary: {
      border: "border-[hsl(var(--tm-secondary))]", // Secondary border color
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    outline: {
      border: "border-[hsl(var(--input))]", // Input border color
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--foreground))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--foreground))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    destructive: {
      border: "border-[hsl(var(--destructive))]", // Destructive border color
      background: "bg-[hsl(var(--destructive))]", // Destructive background
      text: "text-[hsl(var(--destructive-foreground))]", // Destructive text color
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
   * Icon tokens
   * Size, spacing, and color for icons within inputs
   */
  icon: {
    size: "size-4", // 16px (1rem) - maps to spacing[4]
    gap: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    paddingLeft: "pl-lg", // 24px (1.5rem) - padding when icon on left
    paddingRight: "pr-lg", // 24px (1.5rem) - padding when icon on right
    color: "text-[hsl(var(--muted-foreground))]", // Icon color using CSS variable
    position: {
      left: "left-0", // Position left
      right: "right-0", // Position right
      top: "top-0", // Position top
    },
  } as const,

  /**
   * Label tokens
   * Spacing and styling for labels
   */
  label: {
    spacing: "space-y-sm", // 8px (0.5rem) - spacing between label and control
    requiredMark: "text-destructive", // Color for required asterisk
  } as const,

  /**
   * Width tokens
   * Common width utilities
   */
  width: {
    full: "w-full", // Full width (100%)
  } as const,

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
      height: "h-7",
      padding: {
        horizontal: "px-xs",
        vertical: "py-xs",
      },
      radius: "rounded-sm",
      fontSize: "text-xs",
      shadow: "shadow-sm",
    },
    sm: {
      height: "h-8",
      padding: {
        horizontal: "px-sm",
        vertical: "py-xs",
      },
      radius: "rounded-md",
      fontSize: "text-sm",
      shadow: "shadow-sm",
    },
    md: {
      height: "h-9",
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
      height: "h-10",
      padding: {
        horizontal: "px-md",
        vertical: "py-sm",
      },
      radius: "rounded-md",
      fontSize: "text-base",
      shadow: "shadow-sm",
    },
    xl: {
      height: "h-11",
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
 * Type exports for Input tokens
 */
export type InputHeight = keyof typeof INPUT_TOKENS.height;
export type InputPaddingHorizontal = keyof typeof INPUT_TOKENS.padding.horizontal;
export type InputPaddingVertical = keyof typeof INPUT_TOKENS.padding.vertical;
export type InputRadius = keyof typeof INPUT_TOKENS.radius;
export type InputFontSize = keyof typeof INPUT_TOKENS.fontSize;
export type InputSize = keyof typeof INPUT_TOKENS.size;
export type InputState = keyof typeof INPUT_TOKENS.state.border;
