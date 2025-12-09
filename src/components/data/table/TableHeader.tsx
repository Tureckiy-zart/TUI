"use client";

/**
 * Table Header Component
 *
 * Header section for table (thead element).
 */

import * as React from "react";

import { cn } from "@/lib/utils";

import type { TableHeaderProps } from "./Table.types";

export type { TableHeaderProps };

/**
 * Table Header component
 */
const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ sticky = false, className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(sticky && "sticky top-0 z-10 bg-background", className)}
        role="rowgroup"
        {...props}
      />
    );
  },
);

TableHeader.displayName = "TableHeader";

export { TableHeader };
