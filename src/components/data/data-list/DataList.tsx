"use client";

/**
 * DataList Root Component
 *
 * Mobile-first data list component for displaying key-value pairs.
 * Uses Stack for vertical layout and DATA_TOKENS for spacing.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { DATA_TOKENS } from "@/tokens/components/data";

import { DataListItem } from "./DataListItem";
import { DataListLabel } from "./DataListLabel";
import { DataListValue } from "./DataListValue";

export interface DataListRootProps extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * Label width for desktop layout
   * @default "md"
   */
  labelWidth?: "sm" | "md" | "lg";
}

/**
 * DataList Root component
 *
 * @example
 * ```tsx
 * <DataList.Root>
 *   <DataList.Item>
 *     <DataList.Label>Name</DataList.Label>
 *     <DataList.Value>John Doe</DataList.Value>
 *   </DataList.Item>
 * </DataList.Root>
 * ```
 */
const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  ({ labelWidth: _labelWidth = "md", className, children, ...props }, ref) => {
    return (
      <dl ref={ref} className={cn(DATA_TOKENS.dataList.spacing.gap, className)} {...props}>
        {children}
      </dl>
    );
  },
);

DataListRoot.displayName = "DataListRoot";

// Attach subcomponents to DataListRoot
(
  DataListRoot as typeof DataListRoot & {
    Item: typeof DataListItem;
    Label: typeof DataListLabel;
    Value: typeof DataListValue;
  }
).Item = DataListItem;

(
  DataListRoot as typeof DataListRoot & {
    Item: typeof DataListItem;
    Label: typeof DataListLabel;
    Value: typeof DataListValue;
  }
).Label = DataListLabel;

(
  DataListRoot as typeof DataListRoot & {
    Item: typeof DataListItem;
    Label: typeof DataListLabel;
    Value: typeof DataListValue;
  }
).Value = DataListValue;

export { DataListRoot };
