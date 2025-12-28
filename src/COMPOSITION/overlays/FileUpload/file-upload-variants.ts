/**
 * FileUpload Variants
 *
 * tokenCVA-based variant system for FileUpload component.
 * All styling uses token-based values with CSS variable references.
 */

import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { MOTION_TOKENS } from "@/FOUNDATION/tokens/components/motion";

import type { FileUploadSize, FileUploadVariant } from "./FileUpload.types";

/**
 * FileUpload Dropzone Variants
 * CVA configuration for the dropzone container
 */
export const fileUploadDropzoneVariants = tokenCVA({
  base: `
    relative flex flex-col items-center justify-center
    border-2 border-dashed
    ${MOTION_TOKENS.transition.colors}
    cursor-pointer
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
  `,
  variants: {
    variant: {
      outline: `
        border-[hsl(var(--border))]
        bg-transparent
        hover:border-[hsl(var(--accent))]
        hover:bg-[hsl(var(--accent)/0.05)]
      `,
      filled: `
        border-[hsl(var(--border))]
        bg-[hsl(var(--muted)/0.3)]
        hover:border-[hsl(var(--accent))]
        hover:bg-[hsl(var(--accent)/0.1)]
      `,
    } satisfies Record<FileUploadVariant, string>,
    size: {
      sm: `h-32 px-md py-md rounded-md gap-sm`,
      md: `h-40 px-lg py-lg rounded-lg gap-md`,
      lg: `h-48 px-xl py-xl rounded-lg gap-md`,
    } satisfies Record<FileUploadSize, string>,
    isDragActive: {
      true: `
        border-[hsl(var(--accent))]
        bg-[hsl(var(--accent)/0.1)]
      `,
    },
    hasError: {
      true: `
        border-[hsl(var(--destructive))]
        bg-[hsl(var(--destructive)/0.05)]
      `,
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
    isDragActive: false,
    hasError: false,
  },
});

/**
 * FileUpload Preview Item Variants
 * CVA configuration for file preview items
 */
export const fileUploadPreviewVariants = tokenCVA({
  base: `
    relative flex items-center gap-sm
    px-sm py-sm rounded-md
    border border-[hsl(var(--border))]
    bg-[hsl(var(--background))]
    shadow-sm
    ${MOTION_TOKENS.transition.colors}
  `,
  variants: {
    size: {
      sm: `text-xs gap-xs`,
      md: `text-sm gap-sm`,
      lg: `text-base gap-sm`,
    } satisfies Record<FileUploadSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * FileUpload Preview Thumbnail Variants
 * CVA configuration for image thumbnails
 */
export const fileUploadThumbnailVariants = tokenCVA({
  base: `
    relative overflow-hidden
    rounded-sm
    bg-[hsl(var(--muted))]
    flex-shrink-0
  `,
  variants: {
    size: {
      sm: `size-8`,
      md: `size-10`,
      lg: `size-12`,
    } satisfies Record<FileUploadSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});
