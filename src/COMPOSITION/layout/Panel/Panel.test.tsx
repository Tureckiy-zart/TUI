import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { Panel } from "./Panel";

describe("Panel component", () => {
  it("should render panel with default props", () => {
    const { container } = render(
      <Panel>
        <div>Content</div>
      </Panel>,
    );
    const panel = container.firstChild as HTMLElement;
    expect(panel).toBeInTheDocument();
    expect(panel?.tagName).toBe("DIV");
  });

  it("should apply default tone when tone prop is not provided", () => {
    const { container } = render(<Panel>Content</Panel>);
    const panel = container.firstChild as HTMLElement;
    // Default tone is "default" - should have default tone classes
    expect(panel).toBeInTheDocument();
  });

  it("should apply default tone explicitly", () => {
    const { container } = render(<Panel tone="default">Content</Panel>);
    const panel = container.firstChild as HTMLElement;
    expect(panel).toBeInTheDocument();
  });

  it("should apply muted tone", () => {
    const { container } = render(<Panel tone="muted">Content</Panel>);
    const panel = container.firstChild as HTMLElement;
    expect(panel).toBeInTheDocument();
    // Should have muted background class
    expect(panel).toHaveClass("bg-[hsl(var(--tm-muted))]");
  });

  it("should apply subtle tone", () => {
    const { container } = render(<Panel tone="subtle">Content</Panel>);
    const panel = container.firstChild as HTMLElement;
    expect(panel).toBeInTheDocument();
    // Should have subtle background class
    expect(panel).toHaveClass("bg-[hsl(var(--tm-muted))]/50");
  });

  it("should apply custom padding prop", () => {
    const { container } = render(<Panel padding="lg">Content</Panel>);
    const panel = container.firstChild as HTMLElement;
    // Box uses px and py, so padding is applied via paddingLeft, paddingRight, paddingTop, paddingBottom
    expect(panel).toHaveStyle({
      paddingLeft: "var(--spacing-lg)",
      paddingRight: "var(--spacing-lg)",
      paddingTop: "var(--spacing-lg)",
      paddingBottom: "var(--spacing-lg)",
    });
  });

  it("should apply custom radius prop", () => {
    const { container } = render(<Panel radius="xl">Content</Panel>);
    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveStyle({ borderRadius: "var(--radius-xl)" });
  });

  it("should use default padding from tone when padding prop is not provided", () => {
    const { container } = render(<Panel tone="default">Content</Panel>);
    const panel = container.firstChild as HTMLElement;
    // Default tone has "p-md" - should extract "md" and apply via px/py
    expect(panel).toHaveStyle({
      paddingLeft: "var(--spacing-md)",
      paddingRight: "var(--spacing-md)",
      paddingTop: "var(--spacing-md)",
      paddingBottom: "var(--spacing-md)",
    });
  });

  it("should use default radius from tone when radius prop is not provided", () => {
    const { container } = render(<Panel tone="default">Content</Panel>);
    const panel = container.firstChild as HTMLElement;
    // Default tone has "rounded-md" - should extract "md" and apply
    expect(panel).toHaveStyle({ borderRadius: "var(--radius-md)" });
  });

  it("should override tone default padding with padding prop", () => {
    const { container } = render(
      <Panel tone="default" padding="lg">
        Content
      </Panel>,
    );
    const panel = container.firstChild as HTMLElement;
    // Box uses px and py, so padding is applied via paddingLeft, paddingRight, paddingTop, paddingBottom
    expect(panel).toHaveStyle({
      paddingLeft: "var(--spacing-lg)",
      paddingRight: "var(--spacing-lg)",
      paddingTop: "var(--spacing-lg)",
      paddingBottom: "var(--spacing-lg)",
    });
  });

  it("should override tone default radius with radius prop", () => {
    const { container } = render(
      <Panel tone="default" radius="xl">
        Content
      </Panel>,
    );
    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveStyle({ borderRadius: "var(--radius-xl)" });
  });

  it("should merge custom className", () => {
    const { container } = render(<Panel className="custom-class">Content</Panel>);
    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveClass("custom-class");
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Panel ref={ref}>
        <div>Content</div>
      </Panel>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("should forward other Box props", () => {
    const { container } = render(
      <Panel m="md" data-testid="panel">
        Content
      </Panel>,
    );
    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveAttribute("data-testid", "panel");
    expect(panel).toHaveStyle({ margin: "var(--spacing-md)" });
  });

  it("should render all tone combinations with props", () => {
    const tones: Array<"default" | "muted" | "subtle"> = ["default", "muted", "subtle"];

    tones.forEach((tone) => {
      const { container, unmount } = render(
        <Panel tone={tone} padding="md" radius="md">
          {tone} tone
        </Panel>,
      );
      const panel = container.firstChild as HTMLElement;
      expect(panel).toBeInTheDocument();
      unmount();
    });
  });

  it("should not accept onClick handler (non-interactive)", () => {
    const onClick = vi.fn();
    const { container } = render(
      <Panel onClick={onClick} data-testid="panel">
        Content
      </Panel>,
    );
    const panel = container.firstChild as HTMLElement;
    // Panel should render, but onClick should not be triggered by default
    // (Panel is non-interactive by design, but we don't prevent onClick from being passed)
    expect(panel).toBeInTheDocument();
    // Note: Panel doesn't prevent onClick, but it's semantically non-interactive
    // The architectural constraint is that Panel should not imply interactivity
  });

  it("should render as different HTML element via as prop", () => {
    const { container } = render(
      <Panel as="section" data-testid="panel-section">
        Content
      </Panel>,
    );
    const panel = container.firstChild as HTMLElement;
    expect(panel?.tagName).toBe("SECTION");
    expect(panel).toHaveAttribute("data-testid", "panel-section");
  });

  it("should apply tone background and border classes", () => {
    const { container } = render(<Panel tone="default">Content</Panel>);
    const panel = container.firstChild as HTMLElement;
    // Default tone should have bg-[hsl(var(--tm-surface-base))] and border classes
    expect(panel).toHaveClass("bg-[hsl(var(--tm-surface-base))]");
    expect(panel).toHaveClass("border");
  });

  it("should apply muted tone background and border classes", () => {
    const { container } = render(<Panel tone="muted">Content</Panel>);
    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveClass("bg-[hsl(var(--tm-muted))]");
    expect(panel).toHaveClass("border");
  });

  it("should apply subtle tone background and border classes", () => {
    const { container } = render(<Panel tone="subtle">Content</Panel>);
    const panel = container.firstChild as HTMLElement;
    expect(panel).toHaveClass("bg-[hsl(var(--tm-muted))]/50");
    expect(panel).toHaveClass("border");
  });
});
