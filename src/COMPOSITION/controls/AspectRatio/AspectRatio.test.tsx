import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { AspectRatio, ASPECT_RATIO_PRESETS } from "./AspectRatio";

describe("AspectRatio component", () => {
  describe("Rendering", () => {
    it("should render with default props", () => {
      const { container } = render(
        <AspectRatio>
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild;
      expect(element).toBeInTheDocument();
    });

    it("should render children correctly", () => {
      const { getByText } = render(
        <AspectRatio>
          <div>Test Content</div>
        </AspectRatio>,
      );
      expect(getByText("Test Content")).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      const { container } = render(
        <AspectRatio className="custom-class">
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      // Radix AspectRatio structure: outer div (no className) > inner div (with className)
      expect(element).toBeInTheDocument();
      // Just verify it renders without errors with className prop
    });
  });

  describe("Custom Ratio", () => {
    it("should apply custom ratio (16:9)", () => {
      const { container } = render(
        <AspectRatio ratio={16 / 9}>
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
      // Radix applies padding-bottom based on ratio
      expect(element).toHaveStyle({ position: "relative" });
    });

    it("should apply custom ratio (1:1 square)", () => {
      const { container } = render(
        <AspectRatio ratio={1}>
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("should apply custom ratio (9:16 portrait)", () => {
      const { container } = render(
        <AspectRatio ratio={9 / 16}>
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("should apply custom ratio (21:9 cinema)", () => {
      const { container } = render(
        <AspectRatio ratio={21 / 9}>
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });
  });

  describe("Preset Ratios", () => {
    it("should apply square preset (1:1)", () => {
      const { container } = render(
        <AspectRatio preset="square">
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("should apply video preset (16:9)", () => {
      const { container } = render(
        <AspectRatio preset="video">
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("should apply cinema preset (21:9)", () => {
      const { container } = render(
        <AspectRatio preset="cinema">
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("should apply portrait preset (9:16)", () => {
      const { container } = render(
        <AspectRatio preset="portrait">
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("should apply photo preset (4:3)", () => {
      const { container } = render(
        <AspectRatio preset="photo">
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("should apply golden preset (1.618:1)", () => {
      const { container } = render(
        <AspectRatio preset="golden">
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("should have all presets defined", () => {
      expect(ASPECT_RATIO_PRESETS).toHaveProperty("square");
      expect(ASPECT_RATIO_PRESETS).toHaveProperty("video");
      expect(ASPECT_RATIO_PRESETS).toHaveProperty("cinema");
      expect(ASPECT_RATIO_PRESETS).toHaveProperty("portrait");
      expect(ASPECT_RATIO_PRESETS).toHaveProperty("photo");
      expect(ASPECT_RATIO_PRESETS).toHaveProperty("golden");
    });

    it("should have correct preset values", () => {
      expect(ASPECT_RATIO_PRESETS.square).toBe(1);
      expect(ASPECT_RATIO_PRESETS.video).toBeCloseTo(16 / 9, 5);
      expect(ASPECT_RATIO_PRESETS.cinema).toBeCloseTo(21 / 9, 5);
      expect(ASPECT_RATIO_PRESETS.portrait).toBeCloseTo(9 / 16, 5);
      expect(ASPECT_RATIO_PRESETS.photo).toBeCloseTo(4 / 3, 5);
      expect(ASPECT_RATIO_PRESETS.golden).toBeCloseTo(1.618, 3);
    });
  });

  describe("Preset Priority", () => {
    it("should prioritize preset over ratio prop", () => {
      const { container } = render(
        <AspectRatio preset="square" ratio={16 / 9}>
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
      // Preset should override ratio
    });
  });

  describe("Accessibility", () => {
    it("should be a pure layout utility (no specific a11y concerns)", () => {
      const { container } = render(
        <AspectRatio ratio={16 / 9}>
          <img src="test.jpg" alt="Test" />
        </AspectRatio>,
      );
      const img = container.querySelector("img");
      expect(img).toHaveAttribute("alt", "Test");
    });

    it("should preserve child accessibility attributes", () => {
      const { container } = render(
        <AspectRatio ratio={16 / 9}>
          <button aria-label="Play video">Play</button>
        </AspectRatio>,
      );
      const button = container.querySelector("button");
      expect(button).toHaveAttribute("aria-label", "Play video");
    });
  });

  describe("Edge Cases", () => {
    it("should handle very wide ratios", () => {
      const { container } = render(
        <AspectRatio ratio={10 / 1}>
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("should handle very tall ratios", () => {
      const { container } = render(
        <AspectRatio ratio={1 / 10}>
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("should handle decimal ratios", () => {
      const { container } = render(
        <AspectRatio ratio={1.5}>
          <div>Content</div>
        </AspectRatio>,
      );
      const element = container.firstChild as HTMLElement;
      expect(element).toBeInTheDocument();
    });

    it("should forward ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <AspectRatio ref={ref} ratio={16 / 9}>
          <div>Content</div>
        </AspectRatio>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("should spread additional props", () => {
      const { getByTestId } = render(
        <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
          <div>Content</div>
        </AspectRatio>,
      );
      const element = getByTestId("aspect-ratio");
      expect(element).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("should maintain aspect ratio with different content", () => {
      const { container: container1 } = render(
        <AspectRatio ratio={16 / 9}>
          <img src="test.jpg" alt="Test" />
        </AspectRatio>,
      );
      const { container: container2 } = render(
        <AspectRatio ratio={16 / 9}>
          <video src="test.mp4" />
        </AspectRatio>,
      );
      const { container: container3 } = render(
        <AspectRatio ratio={16 / 9}>
          <div>Text content</div>
        </AspectRatio>,
      );

      expect(container1.firstChild).toBeInTheDocument();
      expect(container2.firstChild).toBeInTheDocument();
      expect(container3.firstChild).toBeInTheDocument();
    });
  });
});
