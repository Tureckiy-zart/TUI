/**
 * Gradient Tokens
 *
 * Foundation gradient tokens for Tenerife UI design system.
 * Provides reusable gradient patterns that use token-based colors.
 *
 * All gradients reference foundation color tokens (primary, accent, secondary,
 * surface-*, muted) to ensure consistency and theme compatibility.
 *
 * @see src/FOUNDATION/tokens/colors.ts - Color token definitions
 */

/**
 * Foundation Gradient Tokens
 *
 * Defines all reusable gradient patterns used across the design system.
 * Gradients are organized by semantic purpose:
 * - brand: Brand identity gradients (primary/accent combinations)
 * - surface: Surface elevation gradients
 * - overlay: Overlay gradients for images and overlays
 * - text: Text gradient effects with bg-clip-text
 */
export const GRADIENT_TOKENS = {
  /**
   * Brand gradient tokens
   * Used for brand identity elements, hero sections, and featured content
   */
  brand: {
    /**
     * Primary brand gradient: primary → accent
     * Used for hero sections and primary brand elements
     */
    primary: "bg-gradient-to-r from-primary to-accent",
    /**
     * Reversed brand gradient: accent → primary
     * Used for reversed brand elements
     */
    reversed: "bg-gradient-to-r from-accent to-primary",
    /**
     * Featured brand gradient: accent-500 → primary-600
     * Used for featured badges and premium content indicators
     */
    featured: "bg-gradient-to-r from-accent-500 to-primary-600",
  } as const,

  /**
   * Surface gradient tokens
   * Used for surface elevation effects and placeholders
   */
  surface: {
    /**
     * Elevated surface gradient: surface-elevated1 → surface-elevated2
     * Used for elevated surface backgrounds
     */
    elevated: "bg-gradient-to-br from-surface-elevated1 to-surface-elevated2",
    /**
     * Muted surface gradient: muted → muted/50
     * Used for placeholder backgrounds and subtle surface effects
     */
    muted: "bg-gradient-to-br from-muted to-muted/50",
  } as const,

  /**
   * Overlay gradient tokens
   * Used for image overlays and hover effects
   */
  overlay: {
    /**
     * Dark overlay gradient: black/60 → transparent
     * Used for image hover states and text readability overlays
     */
    dark: "bg-gradient-to-t from-black/60 via-transparent to-transparent",
  } as const,

  /**
   * Text gradient tokens
   * Used for decorative text effects with bg-clip-text
   */
  text: {
    /**
     * Brand text gradient: accent-500 → primary-600
     * Used for featured text and premium content text
     */
    brand: "bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent",
    /**
     * Primary text gradient: primary → accent
     * Used for primary brand text effects
     */
    primary: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
  } as const,
} as const;

/**
 * Type exports for gradient tokens
 */
export type GradientBrand = typeof GRADIENT_TOKENS.brand;
export type GradientSurface = typeof GRADIENT_TOKENS.surface;
export type GradientOverlay = typeof GRADIENT_TOKENS.overlay;
export type GradientText = typeof GRADIENT_TOKENS.text;
