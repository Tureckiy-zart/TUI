"use client";

/**
 * EmptyState Icon Component
 *
 * Icon subcomponent for EmptyState.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { DATA_TOKENS } from "@/tokens/components/data";

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
    const iconSizeClass = DATA_TOKENS.emptyState.iconSize[size];

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center text-muted-foreground",
          iconSizeClass,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

EmptyStateIcon.displayName = "EmptyStateIcon";

export { EmptyStateIcon };
