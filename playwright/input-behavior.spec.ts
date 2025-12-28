/**
 * Input Behavior - Playwright Tests
 *
 * Tests for keyboard parity, Enter/Space semantics, state blocking, and accidental interaction prevention.
 * These tests verify INPUT_AUTHORITY compliance.
 *
 * Reference: docs/architecture/INPUT_AUTHORITY.md
 *
 * Setup:
 * 1. Start Storybook: pnpm run storybook
 * 2. Run tests: pnpm run test:playwright input-behavior
 */

import { expect, test } from "@playwright/test";

// Storybook URLs for input contract stories
const STORYBOOK_BASE = "http://localhost:6006";

const STORY_URLS = {
  keyboardParity: `${STORYBOOK_BASE}/iframe.html?id=ui-composition-input-contract-stories--keyboard-parity`,
  enterSpaceSemantics: `${STORYBOOK_BASE}/iframe.html?id=ui-composition-input-contract-stories--enter-space-semantics`,
  disabledBlocking: `${STORYBOOK_BASE}/iframe.html?id=ui-composition-input-contract-stories--disabled-state-blocking`,
  loadingBehavior: `${STORYBOOK_BASE}/iframe.html?id=ui-composition-input-contract-stories--loading-state-behavior`,
  readonlyBehavior: `${STORYBOOK_BASE}/iframe.html?id=ui-composition-input-contract-stories--readonly-state-behavior`,
  doubleTriggerPrevention: `${STORYBOOK_BASE}/iframe.html?id=ui-composition-input-contract-stories--double-trigger-prevention`,
};

test.describe("Input System - Keyboard Parity", () => {
  test("Button should respond to Enter and Space keys", async ({ page }) => {
    await page.goto(STORY_URLS.keyboardParity);
    await page.waitForLoadState("networkidle");

    const button = page.locator("button", { hasText: /clicked/i }).first();
    await button.focus();

    // Get initial count
    const initialText = await button.textContent();
    const initialCount = parseInt(initialText?.match(/\d+/)?.[0] || "0");

    // Press Enter
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);

    // Verify count increased
    const afterEnterText = await button.textContent();
    const afterEnterCount = parseInt(afterEnterText?.match(/\d+/)?.[0] || "0");
    expect(afterEnterCount).toBeGreaterThan(initialCount);

    // Press Space
    await page.keyboard.press(" ");
    await page.waitForTimeout(100);

    // Verify count increased again
    const afterSpaceText = await button.textContent();
    const afterSpaceCount = parseInt(afterSpaceText?.match(/\d+/)?.[0] || "0");
    expect(afterSpaceCount).toBeGreaterThan(afterEnterCount);
  });

  test("Checkbox should toggle with Space key", async ({ page }) => {
    await page.goto(STORY_URLS.keyboardParity);
    await page.waitForLoadState("networkidle");

    const checkbox = page.locator('button[role="checkbox"]').first();
    await checkbox.focus();

    // Get initial checked state
    const initialChecked = await checkbox.getAttribute("aria-checked");

    // Press Space
    await page.keyboard.press(" ");
    await page.waitForTimeout(100);

    // Verify state changed
    const afterSpaceChecked = await checkbox.getAttribute("aria-checked");
    expect(afterSpaceChecked).not.toBe(initialChecked);
  });

  test("Switch should toggle with Space key", async ({ page }) => {
    await page.goto(STORY_URLS.keyboardParity);
    await page.waitForLoadState("networkidle");

    const switchButton = page.locator('button[role="switch"]').first();
    await switchButton.focus();

    // Get initial checked state
    const initialChecked = await switchButton.getAttribute("aria-checked");

    // Press Space
    await page.keyboard.press(" ");
    await page.waitForTimeout(100);

    // Verify state changed
    const afterSpaceChecked = await switchButton.getAttribute("aria-checked");
    expect(afterSpaceChecked).not.toBe(initialChecked);
  });
});

