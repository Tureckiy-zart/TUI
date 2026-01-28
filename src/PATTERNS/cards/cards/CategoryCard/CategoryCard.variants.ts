"use client";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";

import type { CategoryCardSize, CategoryCardVariant } from "./CategoryCard.types";

/**
 * CategoryCard Variants
 *
 * TokenCVA-based variant system for CategoryCard component.
 * Supports size variants (sm, md) and style variants (default, elevated).
 * All styling uses token-based values from DOMAIN_TOKENS and TEXT_TOKENS.
 */

/**
 * Badge positioning variant
 * Uses absolute positioning for featured badge overlay
 * References DOMAIN_TOKENS.badges.position for spacing
 */
export const categoryCardBadgeVariants = tokenCVA({
  // Base classes - absolute positioning, z-index
  base: "absolute z-10",
  variants: {
    size: {
      sm: DOMAIN_TOKENS.badges.position.compact, // Compact positioning - references semanticSpacing.sm (8px)
      md: DOMAIN_TOKENS.badges.position.default, // Default positioning - references semanticSpacing.md (16px)
    } satisfies Record<CategoryCardSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Badge surface variant
 * Uses DOMAIN_TOKENS.badges and TEXT_TOKENS for styling
 * References CARD_TOKENS.shadow for elevation
 */
export const categoryCardBadgeSurfaceVariants = tokenCVA({
  // Base classes - flex layout, items center, badge styling
  // Uses DOMAIN_TOKENS for badge-specific styles, TEXT_TOKENS for typography
  base: `inline-flex items-center ${DOMAIN_TOKENS.badges.radius} ${DOMAIN_TOKENS.badges.shadow} ${DOMAIN_TOKENS.badges.size.sm} ${DOMAIN_TOKENS.badges.text.color} ${TEXT_TOKENS.fontSize.xs} ${TEXT_TOKENS.fontWeight.semibold}`,
  variants: {
    variant: {
      default: DOMAIN_TOKENS.badges.surface.default,
      elevated: DOMAIN_TOKENS.badges.surface.featured,
    } satisfies Record<CategoryCardVariant, string>,
  },
  defaultVariants: {
    variant: "elevated",
  },
});
