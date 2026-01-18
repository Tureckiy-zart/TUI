import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Icon } from "./Icon";

describe("Icon", () => {
  describe("Rendering", () => {
    it("renders icon with default props", () => {
      render(<Icon name="search" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
    });

    it("renders icon with specified name", () => {
      render(<Icon name="check" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
    });

    it("renders error icon when invalid name provided", () => {
      // Testing fallback behavior with invalid icon name
      render(<Icon name={"invalidIconName" as any} data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Size variants", () => {
    it("renders with sm size", () => {
      render(<Icon name="search" size="sm" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("h-3", "w-3");
    });

    it("renders with md size (default)", () => {
      render(<Icon name="search" size="md" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("h-4", "w-4");
    });

    it("renders with lg size", () => {
      render(<Icon name="search" size="lg" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("h-5", "w-5");
    });

    it("renders with xl size", () => {
      render(<Icon name="search" size="xl" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("h-6", "w-6");
    });

    it("uses default size when size prop not provided", () => {
      render(<Icon name="search" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toHaveClass("h-4", "w-4"); // md is default
    });
  });

  describe("Color variants", () => {
    it("renders with default color", () => {
      render(<Icon name="search" color="default" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("text-foreground");
    });

    it("renders with muted color", () => {
      render(<Icon name="search" color="muted" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("text-[hsl(var(--tm-text-muted))]-foreground");
    });

    it("renders with success color", () => {
      render(<Icon name="success" color="success" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("text-success");
    });

    it("renders with warning color", () => {
      render(<Icon name="warning" color="warning" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("text-warning");
    });

    it("renders with danger color", () => {
      render(<Icon name="error" color="danger" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("text-destructive");
    });

    it("renders with info color", () => {
      render(<Icon name="info" color="info" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("text-info");
    });

    it("uses default color when color prop not provided", () => {
      render(<Icon name="search" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toHaveClass("text-foreground"); // default is default
    });
  });

  describe("Stroke variants", () => {
    it("renders with thin stroke", () => {
      render(<Icon name="check" stroke="thin" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("stroke-[1px]");
    });

    it("renders with normal stroke (default)", () => {
      render(<Icon name="check" stroke="normal" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("stroke-[1.5px]");
    });

    it("renders with bold stroke", () => {
      render(<Icon name="check" stroke="bold" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("stroke-2");
    });

    it("uses default stroke when stroke prop not provided", () => {
      render(<Icon name="check" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toHaveClass("stroke-[1.5px]"); // normal is default
    });
  });

  describe("Composition pattern (asChild)", () => {
    it("renders icon directly when asChild is false (default)", () => {
      render(<Icon name="search" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
    });

    it("renders icon with asChild pattern", () => {
      render(<Icon name="search" asChild data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Custom className", () => {
    it("merges custom className with variant classes", () => {
      render(<Icon name="search" className="custom-class" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toHaveClass("custom-class");
      expect(icon).toHaveClass("shrink-0"); // base class from tokenCVA
    });
  });

  describe("Ref forwarding", () => {
    it("forwards ref to SVG element", () => {
      const ref = { current: null };
      render(<Icon name="search" ref={ref} />);
      expect(ref.current).toBeInstanceOf(SVGSVGElement);
    });
  });

  describe("Prop combinations", () => {
    it("renders with all variant props combined", () => {
      render(<Icon name="check" size="lg" color="success" stroke="bold" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("h-5", "w-5"); // lg size
      expect(icon).toHaveClass("text-success"); // success color
      expect(icon).toHaveClass("stroke-2"); // bold stroke
    });

    it("renders with size and color", () => {
      render(<Icon name="warning" size="xl" color="warning" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("h-6", "w-6"); // xl size
      expect(icon).toHaveClass("text-warning"); // warning color
    });

    it("renders with color and stroke", () => {
      render(<Icon name="error" color="danger" stroke="thin" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("text-destructive"); // danger color
      expect(icon).toHaveClass("stroke-[1px]"); // thin stroke
    });
  });

  describe("Edge cases", () => {
    it("handles missing icon gracefully", () => {
      // Icon component should fallback to error icon
      render(<Icon name={"nonexistent" as any} data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
    });

    it("renders with all default variants when no props provided", () => {
      render(<Icon name="search" data-testid="icon" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("h-4", "w-4"); // md size (default)
      expect(icon).toHaveClass("text-foreground"); // default color
      expect(icon).toHaveClass("stroke-[1.5px]"); // normal stroke (default)
    });
  });

  describe("SVG props passthrough", () => {
    it("passes through SVG props to icon component", () => {
      render(<Icon name="search" data-testid="icon" aria-label="Search icon" role="img" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toHaveAttribute("aria-label", "Search icon");
      expect(icon).toHaveAttribute("role", "img");
    });

    it("passes through additional SVG attributes", () => {
      render(<Icon name="search" data-testid="icon" width="32" height="32" />);
      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();
    });
  });
});
