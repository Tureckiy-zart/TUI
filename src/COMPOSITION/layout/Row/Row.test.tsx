import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { Row } from "./Row";
import { Stack } from "../Stack";

describe("Row component", () => {
  it("should render row with default props", () => {
    const { container } = render(
      <Row>
        <div>Item 1</div>
        <div>Item 2</div>
      </Row>,
    );
    const row = container.firstChild;
    expect(row).toBeInTheDocument();
    expect(row).toHaveClass("flex", "flex-row");
  });

  it("should be semantic alias for Stack with horizontal direction", () => {
    const { container: rowContainer } = render(
      <Row spacing="md">
        <div>Item 1</div>
        <div>Item 2</div>
      </Row>,
    );

    const { container: stackContainer } = render(
      <Stack direction="horizontal" spacing="md">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>,
    );

    const row = rowContainer.firstChild as HTMLElement;
    const stack = stackContainer.firstChild as HTMLElement;

    // Both should have same classes
    expect(row).toHaveClass("flex", "flex-row");
    expect(stack).toHaveClass("flex", "flex-row");

    // Both should have same gap style
    expect(row).toHaveStyle({ gap: "var(--spacing-md)" });
    expect(stack).toHaveStyle({ gap: "var(--spacing-md)" });
  });

  it("should apply spacing using spacing tokens", () => {
    const { container } = render(<Row spacing="md">Content</Row>);
    const row = container.firstChild as HTMLElement;
    expect(row).toHaveStyle({ gap: "var(--spacing-md)" });
  });

  it("should apply align items classes", () => {
    const { container, rerender } = render(<Row align="center">Content</Row>);
    expect(container.firstChild).toHaveClass("items-center");

    rerender(<Row align="start">Content</Row>);
    expect(container.firstChild).toHaveClass("items-start");
  });

  it("should apply justify content classes", () => {
    const { container, rerender } = render(<Row justify="center">Content</Row>);
    expect(container.firstChild).toHaveClass("justify-center");

    rerender(<Row justify="between">Content</Row>);
    expect(container.firstChild).toHaveClass("justify-between");
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Row ref={ref}>
        <div>Content</div>
      </Row>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("should NOT accept direction prop (always horizontal)", () => {
    // RowProps extends Omit<StackProps, "direction">, so direction is not in types
    // But even if passed, Row always uses direction="horizontal"
    const { container } = render(<Row spacing="md">Content</Row>);
    const row = container.firstChild;
    // Should always be horizontal regardless of any direction prop
    expect(row).toHaveClass("flex-row");
    expect(row).not.toHaveClass("flex-col");
  });
});
