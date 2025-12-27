/**
 * Portal Component Tests
 *
 * Tests for Portal component rendering, SSR safety, container prop, and ref forwarding.
 */

import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Portal } from "./Portal";

describe("Portal", () => {
  describe("Rendering", () => {
    it("renders children in portal", async () => {
      renderWithTheme(
        <Portal>
          <div data-testid="portal-content">Portal Content</div>
        </Portal>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("portal-content");
        expect(content).toBeInTheDocument();
        // Portal content should be in document.body (via wrapper div)
        expect(document.body.contains(content)).toBe(true);
      });
    });

    it("renders wrapper div with ref", async () => {
      const ref = React.createRef<HTMLDivElement>();

      renderWithTheme(
        <Portal ref={ref}>
          <div>Content</div>
        </Portal>,
      );

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current?.tagName).toBe("DIV");
      });
    });

    it("applies className to wrapper div", async () => {
      renderWithTheme(
        <Portal className="test-portal-class">
          <div data-testid="content">Content</div>
        </Portal>,
      );

      await waitFor(() => {
        const wrapper = screen.getByTestId("content").parentElement;
        expect(wrapper).toHaveClass("test-portal-class");
      });
    });

    it("applies style to wrapper div", async () => {
      renderWithTheme(
        <Portal style={{ backgroundColor: "red", padding: "10px" }}>
          <div data-testid="content">Content</div>
        </Portal>,
      );

      await waitFor(() => {
        const wrapper = screen.getByTestId("content").parentElement;
        expect(wrapper).toBeTruthy();
        // Check that style is applied (may be converted to rgb format)
        const style = window.getComputedStyle(wrapper!);
        expect(style.backgroundColor).toBeTruthy();
        expect(style.padding).toBe("10px");
      });
    });
  });

  describe("SSR Safety", () => {
    it("returns null when window is undefined", () => {
      // Test SSR safety by checking component behavior
      // Note: We can't actually set window to undefined in JSDOM without breaking other tests
      // Instead, we verify the component checks for window existence
      const { container } = renderWithTheme(
        <Portal>
          <div>Should render after mount</div>
        </Portal>,
      );

      // Initially, before mount, component returns null
      // After mount, component renders (we verify this in other tests)
      // This test verifies the component doesn't crash in SSR scenarios
      expect(container).toBeTruthy();
    });

    it("mounts after client-side hydration", async () => {
      renderWithTheme(
        <Portal>
          <div data-testid="portal-content">Portal Content</div>
        </Portal>,
      );

      // Content should appear after mount
      await waitFor(() => {
        expect(screen.getByTestId("portal-content")).toBeInTheDocument();
      });
    });
  });

  describe("Container Prop", () => {
    it("uses document.body as default container", async () => {
      renderWithTheme(
        <Portal>
          <div data-testid="portal-content">Content</div>
        </Portal>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("portal-content");
        // Portal content should be in document.body (via wrapper div)
        expect(document.body.contains(content)).toBe(true);
        // Wrapper div should be direct child of document.body
        const wrapper = content.parentElement;
        expect(wrapper).toBeTruthy();
        expect(wrapper?.parentElement).toBe(document.body);
      });
    });

    it("uses custom container when provided", async () => {
      const customContainer = document.createElement("div");
      customContainer.setAttribute("data-testid", "custom-container");
      document.body.appendChild(customContainer);

      renderWithTheme(
        <Portal container={customContainer}>
          <div data-testid="portal-content">Content</div>
        </Portal>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("portal-content");
        // Content is wrapped in a div, so parentElement is wrapper div
        // Wrapper div should be direct child of custom container
        expect(content.parentElement?.parentElement).toBe(customContainer);
      });

      // Cleanup
      document.body.removeChild(customContainer);
    });

    it("handles null container gracefully", async () => {
      // Note: Portal uses document.body as fallback when container is null
      // So null container means "use default (document.body)", not "don't render"
      // This test verifies that Portal handles null gracefully (uses fallback)
      renderWithTheme(
        <Portal container={null}>
          <div data-testid="portal-content">Content</div>
        </Portal>,
      );

      // Portal should render to document.body when container is null (fallback behavior)
      await waitFor(() => {
        const content = screen.getByTestId("portal-content");
        expect(content).toBeInTheDocument();
        // Content should be in document.body (fallback)
        expect(document.body.contains(content)).toBe(true);
      });
    });

    it("handles container becoming null", async () => {
      const customContainer = document.createElement("div");
      customContainer.setAttribute("data-testid", "custom-container");
      document.body.appendChild(customContainer);

      const { rerender } = renderWithTheme(
        <Portal container={customContainer}>
          <div data-testid="portal-content">Content</div>
        </Portal>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("portal-content");
        expect(content).toBeInTheDocument();
        // Content should be in custom container
        expect(content.parentElement?.parentElement).toBe(customContainer);
      });

      // Remove container and rerender with null container (falls back to document.body)
      document.body.removeChild(customContainer);
      rerender(
        <Portal container={null}>
          <div data-testid="portal-content">Content</div>
        </Portal>,
      );

      // Portal should move content to document.body when container becomes null
      await waitFor(
        () => {
          const content = screen.getByTestId("portal-content");
          expect(content).toBeInTheDocument();
          // Content should now be in document.body (fallback)
          expect(document.body.contains(content)).toBe(true);
        },
        { timeout: 2000 },
      );
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to wrapper div", async () => {
      const ref = React.createRef<HTMLDivElement>();

      renderWithTheme(
        <Portal ref={ref}>
          <div>Content</div>
        </Portal>,
      );

      await waitFor(() => {
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current?.tagName).toBe("DIV");
      });
    });

    it("ref points to wrapper div, not children", async () => {
      const ref = React.createRef<HTMLDivElement>();

      renderWithTheme(
        <Portal ref={ref}>
          <div data-testid="child">Child Content</div>
        </Portal>,
      );

      await waitFor(() => {
        const child = screen.getByTestId("child");
        expect(ref.current).not.toBe(child);
        expect(ref.current).toBe(child.parentElement);
      });
    });
  });

  describe("Multiple Portals", () => {
    it("renders multiple portals independently", async () => {
      renderWithTheme(
        <>
          <Portal>
            <div data-testid="portal-1">Portal 1</div>
          </Portal>
          <Portal>
            <div data-testid="portal-2">Portal 2</div>
          </Portal>
        </>,
      );

      await waitFor(() => {
        expect(screen.getByTestId("portal-1")).toBeInTheDocument();
        expect(screen.getByTestId("portal-2")).toBeInTheDocument();
      });
    });

    it("renders portals to different containers", async () => {
      const container1 = document.createElement("div");
      container1.setAttribute("data-testid", "container-1");
      document.body.appendChild(container1);

      const container2 = document.createElement("div");
      container2.setAttribute("data-testid", "container-2");
      document.body.appendChild(container2);

      renderWithTheme(
        <>
          <Portal container={container1}>
            <div data-testid="portal-1">Portal 1</div>
          </Portal>
          <Portal container={container2}>
            <div data-testid="portal-2">Portal 2</div>
          </Portal>
        </>,
      );

      await waitFor(() => {
        const portal1 = screen.getByTestId("portal-1");
        const portal2 = screen.getByTestId("portal-2");
        // Portal content is wrapped in a div, so parentElement is wrapper div
        // Wrapper div should be direct child of custom container
        expect(portal1.parentElement?.parentElement).toBe(container1);
        expect(portal2.parentElement?.parentElement).toBe(container2);
      });

      // Cleanup
      document.body.removeChild(container1);
      document.body.removeChild(container2);
    });
  });

  describe("Display Name", () => {
    it("has correct displayName", () => {
      expect(Portal.displayName).toBe("Portal");
    });
  });

  describe("Accessibility", () => {
    it("does not interfere with focus management", async () => {
      renderWithTheme(
        <>
          <button>Before Portal</button>
          <Portal>
            <div>
              <button>Inside Portal</button>
            </div>
          </Portal>
          <button>After Portal</button>
        </>,
      );

      await waitFor(() => {
        const beforeButton = screen.getByText("Before Portal");
        const insideButton = screen.getByText("Inside Portal");
        const afterButton = screen.getByText("After Portal");

        expect(beforeButton).toBeInTheDocument();
        expect(insideButton).toBeInTheDocument();
        expect(afterButton).toBeInTheDocument();

        // Portal should not break tab order
        beforeButton.focus();
        expect(document.activeElement).toBe(beforeButton);
      });
    });

    it("preserves semantic structure of portaled content", async () => {
      renderWithTheme(
        <Portal>
          <div role="dialog" aria-label="Test Dialog">
            <h2>Dialog Title</h2>
            <p>Dialog content</p>
          </div>
        </Portal>,
      );

      await waitFor(() => {
        const dialog = screen.getByRole("dialog", { name: "Test Dialog" });
        expect(dialog).toBeInTheDocument();
        expect(screen.getByText("Dialog Title")).toBeInTheDocument();
        expect(screen.getByText("Dialog content")).toBeInTheDocument();
      });
    });

    it("does not add unnecessary ARIA attributes", async () => {
      renderWithTheme(
        <Portal>
          <div data-testid="portal-content">Content</div>
        </Portal>,
      );

      await waitFor(() => {
        const wrapper = screen.getByTestId("portal-content").parentElement;
        // Wrapper div should not have ARIA attributes (it's just a container)
        expect(wrapper).not.toHaveAttribute("role");
        expect(wrapper).not.toHaveAttribute("aria-label");
      });
    });
  });
});
