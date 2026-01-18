"use client";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";

import type { VenueCardSize, VenueCardVariant } from "./VenueCard.types";

/**
 * VenueCard Variants
 *
 * TokenCVA-based variant system for VenueCard component.
 * Supports size variants (sm, md) and style variants (default, elevated).
 * All styling uses token-based values from DOMAIN_TOKENS, TEXT_TOKENS, and MOTION_TOKENS.
 *
 * Note: VenueCard uses CardBase for layout structure, so these variants are primarily
 * for any VenueCard-specific styling that extends beyond CardBase.
 */
export const venueCardVariants = tokenCVA({
  base: "group relative",
  variants: {
    size: {
      sm: "",
      md: "",
    } satisfies Record<VenueCardSize, string>,
    variant: {
      default: "",
      elevated: "",
    } satisfies Record<VenueCardVariant, string>,
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

/**
 * VenueCard Badge Variants
 *
 * TokenCVA-based variant system for featured badge.
 * Uses DOMAIN_TOKENS.badges for all styling.
 */
export const venueCardBadgeVariants = tokenCVA({
  base: `inline-flex items-center ${DOMAIN_TOKENS.badges.radius} ${DOMAIN_TOKENS.badges.shadow} ${TEXT_TOKENS.fontSize.xs} ${TEXT_TOKENS.fontWeight.semibold} ${DOMAIN_TOKENS.badges.text.color}`,
  variants: {
    size: {
      sm: DOMAIN_TOKENS.badges.size.sm,
      md: DOMAIN_TOKENS.badges.size.md,
    } satisfies Record<VenueCardSize, string>,
    variant: {
      default: DOMAIN_TOKENS.badges.surface.default,
      elevated: DOMAIN_TOKENS.badges.surface.featured,
    } satisfies Record<VenueCardVariant, string>,
  },
  defaultVariants: {
    size: "md",
    variant: "elevated",
  },
});

/**
 * VenueCard Image Overlay Variants
 *
 * TokenCVA-based variant system for image overlay on hover.
 * Uses DOMAIN_TOKENS.image.overlay and MOTION_TOKENS.
 */
export const venueCardImageOverlayVariants = tokenCVA({
  base: `absolute inset-0 ${DOMAIN_TOKENS.image.overlay.gradient} opacity-0 ${MOTION_TOKENS.transition.opacity} ${MOTION_TOKENS.duration.normal} group-hover:opacity-100`,
  variants: {
    size: {
      sm: "",
      md: "",
    } satisfies Record<VenueCardSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * VenueCard Image Transform Variants
 *
 * TokenCVA-based variant system for image scale on hover.
 * Uses DOMAIN_TOKENS.motion.hover and MOTION_TOKENS.
 */
export const venueCardImageTransformVariants = tokenCVA({
  base: `object-cover ${MOTION_TOKENS.transition.transform} ${MOTION_TOKENS.duration.slow} ${DOMAIN_TOKENS.motion.hover.scale}`,
  variants: {
    size: {
      sm: "",
      md: "",
    } satisfies Record<VenueCardSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * VenueCard Image Placeholder Variants
 *
 * TokenCVA-based variant system for image placeholder gradient.
 * Uses DOMAIN_TOKENS.image.placeholder for styling.
 */
export const venueCardImagePlaceholderVariants = tokenCVA({
  base: `relative overflow-hidden ${DOMAIN_TOKENS.image.placeholder.gradient}`,
  variants: {
    size: {
      sm: "",
      md: "",
    } satisfies Record<VenueCardSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * VenueCard Metadata Row Variants
 *
 * TokenCVA-based variant system for metadata display rows.
 * Uses DOMAIN_TOKENS.metadata for spacing and text colors.
 */
export const venueCardMetadataRowVariants = tokenCVA({
  base: `flex items-center ${DOMAIN_TOKENS.metadata.spacing.horizontal} ${DOMAIN_TOKENS.metadata.text.secondary} ${TEXT_TOKENS.fontSize.xs}`,
  variants: {
    size: {
      sm: "",
      md: "",
    } satisfies Record<VenueCardSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * VenueCard Footer Border Variants
 *
 * TokenCVA-based variant system for footer border separator.
 * Uses semantic border tokens and DOMAIN_TOKENS for spacing.
 */
export const venueCardFooterBorderVariants = tokenCVA({
  base: "border-t border-[hsl(var(--tm-border-default))]",
  variants: {
    size: {
      sm: DOMAIN_TOKENS.spacing.footer.paddingTopCompact, // References semanticSpacing.xs (4px) via Tailwind
      md: DOMAIN_TOKENS.spacing.footer.paddingTopDefault, // References semanticSpacing.sm (8px) via Tailwind
    } satisfies Record<VenueCardSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});
