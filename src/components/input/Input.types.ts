"use client";

import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { inputVariants } from "./input-variants";

/**
 * Input Component Props
 *
 * Extends native input HTML attributes with variant props, icon slots, and accessibility props.
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /**
   * Input variant style
   * @default "outline"
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";

  /**
   * Input size
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Input state
   * @default "default"
   */
  state?: "default" | "disabled" | "error" | "success";

  /**
   * Whether input should take full width
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Icon to display on the left side of the input
   */
  iconLeft?: React.ReactNode;

  /**
   * Icon to display on the right side of the input
   */
  iconRight?: React.ReactNode;
}
