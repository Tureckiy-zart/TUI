/**
 * SectionBuilder Type Definitions
 *
 * TypeScript interfaces and types for the SectionBuilder component.
 * Defines configuration schemas for layout types, content slots, backgrounds,
 * and spacing using the token system.
 */

import type * as React from "react";

import type {
  ResponsiveAlignment,
  ResponsiveColor,
  ResponsiveColumns,
  ResponsiveJustify,
  ResponsiveRadius,
  ResponsiveRows,
  ResponsiveSpacing,
} from "./layout/layout.types";

/**
 * Supported layout types for sections
 */
export type SectionLayoutType = "split" | "grid" | "stacked";

/**
 * Surface background variants
 * Derived from surfaceColors tokens from tokens/colors.ts
 */
export type SurfaceVariant = keyof typeof import("@/tokens/colors").surfaceColors.day;

/**
 * Background configuration
 * Supports surface variants or custom color tokens
 */
export type BackgroundConfig =
  | {
      type: "surface";
      variant: SurfaceVariant;
    }
  | {
      type: "color";
      value: ResponsiveColor;
    }
  | {
      type: "none";
    };

/**
 * Content slot types
 * Slots can be ReactNode, string, or structured config objects
 */
export type SectionSlot =
  | React.ReactNode
  | string
  | {
      content: React.ReactNode | string;
      className?: string;
      style?: React.CSSProperties;
    };

/**
 * Typography configuration for text slots
 */
export interface TypographyConfig {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  variant?: "default" | "muted" | "primary" | "secondary" | "accent";
  className?: string;
}

/**
 * Text slot configuration
 * Wraps string content with Typography component
 */
export interface TextSlotConfig {
  type: "text";
  content: string;
  typography?: TypographyConfig;
  className?: string;
}

/**
 * Media slot configuration
 */
export interface MediaSlotConfig {
  type: "media";
  content: React.ReactNode;
  position?: "left" | "right" | "top" | "bottom" | "center";
  className?: string;
  aspectRatio?: string;
}

/**
 * Actions slot configuration
 * For buttons and CTAs
 */
export interface ActionsSlotConfig {
  type: "actions";
  content: React.ReactNode;
  align?: ResponsiveAlignment;
  justify?: ResponsiveJustify;
  gap?: ResponsiveSpacing;
  className?: string;
}

/**
 * Structured slot configuration
 */
export type StructuredSlot = TextSlotConfig | MediaSlotConfig | ActionsSlotConfig;

/**
 * Section slot definition
 * Can be simple ReactNode, string, or structured config
 */
export type SectionSlotValue = SectionSlot | StructuredSlot;

/**
 * Split layout configuration
 * Left/right content areas with optional image positioning
 */
export interface SplitLayoutConfig {
  type: "split";
  /**
   * Image/media position
   * @default "right"
   */
  imagePosition?: "left" | "right";
  /**
   * Responsive direction override
   * If provided, overrides imagePosition behavior
   */
  direction?: {
    base?: "row" | "column";
    sm?: "row" | "column";
    md?: "row" | "column";
    lg?: "row" | "column";
    xl?: "row" | "column";
  };
  /**
   * Gap between left and right content
   */
  gap?: ResponsiveSpacing;
  /**
   * Alignment of items
   */
  align?: ResponsiveAlignment;
  /**
   * Justify content
   */
  justify?: ResponsiveJustify;
  /**
   * Left content area
   */
  left?: SectionSlotValue;
  /**
   * Right content area
   */
  right?: SectionSlotValue;
  /**
   * Media content (image/video)
   */
  media?: SectionSlotValue;
}

/**
 * Grid layout configuration
 * Grid of items with configurable columns and rows
 */
export interface GridLayoutConfig {
  type: "grid";
  /**
   * Number of columns
   */
  columns?: ResponsiveColumns;
  /**
   * Number of rows (optional, auto by default)
   */
  rows?: ResponsiveRows;
  /**
   * Gap between grid items
   */
  gap?: ResponsiveSpacing;
  /**
   * Alignment of grid items
   */
  align?: ResponsiveAlignment;
  /**
   * Justify content
   */
  justify?: ResponsiveJustify;
  /**
   * Grid items array
   */
  items: SectionSlotValue[];
  /**
   * Item renderer function (optional)
   * If provided, each item will be wrapped with this renderer
   */
  itemRenderer?: (item: SectionSlotValue, index: number) => React.ReactNode;
}

/**
 * Stacked layout configuration
 * Vertical or horizontal stacking with spacing
 */
export interface StackedLayoutConfig {
  type: "stacked";
  /**
   * Stack direction
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";
  /**
   * Gap between stacked items
   */
  gap?: ResponsiveSpacing;
  /**
   * Alignment of items
   */
  align?: ResponsiveAlignment;
  /**
   * Justify content
   */
  justify?: ResponsiveJustify;
  /**
   * Stacked items array
   */
  items: SectionSlotValue[];
}

/**
 * Layout configuration union type
 */
export type LayoutConfig = SplitLayoutConfig | GridLayoutConfig | StackedLayoutConfig;

/**
 * Spacing configuration for section wrapper
 */
export interface SpacingConfig {
  /**
   * Padding (all sides)
   */
  padding?: ResponsiveSpacing;
  /**
   * Padding horizontal
   */
  paddingX?: ResponsiveSpacing;
  /**
   * Padding vertical
   */
  paddingY?: ResponsiveSpacing;
  /**
   * Margin (all sides)
   */
  margin?: ResponsiveSpacing;
  /**
   * Margin horizontal
   */
  marginX?: ResponsiveSpacing;
  /**
   * Margin vertical
   */
  marginY?: ResponsiveSpacing;
}

/**
 * Main SectionBuilder configuration
 */
export interface SectionBuilderConfig {
  /**
   * Layout configuration
   * Defines the layout type and its specific settings
   */
  layout: LayoutConfig;
  /**
   * Background configuration
   * @default { type: "none" }
   */
  background?: BackgroundConfig;
  /**
   * Spacing configuration
   * Applied to the section wrapper
   */
  spacing?: SpacingConfig;
  /**
   * Border radius
   */
  radius?: ResponsiveRadius;
  /**
   * Content slots
   * These are rendered in addition to layout-specific content
   */
  slots?: {
    /**
     * Header slot (above main content)
     */
    header?: SectionSlotValue;
    /**
     * Body slot (main content area)
     */
    body?: SectionSlotValue;
    /**
     * Footer slot (below main content)
     */
    footer?: SectionSlotValue;
    /**
     * Overlay slot (rendered on top with absolute positioning)
     */
    overlay?: SectionSlotValue;
  };
  /**
   * Custom className for section wrapper
   */
  className?: string;
  /**
   * Custom style for section wrapper
   */
  style?: React.CSSProperties;
  /**
   * HTML element to render as
   * @default "section"
   */
  as?: keyof React.JSX.IntrinsicElements;
  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
}

/**
 * SectionBuilder component props
 * Extends the config with standard React props
 */
export interface SectionBuilderProps
  extends Omit<SectionBuilderConfig, "as" | "aria-label" | "style" | "className">,
    Omit<React.HTMLAttributes<HTMLElement>, "style" | "className"> {
  /**
   * Configuration object (alternative to individual props)
   * If provided, other props are ignored
   */
  config?: SectionBuilderConfig;
  /**
   * HTML element to render as
   * @default "section"
   */
  as?: keyof React.JSX.IntrinsicElements;
  /**
   * Custom className for section wrapper
   */
  className?: string;
  /**
   * Custom style for section wrapper
   */
  style?: React.CSSProperties;
}
