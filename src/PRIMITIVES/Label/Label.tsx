"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { FORM_TOKENS } from "@/FOUNDATION/tokens/components/form";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";

const labelVariants = cva(
  `${TEXT_TOKENS.fontSize.sm} ${TEXT_TOKENS.fontWeight.medium} ${TEXT_TOKENS.lineHeight.none} peer-disabled:cursor-not-allowed peer-disabled:opacity-70`,
);

export interface LabelProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>, "className" | "style">,
    VariantProps<typeof labelVariants> {
  /**
   * Whether the field is required (shows asterisk)
   */
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, children, ...props }, ref) => (
    // className and style are forbidden from public API - only CVA output is used
    <LabelPrimitive.Root ref={ref} className={labelVariants()} {...props}>
      {children}
      {required && <span className={cn(FORM_TOKENS.label.requiredMark, "ml-xs")}>*</span>}
    </LabelPrimitive.Root>
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
