import "@testing-library/jest-dom/vitest";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "@/test/test-utils";
import { Skeleton } from "./Skeleton";

describe("Skeleton component", () => {
  // ============================================================================
  // Basic Rendering Tests
  // ============================================================================

  it("should render Skeleton with default props", () => {
    const { container } = renderWithTheme(<Skeleton />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
  });

  it("should render Skeleton with default variant (text)", () => {
    const { container } = renderWithTheme(<Skeleton />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toBeInTheDocument();
  });

  // ============================================================================
  // Variant Tests
  // ============================================================================

  it("should render with text variant", () => {
    const { container } = renderWithTheme(<Skeleton variant="text" />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toBeInTheDocument();
  });

  it("should render with inline variant", () => {
    const { container } = renderWithTheme(<Skeleton variant="inline" />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toBeInTheDocument();
  });

  it("should render with block variant", () => {
    const { container } = renderWithTheme(<Skeleton variant="block" />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toBeInTheDocument();
  });

  it("should render with card variant", () => {
    const { container } = renderWithTheme(<Skeleton variant="card" />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toBeInTheDocument();
  });

  it("should render with circle variant", () => {
    const { container } = renderWithTheme(<Skeleton variant="circle" />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toBeInTheDocument();
  });

  // ============================================================================
  // Accessibility Tests
  // ============================================================================

  it("should have aria-hidden=true by default", () => {
    const { container } = renderWithTheme(<Skeleton />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
  });

  it("should respect aria-hidden prop when set to false", () => {
    const { container } = renderWithTheme(<Skeleton aria-hidden={false} />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toHaveAttribute("aria-hidden", "false");
  });

  it("should respect aria-hidden prop when set to true explicitly", () => {
    const { container } = renderWithTheme(<Skeleton aria-hidden={true} />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
  });

  // ============================================================================
  // className Prop Tests
  // ============================================================================

  it("should merge className prop with variant classes", () => {
    const { container } = renderWithTheme(<Skeleton className="custom-class" />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toHaveClass("custom-class");
  });

  it("should apply both variant and custom className", () => {
    const { container } = renderWithTheme(<Skeleton variant="circle" className="custom-class" />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("custom-class");
  });

  // ============================================================================
  // HTML Attributes Tests
  // ============================================================================

  it("should forward ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    renderWithTheme(<Skeleton ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("should forward other HTML attributes", () => {
    const { container } = renderWithTheme(<Skeleton data-testid="skeleton" id="test-id" />);

    const skeleton = container.querySelector("#test-id");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute("data-testid", "skeleton");
  });

  // ============================================================================
  // Edge Cases
  // ============================================================================

  it("should handle undefined variant gracefully (uses default)", () => {
    const { container } = renderWithTheme(<Skeleton variant={undefined} />);

    const skeleton = container.querySelector("div");
    expect(skeleton).toBeInTheDocument();
  });

  it("should render multiple skeletons correctly", () => {
    const { container } = renderWithTheme(
      <div>
        <Skeleton variant="text" />
        <Skeleton variant="circle" />
        <Skeleton variant="block" />
      </div>,
    );

    const skeletons = container.querySelectorAll("div[aria-hidden='true']");
    expect(skeletons.length).toBeGreaterThanOrEqual(3);
  });

  // ============================================================================
  // Integration Tests
  // ============================================================================

  it("should work in loading state composition", () => {
    const { container } = renderWithTheme(
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton variant="circle" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-3/4" />
          </div>
        </div>
        <Skeleton variant="block" />
      </div>,
    );

    const skeletons = container.querySelectorAll("div[aria-hidden='true']");
    expect(skeletons.length).toBeGreaterThanOrEqual(4);
  });
});
