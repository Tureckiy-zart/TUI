/**
 * Slider Variants
 *
 * Token-driven CVA variants for Slider component.
 * All visual properties use token unions exclusively.
 */

import { cva } from "class-variance-authority";

/**
 * Slider root container variants
 */
const sliderRootVariants = cva(
  // Base styles
  "relative flex touch-none select-none items-center",
  {
    variants: {
      size: {
        sm: "", // Container size for small (orientation-specific)
        md: "", // Container size for medium (orientation-specific)
        lg: "", // Container size for large (orientation-specific)
      },
      variant: {
        primary: "",
        secondary: "",
        outline: "",
      },
      orientation: {
        horizontal: "w-full flex-row",
        vertical: "h-full flex-col",
      },
    },
    compoundVariants: [
      // Horizontal sizes (height)
      { orientation: "horizontal", size: "sm", class: "h-4" },
      { orientation: "horizontal", size: "md", class: "h-5" },
      { orientation: "horizontal", size: "lg", class: "h-6" },
      // Vertical sizes (width)
      { orientation: "vertical", size: "sm", class: "w-4" },
      { orientation: "vertical", size: "md", class: "w-5" },
      { orientation: "vertical", size: "lg", class: "w-6" },
    ],
    defaultVariants: {
      size: "md",
      variant: "primary",
      orientation: "horizontal",
    },
  },
);

/**
 * Slider track variants (background track)
 */
const sliderTrackVariants = cva(
  // Base styles - rounded track with transition
  "relative grow overflow-hidden rounded-full transition-colors",
  {
    variants: {
      size: {
        sm: "", // Track thickness (orientation-specific)
        md: "", // Track thickness (orientation-specific)
        lg: "", // Track thickness (orientation-specific)
      },
      variant: {
        primary: "bg-primary-200 dark:bg-primary-800",
        secondary: "bg-secondary-200 dark:bg-secondary-800",
        outline: "bg-border",
      },
      orientation: {
        horizontal: "w-full",
        vertical: "h-full",
      },
    },
    compoundVariants: [
      // Horizontal track heights
      { orientation: "horizontal", size: "sm", class: "h-1" },
      { orientation: "horizontal", size: "md", class: "h-1.5" },
      { orientation: "horizontal", size: "lg", class: "h-2" },
      // Vertical track widths
      { orientation: "vertical", size: "sm", class: "w-1" },
      { orientation: "vertical", size: "md", class: "w-1.5" },
      { orientation: "vertical", size: "lg", class: "w-2" },
    ],
    defaultVariants: {
      size: "md",
      variant: "primary",
      orientation: "horizontal",
    },
  },
);

/**
 * Slider range variants (filled portion)
 */
const sliderRangeVariants = cva(
  // Base styles - absolute positioning for range fill
  "absolute transition-colors",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      variant: {
        primary: "bg-primary-600 dark:bg-primary-500",
        secondary: "bg-secondary-600 dark:bg-secondary-500",
        outline: "bg-primary-600 dark:bg-primary-500",
      },
      orientation: {
        horizontal: "h-full",
        vertical: "w-full",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
      orientation: "horizontal",
    },
  },
);

/**
 * Slider thumb variants (draggable handle)
 */
const sliderThumbVariants = cva(
  // Base styles - circular thumb with focus ring
  [
    "block rounded-full border-2 transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4", // Thumb size: 16px
        md: "h-5 w-5", // Thumb size: 20px
        lg: "h-6 w-6", // Thumb size: 24px
      },
      variant: {
        primary: [
          "border-primary-600 bg-background",
          "dark:border-primary-500",
          "focus-visible:ring-primary-600 dark:focus-visible:ring-primary-500",
        ].join(" "),
        secondary: [
          "border-secondary-600 bg-background",
          "dark:border-secondary-500",
          "focus-visible:ring-secondary-600 dark:focus-visible:ring-secondary-500",
        ].join(" "),
        outline: [
          "border-primary-600 bg-background",
          "dark:border-primary-500",
          "focus-visible:ring-primary-600 dark:focus-visible:ring-primary-500",
        ].join(" "),
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  },
);

/**
 * Slider mark variants (visual tick marks)
 */
const sliderMarkVariants = cva(
  // Base styles - absolute positioned mark with dot
  "absolute flex items-center justify-center pointer-events-none",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      orientation: {
        horizontal: "flex-col top-full mt-1 -translate-x-1/2",
        vertical: "flex-row left-full ml-1 -translate-y-1/2",
      },
    },
    defaultVariants: {
      size: "md",
      orientation: "horizontal",
    },
  },
);

/**
 * Slider mark dot variants (the actual tick mark)
 */
const sliderMarkDotVariants = cva(
  // Base styles - small circular dot
  "rounded-full bg-border transition-colors",
  {
    variants: {
      size: {
        sm: "w-1 h-1",
        md: "w-1.5 h-1.5",
        lg: "w-2 h-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/**
 * Slider mark label variants
 */
const sliderMarkLabelVariants = cva(
  // Base styles - label text
  "text-muted-foreground whitespace-nowrap",
  {
    variants: {
      size: {
        sm: "text-xs mt-1",
        md: "text-sm mt-1.5",
        lg: "text-base mt-2",
      },
      orientation: {
        horizontal: "",
        vertical: "ml-1",
      },
    },
    compoundVariants: [
      { orientation: "vertical", size: "sm", class: "ml-1 mt-0" },
      { orientation: "vertical", size: "md", class: "ml-1.5 mt-0" },
      { orientation: "vertical", size: "lg", class: "ml-2 mt-0" },
    ],
    defaultVariants: {
      size: "md",
      orientation: "horizontal",
    },
  },
);

/**
 * Combined slider variants
 * Returns all variant classes for root, track, range, thumb, and marks
 */
export const sliderVariants = ({
  size,
  variant,
  orientation,
}: {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  orientation?: "horizontal" | "vertical";
}) => ({
  root: () => sliderRootVariants({ size, variant, orientation }),
  track: () => sliderTrackVariants({ size, variant, orientation }),
  range: () => sliderRangeVariants({ size, variant, orientation }),
  thumb: () => sliderThumbVariants({ size, variant }),
  mark: () => sliderMarkVariants({ size, orientation }),
  markDot: () => sliderMarkDotVariants({ size }),
  markLabel: () => sliderMarkLabelVariants({ size, orientation }),
});
