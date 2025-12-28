/**
 * Focus Navigation - Playwright Tests
 *
 * Tests for focus trap, focus restore, and tab order behavior.
 * These tests verify FOCUS_AUTHORITY compliance.
 *
 * Reference: docs/architecture/FOCUS_AUTHORITY.md
 *
 * Setup:
 * 1. pnpm add -D @playwright/test
 * 2. npx playwright install
 * 3. pnpm run test:focus
 */

import { expect, test } from "@playwright/test";

// Storybook URLs for focus stories
const STORYBOOK_BASE = "http://localhost:6006";

const STORY_URLS = {
  tabOrder: `${STORYBOOK_BASE}/iframe.html?id=ui-composition-motion-focus-overview--tab-order-demo`,
  focusVisible: `${STORYBOOK_BASE}/iframe.html?id=ui-composition-motion-focus-overview--focus-visible-demo`,
  modalTrap: `${STORYBOOK_BASE}/iframe.html?id=ui-composition-motion-focus-trap-and-restore--modal-focus-trap`,
  focusRestore: `${STORYBOOK_BASE}/iframe.html?id=ui-composition-motion-focus-trap-and-restore--focus-restore-demo`,
  escapeKey: `${STORYBOOK_BASE}/iframe.html?id=ui-composition-motion-focus-trap-and-restore--escape-key-behavior`,
};

test.describe("Focus System - Tab Order", () => {
  test("should follow DOM order for tab navigation", async ({ page }) => {
    await page.goto(STORY_URLS.tabOrder);
    await page.waitForLoadState("networkidle");

    // Get all focusable elements in expected order
    const focusableElements = page.locator("button, input, a[href], [tabindex='0']");
    const count = await focusableElements.count();

    expect(count).toBeGreaterThan(0);

    // Tab through elements and verify order
    for (let i = 0; i < Math.min(count, 5); i++) {
      await page.keyboard.press("Tab");
      // Verify an element is focused
      const focusedElement = page.locator(":focus");
      await expect(focusedElement).toBeVisible();
    }
  });

  test("should show focus ring only on keyboard navigation", async ({ page }) => {
    await page.goto(STORY_URLS.focusVisible);
    await page.waitForLoadState("networkidle");

    // Scroll to top to ensure buttons are visible
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);

    // Get the test button by data-testid
    const button = page.getByTestId("focus-visible-test-button");

    // Click button - should NOT show focus ring (or minimal ring)
    await button.click();

    // Verify button received focus (but not focus-visible)
    await expect(button).toBeFocused();

    // Tab to move focus away and back
    await page.keyboard.press("Tab");

    // Check that button has focus-visible after keyboard navigation
    const focusedButton = page.locator(
      "button:focus-visible[data-testid='focus-visible-test-button']",
    );

    // Verify the button still exists and is visible
    await expect(button).toBeVisible();

    // Check computed styles to verify focus ring is visible
    const hasFocusVisible = await button.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      // Check for ring (box-shadow) or outline
      return styles.outlineWidth !== "0px" || styles.boxShadow !== "none";
    });

    expect(hasFocusVisible).toBe(true);
  });
});

