import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createStagger,
  fadePresets,
  hoverPresets,
  revealOnScroll,
  scalePresets,
  slidePresets,
} from "./presets";

describe("fadePresets", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
  });

  it("should return fade-in className", () => {
    const result = fadePresets.fadeIn();
    expect(result.className).toBe("tm-motion-fade-in");
  });

  it("should return fade-out className", () => {
    const result = fadePresets.fadeOut();
    expect(result.className).toBe("tm-motion-fade-out");
  });

  it("should return fade-slide-up className for fadeInUp", () => {
    const result = fadePresets.fadeInUp();
    expect(result.className).toBe("tm-motion-fade-slide-up");
  });

  it("should return empty className when reduced motion is enabled", () => {
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

    const result = fadePresets.fadeIn();
    expect(result.className).toBe("");
  });

  it("should respect reducedMotion override", () => {
    const result = fadePresets.fadeIn({ reducedMotion: true });
    expect(result.className).toBe("");
  });
});

describe("slidePresets", () => {
  beforeEach(() => {
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
  });

  it("should return slide-up className for slideInUp", () => {
    const result = slidePresets.slideInUp();
    expect(result.className).toBe("tm-motion-slide-up");
  });

  it("should return slide-down className for slideInDown", () => {
    const result = slidePresets.slideInDown();
    expect(result.className).toBe("tm-motion-slide-down");
  });

  it("should return slide-left className for slideInLeft", () => {
    const result = slidePresets.slideInLeft();
    expect(result.className).toBe("tm-motion-slide-left");
  });

  it("should return slide-right className for slideInRight", () => {
    const result = slidePresets.slideInRight();
    expect(result.className).toBe("tm-motion-slide-right");
  });

  it("should return fade-slide-up-out className for slideOutUp", () => {
    const result = slidePresets.slideOutUp();
    expect(result.className).toBe("tm-motion-fade-slide-up-out");
  });
});

describe("scalePresets", () => {
  beforeEach(() => {
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
  });

  it("should return scale-in className for scaleIn", () => {
    const result = scalePresets.scaleIn();
    expect(result.className).toBe("tm-motion-scale-in");
  });

  it("should return scale-out className for scaleOut", () => {
    const result = scalePresets.scaleOut();
    expect(result.className).toBe("tm-motion-scale-out");
  });

  it("should return hover-scale className for scaleUp", () => {
    const result = scalePresets.scaleUp();
    expect(result.className).toBe("tm-motion-hover-scale");
  });

  it("should return tap-scale className for scaleDown", () => {
    const result = scalePresets.scaleDown();
    expect(result.className).toBe("tm-motion-tap-scale");
  });
});

describe("hoverPresets", () => {
  beforeEach(() => {
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
  });

  it("should return hover-lift className for hoverLift", () => {
    const result = hoverPresets.hoverLift();
    expect(result.className).toBe("tm-motion-hover-lift");
  });

  it("should return hover-scale className for hoverScale", () => {
    const result = hoverPresets.hoverScale();
    expect(result.className).toBe("tm-motion-hover-scale");
  });

  it("should return tap-scale className for tapScale", () => {
    const result = hoverPresets.tapScale();
    expect(result.className).toBe("tm-motion-tap-scale");
  });
});

describe("createStagger", () => {
  it("should return empty className (CSS-only approach doesn't support stagger)", () => {
    const result = createStagger();
    expect(result.className).toBe("");
  });
});

describe("revealOnScroll", () => {
  beforeEach(() => {
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
  });

  it("should default to fadeInUp direction", () => {
    const result = revealOnScroll();
    expect(result.className).toBe("tm-motion-fade-slide-up");
  });

  it("should return fadeInDown for 'down' direction", () => {
    const result = revealOnScroll({ direction: "down" });
    expect(result.className).toBe("tm-motion-fade-slide-down");
  });

  it("should return fadeInLeft for 'left' direction", () => {
    const result = revealOnScroll({ direction: "left" });
    expect(result.className).toBe("tm-motion-fade-slide-left");
  });

  it("should return fadeInRight for 'right' direction", () => {
    const result = revealOnScroll({ direction: "right" });
    expect(result.className).toBe("tm-motion-fade-slide-right");
  });

  it("should return fadeIn for 'fade' direction", () => {
    const result = revealOnScroll({ direction: "fade" });
    expect(result.className).toBe("tm-motion-fade-in");
  });
});
