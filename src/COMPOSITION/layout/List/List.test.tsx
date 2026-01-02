/**
 * List Component Tests
 *
 * @status COMPLETE
 * @date 2026-01-01
 * @task TUNG_LIST_LISTITEM_COMPOSITION (C8 - Tests)
 *
 * Test Coverage:
 * - Render tests (ul/ol/div semantics)
 * - Divider injection count verification (n-1 dividers for n items)
 * - Divider inset prop forwarding
 * - Stack composition verification
 * - Accessibility tests (role="list" for div elements)
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { List } from "./List";
import { ListItem } from "../ListItem/ListItem";

describe("List", () => {
  describe("Rendering", () => {
    it("renders as div by default", () => {
      const { container } = render(
        <List>
          <ListItem>Item 1</ListItem>
        </List>,
      );
      const list = container.querySelector("div[role='list']");
      expect(list).toBeInTheDocument();
    });

    it("renders as ul when as='ul'", () => {
      const { container } = render(
        <List as="ul">
          <ListItem>Item 1</ListItem>
        </List>,
      );
      const list = container.querySelector("ul");
      expect(list).toBeInTheDocument();
      expect(list).not.toHaveAttribute("role"); // Native ul, no role needed
    });

    it("renders as ol when as='ol'", () => {
      const { container } = render(
        <List as="ol">
          <ListItem>Item 1</ListItem>
        </List>,
      );
      const list = container.querySelector("ol");
      expect(list).toBeInTheDocument();
      expect(list).not.toHaveAttribute("role"); // Native ol, no role needed
    });

    it("renders children correctly", () => {
      render(
        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>,
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
      expect(screen.getByText("Item 3")).toBeInTheDocument();
    });
  });

  describe("Divider Injection", () => {
    it("does not inject dividers by default", () => {
      const { container } = render(
        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>,
      );
      const dividers = container.querySelectorAll("hr, div[role='none']");
      expect(dividers.length).toBe(0);
    });

    it("injects n-1 dividers for n items when divided={true}", () => {
      const { container } = render(
        <List divided>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>,
      );
      // 3 items → 2 dividers (between items, not after last)
      const dividers = container.querySelectorAll("hr");
      expect(dividers.length).toBe(2);
    });

    it("injects dividers with correct tone", () => {
      const { container } = render(
        <List divided dividerTone="primary">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>,
      );
      const divider = container.querySelector("hr");
      expect(divider).toBeInTheDocument();
      // Divider should have primary tone class (via tokenCVA)
      expect(divider?.className).toContain("bg-primary");
    });

    it("forwards dividerInset prop to Divider", () => {
      const { container } = render(
        <List divided dividerInset>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>,
      );
      const divider = container.querySelector("hr");
      expect(divider).toBeInTheDocument();
      // Divider should have inset padding classes (px-md from DIVIDER_TOKENS)
      expect(divider?.className).toContain("px-md");
    });
  });

  describe("Stack Composition", () => {
    it("applies gap prop to Stack", () => {
      const { container } = render(
        <List gap="xl">
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
        </List>,
      );
      const list = container.querySelector("div[role='list']");
      expect(list).toBeInTheDocument();
      // Stack uses inline styles for gap via CSS variables (getSpacingCSSVar)
      expect(list).toHaveStyle({ gap: "var(--spacing-xl)" });
    });

    it("renders as vertical stack (flex-col)", () => {
      const { container } = render(
        <List>
          <ListItem>Item 1</ListItem>
        </List>,
      );
      const list = container.querySelector("div[role='list']");
      expect(list?.className).toContain("flex-col");
    });
  });

  describe("Accessibility", () => {
    it("adds role='list' to div elements", () => {
      const { container } = render(
        <List as="div">
          <ListItem>Item 1</ListItem>
        </List>,
      );
      const list = container.querySelector("div[role='list']");
      expect(list).toBeInTheDocument();
    });

    it("does not add role to ul elements (native semantics)", () => {
      const { container } = render(
        <List as="ul">
          <ListItem>Item 1</ListItem>
        </List>,
      );
      const list = container.querySelector("ul");
      expect(list).toBeInTheDocument();
      expect(list).not.toHaveAttribute("role");
    });

    it("does not add role to ol elements (native semantics)", () => {
      const { container } = render(
        <List as="ol">
          <ListItem>Item 1</ListItem>
        </List>,
      );
      const list = container.querySelector("ol");
      expect(list).toBeInTheDocument();
      expect(list).not.toHaveAttribute("role");
    });
  });

  describe("Edge Cases", () => {
    it("handles single item without dividers", () => {
      const { container } = render(
        <List divided>
          <ListItem>Single item</ListItem>
        </List>,
      );
      const dividers = container.querySelectorAll("hr");
      expect(dividers.length).toBe(0); // No dividers for single item
    });

    it("handles empty children", () => {
      render(<List>{null}</List>);
      const list = document.querySelector("div[role='list']");
      expect(list).toBeInTheDocument();
      expect(list).toBeEmptyDOMElement();
    });

    it("forwards additional HTML attributes", () => {
      render(
        <List data-testid="custom-list" aria-label="Custom list">
          <ListItem>Item 1</ListItem>
        </List>,
      );
      const list = screen.getByTestId("custom-list");
      expect(list).toBeInTheDocument();
      expect(list).toHaveAttribute("aria-label", "Custom list");
    });
  });
});
