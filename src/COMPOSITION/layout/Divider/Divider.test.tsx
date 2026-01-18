import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { Divider } from "./Divider";

describe("Divider component", () => {
  describe("Rendering", () => {
    it("should render divider with default props", () => {
      const { container } = render(<Divider />);
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("HR");
    });
  });

  describe("Orientation", () => {
    it("should render horizontal divider by default", () => {
      const { container } = render(<Divider />);
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("HR");
      expect(element).toHaveClass("h-px", "w-full");
    });

    it("should render vertical divider when orientation is vertical", () => {
      const { container } = render(<Divider orientation="vertical" />);
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveClass("h-full", "w-px");
    });
  });

  describe("Tone Variants", () => {
    it("should apply border tone by default", () => {
      const { container } = render(<Divider />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("bg-[hsl(var(--tm-border-default))]");
    });

    it("should apply muted tone variant", () => {
      const { container } = render(<Divider tone="muted" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("bg-[hsl(var(--tm-muted))]");
    });

    it("should apply primary tone variant", () => {
      const { container } = render(<Divider tone="primary" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("bg-[hsl(var(--tm-primary))]/20");
    });

    it("should apply secondary tone variant", () => {
      const { container } = render(<Divider tone="secondary" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("bg-[hsl(var(--tm-secondary))]/20");
    });

    it("should apply accent tone variant", () => {
      const { container } = render(<Divider tone="accent" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("bg-[hsl(var(--tm-accent))]/20");
    });
  });

  describe("Inset Pattern", () => {
    it("should render full width when inset is false (default)", () => {
      const { container } = render(<Divider inset={false} />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("w-full");
      expect(element).not.toHaveClass("px-md");
    });

    it("should render full width when inset is undefined", () => {
      const { container } = render(<Divider />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("w-full");
      expect(element).not.toHaveClass("px-md");
    });

    it("should apply inset padding for horizontal divider when inset is true", () => {
      const { container } = render(<Divider orientation="horizontal" inset={true} />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("px-md");
    });

    it("should apply inset padding for vertical divider when inset is true", () => {
      const { container } = render(<Divider orientation="vertical" inset={true} />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("py-md");
    });
  });

  describe("Accessibility", () => {
    it("should have role='none' for horizontal divider", () => {
      const { container } = render(<Divider orientation="horizontal" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("role", "none");
    });

    it("should have aria-hidden='true' for horizontal divider", () => {
      const { container } = render(<Divider orientation="horizontal" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("aria-hidden", "true");
    });

    it("should have role='none' for vertical divider", () => {
      const { container } = render(<Divider orientation="vertical" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("role", "none");
    });

    it("should have aria-hidden='true' for vertical divider", () => {
      const { container } = render(<Divider orientation="vertical" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("aria-hidden", "true");
    });

    it("should use semantic <hr> element for horizontal divider", () => {
      const { container } = render(<Divider orientation="horizontal" />);
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("HR");
    });

    it("should use <div> element for vertical divider", () => {
      const { container } = render(<Divider orientation="vertical" />);
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("DIV");
    });
  });

  describe("Token Compliance", () => {
    it("should use token-based color classes (no raw values)", () => {
      const { container } = render(<Divider tone="primary" />);
      const element = container.firstChild as HTMLElement;
      // Verify token usage (bg-[hsl(var(--tm-primary))]/20 is token-based)
      expect(element.className).toContain("bg-[hsl(var(--tm-");
    });

    it("should use token-based sizing (tokenized width/height values)", () => {
      const { container } = render(<Divider />);
      const element = container.firstChild as HTMLElement;
      // Verify token usage for sizing (w-full, h-full via tokens)
      expect(element.className).toMatch(/w-full|h-full|h-px|w-px/);
    });

    it("should use token-based spacing for inset (px-md, py-md)", () => {
      const { container } = render(<Divider inset={true} />);
      const element = container.firstChild as HTMLElement;
      // Verify token usage for inset spacing (px-md is token-based)
      expect(element.className).toMatch(/px-md|py-md/);
    });
  });

  describe("Compound Variants", () => {
    it("should apply correct classes for horizontal + inset", () => {
      const { container } = render(<Divider orientation="horizontal" inset={true} />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("h-px");
      expect(element).toHaveClass("w-full");
      expect(element).toHaveClass("px-md");
    });

    it("should apply correct classes for vertical + inset", () => {
      const { container } = render(<Divider orientation="vertical" inset={true} />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("h-full");
      expect(element).toHaveClass("w-px");
      expect(element).toHaveClass("py-md");
    });

    it("should apply correct classes for horizontal + tone + inset", () => {
      const { container } = render(
        <Divider orientation="horizontal" tone="primary" inset={true} />,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("h-px");
      expect(element).toHaveClass("w-full");
      expect(element).toHaveClass("bg-[hsl(var(--tm-primary))]/20");
      expect(element).toHaveClass("px-md");
    });
  });

  describe("Edge Cases", () => {
    it("should handle all prop combinations", () => {
      const { container } = render(<Divider orientation="vertical" tone="accent" inset={true} />);
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveClass("bg-[hsl(var(--tm-accent))]/20");
      expect(element).toHaveClass("h-full");
      expect(element).toHaveClass("w-px");
      expect(element).toHaveClass("py-md");
      expect(element).toHaveAttribute("role", "none");
      expect(element).toHaveAttribute("aria-hidden", "true");
    });

    it("should forward ref correctly for horizontal divider", () => {
      const ref = React.createRef<HTMLHRElement>();
      render(<Divider ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLHRElement);
    });

    it("should forward ref correctly for vertical divider", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Divider orientation="vertical" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("should spread additional props", () => {
      const { container } = render(<Divider data-testid="divider" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveAttribute("data-testid", "divider");
    });

    it("should handle border-0 class for horizontal divider", () => {
      const { container } = render(<Divider orientation="horizontal" />);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveClass("border-0");
    });
  });
});
