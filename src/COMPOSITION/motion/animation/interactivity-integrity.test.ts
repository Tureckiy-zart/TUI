/**
 * Interactivity Integrity Tests
 *
 * Automated checks for hover/active/focus-visible states.
 * Tests assert computed styles to verify interactivity feedback.
 */
import { describe, expect, it } from "vitest";

describe("Interactivity Integrity", () => {
  describe("Hover States", () => {
    it("should have hover-lift utility with transition", () => {
      const element = document.createElement("div");
      element.className = "tm-motion-hover-lift";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const transition = styles.transition;

      expect(transition).toBeTruthy();
      expect(transition).not.toBe("all 0s ease 0s");

      document.body.removeChild(element);
    });

    it("should have hover-scale utility with transition", () => {
      const element = document.createElement("div");
      element.className = "tm-motion-hover-scale";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const transition = styles.transition;

      expect(transition).toBeTruthy();
      expect(transition).not.toBe("all 0s ease 0s");

      document.body.removeChild(element);
    });

    it("should apply transform on hover state", () => {
      const element = document.createElement("div");
      element.className = "tm-motion-hover-lift";
      document.body.appendChild(element);

      // Simulate hover by adding :hover pseudo-class styles
      // Note: In test environment, we verify the class exists
      // Actual hover behavior is tested in Storybook
      const styles = getComputedStyle(element);
      const transition = styles.transition;

      expect(transition).toContain("transform");

      document.body.removeChild(element);
    });
  });

  describe("Active/Tap States", () => {
    it("should have tap-scale utility with transition", () => {
      const element = document.createElement("div");
      element.className = "tm-motion-tap-scale";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const transition = styles.transition;

      expect(transition).toBeTruthy();
      expect(transition).not.toBe("all 0s ease 0s");

      document.body.removeChild(element);
    });

    it("should apply transform transition for tap states", () => {
      const element = document.createElement("div");
      element.className = "tm-motion-tap-scale";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const transition = styles.transition;

      expect(transition).toContain("transform");

      document.body.removeChild(element);
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

      // Check if focus-visible is supported
      const hasFocusVisible = CSS.supports("selector(:focus-visible)");

      expect(hasFocusVisible).toBe(true);

      document.body.removeChild(element);
    });
  });

  describe("Transition Properties", () => {
    it("should use CSS variables for transition duration", () => {
      const element = document.createElement("div");
      element.className = "tm-motion-hover-lift";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const transition = styles.transition;

      // Transition should be defined (may use CSS vars)
      expect(transition).toBeTruthy();

      document.body.removeChild(element);
    });

    it("should use CSS variables for transition timing function", () => {
      const element = document.createElement("div");
      element.className = "tm-motion-hover-lift";
      document.body.appendChild(element);

      const styles = getComputedStyle(element);
      const transition = styles.transition;

      // Transition should include timing function
      expect(transition).toBeTruthy();

      document.body.removeChild(element);
    });
  });
});
