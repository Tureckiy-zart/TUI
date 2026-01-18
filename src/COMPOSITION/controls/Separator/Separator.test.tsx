import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { Separator } from "./Separator";

describe("Separator component", () => {
  describe("Rendering", () => {
    it("should render separator with default props", () => {
      const { container } = render(<Separator />);
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("data-orientation", "horizontal");
    });

    it("should render with custom className", () => {
      const { container } = render(<Separator className="custom-class" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("custom-class");
    });
  });

  describe("Orientation", () => {
    it("should render horizontal separator by default", () => {
      const { container } = render(<Separator />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("data-orientation", "horizontal");
      expect(element).toHaveClass("h-px", "w-full");
    });

    it("should render vertical separator when orientation is vertical", () => {
      const { container } = render(<Separator orientation="vertical" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("data-orientation", "vertical");
      expect(element).toHaveClass("h-full", "w-px");
    });
  });

  describe("Color Variants", () => {
    it("should apply border color by default", () => {
      const { container } = render(<Separator />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("bg-[hsl(var(--tm-border-default))]");
    });

    it("should apply muted color variant", () => {
      const { container } = render(<Separator color="muted" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("bg-[hsl(var(--tm-muted))]");
    });

    it("should apply primary color variant", () => {
      const { container } = render(<Separator color="primary" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("bg-[hsl(var(--tm-primary))]/20");
    });

    it("should apply secondary color variant", () => {
      const { container } = render(<Separator color="secondary" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("bg-secondary/20");
    });

    it("should apply accent color variant", () => {
      const { container } = render(<Separator color="accent" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("bg-[hsl(var(--tm-accent))]/20");
    });
  });

  describe("Thickness Variants", () => {
    it("should apply 1px thickness by default (horizontal)", () => {
      const { container } = render(<Separator orientation="horizontal" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("h-px");
    });

    it("should apply 2px thickness (horizontal)", () => {
      const { container } = render(<Separator orientation="horizontal" thickness="2" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("h-0.5");
    });

    it("should apply 1px thickness by default (vertical)", () => {
      const { container } = render(<Separator orientation="vertical" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("w-px");
    });

    it("should apply 2px thickness (vertical)", () => {
      const { container } = render(<Separator orientation="vertical" thickness="2" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("w-0.5");
    });
  });

  describe("Accessibility", () => {
    it("should have role='none' when decorative is true (default)", () => {
      const { container } = render(<Separator />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("role", "none");
    });

    it("should have role='separator' when decorative is false", () => {
      const { container } = render(<Separator decorative={false} />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("role", "separator");
    });

    it("should have data-orientation attribute for semantic separator", () => {
      const { container } = render(<Separator decorative={false} orientation="horizontal" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("data-orientation", "horizontal");
    });

    it("should have aria-orientation='vertical' for vertical semantic separator", () => {
      const { container } = render(<Separator decorative={false} orientation="vertical" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("aria-orientation", "vertical");
    });
  });

  describe("Token Compliance", () => {
    it("should use token-based color classes (no raw values)", () => {
      const { container } = render(<Separator color="primary" />);
      const element = container.firstChild as HTMLElement;
      // Verify token usage (bg-[hsl(var(--tm-primary))]/20 is token-based)
      expect(element.className).toContain("bg-[hsl(var(--tm-");
    });

    it("should use token-based sizing (tokenized thickness values)", () => {
      const { container } = render(<Separator />);
      const element = container.firstChild as HTMLElement;
      // Verify token usage for sizing (h-px for 1px, h-0.5 for 2px via tokens)
      expect(element.className).toMatch(/h-px|h-0\.5|w-px|w-0\.5|w-full|h-full/);
    });
  });

  describe("Compound Variants", () => {
    it("should apply correct classes for horizontal + thickness 2", () => {
      const { container } = render(<Separator orientation="horizontal" thickness="2" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("h-0.5");
      expect(element).toHaveClass("w-full");
    });

    it("should apply correct classes for vertical + thickness 2", () => {
      const { container } = render(<Separator orientation="vertical" thickness="2" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("w-0.5");
      expect(element).toHaveClass("h-full");
    });
  });

  describe("Edge Cases", () => {
    it("should handle all prop combinations", () => {
      const { container } = render(
        <Separator
          orientation="vertical"
          color="accent"
          thickness="2"
          decorative={false}
          className="custom"
        />,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("data-orientation", "vertical");
      expect(element).toHaveAttribute("role", "separator");
      expect(element).toHaveClass("bg-[hsl(var(--tm-accent))]/20");
      expect(element).toHaveClass("w-0.5");
      expect(element).toHaveClass("custom");
    });

    it("should forward ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Separator ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("should spread additional props", () => {
      const { container } = render(<Separator data-testid="separator" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("data-testid", "separator");
    });
  });
});
