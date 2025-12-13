"use client";

/**
 * Table ExpandableContent Component
 *
 * Expandable content cell with CSS height transitions.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { TABLE_TOKENS } from "@/tokens/components/table";

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
          TABLE_TOKENS.expandable.container,
          TABLE_TOKENS.expandable.transition,
          expanded ? TABLE_TOKENS.expandable.expanded : TABLE_TOKENS.expandable.collapsed,
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            TABLE_TOKENS.expandable.padding,
            expanded
              ? TABLE_TOKENS.expandable.content.expanded
              : TABLE_TOKENS.expandable.content.collapsed,
          )}
        >
          {children}
        </div>
      </td>
    );
  },
);

TableExpandableContent.displayName = "TableExpandableContent";

export { TableExpandableContent };
