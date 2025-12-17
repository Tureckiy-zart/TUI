/**
 * Table Component Types
 *
 * TypeScript interfaces and types for Table component.
 */

import type { ReactNode } from "react";

/**
 * Table column definition
 */
export interface TableColumn<T = Record<string, unknown>> {
  /**
   * Column key (must match a key in the data object)
   */
  key: keyof T;

  /**
   * Column header title
   */
  title: string;

  /**
   * Custom render function for cell content
   */
  render?: (value: T[keyof T], item: T, index: number) => ReactNode;

  /**
   * Column alignment
   * @default "left"
   */
  align?: "left" | "center" | "right";

  /**
   * Column width (CSS value or Tailwind class)
   */
  width?: string;

  /**
   * Whether column is sortable
   * @default false
   */
  sortable?: boolean;

  /**
   * Cell size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

/**
 * Sort direction
 */
export type SortDirection = "asc" | "desc" | null;

/**
 * Sort state
 */
export interface SortState {
  /**
   * Column key being sorted
   */
  column: string | null;

  /**
   * Sort direction
   */
  direction: SortDirection;
}

/**
 * Table context value
 */
export interface TableContextValue {
  /**
   * Current sort state
   */
  sortState: SortState;

  /**
   * Set sort state
   */
  setSortState: (state: SortState) => void;

  /**
   * Expanded rows (for expandable rows)
   */
  expandedRows: Set<string | number>;

  /**
   * Toggle row expansion
   */
  toggleRow: (rowKey: string | number) => void;

  /**
   * Whether table has expandable rows
   */
  expandable?: boolean;

  /**
   * Render function for expandable content
   */
  renderExpandableContent?: (item: unknown, index: number) => ReactNode;
}

/**
 * Table Root component props
 */
export interface TableRootProps<T = Record<string, unknown>>
  extends React.HTMLAttributes<HTMLTableElement> {
  /**
   * Table data array
   */
  data: T[];

  /**
   * Column definitions
   */
  columns: TableColumn<T>[];

  /**
   * Key to use for row identification
   */
  rowKey: keyof T | ((item: T, index: number) => string | number);

  /**
   * Whether table supports sorting
   * @default false
   */
  sortable?: boolean;

  /**
   * Whether table supports expandable rows
   * @default false
   */
  expandable?: boolean;

  /**
   * Render function for expandable content
   */
  renderExpandableContent?: (item: T, index: number) => ReactNode;

  /**
   * Whether table is in loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Empty state message (shown when data is empty)
   */
  emptyMessage?: string;

  /**
   * Whether header is sticky
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Row size
   * @default "md"
   */
  rowSize?: "sm" | "md" | "lg";
}

/**
 * Table Header component props
 */
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /**
   * Whether header is sticky
   * @default false
   */
  sticky?: boolean;
}

/**
 * Table Head component props
 */
export interface TableHeadProps extends React.HTMLAttributes<HTMLTableCellElement> {
  /**
   * Column alignment
   * @default "left"
   */
  align?: "left" | "center" | "right";

  /**
   * Whether column is sortable
   * @default false
   */
  sortable?: boolean;

  /**
   * Column key (for sorting)
   */
  columnKey?: string;

  /**
   * Cell size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

/**
 * Table Body component props
 */
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

/**
 * Table Row component props
 */
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Whether row is selected
   * @default false
   */
  selected?: boolean;

  /**
   * Whether row is expandable
   * @default false
   */
  expandable?: boolean;

  /**
   * Row key (for expansion tracking)
   */
  rowKey?: string | number;

  /**
   * Whether row is expanded
   * @default false
   */
  expanded?: boolean;
}

/**
 * Table Cell component props
 */
export interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  /**
   * Cell alignment
   * @default "left"
   */
  align?: "left" | "center" | "right";

  /**
   * Cell size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
}

/**
 * Table SortIcon component props
 */
export interface TableSortIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Sort direction
   */
  direction: SortDirection;
}

/**
 * Table Empty component props
 */
export interface TableEmptyProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Number of columns to span
   */
  colSpan: number;

  /**
   * Empty message
   */
  message?: string;
}

/**
 * Table LoadingState component props
 */
export interface TableLoadingStateProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * Number of columns to span
   */
  colSpan: number;

  /**
   * Number of skeleton rows to show
   * @default 5
   */
  rows?: number;
}

/**
 * Table ExpandableContent component props
 */
export interface TableExpandableContentProps extends React.HTMLAttributes<HTMLTableCellElement> {
  /**
   * Number of columns to span
   */
  colSpan: number;

  /**
   * Whether content is expanded
   */
  expanded: boolean;

  /**
   * Content to render
   */
  children: ReactNode;
}
