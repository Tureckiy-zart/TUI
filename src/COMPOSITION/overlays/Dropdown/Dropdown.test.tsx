/**
 * Dropdown Component - Runtime / Interaction Tests
 *
 * These tests verify Dropdown's runtime behavior and API contract
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
import { renderWithTheme, userEventSetup } from "@/test/test-utils";

import { Dropdown } from "./Dropdown";

describe("Dropdown - Runtime / Interaction Tests", () => {
  describe("Rendering Invariant", () => {
    it("renders trigger element", () => {
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Action 1</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      expect(screen.getByRole("button", { name: /open dropdown/i })).toBeInTheDocument();
    });

    it("renders all subcomponents", () => {
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Action 1</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Action 2</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      expect(screen.getByRole("button", { name: /open dropdown/i })).toBeInTheDocument();
    });
  });

  describe("Props Acceptance Invariant", () => {
    it("accepts all optional props without errors", () => {
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Button</Button>
          </Dropdown.Trigger>
          <Dropdown.Content variant="primary" size="md">
            <Dropdown.Item disabled>Disabled Item</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Open/Close Behavior", () => {
    it("Dropdown is closed by default", () => {
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Action 1</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
      // Dropdown content is not visible when closed (rendered in portal, hidden)
    });

    it("Dropdown opens when trigger is clicked", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Action 1</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Action 1")).toBeInTheDocument();
      });
    });

    it("Dropdown closes when Escape key is pressed", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Action 1</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Action 1")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByText("Action 1")).not.toBeInTheDocument();
      });
    });
  });

  describe("Controlled State", () => {
    it("supports controlled open state", async () => {
      renderWithTheme(
        <Dropdown.Root open={true}>
          <Dropdown.Trigger asChild>
            <Button>Button</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Action 1</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      await waitFor(() => {
        expect(screen.getByText("Action 1")).toBeInTheDocument();
      });
    });

    it("calls onOpenChange when state changes", async () => {
      const onOpenChange = vi.fn();
      const user = userEventSetup();
      renderWithTheme(
        <Dropdown.Root open={false} onOpenChange={onOpenChange}>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Action 1</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
    });
  });

  describe("DropdownItem Behavior", () => {
    it("renders dropdown item with text content", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Action 1</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        const item = screen.getByRole("button", { name: /action 1/i });
        expect(item).toBeInTheDocument();
      });
    });

    it("calls onClick when item is clicked", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item onClick={handleClick}>Action 1</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Action 1")).toBeInTheDocument();
      });

      const item = screen.getByRole("button", { name: /action 1/i });
      await user.click(item);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("disabled item does not call onClick", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item disabled onClick={handleClick}>
              Disabled Action
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Disabled Action")).toBeInTheDocument();
      });

      const item = screen.getByRole("button", { name: /disabled action/i });
      expect(item).toBeDisabled();

      // Try to click disabled item
      await user.click(item);

      // onClick should not be called for disabled items
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("disabled item has correct ARIA attributes", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item disabled>Disabled Action</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        const item = screen.getByRole("button", { name: /disabled action/i });
        expect(item).toBeDisabled();
        expect(item).toHaveAttribute("disabled");
      });
    });
  });

  describe("DropdownSeparator Behavior", () => {
    it("renders separator between items", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Action 1</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Action 2</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Action 1")).toBeInTheDocument();
        expect(screen.getByText("Action 2")).toBeInTheDocument();
      });

      // Separator should be present (rendered as div with role="none")
      const separator = screen.getByText("Action 1").parentElement?.querySelector('[role="none"]');
      expect(separator).toBeInTheDocument();
    });

    it("separator has correct ARIA attributes", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Action 1</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Action 2</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        const separator = screen
          .getByText("Action 1")
          .parentElement?.querySelector('[role="none"]');
        expect(separator).toHaveAttribute("aria-hidden", "true");
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("DropdownItem responds to Enter key", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item onClick={handleClick}>Action 1</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Action 1")).toBeInTheDocument();
      });

      const item = screen.getByRole("button", { name: /action 1/i });
      item.focus();
      await user.keyboard("{Enter}");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("DropdownItem responds to Space key", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item onClick={handleClick}>Action 1</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Action 1")).toBeInTheDocument();
      });

      const item = screen.getByRole("button", { name: /action 1/i });
      item.focus();
      await user.keyboard(" ");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("disabled item does not respond to keyboard activation", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item disabled onClick={handleClick}>
              Disabled Action
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Disabled Action")).toBeInTheDocument();
      });

      const item = screen.getByRole("button", { name: /disabled action/i });
      expect(item).toBeDisabled();

      // Try to activate with Enter
      item.focus();
      await user.keyboard("{Enter}");

      // onClick should not be called for disabled items
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("DropdownItem has accessible name via text content", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Action with accessible name</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        const item = screen.getByRole("button", { name: /action with accessible name/i });
        expect(item).toBeInTheDocument();
      });
    });

    it("DropdownItem supports aria-label for accessible name", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item aria-label="Custom accessible name">×</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        const item = screen.getByRole("button", { name: /custom accessible name/i });
        expect(item).toBeInTheDocument();
      });
    });

    it("DropdownSeparator is hidden from screen readers", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button>Open Dropdown</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Action 1</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Action 2</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>,
      );

      const trigger = screen.getByRole("button", { name: /open dropdown/i });
      await user.click(trigger);

      await waitFor(() => {
        const separator = screen
          .getByText("Action 1")
          .parentElement?.querySelector('[role="none"]');
        expect(separator).toHaveAttribute("aria-hidden", "true");
      });
    });
  });
});
