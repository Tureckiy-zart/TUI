"use client";

/**
 * FocusLock Utility
 *
 * Utility for trapping focus within a container element.
 * Handles Tab/Shift+Tab navigation and returns focus to trigger element on close.
 */

import * as React from "react";

interface FocusLockOptions {
  /**
   * Container element to trap focus within
   */
  containerRef: React.RefObject<HTMLElement>;

  /**
   * Whether focus lock is enabled
   */
  enabled: boolean;

  /**
   * Element to return focus to when disabled
   */
  returnFocusRef?: React.RefObject<HTMLElement>;

  /**
   * Additional elements that should be focusable (e.g., portal elements)
   */
  additionalFocusableElements?: HTMLElement[];
}

/**
 * Get all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter((el) => {
    // Check if element is disabled
    if (el.hasAttribute("disabled")) {
      return false;
    }
    // Check if element is visible
    // In test environment, elements may not have offsetParent even if visible
    // So we check both offsetParent and computed style
    if (el.offsetParent === null) {
      try {
        // In test environment, check computed style
        // If getComputedStyle fails (e.g., in some test environments), allow the element
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") {
          return false;
        }
      } catch {
        // If getComputedStyle fails, assume element is focusable (for test environments)
        // This allows tests to work even if computed style is not available
      }
    }
    return true;
  });
}

/**
 * FocusLock hook for trapping focus within a container
 */
export function useFocusLock({
  containerRef,
  enabled,
  returnFocusRef,
  additionalFocusableElements = [],
}: FocusLockOptions): void {
  const previousActiveElementRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!enabled || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const previousActiveElement = document.activeElement as HTMLElement;

    // Capture returnFocusRef.current value at effect execution time
    // to avoid stale closure issues in cleanup function
    const returnFocusElement = returnFocusRef?.current;

    // Store the previously focused element
    if (previousActiveElement && container.contains(previousActiveElement)) {
      previousActiveElementRef.current = previousActiveElement;
    } else {
      previousActiveElementRef.current = previousActiveElement;
    }

    // Store focusable elements for keydown handler and focus management
    let focusableElements: HTMLElement[] = [];
    let firstElement: HTMLElement | null = null;
    let lastElement: HTMLElement | null = null;

    // Update focusable elements list
    const updateFocusableElements = () => {
      focusableElements = [
        ...getFocusableElements(container),
        ...additionalFocusableElements,
      ].filter(Boolean);
      firstElement = focusableElements[0] || null;
      lastElement = focusableElements[focusableElements.length - 1] || null;
    };

    // Initial update
    updateFocusableElements();

    // Focus first element asynchronously to ensure DOM is ready
    // Use double setTimeout to ensure portal content is rendered and elements are focusable
    // This works better in test environments than requestAnimationFrame
    const focusTimeoutId = setTimeout(() => {
      // Recalculate focusable elements before focusing (DOM might have changed)
      updateFocusableElements();
      const currentFirstElement = firstElement;
      if (currentFirstElement) {
        // Use another setTimeout to ensure focus can be set
        setTimeout(() => {
          // Recalculate again to ensure we have the latest elements
          updateFocusableElements();
          const latestFirstElement = firstElement;
          if (latestFirstElement && container.contains(latestFirstElement)) {
            latestFirstElement.focus();
          }
        }, 0);
      }
    }, 0);

    /**
     * Handle Tab key navigation
     */
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key !== "Tab") {
        return;
      }

      // Update focusable elements in case DOM changed
      updateFocusableElements();

      if (focusableElements.length === 0) {
        return;
      }

      const isShiftTab = event.shiftKey;
      const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

      if (isShiftTab && document.activeElement === firstElement) {
        // Shift+Tab: wrap to last
        event.preventDefault();
        lastElement?.focus();
      } else if (!isShiftTab && document.activeElement === lastElement) {
        // Tab: wrap to first
        event.preventDefault();
        firstElement?.focus();
      } else if (!isShiftTab && currentIndex >= 0 && currentIndex < focusableElements.length - 1) {
        // Tab: focus next element
        const nextIndex = currentIndex + 1;
        focusableElements[nextIndex]?.focus();
      } else if (isShiftTab && currentIndex > 0) {
        // Shift+Tab: focus previous element
        const prevIndex = currentIndex - 1;
        focusableElements[prevIndex]?.focus();
      }
    }

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimeoutId);
      container.removeEventListener("keydown", handleKeyDown);

      // Return focus to previous element or returnFocusRef
      // Use setTimeout with a small delay to ensure focus restoration happens
      // after DOM updates and component unmounting is complete
      // This works better in test environments than immediate focus
      setTimeout(() => {
        // Try returnFocusRef first (use captured value from effect execution)
        if (returnFocusElement) {
          // Verify element is still in DOM before focusing
          if (document.body.contains(returnFocusElement)) {
            try {
              returnFocusElement.focus();
              return;
            } catch {
              // If focus fails, fall through to previous element
            }
          }
        }

        // Fallback to previous active element
        if (previousActiveElementRef.current) {
          const element = previousActiveElementRef.current;
          // Verify element is still in DOM before focusing
          if (document.body.contains(element)) {
            try {
              element.focus();
            } catch {
              // If focus fails, silently ignore
            }
          }
        }
      }, 10);
    };
  }, [enabled, containerRef, returnFocusRef, additionalFocusableElements]);
}
