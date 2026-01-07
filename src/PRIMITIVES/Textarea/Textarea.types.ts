"use client";

import * as React from "react";

import type { TextareaSize } from "./textarea-variants";

/**
 * Textarea Component Props
 *
 * @enforcement TUNG_TEXTAREA_CVA_ENFORCEMENT
 * @rule size prop is restricted to TextareaSize union type (GlobalSize values only: "sm" | "md" | "lg")
 * @rule invalid prop maps to aria-invalid attribute for accessibility
 * @rule className prop cannot override color classes (tokenCVA validation in dev mode)
 * @rule style prop is excluded from public API (Foundation Enforcement)
 * @rule Textarea is fully token-based - no raw Tailwind colors allowed
 *
 * Strict low-level multiline form control primitive.
 * Thin wrapper around native <textarea> element with minimal API.
 *
 * Foundation Enforcement Rules:
 * - className and style props are excluded per Foundation Enforcement rule
 * - Only CVA output (textareaVariants) is used for styling
 * - State styling (invalid, disabled) is handled via native HTML attributes (disabled, aria-invalid),
 *   not as separate variant axis (per STATE_AUTHORITY)
 *
 * Token-only contract:
 * - All styling uses token-based values from TEXTAREA_TOKENS
 * - No raw Tailwind color classes allowed
 * - TypeScript enforces valid size values at compile time
 * - tokenCVA validates token usage in development mode
 */
export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "rows" | "className" | "style"
> {
  /**
   * Textarea size
   *
   * Limited to sm, md, lg sizes for strict primitive model (GlobalSize compliant).
   * Size affects padding, font size, border radius, and minimum height.
   *
   * @default "md"
   *
   * @example
   * ```tsx
   * // Small textarea
   * <Textarea size="sm" placeholder="Small textarea" />
   *
   * // Medium textarea (default)
   * <Textarea size="md" placeholder="Medium textarea" />
   *
   * // Large textarea
   * <Textarea size="lg" placeholder="Large textarea" />
   * ```
   */
  size?: TextareaSize;

  /**
   * Invalid state indicator
   *
   * Maps to aria-invalid attribute for accessibility.
   * When invalid={true}, the textarea will have aria-invalid="true" attribute,
   * which triggers error state styling via CSS selector [aria-invalid="true"].
   *
   * State handling follows STATE_AUTHORITY pattern:
   * - Invalid state is derived from HTML attributes, not a separate variant axis
   * - Use invalid={true} or aria-invalid={true} (native HTML attribute)
   * - Error styling uses CSS variable: border-[hsl(var(--destructive))]
   *
   * @default false
   *
   * @example
   * ```tsx
   * // Invalid state with error message
   * <Textarea
   *   invalid={true}
   *   aria-describedby="error-message"
   *   placeholder="Enter text..."
   * />
   *
   * // Using native aria-invalid directly
   * <Textarea
   *   aria-invalid={true}
   *   aria-describedby="error-message"
   *   placeholder="Enter text..."
   * />
   * ```
   */
  invalid?: boolean;
}
