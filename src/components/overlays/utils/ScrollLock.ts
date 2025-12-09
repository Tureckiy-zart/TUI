"use client";

/**
 * ScrollLock Utility
 *
 * Utility for preventing body scroll when overlay is open.
 * Handles scrollbar width compensation to prevent layout shift.
 * SSR-safe.
 */

import * as React from "react";

interface ScrollLockOptions {
  /**
   * Whether scroll lock is enabled
   */
  enabled: boolean;
}

/**
 * Get scrollbar width
 */
function getScrollbarWidth(): number {
  if (typeof window === "undefined") {
    return 0;
  }

  // Create a temporary element to measure scrollbar width
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  // @ts-expect-error - msOverflowStyle is IE-specific but helps with measurement
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
}

/**
 * ScrollLock hook for preventing body scroll
 */
export function useScrollLock({ enabled }: ScrollLockOptions): void {
  const scrollbarWidthRef = React.useRef<number>(0);
  const originalOverflowRef = React.useRef<string>("");
  const originalPaddingRightRef = React.useRef<string>("");

  React.useEffect(() => {
    if (typeof window === "undefined" || !enabled) {
      return;
    }

    const { body } = document;
    const html = document.documentElement;

    // Store original values
    originalOverflowRef.current = body.style.overflow;
    originalPaddingRightRef.current = body.style.paddingRight;

    // Calculate scrollbar width
    const scrollbarWidth = getScrollbarWidth();
    scrollbarWidthRef.current = scrollbarWidth;

    // Apply scroll lock
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    // Compensate for scrollbar width to prevent layout shift
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      // Restore original values
      body.style.overflow = originalOverflowRef.current;
      html.style.overflow = "";
      body.style.paddingRight = originalPaddingRightRef.current;
    };
  }, [enabled]);
}
