/**
 * Artist Card Component Tokens
 *
 * Domain-specific design tokens for ArtistCard component.
 * Provides artist-specific styling tokens that complement DOMAIN_TOKENS.
 * All values reference foundation tokens or other component tokens.
 *
 * Foundation tokens referenced:
 * - DOMAIN_TOKENS: image, spacing, metadata, text from src/tokens/components/domain.ts
 * - Layout utilities: flex, positioning, sizing from Tailwind (allowed)
 */

/**
 * Artist Card Component Tokens
 *
 * Defines artist-specific tokens for ArtistCard component.
 * Values reference DOMAIN_TOKENS and foundation tokens where possible.
 */
export const ARTIST_TOKENS = {
  /**
   * Image container tokens
   * Layout classes for image container wrapper
   */
  image: {
    /**
     * Container layout tokens
     * Positioning and sizing for image container
     */
    container: {
      /**
       * Base container layout
       * Relative positioning, full width, overflow hidden
       * Uses Tailwind layout utilities (allowed per architecture)
       */
      layout: "relative w-full overflow-hidden",
    } as const,

    /**
     * Image sizing tokens
     * Full width and height for images
     */
    sizing: {
      /**
       * Full size image
       * Uses Tailwind sizing utilities (allowed per architecture)
       */
      full: "h-full w-full",
    } as const,

    /**
     * Placeholder container tokens
     * Layout for placeholder icon container when no image is provided
     */
    placeholder: {
      /**
       * Placeholder container layout
       * Flex centering for placeholder icon
       * Uses Tailwind layout utilities (allowed per architecture)
       */
      container: "flex h-full w-full items-center justify-center",
    } as const,
  } as const,

  /**
   * Footer border tokens
   * Border styling for card footer separator
   */
  footer: {
    /**
     * Footer border tokens
     * Top border separator for footer section
     */
    border: {
      /**
       * Footer border top
       * Uses semantic border color token
       */
      top: "border-t border-border",
    } as const,
  } as const,
} as const;

/**
 * Type exports for Artist Card tokens
 */
export type ArtistCardImageContainer = typeof ARTIST_TOKENS.image.container;
export type ArtistCardImageSizing = typeof ARTIST_TOKENS.image.sizing;
export type ArtistCardImagePlaceholder = typeof ARTIST_TOKENS.image.placeholder;
export type ArtistCardFooterBorder = typeof ARTIST_TOKENS.footer.border;
