import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { Inset } from "./Inset";

describe("Inset component", () => {
  it("should render Inset with default props", () => {
    const { container } = render(
      <Inset>
        <div>Content</div>
      </Inset>,
    );
    const inset = container.firstChild as HTMLElement;
    expect(inset).toBeInTheDocument();
    expect(inset?.tagName).toBe("DIV");
  });

  it("should apply padding using spacing tokens", () => {
    const { container, rerender } = render(<Inset padding={4}>Content</Inset>);
    const inset = container.firstChild as HTMLElement;
    expect(inset).toHaveStyle({ padding: "var(--spacing-4)" });

    rerender(<Inset padding="md">Content</Inset>);
    expect(inset).toHaveStyle({ padding: "var(--spacing-md)" });
  });

  it("should apply semantic spacing tokens", () => {
    const { container, rerender } = render(<Inset padding="xs">Content</Inset>);
    const inset = container.firstChild as HTMLElement;
    expect(inset).toHaveStyle({ padding: "var(--spacing-xs)" });

    rerender(<Inset padding="sm">Content</Inset>);
    expect(inset).toHaveStyle({ padding: "var(--spacing-sm)" });

    rerender(<Inset padding="lg">Content</Inset>);
    expect(inset).toHaveStyle({ padding: "var(--spacing-lg)" });

    rerender(<Inset padding="xl">Content</Inset>);
    expect(inset).toHaveStyle({ padding: "var(--spacing-xl)" });
  });

  it("should not apply padding when padding prop is undefined", () => {
    const { container } = render(<Inset>Content</Inset>);
    const inset = container.firstChild as HTMLElement;
    const style = inset.getAttribute("style");
    // Style should be undefined or empty when no padding
    expect(style === null || style === "" || !style.includes("padding")).toBe(true);
  });

  it("should render children unchanged", () => {
    const { container } = render(
      <Inset padding="md">
        <div data-testid="child">Child content</div>
      </Inset>,
    );
    const child = container.querySelector('[data-testid="child"]');
    expect(child).toBeInTheDocument();
    expect(child?.textContent).toBe("Child content");
  });

  it("should pass through HTML attributes", () => {
    const { container } = render(
      <Inset padding="md" data-testid="inset" id="inset-id" className="custom-class">
        Content
      </Inset>,
    );
    const inset = container.firstChild as HTMLElement;
    expect(inset).toHaveAttribute("data-testid", "inset");
    expect(inset).toHaveAttribute("id", "inset-id");
    expect(inset).toHaveClass("custom-class");
  });

  it("should merge custom style with padding style", () => {
    const { container } = render(
      <Inset padding="md" style={{ backgroundColor: "red" }}>
        Content
      </Inset>,
    );
    const inset = container.firstChild as HTMLElement;
    // Check padding
    expect(inset).toHaveStyle({
      padding: "var(--spacing-md)",
    });
    // Check backgroundColor (browser normalizes "red" to rgb)
    const computedBg = window.getComputedStyle(inset).backgroundColor;
    expect(computedBg).toBe("rgb(255, 0, 0)");
  });

  it("should use CSS variables for spacing (token compliance)", () => {
    const { container } = render(<Inset padding="md">Content</Inset>);
    const inset = container.firstChild as HTMLElement;
    const style = inset.getAttribute("style");
    // Verify CSS variable is used (no raw values)
    expect(style).toContain("var(--spacing-md)");
    expect(style).not.toContain("16px");
    expect(style).not.toContain("1rem");
  });

  it("should handle numeric spacing tokens", () => {
    const { container } = render(<Inset padding={8}>Content</Inset>);
    const inset = container.firstChild as HTMLElement;
    expect(inset).toHaveStyle({ padding: "var(--spacing-8)" });
  });

  it("should support ref forwarding", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Inset ref={ref} padding="md">
        Content
      </Inset>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("should handle responsive padding object (base value)", () => {
    const { container } = render(<Inset padding={{ base: "sm", lg: "xl" }}>Content</Inset>);
    const inset = container.firstChild as HTMLElement;
    // getBaseValue extracts base value from responsive object
    expect(inset).toHaveStyle({ padding: "var(--spacing-sm)" });
  });

  it("should not render style attribute when padding is undefined", () => {
    const { container } = render(<Inset>Content</Inset>);
    const inset = container.firstChild as HTMLElement;
    // When no padding and no custom style, style should be undefined
    const style = inset.getAttribute("style");
    expect(style === null || style === "").toBe(true);
  });
});
