"use client";

/**
 * SimpleTable Component
 *
 * Simple tabular data display component with column configuration.
 * Renders a semantic HTML table based on data and column definitions.
 *
 * @example
 * ```tsx
 * <SimpleTable
 *   data={users}
 *   columns={[
 *     { key: "name", title: "Name" },
 *     { key: "email", title: "Email" },
 *   ]}
 *   rowKey="id"
 * />
 * ```
 */

import React from "react";

import { cn, SIMPLETABLE_TOKENS, tokenCVA } from "@/index";

// ============================================================================
// TYPES
// ============================================================================

/**
 * SimpleTable size type
 * Represents the size of table cells and typography
 */
export type SimpleTableSize = "sm" | "md" | "lg";

/**
 * Table column configuration
 *
 * @template T - The type of data items in the table
 */
export interface TableColumn<T> {
  /**
   * Key of the data item property to display in this column
   */
  key: keyof T;
  /**
   * Column header title
   */
  title: string;
  /**
   * Optional custom render function for cell content
   * @param value - The value of the cell
   * @param item - The entire data item
   * @returns React node to render in the cell
   */
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

/**
 * SimpleTable component props
 *
 * @template T - The type of data items in the table (must extend Record<string, unknown>)
 */
export interface TableProps<T> {
  /**
   * Array of data items to display in the table
   */
  data: T[];
  /**
   * Column configuration array
   */
  columns: TableColumn<T>[];
  /**
   * Key of the data item property to use as React key for rows
   * This should be a unique identifier for each row
   */
  rowKey: keyof T;
  /**
   * Optional size prop for table cells and typography
   * @default "md"
   */
  size?: SimpleTableSize;
  /**
   * Optional className for the table container
   */
  className?: string;
}

// ============================================================================
// STYLING
// ============================================================================

/**
 * SimpleTable CVA Variants
 *
 * Uses tokenCVA per Decision Matrix RULE 1 (component has token-driven size axis)
 */
const simpleTableVariants = tokenCVA({
  variants: {
    size: {
      sm: `${SIMPLETABLE_TOKENS.padding.cell.sm} ${SIMPLETABLE_TOKENS.typography.cell.sm}`,
      md: `${SIMPLETABLE_TOKENS.padding.cell.md} ${SIMPLETABLE_TOKENS.typography.cell.md}`,
      lg: `${SIMPLETABLE_TOKENS.padding.cell.lg} ${SIMPLETABLE_TOKENS.typography.cell.lg}`,
    } satisfies Record<SimpleTableSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Header cell variants
 */
const headerCellVariants = tokenCVA({
  variants: {
    size: {
      sm: `${SIMPLETABLE_TOKENS.padding.header.sm} ${SIMPLETABLE_TOKENS.typography.header.sm} ${SIMPLETABLE_TOKENS.alignment.left}`,
      md: `${SIMPLETABLE_TOKENS.padding.header.md} ${SIMPLETABLE_TOKENS.typography.header.md} ${SIMPLETABLE_TOKENS.alignment.left}`,
      lg: `${SIMPLETABLE_TOKENS.padding.header.lg} ${SIMPLETABLE_TOKENS.typography.header.lg} ${SIMPLETABLE_TOKENS.alignment.left}`,
    } satisfies Record<SimpleTableSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * SimpleTable Component
 *
 * Renders a simple table with data and column configuration.
 * Supports custom cell rendering via column render functions.
 *
 * @template T - The type of data items (must extend Record<string, unknown>)
 */
export const Table = <T extends Record<string, unknown>>({
  data,
  columns,
  rowKey,
  size = "md",
  className,
}: TableProps<T>) => {
  return (
    <div className={cn(SIMPLETABLE_TOKENS.layout.overflow, className)}>
      <table className={SIMPLETABLE_TOKENS.layout.table}>
        <thead>
          <tr className={SIMPLETABLE_TOKENS.border.bottom}>
            {columns.map((column) => (
              <th key={String(column.key)} scope="col" className={headerCellVariants({ size })}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={String(item[rowKey])}
              className={cn(SIMPLETABLE_TOKENS.border.bottom, SIMPLETABLE_TOKENS.state.rowHover)}
            >
              {columns.map((column) => (
                <td key={String(column.key)} className={simpleTableVariants({ size })}>
                  {column.render ? column.render(item[column.key], item) : String(item[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
