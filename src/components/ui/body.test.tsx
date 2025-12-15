import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Body } from "./body";

describe("Body", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Body>Hello World</Body>);
      const body = screen.getByText("Hello World");
      expect(body).toBeInTheDocument();
    });

    it("renders as p element by default", () => {
      const { container } = renderWithTheme(<Body>Body content</Body>);
      const body = container.querySelector("p");
      expect(body).toBeInTheDocument();
      expect(body).toHaveTextContent("Body content");
    });
  });

  describe("Sizes", () => {
    it("renders md size (default)", () => {
      const { container } = renderWithTheme(<Body size="md">Medium Body</Body>);
      const body = container.querySelector("p");
      expect(body).toBeInTheDocument();
    });

    it("renders lg size", () => {
      const { container } = renderWithTheme(<Body size="lg">Large Body</Body>);
      const body = container.querySelector("p");
      expect(body).toBeInTheDocument();
    });
  });

  describe("Weights", () => {
    it("renders normal weight (default)", () => {
      const { container } = renderWithTheme(<Body weight="normal">Normal Weight</Body>);
      const body = container.querySelector("p");
      expect(body).toBeInTheDocument();
    });

    it("renders medium weight", () => {
      const { container } = renderWithTheme(<Body weight="medium">Medium Weight</Body>);
      const body = container.querySelector("p");
      expect(body).toBeInTheDocument();
    });

    it("renders semibold weight", () => {
      const { container } = renderWithTheme(<Body weight="semibold">Semibold Weight</Body>);
      const body = container.querySelector("p");
      expect(body).toBeInTheDocument();
    });

    it("renders bold weight", () => {
      const { container } = renderWithTheme(<Body weight="bold">Bold Weight</Body>);
      const body = container.querySelector("p");
      expect(body).toBeInTheDocument();
    });
  });

  describe("Muted", () => {
    it("applies muted styles when muted is true", () => {
      const { container } = renderWithTheme(<Body muted>Muted Body</Body>);
      const body = container.querySelector("p");
      expect(body).toHaveClass("text-muted-foreground");
    });

    it("does not apply muted styles when muted is false", () => {
      const { container } = renderWithTheme(<Body muted={false}>Normal Body</Body>);
      const body = container.querySelector("p");
      expect(body).not.toHaveClass("text-muted-foreground");
    });

    it("defaults to not muted", () => {
      const { container } = renderWithTheme(<Body>Default Body</Body>);
      const body = container.querySelector("p");
      expect(body).not.toHaveClass("text-muted-foreground");
    });
  });

  describe("Custom Element", () => {
    it("renders as span when as prop is span", () => {
      const { container } = renderWithTheme(<Body as="span">Body as span</Body>);
      const body = container.querySelector("span");
      expect(body).toBeInTheDocument();
      expect(body).toHaveTextContent("Body as span");
    });

    it("renders as div when as prop is div", () => {
      const { container } = renderWithTheme(<Body as="div">Body as div</Body>);
      const body = container.querySelector("div");
      expect(body).toBeInTheDocument();
      expect(body).toHaveTextContent("Body as div");
    });
  });

  describe("Combined Props", () => {
    it("renders with size, weight, and muted", () => {
      const { container } = renderWithTheme(
        <Body size="lg" weight="medium" muted>
          Large Medium Muted Body
        </Body>,
      );
      const body = container.querySelector("p");
      expect(body).toBeInTheDocument();
      expect(body).toHaveTextContent("Large Medium Muted Body");
      expect(body).toHaveClass("text-muted-foreground");
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      const { container } = renderWithTheme(<Body className="custom-class">Body</Body>);
      const body = container.querySelector("p");
      expect(body).toHaveClass("custom-class");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for default variant", () => {
      const { container } = renderWithTheme(<Body>Default Body</Body>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for muted variant", () => {
      const { container } = renderWithTheme(<Body muted>Muted Body</Body>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
