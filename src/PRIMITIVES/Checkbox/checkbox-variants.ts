"use client";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { CHECKBOX_TOKENS } from "@/FOUNDATION/tokens/components/checkbox";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";

/**
 * Checkbox Variant Types
 *
 * Explicit union types for Checkbox component.
 * Canonical size scale for interactive components: sm | md | lg
 */
export type CheckboxVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxState =
  | "default"
  | "checked"
  | "indeterminate"
  | "error"
  | "disabled"
  | "disabledChecked";

/**
 * Checkbox Variants
 *
 * tokenCVA-based variant system for Checkbox component (token-driven axes).
 * Supports variants (primary, secondary, outline, ghost, destructive),
 * sizes (sm, md, lg - canonical interactive scale), and states (default, checked, disabled, error, indeterminate).
 * All styling uses token-based values with CSS variable references.
 *
 * NOTE: Size scale restricted to sm|md|lg per canonical interactive size scale (FOUNDATION_LOCK.md).
 * xs and xl sizes removed to comply with Button-defined canonical scale.
 */
export const checkboxVariants = tokenCVA({
  base: `inline-flex items-center justify-center border ${MOTION_TOKENS.transition.all} ${MOTION_TOKENS.duration["200"]} ${MOTION_TOKENS.easing["in-out"]} focus-visible:outline-none disabled:cursor-not-allowed ${CHECKBOX_TOKENS.shadow}`,
  variants: {
    variant: {
      primary: `${CHECKBOX_TOKENS.variant.primary.border} ${CHECKBOX_TOKENS.variant.primary.background} ${CHECKBOX_TOKENS.variant.primary.text} ${CHECKBOX_TOKENS.variant.primary.focus}`,
      secondary: `${CHECKBOX_TOKENS.variant.secondary.border} ${CHECKBOX_TOKENS.variant.secondary.background} ${CHECKBOX_TOKENS.variant.secondary.text} ${CHECKBOX_TOKENS.variant.secondary.focus}`,
      outline: `${CHECKBOX_TOKENS.variant.outline.border} ${CHECKBOX_TOKENS.variant.outline.background} ${CHECKBOX_TOKENS.variant.outline.text} ${CHECKBOX_TOKENS.variant.outline.focus}`,
      ghost: `${CHECKBOX_TOKENS.variant.ghost.border} ${CHECKBOX_TOKENS.variant.ghost.background} ${CHECKBOX_TOKENS.variant.ghost.text} ${CHECKBOX_TOKENS.variant.ghost.focus}`,
      destructive: `${CHECKBOX_TOKENS.variant.destructive.border} ${CHECKBOX_TOKENS.variant.destructive.background} ${CHECKBOX_TOKENS.variant.destructive.text} ${CHECKBOX_TOKENS.variant.destructive.focus}`,
    } satisfies Record<CheckboxVariant, string>,
    size: {
      sm: `${CHECKBOX_TOKENS.size.sm.width} ${CHECKBOX_TOKENS.size.sm.height} ${CHECKBOX_TOKENS.size.sm.radius}`,
      md: `${CHECKBOX_TOKENS.size.md.width} ${CHECKBOX_TOKENS.size.md.height} ${CHECKBOX_TOKENS.size.md.radius}`,
      lg: `${CHECKBOX_TOKENS.size.lg.width} ${CHECKBOX_TOKENS.size.lg.height} ${CHECKBOX_TOKENS.size.lg.radius}`,
    } satisfies Record<CheckboxSize, string>,
    state: {
      default: `${CHECKBOX_TOKENS.state.border.default} ${CHECKBOX_TOKENS.state.background.default} ${CHECKBOX_TOKENS.state.text.default}`,
      checked: `${CHECKBOX_TOKENS.state.border.checked} ${CHECKBOX_TOKENS.state.background.checked} ${CHECKBOX_TOKENS.state.text.checked}`,
      indeterminate: `${CHECKBOX_TOKENS.state.border.indeterminate} ${CHECKBOX_TOKENS.state.background.indeterminate} ${CHECKBOX_TOKENS.state.text.indeterminate}`,
      error: `${CHECKBOX_TOKENS.state.border.error} ${CHECKBOX_TOKENS.state.background.default} ${CHECKBOX_TOKENS.state.text.default}`,
      disabled: `${CHECKBOX_TOKENS.state.border.disabled} ${CHECKBOX_TOKENS.state.background.disabled} ${CHECKBOX_TOKENS.state.text.disabled}`,
      disabledChecked: `${CHECKBOX_TOKENS.state.border.disabled} ${CHECKBOX_TOKENS.state.background.disabledChecked} ${CHECKBOX_TOKENS.state.text.disabled}`,
    } satisfies Record<CheckboxState, string>,
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
    state: "default",
  },
});
