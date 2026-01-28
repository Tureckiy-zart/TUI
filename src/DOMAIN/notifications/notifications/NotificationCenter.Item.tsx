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

import { cn } from "@/FOUNDATION/lib/utils";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { NOTIFICATION_TOKENS } from "@/FOUNDATION/tokens/components/notifications";
import { Box, Button, ListItem, Stack, Text } from "@/index";

import type { NotificationData, NotificationVariant } from "./NotificationCenter.types";

export interface NotificationCenterItemProps extends Omit<
  React.HTMLAttributes<HTMLLIElement>,
  "onClick"
> {
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
  ({ notification, onDismiss, onClick, className, ...props }, ref) => {
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
      <ListItem
        ref={ref}
        as="li"
        interactive={!!onClick}
        aria-labelledby={notification.title ? titleId : undefined}
        aria-describedby={notification.description ? descriptionId : undefined}
        className={cn(
          "group relative gap-sm rounded-md border",
          NOTIFICATION_TOKENS.item.padding,
          NOTIFICATION_TOKENS.item.radius,
          NOTIFICATION_TOKENS.shadow.item,
          NOTIFICATION_TOKENS.surface[variant],
          !isRead && "ring-1 ring-primary/20",
          onClick && "hover:bg-[hsl(var(--tm-accent))]/50", // Override ListItem's hover:bg-[hsl(var(--tm-muted))]/50 with original hover color
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {/* Icon */}
        <Box className="flex-shrink-0">
          <Icon
            className={cn(
              NOTIFICATION_TOKENS.item.iconSize,
              "text-[hsl(var(--tm-text-primary))]/70",
            )}
          />
        </Box>

        {/* Content */}
        <Stack spacing="xs" className="min-w-0 flex-1">
          {notification.title && (
            <Text id={titleId} size="sm" weight="semibold" color="primary">
              {notification.title}
            </Text>
          )}
          {notification.description && (
            <Text id={descriptionId} size="sm" color="secondary">
              {notification.description}
            </Text>
          )}
          <Text size="xs" color="muted">
            {formatRelativeTime(notification.timestamp)}
          </Text>
          {notification.action && (
            <Box mt="sm">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  notification.action?.onClick();
                }}
              >
                {notification.action.label}
              </Button>
            </Box>
          )}
        </Stack>

        {/* Close button */}
        {onDismiss && (
          <Button
            variant="ghost"
            iconOnly
            onClick={handleDismiss}
            aria-label="Dismiss notification"
          >
            <X className={ICON_TOKENS.sizes.md} />
          </Button>
        )}
      </ListItem>
    );
  },
);

NotificationCenterItem.displayName = "NotificationCenter.Item";
