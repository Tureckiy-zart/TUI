/**
 * RangeSlider Variants
 *
 * Token-driven CVA variants for RangeSlider component.
 * All visual properties use token unions exclusively.
 */

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { RANGESLIDER_TOKENS } from "@/FOUNDATION/tokens/components/rangeslider";

import type { RangeSliderOrientation, RangeSliderSize, RangeSliderVariant } from "./RangeSlider";

/**
 * RangeSlider root container variants
 */
const rangeSliderRootVariants = tokenCVA({
  base: "relative flex touch-none select-none items-center",
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    } satisfies Record<RangeSliderSize, string>,
    variant: {
      primary: "",
      secondary: "",
      outline: "",
    } satisfies Record<RangeSliderVariant, string>,
    orientation: {
      horizontal: "w-full flex-row",
      vertical: "h-full flex-col",
    } satisfies Record<RangeSliderOrientation, string>,
  },
  compoundVariants: [
    // Horizontal sizes (height)
    {
      orientation: "horizontal",
      size: "sm",
      class: RANGESLIDER_TOKENS.root.size.sm.height,
    },
    {
      orientation: "horizontal",
      size: "md",
      class: RANGESLIDER_TOKENS.root.size.md.height,
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: RANGESLIDER_TOKENS.root.size.lg.height,
    },
    // Vertical sizes (width)
    {
      orientation: "vertical",
      size: "sm",
      class: RANGESLIDER_TOKENS.root.size.sm.width,
    },
    {
      orientation: "vertical",
      size: "md",
      class: RANGESLIDER_TOKENS.root.size.md.width,
    },
    {
      orientation: "vertical",
      size: "lg",
      class: RANGESLIDER_TOKENS.root.size.lg.width,
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "primary",
    orientation: "horizontal",
  },
});

/**
 * RangeSlider track variants (background track)
 */
const rangeSliderTrackVariants = tokenCVA({
  base: "relative grow overflow-hidden rounded-full transition-colors",
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    } satisfies Record<RangeSliderSize, string>,
    variant: {
      primary: RANGESLIDER_TOKENS.track.variant.primary,
      secondary: RANGESLIDER_TOKENS.track.variant.secondary,
      outline: RANGESLIDER_TOKENS.track.variant.outline,
    } satisfies Record<RangeSliderVariant, string>,
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    } satisfies Record<RangeSliderOrientation, string>,
  },
  compoundVariants: [
    // Horizontal track heights
    {
      orientation: "horizontal",
      size: "sm",
      class: RANGESLIDER_TOKENS.track.size.sm.height,
    },
    {
      orientation: "horizontal",
      size: "md",
      class: RANGESLIDER_TOKENS.track.size.md.height,
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: RANGESLIDER_TOKENS.track.size.lg.height,
    },
    // Vertical track widths
    {
      orientation: "vertical",
      size: "sm",
      class: RANGESLIDER_TOKENS.track.size.sm.width,
    },
    {
      orientation: "vertical",
      size: "md",
      class: RANGESLIDER_TOKENS.track.size.md.width,
    },
    {
      orientation: "vertical",
      size: "lg",
      class: RANGESLIDER_TOKENS.track.size.lg.width,
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "primary",
    orientation: "horizontal",
  },
});

/**
 * RangeSlider range variants (filled portion between thumbs)
 */
const rangeSliderRangeVariants = tokenCVA({
  base: "absolute transition-colors",
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    } satisfies Record<RangeSliderSize, string>,
    variant: {
      primary: RANGESLIDER_TOKENS.range.variant.primary,
      secondary: RANGESLIDER_TOKENS.range.variant.secondary,
      outline: RANGESLIDER_TOKENS.range.variant.outline,
    } satisfies Record<RangeSliderVariant, string>,
    orientation: {
      horizontal: "h-full",
      vertical: "w-full",
    } satisfies Record<RangeSliderOrientation, string>,
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
    orientation: "horizontal",
  },
});

/**
 * RangeSlider thumb variants (draggable handles)
 */
