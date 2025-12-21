import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { axeCheck, renderWithTheme, userEventSetup } from "@/test/test-utils";

import { Button } from "./Button";

describe("Button", () => {
  describe("API Contract", () => {
    describe("Rendering", () => {
      it("renders without errors", () => {
        renderWithTheme(<Button>Click me</Button>);
        const button = screen.getByRole("button", { name: /click me/i });
        expect(button).toBeInTheDocument();
      });

      it("renders with default variant and size", () => {
        renderWithTheme(<Button>Default Button</Button>);
        const button = screen.getByRole("button", { name: /default button/i });
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe("BUTTON");
      });
    });

    describe("Variants", () => {
      it("accepts and renders primary variant", () => {
        renderWithTheme(<Button variant="primary">Primary</Button>);
        const button = screen.getByRole("button", { name: /primary/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders secondary variant", () => {
        renderWithTheme(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByRole("button", { name: /secondary/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders accent variant", () => {
        renderWithTheme(<Button variant="accent">Accent</Button>);
        const button = screen.getByRole("button", { name: /accent/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders outline variant", () => {
        renderWithTheme(<Button variant="outline">Outline</Button>);
        const button = screen.getByRole("button", { name: /outline/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders ghost variant", () => {
        renderWithTheme(<Button variant="ghost">Ghost</Button>);
        const button = screen.getByRole("button", { name: /ghost/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders destructive variant", () => {
        renderWithTheme(<Button variant="destructive">Destructive</Button>);
        const button = screen.getByRole("button", { name: /destructive/i });
        expect(button).toBeInTheDocument();
      });
    });

    describe("Sizes", () => {
      it("accepts and renders sm size", () => {
        renderWithTheme(<Button size="sm">Small</Button>);
        const button = screen.getByRole("button", { name: /small/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders md size (default)", () => {
        renderWithTheme(<Button size="md">Medium</Button>);
        const button = screen.getByRole("button", { name: /medium/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders lg size", () => {
        renderWithTheme(<Button size="lg">Large</Button>);
        const button = screen.getByRole("button", { name: /large/i });
        expect(button).toBeInTheDocument();
      });

      it("accepts and renders icon size", () => {
        renderWithTheme(
          <Button size="icon" aria-label="Icon button">
            <span>🔍</span>
          </Button>,
        );
        const button = screen.getByRole("button", { name: /icon button/i });
        expect(button).toBeInTheDocument();
      });
    });

    describe("Disabled State", () => {
      it("accepts disabled prop and renders disabled button", () => {
        renderWithTheme(<Button disabled>Disabled</Button>);
        const button = screen.getByRole("button", { name: /disabled/i });
        expect(button).toBeDisabled();
      });

      it("renders enabled button when disabled is false", () => {
        renderWithTheme(<Button disabled={false}>Enabled</Button>);
        const button = screen.getByRole("button", { name: /enabled/i });
        expect(button).not.toBeDisabled();
      });

      it("renders enabled button when disabled prop is not provided", () => {
        renderWithTheme(<Button>Enabled</Button>);
        const button = screen.getByRole("button", { name: /enabled/i });
        expect(button).not.toBeDisabled();
      });
    });

    describe("asChild", () => {
      it("renders as child element when asChild is true", () => {
        const { container } = renderWithTheme(
          <Button asChild variant="primary" size="md">
            <a href="/test">Link Button</a>
          </Button>,
        );
        const link = container.querySelector("a");
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent("Link Button");
      });

      it("renders as child element with icons when asChild is true", () => {
        const { container } = renderWithTheme(
          <Button asChild leftIcon={<span data-testid="left-icon">←</span>}>
            <a href="/test">Link with Icon</a>
          </Button>,
        );
        const link = container.querySelector("a");
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent("Link with Icon");
        expect(screen.getByTestId("left-icon")).toBeInTheDocument();
      });

      it("renders as button when asChild is false", () => {
        renderWithTheme(<Button asChild={false}>Button</Button>);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button.tagName).toBe("BUTTON");
      });
    });

    describe("Icons", () => {
      it("renders with leftIcon", () => {
        renderWithTheme(
          <Button leftIcon={<span data-testid="left-icon">←</span>}>With Left Icon</Button>,
        );
        expect(screen.getByTestId("left-icon")).toBeInTheDocument();
        expect(screen.getByRole("button")).toHaveTextContent("With Left Icon");
      });

      it("renders with rightIcon", () => {
        renderWithTheme(
          <Button rightIcon={<span data-testid="right-icon">→</span>}>With Right Icon</Button>,
        );
        expect(screen.getByTestId("right-icon")).toBeInTheDocument();
        expect(screen.getByRole("button")).toHaveTextContent("With Right Icon");
      });

      it("renders with both leftIcon and rightIcon", () => {
        renderWithTheme(
          <Button
            leftIcon={<span data-testid="left-icon">←</span>}
            rightIcon={<span data-testid="right-icon">→</span>}
          >
            With Icons
          </Button>,
        );
        expect(screen.getByTestId("left-icon")).toBeInTheDocument();
        expect(screen.getByTestId("right-icon")).toBeInTheDocument();
        expect(screen.getByRole("button")).toHaveTextContent("With Icons");
      });
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      renderWithTheme(<Button>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("has accessible name from text content", () => {
      renderWithTheme(<Button>Submit Form</Button>);
      const button = screen.getByRole("button", { name: /submit form/i });
      expect(button).toBeInTheDocument();
    });

    it("has accessible name from aria-label", () => {
      renderWithTheme(<Button aria-label="Close dialog">×</Button>);
      const button = screen.getByRole("button", { name: /close dialog/i });
      expect(button).toBeInTheDocument();
    });

    it("has disabled semantics when disabled", () => {
      renderWithTheme(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole("button", { name: /disabled button/i });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("disabled");
    });

    it("does not have disabled attribute when enabled", () => {
      renderWithTheme(<Button>Enabled Button</Button>);
      const button = screen.getByRole("button", { name: /enabled button/i });
      expect(button).not.toBeDisabled();
      expect(button).not.toHaveAttribute("disabled");
    });

    it("passes axe accessibility checks", async () => {
      const { container } = renderWithTheme(<Button>Accessible Button</Button>);
      const results = await axeCheck(container);
      (expect(results) as any).toHaveNoViolations();
    });

    it("passes axe accessibility checks when disabled", async () => {
      const { container } = renderWithTheme(<Button disabled>Disabled Button</Button>);
      const results = await axeCheck(container);
      (expect(results) as any).toHaveNoViolations();
    });

    it("passes axe accessibility checks with aria-label", async () => {
      const { container } = renderWithTheme(
        <Button aria-label="Icon button" size="icon">
          <span>🔍</span>
        </Button>,
      );
      const results = await axeCheck(container);
      (expect(results) as any).toHaveNoViolations();
    });
  });

  describe("Interaction", () => {
    describe("Mouse Interaction", () => {
      it("handles onClick events", () => {
        const handleClick = vi.fn();
        renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
        const button = screen.getByRole("button");
        button.click();
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("handles onClick with userEvent", async () => {
        const user = userEventSetup();
        const handleClick = vi.fn();
        renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
        const button = screen.getByRole("button");
        await user.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("does not call onClick when disabled", () => {
        const handleClick = vi.fn();
        renderWithTheme(
          <Button disabled onClick={handleClick}>
            Disabled
          </Button>,
        );
        const button = screen.getByRole("button");
        button.click();
        expect(handleClick).not.toHaveBeenCalled();
      });

      it("does not call onClick when disabled (userEvent)", async () => {
        const user = userEventSetup();
        const handleClick = vi.fn();
        renderWithTheme(
          <Button disabled onClick={handleClick}>
            Disabled
          </Button>,
        );
        const button = screen.getByRole("button");
        await user.click(button);
        expect(handleClick).not.toHaveBeenCalled();
      });
    });

    describe("Keyboard Interaction", () => {
      it("activates on Enter key press", async () => {
        const user = userEventSetup();
        const handleClick = vi.fn();
        renderWithTheme(<Button onClick={handleClick}>Press Enter</Button>);
        const button = screen.getByRole("button");
        button.focus();
        await user.keyboard("{Enter}");
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("activates on Space key press", async () => {
        const user = userEventSetup();
        const handleClick = vi.fn();
        renderWithTheme(<Button onClick={handleClick}>Press Space</Button>);
        const button = screen.getByRole("button");
        button.focus();
        await user.keyboard(" ");
        expect(handleClick).toHaveBeenCalledTimes(1);
      });

      it("does not activate on Enter when disabled", async () => {
        const user = userEventSetup();
        const handleClick = vi.fn();
        renderWithTheme(
          <Button disabled onClick={handleClick}>
            Disabled
          </Button>,
        );
        const button = screen.getByRole("button");
        button.focus();
        await user.keyboard("{Enter}");
        expect(handleClick).not.toHaveBeenCalled();
      });

      it("does not activate on Space when disabled", async () => {
        const user = userEventSetup();
        const handleClick = vi.fn();
        renderWithTheme(
          <Button disabled onClick={handleClick}>
            Disabled
          </Button>,
        );
        const button = screen.getByRole("button");
        button.focus();
        await user.keyboard(" ");
        expect(handleClick).not.toHaveBeenCalled();
      });

      it("can receive focus", () => {
        renderWithTheme(<Button>Focusable</Button>);
        const button = screen.getByRole("button");
        button.focus();
        expect(button).toHaveFocus();
      });

      it("cannot receive focus when disabled", () => {
        renderWithTheme(<Button disabled>Disabled</Button>);
        const button = screen.getByRole("button");
        button.focus();
        expect(button).not.toHaveFocus();
      });
    });
  });

  describe("State Authority", () => {
    describe("Disabled State", () => {
      it("prevents interaction when disabled", () => {
        const handleClick = vi.fn();
        renderWithTheme(
          <Button disabled onClick={handleClick}>
            Disabled
          </Button>,
        );
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
        button.click();
        expect(handleClick).not.toHaveBeenCalled();
      });

      it("has disabled attribute when disabled prop is true", () => {
        renderWithTheme(<Button disabled>Disabled</Button>);
        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("disabled");
      });

      it("does not have disabled attribute when disabled prop is false", () => {
        renderWithTheme(<Button disabled={false}>Enabled</Button>);
        const button = screen.getByRole("button");
        expect(button).not.toHaveAttribute("disabled");
      });
    });
  });

  describe("Runtime Contract", () => {
    describe("Default Attributes", () => {
      it("renders as button element with correct tag", () => {
        renderWithTheme(<Button>Click me</Button>);
        const button = screen.getByRole("button");
        expect(button.tagName).toBe("BUTTON");
        // Button element exists and can have type attribute set
        expect(button).toBeInstanceOf(HTMLButtonElement);
      });

      it("uses browser default type when type is not specified", () => {
        // Current behavior: Button uses browser default (type="submit") when type is not specified.
        // This can cause accidental form submissions if Button is used inside a form without explicit type="button".
        // Recommendation: Consider defaulting to type="button" to prevent accidental form submissions.
        renderWithTheme(<Button>Click me</Button>);
        const button = screen.getByRole("button") as HTMLButtonElement;
        expect(button).toBeInstanceOf(HTMLButtonElement);
        // Browser default for button element is "submit" when type is not specified
        // This is acceptable for now but should be documented as a potential risk
        expect(button.type).toBe("submit");
      });

      it("can explicitly set type='button'", () => {
        renderWithTheme(<Button type="button">Click me</Button>);
        const button = screen.getByRole("button") as HTMLButtonElement;
        expect(button.type).toBe("button");
      });

      it("allows type to be overridden", () => {
        renderWithTheme(<Button type="submit">Submit</Button>);
        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("type", "submit");
      });
    });

    describe("Interaction Blocking", () => {
      it("disabled blocks click handler", () => {
        const handleClick = vi.fn();
        renderWithTheme(
          <Button disabled onClick={handleClick}>
            Disabled
          </Button>,
        );
        const button = screen.getByRole("button");
        button.click();
        expect(handleClick).not.toHaveBeenCalled();
      });

      it("disabled blocks click handler with userEvent", async () => {
        const user = userEventSetup();
        const handleClick = vi.fn();
        renderWithTheme(
          <Button disabled onClick={handleClick}>
            Disabled
          </Button>,
        );
        const button = screen.getByRole("button");
        await user.click(button);
        expect(handleClick).not.toHaveBeenCalled();
      });

      // Note: Button component does not currently have a loading prop.
      // Loading state is not part of the current public API.
      // If loading state is added in the future, it should block click handlers.
    });

    describe("Accessibility", () => {
      it("button is focusable when enabled", () => {
        renderWithTheme(<Button>Focusable</Button>);
        const button = screen.getByRole("button");
        button.focus();
        expect(button).toHaveFocus();
      });

      it("button is not focusable when disabled", () => {
        renderWithTheme(<Button disabled>Disabled</Button>);
        const button = screen.getByRole("button");
        button.focus();
        expect(button).not.toHaveFocus();
      });

      // Note: Button component does not currently have a loading prop.
      // aria-busy attribute would be required if loading state is added.
    });
  });
});
