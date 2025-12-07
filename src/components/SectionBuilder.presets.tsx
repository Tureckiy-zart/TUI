"use client";

/**
 * SectionBuilder Presets
 *
 * Pre-configured layout patterns for common section types.
 * These presets can be used directly or as starting points for customization.
 */

import * as React from "react";

import type {
  GridLayoutConfig,
  SectionBuilderConfig,
  SectionSlotValue,
  SplitLayoutConfig,
  StackedLayoutConfig,
} from "./SectionBuilder.types";

/**
 * Split Layout Preset Props
 */
export interface SplitLayoutPresetProps {
  /**
   * Left content area
   */
  left: SectionSlotValue;
  /**
   * Right content area (optional if media is provided)
   */
  right?: SectionSlotValue;
  /**
   * Media content (image/video)
   */
  media?: SectionSlotValue;
  /**
   * Image position
   * @default "right"
   */
  imagePosition?: "left" | "right";
  /**
   * Gap between content areas
   * @default "xl"
   */
  gap?: SplitLayoutConfig["gap"];
  /**
   * Alignment of items
   * @default "center"
   */
  align?: SplitLayoutConfig["align"];
  /**
   * Background configuration
   */
  background?: SectionBuilderConfig["background"];
  /**
   * Spacing configuration
   */
  spacing?: SectionBuilderConfig["spacing"];
}

/**
 * Create a split layout configuration
 *
 * Left/right content areas with optional image positioning.
 * Responsive: stacks vertically on mobile.
 *
 * @example
 * ```tsx
 * <SectionBuilder
 *   config={createSplitLayoutConfig({
 *     left: "Left content",
 *     right: "Right content",
 *     media: <img src="..." />,
 *     imagePosition: "right",
 *   })}
 * />
 * ```
 */
export function createSplitLayoutConfig(props: SplitLayoutPresetProps): SectionBuilderConfig {
  const {
    left,
    right,
    media,
    imagePosition = "right",
    gap = "xl",
    align = "center",
    background,
    spacing,
  } = props;

  const layout: SplitLayoutConfig = {
    type: "split",
    imagePosition,
    gap,
    align,
    justify: "start",
    left,
    right,
    media,
    // Responsive: stack on mobile
    direction: {
      base: "column",
      md: "row",
    },
  };

  return {
    layout,
    background: background || { type: "none" },
    spacing: spacing || {
      paddingY: "xl",
    },
  };
}

/**
 * Feature Item for Feature Grid
 */
export interface FeatureItem {
  /**
   * Icon or visual element
   */
  icon?: React.ReactNode;
  /**
   * Feature title
   */
  title: string;
  /**
   * Feature description
   */
  description: string;
  /**
   * Optional custom content
   */
  content?: React.ReactNode;
}

/**
 * Feature Grid Preset Props
 */
export interface FeatureGridPresetProps {
  /**
   * Array of feature items
   */
  features: FeatureItem[];
  /**
   * Section title (optional)
   */
  title?: string;
  /**
   * Section description (optional)
   */
  description?: string;
  /**
   * Number of columns
   * @default 3
   */
  columns?: 1 | 2 | 3 | 4;
  /**
   * Gap between grid items
   * @default "lg"
   */
  gap?: GridLayoutConfig["gap"];
  /**
   * Background configuration
   */
  background?: SectionBuilderConfig["background"];
  /**
   * Spacing configuration
   */
  spacing?: SectionBuilderConfig["spacing"];
}

/**
 * Create a feature grid configuration
 *
 * Grid of feature items with icons, titles, and descriptions.
 * Responsive columns: 1 on mobile, 2-4 on desktop.
 *
 * @example
 * ```tsx
 * <SectionBuilder
 *   config={createFeatureGridConfig({
 *     title: "Features",
 *     features: [
 *       { icon: <Icon />, title: "Fast", description: "Lightning fast" },
 *       { icon: <Icon />, title: "Secure", description: "Bank-level security" },
 *     ],
 *     columns: 3,
 *   })}
 * />
 * ```
 */
