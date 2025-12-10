"use client";

import { cva } from "class-variance-authority";

import { DOMAIN_TOKENS } from "@/tokens/components/domain";
import { ICON_TOKENS } from "@/tokens/components/icon";
import { TEXT_TOKENS } from "@/tokens/components/text";

/**
 * TicketCard Variants
 *
 * CVA-based variant system for TicketCard component.
 * Supports size variants (default, compact) and style variants (default, featured).
 * All styling uses token-based values from DOMAIN_TOKENS and ICON_TOKENS.
 */

/**
 * Badge positioning variant
 * Uses absolute positioning for badge overlay
 */
export const ticketCardBadgeVariants = cva(
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
export const ticketCardBadgeSurfaceVariants = cva(
  // Base classes - flex layout, items center, badge styling
  `inline-flex items-center ${DOMAIN_TOKENS.badges.radius} ${DOMAIN_TOKENS.badges.shadow} ${DOMAIN_TOKENS.badges.size.sm} ${DOMAIN_TOKENS.badges.text.color} ${TEXT_TOKENS.fontSize.xs} font-semibold`,
  {
    variants: {
      variant: {
        default: DOMAIN_TOKENS.badges.surface.default,
        featured: DOMAIN_TOKENS.badges.surface.featured,
        vip: DOMAIN_TOKENS.badges.surface.featured, // VIP uses featured gradient
        discount: DOMAIN_TOKENS.badges.surface.default, // Discount badge - using default badge surface
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Price/Capacity container variant
 * Uses DOMAIN_TOKENS.priceCapacity.spacing for layout
 */
export const ticketCardPriceCapacityContainerVariants = cva(
  // Base classes - flex layout, price/capacity spacing
  `flex items-center ${DOMAIN_TOKENS.priceCapacity.spacing}`,
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
 * Price text variant
 * Uses DOMAIN_TOKENS.priceCapacity.text.primary for styling
 */
export const ticketCardPriceVariants = cva(
  // Base classes - price text color
  `${DOMAIN_TOKENS.priceCapacity.text.primary} font-bold`,
  {
    variants: {
      size: {
        default: TEXT_TOKENS.fontSize.lg, // Default size
        compact: TEXT_TOKENS.fontSize.md, // Compact size
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Capacity text variant
 * Uses DOMAIN_TOKENS.priceCapacity.text.secondary for styling
 */
export const ticketCardCapacityVariants = cva(
  // Base classes - capacity text color
  `${DOMAIN_TOKENS.priceCapacity.text.secondary}`,
  {
    variants: {
      size: {
        default: TEXT_TOKENS.fontSize.sm, // Default size
        compact: TEXT_TOKENS.fontSize.xs, // Compact size
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Availability indicator variant
 * Uses tokenized styling for availability states
 */
export const ticketCardAvailabilityVariants = cva(
  // Base classes - availability indicator styling
  `inline-flex items-center ${DOMAIN_TOKENS.metadata.spacing.horizontal} ${TEXT_TOKENS.fontSize.xs} font-medium`,
  {
    variants: {
      availability: {
        available: `${DOMAIN_TOKENS.metadata.text.primary}`,
        sold_out: `${DOMAIN_TOKENS.metadata.text.secondary} opacity-60`,
        available_soon: `${DOMAIN_TOKENS.metadata.text.secondary}`,
      },
    },
    defaultVariants: {
      availability: "available",
    },
  },
);

/**
 * Footer section variant
 * Uses DOMAIN_TOKENS for border and spacing
 */
export const ticketCardFooterVariants = cva(
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

/**
 * Purchase button variant
 * Uses DOMAIN_TOKENS.badges for gradient styling
 */
export const ticketCardPurchaseButtonVariants = cva(
  // Base classes - flex layout, badge gradient, motion
  `inline-flex items-center justify-center ${DOMAIN_TOKENS.badges.surface.featured} ${DOMAIN_TOKENS.badges.text.color} ${DOMAIN_TOKENS.badges.shadow} ${DOMAIN_TOKENS.motion.hover.transition} font-semibold transform`,
  {
    variants: {
      size: {
        default: DOMAIN_TOKENS.spacing.button.paddingDefault, // Default padding - references semanticSpacing.md (16px) horizontal, xs (4px) vertical via Tailwind
        compact: DOMAIN_TOKENS.spacing.button.paddingCompact, // Compact padding - references semanticSpacing.sm (8px) horizontal, xs (4px) vertical via Tailwind
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "hover:scale-105 hover:from-accent-600 hover:to-primary-700",
      },
    },
    defaultVariants: {
      size: "default",
      disabled: false,
    },
  },
);

/**
 * Purchase button icon variant
 * Uses ICON_TOKENS and metadata spacing
 */
export const ticketCardPurchaseButtonIconVariants = cva(
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
