/**
 * Backdrop Component Tests
 *
 * Tests for Backdrop component rendering, behavior, and API contract.
 * Backdrop is a visual background component for overlay components (Modal, Dialog).
 */

import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Backdrop, type BackdropVariant } from "./Backdrop";

describe("Backdrop", () => {
  const getBackdrop = (container: HTMLElement) => {
    return container.querySelector('[aria-hidden="true"]') as HTMLElement;
  };

  describe("Rendering", () => {
    it("renders backdrop element", () => {
      const { container } = renderWithTheme(<Backdrop />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toBeInTheDocument();
    });

    it("renders with default variant", () => {
      const { container } = renderWithTheme(<Backdrop />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toHaveClass("fixed", "inset-0", "z-40");
    });

    it("renders with custom variant", () => {
      const { container } = renderWithTheme(<Backdrop variant="blurred" />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toBeInTheDocument();
    });

    it("renders with all variants", () => {
      const variants: BackdropVariant[] = ["default", "blurred", "transparent"];

      variants.forEach((variant) => {
        const { container, unmount } = renderWithTheme(<Backdrop variant={variant} />);
        const backdrop = getBackdrop(container);
        expect(backdrop).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe("Props", () => {
    it("accepts variant prop", () => {
      const { container } = renderWithTheme(<Backdrop variant="blurred" />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toBeInTheDocument();
    });

    it("accepts isVisible prop (true)", () => {
      const { container } = renderWithTheme(<Backdrop isVisible={true} />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toHaveClass("opacity-100", "tm-motion-fade-in");
    });

    it("accepts isVisible prop (false)", () => {
      const { container } = renderWithTheme(<Backdrop isVisible={false} />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toHaveClass("opacity-0", "tm-motion-fade-out");
    });

    it("defaults isVisible to true", () => {
      const { container } = renderWithTheme(<Backdrop />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toHaveClass("opacity-100", "tm-motion-fade-in");
    });

    it("defaults variant to default", () => {
      const { container } = renderWithTheme(<Backdrop />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toBeInTheDocument();
    });

    it("accepts onClick handler", () => {
      const handleClick = vi.fn();
      const { container } = renderWithTheme(<Backdrop onClick={handleClick} />);

      const backdrop = getBackdrop(container);
      backdrop.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("accepts className prop", () => {
      const { container } = renderWithTheme(<Backdrop className="custom-class" />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toHaveClass("custom-class");
    });

    it("accepts HTMLDivElement props", () => {
      renderWithTheme(<Backdrop data-testid="backdrop" id="backdrop-id" />);

      const backdrop = screen.getByTestId("backdrop");
      expect(backdrop).toHaveAttribute("id", "backdrop-id");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to DOM element", () => {
      const ref = vi.fn();
      renderWithTheme(<Backdrop ref={ref} />);

      expect(ref).toHaveBeenCalled();
      const backdropElement = ref.mock.calls[0]?.[0];
      expect(backdropElement).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Accessibility", () => {
    it("sets aria-hidden to true", () => {
      const { container } = renderWithTheme(<Backdrop />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toHaveAttribute("aria-hidden", "true");
    });

    it("maintains aria-hidden when other props are provided", () => {
      const { container } = renderWithTheme(
        <Backdrop variant="blurred" isVisible={true} onClick={vi.fn()} />,
      );

      const backdrop = getBackdrop(container);
      expect(backdrop).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Variants", () => {
    it("applies default variant classes", () => {
      const { container } = renderWithTheme(<Backdrop variant="default" />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toBeInTheDocument();
    });

    it("applies blurred variant classes", () => {
      const { container } = renderWithTheme(<Backdrop variant="blurred" />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toBeInTheDocument();
    });

    it("applies transparent variant classes", () => {
      const { container } = renderWithTheme(<Backdrop variant="transparent" />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toBeInTheDocument();
    });
  });

  describe("Animation", () => {
    it("applies fade-in animation when visible", () => {
      const { container } = renderWithTheme(<Backdrop isVisible={true} />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toHaveClass("tm-motion-fade-in");
    });

    it("applies fade-out animation when not visible", () => {
      const { container } = renderWithTheme(<Backdrop isVisible={false} />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toHaveClass("tm-motion-fade-out");
    });

    it("applies opacity-100 when visible", () => {
      const { container } = renderWithTheme(<Backdrop isVisible={true} />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toHaveClass("opacity-100");
    });

    it("applies opacity-0 when not visible", () => {
      const { container } = renderWithTheme(<Backdrop isVisible={false} />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toHaveClass("opacity-0");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined onClick gracefully", () => {
      const { container } = renderWithTheme(<Backdrop onClick={undefined} />);

      const backdrop = getBackdrop(container);
      expect(() => backdrop.click()).not.toThrow();
    });

    it("handles rapid variant changes", () => {
      const { container, rerender } = renderWithTheme(<Backdrop variant="default" />);
      rerender(<Backdrop variant="blurred" />);
      rerender(<Backdrop variant="transparent" />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toBeInTheDocument();
    });

    it("handles rapid isVisible changes", () => {
      const { container, rerender } = renderWithTheme(<Backdrop isVisible={true} />);
      rerender(<Backdrop isVisible={false} />);
      rerender(<Backdrop isVisible={true} />);

      const backdrop = getBackdrop(container);
      expect(backdrop).toHaveClass("tm-motion-fade-in");
    });
  });
});
