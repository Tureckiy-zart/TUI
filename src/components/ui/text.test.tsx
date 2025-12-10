import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Text } from "./text";

describe("Text", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Text>Hello World</Text>);
      const text = screen.getByText("Hello World");
      expect(text).toBeInTheDocument();
    });

    it("renders as span element by default", () => {
      const { container } = renderWithTheme(<Text>Text content</Text>);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent("Text content");
    });
  });

  describe("Sizes", () => {
    it("renders xs size", () => {
      const { container } = renderWithTheme(<Text size="xs">Extra Small</Text>);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
    });

    it("renders sm size", () => {
      const { container } = renderWithTheme(<Text size="sm">Small</Text>);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
    });

    it("renders md size (default)", () => {
      const { container } = renderWithTheme(<Text size="md">Medium</Text>);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
    });

    it("renders lg size", () => {
      const { container } = renderWithTheme(<Text size="lg">Large</Text>);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
    });

    it("renders xl size", () => {
      const { container } = renderWithTheme(<Text size="xl">Extra Large</Text>);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
    });
  });

  describe("Weights", () => {
    it("renders normal weight (default)", () => {
      const { container } = renderWithTheme(<Text weight="normal">Normal Weight</Text>);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
    });

    it("renders medium weight", () => {
      const { container } = renderWithTheme(<Text weight="medium">Medium Weight</Text>);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
    });

    it("renders semibold weight", () => {
      const { container } = renderWithTheme(<Text weight="semibold">Semibold Weight</Text>);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
    });

    it("renders bold weight", () => {
      const { container } = renderWithTheme(<Text weight="bold">Bold Weight</Text>);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
    });
  });

  describe("Muted", () => {
    it("applies muted styles when muted is true", () => {
      const { container } = renderWithTheme(<Text muted>Muted Text</Text>);
      const text = container.querySelector("span");
      expect(text).toHaveClass("text-muted-foreground");
    });

    it("does not apply muted styles when muted is false", () => {
      const { container } = renderWithTheme(<Text muted={false}>Normal Text</Text>);
      const text = container.querySelector("span");
      expect(text).not.toHaveClass("text-muted-foreground");
    });

    it("defaults to not muted", () => {
      const { container } = renderWithTheme(<Text>Default Text</Text>);
      const text = container.querySelector("span");
      expect(text).not.toHaveClass("text-muted-foreground");
    });
  });

  describe("Combined Props", () => {
    it("renders with size and weight", () => {
      const { container } = renderWithTheme(
        <Text size="lg" weight="bold">
          Large Bold Text
        </Text>,
      );
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent("Large Bold Text");
    });

    it("renders with size, weight, and muted", () => {
      const { container } = renderWithTheme(
        <Text size="sm" weight="medium" muted>
          Small Medium Muted Text
        </Text>,
      );
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass("text-muted-foreground");
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      const { container } = renderWithTheme(<Text className="custom-class">Text</Text>);
      const text = container.querySelector("span");
      expect(text).toHaveClass("custom-class");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for default variant", () => {
      const { container } = renderWithTheme(<Text>Default Text</Text>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for muted variant", () => {
      const { container } = renderWithTheme(<Text muted>Muted Text</Text>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for large bold text", () => {
      const { container } = renderWithTheme(
        <Text size="lg" weight="bold">
          Large Bold Text
        </Text>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
