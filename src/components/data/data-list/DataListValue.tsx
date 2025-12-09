"use client";

/**
 * DataList Value Component
 *
 * Value subcomponent for DataList items.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

export interface DataListValueProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Value content
   */
  children: React.ReactNode;
}

/**
 * DataList Value component
 * Flex-grow to fill remaining space on desktop
 */
const DataListValue = React.forwardRef<HTMLElement, DataListValueProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <dd ref={ref} className={cn("flex-1 text-muted-foreground", className)} {...props}>
        {children}
      </dd>
    );
  },
);

DataListValue.displayName = "DataListValue";

export { DataListValue };
