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
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      size: {
        sm: "h-4", // Container height for small
        md: "h-5", // Container height for medium
        lg: "h-6", // Container height for large
      },
      variant: {
        primary: "",
        secondary: "",
        outline: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  },
);

/**
 * Slider track variants (background track)
 */
const sliderTrackVariants = cva(
  // Base styles - rounded track with transition
  "relative h-full w-full grow overflow-hidden rounded-full transition-colors",
  {
    variants: {
      size: {
        sm: "h-1", // Track height: 4px
        md: "h-1.5", // Track height: 6px
        lg: "h-2", // Track height: 8px
      },
      variant: {
        primary: "bg-primary-200 dark:bg-primary-800",
        secondary: "bg-secondary-200 dark:bg-secondary-800",
        outline: "bg-border",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  },
);

/**
 * Slider range variants (filled portion)
 */
const sliderRangeVariants = cva(
  // Base styles - absolute positioning for range fill
  "absolute h-full transition-colors",
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
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
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
 * Combined slider variants
 * Returns all variant classes for root, track, range, and thumb
 */
export const sliderVariants = ({
  size,
  variant,
}: {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
}) => ({
  root: () => sliderRootVariants({ size, variant }),
  track: () => sliderTrackVariants({ size, variant }),
  range: () => sliderRangeVariants({ size, variant }),
  thumb: () => sliderThumbVariants({ size, variant }),
});
