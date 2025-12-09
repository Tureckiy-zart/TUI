"use client";

/**
 * Table Cell Component
 *
 * Table cell component with alignment and size support.
 */

import * as React from "react";

import { cn } from "@/lib/utils";
import { DATA_TOKENS } from "@/tokens/components/data";

import type { TableCellProps } from "./Table.types";

export type { TableCellProps };

/**
 * Table Cell component
 */
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align = "left", size = "md", className, ...props }, ref) => {
    const paddingClass = DATA_TOKENS.table.padding.cell[size];
    const typographyClass = DATA_TOKENS.table.typography.cell.fontSize;
    const fontWeightClass = DATA_TOKENS.table.typography.cell.fontWeight;

    const alignmentClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };

    return (
      <td
        ref={ref}
        className={cn(
          paddingClass,
          typographyClass,
          fontWeightClass,
          alignmentClasses[align],
          className,
        )}
        role="cell"
        {...props}
      />
    );
  },
);

TableCell.displayName = "TableCell";

export { TableCell };
