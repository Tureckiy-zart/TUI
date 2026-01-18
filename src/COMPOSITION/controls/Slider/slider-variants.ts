/**
 * Slider Variants
 *
 * Token-driven CVA variants for Slider component.
 * All visual properties use token unions exclusively.
 */

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { SLIDER_TOKENS } from "@/FOUNDATION/tokens/components/slider";

import type { SliderOrientation, SliderSize, SliderVariant } from "./Slider";

/**
 * Slider root container variants
 */
const sliderRootVariants = tokenCVA({
  // Base styles
  base: "relative flex touch-none select-none items-center",
  variants: {
    size: {
      sm: "", // Container size for small (orientation-specific)
      md: "", // Container size for medium (orientation-specific)
      lg: "", // Container size for large (orientation-specific)
    } satisfies Record<SliderSize, string>,
    variant: {
      primary: "",
      secondary: "",
      outline: "",
    } satisfies Record<SliderVariant, string>,
    orientation: {
      horizontal: "w-full flex-row",
      vertical: "h-full flex-col",
    } satisfies Record<SliderOrientation, string>,
  },
  compoundVariants: [
    // Horizontal sizes (height)
    { orientation: "horizontal", size: "sm", class: SLIDER_TOKENS.root.size.sm.height },
    { orientation: "horizontal", size: "md", class: SLIDER_TOKENS.root.size.md.height },
    { orientation: "horizontal", size: "lg", class: SLIDER_TOKENS.root.size.lg.height },
    // Vertical sizes (width)
    { orientation: "vertical", size: "sm", class: SLIDER_TOKENS.root.size.sm.width },
    { orientation: "vertical", size: "md", class: SLIDER_TOKENS.root.size.md.width },
    { orientation: "vertical", size: "lg", class: SLIDER_TOKENS.root.size.lg.width },
  ],
  defaultVariants: {
    size: "md",
    variant: "primary",
    orientation: "horizontal",
  },
});

/**
 * Slider track variants (background track)
 */
const sliderTrackVariants = tokenCVA({
  // Base styles - rounded track with transition
  base: "relative grow overflow-hidden rounded-full transition-colors",
  variants: {
    size: {
      sm: "", // Track thickness (orientation-specific)
      md: "", // Track thickness (orientation-specific)
      lg: "", // Track thickness (orientation-specific)
    } satisfies Record<SliderSize, string>,
    variant: {
      primary: "bg-[hsl(var(--tm-primary))]-200 dark:bg-[hsl(var(--tm-primary))]-800",
      secondary: "bg-secondary-200 dark:bg-secondary-800",
      outline: "bg-[hsl(var(--tm-border-default))]",
    } satisfies Record<SliderVariant, string>,
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    } satisfies Record<SliderOrientation, string>,
  },
  compoundVariants: [
    // Horizontal track heights
    { orientation: "horizontal", size: "sm", class: SLIDER_TOKENS.track.size.sm.height },
    { orientation: "horizontal", size: "md", class: SLIDER_TOKENS.track.size.md.height },
    { orientation: "horizontal", size: "lg", class: SLIDER_TOKENS.track.size.lg.height },
    // Vertical track widths
    { orientation: "vertical", size: "sm", class: SLIDER_TOKENS.track.size.sm.width },
    { orientation: "vertical", size: "md", class: SLIDER_TOKENS.track.size.md.width },
    { orientation: "vertical", size: "lg", class: SLIDER_TOKENS.track.size.lg.width },
  ],
  defaultVariants: {
    size: "md",
    variant: "primary",
    orientation: "horizontal",
  },
});

/**
 * Slider range variants (filled portion)
 */
const sliderRangeVariants = tokenCVA({
  // Base styles - absolute positioning for range fill
  base: "absolute transition-colors",
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    } satisfies Record<SliderSize, string>,
    variant: {
      primary: "bg-[hsl(var(--tm-primary))]-600 dark:bg-[hsl(var(--tm-primary))]-500",
      secondary: "bg-secondary-600 dark:bg-secondary-500",
      outline: "bg-[hsl(var(--tm-primary))]-600 dark:bg-[hsl(var(--tm-primary))]-500",
    } satisfies Record<SliderVariant, string>,
    orientation: {
      horizontal: "h-full",
      vertical: "w-full",
    } satisfies Record<SliderOrientation, string>,
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
    orientation: "horizontal",
  },
});

/**
 * Slider thumb variants (draggable handle)
 */
