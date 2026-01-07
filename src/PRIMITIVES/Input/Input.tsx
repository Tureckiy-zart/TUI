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
 * Input Component Implementation
 *
 * Strict low-level form control primitive.
 * Thin wrapper around native <input> element aligned with canonical form control model.
 *
 * @enforcement TUNG_INPUT_CVA_ENFORCEMENT
 * @rule NO color-related classes outside CVA
 * @rule JSX must only consume CVA output via inputVariants()
 * @rule NO conditional className logic affecting colors
 * @rule Input is NOT a source of color - all colors come from Color Authority
 * @rule Input MUST react to token changes - changing tokens/colors.ts MUST change Input appearance
 *
 * Token-only contract:
 * - All colors are defined in INPUT_TOKENS (src/FOUNDATION/tokens/components/input.ts)
 * - INPUT_TOKENS reference foundation tokens from tokens/colors.ts
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
 * - Input does NOT define colors - it consumes them from tokens
 * - Changing tokens/colors.ts will automatically change Input appearance
 * - Input states are visually distinct and react to theme changes
 * - All state styling uses token-based CSS variables
 *
 * @example
 * ```tsx
 * <Input size="md" placeholder="Enter text..." />
 *
 * // Invalid state
 * <Input invalid={true} aria-describedby="error-message" />
 *
 * // Disabled state
 * <Input disabled />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = "md", invalid, type = "text", ...props }, ref) => {
    // Compute input classes
    // className and style are forbidden from public API - only CVA output is used
    // State styling (invalid, disabled) is handled via CSS pseudo-classes and data attributes
    const inputClasses = inputVariants({ size });

    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        className={cn(inputClasses)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
