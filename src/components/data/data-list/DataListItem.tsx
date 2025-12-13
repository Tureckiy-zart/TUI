"use client";

/**
 * DataList Item Component
 *
 * Individual item in DataList (contains Label and Value).
 */

import * as React from "react";

import { getBaseValue } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";
import { DATA_LIST_TOKENS } from "@/tokens/components/data-list";

import type { SpacingValue } from "../../layout/layout.types";
import type { DataListItemProps as DataListItemPropsType } from "./DataList.types";

export interface DataListItemProps extends DataListItemPropsType {}

/**
 * DataList Item component
 * Mobile: vertical layout (label above value)
 * Desktop: horizontal layout (label left, value right)
 */
const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(
  ({ padding = "md", className, children, ...props }, ref) => {
    // Get base value from responsive spacing
    const paddingValue = getBaseValue<SpacingValue>(padding);
    // Map to allowed keys (sm, md, lg) - default to md if not in allowed set
    const paddingKey =
      paddingValue && ["sm", "md", "lg"].includes(String(paddingValue))
        ? (String(paddingValue) as "sm" | "md" | "lg")
        : "md";
    const paddingClass = DATA_LIST_TOKENS.rowPadding[paddingKey];

    return (
      <div
        ref={ref}
        className={cn(
          paddingClass,
          DATA_LIST_TOKENS.item.layout.mobile,
          DATA_LIST_TOKENS.item.layout.desktop,
          DATA_LIST_TOKENS.item.border,
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
