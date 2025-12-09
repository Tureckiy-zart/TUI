"use client";

/**
 * EmptyState Description Component
 *
 * Description subcomponent for EmptyState.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { DATA_TOKENS } from "@/tokens/components/data";

export interface EmptyStateDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Description text
   */
  children: React.ReactNode;
}

/**
 * EmptyState Description component
 */
const EmptyStateDescription = React.forwardRef<HTMLParagraphElement, EmptyStateDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          DATA_TOKENS.emptyState.typography.description.fontSize,
          DATA_TOKENS.emptyState.typography.description.fontWeight,
          "max-w-md text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
);

EmptyStateDescription.displayName = "EmptyStateDescription";

export { EmptyStateDescription };
