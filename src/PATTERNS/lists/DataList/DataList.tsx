"use client";

/**
 * DataList Root Component
 *
 * Mobile-first data list component for displaying key-value pairs.
 * Uses Stack for vertical layout and DATA_LIST_TOKENS for spacing.
 */

import * as React from "react";

import { cn, DATA_LIST_TOKENS } from "@/index";

import type { DataListRootProps } from "./DataList.types";
import { DataListItem } from "./DataListItem";
import { DataListLabel } from "./DataListLabel";
import { DataListValue } from "./DataListValue";

type DataListContextValue = {
  labelWidth: "sm" | "md" | "lg";
};

const DataListContext = React.createContext<DataListContextValue | null>(null);

function useDataListContext(): DataListContextValue {
  const context = React.useContext(DataListContext);
  if (!context) {
    // Default to "md" if used outside DataListRoot
    return { labelWidth: "md" };
  }
  return context;
}

/**
 * DataList Root component
 *
 * @example
 * ```tsx
 * <DataList.Root labelWidth="lg">
 *   <DataList.Item>
 *     <DataList.Label>Name</DataList.Label>
 *     <DataList.Value>John Doe</DataList.Value>
 *   </DataList.Item>
 * </DataList.Root>
 * ```
 */
const DataListRoot = React.forwardRef<HTMLDListElement, DataListRootProps>(
  ({ labelWidth = "md", className, children, ...props }, ref) => {
    const contextValue = React.useMemo(() => ({ labelWidth }), [labelWidth]);

    return (
      <DataListContext.Provider value={contextValue}>
        <dl ref={ref} className={cn(DATA_LIST_TOKENS.spacing.gap, className)} {...props}>
          {children}
        </dl>
      </DataListContext.Provider>
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

export { DataListRoot, useDataListContext };
export type { DataListRootProps } from "./DataList.types";
