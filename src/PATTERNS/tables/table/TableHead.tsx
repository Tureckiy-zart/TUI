"use client";

/**
 * Table Head Component
 *
 * Header cell component with sorting support.
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { TABLE_TOKENS } from "@/FOUNDATION/tokens/components/table";

import { useTableContext } from "./Table";
import { ALIGNMENT_CLASSES } from "./Table.constants";
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

    const paddingClass = TABLE_TOKENS.padding.header[size];
    const typographyClass = TABLE_TOKENS.typography.header.fontSize;
    const fontWeightClass = TABLE_TOKENS.typography.header.fontWeight;

    const isSorted = sortState.column === columnKey;
    const sortDirection = isSorted ? sortState.direction : null;

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLTableCellElement>) => {
        if (!sortable || !columnKey) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleSort();
        }
      },
      [sortable, columnKey, handleSort],
    );

    return (
      <th
        ref={ref}
        className={cn(
          paddingClass,
          typographyClass,
          fontWeightClass,
          ALIGNMENT_CLASSES[align],
          TABLE_TOKENS.colors.border,
          TABLE_TOKENS.border.bottom,
          sortable && TABLE_TOKENS.sortable.cursor,
          sortable && TABLE_TOKENS.sortable.hover,
          className,
        )}
        onClick={handleSort}
        onKeyDown={handleKeyDown}
        aria-sort={(() => {
          if (sortDirection === "asc") return "ascending";
          if (sortDirection === "desc") return "descending";
          if (sortable) return "none";
          return undefined;
        })()}
        tabIndex={sortable ? 0 : undefined}
        role="columnheader"
        {...props}
      >
        <div className={cn(TABLE_TOKENS.sortable.container, TABLE_TOKENS.sortable.gap)}>
          {children}
          {sortable && <TableSortIcon direction={sortDirection} />}
        </div>
      </th>
    );
  },
);

TableHead.displayName = "TableHead";

export { TableHead };
