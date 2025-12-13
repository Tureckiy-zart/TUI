"use client";

import { cva } from "class-variance-authority";

import { DOMAIN_TOKENS } from "@/tokens/components/domain";
import { TEXT_TOKENS } from "@/tokens/components/text";

/**
 * CategoryCard Variants
 *
 * CVA-based variant system for CategoryCard component.
 * Supports size variants (default, compact) and style variants (default, featured).
 * All styling uses token-based values from CARD_TOKENS, DOMAIN_TOKENS, and TEXT_TOKENS.
 */

/**
 * Badge positioning variant
 * Uses absolute positioning for featured badge overlay
 * References DOMAIN_TOKENS.badges.position for spacing
 */
export const categoryCardBadgeVariants = cva(
  // Base classes - absolute positioning, z-index
  "absolute z-10",
  {
    variants: {
      size: {
        default: DOMAIN_TOKENS.badges.position.default, // Default positioning - references semanticSpacing.md (16px)
        compact: DOMAIN_TOKENS.badges.position.compact, // Compact positioning - references semanticSpacing.sm (8px)
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/**
 * Badge surface variant
 * Uses DOMAIN_TOKENS.badges and TEXT_TOKENS for styling
 * References CARD_TOKENS.shadow for elevation
 */
export const categoryCardBadgeSurfaceVariants = cva(
  // Base classes - flex layout, items center, badge styling
  // Uses DOMAIN_TOKENS for badge-specific styles, TEXT_TOKENS for typography
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
