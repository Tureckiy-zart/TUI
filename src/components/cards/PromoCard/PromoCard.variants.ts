"use client";

import { cva } from "class-variance-authority";

import { BUTTON_TOKENS } from "@/tokens/components/button";
import { DOMAIN_TOKENS } from "@/tokens/components/domain";
import { ICON_TOKENS } from "@/tokens/components/icon";
import { TEXT_TOKENS } from "@/tokens/components/text";

/**
 * PromoCard Variants
 *
 * CVA-based variant system for PromoCard component.
 * Supports size variants (default, compact) and style variants (default, featured).
 * All styling uses token-based values from DOMAIN_TOKENS, BUTTON_TOKENS, and ICON_TOKENS.
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
 * Uses BUTTON_TOKENS for button styling (primary variant recommended)
 */
export const promoCardCtaButtonVariants = cva(
  // Base classes - flex layout, button tokens, motion
  `inline-flex items-center justify-center ${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.variant.primary.background} ${BUTTON_TOKENS.variant.primary.text} ${BUTTON_TOKENS.shadow.primary} ${BUTTON_TOKENS.variant.primary.hover} ${BUTTON_TOKENS.transition.colors} font-semibold`,
  {
    variants: {
      size: {
        default: `${BUTTON_TOKENS.height.md} ${BUTTON_TOKENS.padding.horizontal.md} ${BUTTON_TOKENS.padding.vertical.sm} ${BUTTON_TOKENS.fontSize.md}`, // Default size - uses md height and padding
        compact: `${BUTTON_TOKENS.height.sm} ${BUTTON_TOKENS.padding.horizontal.sm} ${BUTTON_TOKENS.padding.vertical.sm} ${BUTTON_TOKENS.fontSize.sm}`, // Compact size - uses sm height and padding
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
