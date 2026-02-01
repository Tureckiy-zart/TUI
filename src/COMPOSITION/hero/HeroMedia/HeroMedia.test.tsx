import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { axeCheck, renderWithTheme } from "@/test/test-utils";

import { HeroMedia } from "./HeroMedia";

describe("HeroMedia", () => {
  describe("API invariants", () => {
    it("Root locked attributes (role, aria-label) are not overridden by spread props", () => {
      render(
        <HeroMedia.Root
          ariaLabel="Canonical label"
          role="button"
          aria-label="Overriding label"
          data-heromedia-root="custom"
        >
          <HeroMedia.Media type="image" src="/img.jpg" alt="Hero" />
        </HeroMedia.Root>,
      );
      const region = screen.getByRole("region", { name: /canonical label/i });
      expect(region).toBeInTheDocument();
      expect(region).toHaveAttribute("data-heromedia-root");
    });
  });

  describe("Single media enforcement", () => {
    it("renders video Media when swapping from image to video (conditional)", () => {
      const { rerender } = render(
        <HeroMedia.Root ariaLabel="Hero">
          <HeroMedia.Media type="image" src="/img.jpg" alt="Hero" />
        </HeroMedia.Root>,
      );
      expect(document.querySelector("img[data-heromedia-image]")).toBeInTheDocument();

      rerender(
        <HeroMedia.Root ariaLabel="Hero">
          <HeroMedia.Media type="video" src="/video.mp4" poster="/poster.jpg" />
        </HeroMedia.Root>,
      );
      expect(document.querySelector("img[data-heromedia-image]")).not.toBeInTheDocument();
      expect(document.querySelector("video[data-heromedia-video]")).toBeInTheDocument();
    });

    it("renders only the first Media when two Media children are provided", () => {
      render(
        <HeroMedia.Root ariaLabel="Hero">
          <HeroMedia.Media type="image" src="/img1.jpg" alt="First" />
          <HeroMedia.Media type="image" src="/img2.jpg" alt="Second" />
        </HeroMedia.Root>,
      );
      const mediaElements = document.querySelectorAll("[data-heromedia-media]");
      expect(mediaElements).toHaveLength(1);
      const img = document.querySelector("img[data-heromedia-image]");
      expect(img).toHaveAttribute("src", "/img1.jpg");
      expect(img).toHaveAttribute("alt", "First");
    });
  });

  describe("Overlay rendering by position", () => {
    it("renders overlay at top with correct data attribute", () => {
      render(
        <HeroMedia.Root ariaLabel="Hero">
          <HeroMedia.Media type="image" src="/img.jpg" alt="Hero" />
          <HeroMedia.Overlay position="top" align="center">
            Top overlay
          </HeroMedia.Overlay>
        </HeroMedia.Root>,
      );
      const overlay = document.querySelector("[data-heromedia-overlay]");
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveAttribute("data-heromedia-overlay-position", "top");
      expect(screen.getByText("Top overlay")).toBeInTheDocument();
    });

    it("renders overlay at center", () => {
      render(
        <HeroMedia.Root ariaLabel="Hero">
          <HeroMedia.Media type="image" src="/img.jpg" alt="Hero" />
          <HeroMedia.Overlay position="center" align="center">
            Center overlay
          </HeroMedia.Overlay>
        </HeroMedia.Root>,
      );
      const overlay = document.querySelector("[data-heromedia-overlay-position='center']");
      expect(overlay).toBeInTheDocument();
      expect(screen.getByText("Center overlay")).toBeInTheDocument();
    });

    it("renders overlay at bottom", () => {
      render(
        <HeroMedia.Root ariaLabel="Hero">
          <HeroMedia.Media type="image" src="/img.jpg" alt="Hero" />
          <HeroMedia.Overlay position="bottom" align="end">
            Bottom overlay
          </HeroMedia.Overlay>
        </HeroMedia.Root>,
      );
      const overlay = document.querySelector("[data-heromedia-overlay-position='bottom']");
      expect(overlay).toBeInTheDocument();
      expect(screen.getByText("Bottom overlay")).toBeInTheDocument();
    });
  });

  describe("Accessibility smoke", () => {
    it("Root has role region and aria-label when provided", () => {
      render(
        <HeroMedia.Root ariaLabel="Hero with CTA">
          <HeroMedia.Media type="image" src="/img.jpg" alt="Hero background" />
        </HeroMedia.Root>,
      );
      const region = screen.getByRole("region", { name: /hero with cta/i });
      expect(region).toBeInTheDocument();
    });

    it("image Media has alt text", () => {
      render(
        <HeroMedia.Root ariaLabel="Hero">
          <HeroMedia.Media type="image" src="/img.jpg" alt="Hero background" />
        </HeroMedia.Root>,
      );
      const img = document.querySelector("img[data-heromedia-image]");
      expect(img).toHaveAttribute("alt", "Hero background");
    });

    it("video Media has poster when provided", () => {
      render(
        <HeroMedia.Root ariaLabel="Hero">
          <HeroMedia.Media type="video" src="/video.mp4" poster="/poster.jpg" />
        </HeroMedia.Root>,
      );
      const video = document.querySelector("video[data-heromedia-video]");
      expect(video).toHaveAttribute("poster", "/poster.jpg");
    });

    it("passes axe when rendered with image and overlay", async () => {
      const { container } = renderWithTheme(
        <HeroMedia.Root ariaLabel="Hero">
          <HeroMedia.Media type="image" src="/img.jpg" alt="Hero background" />
          <HeroMedia.Overlay position="bottom" align="center">
            Overlay content
          </HeroMedia.Overlay>
        </HeroMedia.Root>,
      );
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe("Accessibility warnings", () => {
    beforeEach(() => {
      vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("warns when image media has missing or empty alt", () => {
      render(
        <HeroMedia.Root ariaLabel="Hero">
          <HeroMedia.Media type="image" src="/img.jpg" alt="" />
        </HeroMedia.Root>,
      );
      expect(console.warn).toHaveBeenCalledWith(
        "[HeroMedia] Image media requires non-empty alt text for accessibility.",
      );
    });

    it("warns when video media has missing poster", () => {
      render(
        <HeroMedia.Root ariaLabel="Hero">
          <HeroMedia.Media type="video" src="/video.mp4" />
        </HeroMedia.Root>,
      );
      expect(console.warn).toHaveBeenCalledWith(
        "[HeroMedia] Video media requires a poster URL per HEROMEDIA_CANON (accessibility).",
      );
    });
  });
});
