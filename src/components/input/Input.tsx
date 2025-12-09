"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { INPUT_TOKENS } from "@/tokens/components/input";

import type { InputProps } from "./Input.types";
import { inputVariants } from "./input-variants";

/**
 * Input Component
 *
 * A fully accessible, theme-aware input component with variant support,
 * icon slots, and comprehensive state management.
 *
 * @example
 * ```tsx
 * <Input
 *   variant="outline"
 *   size="md"
 *   placeholder="Enter text..."
 *   iconLeft={<Icon name="search" />}
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      variant,
      size,
      state,
      fullWidth,
      iconLeft,
      iconRight,
      disabled,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    // Determine if input is in error state
    const isError = state === "error" || ariaInvalid === true;
    const isDisabled = disabled || state === "disabled";

    // Map state to aria-invalid
    const ariaInvalidValue = isError ? true : ariaInvalid;

    // Generate unique ID for aria-describedby if error/success state
    const inputId = React.useId();
    const [describedById] = React.useState(() => {
      if (ariaDescribedBy) return ariaDescribedBy;
      if (state === "error" || state === "success") {
        return `input-${inputId}-message`;
      }
      return undefined;
    });

    // Compute input classes
    const inputClasses = cn(
      inputVariants({ variant, size, state, fullWidth }),
      // Add padding for icons if present
      iconLeft && INPUT_TOKENS.icon.paddingLeft,
      iconRight && INPUT_TOKENS.icon.paddingRight,
      className,
    );

    // If icons are present, wrap in container
    if (iconLeft || iconRight) {
      return (
        <div className={cn("relative", fullWidth !== false && INPUT_TOKENS.width.full)}>
          {iconLeft && (
            <span
              className={cn(
                "absolute left-0 top-0 flex h-full items-center",
                INPUT_TOKENS.icon.paddingLeft,
                INPUT_TOKENS.icon.size,
                INPUT_TOKENS.icon.color,
              )}
            >
              {iconLeft}
            </span>
          )}
          <input
            type={type}
            className={inputClasses}
            ref={ref}
            disabled={isDisabled}
            aria-invalid={ariaInvalidValue}
            aria-describedby={describedById}
            {...props}
          />
          {iconRight && (
            <span
              className={cn(
                "absolute right-0 top-0 flex h-full items-center",
                INPUT_TOKENS.icon.paddingRight,
                INPUT_TOKENS.icon.size,
                INPUT_TOKENS.icon.color,
              )}
            >
              {iconRight}
            </span>
          )}
        </div>
      );
    }

    // No icons - render input directly
    return (
      <input
        type={type}
        className={inputClasses}
        ref={ref}
        disabled={isDisabled}
        aria-invalid={ariaInvalidValue}
        aria-describedby={describedById}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
