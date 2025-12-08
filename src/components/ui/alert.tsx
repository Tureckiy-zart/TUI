"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva("rounded-lg border p-md", {
  variants: {
    variant: {
      default: "bg-muted border-border text-foreground",
      success: "bg-success/10 border-success/20 text-success-foreground",
      warning: "bg-warning/10 border-warning/20 text-warning-foreground",
      danger: "bg-error/10 border-error/20 text-error-foreground",
      info: "bg-info/10 border-info/20 text-info-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Alert.displayName = "Alert";

export { Alert, alertVariants };
