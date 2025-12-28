/**
 * STEP 10: HoverCard - Runtime / Interaction Tests
 *
 * These tests verify HoverCard's runtime behavior and API contract
 * without checking visual design, CSS classes, or tokens.
 *
 * Test scope:
 * - Component rendering
 * - Props acceptance
 * - Controlled/uncontrolled state behavior
 * - Hover/focus interactions
 * - Delay handling
 * - Edge cases (timeout cleanup)
 * - Accessibility (ARIA roles, attributes, keyboard navigation)
 *
 * Note: Full hover interaction behavior is validated via Storybook
 * as jsdom does not fully support pointer events required for hover behavior.
 */

import "@testing-library/jest-dom/vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { ResponsiveDelay } from "@/FOUNDATION/tokens/types";
import { Button } from "@/PRIMITIVES/Button";
import { renderWithTheme, userEventSetup } from "@/test/test-utils";

import { HoverCardContent, HoverCardRoot, HoverCardTrigger } from ".";

describe("HoverCard - Runtime / Interaction Tests", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Only run pending timers if fake timers are active
    if (vi.isFakeTimers()) {
      vi.runOnlyPendingTimers();
    }
    vi.useRealTimers();
  });

  describe("Rendering", () => {
    it("renders trigger element", () => {
      const { container } = renderWithTheme(
        <HoverCardRoot>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      const trigger = container.querySelector('button[aria-haspopup="dialog"]');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent(/hover me/i);
    });

    it("renders content when open", async () => {
      // Use real timers for Portal rendering
      vi.useRealTimers();

      renderWithTheme(
        <HoverCardRoot defaultOpen>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      await waitFor(
        () => {
          expect(screen.getByText("HoverCard content")).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Restore fake timers
      vi.useFakeTimers();
    });

    it("does not render content when closed by default", () => {
      renderWithTheme(
        <HoverCardRoot>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      expect(screen.queryByText("HoverCard content")).not.toBeInTheDocument();
    });
  });

  describe("Props Acceptance", () => {
    it("accepts all optional props without errors", () => {
      renderWithTheme(
        <HoverCardRoot
          openDelay={100 as ResponsiveDelay}
          closeDelay={200 as ResponsiveDelay}
          modal={false}
        >
          <HoverCardTrigger asChild>
            <Button>Button</Button>
          </HoverCardTrigger>
          <HoverCardContent variant="primary" size="md" side="top" align="center">
            Content
          </HoverCardContent>
        </HoverCardRoot>,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("Controlled Mode", () => {
    it("respects open prop", async () => {
      // Use real timers for Portal rendering
      vi.useRealTimers();

      const onOpenChange = vi.fn();
      renderWithTheme(
        <HoverCardRoot open={true} onOpenChange={onOpenChange}>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      await waitFor(
        () => {
          expect(screen.getByText("HoverCard content")).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Restore fake timers
      vi.useFakeTimers();
    });

    it("calls onOpenChange when state changes", async () => {
      // Use real timers for userEvent operations
      vi.useRealTimers();

      const onOpenChange = vi.fn();
      const user = userEventSetup();
      const { container } = renderWithTheme(
        <HoverCardRoot open={false} onOpenChange={onOpenChange}>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      const trigger = container.querySelector(
        'button[aria-haspopup="dialog"]',
      ) as HTMLButtonElement;
      expect(trigger).toBeTruthy();
      await user.hover(trigger);

      await waitFor(
        () => {
          expect(onOpenChange).toHaveBeenCalledWith(true);
        },
        { timeout: 3000 },
      );

      // Restore fake timers
      vi.useFakeTimers();
    });
  });

  describe("Uncontrolled Mode", () => {
    it("uses defaultOpen prop for initial state", async () => {
      // Use real timers for Portal rendering
      vi.useRealTimers();

      renderWithTheme(
        <HoverCardRoot defaultOpen>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      await waitFor(
        () => {
          expect(screen.getByText("HoverCard content")).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      // Restore fake timers
      vi.useFakeTimers();
    });

    it("manages state internally when no open prop provided", async () => {
      // Use real timers for userEvent operations
      vi.useRealTimers();

      const onOpenChange = vi.fn();
      const user = userEventSetup();
      const { container } = renderWithTheme(
        <HoverCardRoot onOpenChange={onOpenChange}>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      const trigger = container.querySelector(
        'button[aria-haspopup="dialog"]',
      ) as HTMLButtonElement;
      expect(trigger).toBeTruthy();
      await user.hover(trigger);

      await waitFor(
        () => {
          expect(onOpenChange).toHaveBeenCalledWith(true);
        },
        { timeout: 3000 },
      );

      // Restore fake timers
      vi.useFakeTimers();
    });
  });

  describe("Delay Handling", () => {
    it("opens with delay when openDelay is set", async () => {
      // Use real timers for userEvent operations and delay testing
      vi.useRealTimers();

      const onOpenChange = vi.fn();
      const user = userEventSetup();
      const { container } = renderWithTheme(
        <HoverCardRoot openDelay={100 as ResponsiveDelay} onOpenChange={onOpenChange}>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      const trigger = container.querySelector(
        'button[aria-haspopup="dialog"]',
      ) as HTMLButtonElement;
      expect(trigger).toBeTruthy();
      await user.hover(trigger);

      // Should not call immediately
      expect(onOpenChange).not.toHaveBeenCalled();

      // Wait for delay to pass (100ms + small buffer)
      await waitFor(
        () => {
          expect(onOpenChange).toHaveBeenCalledWith(true);
        },
        { timeout: 500 },
      );

      // Restore fake timers
      vi.useFakeTimers();
    });

    it("closes with delay when closeDelay is set", async () => {
      // Use real timers for Portal rendering and delay testing
      vi.useRealTimers();

      const onOpenChange = vi.fn();
      const { container } = renderWithTheme(
        <HoverCardRoot defaultOpen closeDelay={200 as ResponsiveDelay} onOpenChange={onOpenChange}>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      await waitFor(
        () => {
          expect(screen.getByText("HoverCard content")).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Clear any previous calls from defaultOpen initialization
      onOpenChange.mockClear();

      const trigger = container.querySelector(
        'button[aria-haspopup="dialog"]',
      ) as HTMLButtonElement;
      expect(trigger).toBeTruthy();

      // Use fireEvent for React synthetic events
      fireEvent.mouseLeave(trigger);

      // Should not call immediately (with delay)
      expect(onOpenChange).not.toHaveBeenCalled();

      // Wait for delay to pass (200ms + small buffer)
      await waitFor(
        () => {
          expect(onOpenChange).toHaveBeenCalledWith(false);
        },
        { timeout: 1000 },
      );

      // Restore fake timers
      vi.useFakeTimers();
    });

    it("opens immediately when openDelay is 0", async () => {
      // Use real timers for Portal rendering and immediate open behavior
      vi.useRealTimers();

      const onOpenChange = vi.fn();
      const user = userEventSetup();
      const { container } = renderWithTheme(
        <HoverCardRoot openDelay={0 as ResponsiveDelay} onOpenChange={onOpenChange}>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      const trigger = container.querySelector(
        'button[aria-haspopup="dialog"]',
      ) as HTMLButtonElement;
      expect(trigger).toBeTruthy();
      await user.hover(trigger);

      await waitFor(
        () => {
          expect(onOpenChange).toHaveBeenCalledWith(true);
        },
        { timeout: 2000 },
      );

      // Restore fake timers
      vi.useFakeTimers();
    });
  });

  describe("Focus Interaction", () => {
    it("opens on focus", async () => {
      // Use real timers for Portal rendering and user events
      vi.useRealTimers();

      const onOpenChange = vi.fn();
      const user = userEventSetup();
      const { container } = renderWithTheme(
        <HoverCardRoot onOpenChange={onOpenChange}>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      const trigger = container.querySelector(
        'button[aria-haspopup="dialog"]',
      ) as HTMLButtonElement;
      expect(trigger).toBeTruthy();
      await user.tab();

      await waitFor(
        () => {
          expect(onOpenChange).toHaveBeenCalledWith(true);
        },
        { timeout: 2000 },
      );
    });

    it("closes on blur", async () => {
      // Use real timers for Portal rendering and user events
      vi.useRealTimers();

      const onOpenChange = vi.fn();
      const user = userEventSetup();
      const { container } = renderWithTheme(
        <HoverCardRoot defaultOpen onOpenChange={onOpenChange}>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      await waitFor(
        () => {
          expect(screen.getByText("HoverCard content")).toBeInTheDocument();
        },
        { timeout: 2000 },
      );

      // Get the trigger button from the container (not from portal)
      // This ensures we get the actual trigger, not any duplicate elements
      const trigger = container.querySelector(
        'button[aria-haspopup="dialog"]',
      ) as HTMLButtonElement;
      expect(trigger).toBeTruthy();
      expect(trigger).toHaveTextContent(/hover me/i);

      // Focus the trigger
      trigger.focus();

      // Wait a bit for focus to settle
      await waitFor(
        () => {
          expect(document.activeElement).toBe(trigger);
        },
        { timeout: 500 },
      );

      // Blur by clicking outside (on document body)
      await user.click(document.body);

      await waitFor(
        () => {
          expect(onOpenChange).toHaveBeenCalledWith(false);
        },
        { timeout: 2000 },
      );

      // Restore fake timers
      vi.useFakeTimers();
    });
  });

  describe("asChild Pattern", () => {
    it("renders as child element when asChild is true", () => {
      renderWithTheme(
        <HoverCardRoot>
          <HoverCardTrigger asChild>
            <Button>Custom trigger</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      const trigger = screen.getByRole("button", { name: /custom trigger/i });
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    });

    it("renders as button when asChild is false", () => {
      renderWithTheme(
        <HoverCardRoot>
          <HoverCardTrigger>Trigger</HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      const trigger = screen.getByRole("button", { name: /trigger/i });
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
      expect(trigger).toHaveAttribute("type", "button");
    });
  });

  describe("Accessibility", () => {
    it("sets aria-haspopup on trigger", () => {
      const { container } = renderWithTheme(
        <HoverCardRoot>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      const trigger = container.querySelector('button[aria-haspopup="dialog"]');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    });

    it("forwards custom ARIA attributes to trigger", () => {
      renderWithTheme(
        <HoverCardRoot>
          <HoverCardTrigger aria-label="Custom label">Hover me</HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      const trigger = screen.getByRole("button", { name: /custom label/i });
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("cleans up timeouts on unmount", () => {
      const onOpenChange = vi.fn();
      const { unmount } = renderWithTheme(
        <HoverCardRoot openDelay={1000 as ResponsiveDelay} onOpenChange={onOpenChange}>
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      unmount();

      // Fast-forward time - should not call onOpenChange after unmount
      vi.advanceTimersByTime(1000);

      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it("handles rapid open/close cycles correctly", async () => {
      // Use real timers for userEvent operations
      vi.useRealTimers();

      const onOpenChange = vi.fn();
      const user = userEventSetup();
      renderWithTheme(
        <HoverCardRoot
          openDelay={100 as ResponsiveDelay}
          closeDelay={100 as ResponsiveDelay}
          onOpenChange={onOpenChange}
        >
          <HoverCardTrigger asChild>
            <Button>Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>HoverCard content</HoverCardContent>
        </HoverCardRoot>,
      );

      // Get the actual button element
      const buttons = screen.getAllByRole("button", { name: /hover me/i });
      expect(buttons.length).toBeGreaterThan(0);
      const trigger = buttons[buttons.length - 1]!; // Get the inner button

      // Rapid hover/unhover cycles
      await user.hover(trigger);
      await waitFor(
        () => {
          expect(onOpenChange).toHaveBeenCalledWith(true);
        },
        { timeout: 200 },
      );

      await user.unhover(trigger);
      await waitFor(
        () => {
          expect(onOpenChange).toHaveBeenCalledWith(false);
        },
        { timeout: 200 },
      );

      await user.hover(trigger);
      await waitFor(
        () => {
          expect(onOpenChange).toHaveBeenLastCalledWith(true);
        },
        { timeout: 200 },
      );

      // Should handle correctly without errors
      expect(trigger).toBeInTheDocument();

      // Restore fake timers
      vi.useFakeTimers();
    });
  });
});
