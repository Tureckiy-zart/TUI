/**
 * Layout Primitives Shared Types
 *
 * Common types used across Box, Flex, Grid, and Stack components.
 */

import type { ResponsiveValue } from "@/lib/responsive-props";

/**
 * Spacing token values
 * Supports numeric keys (0-96) and semantic keys (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
 */
export type SpacingValue =
  | number
  | keyof typeof import("@/tokens/spacing").spacing
  | keyof typeof import("@/tokens/spacing").semanticSpacing;

/**
 * Border radius token values
 */
export type RadiusValue = keyof typeof import("@/tokens/radius").borderRadius;

/**
 * Color token values
 * Supports CSS variable names (e.g., "background", "primary", "card")
 */
export type ColorValue =
  | "background"
  | "foreground"
  | "card"
  | "card-foreground"
  | "popover"
  | "popover-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "destructive-foreground"
  | "border"
  | "input"
  | "ring"
  | string; // Allow custom CSS variable names

/**
 * Alignment values for flexbox/grid
 */
export type AlignmentValue = "start" | "end" | "center" | "baseline" | "stretch";

/**
 * Justify content values for flexbox/grid
 */
export type JustifyValue = "start" | "end" | "center" | "between" | "around" | "evenly";

/**
 * Flex direction values
 */
export type FlexDirectionValue = "row" | "column" | "row-reverse" | "column-reverse";

/**
 * Flex wrap values
 */
export type FlexWrapValue = "nowrap" | "wrap" | "wrap-reverse";

/**
 * Grid column values
 */
export type ColumnValue = 1 | 2 | 3 | 4 | 5 | 6 | 12 | "none";

/**
 * Grid row values
 */
export type RowValue = 1 | 2 | 3 | 4 | 5 | 6 | "none";

/**
 * Grid flow values
 */
export type FlowValue = "row" | "col" | "dense" | "row-dense" | "col-dense";

/**
 * Stack direction values
 */
export type StackDirectionValue = "vertical" | "horizontal";

/**
 * Shadow token values (elevation shadows)
 */
export type ShadowValue = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Display type values
 */
export type DisplayValue =
  | "block"
  | "inline"
  | "inline-block"
  | "flex"
  | "grid"
  | "inline-flex"
  | "inline-grid"
  | "none";

/**
 * Responsive spacing prop type
 */
export type ResponsiveSpacing = ResponsiveValue<SpacingValue>;

/**
 * Responsive radius prop type
 */
export type ResponsiveRadius = ResponsiveValue<RadiusValue>;

/**
 * Responsive color prop type
 */
export type ResponsiveColor = ResponsiveValue<ColorValue>;

/**
 * Responsive alignment prop type
 */
export type ResponsiveAlignment = ResponsiveValue<AlignmentValue>;

/**
 * Responsive justify prop type
 */
export type ResponsiveJustify = ResponsiveValue<JustifyValue>;

/**
 * Responsive direction prop type
 */
export type ResponsiveFlexDirection = ResponsiveValue<FlexDirectionValue>;

/**
 * Responsive wrap prop type
 */
export type ResponsiveFlexWrap = ResponsiveValue<FlexWrapValue>;

/**
 * Responsive column prop type
 */
export type ResponsiveColumns = ResponsiveValue<ColumnValue>;

/**
 * Responsive row prop type
 */
export type ResponsiveRows = ResponsiveValue<RowValue>;

/**
 * Responsive flow prop type
 */
export type ResponsiveFlow = ResponsiveValue<FlowValue>;

/**
 * Responsive stack direction prop type
 */
export type ResponsiveStackDirection = ResponsiveValue<StackDirectionValue>;

/**
 * Responsive shadow prop type
 */
export type ResponsiveShadow = ResponsiveValue<ShadowValue>;

/**
 * Surface variant values
 */
export type SurfaceVariant = "flat" | "raised" | "sunken";
