"use client";

/**
 * NotificationCenter.DismissAll Component
 *
 * Button component to clear all notifications.
 * Located in Panel header.
 */

import * as React from "react";

import { Button } from "@/PRIMITIVES/Button";

import { useNotificationCenterContext } from "./NotificationCenter.Provider";

export interface NotificationCenterDismissAllProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> {
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
>(({ confirm = false, confirmMessage = "Clear all notifications?", ...props }, ref) => {
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

  // Filter out component-specific props before forwarding to Button
  // This ensures only valid ButtonProps are passed, preventing prop smuggling
  const buttonProps: Omit<NotificationCenterDismissAllProps, "confirm" | "confirmMessage"> = props;

  // className is forbidden on Foundation components - NotificationCenterDismissAll uses only token-driven props
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      onClick={handleClick}
      aria-label="Clear all notifications"
      {...buttonProps}
    >
      Clear all
    </Button>
  );
});

NotificationCenterDismissAll.displayName = "NotificationCenter.DismissAll";
