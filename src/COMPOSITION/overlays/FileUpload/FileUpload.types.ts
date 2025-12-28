/**
 * FileUpload Types
 *
 * Type definitions for FileUpload component.
 * All types follow TYPING_STANDARD (explicit union types, no CVA-derived types in public API).
 */

/**
 * FileUpload Size Type
 * Explicit union type for size variants
 */
export type FileUploadSize = "sm" | "md" | "lg";

/**
 * FileUpload Variant Type
 * Explicit union type for visual variants
 */
export type FileUploadVariant = "outline" | "filled";

/**
 * FileUpload Error Type
 * Error types for validation failures
 */
export interface FileUploadError {
  type: "file-too-large" | "file-type-not-supported" | "too-many-files" | "unknown";
  message: string;
  file?: File;
}

/**
 * FileUpload Props
 * Main component props interface
 *
 * Extension component: className/style allowed but excluded from type definition
 * for consistency with FormData components pattern
 */
export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  // === Basic Configuration ===
  /** Allow multiple file selection */
  multiple?: boolean;

  /** Accepted file types (e.g., "image/*", ".pdf,.doc") */
  accept?: string;

  /** Maximum file size in bytes */
  maxSize?: number;

  /** Maximum number of files (for multiple mode) */
  maxFiles?: number;

  // === State Props ===
  /** Disabled state */
  disabled?: boolean;

  /** Loading state (upload in progress) */
  loading?: boolean;

  // === Value Props (Controlled) ===
  /** Controlled value (array of File objects) */
  value?: File[];

  /** Default value (uncontrolled mode) */
  defaultValue?: File[];

  // === Callbacks ===
  /** Called when files are selected */
  onFileSelect?: (files: File[]) => void;

  /** Called when a file is removed */
  onFileRemove?: (file: File) => void;

  /** Called when validation error occurs */
  onError?: (error: FileUploadError) => void;

  // === Visual Props ===
  /** Size variant */
  size?: FileUploadSize;

  /** Visual variant */
  variant?: FileUploadVariant;

  // === Accessibility ===
  /** Accessible label for dropzone */
  "aria-label"?: string;

  /** ID of element describing the component */
  "aria-describedby"?: string;
}
