import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { axeCheck, renderWithTheme } from "@/test/test-utils";

import { Image } from "./Image";

describe("Image", () => {
  describe("Rendering", () => {
    it("renders an img with required alt text", () => {
      render(<Image src="/cover.jpg" alt="Album cover" />);
      const img = screen.getByRole("img", { name: "Album cover" });
      expect(img).toHaveAttribute("src", "/cover.jpg");
    });

    it("allows decorative images with empty alt text", () => {
      const { container } = render(<Image src="/decorative.jpg" alt="" />);
      const img = container.querySelector("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("alt", "");
      expect(img).not.toHaveAttribute("aria-label");
    });
  });

  describe("Behavior", () => {
    it("renders fallback content on error when provided", async () => {
      render(<Image src="/missing.jpg" alt="Fallback image" fallback={<span>Fallback</span>} />);
      const img = screen.getByRole("img", { name: "Fallback image" });
      fireEvent.error(img);

      await waitFor(() => {
        expect(screen.getByText("Fallback")).toBeInTheDocument();
      });
    });
  });

  describe("Variants", () => {
    it("maps fit prop to object-fit classes", () => {
      render(<Image src="/cover.jpg" alt="Fit test" fit="contain" />);
      const img = screen.getByRole("img", { name: "Fit test" });
      expect(img).toHaveClass("object-contain");
    });

    it("applies fill layout classes when fill is true", () => {
      render(<Image src="/cover.jpg" alt="Fill test" fill />);
      const img = screen.getByRole("img", { name: "Fill test" });
      expect(img).toHaveClass("absolute");
      expect(img).toHaveClass("inset-0");
      expect(img).toHaveClass("h-full");
      expect(img).toHaveClass("w-full");
    });
  });

  describe("Accessibility", () => {
    it("passes axe when rendered with required attributes", async () => {
      const { container } = renderWithTheme(<Image src="/cover.jpg" alt="Album cover" />);
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });
  });
});
