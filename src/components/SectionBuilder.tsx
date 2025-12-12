"use client";

/**
 * SectionBuilder Component
 *
 * High-level component that composes layout primitives and core components
 * based on configuration objects. Enables developers to construct custom
 * marketing sections without writing repetitive markup.
 *
 * All styling uses design tokens - no raw CSS values or hardcoded styles.
 * Fully theme-aware and brand-compliant.
 */

import * as React from "react";

import { resolveComponentAnimations } from "@/animation/utils";
import { Box } from "@/components/layout/Box";
import { Flex } from "@/components/layout/Flex";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { getBaseValue, getRadiusCSSVar } from "@/lib/responsive-props";
import { cn } from "@/lib/utils";

import type { ResponsiveColor } from "./layout/layout.types";
import type {
  BackgroundConfig,
  LayoutConfig,
  SectionBuilderConfig,
  SectionBuilderProps,
  SectionSlotValue,
  SpacingConfig,
  StructuredSlot,
} from "./SectionBuilder.types";

/**
 * Resolve background configuration to Box bg prop or inline style
 * Returns object with bg prop and optional style for surface colors
 */
function resolveBackground(background: BackgroundConfig | undefined): {
  bg?: ResponsiveColor;
  style?: React.CSSProperties;
} {
  if (!background || background.type === "none") {
    return {};
  }

  if (background.type === "surface") {
    // Surface colors use CSS variables set by theme system
    // Map to CSS variable format: hsl(var(--surface-*))
    const surfaceVarMap: Record<string, string> = {
      base: "hsl(var(--surface-base))",
      elevated1: "hsl(var(--surface-elevated1))",
      elevated2: "hsl(var(--surface-elevated2))",
      elevated3: "hsl(var(--surface-elevated3))",
      overlay: "hsl(var(--surface-overlay))",
      glass: "hsl(var(--surface-glass))",
    };

    const bgColor = surfaceVarMap[background.variant];
    if (bgColor) {
      // Use inline style for surface colors since Box bg prop expects token names
      return {
        style: { backgroundColor: bgColor },
      };
    }

    // Fallback to token-based colors
    if (background.variant === "base") {
      return { bg: "background" };
    }
    if (background.variant === "elevated1" || background.variant === "elevated2") {
      return { bg: "card" };
    }
    if (background.variant === "elevated3") {
      return { bg: "muted" };
    }
  }

  if (background.type === "color") {
    // ResponsiveColor is already Responsive<ColorToken>
    // Box component handles the conversion via getColorCSSVar
    // Return the ResponsiveColor directly - Box.bg accepts ResponsiveColor
    return { bg: background.value };
  }

  return {};
}

/**
 * Resolve spacing configuration to Box props
 */
function resolveSpacing(spacing: SpacingConfig | undefined) {
  if (!spacing) {
    return {};
  }

  return {
    p: spacing.padding,
    px: spacing.paddingX,
    py: spacing.paddingY,
    m: spacing.margin,
    mx: spacing.marginX,
    my: spacing.marginY,
  };
}

/**
 * Check if a slot value is a structured slot config
 */
function isStructuredSlot(slot: SectionSlotValue): slot is StructuredSlot {
  return (
    typeof slot === "object" &&
    slot !== null &&
    !React.isValidElement(slot) &&
    "type" in slot &&
    (slot.type === "text" || slot.type === "media" || slot.type === "actions")
  );
}

/**
 * Resolve slot value to ReactNode
 */
