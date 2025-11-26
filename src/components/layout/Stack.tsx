/**
 * Stack Primitive Component
 *
 * Token-driven stack layout component with support for vertical/horizontal
 * direction, spacing, alignment, and responsive props using CSS variables.
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { getSpacingCSSVar, isResponsiveValue, type ResponsiveValue } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";

import type {
  ResponsiveAlignment,
  ResponsiveJustify,
  ResponsiveSpacing,
  ResponsiveStackDirection,
  SpacingValue,
} from "./layout.types";

const stackVariants = cva("flex flex-col", {
  variants: {
    align: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
    },
  },
  defaultVariants: {
    align: "stretch",
    justify: "start",
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
function getSpacingCSSValue(
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

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof stackVariants>, "align" | "justify"> {
  /**
   * Stack direction
   */
  direction?: ResponsiveStackDirection;

  /**
   * Spacing between stack items (uses spacing tokens via CSS variables)
   */
  spacing?: ResponsiveSpacing;

  /**
   * Align items
   */
  align?: ResponsiveAlignment;

  /**
   * Justify content
   */
  justify?: ResponsiveJustify;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, spacing, align, justify, style, ...props }, ref) => {
    // Get base values for CVA
    const directionValue = getBaseValue(direction) as "vertical" | "horizontal" | undefined;
    const alignValue = getBaseValue(align) as "start" | "end" | "center" | "stretch" | undefined;

    const justifyValue = getBaseValue(justify) as
      | "start"
      | "end"
      | "center"
      | "between"
      | "around"
      | undefined;

    // Determine if horizontal (default is vertical)
    const isHorizontal = directionValue === "horizontal";

    // Build inline styles for spacing (using CSS variables)
    // Stack uses gap for spacing between items
    const inlineStyles: React.CSSProperties = {};

    if (spacing !== undefined) {
      inlineStyles.gap = getSpacingCSSValue(spacing, "0");
    }

    // If horizontal, change flex direction
    if (isHorizontal) {
      inlineStyles.flexDirection = "row";
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
          stackVariants({
            align: alignValue,
            justify: justifyValue,
          }),
          className,
        )}
        style={mergedStyle}
        {...props}
      />
    );
  },
);

Stack.displayName = "Stack";

export { Stack, stackVariants };
