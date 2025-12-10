"use client";

/**
 * NotificationCenter.Item Component
 *
 * Individual notification item component.
 * Displays icon, title, description, timestamp, and close button.
 * Token-driven with proper ARIA roles.
 */

import { AlertCircle, Bell, CheckCircle2, FileText, Info, X, XCircle } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { NOTIFICATION_TOKENS } from "@/tokens/components/notifications";

import { Button } from "../ui/button";
import type { NotificationData, NotificationVariant } from "./NotificationCenter.types";

export interface NotificationCenterItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, "onClick"> {
  /**
   * Notification data
   */
  notification: NotificationData;

  /**
   * Callback when notification is dismissed
   */
  onDismiss?: (id: string) => void;

  /**
   * Callback when notification is clicked
   */
  onClick?: (id: string) => void;

  /**
   * Show expandable details
   */
  expandable?: boolean;
}

/**
 * Get icon for notification variant
 */
function getNotificationIcon(variant: NotificationVariant = "default") {
  switch (variant) {
    case "success":
      return CheckCircle2;
    case "info":
      return Info;
    case "warning":
      return AlertCircle;
    case "danger":
      return XCircle;
    case "system":
      return Bell;
    case "log":
      return FileText;
    default:
      return Info;
  }
}

/**
 * Format relative time
 */
function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

/**
 * NotificationCenter.Item component - individual notification item
 */
export const NotificationCenterItem = React.forwardRef<HTMLLIElement, NotificationCenterItemProps>(
  (
    { notification, onDismiss, onClick, expandable: _expandable = false, className, ...props },
    ref,
  ) => {
    const variant = notification.variant || "default";
    const Icon = getNotificationIcon(variant);
    const isRead = notification.read ?? false;

    const handleClick = () => {
      if (onClick) {
        onClick(notification.id);
      }
    };

    const handleDismiss = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onDismiss) {
        onDismiss(notification.id);
      }
    };

    const itemId = `notification-${notification.id}`;
    const titleId = `${itemId}-title`;
    const descriptionId = `${itemId}-description`;

    return (
      <li
        ref={ref}
        role="listitem"
        aria-labelledby={notification.title ? titleId : undefined}
        aria-describedby={notification.description ? descriptionId : undefined}
        className={cn(
          "group relative flex items-start gap-sm rounded-md border transition-colors",
          NOTIFICATION_TOKENS.item.padding,
          NOTIFICATION_TOKENS.item.radius,
          NOTIFICATION_TOKENS.shadow.item,
          NOTIFICATION_TOKENS.surface[variant],
          !isRead && "ring-1 ring-primary/20",
          onClick && "cursor-pointer hover:bg-accent/50",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {/* Icon */}
        <div className="flex-shrink-0">
          <Icon className={cn(NOTIFICATION_TOKENS.item.iconSize, "text-foreground/70")} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-xs">
          {notification.title && (
            <div id={titleId} className="text-sm font-semibold text-foreground">
              {notification.title}
            </div>
          )}
          {notification.description && (
            <div id={descriptionId} className="text-sm text-foreground/80">
              {notification.description}
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            {formatRelativeTime(notification.timestamp)}
          </div>
          {notification.action && (
            <div className="mt-sm">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  notification.action?.onClick();
                }}
                className="h-7 px-xs text-xs"
              >
                {notification.action.label}
              </Button>
            </div>
          )}
        </div>

        {/* Close button */}
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            aria-label="Dismiss notification"
            className="absolute right-xs top-xs h-6 w-6 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </li>
    );
  },
);

NotificationCenterItem.displayName = "NotificationCenter.Item";
