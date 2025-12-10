"use client";

/**
 * EmptyState Title Component
 *
 * Title subcomponent for EmptyState.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { DATA_TOKENS } from "@/tokens/components/data";

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
          DATA_TOKENS.emptyState.typography.title.fontSize,
          DATA_TOKENS.emptyState.typography.title.fontWeight,
          "text-foreground",
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
