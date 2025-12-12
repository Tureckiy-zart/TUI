/**
 * Layout Primitives Shared Types
 *
 * Common types used across Box, Flex, Grid, and Stack components.
 */

import type {
  ColorToken,
  RadiusToken,
  ResponsiveColor as ResponsiveColorToken,
  ResponsiveRadius as ResponsiveRadiusToken,
  ResponsiveShadow as ResponsiveShadowToken,
  ResponsiveSpace,
  ShadowToken,
  SpacingToken,
} from "@/tokens/types";
import type { Responsive } from "@/types/responsive";

/**
 * Spacing token values
 * Only token key strings are allowed (no numbers)
 * Supports base spacing keys, semantic keys (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl), and layout keys
 */
export type SpacingValue = SpacingToken;

/**
 * Border radius token values
 */
export type RadiusValue = RadiusToken;

/**
 * Color token values
 * Only semantic color tokens are allowed (no raw strings)
 */
export type ColorValue = ColorToken;

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
 * Shadow token values
 */
export type ShadowValue = ShadowToken;

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
export type ResponsiveSpacing = ResponsiveSpace;

/**
 * Responsive radius prop type
 */
export type ResponsiveRadius = ResponsiveRadiusToken;

/**
 * Responsive color prop type
 */
export type ResponsiveColor = ResponsiveColorToken;

/**
 * Responsive alignment prop type
 */
export type ResponsiveAlignment = Responsive<AlignmentValue>;

/**
 * Responsive justify prop type
 */
export type ResponsiveJustify = Responsive<JustifyValue>;

/**
 * Responsive direction prop type
 */
export type ResponsiveFlexDirection = Responsive<FlexDirectionValue>;

/**
 * Responsive wrap prop type
 */
export type ResponsiveFlexWrap = Responsive<FlexWrapValue>;

/**
 * Responsive column prop type
 */
export type ResponsiveColumns = Responsive<ColumnValue>;

/**
 * Responsive row prop type
 */
export type ResponsiveRows = Responsive<RowValue>;

/**
 * Responsive flow prop type
 */
export type ResponsiveFlow = Responsive<FlowValue>;

/**
 * Responsive stack direction prop type
 */
export type ResponsiveStackDirection = Responsive<StackDirectionValue>;

/**
 * Responsive shadow prop type
 */
export type ResponsiveShadow = ResponsiveShadowToken;

/**
 * Surface variant values
 */
export type SurfaceVariant = "flat" | "raised" | "sunken";
