"use client";

import { cva } from "class-variance-authority";

import { DOMAIN_TOKENS } from "@/tokens/components/domain";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { TEXT_TOKENS } from "@/tokens/components/text";

/**
 * VenueCard Variants
 *
 * CVA-based variant system for VenueCard component.
 * Supports size variants (default, compact) and style variants (default, featured).
 * All styling uses token-based values from DOMAIN_TOKENS, TEXT_TOKENS, and MOTION_TOKENS.
 *
 * Note: VenueCard uses CardBase for layout structure, so these variants are primarily
 * for any VenueCard-specific styling that extends beyond CardBase.
 */
export const venueCardVariants = cva("group relative", {
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
 * VenueCard Badge Variants
 *
 * CVA-based variant system for featured badge.
 * Uses DOMAIN_TOKENS.badges for all styling.
 */
export const venueCardBadgeVariants = cva(
  `inline-flex items-center ${DOMAIN_TOKENS.badges.radius} ${DOMAIN_TOKENS.badges.shadow} ${TEXT_TOKENS.fontSize.xs} ${TEXT_TOKENS.fontWeight.semibold} ${DOMAIN_TOKENS.badges.text.color}`,
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
 * VenueCard Image Overlay Variants
 *
 * CVA-based variant system for image overlay on hover.
 * Uses DOMAIN_TOKENS.image.overlay and MOTION_TOKENS.
 */
export const venueCardImageOverlayVariants = cva(
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
 * VenueCard Image Transform Variants
 *
 * CVA-based variant system for image scale on hover.
 * Uses DOMAIN_TOKENS.motion.hover and MOTION_TOKENS.
 */
export const venueCardImageTransformVariants = cva(
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
 * VenueCard Metadata Row Variants
 *
 * CVA-based variant system for metadata display rows.
 * Uses DOMAIN_TOKENS.metadata for spacing and text colors.
 */
export const venueCardMetadataRowVariants = cva(
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
 * VenueCard Footer Border Variants
 *
 * CVA-based variant system for footer border separator.
 * Uses semantic border tokens and DOMAIN_TOKENS for spacing.
 */
export const venueCardFooterBorderVariants = cva("border-t border-border", {
  variants: {
    size: {
      default: DOMAIN_TOKENS.spacing.footer.paddingTopDefault, // References semanticSpacing.sm (8px) via Tailwind
      compact: DOMAIN_TOKENS.spacing.footer.paddingTopCompact, // References semanticSpacing.xs (4px) via Tailwind
    },
  },
  defaultVariants: {
    size: "default",
  },
});
