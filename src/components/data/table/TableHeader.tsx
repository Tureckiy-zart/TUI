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
import { TABLE_TOKENS } from "@/tokens/components/table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ sticky = false, className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(sticky && TABLE_TOKENS.sticky.header, className)}
        role="rowgroup"
        {...props}
      />
    );
  },
);

TableHeader.displayName = "TableHeader";

export { TableHeader };
