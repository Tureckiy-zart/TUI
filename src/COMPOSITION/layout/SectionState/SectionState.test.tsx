import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { axeCheck, renderWithTheme } from "../../../test/test-utils";

import { SectionState } from "./SectionState";

describe("SectionState", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      const { container } = render(<SectionState>Content</SectionState>);
      const element = container.firstChild;
      expect(element).not.toBeNull();
    });

    // Add if component uses forwardRef:
    // it("forwards ref to root element", () => {
    //   const ref = { current: null as HTMLElement | null };
    //   render(<SectionState ref={ref}>Content</SectionState>);
    //   expect(ref.current).toBeInstanceOf(HTMLElement);
    // });
  });

  describe("Variants", () => {
    it("renders error and empty variants", () => {
      const variants = ["empty", "error"] as const;
      variants.forEach((variant) => {
        const { unmount } = render(<SectionState variant={variant}>Content</SectionState>);
        expect(screen.getByText("Content")).toBeTruthy();
        const root = screen.getByText("Content").closest("[data-variant]");
        expect(root).not.toBeNull();
        if (root) {
          expect(root.getAttribute("data-variant")).toBe(variant);
        }
        unmount();
      });
    });
  });

  // Add if component has size prop:
  // describe("Sizes", () => {
  //   it("renders each size", () => {
  //     const sizes = ["sm", "md", "lg"] as const;
  //     sizes.forEach((s) => {
  //       const { unmount } = render(<SectionState size={s}>Content</SectionState>);
  //       expect(screen.getByText("Content")).toBeInTheDocument();
  //       unmount();
  //     });
  //   });
  // });

  // Add if component has disabled/loading/invalid:
  // describe("States", () => {
  //   it("applies disabled state", () => { ... });
  // });

  describe("Accessibility", () => {
    it("passes axe when rendered with required attributes", async () => {
      const { container } = renderWithTheme(
        <SectionState aria-label="Test sectionState">Content</SectionState>,
      );
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  // Add if component is interactive:
  // describe("Interactions", () => {
  //   it("handles click", async () => { ... });
  // });

  // Add if component has asChild prop:
  // describe("asChild", () => {
  //   it("renders as child element when asChild is true", () => { ... });
  // });
});
