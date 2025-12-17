"use client";

/**
 * NotificationCenter.List Component
 *
 * Vertical list container for notifications.
 * Uses Stack component with token-based spacing.
 * Provides proper ARIA roles for accessibility.
 */

import * as React from "react";

import { Stack } from "@/COMPOSITION/layout";
import { cn } from "@/FOUNDATION/lib/utils";
import { NOTIFICATION_TOKENS } from "@/FOUNDATION/tokens/components/notifications";

export interface NotificationCenterListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Children to render (notification items)
   */
  children: React.ReactNode;

  /**
   * ARIA label for the list
   */
  "aria-label"?: string;
}

/**
 * NotificationCenter.List component - vertical list container
 */
export const NotificationCenterList = React.forwardRef<
  HTMLUListElement,
  NotificationCenterListProps
>(({ children, className, "aria-label": ariaLabel, ...props }, ref) => {
  return (
    <Stack
      ref={ref as any}
      as="ul"
      role="list"
      aria-label={ariaLabel || "Notifications"}
      className={cn("list-none", NOTIFICATION_TOKENS.spacing.gap, className)}
      {...(props as any)}
    >
      {children}
    </Stack>
  );
});

NotificationCenterList.displayName = "NotificationCenter.List";
