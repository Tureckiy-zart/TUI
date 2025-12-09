"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { INPUT_TOKENS } from "@/tokens/components/input";
import { TEXT_TOKENS } from "@/tokens/components/text";

const labelVariants = cva(
  `${TEXT_TOKENS.fontSize.sm} ${TEXT_TOKENS.fontWeight.medium} ${TEXT_TOKENS.lineHeight.none} peer-disabled:cursor-not-allowed peer-disabled:opacity-70`,
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /**
   * Whether the field is required (shows asterisk)
   */
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props}>
      {children}
      {required && <span className={cn(INPUT_TOKENS.label.requiredMark, "ml-xs")}>*</span>}
    </LabelPrimitive.Root>
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
