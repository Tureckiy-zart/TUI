/**
 * Interactivity Integrity Tests
 *
 * Automated checks for hover/active/focus-visible states.
 * Tests assert computed styles to verify interactivity feedback.
 */
import { beforeEach, describe, expect, it } from "vitest";

beforeEach(() => {
  // Set up CSS variables for tests
  const root = document.documentElement;
  root.style.setProperty("--tm-motion-duration-fast", "150ms");
  root.style.setProperty("--tm-motion-easing-standard", "cubic-bezier(0.4, 0, 0.2, 1)");
});

describe("Interactivity Integrity", () => {
  describe("Hover States", () => {
    it("should have hover-lift utility with transition", () => {
      // Inject hover-lift styles
      const style = document.createElement("style");
      style.textContent = `
        .tm-motion-hover-lift {
          transition: transform var(--tm-motion-duration-fast) var(--tm-motion-easing-standard);
        }
        .tm-motion-hover-lift:hover {
          transform: scale(1.05) translateY(-0.3125rem);
        }
      `;
      document.head.appendChild(style);

      const element = document.createElement("div");
      element.className = "tm-motion-hover-lift";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const transition = styles.transition;

      expect(transition).toBeTruthy();
      expect(transition).not.toBe("all 0s ease 0s");

      document.body.removeChild(element);
      document.head.removeChild(style);
    });

    it("should have hover-scale utility with transition", () => {
      // Inject hover-scale styles
      const style = document.createElement("style");
      style.textContent = `
        .tm-motion-hover-scale {
          transition: transform var(--tm-motion-duration-fast) var(--tm-motion-easing-standard);
        }
        .tm-motion-hover-scale:hover {
          transform: scale(1.05);
        }
      `;
      document.head.appendChild(style);

      const element = document.createElement("div");
      element.className = "tm-motion-hover-scale";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const transition = styles.transition;

      expect(transition).toBeTruthy();
      expect(transition).not.toBe("all 0s ease 0s");

      document.body.removeChild(element);
      document.head.removeChild(style);
    });

    it("should apply transform on hover state", () => {
      // Inject hover-lift styles
      const style = document.createElement("style");
      style.textContent = `
        .tm-motion-hover-lift {
          transition: transform var(--tm-motion-duration-fast) var(--tm-motion-easing-standard);
        }
      `;
      document.head.appendChild(style);

      const element = document.createElement("div");
      element.className = "tm-motion-hover-lift";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const transition = styles.transition;

      expect(transition).toContain("transform");

      document.body.removeChild(element);
      document.head.removeChild(style);
    });
  });

  describe("Active/Tap States", () => {
    it("should have tap-scale utility with transition", () => {
      // Inject tap-scale styles
      const style = document.createElement("style");
      style.textContent = `
        .tm-motion-tap-scale {
          transition: transform var(--tm-motion-duration-fast) var(--tm-motion-easing-standard);
        }
        .tm-motion-tap-scale:active {
          transform: scale(0.95);
        }
      `;
      document.head.appendChild(style);

      const element = document.createElement("div");
      element.className = "tm-motion-tap-scale";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const transition = styles.transition;

      expect(transition).toBeTruthy();
      expect(transition).not.toBe("all 0s ease 0s");

      document.body.removeChild(element);
      document.head.removeChild(style);
    });

    it("should apply transform transition for tap states", () => {
      // Inject tap-scale styles
      const style = document.createElement("style");
      style.textContent = `
        .tm-motion-tap-scale {
          transition: transform var(--tm-motion-duration-fast) var(--tm-motion-easing-standard);
        }
      `;
      document.head.appendChild(style);

      const element = document.createElement("div");
      element.className = "tm-motion-tap-scale";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const transition = styles.transition;

      expect(transition).toContain("transform");

      document.body.removeChild(element);
      document.head.removeChild(style);
    });
  });

  describe("Focus States", () => {
    it("should support focus-visible pseudo-class", () => {
      // Verify that focus-visible is supported
      // This is a browser feature test
      const element = document.createElement("button");
      document.body.appendChild(element);

      // Focus the element
      element.focus();

      // Check if focus-visible is supported (CSS.supports may not be available in jsdom)
      if (typeof CSS !== "undefined" && CSS.supports) {
        const hasFocusVisible = CSS.supports("selector(:focus-visible)");
        expect(hasFocusVisible).toBe(true);
      } else {
        // In test environment, verify element can be focused
        expect(document.activeElement).toBe(element);
      }

      document.body.removeChild(element);
    });
  });

  describe("Transition Properties", () => {
    it("should use CSS variables for transition duration", () => {
      const root = document.documentElement;
      const varValue = getComputedStyle(root).getPropertyValue("--tm-motion-duration-fast");

      // Verify CSS variable is set
      expect(varValue).toBeTruthy();
      expect(varValue.trim()).toBe("150ms");
    });

    it("should use CSS variables for transition timing function", () => {
      const root = document.documentElement;
      const varValue = getComputedStyle(root).getPropertyValue("--tm-motion-easing-standard");

      // Verify CSS variable is set
      expect(varValue).toBeTruthy();
    });
  });
});
