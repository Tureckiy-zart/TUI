"use client";

/**
 * NotificationCenter.List Component
 *
 * Vertical list container for notifications.
 * Uses canonical List component with token-based spacing.
 * Provides proper ARIA roles for accessibility.
 */

import * as React from "react";

import { List } from "@/COMPOSITION/layout";
import { cn } from "@/FOUNDATION/lib/utils";

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
    <List
      ref={ref as any}
      as="ul"
      gap="sm"
      aria-label={ariaLabel || "Notifications"}
      className={cn("list-none", className)}
      {...(props as any)}
    >
      {children}
    </List>
  );
});

NotificationCenterList.displayName = "NotificationCenter.List";
