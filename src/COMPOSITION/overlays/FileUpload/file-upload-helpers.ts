/**
 * FileUpload Helpers
 *
 * Helper functions for file validation and processing.
 */

import type { FileUploadError } from "./FileUpload.types";

/**
 * Validates file size
 */
export function validateFileSize(file: File, maxSize?: number): FileUploadError | null {
  if (!maxSize) return null;

  if (file.size > maxSize) {
    return {
      type: "file-too-large",
      message: `File size exceeds maximum allowed size (${formatBytes(maxSize)})`,
      file,
    };
  }

  return null;
}

/**
 * Validates file type
 */
export function validateFileType(file: File, accept?: string): FileUploadError | null {
  if (!accept) return null;

  const acceptedTypes = accept.split(",").map((type) => type.trim());
  const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
  const fileType = file.type;

  const isAccepted = acceptedTypes.some((acceptedType) => {
    // Check for wildcard (e.g., "image/*")
    if (acceptedType.includes("/*")) {
      const category = acceptedType.split("/")[0];
      // Check MIME type first
      if (fileType && fileType.startsWith(`${category}/`)) {
        return true;
      }
      // Fallback to extension check if MIME type is not available (e.g., in tests)
      // Common image extensions
      if (category === "image") {
        const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".ico"];
        return imageExtensions.includes(fileExtension);
      }
      // Add more category checks as needed
      return false;
    }

    // Check for specific file extension
    if (acceptedType.startsWith(".")) {
      return fileExtension === acceptedType.toLowerCase();
    }

    // Check for specific MIME type
    return fileType === acceptedType;
  });

  if (!isAccepted) {
    return {
      type: "file-type-not-supported",
      message: `File type not supported. Accepted types: ${accept}`,
      file,
    };
  }

  return null;
}

/**
 * Validates file count
 */
export function validateFileCount(
  currentFiles: File[],
  newFiles: File[],
  maxFiles?: number,
): FileUploadError | null {
  if (!maxFiles) return null;

  const totalFiles = currentFiles.length + newFiles.length;

  if (totalFiles > maxFiles) {
    return {
      type: "too-many-files",
      message: `Maximum ${maxFiles} file(s) allowed`,
    };
  }

  return null;
}

/**
 * Validates a file against all validation rules
 */
export function validateFile(
  file: File,
  options: {
    maxSize?: number;
    accept?: string;
  },
): FileUploadError | null {
  const sizeError = validateFileSize(file, options.maxSize);
  if (sizeError) return sizeError;

  const typeError = validateFileType(file, options.accept);
  if (typeError) return typeError;

  return null;
}

/**
 * Checks if file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

/**
 * Creates preview URL for image file
 */
export function createPreviewUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isImageFile(file)) {
      reject(new Error("File is not an image"));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Formats file size in human-readable format
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Gets file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "";
}

/**
 * Gets file icon name based on file type
 */
export function getFileIconName(file: File): string {
  if (isImageFile(file)) return "image";

  const extension = getFileExtension(file.name);

  const extensionMap: Record<string, string> = {
    pdf: "file-text",
    doc: "file-text",
    docx: "file-text",
    xls: "file-spreadsheet",
    xlsx: "file-spreadsheet",
    zip: "file-archive",
    rar: "file-archive",
    "7z": "file-archive",
    mp4: "file-video",
    avi: "file-video",
    mov: "file-video",
    mp3: "file-audio",
    wav: "file-audio",
  };

  return extensionMap[extension] || "file";
}
