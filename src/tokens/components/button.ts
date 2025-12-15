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
      lg: "py-md", // 16px (1rem) - maps to semanticSpacing.md - standardized for visual distinction
    },
  } as const,

  /**
   * Gap between icon and text by size
   * Scales with button size for visual consistency
   */
  gap: {
    sm: "gap-xs", // 4px (0.25rem) - smaller gap for small buttons
    md: "gap-sm", // 8px (0.5rem) - medium gap for medium buttons
    lg: "gap-md", // 16px (1rem) - larger gap for large buttons
  } as const,

  /**
   * Border radius for all button sizes
   * Consistent radius across sizes for visual harmony
   */
  radius: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md

  /**
   * Icon size within buttons by button size
   * Scales proportionally with button size for visual balance
   */
  iconSize: {
    sm: "size-3.5", // 14px (0.875rem) - smaller icon for small buttons
    md: "size-4", // 16px (1rem) - medium icon for medium buttons
    lg: "size-5", // 20px (1.25rem) - larger icon for large buttons
    icon: "size-4", // 16px (1rem) - medium icon for icon-only buttons
  } as const,

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
    sm: "text-xs", // Maps to fontSize.xs[0] (~12px)
    md: "text-sm", // Maps to fontSize.sm[0] (~14px)
    lg: "text-base", // Maps to fontSize.base[0] (~16px) - standardized for visual distinction
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
   *
   * State tokens (hover, active, disabled) use CSS variables from State Matrix.
   * All states are injected via updateStateMatrixFromTokens() and consumed via arbitrary values.
   * States react to Color Authority changes automatically through State Matrix.
   *
   * @enforcement TUNG_STATE_AUTHORITY_FOUNDATION_LOCK
   * @rule States use CSS variables, not Tailwind variants
   * @rule All state variables follow pattern: --{component}-{variant}-{state}-{property}
   */
  variant: {
    primary: {
      background: "bg-[hsl(var(--button-primary-base-bg))]", // Primary base background - CSS variable from State Matrix
      text: "text-primary-foreground", // Primary text using CSS var
      hover: "hover:bg-[hsl(var(--button-primary-hover-bg))]", // Primary hover - CSS variable from State Matrix
      active: "active:bg-[hsl(var(--button-primary-active-bg))]", // Primary active - CSS variable from State Matrix
      focus: "focus-visible:bg-[hsl(var(--button-primary-focus-bg))]", // Primary focus - CSS variable from State Matrix
      disabled: {
        background: "disabled:bg-[hsl(var(--button-primary-disabled-bg))]", // Disabled background - CSS variable from State Matrix
        text: "disabled:text-[hsl(var(--button-primary-disabled-text))]", // Disabled text - CSS variable from State Matrix
      } as const,
      loading: "bg-[hsl(var(--button-primary-loading-bg))]", // Primary loading - CSS variable from State Matrix (used with aria-busy/data-loading)
    } as const,
    secondary: {
      background: "bg-secondary", // Secondary background using CSS var
      text: "text-secondary-foreground", // Secondary text using CSS var
      hover: "hover:bg-[hsl(var(--button-secondary-hover-bg))]", // Secondary hover - CSS variable from State Matrix
      active: "active:bg-[hsl(var(--button-secondary-active-bg))]", // Secondary active - CSS variable from State Matrix
      disabled: {
        background: "disabled:bg-[hsl(var(--button-secondary-disabled-bg))]", // Disabled background - CSS variable from State Matrix
        text: "disabled:text-[hsl(var(--button-secondary-disabled-text))]", // Disabled text - CSS variable from State Matrix
      } as const,
    } as const,
    accent: {
      background: "bg-accent", // Accent background using CSS var
      text: "text-accent-foreground", // Accent text using CSS var
      hover: "hover:bg-[hsl(var(--button-accent-hover-bg))]", // Accent hover - CSS variable from State Matrix
      active: "active:bg-[hsl(var(--button-accent-active-bg))]", // Accent active - CSS variable from State Matrix
      disabled: {
        background: "disabled:bg-[hsl(var(--button-accent-disabled-bg))]", // Disabled background - CSS variable from State Matrix
        text: "disabled:text-[hsl(var(--button-accent-disabled-text))]", // Disabled text - CSS variable from State Matrix
      } as const,
    } as const,
    outline: {
      border: "border border-input", // Input border using CSS var
      background: "bg-background", // Background using CSS var
      text: "text-foreground", // Foreground text using CSS var
      hover: {
        background: "hover:bg-[hsl(var(--button-outline-hover-bg))]", // Outline hover background - CSS variable from State Matrix
        text: "hover:text-[hsl(var(--button-outline-hover-text))]", // Outline hover text - CSS variable from State Matrix
        border: "hover:border-[hsl(var(--button-outline-hover-border))]", // Outline hover border - CSS variable from State Matrix
      } as const,
      active: {
        background: "active:bg-[hsl(var(--button-outline-active-bg))]", // Outline active background - CSS variable from State Matrix
        text: "active:text-[hsl(var(--button-outline-active-text))]", // Outline active text - CSS variable from State Matrix
        border: "active:border-[hsl(var(--button-outline-active-border))]", // Outline active border - CSS variable from State Matrix
      } as const,
      disabled: {
        background: "disabled:bg-[hsl(var(--button-outline-disabled-bg))]", // Disabled background - CSS variable from State Matrix
        text: "disabled:text-[hsl(var(--button-outline-disabled-text))]", // Disabled text - CSS variable from State Matrix
        border: "disabled:border-[hsl(var(--button-outline-disabled-border))]", // Disabled border - CSS variable from State Matrix
      } as const,
    } as const,
    ghost: {
      background: "bg-transparent", // Transparent background
      text: "text-foreground", // Foreground text using CSS var
      hover: {
        background: "hover:bg-[hsl(var(--button-ghost-hover-bg))]", // Ghost hover background - CSS variable from State Matrix
        text: "hover:text-[hsl(var(--button-ghost-hover-text))]", // Ghost hover text - CSS variable from State Matrix
      } as const,
      active: {
        background: "active:bg-[hsl(var(--button-ghost-active-bg))]", // Ghost active background - CSS variable from State Matrix
        text: "active:text-[hsl(var(--button-ghost-active-text))]", // Ghost active text - CSS variable from State Matrix
      } as const,
      disabled: {
        background: "disabled:bg-[hsl(var(--button-ghost-disabled-bg))]", // Disabled background - CSS variable from State Matrix
        text: "disabled:text-[hsl(var(--button-ghost-disabled-text))]", // Disabled text - CSS variable from State Matrix
      } as const,
    } as const,
    destructive: {
      background: "bg-destructive", // Destructive background using CSS var
      text: "text-destructive-foreground", // Destructive text using CSS var
      hover: "hover:bg-[hsl(var(--button-destructive-hover-bg))]", // Destructive hover - CSS variable from State Matrix
      active: "active:bg-[hsl(var(--button-destructive-active-bg))]", // Destructive active - CSS variable from State Matrix
      disabled: {
        background: "disabled:bg-[hsl(var(--button-destructive-disabled-bg))]", // Disabled background - CSS variable from State Matrix
        text: "disabled:text-[hsl(var(--button-destructive-disabled-text))]", // Disabled text - CSS variable from State Matrix
      } as const,
    } as const,
  } as const,

  /**
   * Transition tokens
   */
  transition: {
    colors: "transition-colors", // Color transition using motion tokens
  } as const,

  /**
   * Global state tokens
   * Shared state tokens that apply across all variants
   * Variant-specific states are defined in variant.*.active and variant.*.disabled
   */
  state: {
    /**
     * Disabled state tokens
     * Global disabled state tokens (variant-specific overrides in variant.*.disabled)
     *
     * @enforcement TUNG_BUTTON_INTERACTION_FIX
     * @rule Interaction Authority: pointer-events is NOT a visual token
     * @rule pointer-events-none MUST use disabled: prefix (never in base state)
     * @rule Base state MUST have pointer-events: auto (default) for hover to work
     * @rule These tokens are applied in base but only activate when element is disabled
     */
    disabled: {
      cursor: "disabled:cursor-not-allowed", // Disabled cursor style (only applies when disabled)
      pointerEvents: "disabled:pointer-events-none", // Disable pointer events (only applies when disabled)
    } as const,
    /**
     * Focus state tokens
     * Focus ring for keyboard navigation
     */
    focus: {
      ring: "focus-visible:ring-1 focus-visible:ring-ring", // Focus ring using semantic ring color
      outline: "focus-visible:outline-none", // Remove default outline (replaced by ring)
    } as const,
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
export type ButtonGap = keyof typeof BUTTON_TOKENS.gap;
export type ButtonIconSize = keyof typeof BUTTON_TOKENS.iconSize;
