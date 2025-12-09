"use client";

import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { checkboxVariants } from "./checkbox-variants";

/**
 * Checkbox Component Props
 *
 * Extends native button HTML attributes with variant props, checked state, and accessibility props.
 * Uses button role="checkbox" pattern for full keyboard accessibility.
 */
export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "onChange">,
    VariantProps<typeof checkboxVariants> {
  /**
   * Checkbox variant style
   * @default "outline"
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";

  /**
   * Checkbox size
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Checkbox state
   * @default "default"
   */
  state?: "default" | "checked" | "indeterminate" | "error" | "disabled";

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
