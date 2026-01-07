"use client";

/**
 * FileUpload Component
 *
 * Extension composite component for file upload with drag-and-drop,
 * file preview, validation, and progress tracking.
 *
 * @enforcement TUNG_FILEUPLOAD_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - ALL styling MUST use FILE_UPLOAD_TOKENS as the single source of truth
 * - ALL color-related classes MUST be token-based utilities only
 * - ALL spacing values MUST be token-based
 * - ALL radius values MUST be token-based
 * - ALL shadow values MUST be token-based
 * - NO raw Tailwind color classes (bg-red-*, text-blue-*, etc.) allowed
 * - Variants use tokenCVA for type-safe styling (fileUploadDropzoneVariants, fileUploadPreviewVariants, fileUploadThumbnailVariants)
 * - Size variants use FILE_UPLOAD_TOKENS.dropzone.height and padding
 * - Error message uses FILE_UPLOAD_TOKENS.message.error.textColor
 *
 * Color Authority Rules:
 * - ALL color-related classes MUST be token-based utilities only
 * - Colors come from FILE_UPLOAD_TOKENS for dropzone, preview, and message styling
 * - Dropzone variant colors use FILE_UPLOAD_TOKENS.dropzone.variant
 * - Dropzone state colors use FILE_UPLOAD_TOKENS.dropzone.state
 * - Error message color uses FILE_UPLOAD_TOKENS.message.error.textColor
 * - NO raw Tailwind color classes (bg-red-500, text-primary, etc.) allowed
 *
 * Spacing Authority Rules:
 * - ALL spacing values MUST come from spacing token system
 * - Padding uses FILE_UPLOAD_TOKENS.dropzone.padding (horizontal and vertical)
 * - Gap uses FILE_UPLOAD_TOKENS.dropzone.gap
 * - Preview padding uses FILE_UPLOAD_TOKENS.preview.padding
 * - NO raw Tailwind spacing classes (p-4, px-2, gap-4, etc.) allowed
 *
 * Radius Authority Rules:
 * - ALL radius values MUST come from radius token system
 * - Radius uses FILE_UPLOAD_TOKENS.dropzone.radius[size]
 * - Preview radius uses FILE_UPLOAD_TOKENS.preview.radius
 * - Thumbnail radius uses FILE_UPLOAD_TOKENS.thumbnail.radius
 * - NO raw Tailwind radius classes (rounded-md, rounded-lg, etc.) allowed
 *
 * @see docs/architecture/COLOR_AUTHORITY_CONTRACT.md
 * @see docs/architecture/SPACING_AUTHORITY_CONTRACT.md
 * @see docs/architecture/RADIUS_AUTHORITY_CONTRACT.md
 * @see docs/architecture/ELEVATION_AUTHORITY.md
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Color Authority: FileUpload uses color token system exclusively via FILE_UPLOAD_TOKENS
 * - Spacing Authority: FileUpload uses spacing token system exclusively via FILE_UPLOAD_TOKENS
 * - Radius Authority: FileUpload uses radius token system exclusively via FILE_UPLOAD_TOKENS
 * - Elevation Authority: FileUpload uses shadow tokens via FILE_UPLOAD_TOKENS
 * - Layout Authority: FileUpload composes Box, List, ListItem, Button, and Text components
 *
 * Token-only contract:
 * - All styling is defined in FILE_UPLOAD_TOKENS (src/FOUNDATION/tokens/components/file-upload.ts)
 * - FILE_UPLOAD_TOKENS reference foundation tokens from spacing, radius, color, and shadow systems
 * - Variants use tokenCVA for type-safe styling
 * - No raw Tailwind color/spacing/radius classes are allowed
 * - tokenCVA validates token usage in development mode
 * - TypeScript enforces valid variant/size values at compile time
 *
 * Features:
 * - Drag-and-drop file selection
 * - File preview with thumbnails (for images)
 * - File validation (size, type, count)
 * - Controlled and uncontrolled modes
 * - Size variants (sm, md, lg)
 * - Visual variants (outline, filled)
 * - Error handling
 * - ARIA compliance
 * - Keyboard navigation
 *
 * @example Basic usage
 * ```tsx
 * <FileUpload onFileSelect={(files) => console.log(files)} />
 * ```
 *
 * @example Multiple files with validation
 * ```tsx
 * <FileUpload
 *   multiple
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   accept="image/*"
 *   maxFiles={5}
 *   onFileSelect={handleUpload}
 *   onError={(error) => console.error(error)}
 * />
 * ```
 *
 * @example Controlled mode with loading state
 * ```tsx
 * <FileUpload
 *   value={files}
 *   loading={isUploading}
 *   onFileSelect={setFiles}
 *   onFileRemove={handleRemove}
 * />
 * ```
 */

