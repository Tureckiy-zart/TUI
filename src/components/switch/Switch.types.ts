"use client";

import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { switchTrackVariants } from "./switch-variants";

/**
 * Switch Component Props
 *
 * Extends native button HTML attributes with variant props, checked state, and accessibility props.
 * Uses button role="switch" pattern for full keyboard accessibility.
 */
export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "onChange">,
    VariantProps<typeof switchTrackVariants> {
  /**
   * Switch variant style
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";

  /**
   * Switch size
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Switch state
   * @default "default"
   */
  state?: "default" | "checked" | "disabled" | "error";

  /**
   * Whether switch is checked (controlled)
   */
  checked?: boolean;

  /**
   * Whether switch is disabled
   */
  disabled?: boolean;

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
