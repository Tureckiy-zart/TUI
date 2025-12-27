"use client";

import * as React from "react";

/**
 * Switch variant type
 * Supported variants from InteractiveVariant dictionary
 */
export type SwitchVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";

/**
 * Switch size type
 * Supported sizes from GlobalSize scale
 */
export type SwitchSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Switch Component Props
 *
 * Extends native button HTML attributes with variant props, checked state, and accessibility props.
 * Uses button role="switch" pattern for full keyboard accessibility.
 *
 * Foundation Enforcement: className and style props are excluded (Foundation components use token-driven styling only).
 */
export interface SwitchProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "onChange" | "className" | "style"
> {
  /**
   * Switch variant style
   * @default "primary"
   */
  variant?: SwitchVariant;

  /**
   * Switch size
   * @default "md"
   */
  size?: SwitchSize;

  /**
   * Whether switch is checked (controlled)
   */
  checked?: boolean;

  /**
   * Whether switch is disabled
   */
  disabled?: boolean;

  /**
   * Whether switch is in invalid/error state
   * Used for form validation feedback
   */
  invalid?: boolean;

  /**
   * Callback fired when checked state changes
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * ARIA label for the switch
   * Required if no visible label is present
   */
  "aria-label"?: string;

  /**
   * ARIA labelledby reference
   * Points to the ID of the element that labels this switch
   */
  "aria-labelledby"?: string;

  /**
   * ARIA describedby reference
   * Points to the ID of the element that describes this switch
   */
  "aria-describedby"?: string;
}
