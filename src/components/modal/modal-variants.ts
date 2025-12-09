"use client";

import { cva } from "class-variance-authority";

import { OVERLAY_TOKENS } from "@/tokens/components/overlay";

/**
 * Modal Variants
 *
 * CVA-based variant system for Modal component.
 * Supports sizes (sm, md, lg, xl), variants (primary, secondary, bare, tinted),
 * and transitions (appear, disappear).
 * All styling uses token-based values with CSS variable references.
 * Note: Overlay styling is handled separately by modalOverlayVariants.
 */

/**
 * Modal Content Variants
 * Main modal container with size, variant, and transition support
 */
export const modalVariants = cva(
  `fixed z-50 flex flex-col transform ${OVERLAY_TOKENS.modal.position.center}`,
  {
    variants: {
      size: {
        sm: `${OVERLAY_TOKENS.modal.maxWidth.sm} ${OVERLAY_TOKENS.modal.radius.sm} ${OVERLAY_TOKENS.modal.padding.sm} ${OVERLAY_TOKENS.modal.shadow.sm}`,
        md: `${OVERLAY_TOKENS.modal.maxWidth.md} ${OVERLAY_TOKENS.modal.radius.md} ${OVERLAY_TOKENS.modal.padding.md} ${OVERLAY_TOKENS.modal.shadow.md}`,
        lg: `${OVERLAY_TOKENS.modal.maxWidth.lg} ${OVERLAY_TOKENS.modal.radius.lg} ${OVERLAY_TOKENS.modal.padding.lg} ${OVERLAY_TOKENS.modal.shadow.lg}`,
        xl: `${OVERLAY_TOKENS.modal.maxWidth.xl} ${OVERLAY_TOKENS.modal.radius.xl} ${OVERLAY_TOKENS.modal.padding.xl} ${OVERLAY_TOKENS.modal.shadow.xl}`,
        fullscreen: `${OVERLAY_TOKENS.modal.maxWidth.fullscreen} ${OVERLAY_TOKENS.modal.radius.fullscreen} ${OVERLAY_TOKENS.modal.padding.lg} ${OVERLAY_TOKENS.modal.shadow.lg}`,
      },
      variant: {
        primary: `${OVERLAY_TOKENS.modal.surface.primary.bg} ${OVERLAY_TOKENS.modal.surface.primary.border}`,
        secondary: `${OVERLAY_TOKENS.modal.surface.secondary.bg} ${OVERLAY_TOKENS.modal.surface.secondary.border} ${OVERLAY_TOKENS.modal.surface.secondary.shadow}`,
        bare: `${OVERLAY_TOKENS.modal.surface.bare.bg} ${OVERLAY_TOKENS.modal.surface.bare.border} ${OVERLAY_TOKENS.modal.surface.bare.shadow}`,
        tinted: `${OVERLAY_TOKENS.modal.surface.tinted.bg} ${OVERLAY_TOKENS.modal.surface.tinted.border}`,
      },
      transition: {
        appear: OVERLAY_TOKENS.modal.transition.appear,
        disappear: OVERLAY_TOKENS.modal.transition.disappear,
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
      transition: "appear",
    },
  },
);

/**
 * Modal Overlay Variants
 * Backdrop overlay with normal and blurred variants
 */
export const modalOverlayVariants = cva(
  `fixed inset-0 z-40 ${OVERLAY_TOKENS.animation.enter.duration} ${OVERLAY_TOKENS.animation.enter.easing}`,
  {
    variants: {
      variant: {
        normal: `${OVERLAY_TOKENS.backdrop.default.bg} ${OVERLAY_TOKENS.backdrop.default.opacity}`,
        blurred: `${OVERLAY_TOKENS.backdrop.blurred.bg} ${OVERLAY_TOKENS.backdrop.blurred.opacity} ${OVERLAY_TOKENS.backdrop.blurred.backdropFilter}`,
      },
      visible: {
        true: `${OVERLAY_TOKENS.animation.enter.keyframes} opacity-100`,
        false: `${OVERLAY_TOKENS.animation.exit.keyframes} opacity-0`,
      },
    },
    defaultVariants: {
      variant: "normal",
      visible: true,
    },
  },
);
