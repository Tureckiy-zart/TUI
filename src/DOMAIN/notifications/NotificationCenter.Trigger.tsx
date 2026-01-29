"use client";

/**
 * NotificationCenter.Trigger Component
 *
 * Button component to open NotificationCenter.Panel.
 * Optional badge showing unread count.
 */

import { Bell } from "lucide-react";
import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { Box, Button, Text } from "@/index";

import { useNotificationCenterContext } from "./NotificationCenter.Provider";

export interface NotificationCenterTriggerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> {
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
>(({ onClick, showBadge = true, ...props }, ref) => {
  const { getUnreadCount } = useNotificationCenterContext();
  const unreadCount = getUnreadCount();

  // Filter out component-specific props before forwarding to Button
  // This ensures only valid ButtonProps are passed, preventing prop smuggling
  const buttonProps: Omit<NotificationCenterTriggerProps, "showBadge"> = props;

  return (
    <Button
      ref={ref}
      variant="ghost"
      iconOnly
      onClick={onClick}
      aria-label={`Open notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
      {...buttonProps}
    >
      <Box as="span" className="relative">
        <Bell className={ICON_TOKENS.sizes.lg} />
        {showBadge && unreadCount > 0 && (
          <Box
            as="span"
            className={cn("absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center")}
            bg="destructive"
            radius="full"
            aria-hidden="true"
          >
            <Text size="xs" weight="semibold" color="inverse">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Text>
          </Box>
        )}
      </Box>
    </Button>
  );
});

NotificationCenterTrigger.displayName = "NotificationCenter.Trigger";
