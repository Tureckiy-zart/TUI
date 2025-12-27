import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { Progress } from "./Progress";

describe("Progress", () => {
  describe("Rendering", () => {
    it("renders progress bar", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toBeInTheDocument();
    });

    it("renders with default size (md)", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass("h-2"); // md size
    });

    it("renders with custom className", () => {
      render(<Progress value={50} className="custom-class" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass("custom-class");
    });
  });

  describe("Size Variants", () => {
    it("renders small size (sm)", () => {
      render(<Progress value={50} size="sm" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass("h-1"); // sm size
    });

    it("renders medium size (md)", () => {
      render(<Progress value={50} size="md" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass("h-2"); // md size
    });

    it("renders large size (lg)", () => {
      render(<Progress value={50} size="lg" />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass("h-3"); // lg size
    });
  });

  describe("Progress Value", () => {
    it("displays correct progress percentage", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div") as HTMLElement;
      expect(fill).toBeInTheDocument();
      expect(fill).toHaveStyle({ width: "50%" });
    });

    it("displays 0% progress", () => {
      render(<Progress value={0} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div") as HTMLElement;
      expect(fill).toBeInTheDocument();
      expect(fill).toHaveStyle({ width: "0%" });
    });

    it("displays 100% progress", () => {
      render(<Progress value={100} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div") as HTMLElement;
      expect(fill).toBeInTheDocument();
      expect(fill).toHaveStyle({ width: "100%" });
    });

    it("clamps value above 100 to 100%", () => {
      render(<Progress value={150} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div") as HTMLElement;
      expect(fill).toBeInTheDocument();
      expect(fill).toHaveStyle({ width: "100%" });
    });

    it("clamps value below 0 to 0%", () => {
      render(<Progress value={-50} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div") as HTMLElement;
      expect(fill).toBeInTheDocument();
      expect(fill).toHaveStyle({ width: "0%" });
    });
  });

  describe("Max Value", () => {
    it("uses default max value of 100", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div") as HTMLElement;
      expect(fill).toBeInTheDocument();
      expect(fill).toHaveStyle({ width: "50%" });
    });

    it("calculates percentage with custom max value", () => {
      render(<Progress value={3} max={10} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div") as HTMLElement;
      expect(fill).toBeInTheDocument();
      expect(fill).toHaveStyle({ width: "30%" }); // 3/10 = 30%
    });

    it("handles max value of 1", () => {
      render(<Progress value={1} max={1} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div") as HTMLElement;
      expect(fill).toBeInTheDocument();
      expect(fill).toHaveStyle({ width: "100%" });
    });

    it("handles fractional values", () => {
      render(<Progress value={2.5} max={10} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div") as HTMLElement;
      expect(fill).toBeInTheDocument();
      expect(fill).toHaveStyle({ width: "25%" });
    });
  });

  describe("Accessibility (ARIA)", () => {
    it("has role='progressbar'", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toBeInTheDocument();
    });

    it("has aria-valuenow attribute", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "50");
    });

    it("has aria-valuemin attribute", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    });

    it("has aria-valuemax attribute", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    });

    it("has correct aria-valuemax with custom max", () => {
      render(<Progress value={3} max={10} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuemax", "10");
    });

    it("updates aria-valuenow when value changes", () => {
      const { rerender } = render(<Progress value={25} />);
      let progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "25");

      rerender(<Progress value={75} />);
      progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "75");
    });
  });

  describe("Token Compliance", () => {
    it("uses token-based height classes", () => {
      const { rerender } = render(<Progress value={50} size="sm" />);
      let progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass("h-1"); // PROGRESS_TOKENS.height.sm

      rerender(<Progress value={50} size="md" />);
      progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass("h-2"); // PROGRESS_TOKENS.height.md

      rerender(<Progress value={50} size="lg" />);
      progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass("h-3"); // PROGRESS_TOKENS.height.lg
    });

    it("uses token-based width class", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass("w-full"); // PROGRESS_TOKENS.width.full
    });

    it("uses token-based radius class", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass("rounded-full"); // PROGRESS_TOKENS.radius
    });

    it("uses token-based track background", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveClass("bg-secondary"); // PROGRESS_TOKENS.track.bg
    });

    it("uses token-based fill background", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div");
      expect(fill).toHaveClass("bg-primary"); // PROGRESS_TOKENS.fill.bg
    });

    it("uses token-based transition", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div");
      expect(fill).toHaveClass("transition-[width]"); // PROGRESS_TOKENS.transition
      expect(fill).toHaveClass("duration-normal"); // PROGRESS_TOKENS.transition
    });
  });

  describe("Edge Cases", () => {
    it("handles value of 0", () => {
      render(<Progress value={0} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "0");
    });

    it("handles value equal to max", () => {
      render(<Progress value={100} max={100} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-valuenow", "100");
    });

    it("handles very small max value", () => {
      render(<Progress value={0.5} max={1} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div") as HTMLElement;
      expect(fill).toBeInTheDocument();
      expect(fill).toHaveStyle({ width: "50%" });
    });

    it("handles very large values", () => {
      render(<Progress value={1000} max={10000} />);
      const progressbar = screen.getByRole("progressbar");
      const fill = progressbar.querySelector("div") as HTMLElement;
      expect(fill).toBeInTheDocument();
      expect(fill).toHaveStyle({ width: "10%" });
    });

    it("handles negative max value (edge case)", () => {
      const { container } = render(<Progress value={50} max={-100} />);
      const fill = container.querySelector("div > div");
      // Negative max is nonsensical, but component should handle gracefully
      expect(fill).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to progress bar container", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Progress value={50} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute("role", "progressbar");
    });
  });
});
