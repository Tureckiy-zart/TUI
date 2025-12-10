"use client";

/**
 * Grid Primitive Component
 *
 * Token-driven CSS Grid container with support for columns, rows, gap,
 * flow, and alignment. Uses Box internally. All spacing values use tokens only.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

import { Box, type BoxProps } from "./Box";
import type {
  ResponsiveAlignment,
  ResponsiveColumns,
  ResponsiveFlow,
  ResponsiveJustify,
  ResponsiveRows,
  ResponsiveSpacing,
} from "./layout.types";

export interface GridProps extends Omit<BoxProps, "display" | "align" | "justify"> {
  /**
   * Number of columns (1-6, 12, or none)
   */
  cols?: ResponsiveColumns;

  /**
   * Number of columns at sm breakpoint
   */
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | "none";

  /**
   * Number of columns at md breakpoint
   */
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | "none";

  /**
   * Number of columns at lg breakpoint
   */
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | "none";

  /**
   * Number of columns at xl breakpoint
   */
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | "none";

  /**
   * Number of columns at 2xl breakpoint
   */
  "2xl"?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | "none";

  /**
   * Number of rows (1-6 or none)
   */
  rows?: ResponsiveRows;

  /**
   * Gap between grid items - token-based (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
   */
  gap?: ResponsiveSpacing;

  /**
   * Grid flow direction
   */
  flow?: ResponsiveFlow;

  /**
   * Align items
   */
  align?: ResponsiveAlignment;

  /**
   * Justify content
   */
  justify?: ResponsiveJustify;
}

/**
 * Get base value from responsive value
 */
function getBaseValue<T>(
  value:
    | ResponsiveColumns
    | ResponsiveRows
    | ResponsiveFlow
    | ResponsiveAlignment
    | ResponsiveJustify
    | T
    | undefined,
): T | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  // Check if it's a responsive value object
  if (typeof value === "object" && !Array.isArray(value) && value !== null) {
    if ("base" in value && value.base !== undefined) {
      return value.base as T;
    }
    if ("sm" in value && value.sm !== undefined) {
      return value.sm as T;
    }
    if ("md" in value && value.md !== undefined) {
      return value.md as T;
    }
    if ("lg" in value && value.lg !== undefined) {
      return value.lg as T;
    }
  }

  return value as T;
}

/**
 * Convert columns to Tailwind class
 */
function colsToClass(value: 1 | 2 | 3 | 4 | 5 | 6 | 12 | "none" | undefined): string | undefined {
  if (!value) return undefined;
  if (value === "none") return "grid-cols-none";
  return `grid-cols-${value}`;
}

/**
 * Convert rows to Tailwind class
 */
function rowsToClass(value: 1 | 2 | 3 | 4 | 5 | 6 | "none" | undefined): string | undefined {
  if (!value || value === "none") return undefined;
  return `grid-rows-${value}`;
}

/**
 * Convert flow to Tailwind class
 */
function flowToClass(
  value: "row" | "col" | "dense" | "row-dense" | "col-dense" | undefined,
): string | undefined {
  if (!value) return undefined;
  if (value === "row") return "grid-flow-row";
  if (value === "col") return "grid-flow-col";
  if (value === "dense") return "grid-flow-dense";
  if (value === "row-dense") return "grid-flow-row-dense";
  if (value === "col-dense") return "grid-flow-col-dense";
  return undefined;
}

/**
 * Convert align to Tailwind class
 */
function alignToClass(
  value: "start" | "end" | "center" | "baseline" | "stretch" | undefined,
): string | undefined {
  if (!value) return undefined;
  if (value === "start") return "items-start";
  if (value === "end") return "items-end";
  if (value === "center") return "items-center";
  if (value === "baseline") return "items-baseline";
  if (value === "stretch") return "items-stretch";
  return undefined;
}

/**
 * Convert justify to Tailwind class
 */
