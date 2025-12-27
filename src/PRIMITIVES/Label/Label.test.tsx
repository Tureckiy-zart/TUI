import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Label } from "./Label";

describe("Label", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Label>Username</Label>);
      const label = screen.getByText("Username");
      expect(label).toBeInTheDocument();
    });

    it("renders with children", () => {
      renderWithTheme(<Label>Email Address</Label>);
      const label = screen.getByText("Email Address");
      expect(label).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLLabelElement>();
      renderWithTheme(<Label ref={ref}>Test Label</Label>);
      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
      expect(ref.current?.textContent).toBe("Test Label");
    });

    it("renders as native label element", () => {
      const { container } = renderWithTheme(<Label>Test</Label>);
      const label = container.querySelector("label");
      expect(label).toBeInTheDocument();
    });
  });

  describe("Required Mark", () => {
    it("does not render asterisk by default", () => {
      renderWithTheme(<Label>Username</Label>);
      const label = screen.getByText("Username");
      expect(label.textContent).toBe("Username");
      expect(label.querySelector("span")).not.toBeInTheDocument();
    });

    it("renders asterisk when required is true", () => {
      renderWithTheme(<Label required>Email</Label>);
      const label = screen.getByText(/Email/);
      expect(label.textContent).toContain("*");
      const asterisk = label.querySelector("span");
      expect(asterisk).toBeInTheDocument();
      expect(asterisk?.textContent).toBe("*");
    });

    it("does not render asterisk when required is false", () => {
      renderWithTheme(<Label required={false}>Username</Label>);
      const label = screen.getByText("Username");
      expect(label.textContent).toBe("Username");
      expect(label.querySelector("span")).not.toBeInTheDocument();
    });

    it("renders asterisk when required is explicitly true", () => {
      renderWithTheme(<Label required={true}>Password</Label>);
      const label = screen.getByText(/Password/);
      expect(label.textContent).toContain("*");
    });

    it("asterisk has correct styling classes", () => {
      const { container } = renderWithTheme(<Label required>Email</Label>);
      const asterisk = container.querySelector("span");
      expect(asterisk).toHaveClass("text-destructive");
      expect(asterisk).toHaveClass("ml-xs");
    });
  });

  describe("HTML Attributes", () => {
    it("accepts htmlFor prop", () => {
      renderWithTheme(<Label htmlFor="email-input">Email</Label>);
      const label = screen.getByText("Email");
      expect(label).toHaveAttribute("for", "email-input");
    });

    it("accepts id prop", () => {
      renderWithTheme(<Label id="email-label">Email</Label>);
      const label = screen.getByText("Email");
      expect(label).toHaveAttribute("id", "email-label");
    });

    it("accepts data attributes", () => {
      renderWithTheme(<Label data-testid="custom-label">Test</Label>);
      const label = screen.getByTestId("custom-label");
      expect(label).toBeInTheDocument();
    });

    it("accepts aria attributes", () => {
      renderWithTheme(<Label aria-label="Custom label">Test</Label>);
      const label = screen.getByText("Test");
      expect(label).toHaveAttribute("aria-label", "Custom label");
    });
  });

  describe("Foundation Enforcement", () => {
    it("className prop is excluded from public API at type level", () => {
      // Type-level test: className is excluded via Omit in LabelProps
      // @ts-expect-error - className is excluded from public API
      const { container } = renderWithTheme(<Label className="custom-class">Test</Label>);
      const label = container.querySelector("label");
      // Note: Radix Label may still accept className at runtime, but it's excluded from public API types
      // Foundation Enforcement is enforced at type level (see Label.type-test.tsx)
      expect(label).toBeInTheDocument();
    });

    it("does not accept style prop at runtime", () => {
      // @ts-expect-error - style is excluded from public API
      const { container } = renderWithTheme(<Label style={{ color: "red" }}>Test</Label>);
      const label = container.querySelector("label");
      // style should not be applied (Foundation Enforcement)
      expect(label).not.toHaveStyle({ color: "red" });
    });

    it("has token-based styling classes", () => {
      const { container } = renderWithTheme(<Label>Test</Label>);
      const label = container.querySelector("label");
      // Verify token-based classes are present
      expect(label).toHaveClass("text-sm"); // TEXT_TOKENS.fontSize.sm
      expect(label).toHaveClass("font-medium"); // TEXT_TOKENS.fontWeight.medium
      expect(label).toHaveClass("leading-none"); // TEXT_TOKENS.lineHeight.none
    });
  });

  describe("Peer-disabled Styling", () => {
    it("has peer-disabled styling classes", () => {
      const { container } = renderWithTheme(<Label>Test</Label>);
      const label = container.querySelector("label");
      // Verify peer-disabled classes are present
      expect(label).toHaveClass("peer-disabled:cursor-not-allowed");
      expect(label).toHaveClass("peer-disabled:opacity-70");
    });

    it("renders with peer input (integration test)", () => {
      renderWithTheme(
        <div>
          <input className="peer" disabled />
          <Label>Disabled Input Label</Label>
        </div>,
      );
      const label = screen.getByText("Disabled Input Label");
      expect(label).toBeInTheDocument();
      // peer-disabled classes should be present (visual feedback when peer is disabled)
      expect(label).toHaveClass("peer-disabled:cursor-not-allowed");
      expect(label).toHaveClass("peer-disabled:opacity-70");
    });
  });

  describe("Accessibility", () => {
    it("renders as semantic label element", () => {
      const { container } = renderWithTheme(<Label>Username</Label>);
      const label = container.querySelector("label");
      expect(label?.tagName).toBe("LABEL");
    });

    it("associates with input via htmlFor", () => {
      renderWithTheme(
        <div>
          <Label htmlFor="username-input">Username</Label>
          <input id="username-input" />
        </div>,
      );
      const label = screen.getByText("Username");
      expect(label).toHaveAttribute("for", "username-input");
    });

    it("required mark is visible to screen readers", () => {
      const { container } = renderWithTheme(<Label required>Email</Label>);
      const asterisk = container.querySelector("span");
      expect(asterisk).toBeInTheDocument();
      expect(asterisk?.textContent).toBe("*");
      // Asterisk should be visible (no aria-hidden)
      expect(asterisk).not.toHaveAttribute("aria-hidden");
    });

    it("supports custom aria-label", () => {
      renderWithTheme(<Label aria-label="Custom accessible label">Visual Label</Label>);
      const label = screen.getByLabelText("Custom accessible label");
      expect(label).toBeInTheDocument();
    });

    it("supports aria-labelledby", () => {
      renderWithTheme(
        <div>
          <span id="label-text">Email Address</span>
          <Label aria-labelledby="label-text">Email</Label>
        </div>,
      );
      const label = screen.getByText("Email");
      expect(label).toHaveAttribute("aria-labelledby", "label-text");
    });
  });

  describe("Edge Cases", () => {
    it("renders with empty children", () => {
      const { container } = renderWithTheme(<Label />);
      const label = container.querySelector("label");
      expect(label).toBeInTheDocument();
      expect(label?.textContent).toBe("");
    });

    it("renders with complex children", () => {
      const { container } = renderWithTheme(
        <Label>
          <span>Username</span> <strong>(required)</strong>
        </Label>,
      );
      const label = container.querySelector("label");
      expect(label).toBeInTheDocument();
      expect(label?.textContent).toContain("Username");
      expect(label?.textContent).toContain("(required)");
    });

    it("renders with required mark and complex children", () => {
      const { container } = renderWithTheme(
        <Label required>
          <span>Email</span> <em>Address</em>
        </Label>,
      );
      const label = container.querySelector("label");
      expect(label).toBeInTheDocument();
      expect(label?.textContent).toContain("Email");
      expect(label?.textContent).toContain("Address");
      expect(label?.textContent).toContain("*");
    });

    it("renders with long text", () => {
      const longText =
        "This is a very long label text that might wrap to multiple lines in a form layout";
      renderWithTheme(<Label>{longText}</Label>);
      const label = screen.getByText(longText);
      expect(label).toBeInTheDocument();
    });

    it("renders multiple labels without conflicts", () => {
      renderWithTheme(
        <div>
          <Label htmlFor="input1">Label 1</Label>
          <Label htmlFor="input2">Label 2</Label>
          <Label htmlFor="input3" required>
            Label 3
          </Label>
        </div>,
      );
      expect(screen.getByText("Label 1")).toBeInTheDocument();
      expect(screen.getByText("Label 2")).toBeInTheDocument();
      expect(screen.getByText(/Label 3/)).toBeInTheDocument();
    });
  });

  describe("Type Safety", () => {
    it("accepts all standard label HTML attributes", () => {
      renderWithTheme(
        <Label
          htmlFor="test-input"
          id="test-label"
          data-testid="label-test"
          aria-label="Test"
          title="Label title"
        >
          Test
        </Label>,
      );
      const label = screen.getByTestId("label-test");
      expect(label).toHaveAttribute("for", "test-input");
      expect(label).toHaveAttribute("id", "test-label");
      expect(label).toHaveAttribute("aria-label", "Test");
      expect(label).toHaveAttribute("title", "Label title");
    });
  });

  describe("Radix UI Integration", () => {
    it("uses Radix Label primitive", () => {
      const { container } = renderWithTheme(<Label>Test</Label>);
      const label = container.querySelector("label");
      // Radix Label renders as native label element
      expect(label?.tagName).toBe("LABEL");
    });

    it("preserves Radix Label displayName", () => {
      expect(Label.displayName).toBeDefined();
    });
  });
});
