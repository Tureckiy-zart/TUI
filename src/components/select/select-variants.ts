"use client";

import { cva } from "class-variance-authority";

import { INPUT_TOKENS } from "@/tokens/components/input";

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
  `flex w-full items-center justify-between ${INPUT_TOKENS.shadow} transition-colors disabled:cursor-not-allowed focus-visible:outline-none`,
  {
    variants: {
      variant: {
        primary: `${INPUT_TOKENS.variant.primary.border} ${INPUT_TOKENS.variant.primary.background} ${INPUT_TOKENS.variant.primary.text} ${INPUT_TOKENS.variant.primary.focus}`,
        secondary: `${INPUT_TOKENS.variant.secondary.border} ${INPUT_TOKENS.variant.secondary.background} ${INPUT_TOKENS.variant.secondary.text} ${INPUT_TOKENS.variant.secondary.focus}`,
        outline: `${INPUT_TOKENS.variant.outline.border} ${INPUT_TOKENS.variant.outline.background} ${INPUT_TOKENS.variant.outline.text} ${INPUT_TOKENS.variant.outline.focus}`,
        ghost: `${INPUT_TOKENS.variant.ghost.border} ${INPUT_TOKENS.variant.ghost.background} ${INPUT_TOKENS.variant.ghost.text} ${INPUT_TOKENS.variant.ghost.focus}`,
      },
      size: {
        xs: `${INPUT_TOKENS.size.xs.height} ${INPUT_TOKENS.size.xs.padding.horizontal} ${INPUT_TOKENS.size.xs.padding.vertical} ${INPUT_TOKENS.size.xs.radius} ${INPUT_TOKENS.size.xs.fontSize}`,
        sm: `${INPUT_TOKENS.size.sm.height} ${INPUT_TOKENS.size.sm.padding.horizontal} ${INPUT_TOKENS.size.sm.padding.vertical} ${INPUT_TOKENS.size.sm.radius} ${INPUT_TOKENS.size.sm.fontSize}`,
        md: `${INPUT_TOKENS.size.md.height} ${INPUT_TOKENS.size.md.padding.horizontal} ${INPUT_TOKENS.size.md.padding.vertical} ${INPUT_TOKENS.size.md.radius} ${INPUT_TOKENS.size.md.fontSize} ${INPUT_TOKENS.size.md.fontSizeResponsive}`,
        lg: `${INPUT_TOKENS.size.lg.height} ${INPUT_TOKENS.size.lg.padding.horizontal} ${INPUT_TOKENS.size.lg.padding.vertical} ${INPUT_TOKENS.size.lg.radius} ${INPUT_TOKENS.size.lg.fontSize}`,
      },
      state: {
        open: "ring-2 ring-[hsl(var(--ring))] ring-offset-2",
        closed: "",
        disabled: `${INPUT_TOKENS.state.border.disabled} ${INPUT_TOKENS.state.background.disabled} ${INPUT_TOKENS.state.text.disabled}`,
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
  `relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] shadow-md transition-colors`,
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
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
  `relative flex w-full cursor-default select-none items-center outline-none transition-colors focus:bg-[hsl(var(--accent))] focus:text-[hsl(var(--accent-foreground))] data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
  {
    variants: {
      size: {
        xs: "px-xs py-xs text-xs",
        sm: "px-sm py-xs text-sm",
        md: "px-sm py-xs text-sm",
        lg: "px-md py-sm text-base",
      },
      state: {
        selected: "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]",
        default: "",
        disabled: "pointer-events-none opacity-50",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);
