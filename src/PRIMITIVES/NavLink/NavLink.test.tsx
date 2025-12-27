import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { axeCheck, renderWithTheme } from "@/test/test-utils";

import { NavLink } from "./NavLink";

describe("NavLink", () => {
  describe("Renders Link", () => {
    it("renders Link component internally", () => {
      renderWithTheme(<NavLink href="/test">Test Link</NavLink>);
      const link = screen.getByRole("link", { name: /test link/i });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
    });

    it("renders without errors", () => {
      renderWithTheme(<NavLink href="/home">Home</NavLink>);
      const link = screen.getByRole("link", { name: /home/i });
      expect(link).toBeInTheDocument();
    });
  });

  describe("Forwards href", () => {
    it("forwards href prop to Link", () => {
      renderWithTheme(<NavLink href="/about">About</NavLink>);
      const link = screen.getByRole("link", { name: /about/i });
      expect(link).toHaveAttribute("href", "/about");
    });

    it("forwards external href", () => {
      renderWithTheme(<NavLink href="https://example.com">External</NavLink>);
      const link = screen.getByRole("link", { name: /external/i });
      expect(link).toHaveAttribute("href", "https://example.com");
    });
  });

  describe("Forwards all Link props", () => {
    it("forwards variant prop", () => {
      renderWithTheme(
        <NavLink href="/test" variant="primary">
          Primary Link
        </NavLink>,
      );
      const link = screen.getByRole("link", { name: /primary link/i });
      expect(link).toBeInTheDocument();
    });

    it("forwards size prop", () => {
      renderWithTheme(
        <NavLink href="/test" size="lg">
          Large Link
        </NavLink>,
      );
      const link = screen.getByRole("link", { name: /large link/i });
      expect(link).toBeInTheDocument();
    });

    it("forwards disabled prop", () => {
      renderWithTheme(
        <NavLink href="/test" disabled>
          Disabled Link
        </NavLink>,
      );
      const link = screen.getByRole("link", { name: /disabled link/i });
      expect(link).toHaveAttribute("aria-disabled", "true");
    });

    it("forwards other anchor attributes", () => {
      renderWithTheme(
        <NavLink href="/test" target="_blank" rel="noopener noreferrer" aria-label="Test link">
          Test
        </NavLink>,
      );
      const link = screen.getByRole("link", { name: /test link/i });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("aria-current behavior", () => {
    it("applies aria-current='page' when current=true", () => {
      renderWithTheme(
        <NavLink href="/current" current>
          Current Page
        </NavLink>,
      );
      const link = screen.getByRole("link", { name: /current page/i });
      expect(link).toHaveAttribute("aria-current", "page");
    });

    it("does not apply aria-current when current=false", () => {
      renderWithTheme(
        <NavLink href="/not-current" current={false}>
          Not Current Page
        </NavLink>,
      );
      const link = screen.getByRole("link", { name: /not current page/i });
      expect(link).not.toHaveAttribute("aria-current");
    });

    it("does not apply aria-current when current is undefined", () => {
      renderWithTheme(<NavLink href="/default">Default Link</NavLink>);
      const link = screen.getByRole("link", { name: /default link/i });
      expect(link).not.toHaveAttribute("aria-current");
    });

    it("does not apply aria-current when current prop is omitted", () => {
      renderWithTheme(<NavLink href="/omitted">Omitted Current</NavLink>);
      const link = screen.getByRole("link", { name: /omitted current/i });
      expect(link).not.toHaveAttribute("aria-current");
    });
  });

  describe("Accessibility", () => {
    it("passes accessibility checks", async () => {
      const { container } = renderWithTheme(<NavLink href="/test">Accessible Link</NavLink>);
      await axeCheck(container);
    });

    it("passes accessibility checks with current=true", async () => {
      const { container } = renderWithTheme(
        <NavLink href="/current" current>
          Current Page
        </NavLink>,
      );
      await axeCheck(container);
    });

    it("maintains keyboard navigation (delegated to Link)", () => {
      renderWithTheme(<NavLink href="/keyboard">Keyboard Link</NavLink>);
      const link = screen.getByRole("link", { name: /keyboard link/i });
      expect(link).toBeInTheDocument();
      // Keyboard navigation is handled by Link component
      expect(link.tagName).toBe("A");
    });

    it("maintains screen reader semantics (delegated to Link)", () => {
      renderWithTheme(
        <NavLink href="/aria" aria-label="Aria Link">
          Aria Link
        </NavLink>,
      );
      const link = screen.getByRole("link", { name: /aria link/i });
      expect(link).toHaveAttribute("aria-label", "Aria Link");
    });
  });
});
