"use client";

/**
 * NotificationCenter.DismissAll Component
 *
 * Button component to clear all notifications.
 * Located in Panel header.
 */

import * as React from "react";

import { Button } from "../ui/button";
import { useNotificationCenterContext } from "./NotificationCenter.Provider";

export interface NotificationCenterDismissAllProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Show confirmation before clearing
   */
  confirm?: boolean;

  /**
   * Confirmation message
   */
  confirmMessage?: string;
}

/**
 * NotificationCenter.DismissAll component - clear all notifications button
 */
export const NotificationCenterDismissAll = React.forwardRef<
  HTMLButtonElement,
  NotificationCenterDismissAllProps
>(({ confirm = false, confirmMessage = "Clear all notifications?", className, ...props }, ref) => {
  const { clearAll, getAll } = useNotificationCenterContext();
  const notifications = getAll();

  const handleClick = () => {
    if (notifications.length === 0) return;

    if (confirm && typeof window !== "undefined") {
      if (window.confirm(confirmMessage)) {
        clearAll();
      }
    } else {
      clearAll();
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      onClick={handleClick}
      aria-label="Clear all notifications"
      className={className}
      {...props}
    >
      Clear all
    </Button>
  );
});

NotificationCenterDismissAll.displayName = "NotificationCenter.DismissAll";
