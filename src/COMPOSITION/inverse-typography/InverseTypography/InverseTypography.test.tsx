import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";
import { renderWithTheme } from "@/test/test-utils";

import { InverseTypography, InverseTypographyContext } from "./InverseTypography";
import { guardNesting, NESTING_FORBIDDEN_MSG } from "./InverseTypography.guard";

function ContextConsumer() {
  const isInverse = React.useContext(InverseTypographyContext);
  return <span data-testid="context-value">{String(isInverse)}</span>;
}

describe("InverseTypography", () => {
  describe("Root renders children", () => {
    it("renders children when Root is present", () => {
      render(
        <InverseTypography.Root>
          <span data-testid="child">Content</span>
        </InverseTypography.Root>,
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("context value provided to descendants", () => {
    it("provides isInverseContext true to descendants when Root is present", () => {
      render(
        <InverseTypography.Root>
          <ContextConsumer />
        </InverseTypography.Root>,
      );
      expect(screen.getByTestId("context-value")).toHaveTextContent("true");
    });

    it("provides isInverseContext false when outside Root", () => {
      render(<ContextConsumer />);
      expect(screen.getByTestId("context-value")).toHaveTextContent("false");
    });
  });

  describe("nesting (Root inside Root) forbidden (CANON)", () => {
    it("throws in dev when Root is nested inside another Root", () => {
      expect(() => {
        render(
          <InverseTypography.Root>
            <InverseTypography.Root>
              <span data-testid="nested">Nested</span>
            </InverseTypography.Root>
          </InverseTypography.Root>,
        );
      }).toThrow(NESTING_FORBIDDEN_MSG);
    });

    it("does not throw in prod when Root is nested (guard is dev-only)", () => {
      const prevEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      expect(() =>
        render(
          <InverseTypography.Root>
            <InverseTypography.Root>
              <span data-testid="nested">Nested</span>
            </InverseTypography.Root>
          </InverseTypography.Root>,
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
      const originalWindow = typeof window !== "undefined" ? window : undefined;
      render(
        <InverseTypography.Root>
          <span data-testid="ssr-child">SSR content</span>
        </InverseTypography.Root>,
      );
      expect(screen.getByTestId("ssr-child")).toBeInTheDocument();
      expect(screen.getByText("SSR content")).toBeInTheDocument();
      if (originalWindow !== undefined) {
        expect(typeof window).toBe("object");
      }
    });
  });

  describe("visual effect (Text and Heading only)", () => {
    it("Text inside Root receives inverse token class", () => {
      const { container } = renderWithTheme(
        <InverseTypography.Root>
          <Text>Inverse text</Text>
        </InverseTypography.Root>,
      );
      const text = container.querySelector("span");
      expect(text).toHaveClass("text-[hsl(var(--tm-text-inverse))]");
    });

    it("Heading inside Root receives inverse token class", () => {
      const { container } = renderWithTheme(
        <InverseTypography.Root>
          <Heading level={2}>Inverse heading</Heading>
        </InverseTypography.Root>,
      );
      const heading = container.querySelector("h2");
      expect(heading).toHaveClass("text-[hsl(var(--tm-text-inverse))]");
    });

    it("non-typography element inside Root does not receive inverse text class", () => {
      renderWithTheme(
        <InverseTypography.Root>
          <div data-testid="plain-div">Plain div</div>
        </InverseTypography.Root>,
      );
      const div = screen.getByTestId("plain-div");
      expect(div).not.toHaveClass("text-[hsl(var(--tm-text-inverse))]");
      expect(div).toHaveTextContent("Plain div");
    });
  });
});
