"use client";

/**
 * DataList Label Component
 *
 * Label subcomponent for DataList items.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { DATA_LIST_TOKENS } from "@/tokens/components/data-list";

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
          DATA_LIST_TOKENS.label.mobile,
          DATA_LIST_TOKENS.label.desktop,
          DATA_LIST_TOKENS.labelWidth.md,
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
