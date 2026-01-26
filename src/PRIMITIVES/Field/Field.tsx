"use client";

import * as React from "react";

import { Stack } from "@/COMPOSITION/layout";
import { Label } from "@/PRIMITIVES/Label";
import { Text } from "@/PRIMITIVES/Text";

/**
 * Field Container Component
 *
 * Provides vertical layout structure for form field elements with consistent spacing.
 * Composes Label, Control wrapper, Description, and Error into a Stack layout.
 *
 * @example
 * ```tsx
 * <Field>
 *   <Field.Label htmlFor="email">Email</Field.Label>
 *   <Field.Control>
 *     <Input id="email" type="email" />
 *   </Field.Control>
 *   <Field.Description>We'll never share your email.</Field.Description>
 * </Field>
 * ```
 */
export interface FieldProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  children: React.ReactNode;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(({ children, ...props }, ref) => {
  // className and style are forbidden from public API - only token-based className is used
  return (
    <Stack ref={ref} spacing="sm" {...props}>
      {children}
    </Stack>
  );
});
Field.displayName = "Field";

/**
 * Field Label Component
 *
 * Wraps the Foundation Label component for form field labels.
 * Delegates all behavior and styling to Label (Foundation component).
 *
 * @example
 * ```tsx
 * <Field.Label htmlFor="email">Email Address</Field.Label>
 * ```
 */
export interface FieldLabelProps extends React.ComponentProps<typeof Label> {}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>((props, ref) => {
  // className is forbidden on Foundation components - FieldLabel passes props directly to Label
  return <Label ref={ref} {...props} />;
});
FieldLabel.displayName = "FieldLabel";

/**
 * Field Control Component
 *
 * Wrapper for form control elements (Input, Textarea, Select, etc.).
 * Provides ref forwarding and className merging for control elements.
 *
 * @example
 * ```tsx
 * <Field.Control>
 *   <Input id="email" type="email" />
 * </Field.Control>
 * ```
 */
export interface FieldControlProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  children: React.ReactNode;
}

const FieldControl = React.forwardRef<HTMLDivElement, FieldControlProps>(
  ({ children, ...props }, ref) => {
    // className and style are forbidden from public API - only token-based className is used
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  },
);
FieldControl.displayName = "FieldControl";

/**
 * Field Description Component
 *
 * Helper text displayed below the control to provide additional context.
 * Uses Text component with size="sm" and muted styling by default.
 *
 * @example
 * ```tsx
 * <Field.Description>We'll never share your email with anyone else.</Field.Description>
 * ```
 */
export interface FieldDescriptionProps extends React.ComponentProps<typeof Text> {}

const FieldDescription = React.forwardRef<HTMLSpanElement, FieldDescriptionProps>((props, ref) => {
  // className is forbidden on Foundation components - FieldDescription uses only token-driven props
  return <Text ref={ref} size="sm" typographyRole="meta" color="muted" {...props} />;
});
FieldDescription.displayName = "FieldDescription";

/**
 * Field Error Component
 *
 * Error message displayed below the control for validation feedback.
 * Uses Text component with size="sm" wrapped in destructive color span.
 *
 * Note: Wrapper span with className="text-[hsl(var(--tm-destructive))]" is used to apply
 * destructive color without modifying Text component (Foundation component).
 * This pattern allows Field (Composition component) to use className while
 * respecting Foundation Enforcement rules for Text.
 *
 * @example
 * ```tsx
 * <Field.Error>Email is required</Field.Error>
 * ```
 */
export interface FieldErrorProps extends React.ComponentProps<typeof Text> {}

const FieldError = React.forwardRef<HTMLSpanElement, FieldErrorProps>(
  ({ children, ...props }, ref) => {
    // Wrapper span applies destructive color via className (Composition layer pattern).
    // Text component (Foundation) cannot accept className, so wrapper is used.
    // This pattern respects Foundation Enforcement while allowing Composition flexibility.
    return (
      <span ref={ref} className="text-[hsl(var(--tm-destructive))]">
        <Text size="sm" {...props}>
          {children}
        </Text>
      </span>
    );
  },
);
FieldError.displayName = "FieldError";

// Compose Field API
const FieldRoot = Field as typeof Field & {
  Label: typeof FieldLabel;
  Control: typeof FieldControl;
  Description: typeof FieldDescription;
  Error: typeof FieldError;
};

FieldRoot.Label = FieldLabel;
FieldRoot.Control = FieldControl;
FieldRoot.Description = FieldDescription;
FieldRoot.Error = FieldError;

export { FieldRoot as Field };
