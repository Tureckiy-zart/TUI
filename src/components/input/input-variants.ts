"use client";

import { cva } from "class-variance-authority";

import { INPUT_TOKENS } from "@/tokens/components/input";
import { MOTION_TOKENS } from "@/tokens/components/motion";
import { TEXT_TOKENS } from "@/tokens/components/text";

/**
 * Input Variants
 *
 * CVA-based variant system for Input component.
 * Supports variants (primary, secondary, outline, ghost, destructive),
 * sizes (xs, sm, md, lg, xl), and states (default, disabled, error, success).
 * All styling uses token-based values with CSS variable references.
 */
export const inputVariants = cva(
  `flex ${INPUT_TOKENS.shadow} ${MOTION_TOKENS.transition.colors} file:border-0 file:bg-transparent ${TEXT_TOKENS.fontSize.sm} file:font-medium ${INPUT_TOKENS.file.text} disabled:cursor-not-allowed focus-visible:outline-none`,
  {
    variants: {
      variant: {
        primary: `${INPUT_TOKENS.variant.primary.border} ${INPUT_TOKENS.variant.primary.background} ${INPUT_TOKENS.variant.primary.text} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.variant.primary.focus}`,
        secondary: `${INPUT_TOKENS.variant.secondary.border} ${INPUT_TOKENS.variant.secondary.background} ${INPUT_TOKENS.variant.secondary.text} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.variant.secondary.focus}`,
        outline: `${INPUT_TOKENS.variant.outline.border} ${INPUT_TOKENS.variant.outline.background} ${INPUT_TOKENS.variant.outline.text} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.variant.outline.focus}`,
        ghost: `${INPUT_TOKENS.variant.ghost.border} ${INPUT_TOKENS.variant.ghost.background} ${INPUT_TOKENS.variant.ghost.text} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.variant.ghost.focus}`,
        destructive: `${INPUT_TOKENS.variant.destructive.border} ${INPUT_TOKENS.variant.destructive.background} ${INPUT_TOKENS.variant.destructive.text} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.variant.destructive.focus}`,
      },
      size: {
        xs: `${INPUT_TOKENS.size.xs.height} ${INPUT_TOKENS.size.xs.padding.horizontal} ${INPUT_TOKENS.size.xs.padding.vertical} ${INPUT_TOKENS.size.xs.radius} ${INPUT_TOKENS.size.xs.fontSize}`,
        sm: `${INPUT_TOKENS.size.sm.height} ${INPUT_TOKENS.size.sm.padding.horizontal} ${INPUT_TOKENS.size.sm.padding.vertical} ${INPUT_TOKENS.size.sm.radius} ${INPUT_TOKENS.size.sm.fontSize}`,
        md: `${INPUT_TOKENS.size.md.height} ${INPUT_TOKENS.size.md.padding.horizontal} ${INPUT_TOKENS.size.md.padding.vertical} ${INPUT_TOKENS.size.md.radius} ${INPUT_TOKENS.size.md.fontSize} ${INPUT_TOKENS.size.md.fontSizeResponsive}`,
        lg: `${INPUT_TOKENS.size.lg.height} ${INPUT_TOKENS.size.lg.padding.horizontal} ${INPUT_TOKENS.size.lg.padding.vertical} ${INPUT_TOKENS.size.lg.radius} ${INPUT_TOKENS.size.lg.fontSize}`,
        xl: `${INPUT_TOKENS.size.xl.height} ${INPUT_TOKENS.size.xl.padding.horizontal} ${INPUT_TOKENS.size.xl.padding.vertical} ${INPUT_TOKENS.size.xl.radius} ${INPUT_TOKENS.size.xl.fontSize}`,
      },
      state: {
        default: `${INPUT_TOKENS.state.border.default} ${INPUT_TOKENS.state.background.default} ${INPUT_TOKENS.state.text.default} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.state.border.focus}`,
        error: `${INPUT_TOKENS.state.border.error} ${INPUT_TOKENS.state.background.default} ${INPUT_TOKENS.state.text.default} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.state.border.focus}`,
        success: `${INPUT_TOKENS.state.border.success} ${INPUT_TOKENS.state.background.default} ${INPUT_TOKENS.state.text.default} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.state.border.focus}`,
        disabled: `${INPUT_TOKENS.state.border.disabled} ${INPUT_TOKENS.state.background.disabled} ${INPUT_TOKENS.state.text.default} ${INPUT_TOKENS.state.text.placeholder} ${INPUT_TOKENS.state.text.disabled}`,
      },
      fullWidth: {
        true: INPUT_TOKENS.width.full,
        false: "",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      state: "default",
      fullWidth: true,
    },
  },
);
