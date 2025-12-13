"use client";

import { cva } from "class-variance-authority";

import { MOTION_TOKENS } from "@/tokens/components/motion";
import { SELECT_TOKENS } from "@/tokens/components/select";
import { TEXT_TOKENS } from "@/tokens/components/text";

/**
 * Select Variants
 *
 * CVA-based variant system for Select component.
 * Supports variants (primary, secondary, outline, ghost),
 * sizes (xs, sm, md, lg), and states (open, closed, disabled).
 * All styling uses token-based values with CSS variable references.
 */

/**
 * Select Trigger Variants
 * Button element that opens/closes the dropdown
 */
export const selectTriggerVariants = cva(
  `flex ${SELECT_TOKENS.width.full} items-center justify-between ${MOTION_TOKENS.transition.colors} disabled:cursor-not-allowed focus-visible:outline-none`,
  {
    variants: {
      variant: {
        primary: `${SELECT_TOKENS.variant.primary.border} ${SELECT_TOKENS.variant.primary.background} ${SELECT_TOKENS.variant.primary.text} ${SELECT_TOKENS.variant.primary.focus}`,
        secondary: `${SELECT_TOKENS.variant.secondary.border} ${SELECT_TOKENS.variant.secondary.background} ${SELECT_TOKENS.variant.secondary.text} ${SELECT_TOKENS.variant.secondary.focus}`,
        outline: `${SELECT_TOKENS.variant.outline.border} ${SELECT_TOKENS.variant.outline.background} ${SELECT_TOKENS.variant.outline.text} ${SELECT_TOKENS.variant.outline.focus}`,
        ghost: `${SELECT_TOKENS.variant.ghost.border} ${SELECT_TOKENS.variant.ghost.background} ${SELECT_TOKENS.variant.ghost.text} ${SELECT_TOKENS.variant.ghost.focus}`,
      },
      size: {
        xs: `${SELECT_TOKENS.trigger.height.xs} ${SELECT_TOKENS.trigger.padding.horizontal.xs} ${SELECT_TOKENS.trigger.padding.vertical.xs} ${SELECT_TOKENS.trigger.radius.xs} ${SELECT_TOKENS.trigger.fontSize.xs}`,
        sm: `${SELECT_TOKENS.trigger.height.sm} ${SELECT_TOKENS.trigger.padding.horizontal.sm} ${SELECT_TOKENS.trigger.padding.vertical.sm} ${SELECT_TOKENS.trigger.radius.sm} ${SELECT_TOKENS.trigger.fontSize.sm}`,
        md: `${SELECT_TOKENS.trigger.height.md} ${SELECT_TOKENS.trigger.padding.horizontal.md} ${SELECT_TOKENS.trigger.padding.vertical.md} ${SELECT_TOKENS.trigger.radius.md} ${SELECT_TOKENS.trigger.fontSize.md}`,
        lg: `${SELECT_TOKENS.trigger.height.lg} ${SELECT_TOKENS.trigger.padding.horizontal.lg} ${SELECT_TOKENS.trigger.padding.vertical.lg} ${SELECT_TOKENS.trigger.radius.lg} ${SELECT_TOKENS.trigger.fontSize.lg}`,
      },
      state: {
        open: SELECT_TOKENS.state.open.focus,
        closed: SELECT_TOKENS.state.closed.border,
        disabled: `${SELECT_TOKENS.state.disabled.border} ${SELECT_TOKENS.state.disabled.background} ${SELECT_TOKENS.state.disabled.text}`,
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      state: "closed",
    },
  },
);

/**
 * Select Listbox Variants
 * Container for the dropdown options
 */
export const selectListboxVariants = cva(
  `relative z-50 min-w-[8rem] overflow-hidden ${SELECT_TOKENS.content.radius.md} ${SELECT_TOKENS.content.border} ${SELECT_TOKENS.content.background} ${SELECT_TOKENS.content.text} ${SELECT_TOKENS.content.shadow} ${MOTION_TOKENS.transition.colors}`,
  {
    variants: {
      size: {
        xs: TEXT_TOKENS.fontSize.xs,
        sm: TEXT_TOKENS.fontSize.sm,
        md: TEXT_TOKENS.fontSize.sm,
        lg: TEXT_TOKENS.fontSize.md,
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/**
 * Select Option Variants
 * Individual option item in the listbox
 */
export const selectOptionVariants = cva(
  `relative flex ${SELECT_TOKENS.width.full} cursor-default select-none items-center outline-none ${MOTION_TOKENS.transition.colors} ${SELECT_TOKENS.item.focus.background} ${SELECT_TOKENS.item.focus.text} ${SELECT_TOKENS.item.disabled.pointerEvents} data-[disabled]:opacity-50`,
  {
    variants: {
      size: {
        xs: `${SELECT_TOKENS.item.padding.horizontal.xs} ${SELECT_TOKENS.item.padding.vertical.xs} ${SELECT_TOKENS.item.fontSize.xs}`,
        sm: `${SELECT_TOKENS.item.padding.horizontal.sm} ${SELECT_TOKENS.item.padding.vertical.sm} ${SELECT_TOKENS.item.fontSize.sm}`,
        md: `${SELECT_TOKENS.item.padding.horizontal.md} ${SELECT_TOKENS.item.padding.vertical.md} ${SELECT_TOKENS.item.fontSize.md}`,
        lg: `${SELECT_TOKENS.item.padding.horizontal.lg} ${SELECT_TOKENS.item.padding.vertical.lg} ${SELECT_TOKENS.item.fontSize.lg}`,
      },
      state: {
        selected: `${SELECT_TOKENS.item.selected.background} ${SELECT_TOKENS.item.selected.text}`,
        default: "",
        disabled: `${SELECT_TOKENS.item.disabled.pointerEvents} ${SELECT_TOKENS.item.disabled.opacity}`,
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);
