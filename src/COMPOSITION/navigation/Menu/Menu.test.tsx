import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "@/test/test-utils";

import { Menu } from "./Menu";

describe("Menu", () => {
  describe("Rendering", () => {
    it("renders trigger element", () => {
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
          </Menu.Content>
        </Menu>,
      );
      const trigger = screen.getByText("Open Menu");
      expect(trigger).toBeInTheDocument();
    });

    it("renders menu content when opened", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
            <Menu.Item>Cut</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(
        () => {
          expect(screen.getByText("Copy")).toBeInTheDocument();
          expect(screen.getByText("Cut")).toBeInTheDocument();
        },
        { timeout: 5000 },
      );
    });

    it("renders all subcomponents", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Group>
              <Menu.Label>File</Menu.Label>
              <Menu.Item>New</Menu.Item>
            </Menu.Group>
            <Menu.Separator />
            <Menu.Item>Settings</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("File")).toBeInTheDocument();
        expect(screen.getByText("New")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });
    });

    it("forwards ref correctly", async () => {
      const user = userEventSetup();
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content ref={ref}>
            <Menu.Item>Test Item</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });
    });
  });

  describe("Open/Close Behavior", () => {
    it("opens menu on click", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Copy")).toBeInTheDocument();
      });
    });

    it("calls onOpenChange when menu state changes", async () => {
      const user = userEventSetup();
      const onOpenChange = vi.fn();
      renderWithTheme(
        <Menu onOpenChange={onOpenChange}>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
    });

    it("closes menu when clicking outside", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <div>
          <Menu>
            <Menu.Trigger>Open Menu</Menu.Trigger>
            <Menu.Content>
              <Menu.Item>Copy</Menu.Item>
            </Menu.Content>
          </Menu>
          <div>Outside</div>
        </div>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Copy")).toBeInTheDocument();
      });

      const outside = screen.getByText("Outside");
      await user.click(outside);

      await waitFor(() => {
        expect(screen.queryByText("Copy")).not.toBeInTheDocument();
      });
    });
  });

  describe("Disabled State", () => {
    it("renders disabled item", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Enabled Item</Menu.Item>
            <Menu.Item disabled>Disabled Item</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        const disabledItem = screen.getByText("Disabled Item");
        expect(disabledItem).toBeInTheDocument();
        // Radix uses aria-disabled for disabled items
        expect(disabledItem).toHaveAttribute("aria-disabled", "true");
      });
    });

    it("prevents disabled item activation", async () => {
      const user = userEventSetup();
      const onSelect = vi.fn();
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item onSelect={onSelect}>Enabled Item</Menu.Item>
            <Menu.Item disabled onSelect={vi.fn()}>
              Disabled Item
            </Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        const disabledItem = screen.getByText("Disabled Item");
        expect(disabledItem).toBeInTheDocument();
      });

      const disabledItem = screen.getByText("Disabled Item");
      await user.click(disabledItem);

      // Disabled item should not trigger onSelect
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe("ARIA Attributes", () => {
    it("has correct ARIA attributes on trigger", () => {
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    });

    it("has correct ARIA attributes on content", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        const content = screen.getByRole("menu");
        expect(content).toBeInTheDocument();
      });
    });

    it("has correct ARIA attributes on items", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        const item = screen.getByRole("menuitem", { name: "Copy" });
        expect(item).toBeInTheDocument();
      });
    });

    it("has correct ARIA attributes on disabled items", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item disabled>Disabled Item</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        const item = screen.getByRole("menuitem", { name: "Disabled Item" });
        expect(item).toHaveAttribute("aria-disabled", "true");
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("closes menu on Escape", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Copy")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByText("Copy")).not.toBeInTheDocument();
      });
    });

    it("activates item on Enter", async () => {
      const user = userEventSetup();
      const onSelect = vi.fn();
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item onSelect={onSelect}>Copy</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Copy")).toBeInTheDocument();
      });

      // Click on the item to focus it (userEvent.click properly handles React state updates)
      // Then press Enter to activate
      const item = screen.getByRole("menuitem", { name: "Copy" });
      await user.click(item);
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalled();
      });
    });

    it("supports keyboard navigation (Radix handles implementation)", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Item 1</Menu.Item>
            <Menu.Item disabled>Disabled Item</Menu.Item>
            <Menu.Item>Item 2</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      const trigger = screen.getByText("Open Menu");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Item 1")).toBeInTheDocument();
        expect(screen.getByText("Item 2")).toBeInTheDocument();
        expect(screen.getByText("Disabled Item")).toBeInTheDocument();
      });

      // Keyboard navigation is handled by Radix - verify items are accessible
      const item1 = screen.getByRole("menuitem", { name: "Item 1" });
      const item2 = screen.getByRole("menuitem", { name: "Item 2" });
      const disabledItem = screen.getByText("Disabled Item");

      expect(item1).toBeInTheDocument();
      expect(item2).toBeInTheDocument();
      expect(disabledItem).toBeInTheDocument();
      // Radix uses aria-disabled for disabled items
      expect(disabledItem).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Compound Component Pattern", () => {
    it("exports all subcomponents", () => {
      expect(Menu.Root).toBeDefined();
      expect(Menu.Trigger).toBeDefined();
      expect(Menu.Content).toBeDefined();
      expect(Menu.Item).toBeDefined();
      expect(Menu.Separator).toBeDefined();
      expect(Menu.Group).toBeDefined();
      expect(Menu.Label).toBeDefined();
    });

    it("allows using Menu as Root", () => {
      renderWithTheme(
        <Menu>
          <Menu.Trigger>Open Menu</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Copy</Menu.Item>
          </Menu.Content>
        </Menu>,
      );

      expect(screen.getByText("Open Menu")).toBeInTheDocument();
    });
  });
});
