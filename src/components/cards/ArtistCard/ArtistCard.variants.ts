"use client";

import { cva } from "class-variance-authority";

import { DOMAIN_TOKENS } from "@/tokens/components/domain";
import { ICON_TOKENS } from "@/tokens/components/icon";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { TEXT_TOKENS } from "@/tokens/components/text";

/**
 * ArtistCard Variants
 *
 * CVA-based variant system for ArtistCard component.
 * Supports size variants (default, compact) and style variants (default, featured).
 * All styling uses token-based values from DOMAIN_TOKENS, TEXT_TOKENS, ICON_TOKENS, and MOTION_TOKENS.
 */

/**
 * ArtistCard root wrapper variant
 * Base wrapper for the card component
 */
export const artistCardVariants = cva("group relative", {
  variants: {
    size: {
      default: "",
      compact: "",
    },
    variant: {
      default: "",
      featured: "",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

/**
 * Badge positioning variant
 * Uses absolute positioning for featured badge overlay
 */
export const artistCardBadgeVariants = cva(
  // Base classes - absolute positioning, z-index
  "absolute z-10",
  {
    variants: {
      size: {
        default: DOMAIN_TOKENS.badges.position.default, // Default positioning - maps to semanticSpacing.md (12px)
        compact: DOMAIN_TOKENS.badges.position.compact, // Compact positioning - maps to semanticSpacing.sm (8px)
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Badge surface variant
 * Uses DOMAIN_TOKENS.badges for styling
 */
export const artistCardBadgeSurfaceVariants = cva(
  // Base classes - flex layout, items center, badge styling
  `inline-flex items-center ${DOMAIN_TOKENS.badges.radius} ${DOMAIN_TOKENS.badges.shadow} ${DOMAIN_TOKENS.badges.text.color} ${TEXT_TOKENS.fontSize.xs} ${TEXT_TOKENS.fontWeight.semibold}`,
  {
    variants: {
      size: {
        default: DOMAIN_TOKENS.badges.size.md,
        compact: DOMAIN_TOKENS.badges.size.sm,
      },
      variant: {
        default: DOMAIN_TOKENS.badges.surface.default,
        featured: DOMAIN_TOKENS.badges.surface.featured,
      },
    },
    defaultVariants: {
      size: "default",
      variant: "featured",
    },
  },
);

/**
 * ArtistCard Image Overlay Variants
 *
 * CVA-based variant system for image overlay on hover.
 * Uses DOMAIN_TOKENS.image.overlay and MOTION_TOKENS.
 */
export const artistCardImageOverlayVariants = cva(
  `absolute inset-0 ${DOMAIN_TOKENS.image.overlay.gradient} opacity-0 ${MOTION_TOKENS.transition.opacity} ${MOTION_TOKENS.duration.normal} group-hover:opacity-100`,
  {
    variants: {
      size: {
        default: "",
        compact: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * ArtistCard Image Transform Variants
 *
 * CVA-based variant system for image scale on hover.
 * Uses DOMAIN_TOKENS.motion.hover and MOTION_TOKENS.
 */
export const artistCardImageTransformVariants = cva(
  `object-cover ${MOTION_TOKENS.transition.transform} ${MOTION_TOKENS.duration.slow} ${DOMAIN_TOKENS.motion.hover.scale}`,
  {
    variants: {
      size: {
        default: "",
        compact: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Metadata container variant
 * Uses DOMAIN_TOKENS.metadata for spacing
 */
export const artistCardMetadataVariants = cva(
  // Base classes - flex column, metadata spacing
  `flex flex-col ${DOMAIN_TOKENS.metadata.spacing.vertical}`,
  {
    variants: {
      size: {
        default: "",
        compact: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Metadata item variant
 * Uses DOMAIN_TOKENS.metadata for icon and text styling
 */
export const artistCardMetadataItemVariants = cva(
  // Base classes - flex items center, metadata spacing and text
  `flex items-center ${DOMAIN_TOKENS.metadata.spacing.horizontal} ${DOMAIN_TOKENS.metadata.text.secondary} ${TEXT_TOKENS.fontSize.xs}`,
  {
    variants: {
      size: {
        default: "",
        compact: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Metadata icon variant
 * Uses ICON_TOKENS for sizing and colors
 */
export const artistCardMetadataIconVariants = cva(
  // Base classes - icon size and color
  `${ICON_TOKENS.sizes.md} ${ICON_TOKENS.colors.muted}`,
  {
    variants: {
      size: {
        default: "",
        compact: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Genres display variant
 * Uses DOMAIN_TOKENS.metadata for text styling
 */
export const artistCardGenresVariants = cva(
  // Base classes - genres text styling
  `${DOMAIN_TOKENS.metadata.text.secondary} ${TEXT_TOKENS.fontSize.xs}`,
  {
    variants: {
      size: {
        default: "",
        compact: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Footer border variant
 * Uses DOMAIN_TOKENS for border and spacing
 */
export const artistCardFooterBorderVariants = cva(
  // Base classes - border top, spacing
  "border-t border-border",
  {
    variants: {
      size: {
        default: DOMAIN_TOKENS.spacing.footer.paddingTopDefault, // Default padding top - references semanticSpacing.sm (8px) via Tailwind
        compact: DOMAIN_TOKENS.spacing.footer.paddingTopCompact, // Compact padding top - references semanticSpacing.xs (4px) via Tailwind
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);
