import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Flex } from "./Flex";

describe("Flex component", () => {
  it("should render flex with default props", () => {
    const { container } = render(
      <Flex>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>,
    );
    const flex = container.firstChild;
    expect(flex).toBeInTheDocument();
    expect(flex).toHaveClass("flex");
  });

  it("should apply gap using spacing tokens via CSS variables", () => {
    const { container, rerender } = render(<Flex gap={4}>Content</Flex>);
    const flex = container.firstChild as HTMLElement;
    expect(flex).toHaveStyle({ gap: "var(--spacing-4)" });

    rerender(<Flex gap="md">Content</Flex>);
    expect(flex).toHaveStyle({ gap: "var(--spacing-md)" });
  });

  it("should apply flex direction classes", () => {
    const { container, rerender } = render(<Flex direction="row">Content</Flex>);
    expect(container.firstChild).toHaveClass("flex-row");

    rerender(<Flex direction="column">Content</Flex>);
    expect(container.firstChild).toHaveClass("flex-col");
  });

  it("should apply flex wrap classes", () => {
    const { container, rerender } = render(<Flex wrap="wrap">Content</Flex>);
    expect(container.firstChild).toHaveClass("flex-wrap");

    rerender(<Flex wrap="nowrap">Content</Flex>);
    expect(container.firstChild).toHaveClass("flex-nowrap");
  });

  it("should apply justify content classes", () => {
    const { container, rerender } = render(<Flex justify="center">Content</Flex>);
    expect(container.firstChild).toHaveClass("justify-center");

    rerender(<Flex justify="between">Content</Flex>);
    expect(container.firstChild).toHaveClass("justify-between");
  });

  it("should apply align items classes", () => {
    const { container, rerender } = render(<Flex align="center">Content</Flex>);
    expect(container.firstChild).toHaveClass("items-center");

    rerender(<Flex align="stretch">Content</Flex>);
    expect(container.firstChild).toHaveClass("items-stretch");
  });

  it("should handle all props together", () => {
    const { container } = render(
      <Flex direction="row" wrap="wrap" gap={4} align="center" justify="between" className="custom">
        Content
      </Flex>,
    );
    const flex = container.firstChild;
    expect(flex).toHaveClass(
      "flex",
      "flex-row",
      "flex-wrap",
      "justify-between",
      "items-center",
      "custom",
    );
    expect(flex).toHaveStyle({ gap: "var(--spacing-4)" });
  });

  it("should merge custom className", () => {
    const { container } = render(<Flex className="custom-class">Content</Flex>);
    const flex = container.firstChild;
    expect(flex).toHaveClass("custom-class");
  });

  it("should merge custom style", () => {
    const { container } = render(
      <Flex style={{ color: "red" }} gap={4}>
        Content
      </Flex>,
    );
    const flex = container.firstChild as HTMLElement;
    expect(flex).toHaveStyle({
      gap: "var(--spacing-4)",
      color: "red",
    });
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Flex ref={ref}>
        <div>Content</div>
      </Flex>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("should handle responsive gap values", () => {
    const { container } = render(<Flex gap={{ base: 2, md: 4, lg: 6 }}>Content</Flex>);
    const flex = container.firstChild as HTMLElement;
    // Should use base value
    expect(flex).toHaveStyle({ gap: "var(--spacing-2)" });
  });

  it("should handle zero gap", () => {
    const { container } = render(<Flex gap={0}>Content</Flex>);
    const flex = container.firstChild as HTMLElement;
    expect(flex).toHaveStyle({ gap: "var(--spacing-0)" });
  });

  it("should use semantic spacing tokens for gap", () => {
    const { container } = render(<Flex gap="xl">Content</Flex>);
    const flex = container.firstChild as HTMLElement;
    expect(flex).toHaveStyle({ gap: "var(--spacing-xl)" });
  });
});
