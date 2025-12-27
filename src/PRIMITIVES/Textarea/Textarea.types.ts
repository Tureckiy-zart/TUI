"use client";

import * as React from "react";

import type { TextareaSize } from "./textarea-variants";

/**
 * Textarea Component Props
 *
 * Strict low-level multiline form control primitive.
 * Thin wrapper around native <textarea> element with minimal API.
 *
 * Note: className and style props are excluded per Foundation Enforcement rule.
 * State styling (invalid, disabled) is handled via native HTML attributes (disabled, aria-invalid),
 * not as separate variant axis (per STATE_AUTHORITY).
 */
export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "rows" | "className" | "style"
> {
  /**
   * Textarea size
   * Limited to sm, md, lg sizes for strict primitive model
   * @default "md"
   */
  size?: TextareaSize;

  /**
   * Invalid state indicator
   * Maps to aria-invalid attribute for accessibility
   * @default false
   */
  invalid?: boolean;
}
