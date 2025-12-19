"use client";

import * as React from "react";

import { Stack } from "@/COMPOSITION/layout";
import { cn } from "@/FOUNDATION/lib/utils";
import { Label } from "@/PRIMITIVES/Label";
import { Text } from "@/PRIMITIVES/Text";

/**
 * Field Container Component
 * Provides spacing between field elements using Stack
 */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Stack ref={ref} gap="sm" className={cn(className)} {...props}>
        {children}
      </Stack>
    );
  },
);
Field.displayName = "Field";

/**
 * Field Label Component
 * Wraps Label component with proper styling
 */
export interface FieldLabelProps extends React.ComponentProps<typeof Label> {}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>((props, ref) => {
  // className is forbidden on Foundation components - FieldLabel passes props directly to Label
  return <Label ref={ref} {...props} />;
});
FieldLabel.displayName = "FieldLabel";

/**
 * Field Control Component
 * Wrapper for input/textarea/select controls
 */
export interface FieldControlProps extends React.HTMLAttributes<HTMLDivElement> {}

const FieldControl = React.forwardRef<HTMLDivElement, FieldControlProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    );
  },
);
FieldControl.displayName = "FieldControl";

/**
 * Field Description Component
 * Helper text displayed below the control
 */
export interface FieldDescriptionProps extends React.ComponentProps<typeof Text> {}

const FieldDescription = React.forwardRef<HTMLSpanElement, FieldDescriptionProps>((props, ref) => {
  // className is forbidden on Foundation components - FieldDescription uses only token-driven props
  return <Text ref={ref} size="sm" muted {...props} />;
});
FieldDescription.displayName = "FieldDescription";

/**
 * Field Error Component
 * Error message displayed below the control
 */
export interface FieldErrorProps extends React.ComponentProps<typeof Text> {}

const FieldError = React.forwardRef<HTMLSpanElement, FieldErrorProps>((props, ref) => {
  // className is forbidden on Foundation components
  // FieldError uses deprecated variant="destructive" for error styling (token-driven)
  // This uses the deprecated variant prop which is still available for backward compatibility
  return <Text ref={ref} size="sm" variant="destructive" {...props} />;
});
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
