"use client";

import * as React from "react";

import type { TextareaProps } from "./Textarea.types";
import { textareaVariants } from "./textarea-variants";

/**
 * Textarea Component
 *
 * Strict low-level multiline form control primitive.
 * Thin wrapper around native <textarea> element aligned with Input canonical model.
 *
 * State handling follows STATE_AUTHORITY pattern:
 * - Invalid state: Use invalid={true} or aria-invalid={true} (native HTML attribute)
 * - Disabled state: Use disabled={true} (native HTML attribute)
 * - No separate "state" prop (states are derived from HTML attributes)
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
