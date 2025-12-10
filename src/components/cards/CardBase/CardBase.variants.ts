"use client";

import { cva } from "class-variance-authority";

import { DOMAIN_TOKENS } from "@/tokens/components/domain";

/**
 * CardBase Variants
 *
 * CVA-based variant system for CardBase component.
 * Supports size variants (default, compact) and style variants (default, featured).
 * All styling uses token-based values from DOMAIN_TOKENS and MOTION_TOKENS.
 */
export const cardBaseVariants = cva(
  // Base classes - surface, border, radius, shadow, motion
  `${DOMAIN_TOKENS.surface.bg.default} ${DOMAIN_TOKENS.surface.border.default} ${DOMAIN_TOKENS.surface.radius.default} ${DOMAIN_TOKENS.surface.shadow.default} ${DOMAIN_TOKENS.surface.bg.hover} ${DOMAIN_TOKENS.surface.border.hover} ${DOMAIN_TOKENS.surface.elevation.hover} ${DOMAIN_TOKENS.motion.hover.transition} overflow-hidden`,
  {
    variants: {
      size: {
        default: `${DOMAIN_TOKENS.layout.padding.default} ${DOMAIN_TOKENS.layout.gap.default}`,
        compact: `${DOMAIN_TOKENS.layout.padding.compact} ${DOMAIN_TOKENS.layout.gap.compact}`,
      },
      variant: {
        default: "",
        featured: `${DOMAIN_TOKENS.badges.surface.featured}`,
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

/**
 * CardBase ImageWrapper Variants
 *
 * CVA-based variant system for ImageWrapper component.
 * Uses DOMAIN_TOKENS.image for aspect ratio and radius.
 */
export const cardBaseImageVariants = cva(
  // Base classes - aspect ratio, radius, overflow
  `${DOMAIN_TOKENS.image.aspectRatio} ${DOMAIN_TOKENS.image.radius} overflow-hidden`,
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
 * CardBase ContentWrapper Variants
 *
 * CVA-based variant system for ContentWrapper component.
 * Uses layout tokens for spacing.
 */
export const cardBaseContentVariants = cva(
  // Base classes - flex column layout
  "flex flex-col",
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
 * CardBase FooterWrapper Variants
 *
 * CVA-based variant system for FooterWrapper component.
 * Uses layout tokens for spacing.
 */
export const cardBaseFooterVariants = cva(
  // Base classes - flex layout
  "flex",
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
