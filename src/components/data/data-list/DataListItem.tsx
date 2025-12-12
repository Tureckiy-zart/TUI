"use client";

/**
 * DataList Item Component
 *
 * Individual item in DataList (contains Label and Value).
 */

import * as React from "react";

import { getBaseValue } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";
import { DATA_TOKENS } from "@/tokens/components/data";

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
    const paddingClass = DATA_TOKENS.dataList.rowPadding[paddingKey];

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
