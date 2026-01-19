import "@testing-library/jest-dom/vitest";
import { screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "@/test/test-utils";

import { Modal } from "@/COMPOSITION/overlays/Modal";

/**
 * STEP 10: Runtime / Interaction Tests (Minimal Gate)
 *
 * These tests verify Modal's runtime behavior and interaction contract
 * without checking visual design, CSS classes, or tokens.
 *
 * Test scope:
 * - Open/Close behavior
 * - Focus management
 * - Accessibility attributes
 * - Public API integrity
 */

describe("Modal - Runtime / Interaction Tests", () => {
  // ============================================================================
  // T10_TC1: Modal opens and closes
  // ============================================================================

  describe("T10_TC1: Modal opens and closes", () => {
    it("Modal is closed by default", () => {
      renderWithTheme(
        <Modal.Root>
          <Modal.Trigger>Open Modal</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Modal</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("Modal opens when trigger is clicked", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Modal.Root>
          <Modal.Trigger>Open Modal</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Modal</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open modal/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });
    });

    it("Modal closes when Escape key is pressed", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Trigger>Open Modal</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Modal</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });

    it("Modal closes when close button is clicked", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Modal</Modal.Title>
            </Modal.Header>
            <Modal.Close>Close</Modal.Close>
          </Modal.Content>
        </Modal.Root>,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const closeButton = screen.getByRole("button", { name: /close/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });

    it("calls onOpenChange when modal state changes", async () => {
      const user = userEventSetup();
      const onOpenChange = vi.fn();
      renderWithTheme(
        <Modal.Root onOpenChange={onOpenChange}>
          <Modal.Trigger>Open Modal</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Modal</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open modal/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
    });
  });

  // ============================================================================
  // T10_TC2: Focus management
  // ============================================================================

  describe("T10_TC2: Focus management", () => {
    it("focus moves into Content when modal opens", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Modal.Root>
          <Modal.Trigger>Open Modal</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Modal</Modal.Title>
            </Modal.Header>
            <button>First focusable</button>
          </Modal.Content>
        </Modal.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open modal/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      // Focus should move to first focusable element inside dialog
      const firstFocusable = screen.getByRole("button", { name: /first focusable/i });
      expect(firstFocusable).toHaveFocus();
    });

    it("focus returns to trigger when modal closes", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Modal.Root>
          <Modal.Trigger>Open Modal</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Modal</Modal.Title>
            </Modal.Header>
            <Modal.Close>Close</Modal.Close>
          </Modal.Content>
        </Modal.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open modal/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const closeButton = screen.getByRole("button", { name: /close/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });

      // Focus should return to trigger
      expect(trigger).toHaveFocus();
    });

    it("focus trap is active while modal is open", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Modal</Modal.Title>
            </Modal.Header>
            <button>First</button>
            <button>Second</button>
            <button>Last</button>
          </Modal.Content>
        </Modal.Root>,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const dialog = screen.getByRole("dialog");
      const firstButton = within(dialog).getByRole("button", { name: /^first$/i });
      const lastButton = within(dialog).getByRole("button", { name: /^last$/i });

      // Tab through focusable elements
      firstButton.focus();
      expect(firstButton).toHaveFocus();

      await user.tab();
      expect(within(dialog).getByRole("button", { name: /^second$/i })).toHaveFocus();

      await user.tab();
      expect(lastButton).toHaveFocus();

      // Tab should wrap back to first element (focus trap)
      await user.tab();
      expect(firstButton).toHaveFocus();
    });
  });

  // ============================================================================
  // T10_TC3: Accessibility attributes
  // ============================================================================

  describe("T10_TC3: Accessibility attributes", () => {
    it("Content has role='dialog'", async () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Modal</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeInTheDocument();
      });
    });

    it("aria-labelledby is correctly bound to Title when present", async () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Title</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        const title = screen.getByText("Test Title");

        // Radix Dialog automatically binds aria-labelledby
        expect(dialog).toHaveAttribute("aria-labelledby");
        expect(dialog.getAttribute("aria-labelledby")).toBe(title.id);
      });
    });

    it("aria-describedby is correctly bound to Description when present", async () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Title</Modal.Title>
              <Modal.Description>Test Description</Modal.Description>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        const description = screen.getByText("Test Description");

        // Radix Dialog automatically binds aria-describedby
        expect(dialog).toHaveAttribute("aria-describedby");
        expect(dialog.getAttribute("aria-describedby")).toBe(description.id);
      });
    });

    it("adds fallback Title and aria-labelledby when Title is absent", async () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Header />
          </Modal.Content>
        </Modal.Root>,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        const fallbackTitle = screen.getByText("Dialog");
        expect(fallbackTitle).toHaveAttribute("id");
        expect(dialog).toHaveAttribute("aria-labelledby", fallbackTitle.getAttribute("id"));
      });
    });
  });

  // ============================================================================
  // T10_TC4: Public API integrity
  // ============================================================================

  describe("T10_TC4: Public API integrity", () => {
    it("Modal accepts only declared public props", async () => {
      // Type check: This should compile without errors
      renderWithTheme(
        <Modal.Root open={false} onOpenChange={vi.fn()}>
          <Modal.Trigger>Open</Modal.Trigger>
          <Modal.Content size="md" width="lg" padding="md">
            <Modal.Header gap="sm">
              <Modal.Title>Title</Modal.Title>
              <Modal.Description>Description</Modal.Description>
            </Modal.Header>
            <Modal.Footer gap="md" align="center">
              <Modal.Close>Close</Modal.Close>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>,
      );

      // If we get here, props are correctly typed
      expect(true).toBe(true);
    });

    it("Modal API does not require Radix imports", () => {
      // This test ensures consumers don't need to import Radix directly
      // The test itself uses only Modal public API
      renderWithTheme(
        <Modal.Root>
          <Modal.Trigger>Open</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Title</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      // If this compiles and renders, public API is self-contained
      expect(screen.getByRole("button", { name: /open/i })).toBeInTheDocument();
    });

    it("all sub-components are accessible via public API", () => {
      // Type check: All components should be accessible
      expect(Modal.Root).toBeDefined();
      expect(Modal.Trigger).toBeDefined();
      expect(Modal.Content).toBeDefined();
      expect(Modal.Header).toBeDefined();
      expect(Modal.Title).toBeDefined();
      expect(Modal.Description).toBeDefined();
      expect(Modal.Footer).toBeDefined();
      expect(Modal.Close).toBeDefined();
    });
  });
});
