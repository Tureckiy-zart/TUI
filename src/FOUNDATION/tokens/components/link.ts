/**
 * Link Component Tokens
 *
 * Component-level design tokens for Link component.
 * Maps foundation tokens (spacing, typography, radius, motion) to link-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * Authority Compliance:
 * - Motion Authority: Uses MOTION_TOKENS.transitionPreset.colors
 * - Radius Authority: References componentRadius for outline/ghost variants
 * - Typography Authority: References fontSize tokens
 * - Spacing Authority: References semanticSpacing tokens
 *
 * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Link Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Link component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const LINK_TOKENS = {
  /**
   * Link heights by size
   * Maps to Tailwind height utilities
   */
  height: {
    xs: "h-7", // 28px (1.75rem)
    sm: "h-8", // 32px (2rem)
    md: "h-9", // 36px (2.25rem)
    lg: "h-10", // 40px (2.5rem)
    xl: "h-11", // 44px (2.75rem)
  } as const,

  /**
   * Link padding by size
   * Horizontal and vertical padding values
   */
  padding: {
    horizontal: {
      xs: "px-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      sm: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      md: "px-md", // 16px (1rem) - maps to semanticSpacing.md
      lg: "px-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
      xl: "px-xl", // 32px (2rem) - maps to semanticSpacing.xl
    },
    vertical: {
      xs: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      sm: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      md: "py-md", // 16px (1rem) - maps to semanticSpacing.md
    },
  } as const,

  /**
   * Layout tokens
   * Base layout utilities for link component
   */
  layout: "inline-flex items-center justify-center whitespace-nowrap", // Base layout for link container

  /**
   * Font weight token
   * References foundation typography fontWeight tokens from Typography Authority
   *
   * @rule References fontWeight.medium (500) from Typography Authority
   * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
   */
  fontWeight: "font-medium", // References fontWeight.medium (500) - Typography Authority compliant

  /**
   * Icon wrapper layout
   * Layout utilities for icon containers
   */
  iconWrapper: "inline-flex items-center", // Layout for left/right icon wrappers

  /**
   * Font sizes by link size
   * References foundation typography fontSize tokens from Typography Authority
   *
   * @rule All fontSize values reference Typography Authority tokens
   * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
   */
  fontSize: {
    xs: "text-xs", // References fontSize.xs[0] from Typography Authority (~12px)
    sm: "text-xs", // References fontSize.xs[0] from Typography Authority (~12px)
    md: "text-sm", // References fontSize.sm[0] from Typography Authority (~14px)
    lg: "text-sm", // References fontSize.sm[0] from Typography Authority (~14px)
    xl: "text-base", // References fontSize.base[0] from Typography Authority (~16px)
  } as const,

  /**
   * Border radius for outline and ghost variants
   * References componentRadius from Radius Authority
   *
   * @rule References borderRadius.md (6px / 0.375rem) from Radius Authority
   * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
   */
  radius: "rounded-md", // References borderRadius.md (6px / 0.375rem) - Radius Authority compliant

  /**
   * Underline offset for text decoration
   * Uses spacing token (xs = 4px) which matches underline-offset-4
   */
  underlineOffset: "underline-offset-4", // 4px (0.25rem) - matches semanticSpacing.xs

  /**
   * Transition tokens
   * References Motion Authority tokens for consistent motion behavior
   *
   * @rule Uses MOTION_TOKENS.transitionPreset.colors from Motion Authority
   * @rule Motion transitions MUST use canonical motion tokens only
   * @see docs/architecture/MOTION_AUTHORITY_CONTRACT.md
   */
  transition: {
    colors: MOTION_TOKENS.transitionPreset.colors, // "transition-colors duration-normal ease-out" - Motion Authority compliant
  } as const,

  /**
   * Focus state tokens
   * Focus ring for keyboard navigation
   *
   * @rule Focus MUST use focus-visible: prefix (keyboard navigation only)
   * @rule Focus MUST be blocked when disabled={true}
   */
  focus: {
    ring: "focus-visible:ring-2 focus-visible:ring-ring", // Focus ring using semantic ring color
    outline: "focus-visible:outline-none", // Remove default outline (replaced by ring)
    offset: "focus-visible:ring-offset-2", // Ring offset
  } as const,

  /**
   * Disabled state tokens
   */
  state: {
    disabled: {
      pointerEvents: "disabled:pointer-events-none", // Disable pointer events
      opacity: "disabled:opacity-50", // Disabled opacity
    } as const,
  } as const,

  /**
   * Color tokens for link variants
   * Uses semantic color tokens that map to CSS variables
   */
  variant: {
    primary: {
      text: "text-primary", // Primary text using CSS var
      hover: "hover:text-primary/80", // Primary hover text
      underline: "hover:underline", // Underline on hover
    } as const,
    secondary: {
      text: "text-secondary-foreground", // Secondary text using CSS var
      hover: "hover:underline", // Underline on hover
    } as const,
    accent: {
      text: "text-accent-foreground", // Accent text using CSS var
      hover: "hover:text-accent-foreground/80", // Accent hover text
      underline: "hover:underline", // Underline on hover
    } as const,
    outline: {
      border: "border border-input", // Input border using CSS var
      background: "bg-background", // Background using CSS var
      text: "text-foreground", // Foreground text using CSS var
      hover: {
        background: "hover:bg-accent", // Hover background
        text: "hover:text-accent-foreground", // Hover text
      } as const,
    } as const,
    ghost: {
      text: "text-foreground", // Foreground text using CSS var
      hover: {
        background: "hover:bg-accent", // Hover background
        text: "hover:text-accent-foreground", // Hover text
      } as const,
    } as const,
    link: {
      text: "text-primary", // Primary text using CSS var
      hover: "hover:underline", // Underline on hover
    } as const,
    destructive: {
      text: "text-destructive", // Destructive text using CSS var
      hover: "hover:text-destructive/80", // Destructive hover text
      underline: "hover:underline", // Underline on hover
    } as const,
  } as const,
} as const;

/**
 * Type exports for Link tokens
 */
export type LinkHeight = keyof typeof LINK_TOKENS.height;
export type LinkPaddingHorizontal = keyof typeof LINK_TOKENS.padding.horizontal;
export type LinkPaddingVertical = keyof typeof LINK_TOKENS.padding.vertical;
export type LinkFontSize = keyof typeof LINK_TOKENS.fontSize;
