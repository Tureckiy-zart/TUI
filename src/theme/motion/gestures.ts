/**
 * Gesture System
 *
 * SSR-safe gesture detection using pointer events.
 * Supports swipe gestures for dismissible components (Toast, NotificationPanel, Drawer).
 */

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Swipe direction type
 */
export type SwipeDirection = "left" | "right" | "up" | "down";

/**
 * Swipe event data
 */
export interface SwipeEvent {
  direction: SwipeDirection;
  distance: number;
  velocity: number;
}

/**
 * useSwipe hook options
 */
export interface UseSwipeOptions {
  /**
   * Minimum distance (in pixels) to trigger a swipe
   * @default 50
   */
  threshold?: number;

  /**
   * Minimum velocity (pixels per ms) to trigger a swipe
   * @default 0.1
   */
  velocityThreshold?: number;

  /**
   * Allowed swipe directions
   * @default ['left', 'right', 'up', 'down']
   */
  directions?: SwipeDirection[];

  /**
   * Callback when swipe is detected
   */
  onSwipe?: (event: SwipeEvent) => void;

  /**
   * Whether swipe detection is enabled
   * @default true
   */
  enabled?: boolean;
}

/**
 * useSwipe hook return type
 */
export interface UseSwipeReturn {
  /**
   * Whether a swipe is currently in progress
   */
  isSwiping: boolean;

  /**
   * Current swipe distance
   */
  distance: number;

  /**
   * Current swipe direction (if swiping)
   */
  direction: SwipeDirection | null;
}

/**
 * Hook to detect swipe gestures using pointer events
 * SSR-safe: only uses DOM APIs inside useEffect
 *
 * @param options - Swipe detection options
 * @returns Swipe state and handlers
 */
export function useSwipe(options: UseSwipeOptions = {}): UseSwipeReturn & {
  handlers: { ref: React.RefCallback<HTMLElement> } & Omit<
    React.HTMLAttributes<HTMLElement>,
    "ref"
  >;
} {
  const {
    threshold = 50,
    velocityThreshold = 0.1,
    directions = ["left", "right", "up", "down"],
    onSwipe,
    enabled = true,
  } = options;

  const [isSwiping, setIsSwiping] = useState(false);
  const [distance, setDistance] = useState(0);
  const [direction, setDirection] = useState<SwipeDirection | null>(null);

  const startPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // SSR-safe: only run in browser
    if (typeof window === "undefined" || !enabled) {
      return;
    }

    const element = elementRef.current;
    if (!element) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      // Only handle primary pointer (left mouse button or first touch)
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      startPosRef.current = {
        x: event.clientX,
        y: event.clientY,
        time: Date.now(),
      };

      setIsSwiping(true);
      setDistance(0);
      setDirection(null);

      // Capture pointer to track movement outside element
      element.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!startPosRef.current) {
        return;
      }

      const deltaX = event.clientX - startPosRef.current.x;
      const deltaY = event.clientY - startPosRef.current.y;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Determine primary direction
      let currentDirection: SwipeDirection | null = null;
      let currentDistance = 0;

      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        currentDistance = absDeltaX;
        if (deltaX > 0 && directions.includes("right")) {
          currentDirection = "right";
        } else if (deltaX < 0 && directions.includes("left")) {
          currentDirection = "left";
        }
      } else {
        // Vertical swipe
        currentDistance = absDeltaY;
        if (deltaY > 0 && directions.includes("down")) {
          currentDirection = "down";
        } else if (deltaY < 0 && directions.includes("up")) {
          currentDirection = "up";
        }
      }

      setDistance(currentDistance);
      setDirection(currentDirection);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!startPosRef.current) {
        return;
      }

      const deltaX = event.clientX - startPosRef.current.x;
      const deltaY = event.clientY - startPosRef.current.y;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);
      const deltaTime = Date.now() - startPosRef.current.time;
      const velocity = Math.max(absDeltaX, absDeltaY) / deltaTime;

      // Determine swipe direction
      let swipeDirection: SwipeDirection | null = null;
      let swipeDistance = 0;

      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        swipeDistance = absDeltaX;
        if (deltaX > 0 && directions.includes("right")) {
          swipeDirection = "right";
        } else if (deltaX < 0 && directions.includes("left")) {
          swipeDirection = "left";
        }
      } else {
        // Vertical swipe
        swipeDistance = absDeltaY;
        if (deltaY > 0 && directions.includes("down")) {
          swipeDirection = "down";
        } else if (deltaY < 0 && directions.includes("up")) {
          swipeDirection = "up";
        }
      }

      // Check if swipe meets threshold
      if (swipeDirection && swipeDistance >= threshold && velocity >= velocityThreshold) {
        onSwipe?.({
          direction: swipeDirection,
          distance: swipeDistance,
          velocity,
        });
      }

      // Reset state
      startPosRef.current = null;
      setIsSwiping(false);
      setDistance(0);
      setDirection(null);

      // Release pointer capture
      element.releasePointerCapture(event.pointerId);
    };

    const handlePointerCancel = (event: PointerEvent) => {
      startPosRef.current = null;
      setIsSwiping(false);
      setDistance(0);
      setDirection(null);
      element.releasePointerCapture(event.pointerId);
    };

    // Add event listeners
    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerup", handlePointerUp);
    element.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      // Cleanup
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerup", handlePointerUp);
      element.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [threshold, velocityThreshold, directions, onSwipe, enabled]);

  return {
    isSwiping,
    distance,
    direction,
    handlers: {
      ref: (node: HTMLElement | null) => {
        elementRef.current = node;
      },
    },
  };
}
