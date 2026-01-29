"use client";

import * as React from "react";

import { Box, Stack } from "@/COMPOSITION/layout";
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

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  (
    {
      children,
      htmlFor,
      id,
      title,
      role,
      dir,
      lang,
      onClick,
      onFocus,
      onBlur,
      onMouseDown,
      onMouseUp,
      onKeyDown,
      onKeyUp,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-required": ariaRequired,
      "aria-invalid": ariaInvalid,
      required,
      ...props
    },
    ref,
  ) => {
    return (
      <Label
        ref={ref}
        htmlFor={htmlFor}
        id={id}
        title={title}
        role={role}
        dir={dir}
        lang={lang}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-required={ariaRequired}
        aria-invalid={ariaInvalid}
        required={required}
        {...props}
      >
        {children}
      </Label>
    );
  },
);
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
      <Box ref={ref} {...props}>
        {children}
      </Box>
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

const FieldDescription = React.forwardRef<HTMLSpanElement, FieldDescriptionProps>(
  (
    {
      children,
      as,
      id,
      title,
      role,
      dir,
      lang,
      tabIndex,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-live": ariaLive,
      "aria-atomic": ariaAtomic,
      "aria-busy": ariaBusy,
      ...textProps
    },
    ref,
  ) => {
    const domProps = {
      id,
      title,
      role,
      dir,
      lang,
      tabIndex,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-live": ariaLive,
      "aria-atomic": ariaAtomic,
      "aria-busy": ariaBusy,
    };
    const element = as ?? "span";

    return (
      <Box as={element} ref={ref as React.Ref<HTMLDivElement>} {...domProps}>
        <Text as="span" size="sm" typographyRole="meta" color="muted" {...textProps}>
          {children}
        </Text>
      </Box>
    );
  },
);
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
  (
    {
      children,
      as,
      id,
      title,
      role,
      dir,
      lang,
      tabIndex,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-live": ariaLive,
      "aria-atomic": ariaAtomic,
      "aria-busy": ariaBusy,
      ...textProps
    },
    ref,
  ) => {
    // Wrapper span applies destructive color via className (Composition layer pattern).
    // Text component (Foundation) cannot accept className, so wrapper is used.
    // This pattern respects Foundation Enforcement while allowing Composition flexibility.
    const domProps = {
      id,
      title,
      role,
      dir,
      lang,
      tabIndex,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-live": ariaLive,
      "aria-atomic": ariaAtomic,
      "aria-busy": ariaBusy,
    };
    const element = as ?? "span";

    return (
      <Box
        as={element}
        ref={ref as React.Ref<HTMLDivElement>}
        className="text-[hsl(var(--tm-destructive))]"
        {...domProps}
      >
        <Text as="span" size="sm" {...textProps}>
          {children}
        </Text>
      </Box>
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
