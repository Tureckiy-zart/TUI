"use client";

/**
 * Table SortIcon Component
 *
 * Sort indicator icon with rotation animation.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

import type { TableSortIconProps } from "./Table.types";

export type { TableSortIconProps };

/**
 * Table SortIcon component
 * Uses CSS rotation animation (no framer-motion)
 */
const TableSortIcon = React.forwardRef<HTMLSpanElement, TableSortIconProps>(
  ({ direction, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex size-4 items-center text-muted-foreground transition-transform",
          direction === "desc" && "rotate-180",
          !direction && "opacity-30",
          className,
        )}
        aria-hidden="true"
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </svg>
      </span>
    );
  },
);

TableSortIcon.displayName = "TableSortIcon";

export { TableSortIcon };
