/**
 * FileUpload Variants
 *
 * tokenCVA-based variant system for FileUpload component.
 * All styling uses token-based values with CSS variable references.
 */

import { focusRing } from "@/FOUNDATION/lib/a11y";
import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { FILE_UPLOAD_TOKENS } from "@/FOUNDATION/tokens/components/file-upload";
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
    ${focusRing}
    disabled:cursor-not-allowed disabled:opacity-50
  `,
  variants: {
    variant: {
      outline: `
        ${FILE_UPLOAD_TOKENS.dropzone.variant.outline.border}
        ${FILE_UPLOAD_TOKENS.dropzone.variant.outline.background}
        ${FILE_UPLOAD_TOKENS.dropzone.variant.outline.hover.border}
        ${FILE_UPLOAD_TOKENS.dropzone.variant.outline.hover.background}
      `,
      filled: `
        ${FILE_UPLOAD_TOKENS.dropzone.variant.filled.border}
        ${FILE_UPLOAD_TOKENS.dropzone.variant.filled.background}
        ${FILE_UPLOAD_TOKENS.dropzone.variant.filled.hover.border}
        ${FILE_UPLOAD_TOKENS.dropzone.variant.filled.hover.background}
      `,
    } satisfies Record<FileUploadVariant, string>,
    size: {
      sm: `
        ${FILE_UPLOAD_TOKENS.dropzone.height.sm}
        ${FILE_UPLOAD_TOKENS.dropzone.padding.horizontal.sm}
        ${FILE_UPLOAD_TOKENS.dropzone.padding.vertical.sm}
        ${FILE_UPLOAD_TOKENS.dropzone.radius.sm}
        ${FILE_UPLOAD_TOKENS.dropzone.gap.sm}
      `,
      md: `
        ${FILE_UPLOAD_TOKENS.dropzone.height.md}
        ${FILE_UPLOAD_TOKENS.dropzone.padding.horizontal.md}
        ${FILE_UPLOAD_TOKENS.dropzone.padding.vertical.md}
        ${FILE_UPLOAD_TOKENS.dropzone.radius.md}
        ${FILE_UPLOAD_TOKENS.dropzone.gap.md}
      `,
      lg: `
        ${FILE_UPLOAD_TOKENS.dropzone.height.lg}
        ${FILE_UPLOAD_TOKENS.dropzone.padding.horizontal.lg}
        ${FILE_UPLOAD_TOKENS.dropzone.padding.vertical.lg}
        ${FILE_UPLOAD_TOKENS.dropzone.radius.lg}
        ${FILE_UPLOAD_TOKENS.dropzone.gap.lg}
      `,
    } satisfies Record<FileUploadSize, string>,
    isDragActive: {
      true: `
        ${FILE_UPLOAD_TOKENS.dropzone.state.dragActive.border}
        ${FILE_UPLOAD_TOKENS.dropzone.state.dragActive.background}
      `,
    },
    hasError: {
      true: `
        ${FILE_UPLOAD_TOKENS.dropzone.state.error.border}
        ${FILE_UPLOAD_TOKENS.dropzone.state.error.background}
      `,
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

/**
 * FileUpload Preview Item Variants
 * CVA configuration for file preview items
 */
export const fileUploadPreviewVariants = tokenCVA({
  base: `
    relative flex items-center
    ${FILE_UPLOAD_TOKENS.preview.padding.horizontal.md}
    ${FILE_UPLOAD_TOKENS.preview.padding.vertical.md}
    ${FILE_UPLOAD_TOKENS.preview.radius}
    ${FILE_UPLOAD_TOKENS.preview.border}
    ${FILE_UPLOAD_TOKENS.preview.background}
    ${FILE_UPLOAD_TOKENS.preview.shadow}
    ${MOTION_TOKENS.transition.colors}
  `,
  variants: {
    size: {
      sm: `
        ${FILE_UPLOAD_TOKENS.preview.fontSize.sm}
        ${FILE_UPLOAD_TOKENS.preview.gap.sm}
      `,
      md: `
        ${FILE_UPLOAD_TOKENS.preview.fontSize.md}
        ${FILE_UPLOAD_TOKENS.preview.gap.md}
      `,
      lg: `
        ${FILE_UPLOAD_TOKENS.preview.fontSize.lg}
        ${FILE_UPLOAD_TOKENS.preview.gap.lg}
      `,
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
    ${FILE_UPLOAD_TOKENS.thumbnail.radius}
    ${FILE_UPLOAD_TOKENS.thumbnail.background}
    flex-shrink-0
  `,
  variants: {
    size: {
      sm: `${FILE_UPLOAD_TOKENS.thumbnail.size.sm}`,
      md: `${FILE_UPLOAD_TOKENS.thumbnail.size.md}`,
      lg: `${FILE_UPLOAD_TOKENS.thumbnail.size.lg}`,
    } satisfies Record<FileUploadSize, string>,
  },
  defaultVariants: {
    size: "md",
  },
});
