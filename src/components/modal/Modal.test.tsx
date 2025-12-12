import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "../../test/test-utils";

import { Modal } from "./Modal";

describe("Modal", () => {
  describe("Rendering", () => {
    it("renders trigger element", () => {
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
      expect(trigger).toBeInTheDocument();
    });

    it("renders modal content when open", async () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Trigger>Open Modal</Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Modal</Modal.Title>
              <Modal.Description>Test description</Modal.Description>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByText("Test Modal")).toBeInTheDocument();
        expect(screen.getByText("Test description")).toBeInTheDocument();
      });
    });

    it("does not render modal content when closed", () => {
      renderWithTheme(
        <Modal.Root defaultOpen={false}>
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

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content ref={ref}>
            <Modal.Header>
              <Modal.Title>Ref test</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Open/Close Behavior", () => {
    it("opens modal when trigger is clicked", async () => {
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

    it("closes modal when close button is clicked", async () => {
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

  // Note: Keyboard navigation, focus trap, overlay interaction, and portal rendering
  // are all handled by Radix Dialog. We do not test Radix behavior, only our integration.

  describe("Token Props", () => {
    it("applies size token correctly", () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content size="sm" data-testid="modal-content">
            <Modal.Header>
              <Modal.Title>Small Modal</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      const content = screen.getByTestId("modal-content");
      expect(content).toBeInTheDocument();
      // Check that size classes are applied
      expect(content).toHaveClass("max-w-sm");
    });

    it("applies width token correctly", () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content width="lg" data-testid="modal-content">
            <Modal.Header>
              <Modal.Title>Modal with Width</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      const content = screen.getByTestId("modal-content");
      expect(content).toBeInTheDocument();
      // Check that width classes are applied
      expect(content).toHaveClass("max-w-lg");
    });

    it("applies footer align token correctly", () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Footer align="center" data-testid="modal-footer">
              <button>Button</button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>,
      );

      const footer = screen.getByTestId("modal-footer");
      expect(footer).toBeInTheDocument();
      // Check that align classes are applied
      expect(footer).toHaveClass("justify-center");
    });
  });

  describe("Subcomponents", () => {
    it("renders ModalHeader correctly", () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Header data-testid="modal-header">
              <Modal.Title>Test Title</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      const header = screen.getByTestId("modal-header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass("flex", "flex-col");
    });

    it("renders ModalTitle correctly", () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Title</Modal.Title>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      const title = screen.getByText("Test Title");
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H2"); // Radix Dialog.Title renders as h2
    });

    it("renders ModalDescription correctly", () => {
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

      const description = screen.getByText("Test Description");
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe("P"); // Radix Dialog.Description renders as p
    });

    it("renders ModalFooter correctly", () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Footer data-testid="modal-footer">
              <button>Button</button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>,
      );

      const footer = screen.getByTestId("modal-footer");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass("flex");
    });
  });

  describe("Accessibility", () => {
    it("has dialog role for screen readers", async () => {
      renderWithTheme(
        <Modal.Root defaultOpen>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Test Modal</Modal.Title>
              <Modal.Description>Test description</Modal.Description>
            </Modal.Header>
          </Modal.Content>
        </Modal.Root>,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeInTheDocument();
        // Radix Dialog handles all ARIA attributes automatically
        // We only verify that the dialog is accessible via role
      });
    });
  });
});
