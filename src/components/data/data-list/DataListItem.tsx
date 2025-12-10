"use client";

/**
 * DataList Item Component
 *
 * Individual item in DataList (contains Label and Value).
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { DATA_TOKENS } from "@/tokens/components/data";

export interface DataListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Row padding
   * @default "md"
   */
  padding?: "sm" | "md" | "lg";
}

/**
 * DataList Item component
 * Mobile: vertical layout (label above value)
 * Desktop: horizontal layout (label left, value right)
 */
const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(
  ({ padding = "md", className, children, ...props }, ref) => {
    const paddingClass = DATA_TOKENS.dataList.rowPadding[padding];

    return (
      <div
        ref={ref}
        className={cn(
          paddingClass,
          "flex flex-col border-b border-border last:border-0 md:flex-row md:items-center",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DataListItem.displayName = "DataListItem";

export { DataListItem };
