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
    return !el.hasAttribute("disabled") && el.offsetParent !== null;
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

    // Store the previously focused element
    if (previousActiveElement && container.contains(previousActiveElement)) {
      previousActiveElementRef.current = previousActiveElement;
    } else {
      previousActiveElementRef.current = previousActiveElement;
    }

    // Get all focusable elements
    const focusableElements = [
      ...getFocusableElements(container),
      ...additionalFocusableElements,
    ].filter(Boolean);

    if (focusableElements.length === 0) {
      return;
    }

    // Focus the first element
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstElement?.focus();

    /**
     * Handle Tab key navigation
     */
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key !== "Tab") {
        return;
      }

      const isShiftTab = event.shiftKey;

      if (isShiftTab) {
        // Shift+Tab: focus previous element or wrap to last
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab: focus next element or wrap to first
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);

      // Return focus to previous element or returnFocusRef
      if (returnFocusRef?.current) {
        returnFocusRef.current.focus();
      } else if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [enabled, containerRef, returnFocusRef, additionalFocusableElements]);
}
