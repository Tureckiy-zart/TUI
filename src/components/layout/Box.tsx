"use client";

/**
 * Box Primitive Component
 *
 * Token-driven base container component with support for padding, margin,
 * display, flex, grid, radius, and shadow. All styling uses token-based
 * Tailwind classes only (no raw numeric values).
 */

import * as React from "react";

import {
  getBaseValue as getBaseValueUtil,
  getColorCSSVar,
  getRadiusCSSVar,
  getSpacingCSSVar,
} from "@/lib/responsive-props";
import { cn } from "@/lib/utils";

import type {
  ColorValue,
  DisplayValue,
  FlexDirectionValue,
  RadiusValue,
  ResponsiveColor,
  ResponsiveRadius,
  ResponsiveSpacing,
  ShadowValue,
  SpacingValue,
} from "./layout.types";

/**
 * Box component props
 */
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Render as different HTML element
   */
  as?: keyof React.JSX.IntrinsicElements;

  /**
   * Padding (all sides) - token-based (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
   */
  p?: ResponsiveSpacing;

  /**
   * Padding horizontal (left + right)
   */
  px?: ResponsiveSpacing;

  /**
   * Padding vertical (top + bottom)
   */
  py?: ResponsiveSpacing;

  /**
   * Padding top
   */
  pt?: ResponsiveSpacing;

  /**
   * Padding right
   */
  pr?: ResponsiveSpacing;

  /**
   * Padding bottom
   */
  pb?: ResponsiveSpacing;

  /**
   * Padding left
   */
  pl?: ResponsiveSpacing;

  /**
   * Margin (all sides) - token-based
   */
  m?: ResponsiveSpacing;

  /**
   * Margin horizontal (left + right)
   */
  mx?: ResponsiveSpacing;

  /**
   * Margin vertical (top + bottom)
   */
  my?: ResponsiveSpacing;

  /**
   * Margin top
   */
  mt?: ResponsiveSpacing;

  /**
   * Margin right
   */
  mr?: ResponsiveSpacing;

  /**
   * Margin bottom
   */
  mb?: ResponsiveSpacing;

  /**
   * Margin left
   */
  ml?: ResponsiveSpacing;

  /**
   * Display type
   */
  display?: DisplayValue;

  /**
   * Flex direction (when display is flex)
   */
  flexDirection?: FlexDirectionValue;

  /**
   * Border radius - token-based (none, xs, sm, md, lg, xl, 2xl, 3xl, full)
   */
  radius?: ResponsiveRadius;

  /**
   * Shadow - token-based (none, xs, sm, md, lg, xl, 2xl)
   */
  shadow?: ShadowValue;

  /**
   * Background color - token-based
   */
  bg?: ResponsiveColor;

  /**
   * Gap (for flex/grid layouts) - token-based
   */
  gap?: ResponsiveSpacing;

  /**
   * Align items (for flex/grid layouts)
   */
  align?: "start" | "end" | "center" | "baseline" | "stretch";

  /**
   * Justify content (for flex/grid layouts)
   */
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
}

/**
 * Get base value from responsive value
 */
function getBaseValue<T>(
  value: ResponsiveSpacing | ResponsiveRadius | ResponsiveColor | T | undefined,
): T | undefined {
  return getBaseValueUtil(value) as T | undefined;
}

/**
 * Convert shadow token to Tailwind class
 */
function shadowToClass(value: ShadowValue | undefined): string | undefined {
  if (!value || value === "none") return undefined;
  return `shadow-${value}`;
}

/**
 * Convert display to Tailwind class
 */
function displayToClass(value: DisplayValue | undefined): string | undefined {
  if (!value) return undefined;
  if (value === "inline") return "inline";
  if (value === "inline-block") return "inline-block";
  if (value === "flex") return "flex";
  if (value === "inline-flex") return "inline-flex";
  if (value === "grid") return "grid";
  if (value === "inline-grid") return "inline-grid";
  if (value === "block") return "block";
  if (value === "none") return "hidden";
  return undefined;
}

/**
 * Convert flex direction to Tailwind class
 */
