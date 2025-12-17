"use client";

import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { INPUT_TOKENS, type InputSize } from "@/FOUNDATION/tokens/components/input";
import type { Responsive } from "@/types/responsive";

import { inputVariants } from "./input-variants";

/**
 * Input variant type derived from INPUT_TOKENS
 *
 * Available variants: "primary" | "secondary" | "outline" | "ghost" | "destructive"
 *
 * @example
 * ```tsx
 * const variant: InputVariant = "outline";
 * ```
 */
export type InputVariant = keyof typeof INPUT_TOKENS.variant;

// Re-export InputSize from tokens for consistency
export type { InputSize };

/**
 * Input Component Props
 *
 * Extends native input HTML attributes with variant props, icon slots, and accessibility props.
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    Omit<VariantProps<typeof inputVariants>, "variant" | "size"> {
  /**
   * Input variant style
   *
   * Supports responsive values:
   * - Single value: `variant="outline"`
   * - Responsive object: `variant={{ base: "outline", md: "primary" }}`
   *
   * @default "outline"
   *
   * @example
   * ```tsx
   * // Single value
   * <Input variant="outline" />
   *
   * // Responsive
   * <Input variant={{ base: "outline", md: "primary" }} />
   * ```
   */
  variant?: Responsive<InputVariant>;

  /**
   * Input size
   *
   * Supports responsive values:
   * - Single value: `size="md"`
   * - Responsive object: `size={{ base: "sm", md: "lg" }}`
   *
   * @default "md"
   *
   * @example
   * ```tsx
   * // Single value
   * <Input size="md" />
   *
   * // Responsive
   * <Input size={{ base: "sm", md: "lg" }} />
   * ```
   */
  size?: Responsive<InputSize>;

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
