import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card } from "@/COMPOSITION/layout";

import { SurfaceElevation, useSurfaceElevation } from "./SurfaceElevation";
import { guardNesting, NESTING_FORBIDDEN_MSG } from "./SurfaceElevation.guard";

function LevelConsumer() {
  const level = useSurfaceElevation();
  return <span data-testid="context-value">{level ?? "null"}</span>;
}

describe("SurfaceElevation", () => {
  describe("Root renders children", () => {
    it("renders children when Root is present", () => {
      render(
        <SurfaceElevation.Root elevation="md">
          <span data-testid="child">Content</span>
        </SurfaceElevation.Root>,
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("context value provided to descendants", () => {
    it("provides elevation level to descendants when Root is present", () => {
      render(
        <SurfaceElevation.Root elevation="md">
          <LevelConsumer />
        </SurfaceElevation.Root>,
      );
      expect(screen.getByTestId("context-value")).toHaveTextContent("md");
    });

    it("provides null when outside Root", () => {
      render(<LevelConsumer />);
      expect(screen.getByTestId("context-value")).toHaveTextContent("null");
    });

    it("propagates different levels correctly", () => {
      const { rerender } = render(
        <SurfaceElevation.Root elevation="lg">
          <LevelConsumer />
        </SurfaceElevation.Root>,
      );
      expect(screen.getByTestId("context-value")).toHaveTextContent("lg");
      rerender(
        <SurfaceElevation.Root elevation="sm">
          <LevelConsumer />
        </SurfaceElevation.Root>,
      );
      expect(screen.getByTestId("context-value")).toHaveTextContent("sm");
    });
  });

  describe("nesting (Root inside Root) forbidden (CANON)", () => {
    it("throws in dev when Root is nested inside another Root", () => {
      expect(() => {
        render(
          <SurfaceElevation.Root elevation="md">
            <SurfaceElevation.Root elevation="sm">
              <span data-testid="nested">Nested</span>
            </SurfaceElevation.Root>
          </SurfaceElevation.Root>,
        );
      }).toThrow(NESTING_FORBIDDEN_MSG);
    });

    it("does not throw in prod when Root is nested (guard is dev-only)", () => {
      const prevEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      expect(() =>
        render(
          <SurfaceElevation.Root elevation="md">
            <SurfaceElevation.Root elevation="sm">
              <span data-testid="nested">Nested</span>
            </SurfaceElevation.Root>
          </SurfaceElevation.Root>,
        ),
      ).not.toThrow();

      expect(screen.getByTestId("nested")).toBeInTheDocument();
      process.env.NODE_ENV = prevEnv;
    });
  });

  describe("guardNesting (dev-only)", () => {
    it("throws in dev when hasAncestorRoot is true", () => {
      expect(() => guardNesting(true)).toThrow(NESTING_FORBIDDEN_MSG);
    });

    it("does not throw when hasAncestorRoot is false", () => {
      expect(() => guardNesting(false)).not.toThrow();
    });

    it("does not throw in prod when hasAncestorRoot is true", () => {
      const prevEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";
      expect(() => guardNesting(true)).not.toThrow();
      process.env.NODE_ENV = prevEnv;
    });
  });

  describe("SSR safety (no window usage)", () => {
    it("renders synchronously without window or document globals", () => {
      render(
        <SurfaceElevation.Root elevation="md">
          <span data-testid="ssr-child">SSR content</span>
        </SurfaceElevation.Root>,
      );
      expect(screen.getByTestId("ssr-child")).toBeInTheDocument();
      expect(screen.getByText("SSR content")).toBeInTheDocument();
    });
  });

  describe("component without elevation support is unaffected", () => {
    it("Card with explicit shadow renders when outside SurfaceElevation", () => {
      render(
        <Card shadow="lg">
          <span data-testid="card-child">Card content</span>
        </Card>,
      );
      expect(screen.getByTestId("card-child")).toBeInTheDocument();
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("does not affect components without elevation support", () => {
      render(
        <SurfaceElevation.Root elevation="md">
          <div data-testid="plain">Plain content</div>
        </SurfaceElevation.Root>,
      );
      const el = screen.getByTestId("plain");
      expect(el).toBeInTheDocument();
      expect(el.style.boxShadow).toBe("");
    });
  });
});
