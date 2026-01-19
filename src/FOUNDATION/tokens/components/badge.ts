/**
 * Badge Component Tokens
 *
 * Component-level design tokens for Badge component.
 * Maps foundation tokens (spacing, typography, radius, motion) to badge-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * Authority Compliance:
 * - Motion Authority: Uses MOTION_TOKENS.transitionPreset.colors
 * - Radius Authority: References borderRadius.full (rounded-full)
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
 * Badge Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Badge component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const BADGE_TOKENS = {
  /**
   * Layout tokens
   * Base layout utilities for badge component
   */
  layout: "inline-flex items-center", // Base layout for badge container

  /**
   * Badge padding
   * Uses semantic spacing tokens
   */
  padding: {
    horizontal: "px-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
    vertical: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
  } as const,

  /**
   * Border radius for badges
   * Uses fully rounded (pill shape) - maps to borderRadius.full
   *
   * @rule References borderRadius.full (9999px) from Radius Authority
   * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
   */
  radius: "rounded-full", // References borderRadius.full (9999px) - Radius Authority compliant

  /**
   * Font size for badges
   * References foundation typography fontSize tokens from Typography Authority
   *
   * @rule All fontSize values reference Typography Authority tokens
   * @see docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md
   */
  fontSize: "text-xs", // References fontSize.xs[0] from Typography Authority (~12px)

  /**
   * Font weight for badges
   */
  fontWeight: "font-semibold", // Semibold weight (600)

  /**
   * Border token
   * Base border style
   */
  border: "border", // Base border

  /**
   * Underline offset for link variant
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
    ring: "focus-visible:ring-2 focus-visible:ring-[hsl(var(--tm-focus-ring))]", // Focus ring using semantic ring color
    outline: "focus-visible:outline-none", // Remove default outline (replaced by ring)
    offset: "focus-visible:ring-offset-2", // Ring offset
  } as const,

  /**
   * Color tokens for badge variants
   * Uses semantic color tokens that map to CSS variables
   */
  variant: {
    primary: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-primary))]", // Primary background using CSS var
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text using CSS var
      hover: "hover:bg-[hsl(var(--tm-primary))]/80", // Primary hover background
    } as const,
    secondary: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background using CSS var
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text using CSS var
      hover: "hover:bg-[hsl(var(--tm-secondary))]/80", // Secondary hover background
    } as const,
    accent: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-accent))]", // Accent background using CSS var
      text: "text-[hsl(var(--tm-accent-foreground))]", // Accent text using CSS var
      hover: "hover:bg-[hsl(var(--tm-accent))]/80", // Accent hover background
    } as const,
    outline: {
      border: "border-[hsl(var(--tm-border-default))]", // Border using CSS var
      background: "", // No background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text using CSS var
    } as const,
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text using CSS var
      hover: "hover:bg-[hsl(var(--tm-accent))]/10", // Ghost hover background
    } as const,
    link: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-primary))]", // Primary text using CSS var
      hover: "hover:text-[hsl(var(--tm-primary))]/80", // Primary hover text
      underline: "hover:underline", // Underline on hover
    } as const,
    destructive: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-destructive))]", // Destructive background using CSS var
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Destructive text using CSS var
      hover: "hover:bg-[hsl(var(--tm-destructive))]/80", // Destructive hover background
    } as const,
  } as const,
} as const;

/**
 * Type exports for Badge tokens
 */
export type BadgeVariant = keyof typeof BADGE_TOKENS.variant;
