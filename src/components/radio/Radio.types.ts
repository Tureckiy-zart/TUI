"use client";

import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { radioVariants } from "./radio-variants";

/**
 * Radio Component Props
 *
 * Extends native button HTML attributes with variant props, checked state, and accessibility props.
 * Uses button role="radio" pattern for full keyboard accessibility.
 */
export interface RadioProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "onChange">,
    VariantProps<typeof radioVariants> {
  /**
   * Radio variant style
   * @default "outline"
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";

  /**
   * Radio size
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Radio state
   * @default "default"
   */
  state?: "default" | "checked" | "disabled" | "error";

  /**
   * Whether radio is checked (controlled)
   */
  checked?: boolean;

  /**
   * Whether radio is disabled
   */
  disabled?: boolean;

  /**
   * Value of this radio button
   * Required when used within RadioGroup
   */
  value?: string;

  /**
   * Callback fired when radio is selected
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * Custom icon to display when checked
   * Defaults to filled circle dot
   */
  icon?: React.ReactNode;

  /**
   * ARIA label for the radio
   * Required if no visible label is present
   */
  "aria-label"?: string;

  /**
   * ARIA labelledby reference
   * Points to the ID of the element that labels this radio
   */
  "aria-labelledby"?: string;

  /**
   * ARIA describedby reference
   * Points to the ID of the element that describes this radio
   */
  "aria-describedby"?: string;
}
