"use client";

import * as React from "react";

import { Stack } from "@/components/layout";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

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

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, ...props }, ref) => {
    return <Label ref={ref} className={className} {...props} />;
  },
);
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

const FieldDescription = React.forwardRef<HTMLSpanElement, FieldDescriptionProps>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} size="sm" muted className={cn(className)} {...props} />;
  },
);
FieldDescription.displayName = "FieldDescription";

/**
 * Field Error Component
 * Error message displayed below the control
 */
export interface FieldErrorProps extends React.ComponentProps<typeof Text> {}

const FieldError = React.forwardRef<HTMLSpanElement, FieldErrorProps>(
  ({ className, ...props }, ref) => {
    return <Text ref={ref} size="sm" className={cn("text-destructive", className)} {...props} />;
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
