"use client";

import { cva } from "class-variance-authority";

import { DOMAIN_TOKENS } from "@/tokens/components/domain";
import { ICON_TOKENS } from "@/tokens/components/icon";
import { TEXT_TOKENS } from "@/tokens/components/text";

/**
 * EventCard Variants
 *
 * CVA-based variant system for EventCard component.
 * Supports size variants (default, compact) and style variants (default, featured).
 * All styling uses token-based values from DOMAIN_TOKENS and ICON_TOKENS.
 */

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
export const eventCardBadgeSurfaceVariants = cva(
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
 * Metadata row container variant
 * Uses DOMAIN_TOKENS.metadata for spacing
 */
export const eventCardMetadataVariants = cva(
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
export const eventCardMetadataItemVariants = cva(
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
export const eventCardMetadataIconVariants = cva(
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
 * Footer section variant
 * Uses DOMAIN_TOKENS for border and spacing
 */
export const eventCardFooterVariants = cva(
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
 * Ticket button variant
 * Uses DOMAIN_TOKENS.badges for gradient styling
 */
export const eventCardTicketButtonVariants = cva(
  // Base classes - flex layout, badge gradient, motion
  `inline-flex items-center justify-center ${DOMAIN_TOKENS.badges.surface.featured} ${DOMAIN_TOKENS.badges.text.color} ${DOMAIN_TOKENS.badges.shadow} ${DOMAIN_TOKENS.motion.hover.transition} font-semibold transform`,
  {
    variants: {
      size: {
        default: DOMAIN_TOKENS.spacing.button.paddingDefault, // Default padding - references semanticSpacing.md (16px) horizontal, xs (4px) vertical via Tailwind
        compact: DOMAIN_TOKENS.spacing.button.paddingCompact, // Compact padding - references semanticSpacing.sm (8px) horizontal, xs (4px) vertical via Tailwind
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Ticket button icon variant
 * Uses ICON_TOKENS and metadata spacing
 */
export const eventCardTicketButtonIconVariants = cva(
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

/**
 * Price text variant
 * Uses DOMAIN_TOKENS.priceCapacity for styling
 */
export const eventCardPriceVariants = cva(
  // Base classes - price gradient text
  `bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent`,
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
