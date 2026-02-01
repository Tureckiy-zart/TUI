import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { axeCheck, renderWithTheme } from "@/test/test-utils";

import { OverlaySlot } from "./OverlaySlot";

describe("OverlaySlot", () => {
  describe("API invariants", () => {
    it("Root has data-overlayslot-root and spreads valid props", () => {
      render(
        <OverlaySlot.Root data-testid="overlayslot-root">
          <OverlaySlot.Anchor>Anchor</OverlaySlot.Anchor>
        </OverlaySlot.Root>,
      );
      const root = document.querySelector("[data-overlayslot-root]");
      expect(root).toBeInTheDocument();
      expect(root).toHaveAttribute("data-overlayslot-root");
      expect(screen.getByTestId("overlayslot-root")).toBeInTheDocument();
    });
  });

  describe("Single Anchor enforcement", () => {
    beforeEach(() => {
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("renders only the first Anchor when two Anchor children are provided", () => {
      render(
        <OverlaySlot.Root>
          <OverlaySlot.Anchor>First</OverlaySlot.Anchor>
          <OverlaySlot.Anchor>Second</OverlaySlot.Anchor>
        </OverlaySlot.Root>,
      );
      const anchors = document.querySelectorAll("[data-overlayslot-anchor]");
      expect(anchors).toHaveLength(1);
      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.queryByText("Second")).not.toBeInTheDocument();
    });
  });

  describe("Item outside Root", () => {
    it("throws when Item is rendered without Root", () => {
      expect(() =>
        render(<OverlaySlot.Item position="top-right">Overlay</OverlaySlot.Item>),
      ).toThrow("OverlaySlot compound components must be used within OverlaySlot.Root");
    });
  });

  describe("Position enum", () => {
    const positions = ["top-left", "top-right", "bottom-left", "bottom-right", "center"] as const;

    it.each(positions)("renders Item with position %s and correct data attribute", (position) => {
      render(
        <OverlaySlot.Root>
          <OverlaySlot.Anchor>Anchor</OverlaySlot.Anchor>
          <OverlaySlot.Item position={position}>{position}</OverlaySlot.Item>
        </OverlaySlot.Root>,
      );
      const item = document.querySelector(`[data-overlayslot-position="${position}"]`);
      expect(item).toBeInTheDocument();
      expect(screen.getByText(position)).toBeInTheDocument();
    });
  });

  describe("Multiple Items", () => {
    it("renders multiple Items with different positions", () => {
      render(
        <OverlaySlot.Root>
          <OverlaySlot.Anchor>Anchor</OverlaySlot.Anchor>
          <OverlaySlot.Item position="top-left">Item 1</OverlaySlot.Item>
          <OverlaySlot.Item position="bottom-right">Item 2</OverlaySlot.Item>
        </OverlaySlot.Root>,
      );
      const items = document.querySelectorAll("[data-overlayslot-item]");
      expect(items).toHaveLength(2);
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  describe("Accessibility smoke", () => {
    it("passes axe when rendered with Root, Anchor, and Item", async () => {
      const { container } = renderWithTheme(
        <OverlaySlot.Root>
          <OverlaySlot.Anchor>Anchor content</OverlaySlot.Anchor>
          <OverlaySlot.Item position="top-right">Overlay content</OverlaySlot.Item>
        </OverlaySlot.Root>,
      );
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });
  });
});
