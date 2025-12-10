"use client";

import { cva } from "class-variance-authority";

import { OVERLAY_TOKENS } from "@/tokens/components/overlay";

/**
 * Drawer Variants
 *
 * CVA-based variant system for Drawer component.
 * Supports positions (left, right, bottom), sizes (sm, md, lg),
 * and transitions (appear, disappear).
 * All styling uses token-based values with CSS variable references.
 */

/**
 * Drawer Content Variants
 * Main drawer container with position, size, and transition support
 */
export const drawerVariants = cva(
  "fixed z-50 flex flex-col bg-background border border-border transform",
  {
    variants: {
      position: {
        left: "left-0 top-0 h-full",
        right: "right-0 top-0 h-full",
        bottom: "bottom-0 left-0 right-0",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      transition: {
        appear: "",
        disappear: "",
      },
    },
    compoundVariants: [
      // Left position variants
      {
        position: "left",
        size: "sm",
        class: `${OVERLAY_TOKENS.drawer.width.sm} ${OVERLAY_TOKENS.drawer.radius.left.sm} ${OVERLAY_TOKENS.drawer.padding.sm} ${OVERLAY_TOKENS.drawer.shadow.sm}`,
      },
      {
        position: "left",
        size: "md",
        class: `${OVERLAY_TOKENS.drawer.width.md} ${OVERLAY_TOKENS.drawer.radius.left.md} ${OVERLAY_TOKENS.drawer.padding.md} ${OVERLAY_TOKENS.drawer.shadow.md}`,
      },
      {
        position: "left",
        size: "lg",
        class: `${OVERLAY_TOKENS.drawer.width.lg} ${OVERLAY_TOKENS.drawer.radius.left.lg} ${OVERLAY_TOKENS.drawer.padding.lg} ${OVERLAY_TOKENS.drawer.shadow.lg}`,
      },
      // Right position variants
      {
        position: "right",
        size: "sm",
        class: `${OVERLAY_TOKENS.drawer.width.sm} ${OVERLAY_TOKENS.drawer.radius.right.sm} ${OVERLAY_TOKENS.drawer.padding.sm} ${OVERLAY_TOKENS.drawer.shadow.sm}`,
      },
      {
        position: "right",
        size: "md",
        class: `${OVERLAY_TOKENS.drawer.width.md} ${OVERLAY_TOKENS.drawer.radius.right.md} ${OVERLAY_TOKENS.drawer.padding.md} ${OVERLAY_TOKENS.drawer.shadow.md}`,
      },
      {
        position: "right",
        size: "lg",
        class: `${OVERLAY_TOKENS.drawer.width.lg} ${OVERLAY_TOKENS.drawer.radius.right.lg} ${OVERLAY_TOKENS.drawer.padding.lg} ${OVERLAY_TOKENS.drawer.shadow.lg}`,
      },
      // Bottom position variants
      {
        position: "bottom",
        size: "sm",
        class: `${OVERLAY_TOKENS.drawer.height.sm} ${OVERLAY_TOKENS.drawer.radius.bottom.sm} ${OVERLAY_TOKENS.drawer.padding.sm} ${OVERLAY_TOKENS.drawer.shadow.sm}`,
      },
      {
        position: "bottom",
        size: "md",
        class: `${OVERLAY_TOKENS.drawer.height.md} ${OVERLAY_TOKENS.drawer.radius.bottom.md} ${OVERLAY_TOKENS.drawer.padding.md} ${OVERLAY_TOKENS.drawer.shadow.md}`,
      },
      {
        position: "bottom",
        size: "lg",
        class: `${OVERLAY_TOKENS.drawer.height.lg} ${OVERLAY_TOKENS.drawer.radius.bottom.lg} ${OVERLAY_TOKENS.drawer.padding.lg} ${OVERLAY_TOKENS.drawer.shadow.lg}`,
      },
      // Transition variants for left
      {
        position: "left",
        transition: "appear",
        class: OVERLAY_TOKENS.drawer.animation.left.enter,
      },
      {
        position: "left",
        transition: "disappear",
        class: OVERLAY_TOKENS.drawer.animation.left.exit,
      },
      // Transition variants for right
      {
        position: "right",
        transition: "appear",
        class: OVERLAY_TOKENS.drawer.animation.right.enter,
      },
      {
        position: "right",
        transition: "disappear",
        class: OVERLAY_TOKENS.drawer.animation.right.exit,
      },
      // Transition variants for bottom
      {
        position: "bottom",
        transition: "appear",
        class: OVERLAY_TOKENS.drawer.animation.bottom.enter,
      },
      {
        position: "bottom",
        transition: "disappear",
        class: OVERLAY_TOKENS.drawer.animation.bottom.exit,
      },
    ],
    defaultVariants: {
      position: "right",
      size: "md",
      transition: "appear",
    },
  },
);
