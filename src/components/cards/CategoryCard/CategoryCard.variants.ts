"use client";

import { cva } from "class-variance-authority";

import { DOMAIN_TOKENS } from "@/tokens/components/domain";
import { TEXT_TOKENS } from "@/tokens/components/text";

/**
 * CategoryCard Variants
 *
 * CVA-based variant system for CategoryCard component.
 * Supports size variants (default, compact) and style variants (default, featured).
 * All styling uses token-based values from DOMAIN_TOKENS and TEXT_TOKENS.
 */

/**
 * Badge positioning variant
 * Uses absolute positioning for featured badge overlay
 */
export const categoryCardBadgeVariants = cva(
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
export const categoryCardBadgeSurfaceVariants = cva(
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
