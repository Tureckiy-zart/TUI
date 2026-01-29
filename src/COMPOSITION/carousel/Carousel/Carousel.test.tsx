import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { axeCheck, renderWithTheme } from "@/test/test-utils";

import { Carousel } from "./Carousel";

function renderDefaultCarousel() {
  return render(
    <Carousel.Root aria-label="Test carousel">
      <Carousel.Track>
        <Carousel.Slide>Slide 1</Carousel.Slide>
        <Carousel.Slide>Slide 2</Carousel.Slide>
        <Carousel.Slide>Slide 3</Carousel.Slide>
        <Carousel.Prev />
        <Carousel.Next />
      </Carousel.Track>
      <Carousel.Indicators />
    </Carousel.Root>,
  );
}

describe("Carousel", () => {
  describe("Rendering", () => {
    it("renders compound structure with region role and roledescription", () => {
      renderDefaultCarousel();
      const region = screen.getByRole("region", { name: /test carousel/i });
      expect(region).toBeInTheDocument();
      expect(region).toHaveAttribute("aria-roledescription", "carousel");
      expect(region).toHaveAttribute("aria-live", "polite");
    });

    it("renders all slides inside track", () => {
      renderDefaultCarousel();
      expect(screen.getByText("Slide 1")).toBeInTheDocument();
      expect(screen.getByText("Slide 2")).toBeInTheDocument();
      expect(screen.getByText("Slide 3")).toBeInTheDocument();
    });

    it("renders Prev and Next buttons with accessible names", () => {
      renderDefaultCarousel();
      expect(screen.getByRole("button", { name: /previous slide/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /next slide/i })).toBeInTheDocument();
    });

    it("renders Prev and Next inside track", () => {
      renderDefaultCarousel();
      const track = document.querySelector("[data-carousel-track]");
      expect(track).toBeInTheDocument();
      const prevBtn = screen.getByRole("button", { name: /previous slide/i });
      const nextBtn = screen.getByRole("button", { name: /next slide/i });
      expect(track).toContainElement(prevBtn);
      expect(track).toContainElement(nextBtn);
    });

    it("renders indicators (tablist) with slide navigation", () => {
      renderDefaultCarousel();
      const tablist = screen.getByRole("tablist", { name: /slide navigation/i });
      expect(tablist).toBeInTheDocument();
      const tabs = within(tablist).getAllByRole("tab");
      expect(tabs).toHaveLength(3);
    });
  });

  describe("Orientation", () => {
    it("vertical orientation places Prev at top and Next at bottom", () => {
      render(
        <Carousel.Root orientation="vertical" aria-label="Vertical carousel">
          <Carousel.Track>
            <Carousel.Slide>A</Carousel.Slide>
            <Carousel.Slide>B</Carousel.Slide>
            <Carousel.Prev />
            <Carousel.Next />
          </Carousel.Track>
          <Carousel.Indicators />
        </Carousel.Root>,
      );
      const track = document.querySelector("[data-carousel-track]");
      expect(track).toBeInTheDocument();
      const prevBtn = screen.getByRole("button", { name: /previous slide/i });
      const nextBtn = screen.getByRole("button", { name: /next slide/i });
      const prevWrapper = prevBtn.closest("span");
      const nextWrapper = nextBtn.closest("span");
      expect(prevWrapper?.className).toContain("top-sm");
      expect(nextWrapper?.className).toContain("bottom-sm");
    });

    it("horizontal orientation places Prev on left and Next on right", () => {
      renderDefaultCarousel();
      const prevBtn = screen.getByRole("button", { name: /previous slide/i });
      const nextBtn = screen.getByRole("button", { name: /next slide/i });
      const prevWrapper = prevBtn.closest("span");
      const nextWrapper = nextBtn.closest("span");
      expect(prevWrapper?.className).toContain("left-sm");
      expect(nextWrapper?.className).toContain("right-sm");
    });
  });

  describe("Interactions", () => {
    it("Next button advances to next slide", async () => {
      const user = userEvent.setup();
      renderDefaultCarousel();
      const nextBtn = screen.getByRole("button", { name: /next slide/i });
      await user.click(nextBtn);
      const tablist = screen.getByRole("tablist", { name: /slide navigation/i });
      const tabs = within(tablist).getAllByRole("tab");
      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    });

    it("Prev button goes to previous slide", async () => {
      const user = userEvent.setup();
      renderDefaultCarousel();
      const nextBtn = screen.getByRole("button", { name: /next slide/i });
      await user.click(nextBtn);
      const prevBtn = screen.getByRole("button", { name: /previous slide/i });
      await user.click(prevBtn);
      const tablist = screen.getByRole("tablist", { name: /slide navigation/i });
      const tabs = within(tablist).getAllByRole("tab");
      expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    });

    it("clicking indicator goes to that slide", async () => {
      const user = userEvent.setup();
      renderDefaultCarousel();
      const tablist = screen.getByRole("tablist", { name: /slide navigation/i });
      const tabs = within(tablist).getAllByRole("tab");
      expect(tabs).toHaveLength(3);
      const thirdTab = tabs[2];
      if (!thirdTab) throw new Error("Third tab not found");
      await user.click(thirdTab);
      expect(thirdTab).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Keyboard", () => {
    it("ArrowRight advances slide when root has focus", async () => {
      const user = userEvent.setup();
      renderDefaultCarousel();
      const region = screen.getByRole("region", { name: /test carousel/i });
      expect(region).toBeInTheDocument();
      (region as HTMLElement).focus();
      await user.keyboard("{ArrowRight}");
      const tablist = screen.getByRole("tablist", { name: /slide navigation/i });
      const tabs = within(tablist).getAllByRole("tab");
      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    });

    it("ArrowLeft goes to previous slide", async () => {
      const user = userEvent.setup();
      renderDefaultCarousel();
      const region = screen.getByRole("region", { name: /test carousel/i });
      expect(region).toBeInTheDocument();
      (region as HTMLElement).focus();
      await user.keyboard("{ArrowRight}");
      await user.keyboard("{ArrowLeft}");
      const tablist = screen.getByRole("tablist", { name: /slide navigation/i });
      const tabs = within(tablist).getAllByRole("tab");
      expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Controlled / Uncontrolled", () => {
    it("supports defaultIndex for uncontrolled", () => {
      render(
        <Carousel.Root defaultIndex={1} aria-label="Uncontrolled">
          <Carousel.Track>
            <Carousel.Slide>A</Carousel.Slide>
            <Carousel.Slide>B</Carousel.Slide>
          </Carousel.Track>
          <Carousel.Indicators />
        </Carousel.Root>,
      );
      const tablist = screen.getByRole("tablist", { name: /slide navigation/i });
      const tabs = within(tablist).getAllByRole("tab");
      expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Accessibility", () => {
    it("passes axe when rendered with compound structure", async () => {
      const { container } = renderWithTheme(
        <Carousel.Root aria-label="A11y carousel">
          <Carousel.Track>
            <Carousel.Slide>1</Carousel.Slide>
            <Carousel.Slide>2</Carousel.Slide>
            <Carousel.Prev />
            <Carousel.Next />
          </Carousel.Track>
          <Carousel.Indicators />
        </Carousel.Root>,
      );
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });
  });
});
