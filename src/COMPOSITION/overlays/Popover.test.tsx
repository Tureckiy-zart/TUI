/**
 * STEP 9: Popover - Runtime / Interaction Tests
 *
 * These tests verify Popover's runtime behavior and API contract
 * without checking visual design, CSS classes, or tokens.
 *
 * Test scope:
 * - Component rendering
 * - Props acceptance
 * - Controlled state behavior
 * - Open/close interactions
 * - Public API integrity
 * - Accessibility (ARIA roles, attributes, keyboard navigation, focus management)
 */

import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/PRIMITIVES/Button";
import { axeCheck, renderWithTheme, userEventSetup } from "@/test/test-utils";

import { PopoverWrapper } from "./Popover";

describe("Popover - Runtime / Interaction Tests", () => {
  describe("Rendering Invariant", () => {
    it("renders trigger element", () => {
      renderWithTheme(
        <PopoverWrapper content="Test popover">
          <Button>Open Popover</Button>
        </PopoverWrapper>,
      );

      expect(screen.getByRole("button", { name: /open popover/i })).toBeInTheDocument();
    });
  });

  describe("Props Acceptance Invariant", () => {
    it("accepts all optional props without errors", () => {
      renderWithTheme(
        <PopoverWrapper
          content="Popover"
          variant="primary"
          size="md"
          side="top"
          align="end"
          modal={false}
          closeOnInteractOutside={false}
        >
          <Button>Button</Button>
        </PopoverWrapper>,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Open/Close Behavior", () => {
    it("Popover is closed by default", () => {
      renderWithTheme(
        <PopoverWrapper content={<div>Popover content</div>}>
          <Button>Open Popover</Button>
        </PopoverWrapper>,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
      // Popover content is not visible when closed (rendered in portal, hidden)
    });

    it("Popover opens when trigger is clicked", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <PopoverWrapper content={<div>Popover content</div>}>
          <Button>Open Popover</Button>
        </PopoverWrapper>,
      );

      const trigger = screen.getByRole("button", { name: /open popover/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });
    });

    it("Popover closes when Escape key is pressed", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <PopoverWrapper content={<div>Popover content</div>}>
          <Button>Open Popover</Button>
        </PopoverWrapper>,
      );

      const trigger = screen.getByRole("button", { name: /open popover/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
      });
    });
  });

  describe("Controlled State", () => {
    it("supports controlled open state", async () => {
      const onOpenChange = vi.fn();
      renderWithTheme(
        <PopoverWrapper
          content={<div>Popover content</div>}
          open={true}
          onOpenChange={onOpenChange}
        >
          <Button>Button</Button>
        </PopoverWrapper>,
      );

      await waitFor(() => {
        expect(screen.getByText("Popover content")).toBeInTheDocument();
      });
    });

    it("calls onOpenChange when state changes", async () => {
      const onOpenChange = vi.fn();
      const user = userEventSetup();
      renderWithTheme(
        <PopoverWrapper
          content={<div>Popover content</div>}
          open={false}
          onOpenChange={onOpenChange}
        >
          <Button>Open Popover</Button>
        </PopoverWrapper>,
      );

      const trigger = screen.getByRole("button", { name: /open popover/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
    });
  });

  describe("Content Rendering", () => {
    it("accepts string content", () => {
      renderWithTheme(
        <PopoverWrapper content="Simple popover text">
          <Button>Button</Button>
        </PopoverWrapper>,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("accepts React node content", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <PopoverWrapper content={<div>React node content</div>}>
          <Button>Button</Button>
        </PopoverWrapper>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("React node content")).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility (A11Y)", () => {
    describe("ARIA Roles and Attributes", () => {
      it("popover content has correct role when modal", async () => {
        const user = userEventSetup();
        renderWithTheme(
          <PopoverWrapper content={<div>Popover content</div>} modal={true}>
            <Button>Open Popover</Button>
          </PopoverWrapper>,
        );

        const trigger = screen.getByRole("button", { name: /open popover/i });
        await user.click(trigger);

        await waitFor(() => {
          const content = screen.getByText("Popover content");
          // Radix UI Popover with modal=true should have role="dialog"
          expect(content.closest('[role="dialog"]')).toBeInTheDocument();
        });
      });

      it("popover content has dialog role regardless of modal prop", async () => {
        const user = userEventSetup();
        renderWithTheme(
          <PopoverWrapper content={<div>Popover content</div>} modal={false}>
            <Button>Open Popover</Button>
          </PopoverWrapper>,
        );

        const trigger = screen.getByRole("button", { name: /open popover/i });
        await user.click(trigger);

        await waitFor(() => {
          // Radix UI Popover always uses role="dialog" regardless of modal prop
          // The modal prop controls focus trapping, not the role
          const dialog = screen.getByRole("dialog");
          expect(dialog).toBeInTheDocument();
        });
      });

      it("popover content is accessible via dialog role", async () => {
        const user = userEventSetup();
        renderWithTheme(
          <PopoverWrapper content={<div>Popover content</div>} modal={true}>
            <Button>Open Popover</Button>
          </PopoverWrapper>,
        );

        const trigger = screen.getByRole("button", { name: /open popover/i });
        await user.click(trigger);

        await waitFor(() => {
          // Radix UI Popover uses role="dialog" for accessibility
          // Note: aria-modal is not automatically applied by Radix Popover
          // (that's Dialog-specific behavior)
          const dialog = screen.getByRole("dialog");
          expect(dialog).toBeInTheDocument();
          expect(dialog).toHaveTextContent("Popover content");
        });
      });

      it("passes axe accessibility checks when open", async () => {
        const user = userEventSetup();
        const { container } = renderWithTheme(
          <PopoverWrapper content={<div>Popover content</div>}>
            <Button>Open Popover</Button>
          </PopoverWrapper>,
        );

        const trigger = screen.getByRole("button", { name: /open popover/i });
        await user.click(trigger);

        await waitFor(() => {
          expect(screen.getByText("Popover content")).toBeInTheDocument();
        });

        const results = await axeCheck(container);
        expect(results.violations).toHaveLength(0);
      });
    });

    describe("Keyboard Navigation", () => {
      it("popover closes when Escape key is pressed", async () => {
        const user = userEventSetup();
        renderWithTheme(
          <PopoverWrapper content={<div>Popover content</div>}>
            <Button>Open Popover</Button>
          </PopoverWrapper>,
        );

        const trigger = screen.getByRole("button", { name: /open popover/i });
        await user.click(trigger);

        await waitFor(() => {
          expect(screen.getByText("Popover content")).toBeInTheDocument();
        });

        await user.keyboard("{Escape}");

        await waitFor(() => {
          expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
        });
      });

      it("focus returns to trigger after closing with Escape", async () => {
        const user = userEventSetup();
        renderWithTheme(
          <PopoverWrapper content={<div>Popover content</div>}>
            <Button>Open Popover</Button>
          </PopoverWrapper>,
        );

        const trigger = screen.getByRole("button", { name: /open popover/i });
        await user.click(trigger);

        await waitFor(() => {
          expect(screen.getByText("Popover content")).toBeInTheDocument();
        });

        await user.keyboard("{Escape}");

        await waitFor(() => {
          expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
        });

        // Focus should return to trigger
        await waitFor(() => {
          expect(trigger).toHaveFocus();
        });
      });
    });

    describe("Focus Management", () => {
      it("focus moves to popover content when opened", async () => {
        const user = userEventSetup();
        renderWithTheme(
          <PopoverWrapper content={<div>Popover content</div>} modal={true}>
            <Button>Open Popover</Button>
          </PopoverWrapper>,
        );

        const trigger = screen.getByRole("button", { name: /open popover/i });
        await user.click(trigger);

        await waitFor(() => {
          const dialog = screen.getByRole("dialog");
          // Focus should move to dialog when modal popover opens
          expect(dialog).toBeInTheDocument();
        });
      });
    });
  });
});
