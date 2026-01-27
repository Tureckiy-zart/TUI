"use client";

import { DOMAIN_TOKENS, ICON_TOKENS, TEXT_TOKENS, tokenCVA } from "@/index";

import type { PromoCardSize, PromoCardVariant } from "./PromoCard.types";

/**
 * PromoCard Variants
 *
 * TokenCVA-based variant system for PromoCard component.
 * Supports size variants (sm, md) and style variants (default, elevated).
 * All styling uses token-based values from DOMAIN_TOKENS, ICON_TOKENS, and TEXT_TOKENS.
 */

/**
 * Badge positioning variant
 * Uses absolute positioning for featured badge overlay
 */
export const promoCardBadgeVariants = tokenCVA({
  base: "absolute z-10",
  variants: {
    size: {
      sm: DOMAIN_TOKENS.badges.position.compact, // Small positioning - maps to semanticSpacing.sm (8px)
      md: DOMAIN_TOKENS.badges.position.default, // Medium positioning - maps to semanticSpacing.md (12px)
    } satisfies Record<PromoCardSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Badge surface variant
 * Uses DOMAIN_TOKENS.badges for styling
 */
export const promoCardBadgeSurfaceVariants = tokenCVA({
  base: `inline-flex items-center ${DOMAIN_TOKENS.badges.radius} ${DOMAIN_TOKENS.badges.shadow} ${DOMAIN_TOKENS.badges.size.sm} ${DOMAIN_TOKENS.badges.text.color} ${TEXT_TOKENS.fontSize.xs} ${TEXT_TOKENS.fontWeight.semibold}`,
  variants: {
    variant: {
      default: DOMAIN_TOKENS.badges.surface.default,
      elevated: DOMAIN_TOKENS.badges.surface.featured,
    } satisfies Record<PromoCardVariant, string>,
  },
  defaultVariants: {
    variant: "elevated",
  },
});

/**
 * CTA button variant
 * Uses DOMAIN_TOKENS.cta.button for CTA button styling (primary variant)
 */
export const promoCardCtaButtonVariants = tokenCVA({
  base: `inline-flex items-center justify-center ${DOMAIN_TOKENS.cta.button.radius} ${DOMAIN_TOKENS.cta.button.variant.primary.background} ${DOMAIN_TOKENS.cta.button.variant.primary.text} ${DOMAIN_TOKENS.cta.button.shadow.primary} ${DOMAIN_TOKENS.cta.button.variant.primary.hover} ${DOMAIN_TOKENS.cta.button.transition.colors} ${TEXT_TOKENS.fontWeight.semibold}`,
  variants: {
    size: {
      sm: `${DOMAIN_TOKENS.cta.button.height.sm} ${DOMAIN_TOKENS.cta.button.padding.horizontal.sm} ${DOMAIN_TOKENS.cta.button.padding.vertical.sm} ${DOMAIN_TOKENS.cta.button.fontSize.sm}`, // Small size - uses sm height and padding
      md: `${DOMAIN_TOKENS.cta.button.height.md} ${DOMAIN_TOKENS.cta.button.padding.horizontal.md} ${DOMAIN_TOKENS.cta.button.padding.vertical.sm} ${DOMAIN_TOKENS.cta.button.fontSize.md}`, // Medium size - uses md height and padding
    } satisfies Record<PromoCardSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * CTA button icon variant
 * Uses ICON_TOKENS and metadata spacing
 * Note: Size variants are empty (no size-specific styling for icon)
 */
export const promoCardCtaButtonIconVariants = tokenCVA({
  base: `${ICON_TOKENS.sizes.md} ${DOMAIN_TOKENS.spacing.button.iconMarginLeft}`,
  variants: {
    size: {
      sm: "",
      md: "",
    } satisfies Record<PromoCardSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});
