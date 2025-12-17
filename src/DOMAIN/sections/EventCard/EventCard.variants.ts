"use client";

import { cva } from "class-variance-authority";

import { CARD_TOKENS } from "@/FOUNDATION/tokens/components/card";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";

/**
 * EventCard Variants
 *
 * CVA-based variant system for EventCard component.
 * Supports size variants (default, compact) and layout variants (vertical).
 * All styling uses token-based values from CARD_TOKENS and DOMAIN_TOKENS.
 * No hardcoded Tailwind visual values.
 */

/**
 * Main EventCard root variant
 * Uses CARD_TOKENS for base card styling and DOMAIN_TOKENS for domain-specific styling
 */
export const eventCardVariants = cva(
  // Base classes - surface, border, radius, shadow, motion from tokens
  `${DOMAIN_TOKENS.surface.bg.default} ${DOMAIN_TOKENS.surface.border.default} ${DOMAIN_TOKENS.surface.radius.default} ${DOMAIN_TOKENS.surface.shadow.default} ${DOMAIN_TOKENS.surface.bg.hover} ${DOMAIN_TOKENS.surface.border.hover} ${DOMAIN_TOKENS.surface.elevation.hover} ${DOMAIN_TOKENS.motion.hover.transition} overflow-hidden`,
  {
    variants: {
      size: {
        default: `${CARD_TOKENS.size.md.padding} ${DOMAIN_TOKENS.layout.gap.default}`,
        compact: `${CARD_TOKENS.size.sm.padding} ${DOMAIN_TOKENS.layout.gap.compact}`,
      },
      layout: {
        vertical: "flex flex-col",
      },
      variant: {
        default: "",
        featured: `${DOMAIN_TOKENS.badges.surface.featured}`,
      },
    },
    defaultVariants: {
      size: "default",
      layout: "vertical",
      variant: "default",
    },
  },
);

/**
 * Badge positioning variant
 * Uses absolute positioning for featured badge overlay
 */
export const eventCardBadgeVariants = cva(
  // Base classes - absolute positioning, z-index
  "absolute z-10",
  {
    variants: {
      size: {
        default: DOMAIN_TOKENS.badges.position.default,
        compact: DOMAIN_TOKENS.badges.position.compact,
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
export const eventCardBadgeSurfaceVariants = cva(
  // Base classes - flex layout, items center, badge styling from tokens
  `inline-flex items-center ${DOMAIN_TOKENS.badges.radius} ${DOMAIN_TOKENS.badges.shadow} ${DOMAIN_TOKENS.badges.size.sm} ${DOMAIN_TOKENS.badges.text.color} ${TEXT_TOKENS.fontSize.xs} ${TEXT_TOKENS.fontWeight.semibold}`,
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
 * Metadata row container variant
 * Uses DOMAIN_TOKENS.metadata for spacing
 */
export const eventCardMetadataVariants = cva(
  // Base classes - flex column, metadata spacing from tokens
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
export const eventCardMetadataItemVariants = cva(
  // Base classes - flex items center, metadata spacing and text from tokens
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
 * Uses ICON_TOKENS for sizing and colors (via DOMAIN_TOKENS)
 */
export const eventCardMetadataIconVariants = cva(
  // Base classes - icon size and color from tokens
  `${DOMAIN_TOKENS.metadata.icon.sizeSm} ${DOMAIN_TOKENS.metadata.icon.default}`,
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
 * Footer section variant
 * Uses DOMAIN_TOKENS for border and spacing
 */
export const eventCardFooterVariants = cva(
  // Base classes - border top, spacing from tokens
  "border-t border-border",
  {
    variants: {
      size: {
        default: DOMAIN_TOKENS.spacing.footer.paddingTopDefault,
        compact: DOMAIN_TOKENS.spacing.footer.paddingTopCompact,
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Ticket button variant
 * Uses DOMAIN_TOKENS for gradient styling and spacing
 */
export const eventCardTicketButtonVariants = cva(
  // Base classes - flex layout, badge gradient, motion from tokens
  `inline-flex items-center justify-center ${DOMAIN_TOKENS.badges.surface.featured} ${DOMAIN_TOKENS.badges.text.color} ${DOMAIN_TOKENS.badges.shadow} ${DOMAIN_TOKENS.motion.hover.transition} ${TEXT_TOKENS.fontWeight.semibold} transform`,
  {
    variants: {
      size: {
        default: DOMAIN_TOKENS.spacing.button.paddingDefault,
        compact: DOMAIN_TOKENS.spacing.button.paddingCompact,
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Ticket button icon variant
 * Uses DOMAIN_TOKENS spacing and ICON_TOKENS (via DOMAIN_TOKENS)
 */
export const eventCardTicketButtonIconVariants = cva(
  // Base classes - icon size and spacing from tokens
  `${DOMAIN_TOKENS.metadata.icon.sizeSm} ${DOMAIN_TOKENS.spacing.button.iconMarginLeft}`,
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
 * Uses DOMAIN_TOKENS.priceCapacity and TEXT_TOKENS for styling
 */
export const eventCardPriceVariants = cva(
  // Base classes - price gradient text from tokens
  `bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent`,
  {
    variants: {
      size: {
        default: TEXT_TOKENS.fontSize.lg,
        compact: TEXT_TOKENS.fontSize.md,
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);
