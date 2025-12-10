"use client";

/**
 * Flex Primitive Component
 *
 * Token-driven flexbox container with full control over direction, wrap,
 * grow, shrink, basis, alignment, and spacing. Uses Box internally.
 * All spacing values use tokens only.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

import { Box, type BoxProps } from "./Box";
import type {
  ResponsiveAlignment,
  ResponsiveFlexDirection,
  ResponsiveFlexWrap,
  ResponsiveJustify,
  ResponsiveSpacing,
} from "./layout.types";

export interface FlexProps
  extends Omit<BoxProps, "display" | "flexDirection" | "align" | "justify"> {
  /**
   * Flex direction
   */
  direction?: ResponsiveFlexDirection;

  /**
   * Flex wrap
   */
  wrap?: ResponsiveFlexWrap;

  /**
   * Flex grow (0 or 1, or use Tailwind flex-grow-*)
   */
  grow?: 0 | 1 | boolean;

  /**
   * Flex shrink (0 or 1, or use Tailwind flex-shrink-*)
   */
  shrink?: 0 | 1 | boolean;

  /**
   * Flex basis (CSS value or Tailwind class)
   * Note: For token-based approach, use spacing tokens via className
   */
  basis?: string;

  /**
   * Align items
   */
  align?: ResponsiveAlignment;

  /**
   * Justify content
   */
  justify?: ResponsiveJustify;

  /**
   * Gap between flex items - token-based
   */
  gap?: ResponsiveSpacing;
}

/**
 * Get base value from responsive value
 */
function getBaseValue<T>(
  value:
    | ResponsiveFlexDirection
    | ResponsiveFlexWrap
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
 * Convert flex direction to Tailwind class
 */
function flexDirectionToClass(
  value: "row" | "column" | "row-reverse" | "column-reverse" | undefined,
): string | undefined {
  if (!value) return undefined;
  if (value === "row") return "flex-row";
  if (value === "column") return "flex-col";
  if (value === "row-reverse") return "flex-row-reverse";
  if (value === "column-reverse") return "flex-col-reverse";
  return undefined;
}

/**
 * Convert flex wrap to Tailwind class
 */
function flexWrapToClass(
  value: "nowrap" | "wrap" | "wrap-reverse" | undefined,
): string | undefined {
  if (!value) return undefined;
  if (value === "nowrap") return "flex-nowrap";
  if (value === "wrap") return "flex-wrap";
  if (value === "wrap-reverse") return "flex-wrap-reverse";
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
 * Convert grow to Tailwind class
 */
function growToClass(value: 0 | 1 | boolean | undefined): string | undefined {
  if (value === undefined || value === false || value === 0) return undefined;
  if (value === true || value === 1) return "grow";
  return undefined;
}

/**
 * Convert shrink to Tailwind class
 */
function shrinkToClass(value: 0 | 1 | boolean | undefined): string | undefined {
  if (value === undefined || value === false || value === 0) return undefined;
  if (value === true || value === 1) return "shrink";
  return undefined;
}

/**
 * Flex component
 */
const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    { direction, wrap, grow, shrink, basis, align, justify, gap, className, style, ...props },
    ref,
  ) => {
    // Get base values
    const directionValue = getBaseValue<"row" | "column" | "row-reverse" | "column-reverse">(
      direction,
    );
    const wrapValue = getBaseValue<"nowrap" | "wrap" | "wrap-reverse">(wrap);
    const alignValue = getBaseValue<"start" | "end" | "center" | "baseline" | "stretch">(align);
    const justifyValue = getBaseValue<"start" | "end" | "center" | "between" | "around" | "evenly">(
      justify,
    );

    // Build additional classes
    const flexClasses = cn(
      flexDirectionToClass(directionValue),
      flexWrapToClass(wrapValue),
      growToClass(grow),
      shrinkToClass(shrink),
      alignToClass(alignValue),
      justifyToClass(justifyValue),
      className,
    );

    // Handle basis via style if provided (not token-based, but needed for flexibility)
    const flexStyle: React.CSSProperties = {
      ...(basis ? { flexBasis: basis } : {}),
      ...style,
    };

    return (
      <Box
        ref={ref}
        display="flex"
        flexDirection={directionValue}
        gap={gap}
        className={flexClasses}
        style={Object.keys(flexStyle).length > 0 ? flexStyle : undefined}
        {...props}
      />
    );
  },
);

Flex.displayName = "Flex";

export { Flex };
