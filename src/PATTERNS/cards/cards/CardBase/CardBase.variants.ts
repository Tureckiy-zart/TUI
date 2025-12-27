"use client";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { DOMAIN_TOKENS } from "@/FOUNDATION/tokens/components/domain";

import type { CardBaseSize, CardBaseVariant } from "./CardBase.types";

/**
 * CardBase Variants
 *
 * TokenCVA-based variant system for CardBase component.
 * Supports size variants (sm, md) and style variants (default, elevated).
 * All styling uses token-based values from DOMAIN_TOKENS and MOTION_TOKENS.
 *
 * Size mapping:
 * - "sm" (legacy "compact") - compact padding and gap
 * - "md" (legacy "default") - default padding and gap
 *
 * Variant mapping:
 * - "default" (legacy "default") - standard surface styling
 * - "elevated" (legacy "featured") - elevated surface with featured badge styling
 */
export const cardBaseVariants = tokenCVA({
  base: `${DOMAIN_TOKENS.surface.bg.default} ${DOMAIN_TOKENS.surface.border.default} ${DOMAIN_TOKENS.surface.radius.default} ${DOMAIN_TOKENS.surface.shadow.default} ${DOMAIN_TOKENS.surface.bg.hover} ${DOMAIN_TOKENS.surface.border.hover} ${DOMAIN_TOKENS.surface.elevation.hover} ${DOMAIN_TOKENS.motion.hover.transition} overflow-hidden`,
  variants: {
    size: {
      sm: `${DOMAIN_TOKENS.layout.padding.compact} ${DOMAIN_TOKENS.layout.gap.compact}`,
      md: `${DOMAIN_TOKENS.layout.padding.default} ${DOMAIN_TOKENS.layout.gap.default}`,
    } satisfies Record<CardBaseSize, string>,
    variant: {
      default: "",
      elevated: `${DOMAIN_TOKENS.badges.surface.featured}`,
    } satisfies Record<CardBaseVariant, string>,
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

/**
 * CardBase ImageWrapper Variants
 *
 * TokenCVA-based variant system for ImageWrapper component.
 * Uses DOMAIN_TOKENS.image for aspect ratio and radius.
 * Note: Size variants are empty (no size-specific styling for ImageWrapper).
 */
export const cardBaseImageVariants = tokenCVA({
  base: `${DOMAIN_TOKENS.image.aspectRatio} ${DOMAIN_TOKENS.image.radius} overflow-hidden`,
  variants: {
    size: {
      sm: "",
      md: "",
    } satisfies Record<CardBaseSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * CardBase ContentWrapper Variants
 *
 * TokenCVA-based variant system for ContentWrapper component.
 * Uses layout tokens for spacing.
 * Note: Size variants are empty (no size-specific styling for ContentWrapper).
 * Raw Tailwind classes "flex flex-col" are acceptable for layout utilities.
 */
export const cardBaseContentVariants = tokenCVA({
  base: "flex flex-col",
  variants: {
    size: {
      sm: "",
      md: "",
    } satisfies Record<CardBaseSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * CardBase FooterWrapper Variants
 *
 * TokenCVA-based variant system for FooterWrapper component.
 * Uses layout tokens for spacing.
 * Note: Size variants are empty (no size-specific styling for FooterWrapper).
 * Raw Tailwind class "flex" is acceptable for layout utilities.
 */
export const cardBaseFooterVariants = tokenCVA({
  base: "flex",
  variants: {
    size: {
      sm: "",
      md: "",
    } satisfies Record<CardBaseSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});
