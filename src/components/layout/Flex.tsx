/**
 * Flex Primitive Component
 *
 * Token-driven flexbox container component with support for direction, wrap,
 * alignment, justification, and responsive gap using CSS variables.
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { getSpacingCSSVar, isResponsiveValue, type ResponsiveValue } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";

import type {
  ResponsiveAlignment,
  ResponsiveFlexDirection,
  ResponsiveFlexWrap,
  ResponsiveJustify,
  ResponsiveSpacing,
  SpacingValue,
} from "./layout.types";

const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      column: "flex-col",
      "column-reverse": "flex-col-reverse",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    direction: "row",
    wrap: "nowrap",
    justify: "start",
    align: "start",
  },
});

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof flexVariants>, "direction" | "wrap" | "justify" | "align"> {
  /**
   * Flex direction
   */
  direction?: ResponsiveFlexDirection;

  /**
   * Flex wrap
   */
  wrap?: ResponsiveFlexWrap;

  /**
   * Justify content
   */
  justify?: ResponsiveJustify;

  /**
   * Align items
   */
  align?: ResponsiveAlignment;

  /**
   * Gap between flex items (uses spacing tokens via CSS variables)
   */
  gap?: ResponsiveSpacing;
}

/**
 * Get CSS value from responsive or simple value
 */
function getCSSValue(
  value: ResponsiveValue<SpacingValue> | undefined,
  defaultValue?: string,
): string | undefined {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  if (isResponsiveValue(value)) {
    // For responsive values, use the base value or first available breakpoint
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

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, wrap, justify, align, gap, style, ...props }, ref) => {
    // Get base values for CVA (for direction, wrap, align, justify)
    const directionValue = getBaseValue(direction) as
      | "row"
      | "column"
      | "row-reverse"
      | "column-reverse"
      | undefined;

    const wrapValue = getBaseValue(wrap) as "nowrap" | "wrap" | "wrap-reverse" | undefined;
    const justifyValue = getBaseValue(justify) as
      | "start"
      | "end"
      | "center"
      | "between"
      | "around"
      | "evenly"
      | undefined;

    const alignValue = getBaseValue(align) as
      | "start"
      | "end"
      | "center"
      | "baseline"
      | "stretch"
      | undefined;

    // Build inline styles for gap (using CSS variables)
    const inlineStyles: React.CSSProperties = {};

    if (gap !== undefined) {
      inlineStyles.gap = getCSSValue(gap, "0");
    }

    // Merge with provided style
    const mergedStyle: React.CSSProperties = {
      ...inlineStyles,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          flexVariants({
            direction: directionValue,
            wrap: wrapValue,
            justify: justifyValue,
            align: alignValue,
          }),
          className,
        )}
        style={mergedStyle}
        {...props}
      />
    );
  },
);

Flex.displayName = "Flex";

export { Flex, flexVariants };