function flexDirectionToClass(value: FlexDirectionValue | undefined): string | undefined {
  if (!value) return undefined;
  if (value === "row") return "flex-row";
  if (value === "column") return "flex-col";
  if (value === "row-reverse") return "flex-row-reverse";
  if (value === "column-reverse") return "flex-col-reverse";
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
 * Box component
 */
const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      as: Component = "div",
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      display,
      flexDirection,
      radius,
      shadow,
      bg,
      gap,
      align,
      justify,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    // Get base values for CSS variables
    const pValue = getBaseValue<SpacingValue>(p);
    const pxValue = getBaseValue<SpacingValue>(px);
    const pyValue = getBaseValue<SpacingValue>(py);
    const ptValue = getBaseValue<SpacingValue>(pt);
    const prValue = getBaseValue<SpacingValue>(pr);
    const pbValue = getBaseValue<SpacingValue>(pb);
    const plValue = getBaseValue<SpacingValue>(pl);
    const mValue = getBaseValue<SpacingValue>(m);
    const mxValue = getBaseValue<SpacingValue>(mx);
    const myValue = getBaseValue<SpacingValue>(my);
    const mtValue = getBaseValue<SpacingValue>(mt);
    const mrValue = getBaseValue<SpacingValue>(mr);
    const mbValue = getBaseValue<SpacingValue>(mb);
    const mlValue = getBaseValue<SpacingValue>(ml);
    const radiusValue = getBaseValue<RadiusValue>(radius);
    const bgValue = getBaseValue<ColorValue>(bg);
    const gapValue = getBaseValue<SpacingValue>(gap);

    // Build inline styles with CSS variables
    const inlineStyles: React.CSSProperties = {
      ...(pValue !== undefined && { padding: getSpacingCSSVar(pValue) }),
      ...(!p &&
        pxValue !== undefined && {
          paddingLeft: getSpacingCSSVar(pxValue),
          paddingRight: getSpacingCSSVar(pxValue),
        }),
      ...(!p &&
        pyValue !== undefined && {
          paddingTop: getSpacingCSSVar(pyValue),
          paddingBottom: getSpacingCSSVar(pyValue),
        }),
      ...(!p && !py && ptValue !== undefined && { paddingTop: getSpacingCSSVar(ptValue) }),
      ...(!p && !px && prValue !== undefined && { paddingRight: getSpacingCSSVar(prValue) }),
      ...(!p && !py && pbValue !== undefined && { paddingBottom: getSpacingCSSVar(pbValue) }),
      ...(!p && !px && plValue !== undefined && { paddingLeft: getSpacingCSSVar(plValue) }),
      ...(mValue !== undefined && { margin: getSpacingCSSVar(mValue) }),
      ...(!m &&
        mxValue !== undefined && {
          marginLeft: getSpacingCSSVar(mxValue),
          marginRight: getSpacingCSSVar(mxValue),
        }),
      ...(!m &&
        myValue !== undefined && {
          marginTop: getSpacingCSSVar(myValue),
          marginBottom: getSpacingCSSVar(myValue),
        }),
      ...(!m && !my && mtValue !== undefined && { marginTop: getSpacingCSSVar(mtValue) }),
      ...(!m && !mx && mrValue !== undefined && { marginRight: getSpacingCSSVar(mrValue) }),
      ...(!m && !my && mbValue !== undefined && { marginBottom: getSpacingCSSVar(mbValue) }),
      ...(!m && !mx && mlValue !== undefined && { marginLeft: getSpacingCSSVar(mlValue) }),
      ...(radiusValue !== undefined && { borderRadius: getRadiusCSSVar(radiusValue) }),
      ...(bgValue !== undefined && { backgroundColor: getColorCSSVar(bgValue) }),
      ...(gapValue !== undefined && { gap: getSpacingCSSVar(gapValue) }),
      ...style,
    };

    // Build class names for non-spacing props
    const classes = cn(
      // Display
      displayToClass(display),
      // Flex direction
      flexDirectionToClass(flexDirection),
      // Align
      alignToClass(align),
      // Justify
      justifyToClass(justify),
      // Shadow
      shadowToClass(shadow),
      className,
    );

    const ComponentAny = Component as any;
    const finalStyle =
      Object.keys(inlineStyles).length > 0 || style ? { ...inlineStyles, ...style } : undefined;

    return <ComponentAny ref={ref} className={classes} style={finalStyle} {...props} />;
  },
);

Box.displayName = "Box";

export { Box };
