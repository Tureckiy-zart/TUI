"use client";

/**
 * Table Row Component
 *
 * Table row component with hover and selected states.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { TABLE_TOKENS } from "@/tokens/components/table";

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
          TABLE_TOKENS.colors.border,
          TABLE_TOKENS.border.bottom,
          TABLE_TOKENS.colors.rowHover,
          selected && TABLE_TOKENS.colors.rowSelected,
          expandable && TABLE_TOKENS.expandable.cursor,
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
