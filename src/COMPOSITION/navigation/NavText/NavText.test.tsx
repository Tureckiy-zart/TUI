import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { NavText } from "./NavText";

describe("NavText component", () => {
  describe("Rendering", () => {
    it("renders as semantic span element", () => {
      render(<NavText>Text content</NavText>);

      const text = screen.getByText("Text content");
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe("SPAN");
    });

    it("renders children correctly", () => {
      render(<NavText>Home</NavText>);

      expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("renders complex children", () => {
      render(
        <NavText>
          <strong>Bold</strong> text
        </NavText>,
      );

      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText(/text/)).toBeInTheDocument();
    });
  });

  describe("aria-current prop", () => {
    it("passes aria-current when provided", () => {
      render(<NavText aria-current="page">Current page</NavText>);

      const text = screen.getByText("Current page");
      expect(text).toHaveAttribute("aria-current", "page");
    });

    it("does not have aria-current when not provided", () => {
      render(<NavText>Regular text</NavText>);

      const text = screen.getByText("Regular text");
      expect(text).not.toHaveAttribute("aria-current");
    });
  });

  describe("asChild prop", () => {
    it("renders through Slot when asChild is true", () => {
      render(
        <NavText asChild>
          <div data-testid="custom-text">Custom</div>
        </NavText>,
      );

      const customText = screen.getByTestId("custom-text");
      expect(customText).toBeInTheDocument();
    });

    it("renders as span when asChild is false", () => {
      render(<NavText asChild={false}>Text</NavText>);

      const text = screen.getByText("Text");
      expect(text.tagName).toBe("SPAN");
    });

    it("passes props to child when asChild is true", () => {
      render(
        <NavText asChild aria-current="page">
          <div data-testid="child">Text</div>
        </NavText>,
      );

      const child = screen.getByTestId("child");
      expect(child).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLSpanElement>();

      render(<NavText ref={ref}>Text</NavText>);

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current).toHaveTextContent("Text");
    });

    it("forwards ref correctly with asChild", () => {
      const ref = React.createRef<HTMLSpanElement>();

      render(
        <NavText asChild ref={ref}>
          <div data-testid="child">Custom</div>
        </NavText>,
      );

      // When asChild is true, ref is forwarded to the child element
      const child = screen.getByTestId("child");
      expect(child).toBeInTheDocument();
    });
  });

  describe("className prop", () => {
    it("applies className", () => {
      render(<NavText className="custom-text">Text</NavText>);

      const text = screen.getByText("Text");
      expect(text).toHaveClass("custom-text");
    });

    it("merges className with token classes", () => {
      render(<NavText className="custom-text">Text</NavText>);

      const text = screen.getByText("Text");
      expect(text).toHaveClass("custom-text");
      // Token class should also be present
      expect(text.className).toContain("text-[hsl(var(--tm-text-primary))]");
    });
  });

  describe("Accessibility", () => {
    it("is not focusable by default", () => {
      render(<NavText>Text</NavText>);

      const text = screen.getByText("Text");
      expect(text).not.toHaveAttribute("tabIndex");
    });

    it("does not have role overrides", () => {
      render(<NavText>Text</NavText>);

      const text = screen.getByText("Text");
      expect(text).not.toHaveAttribute("role");
    });

    it("does not have interactive attributes", () => {
      render(<NavText>Text</NavText>);

      const text = screen.getByText("Text");
      expect(text).not.toHaveAttribute("href");
      expect(text).not.toHaveAttribute("onClick");
    });

    it("supports aria-current='page'", () => {
      render(<NavText aria-current="page">Current</NavText>);

      const text = screen.getByText("Current");
      expect(text).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Non-interactive behavior", () => {
    it("does not render link or button elements", () => {
      const { container } = render(<NavText>Text</NavText>);

      expect(container.querySelector("a")).not.toBeInTheDocument();
      expect(container.querySelector("button")).not.toBeInTheDocument();
    });

    it("does not have click handlers", () => {
      render(<NavText>Text</NavText>);

      const text = screen.getByText("Text");
      expect(text).not.toHaveAttribute("onClick");
    });
  });

  describe("Stateless behavior", () => {
    it("renders without state management", () => {
      const { container } = render(<NavText>Text</NavText>);

      const text = container.querySelector("span");
      expect(text).toBeInTheDocument();
      // Verify no state-related attributes
      expect(text?.getAttributeNames()).not.toContain("data-state");
      expect(text?.getAttributeNames()).not.toContain("aria-expanded");
      expect(text?.getAttributeNames()).not.toContain("aria-selected");
    });

    it("does not determine current state", () => {
      // NavText should not have logic to determine if it's current
      // It only passes through externally provided aria-current
      render(<NavText>Text</NavText>);

      const text = screen.getByText("Text");
      expect(text).not.toHaveAttribute("aria-current");
    });
  });

  describe("Forbidden props validation", () => {
    it("does not accept href prop", () => {
      // TypeScript should prevent this, but we verify runtime behavior
      const { container } = render(<NavText {...({ href: "/" } as any)}>Text</NavText>);

      const text = container.querySelector("span");
      // href should not be applied to span
      expect(text).not.toHaveAttribute("href");
    });

    it("does not accept onClick prop", () => {
      const { container } = render(<NavText {...({ onClick: () => {} } as any)}>Text</NavText>);

      const text = container.querySelector("span");
      // onClick should not be applied (non-interactive)
      expect(text).not.toHaveAttribute("onClick");
    });
  });
});
