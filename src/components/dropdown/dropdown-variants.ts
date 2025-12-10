"use client";

import { cva } from "class-variance-authority";

import { DROPDOWN_TOKENS } from "@/tokens/components/dropdown";
import { INPUT_TOKENS } from "@/tokens/components/input";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { TEXT_TOKENS } from "@/tokens/components/text";
import { OPACITY_TOKENS } from "@/tokens/opacity";

/**
 * Dropdown Variants
 *
 * CVA-based variant system for Dropdown component.
 * Supports variants (neutral, tinted), sizes (sm, md, lg), and states (open, closed, disabled).
 * All styling uses token-based values with CSS variable references.
 */

/**
 * Dropdown Trigger Variants
 * Button element that opens/closes the dropdown
 */
export const dropdownTriggerVariants = cva(
  `flex items-center justify-between ${MOTION_TOKENS.transition.colors} disabled:cursor-not-allowed focus-visible:outline-none ${DROPDOWN_TOKENS.trigger.shadow}`,
  {
    variants: {
      variant: {
        neutral: `${DROPDOWN_TOKENS.variant.neutral.border} ${DROPDOWN_TOKENS.variant.neutral.background} ${DROPDOWN_TOKENS.variant.neutral.text} ${DROPDOWN_TOKENS.variant.neutral.focus}`,
        tinted: `${DROPDOWN_TOKENS.variant.tinted.border} ${DROPDOWN_TOKENS.variant.tinted.background} ${DROPDOWN_TOKENS.variant.tinted.text} ${DROPDOWN_TOKENS.variant.tinted.focus}`,
      },
      size: {
        sm: `${DROPDOWN_TOKENS.trigger.height.sm} ${DROPDOWN_TOKENS.trigger.padding.horizontal.sm} ${DROPDOWN_TOKENS.trigger.padding.vertical.sm} ${DROPDOWN_TOKENS.trigger.radius.sm} ${DROPDOWN_TOKENS.trigger.fontSize.sm}`,
        md: `${DROPDOWN_TOKENS.trigger.height.md} ${DROPDOWN_TOKENS.trigger.padding.horizontal.md} ${DROPDOWN_TOKENS.trigger.padding.vertical.md} ${DROPDOWN_TOKENS.trigger.radius.md} ${DROPDOWN_TOKENS.trigger.fontSize.md}`,
        lg: `${DROPDOWN_TOKENS.trigger.height.lg} ${DROPDOWN_TOKENS.trigger.padding.horizontal.lg} ${DROPDOWN_TOKENS.trigger.padding.vertical.lg} ${DROPDOWN_TOKENS.trigger.radius.lg} ${DROPDOWN_TOKENS.trigger.fontSize.lg}`,
      },
      state: {
        open: DROPDOWN_TOKENS.variant.neutral.focus,
        closed: "",
        disabled: `${OPACITY_TOKENS.disabled} cursor-not-allowed`,
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
      state: "closed",
    },
  },
);

/**
 * Dropdown Menu Variants
 * Container for the dropdown items
 */
export const dropdownMenuVariants = cva(
  `relative z-50 overflow-hidden ${DROPDOWN_TOKENS.menu.border.default} ${DROPDOWN_TOKENS.menu.text.default} ${MOTION_TOKENS.transition.colors}`,
  {
    variants: {
      variant: {
        neutral: DROPDOWN_TOKENS.menu.background.neutral,
        tinted: DROPDOWN_TOKENS.menu.background.tinted,
      },
      size: {
        sm: `${DROPDOWN_TOKENS.menu.padding.sm} ${DROPDOWN_TOKENS.menu.radius.sm} ${DROPDOWN_TOKENS.menu.shadow.sm} ${DROPDOWN_TOKENS.menu.minWidth.sm} ${TEXT_TOKENS.fontSize.sm}`,
        md: `${DROPDOWN_TOKENS.menu.padding.md} ${DROPDOWN_TOKENS.menu.radius.md} ${DROPDOWN_TOKENS.menu.shadow.md} ${DROPDOWN_TOKENS.menu.minWidth.md} ${TEXT_TOKENS.fontSize.sm}`,
        lg: `${DROPDOWN_TOKENS.menu.padding.lg} ${DROPDOWN_TOKENS.menu.radius.lg} ${DROPDOWN_TOKENS.menu.shadow.lg} ${DROPDOWN_TOKENS.menu.minWidth.lg} ${TEXT_TOKENS.fontSize.md}`,
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  },
);

/**
 * Dropdown Item Variants
 * Individual menu item
 */
export const dropdownItemVariants = cva(
  `relative flex ${INPUT_TOKENS.width.full} cursor-default select-none items-center outline-none ${MOTION_TOKENS.transition.colors}`,
  {
    variants: {
      variant: {
        neutral: `${DROPDOWN_TOKENS.item.background.focus} ${DROPDOWN_TOKENS.item.text.focus}`,
        tinted: `${DROPDOWN_TOKENS.item.background.focus} ${DROPDOWN_TOKENS.item.text.focus}`,
      },
      size: {
        sm: `${DROPDOWN_TOKENS.item.padding.sm} ${DROPDOWN_TOKENS.item.radius.sm} ${DROPDOWN_TOKENS.item.fontSize.sm}`,
        md: `${DROPDOWN_TOKENS.item.padding.md} ${DROPDOWN_TOKENS.item.radius.md} ${DROPDOWN_TOKENS.item.fontSize.md}`,
        lg: `${DROPDOWN_TOKENS.item.padding.lg} ${DROPDOWN_TOKENS.item.radius.lg} ${DROPDOWN_TOKENS.item.fontSize.lg}`,
      },
      state: {
        default: "",
        selected: `${DROPDOWN_TOKENS.item.background.selected} ${DROPDOWN_TOKENS.item.text.selected}`,
        disabled: `pointer-events-none ${OPACITY_TOKENS.disabled}`,
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
      state: "default",
    },
  },
);
