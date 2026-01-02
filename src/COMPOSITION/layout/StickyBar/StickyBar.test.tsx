import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { StickyBar } from "./StickyBar";

describe("StickyBar component", () => {
  it("should render StickyBar with default props", () => {
    const { container } = render(
      <StickyBar>
        <div>Content</div>
      </StickyBar>,
    );
    const stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toBeInTheDocument();
    expect(stickyBar?.tagName).toBe("DIV");
  });

  it("should apply position prop correctly", () => {
    const { container, rerender } = render(
      <StickyBar position="bottom">
        <div>Content</div>
      </StickyBar>,
    );
    let stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toHaveClass("sticky", "bottom-0");

    rerender(
      <StickyBar position="top">
        <div>Content</div>
      </StickyBar>,
    );
    stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toHaveClass("sticky", "top-0");
  });

  it("should apply tone prop correctly", () => {
    const { container, rerender } = render(
      <StickyBar tone="default">
        <div>Content</div>
      </StickyBar>,
    );
    let stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toHaveClass("bg-background");

    rerender(
      <StickyBar tone="elevated">
        <div>Content</div>
      </StickyBar>,
    );
    stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toHaveClass("bg-card", "shadow-sm");

    rerender(
      <StickyBar tone="muted">
        <div>Content</div>
      </StickyBar>,
    );
    stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toHaveClass("bg-muted/50");
  });

  it("should apply z-index via inline style (zIndex.sticky = 20)", () => {
    const { container } = render(
      <StickyBar>
        <div>Content</div>
      </StickyBar>,
    );
    const stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toHaveStyle({ zIndex: 20 });
  });

  it("should render divider when divider prop is true (bottom position)", () => {
    const { container } = render(
      <StickyBar divider position="bottom">
        <div>Content</div>
      </StickyBar>,
    );
    const stickyBar = container.firstChild as HTMLElement;
    const dividers = stickyBar.querySelectorAll("hr");
    expect(dividers).toHaveLength(1);
    // Divider should be at the bottom
    expect(stickyBar.lastChild).toBe(dividers[0]);
  });

  it("should render divider when divider prop is true (top position)", () => {
    const { container } = render(
      <StickyBar divider position="top">
        <div>Content</div>
      </StickyBar>,
    );
    const stickyBar = container.firstChild as HTMLElement;
    const dividers = stickyBar.querySelectorAll("hr");
    expect(dividers).toHaveLength(1);
    // Divider should be at the top
    expect(stickyBar.firstChild).toBe(dividers[0]);
  });

  it("should not render divider when divider prop is false", () => {
    const { container } = render(
      <StickyBar divider={false}>
        <div>Content</div>
      </StickyBar>,
    );
    const stickyBar = container.firstChild as HTMLElement;
    const dividers = stickyBar.querySelectorAll("hr");
    expect(dividers).toHaveLength(0);
  });

  it("should map tone to divider tone correctly", () => {
    const { container, rerender } = render(
      <StickyBar divider tone="muted">
        <div>Content</div>
      </StickyBar>,
    );
    let stickyBar = container.firstChild as HTMLElement;
    let divider = stickyBar.querySelector("hr");
    expect(divider).toHaveClass("bg-muted");

    rerender(
      <StickyBar divider tone="default">
        <div>Content</div>
      </StickyBar>,
    );
    stickyBar = container.firstChild as HTMLElement;
    divider = stickyBar.querySelector("hr");
    expect(divider).toHaveClass("bg-border");

    rerender(
      <StickyBar divider tone="elevated">
        <div>Content</div>
      </StickyBar>,
    );
    stickyBar = container.firstChild as HTMLElement;
    divider = stickyBar.querySelector("hr");
    expect(divider).toHaveClass("bg-border");
  });

  it("should wrap children in Inset component", () => {
    const { container } = render(
      <StickyBar>
        <div data-testid="child">Child content</div>
      </StickyBar>,
    );
    const stickyBar = container.firstChild as HTMLElement;
    const inset = stickyBar.querySelector('[data-testid="child"]')?.parentElement;
    expect(inset).toBeInTheDocument();
    // Inset should have padding applied
    expect(inset).toHaveStyle({ padding: "var(--spacing-md)" });
  });

  it("should render children unchanged", () => {
    const { container } = render(
      <StickyBar>
        <div data-testid="child">Child content</div>
      </StickyBar>,
    );
    const child = container.querySelector('[data-testid="child"]');
    expect(child).toBeInTheDocument();
    expect(child?.textContent).toBe("Child content");
  });

  it("should pass through HTML attributes", () => {
    const { container } = render(
      <StickyBar data-testid="stickybar" id="stickybar-id" className="custom-class">
        <div>Content</div>
      </StickyBar>,
    );
    const stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toHaveAttribute("data-testid", "stickybar");
    expect(stickyBar).toHaveAttribute("id", "stickybar-id");
    expect(stickyBar).toHaveClass("custom-class");
  });

  it("should merge custom style with z-index style", () => {
    const { container } = render(
      <StickyBar style={{ backgroundColor: "red" }}>
        <div>Content</div>
      </StickyBar>,
    );
    const stickyBar = container.firstChild as HTMLElement;
    // Check inline styles directly (JSDOM may not compute styles correctly)
    expect(stickyBar.style.zIndex).toBe("20");
    expect(stickyBar.style.backgroundColor).toBe("red");
  });

  it("should use token-based styling (no raw values)", () => {
    const { container } = render(
      <StickyBar tone="elevated" position="bottom">
        <div>Content</div>
      </StickyBar>,
    );
    const stickyBar = container.firstChild as HTMLElement;
    // Verify token-based classes are used
    expect(stickyBar).toHaveClass("bg-card", "shadow-sm", "sticky", "bottom-0");
    // Verify z-index is applied via inline style (token value)
    expect(stickyBar).toHaveStyle({ zIndex: 20 });
  });

  it("should handle empty children", () => {
    const { container } = render(<StickyBar>{null}</StickyBar>);
    const stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toBeInTheDocument();
  });

  it("should handle multiple children", () => {
    const { container } = render(
      <StickyBar>
        <div>Child 1</div>
        <div>Child 2</div>
      </StickyBar>,
    );
    const stickyBar = container.firstChild as HTMLElement;
    const inset = stickyBar.querySelector("div:not(hr)");
    expect(inset).toBeInTheDocument();
    expect(inset?.children).toHaveLength(2);
  });

  it("should apply default position (bottom) when position prop is not provided", () => {
    const { container } = render(
      <StickyBar>
        <div>Content</div>
      </StickyBar>,
    );
    const stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toHaveClass("sticky", "bottom-0");
  });

  it("should apply default tone (default) when tone prop is not provided", () => {
    const { container } = render(
      <StickyBar>
        <div>Content</div>
      </StickyBar>,
    );
    const stickyBar = container.firstChild as HTMLElement;
    expect(stickyBar).toHaveClass("bg-background");
  });
});
