"use client";

/**
 * Table Head Component
 *
 * Header cell component with sorting support.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { DATA_TOKENS } from "@/tokens/components/data";

import { useTableContext } from "./Table";
import type { TableHeadProps } from "./Table.types";
import { TableSortIcon } from "./TableSortIcon";

export type { TableHeadProps };

/**
 * Table Head component
 */
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    { align = "left", sortable = false, columnKey, size = "md", className, children, ...props },
    ref,
  ) => {
    const { sortState, setSortState } = useTableContext();

    const handleSort = React.useCallback(() => {
      if (!sortable || !columnKey) return;

      const currentDirection = sortState.column === columnKey ? sortState.direction : null;
      let nextDirection: "asc" | "desc" | null = null;

      if (currentDirection === null) {
        nextDirection = "asc";
      } else if (currentDirection === "asc") {
        nextDirection = "desc";
      } else {
        nextDirection = null;
      }

      setSortState({
        column: nextDirection ? columnKey : null,
        direction: nextDirection,
      });
    }, [sortable, columnKey, sortState, setSortState]);

    const paddingClass = DATA_TOKENS.table.padding.header[size];
    const typographyClass = DATA_TOKENS.table.typography.header.fontSize;
    const fontWeightClass = DATA_TOKENS.table.typography.header.fontWeight;

    const alignmentClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    const isSorted = sortState.column === columnKey;
    const sortDirection = isSorted ? sortState.direction : null;

    return (
      <th
        ref={ref}
        className={cn(
          paddingClass,
          typographyClass,
          fontWeightClass,
          alignmentClasses[align],
          DATA_TOKENS.table.colors.border,
          "border-b",
          sortable && "cursor-pointer select-none hover:bg-muted/50",
          className,
        )}
        onClick={handleSort}
        aria-sort={(() => {
          if (sortDirection === "asc") return "ascending";
          if (sortDirection === "desc") return "descending";
          if (sortable) return "none";
          return undefined;
        })()}
        role="columnheader"
        {...props}
      >
        <div className="flex items-center gap-2">
          {children}
          {sortable && <TableSortIcon direction={sortDirection} />}
        </div>
      </th>
    );
  },
);

TableHead.displayName = "TableHead";

export { TableHead };
