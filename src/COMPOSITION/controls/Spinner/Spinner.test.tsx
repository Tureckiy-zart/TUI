import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "@/test/test-utils";
import {
  Spinner,
  type SpinnerEasing,
  type SpinnerLabelPosition,
  type SpinnerSize,
  type SpinnerTone,
  type SpinnerVariant,
} from "./Spinner";

describe("Spinner", () => {
  describe("Rendering", () => {
    it("renders spinner with default props", () => {
      renderWithTheme(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    it("renders spinner element (circle variant by default)", () => {
      const { container } = renderWithTheme(<Spinner />);
      const spinnerElement = container.querySelector("div[role='status'] > div");
      expect(spinnerElement).toBeInTheDocument();
    });

    it("uses circle variant by default", () => {
      const { container } = renderWithTheme(<Spinner />);
      const spinnerElement = container.querySelector("div[role='status'] > div > div");
      expect(spinnerElement).toHaveClass("animate-spin");
      expect(spinnerElement).toHaveClass("border-t-transparent");
    });
  });

  describe("Variant Variants", () => {
    const variants: SpinnerVariant[] = [
      "circle",
      "dots",
      "bounce",
      "linear",
      "bars",
      "pulse",
      "wave",
      "orbit",
      "bars-horizontal",
      "ripple",
    ];

    variants.forEach((variant) => {
      it(`renders ${variant} variant`, () => {
        const { container } = renderWithTheme(<Spinner variant={variant} />);
        const spinner = screen.getByRole("status");
        expect(spinner).toBeInTheDocument();

        // Verify variant-specific rendering
        const spinnerElement = container.querySelector("div[role='status'] > div");
        expect(spinnerElement).toBeInTheDocument();

        if (variant === "circle") {
          const circleElement = container.querySelector("div[role='status'] > div > div");
          expect(circleElement).toHaveClass("animate-spin");
        } else if (variant === "dots" || variant === "bounce") {
          const dotsContainer = container.querySelector("div[role='status'] > div > div");
          expect(dotsContainer).toHaveClass("flex");
          expect(dotsContainer?.children.length).toBe(3);
        } else if (variant === "linear") {
          const linearTrack = container.querySelector("div[role='status'] > div > div");
          expect(linearTrack).toHaveClass("relative");
          expect(linearTrack).toHaveClass("overflow-hidden");
        } else if (variant === "bars") {
          const barsContainer = container.querySelector("div[role='status'] > div > div");
          expect(barsContainer).toHaveClass("flex");
          expect(barsContainer?.children.length).toBe(4);
        } else if (variant === "pulse") {
          const pulseElement = container.querySelector("div[role='status'] > div > div");
          expect(pulseElement).toHaveClass("animate-pulse");
        } else if (variant === "wave") {
          const waveContainer = container.querySelector("div[role='status'] > div > div");
          expect(waveContainer).toHaveClass("flex");
          expect(waveContainer?.children.length).toBe(5);
        } else if (variant === "orbit") {
          const orbitContainer = container.querySelector("div[role='status'] > div > div");
          expect(orbitContainer).toHaveClass("relative");
          expect(orbitContainer?.children.length).toBe(3);
        } else if (variant === "bars-horizontal") {
          const barsContainer = container.querySelector("div[role='status'] > div > div");
          expect(barsContainer).toHaveClass("flex");
          expect(barsContainer?.children.length).toBe(4);
        } else if (variant === "ripple") {
          const rippleContainer = container.querySelector("div[role='status'] > div > div");
          expect(rippleContainer).toHaveClass("relative");
          expect(rippleContainer?.children.length).toBe(3);
        }
      });
    });

    it("uses circle variant when variant is not provided", () => {
      const { container } = renderWithTheme(<Spinner />);
      const circleElement = container.querySelector("div[role='status'] > div > div");
      expect(circleElement).toHaveClass("animate-spin");
    });
  });

  describe("Size Variants", () => {
    const sizes: SpinnerSize[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

    sizes.forEach((size) => {
      it(`renders ${size} size for circle variant`, () => {
        const { container } = renderWithTheme(<Spinner variant="circle" size={size} />);
        const spinnerCircle = container.querySelector("div[role='status'] > div > div");
        expect(spinnerCircle).toBeInTheDocument();
        // Verify size token classes are applied
        const sizeClasses: Record<SpinnerSize, [string, string]> = {
          xs: ["w-3", "h-3"],
          sm: ["w-4", "h-4"],
          md: ["w-5", "h-5"],
          lg: ["w-6", "h-6"],
          xl: ["w-8", "h-8"],
          "2xl": ["w-12", "h-12"],
          "3xl": ["w-16", "h-16"],
        };
        expect(spinnerCircle).toHaveClass(sizeClasses[size][0]);
        expect(spinnerCircle).toHaveClass(sizeClasses[size][1]);
      });

      it(`renders ${size} size for dots variant`, () => {
        const { container } = renderWithTheme(<Spinner variant="dots" size={size} />);
        const dotsContainer = container.querySelector("div[role='status'] > div > div");
        expect(dotsContainer).toBeInTheDocument();
        // Verify dots are rendered
        expect(dotsContainer?.children.length).toBe(3);
      });

      it(`renders ${size} size for linear variant`, () => {
        const { container } = renderWithTheme(<Spinner variant="linear" size={size} />);
        const linearTrack = container.querySelector("div[role='status'] > div > div");
        expect(linearTrack).toBeInTheDocument();
        expect(linearTrack).toHaveClass("relative");
      });
    });

    it("uses default size (md) when size is not provided", () => {
      const { container } = renderWithTheme(<Spinner variant="circle" />);
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toHaveClass("w-5"); // md size
      expect(spinnerCircle).toHaveClass("h-5"); // md size
    });
  });

  describe("Tone Variants", () => {
    const tones: SpinnerTone[] = ["primary", "muted", "subtle"];

    tones.forEach((tone) => {
      it(`renders ${tone} tone for circle variant`, () => {
        const { container } = renderWithTheme(<Spinner variant="circle" tone={tone} />);
        const spinnerCircle = container.querySelector("div[role='status'] > div > div");
        expect(spinnerCircle).toBeInTheDocument();
        // Verify tone token classes are applied
        const toneClasses: Record<SpinnerTone, string> = {
          primary: "border-[hsl(var(--tm-primary))]",
          muted: "border-[hsl(var(--tm-text-muted))]",
          subtle: "border-[hsl(var(--tm-muted))]",
        };
        expect(spinnerCircle).toHaveClass(toneClasses[tone]);
      });

      it(`renders ${tone} tone for dots variant`, () => {
        const { container } = renderWithTheme(<Spinner variant="dots" tone={tone} />);
        const dotsContainer = container.querySelector("div[role='status'] > div > div");
        expect(dotsContainer).toBeInTheDocument();
        // Verify dots are rendered with tone
        const toneClasses: Record<SpinnerTone, string> = {
          primary: "text-[hsl(var(--tm-primary))]",
          muted: "text-[hsl(var(--tm-text-muted))]",
          subtle: "text-[hsl(var(--tm-muted))]",
        };
        const firstDot = dotsContainer?.firstElementChild;
        expect(firstDot).toHaveClass(toneClasses[tone]);
      });

      it(`renders ${tone} tone for linear variant`, () => {
        const { container } = renderWithTheme(<Spinner variant="linear" tone={tone} />);
        const linearBar = container.querySelector("div[role='status'] > div > div > div");
        expect(linearBar).toBeInTheDocument();
        // Verify bar has tone class
        const toneClasses: Record<SpinnerTone, string> = {
          primary: "text-[hsl(var(--tm-primary))]",
          muted: "text-[hsl(var(--tm-text-muted))]",
          subtle: "text-[hsl(var(--tm-muted))]",
        };
        expect(linearBar).toHaveClass(toneClasses[tone]);
      });
    });

    it("uses default tone (primary) when tone is not provided", () => {
      const { container } = renderWithTheme(<Spinner variant="circle" />);
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toHaveClass("border-[hsl(var(--tm-primary))]");
    });
  });

  describe("Label Support", () => {
    it("renders without label", () => {
      renderWithTheme(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
      // No label text should be present
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    it("renders with label", () => {
      renderWithTheme(<Spinner label="Loading data..." />);
      expect(screen.getByText("Loading data...")).toBeInTheDocument();
    });

    it("renders label with correct text size based on spinner size", () => {
      const { rerender } = renderWithTheme(<Spinner size="xs" label="Loading..." />);
      let label = screen.getByText("Loading...");
      expect(label).toHaveClass("text-xs");

      rerender(<Spinner size="md" label="Loading..." />);
      label = screen.getByText("Loading...");
      expect(label).toHaveClass("text-sm");

      rerender(<Spinner size="lg" label="Loading..." />);
      label = screen.getByText("Loading...");
      expect(label).toHaveClass("text-base");

      rerender(<Spinner size="3xl" label="Loading..." />);
      label = screen.getByText("Loading...");
      expect(label).toHaveClass("text-xl");
    });
  });

  describe("Label Positions", () => {
    const positions: SpinnerLabelPosition[] = ["top", "right", "bottom", "left"];

    positions.forEach((position) => {
      it(`renders label at ${position} position`, () => {
        renderWithTheme(<Spinner label="Loading..." labelPosition={position} />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
        // Label should be present regardless of position
        const spinner = screen.getByRole("status");
        expect(spinner).toBeInTheDocument();
      });
    });

    it("uses default label position (bottom) when not provided", () => {
      renderWithTheme(<Spinner label="Loading..." />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("Accessibility (ARIA)", () => {
    it("has role='status'", () => {
      renderWithTheme(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    it("has aria-live='polite'", () => {
      renderWithTheme(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-live", "polite");
    });

    it("has aria-label when provided", () => {
      renderWithTheme(<Spinner aria-label="Loading user data" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "Loading user data");
    });

    it("uses label as aria-label when no aria-label provided", () => {
      renderWithTheme(<Spinner label="Loading content" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "Loading content");
    });

    it("uses default aria-label when neither label nor aria-label provided", () => {
      renderWithTheme(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "Loading");
    });

    it("prioritizes aria-label over label for accessibility", () => {
      renderWithTheme(<Spinner label="Loading..." aria-label="Loading user profile" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveAttribute("aria-label", "Loading user profile");
      // Visual label should still be present
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("hides spinner circle from screen readers when label is present", () => {
      const { container } = renderWithTheme(<Spinner label="Loading..." />);
      // When label is present, spinnerCircle is wrapped in Stack, so we need to find it differently
      const spinnerCircle = container.querySelector("div[aria-hidden='true']");
      expect(spinnerCircle).toBeInTheDocument();
      expect(spinnerCircle).toHaveAttribute("aria-hidden", "true");
    });

    it("does not hide spinner circle when no label is present", () => {
      const { container } = renderWithTheme(<Spinner />);
      const spinnerCircle = container.querySelector("div[role='status'] > div");
      expect(spinnerCircle).not.toHaveAttribute("aria-hidden");
    });
  });

  describe("Motion", () => {
    it("applies spin animation class for circle variant", () => {
      const { container } = renderWithTheme(<Spinner variant="circle" />);
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toHaveClass("animate-spin"); // MOTION_TOKENS.animation.spin
    });

    it("applies pulse animation class for dots variant", () => {
      const { container } = renderWithTheme(<Spinner variant="dots" />);
      const firstDot = container.querySelector("div[role='status'] > div > div > div");
      expect(firstDot).toHaveClass("animate-pulse");
    });

    it("applies bounce animation class for bounce variant", () => {
      const { container } = renderWithTheme(<Spinner variant="bounce" />);
      const firstDot = container.querySelector("div[role='status'] > div > div > div");
      expect(firstDot).toHaveClass("animate-bounce");
    });

    it("applies linear animation class for linear variant", () => {
      const { container } = renderWithTheme(<Spinner variant="linear" />);
      const linearBar = container.querySelector("div[role='status'] > div > div > div");
      expect(linearBar).toHaveClass("animate-spinner-linear");
    });

    it("applies bars animation class for bars variant", () => {
      const { container } = renderWithTheme(<Spinner variant="bars" />);
      const firstBar = container.querySelector("div[role='status'] > div > div > div");
      expect(firstBar).toHaveClass("animate-spinner-bars");
    });

    it("applies pulse animation class for pulse variant", () => {
      const { container } = renderWithTheme(<Spinner variant="pulse" />);
      const pulseElement = container.querySelector("div[role='status'] > div > div");
      expect(pulseElement).toHaveClass("animate-pulse");
    });

    it("applies wave animation class for wave variant", () => {
      const { container } = renderWithTheme(<Spinner variant="wave" />);
      const firstDot = container.querySelector("div[role='status'] > div > div > div");
      expect(firstDot).toHaveClass("animate-spinner-wave");
    });

    it("applies spin animation class for orbit variant (container rotates)", () => {
      const { container } = renderWithTheme(<Spinner variant="orbit" />);
      const orbitContainer = container.querySelector("div[role='status'] > div > div");
      expect(orbitContainer).toHaveClass("animate-spin");
    });

    it("applies ripple animation class for ripple variant", () => {
      const { container } = renderWithTheme(<Spinner variant="ripple" />);
      const firstCircle = container.querySelector("div[role='status'] > div > div > div");
      expect(firstCircle).toHaveClass("animate-spinner-ripple");
    });

    it("applies reduced motion support class", () => {
      const { container } = renderWithTheme(<Spinner variant="circle" />);
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toHaveClass("motion-reduce:animate-none");
    });

    it("uses token-based animation (no raw values)", () => {
      const { container } = renderWithTheme(<Spinner variant="circle" />);
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      // Verify animation is applied via token class, not inline style
      expect(spinnerCircle).toHaveClass("animate-spin");
      // No inline animation styles should be present (except for style attributes like background gradient)
      const inlineStyle = spinnerCircle?.getAttribute("style");
      if (inlineStyle) {
        // Style may contain color values applied via inline styles
        expect(inlineStyle).not.toContain("animation:");
        expect(inlineStyle).not.toContain("transform:");
      }
    });
  });

  describe("Easing Variants", () => {
    const easings: SpinnerEasing[] = ["linear", "ease-in", "ease-out", "ease-in-out"];

    easings.forEach((easing) => {
      it(`applies ${easing} easing for circle variant`, () => {
        const { container } = renderWithTheme(<Spinner variant="circle" easing={easing} />);
        const spinnerCircle = container.querySelector("div[role='status'] > div > div");
        const easingValue =
          easing === "linear"
            ? "linear"
            : easing === "ease-in"
              ? "ease-in"
              : easing === "ease-out"
                ? "ease-out"
                : "ease-in-out";
        expect(spinnerCircle).toHaveStyle({ animationTimingFunction: easingValue });
      });

      it(`applies ${easing} easing for linear variant`, () => {
        const { container } = renderWithTheme(<Spinner variant="linear" easing={easing} />);
        const linearBar = container.querySelector("div[role='status'] > div > div > div");
        const easingValue =
          easing === "linear"
            ? "linear"
            : easing === "ease-in"
              ? "ease-in"
              : easing === "ease-out"
                ? "ease-out"
                : "ease-in-out";
        expect(linearBar).toHaveStyle({ animationTimingFunction: easingValue });
      });
    });

    it("uses default easing (linear) when easing is not provided", () => {
      const { container } = renderWithTheme(<Spinner variant="circle" />);
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toHaveStyle({ animationTimingFunction: "linear" });
    });
  });

  describe("Token Compliance", () => {
    it("uses token-based size classes", () => {
      const { container } = renderWithTheme(<Spinner size="md" />);
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toHaveClass("w-5"); // SPINNER_TOKENS.size.md
      expect(spinnerCircle).toHaveClass("h-5"); // SPINNER_TOKENS.size.md
    });

    it("uses token-based tone classes", () => {
      const { container } = renderWithTheme(<Spinner tone="primary" />);
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toHaveClass("border-[hsl(var(--tm-primary))]"); // SPINNER_TOKENS.borderColor.primary
    });

    it("uses token-based border classes", () => {
      const { container } = renderWithTheme(<Spinner />);
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toHaveClass("border-2"); // SPINNER_TOKENS.borderWidth
      expect(spinnerCircle).toHaveClass("border-solid"); // SPINNER_TOKENS.borderStyle
      expect(spinnerCircle).toHaveClass("rounded-full"); // SPINNER_TOKENS.radius
    });

    it("uses token-based background class", () => {
      const { container } = renderWithTheme(<Spinner />);
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toHaveClass("bg-transparent"); // SPINNER_TOKENS.background
    });

    it("uses token-based animation class", () => {
      const { container } = renderWithTheme(<Spinner />);
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toHaveClass("animate-spin"); // SPINNER_TOKENS.animation
    });

    it("creates arc effect with border-top-color transparent", () => {
      const { container } = renderWithTheme(<Spinner />);
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toHaveClass("border-t-transparent");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty label string", () => {
      const { container } = renderWithTheme(<Spinner label="" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
      // No label should be rendered for empty string - check that there's no Text component
      const textElements = container.querySelectorAll('[data-testid="text"]');
      expect(textElements.length).toBe(0);
    });

    it("handles undefined size gracefully", () => {
      const { container } = renderWithTheme(<Spinner size={undefined as any} />);
      // When no label, spinnerCircle is wrapped in div[aria-hidden]
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toBeInTheDocument();
      // Should fallback to default size (md)
      expect(spinnerCircle).toHaveClass("w-5");
    });

    it("handles undefined tone gracefully", () => {
      const { container } = renderWithTheme(<Spinner tone={undefined as any} />);
      // When no label, spinnerCircle is wrapped in div[aria-hidden]
      const spinnerCircle = container.querySelector("div[role='status'] > div > div");
      expect(spinnerCircle).toBeInTheDocument();
      // Should fallback to default tone (primary)
      expect(spinnerCircle).toHaveClass("border-[hsl(var(--tm-primary))]");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to spinner container", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(<Spinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute("role", "status");
    });
  });
});
