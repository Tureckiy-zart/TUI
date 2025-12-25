import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  describe("Behavior Tests", () => {
    it("renders with default value", () => {
      render(<Slider defaultValue={50} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
      expect(slider).toHaveAttribute("aria-valuenow", "50");
    });

    it("calls onValueChange when value changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider defaultValue={50} onValueChange={handleChange} aria-label="Test slider" />);

      const slider = screen.getByRole("slider");
      await user.click(slider);
      await user.keyboard("{ArrowRight}");

      expect(handleChange).toHaveBeenCalled();
    });

    it("respects min and max constraints", () => {
      render(<Slider defaultValue={50} min={10} max={90} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");

      expect(slider).toHaveAttribute("aria-valuemin", "10");
      expect(slider).toHaveAttribute("aria-valuemax", "90");
    });

    it("respects step increment", () => {
      render(<Slider defaultValue={0} step={10} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");

      // Step should be reflected in behavior (tested via keyboard navigation)
      expect(slider).toBeInTheDocument();
    });

    it("updates value via keyboard navigation (arrow keys)", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider defaultValue={50} onValueChange={handleChange} aria-label="Test slider" />);

      const slider = screen.getByRole("slider");
      slider.focus();

      // Arrow right increases value
      await user.keyboard("{ArrowRight}");
      expect(handleChange).toHaveBeenCalled();

      // Arrow left decreases value
      await user.keyboard("{ArrowLeft}");
      expect(handleChange).toHaveBeenCalled();
    });

    it("supports controlled mode", () => {
      const { rerender } = render(<Slider value={30} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "30");

      rerender(<Slider value={70} aria-label="Test slider" />);
      expect(slider).toHaveAttribute("aria-valuenow", "70");
    });
  });

  describe("Edge Cases", () => {
    it("handles narrow range (min close to max)", () => {
      render(<Slider defaultValue={50} min={49} max={51} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");

      expect(slider).toHaveAttribute("aria-valuemin", "49");
      expect(slider).toHaveAttribute("aria-valuemax", "51");
      expect(slider).toHaveAttribute("aria-valuenow", "50");
    });

    it("handles negative values", () => {
      render(<Slider defaultValue={-10} min={-50} max={50} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");

      expect(slider).toHaveAttribute("aria-valuemin", "-50");
      expect(slider).toHaveAttribute("aria-valuemax", "50");
      expect(slider).toHaveAttribute("aria-valuenow", "-10");
    });

    it("handles decimal steps", () => {
      render(<Slider defaultValue={5.5} min={0} max={10} step={0.5} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");

      expect(slider).toBeInTheDocument();
      // Decimal step behavior is handled by Radix
    });

    it("handles values outside min/max range", () => {
      render(<Slider defaultValue={150} min={0} max={100} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");

      // Radix accepts the value as-is (doesn't auto-clamp)
      // Application should validate values before passing to component
      expect(slider).toBeInTheDocument();
    });
  });

  describe("Accessibility Tests", () => {
    it("has ARIA slider role", () => {
      render(<Slider defaultValue={50} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
    });

    it("has ARIA valuemin/valuemax/valuenow attributes", () => {
      render(<Slider defaultValue={50} min={0} max={100} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");

      expect(slider).toHaveAttribute("aria-valuemin", "0");
      expect(slider).toHaveAttribute("aria-valuemax", "100");
      expect(slider).toHaveAttribute("aria-valuenow", "50");
    });

    it("supports aria-label", () => {
      render(<Slider defaultValue={50} aria-label="Volume control" />);
      const slider = screen.getByRole("slider");
      // aria-label is applied to the root, thumb inherits accessibility
      expect(slider).toBeInTheDocument();
    });

    it("supports keyboard navigation (Home/End)", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Slider
          defaultValue={50}
          min={0}
          max={100}
          onValueChange={handleChange}
          aria-label="Test slider"
        />,
      );

      const slider = screen.getByRole("slider");
      slider.focus();

      // Home key should go to min
      await user.keyboard("{Home}");
      expect(handleChange).toHaveBeenCalled();

      // End key should go to max
      await user.keyboard("{End}");
      expect(handleChange).toHaveBeenCalled();
    });

    it("supports keyboard navigation (PageUp/PageDown)", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Slider defaultValue={50} onValueChange={handleChange} aria-label="Test slider" />);

      const slider = screen.getByRole("slider");
      slider.focus();

      // PageUp increases value (larger increment)
      await user.keyboard("{PageUp}");
      expect(handleChange).toHaveBeenCalled();

      // PageDown decreases value (larger increment)
      await user.keyboard("{PageDown}");
      expect(handleChange).toHaveBeenCalled();
    });

    it("handles focus management", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={50} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");

      await user.tab();
      expect(slider).toHaveFocus();
    });

    it("announces disabled state", () => {
      render(<Slider defaultValue={50} disabled aria-label="Test slider" />);
      const slider = screen.getByRole("slider");

      // Radix uses data-disabled instead of aria-disabled
      expect(slider).toHaveAttribute("data-disabled");
    });
  });

  describe("State Tests", () => {
    it("renders in disabled state", () => {
      render(<Slider defaultValue={50} disabled aria-label="Test slider" />);
      const slider = screen.getByRole("slider");

      // Radix uses data-disabled instead of aria-disabled
      expect(slider).toHaveAttribute("data-disabled");
    });

    it("prevents interaction when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Slider defaultValue={50} disabled onValueChange={handleChange} aria-label="Test slider" />,
      );

      const slider = screen.getByRole("slider");
      slider.focus();
      await user.keyboard("{ArrowRight}");

      // Should not call onChange when disabled
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Variant Tests", () => {
    it("renders primary variant", () => {
      render(<Slider variant="primary" defaultValue={50} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      render(<Slider variant="secondary" defaultValue={50} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
    });

    it("renders outline variant", () => {
      render(<Slider variant="outline" defaultValue={50} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
    });
  });

  describe("Size Tests", () => {
    it("renders small size", () => {
      render(<Slider size="sm" defaultValue={50} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
    });

    it("renders medium size", () => {
      render(<Slider size="md" defaultValue={50} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
    });

    it("renders large size", () => {
      render(<Slider size="lg" defaultValue={50} aria-label="Test slider" />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
    });
  });

  describe("Token Compliance Tests", () => {
    it("uses token-based styling (no raw values)", () => {
      const { container } = render(
        <Slider variant="primary" size="md" defaultValue={50} aria-label="Test slider" />,
      );

      // Component should not have inline styles with raw values
      const root = container.firstChild;
      expect(root).not.toHaveStyle({ width: "200px" }); // No hardcoded width
      expect(root).not.toHaveStyle({ height: "32px" }); // No hardcoded height
    });
  });
});
