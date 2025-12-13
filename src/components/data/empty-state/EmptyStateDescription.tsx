"use client";

/**
 * EmptyState Description Component
 *
 * Description subcomponent for EmptyState.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { EMPTY_STATE_TOKENS } from "@/tokens/components/empty-state";

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
          EMPTY_STATE_TOKENS.typography.description.fontSize,
          EMPTY_STATE_TOKENS.typography.description.fontWeight,
          EMPTY_STATE_TOKENS.typography.description.color,
          EMPTY_STATE_TOKENS.typography.description.maxWidth,
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
