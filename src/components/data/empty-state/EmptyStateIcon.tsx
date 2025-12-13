"use client";

/**
 * EmptyState Icon Component
 *
 * Icon subcomponent for EmptyState.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { EMPTY_STATE_TOKENS } from "@/tokens/components/empty-state";

export interface EmptyStateIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon content (any ReactNode)
   */
  children: React.ReactNode;

  /**
   * Icon size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

/**
 * EmptyState Icon component
 */
const EmptyStateIcon = React.forwardRef<HTMLDivElement, EmptyStateIconProps>(
  ({ children, size = "md", className, ...props }, ref) => {
    const iconSizeClass = EMPTY_STATE_TOKENS.icon.size[size];

    return (
      <div
        ref={ref}
        className={cn(EMPTY_STATE_TOKENS.icon.container, iconSizeClass, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

EmptyStateIcon.displayName = "EmptyStateIcon";

export { EmptyStateIcon };
