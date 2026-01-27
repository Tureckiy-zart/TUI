"use client";

/**
 * EmptyState Icon Component
 *
 * Icon subcomponent for EmptyState.
 */

import * as React from "react";

import { cn, EMPTY_STATE_TOKENS, type EmptyStateIconSize } from "@/index";

export interface EmptyStateIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon content (any ReactNode)
   */
  children: React.ReactNode;

  /**
   * Icon size
   * @default "md"
   */
  size?: EmptyStateIconSize;
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