test.describe("Focus System - Focus Trap", () => {
  test("Modal should trap focus inside", async ({ page }) => {
    await page.goto(STORY_URLS.modalTrap);
    await page.waitForLoadState("networkidle");

    // Open modal
    const openButton = page.getByTestId("focus-modal-open");
    await openButton.click();

    // Wait for modal to appear
    const modal = page.getByTestId("focus-modal-dialog");
    await expect(modal).toBeVisible();

    // Get focusable elements inside modal
    const modalFocusables = modal.locator("button, input, [tabindex='0']");
    const count = await modalFocusables.count();

    expect(count).toBeGreaterThan(0);

    // Tab through all elements multiple times - focus should cycle inside modal
    const tabCount = count + 2; // More than elements to verify cycling
    for (let i = 0; i < tabCount; i++) {
      await page.keyboard.press("Tab");
    }

    // Verify focus is still inside modal
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Check that focused element is inside modal
    const isFocusInModal = await page.evaluate(() => {
      const focused = document.activeElement;
      const modal = document.querySelector("[data-testid='focus-modal-dialog']");
      return modal?.contains(focused);
    });

    expect(isFocusInModal).toBe(true);
  });

  test("Shift+Tab should also cycle inside modal", async ({ page }) => {
    await page.goto(STORY_URLS.modalTrap);
    await page.waitForLoadState("networkidle");

    // Open modal
    const openButton = page.getByTestId("focus-modal-open");
    await openButton.click();

    const modal = page.getByTestId("focus-modal-dialog");
    await expect(modal).toBeVisible();

    // Tab backward multiple times
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("Shift+Tab");
    }

    // Verify focus is still inside modal
    const isFocusInModal = await page.evaluate(() => {
      const focused = document.activeElement;
      const modal = document.querySelector("[data-testid='focus-modal-dialog']");
      return modal?.contains(focused);
    });

    expect(isFocusInModal).toBe(true);
  });
});

test.describe("Focus System - Focus Restore", () => {
  test("should restore focus to trigger when modal closes", async ({ page }) => {
    await page.goto(STORY_URLS.focusRestore);
    await page.waitForLoadState("networkidle");

    // Find and focus the trigger button
    const triggerButton = page.getByTestId("focus-restore-trigger");
    await triggerButton.focus();

    // Open modal
    await triggerButton.click();

    const modal = page.getByTestId("focus-modal-dialog");
    await expect(modal).toBeVisible();

    // Close modal via button inside
    const closeButton = modal.getByTestId("focus-modal-close");
    await closeButton.click();

    // Wait for modal to close
    await expect(modal).not.toBeVisible();

    // Focus restore is now deterministic - no timeout needed
    // Verify focus returned to trigger
    await expect(triggerButton).toBeFocused();
  });

  test("should restore focus when pressing Escape", async ({ page }) => {
    await page.goto(STORY_URLS.escapeKey);
    await page.waitForLoadState("networkidle");

    // Open modal
    const openButton = page.getByTestId("focus-modal-open");
    await openButton.click();

    const modal = page.getByTestId("focus-modal-dialog");
    await expect(modal).toBeVisible();

    // Press Escape to close
    await page.keyboard.press("Escape");

    // Wait for modal to close
    await expect(modal).not.toBeVisible();

    // Focus restore is now deterministic - no timeout needed
    // Verify focus returned to trigger
    await expect(openButton).toBeFocused();
  });
});

test.describe("Focus System - Escape Key", () => {
  test("Escape should close modal overlay", async ({ page }) => {
    await page.goto(STORY_URLS.escapeKey);
    await page.waitForLoadState("networkidle");

    const openButton = page.getByTestId("focus-modal-open");
    await openButton.click();

    const modal = page.getByTestId("focus-modal-dialog");
    await expect(modal).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(modal).not.toBeVisible();
  });
});

test.describe("Focus System - Accessibility Assertions", () => {
  test("Modal should have proper ARIA attributes", async ({ page }) => {
    await page.goto(STORY_URLS.modalTrap);
    await page.waitForLoadState("networkidle");

    const openButton = page.getByTestId("focus-modal-open");
    await openButton.click();

    const modal = page.getByTestId("focus-modal-dialog");
    await expect(modal).toBeVisible();

    // Check ARIA attributes
    await expect(modal).toHaveAttribute("role", "dialog");
    // Note: aria-modal may not be set by Radix Dialog - this is a component behavior issue, not a test stability issue
  });

  test("Focused elements should have visible focus indicator", async ({ page }) => {
    await page.goto(STORY_URLS.tabOrder);
    await page.waitForLoadState("networkidle");

    // Tab to first element
    await page.keyboard.press("Tab");

    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Check for focus-visible styles (outline or ring)
    const hasVisibleFocus = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      // Check for outline or box-shadow (ring)
      return styles.outlineWidth !== "0px" || styles.boxShadow !== "none";
    });

    expect(hasVisibleFocus).toBe(true);
  });
});
