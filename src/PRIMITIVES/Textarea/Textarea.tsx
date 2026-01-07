"use client";

/**
 * Textarea Component
 *
 * @semantic_role FOUNDATION_PRIMITIVE_TEXTAREA_INPUT
 * @semantic_definition Textarea is a Foundation primitive component that serves exclusively as a multiline text input control.
 *                     Textarea represents a low-level form control primitive that wraps the native <textarea> element.
 *                     It is responsible only for visual styling via tokens, accessibility via native and ARIA attributes,
 *                     and forwarding all native textarea behavior. Textarea does not handle labels, errors, validation,
 *                     helper text, or form logic. Higher-level composition is delegated to FormField or domain-level form abstractions.
 *
 * @status FINAL LOCK (2025-12-26)
 * @rule DO NOT modify, extend, or create alternatives
 */

import * as React from "react";

import type { TextareaProps } from "./Textarea.types";
import { textareaVariants } from "./textarea-variants";

/**
 * Textarea Component Implementation
 *
 * Strict low-level multiline form control primitive.
 * Thin wrapper around native <textarea> element aligned with Input canonical model.
 *
 * @enforcement TUNG_TEXTAREA_CVA_ENFORCEMENT
 * @rule NO color-related classes outside CVA
 * @rule JSX must only consume CVA output via textareaVariants()
 * @rule NO conditional className logic affecting colors
 * @rule Textarea is NOT a source of color - all colors come from Color Authority
 * @rule Textarea MUST react to token changes - changing tokens/colors.ts MUST change Textarea appearance
 *
 * Token-only contract:
 * - All colors are defined in TEXTAREA_TOKENS (src/FOUNDATION/tokens/components/textarea.ts)
 * - TEXTAREA_TOKENS reference foundation tokens from tokens/colors.ts
 * - No raw Tailwind color classes (bg-red-500, text-blue-600, etc.) are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid size values at compile time
 *
 * State handling follows STATE_AUTHORITY pattern:
 * - Invalid state: Use invalid={true} or aria-invalid={true} (native HTML attribute)
 * - Disabled state: Use disabled={true} (native HTML attribute)
 * - No separate "state" prop (states are derived from HTML attributes)
 * - State styling (invalid, disabled) is handled via CSS pseudo-classes and aria-invalid attribute
 *
 * Color Authority compliance:
 * - Textarea does NOT define colors - it consumes them from tokens
 * - Changing tokens/colors.ts will automatically change Textarea appearance
 * - Textarea states are visually distinct and react to theme changes
 * - All state styling uses token-based CSS variables
 *
 * @example
 * ```tsx
 * <Textarea
 *   size="md"
 *   placeholder="Enter text..."
 * />
 *
 * // Invalid state
 * <Textarea
 *   invalid={true}
 *   aria-describedby="error-message"
 * />
 *
 * // Disabled state
 * <Textarea disabled />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size, invalid, disabled, "aria-invalid": ariaInvalid, ...props }, ref) => {
    // Compute textarea classes
    // className and style are forbidden from public API - only CVA output is used
    // State styling (invalid, disabled) is handled via CSS pseudo-classes and data attributes
    const textareaClasses = textareaVariants({ size });

    // Map invalid prop to aria-invalid attribute
    const ariaInvalidValue = invalid !== undefined ? invalid : ariaInvalid;

    return (
      <textarea
        className={textareaClasses}
        ref={ref}
        disabled={disabled}
        aria-invalid={ariaInvalidValue}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
