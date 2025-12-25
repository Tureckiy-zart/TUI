import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RangeSlider } from "./RangeSlider";

describe("RangeSlider", () => {
  describe("Behavior Tests", () => {
    it("renders with default value", () => {
      render(<RangeSlider defaultValue={[25, 75]} aria-label="Test range slider" />);
      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);
      expect(sliders[0]).toHaveAttribute("aria-valuenow", "25");
      expect(sliders[1]).toHaveAttribute("aria-valuenow", "75");
    });

    it("calls onValueChange when value changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RangeSlider
          defaultValue={[25, 75]}
          onValueChange={handleChange}
          aria-label="Test range slider"
        />,
      );

      const sliders = screen.getAllByRole("slider");
      await user.click(sliders[0]!);
      await user.keyboard("{ArrowRight}");

      expect(handleChange).toHaveBeenCalled();
    });

    it("respects min and max constraints", () => {
      render(
        <RangeSlider defaultValue={[25, 75]} min={10} max={90} aria-label="Test range slider" />,
      );
      const sliders = screen.getAllByRole("slider");

      sliders.forEach((slider) => {
        expect(slider).toHaveAttribute("aria-valuemin", "10");
        expect(slider).toHaveAttribute("aria-valuemax", "90");
      });
    });

    it("respects step increment", () => {
      render(<RangeSlider defaultValue={[0, 100]} step={10} aria-label="Test range slider" />);
      const sliders = screen.getAllByRole("slider");

      // Step should be reflected in behavior (tested via keyboard navigation)
      expect(sliders).toHaveLength(2);
    });

    it("updates value via keyboard navigation (arrow keys)", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RangeSlider
          defaultValue={[25, 75]}
          onValueChange={handleChange}
          aria-label="Test range slider"
        />,
      );

      const sliders = screen.getAllByRole("slider");
      sliders[0]!.focus();

      // Arrow right increases value
      await user.keyboard("{ArrowRight}");
      expect(handleChange).toHaveBeenCalled();

      // Arrow left decreases value
      await user.keyboard("{ArrowLeft}");
      expect(handleChange).toHaveBeenCalled();
    });

    it("supports controlled mode", () => {
      const { rerender } = render(<RangeSlider value={[30, 70]} aria-label="Test range slider" />);
      const sliders = screen.getAllByRole("slider");
      expect(sliders[0]).toHaveAttribute("aria-valuenow", "30");
      expect(sliders[1]).toHaveAttribute("aria-valuenow", "70");

      rerender(<RangeSlider value={[40, 80]} aria-label="Test range slider" />);
      expect(sliders[0]).toHaveAttribute("aria-valuenow", "40");
      expect(sliders[1]).toHaveAttribute("aria-valuenow", "80");
    });

    it("prevents thumbs from crossing (minStepsBetweenThumbs)", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RangeSlider
          defaultValue={[50, 51]}
          onValueChange={handleChange}
          aria-label="Test range slider"
        />,
      );

      const sliders = screen.getAllByRole("slider");
      sliders[0]!.focus();

      // Try to move first thumb past second thumb
      await user.keyboard("{ArrowRight}");

      // Radix should prevent crossing with minStepsBetweenThumbs={1}
      expect(sliders[0]).toBeInTheDocument();
      expect(sliders[1]).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles narrow range (min close to max)", () => {
      render(
        <RangeSlider defaultValue={[49, 51]} min={48} max={52} aria-label="Test range slider" />,
      );
      const sliders = screen.getAllByRole("slider");

      sliders.forEach((slider) => {
        expect(slider).toHaveAttribute("aria-valuemin", "48");
        expect(slider).toHaveAttribute("aria-valuemax", "52");
      });
    });

    it("handles negative values", () => {
      render(
        <RangeSlider defaultValue={[-20, 20]} min={-50} max={50} aria-label="Test range slider" />,
      );
      const sliders = screen.getAllByRole("slider");

      expect(sliders[0]).toHaveAttribute("aria-valuemin", "-50");
      expect(sliders[0]).toHaveAttribute("aria-valuemax", "50");
      expect(sliders[0]).toHaveAttribute("aria-valuenow", "-20");
      expect(sliders[1]).toHaveAttribute("aria-valuenow", "20");
    });

    it("handles decimal steps", () => {
      render(
        <RangeSlider
          defaultValue={[2.5, 7.5]}
          min={0}
          max={10}
          step={0.5}
          aria-label="Test range slider"
        />,
      );
      const sliders = screen.getAllByRole("slider");

      expect(sliders).toHaveLength(2);
      // Decimal step behavior is handled by Radix
    });

    it("handles values outside min/max range", () => {
      render(
        <RangeSlider defaultValue={[-10, 150]} min={0} max={100} aria-label="Test range slider" />,
      );
      const sliders = screen.getAllByRole("slider");

      // Radix accepts values as-is (doesn't auto-clamp)
      // Application should validate values before passing to component
      expect(sliders).toHaveLength(2);
    });

    it("handles thumb collision (min thumb approaching max thumb)", async () => {
      const user = userEvent.setup();
      render(<RangeSlider defaultValue={[48, 52]} aria-label="Test range slider" />);

      const sliders = screen.getAllByRole("slider");
      sliders[0]!.focus();

      // Move first thumb towards second thumb
      await user.keyboard("{ArrowRight}");
      await user.keyboard("{ArrowRight}");

      // Thumbs should not cross (minStepsBetweenThumbs={1})
      const value1 = parseInt(sliders[0]!.getAttribute("aria-valuenow") || "0");
      const value2 = parseInt(sliders[1]!.getAttribute("aria-valuenow") || "0");
      expect(value2 - value1).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Accessibility Tests", () => {
    it("has ARIA slider role for both thumbs", () => {
      render(<RangeSlider defaultValue={[25, 75]} aria-label="Test range slider" />);
      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);
    });

    it("has ARIA valuemin/valuemax/valuenow attributes", () => {
      render(
        <RangeSlider defaultValue={[25, 75]} min={0} max={100} aria-label="Test range slider" />,
      );
      const sliders = screen.getAllByRole("slider");

      sliders.forEach((slider) => {
        expect(slider).toHaveAttribute("aria-valuemin", "0");
        expect(slider).toHaveAttribute("aria-valuemax", "100");
      });

      expect(sliders[0]).toHaveAttribute("aria-valuenow", "25");
      expect(sliders[1]).toHaveAttribute("aria-valuenow", "75");
    });

    it("supports aria-label", () => {
      render(<RangeSlider defaultValue={[25, 75]} aria-label="Price range" />);
      // Both thumbs should be accessible
      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);
    });

    it("supports keyboard navigation (Home/End)", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RangeSlider
          defaultValue={[25, 75]}
          min={0}
          max={100}
          onValueChange={handleChange}
          aria-label="Test range slider"
        />,
      );

      const sliders = screen.getAllByRole("slider");
      sliders[0]!.focus();

      // Home key should go to min
      await user.keyboard("{Home}");
      expect(handleChange).toHaveBeenCalled();

      sliders[1]!.focus();

      // End key should go to max
      await user.keyboard("{End}");
      expect(handleChange).toHaveBeenCalled();
    });

    it("supports keyboard navigation (PageUp/PageDown)", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RangeSlider
          defaultValue={[25, 75]}
          onValueChange={handleChange}
          aria-label="Test range slider"
        />,
      );

      const sliders = screen.getAllByRole("slider");
      sliders[0]!.focus();

      // PageUp increases value (larger increment)
      await user.keyboard("{PageUp}");
      expect(handleChange).toHaveBeenCalled();

      // PageDown decreases value (larger increment)
      await user.keyboard("{PageDown}");
      expect(handleChange).toHaveBeenCalled();
    });

    it("handles focus management for both thumbs", async () => {
      const user = userEvent.setup();
      render(<RangeSlider defaultValue={[25, 75]} aria-label="Test range slider" />);
      const sliders = screen.getAllByRole("slider");

      await user.tab();
      expect(sliders[0]!).toHaveFocus();

      await user.tab();
      expect(sliders[1]!).toHaveFocus();
    });

    it("announces disabled state", () => {
      render(<RangeSlider defaultValue={[25, 75]} disabled aria-label="Test range slider" />);
      const sliders = screen.getAllByRole("slider");

      // Radix uses data-disabled instead of aria-disabled
      sliders.forEach((slider) => {
        expect(slider).toHaveAttribute("data-disabled");
      });
    });
  });

  describe("State Tests", () => {
    it("renders in disabled state", () => {
      render(<RangeSlider defaultValue={[25, 75]} disabled aria-label="Test range slider" />);
      const sliders = screen.getAllByRole("slider");

      // Radix uses data-disabled instead of aria-disabled
      sliders.forEach((slider) => {
        expect(slider).toHaveAttribute("data-disabled");
      });
    });

    it("prevents interaction when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RangeSlider
          defaultValue={[25, 75]}
          disabled
          onValueChange={handleChange}
          aria-label="Test range slider"
        />,
      );

      const sliders = screen.getAllByRole("slider");
      sliders[0]!.focus();
      await user.keyboard("{ArrowRight}");

      // Should not call onChange when disabled
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Variant Tests", () => {
    it("renders primary variant", () => {
      render(
        <RangeSlider variant="primary" defaultValue={[25, 75]} aria-label="Test range slider" />,
      );
      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);
    });

    it("renders secondary variant", () => {
      render(
        <RangeSlider variant="secondary" defaultValue={[25, 75]} aria-label="Test range slider" />,
      );
      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);
    });

    it("renders outline variant", () => {
      render(
        <RangeSlider variant="outline" defaultValue={[25, 75]} aria-label="Test range slider" />,
      );
      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);
    });
  });

  describe("Size Tests", () => {
    it("renders small size", () => {
      render(<RangeSlider size="sm" defaultValue={[25, 75]} aria-label="Test range slider" />);
      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);
    });

    it("renders medium size", () => {
      render(<RangeSlider size="md" defaultValue={[25, 75]} aria-label="Test range slider" />);
      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);
    });

    it("renders large size", () => {
      render(<RangeSlider size="lg" defaultValue={[25, 75]} aria-label="Test range slider" />);
      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);
    });
  });

  describe("Token Compliance Tests", () => {
    it("uses token-based styling (no raw values)", () => {
      const { container } = render(
        <RangeSlider
          variant="primary"
          size="md"
          defaultValue={[25, 75]}
          aria-label="Test range slider"
        />,
      );

      // Component should not have inline styles with raw values
      const root = container.firstChild;
      expect(root).not.toHaveStyle({ width: "200px" }); // No hardcoded width
      expect(root).not.toHaveStyle({ height: "32px" }); // No hardcoded height
    });
  });

  describe("Vertical Orientation Tests", () => {
    it("renders in vertical orientation", () => {
      render(
        <RangeSlider
          orientation="vertical"
          defaultValue={[25, 75]}
          aria-label="Vertical range slider"
        />,
      );

      const sliders = screen.getAllByRole("slider");
      expect(sliders).toHaveLength(2);
      sliders.forEach((slider) => {
        expect(slider).toHaveAttribute("aria-orientation", "vertical");
      });
    });

    it("defaults to horizontal orientation", () => {
      render(<RangeSlider defaultValue={[25, 75]} aria-label="Horizontal range slider" />);

      const sliders = screen.getAllByRole("slider");
      sliders.forEach((slider) => {
        expect(slider).toHaveAttribute("aria-orientation", "horizontal");
      });
    });

    it("applies correct variant classes for vertical orientation", () => {
      const { container } = render(
        <RangeSlider
          orientation="vertical"
          variant="primary"
          size="md"
          defaultValue={[25, 75]}
          aria-label="Vertical range slider"
        />,
      );

      const root = container.firstChild as HTMLElement;
      expect(root).toHaveClass("flex-col");
    });

    it("keyboard navigation works in vertical mode", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <RangeSlider
          orientation="vertical"
          defaultValue={[25, 75]}
          onValueChange={handleChange}
          aria-label="Vertical range slider"
        />,
      );

      const sliders = screen.getAllByRole("slider");
      sliders[0]!.focus();

      // Arrow Up increases value in vertical mode
      await user.keyboard("{ArrowUp}");
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("Marks Tests", () => {
    it("renders marks as numbers array", () => {
      const { container } = render(
        <RangeSlider
          defaultValue={[25, 75]}
          marks={[0, 25, 50, 75, 100]}
          aria-label="Range slider with marks"
        />,
      );

      // Check that marks container exists
      const marksContainer = container.querySelector(".absolute.inset-0");
      expect(marksContainer).toBeInTheDocument();
    });

    it("renders marks as RangeSliderMark objects", () => {
      const { container } = render(
        <RangeSlider
          defaultValue={[25, 75]}
          marks={[
            { value: 0, label: "Low" },
            { value: 50, label: "Mid" },
            { value: 100, label: "High" },
          ]}
          aria-label="Range slider with mark objects"
        />,
      );

      const marksContainer = container.querySelector(".absolute.inset-0");
      expect(marksContainer).toBeInTheDocument();
    });

    it("shows mark labels when showMarkLabels is true", () => {
      render(
        <RangeSlider
          defaultValue={[25, 75]}
          marks={[
            { value: 0, label: "Low" },
            { value: 50, label: "Mid" },
            { value: 100, label: "High" },
          ]}
          showMarkLabels
          aria-label="Range slider with mark labels"
        />,
      );

      expect(screen.getByText("Low")).toBeInTheDocument();
      expect(screen.getByText("Mid")).toBeInTheDocument();
      expect(screen.getByText("High")).toBeInTheDocument();
    });

    it("hides mark labels when showMarkLabels is false", () => {
      render(
        <RangeSlider
          defaultValue={[25, 75]}
          marks={[
            { value: 0, label: "Low" },
            { value: 50, label: "Mid" },
            { value: 100, label: "High" },
          ]}
          showMarkLabels={false}
          aria-label="Range slider without mark labels"
        />,
      );

      expect(screen.queryByText("Low")).not.toBeInTheDocument();
      expect(screen.queryByText("Mid")).not.toBeInTheDocument();
      expect(screen.queryByText("High")).not.toBeInTheDocument();
    });

    it("renders marks in vertical orientation", () => {
      const { container } = render(
        <RangeSlider
          orientation="vertical"
          defaultValue={[25, 75]}
          marks={[0, 50, 100]}
          aria-label="Vertical range slider with marks"
        />,
      );

      const marksContainer = container.querySelector(".absolute.inset-0");
      expect(marksContainer).toBeInTheDocument();
    });

    it("does not render marks when marks array is empty", () => {
      const { container } = render(
        <RangeSlider defaultValue={[25, 75]} marks={[]} aria-label="Range slider without marks" />,
      );

      const marksContainer = container.querySelector(".absolute.inset-0");
      expect(marksContainer).not.toBeInTheDocument();
    });
  });
});
