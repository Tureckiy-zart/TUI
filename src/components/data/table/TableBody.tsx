"use client";

/**
 * Table Body Component
 *
 * Body section for table (tbody element).
 */

import * as React from "react";

import { cn } from "@/lib/utils";

import type { TableBodyProps } from "./Table.types";

export type { TableBodyProps };

/**
 * Table Body component
 */
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => {
    return <tbody ref={ref} className={cn(className)} role="rowgroup" {...props} />;
  },
);

TableBody.displayName = "TableBody";

export { TableBody };
