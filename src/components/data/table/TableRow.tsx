"use client";

/**
 * Table Row Component
 *
 * Table row component with hover and selected states.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { DATA_TOKENS } from "@/tokens/components/data";

import type { TableRowProps } from "./Table.types";

export type { TableRowProps };

/**
 * Table Row component
 */
const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      selected = false,
      expandable = false,
      rowKey: _rowKey,
      expanded = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <tr
        ref={ref}
        className={cn(
          DATA_TOKENS.table.colors.border,
          "border-b",
          DATA_TOKENS.table.colors.rowHover,
          selected && DATA_TOKENS.table.colors.rowSelected,
          expandable && "cursor-pointer",
          className,
        )}
        aria-expanded={expandable ? expanded : undefined}
        role="row"
        {...props}
      />
    );
  },
);

TableRow.displayName = "TableRow";

export { TableRow };
