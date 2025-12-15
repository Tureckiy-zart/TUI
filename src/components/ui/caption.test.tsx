import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Caption } from "./caption";

describe("Caption", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Caption>Hello World</Caption>);
      const caption = screen.getByText("Hello World");
      expect(caption).toBeInTheDocument();
    });

    it("renders as span element by default", () => {
      const { container } = renderWithTheme(<Caption>Caption content</Caption>);
      const caption = container.querySelector("span");
      expect(caption).toBeInTheDocument();
      expect(caption).toHaveTextContent("Caption content");
    });
  });

  describe("Weights", () => {
    it("renders normal weight (default)", () => {
      const { container } = renderWithTheme(<Caption weight="normal">Normal Weight</Caption>);
      const caption = container.querySelector("span");
      expect(caption).toBeInTheDocument();
    });

    it("renders medium weight", () => {
      const { container } = renderWithTheme(<Caption weight="medium">Medium Weight</Caption>);
      const caption = container.querySelector("span");
      expect(caption).toBeInTheDocument();
    });
  });

  describe("Muted", () => {
    it("applies muted styles when muted is true", () => {
      const { container } = renderWithTheme(<Caption muted>Muted Caption</Caption>);
      const caption = container.querySelector("span");
      expect(caption).toHaveClass("text-muted-foreground");
    });

    it("does not apply muted styles when muted is false", () => {
      const { container } = renderWithTheme(<Caption muted={false}>Normal Caption</Caption>);
      const caption = container.querySelector("span");
      expect(caption).not.toHaveClass("text-muted-foreground");
    });

    it("defaults to muted", () => {
      const { container } = renderWithTheme(<Caption>Default Caption</Caption>);
      const caption = container.querySelector("span");
      expect(caption).toHaveClass("text-muted-foreground");
    });
  });

  describe("Custom Element", () => {
    it("renders as p when as prop is p", () => {
      const { container } = renderWithTheme(<Caption as="p">Caption as p</Caption>);
      const caption = container.querySelector("p");
      expect(caption).toBeInTheDocument();
      expect(caption).toHaveTextContent("Caption as p");
    });

    it("renders as div when as prop is div", () => {
      const { container } = renderWithTheme(<Caption as="div">Caption as div</Caption>);
      const caption = container.querySelector("div");
      expect(caption).toBeInTheDocument();
      expect(caption).toHaveTextContent("Caption as div");
    });
  });

  describe("Combined Props", () => {
    it("renders with weight and muted", () => {
      const { container } = renderWithTheme(
        <Caption weight="medium" muted={false}>
          Medium Non-Muted Caption
        </Caption>,
      );
      const caption = container.querySelector("span");
      expect(caption).toBeInTheDocument();
      expect(caption).toHaveTextContent("Medium Non-Muted Caption");
      expect(caption).not.toHaveClass("text-muted-foreground");
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      const { container } = renderWithTheme(<Caption className="custom-class">Caption</Caption>);
      const caption = container.querySelector("span");
      expect(caption).toHaveClass("custom-class");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for default variant", () => {
      const { container } = renderWithTheme(<Caption>Default Caption</Caption>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for non-muted variant", () => {
      const { container } = renderWithTheme(<Caption muted={false}>Non-Muted Caption</Caption>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
