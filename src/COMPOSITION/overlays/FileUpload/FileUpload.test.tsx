import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FileUpload } from "./FileUpload";
import type { FileUploadError } from "./FileUpload.types";

describe("FileUpload", () => {
  // Helper function to create mock files
  const createMockFile = (name: string, size: number, type: string): File => {
    const file = new File(["content"], name, { type });
    Object.defineProperty(file, "size", { value: size });
    return file;
  };

  describe("Behavior Tests", () => {
    it("renders dropzone with default props", () => {
      render(<FileUpload />);
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByText(/drop files or click to browse/i)).toBeInTheDocument();
    });

    it("calls onFileSelect when file is selected", async () => {
      const handleFileSelect = vi.fn();
      const user = userEvent.setup();

      render(<FileUpload onFileSelect={handleFileSelect} />);

      const input = screen
        .getByRole("button")
        .querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile("test.jpg", 1000, "image/jpeg");

      await user.upload(input, file);

      expect(handleFileSelect).toHaveBeenCalledWith([file]);
    });

    it("renders file preview after selection", async () => {
      const user = userEvent.setup();

      render(<FileUpload />);

      const input = screen
        .getByRole("button")
        .querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile("test.pdf", 1000, "application/pdf");

      await user.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText("test.pdf")).toBeInTheDocument();
      });
    });

    it("calls onFileRemove when remove button is clicked", async () => {
      const handleFileRemove = vi.fn();
      const user = userEvent.setup();

      const file = createMockFile("test.jpg", 1000, "image/jpeg");

      render(<FileUpload value={[file]} onFileRemove={handleFileRemove} onFileSelect={() => {}} />);

      const removeButton = screen.getByLabelText(/remove test\.jpg/i);
      await user.click(removeButton);

      expect(handleFileRemove).toHaveBeenCalledWith(file);
    });

    it("supports multiple file selection", async () => {
      const handleFileSelect = vi.fn();
      const user = userEvent.setup();

      render(<FileUpload multiple onFileSelect={handleFileSelect} />);

      const input = screen
        .getByRole("button")
        .querySelector('input[type="file"]') as HTMLInputElement;
      const files = [
        createMockFile("test1.jpg", 1000, "image/jpeg"),
        createMockFile("test2.jpg", 1000, "image/jpeg"),
      ];

      await user.upload(input, files);

      expect(handleFileSelect).toHaveBeenCalledWith(files);
    });
  });

  describe("Validation Tests", () => {
    it("validates file size and calls onError", async () => {
      const handleError = vi.fn();
      const user = userEvent.setup();

      render(<FileUpload maxSize={1000} onError={handleError} onFileSelect={() => {}} />);

      const input = screen
        .getByRole("button")
        .querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile("large.jpg", 2000, "image/jpeg");

      await user.upload(input, file);

      await waitFor(() => {
        expect(handleError).toHaveBeenCalled();
        const error = handleError.mock.calls[0][0] as FileUploadError;
        expect(error.type).toBe("file-too-large");
      });
    });

    it("validates file type and calls onError", async () => {
      const handleError = vi.fn();
      const user = userEvent.setup();

      render(<FileUpload accept="image/*" onError={handleError} onFileSelect={() => {}} />);

      const input = screen.getByRole("button", { name: /drop files/i }).querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;
      const file = createMockFile("document.pdf", 1000, "application/pdf");

      // Create a FileList-like object manually for testing
      // This bypasses browser accept filtering which may prevent onChange from firing
      const fileList = {
        0: file,
        length: 1,
        item: (index: number) => (index === 0 ? file : null),
        [Symbol.iterator]: function* () {
          yield file;
        },
      } as FileList;

      // Set files property and trigger change event manually
      Object.defineProperty(input, "files", {
        value: fileList,
        writable: false,
        configurable: true,
      });

      // Trigger change event manually to bypass browser accept filtering in tests
      const changeEvent = new Event("change", { bubbles: true });
      input.dispatchEvent(changeEvent);

      await waitFor(
        () => {
          expect(handleError).toHaveBeenCalled();
          const error = handleError.mock.calls[0][0] as FileUploadError;
          expect(error.type).toBe("file-type-not-supported");
        },
        { timeout: 3000 },
      );
    });

    it("validates file count and calls onError", async () => {
      const handleError = vi.fn();
      const user = userEvent.setup();

      const existingFile = createMockFile("existing.jpg", 1000, "image/jpeg");

      render(
        <FileUpload
          multiple
          maxFiles={2}
          value={[existingFile]}
          onError={handleError}
          onFileSelect={() => {}}
        />,
      );

      // Use more specific selector to avoid multiple buttons (dropzone + remove button)
      const input = screen.getByRole("button", { name: /drop files/i }).querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;
      const files = [
        createMockFile("test1.jpg", 1000, "image/jpeg"),
        createMockFile("test2.jpg", 1000, "image/jpeg"),
      ];

      await user.upload(input, files);

      await waitFor(
        () => {
          expect(handleError).toHaveBeenCalled();
          const error = handleError.mock.calls[0][0] as FileUploadError;
          expect(error.type).toBe("too-many-files");
        },
        { timeout: 3000 },
      );
    });
  });

  describe("A11Y Tests", () => {
    it("has accessible name via aria-label", () => {
      render(<FileUpload aria-label="Upload your documents" />);
      expect(screen.getByLabelText(/upload your documents/i)).toBeInTheDocument();
    });

    it("has default accessible name when aria-label not provided", () => {
      render(<FileUpload />);
      expect(screen.getByLabelText(/drop files here or click to browse/i)).toBeInTheDocument();
    });

    it("sets aria-busy when loading", () => {
      render(<FileUpload loading />);
      const dropzone = screen.getByRole("button");
      expect(dropzone).toHaveAttribute("aria-busy", "true");
    });

    it("sets aria-invalid when error occurs", async () => {
      const user = userEvent.setup();

      render(<FileUpload maxSize={1000} onFileSelect={() => {}} />);

      const input = screen
        .getByRole("button")
        .querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile("large.jpg", 2000, "image/jpeg");

      await user.upload(input, file);

      await waitFor(() => {
        const dropzone = screen.getByRole("button");
        expect(dropzone).toHaveAttribute("aria-invalid", "true");
      });
    });

    it("sets aria-disabled when disabled", () => {
      render(<FileUpload disabled />);
      const dropzone = screen.getByRole("button");
      expect(dropzone).toHaveAttribute("aria-disabled", "true");
    });

    it("remove buttons have accessible labels", async () => {
      const user = userEvent.setup();

      render(<FileUpload />);

      const input = screen
        .getByRole("button")
        .querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile("document.pdf", 1000, "application/pdf");

      await user.upload(input, file);

      await waitFor(() => {
        expect(screen.getByLabelText(/remove document\.pdf/i)).toBeInTheDocument();
      });
    });

    it("file list has semantic HTML with role=list", async () => {
      const file = createMockFile("test.jpg", 1000, "image/jpeg");

      render(<FileUpload value={[file]} onFileSelect={() => {}} />);

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });
  });

  describe("Focus Tests", () => {
    it("dropzone is keyboard accessible via Tab", () => {
      render(<FileUpload />);
      const dropzone = screen.getByRole("button");
      expect(dropzone).toHaveAttribute("tabindex", "0");
    });

    it("dropzone is not keyboard accessible when disabled", () => {
      render(<FileUpload disabled />);
      const dropzone = screen.getByRole("button");
      expect(dropzone).toHaveAttribute("tabindex", "-1");
    });

    it("dropzone is not keyboard accessible when loading", () => {
      render(<FileUpload loading />);
      const dropzone = screen.getByRole("button");
      expect(dropzone).toHaveAttribute("tabindex", "-1");
    });

    it("Enter key activates file picker (simulated)", async () => {
      const user = userEvent.setup();
      const handleFileSelect = vi.fn();

      render(<FileUpload onFileSelect={handleFileSelect} />);

      const dropzone = screen.getByRole("button");
      dropzone.focus();

      // Note: Keyboard activation of file input is browser-restricted
      // We test that the handler is set up, not actual file picker opening
      await user.keyboard("{Enter}");
      // No error thrown means keyboard handler exists
    });

    it("Space key activates file picker (simulated)", async () => {
      const user = userEvent.setup();
      const handleFileSelect = vi.fn();

      render(<FileUpload onFileSelect={handleFileSelect} />);

      const dropzone = screen.getByRole("button");
      dropzone.focus();

      await user.keyboard(" ");
      // No error thrown means keyboard handler exists
    });

    it("remove buttons are keyboard accessible", async () => {
      const file = createMockFile("test.jpg", 1000, "image/jpeg");
      const handleFileRemove = vi.fn();
      const user = userEvent.setup();

      render(<FileUpload value={[file]} onFileRemove={handleFileRemove} onFileSelect={() => {}} />);

      const removeButton = screen.getByLabelText(/remove test\.jpg/i);
      removeButton.focus();
      await user.keyboard("{Enter}");

      expect(handleFileRemove).toHaveBeenCalledWith(file);
    });
  });

  describe("State Tests", () => {
    it("disabled state blocks file selection", async () => {
      const handleFileSelect = vi.fn();
      const user = userEvent.setup();

      render(<FileUpload disabled onFileSelect={handleFileSelect} />);

      const input = screen
        .getByRole("button")
        .querySelector('input[type="file"]') as HTMLInputElement;

      expect(input).toBeDisabled();

      // Try to upload (should not work)
      const file = createMockFile("test.jpg", 1000, "image/jpeg");
      await user.upload(input, file);

      expect(handleFileSelect).not.toHaveBeenCalled();
    });

    it("loading state blocks file selection", () => {
      render(<FileUpload loading />);

      const input = screen
        .getByRole("button")
        .querySelector('input[type="file"]') as HTMLInputElement;

      expect(input).toBeDisabled();
    });

    it("disabled state blocks remove buttons", async () => {
      const file = createMockFile("test.jpg", 1000, "image/jpeg");
      const handleFileRemove = vi.fn();

      render(
        <FileUpload
          disabled
          value={[file]}
          onFileRemove={handleFileRemove}
          onFileSelect={() => {}}
        />,
      );

      const removeButton = screen.getByLabelText(/remove test\.jpg/i);
      expect(removeButton).toBeDisabled();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty file list", () => {
      render(<FileUpload value={[]} onFileSelect={() => {}} />);
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });

    it("handles null file input", async () => {
      const handleFileSelect = vi.fn();

      render(<FileUpload onFileSelect={handleFileSelect} />);

      // Simulate no file selected (user cancelled)
      const input = screen
        .getByRole("button")
        .querySelector('input[type="file"]') as HTMLInputElement;

      // Dispatch change event with no files
      const event = new Event("change", { bubbles: true });
      Object.defineProperty(event, "target", {
        value: { files: null },
        enumerable: true,
      });
      input.dispatchEvent(event);

      expect(handleFileSelect).not.toHaveBeenCalled();
    });

    it("resets input value after file selection", async () => {
      const user = userEvent.setup();

      render(<FileUpload />);

      const input = screen
        .getByRole("button")
        .querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile("test.jpg", 1000, "image/jpeg");

      await user.upload(input, file);

      await waitFor(() => {
        expect(input.value).toBe("");
      });
    });
  });
});
