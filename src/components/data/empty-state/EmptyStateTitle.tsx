"use client";

/**
 * EmptyState Title Component
 *
 * Title subcomponent for EmptyState.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { EMPTY_STATE_TOKENS } from "@/tokens/components/empty-state";

export interface EmptyStateTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Title text
   */
  children: React.ReactNode;
}

/**
 * EmptyState Title component
 */
const EmptyStateTitle = React.forwardRef<HTMLHeadingElement, EmptyStateTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          EMPTY_STATE_TOKENS.typography.title.fontSize,
          EMPTY_STATE_TOKENS.typography.title.fontWeight,
          EMPTY_STATE_TOKENS.typography.title.color,
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
);

EmptyStateTitle.displayName = "EmptyStateTitle";

export { EmptyStateTitle };
