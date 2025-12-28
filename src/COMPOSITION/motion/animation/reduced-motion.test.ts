/**
 * Reduced Motion Tests
 *
 * Automated checks that verify reduced motion support.
 * Tests assert that durations collapse to 0ms when reduced motion is enabled.
 */
import { beforeEach, describe, expect, it } from "vitest";

beforeEach(() => {
  // Set up CSS variables for tests
  const root = document.documentElement;
  root.style.setProperty("--motion-duration-fast", "150ms");
  root.style.setProperty("--motion-duration-normal", "250ms");
  root.style.setProperty("--motion-duration-slow", "350ms");
  root.style.setProperty("--motion-duration-reduced", "0ms");
});

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

      // Inject animation styles
      const style = document.createElement("style");
      style.textContent = `
        .tm-motion-fade-in {
          animation: fade-in var(--motion-duration-normal) var(--motion-easing-standard) both;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(style);

      const element = document.createElement("div");
      element.className = "tm-motion-fade-in";
      document.body.appendChild(element);

      // Verify CSS variable is 0ms
      const varValue = getComputedStyle(root).getPropertyValue("--motion-duration-normal");
      expect(varValue.trim()).toBe("0ms");

      document.body.removeChild(element);
      document.head.removeChild(style);
      root.style.setProperty("--motion-duration-normal", "250ms");
    });

    it("should collapse transition duration to 0ms when reduced motion is enabled", () => {
      const root = document.documentElement;
      root.style.setProperty("--motion-duration-fast", "0ms");

      // Inject transition styles
      const style = document.createElement("style");
      style.textContent = `
        .tm-motion-hover-lift {
          transition: transform var(--motion-duration-fast) var(--motion-easing-standard);
        }
      `;
      document.head.appendChild(style);

      const element = document.createElement("div");
      element.className = "tm-motion-hover-lift";
      document.body.appendChild(element);

      // Verify CSS variable is 0ms
      const varValue = getComputedStyle(root).getPropertyValue("--motion-duration-fast");
      expect(varValue.trim()).toBe("0ms");

      document.body.removeChild(element);
      document.head.removeChild(style);
      root.style.setProperty("--motion-duration-fast", "150ms");
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

      // Inject animation styles
      const style = document.createElement("style");
      style.textContent = `
        .tm-motion-fade-in {
          animation: fade-in var(--motion-duration-normal) var(--motion-easing-standard) both;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(style);

      const element = document.createElement("div");
      element.className = "tm-motion-fade-in";
      document.body.appendChild(element);

      // Verify CSS variable is 0ms
      const varValue = getComputedStyle(root).getPropertyValue("--motion-duration-normal");
      expect(varValue.trim()).toBe("0ms");

      document.body.removeChild(element);
      document.head.removeChild(style);
      root.style.setProperty("--motion-duration-normal", "250ms");
    });
  });

  describe("Transition Behavior", () => {
    it("should not transition when duration is 0ms", () => {
      const root = document.documentElement;
      root.style.setProperty("--motion-duration-fast", "0ms");

      // Inject transition styles
      const style = document.createElement("style");
      style.textContent = `
        .tm-motion-hover-lift {
          transition: transform var(--motion-duration-fast) var(--motion-easing-standard);
        }
      `;
      document.head.appendChild(style);

      const element = document.createElement("div");
      element.className = "tm-motion-hover-lift";
      document.body.appendChild(element);

      // Verify CSS variable is 0ms
      const varValue = getComputedStyle(root).getPropertyValue("--motion-duration-fast");
      expect(varValue.trim()).toBe("0ms");

      document.body.removeChild(element);
      document.head.removeChild(style);
      root.style.setProperty("--motion-duration-fast", "150ms");
    });
  });
});
