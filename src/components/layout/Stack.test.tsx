import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { Stack } from "./Stack";

describe("Stack component", () => {
  it("should render stack with default props", () => {
    const { container } = render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
    );
    const stack = container.firstChild;
    expect(stack).toBeInTheDocument();
    expect(stack).toHaveClass("flex", "flex-col");
  });

  it("should apply spacing using spacing tokens via CSS variables", () => {
    const { container, rerender } = render(<Stack spacing={4}>Content</Stack>);
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveStyle({ gap: "var(--spacing-4)" });

    rerender(<Stack spacing="md">Content</Stack>);
    expect(stack).toHaveStyle({ gap: "var(--spacing-md)" });
  });

  it("should apply vertical direction by default", () => {
    const { container } = render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
    );
    const stack = container.firstChild;
    expect(stack).toHaveClass("flex-col");
  });

  it("should apply horizontal direction when specified", () => {
    const { container } = render(
      <Stack direction="horizontal">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
    );
    const stack = container.firstChild;
    expect(stack).toHaveClass("flex-row");
  });

  it("should apply align items classes", () => {
    const { container, rerender } = render(<Stack align="center">Content</Stack>);
    expect(container.firstChild).toHaveClass("items-center");

    rerender(<Stack align="start">Content</Stack>);
    expect(container.firstChild).toHaveClass("items-start");
  });

  it("should apply justify content classes", () => {
    const { container, rerender } = render(<Stack justify="center">Content</Stack>);
    expect(container.firstChild).toHaveClass("justify-center");

    rerender(<Stack justify="between">Content</Stack>);
    expect(container.firstChild).toHaveClass("justify-between");
  });

  it("should handle all props together", () => {
    const { container } = render(
      <Stack direction="vertical" spacing={6} align="center" justify="between" className="custom">
        Content
      </Stack>,
    );
    const stack = container.firstChild;
    expect(stack).toHaveClass("flex", "flex-col", "items-center", "justify-between", "custom");
    expect(stack).toHaveStyle({ gap: "var(--spacing-6)" });
  });

  it("should merge custom className", () => {
    const { container } = render(<Stack className="custom-class">Content</Stack>);
    const stack = container.firstChild;
    expect(stack).toHaveClass("custom-class");
  });

  it("should merge custom style", () => {
    const { container } = render(
      <Stack style={{ color: "red" }} spacing={4}>
        Content
      </Stack>,
    );
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveStyle({
      gap: "var(--spacing-4)",
      color: "rgb(255, 0, 0)", // Browser normalizes "red" to rgb(255, 0, 0)
    });
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Stack ref={ref}>
        <div>Content</div>
      </Stack>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("should handle responsive spacing values", () => {
    const { container } = render(<Stack spacing={{ base: 2, md: 4, lg: 6 }}>Content</Stack>);
    const stack = container.firstChild as HTMLElement;
    // Should use base value
    expect(stack).toHaveStyle({ gap: "var(--spacing-2)" });
  });

  it("should handle zero spacing", () => {
    const { container } = render(<Stack spacing={0}>Content</Stack>);
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveStyle({ gap: "var(--spacing-0)" });
  });

  it("should use semantic spacing tokens", () => {
    const { container } = render(<Stack spacing="lg">Content</Stack>);
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveStyle({ gap: "var(--spacing-lg)" });
  });

  it("should use layout stack spacing tokens", () => {
    const { container } = render(<Stack spacing={"stack-md" as any}>Content</Stack>);
    const stack = container.firstChild as HTMLElement;
    expect(stack).toHaveStyle({ gap: "var(--layout-stack-md)" });
  });
});
