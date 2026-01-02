import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { SidebarLayout } from "./SidebarLayout";

describe("SidebarLayout component", () => {
  describe("Behavior tests", () => {
    it("should render sidebar and content correctly", () => {
      const { getByText } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      expect(getByText("Sidebar")).toBeInTheDocument();
      expect(getByText("Content")).toBeInTheDocument();
    });

    it("should render sidebar as <aside> element", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const aside = container.querySelector("aside");
      expect(aside).toBeInTheDocument();
      expect(aside?.textContent).toBe("Sidebar");
    });

    it("should render content as <main> element", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
      expect(main?.textContent).toBe("Content");
    });

    it("should apply left sidebar position by default", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const aside = container.querySelector("aside");
      const main = container.querySelector("main");
      const gridContainer = container.firstChild as HTMLElement;

      expect(aside).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      // Verify DOM order: aside comes before main for left position
      expect(gridContainer.children[0]).toBe(aside);
      expect(gridContainer.children[1]).toBe(main);
    });

    it("should apply right sidebar position when sidebarPosition='right'", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} sidebarPosition="right">
          <div>Content</div>
        </SidebarLayout>,
      );

      const aside = container.querySelector("aside");
      const main = container.querySelector("main");
      const gridContainer = container.firstChild as HTMLElement;

      expect(aside).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      // Verify DOM order: main comes before aside for right position
      expect(gridContainer.children[0]).toBe(main);
      expect(gridContainer.children[1]).toBe(aside);
    });

    it("should apply sidebarWidth='sm' correctly", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} sidebarWidth="sm">
          <div>Content</div>
        </SidebarLayout>,
      );

      const gridContainer = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(gridContainer);
      expect(styles.gridTemplateColumns).toContain("var(--spacing-64)");
    });

    it("should apply sidebarWidth='md' correctly (default)", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const gridContainer = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(gridContainer);
      expect(styles.gridTemplateColumns).toContain("var(--spacing-80)");
    });

    it("should apply sidebarWidth='lg' correctly", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} sidebarWidth="lg">
          <div>Content</div>
        </SidebarLayout>,
      );

      const gridContainer = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(gridContainer);
      expect(styles.gridTemplateColumns).toContain("var(--spacing-96)");
    });

    it("should apply gap spacing token correctly", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} gap="lg">
          <div>Content</div>
        </SidebarLayout>,
      );

      const gridContainer = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(gridContainer);
      expect(styles.gap).toBe("var(--spacing-lg)");
    });

    it("should apply default gap='md' when gap is not provided", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const gridContainer = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(gridContainer);
      expect(styles.gap).toBe("var(--spacing-md)");
    });
  });

  describe("Collapse behavior tests", () => {
    it("should render two layouts when collapseAt is provided", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} collapseAt="md">
          <div>Content</div>
        </SidebarLayout>,
      );

      // Should have wrapper Box with two children (Grid layout and Stack layout)
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.children.length).toBe(2);
    });

    it("should apply responsive classes for collapse behavior", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} collapseAt="md">
          <div>Content</div>
        </SidebarLayout>,
      );

      const wrapper = container.firstChild as HTMLElement;
      const gridLayout = wrapper.children[0] as HTMLElement;
      const stackLayout = wrapper.children[1] as HTMLElement;

      // Grid layout should have "hidden md:grid" classes
      expect(gridLayout).toHaveClass("grid", "hidden", "md:grid");

      // Stack layout should have "flex flex-col md:hidden" classes
      expect(stackLayout).toHaveClass("flex", "flex-col", "md:hidden");
    });

    it("should render single Grid layout when collapseAt is not provided", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      // Should have single Grid layout (no wrapper)
      const gridContainer = container.firstChild as HTMLElement;
      expect(gridContainer).toHaveClass("grid");
      expect(gridContainer.children.length).toBe(2); // aside and main
    });
  });

  describe("Edge case tests", () => {
    it("should handle empty sidebar", () => {
      const { container } = render(
        <SidebarLayout sidebar={null}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const aside = container.querySelector("aside");
      expect(aside).toBeInTheDocument();
      expect(aside?.textContent).toBe("");
    });

    it("should handle empty content", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>{null}</SidebarLayout>,
      );

      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
      expect(main?.textContent).toBe("");
    });

    it("should use default sidebarPosition='left' when not provided", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const aside = container.querySelector("aside");
      const main = container.querySelector("main");
      const gridContainer = container.firstChild as HTMLElement;

      // Verify left position (aside before main)
      expect(gridContainer.children[0]).toBe(aside);
      expect(gridContainer.children[1]).toBe(main);
    });

    it("should use default sidebarWidth='md' when not provided", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const gridContainer = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(gridContainer);
      expect(styles.gridTemplateColumns).toContain("var(--spacing-80)");
    });

    it("should use default gap='md' when not provided", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const gridContainer = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(gridContainer);
      expect(styles.gap).toBe("var(--spacing-md)");
    });
  });

  describe("A11Y tests", () => {
    it("should render sidebar as <aside> element (semantic HTML)", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const aside = container.querySelector("aside");
      expect(aside).toBeInTheDocument();
      expect(aside?.tagName).toBe("ASIDE");
    });

    it("should render content as <main> element (semantic HTML)", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const main = container.querySelector("main");
      expect(main).toBeInTheDocument();
      expect(main?.tagName).toBe("MAIN");
    });

    it("should preserve DOM order for accessibility (left sidebar)", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} sidebarPosition="left">
          <div>Content</div>
        </SidebarLayout>,
      );

      const aside = container.querySelector("aside");
      const main = container.querySelector("main");
      const gridContainer = container.firstChild as HTMLElement;

      // DOM order = navigation order (aside before main)
      expect(gridContainer.children[0]).toBe(aside);
      expect(gridContainer.children[1]).toBe(main);
    });

    it("should preserve DOM order for accessibility (right sidebar)", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} sidebarPosition="right">
          <div>Content</div>
        </SidebarLayout>,
      );

      const aside = container.querySelector("aside");
      const main = container.querySelector("main");
      const gridContainer = container.firstChild as HTMLElement;

      // DOM order = navigation order (main before aside)
      expect(gridContainer.children[0]).toBe(main);
      expect(gridContainer.children[1]).toBe(aside);
    });

    it("should apply sidebarAriaLabel to <aside> element when provided", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} sidebarAriaLabel="Main navigation sidebar">
          <div>Content</div>
        </SidebarLayout>,
      );

      const aside = container.querySelector("aside");
      expect(aside).toHaveAttribute("aria-label", "Main navigation sidebar");
    });

    it("should apply mainAriaLabel to <main> element when provided", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} mainAriaLabel="Article content">
          <div>Content</div>
        </SidebarLayout>,
      );

      const main = container.querySelector("main");
      expect(main).toHaveAttribute("aria-label", "Article content");
    });

    it("should apply both sidebarAriaLabel and mainAriaLabel when provided", () => {
      const { container } = render(
        <SidebarLayout
          sidebar={<div>Sidebar</div>}
          sidebarAriaLabel="Left sidebar navigation"
          mainAriaLabel="Main content area"
        >
          <div>Content</div>
        </SidebarLayout>,
      );

      const aside = container.querySelector("aside");
      const main = container.querySelector("main");
      expect(aside).toHaveAttribute("aria-label", "Left sidebar navigation");
      expect(main).toHaveAttribute("aria-label", "Main content area");
    });

    it("should apply aria-label to both layouts when collapseAt is provided", () => {
      const { container } = render(
        <SidebarLayout
          sidebar={<div>Sidebar</div>}
          collapseAt="md"
          sidebarAriaLabel="Navigation sidebar"
          mainAriaLabel="Main content"
        >
          <div>Content</div>
        </SidebarLayout>,
      );

      // Both grid and stack layouts should have aria-label
      const asides = container.querySelectorAll("aside");
      const mains = container.querySelectorAll("main");

      expect(asides).toHaveLength(2); // One in grid, one in stack
      expect(mains).toHaveLength(2); // One in grid, one in stack

      // All should have the same aria-label
      asides.forEach((aside) => {
        expect(aside).toHaveAttribute("aria-label", "Navigation sidebar");
      });
      mains.forEach((main) => {
        expect(main).toHaveAttribute("aria-label", "Main content");
      });
    });

    it("should not apply aria-label when props are not provided", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const aside = container.querySelector("aside");
      const main = container.querySelector("main");
      expect(aside).not.toHaveAttribute("aria-label");
      expect(main).not.toHaveAttribute("aria-label");
    });
  });

  describe("Token compliance tests", () => {
    it("should use spacing tokens for gap (no raw values)", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} gap="xl">
          <div>Content</div>
        </SidebarLayout>,
      );

      const gridContainer = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(gridContainer);
      // Should use CSS variable, not raw pixel value
      expect(styles.gap).toBe("var(--spacing-xl)");
      expect(styles.gap).not.toMatch(/^\d+px$/);
    });

    it("should use CSS variables for sidebar width (no raw values)", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} sidebarWidth="sm">
          <div>Content</div>
        </SidebarLayout>,
      );

      const gridContainer = container.firstChild as HTMLElement;
      const styles = window.getComputedStyle(gridContainer);
      // Should use CSS variable, not raw pixel value
      expect(styles.gridTemplateColumns).toContain("var(--spacing-64)");
      expect(styles.gridTemplateColumns).not.toContain("256px");
    });

    it("should use breakpoint tokens for collapseAt (no raw values)", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} collapseAt="md">
          <div>Content</div>
        </SidebarLayout>,
      );

      const wrapper = container.firstChild as HTMLElement;
      const gridLayout = wrapper.children[0] as HTMLElement;
      const stackLayout = wrapper.children[1] as HTMLElement;

      // Should use Tailwind breakpoint classes (md:), not raw pixel values
      expect(gridLayout).toHaveClass("md:grid");
      expect(stackLayout).toHaveClass("md:hidden");
      // Verify no inline styles with raw pixel values
      expect(gridLayout.style.cssText).not.toContain("768px");
    });
  });

  describe("Ref forwarding", () => {
    it("should forward ref to container element", () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <SidebarLayout ref={ref} sidebar={<div>Sidebar</div>}>
          <div>Content</div>
        </SidebarLayout>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Custom className and style", () => {
    it("should merge custom className", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} className="custom-class">
          <div>Content</div>
        </SidebarLayout>,
      );

      const gridContainer = container.firstChild as HTMLElement;
      expect(gridContainer).toHaveClass("grid", "custom-class");
    });

    it("should merge custom style", () => {
      const { container } = render(
        <SidebarLayout sidebar={<div>Sidebar</div>} style={{ minHeight: "100vh" }}>
          <div>Content</div>
        </SidebarLayout>,
      );

      const gridContainer = container.firstChild as HTMLElement;
      expect(gridContainer).toHaveStyle({ minHeight: "100vh" });
    });
  });
});
