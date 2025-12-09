"use client";

/**
 * NotificationCenter.Trigger Component
 *
 * Button component to open NotificationCenter.Panel.
 * Optional badge showing unread count.
 */

import { Bell } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { useNotificationCenterContext } from "./NotificationCenter.Provider";

export interface NotificationCenterTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Callback when trigger is clicked
   */
  onClick?: () => void;

  /**
   * Show unread badge
   */
  showBadge?: boolean;
}

/**
 * NotificationCenter.Trigger component - open panel button
 */
export const NotificationCenterTrigger = React.forwardRef<
  HTMLButtonElement,
  NotificationCenterTriggerProps
>(({ onClick, showBadge = true, className, ...props }, ref) => {
  const { getUnreadCount } = useNotificationCenterContext();
  const unreadCount = getUnreadCount();

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={`Open notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
      className={cn("relative", className)}
      {...props}
    >
      <Bell className="h-5 w-5" />
      {showBadge && unreadCount > 0 && (
        <span
          className={cn(
            "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-semibold text-destructive-foreground",
          )}
          aria-hidden="true"
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Button>
  );
});

NotificationCenterTrigger.displayName = "NotificationCenter.Trigger";
