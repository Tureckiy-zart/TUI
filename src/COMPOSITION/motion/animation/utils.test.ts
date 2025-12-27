import { describe, expect, it } from "vitest";
import type { ComponentAnimationConfig } from "./types";
import { resolveComponentAnimations } from "./utils";

describe("resolveComponentAnimations", () => {
  it("should return empty object when config is undefined", () => {
    const result = resolveComponentAnimations();
    expect(result).toEqual({});
  });

  it("should resolve fadeIn animation preset", () => {
    const config: ComponentAnimationConfig = {
      animation: "fadeIn",
    };
    const result = resolveComponentAnimations(config);
    expect(result.className).toBe("tm-motion-fade-in");
  });

  it("should resolve fadeInUp animation preset", () => {
    const config: ComponentAnimationConfig = {
      animation: "fadeInUp",
    };
    const result = resolveComponentAnimations(config);
    expect(result.className).toBe("tm-motion-fade-slide-up");
  });

  it("should resolve slideInUp animation preset", () => {
    const config: ComponentAnimationConfig = {
      animation: "slideInUp",
    };
    const result = resolveComponentAnimations(config);
    expect(result.className).toBe("tm-motion-slide-up");
  });

  it("should resolve scaleIn animation preset", () => {
    const config: ComponentAnimationConfig = {
      animation: "scaleIn",
    };
    const result = resolveComponentAnimations(config);
    expect(result.className).toBe("tm-motion-scale-in");
  });

  it("should resolve hoverLift hover animation preset", () => {
    const config: ComponentAnimationConfig = {
      hoverAnimation: "hoverLift",
    };
    const result = resolveComponentAnimations(config);
    expect(result.className).toBe("tm-motion-hover-lift");
  });

  it("should resolve hoverScale hover animation preset", () => {
    const config: ComponentAnimationConfig = {
      hoverAnimation: "hoverScale",
    };
    const result = resolveComponentAnimations(config);
    expect(result.className).toBe("tm-motion-hover-scale");
  });

  it("should resolve tapScale hover animation preset", () => {
    const config: ComponentAnimationConfig = {
      hoverAnimation: "tapScale",
    };
    const result = resolveComponentAnimations(config);
    expect(result.className).toBe("tm-motion-tap-scale");
  });

  it("should merge animation and hoverAnimation", () => {
    const config: ComponentAnimationConfig = {
      animation: "fadeIn",
      hoverAnimation: "hoverLift",
    };
    const result = resolveComponentAnimations(config);
    // Both animations are merged, hoverAnimation takes priority for className
    expect(result.className).toBe("tm-motion-hover-lift");
  });

  it("should use custom animationProps when provided", () => {
    const config: ComponentAnimationConfig = {
      animation: "fadeIn",
      animationProps: {
        className: "custom-animation",
      },
    };
    const result = resolveComponentAnimations(config);
    expect(result.className).toBe("custom-animation");
  });

  it("should return undefined for unknown preset names", () => {
    const config: ComponentAnimationConfig = {
      animation: "unknownPreset",
    };
    const result = resolveComponentAnimations(config);
    expect(result.className).toBeUndefined();
  });
});
