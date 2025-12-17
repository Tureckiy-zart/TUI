/**
 * Tables Pattern Components
 *
 * Reusable table components for displaying tabular data.
 */

// Complex Table component (from existing table/ folder)
export type {
  SortDirection,
  SortState,
  TableBodyProps,
  TableCellProps,
  TableColumn as TableColumnComplex,
  TableContextValue,
  TableEmptyProps,
  TableExpandableContentProps,
  TableHeaderProps,
  TableHeadProps,
  TableLoadingStateProps,
  TableRootProps,
  TableRowProps,
  TableSortIconProps,
} from "./table";
export {
  TableBody,
  TableCell,
  TableEmpty,
  TableExpandableContent,
  TableHead,
  TableHeader,
  TableLoadingState,
  TableRoot,
  TableRow,
  TableSortIcon,
  useTableContext,
} from "./table";
// Re-export TableRoot as Table for compound component usage
export { TableRoot as Table } from "./table";

// Simple Table component
export type { TableColumn, TableProps } from "./SimpleTable";
export { Table as SimpleTable } from "./SimpleTable";
