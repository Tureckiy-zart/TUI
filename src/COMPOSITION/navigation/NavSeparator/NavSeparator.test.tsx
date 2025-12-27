import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { NavSeparator } from "./NavSeparator";

describe("NavSeparator component", () => {
  describe("Rendering", () => {
    it("renders as semantic span element", () => {
      render(<NavSeparator />);

      const separator = screen.getByText("/");
      expect(separator).toBeInTheDocument();
      expect(separator.tagName).toBe("SPAN");
    });

    it("has aria-hidden='true'", () => {
      render(<NavSeparator />);

      const separator = screen.getByText("/");
      expect(separator).toHaveAttribute("aria-hidden", "true");
    });

    it("renders default separator '/' when no children provided", () => {
      render(<NavSeparator />);

      expect(screen.getByText("/")).toBeInTheDocument();
    });

    it("renders custom separator content when children provided", () => {
      render(<NavSeparator>→</NavSeparator>);

      expect(screen.getByText("→")).toBeInTheDocument();
      expect(screen.queryByText("/")).not.toBeInTheDocument();
    });
  });

  describe("asChild prop", () => {
    it("renders through Slot when asChild is true", () => {
      render(
        <NavSeparator asChild>
          <div data-testid="custom-separator">Custom</div>
        </NavSeparator>,
      );

      const customSeparator = screen.getByTestId("custom-separator");
      expect(customSeparator).toBeInTheDocument();
      expect(customSeparator).toHaveAttribute("aria-hidden", "true");
    });

    it("renders as span when asChild is false", () => {
      render(<NavSeparator asChild={false} />);

      const separator = screen.getByText("/");
      expect(separator.tagName).toBe("SPAN");
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLSpanElement>();

      render(<NavSeparator ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current).toHaveTextContent("/");
    });

    it("forwards ref correctly with asChild", () => {
      const ref = React.createRef<HTMLSpanElement>();

      render(
        <NavSeparator asChild ref={ref}>
          <div data-testid="child">Custom</div>
        </NavSeparator>,
      );

      // When asChild is true, ref is forwarded to the child element
      const child = screen.getByTestId("child");
      expect(child).toBeInTheDocument();
    });
  });

  describe("className prop", () => {
    it("applies className", () => {
      render(<NavSeparator className="custom-separator" />);

      const separator = screen.getByText("/");
      expect(separator).toHaveClass("custom-separator");
    });

    it("merges className with token classes", () => {
      render(<NavSeparator className="custom-separator" />);

      const separator = screen.getByText("/");
      expect(separator).toHaveClass("custom-separator");
      // Token class should also be present
      expect(separator.className).toContain("text-foreground");
    });
  });

  describe("Accessibility", () => {
    it("always has aria-hidden='true'", () => {
      const { rerender } = render(<NavSeparator />);
      expect(screen.getByText("/")).toHaveAttribute("aria-hidden", "true");

      rerender(<NavSeparator>→</NavSeparator>);
      expect(screen.getByText("→")).toHaveAttribute("aria-hidden", "true");

      rerender(
        <NavSeparator asChild>
          <div data-testid="child">Custom</div>
        </NavSeparator>,
      );
      expect(screen.getByTestId("child")).toHaveAttribute("aria-hidden", "true");
    });

    it("does not have interactive attributes", () => {
      render(<NavSeparator />);

      const separator = screen.getByText("/");
      expect(separator).not.toHaveAttribute("role");
      expect(separator).not.toHaveAttribute("href");
      expect(separator).not.toHaveAttribute("aria-current");
    });
  });

  describe("Stateless behavior", () => {
    it("renders without state management", () => {
      const { container } = render(<NavSeparator />);

      const separator = container.querySelector("span");
      expect(separator).toBeInTheDocument();
      // Verify no state-related attributes
      expect(separator?.getAttributeNames()).not.toContain("data-state");
      expect(separator?.getAttributeNames()).not.toContain("aria-expanded");
      expect(separator?.getAttributeNames()).not.toContain("aria-selected");
    });
  });
});
