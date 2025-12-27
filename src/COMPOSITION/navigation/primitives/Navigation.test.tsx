import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "../../../test/test-utils";

import { NavItem, NavList, NavSeparator, NavText } from "./Navigation";

// NavRoot is now a standalone component
import { NavRoot } from "../NavRoot/NavRoot";

describe("Navigation Primitives", () => {
  describe("NavRoot", () => {
    it("renders as semantic nav element", () => {
      renderWithTheme(
        <NavRoot>
          <div>Test</div>
        </NavRoot>,
      );

      const nav = screen.getByRole("navigation");
      expect(nav).toBeInTheDocument();
      expect(nav.tagName).toBe("NAV");
    });

    it("renders with aria-label", () => {
      renderWithTheme(
        <NavRoot aria-label="Main navigation">
          <div>Test</div>
        </NavRoot>,
      );

      const nav = screen.getByRole("navigation", { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute("aria-label", "Main navigation");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();

      renderWithTheme(
        <NavRoot ref={ref}>
          <div>Test</div>
        </NavRoot>,
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("NAV");
    });

    it("applies className", () => {
      renderWithTheme(
        <NavRoot className="custom-class">
          <div>Test</div>
        </NavRoot>,
      );

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveClass("custom-class");
    });

    it("renders children", () => {
      renderWithTheme(
        <NavRoot>
          <div>Test content</div>
        </NavRoot>,
      );

      expect(screen.getByText("Test content")).toBeInTheDocument();
    });
  });

  describe("NavList", () => {
    it("renders as ol by default", () => {
      renderWithTheme(
        <NavList>
          <NavItem>
            <NavText>Item</NavText>
          </NavItem>
        </NavList>,
      );

      const list = screen.getByText("Item").closest("ol");
      expect(list).toBeInTheDocument();
      expect(list?.tagName).toBe("OL");
    });

    it("renders as ul when as='ul'", () => {
      renderWithTheme(
        <NavList as="ul">
          <NavItem>
            <NavText>Item</NavText>
          </NavItem>
        </NavList>,
      );

      const list = screen.getByText("Item").closest("ul");
      expect(list).toBeInTheDocument();
      expect(list?.tagName).toBe("UL");
    });

    it("renders as ol when as='ol'", () => {
      renderWithTheme(
        <NavList as="ol">
          <NavItem>
            <NavText>Item</NavText>
          </NavItem>
        </NavList>,
      );

      const list = screen.getByText("Item").closest("ol");
      expect(list).toBeInTheDocument();
      expect(list?.tagName).toBe("OL");
    });

    it("forwards ref correctly for ol", () => {
      const ref = React.createRef<HTMLOListElement>();

      renderWithTheme(
        <NavList as="ol" ref={ref}>
          <NavItem>
            <NavText>Item</NavText>
          </NavItem>
        </NavList>,
      );

      expect(ref.current).toBeInstanceOf(HTMLOListElement);
    });

    it("forwards ref correctly for ul", () => {
      const ref = React.createRef<HTMLUListElement>();

      renderWithTheme(
        <NavList as="ul" ref={ref}>
          <NavItem>
            <NavText>Item</NavText>
          </NavItem>
        </NavList>,
      );

      expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    it("applies className", () => {
      renderWithTheme(
        <NavList className="custom-list">
          <NavItem>
            <NavText>Item</NavText>
          </NavItem>
        </NavList>,
      );

      const list = screen.getByText("Item").closest("ol");
      expect(list).toHaveClass("custom-list");
    });

    it("renders children", () => {
      renderWithTheme(
        <NavList>
          <NavItem>
            <NavText>Item 1</NavText>
          </NavItem>
          <NavItem>
            <NavText>Item 2</NavText>
          </NavItem>
        </NavList>,
      );

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  describe("NavItem", () => {
    it("renders as semantic li element", () => {
      renderWithTheme(
        <NavList>
          <NavItem>
            <NavText>Item</NavText>
          </NavItem>
        </NavList>,
      );

      const item = screen.getByText("Item").closest("li");
      expect(item).toBeInTheDocument();
      expect(item?.tagName).toBe("LI");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLLIElement>();

      renderWithTheme(
        <NavList>
          <NavItem ref={ref}>
            <NavText>Item</NavText>
          </NavItem>
        </NavList>,
      );

      expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });

    it("applies className", () => {
      renderWithTheme(
        <NavList>
          <NavItem className="custom-item">
            <NavText>Item</NavText>
          </NavItem>
        </NavList>,
      );

      const item = screen.getByText("Item").closest("li");
      expect(item).toHaveClass("custom-item");
    });

    it("renders children", () => {
      renderWithTheme(
        <NavList>
          <NavItem>
            <NavText>Item content</NavText>
          </NavItem>
        </NavList>,
      );

      expect(screen.getByText("Item content")).toBeInTheDocument();
    });

    it("renders via Slot when asChild is true", () => {
      renderWithTheme(
        <NavList>
          <NavItem asChild>
            <div data-testid="custom-item">Custom item</div>
          </NavItem>
        </NavList>,
      );

      // When asChild is true, Slot merges props with child
      const customItem = screen.getByTestId("custom-item");
      expect(customItem).toBeInTheDocument();
      // Slot should merge props onto child, so the div should be rendered directly
      expect(customItem.parentElement?.tagName).toBe("OL");
    });
  });

  describe("NavText", () => {
    it("renders as semantic span element", () => {
      renderWithTheme(<NavText>Text content</NavText>);

      const text = screen.getByText("Text content");
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe("SPAN");
    });

    it("renders with aria-current", () => {
      renderWithTheme(<NavText aria-current="page">Current page</NavText>);

      const text = screen.getByText("Current page");
      expect(text).toHaveAttribute("aria-current", "page");
    });

    it("renders with aria-current='step'", () => {
      renderWithTheme(<NavText aria-current="step">Step 1</NavText>);

      const text = screen.getByText("Step 1");
      expect(text).toHaveAttribute("aria-current", "step");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLSpanElement>();

      renderWithTheme(<NavText ref={ref}>Text</NavText>);

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("applies className", () => {
      renderWithTheme(<NavText className="custom-text">Text</NavText>);

      const text = screen.getByText("Text");
      expect(text).toHaveClass("custom-text");
    });

    it("renders children", () => {
      renderWithTheme(<NavText>Text content</NavText>);

      expect(screen.getByText("Text content")).toBeInTheDocument();
    });
  });

  describe("NavSeparator", () => {
    it("renders as semantic span element", () => {
      renderWithTheme(<NavSeparator />);

      const separator = screen.getByText("/");
      expect(separator).toBeInTheDocument();
      expect(separator.tagName).toBe("SPAN");
    });

    it("has aria-hidden='true'", () => {
      renderWithTheme(<NavSeparator />);

      const separator = screen.getByText("/");
      expect(separator).toHaveAttribute("aria-hidden", "true");
    });

    it("renders default separator '/' when no children", () => {
      renderWithTheme(<NavSeparator />);

      expect(screen.getByText("/")).toBeInTheDocument();
    });

    it("renders custom separator", () => {
      renderWithTheme(<NavSeparator>→</NavSeparator>);

      expect(screen.getByText("→")).toBeInTheDocument();
      expect(screen.queryByText("/")).not.toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLSpanElement>();

      renderWithTheme(<NavSeparator ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("applies className", () => {
      renderWithTheme(<NavSeparator className="custom-separator" />);

      const separator = screen.getByText("/");
      expect(separator).toHaveClass("custom-separator");
    });
  });

  describe("Composition", () => {
    it("composes NavRoot > NavList > NavItem correctly", () => {
      renderWithTheme(
        <NavRoot aria-label="Navigation">
          <NavList>
            <NavItem>
              <NavText>Item 1</NavText>
            </NavItem>
            <NavItem>
              <NavText>Item 2</NavText>
            </NavItem>
          </NavList>
        </NavRoot>,
      );

      const nav = screen.getByRole("navigation", { name: /navigation/i });
      expect(nav).toBeInTheDocument();

      const list = nav.querySelector("ol");
      expect(list).toBeInTheDocument();

      const items = list?.querySelectorAll("li");
      expect(items).toHaveLength(2);

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    it("composes full navigation structure with separator", () => {
      renderWithTheme(
        <NavRoot aria-label="Breadcrumb">
          <NavList as="ol">
            <NavItem>
              <NavText>Home</NavText>
              <NavSeparator />
            </NavItem>
            <NavItem>
              <NavText aria-current="page">Current Page</NavText>
            </NavItem>
          </NavList>
        </NavRoot>,
      );

      const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
      expect(nav).toBeInTheDocument();

      const list = nav.querySelector("ol");
      expect(list).toBeInTheDocument();

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("/")).toBeInTheDocument();
      expect(screen.getByText("Current Page")).toBeInTheDocument();

      const currentPage = screen.getByText("Current Page");
      expect(currentPage).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Stateless behavior", () => {
    it("NavRoot has no state management", () => {
      const { container } = renderWithTheme(
        <NavRoot>
          <div>Test</div>
        </NavRoot>,
      );

      // Verify no state-related attributes or data attributes
      const nav = container.querySelector("nav");
      expect(nav).toBeInTheDocument();
      expect(nav?.getAttributeNames()).not.toContain("data-state");
      expect(nav?.getAttributeNames()).not.toContain("aria-expanded");
      expect(nav?.getAttributeNames()).not.toContain("aria-selected");
    });

    it("components render without interactive behavior", () => {
      renderWithTheme(
        <NavRoot>
          <NavList>
            <NavItem>
              <NavText>Item</NavText>
            </NavItem>
          </NavList>
        </NavRoot>,
      );

      const text = screen.getByText("Item");
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe("SPAN");
      // NavText should not be interactive (not a button or link)
      expect(text.tagName).not.toBe("BUTTON");
      expect(text.tagName).not.toBe("A");
    });
  });

  describe("ARIA attributes", () => {
    it("NavRoot supports aria-label", () => {
      renderWithTheme(
        <NavRoot aria-label="Main menu">
          <div>Test</div>
        </NavRoot>,
      );

      const nav = screen.getByRole("navigation", { name: /main menu/i });
      expect(nav).toHaveAttribute("aria-label", "Main menu");
    });

    it("NavText supports aria-current", () => {
      renderWithTheme(<NavText aria-current="page">Current</NavText>);

      const text = screen.getByText("Current");
      expect(text).toHaveAttribute("aria-current", "page");
    });

    it("NavSeparator has aria-hidden='true'", () => {
      renderWithTheme(<NavSeparator />);

      const separator = screen.getByText("/");
      expect(separator).toHaveAttribute("aria-hidden", "true");
    });

    it("NavText supports different aria-current values", () => {
      const { rerender } = renderWithTheme(<NavText aria-current="step">Step</NavText>);

      expect(screen.getByText("Step")).toHaveAttribute("aria-current", "step");

      rerender(<NavText aria-current="location">Location</NavText>);

      expect(screen.getByText("Location")).toHaveAttribute("aria-current", "location");
    });
  });
});
