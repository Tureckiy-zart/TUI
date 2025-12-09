"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { INPUT_TOKENS } from "@/tokens/components/input";
import { TEXT_TOKENS } from "@/tokens/components/text";

import type { TextareaProps } from "./Textarea.types";
import { textareaVariants } from "./textarea-variants";

/**
 * Textarea Component
 *
 * A fully accessible, theme-aware textarea component with variant support,
 * character counter, and comprehensive state management.
 *
 * @example
 * ```tsx
 * <Textarea
 *   variant="outline"
 *   size="md"
 *   placeholder="Enter text..."
 *   showCharacterCount
 *   maxLength={200}
 * />
 * ```
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      state,
      fullWidth,
      disabled,
      maxLength,
      showCharacterCount = false,
      value,
      defaultValue,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    // Determine if textarea is in error state
    const isError = state === "error" || ariaInvalid === true;
    const isDisabled = disabled || state === "disabled";

    // Map state to aria-invalid
    const ariaInvalidValue = isError ? true : ariaInvalid;

    // Generate unique ID for aria-describedby if error/success state
    const generatedId = React.useId();
    const [describedById] = React.useState(() => {
      if (ariaDescribedBy) return ariaDescribedBy;
      if (state === "error" || state === "success") {
        return `textarea-${generatedId}-message`;
      }
      return undefined;
    });

    // Compute textarea classes
    const textareaClasses = cn(textareaVariants({ variant, size, state, fullWidth }), className);

    // Get current value length for character counter
    const currentValue = value ?? defaultValue ?? "";
    const currentLength = typeof currentValue === "string" ? currentValue.length : 0;

    // Determine if character counter should be shown
    const shouldShowCounter = showCharacterCount && maxLength !== undefined;

    // If character counter is needed, wrap in container
    if (shouldShowCounter) {
      return (
        <div className={cn("relative", fullWidth !== false && INPUT_TOKENS.width.full)}>
          <textarea
            className={textareaClasses}
            ref={ref}
            disabled={isDisabled}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            aria-invalid={ariaInvalidValue}
            aria-describedby={describedById}
            {...props}
          />
          <div
            className={cn(
              "absolute",
              INPUT_TOKENS.message.position.bottom,
              INPUT_TOKENS.message.position.right,
              TEXT_TOKENS.fontSize.xs,
              INPUT_TOKENS.message.color.default,
              currentLength > maxLength && INPUT_TOKENS.message.color.error,
            )}
          >
            {currentLength} / {maxLength}
          </div>
        </div>
      );
    }

    // No character counter - render textarea directly
    return (
      <textarea
        className={textareaClasses}
        ref={ref}
        disabled={isDisabled}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={ariaInvalidValue}
        aria-describedby={describedById}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