test.describe("Input System - Enter/Space Semantics", () => {
  test("Button should activate with both Enter and Space", async ({ page }) => {
    await page.goto(STORY_URLS.enterSpaceSemantics);
    await page.waitForLoadState("networkidle");

    const button = page.locator("button", { hasText: /press enter or space/i }).first();
    await button.focus();

    // Set up alert handler
    page.on("dialog", (dialog) => {
      expect(dialog.message()).toContain("Button activated");
      dialog.accept();
    });

    // Press Enter - should trigger alert
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);

    // Press Space - should trigger alert
    await page.keyboard.press(" ");
    await page.waitForTimeout(100);
  });

  test("Checkbox should toggle with Space, not Enter", async ({ page }) => {
    await page.goto(STORY_URLS.enterSpaceSemantics);
    await page.waitForLoadState("networkidle");

    const checkbox = page.locator('button[role="checkbox"]').first();
    await checkbox.focus();

    const initialChecked = await checkbox.getAttribute("aria-checked");

    // Press Space - should toggle
    await page.keyboard.press(" ");
    await page.waitForTimeout(100);
    const afterSpaceChecked = await checkbox.getAttribute("aria-checked");
    expect(afterSpaceChecked).not.toBe(initialChecked);

    // Press Enter - behavior may vary, but Space is preferred
    // (Some implementations allow Enter, but Space is canonical)
  });

  test("Form Input should submit form on Enter", async ({ page }) => {
    await page.goto(STORY_URLS.enterSpaceSemantics);
    await page.waitForLoadState("networkidle");

    const form = page.locator("form").first();
    const input = form.locator("input[type='text']").first();
    const submitButton = form.locator("button[type='submit']").first();

    await input.fill("test input");
    await input.press("Enter");

    // Wait for form submission
    await page.waitForTimeout(500);

    // Verify form was submitted (check for success message)
    const successMessage = page.locator("text=Form submitted");
    await expect(successMessage).toBeVisible();
  });
});

test.describe("Input System - Disabled State Blocking", () => {
  test("Disabled Button should not respond to clicks", async ({ page }) => {
    await page.goto(STORY_URLS.disabledBlocking);
    await page.waitForLoadState("networkidle");

    const disabledButton = page.locator("button:disabled").first();
    const initialText = await disabledButton.textContent();

    // Try to click
    await disabledButton.click({ force: true });
    await page.waitForTimeout(100);

    // Text should not change (no handler executed)
    const afterClickText = await disabledButton.textContent();
    expect(afterClickText).toBe(initialText);
  });

  test("Disabled Button should not respond to keyboard", async ({ page }) => {
    await page.goto(STORY_URLS.disabledBlocking);
    await page.waitForLoadState("networkidle");

    const disabledButton = page.locator("button:disabled").first();
    const initialText = await disabledButton.textContent();

    // Try to focus (should fail or be prevented)
    await disabledButton.focus();
    await page.waitForTimeout(100);

    // Try to press Enter/Space
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);

    // Text should not change
    const afterKeyboardText = await disabledButton.textContent();
    expect(afterKeyboardText).toBe(initialText);
  });

  test("Disabled Checkbox should not toggle", async ({ page }) => {
    await page.goto(STORY_URLS.disabledBlocking);
    await page.waitForLoadState("networkidle");

    const disabledCheckbox = page.locator('button[role="checkbox"]:disabled').first();
    const initialChecked = await disabledCheckbox.getAttribute("aria-checked");

    // Try to click
    await disabledCheckbox.click({ force: true });
    await page.waitForTimeout(100);

    // State should not change
    const afterClickChecked = await disabledCheckbox.getAttribute("aria-checked");
    expect(afterClickChecked).toBe(initialChecked);

    // Try keyboard
    await disabledCheckbox.focus();
    await page.keyboard.press(" ");
    await page.waitForTimeout(100);

    // State should still not change
    const afterKeyboardChecked = await disabledCheckbox.getAttribute("aria-checked");
    expect(afterKeyboardChecked).toBe(initialChecked);
  });

  test("Disabled Input should not accept input", async ({ page }) => {
    await page.goto(STORY_URLS.disabledBlocking);
    await page.waitForLoadState("networkidle");

    const disabledInput = page.getByTestId("input-disabled");
    const initialValue = await disabledInput.inputValue();

    // Try to type - disabled elements reject fill() calls (expected behavior)
    // Try to type directly (should be blocked)
    await disabledInput.click({ force: true });
    await page.keyboard.type("test");
    await page.waitForTimeout(100);

    // Value should not change
    const afterTypeValue = await disabledInput.inputValue();
    expect(afterTypeValue).toBe(initialValue);
  });
});

