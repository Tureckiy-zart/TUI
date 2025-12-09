"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ALERT_TOKENS } from "@/tokens/components/alert";

const alertVariants = cva(`${ALERT_TOKENS.radius} border ${ALERT_TOKENS.padding}`, {
  variants: {
    variant: {
      default: "bg-muted border-border text-foreground",
      // Canonical variants (Freeze API)
      primary: "bg-primary/10 border-primary/20 text-primary-foreground",
      secondary: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
      accent: "bg-accent/10 border-accent/20 text-accent-foreground",
      destructive: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
      // Legacy semantic variants (deprecated, mapped to canonical)
      success: "bg-accent/10 border-accent/20 text-accent-foreground",
      warning: "bg-secondary/10 border-secondary/20 text-secondary-foreground",
      danger: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
      info: "bg-primary/10 border-primary/20 text-primary-foreground",
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
