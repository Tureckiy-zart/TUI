"use client";

/**
 * Table ExpandableContent Component
 *
 * Expandable content cell with CSS height transitions.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

import type { TableExpandableContentProps } from "./Table.types";

export type { TableExpandableContentProps };

/**
 * Table ExpandableContent component
 * Uses CSS height transitions (no framer-motion)
 */
const TableExpandableContent = React.forwardRef<HTMLTableCellElement, TableExpandableContentProps>(
  ({ colSpan, expanded, children, className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        colSpan={colSpan}
        className={cn(
          "p-0",
          "overflow-hidden transition-all duration-normal ease-in-out",
          expanded ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0",
          className,
        )}
        {...props}
      >
        <div className={cn("p-md", expanded ? "block" : "hidden")}>{children}</div>
      </td>
    );
  },
);

TableExpandableContent.displayName = "TableExpandableContent";

export { TableExpandableContent };
