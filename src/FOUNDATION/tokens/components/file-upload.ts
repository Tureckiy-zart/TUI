/**
 * FileUpload Component Tokens
 *
 * Component-level design tokens for FileUpload component.
 * Maps foundation tokens (spacing, typography, radius, shadows) to file-upload-specific usage.
 * All color values use semantic Tailwind classes that map to CSS variables.
 *
 * All values reference foundation tokens to ensure consistency across the design system.
 * Values are mapped to Tailwind utility classes for direct use in component variants.
 */
export const FILE_UPLOAD_TOKENS = {
  /**
   * Dropzone heights by size
   * Supports sm, md, lg sizes (canonical interactive size scale)
   */
  dropzone: {
    height: {
      sm: "h-32", // 128px (8rem) - maps to spacing[32]
      md: "h-40", // 160px (10rem) - maps to spacing[40]
      lg: "h-48", // 192px (12rem) - maps to spacing[48]
    } as const,

    /**
     * Dropzone padding by size
     * Horizontal and vertical padding values
     */
    padding: {
      horizontal: {
        sm: "px-md", // 16px (1rem) - maps to semanticSpacing.md
        md: "px-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
        lg: "px-xl", // 32px (2rem) - maps to semanticSpacing.xl
      },
      vertical: {
        sm: "py-md", // 16px (1rem) - maps to semanticSpacing.md
        md: "py-lg", // 24px (1.5rem) - maps to semanticSpacing.lg
        lg: "py-xl", // 32px (2rem) - maps to semanticSpacing.xl
      },
    } as const,

    /**
     * Dropzone gap by size
     * Spacing between dropzone elements
     */
    gap: {
      sm: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      md: "gap-md", // 16px (1rem) - maps to semanticSpacing.md
      lg: "gap-md", // 16px (1rem) - maps to semanticSpacing.md
    } as const,

    /**
     * Border radius by size
     */
    radius: {
      sm: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md
      md: "rounded-lg", // 8px (0.5rem) - maps to borderRadius.lg
      lg: "rounded-lg", // 8px (0.5rem) - maps to borderRadius.lg
    } as const,

    /**
     * Variant-based tokens
     * Border and background colors for different variants
     * All use semantic Tailwind classes for theme support
     */
    variant: {
      outline: {
        border: "border-border", // Default border color
        background: "bg-transparent", // Transparent background
        hover: {
          border: "hover:border-accent", // Hover border color
          background: "hover:bg-accent/5", // Hover background with 5% opacity
        },
      },
      filled: {
        border: "border-border", // Default border color
        background: "bg-muted/30", // Muted background with 30% opacity
        hover: {
          border: "hover:border-accent", // Hover border color
          background: "hover:bg-accent/10", // Hover background with 10% opacity
        },
      },
    } as const,

    /**
     * State-based tokens
     * Border and background colors for different states
     */
    state: {
      dragActive: {
        border: "border-accent", // Active drag border color
        background: "bg-accent/10", // Active drag background with 10% opacity
      },
      error: {
        border: "border-destructive", // Error border color
        background: "bg-destructive/5", // Error background with 5% opacity
      },
    } as const,
  } as const,

  /**
   * Preview item tokens
   * Spacing, radius, and styling for file preview items
   */
  preview: {
    /**
     * Preview item padding by size
     */
    padding: {
      horizontal: {
        sm: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
        md: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
        lg: "px-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      },
      vertical: {
        sm: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
        md: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
        lg: "py-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      },
    } as const,

    /**
     * Preview item gap by size
     * Spacing between preview item elements
     */
    gap: {
      sm: "gap-xs", // 4px (0.25rem) - maps to semanticSpacing.xs
      md: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
      lg: "gap-sm", // 8px (0.5rem) - maps to semanticSpacing.sm
    } as const,

    /**
     * Border radius for preview items
     */
    radius: "rounded-md", // 6px (0.375rem) - maps to borderRadius.md

    /**
     * Preview item border and background
     */
    border: "border border-border", // Default border
    background: "bg-background", // Default background
    shadow: "shadow-sm", // Small shadow - maps to elevationShadows.sm

    /**
     * Font sizes by size variant
     * Maps to foundation typography fontSize tokens
     */
    fontSize: {
      sm: "text-sm", // Maps to fontSize.sm[0]
      md: "text-base", // Maps to fontSize.base[0]
      lg: "text-lg", // Maps to fontSize.lg[0]
    } as const,
  } as const,

  /**
   * Thumbnail tokens
   * Size and styling for image thumbnails
   */
  thumbnail: {
    /**
     * Thumbnail sizes by size variant
     */
    size: {
      sm: "size-8", // 32px (2rem) - maps to spacing[8]
      md: "size-10", // 40px (2.5rem) - maps to spacing[10]
      lg: "size-12", // 48px (3rem) - maps to spacing[12]
    } as const,

    /**
     * Thumbnail border radius
     */
    radius: "rounded-sm", // 4px (0.25rem) - maps to borderRadius.sm

    /**
     * Thumbnail background
     */
    background: "bg-muted", // Muted background
  } as const,

  /**
   * Message tokens
   * Error and helper message styling
   */
  message: {
    error: {
      textColor: "text-[hsl(var(--destructive))]", // Error message text color
    },
  } as const,
} as const;

/**
 * Type exports for FileUpload tokens
 */
export type FileUploadDropzoneHeight = keyof typeof FILE_UPLOAD_TOKENS.dropzone.height;
export type FileUploadDropzonePaddingHorizontal =
  keyof typeof FILE_UPLOAD_TOKENS.dropzone.padding.horizontal;
export type FileUploadDropzonePaddingVertical =
  keyof typeof FILE_UPLOAD_TOKENS.dropzone.padding.vertical;
export type FileUploadDropzoneGap = keyof typeof FILE_UPLOAD_TOKENS.dropzone.gap;
export type FileUploadDropzoneRadius = keyof typeof FILE_UPLOAD_TOKENS.dropzone.radius;
export type FileUploadPreviewFontSize = keyof typeof FILE_UPLOAD_TOKENS.preview.fontSize;
export type FileUploadThumbnailSize = keyof typeof FILE_UPLOAD_TOKENS.thumbnail.size;
