"use client";

import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { textareaVariants } from "./textarea-variants";

/**
 * Textarea Component Props
 *
 * Extends native textarea HTML attributes with variant props, character counter, and accessibility props.
 */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /**
   * Textarea variant style
   * @default "outline"
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";

  /**
   * Textarea size
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Textarea state
   * @default "default"
   */
  state?: "default" | "disabled" | "error" | "success";

  /**
   * Whether textarea should take full width
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Maximum character length (for character counter)
   */
  maxLength?: number;

  /**
   * Show character counter
   * Only displays when both showCharacterCount and maxLength are provided
   * @default false
   */
  showCharacterCount?: boolean;
}
