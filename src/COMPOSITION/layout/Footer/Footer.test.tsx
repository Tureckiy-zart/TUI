import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer component", () => {
  it("should render footer with default props", () => {
    const { container } = render(<Footer>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toBeInTheDocument();
    expect(footerEl).toHaveClass("w-full", "border-t", "border-border");
  });

  it("should render footer with left slot", () => {
    render(<Footer left={<div>Left content</div>} />);
    expect(screen.getByText("Left content")).toBeInTheDocument();
  });

  it("should render footer with center slot", () => {
    render(<Footer center={<div>Center content</div>} />);
    expect(screen.getByText("Center content")).toBeInTheDocument();
  });

  it("should render footer with right slot", () => {
    render(<Footer right={<div>Right content</div>} />);
    expect(screen.getByText("Right content")).toBeInTheDocument();
  });

  it("should render footer with all slots", () => {
    render(<Footer left={<div>Left</div>} center={<div>Center</div>} right={<div>Right</div>} />);
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Center")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("should render footer with children instead of slots", () => {
    render(<Footer>Children content</Footer>);
    expect(screen.getByText("Children content")).toBeInTheDocument();
    // Slots should be ignored when children is provided
    const { container: container2 } = render(<Footer left={<div>Left</div>}>Children</Footer>);
    expect(screen.getByText("Children")).toBeInTheDocument();
    expect(container2.querySelector("footer")?.textContent).not.toContain("Left");
  });

  it("should apply horizontal padding using spacing tokens", () => {
    const { container } = render(<Footer px="md">Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveStyle({
      paddingLeft: "var(--spacing-md)",
      paddingRight: "var(--spacing-md)",
    });
  });

  it("should apply vertical padding using spacing tokens", () => {
    const { container } = render(<Footer py="lg">Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveStyle({
      paddingTop: "var(--spacing-lg)",
      paddingBottom: "var(--spacing-lg)",
    });
  });

  it("should apply background color using color tokens", () => {
    const { container } = render(<Footer bg="muted">Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveStyle({
      backgroundColor: "var(--muted)",
    });
  });

  it("should show border by default", () => {
    const { container } = render(<Footer>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveClass("border-t", "border-border");
  });

  it("should hide border when border=false", () => {
    const { container } = render(<Footer border={false}>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).not.toHaveClass("border-t", "border-border");
  });

  it("should apply aria-label when provided", () => {
    const { container } = render(<Footer ariaLabel="Site footer">Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveAttribute("aria-label", "Site footer");
  });

  it("should not apply aria-label when not provided", () => {
    const { container } = render(<Footer>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).not.toHaveAttribute("aria-label");
  });

  it("should render as semantic footer element", () => {
    const { container } = render(<Footer>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl?.tagName).toBe("FOOTER");
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Footer ref={ref}>Content</Footer>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("FOOTER");
  });

  it("should apply custom className", () => {
    const { container } = render(<Footer className="custom-class">Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveClass("custom-class");
  });

  it("should apply default padding values", () => {
    const { container } = render(<Footer>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveStyle({
      paddingLeft: "var(--spacing-md)",
      paddingRight: "var(--spacing-md)",
      paddingTop: "var(--spacing-lg)",
      paddingBottom: "var(--spacing-lg)",
    });
  });

  it("should apply default background color", () => {
    const { container } = render(<Footer>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveStyle({
      backgroundColor: "var(--background)",
    });
  });

  it("should merge user style with computed styles without overriding", () => {
    const { container } = render(
      <Footer px="md" py="lg" bg="muted" style={{ color: "red", paddingTop: "20px" }}>
        Content
      </Footer>,
    );
    const footerEl = container.querySelector("footer");
    // Computed styles should be preserved
    expect(footerEl).toHaveStyle({
      paddingLeft: "var(--spacing-md)",
      paddingRight: "var(--spacing-md)",
      backgroundColor: "var(--muted)",
      // User's paddingTop should override computed paddingTop
      paddingTop: "20px",
      // But paddingBottom should remain from computed styles
      paddingBottom: "var(--spacing-lg)",
    });
    // User style should be merged (color should be present and computed)
    const computedColor = window.getComputedStyle(footerEl!).color;
    expect(computedColor).toBe("rgb(255, 0, 0)");
  });
});
