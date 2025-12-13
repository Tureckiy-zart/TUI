"use client";

import { cva } from "class-variance-authority";

import { MOTION_TOKENS } from "@/tokens/components/motion";
import { TEXTAREA_TOKENS } from "@/tokens/components/textarea";

/**
 * Textarea Variants
 *
 * CVA-based variant system for Textarea component.
 * Supports variants (primary, secondary, outline, ghost, destructive),
 * sizes (xs, sm, md, lg, xl), and states (default, disabled, error, success).
 * All styling uses token-based values with CSS variable references.
 */
export const textareaVariants = cva(
  `flex min-h-[80px] ${TEXTAREA_TOKENS.shadow} ${MOTION_TOKENS.transition.colors} disabled:cursor-not-allowed focus-visible:outline-none resize-y`,
  {
    variants: {
      variant: {
        primary: `${TEXTAREA_TOKENS.variant.primary.border} ${TEXTAREA_TOKENS.variant.primary.background} ${TEXTAREA_TOKENS.variant.primary.text} ${TEXTAREA_TOKENS.state.text.placeholder} ${TEXTAREA_TOKENS.variant.primary.focus}`,
        secondary: `${TEXTAREA_TOKENS.variant.secondary.border} ${TEXTAREA_TOKENS.variant.secondary.background} ${TEXTAREA_TOKENS.variant.secondary.text} ${TEXTAREA_TOKENS.state.text.placeholder} ${TEXTAREA_TOKENS.variant.secondary.focus}`,
        outline: `${TEXTAREA_TOKENS.variant.outline.border} ${TEXTAREA_TOKENS.variant.outline.background} ${TEXTAREA_TOKENS.variant.outline.text} ${TEXTAREA_TOKENS.state.text.placeholder} ${TEXTAREA_TOKENS.variant.outline.focus}`,
        ghost: `${TEXTAREA_TOKENS.variant.ghost.border} ${TEXTAREA_TOKENS.variant.ghost.background} ${TEXTAREA_TOKENS.variant.ghost.text} ${TEXTAREA_TOKENS.state.text.placeholder} ${TEXTAREA_TOKENS.variant.ghost.focus}`,
        destructive: `${TEXTAREA_TOKENS.variant.destructive.border} ${TEXTAREA_TOKENS.variant.destructive.background} ${TEXTAREA_TOKENS.variant.destructive.text} ${TEXTAREA_TOKENS.state.text.placeholder} ${TEXTAREA_TOKENS.variant.destructive.focus}`,
      },
      size: {
        xs: `${TEXTAREA_TOKENS.size.xs.padding.horizontal} ${TEXTAREA_TOKENS.size.xs.padding.vertical} ${TEXTAREA_TOKENS.size.xs.radius} ${TEXTAREA_TOKENS.size.xs.fontSize}`,
        sm: `${TEXTAREA_TOKENS.size.sm.padding.horizontal} ${TEXTAREA_TOKENS.size.sm.padding.vertical} ${TEXTAREA_TOKENS.size.sm.radius} ${TEXTAREA_TOKENS.size.sm.fontSize}`,
        md: `${TEXTAREA_TOKENS.size.md.padding.horizontal} ${TEXTAREA_TOKENS.size.md.padding.vertical} ${TEXTAREA_TOKENS.size.md.radius} ${TEXTAREA_TOKENS.size.md.fontSize} ${TEXTAREA_TOKENS.size.md.fontSizeResponsive}`,
        lg: `${TEXTAREA_TOKENS.size.lg.padding.horizontal} ${TEXTAREA_TOKENS.size.lg.padding.vertical} ${TEXTAREA_TOKENS.size.lg.radius} ${TEXTAREA_TOKENS.size.lg.fontSize}`,
        xl: `${TEXTAREA_TOKENS.size.xl.padding.horizontal} ${TEXTAREA_TOKENS.size.xl.padding.vertical} ${TEXTAREA_TOKENS.size.xl.radius} ${TEXTAREA_TOKENS.size.xl.fontSize}`,
      },
      state: {
        default: `${TEXTAREA_TOKENS.state.border.default} ${TEXTAREA_TOKENS.state.background.default} ${TEXTAREA_TOKENS.state.text.default} ${TEXTAREA_TOKENS.state.text.placeholder} ${TEXTAREA_TOKENS.state.border.focus}`,
        error: `${TEXTAREA_TOKENS.state.border.error} ${TEXTAREA_TOKENS.state.background.default} ${TEXTAREA_TOKENS.state.text.default} ${TEXTAREA_TOKENS.state.text.placeholder} ${TEXTAREA_TOKENS.state.border.focus}`,
        success: `${TEXTAREA_TOKENS.state.border.success} ${TEXTAREA_TOKENS.state.background.default} ${TEXTAREA_TOKENS.state.text.default} ${TEXTAREA_TOKENS.state.text.placeholder} ${TEXTAREA_TOKENS.state.border.focus}`,
        disabled: `${TEXTAREA_TOKENS.state.border.disabled} ${TEXTAREA_TOKENS.state.background.disabled} ${TEXTAREA_TOKENS.state.text.default} ${TEXTAREA_TOKENS.state.text.placeholder} ${TEXTAREA_TOKENS.state.text.disabled}`,
      },
      fullWidth: {
        true: TEXTAREA_TOKENS.width.full,
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
