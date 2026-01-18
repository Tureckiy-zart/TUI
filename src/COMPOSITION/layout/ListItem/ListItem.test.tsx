/**
 * ListItem Component Tests
 *
 * @status COMPLETE
 * @date 2026-01-01
 * @task TUNG_LIST_LISTITEM_COMPOSITION (C8 - Tests)
 *
 * Test Coverage:
 * - Render tests (li/div semantics)
 * - Interactive state tests (hover classes applied)
 * - Disabled state tests (pointer-events-none applied)
 * - Alignment tests (flex align-items)
 * - A11Y tests (semantic roles, focus-visible)
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ListItem } from "./ListItem";

describe("ListItem", () => {
  describe("Rendering", () => {
    it("renders as li by default", () => {
      const { container } = render(<ListItem>Item content</ListItem>);
      const listItem = container.querySelector("li");
      expect(listItem).toBeInTheDocument();
      expect(listItem).not.toHaveAttribute("role"); // Native li, no role needed
    });

    it("renders as div when as='div'", () => {
      const { container } = render(<ListItem as="div">Item content</ListItem>);
      const listItem = container.querySelector("div[role='listitem']");
      expect(listItem).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      render(<ListItem>Item content</ListItem>);
      expect(screen.getByText("Item content")).toBeInTheDocument();
    });

    it("renders complex children correctly", () => {
      render(
        <ListItem>
          <div data-testid="complex-child">
            <span>Title</span>
            <span>Description</span>
          </div>
        </ListItem>,
      );
      expect(screen.getByTestId("complex-child")).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });
  });

  describe("Interactive State", () => {
    it("does not apply interactive classes by default", () => {
      const { container } = render(<ListItem>Item</ListItem>);
      const listItem = container.querySelector("li");
      expect(listItem?.className).not.toContain("cursor-pointer");
      expect(listItem?.className).not.toContain("transition-colors");
    });

    it("applies interactive classes when interactive={true}", () => {
      const { container } = render(<ListItem interactive>Item</ListItem>);
      const listItem = container.querySelector("li");
      expect(listItem?.className).toContain("cursor-pointer");
      expect(listItem?.className).toContain("transition-colors");
      expect(listItem?.className).toContain("hover:bg-[hsl(var(--tm-muted))]/50");
    });

    it("applies focus-visible styling for interactive items", () => {
      const { container } = render(<ListItem interactive>Item</ListItem>);
      const listItem = container.querySelector("li");
      expect(listItem?.className).toContain("focus-visible:outline-none");
      expect(listItem?.className).toContain("focus-visible:ring-2");
      expect(listItem?.className).toContain("focus-visible:ring-[hsl(var(--tm-focus-ring))]");
    });
  });

  describe("Disabled State", () => {
    it("does not apply disabled classes by default", () => {
      const { container } = render(<ListItem>Item</ListItem>);
      const listItem = container.querySelector("li");
      expect(listItem?.className).not.toContain("opacity-50");
      expect(listItem?.className).not.toContain("pointer-events-none");
    });

    it("applies disabled classes when disabled={true}", () => {
      const { container } = render(<ListItem disabled>Item</ListItem>);
      const listItem = container.querySelector("li");
      expect(listItem?.className).toContain("opacity-50");
      expect(listItem?.className).toContain("pointer-events-none");
      expect(listItem?.className).toContain("cursor-not-allowed");
    });

    it("applies disabled state even when interactive={true}", () => {
      const { container } = render(
        <ListItem interactive disabled>
          Item
        </ListItem>,
      );
      const listItem = container.querySelector("li");
      // Disabled state overrides interactive (disabled takes precedence)
      expect(listItem?.className).toContain("opacity-50");
      expect(listItem?.className).toContain("pointer-events-none");
      expect(listItem?.className).toContain("cursor-not-allowed");
      // Interactive cursor-pointer should NOT be present when disabled
      expect(listItem?.className).not.toContain("cursor-pointer");
    });
  });

  describe("Alignment", () => {
    it("applies align-start by default", () => {
      const { container } = render(<ListItem>Item</ListItem>);
      const listItem = container.querySelector("li");
      expect(listItem?.className).toContain("items-start");
    });

    it("applies align-center when align='center'", () => {
      const { container } = render(<ListItem align="center">Item</ListItem>);
      const listItem = container.querySelector("li");
      expect(listItem?.className).toContain("items-center");
    });

    it("applies flexbox layout classes", () => {
      const { container } = render(<ListItem>Item</ListItem>);
      const listItem = container.querySelector("li");
      expect(listItem?.className).toContain("flex");
      expect(listItem?.className).toContain("w-full");
    });
  });

  describe("Accessibility", () => {
    it("adds role='listitem' to div elements", () => {
      const { container } = render(<ListItem as="div">Item</ListItem>);
      const listItem = container.querySelector("div[role='listitem']");
      expect(listItem).toBeInTheDocument();
    });

    it("does not add role to li elements (native semantics)", () => {
      const { container } = render(<ListItem as="li">Item</ListItem>);
      const listItem = container.querySelector("li");
      expect(listItem).toBeInTheDocument();
      expect(listItem).not.toHaveAttribute("role");
    });

    it("supports ARIA attributes", () => {
      const { container } = render(
        <ListItem aria-label="Custom item" aria-describedby="description">
          Item
        </ListItem>,
      );
      const listItem = container.querySelector("li");
      expect(listItem).toHaveAttribute("aria-label", "Custom item");
      expect(listItem).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("Motion Compliance", () => {
    it("uses transition-colors for interactive variant (motion token)", () => {
      const { container } = render(<ListItem interactive>Item</ListItem>);
      const listItem = container.querySelector("li");
      // transition-colors is motion token equivalent (respects prefers-reduced-motion)
      expect(listItem?.className).toContain("transition-colors");
    });

    it("does not apply motion classes for static items", () => {
      const { container } = render(<ListItem>Item</ListItem>);
      const listItem = container.querySelector("li");
      expect(listItem?.className).not.toContain("transition");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children", () => {
      render(<ListItem>{null}</ListItem>);
      const listItem = document.querySelector("li");
      expect(listItem).toBeInTheDocument();
      expect(listItem).toBeEmptyDOMElement();
    });

    it("forwards additional HTML attributes", () => {
      render(
        <ListItem data-testid="custom-item" tabIndex={0}>
          Item
        </ListItem>,
      );
      const listItem = screen.getByTestId("custom-item");
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveAttribute("tabIndex", "0");
    });

    it("applies custom className alongside variant classes", () => {
      const { container } = render(
        <ListItem interactive className="custom-class">
          Item
        </ListItem>,
      );
      const listItem = container.querySelector("li");
      expect(listItem?.className).toContain("custom-class");
      expect(listItem?.className).toContain("cursor-pointer");
    });
  });
});
