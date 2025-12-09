/**
 * Button Component Tokens
 *
 * Component-level design tokens for Button component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to button-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 */

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Button Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Button component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const BUTTON_TOKENS = {
  /**
   * Button heights by size
   * Maps to Tailwind height utilities: h-8, h-9, h-10
   */
  height: {
    sm: "h-8", // 32px (2rem)
    md: "h-9", // 36px (2.25rem)
    lg: "h-10", // 40px (2.5rem)
    icon: "h-9", // 36px (2.25rem) - same as md
  } as const,

  /**
   * Button padding by size
   * Horizontal and vertical padding values
   */
  padding: {
    horizontal: {
      sm: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      md: "px-md", // 16px (1rem) - maps to semanticSpacing.md
      lg: "px-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
    },
    vertical: {
      sm: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      md: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    },
  } as const,

  /**
   * Gap between icon and text
   */
  gap: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm

  /**
   * Border radius for all button sizes
   */
  radius: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md

  /**
   * Icon size within buttons
   */
  iconSize: "size-4", // 16px (1rem) - maps to spacing[4]

  /**
   * Width tokens
   */
  width: {
    icon: "w-9", // 36px width for icon buttons
  } as const,

  /**
   * Font sizes by button size
   * Maps to foundation typography fontSize tokens
   */
  fontSize: {
    sm: "text-xs", // Maps to fontSize.xs[0]
    md: "text-sm", // Maps to fontSize.sm[0]
    lg: "text-sm", // Maps to fontSize.sm[0]
  } as const,

  /**
   * Shadow tokens by variant
   * Maps to foundation elevation shadow tokens
   */
  shadow: {
    default: "shadow-sm", // Maps to elevationShadows.sm
    primary: "shadow", // Maps to elevationShadows.xs (primary variant uses shadow)
  } as const,

  /**
   * Color tokens for button variants
   * Uses semantic color tokens that map to CSS variables
   */
  variant: {
    primary: {
      background: "bg-primary", // Primary background using CSS var
      text: "text-primary-foreground", // Primary text using CSS var
      hover: "hover:bg-primary/90", // Primary hover using CSS var
    } as const,
    secondary: {
      background: "bg-secondary", // Secondary background using CSS var
      text: "text-secondary-foreground", // Secondary text using CSS var
      hover: "hover:bg-secondary/80", // Secondary hover using CSS var
    } as const,
    accent: {
      background: "bg-accent", // Accent background using CSS var
      text: "text-accent-foreground", // Accent text using CSS var
      hover: "hover:bg-accent/90", // Accent hover using CSS var
    } as const,
    outline: {
      border: "border border-input", // Input border using CSS var
      background: "bg-background", // Background using CSS var
      hover: {
        background: "hover:bg-accent", // Accent hover using CSS var
        text: "hover:text-accent-foreground", // Accent text using CSS var
      } as const,
    } as const,
    ghost: {
      hover: {
        background: "hover:bg-accent", // Accent hover using CSS var
        text: "hover:text-accent-foreground", // Accent text using CSS var
      } as const,
    } as const,
    destructive: {
      background: "bg-destructive", // Destructive background using CSS var
      text: "text-destructive-foreground", // Destructive text using CSS var
      hover: "hover:bg-destructive/90", // Destructive hover using CSS var
    } as const,
  } as const,

  /**
   * Transition tokens
   */
  transition: {
    colors: "transition-colors", // Color transition using motion tokens
  } as const,
} as const;

/**
 * Type exports for Button tokens
 */
export type ButtonHeight = keyof typeof BUTTON_TOKENS.height;
export type ButtonPaddingHorizontal = keyof typeof BUTTON_TOKENS.padding.horizontal;
export type ButtonPaddingVertical = keyof typeof BUTTON_TOKENS.padding.vertical;
export type ButtonFontSize = keyof typeof BUTTON_TOKENS.fontSize;
export type ButtonShadow = keyof typeof BUTTON_TOKENS.shadow;