const sliderThumbVariants = tokenCVA({
  // Base styles - circular thumb with focus ring
  base: [
    "block rounded-full border-2 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  variants: {
    size: {
      sm: `${SLIDER_TOKENS.thumb.size.sm.height} ${SLIDER_TOKENS.thumb.size.sm.width}`, // Thumb size: 16px
      md: `${SLIDER_TOKENS.thumb.size.md.height} ${SLIDER_TOKENS.thumb.size.md.width}`, // Thumb size: 20px
      lg: `${SLIDER_TOKENS.thumb.size.lg.height} ${SLIDER_TOKENS.thumb.size.lg.width}`, // Thumb size: 24px
    } satisfies Record<SliderSize, string>,
    variant: {
      primary: [
        "border-[hsl(var(--tm-primary))]-600 bg-[hsl(var(--tm-surface-base))]",
        "dark:border-[hsl(var(--tm-primary))]-500",
        "focus-visible:ring-primary-600 dark:focus-visible:ring-primary-500",
      ].join(" "),
      secondary: [
        "border-[hsl(var(--tm-secondary))]/60 bg-[hsl(var(--tm-surface-base))]",
        "dark:border-secondary-500",
        "focus-visible:ring-secondary-600 dark:focus-visible:ring-secondary-500",
      ].join(" "),
      outline: [
        "border-[hsl(var(--tm-primary))]-600 bg-[hsl(var(--tm-surface-base))]",
        "dark:border-[hsl(var(--tm-primary))]-500",
        "focus-visible:ring-primary-600 dark:focus-visible:ring-primary-500",
      ].join(" "),
    } satisfies Record<SliderVariant, string>,
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

/**
 * Slider mark variants (visual tick marks)
 * Note: pointer-events-none is applied via wrapper div in component, not in base state
 */
const sliderMarkVariants = tokenCVA({
  // Base styles - absolute positioned mark with dot
  base: "absolute flex items-center justify-center",
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    } satisfies Record<SliderSize, string>,
    orientation: {
      horizontal: "flex-col top-full -translate-x-1/2",
      vertical: "flex-row left-full -translate-y-1/2",
    } satisfies Record<SliderOrientation, string>,
  },
  compoundVariants: [
    // Horizontal mark positioning
    {
      orientation: "horizontal",
      size: "sm",
      class: SLIDER_TOKENS.mark.label.marginTop.sm,
    },
    {
      orientation: "horizontal",
      size: "md",
      class: SLIDER_TOKENS.mark.label.marginTop.md,
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: SLIDER_TOKENS.mark.label.marginTop.lg,
    },
    // Vertical mark positioning
    {
      orientation: "vertical",
      size: "sm",
      class: SLIDER_TOKENS.mark.label.marginLeft.sm,
    },
    {
      orientation: "vertical",
      size: "md",
      class: SLIDER_TOKENS.mark.label.marginLeft.md,
    },
    {
      orientation: "vertical",
      size: "lg",
      class: SLIDER_TOKENS.mark.label.marginLeft.lg,
    },
  ],
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
});

/**
 * Slider mark dot variants (the actual tick mark)
 */
const sliderMarkDotVariants = tokenCVA({
  // Base styles - small circular dot
  base: "rounded-full bg-[hsl(var(--tm-border-default))] transition-colors",
  variants: {
    size: {
      sm: `${SLIDER_TOKENS.mark.dot.size.sm.width} ${SLIDER_TOKENS.mark.dot.size.sm.height}`,
      md: `${SLIDER_TOKENS.mark.dot.size.md.width} ${SLIDER_TOKENS.mark.dot.size.md.height}`,
      lg: `${SLIDER_TOKENS.mark.dot.size.lg.width} ${SLIDER_TOKENS.mark.dot.size.lg.height}`,
    } satisfies Record<SliderSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Slider mark label variants
 */
const sliderMarkLabelVariants = tokenCVA({
  // Base styles - label text
  base: "text-[hsl(var(--tm-text-muted))] whitespace-nowrap",
  variants: {
    size: {
      sm: SLIDER_TOKENS.mark.label.fontSize.sm,
      md: SLIDER_TOKENS.mark.label.fontSize.md,
      lg: SLIDER_TOKENS.mark.label.fontSize.lg,
    } satisfies Record<SliderSize, string>,
    orientation: {
      horizontal: "",
      vertical: "",
    } satisfies Record<SliderOrientation, string>,
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      class: SLIDER_TOKENS.mark.label.marginTop.sm,
    },
    {
      orientation: "horizontal",
      size: "md",
      class: SLIDER_TOKENS.mark.label.marginTop.md,
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: SLIDER_TOKENS.mark.label.marginTop.lg,
    },
    {
      orientation: "vertical",
      size: "sm",
      class: SLIDER_TOKENS.mark.label.marginLeft.sm,
    },
    {
      orientation: "vertical",
      size: "md",
      class: SLIDER_TOKENS.mark.label.marginLeft.md,
    },
    {
      orientation: "vertical",
      size: "lg",
      class: SLIDER_TOKENS.mark.label.marginLeft.lg,
    },
  ],
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
});

/**
 * Combined slider variants
 * Returns all variant classes for root, track, range, thumb, and marks
 */
export const sliderVariants = ({
  size,
  variant,
  orientation,
}: {
  size?: SliderSize;
  variant?: SliderVariant;
  orientation?: SliderOrientation;
}) => ({
  root: () => sliderRootVariants({ size, variant, orientation }),
  track: () => sliderTrackVariants({ size, variant, orientation }),
  range: () => sliderRangeVariants({ size, variant, orientation }),
  thumb: () => sliderThumbVariants({ size, variant }),
  mark: () => sliderMarkVariants({ size, orientation }),
  markDot: () => sliderMarkDotVariants({ size }),
  markLabel: () => sliderMarkLabelVariants({ size, orientation }),
});
