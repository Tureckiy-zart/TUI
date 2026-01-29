"use client";

/**
 * EmptyState Component
 *
 * Token-driven empty state component for displaying empty or no-data states.
 * Uses EMPTY_STATE_TOKENS for all spacing and sizing.
 * Integrates with Surface and Stack components.
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { EMPTY_STATE_TOKENS } from "@/FOUNDATION/tokens/components/empty-state";
import { Stack, Surface } from "@/index";

import { EmptyStateAction } from "./EmptyStateAction";
import { EmptyStateDescription } from "./EmptyStateDescription";
import { EmptyStateIcon } from "./EmptyStateIcon";
import { EmptyStateTitle } from "./EmptyStateTitle";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique ID for accessibility (auto-generated if not provided)
   */
  id?: string;
}

/**
 * EmptyState root component
 *
 * @example
 * ```tsx
 * <EmptyState>
 *   <EmptyState.Icon>📭</EmptyState.Icon>
 *   <EmptyState.Title>No items found</EmptyState.Title>
 *   <EmptyState.Description>Try adjusting your filters</EmptyState.Description>
 *   <EmptyState.Action>
 *     <Button>Create Item</Button>
 *   </EmptyState.Action>
 * </EmptyState>
 * ```
 */
const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ id, className, children, ...props }, ref) => {
    const generatedId = React.useId();
    const emptyStateId = id || `empty-state-${generatedId}`;

    return (
      <Surface
        ref={ref}
        variant="subtle"
        radius="xl"
        p="lg"
        className={cn(EMPTY_STATE_TOKENS.alignment.center, className)}
        id={emptyStateId}
        {...props}
      >
        <Stack spacing="md" align="center" justify="center">
          {children}
        </Stack>
      </Surface>
    );
  },
);

EmptyState.displayName = "EmptyState";

// Attach subcomponents to EmptyState
type EmptyStateWithSubcomponents = typeof EmptyState & {
  Icon: typeof EmptyStateIcon;
  Title: typeof EmptyStateTitle;
  Description: typeof EmptyStateDescription;
  Action: typeof EmptyStateAction;
};

(EmptyState as EmptyStateWithSubcomponents).Icon = EmptyStateIcon;
(EmptyState as EmptyStateWithSubcomponents).Title = EmptyStateTitle;
(EmptyState as EmptyStateWithSubcomponents).Description = EmptyStateDescription;
(EmptyState as EmptyStateWithSubcomponents).Action = EmptyStateAction;

export { EmptyState };
