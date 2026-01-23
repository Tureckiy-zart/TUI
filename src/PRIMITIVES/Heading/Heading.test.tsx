import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Heading } from "./Heading";

describe("Heading", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Heading>Hello World</Heading>);
      const heading = screen.getByText("Hello World");
      expect(heading).toBeInTheDocument();
    });

    it("renders as h1 element by default", () => {
      const { container } = renderWithTheme(<Heading>Heading content</Heading>);
      const heading = container.querySelector("h1");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Heading content");
    });
  });

  describe("Levels", () => {
    it("renders level 1 heading", () => {
      const { container } = renderWithTheme(<Heading level={1}>Level 1</Heading>);
      const heading = container.querySelector("h1");
      expect(heading).toBeInTheDocument();
    });

    it("renders level 2 heading", () => {
      const { container } = renderWithTheme(<Heading level={2}>Level 2</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).toBeInTheDocument();
    });

    it("renders level 3 heading", () => {
      const { container } = renderWithTheme(<Heading level={3}>Level 3</Heading>);
      const heading = container.querySelector("h3");
      expect(heading).toBeInTheDocument();
    });

    it("renders level 4 heading", () => {
      const { container } = renderWithTheme(<Heading level={4}>Level 4</Heading>);
      const heading = container.querySelector("h4");
      expect(heading).toBeInTheDocument();
    });

    it("renders level 5 heading", () => {
      const { container } = renderWithTheme(<Heading level={5}>Level 5</Heading>);
      const heading = container.querySelector("h5");
      expect(heading).toBeInTheDocument();
    });

    it("renders level 6 heading", () => {
      const { container } = renderWithTheme(<Heading level={6}>Level 6</Heading>);
      const heading = container.querySelector("h6");
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Weights", () => {
    it("renders normal weight", () => {
      const { container } = renderWithTheme(
        <Heading level={2} weight="normal">
          Normal Weight
        </Heading>,
      );
      const heading = container.querySelector("h2");
      expect(heading).toBeInTheDocument();
    });

    it("renders medium weight", () => {
      const { container } = renderWithTheme(
        <Heading level={2} weight="medium">
          Medium Weight
        </Heading>,
      );
      const heading = container.querySelector("h2");
      expect(heading).toBeInTheDocument();
    });

    it("renders semibold weight", () => {
      const { container } = renderWithTheme(
        <Heading level={2} weight="semibold">
          Semibold Weight
        </Heading>,
      );
      const heading = container.querySelector("h2");
      expect(heading).toBeInTheDocument();
    });

    it("renders bold weight", () => {
      const { container } = renderWithTheme(
        <Heading level={2} weight="bold">
          Bold Weight
        </Heading>,
      );
      const heading = container.querySelector("h2");
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Color", () => {
    it("applies secondary styles when color is secondary", () => {
      const { container } = renderWithTheme(
        <Heading level={2} color="secondary">
          Secondary Heading
        </Heading>,
      );
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("text-[hsl(var(--tm-text-secondary))]");
    });

    it("defaults to primary when color is not provided", () => {
      const { container } = renderWithTheme(<Heading level={2}>Normal Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).not.toHaveClass("text-[hsl(var(--tm-text-secondary))]");
    });
  });

  describe("Custom Element", () => {
    it("renders as custom element when as prop is provided", () => {
      const { container } = renderWithTheme(
        <Heading level={1} as="h2">
          Level 1 styled as h2
        </Heading>,
      );
      const heading = container.querySelector("h2");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Level 1 styled as h2");
    });
  });

  describe("Combined Props", () => {
    it("renders with level, weight, and secondary color", () => {
      const { container } = renderWithTheme(
        <Heading level={3} weight="semibold" color="secondary">
          Combined Props Heading
        </Heading>,
      );
      const heading = container.querySelector("h3");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Combined Props Heading");
      expect(heading).toHaveClass("text-[hsl(var(--tm-text-secondary))]");
    });
  });

  describe("Custom className", () => {
    it.skip("applies custom className", () => {
      // Foundation components do not support className prop
      const { container } = renderWithTheme(<Heading level={2}>Heading</Heading>);
      const heading = container.querySelector("h2");
      expect(heading).not.toHaveClass("custom-class");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for default variant", () => {
      const { container } = renderWithTheme(<Heading level={1}>Default Heading</Heading>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for secondary color", () => {
      const { container } = renderWithTheme(
        <Heading level={2} color="secondary">
          Secondary Heading
        </Heading>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
