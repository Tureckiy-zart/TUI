"use client";

import * as React from "react";

import type { CheckboxSize, CheckboxState, CheckboxVariant } from "./checkbox-variants";

/**
 * Checkbox Component Props
 *
 * Extends native button HTML attributes with variant props, checked state, and accessibility props.
 * Uses button role="checkbox" pattern for full keyboard accessibility.
 *
 * NOTE: Size scale restricted to sm|md|lg per canonical interactive size scale.
 * VariantProps removed — public API uses explicit union types only.
 */
export interface CheckboxProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "onChange" | "className" | "style"
> {
  /**
   * Checkbox variant style
   * @default "outline"
   */
  variant?: CheckboxVariant;

  /**
   * Checkbox size (canonical interactive scale: sm | md | lg)
   * @default "md"
   */
  size?: CheckboxSize;

  /**
   * Checkbox state
   * @default "default"
   */
  state?: CheckboxState;

  /**
   * Whether checkbox is checked (controlled)
   */
  checked?: boolean;

  /**
   * Whether checkbox is in indeterminate state
   * When true, overrides checked state visually
   */
  indeterminate?: boolean;

  /**
   * Whether checkbox is disabled
   */
  disabled?: boolean;

  /**
   * Callback fired when checked state changes
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * Custom icon to display when checked
   * Defaults to IconCheck from icon system
   */
  icon?: React.ReactNode;

  /**
   * Custom icon to display when indeterminate
   * Defaults to horizontal line indicator
   */
  indeterminateIcon?: React.ReactNode;

  /**
   * ARIA label for the checkbox
   * Required if no visible label is present
   */
  "aria-label"?: string;

  /**
   * ARIA labelledby reference
   * Points to the ID of the element that labels this checkbox
   */
  "aria-labelledby"?: string;

  /**
   * ARIA describedby reference
   * Points to the ID of the element that describes this checkbox
   */
  "aria-describedby"?: string;
}
