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

import { cn } from "@/lib/utils";
import { NOTIFICATION_TOKENS } from "@/tokens/components/notifications";

import { Button } from "../ui/button";

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
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between",
          NOTIFICATION_TOKENS.spacing.paddingVertical,
          className,
        )}
        {...props}
      >
        <h3 className="text-sm font-semibold text-foreground">{label}</h3>
        {collapsible && onToggleCollapse && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand group" : "Collapse group"}
            aria-expanded={!collapsed}
            className="h-6 w-6"
          >
            {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        )}
      </div>
    );
  },
);

NotificationCenterGroupHeader.displayName = "NotificationCenter.GroupHeader";
