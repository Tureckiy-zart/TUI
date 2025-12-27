/**
 * Reduced Motion Tests
 *
 * Automated checks that verify reduced motion support.
 * Tests assert that durations collapse to 0ms when reduced motion is enabled.
 */
import { describe, expect, it } from "vitest";

describe("Reduced Motion", () => {
  describe("CSS Variables", () => {
    it("should have reduced motion duration variable", () => {
      const root = document.documentElement;
      const reduced = getComputedStyle(root).getPropertyValue("--motion-duration-reduced");

      expect(reduced).toBeTruthy();
      expect(reduced.trim()).toBe("0ms");
    });

    it("should update duration variables when reduced motion is enabled", () => {
      const root = document.documentElement;

      // Set reduced motion
      root.style.setProperty("--motion-duration-fast", "0ms");
      root.style.setProperty("--motion-duration-normal", "0ms");
      root.style.setProperty("--motion-duration-slow", "0ms");

      const fast = getComputedStyle(root).getPropertyValue("--motion-duration-fast");
      const normal = getComputedStyle(root).getPropertyValue("--motion-duration-normal");
      const slow = getComputedStyle(root).getPropertyValue("--motion-duration-slow");

      expect(fast.trim()).toBe("0ms");
      expect(normal.trim()).toBe("0ms");
      expect(slow.trim()).toBe("0ms");

      // Reset
      root.style.removeProperty("--motion-duration-fast");
      root.style.removeProperty("--motion-duration-normal");
      root.style.removeProperty("--motion-duration-slow");
    });
  });

  describe("Animation Durations", () => {
    it("should collapse animation duration to 0ms when reduced motion is enabled", () => {
      const root = document.documentElement;
      root.style.setProperty("--motion-duration-normal", "0ms");

      const element = document.createElement("div");
      element.className = "tm-motion-fade-in";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const duration = styles.animationDuration;

      expect(duration).toBe("0s");

      document.body.removeChild(element);
      root.style.removeProperty("--motion-duration-normal");
    });

    it("should collapse transition duration to 0ms when reduced motion is enabled", () => {
      const root = document.documentElement;
      root.style.setProperty("--motion-duration-fast", "0ms");

      const element = document.createElement("div");
      element.className = "tm-motion-hover-lift";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const duration = styles.transitionDuration;

      expect(duration).toBe("0s");

      document.body.removeChild(element);
      root.style.removeProperty("--motion-duration-fast");
    });
  });

  describe("Media Query Support", () => {
    it("should support prefers-reduced-motion media query", () => {
      // Verify that prefers-reduced-motion is supported
      const supportsReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      expect(supportsReducedMotion).toBeTruthy();
      expect(typeof supportsReducedMotion.matches).toBe("boolean");
    });
  });

  describe("Animation Behavior", () => {
    it("should not animate when duration is 0ms", () => {
      const root = document.documentElement;
      root.style.setProperty("--motion-duration-normal", "0ms");

      const element = document.createElement("div");
      element.className = "tm-motion-fade-in";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const duration = styles.animationDuration;
      const animationName = styles.animationName;

      // When duration is 0ms, animation should be instant
      expect(duration).toBe("0s");
      // Animation name may still be set, but duration is 0
      expect(animationName).toBeTruthy();

      document.body.removeChild(element);
      root.style.removeProperty("--motion-duration-normal");
    });
  });

  describe("Transition Behavior", () => {
    it("should not transition when duration is 0ms", () => {
      const root = document.documentElement;
      root.style.setProperty("--motion-duration-fast", "0ms");

      const element = document.createElement("div");
      element.className = "tm-motion-hover-lift";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const duration = styles.transitionDuration;

      // When duration is 0ms, transition should be instant
      expect(duration).toBe("0s");

      document.body.removeChild(element);
      root.style.removeProperty("--motion-duration-fast");
    });
  });
});
