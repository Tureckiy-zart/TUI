"use client";

/**
 * Table Empty Component
 *
 * Empty state row for table (uses EmptyState component).
 */

import * as React from "react";

import { cn } from "@/lib/utils";

import { EmptyState, EmptyStateIcon, EmptyStateTitle } from "../empty-state";
import type { TableEmptyProps } from "./Table.types";

export type { TableEmptyProps };

/**
 * Table Empty component
 */
const TableEmpty = React.forwardRef<HTMLTableRowElement, TableEmptyProps>(
  ({ colSpan, message = "No data available", className, ...props }, ref) => {
    return (
      <tr ref={ref} className={cn(className)} {...props}>
        <td colSpan={colSpan} className="p-8">
          <EmptyState>
            <EmptyStateIcon>📭</EmptyStateIcon>
            <EmptyStateTitle>{message}</EmptyStateTitle>
          </EmptyState>
        </td>
      </tr>
    );
  },
);

TableEmpty.displayName = "TableEmpty";

export { TableEmpty };
