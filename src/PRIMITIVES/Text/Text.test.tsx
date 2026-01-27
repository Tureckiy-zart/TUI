import { screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Text } from "./Text";

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

  describe("Color", () => {
    it("applies muted color when typographyRole is meta and color is muted", () => {
      const { container } = renderWithTheme(
        <Text typographyRole="meta" color="muted">
          Muted Text
        </Text>,
      );
      const text = container.querySelector("span");
      expect(text).toHaveClass("text-[hsl(var(--tm-text-muted))]");
    });

    it("does not apply muted color when color is primary", () => {
      const { container } = renderWithTheme(
        <Text typographyRole="body" color="primary">
          Normal Text
        </Text>,
      );
      const text = container.querySelector("span");
      expect(text).not.toHaveClass("text-[hsl(var(--tm-text-muted))]");
    });

    it("defaults to primary color", () => {
      const { container } = renderWithTheme(<Text>Default Text</Text>);
      const text = container.querySelector("span");
      expect(text).not.toHaveClass("text-[hsl(var(--tm-text-muted))]");
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

    it("renders with size, weight, and color", () => {
      const { container } = renderWithTheme(
        <Text size="sm" weight="medium" typographyRole="meta" color="muted">
          Small Medium Muted Text
        </Text>,
      );
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass("text-[hsl(var(--tm-text-muted))]");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children", () => {
      const { container } = renderWithTheme(<Text />);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
      expect(text).toBeEmptyDOMElement();
    });

    it("handles long text content", () => {
      const longText = "Lorem ipsum ".repeat(100);
      const { container } = renderWithTheme(<Text>{longText}</Text>);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
      // Normalize whitespace for comparison (browser may normalize multiple spaces)
      const normalizedExpected = longText.replace(/\s+/g, " ").trim();
      const normalizedActual = text?.textContent?.replace(/\s+/g, " ").trim();
      expect(normalizedActual).toBe(normalizedExpected);
    });

    it("handles numeric children", () => {
      renderWithTheme(<Text>{42}</Text>);
      const text = screen.getByText("42");
      expect(text).toBeInTheDocument();
    });

    it("handles React elements as children", () => {
      renderWithTheme(
        <Text>
          Hello <strong>World</strong>
        </Text>,
      );
      const text = screen.getByText(/Hello/);
      expect(text).toBeInTheDocument();
      const strong = text.querySelector("strong");
      expect(strong).toBeInTheDocument();
      expect(strong).toHaveTextContent("World");
    });
  });

  describe("Prop Combinations", () => {
    it("renders size and weight combinations", () => {
      // Test a subset of combinations for performance
      const { container: test1 } = renderWithTheme(
        <Text size="xs" weight="normal">
          xs-normal
        </Text>,
      );
      expect(test1.querySelector("span")).toBeInTheDocument();

      const { container: test2 } = renderWithTheme(
        <Text size="md" weight="bold">
          md-bold
        </Text>,
      );
      expect(test2.querySelector("span")).toBeInTheDocument();

      const { container: test3 } = renderWithTheme(
        <Text size="xl" weight="semibold">
          xl-semibold
        </Text>,
      );
      expect(test3.querySelector("span")).toBeInTheDocument();
    });

    it("renders size and color combinations", () => {
      const { container: normalSm } = renderWithTheme(<Text size="sm">Normal</Text>);
      expect(normalSm.querySelector("span")).not.toHaveClass("text-[hsl(var(--tm-text-muted))]");

      const { container: mutedSm } = renderWithTheme(
        <Text size="sm" typographyRole="meta" color="muted">
          Muted
        </Text>,
      );
      expect(mutedSm.querySelector("span")).toHaveClass("text-[hsl(var(--tm-text-muted))]");

      const { container: normalLg } = renderWithTheme(<Text size="lg">Normal</Text>);
      expect(normalLg.querySelector("span")).not.toHaveClass("text-[hsl(var(--tm-text-muted))]");

      const { container: mutedLg } = renderWithTheme(
        <Text size="lg" typographyRole="meta" color="muted">
          Muted
        </Text>,
      );
      expect(mutedLg.querySelector("span")).toHaveClass("text-[hsl(var(--tm-text-muted))]");
    });
  });

  describe("HTML Attributes", () => {
    it("forwards standard HTML attributes", () => {
      const { container } = renderWithTheme(
        <Text id="test-id" title="Test Title" data-testid="custom-test">
          Text
        </Text>,
      );
      const text = container.querySelector("span");
      expect(text).toHaveAttribute("id", "test-id");
      expect(text).toHaveAttribute("title", "Test Title");
      expect(text).toHaveAttribute("data-testid", "custom-test");
    });

    it("forwards event handlers", () => {
      const handleClick = vi.fn();
      renderWithTheme(<Text onClick={handleClick}>Clickable Text</Text>);
      const text = screen.getByText("Clickable Text");
      text.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Polymorphic as prop", () => {
    it("renders as span element by default", () => {
      const { container } = renderWithTheme(<Text>Default span</Text>);
      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
    });

    it("renders as p element when as is p", () => {
      const { container } = renderWithTheme(<Text as="p">Paragraph text</Text>);
      const text = container.querySelector("p");
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent("Paragraph text");
    });

    it("renders as label element when as is label", () => {
      const { container } = renderWithTheme(<Text as="label">Label text</Text>);
      const text = container.querySelector("label");
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent("Label text");
    });

    it("renders as strong element when as is strong", () => {
      const { container } = renderWithTheme(<Text as="strong">Strong text</Text>);
      const text = container.querySelector("strong");
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent("Strong text");
    });

    it("renders as em element when as is em", () => {
      const { container } = renderWithTheme(<Text as="em">Emphasized text</Text>);
      const text = container.querySelector("em");
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent("Emphasized text");
    });

    it("applies styles correctly when using as prop", () => {
      const { container } = renderWithTheme(
        <Text as="p" size="lg" weight="bold" typographyRole="meta" color="muted">
          Styled paragraph
        </Text>,
      );
      const text = container.querySelector("p");
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass("text-[hsl(var(--tm-text-muted))]");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to span element", () => {
      const ref = React.createRef<HTMLSpanElement>();
      renderWithTheme(<Text ref={ref}>Text with ref</Text>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current).toHaveTextContent("Text with ref");
    });

    it("forwards ref to p element when as is p", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      renderWithTheme(
        <Text as="p" ref={ref}>
          Paragraph with ref
        </Text>,
      );
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
      expect(ref.current).toHaveTextContent("Paragraph with ref");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for default variant", () => {
      const { container } = renderWithTheme(<Text>Default Text</Text>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("matches snapshot for muted color", () => {
      const { container } = renderWithTheme(
        <Text typographyRole="meta" color="muted">
          Muted Text
        </Text>,
      );
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
