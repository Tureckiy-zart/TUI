"use client";

/**
 * Box Primitive Component
 *
 * Box is the lowest-level layout primitive - a pure, generic container component.
 * It provides token-based styling for spacing (padding/margin), visual properties
 * (radius, shadow, background), and element rendering (via `as` prop).
 *
 * Box does NOT provide layout composition semantics (display, flexDirection, gap,
 * alignment). For layout composition, use Stack, Flex, or Grid components.
 *
 * All styling uses token-based values only (no raw numeric values).
 *
 * @example
 * ```tsx
 * // Basic container with padding
 * <Box px="md" py="md" radius="lg" bg="background">
 *   Content
 * </Box>
 *
 * // Use Stack for layout composition
 * <Stack direction="vertical" spacing="md">
 *   <Box>Item 1</Box>
 *   <Box>Item 2</Box>
 * </Stack>
 * ```
 */

import * as React from "react";

import {
  getBaseValue as getBaseValueUtil,
  getColorCSSVar,
  getRadiusCSSVar,
  getSpacingCSSVar,
} from "@/FOUNDATION/lib/responsive-props";
import { cn } from "@/FOUNDATION/lib/utils";

import type {
  ColorValue,
  RadiusValue,
  ResponsiveColor,
  ResponsiveRadius,
  ResponsiveSpacing,
  ShadowValue,
  SpacingValue,
} from "../layout.types";

/**
 * Box component props
 */
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Render as different HTML element
   */
  as?: keyof React.JSX.IntrinsicElements;

  /**
   * Padding horizontal (left + right)
   */
  px?: ResponsiveSpacing;

  /**
   * Padding vertical (top + bottom)
   */
  py?: ResponsiveSpacing;

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
 * Box component
 */
const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      as: Component = "div",
      px,
      py,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      radius,
      shadow,
      bg,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    // Get base values for CSS variables
    const pxValue = getBaseValue<SpacingValue>(px);
    const pyValue = getBaseValue<SpacingValue>(py);
    const mValue = getBaseValue<SpacingValue>(m);
    const mxValue = getBaseValue<SpacingValue>(mx);
    const myValue = getBaseValue<SpacingValue>(my);
    const mtValue = getBaseValue<SpacingValue>(mt);
    const mrValue = getBaseValue<SpacingValue>(mr);
    const mbValue = getBaseValue<SpacingValue>(mb);
    const mlValue = getBaseValue<SpacingValue>(ml);
    const radiusValue = getBaseValue<RadiusValue>(radius);
    const bgValue = getBaseValue<ColorValue>(bg);

    // Build inline styles with CSS variables
    // Convert spacing values to strings (numeric keys like 0, 1, 2 are valid but need string conversion)
    const inlineStyles: React.CSSProperties = {
      ...(pxValue !== undefined && {
        paddingLeft: getSpacingCSSVar(String(pxValue)),
        paddingRight: getSpacingCSSVar(String(pxValue)),
      }),
      ...(pyValue !== undefined && {
        paddingTop: getSpacingCSSVar(String(pyValue)),
        paddingBottom: getSpacingCSSVar(String(pyValue)),
      }),
      ...(mValue !== undefined && { margin: getSpacingCSSVar(String(mValue)) }),
      ...(!m &&
        mxValue !== undefined && {
          marginLeft: getSpacingCSSVar(String(mxValue)),
          marginRight: getSpacingCSSVar(String(mxValue)),
        }),
      ...(!m &&
        myValue !== undefined && {
          marginTop: getSpacingCSSVar(String(myValue)),
          marginBottom: getSpacingCSSVar(String(myValue)),
        }),
      ...(!m && !my && mtValue !== undefined && { marginTop: getSpacingCSSVar(String(mtValue)) }),
      ...(!m && !mx && mrValue !== undefined && { marginRight: getSpacingCSSVar(String(mrValue)) }),
      ...(!m &&
        !my &&
        mbValue !== undefined && { marginBottom: getSpacingCSSVar(String(mbValue)) }),
      ...(!m && !mx && mlValue !== undefined && { marginLeft: getSpacingCSSVar(String(mlValue)) }),
      ...(radiusValue !== undefined && { borderRadius: getRadiusCSSVar(radiusValue) }),
      ...(bgValue !== undefined && { backgroundColor: getColorCSSVar(bgValue) }),
      ...style,
    };

    // Build class names for non-spacing props
    const classes = cn(
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
