"use client";

/**
 * NotificationCenter.GroupHeader Component
 *
 * Header component for grouped notification sections.
 * Displays group label (e.g., "Today", "Yesterday", "Success").
 * Optional collapse/expand functionality.
 */

import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { ICON_TOKENS } from "@/FOUNDATION/tokens/components/icon";
import { NOTIFICATION_TOKENS } from "@/FOUNDATION/tokens/components/notifications";
import { Button, Heading, Row } from "@/index";

export interface NotificationCenterGroupHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Group label text
   */
  label: string;

  /**
   * Whether the group is collapsed
   */
  collapsed?: boolean;

  /**
   * Callback when collapse/expand is toggled
   */
  onToggleCollapse?: () => void;

  /**
   * Show collapse/expand button
   */
  collapsible?: boolean;
}

/**
 * NotificationCenter.GroupHeader component - group section header
 */
export const NotificationCenterGroupHeader = React.forwardRef<
  HTMLDivElement,
  NotificationCenterGroupHeaderProps
>(
  (
    { label, collapsed = false, onToggleCollapse, collapsible = false, className, ...props },
    ref,
  ) => {
    return (
      <Row
        ref={ref}
        align="center"
        justify="between"
        className={cn(NOTIFICATION_TOKENS.spacing.paddingVertical, className)}
        {...props}
      >
        <Heading level={3} weight="semibold">
          {label}
        </Heading>
        {collapsible && onToggleCollapse && (
          <Button
            variant="ghost"
            iconOnly
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand group" : "Collapse group"}
            aria-expanded={!collapsed}
          >
            {collapsed ? (
              <ChevronDown className={ICON_TOKENS.sizes.md} />
            ) : (
              <ChevronUp className={ICON_TOKENS.sizes.md} />
            )}
          </Button>
        )}
      </Row>
    );
  },
);

NotificationCenterGroupHeader.displayName = "NotificationCenter.GroupHeader";
