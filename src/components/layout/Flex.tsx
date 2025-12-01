/**
 * Flex Primitive Component
 *
 * Token-driven flexbox container component with support for direction, wrap,
 * alignment, justification, and responsive gap using CSS variables.
 * Supports animation props via Framer Motion when provided.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";

import type { AnimationProps } from "@/animation/types";
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

export interface FlexProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof AnimationProps>,
    Omit<VariantProps<typeof flexVariants>, "direction" | "wrap" | "justify" | "align">,
    AnimationProps {
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
  (
    {
      className,
      direction,
      wrap,
      justify,
      align,
      gap,
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

    const baseClassName = cn(
      flexVariants({
        direction: directionValue,
        wrap: wrapValue,
        justify: justifyValue,
        align: alignValue,
      }),
      className,
    );

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

Flex.displayName = "Flex";

export { Flex, flexVariants };
