"use client";

/**
 * DataList Label Component
 *
 * Label subcomponent for DataList items.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

export interface DataListLabelProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Label text
   */
  children: React.ReactNode;
}

/**
 * DataList Label component
 * Mobile: full width
 * Desktop: fixed width (from tokens)
 */
const DataListLabel = React.forwardRef<HTMLElement, DataListLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <dt
        ref={ref}
        className={cn(
          "mb-1 font-semibold text-foreground md:mb-0",
          "md:w-32", // Default md width from tokens
          className,
        )}
        {...props}
      >
        {children}
      </dt>
    );
  },
);

DataListLabel.displayName = "DataListLabel";

export { DataListLabel };
