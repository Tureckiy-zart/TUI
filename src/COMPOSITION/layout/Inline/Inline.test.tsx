import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";

import { Inline } from "./Inline";

describe("Inline component", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      const { container } = render(
        <Inline>
          <span>Item 1</span>
          <span>Item 2</span>
        </Inline>,
      );
      const inline = container.firstChild as HTMLElement;
      expect(inline).toBeInTheDocument();
      expect(inline?.tagName).toBe("DIV");
      expect(inline).toHaveClass("inline-flex", "flex-nowrap");
      expect(inline).toHaveTextContent("Item 1");
      expect(inline).toHaveTextContent("Item 2");
    });

    it("renders children correctly", () => {
      const { container } = render(
        <Inline>
          <span data-testid="a">A</span>
          <span data-testid="b">B</span>
        </Inline>,
      );
      expect(container.querySelector("[data-testid=a]")).toHaveTextContent("A");
      expect(container.querySelector("[data-testid=b]")).toHaveTextContent("B");
    });
  });

  describe("Token-based gap (spacing)", () => {
    it("applies gap using semantic spacing tokens", () => {
      const { container, rerender } = render(<Inline gap="sm">Content</Inline>);
      const inline = container.firstChild as HTMLElement;
      expect(inline).toHaveStyle({ gap: "var(--spacing-sm)" });

      rerender(<Inline gap="md">Content</Inline>);
      expect(inline).toHaveStyle({ gap: "var(--spacing-md)" });

      rerender(<Inline gap="lg">Content</Inline>);
      expect(inline).toHaveStyle({ gap: "var(--spacing-lg)" });
    });

    it("applies gap using numeric spacing tokens", () => {
      const { container, rerender } = render(<Inline gap={4}>Content</Inline>);
      const inline = container.firstChild as HTMLElement;
      expect(inline).toHaveStyle({ gap: "var(--spacing-4)" });

      rerender(<Inline gap={6}>Content</Inline>);
      expect(inline).toHaveStyle({ gap: "var(--spacing-6)" });
    });

    it("applies gap using base value from responsive object", () => {
      const { container } = render(<Inline gap={{ base: "md", lg: "xl" }}>Content</Inline>);
      const inline = container.firstChild as HTMLElement;
      expect(inline).toHaveStyle({ gap: "var(--spacing-md)" });
    });

    it("does not set gap style when gap is not provided", () => {
      const { container } = render(<Inline>Content</Inline>);
      const inline = container.firstChild as HTMLElement;
      expect(inline.style.gap).toBe("");
    });
  });

  describe("Align", () => {
    it("applies align start", () => {
      const { container } = render(<Inline align="start">Content</Inline>);
      expect(container.firstChild).toHaveClass("items-start");
    });

    it("applies align center", () => {
      const { container } = render(<Inline align="center">Content</Inline>);
      expect(container.firstChild).toHaveClass("items-center");
    });

    it("applies align end", () => {
      const { container } = render(<Inline align="end">Content</Inline>);
      expect(container.firstChild).toHaveClass("items-end");
    });

    it("applies align baseline", () => {
      const { container } = render(<Inline align="baseline">Content</Inline>);
      expect(container.firstChild).toHaveClass("items-baseline");
    });

    it("does not add align class when align is not provided", () => {
      const { container } = render(<Inline>Content</Inline>);
      const el = container.firstChild as HTMLElement;
      expect(el).not.toHaveClass("items-start", "items-center", "items-end", "items-baseline");
    });
  });

  describe("Wrap", () => {
    it("applies flex-nowrap by default", () => {
      const { container } = render(<Inline>Content</Inline>);
      expect(container.firstChild).toHaveClass("flex-nowrap");
      expect(container.firstChild).not.toHaveClass("flex-wrap");
    });

    it("applies flex-wrap when wrap is true", () => {
      const { container } = render(<Inline wrap>Content</Inline>);
      expect(container.firstChild).toHaveClass("flex-wrap");
      expect(container.firstChild).not.toHaveClass("flex-nowrap");
    });

    it("applies flex-nowrap when wrap is false", () => {
      const { container } = render(<Inline wrap={false}>Content</Inline>);
      expect(container.firstChild).toHaveClass("flex-nowrap");
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref to div when asChild is false", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Inline ref={ref} gap="md">
          <span>Content</span>
        </Inline>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.tagName).toBe("DIV");
    });

    it("forwards ref to child when asChild is true", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(
        <Inline asChild ref={ref as React.Ref<HTMLDivElement>}>
          <span>Content</span>
        </Inline>,
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.textContent).toBe("Content");
    });
  });

  describe("asChild", () => {
    it("renders as child element when asChild is true", () => {
      const { container } = render(
        <Inline asChild gap="md">
          <span data-testid="child">Content</span>
        </Inline>,
      );
      const child = container.querySelector("[data-testid=child]");
      expect(child).toBeInTheDocument();
      expect(child?.nodeName).toBe("SPAN");
      expect(child).toHaveClass("inline-flex");
      expect(child).toHaveStyle({ gap: "var(--spacing-md)" });
    });

    it("applies layout classes to child when asChild is true", () => {
      const { container } = render(
        <Inline asChild align="center" wrap>
          <div data-testid="child">Content</div>
        </Inline>,
      );
      const child = container.querySelector("[data-testid=child]");
      expect(child).toHaveClass("inline-flex", "items-center", "flex-wrap");
    });
  });

  describe("Combined props", () => {
    it("applies gap, align, and wrap together", () => {
      const { container } = render(
        <Inline gap="lg" align="center" wrap>
          <span>A</span>
          <span>B</span>
        </Inline>,
      );
      const inline = container.firstChild as HTMLElement;
      expect(inline).toHaveStyle({ gap: "var(--spacing-lg)" });
      expect(inline).toHaveClass("inline-flex", "items-center", "flex-wrap");
    });
  });
});
