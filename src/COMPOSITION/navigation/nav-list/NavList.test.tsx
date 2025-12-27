import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "../../../test/test-utils";

import { NavList } from "./NavList";

describe("NavList", () => {
  describe("Rendering", () => {
    it("renders as ol by default", () => {
      renderWithTheme(
        <NavList>
          <li>Item 1</li>
          <li>Item 2</li>
        </NavList>,
      );

      const list = screen.getByText("Item 1").closest("ol");
      expect(list).toBeInTheDocument();
      expect(list?.tagName).toBe("OL");
    });

    it("renders as ul when as='ul'", () => {
      renderWithTheme(
        <NavList as="ul">
          <li>Item 1</li>
          <li>Item 2</li>
        </NavList>,
      );

      const list = screen.getByText("Item 1").closest("ul");
      expect(list).toBeInTheDocument();
      expect(list?.tagName).toBe("UL");
    });

    it("renders as ol when as='ol'", () => {
      renderWithTheme(
        <NavList as="ol">
          <li>Item 1</li>
          <li>Item 2</li>
        </NavList>,
      );

      const list = screen.getByText("Item 1").closest("ol");
      expect(list).toBeInTheDocument();
      expect(list?.tagName).toBe("OL");
    });

    it("renders children", () => {
      renderWithTheme(
        <NavList>
          <li>Item 1</li>
          <li>Item 2</li>
        </NavList>,
      );

      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref correctly for ol", () => {
      const ref = React.createRef<HTMLOListElement>();

      renderWithTheme(
        <NavList as="ol" ref={ref}>
          <li>Item</li>
        </NavList>,
      );

      expect(ref.current).toBeInstanceOf(HTMLOListElement);
    });

    it("forwards ref correctly for ul", () => {
      const ref = React.createRef<HTMLUListElement>();

      renderWithTheme(
        <NavList as="ul" ref={ref}>
          <li>Item</li>
        </NavList>,
      );

      expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });
  });

  describe("asChild support", () => {
    it("renders via Slot when asChild is true", () => {
      renderWithTheme(
        <NavList asChild>
          <div data-testid="custom-list">
            <li>Item 1</li>
            <li>Item 2</li>
          </div>
        </NavList>,
      );

      const customList = screen.getByTestId("custom-list");
      expect(customList).toBeInTheDocument();
    });
  });

  describe("HTML attributes", () => {
    it("passes HTML attributes to list element", () => {
      renderWithTheme(
        <NavList aria-label="Navigation list" id="nav-list">
          <li>Item</li>
        </NavList>,
      );

      const list = screen.getByText("Item").closest("ol");
      expect(list).toHaveAttribute("aria-label", "Navigation list");
      expect(list).toHaveAttribute("id", "nav-list");
    });
  });

  describe("Semantic correctness", () => {
    it("renders correct semantic list element", () => {
      const { rerender } = renderWithTheme(
        <NavList>
          <li>Item</li>
        </NavList>,
      );

      let list = screen.getByText("Item").closest("ol");
      expect(list?.tagName).toBe("OL");

      rerender(
        <NavList as="ul">
          <li>Item</li>
        </NavList>,
      );

      list = screen.getByText("Item").closest("ul");
      expect(list?.tagName).toBe("UL");
    });
  });
});
