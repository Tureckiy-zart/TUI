"use client";

/**
 * Table Root Component
 *
 * Token-driven table component with sorting, expandable rows, loading, and empty states.
 * Uses TABLE_TOKENS for all styling.
 */

import * as React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { TABLE_TOKENS } from "@/FOUNDATION/tokens/components/table";

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
 * <Table expandable>
 *   <Table.Header>
 *     <Table.Row>
 *       <Table.Head sortable columnKey="name">Name</Table.Head>
 *       <Table.Head>Email</Table.Head>
 *     </Table.Row>
 *   </Table.Header>
 *   <Table.Body>
 *     {users.map((user) => (
 *       <Table.Row key={user.id} expandable expanded={expanded.has(user.id)}>
 *         <Table.Cell>{user.name}</Table.Cell>
 *         <Table.Cell>{user.email}</Table.Cell>
 *       </Table.Row>
 *     ))}
 *   </Table.Body>
 * </Table>
 * ```
 */
function TableRoot({ expandable = false, className, children, ...props }: TableRootProps) {
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
    }),
    [sortState, expandedRows, toggleRow, expandable],
  );

  return (
    <TableContext.Provider value={contextValue}>
      <div className={TABLE_TOKENS.layout.overflow}>
        <table
          className={cn(
            TABLE_TOKENS.layout.table,
            TABLE_TOKENS.radius.default,
            TABLE_TOKENS.shadow.subtle,
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
type TableRootWithSubcomponents = typeof TableRoot & {
  Header: typeof TableHeader;
  Head: typeof TableHead;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Cell: typeof TableCell;
  SortIcon: typeof TableSortIcon;
  Empty: typeof TableEmpty;
  LoadingState: typeof TableLoadingState;
  ExpandableContent: typeof TableExpandableContent;
};

const TableRootWithSubcomponents = TableRoot as TableRootWithSubcomponents;
TableRootWithSubcomponents.Header = TableHeader;
TableRootWithSubcomponents.Head = TableHead;
TableRootWithSubcomponents.Body = TableBody;
TableRootWithSubcomponents.Row = TableRow;
TableRootWithSubcomponents.Cell = TableCell;
TableRootWithSubcomponents.SortIcon = TableSortIcon;
TableRootWithSubcomponents.Empty = TableEmpty;
TableRootWithSubcomponents.LoadingState = TableLoadingState;
TableRootWithSubcomponents.ExpandableContent = TableExpandableContent;

export { TableRoot };