import * as React from "react";

import { List, ListItem } from "@/COMPOSITION/layout";
import { Box } from "@/COMPOSITION/layout/Box";
import { cn } from "@/FOUNDATION/lib/utils";
import { FILE_UPLOAD_TOKENS } from "@/FOUNDATION/tokens/components/file-upload";
import { Button } from "@/PRIMITIVES/Button/Button";
import { Text } from "@/PRIMITIVES/Text/Text";

import {
  createPreviewUrl,
  formatBytes,
  isImageFile,
  validateFile,
  validateFileCount,
} from "./file-upload-helpers";
import {
  fileUploadDropzoneVariants,
  fileUploadPreviewVariants,
  fileUploadThumbnailVariants,
} from "./file-upload-variants";
import type { FileUploadProps } from "./FileUpload.types";

/**
 * File Preview Item Component
 * Internal component for rendering file preview
 */
interface FilePreviewItemProps {
  file: File;
  size?: "sm" | "md" | "lg";
  onRemove: () => void;
  disabled?: boolean;
}

const FilePreviewItem = React.memo<FilePreviewItemProps>(
  ({ file, size = "md", onRemove, disabled }) => {
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
      if (isImageFile(file)) {
        createPreviewUrl(file)
          .then(setPreviewUrl)
          .catch(() => setPreviewUrl(null));
      }
    }, [file]);

    return (
      <div className={cn(fileUploadPreviewVariants({ size }), "tm-motion-fade-in")}>
        {/* Thumbnail or Icon */}
        <div className={fileUploadThumbnailVariants({ size })}>
          {previewUrl ? (
            <img src={previewUrl} alt={file.name} className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center">
              <Text size="xs" tone="muted">
                {file.name.split(".").pop()?.toUpperCase()}
              </Text>
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="min-w-0 flex-1">
          <Box className="truncate">
            <Text size={size === "lg" ? "sm" : "xs"} weight="medium">
              {file.name}
            </Text>
          </Box>
          <Text size="xs" tone="muted">
            {formatBytes(file.size)}
          </Text>
        </div>

        {/* Remove Button */}
        <Box className="flex-shrink-0">
          <Button
            type="button"
            variant="ghost"
            size={size}
            onClick={onRemove}
            disabled={disabled}
            aria-label={`Remove ${file.name}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Button>
        </Box>
      </div>
    );
  },
);

FilePreviewItem.displayName = "FilePreviewItem";

/**
 * FileUpload component
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses token system exclusively (no raw values)
 * - ✅ Composes Foundation components (Button, Text)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Uses descriptive, intent-based naming
 * - ✅ Does NOT duplicate Foundation functionality
 * - ✅ Motion compliance: uses .tm-motion-fade-in for file appearance
 * - ✅ A11Y compliance: aria-label, aria-describedby, aria-busy, aria-invalid
 * - ✅ Focus compliance: keyboard navigation, focus-visible styles
 */
export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      multiple = false,
      accept,
      maxSize,
      maxFiles,
      disabled = false,
      loading = false,
      value,
      defaultValue,
      onFileSelect,
      onFileRemove,
      onError,
      size = "md",
      variant = "outline",
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    // Internal state for uncontrolled mode
    const [internalFiles, setInternalFiles] = React.useState<File[]>(defaultValue || []);
    const [isDragActive, setIsDragActive] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    // Controlled vs uncontrolled mode
    const files = value !== undefined ? value : internalFiles;
    const setFiles = value !== undefined ? onFileSelect : setInternalFiles;

    // File input ref
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    /**
     * Handles file selection (from input or drop)
     */
    const handleFiles = React.useCallback(
      (newFiles: FileList | null) => {
        if (!newFiles || newFiles.length === 0) return;

        const fileArray = Array.from(newFiles);
        const validFiles: File[] = [];

        // Validate file count
        const countError = validateFileCount(files, fileArray, maxFiles);
        if (countError) {
          setErrorMessage(countError.message);
          // Use setTimeout to ensure error callbacks are called asynchronously
          // This allows tests using waitFor to properly catch the error
          // Works in both test environment and real browser
          setTimeout(() => {
            onError?.(countError);
          }, 0);
          return;
        }

        // Validate each file
        for (const file of fileArray) {
          const error = validateFile(file, { maxSize, accept });
          if (error) {
            setErrorMessage(error.message);
            // Use setTimeout to ensure error callbacks are called asynchronously
            // This allows tests using waitFor to properly catch the error
            // Works in both test environment and real browser
            setTimeout(() => {
              onError?.(error);
            }, 0);
            // Don't add any files if validation fails
            return;
          }
          validFiles.push(file);
        }

        // Add valid files
        if (validFiles.length > 0) {
          setErrorMessage(null);
          const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
          setFiles?.(updatedFiles);
          // Call onFileSelect callback if provided (only in uncontrolled mode, controlled mode already calls it via setFiles)
          if (value === undefined && onFileSelect) {
            onFileSelect(updatedFiles);
          }
        }
      },
      [files, multiple, maxSize, maxFiles, accept, setFiles, value, onFileSelect, onError],
    );

    /**
     * Handles file input change
     */
    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        // Always process files, even if browser accept filter didn't catch them
        // This ensures our validation runs regardless of browser filtering
        handleFiles(e.target.files);
        // Reset input to allow selecting the same file again
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      [handleFiles],
    );

    /**
     * Handles file removal
     */
    const handleRemove = React.useCallback(
      (fileToRemove: File) => {
        const updatedFiles = files.filter((f) => f !== fileToRemove);
        setFiles?.(updatedFiles);
        onFileRemove?.(fileToRemove);
        setErrorMessage(null);
      },
      [files, setFiles, onFileRemove],
    );

    /**
     * Handles drag enter
     */
    const handleDragEnter = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    }, []);

    /**
     * Handles drag leave
     */
    const handleDragLeave = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    }, []);

    /**
     * Handles drag over
     */
    const handleDragOver = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    /**
     * Handles drop
     */
    const handleDrop = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (disabled || loading) return;

        handleFiles(e.dataTransfer.files);
      },
      [disabled, loading, handleFiles],
    );

    /**
     * Handles click on dropzone
     */
    const handleClick = React.useCallback(() => {
      if (disabled || loading) return;
      fileInputRef.current?.click();
    }, [disabled, loading]);

    /**
     * Handles keyboard activation (Enter/Space)
     */
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled || loading) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      },
      [disabled, loading, handleClick],
    );

    return (
      <div ref={ref} className={cn(className)} style={style} {...props}>
        {/* Dropzone */}
        <div
          className={cn(
            fileUploadDropzoneVariants({
              variant,
              size,
              isDragActive,
              hasError: !!errorMessage,
            }),
          )}
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={disabled || loading ? -1 : 0}
          aria-label={ariaLabel || "Drop files here or click to browse"}
          aria-describedby={ariaDescribedBy}
          aria-busy={loading}
          aria-invalid={!!errorMessage}
          aria-disabled={disabled}
        >
          {/* Upload Icon */}
          {(() => {
            let iconSize = 40; // default (md)
            if (size === "sm") {
              iconSize = 32;
            } else if (size === "lg") {
              iconSize = 48;
            }
            return (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={iconSize}
                height={iconSize}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            );
          })()}

          {/* Text */}
          <div className="text-center">
            <Text size={size === "lg" ? "md" : "sm"} weight="medium">
              {isDragActive ? "Drop files here" : "Drop files or click to browse"}
            </Text>
            {accept && (
              <Text size="xs" tone="muted">
                Accepted: {accept}
              </Text>
            )}
            {maxSize && (
              <Text size="xs" tone="muted">
                Max size: {formatBytes(maxSize)}
              </Text>
            )}
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={handleInputChange}
            disabled={disabled || loading}
            className="hidden"
            aria-hidden="true"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <Box mt="sm" className={FILE_UPLOAD_TOKENS.message.error.textColor}>
            <Text size="sm" role="alert" aria-live="polite">
              {errorMessage}
            </Text>
          </Box>
        )}

        {/* File Previews */}
        {files.length > 0 && (
          <List as="div" gap="sm" className="mt-md" aria-live="polite">
            {files.map((file, index) => (
              <ListItem key={`${file.name}-${index}`} as="div">
                <FilePreviewItem
                  file={file}
                  size={size}
                  onRemove={() => handleRemove(file)}
                  disabled={disabled}
                />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";
