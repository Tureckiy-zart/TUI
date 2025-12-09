"use client";

/**
 * Table LoadingState Component
 *
 * Loading state row for table (uses Skeleton component).
 */

import * as React from "react";

import { cn } from "@/lib/utils";

import { Skeleton } from "../skeleton";
import type { TableLoadingStateProps } from "./Table.types";

export type { TableLoadingStateProps };

/**
 * Table LoadingState component
 */
const TableLoadingState = React.forwardRef<HTMLTableRowElement, TableLoadingStateProps>(
  ({ colSpan, rows = 5, className, ...props }, ref) => {
    return (
      <>
        {Array.from({ length: rows }).map((_, index) => (
          <tr key={index} ref={index === 0 ? ref : undefined} className={cn(className)} {...props}>
            {Array.from({ length: colSpan }).map((_, cellIndex) => (
              <td key={cellIndex} className="p-sm">
                <Skeleton variant="text" className="w-full" />
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  },
);

TableLoadingState.displayName = "TableLoadingState";

export { TableLoadingState };
