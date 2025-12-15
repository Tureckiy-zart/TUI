import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Display } from "./display";

describe("Display", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Display>Hello World</Display>);
      const display = screen.getByText("Hello World");
      expect(display).toBeInTheDocument();
    });

    it("renders as h1 element by default", () => {
      const { container } = renderWithTheme(<Display>Display content</Display>);
      const display = container.querySelector("h1");
      expect(display).toBeInTheDocument();
      expect(display).toHaveTextContent("Display content");
    });
  });

  describe("Sizes", () => {
    it("renders xl size", () => {
      const { container } = renderWithTheme(<Display size="xl">XL Display</Display>);
      const display = container.querySelector("h1");
      expect(display).toBeInTheDocument();
    });

    it("renders 2xl size", () => {
      const { container } = renderWithTheme(<Display size="2xl">2XL Display</Display>);
      const display = container.querySelector("h1");
      expect(display).toBeInTheDocument();
    });

    it("renders 3xl size", () => {
      const { container } = renderWithTheme(<Display size="3xl">3XL Display</Display>);
      const display = container.querySelector("h1");
      expect(display).toBeInTheDocument();
    });

    it("renders 4xl size (default)", () => {
      const { container } = renderWithTheme(<Display size="4xl">4XL Display</Display>);
      const display = container.querySelector("h1");
      expect(display).toBeInTheDocument();
    });
  });

  describe("Weights", () => {
    it("renders normal weight", () => {
      const { container } = renderWithTheme(
        <Display size="3xl" weight="normal">
          Normal Weight
        </Display>,
      );
      const display = container.querySelector("h1");
      expect(display).toBeInTheDocument();
    });

    it("renders medium weight", () => {
      const { container } = renderWithTheme(
        <Display size="3xl" weight="medium">
          Medium Weight
        </Display>,
      );
      const display = container.querySelector("h1");
      expect(display).toBeInTheDocument();
    });

    it("renders semibold weight", () => {
      const { container } = renderWithTheme(
        <Display size="3xl" weight="semibold">
          Semibold Weight
        </Display>,
      );
      const display = container.querySelector("h1");
      expect(display).toBeInTheDocument();
    });

    it("renders bold weight (default)", () => {
      const { container } = renderWithTheme(
        <Display size="3xl" weight="bold">
          Bold Weight
        </Display>,
      );
      const display = container.querySelector("h1");
      expect(display).toBeInTheDocument();
    });
  });

  describe("Muted", () => {
    it("applies muted styles when muted is true", () => {
      const { container } = renderWithTheme(
        <Display size="3xl" muted>
          Muted Display
        </Display>,
      );
      const display = container.querySelector("h1");
      expect(display).toHaveClass("text-muted-foreground");
    });

    it("does not apply muted styles when muted is false", () => {
      const { container } = renderWithTheme(
        <Display size="3xl" muted={false}>
          Normal Display
        </Display>,
      );
      const display = container.querySelector("h1");
      expect(display).not.toHaveClass("text-muted-foreground");
    });

    it("defaults to not muted", () => {
      const { container } = renderWithTheme(<Display size="3xl">Default Display</Display>);
      const display = container.querySelector("h1");
      expect(display).not.toHaveClass("text-muted-foreground");
    });
  });

  describe("Custom Element", () => {
    it("renders as h2 when as prop is h2", () => {
      const { container } = renderWithTheme(
        <Display size="3xl" as="h2">
          Display as h2
        </Display>,
      );
      const display = container.querySelector("h2");
      expect(display).toBeInTheDocument();
      expect(display).toHaveTextContent("Display as h2");
    });

    it("renders as div when as prop is div", () => {
      const { container } = renderWithTheme(
        <Display size="3xl" as="div">
          Display as div
        </Display>,
      );
      const display = container.querySelector("div");
      expect(display).toBeInTheDocument();
      expect(display).toHaveTextContent("Display as div");
    });
  });

  describe("Combined Props", () => {
    it("renders with size, weight, and muted", () => {
      const { container } = renderWithTheme(
        <Display size="3xl" weight="semibold" muted>
          Combined Props Display
        </Display>,
      );
      const display = container.querySelector("h1");
      expect(display).toBeInTheDocument();
      expect(display).toHaveTextContent("Combined Props Display");
      expect(display).toHaveClass("text-muted-foreground");
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      const { container } = renderWithTheme(
        <Display size="3xl" className="custom-class">
          Display
        </Display>,
      );
      const display = container.querySelector("h1");
      expect(display).toHaveClass("custom-class");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for default variant", () => {
      const { container } = renderWithTheme(<Display size="4xl">Default Display</Display>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for muted variant", () => {
      const { container } = renderWithTheme(
        <Display size="3xl" muted>
          Muted Display
        </Display>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