function resolveSlot(slot: SectionSlotValue | undefined): React.ReactNode {
  if (!slot) {
    return null;
  }

  // Handle structured slot configs
  if (isStructuredSlot(slot)) {
    if (slot.type === "text") {
      const { content, typography, className } = slot;
      const typoConfig = typography || {};

      if (typeof content === "string") {
        // Use Heading or Text based on level
        if (typoConfig.level) {
          return (
            <Heading level={typoConfig.level} className={cn(className, typoConfig.className)}>
              {content}
            </Heading>
          );
        }
        // Map typography size to Text component supported sizes
        // For sizes > xl, use Heading component instead
        if (typoConfig.size && ["2xl", "3xl", "4xl", "5xl"].includes(typoConfig.size)) {
          // Map large sizes to heading levels
          const levelMap: Record<string, 1 | 2 | 3 | 4 | 5 | 6> = {
            "2xl": 3,
            "3xl": 2,
            "4xl": 1,
            "5xl": 1,
          };
          return (
            <Heading
              level={levelMap[typoConfig.size] || 3}
              className={cn(className, typoConfig.className)}
            >
              {content}
            </Heading>
          );
        }
        const textSize =
          typoConfig.size && ["xs", "sm", "md", "lg", "xl"].includes(typoConfig.size)
            ? (typoConfig.size as "xs" | "sm" | "md" | "lg" | "xl")
            : "md";
        // Map typography variant to Text component supported variants
        // "default" maps to undefined (no variant)
        const textVariant =
          typoConfig.variant && typoConfig.variant !== "default"
            ? (typoConfig.variant as "primary" | "secondary" | "accent" | "muted")
            : undefined;
        return (
          <Text
            size={textSize}
            variant={textVariant}
            className={cn(className, typoConfig.className)}
          >
            {content}
          </Text>
        );
      }
      // If content is ReactNode, render it directly
      return <div className={className}>{content}</div>;
    }

    if (slot.type === "media") {
      const { content, className, aspectRatio } = slot;
      // Get base value from responsive aspect ratio
      const aspectRatioValue = getBaseValue(aspectRatio);

      return (
        <div
          className={cn("w-full", className)}
          style={aspectRatioValue ? { aspectRatio: String(aspectRatioValue) } : undefined}
        >
          {content}
        </div>
      );
    }

    if (slot.type === "actions") {
      const { content, align, justify, gap, className } = slot;
      return (
        <Flex align={align} justify={justify} gap={gap} className={cn("flex-wrap", className)}>
          {content}
        </Flex>
      );
    }
  }

  // Handle simple slot values
  if (typeof slot === "string") {
    // String content - wrap in Text component
    return <Text>{slot}</Text>;
  }

  // Handle slot config object with content property
  if (
    typeof slot === "object" &&
    slot !== null &&
    !React.isValidElement(slot) &&
    "content" in slot
  ) {
    const { content, className, style } = slot as {
      content: React.ReactNode | string;
      className?: string;
      style?: React.CSSProperties;
    };

    if (typeof content === "string") {
      return (
        <div className={className} style={style}>
          <Text>{content}</Text>
        </div>
      );
    }

    return (
      <div className={className} style={style}>
        {content}
      </div>
    );
  }

  // ReactNode - render directly
  return slot as React.ReactNode;
}

/**
 * Resolve split layout to Flex component
 */
function resolveSplitLayout(config: Extract<LayoutConfig, { type: "split" }>): React.ReactElement {
  const {
    imagePosition = "right",
    direction,
    gap = "lg",
    align = "center",
    justify = "start",
    left,
    right,
    media,
  } = config;

  // Determine flex direction based on imagePosition and responsive direction
  const flexDirection: "row" | "column" = direction?.base === "column" ? "column" : "row";

  // Determine order of content and media
  const contentFirst = imagePosition === "left" ? false : true;

  return (
    <Flex
      direction={direction || (flexDirection === "column" ? "column" : "row")}
      gap={gap}
      align={align}
      justify={justify}
      wrap="wrap"
    >
      {/* Left content or media */}
      {contentFirst ? (
        <>
          {left && <div className="min-w-0 flex-1">{resolveSlot(left)}</div>}
          {media && (
            <div className={cn("min-w-0 flex-1", imagePosition === "left" && "order-first")}>
              {resolveSlot(media)}
            </div>
          )}
          {right && <div className="min-w-0 flex-1">{resolveSlot(right)}</div>}
        </>
      ) : (
        <>
          {media && <div className="min-w-0 flex-1">{resolveSlot(media)}</div>}
          {left && <div className="min-w-0 flex-1">{resolveSlot(left)}</div>}
          {right && <div className="min-w-0 flex-1">{resolveSlot(right)}</div>}
        </>
      )}
    </Flex>
  );
}

/**
 * Resolve grid layout to Grid component
 */
function resolveGridLayout(config: Extract<LayoutConfig, { type: "grid" }>): React.ReactElement {
  const {
    columns = 3,
    rows,
    gap = "lg",
    align = "stretch",
    justify = "start",
    items,
    itemRenderer,
  } = config;

  return (
    <Grid cols={columns} rows={rows} gap={gap} align={align} justify={justify}>
      {items.map((item, index) => {
        const content = itemRenderer ? itemRenderer(item, index) : resolveSlot(item);
        return <React.Fragment key={index}>{content}</React.Fragment>;
      })}
    </Grid>
  );
}

/**
 * Resolve stacked layout to Stack component
 */
function resolveStackedLayout(
  config: Extract<LayoutConfig, { type: "stacked" }>,
): React.ReactElement {
  const { gap = "md", align = "stretch", justify = "start", items } = config;

  return (
    <Stack
      gap={gap}
      align={align as "start" | "end" | "center" | "baseline" | "stretch"}
      justify={justify as "start" | "end" | "center" | "between" | "around" | "evenly"}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>{resolveSlot(item)}</React.Fragment>
      ))}
    </Stack>
  );
}

/**
 * Validate layout configuration
 */
function validateLayoutConfig(config: LayoutConfig): void {
  if (!config || !config.type) {
    throw new Error("SectionBuilder: layout configuration is required");
  }

  switch (config.type) {
    case "split":
      if (!config.left && !config.right && !config.media) {
        console.warn(
          "SectionBuilder: Split layout should have at least one of: left, right, or media",
        );
      }
      break;
    case "grid":
      if (!Array.isArray(config.items) || config.items.length === 0) {
        throw new Error("SectionBuilder: Grid layout requires a non-empty items array");
      }
      break;
    case "stacked":
      if (!Array.isArray(config.items) || config.items.length === 0) {
        throw new Error("SectionBuilder: Stacked layout requires a non-empty items array");
      }
      break;
  }
}

