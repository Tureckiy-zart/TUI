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
 * @enforcement TUNG_BOX_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL spacing values MUST be token-based (ResponsiveSpacing)
 * - ALL radius values MUST be token-based (ResponsiveRadius)
 * - ALL color values MUST be token-based (ResponsiveColor)
 * - ALL shadow values MUST be token-based (ShadowValue)
 * - NO raw CSS spacing values allowed
 * - NO raw numeric values allowed
 * - Spacing uses getSpacingCSSVar() to convert tokens to CSS variables
 * - Radius uses getRadiusCSSVar() to convert tokens to CSS variables
 * - Colors use getColorCSSVar() to convert tokens to CSS variables
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Spacing props accept ResponsiveSpacing (semantic spacing tokens: xs, sm, md, lg, xl, etc.)
 * - Spacing is applied via inline styles using CSS variables (--spacing-*)
 * - NO raw Tailwind spacing classes (p-4, m-2, etc.) allowed
 *
 * Color Authority Rules:
 * - ALL color values MUST come from color token system
 * - Background color prop accepts ResponsiveColor (semantic color tokens)
 * - Colors are applied via inline styles using CSS variables (--color-*)
 * - NO raw Tailwind color classes (bg-red-500, bg-[hsl(var(--tm-primary))], etc.) allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Radius prop accepts ResponsiveRadius (semantic radius tokens: xs, sm, md, lg, xl, full)
 * - Radius is applied via inline styles using CSS variables (--radius-*)
 * - NO raw Tailwind radius classes (rounded-md, rounded-lg, etc.) allowed
 *
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Spacing Authority: Box uses spacing token system exclusively via CSS variables
 * - Color Authority: Box uses color token system exclusively via CSS variables
 * - Radius Authority: Box uses radius token system exclusively via CSS variables
 * - Layout Authority: Box follows layout primitive patterns (no composition semantics)
 *
 * Token-only contract:
 * - All spacing values are defined in spacing token system (src/FOUNDATION/tokens/spacing.ts)
 * - All color values are defined in color token system (src/FOUNDATION/tokens/colors.ts)
 * - All radius values are defined in radius token system (src/FOUNDATION/tokens/radius.ts)
 * - All shadow values are defined in shadow token system
 * - Spacing tokens reference foundation spacing scale (8px grid system)
 * - No raw CSS spacing values are allowed
 * - TypeScript enforces valid spacing/radius/color token values at compile time
 *
 * @component Box
 * @see {@link ./Box.stories.tsx} - Storybook examples
 *
 * @example
 * // Basic container with padding
 * <Box px="md" py="md" radius="lg" bg="background">
 *   Content
 * </Box>
 *
 * @example
 * // With semantic spacing tokens
 * <Box px="lg" py="md" m="sm">
 *   Content with spacing
 * </Box>
 *
 * @example
 * // With responsive values
 * <Box px={{ base: 2, md: 4, lg: 6 }} py={{ base: 2, md: 4 }}>
 *   Responsive padding
 * </Box>
 *
 * @example
 * // Render as different HTML element
 * <Box as="section" px="md" py="md">
 *   Section content
 * </Box>
 *
 * @example
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
   * @example
   * <Box as="section">Section content</Box>
   * @example
   * <Box as="article">Article content</Box>
   * @example
   * <Box as="aside">Sidebar content</Box>
   */
  as?: keyof React.JSX.IntrinsicElements;

  /**
   * Padding horizontal (left + right)
   * @example
   * // Semantic token
   * <Box px="md">Content</Box>
   * @example
   * // Numeric token
   * <Box px={4}>Content</Box>
   * @example
   * // Responsive value
   * <Box px={{ base: 2, md: 4, lg: 6 }}>Content</Box>
   */
  px?: ResponsiveSpacing;

  /**
   * Padding vertical (top + bottom)
   * @example
   * // Semantic token
   * <Box py="md">Content</Box>
   * @example
   * // Numeric token
   * <Box py={4}>Content</Box>
   * @example
   * // Responsive value
   * <Box py={{ base: 2, md: 4 }}>Content</Box>
   */
  py?: ResponsiveSpacing;

  /**
   * Margin (all sides) - token-based
   * @example
   * // Semantic token
   * <Box m="md">Content</Box>
   * @example
   * // Numeric token
   * <Box m={4}>Content</Box>
   * @example
   * // Responsive value
   * <Box m={{ base: 2, md: 4 }}>Content</Box>
   */
  m?: ResponsiveSpacing;

  /**
   * Margin horizontal (left + right)
   * @example
   * // Semantic token
   * <Box mx="md">Content</Box>
   * @example
   * // Numeric token
   * <Box mx={4}>Content</Box>
   * @example
   * // Responsive value
   * <Box mx={{ base: 2, md: 4 }}>Content</Box>
   */
  mx?: ResponsiveSpacing;

  /**
   * Margin vertical (top + bottom)
   * @example
   * // Semantic token
   * <Box my="md">Content</Box>
   * @example
   * // Numeric token
   * <Box my={4}>Content</Box>
   * @example
   * // Responsive value
   * <Box my={{ base: 2, md: 4 }}>Content</Box>
   */
  my?: ResponsiveSpacing;

  /**
   * Margin top
   * @example
   * // Semantic token
   * <Box mt="md">Content</Box>
   * @example
   * // Numeric token
   * <Box mt={4}>Content</Box>
   * @example
   * // Responsive value
   * <Box mt={{ base: 2, md: 4 }}>Content</Box>
   */
  mt?: ResponsiveSpacing;

  /**
   * Margin right
   * @example
   * // Semantic token
   * <Box mr="md">Content</Box>
   * @example
   * // Numeric token
   * <Box mr={4}>Content</Box>
   * @example
   * // Responsive value
   * <Box mr={{ base: 2, md: 4 }}>Content</Box>
   */
  mr?: ResponsiveSpacing;

  /**
   * Margin bottom
   * @example
   * // Semantic token
   * <Box mb="md">Content</Box>
   * @example
   * // Numeric token
   * <Box mb={4}>Content</Box>
   * @example
   * // Responsive value
   * <Box mb={{ base: 2, md: 4 }}>Content</Box>
   */
  mb?: ResponsiveSpacing;

  /**
   * Margin left
   * @example
   * // Semantic token
   * <Box ml="md">Content</Box>
   * @example
   * // Numeric token
   * <Box ml={4}>Content</Box>
   * @example
   * // Responsive value
   * <Box ml={{ base: 2, md: 4 }}>Content</Box>
   */
  ml?: ResponsiveSpacing;

  /**
   * Border radius - token-based (none, xs, sm, md, lg, xl, 2xl, 3xl, full)
   * @example
   * // Small radius
   * <Box radius="sm" bg="muted">Content</Box>
   * @example
   * // Medium radius
   * <Box radius="md" bg="muted">Content</Box>
   * @example
   * // Large radius
   * <Box radius="lg" bg="muted">Content</Box>
   * @example
   * // Full radius (pill)
   * <Box radius="full" bg="muted">Content</Box>
   * @example
   * // Responsive value
   * <Box radius={{ base: "sm", md: "lg" }} bg="muted">Content</Box>
   */
  radius?: ResponsiveRadius;

  /**
   * Shadow - token-based (none, xs, sm, md, lg, xl, 2xl)
   * @example
   * // Small shadow
   * <Box shadow="sm" bg="background">Content</Box>
   * @example
   * // Medium shadow
   * <Box shadow="md" bg="background">Content</Box>
   * @example
   * // Large shadow
   * <Box shadow="lg" bg="background">Content</Box>
   * @example
   * // Extra large shadow
   * <Box shadow="xl" bg="background">Content</Box>
   */
  shadow?: ShadowValue;

  /**
   * Background color - token-based
   * @example
   * // Background color
   * <Box bg="background">Content</Box>
   * @example
   * // Card background
   * <Box bg="card">Content</Box>
   * @example
   * // Muted background
   * <Box bg="muted">Content</Box>
   * @example
   * // Primary background
   * <Box bg="primary" className="text-[hsl(var(--tm-primary-foreground))]">Content</Box>
   * @example
   * // Responsive value
   * <Box bg={{ base: "background", md: "card" }}>Content</Box>
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
