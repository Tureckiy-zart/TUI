import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { FileUpload } from "./FileUpload";
import type { FileUploadError } from "./FileUpload.types";

/**
 * FileUpload Component Stories
 *
 * Component for file upload with drag-and-drop, preview, and validation.
 *
 * Reference: STORYBOOK_STORIES_STANDARD.md
 */
const meta: Meta<typeof FileUpload> = {
  title: "UI / Composition / FileUpload",
  component: FileUpload,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "File upload component with drag-and-drop support, file preview, validation, and error handling. Supports single and multiple file selection modes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: "boolean",
      description: "Allow multiple file selection",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    accept: {
      control: "text",
      description: 'Accepted file types (e.g., "image/*", ".pdf,.doc")',
      table: {
        type: { summary: "string" },
      },
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes",
      table: {
        type: { summary: "number" },
      },
    },
    maxFiles: {
      control: "number",
      description: "Maximum number of files (for multiple mode)",
      table: {
        type: { summary: "number" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    loading: {
      control: "boolean",
      description: "Loading state (upload in progress)",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"sm" | "md" | "lg"' },
      },
    },
    variant: {
      control: "select",
      options: ["outline", "filled"],
      description: "Visual variant",
      table: {
        defaultValue: { summary: "outline" },
        type: { summary: '"outline" | "filled"' },
      },
    },
    value: {
      control: false,
      description: "Controlled value (array of File objects)",
      table: {
        type: { summary: "File[]" },
      },
    },
    defaultValue: {
      control: false,
      description: "Default value (uncontrolled mode)",
      table: {
        type: { summary: "File[]" },
      },
    },
    onFileSelect: {
      control: false,
      description: "Called when files are selected",
      table: {
        type: { summary: "(files: File[]) => void" },
      },
    },
    onFileRemove: {
      control: false,
      description: "Called when a file is removed",
      table: {
        type: { summary: "(file: File) => void" },
      },
    },
    onError: {
      control: false,
      description: "Called when validation error occurs",
      table: {
        type: { summary: "(error: FileUploadError) => void" },
      },
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for dropzone",
      table: {
        type: { summary: "string" },
      },
    },
    "aria-describedby": {
      control: "text",
      description: "ID of element describing the component",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default FileUpload usage with default props.
 */
export const Default: Story = {
  args: {
    size: "md",
    variant: "outline",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic file upload with default configuration.",
      },
    },
  },
};

/**
 * SizesGallery Story
 *
 * Demonstrates all size variants (sm, md, lg) in a gallery layout.
 *
 * Reference: VARIANTS_SIZE_CANON.md
 */
export const SizesGallery: Story = {
  render: () => (
    <div className="space-y-xl">
      <div>
        <h3 className="mb-sm text-sm font-medium">Small (sm)</h3>
        <FileUpload size="sm" />
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Medium (md) - Default</h3>
        <FileUpload size="md" />
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Large (lg)</h3>
        <FileUpload size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Gallery of all size variants. Reference: VARIANTS_SIZE_CANON.md for size scale standards.",
      },
    },
  },
};

/**
 * States Story
 *
 * Demonstrates all component states (default, disabled, loading, error).
 *
 * Reference: VARIANTS_SIZE_CANON.md
 */
export const States: Story = {
  render: () => (
    <div className="space-y-xl">
      <div>
        <h3 className="mb-sm text-sm font-medium">Default State</h3>
        <FileUpload />
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Disabled State</h3>
        <FileUpload disabled />
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Loading State</h3>
        <FileUpload loading />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstration of all state variants. Reference: VARIANTS_SIZE_CANON.md for state standards.",
      },
    },
  },
};

/**
 * DragAndDrop Story
 *
 * Realistic use case: Demonstrates drag-and-drop functionality with visual feedback.
 */
export const DragAndDrop: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="space-y-md">
        <FileUpload
          value={files}
          onFileSelect={setFiles}
          onFileRemove={(file) => {
            setFiles(files.filter((f) => f !== file));
          }}
        />
        {files.length > 0 && (
          <div className="text-sm text-muted-foreground">{files.length} file(s) selected</div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Drag and drop files to see visual feedback and file preview. Controlled mode with state management.",
      },
    },
  },
};

/**
 * MultipleFiles Story
 *
 * Realistic use case: Multiple file selection with file count limit.
 */
export const MultipleFiles: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<FileUploadError | null>(null);

    return (
      <div className="space-y-md">
        <FileUpload
          multiple
          maxFiles={3}
          value={files}
          onFileSelect={setFiles}
          onFileRemove={(file) => {
            setFiles(files.filter((f) => f !== file));
            setError(null);
          }}
          onError={setError}
        />
        {error && <div className="text-sm text-destructive">{error.message}</div>}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multiple file selection with maximum 3 files allowed. Error message displayed when limit exceeded.",
      },
    },
  },
};

/**
 * WithValidation Story
 *
 * Realistic use case: File upload with size and type validation.
 */
export const WithValidation: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<FileUploadError | null>(null);

    return (
      <div className="space-y-md">
        <FileUpload
          accept="image/*"
          maxSize={2 * 1024 * 1024} // 2MB
          value={files}
          onFileSelect={(newFiles) => {
            setFiles(newFiles);
            setError(null);
          }}
          onFileRemove={(file) => {
            setFiles(files.filter((f) => f !== file));
            setError(null);
          }}
          onError={setError}
        />
        {error && <div className="text-sm text-destructive">{error.message}</div>}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Image upload with validation (max 2MB, images only). Error displayed when validation fails.",
      },
    },
  },
};

/**
 * VisualVariants Story
 *
 * Demonstrates outline and filled visual variants.
 */
export const VisualVariants: Story = {
  render: () => (
    <div className="space-y-xl">
      <div>
        <h3 className="mb-sm text-sm font-medium">Outline Variant (Default)</h3>
        <FileUpload variant="outline" />
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Filled Variant</h3>
        <FileUpload variant="filled" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Visual variant comparison: outline (bordered) vs filled (background).",
      },
    },
  },
};

/**
 * WithInitialFiles Story
 *
 * Realistic use case: Pre-populate with existing files (e.g., edit mode).
 */
export const WithInitialFiles: Story = {
  render: () => {
    // Create mock File objects for demonstration
    const mockFile1 = new File(["content"], "document.pdf", {
      type: "application/pdf",
    });
    const mockFile2 = new File(["content"], "image.jpg", { type: "image/jpeg" });

    const [files, setFiles] = useState<File[]>([mockFile1, mockFile2]);

    return (
      <FileUpload
        value={files}
        multiple
        onFileSelect={setFiles}
        onFileRemove={(file) => {
          setFiles(files.filter((f) => f !== file));
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "File upload pre-populated with existing files. Useful for edit scenarios where files are already uploaded.",
      },
    },
  },
};