/**
 * Validate SectionBuilder configuration
 */
function validateConfig(config: SectionBuilderConfig): void {
  if (!config) {
    throw new Error("SectionBuilder: config is required");
  }

  if (!config.layout) {
    throw new Error("SectionBuilder: layout configuration is required");
  }

  validateLayoutConfig(config.layout);
}

/**
 * Resolve layout configuration to appropriate primitive component
 */
function resolveLayout(config: LayoutConfig): React.ReactElement {
  switch (config.type) {
    case "split":
      return resolveSplitLayout(config);
    case "grid":
      return resolveGridLayout(config);
    case "stacked":
      return resolveStackedLayout(config);
    default:
      // TypeScript exhaustiveness check
      const _exhaustive: never = config;
      throw new Error(`Unknown layout type: ${(_exhaustive as LayoutConfig).type}`);
  }
}

/**
 * SectionBuilder Component
 *
 * Composes sections from configuration objects using layout primitives
 * and core components. All styling uses design tokens.
 *
 * @example
 * ```tsx
 * <SectionBuilder
 *   config={{
 *     layout: {
 *       type: "split",
 *       left: "Left content",
 *       right: "Right content",
 *       imagePosition: "right",
 *     },
 *     background: { type: "surface", variant: "elevated1" },
 *     spacing: { paddingY: "xl" },
 *   }}
 * />
 * ```
 */
export const SectionBuilder = React.forwardRef<HTMLElement, SectionBuilderProps>(
  (
    {
      config,
      layout,
      background,
      spacing: spacingConfig,
      radius,
      slots,
      className,
      style,
      as: Component = "section",
      "aria-label": ariaLabel,
      animation,
      ...props
    },
    ref,
  ) => {
    // Use config prop if provided, otherwise use individual props
    const effectiveConfig: SectionBuilderConfig = config || {
      layout: layout!,
      background,
      spacing: spacingConfig,
      radius,
      slots,
    };

    // Validate configuration in development
    if (process.env.NODE_ENV !== "production") {
      try {
        validateConfig(effectiveConfig);
      } catch (error) {
        console.error("SectionBuilder validation error:", error);
        // In development, we still render but log the error
        // In production, we could choose to throw or render a fallback
      }
    }

    const {
      layout: layoutConfig,
      background: bgConfig,
      spacing,
      radius: radiusValue,
      slots: sectionSlots,
    } = effectiveConfig;

    // Resolve background
    const bgResolution = resolveBackground(bgConfig);

    // Resolve spacing
    const spacingProps = resolveSpacing(spacing);

    // Resolve animation props
    const animationProps = resolveComponentAnimations(animation);

    // Resolve radius
    const radiusStyle = radiusValue
      ? {
          borderRadius: getRadiusCSSVar(
            typeof radiusValue === "string" ? radiusValue : radiusValue.base || "md",
          ),
        }
      : undefined;

    // Resolve slots with memoization for performance
    const headerSlot = React.useMemo(
      () => (sectionSlots?.header ? resolveSlot(sectionSlots.header) : null),
      [sectionSlots?.header],
    );
    const bodySlot = React.useMemo(
      () => (sectionSlots?.body ? resolveSlot(sectionSlots.body) : null),
      [sectionSlots?.body],
    );
    const footerSlot = React.useMemo(
      () => (sectionSlots?.footer ? resolveSlot(sectionSlots.footer) : null),
      [sectionSlots?.footer],
    );
    const overlaySlot = React.useMemo(
      () => (sectionSlots?.overlay ? resolveSlot(sectionSlots.overlay) : null),
      [sectionSlots?.overlay],
    );

    // Resolve layout
    const layoutContent = resolveLayout(layoutConfig);

    // Merge styles (background style from resolution + radius + custom style)
    const mergedStyle: React.CSSProperties = {
      ...bgResolution.style,
      ...radiusStyle,
      ...style,
    };

    // Type-safe component rendering
    const ComponentAny = Component as any;

    return (
      <ComponentAny
        ref={ref}
        aria-label={ariaLabel}
        className={cn("relative", className)}
        style={mergedStyle}
        {...props}
      >
        <Box
          bg={bgResolution.bg}
          {...spacingProps}
          {...animationProps}
          className="relative w-full"
          style={bgResolution.style}
        >
          {headerSlot && <div className="mb-lg">{headerSlot}</div>}
          {bodySlot && <div className="mb-lg">{bodySlot}</div>}
          {layoutContent}
          {footerSlot && <div className="mt-lg">{footerSlot}</div>}
          {overlaySlot && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              {overlaySlot}
            </div>
          )}
        </Box>
      </ComponentAny>
    );
  },
);

SectionBuilder.displayName = "SectionBuilder";

export type { SectionBuilderConfig, SectionBuilderProps } from "./SectionBuilder.types";