const rangeSliderThumbVariants = tokenCVA({
  base: [
    "block rounded-full",
    RANGESLIDER_TOKENS.thumb.border,
    "transition-colors",
    "focus-visible:outline-none",
    RANGESLIDER_TOKENS.thumb.focusRing,
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  variants: {
    size: {
      sm: `${RANGESLIDER_TOKENS.thumb.size.sm.height} ${RANGESLIDER_TOKENS.thumb.size.sm.width}`,
      md: `${RANGESLIDER_TOKENS.thumb.size.md.height} ${RANGESLIDER_TOKENS.thumb.size.md.width}`,
      lg: `${RANGESLIDER_TOKENS.thumb.size.lg.height} ${RANGESLIDER_TOKENS.thumb.size.lg.width}`,
    } satisfies Record<RangeSliderSize, string>,
    variant: {
      primary: [
        RANGESLIDER_TOKENS.thumb.variant.primary.border,
        RANGESLIDER_TOKENS.thumb.variant.primary.background,
        RANGESLIDER_TOKENS.thumb.variant.primary.focusRing,
      ].join(" "),
      secondary: [
        RANGESLIDER_TOKENS.thumb.variant.secondary.border,
        RANGESLIDER_TOKENS.thumb.variant.secondary.background,
        RANGESLIDER_TOKENS.thumb.variant.secondary.focusRing,
      ].join(" "),
      outline: [
        RANGESLIDER_TOKENS.thumb.variant.outline.border,
        RANGESLIDER_TOKENS.thumb.variant.outline.background,
        RANGESLIDER_TOKENS.thumb.variant.outline.focusRing,
      ].join(" "),
    } satisfies Record<RangeSliderVariant, string>,
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

/**
 * RangeSlider mark variants (visual tick marks)
 * Note: pointer-events-none is applied via wrapper div in component, not in base state
 */
const rangeSliderMarkVariants = tokenCVA({
  base: "absolute flex items-center justify-center",
  variants: {
    size: {
      sm: RANGESLIDER_TOKENS.mark.label.fontSize.sm,
      md: RANGESLIDER_TOKENS.mark.label.fontSize.md,
      lg: RANGESLIDER_TOKENS.mark.label.fontSize.lg,
    } satisfies Record<RangeSliderSize, string>,
    orientation: {
      horizontal: "flex-col top-full -translate-x-1/2",
      vertical: "flex-row left-full -translate-y-1/2",
    } satisfies Record<RangeSliderOrientation, string>,
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      class: RANGESLIDER_TOKENS.mark.label.marginTop.sm,
    },
    {
      orientation: "horizontal",
      size: "md",
      class: RANGESLIDER_TOKENS.mark.label.marginTop.md,
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: RANGESLIDER_TOKENS.mark.label.marginTop.lg,
    },
    {
      orientation: "vertical",
      size: "sm",
      class: RANGESLIDER_TOKENS.mark.label.marginLeft.sm,
    },
    {
      orientation: "vertical",
      size: "md",
      class: RANGESLIDER_TOKENS.mark.label.marginLeft.md,
    },
    {
      orientation: "vertical",
      size: "lg",
      class: RANGESLIDER_TOKENS.mark.label.marginLeft.lg,
    },
  ],
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
});

/**
 * RangeSlider mark dot variants (the actual tick mark)
 */
const rangeSliderMarkDotVariants = tokenCVA({
  base: "rounded-full bg-[hsl(var(--tm-border-default))] transition-colors",
  variants: {
    size: {
      sm: `${RANGESLIDER_TOKENS.mark.dot.size.sm.height} ${RANGESLIDER_TOKENS.mark.dot.size.sm.width}`,
      md: `${RANGESLIDER_TOKENS.mark.dot.size.md.height} ${RANGESLIDER_TOKENS.mark.dot.size.md.width}`,
      lg: `${RANGESLIDER_TOKENS.mark.dot.size.lg.height} ${RANGESLIDER_TOKENS.mark.dot.size.lg.width}`,
    } satisfies Record<RangeSliderSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * RangeSlider mark label variants
 */
const rangeSliderMarkLabelVariants = tokenCVA({
  base: "text-[hsl(var(--tm-text-muted))] whitespace-nowrap",
  variants: {
    size: {
      sm: RANGESLIDER_TOKENS.mark.label.fontSize.sm,
      md: RANGESLIDER_TOKENS.mark.label.fontSize.md,
      lg: RANGESLIDER_TOKENS.mark.label.fontSize.lg,
    } satisfies Record<RangeSliderSize, string>,
    orientation: {
      horizontal: "",
      vertical: "",
    } satisfies Record<RangeSliderOrientation, string>,
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      class: RANGESLIDER_TOKENS.mark.label.marginTop.sm,
    },
    {
      orientation: "horizontal",
      size: "md",
      class: RANGESLIDER_TOKENS.mark.label.marginTop.md,
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: RANGESLIDER_TOKENS.mark.label.marginTop.lg,
    },
    {
      orientation: "vertical",
      size: "sm",
      class: RANGESLIDER_TOKENS.mark.label.marginLeft.sm,
    },
    {
      orientation: "vertical",
      size: "md",
      class: RANGESLIDER_TOKENS.mark.label.marginLeft.md,
    },
    {
      orientation: "vertical",
      size: "lg",
      class: RANGESLIDER_TOKENS.mark.label.marginLeft.lg,
    },
  ],
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
});

/**
 * Combined range slider variants
 * Returns all variant classes for root, track, range, thumb, and marks
 */
export const rangeSliderVariants = ({
  size,
  variant,
  orientation,
}: {
  size?: RangeSliderSize;
  variant?: RangeSliderVariant;
  orientation?: RangeSliderOrientation;
}) => ({
  root: () => rangeSliderRootVariants({ size, variant, orientation }),
  track: () => rangeSliderTrackVariants({ size, variant, orientation }),
  range: () => rangeSliderRangeVariants({ size, variant, orientation }),
  thumb: () => rangeSliderThumbVariants({ size, variant }),
  mark: () => rangeSliderMarkVariants({ size, orientation }),
  markDot: () => rangeSliderMarkDotVariants({ size }),
  markLabel: () => rangeSliderMarkLabelVariants({ size, orientation }),
});
