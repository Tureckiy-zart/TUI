"use client";

/**
 * EmptyState Action Component
 *
 * Action subcomponent for EmptyState (typically contains Button).
 */

import * as React from "react";

import { cn } from "@/lib/utils";

export interface EmptyStateActionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Action button or link (typically Button component)
   */
  children: React.ReactNode;
}

/**
 * EmptyState Action component
 */
const EmptyStateAction = React.forwardRef<HTMLDivElement, EmptyStateActionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mt-2", className)} {...props}>
        {children}
      </div>
    );
  },
);

EmptyStateAction.displayName = "EmptyStateAction";

export { EmptyStateAction };
