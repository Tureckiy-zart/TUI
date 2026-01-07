"use client";

/**
 * Grid Primitive Component
 *
 * Grid is a CSS Grid container extension of Box. It provides full control
 * over grid layout properties (columns, rows, gap, flow, alignment).
 * Uses Box internally as the base container.
 *
 * Use Grid for two-dimensional layouts that require precise control over
 * both rows and columns. For one-dimensional layouts, prefer Stack or Flex.
 *
 * @enforcement TUNG_GRID_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL spacing values MUST be token-based (ResponsiveSpacing)
 * - Gap prop accepts ResponsiveSpacing (semantic spacing tokens: xs, sm, md, lg, xl, etc.)
 * - NO raw CSS spacing values allowed
 * - NO raw numeric values allowed
 * - Gap is applied via inline styles using CSS variables (--spacing-*)
 * - Structural utilities (grid, grid-cols-*, grid-rows-*, etc.) are ALLOWED
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Gap prop accepts ResponsiveSpacing (semantic spacing tokens: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
 * - Gap is applied via inline styles using CSS variables (--spacing-*)
 * - NO raw Tailwind gap classes (gap-4, gap-md, etc.) allowed
 *
 * Layout Authority Rules:
 * - Grid uses CSS Grid layout system
 * - Column and row definitions use Tailwind grid utilities (grid-cols-*, grid-rows-*)
 * - Alignment and justification use Tailwind flex utilities (items-*, justify-*)
 * - Flow direction uses Tailwind grid-flow utilities
 *
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Spacing Authority: Grid uses spacing token system exclusively for gap via CSS variables
 * - Layout Authority: Grid follows CSS Grid layout composition patterns
 *
 * Token-only contract:
 * - All spacing values are defined in spacing token system (src/FOUNDATION/tokens/spacing.ts)
 * - Spacing tokens reference foundation spacing scale (8px grid system)
 * - Gap is applied via inline styles using CSS variables (--spacing-*)
 * - No raw CSS spacing values are allowed
 * - TypeScript enforces valid spacing token values at compile time
 *
 * @example
 * ```tsx
 * // CSS Grid layout
 * <Grid cols={3} gap="md" align="center">
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 *   <Box>Item 3</Box>
 * </Grid>
 * ```
 */

import * as React from "react";

import {
  getBaseValue as getBaseValueUtil,
  getSpacingCSSVar,
} from "@/FOUNDATION/lib/responsive-props";
import { cn } from "@/FOUNDATION/lib/utils";

import { Box, type BoxProps } from "../Box";
import type {
  ResponsiveAlignment,
  ResponsiveColumns,
  ResponsiveFlow,
  ResponsiveJustify,
  ResponsiveRows,
  ResponsiveSpacing,
  SpacingValue,
} from "../layout.types";

export interface GridProps extends Omit<BoxProps, "display" | "align" | "justify"> {
  /**
   * Number of columns (1-6, 12, or none)
   *
   * Can be a simple value, a responsive object, or combined with shorthand props (sm, md, lg, xl, 2xl).
   * Merging behavior:
   * - If `cols` is a simple value and shorthand props are provided, `cols` becomes the base value
   * - If `cols` is undefined and shorthand props are provided, shorthand props are used directly
   * - If `cols` is a responsive object and shorthand props are provided, they are merged together
   *
   * @example
   * ```tsx
   * // Simple value
   * <Grid cols={3} />
   *
   * // Responsive object
   * <Grid cols={{ base: 1, md: 2, lg: 3 }} />
   *
   * // Shorthand props (cols becomes base)
   * <Grid cols={1} md={2} lg={3} />
   *
   * // Shorthand props only (no cols)
   * <Grid sm={1} md={2} lg={3} />
   * ```
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
    {
      cols,
      sm,
      md,
      lg,
      xl,
      "2xl": xl2,
      rows,
      gap,
      flow,
      align,
      justify,
      className,
      style,
      ...props
    },
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
    const baseColsValue = getBaseValueUtil<1 | 2 | 3 | 4 | 5 | 6 | 12 | "none">(colsValue);
    const rowsValue = getBaseValueUtil<1 | 2 | 3 | 4 | 5 | 6 | "none">(rows);
    const flowValue = getBaseValueUtil<"row" | "col" | "dense" | "row-dense" | "col-dense">(flow);
    const alignValue = getBaseValueUtil<"start" | "end" | "center" | "baseline" | "stretch">(align);
    const justifyValue = getBaseValueUtil<
      "start" | "end" | "center" | "between" | "around" | "evenly"
    >(justify);

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

    // Get gap base value for inline style (use utility function for spacing)
    const gapBaseValue = gap ? getBaseValueUtil<SpacingValue>(gap) : undefined;

    // Handle gap via inline style
    const gridStyle: React.CSSProperties = {
      ...(gapBaseValue !== undefined && { gap: getSpacingCSSVar(String(gapBaseValue)) }),
      ...style,
    };

    return (
      <Box
        ref={ref}
        className={cn("grid", gridClasses)}
        style={Object.keys(gridStyle).length > 0 ? gridStyle : undefined}
        {...props}
      />
    );
  },
);

Grid.displayName = "Grid";

export { Grid };
