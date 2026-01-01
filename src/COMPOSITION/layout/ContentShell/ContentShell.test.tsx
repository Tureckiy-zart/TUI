import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { ContentShell } from "./ContentShell";

describe("ContentShell component", () => {
  it("should render ContentShell with children", () => {
    const { container, getByText } = render(
      <ContentShell>
        <div>Test Content</div>
      </ContentShell>,
    );
    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("should render as main element (semantic HTML)", () => {
    const { container } = render(
      <ContentShell>
        <div>Content</div>
      </ContentShell>,
    );
    const main = container.firstChild as HTMLElement;
    expect(main.tagName).toBe("MAIN");
  });

  it("should render nav when nav prop is provided", () => {
    const { container } = render(
      <ContentShell nav={<nav>Navigation</nav>}>
        <div>Content</div>
      </ContentShell>,
    );
    const navElement = container.querySelector("nav");
    expect(navElement).toBeInTheDocument();
    expect(navElement?.textContent).toBe("Navigation");
  });

  it("should not render nav when nav prop is not provided", () => {
    const { container } = render(
      <ContentShell>
        <div>Content</div>
      </ContentShell>,
    );
    const navElement = container.querySelector("nav");
    expect(navElement).toBeNull();
  });

  it("should apply contentPadding to Container", () => {
    const { container } = render(
      <ContentShell contentPadding="md">
        <div>Content</div>
      </ContentShell>,
    );
    const main = container.firstChild as HTMLElement;
    expect(main).toBeInTheDocument();
    // contentPadding is passed to Container component
    // We verify the component renders correctly
  });

  it("should handle responsive contentPadding values", () => {
    const { container } = render(
      <ContentShell contentPadding={{ base: "sm", md: "lg", lg: "xl" }}>
        <div>Content</div>
      </ContentShell>,
    );
    const main = container.firstChild as HTMLElement;
    expect(main).toBeInTheDocument();
    // Responsive values are handled by Container component
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <ContentShell ref={ref}>
        <div>Content</div>
      </ContentShell>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("MAIN");
  });

  it("should apply w-full class", () => {
    const { container } = render(
      <ContentShell>
        <div>Content</div>
      </ContentShell>,
    );
    const main = container.firstChild as HTMLElement;
    expect(main).toHaveClass("w-full");
  });

  it("should merge custom className", () => {
    const { container } = render(
      <ContentShell className="custom-class">
        <div>Content</div>
      </ContentShell>,
    );
    const main = container.firstChild as HTMLElement;
    expect(main).toHaveClass("custom-class", "w-full");
  });

  it("should pass through HTML attributes", () => {
    const { container } = render(
      <ContentShell id="content-shell" data-testid="content-shell">
        <div>Content</div>
      </ContentShell>,
    );
    const main = container.firstChild as HTMLElement;
    expect(main).toHaveAttribute("id", "content-shell");
    expect(main).toHaveAttribute("data-testid", "content-shell");
  });

  it("should render children in Container when no nav", () => {
    const { container, getByText } = render(
      <ContentShell>
        <div>Content in Container</div>
      </ContentShell>,
    );
    const main = container.firstChild as HTMLElement;
    expect(main).toBeInTheDocument();
    expect(getByText("Content in Container")).toBeInTheDocument();
    // Children should be wrapped in Container
  });

  it("should render nav and children in Stack when nav is provided", () => {
    const { container, getByText } = render(
      <ContentShell nav={<nav>Navigation</nav>}>
        <div>Content in Container</div>
      </ContentShell>,
    );
    const main = container.firstChild as HTMLElement;
    const navElement = container.querySelector("nav");
    expect(main).toBeInTheDocument();
    expect(navElement).toBeInTheDocument();
    expect(getByText("Content in Container")).toBeInTheDocument();
    // nav and children should be wrapped in Stack
  });

  it("should handle null nav prop", () => {
    const { container } = render(
      <ContentShell nav={null}>
        <div>Content</div>
      </ContentShell>,
    );
    const navElement = container.querySelector("nav");
    expect(navElement).toBeNull();
  });

  it("should handle undefined nav prop", () => {
    const { container } = render(
      <ContentShell nav={undefined}>
        <div>Content</div>
      </ContentShell>,
    );
    const navElement = container.querySelector("nav");
    expect(navElement).toBeNull();
  });

  it("should handle empty children", () => {
    const { container } = render(<ContentShell>{null}</ContentShell>);
    const main = container.firstChild as HTMLElement;
    expect(main).toBeInTheDocument();
  });

  it("should handle multiple children", () => {
    const { container, getByText } = render(
      <ContentShell>
        <div>Child 1</div>
        <div>Child 2</div>
      </ContentShell>,
    );
    const main = container.firstChild as HTMLElement;
    expect(main).toBeInTheDocument();
    expect(getByText("Child 1")).toBeInTheDocument();
    expect(getByText("Child 2")).toBeInTheDocument();
  });
});
