"use client";

/**
 * Grid Primitive Component
 *
 * Token-driven CSS Grid container component with support for columns, rows,
 * gap, alignment, and responsive layout using CSS variables.
 * Supports animation props via Framer Motion when provided.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";

import type { AnimationProps } from "@/animation/types";
import { getSpacingCSSVar, isResponsiveValue, type ResponsiveValue } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";

import type {
  ColumnValue,
  ResponsiveAlignment,
  ResponsiveColumns,
  ResponsiveFlow,
  ResponsiveJustify,
  ResponsiveRows,
  ResponsiveSpacing,
  SpacingValue,
} from "./layout.types";

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
      none: "grid-cols-none",
    },
    rows: {
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      5: "grid-rows-5",
      6: "grid-rows-6",
      none: "grid-rows-none",
    },
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    flow: {
      row: "grid-flow-row",
      col: "grid-flow-col",
      dense: "grid-flow-dense",
      "row-dense": "grid-flow-row-dense",
      "col-dense": "grid-flow-col-dense",
    },
  },
  defaultVariants: {
    cols: 1,
    rows: "none",
    align: "stretch",
    justify: "start",
    flow: "row",
  },
});

/**
 * Get base value for CVA variants (non-responsive)
 */
function getBaseValue<T>(value: ResponsiveValue<T> | T | undefined): T | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (isResponsiveValue(value)) {
    return value.base || value.sm || value.md || value.lg || value.xl || value["2xl"] || undefined;
  }

  // At this point, value is T (not ResponsiveValue<T>)
  return value as T;
}

/**
 * Get CSS value from responsive or simple spacing value
 */
function getGapCSSValue(
  value: ResponsiveValue<SpacingValue> | undefined,
  defaultValue?: string,
): string | undefined {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  if (isResponsiveValue(value)) {
    let baseValue: SpacingValue | undefined;

    if (value.base !== undefined) {
      baseValue = value.base;
    } else if (value.sm !== undefined) {
      baseValue = value.sm;
    } else if (value.md !== undefined) {
      baseValue = value.md;
    }

    if (baseValue !== undefined) {
      return getSpacingCSSVar(baseValue as string | number);
    }
    return defaultValue;
  }

  // Handle 0 explicitly (since 0 is falsy but valid)
  if (value === 0) {
    return getSpacingCSSVar(0);
  }

  return getSpacingCSSVar(value as string | number);
}

/**
 * Check if component has animation props
 */
function hasAnimationProps(props: Partial<AnimationProps>): boolean {
  return !!(
    props.initial !== undefined ||
    props.animate !== undefined ||
    props.exit !== undefined ||
    props.transition !== undefined ||
    props.whileHover !== undefined ||
    props.whileFocus !== undefined ||
    props.whileTap !== undefined ||
    props.whileDrag !== undefined ||
    props.whileInView !== undefined
  );
}

export interface GridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof AnimationProps>,
    Omit<VariantProps<typeof gridVariants>, "cols" | "rows" | "gap" | "align" | "justify" | "flow">,
    AnimationProps {
  /**
   * Number of columns (base breakpoint)
   */
  cols?: ResponsiveColumns;

  /**
   * Number of columns for medium breakpoint (768px+)
   */
  md?: ColumnValue;

  /**
   * Number of columns for large breakpoint (1024px+)
   */
  lg?: ColumnValue;

  /**
   * Number of columns for extra large breakpoint (1280px+)
   */
  xl?: ColumnValue;

  /**
   * Number of rows
   */
  rows?: ResponsiveRows;

  /**
   * Gap between grid items (uses spacing tokens via CSS variables)
   */
  gap?: ResponsiveSpacing;

  /**
   * Align items
   */
  align?: ResponsiveAlignment;

  /**
   * Justify content
   */
  justify?: ResponsiveJustify;

  /**
   * Grid flow
   */
  flow?: ResponsiveFlow;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols,
      md,
      lg,
      xl,
      rows,
      gap,
      align,
      justify,
      flow,
      style,
      // Animation props
      initial,
      animate,
      exit,
      transition,
      whileHover,
      whileFocus,
      whileTap,
      whileDrag,
      whileInView,
      viewport,
      ...props
    },
    ref,
  ) => {
    // Get base values for CVA
    const colsValue = getBaseValue(cols) as ColumnValue | undefined;
    const rowsValue = getBaseValue(rows) as 1 | 2 | 3 | 4 | 5 | 6 | "none" | undefined;
    const alignValue = getBaseValue(align) as
      | "start"
      | "end"
      | "center"
      | "baseline"
      | "stretch"
      | undefined;

    const justifyValue = getBaseValue(justify) as
      | "start"
      | "end"
      | "center"
      | "between"
      | "around"
      | "evenly"
      | undefined;

    const flowValue = getBaseValue(flow) as
      | "row"
      | "col"
      | "dense"
      | "row-dense"
      | "col-dense"
      | undefined;

    // Build responsive column classes (legacy support for md/lg/xl props)
    const hasResponsiveProps = md || lg || xl;
    const baseColsClass = colsValue ? `grid-cols-${colsValue}` : "grid-cols-1";
    const responsiveCols = [
      baseColsClass,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`,
    ]
      .filter(Boolean)
      .join(" ");

    // Build inline styles for gap (using CSS variables)
    const inlineStyles: React.CSSProperties = {};

    if (gap !== undefined) {
      inlineStyles.gap = getGapCSSValue(gap, "0");
    }

    // Merge with provided style
    const mergedStyle: React.CSSProperties = {
      ...inlineStyles,
      ...style,
    };

    // Get base grid classes - use cols only if no responsive props provided
    const baseClasses = gridVariants({
      cols: hasResponsiveProps ? undefined : colsValue,
      rows: rowsValue,
      align: alignValue,
      justify: justifyValue,
      flow: flowValue,
    });

    // Check if we need to use motion component
    const hasAnimations = hasAnimationProps({
      initial,
      animate,
      exit,
      transition,
      whileHover,
      whileFocus,
      whileTap,
      whileDrag,
      whileInView,
    });

    // Animation props for motion component
    const animationProps = hasAnimations
      ? {
          initial,
          animate,
          exit,
          transition,
          whileHover,
          whileFocus,
          whileTap,
          whileDrag,
          whileInView,
          viewport,
        }
      : {};

    const baseClassName = cn(baseClasses, hasResponsiveProps && responsiveCols, className);

    if (hasAnimations) {
      // Exclude conflicting handlers from props to avoid conflict with Framer Motion
      const {
        onDrag: _onDrag,
        onDragStart: _onDragStart,
        onDragEnd: _onDragEnd,
        onAnimationStart: _onAnimationStart,
        onAnimationEnd: _onAnimationEnd,
        onAnimationIteration: _onAnimationIteration,
        ...restProps
      } = props;

      // Type restProps to exclude conflicting handlers (animation props are already destructured above)
      const safeProps = restProps as Omit<
        React.HTMLAttributes<HTMLDivElement>,
        | "onDrag"
        | "onDragStart"
        | "onDragEnd"
        | "onAnimationStart"
        | "onAnimationEnd"
        | "onAnimationIteration"
      >;

      return (
        <motion.div
          ref={ref}
          className={baseClassName}
          style={mergedStyle}
          {...(animationProps as Partial<HTMLMotionProps<"div">>)}
          {...safeProps}
        />
      );
    }

    return <div ref={ref} className={baseClassName} style={mergedStyle} {...props} />;
  },
);

Grid.displayName = "Grid";

export { Grid, gridVariants };
