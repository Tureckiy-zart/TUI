"use client";

import * as React from "react";

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { cn } from "@/FOUNDATION/lib/utils";
import { ALERT_TOKENS } from "@/FOUNDATION/tokens/components/alert";

/**
 * Alert variant values
 *
 * @public
 */
export const ALERT_VARIANTS = ["default", "primary", "secondary", "accent", "destructive"] as const;

/**
 * Alert variant type
 *
 * @public
 */
export type AlertVariant = (typeof ALERT_VARIANTS)[number];

const alertVariants = tokenCVA({
  base: `${ALERT_TOKENS.radius} ${ALERT_TOKENS.border} ${ALERT_TOKENS.padding}`,
  variants: {
    variant: {
      default: `${ALERT_TOKENS.variant.default.background} ${ALERT_TOKENS.variant.default.border} ${ALERT_TOKENS.variant.default.text}`,
      primary: `${ALERT_TOKENS.variant.primary.background} ${ALERT_TOKENS.variant.primary.border} ${ALERT_TOKENS.variant.primary.text}`,
      secondary: `${ALERT_TOKENS.variant.secondary.background} ${ALERT_TOKENS.variant.secondary.border} ${ALERT_TOKENS.variant.secondary.text}`,
      accent: `${ALERT_TOKENS.variant.accent.background} ${ALERT_TOKENS.variant.accent.border} ${ALERT_TOKENS.variant.accent.text}`,
      destructive: `${ALERT_TOKENS.variant.destructive.background} ${ALERT_TOKENS.variant.destructive.border} ${ALERT_TOKENS.variant.destructive.text}`,
    } satisfies Record<AlertVariant, string>,
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alert variant style
   * @default "default"
   */
  variant?: AlertVariant;
}

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
