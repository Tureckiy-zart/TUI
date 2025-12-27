"use client";

/**
 * Input Component
 *
 * @semantic_role FOUNDATION_PRIMITIVE_TEXT_INPUT
 * @semantic_definition Input is a low-level form control primitive that wraps the native <input> element.
 *                     It is responsible only for visual styling via tokens, accessibility via native and ARIA attributes,
 *                     and forwarding all native input behavior. Input does not handle labels, errors, validation,
 *                     helper text, or form logic. Higher-level composition is delegated to FormField or domain-level form abstractions.
 *
 * @status FOUNDATION LOCK (Target - 2025-12-26)
 * @rule DO NOT modify, extend, or create alternatives (after Foundation Lock)
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";

import type { InputProps } from "./Input.types";
import { inputVariants } from "./input-variants";

/**
 * Input Component
 *
 * A minimal, low-level form control primitive that wraps the native <input> element.
 * Supports size variants and invalid state for accessibility.
 *
 * @example
 * ```tsx
 * <Input size="md" placeholder="Enter text..." />
 * <Input invalid aria-describedby="error-id" />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = "md", invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(inputVariants({ size }))}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
