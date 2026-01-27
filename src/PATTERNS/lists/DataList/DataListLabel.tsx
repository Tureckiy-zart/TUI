"use client";

/**
 * DataList Label Component
 *
 * Label subcomponent for DataList items.
 */

import * as React from "react";

import { cn, DATA_LIST_TOKENS } from "@/index";

import { useDataListContext } from "./DataList";

export interface DataListLabelProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Label text
   */
  children: React.ReactNode;
}

/**
 * DataList Label component
 * Mobile: full width
 * Desktop: fixed width (from tokens, controlled by Root labelWidth prop)
 */
const DataListLabel = React.forwardRef<HTMLElement, DataListLabelProps>(
  ({ className, children, ...props }, ref) => {
    const { labelWidth } = useDataListContext();
    const labelWidthClass = DATA_LIST_TOKENS.labelWidth[labelWidth];

    return (
      <dt
        ref={ref}
        className={cn(
          DATA_LIST_TOKENS.label.mobile,
          DATA_LIST_TOKENS.label.desktop,
          labelWidthClass,
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
