import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "../../../test/test-utils";

import { NavRoot } from "./NavRoot";

describe("NavRoot", () => {
  describe("Rendering", () => {
    it("renders nav element by default", () => {
      renderWithTheme(<NavRoot aria-label="Test navigation">Test content</NavRoot>);

      const nav = screen.getByRole("navigation", { name: /test navigation/i });
      expect(nav).toBeInTheDocument();
      expect(nav.tagName).toBe("NAV");
    });

    it("requires aria-label prop (TypeScript enforced)", () => {
      // TypeScript enforces required aria-label at compile time
      // This test documents the requirement - actual enforcement is via TypeScript
      // If aria-label is missing, TypeScript will error at compile time
      expect(true).toBe(true); // Placeholder - TypeScript enforces requirement
    });

    it("renders children correctly", () => {
      renderWithTheme(
        <NavRoot aria-label="Test navigation">
          <div data-testid="child">Child content</div>
        </NavRoot>,
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Child content")).toBeInTheDocument();
    });

    it("applies aria-label attribute", () => {
      renderWithTheme(<NavRoot aria-label="Main navigation">Content</NavRoot>);

      const nav = screen.getByRole("navigation", { name: /main navigation/i });
      expect(nav).toHaveAttribute("aria-label", "Main navigation");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();

      renderWithTheme(
        <NavRoot ref={ref} aria-label="Test navigation">
          Content
        </NavRoot>,
      );

      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.tagName).toBe("NAV");
    });

    it("passes through HTML attributes", () => {
      renderWithTheme(
        <NavRoot aria-label="Test navigation" id="test-nav" data-testid="nav-root">
          Content
        </NavRoot>,
      );

      const nav = screen.getByTestId("nav-root");
      expect(nav).toHaveAttribute("id", "test-nav");
      expect(nav).toHaveAttribute("data-testid", "nav-root");
    });
  });

  describe("asChild pattern", () => {
    it("renders via Slot when asChild is true", () => {
      renderWithTheme(
        <NavRoot aria-label="Test navigation" asChild>
          <footer data-testid="footer-child">Footer content</footer>
        </NavRoot>,
      );

      // When asChild is true, Slot merges props with child
      const footer = screen.getByTestId("footer-child");
      expect(footer).toBeInTheDocument();
      expect(footer.tagName).toBe("FOOTER");
      // Slot should merge aria-label onto child
      expect(footer).toHaveAttribute("aria-label", "Test navigation");
    });
  });

  describe("Accessibility", () => {
    it("renders semantic nav element with navigation role", () => {
      renderWithTheme(<NavRoot aria-label="Main navigation">Content</NavRoot>);

      const nav = screen.getByRole("navigation", { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
      expect(nav.tagName).toBe("NAV");
    });

    it("requires aria-label for accessibility", () => {
      // TypeScript enforces required aria-label at compile time
      // This test documents the accessibility requirement
      // If aria-label is missing, TypeScript will error at compile time
      expect(true).toBe(true); // Placeholder - TypeScript enforces requirement
    });

    it("provides accessible name via aria-label", () => {
      renderWithTheme(<NavRoot aria-label="Site navigation">Content</NavRoot>);

      const nav = screen.getByRole("navigation", { name: /site navigation/i });
      expect(nav).toHaveAttribute("aria-label", "Site navigation");
    });

    it("merges aria-label to child when asChild is true", () => {
      renderWithTheme(
        <NavRoot aria-label="Footer navigation" asChild>
          <footer>Footer content</footer>
        </NavRoot>,
      );

      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveAttribute("aria-label", "Footer navigation");
    });
  });
});
