import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "../../../test/test-utils";

import { Accordion } from "./Accordion";

describe("Accordion", () => {
  describe("Rendering", () => {
    it("renders accordion components", async () => {
      renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      await waitFor(() => {
        const trigger = screen.getByRole("button", { name: /item 1/i });
        expect(trigger).toBeInTheDocument();
      });
    });

    it("renders with default value", () => {
      renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger = screen.getByRole("button", { name: /item 1/i });
      expect(trigger).toHaveAttribute("data-state", "open");
    });

    it("forwards ref correctly to AccordionItem", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="item-1" ref={ref}>
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref correctly to AccordionTrigger", () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderWithTheme(
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger ref={ref} variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("forwards ref correctly to AccordionContent", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content ref={ref}>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      const { container } = renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content variant="primary">Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      const { container } = renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="secondary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content variant="secondary">Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders accent variant", () => {
      const { container } = renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="accent" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content variant="accent">Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders neutral variant", () => {
      const { container } = renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="neutral" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content variant="neutral">Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders sm size", () => {
      const { container } = renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="sm">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content size="sm">Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders md size (default)", () => {
      const { container } = renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content size="md">Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders lg size", () => {
      const { container } = renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="lg">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content size="lg">Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Behavior - Single Mode", () => {
    it("opens item on click", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger = screen.getByRole("button", { name: /item 1/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("data-state", "open");
      });
    });

    it("closes item on click when collapsible", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger = screen.getByRole("button", { name: /item 1/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("data-state", "closed");
      });
    });

    it("closes previous item when opening new item", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger variant="primary" size="md">
              Item 2
            </Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger1 = screen.getByRole("button", { name: /item 1/i });
      const trigger2 = screen.getByRole("button", { name: /item 2/i });

      await user.click(trigger2);

      await waitFor(() => {
        expect(trigger1).toHaveAttribute("data-state", "closed");
        expect(trigger2).toHaveAttribute("data-state", "open");
      });
    });
  });

  describe("Behavior - Multiple Mode", () => {
    it("allows multiple items open", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Accordion.Root type="multiple">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger variant="primary" size="md">
              Item 2
            </Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger1 = screen.getByRole("button", { name: /item 1/i });
      const trigger2 = screen.getByRole("button", { name: /item 2/i });

      await user.click(trigger1);
      await user.click(trigger2);

      await waitFor(() => {
        expect(trigger1).toHaveAttribute("data-state", "open");
        expect(trigger2).toHaveAttribute("data-state", "open");
      });
    });

    it("supports multiple default values", () => {
      renderWithTheme(
        <Accordion.Root type="multiple" defaultValue={["item-1", "item-2"]}>
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger variant="primary" size="md">
              Item 2
            </Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger1 = screen.getByRole("button", { name: /item 1/i });
      const trigger2 = screen.getByRole("button", { name: /item 2/i });

      expect(trigger1).toHaveAttribute("data-state", "open");
      expect(trigger2).toHaveAttribute("data-state", "open");
    });
  });

  describe("Behavior - Controlled Mode", () => {
    it("updates value via onValueChange callback", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <Accordion.Root type="single" value="item-1" onValueChange={onValueChange}>
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger variant="primary" size="md">
              Item 2
            </Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger2 = screen.getByRole("button", { name: /item 2/i });
      await user.click(trigger2);

      expect(onValueChange).toHaveBeenCalledWith("item-2");
    });
  });

  describe("Disabled State", () => {
    it("does not toggle when item is disabled", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="item-1" disabled>
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger = screen.getByRole("button", { name: /item 1/i });
      expect(trigger).toBeDisabled();

      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("data-state", "closed");
      });
    });

    it("disables all items when root is disabled", () => {
      renderWithTheme(
        <Accordion.Root type="single" disabled>
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger = screen.getByRole("button", { name: /item 1/i });
      expect(trigger).toBeDisabled();
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA attributes", () => {
      renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger = screen.getByRole("button", { name: /item 1/i });
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(trigger).toHaveAttribute("aria-controls");
    });

    it("has correct semantic roles", () => {
      const { container } = renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger = container.querySelector("button");
      const content = container.querySelector('[role="region"]');

      expect(trigger).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });

    it("has accessible name via trigger text", () => {
      renderWithTheme(
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              What is Tenerife Music?
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger = screen.getByRole("button", { name: /what is tenerife music\?/i });
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Keyboard Navigation", () => {
    it("toggles item with Enter key", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger = screen.getByRole("button", { name: /item 1/i });
      trigger.focus();
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(trigger).toHaveAttribute("data-state", "closed");
      });
    });

    it("toggles item with Space key", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger = screen.getByRole("button", { name: /item 1/i });
      trigger.focus();
      await user.keyboard(" ");

      await waitFor(() => {
        expect(trigger).toHaveAttribute("data-state", "closed");
      });
    });

    it("navigates between items with Arrow keys", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger variant="primary" size="md">
              Item 2
            </Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger1 = screen.getByRole("button", { name: /item 1/i });
      const trigger2 = screen.getByRole("button", { name: /item 2/i });

      trigger1.focus();
      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        expect(trigger2).toHaveFocus();
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content", () => {
      renderWithTheme(
        <Accordion.Root type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content></Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const trigger = screen.getByRole("button", { name: /item 1/i });
      expect(trigger).toBeInTheDocument();
    });

    it("handles multiple items with same value (should not happen but handled)", () => {
      renderWithTheme(
        <Accordion.Root type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-1">
            <Accordion.Trigger variant="primary" size="md">
              Item 1 Duplicate
            </Accordion.Trigger>
            <Accordion.Content>Content 1 Duplicate</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>,
      );

      const triggers = screen.getAllByRole("button");
      expect(triggers).toHaveLength(2);
    });
  });
});
