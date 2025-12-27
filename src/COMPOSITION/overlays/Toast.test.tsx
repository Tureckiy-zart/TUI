import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { axeCheck, renderWithTheme, userEventSetup } from "@/test/test-utils";

import { ToastAction, ToastClose, ToastDescription, ToastRoot, ToastTitle } from "./Toast";
import { ToastProvider } from "./ToastProvider";
import { ToastViewport } from "./ToastViewport";

describe("Toast", () => {
  describe("API Contract", () => {
    describe("Rendering", () => {
      it("renders toast when open=true", async () => {
        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
                <ToastTitle>Test Toast</ToastTitle>
                <ToastDescription>Test description</ToastDescription>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        expect(screen.getByText("Test Toast")).toBeInTheDocument();
        expect(screen.getByText("Test description")).toBeInTheDocument();
      });

      it("does not render toast when open=false", () => {
        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={false} onOpenChange={vi.fn()} variant="default">
                <ToastTitle>Test Toast</ToastTitle>
                <ToastDescription>Test description</ToastDescription>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        expect(screen.queryByText("Test Toast")).not.toBeInTheDocument();
        expect(screen.queryByText("Test description")).not.toBeInTheDocument();
      });

      it("renders toast with title only", () => {
        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
                <ToastTitle>Title Only</ToastTitle>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        expect(screen.getByText("Title Only")).toBeInTheDocument();
      });

      it("renders toast with description only", () => {
        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
                <ToastDescription>Description Only</ToastDescription>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        expect(screen.getByText("Description Only")).toBeInTheDocument();
      });
    });

    describe("Variants", () => {
      it("renders default variant", () => {
        const { container } = renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
                <ToastTitle>Default Toast</ToastTitle>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        expect(screen.getByText("Default Toast")).toBeInTheDocument();
        // Verify variant classes are applied
        expect(container.querySelector('[data-state="open"]')).toBeInTheDocument();
      });

      it("renders success variant", () => {
        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="success">
                <ToastTitle>Success Toast</ToastTitle>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        expect(screen.getByText("Success Toast")).toBeInTheDocument();
      });

      it("renders warning variant", () => {
        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="warning">
                <ToastTitle>Warning Toast</ToastTitle>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        expect(screen.getByText("Warning Toast")).toBeInTheDocument();
      });

      it("renders error variant", () => {
        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="error">
                <ToastTitle>Error Toast</ToastTitle>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        expect(screen.getByText("Error Toast")).toBeInTheDocument();
      });

      it("applies variant styles correctly", () => {
        const { container } = renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="success">
                <ToastTitle>Success</ToastTitle>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        const toast = container.querySelector('[data-state="open"]');
        expect(toast).toBeInTheDocument();
        // Variant classes should be applied via tokenCVA
        expect(toast?.className).toContain("bg-success");
      });
    });

    describe("Controlled Behavior", () => {
      it("calls onOpenChange when toast should close", async () => {
        const user = userEventSetup();
        const onOpenChange = vi.fn();

        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={onOpenChange} variant="default">
                <ToastTitle>Controlled Toast</ToastTitle>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        const closeButton = screen.getByRole("button", { name: /dismiss toast/i });
        await user.click(closeButton);

        await waitFor(() => {
          expect(onOpenChange).toHaveBeenCalledWith(false);
        });
      });

      it("calls onOpenChange when escape key pressed", async () => {
        const user = userEventSetup();
        const onOpenChange = vi.fn();

        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={onOpenChange} variant="default">
                <ToastTitle>Controlled Toast</ToastTitle>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        await user.keyboard("{Escape}");

        await waitFor(() => {
          expect(onOpenChange).toHaveBeenCalledWith(false);
        });
      });
    });

    describe("Action Button", () => {
      it("renders toast with action button", () => {
        const actionFn = vi.fn();

        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
                <ToastTitle>Toast with Action</ToastTitle>
                <ToastAction altText="Undo" onClick={actionFn}>
                  Undo
                </ToastAction>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        expect(screen.getByText("Toast with Action")).toBeInTheDocument();
        const actionButton = screen.getByRole("button", { name: /undo/i });
        expect(actionButton).toBeInTheDocument();
      });

      it("action button triggers onClick handler", async () => {
        const user = userEventSetup();
        const actionFn = vi.fn();

        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
                <ToastTitle>Action Test</ToastTitle>
                <ToastAction altText="Click Me" onClick={actionFn}>
                  Click Me
                </ToastAction>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        const actionButton = screen.getByRole("button", { name: /click me/i });
        await user.click(actionButton);

        expect(actionFn).toHaveBeenCalledTimes(1);
      });
    });

    describe("Close Button", () => {
      it("renders close button", () => {
        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
                <ToastTitle>Test Toast</ToastTitle>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        const closeButton = screen.getByRole("button", { name: /dismiss toast/i });
        expect(closeButton).toBeInTheDocument();
      });

      it("closes toast when close button clicked", async () => {
        const user = userEventSetup();
        const onOpenChange = vi.fn();

        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={onOpenChange} variant="default">
                <ToastTitle>Test Toast</ToastTitle>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        const closeButton = screen.getByRole("button", { name: /dismiss toast/i });
        await user.click(closeButton);

        await waitFor(() => {
          expect(onOpenChange).toHaveBeenCalledWith(false);
        });
      });
    });

    describe("Multiple Toasts", () => {
      it("renders multiple toasts", () => {
        renderWithTheme(
          <ToastProvider>
            <ToastViewport>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
                <ToastTitle>Toast 1</ToastTitle>
                <ToastClose />
              </ToastRoot>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="success">
                <ToastTitle>Toast 2</ToastTitle>
                <ToastClose />
              </ToastRoot>
              <ToastRoot open={true} onOpenChange={vi.fn()} variant="warning">
                <ToastTitle>Toast 3</ToastTitle>
                <ToastClose />
              </ToastRoot>
            </ToastViewport>
          </ToastProvider>,
        );

        expect(screen.getByText("Toast 1")).toBeInTheDocument();
        expect(screen.getByText("Toast 2")).toBeInTheDocument();
        expect(screen.getByText("Toast 3")).toBeInTheDocument();
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children", () => {
      renderWithTheme(
        <ToastProvider>
          <ToastViewport>
            <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
              <ToastClose />
            </ToastRoot>
          </ToastViewport>
        </ToastProvider>,
      );

      // Toast should render even without title/description
      const closeButton = screen.getByRole("button", { name: /dismiss toast/i });
      expect(closeButton).toBeInTheDocument();
    });

    it("handles very long title", () => {
      const longTitle = "A".repeat(200);
      renderWithTheme(
        <ToastProvider>
          <ToastViewport>
            <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
              <ToastTitle>{longTitle}</ToastTitle>
              <ToastClose />
            </ToastRoot>
          </ToastViewport>
        </ToastProvider>,
      );

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("handles very long description", () => {
      const longDescription = "B".repeat(500);
      renderWithTheme(
        <ToastProvider>
          <ToastViewport>
            <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
              <ToastTitle>Title</ToastTitle>
              <ToastDescription>{longDescription}</ToastDescription>
              <ToastClose />
            </ToastRoot>
          </ToastViewport>
        </ToastProvider>,
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("passes axe accessibility checks", async () => {
      const { container } = renderWithTheme(
        <ToastProvider>
          <ToastViewport>
            <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
              <ToastTitle>Test Toast</ToastTitle>
              <ToastDescription>Test description</ToastDescription>
              <ToastClose />
            </ToastRoot>
          </ToastViewport>
        </ToastProvider>,
      );

      await axeCheck(container);
    });

    it("has accessible close button with aria-label", () => {
      renderWithTheme(
        <ToastProvider>
          <ToastViewport>
            <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
              <ToastTitle>Test Toast</ToastTitle>
              <ToastClose />
            </ToastRoot>
          </ToastViewport>
        </ToastProvider>,
      );

      const closeButton = screen.getByRole("button", { name: /dismiss toast/i });
      expect(closeButton).toHaveAccessibleName("Dismiss toast");
    });

    it("has accessible action button with altText", () => {
      renderWithTheme(
        <ToastProvider>
          <ToastViewport>
            <ToastRoot open={true} onOpenChange={vi.fn()} variant="default">
              <ToastTitle>Action Toast</ToastTitle>
              <ToastAction altText="Undo" onClick={vi.fn()}>
                Undo
              </ToastAction>
              <ToastClose />
            </ToastRoot>
          </ToastViewport>
        </ToastProvider>,
      );

      const actionButton = screen.getByRole("button", { name: /undo/i });
      expect(actionButton).toHaveAccessibleName("Undo");
    });
  });
});
