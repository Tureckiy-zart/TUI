import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createTransition,
  durations,
  easings,
  reducedMotion,
  shouldEnableAnimations,
  shouldReduceMotion,
  transitions,
} from "./tas";

describe("shouldReduceMotion", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return true when override is true", () => {
    expect(shouldReduceMotion(true)).toBe(true);
  });

  it("should return false when override is false", () => {
    expect(shouldReduceMotion(false)).toBe(false);
  });

  it("should return false in SSR context (no window)", () => {
    const originalWindow = global.window;
    // @ts-expect-error - intentionally removing window for SSR test
    delete global.window;

    expect(shouldReduceMotion()).toBe(false);

    global.window = originalWindow;
  });

  it("should check system preference when override is undefined", () => {
    const mockMatchMedia = vi.fn().mockReturnValue({
      matches: true,
    });
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: mockMatchMedia,
    });

    expect(shouldReduceMotion()).toBe(true);
    expect(mockMatchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });

  it("should check system preference when override is 'auto'", () => {
    const mockMatchMedia = vi.fn().mockReturnValue({
      matches: false,
    });
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: mockMatchMedia,
    });

    expect(shouldReduceMotion("auto")).toBe(false);
    expect(mockMatchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
  });

  it("should return false when matchMedia throws", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => {
        throw new Error("matchMedia not available");
      }),
    });

    expect(shouldReduceMotion()).toBe(false);
  });
});

describe("createTransition", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return reduced motion transition when reduced motion is enabled", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList);

    const result = createTransition();
    expect(result).toBe(reducedMotion.transition);
  });

  it("should use predefined transition when transitionName is provided", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList);

    // Use first available transition
    const transitionName = Object.keys(transitions)[0] as keyof typeof transitions;
    const result = createTransition(transitionName);
    expect(result).toBe(transitions[transitionName]);
  });

  it("should use default duration and easing when no custom values provided", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList);

    const result = createTransition();
    expect(result).toContain(durations.normal);
    expect(result).toContain(easings["ease-in-out"]);
  });

  it("should use custom duration token when provided", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList);

    const result = createTransition(undefined, "fast");
    expect(result).toContain(durations.fast);
  });

  it("should use custom easing token when provided", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList);

    const result = createTransition(undefined, undefined, "ease-out");
    expect(result).toContain(easings["ease-out"]);
  });

  it("should allow raw CSS duration string as fallback", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList);

    const result = createTransition(undefined, "250ms");
    expect(result).toContain("250ms");
  });

  it("should allow raw CSS easing string as fallback", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList);

    const result = createTransition(undefined, undefined, "cubic-bezier(0.5, 0, 0.5, 1)");
    expect(result).toContain("cubic-bezier(0.5, 0, 0.5, 1)");
  });
});

describe("shouldEnableAnimations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return false when globalEnable is false", () => {
    expect(shouldEnableAnimations(false)).toBe(false);
  });

  it("should return false when reduced motion is enabled", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList);

    expect(shouldEnableAnimations()).toBe(false);
  });

  it("should return true when animations are enabled and reduced motion is disabled", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList);

    expect(shouldEnableAnimations()).toBe(true);
  });

  it("should respect reduceMotionOverride", () => {
    expect(shouldEnableAnimations(undefined, true)).toBe(false);
    expect(shouldEnableAnimations(undefined, false)).toBe(true);
  });
});
