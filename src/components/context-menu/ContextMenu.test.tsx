import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "../../test/test-utils";

import { ContextMenu } from "./ContextMenu";

describe("ContextMenu", () => {
  describe("Rendering", () => {
    it("renders trigger element", () => {
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );
      const trigger = screen.getByText("Right-click me");
      expect(trigger).toBeInTheDocument();
    });

    it("renders context menu content when opened", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
            <ContextMenu.Item>Cut</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(screen.getByText("Copy")).toBeInTheDocument();
        expect(screen.getByText("Cut")).toBeInTheDocument();
      });
    });

    it("forwards ref correctly", async () => {
      const user = userEventSetup();
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content ref={ref}>
            <ContextMenu.Item>Test Item</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });
    });
  });

  describe("Open/Close Behavior", () => {
    it("opens context menu on right-click", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(screen.getByText("Copy")).toBeInTheDocument();
      });
    });

    it("calls onOpenChange when menu state changes", async () => {
      const user = userEventSetup();
      const onOpenChange = vi.fn();
      renderWithTheme(
        <ContextMenu.Root onOpenChange={onOpenChange}>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
    });
  });

  // Note: Keyboard navigation (Escape, Arrow keys) and focus management
  // are handled by Radix ContextMenu. We do not test Radix behavior, only our integration.

  describe("Disabled Items", () => {
    it("renders disabled items", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
            <ContextMenu.Item disabled>Cut (Disabled)</ContextMenu.Item>
            <ContextMenu.Item>Paste</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        const disabledItem = screen.getByText("Cut (Disabled)");
        expect(disabledItem).toBeInTheDocument();
        expect(disabledItem).toHaveAttribute("data-disabled");
      });
    });

    it("prevents interaction with disabled items", async () => {
      const user = userEventSetup();
      const onSelect = vi.fn();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item onSelect={onSelect}>Copy</ContextMenu.Item>
            <ContextMenu.Item disabled onSelect={onSelect}>
              Cut (Disabled)
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(screen.getByText("Cut (Disabled)")).toBeInTheDocument();
      });

      const disabledItem = screen.getByText("Cut (Disabled)");
      await user.click(disabledItem);

      // Disabled items should not trigger onSelect
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe("Checkbox Items", () => {
    it("renders checkbox items", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.CheckboxItem checked={false}>Show Grid</ContextMenu.CheckboxItem>
            <ContextMenu.CheckboxItem checked={true}>Show Rulers</ContextMenu.CheckboxItem>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(screen.getByText("Show Grid")).toBeInTheDocument();
        expect(screen.getByText("Show Rulers")).toBeInTheDocument();
      });
    });

    it("calls onCheckedChange when checkbox item is clicked", async () => {
      const user = userEventSetup();
      const onCheckedChange = vi.fn();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.CheckboxItem checked={false} onCheckedChange={onCheckedChange}>
              Show Grid
            </ContextMenu.CheckboxItem>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(screen.getByText("Show Grid")).toBeInTheDocument();
      });

      const checkboxItem = screen.getByText("Show Grid");
      await user.click(checkboxItem);

      await waitFor(() => {
        expect(onCheckedChange).toHaveBeenCalledWith(true);
      });
    });
  });

  describe("Radio Items", () => {
    it("renders radio items", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.RadioGroup value="option1">
              <ContextMenu.RadioItem value="option1">Option 1</ContextMenu.RadioItem>
              <ContextMenu.RadioItem value="option2">Option 2</ContextMenu.RadioItem>
            </ContextMenu.RadioGroup>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
      });
    });

    it("calls onValueChange when radio item is clicked", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.RadioGroup value="option1" onValueChange={onValueChange}>
              <ContextMenu.RadioItem value="option1">Option 1</ContextMenu.RadioItem>
              <ContextMenu.RadioItem value="option2">Option 2</ContextMenu.RadioItem>
            </ContextMenu.RadioGroup>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(screen.getByText("Option 2")).toBeInTheDocument();
      });

      const radioItem = screen.getByText("Option 2");
      await user.click(radioItem);

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option2");
      });
    });
  });

  describe("Submenu", () => {
    it("renders submenu", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger>Share</ContextMenu.SubTrigger>
              <ContextMenu.SubContent>
                <ContextMenu.Item>Email</ContextMenu.Item>
                <ContextMenu.Item>Link</ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Sub>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(screen.getByText("Share")).toBeInTheDocument();
      });
    });

    it("opens submenu on hover or keyboard", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger>Share</ContextMenu.SubTrigger>
              <ContextMenu.SubContent>
                <ContextMenu.Item>Email</ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Sub>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(screen.getByText("Share")).toBeInTheDocument();
      });

      const subTrigger = screen.getByText("Share");
      await user.hover(subTrigger);

      await waitFor(
        () => {
          expect(screen.getByText("Email")).toBeInTheDocument();
        },
        { timeout: 1000 },
      );
    });
  });

  describe("Separator and Label", () => {
    it("renders separator", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Delete</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(screen.getByText("Copy")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
      });
    });

    it("renders label", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <ContextMenu.Root>
          <ContextMenu.Trigger>Right-click me</ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Label>Actions</ContextMenu.Label>
            <ContextMenu.Item>Copy</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>,
      );

      const trigger = screen.getByText("Right-click me");
      await user.pointer({ keys: "[MouseRight>]", target: trigger });

      await waitFor(() => {
        expect(screen.getByText("Actions")).toBeInTheDocument();
        expect(screen.getByText("Copy")).toBeInTheDocument();
      });
    });
  });
});
