import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { Column } from "./Column";
import { Stack } from "./Stack";

describe("Column component", () => {
  it("should render column with default props", () => {
    const { container } = render(
      <Column>
        <div>Item 1</div>
        <div>Item 2</div>
      </Column>,
    );
    const column = container.firstChild;
    expect(column).toBeInTheDocument();
    expect(column).toHaveClass("flex", "flex-col");
  });

  it("should be semantic alias for Stack (vertical direction)", () => {
    const { container: columnContainer } = render(
      <Column spacing="md">
        <div>Item 1</div>
        <div>Item 2</div>
      </Column>,
    );

    const { container: stackContainer } = render(
      <Stack direction="vertical" spacing="md">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
    );

    const column = columnContainer.firstChild as HTMLElement;
    const stack = stackContainer.firstChild as HTMLElement;

    // Both should have same classes
    expect(column).toHaveClass("flex", "flex-col");
    expect(stack).toHaveClass("flex", "flex-col");

    // Both should have same gap style
    expect(column).toHaveStyle({ gap: "var(--spacing-md)" });
    expect(stack).toHaveStyle({ gap: "var(--spacing-md)" });
  });

  it("should apply spacing using spacing tokens", () => {
    const { container } = render(<Column spacing="md">Content</Column>);
    const column = container.firstChild as HTMLElement;
    expect(column).toHaveStyle({ gap: "var(--spacing-md)" });
  });

  it("should apply align items classes", () => {
    const { container, rerender } = render(<Column align="center">Content</Column>);
    expect(container.firstChild).toHaveClass("items-center");

    rerender(<Column align="start">Content</Column>);
    expect(container.firstChild).toHaveClass("items-start");
  });

  it("should apply justify content classes", () => {
    const { container, rerender } = render(<Column justify="center">Content</Column>);
    expect(container.firstChild).toHaveClass("justify-center");

    rerender(<Column justify="between">Content</Column>);
    expect(container.firstChild).toHaveClass("justify-between");
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Column ref={ref}>
        <div>Content</div>
      </Column>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe("DIV");
  });
});
