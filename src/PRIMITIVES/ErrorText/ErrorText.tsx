"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { Text } from "@/PRIMITIVES/Text";

/**
 * ErrorText Component
 *
 * Semantic error message primitive for form validation feedback.
 * Provides accessible error messaging with role="alert" and aria-live="polite"
 * for screen reader announcements.
 *
 * **What ErrorText IS:**
 * - Semantic error message component with accessibility attributes
 * - Thin wrapper over Text component with destructive styling
 * - Pure presentational component (no validation logic, no state management)
 * - Usable standalone and inside FormGroup / Field
 *
 * **What ErrorText IS NOT:**
 * - NOT a validation component (no validation logic)
 * - NOT a form control (use Input, Textarea, etc.)
 * - NOT a Field subcomponent (ErrorText is standalone, Field.Error is Field-specific)
 *
 * @example
 * ```tsx
 * <ErrorText id="email-error">Email is required</ErrorText>
 * ```
 *
 * @example
 * ```tsx
 * <FormGroup>
 *   <Label htmlFor="email">Email</Label>
 *   <Input id="email" aria-describedby="email-error" />
 *   <ErrorText id="email-error">Email is required</ErrorText>
 * </FormGroup>
 * ```
 */
export interface ErrorTextProps extends Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "className" | "style"
> {
  /** Error message content (required) */
  children: React.ReactNode;
  /** Optional ID for aria-describedby linking */
  id?: string;
  /** Use Radix Slot pattern for composition */
  asChild?: boolean;
}

const ErrorText = React.forwardRef<HTMLParagraphElement, ErrorTextProps>(
  ({ children, id, asChild = false, ...props }, ref) => {
    // Build base classes: destructive color styling
    const baseClasses = "text-destructive";

    // If asChild, use Slot pattern for composition
    // Slot applies attributes to the child element directly
    if (asChild) {
      return (
        <Slot ref={ref} role="alert" aria-live="polite" id={id} className={baseClasses} {...props}>
          {children}
        </Slot>
      );
    }

    // Default: render as p element
    return (
      <p ref={ref} role="alert" aria-live="polite" id={id} className={baseClasses} {...props}>
        <Text size="sm" as="span">
          {children}
        </Text>
      </p>
    );
  },
);
ErrorText.displayName = "ErrorText";

export { ErrorText };
