/**
 * Input Component Tokens
 *
 * Component-level design tokens for Input component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to input-specific usage.
 * All color values use CSS variables for theme-aware styling.
 *
 * @component Input
 * @see {@link ../PRIMITIVES/Input/Input.tsx} - Input component implementation
 * @see {@link ../PRIMITIVES/Input/Input.stories.tsx} - Storybook examples
 *
 * @example
 * // Basic usage
 * <Input placeholder="Enter text..." />
 *
 * @example
 * // With size
 * <Input size="sm" placeholder="Small input" />
 * <Input size="md" placeholder="Medium input" />
 * <Input size="lg" placeholder="Large input" />
 *
 * @example
 * // With invalid state
 * <Input invalid placeholder="Invalid input" aria-describedby="error-id" />
 *
 * @example
 * // Disabled state
 * <Input disabled placeholder="Disabled input" />
 *
 * @example
 * // Different input types
 * <Input type="email" placeholder="Email" />
 * <Input type="password" placeholder="Password" />
 * <Input type="number" placeholder="Number" />
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */

export const INPUT_TOKENS = {
  /**
   * Input heights by size
   * Supports sm, md, lg sizes (canonical interactive size scale)
   *
   * @example
   * // Small size input (32px height)
   * <Input size="sm" placeholder="Small input" />
   *
   * @example
   * // Medium size input (36px height, default)
   * <Input size="md" placeholder="Medium input" />
   *
   * @example
   * // Large size input (40px height)
   * <Input size="lg" placeholder="Large input" />
   */
  height: {
    sm: "h-8", // 32px (2rem)
    md: "h-9", // 36px (2.25rem) - default
    lg: "h-10", // 40px (2.5rem)
  } as const,

  /**
   * Input padding by size
   * Horizontal and vertical padding values
   *
   * @example
   * // Padding is automatically applied based on size prop
   * <Input size="sm" placeholder="Small" /> // Uses px-sm py-xs
   * <Input size="md" placeholder="Medium" /> // Uses px-sm py-xs
   * <Input size="lg" placeholder="Large" /> // Uses px-md py-sm
   */
  padding: {
    horizontal: {
      sm: "px-sm", // 8px (0.5rem)
      md: "px-sm", // 8px (0.5rem) - default
      lg: "px-md", // 16px (1rem)
    },
    vertical: {
      sm: "py-xs", // 4px (0.25rem)
      md: "py-xs", // 4px (0.25rem) - default
      lg: "py-sm", // 8px (0.5rem)
    },
  } as const,

  /**
   * Border radius by size
   *
   * @example
   * // All sizes use the same rounded-md radius (6px)
   * <Input size="sm" placeholder="Small" />
   * <Input size="md" placeholder="Medium" />
   * <Input size="lg" placeholder="Large" />
   */
  radius: {
    sm: "rounded-md", // 6px (0.375rem)
    md: "rounded-md", // 6px (0.375rem) - default
    lg: "rounded-md", // 6px (0.375rem)
  } as const,

  /**
   * Font sizes by size variant
   * Maps to foundation typography fontSize tokens
   *
   * @example
   * // Small font size (~14px)
   * <Input size="sm" placeholder="Small text" />
   *
   * @example
   * // Medium font size (~16px, default)
   * <Input size="md" placeholder="Medium text" />
   *
   * @example
   * // Large font size (~18px)
   * <Input size="lg" placeholder="Large text" />
   */
  fontSize: {
    /** Small font size (~14px) */
    sm: "text-sm", // Maps to fontSize.sm[0]
    /** Medium font size (~16px, default) */
    md: "text-base", // Maps to fontSize.base[0] - default
    /** Large font size (~18px) */
    lg: "text-lg", // Maps to fontSize.lg[0]
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
   *
   * @example
   * // Shadow is automatically applied to inputs
   * <Input placeholder="Input with shadow" />
   */
  shadow: "shadow-sm", // Maps to elevationShadows.sm

  /**
   * File input tokens
   * Styling for file input elements
   */
  file: {
    text: "text-[hsl(var(--tm-text-primary))]", // File input text color using CSS var
  } as const,

  /**
   * Variant-based tokens
   * Border, background, and text colors for different variants
   * All use CSS variable references for theme support
   *
   * @example
   * // Primary variant (if supported)
   * // Uses primary color scheme with primary focus ring
   *
   * @example
   * // Secondary variant (if supported)
   * // Uses secondary color scheme with default focus ring
   *
   * @example
   * // Outline variant (default appearance)
   * // Transparent background with input border color
   * <Input placeholder="Outline input" />
   *
   * @example
   * // Ghost variant (if supported)
   * // Fully transparent with no visible border
   *
   * @example
   * // Destructive variant (if supported)
   * // Uses destructive color scheme for error states
   */
  variant: {
    /** Primary variant tokens */
    primary: {
      border: "border-[hsl(var(--tm-primary))]", // Primary border color
      background: "bg-[hsl(var(--tm-primary))]", // Primary background
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text color
      focus: "focus-visible:shadow-[var(--focus-ring-primary)]", // Primary focus ring
    },
    /** Secondary variant tokens */
    secondary: {
      border: "border-[hsl(var(--tm-secondary))]", // Secondary border color
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    /** Outline variant tokens (default) */
    outline: {
      border: "border-[hsl(var(--tm-surface-base))]", // Input border color
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    /** Ghost variant tokens */
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
    /** Destructive variant tokens */
    destructive: {
      border: "border-[hsl(var(--tm-destructive))]", // Destructive border color
      background: "bg-[hsl(var(--tm-destructive))]", // Destructive background
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Destructive text color
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Default focus ring
    },
  } as const,

  /**
   * State-based tokens
   * Border, background, and text colors for different states
   * All use CSS variable references for theme support
   *
   * @example
   * // Default state
   * <Input placeholder="Enter text..." />
   *
   * @example
   * // Focus state (automatic on focus)
   * <Input placeholder="Click to focus" />
   *
   * @example
   * // Error state (invalid prop)
   * <Input invalid placeholder="Invalid input" aria-describedby="error-id" />
   *
   * @example
   * // Success state (if supported)
   * // Uses semantic-success border color
   *
   * @example
   * // Disabled state
   * <Input disabled placeholder="Disabled input" />
   *
   * @example
   * // Placeholder styling
   * <Input placeholder="Placeholder text" />
   */
  state: {
    border: {
      /** Default border color */
      default: "border-[hsl(var(--tm-surface-base))]", // Default border color using CSS var
      /** Focus ring shadow */
      focus: "focus-visible:shadow-[var(--focus-ring-default)]", // Focus ring using CSS var
      /** Error state border (when invalid prop is true) */
      error: "border-[hsl(var(--tm-destructive))]", // Error state border using CSS var
      /** Success state border */
      success: "border-[hsl(var(--semantic-success))]", // Success state border using CSS var
      /** Disabled state border */
      disabled: "border-[hsl(var(--tm-surface-base))]", // Disabled state border (same as default)
    },
    background: {
      /** Default transparent background */
      default: "bg-transparent", // Default background
      /** Disabled background */
      disabled: "bg-transparent", // Disabled background (same as default)
    },
    text: {
      /** Default text color */
      default: "text-[hsl(var(--tm-text-primary))]", // Default text color using CSS var
      /** Placeholder text color */
      placeholder: "placeholder:text-[hsl(var(--tm-text-muted))]", // Placeholder text color using CSS var
      /** Disabled text opacity */
      disabled: "disabled:opacity-50", // Disabled text opacity
    },
  } as const,

  /**
   * Icon tokens
   * Size, spacing, and color for icons within inputs
   *
   * @example
   * // Icon size (16px)
   * // Used for icons inside input fields
   *
   * @example
   * // Icon gap (8px spacing)
   * // Spacing between icon and input text
   *
   * @example
   * // Icon padding
   * // Extra padding when icon is present on left or right side
   *
   * @example
   * // Icon color
   * // Uses muted-foreground color for icons
   */
  icon: {
    /** Icon size (16px) */
    size: "size-4", // 16px (1rem) - maps to spacing[4]
    /** Gap between icon and text (8px) */
    gap: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    /** Left padding when icon on left (24px) */
    paddingLeft: "pl-lg", // 24px (1.5rem) - padding when icon on left
    /** Right padding when icon on right (24px) */
    paddingRight: "pr-lg", // 24px (1.5rem) - padding when icon on right
    /** Icon color (muted foreground) */
    color: "text-[hsl(var(--tm-text-muted))]", // Icon color using CSS variable
    position: {
      /** Left position */
      left: "left-0", // Position left
      /** Right position */
      right: "right-0", // Position right
      /** Top position */
      top: "top-0", // Position top
    },
  } as const,

  /**
   * Label tokens
   * Spacing and styling for labels
   *
   * @example
   * // Label spacing (8px between label and input)
   * <Label>Email</Label>
   * <Input type="email" placeholder="Enter email" />
   *
   * @example
   * // Required mark color (destructive color for asterisk)
   * <Label>Email <span className="text-destructive">*</span></Label>
   * <Input type="email" required />
   */
  label: {
    /** Spacing between label and input (8px) */
    spacing: "space-y-sm", // 8px (0.5rem) - spacing between label and control
    /** Required asterisk color (destructive) */
    requiredMark: "text-destructive", // Color for required asterisk
  } as const,

  /**
   * Width tokens
   * Common width utilities
   *
   * @example
   * // Full width input (100% of container)
   * <Input placeholder="Full width input" className="w-full" />
   */
  width: {
    /** Full width (100%) */
    full: "w-full", // Full width (100%)
  } as const,

  /**
   * Message tokens
   * Spacing, positioning, and styling for helper text and error messages
   *
   * @example
   * // Helper text spacing (8px below input)
   * <Input placeholder="Enter text" />
   * <Text size="sm" tone="muted">Helper text</Text>
   *
   * @example
   * // Error message
   * <Input invalid placeholder="Invalid input" aria-describedby="error-id" />
   * <Text id="error-id" size="sm" tone="destructive">Error message</Text>
   *
   * @example
   * // Success message
   * <Input placeholder="Valid input" />
   * <Text size="sm" tone="success">Success message</Text>
   *
   * @example
   * // Character counter position
   * // Positioned at bottom-right of input container
   */
  message: {
    /** Spacing between input and message (8px) */
    spacing: "space-y-sm", // 8px (0.5rem) - spacing between control and message
    position: {
      /** Bottom position for character counter (8px) */
      bottom: "bottom-sm", // 8px (0.5rem) - bottom position for character counter
      /** Right position for character counter (8px) */
      right: "right-sm", // 8px (0.5rem) - right position for character counter
    },
    color: {
      /** Default helper text color (muted foreground) */
      default: "text-[hsl(var(--tm-text-muted))]", // Default message color
      /** Error message color (destructive) */
      error: "text-[hsl(var(--tm-destructive))]", // Error message color
      /** Success message color (semantic success) */
      success: "text-[hsl(var(--semantic-success))]", // Success message color
    },
  } as const,

  /**
   * Size-based token structure
   * Organized by size for easy access
   */
  size: {
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