export function createFeatureGridConfig(props: FeatureGridPresetProps): SectionBuilderConfig {
  const { features, title, description, columns = 3, gap = "lg", background, spacing } = props;

  // Convert features to grid items
  const items: SectionSlotValue[] = features.map((feature) => ({
    type: "text",
    content: (
      <div className="space-y-md">
        {feature.icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {feature.icon}
          </div>
        )}
        <h3 className="text-xl font-semibold">{feature.title}</h3>
        <p className="text-muted-foreground">{feature.description}</p>
        {feature.content}
      </div>
    ),
  }));

  const layout: GridLayoutConfig = {
    type: "grid",
    columns: {
      base: 1,
      md: columns >= 2 ? 2 : 1,
      lg: columns,
    },
    gap,
    align: "stretch",
    justify: "start",
    items,
  };

  // Build slots
  const slots: SectionBuilderConfig["slots"] = {};
  if (title) {
    slots.header = {
      type: "text",
      content: title,
      typography: {
        level: 2,
        size: "3xl",
      },
    };
  }
  if (description) {
    slots.body = {
      type: "text",
      content: description,
      typography: {
        size: "lg",
        variant: "muted",
      },
    };
  }

  return {
    layout,
    background: background || { type: "none" },
    spacing: spacing || {
      paddingY: "xl",
    },
    slots: Object.keys(slots).length > 0 ? slots : undefined,
  };
}

/**
 * Testimonial Item
 */
export interface TestimonialItem {
  /**
   * Quote text
   */
  quote: string;
  /**
   * Author name
   */
  author: string;
  /**
   * Author role/title (optional)
   */
  role?: string;
  /**
   * Author avatar (optional)
   */
  avatar?: React.ReactNode;
  /**
   * Rating (optional)
   */
  rating?: number;
}

/**
 * Testimonial Preset Props
 */
export interface TestimonialPresetProps {
  /**
   * Array of testimonial items
   */
  testimonials: TestimonialItem[];
  /**
   * Section title (optional)
   */
  title?: string;
  /**
   * Section description (optional)
   */
  description?: string;
  /**
   * Stack direction
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";
  /**
   * Gap between testimonials
   * @default "lg"
   */
  gap?: StackedLayoutConfig["gap"];
  /**
   * Background configuration
   */
  background?: SectionBuilderConfig["background"];
  /**
   * Spacing configuration
   */
  spacing?: SectionBuilderConfig["spacing"];
}

/**
 * Create a testimonial section configuration
 *
 * Stack of testimonial cards with quotes, author info, and optional avatars.
 * Uses Stack primitive with spacing and typography tokens.
 *
 * @example
 * ```tsx
 * <SectionBuilder
 *   config={createTestimonialConfig({
 *     title: "What Our Customers Say",
 *     testimonials: [
 *       {
 *         quote: "Amazing product!",
 *         author: "John Doe",
 *         role: "CEO",
 *         avatar: <Avatar />,
 *       },
 *     ],
 *   })}
 * />
 * ```
 */
export function createTestimonialConfig(props: TestimonialPresetProps): SectionBuilderConfig {
  const {
    testimonials,
    title,
    description,
    direction = "vertical",
    gap = "lg",
    background,
    spacing,
  } = props;

  // Convert testimonials to stacked items
  const items: SectionSlotValue[] = testimonials.map((testimonial) => ({
    type: "text",
    content: (
      <div className="rounded-lg border bg-card p-lg shadow-sm">
        <div className="space-y-md">
          {/* Quote */}
          <blockquote className="text-lg italic text-foreground">{testimonial.quote}</blockquote>

          {/* Rating */}
          {testimonial.rating && (
            <div className="flex items-center gap-xs">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < testimonial.rating! ? "text-yellow-500" : "text-muted"}
                >
                  ★
                </span>
              ))}
            </div>
          )}

          {/* Author */}
          <div className="flex items-center gap-md">
            {testimonial.avatar && (
              <div className="h-10 w-10 overflow-hidden rounded-full">{testimonial.avatar}</div>
            )}
            <div>
              <div className="font-semibold">{testimonial.author}</div>
              {testimonial.role && (
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    ),
  }));

  const layout: StackedLayoutConfig = {
    type: "stacked",
    direction,
    gap,
    align: "stretch",
    justify: "start",
    items,
  };

  // Build slots
  const slots: SectionBuilderConfig["slots"] = {};
  if (title) {
    slots.header = {
      type: "text",
      content: title,
      typography: {
        level: 2,
        size: "3xl",
      },
    };
  }
  if (description) {
    slots.body = {
      type: "text",
      content: description,
      typography: {
        size: "lg",
        variant: "muted",
      },
    };
  }

  const config: SectionBuilderConfig = {
    layout,
    background: background || { type: "none" },
    spacing: spacing || {
      paddingY: "xl",
    },
    slots: Object.keys(slots).length > 0 ? slots : undefined,
  };

  return config;
}
