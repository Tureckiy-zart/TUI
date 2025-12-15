import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Lead } from "./lead";

describe("Lead", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Lead>Hello World</Lead>);
      const lead = screen.getByText("Hello World");
      expect(lead).toBeInTheDocument();
    });

    it("renders as p element by default", () => {
      const { container } = renderWithTheme(<Lead>Lead content</Lead>);
      const lead = container.querySelector("p");
      expect(lead).toBeInTheDocument();
      expect(lead).toHaveTextContent("Lead content");
    });
  });

  describe("Sizes", () => {
    it("renders lg size (default)", () => {
      const { container } = renderWithTheme(<Lead size="lg">Large Lead</Lead>);
      const lead = container.querySelector("p");
      expect(lead).toBeInTheDocument();
    });

    it("renders xl size", () => {
      const { container } = renderWithTheme(<Lead size="xl">Extra Large Lead</Lead>);
      const lead = container.querySelector("p");
      expect(lead).toBeInTheDocument();
    });
  });

  describe("Muted", () => {
    it("applies muted styles when muted is true", () => {
      const { container } = renderWithTheme(<Lead muted>Muted Lead</Lead>);
      const lead = container.querySelector("p");
      expect(lead).toHaveClass("text-muted-foreground");
    });

    it("does not apply muted styles when muted is false", () => {
      const { container } = renderWithTheme(<Lead muted={false}>Normal Lead</Lead>);
      const lead = container.querySelector("p");
      expect(lead).not.toHaveClass("text-muted-foreground");
    });

    it("defaults to muted", () => {
      const { container } = renderWithTheme(<Lead>Default Lead</Lead>);
      const lead = container.querySelector("p");
      expect(lead).toHaveClass("text-muted-foreground");
    });
  });

  describe("Custom Element", () => {
    it("renders as span when as prop is span", () => {
      const { container } = renderWithTheme(<Lead as="span">Lead as span</Lead>);
      const lead = container.querySelector("span");
      expect(lead).toBeInTheDocument();
      expect(lead).toHaveTextContent("Lead as span");
    });

    it("renders as div when as prop is div", () => {
      const { container } = renderWithTheme(<Lead as="div">Lead as div</Lead>);
      const lead = container.querySelector("div");
      expect(lead).toBeInTheDocument();
      expect(lead).toHaveTextContent("Lead as div");
    });
  });

  describe("Combined Props", () => {
    it("renders with size and muted", () => {
      const { container } = renderWithTheme(
        <Lead size="xl" muted={false}>
          Extra Large Non-Muted Lead
        </Lead>,
      );
      const lead = container.querySelector("p");
      expect(lead).toBeInTheDocument();
      expect(lead).toHaveTextContent("Extra Large Non-Muted Lead");
      expect(lead).not.toHaveClass("text-muted-foreground");
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      const { container } = renderWithTheme(<Lead className="custom-class">Lead</Lead>);
      const lead = container.querySelector("p");
      expect(lead).toHaveClass("custom-class");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for default variant", () => {
      const { container } = renderWithTheme(<Lead>Default Lead</Lead>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for non-muted variant", () => {
      const { container } = renderWithTheme(<Lead muted={false}>Non-Muted Lead</Lead>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
