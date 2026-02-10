/**
 * Chip Component Tokens
 *
 * Component-level design tokens for Chip component.
 * Maps foundation tokens (spacing, typography, radius, motion, color) to chip-specific usage.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 *
 * Authority Compliance:
 * - Motion Authority: Uses MOTION_TOKENS.transitionPreset.colors
 * - Radius Authority: References componentRadius.chip (sm/md/lg/pill)
 * - Typography Authority: References fontSize tokens
 * - Spacing Authority: References semanticSpacing tokens
 * - Interaction Authority: Uses disabled: prefix for disabled states
 *
 * @see docs/architecture/MOTION_AUTHORITY.md
 * @see docs/architecture/RADIUS_AUTHORITY.md
 * @see docs/architecture/TYPOGRAPHY_AUTHORITY.md
 * @see docs/architecture/SPACING_AUTHORITY.md
 * @see docs/architecture/INTERACTION_AUTHORITY.md
 */

import { MOTION_TOKENS } from "./motion";

// Foundation tokens are referenced in comments for documentation
// Actual values use Tailwind utility classes that map to these foundation tokens

/**
 * Chip Component Tokens
 *
 * Defines all spacing, sizing, typography, and visual tokens for Chip component.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const CHIP_TOKENS = {
  /**
   * Layout tokens
   * Base layout utilities for chip component
   */
  layout: "inline-flex items-center gap-xs w-fit h-fit", // Base layout with gap for icon/remove button (fit content, avoid stretch)

  /**
   * Chip padding
   * Uses semantic spacing tokens
   */
  padding: {
    horizontal: "px-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
    vertical: "py-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
  } as const,

  /**
   * Border radius for chips
   * Uses componentRadius.chip from Radius Authority
   *
   * @rule References componentRadius.chip from Radius Authority
   * @see docs/architecture/RADIUS_AUTHORITY.md
   */
  radius: {
    sm: "rounded-xs", // 2px - compact chips (maps to borderRadius.xs)
    md: "rounded-sm", // 4px - default chips (maps to borderRadius.sm)
    lg: "rounded-md", // 6px - large chips (maps to borderRadius.md)
    pill: "rounded-full", // 9999px - pill chips (maps to borderRadius.full)
  } as const,

  /**
   * Font size for chips
   * References foundation typography fontSize tokens from Typography Authority
   *
   * @rule All fontSize values reference Typography Authority tokens
   * @see docs/architecture/TYPOGRAPHY_AUTHORITY.md
   */
  fontSize: "text-xs", // References fontSize.xs[0] from Typography Authority (~12px)

  /**
   * Font weight for chips
   */
  fontWeight: "font-semibold", // Semibold weight (600)

  /**
   * Border token
   * Base border style
   */
  border: "border", // Base border

  /**
   * Transition tokens
   * References Motion Authority tokens for consistent motion behavior
   *
   * @rule Uses MOTION_TOKENS.transitionPreset.colors from Motion Authority
   * @rule Motion transitions MUST use canonical motion tokens only
   * @see docs/architecture/MOTION_AUTHORITY.md
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
   * Disabled state tokens
   * Visual styling for disabled chips
   *
   * @rule Uses disabled: prefix per Interaction Authority
   * @see docs/architecture/INTERACTION_AUTHORITY.md
   */
  disabled: {
    opacity: "disabled:opacity-50", // Reduced opacity for disabled state
    cursor: "disabled:cursor-not-allowed", // Not-allowed cursor
    pointerEvents: "disabled:pointer-events-none", // Block pointer events
  } as const,

  /**
   * Interactive state tokens
   * Hover/active states for clickable chips
   */
  interactive: {
    cursor: "cursor-pointer", // Pointer cursor for interactive chips
  } as const,

  /**
   * Remove button tokens
   * Styling for remove button (X icon)
   */
  removeButton: {
    size: "h-3 w-3", // Icon size (12px / 0.75rem)
    padding: "p-0.5", // Small padding around icon
    hover: "hover:bg-black/10 dark:hover:bg-white/10", // Hover background
    transition: MOTION_TOKENS.transitionPreset.colors, // Smooth transition
  } as const,

  /**
   * Color tokens for chip variants
   * Uses semantic color tokens that map to CSS variables
   */
  variant: {
    primary: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-primary))]", // Primary background using CSS var
      text: "text-[hsl(var(--tm-primary-foreground))]", // Primary text using CSS var
      hover: "hover:bg-[hsl(var(--tm-primary))]/80", // Primary hover background
      selected: "bg-[hsl(var(--tm-primary))]", // Selected state (same as default for primary)
    } as const,
    secondary: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-secondary))]", // Secondary background using CSS var
      text: "text-[hsl(var(--tm-secondary-foreground))]", // Secondary text using CSS var
      hover: "hover:bg-[hsl(var(--tm-secondary))]/80", // Secondary hover background
      selected: "bg-[hsl(var(--tm-secondary))]", // Selected state (same as default for secondary)
    } as const,
    accent: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-accent))]", // Accent background using CSS var
      text: "text-[hsl(var(--tm-accent-foreground))]", // Accent text using CSS var
      hover: "hover:bg-[hsl(var(--tm-accent))]/80", // Accent hover background
      selected: "bg-[hsl(var(--tm-accent))]", // Selected state (same as default for accent)
    } as const,
    outline: {
      border: "border-[hsl(var(--tm-border-default))]", // Border using CSS var
      background: "", // No background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text using CSS var
      hover: "hover:bg-[hsl(var(--tm-accent))]/10", // Subtle hover background
      selected: "bg-[hsl(var(--tm-accent))]/20", // Selected state with background
    } as const,
    ghost: {
      border: "border-transparent", // Transparent border
      background: "bg-transparent", // Transparent background
      text: "text-[hsl(var(--tm-text-primary))]", // Foreground text using CSS var
      hover: "hover:bg-[hsl(var(--tm-accent))]/10", // Ghost hover background
      selected: "bg-[hsl(var(--tm-accent))]/20", // Selected state with background
    } as const,
    destructive: {
      border: "border-transparent", // Transparent border
      background: "bg-[hsl(var(--tm-destructive))]", // Destructive background using CSS var
      text: "text-[hsl(var(--tm-destructive-foreground))]", // Destructive text using CSS var
      hover: "hover:bg-[hsl(var(--tm-destructive))]/80", // Destructive hover background
      selected: "bg-[hsl(var(--tm-destructive))]", // Selected state (same as default for destructive)
    } as const,
  } as const,
} as const;

/**
 * Type exports for Chip tokens
 */
export type ChipVariant = keyof typeof CHIP_TOKENS.variant;
export type ChipRadius = keyof typeof CHIP_TOKENS.radius;
