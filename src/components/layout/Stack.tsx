/**
 * Stack Primitive Component
 *
 * Token-driven stack layout component with support for vertical/horizontal
 * direction, spacing, alignment, and responsive props using CSS variables.
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

export interface StackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof AnimationProps>,
    Omit<VariantProps<typeof stackVariants>, "align" | "justify">,
    AnimationProps {
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
  (
    {
      className,
      direction,
      spacing,
      align,
      justify,
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
      stackVariants({
        align: alignValue,
        justify: justifyValue,
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

Stack.displayName = "Stack";

export { Stack, stackVariants };
