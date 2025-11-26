/**
 * Box Primitive Component
 *
 * Token-driven base container component with support for padding, margin,
 * background, radius, and responsive props. All styling uses CSS variables
 * from the token system.
 */

import * as React from "react";

import {
  getColorCSSVar,
  getRadiusCSSVar,
  getSpacingCSSVar,
  isResponsiveValue,
  type ResponsiveValue,
} from "@/lib/responsive-props";

import type {
  ColorValue,
  RadiusValue,
  ResponsiveColor,
  ResponsiveRadius,
  ResponsiveSpacing,
  SpacingValue,
} from "./layout.types";

/**
 * Box component props
 */
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Padding (all sides)
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
   * Margin (all sides)
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
   * Background color
   */
  bg?: ResponsiveColor;

  /**
   * Border radius
   */
  radius?: ResponsiveRadius;

  /**
   * As element - render as different HTML element
   */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Convert spacing value to CSS variable string
 */
function spacingToCSSVar(value: SpacingValue): string {
  return getSpacingCSSVar(value as string | number);
}

/**
 * Convert radius value to CSS variable string
 */
function radiusToCSSVar(value: RadiusValue): string {
  return getRadiusCSSVar(value);
}

/**
 * Convert color value to CSS variable string
 */
function colorToCSSVar(value: ColorValue): string {
  if (value.startsWith("hsl(") || value.startsWith("var(")) {
    return value;
  }
  return getColorCSSVar(value);
}

/**
 * Get CSS value from responsive or simple value
 * For now, handles simple values. Responsive support can be added via CSS custom properties.
 */
function getCSSValue<T>(
  value: ResponsiveValue<T> | undefined,
  mapper: (val: T) => string,
  defaultValue?: string,
): string | undefined {
  if (!value) {
    return defaultValue;
  }

  if (isResponsiveValue(value)) {
    // For responsive values, use the base value or first available breakpoint
    if (value.base !== undefined) {
      return mapper(value.base);
    }
    if (value.sm !== undefined) {
      return mapper(value.sm);
    }
    if (value.md !== undefined) {
      return mapper(value.md);
    }
    return defaultValue;
  }

  // At this point, value is T (not ResponsiveValue<T>)
  return mapper(value as T);
}

/**
 * Box component
 */
const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
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
      bg,
      radius,
      as: Component = "div",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    // Build inline styles from props
    const inlineStyles: React.CSSProperties = {};

    // Padding
    if (p) {
      inlineStyles.padding = getCSSValue(p, spacingToCSSVar);
    } else {
      if (pt || py) {
        inlineStyles.paddingTop = getCSSValue(pt || py, spacingToCSSVar);
      }
      if (pr || px) {
        inlineStyles.paddingRight = getCSSValue(pr || px, spacingToCSSVar);
      }
      if (pb || py) {
        inlineStyles.paddingBottom = getCSSValue(pb || py, spacingToCSSVar);
      }
      if (pl || px) {
        inlineStyles.paddingLeft = getCSSValue(pl || px, spacingToCSSVar);
      }
    }

    // Margin
    if (m) {
      inlineStyles.margin = getCSSValue(m, spacingToCSSVar);
    } else {
      if (mt || my) {
        inlineStyles.marginTop = getCSSValue(mt || my, spacingToCSSVar);
      }
      if (mr || mx) {
        inlineStyles.marginRight = getCSSValue(mr || mx, spacingToCSSVar);
      }
      if (mb || my) {
        inlineStyles.marginBottom = getCSSValue(mb || my, spacingToCSSVar);
      }
      if (ml || mx) {
        inlineStyles.marginLeft = getCSSValue(ml || mx, spacingToCSSVar);
      }
    }

    // Background
    if (bg) {
      inlineStyles.backgroundColor = getCSSValue(bg, colorToCSSVar);
    }

    // Border radius
    if (radius) {
      inlineStyles.borderRadius = getCSSValue(radius, radiusToCSSVar);
    }

    // Merge with provided style
    const mergedStyle: React.CSSProperties = {
      ...inlineStyles,
      ...style,
    };

    // Type-safe component rendering
    // When using 'as' prop, we need to handle the polymorphic component type
    // Cast to any to avoid complex union type issues with polymorphic components
    const ComponentAny = Component as any;
    return <ComponentAny ref={ref} className={className} style={mergedStyle} {...props} />;
  },
);

Box.displayName = "Box";

export { Box };
