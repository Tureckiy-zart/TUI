import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge component", () => {
  describe("Rendering", () => {
    it("should render badge with default props", () => {
      const { container } = render(<Badge>Default Badge</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveTextContent("Default Badge");
    });

    it("should render with custom className", () => {
      const { container } = render(<Badge className="custom-class">Badge</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("custom-class");
    });

    it("should render with children", () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText("Test Badge")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("should apply primary variant by default", () => {
      const { container } = render(<Badge>Primary</Badge>);
      const element = container.firstChild as HTMLElement;
      // Primary variant should have primary background and text classes
      expect(element.className).toMatch(/bg-primary|text-primary-foreground/);
    });

    it("should apply primary variant explicitly", () => {
      const { container } = render(<Badge variant="primary">Primary</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toMatch(/bg-primary|text-primary-foreground/);
    });

    it("should apply secondary variant", () => {
      const { container } = render(<Badge variant="secondary">Secondary</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toMatch(/bg-secondary|text-secondary-foreground/);
    });

    it("should apply accent variant", () => {
      const { container } = render(<Badge variant="accent">Accent</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toMatch(/bg-accent|text-accent-foreground/);
    });

    it("should apply outline variant", () => {
      const { container } = render(<Badge variant="outline">Outline</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toMatch(/border-border|text-foreground/);
    });

    it("should apply ghost variant", () => {
      const { container } = render(<Badge variant="ghost">Ghost</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toMatch(/bg-transparent|text-foreground/);
    });

    it("should apply link variant", () => {
      const { container } = render(<Badge variant="link">Link</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toMatch(/text-primary/);
    });

    it("should apply destructive variant", () => {
      const { container } = render(<Badge variant="destructive">Destructive</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toMatch(/bg-destructive|text-destructive-foreground/);
    });
  });

  describe("Token Compliance", () => {
    it("should use token-based layout classes", () => {
      const { container } = render(<Badge>Badge</Badge>);
      const element = container.firstChild as HTMLElement;
      // Should have inline-flex items-center (layout tokens)
      expect(element.className).toMatch(/inline-flex|items-center/);
    });

    it("should use token-based spacing classes", () => {
      const { container } = render(<Badge>Badge</Badge>);
      const element = container.firstChild as HTMLElement;
      // Should have px-xs py-xs (spacing tokens)
      expect(element.className).toMatch(/px-xs|py-xs/);
    });

    it("should use token-based typography classes", () => {
      const { container } = render(<Badge>Badge</Badge>);
      const element = container.firstChild as HTMLElement;
      // Should have text-xs font-semibold (typography tokens)
      expect(element.className).toMatch(/text-xs|font-semibold/);
    });

    it("should use token-based radius classes", () => {
      const { container } = render(<Badge>Badge</Badge>);
      const element = container.firstChild as HTMLElement;
      // Should have rounded-full (radius token)
      expect(element.className).toMatch(/rounded-full/);
    });

    it("should use token-based color classes (no raw values)", () => {
      const { container } = render(<Badge variant="primary">Badge</Badge>);
      const element = container.firstChild as HTMLElement;
      // Verify token usage (bg-primary, text-primary-foreground are token-based)
      expect(element.className).toMatch(
        /bg-(primary|secondary|accent|destructive|transparent)|text-(primary|secondary|accent|destructive|foreground)/,
      );
    });

    it("should use token-based motion classes", () => {
      const { container } = render(<Badge>Badge</Badge>);
      const element = container.firstChild as HTMLElement;
      // Should have transition-colors (motion token)
      expect(element.className).toMatch(/transition-colors/);
    });
  });

  describe("Accessibility", () => {
    it("should be accessible as a status indicator", () => {
      const { container } = render(<Badge>Status</Badge>);
      const element = container.firstChild as HTMLElement;
      // Badge is a display component, should be accessible
      expect(element).toBeInTheDocument();
    });

    it("should accept aria-label", () => {
      const { container } = render(<Badge aria-label="Status badge">Status</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("aria-label", "Status badge");
    });

    it("should accept role attribute", () => {
      const { container } = render(<Badge role="status">Status</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("role", "status");
    });

    it("should accept data attributes", () => {
      const { container } = render(<Badge data-testid="badge">Badge</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("data-testid", "badge");
    });
  });

  describe("Edge Cases", () => {
    it("should handle all variant combinations", () => {
      const variants: Array<
        "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive"
      > = ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"];

      variants.forEach((variant) => {
        const { container } = render(
          <Badge variant={variant} className="custom" data-testid={`badge-${variant}`}>
            {variant}
          </Badge>,
        );
        const element = container.firstChild as HTMLElement;
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass("custom");
        expect(element).toHaveAttribute("data-testid", `badge-${variant}`);
      });
    });

    it("should spread additional HTML attributes", () => {
      const { container } = render(
        <Badge id="test-badge" title="Test badge" data-custom="value">
          Badge
        </Badge>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("id", "test-badge");
      expect(element).toHaveAttribute("title", "Test badge");
      expect(element).toHaveAttribute("data-custom", "value");
    });

    it("should handle empty children", () => {
      const { container } = render(<Badge />);
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("");
    });

    it("should handle complex children", () => {
      render(
        <Badge>
          <span>🚀</span> New Feature
        </Badge>,
      );
      expect(screen.getByText(/new feature/i)).toBeInTheDocument();
    });
  });

  describe("Hover States", () => {
    it("should include hover state classes in variants", () => {
      const { container } = render(<Badge variant="primary">Primary</Badge>);
      const element = container.firstChild as HTMLElement;
      // Primary variant should have hover:bg-primary/80 class
      expect(element.className).toMatch(/hover:bg-primary/);
    });

    it("should include hover state for secondary variant", () => {
      const { container } = render(<Badge variant="secondary">Secondary</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toMatch(/hover:bg-secondary/);
    });

    it("should include hover state for ghost variant", () => {
      const { container } = render(<Badge variant="ghost">Ghost</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toMatch(/hover:bg-accent/);
    });

    it("should include hover underline for link variant", () => {
      const { container } = render(<Badge variant="link">Link</Badge>);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toMatch(/hover:underline/);
    });
  });
});
