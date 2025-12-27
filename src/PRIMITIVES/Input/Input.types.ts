"use client";

import * as React from "react";

/**
 * Input size type
 *
 * Available sizes: "sm" | "md" | "lg"
 *
 * @example
 * ```tsx
 * const size: InputSize = "md";
 * ```
 */
export type InputSize = "sm" | "md" | "lg";

/**
 * Input Component Props
 *
 * Minimal native-aligned interface for low-level form control primitive.
 * Extends native input HTML attributes with size and invalid props.
 */
export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> {
  /**
   * Input size
   *
   * @default "md"
   *
   * @example
   * ```tsx
   * <Input size="md" />
   * ```
   */
  size?: InputSize;

  /**
   * Whether the input is in an invalid state
   *
   * Maps to aria-invalid attribute for accessibility.
   *
   * @example
   * ```tsx
   * <Input invalid />
   * ```
   */
  invalid?: boolean;
}
