"use client";

import { cva } from "class-variance-authority";

import { ARTIST_TOKENS, DOMAIN_TOKENS, ICON_TOKENS, MOTION_TOKENS, TEXT_TOKENS } from "@/index";

/**
 * ArtistCard Variants
 *
 * CVA-based variant system for ArtistCard component.
 * Supports size variants (sm, md) and style variants (default, elevated).
 * All styling uses token-based values from DOMAIN_TOKENS, TEXT_TOKENS, ICON_TOKENS, and MOTION_TOKENS.
 * Canonical vocabulary aligned with VARIANTS_SIZE_CANON.md
 */

/**
 * ArtistCard root wrapper variant
 * Base wrapper for the card component
 */
export const artistCardVariants = cva("group relative", {
  variants: {
    size: {
      sm: "",
      md: "",
    },
    variant: {
      default: "",
      elevated: "",
    },
  },
  defaultVariants: {
    size: "md",
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
        md: DOMAIN_TOKENS.badges.position.default, // Medium positioning - maps to semanticSpacing.md (12px)
        sm: DOMAIN_TOKENS.badges.position.compact, // Small positioning - maps to semanticSpacing.sm (8px)
      },
    },
    defaultVariants: {
      size: "md",
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
        md: DOMAIN_TOKENS.badges.size.md,
        sm: DOMAIN_TOKENS.badges.size.sm,
      },
      variant: {
        default: DOMAIN_TOKENS.badges.surface.default,
        elevated: DOMAIN_TOKENS.badges.surface.featured,
      },
    },
    defaultVariants: {
      size: "md",
      variant: "elevated",
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
        sm: "",
        md: "",
      },
    },
    defaultVariants: {
      size: "md",
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
        sm: "",
        md: "",
      },
    },
    defaultVariants: {
      size: "md",
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
        sm: "",
        md: "",
      },
    },
    defaultVariants: {
      size: "md",
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
        sm: "",
        md: "",
      },
    },
    defaultVariants: {
      size: "md",
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
        sm: "",
        md: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/**
 * Footer border variant
 * Uses ARTIST_TOKENS for border and DOMAIN_TOKENS for spacing
 */
export const artistCardFooterBorderVariants = cva(
  // Base classes - border top from ARTIST_TOKENS, spacing from DOMAIN_TOKENS
  ARTIST_TOKENS.footer.border.top,
  {
    variants: {
      size: {
        md: DOMAIN_TOKENS.spacing.footer.paddingTopDefault, // Medium padding top - references semanticSpacing.sm (8px) via Tailwind
        sm: DOMAIN_TOKENS.spacing.footer.paddingTopCompact, // Small padding top - references semanticSpacing.xs (4px) via Tailwind
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
