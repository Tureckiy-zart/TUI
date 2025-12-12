import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "../../../test/test-utils";

import { Tabs } from "./Tabs";

describe("Tabs", () => {
  describe("Rendering", () => {
    it("renders tabs components", () => {
      renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs.Root>,
      );

      const tab1 = screen.getByRole("tab", { name: /tab 1/i });
      const tab2 = screen.getByRole("tab", { name: /tab 2/i });
      expect(tab1).toBeInTheDocument();
      expect(tab2).toBeInTheDocument();
    });

    it("renders with default value", () => {
      renderWithTheme(
        <Tabs.Root defaultValue="tab2">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs.Root>,
      );

      const tab2 = screen.getByRole("tab", { name: /tab 2/i });
      expect(tab2).toHaveAttribute("data-state", "active");
    });

    it("forwards ref correctly to TabsList", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List ref={ref}>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs.Root>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref correctly to TabsTrigger", () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger ref={ref} value="tab1">
              Tab 1
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs.Root>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("forwards ref correctly to TabsContent", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" ref={ref}>
            Content 1
          </Tabs.Content>
        </Tabs.Root>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Variants", () => {
    it("renders underline variant", () => {
      const { container } = renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List variant="underline">
            <Tabs.Trigger value="tab1" variant="underline">
              Tab 1
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs.Root>,
      );
      const trigger = container.querySelector("button[role='tab']");
      expect(trigger).toBeInTheDocument();
    });

    it("renders pill variant", () => {
      const { container } = renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List variant="pill">
            <Tabs.Trigger value="tab1" variant="pill">
              Tab 1
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs.Root>,
      );
      const trigger = container.querySelector("button[role='tab']");
      expect(trigger).toBeInTheDocument();
    });

    it("renders segmented variant", () => {
      const { container } = renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List variant="segmented">
            <Tabs.Trigger value="tab1" variant="segmented">
              Tab 1
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
        </Tabs.Root>,
      );
      const trigger = container.querySelector("button[role='tab']");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders sm size", () => {
      const { container } = renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List size="sm">
            <Tabs.Trigger value="tab1" size="sm">
              Tab 1
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" size="sm">
            Content 1
          </Tabs.Content>
        </Tabs.Root>,
      );
      const trigger = container.querySelector("button[role='tab']");
      expect(trigger).toBeInTheDocument();
    });

    it("renders md size (default)", () => {
      const { container } = renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List size="md">
            <Tabs.Trigger value="tab1" size="md">
              Tab 1
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" size="md">
            Content 1
          </Tabs.Content>
        </Tabs.Root>,
      );
      const trigger = container.querySelector("button[role='tab']");
      expect(trigger).toBeInTheDocument();
    });

    it("renders lg size", () => {
      const { container } = renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List size="lg">
            <Tabs.Trigger value="tab1" size="lg">
              Tab 1
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" size="lg">
            Content 1
          </Tabs.Content>
        </Tabs.Root>,
      );
      const trigger = container.querySelector("button[role='tab']");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Click Interaction", () => {
    it("switches tab on click", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <Tabs.Root defaultValue="tab1" onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs.Root>,
      );

      const tab2 = screen.getByRole("tab", { name: /tab 2/i });
      await user.click(tab2);

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("tab2");
      });
    });

    it("shows correct content when tab is active", async () => {
      const user = userEventSetup();

      renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs.Root>,
      );

      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.queryByText("Content 2")).not.toBeInTheDocument();

      const tab2 = screen.getByRole("tab", { name: /tab 2/i });
      await user.click(tab2);

      await waitFor(() => {
        expect(screen.getByText("Content 2")).toBeInTheDocument();
        expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
      });
    });
  });

  // Note: Keyboard navigation (Arrow keys, Home, End) is handled by Radix Tabs.
  // We do not test Radix behavior, only our component integration and token usage.

  describe("Disabled State", () => {
    it("does not switch when disabled", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <Tabs.Root defaultValue="tab1" onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2" disabled>
              Tab 2 (Disabled)
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs.Root>,
      );

      const disabledTab = screen.getByRole("tab", { name: /tab 2.*disabled/i });
      expect(disabledTab).toBeDisabled();

      await user.click(disabledTab);

      await waitFor(() => {
        expect(onValueChange).not.toHaveBeenCalled();
      });
    });
  });

  describe("Accessibility", () => {
    it("renders tabs with correct roles for screen readers", () => {
      renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs.Root>,
      );

      // Verify basic accessibility structure
      // Radix Tabs handles all ARIA attributes automatically
      const tab1 = screen.getByRole("tab", { name: /tab 1/i });
      expect(tab1).toBeInTheDocument();

      const panel1 = screen.getByRole("tabpanel", { name: /tab 1/i });
      expect(panel1).toBeInTheDocument();
    });
  });

  describe("Controlled Mode", () => {
    it("updates value when controlled", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <Tabs.Root value="tab1" onValueChange={onValueChange}>
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs.Root>,
      );

      const tab1 = screen.getByRole("tab", { name: /tab 1/i });
      expect(tab1).toHaveAttribute("data-state", "active");

      const tab2 = screen.getByRole("tab", { name: /tab 2/i });
      await user.click(tab2);

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("tab2");
      });
    });
  });

  describe("Uncontrolled Mode", () => {
    it("manages state internally", async () => {
      const user = userEventSetup();

      renderWithTheme(
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs.Root>,
      );

      expect(screen.getByText("Content 1")).toBeInTheDocument();

      const tab2 = screen.getByRole("tab", { name: /tab 2/i });
      await user.click(tab2);

      await waitFor(() => {
        expect(screen.getByText("Content 2")).toBeInTheDocument();
        expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
      });
    });
  });
});