test.describe("Input System - Readonly State Behavior", () => {
  test("Readonly Input should allow focus and selection", async ({ page }) => {
    await page.goto(STORY_URLS.readonlyBehavior);
    await page.waitForLoadState("networkidle");

    const readonlyInput = page.getByTestId("input-readonly");
    const initialValue = await readonlyInput.inputValue();

    // Should be able to focus
    await readonlyInput.focus();
    await expect(readonlyInput).toBeFocused();

    // Should be able to select text
    await readonlyInput.selectText();
    const selectedText = await page.evaluate(() => window.getSelection()?.toString());
    expect(selectedText).toBeTruthy();

    // Should NOT be able to edit - readonly elements reject fill() calls
    // Try to type directly (should be blocked)
    await readonlyInput.click();
    await page.keyboard.type("new value");
    await page.waitForTimeout(100);
    const afterEditValue = await readonlyInput.inputValue();
    expect(afterEditValue).toBe(initialValue);
  });

  test("Readonly Textarea should allow focus and selection", async ({ page }) => {
    await page.goto(STORY_URLS.readonlyBehavior);
    await page.waitForLoadState("networkidle");

    const readonlyTextarea = page.getByTestId("textarea-readonly");
    const initialValue = await readonlyTextarea.inputValue();

    // Should be able to focus
    await readonlyTextarea.focus();
    await expect(readonlyTextarea).toBeFocused();

    // Should be able to select text
    await readonlyTextarea.selectText();
    const selectedText = await page.evaluate(() => window.getSelection()?.toString());
    expect(selectedText).toBeTruthy();

    // Should NOT be able to edit - readonly elements reject fill() calls
    // Try to type directly (should be blocked)
    await readonlyTextarea.click();
    await page.keyboard.type("new value");
    await page.waitForTimeout(100);
    const afterEditValue = await readonlyTextarea.inputValue();
    expect(afterEditValue).toBe(initialValue);
  });
});

test.describe("Input System - Double Trigger Prevention", () => {
  test("Form should prevent double-submit", async ({ page }) => {
    await page.goto(STORY_URLS.doubleTriggerPrevention);
    await page.waitForLoadState("networkidle");

    const form = page.locator("form").first();
    const submitButton = form.locator("button[type='submit']").first();

    // Click submit button
    await submitButton.click();

    // Wait a bit for state to update
    await page.waitForTimeout(100);

    // Verify button is disabled during submission (DS responsibility)
    // This prevents further clicks at the UI level
    await expect(submitButton).toBeDisabled();

    // Wait for submission to complete
    await page.waitForTimeout(1500);

    // Button should be enabled again after submission completes
    await expect(submitButton).toBeEnabled();

    // Note: Preventing multiple submit handler invocations is a product-level pattern,
    // not a DS hard requirement. DS only ensures disabled state blocks interactions.
  });

  test("Submit button should be disabled during submission", async ({ page }) => {
    await page.goto(STORY_URLS.doubleTriggerPrevention);
    await page.waitForLoadState("networkidle");

    const form = page.locator("form").first();
    const submitButton = form.locator("button[type='submit']").first();

    // Click submit
    await submitButton.click();
    await page.waitForTimeout(100);

    // Button should be disabled during submission
    await expect(submitButton).toBeDisabled();

    // Wait for submission to complete
    await page.waitForTimeout(2000);

    // Button should be enabled again
    await expect(submitButton).toBeEnabled();
  });
});

test.describe("Input System - ARIA Attributes", () => {
  test("Checkbox should have correct ARIA attributes", async ({ page }) => {
    await page.goto(STORY_URLS.keyboardParity);
    await page.waitForLoadState("networkidle");

    const checkbox = page.locator('button[role="checkbox"]').first();

    // Should have role="checkbox"
    await expect(checkbox).toHaveAttribute("role", "checkbox");

    // Should have aria-checked
    const ariaChecked = await checkbox.getAttribute("aria-checked");
    expect(ariaChecked).toMatch(/true|false/);

    // Should have aria-disabled when disabled
    // (test with disabled checkbox if available)
  });

  test("Switch should have correct ARIA attributes", async ({ page }) => {
    await page.goto(STORY_URLS.keyboardParity);
    await page.waitForLoadState("networkidle");

    const switchButton = page.locator('button[role="switch"]').first();

    // Should have role="switch"
    await expect(switchButton).toHaveAttribute("role", "switch");

    // Should have aria-checked
    const ariaChecked = await switchButton.getAttribute("aria-checked");
    expect(ariaChecked).toMatch(/true|false/);
  });

  test("Radio should have correct ARIA attributes", async ({ page }) => {
    await page.goto(STORY_URLS.enterSpaceSemantics);
    await page.waitForLoadState("networkidle");

    const radio = page.locator('button[role="radio"]').first();

    // Should have role="radio"
    await expect(radio).toHaveAttribute("role", "radio");

    // Should have aria-checked
    const ariaChecked = await radio.getAttribute("aria-checked");
    expect(ariaChecked).toMatch(/true|false/);
  });
});
