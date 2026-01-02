/**
 * VisuallyHidden Component Tests
 *
 * Comprehensive test coverage for VisuallyHidden component:
 * - Behavior tests (rendering, ref forwarding, style application)
 * - asChild behavior tests
 * - DOM assertions (CSS styles verification)
 */

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import React from "react";
import { VisuallyHidden } from "./VisuallyHidden";

describe("VisuallyHidden", () => {
  /**
   * Behavior Tests - Basic functionality
   */
  describe("Behavior Tests", () => {
    it("renders children correctly", () => {
      render(<VisuallyHidden>Screen reader text</VisuallyHidden>);
      expect(screen.getByText("Screen reader text")).toBeInTheDocument();
    });

    it("renders as span by default", () => {
      const { container } = render(<VisuallyHidden>Content</VisuallyHidden>);
      const element = container.firstChild;
      expect(element?.nodeName).toBe("SPAN");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<VisuallyHidden ref={ref}>Content</VisuallyHidden>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.textContent).toBe("Content");
    });

    it("applies visually-hidden styles", () => {
      const { container } = render(<VisuallyHidden>Content</VisuallyHidden>);
      const element = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(element);

      expect(styles.position).toBe("absolute");
      expect(styles.width).toBe("1px");
      expect(styles.height).toBe("1px");
      expect(styles.overflow).toBe("hidden");
      expect(styles.clipPath).toBe("inset(50%)");
      expect(styles.whiteSpace).toBe("nowrap");
    });

    it("supports HTML attributes", () => {
      render(
        <VisuallyHidden id="test-id" className="test-class" data-testid="visually-hidden">
          Content
        </VisuallyHidden>,
      );
      const element = screen.getByTestId("visually-hidden");
      expect(element).toHaveAttribute("id", "test-id");
      expect(element).toHaveClass("test-class");
    });

    it("supports ARIA attributes", () => {
      render(
        <VisuallyHidden id="helper-id" role="text" aria-label="Helper text">
          Content
        </VisuallyHidden>,
      );
      const element = screen.getByLabelText("Helper text");
      expect(element).toHaveAttribute("id", "helper-id");
      expect(element).toHaveAttribute("role", "text");
    });

    it("merges custom styles with visually-hidden styles", () => {
      const { container } = render(
        <VisuallyHidden style={{ color: "red" }}>Content</VisuallyHidden>,
      );
      const element = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(element);

      // Visually-hidden styles should still be applied
      expect(styles.position).toBe("absolute");
      expect(styles.width).toBe("1px");
      expect(styles.height).toBe("1px");

      // Custom style should be merged
      expect(element.style.color).toBe("red");
    });
  });

  /**
   * asChild Tests - Radix Slot pattern
   */
  describe("asChild Tests", () => {
    it("renders as child element when asChild is true", () => {
      render(
        <VisuallyHidden asChild>
          <div data-testid="child-element">Content</div>
        </VisuallyHidden>,
      );
      const element = screen.getByTestId("child-element");
      expect(element).toBeInTheDocument();
      expect(element.nodeName).toBe("DIV");

      // Visually-hidden styles should be applied to child
      const styles = window.getComputedStyle(element);
      expect(styles.position).toBe("absolute");
      expect(styles.width).toBe("1px");
      expect(styles.height).toBe("1px");
    });

    it("forwards ref when asChild is true", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <VisuallyHidden asChild ref={ref}>
          <div>Content</div>
        </VisuallyHidden>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("preserves child props when asChild is true", () => {
      render(
        <VisuallyHidden asChild>
          <div id="child-id" className="child-class" data-testid="child">
            Content
          </div>
        </VisuallyHidden>,
      );
      const element = screen.getByTestId("child");
      expect(element).toHaveAttribute("id", "child-id");
      expect(element).toHaveClass("child-class");
    });
  });

  /**
   * DOM Assertions - CSS styles verification
   */
  describe("DOM Assertions", () => {
    it("verifies all visually-hidden CSS properties are applied", () => {
      const { container } = render(<VisuallyHidden>Content</VisuallyHidden>);
      const element = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(element);

      // Verify all required visually-hidden properties
      expect(styles.position).toBe("absolute");
      expect(styles.width).toBe("1px");
      expect(styles.height).toBe("1px");
      expect(styles.padding).toBe("0px");
      expect(styles.margin).toContain("-1px");
      expect(styles.overflow).toBe("hidden");
      expect(styles.clipPath).toBe("inset(50%)");
      expect(styles.whiteSpace).toBe("nowrap");
      expect(styles.borderWidth).toBe("0px");
    });

    it("verifies element is visually hidden (not visible)", () => {
      const { container } = render(<VisuallyHidden>Content</VisuallyHidden>);
      const element = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(element);

      // Element should be positioned absolutely and clipped
      expect(styles.position).toBe("absolute");
      expect(styles.clipPath).toBe("inset(50%)");
      expect(styles.width).toBe("1px");
      expect(styles.height).toBe("1px");
    });

    it("verifies element is still accessible (in DOM)", () => {
      render(<VisuallyHidden>Screen reader text</VisuallyHidden>);
      const element = screen.getByText("Screen reader text");
      expect(element).toBeInTheDocument();
      expect(element.textContent).toBe("Screen reader text");
    });
  });

  /**
   * Accessibility Tests - A11Y compliance
   */
  describe("Accessibility Tests", () => {
    it("does not interfere with parent element focus", () => {
      const { container } = render(
        <button type="button" data-testid="parent-button">
          <VisuallyHidden>Close dialog</VisuallyHidden>
        </button>,
      );
      const button = screen.getByTestId("parent-button");
      const visuallyHidden = container.querySelector("span");

      // Parent button should be focusable
      expect(button).toBeInTheDocument();
      expect(visuallyHidden).toBeInTheDocument();

      // VisuallyHidden should not interfere with button focus
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it("does not interfere with parent element keyboard navigation", () => {
      render(
        <div>
          <button type="button" data-testid="button-1">
            Button 1<VisuallyHidden>First button</VisuallyHidden>
          </button>
          <button type="button" data-testid="button-2">
            Button 2<VisuallyHidden>Second button</VisuallyHidden>
          </button>
        </div>,
      );

      const button1 = screen.getByTestId("button-1");
      const button2 = screen.getByTestId("button-2");

      // Tab navigation should work normally
      button1.focus();
      expect(document.activeElement).toBe(button1);

      button2.focus();
      expect(document.activeElement).toBe(button2);
    });

    it("preserves screen reader accessibility", () => {
      render(<VisuallyHidden id="helper-text">Helper text for form input</VisuallyHidden>);
      const element = screen.getByText("Helper text for form input");

      // Element should be in DOM for screen readers
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("id", "helper-text");

      // Element should be accessible via aria-describedby
      render(
        <div>
          <input type="text" aria-describedby="helper-text" />
          <VisuallyHidden id="helper-text">Helper text</VisuallyHidden>
        </div>,
      );
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "helper-text");
    });

    it("does not add redundant ARIA attributes", () => {
      const { container } = render(<VisuallyHidden>Content</VisuallyHidden>);
      const element = container.firstChild as HTMLElement;

      // Native span should not have redundant ARIA
      expect(element.tagName).toBe("SPAN");
      // No redundant role attribute (span is already semantic)
      expect(element).not.toHaveAttribute("role", "text");
    });

    it("allows ARIA attributes to be passed via props", () => {
      render(
        <VisuallyHidden id="helper-id" role="text" aria-label="Helper text">
          Content
        </VisuallyHidden>,
      );
      const element = screen.getByLabelText("Helper text");
      expect(element).toHaveAttribute("id", "helper-id");
      expect(element).toHaveAttribute("role", "text");
      expect(element).toHaveAttribute("aria-label", "Helper text");
    });
  });
});
