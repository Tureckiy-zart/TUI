/**
 * Table Component
 *
 * Token-driven table component with sorting, expandable rows, loading, and empty states.
 */

export { TableRoot, useTableContext } from "./Table";
export type {
  SortDirection,
  SortState,
  TableColumn,
  TableContextValue,
  TableRootProps,
} from "./Table.types";
export { TableBody, type TableBodyProps } from "./TableBody";
export { TableCell, type TableCellProps } from "./TableCell";
export { TableEmpty, type TableEmptyProps } from "./TableEmpty";
export { TableExpandableContent, type TableExpandableContentProps } from "./TableExpandableContent";
export { TableHead, type TableHeadProps } from "./TableHead";
export { TableHeader, type TableHeaderProps } from "./TableHeader";
export { TableLoadingState, type TableLoadingStateProps } from "./TableLoadingState";
export { TableRow, type TableRowProps } from "./TableRow";
export { TableSortIcon, type TableSortIconProps } from "./TableSortIcon";

// Re-export as Table for compound component usage
export { TableRoot as Table } from "./Table";
