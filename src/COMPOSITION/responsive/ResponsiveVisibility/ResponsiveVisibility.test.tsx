import "@testing-library/jest-dom/vitest";
import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ResponsiveVisibility } from "./ResponsiveVisibility";
import {
  guardSlotBp,
  NESTING_FORBIDDEN_MSG,
  SLOT_BP_FORBIDDEN_MSG,
} from "./ResponsiveVisibility.guard";

function createMatchMediaMock(matchesMinWidth: (px: number) => boolean) {
  return vi.fn((query: string) => {
    const minMatch = query.match(/\(min-width:\s*(\d+)px\)/);
    const matches = minMatch ? matchesMinWidth(Number(minMatch[1])) : false;
    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList;
  });
}

describe("ResponsiveVisibility", () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: originalMatchMedia,
    });
    vi.clearAllMocks();
  });

  describe("SSR / pre-hydration", () => {
    it("renders nothing when no slot matches (e.g. current=base and only From(md) provided)", async () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock(() => false),
      });

      render(
        <ResponsiveVisibility.Root>
          <ResponsiveVisibility.From bp="md">
            <span data-testid="from-md">From md</span>
          </ResponsiveVisibility.From>
        </ResponsiveVisibility.Root>,
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.queryByTestId("from-md")).not.toBeInTheDocument();
    });
  });

  describe("From slot", () => {
    it("renders From(bp) children when viewport >= bp (min-width matches)", async () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock((px) => px <= 768),
      });

      render(
        <ResponsiveVisibility.Root>
          <ResponsiveVisibility.From bp="md">
            <span data-testid="from-md">From md</span>
          </ResponsiveVisibility.From>
        </ResponsiveVisibility.Root>,
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.getByTestId("from-md")).toBeInTheDocument();
      expect(screen.getByText("From md")).toBeInTheDocument();
    });

    it("does not render From(bp) when viewport < bp (current=base)", async () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock(() => false),
      });

      render(
        <ResponsiveVisibility.Root>
          <ResponsiveVisibility.From bp="md">
            <span data-testid="from-md">From md</span>
          </ResponsiveVisibility.From>
        </ResponsiveVisibility.Root>,
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.queryByTestId("from-md")).not.toBeInTheDocument();
    });
  });

  describe("Below slot", () => {
    it("renders Below(bp) children when viewport < bp (current=base)", async () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock(() => false),
      });

      render(
        <ResponsiveVisibility.Root>
          <ResponsiveVisibility.Below bp="sm">
            <span data-testid="below-sm">Below sm</span>
          </ResponsiveVisibility.Below>
        </ResponsiveVisibility.Root>,
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.getByTestId("below-sm")).toBeInTheDocument();
      expect(screen.getByText("Below sm")).toBeInTheDocument();
    });

    it("does not render Below(bp) when viewport >= bp", async () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock((px) => px <= 768),
      });

      render(
        <ResponsiveVisibility.Root>
          <ResponsiveVisibility.Below bp="sm">
            <span data-testid="below-sm">Below sm</span>
          </ResponsiveVisibility.Below>
        </ResponsiveVisibility.Root>,
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.queryByTestId("below-sm")).not.toBeInTheDocument();
    });
  });

  describe("Only slot", () => {
    it("renders Only(bp) children when viewport in [bp, nextBp)", async () => {
      // current = md: (min-width: 768) matches, (min-width: 1024) does not
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock((px) => px <= 768),
      });

      render(
        <ResponsiveVisibility.Root>
          <ResponsiveVisibility.Only bp="md">
            <span data-testid="only-md">Only md</span>
          </ResponsiveVisibility.Only>
        </ResponsiveVisibility.Root>,
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.getByTestId("only-md")).toBeInTheDocument();
      expect(screen.getByText("Only md")).toBeInTheDocument();
    });

    it("does not render Only(bp) when viewport outside range", async () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock(() => false),
      });

      render(
        <ResponsiveVisibility.Root>
          <ResponsiveVisibility.Only bp="md">
            <span data-testid="only-md">Only md</span>
          </ResponsiveVisibility.Only>
        </ResponsiveVisibility.Root>,
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.queryByTestId("only-md")).not.toBeInTheDocument();
    });
  });

  describe("bp='base' forbidden (CANON)", () => {
    it("guard throws in dev when bp is base (JS/any caller)", () => {
      expect(() => guardSlotBp("base")).toThrow(SLOT_BP_FORBIDDEN_MSG);
    });

    it("slot with bp=base is skipped in prod (non-match)", async () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock(() => false),
      });

      const prevEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      render(
        <ResponsiveVisibility.Root>
          <ResponsiveVisibility.From bp={"base" as any}>
            <span data-testid="from-base">From base</span>
          </ResponsiveVisibility.From>
          <ResponsiveVisibility.Below bp="sm">
            <span data-testid="below-sm">Below sm</span>
          </ResponsiveVisibility.Below>
        </ResponsiveVisibility.Root>,
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.queryByTestId("from-base")).not.toBeInTheDocument();
      expect(screen.getByTestId("below-sm")).toBeInTheDocument();

      process.env.NODE_ENV = prevEnv;
    });
  });

  describe("first matching slot wins", () => {
    it("renders only the first matching slot when multiple could match", async () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock((px) => px <= 768),
      });

      render(
        <ResponsiveVisibility.Root>
          <ResponsiveVisibility.From bp="sm">
            <span data-testid="first">First</span>
          </ResponsiveVisibility.From>
          <ResponsiveVisibility.From bp="md">
            <span data-testid="second">Second</span>
          </ResponsiveVisibility.From>
        </ResponsiveVisibility.Root>,
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.getByTestId("first")).toBeInTheDocument();
      expect(screen.queryByTestId("second")).not.toBeInTheDocument();
    });
  });

  describe("nesting (Root inside Root) forbidden (CANON)", () => {
    it("throws in dev when Root is nested inside another Root", () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock((px) => px <= 768),
      });

      expect(() => {
        render(
          <ResponsiveVisibility.Root>
            <ResponsiveVisibility.From bp="md">
              <ResponsiveVisibility.Root>
                <ResponsiveVisibility.From bp="md">
                  <span data-testid="nested">Nested</span>
                </ResponsiveVisibility.From>
              </ResponsiveVisibility.Root>
            </ResponsiveVisibility.From>
          </ResponsiveVisibility.Root>,
        );
        act(() => {});
      }).toThrow(NESTING_FORBIDDEN_MSG);
    });

    it("does not throw in prod when Root is nested (guard is dev-only)", async () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock((px) => px <= 768),
      });

      const prevEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      expect(() =>
        render(
          <ResponsiveVisibility.Root>
            <ResponsiveVisibility.From bp="md">
              <ResponsiveVisibility.Root>
                <ResponsiveVisibility.From bp="md">
                  <span data-testid="nested">Nested</span>
                </ResponsiveVisibility.From>
              </ResponsiveVisibility.Root>
            </ResponsiveVisibility.From>
          </ResponsiveVisibility.Root>,
        ),
      ).not.toThrow();

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.getByTestId("nested")).toBeInTheDocument();
      process.env.NODE_ENV = prevEnv;
    });
  });

  describe("Only(2xl) equals From(2xl) (CANON)", () => {
    it("renders same content for Only(2xl) and From(2xl) when viewport is 2xl", async () => {
      // 2xl = 1536px; match (min-width: 1536)
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock((px) => px <= 1536),
      });

      const { unmount: unmountOnly } = render(
        <ResponsiveVisibility.Root>
          <ResponsiveVisibility.Only bp="2xl">
            <span data-testid="only-2xl">Only 2xl</span>
          </ResponsiveVisibility.Only>
        </ResponsiveVisibility.Root>,
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.getByTestId("only-2xl")).toBeInTheDocument();
      expect(screen.getByText("Only 2xl")).toBeInTheDocument();
      unmountOnly();

      const { unmount: unmountFrom } = render(
        <ResponsiveVisibility.Root>
          <ResponsiveVisibility.From bp="2xl">
            <span data-testid="from-2xl">From 2xl</span>
          </ResponsiveVisibility.From>
        </ResponsiveVisibility.Root>,
      );

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.getByTestId("from-2xl")).toBeInTheDocument();
      expect(screen.getByText("From 2xl")).toBeInTheDocument();
      unmountFrom();
    });
  });

  describe("SSR safety (no slot content until mount)", () => {
    it("Root returns null before mount so SSR does not render slot content", async () => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: createMatchMediaMock(() => false),
      });

      render(
        <ResponsiveVisibility.Root>
          <ResponsiveVisibility.From bp="md">
            <span data-testid="ssr-content">Content</span>
          </ResponsiveVisibility.From>
        </ResponsiveVisibility.Root>,
      );

      expect(screen.queryByTestId("ssr-content")).not.toBeInTheDocument();

      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });

      expect(screen.queryByTestId("ssr-content")).not.toBeInTheDocument();
    });
  });
});
