"use client";

/**
 * Table Root Component
 *
 * Token-driven table component with sorting, expandable rows, loading, and empty states.
 * Uses DATA_TOKENS for all styling.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { DATA_TOKENS } from "@/tokens/components/data";

import type { SortState, TableContextValue, TableRootProps } from "./Table.types";
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableEmpty } from "./TableEmpty";
import { TableExpandableContent } from "./TableExpandableContent";
import { TableHead } from "./TableHead";
import { TableHeader } from "./TableHeader";
import { TableLoadingState } from "./TableLoadingState";
import { TableRow } from "./TableRow";
import { TableSortIcon } from "./TableSortIcon";

const TableContext = React.createContext<TableContextValue | null>(null);

export function useTableContext(): TableContextValue {
  const context = React.useContext(TableContext);
  if (!context) {
    throw new Error("Table components must be used within Table.Root");
  }
  return context;
}

/**
 * Table Root component
 *
 * @example
 * ```tsx
 * <Table.Root
 *   data={users}
 *   columns={columns}
 *   rowKey="id"
 *   sortable
 * >
 *   <Table.Header>
 *     <Table.Row>
 *       <Table.Head>Name</Table.Head>
 *     </Table.Row>
 *   </Table.Header>
 *   <Table.Body>
 *     {users.map((user) => (
 *       <Table.Row key={user.id}>
 *         <Table.Cell>{user.name}</Table.Cell>
 *       </Table.Row>
 *     ))}
 *   </Table.Body>
 * </Table.Root>
 * ```
 */
function TableRoot<T extends Record<string, unknown>>({
  data: _data,
  columns: _columns,
  rowKey: _rowKey,
  sortable: _sortable = false,
  expandable = false,
  renderExpandableContent,
  loading: _loading = false,
  emptyMessage: _emptyMessage = "No data available",
  stickyHeader: _stickyHeader = false,
  rowSize: _rowSize = "md",
  className,
  children,
  ...props
}: TableRootProps<T>) {
  const [sortState, setSortState] = React.useState<SortState>({
    column: null,
    direction: null,
  });

  const [expandedRows, setExpandedRows] = React.useState<Set<string | number>>(new Set());

  const toggleRow = React.useCallback((key: string | number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const contextValue: TableContextValue = React.useMemo(
    () => ({
      sortState,
      setSortState,
      expandedRows,
      toggleRow,
      expandable,
      renderExpandableContent: renderExpandableContent as (
        item: unknown,
        index: number,
      ) => React.ReactNode,
    }),
    [sortState, expandedRows, toggleRow, expandable, renderExpandableContent],
  );

  return (
    <TableContext.Provider value={contextValue}>
      <div className="overflow-x-auto">
        <table
          className={cn(
            "w-full border-collapse",
            DATA_TOKENS.table.radius.default,
            DATA_TOKENS.table.shadow.subtle,
            className,
          )}
          role="table"
          {...props}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

TableRoot.displayName = "TableRoot";

// Attach subcomponents to TableRoot
(
  TableRoot as typeof TableRoot & {
    Header: typeof TableHeader;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    SortIcon: typeof TableSortIcon;
    Empty: typeof TableEmpty;
    LoadingState: typeof TableLoadingState;
    ExpandableContent: typeof TableExpandableContent;
  }
).Header = TableHeader;

(
  TableRoot as typeof TableRoot & {
    Header: typeof TableHeader;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    SortIcon: typeof TableSortIcon;
    Empty: typeof TableEmpty;
    LoadingState: typeof TableLoadingState;
    ExpandableContent: typeof TableExpandableContent;
  }
).Head = TableHead;

(
  TableRoot as typeof TableRoot & {
    Header: typeof TableHeader;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    SortIcon: typeof TableSortIcon;
    Empty: typeof TableEmpty;
    LoadingState: typeof TableLoadingState;
    ExpandableContent: typeof TableExpandableContent;
  }
).Body = TableBody;

(
  TableRoot as typeof TableRoot & {
    Header: typeof TableHeader;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    SortIcon: typeof TableSortIcon;
    Empty: typeof TableEmpty;
    LoadingState: typeof TableLoadingState;
    ExpandableContent: typeof TableExpandableContent;
  }
).Row = TableRow;

(
  TableRoot as typeof TableRoot & {
    Header: typeof TableHeader;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    SortIcon: typeof TableSortIcon;
    Empty: typeof TableEmpty;
    LoadingState: typeof TableLoadingState;
    ExpandableContent: typeof TableExpandableContent;
  }
).Cell = TableCell;

(
  TableRoot as typeof TableRoot & {
    Header: typeof TableHeader;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    SortIcon: typeof TableSortIcon;
    Empty: typeof TableEmpty;
    LoadingState: typeof TableLoadingState;
    ExpandableContent: typeof TableExpandableContent;
  }
).SortIcon = TableSortIcon;

(
  TableRoot as typeof TableRoot & {
    Header: typeof TableHeader;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    SortIcon: typeof TableSortIcon;
    Empty: typeof TableEmpty;
    LoadingState: typeof TableLoadingState;
    ExpandableContent: typeof TableExpandableContent;
  }
).Empty = TableEmpty;

(
  TableRoot as typeof TableRoot & {
    Header: typeof TableHeader;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    SortIcon: typeof TableSortIcon;
    Empty: typeof TableEmpty;
    LoadingState: typeof TableLoadingState;
    ExpandableContent: typeof TableExpandableContent;
  }
).LoadingState = TableLoadingState;

(
  TableRoot as typeof TableRoot & {
    Header: typeof TableHeader;
    Head: typeof TableHead;
    Body: typeof TableBody;
    Row: typeof TableRow;
    Cell: typeof TableCell;
    SortIcon: typeof TableSortIcon;
    Empty: typeof TableEmpty;
    LoadingState: typeof TableLoadingState;
    ExpandableContent: typeof TableExpandableContent;
  }
).ExpandableContent = TableExpandableContent;

export { TableRoot };
