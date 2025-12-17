"use client";

import { cva } from "class-variance-authority";

import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";

/**
 * PromoCard Variants
 *
 * CVA-based variant system for PromoCard component.
 * Supports size variants (default, compact) and style variants (default, featured).
 * All styling uses token-based values from DOMAIN_TOKENS and ICON_TOKENS.
 */

/**
 * Badge positioning variant
 * Uses absolute positioning for featured badge overlay
 */
export const promoCardBadgeVariants = cva(
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
export const promoCardBadgeSurfaceVariants = cva(
  // Base classes - flex layout, items center, badge styling
  `inline-flex items-center ${DOMAIN_TOKENS.badges.radius} ${DOMAIN_TOKENS.badges.shadow} ${DOMAIN_TOKENS.badges.size.sm} ${DOMAIN_TOKENS.badges.text.color} ${TEXT_TOKENS.fontSize.xs} font-semibold`,
  {
    variants: {
      variant: {
        default: DOMAIN_TOKENS.badges.surface.default,
        featured: DOMAIN_TOKENS.badges.surface.featured,
      },
    },
    defaultVariants: {
      variant: "featured",
    },
  },
);

/**
 * CTA button variant
 * Uses DOMAIN_TOKENS.cta.button for CTA button styling (primary variant)
 */
export const promoCardCtaButtonVariants = cva(
  // Base classes - flex layout, CTA button tokens, motion
  `inline-flex items-center justify-center ${DOMAIN_TOKENS.cta.button.radius} ${DOMAIN_TOKENS.cta.button.variant.primary.background} ${DOMAIN_TOKENS.cta.button.variant.primary.text} ${DOMAIN_TOKENS.cta.button.shadow.primary} ${DOMAIN_TOKENS.cta.button.variant.primary.hover} ${DOMAIN_TOKENS.cta.button.transition.colors} font-semibold`,
  {
    variants: {
      size: {
        default: `${DOMAIN_TOKENS.cta.button.height.md} ${DOMAIN_TOKENS.cta.button.padding.horizontal.md} ${DOMAIN_TOKENS.cta.button.padding.vertical.sm} ${DOMAIN_TOKENS.cta.button.fontSize.md}`, // Default size - uses md height and padding
        compact: `${DOMAIN_TOKENS.cta.button.height.sm} ${DOMAIN_TOKENS.cta.button.padding.horizontal.sm} ${DOMAIN_TOKENS.cta.button.padding.vertical.sm} ${DOMAIN_TOKENS.cta.button.fontSize.sm}`, // Compact size - uses sm height and padding
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * CTA button icon variant
 * Uses ICON_TOKENS and metadata spacing
 */
export const promoCardCtaButtonIconVariants = cva(
  // Base classes - icon size and spacing
  `${ICON_TOKENS.sizes.md} ${DOMAIN_TOKENS.spacing.button.iconMarginLeft}`,
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
