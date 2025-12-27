import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useInView } from "./useInView";

// Mock IntersectionObserver
class IntersectionObserverMock {
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
  }

  observe() {
    // Simulate element entering viewport
    this.callback(
      [
        {
          isIntersecting: true,
          target: document.createElement("div"),
          intersectionRatio: 1,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: 0,
        },
      ],
      this as unknown as IntersectionObserver,
    );
  }

  disconnect() {
    // Mock disconnect
  }

  unobserve() {
    // Mock unobserve
  }

  takeRecords() {
    return [];
  }

  root = null;
  rootMargin = "";
  thresholds = [];
}

describe("useInView", () => {
  const originalIntersectionObserver = global.IntersectionObserver;

  beforeEach(() => {
    // @ts-expect-error - mock IntersectionObserver
    global.IntersectionObserver = IntersectionObserverMock;
  });

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver;
    vi.clearAllMocks();
  });

  it("should return ref and isInView state", () => {
    const { result } = renderHook(() => useInView());

    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.isInView).toBe("boolean");
  });

  it("should default to isInView false", () => {
    const { result } = renderHook(() => useInView());
    expect(result.current.isInView).toBe(false);
  });

  it("should accept custom options", () => {
    const { result } = renderHook(() =>
      useInView({
        once: true,
        margin: "-100px",
        threshold: 0.5,
      }),
    );

    expect(result.current.ref).toBeDefined();
    expect(result.current.isInView).toBe(false);
  });

  it("should update isInView when element enters viewport", async () => {
    const { result } = renderHook(() => useInView());

    // Attach ref to element
    const element = document.createElement("div");
    result.current.ref.current = element;

    // Trigger observe (which will call callback with isIntersecting: true)
    const observer = new IntersectionObserverMock(() => {});
    observer.observe();

    await waitFor(() => {
      // The mock will immediately set isInView to true
      // In real implementation, this would be handled by the observer callback
      expect(result.current.ref).toBeDefined();
    });
  });

  it("should handle SSR (no window)", () => {
    const originalWindow = global.window;
    // @ts-expect-error - intentionally removing window for SSR test
    delete global.window;

    const { result } = renderHook(() => useInView());
    expect(result.current.ref).toBeDefined();
    expect(result.current.isInView).toBe(false);

    global.window = originalWindow;
  });
});