function justifyToClass(
  value: "start" | "end" | "center" | "between" | "around" | "evenly" | undefined,
): string | undefined {
  if (!value) return undefined;
  if (value === "start") return "justify-start";
  if (value === "end") return "justify-end";
  if (value === "center") return "justify-center";
  if (value === "between") return "justify-between";
  if (value === "around") return "justify-around";
  if (value === "evenly") return "justify-evenly";
  return undefined;
}

/**
 * Grid component
 */
const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    { cols, sm, md, lg, xl, "2xl": xl2, rows, gap, flow, align, justify, className, ...props },
    ref,
  ) => {
    // Handle responsive columns: if md/lg/xl are provided directly, build responsive cols object
    let colsValue: ResponsiveColumns | undefined = cols;
    if (sm || md || lg || xl || xl2) {
      // If cols is a simple value, use it as base
      if (cols !== undefined && typeof cols !== "object") {
        colsValue = {
          base: cols,
          ...(sm && { sm }),
          ...(md && { md }),
          ...(lg && { lg }),
          ...(xl && { xl }),
          ...(xl2 && { "2xl": xl2 }),
        } as ResponsiveColumns;
      } else if (cols === undefined) {
        // If cols is not provided, use responsive props directly
        colsValue = {
          ...(sm && { sm }),
          ...(md && { md }),
          ...(lg && { lg }),
          ...(xl && { xl }),
          ...(xl2 && { "2xl": xl2 }),
        } as ResponsiveColumns;
      } else {
        // If cols is already a responsive object, merge with direct props
        colsValue = {
          ...cols,
          ...(sm && { sm }),
          ...(md && { md }),
          ...(lg && { lg }),
          ...(xl && { xl }),
          ...(xl2 && { "2xl": xl2 }),
        } as ResponsiveColumns;
      }
    }

    // Get base values
    const baseColsValue = getBaseValue<1 | 2 | 3 | 4 | 5 | 6 | 12 | "none">(colsValue);
    const rowsValue = getBaseValue<1 | 2 | 3 | 4 | 5 | 6 | "none">(rows);
    const flowValue = getBaseValue<"row" | "col" | "dense" | "row-dense" | "col-dense">(flow);
    const alignValue = getBaseValue<"start" | "end" | "center" | "baseline" | "stretch">(align);
    const justifyValue = getBaseValue<"start" | "end" | "center" | "between" | "around" | "evenly">(
      justify,
    );

    // Build responsive column classes
    const responsiveColClasses: string[] = [];
    if (typeof colsValue === "object" && colsValue !== null && !Array.isArray(colsValue)) {
      if (colsValue.base !== undefined) {
        responsiveColClasses.push(colsToClass(colsValue.base) || "");
      }
      if (colsValue.sm !== undefined) {
        responsiveColClasses.push(`sm:${colsToClass(colsValue.sm) || ""}`);
      }
      if (colsValue.md !== undefined) {
        responsiveColClasses.push(`md:${colsToClass(colsValue.md) || ""}`);
      }
      if (colsValue.lg !== undefined) {
        responsiveColClasses.push(`lg:${colsToClass(colsValue.lg) || ""}`);
      }
      if (colsValue.xl !== undefined) {
        responsiveColClasses.push(`xl:${colsToClass(colsValue.xl) || ""}`);
      }
      if (colsValue["2xl"] !== undefined) {
        responsiveColClasses.push(`2xl:${colsToClass(colsValue["2xl"]) || ""}`);
      }
    } else if (baseColsValue !== undefined) {
      responsiveColClasses.push(colsToClass(baseColsValue) || "");
    }

    // Build grid classes
    const gridClasses = cn(
      responsiveColClasses,
      rowsToClass(rowsValue),
      flowToClass(flowValue),
      alignToClass(alignValue),
      justifyToClass(justifyValue),
      className,
    );

    return <Box ref={ref} display="grid" gap={gap} className={gridClasses} {...props} />;
  },
);

Grid.displayName = "Grid";

export { Grid };
