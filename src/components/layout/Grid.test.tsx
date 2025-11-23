import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Grid } from "./Grid";

describe("Grid component", () => {
  it("should render grid with default props", () => {
    const { container } = render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>,
    );
    const grid = container.firstChild;
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid");
  });

  it("should apply column classes", () => {
    const { container } = render(<Grid cols={3}>Content</Grid>);
    const grid = container.firstChild;
    expect(grid).toHaveClass("grid-cols-3");
  });

  it("should apply gap token classes correctly", () => {
    const { container, rerender } = render(<Grid gap={0}>Content</Grid>);
    expect(container.firstChild).toHaveClass("gap-0");

    rerender(<Grid gap={1}>Content</Grid>);
    expect(container.firstChild).toHaveClass("gap-xs");

    rerender(<Grid gap={2}>Content</Grid>);
    expect(container.firstChild).toHaveClass("gap-sm");

    rerender(<Grid gap={4}>Content</Grid>);
    expect(container.firstChild).toHaveClass("gap-md");

    rerender(<Grid gap={6}>Content</Grid>);
    expect(container.firstChild).toHaveClass("gap-lg");

    rerender(<Grid gap={8}>Content</Grid>);
    expect(container.firstChild).toHaveClass("gap-xl");

    rerender(<Grid gap={16}>Content</Grid>);
    expect(container.firstChild).toHaveClass("gap-3xl");

    rerender(<Grid gap={24}>Content</Grid>);
    expect(container.firstChild).toHaveClass("gap-5xl");
  });

  it("should apply responsive column classes", () => {
    const { container } = render(
      <Grid cols={1} md={2} lg={3} xl={4}>
        Content
      </Grid>,
    );
    const grid = container.firstChild;
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("md:grid-cols-2");
    expect(grid).toHaveClass("lg:grid-cols-3");
    expect(grid).toHaveClass("xl:grid-cols-4");
  });

  it("should apply align classes", () => {
    const { container, rerender } = render(<Grid align="start">Content</Grid>);
    expect(container.firstChild).toHaveClass("items-start");

    rerender(<Grid align="center">Content</Grid>);
    expect(container.firstChild).toHaveClass("items-center");

    rerender(<Grid align="end">Content</Grid>);
    expect(container.firstChild).toHaveClass("items-end");

    rerender(<Grid align="stretch">Content</Grid>);
    expect(container.firstChild).toHaveClass("items-stretch");
  });

  it("should apply justify classes", () => {
    const { container, rerender } = render(<Grid justify="start">Content</Grid>);
    expect(container.firstChild).toHaveClass("justify-start");

    rerender(<Grid justify="center">Content</Grid>);
    expect(container.firstChild).toHaveClass("justify-center");

    rerender(<Grid justify="between">Content</Grid>);
    expect(container.firstChild).toHaveClass("justify-between");

    rerender(<Grid justify="evenly">Content</Grid>);
    expect(container.firstChild).toHaveClass("justify-evenly");
  });

  it("should merge custom className", () => {
    const { container } = render(
      <Grid className="custom-class" cols={2}>
        Content
      </Grid>,
    );
    const grid = container.firstChild;
    expect(grid).toHaveClass("grid");
    expect(grid).toHaveClass("grid-cols-2");
    expect(grid).toHaveClass("custom-class");
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Grid ref={ref}>
        <div>Content</div>
      </Grid>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("should apply rows classes", () => {
    const { container } = render(<Grid rows={3}>Content</Grid>);
    const grid = container.firstChild;
    expect(grid).toHaveClass("grid-rows-3");
  });

  it("should apply flow classes", () => {
    const { container, rerender } = render(<Grid flow="row">Content</Grid>);
    expect(container.firstChild).toHaveClass("grid-flow-row");

    rerender(<Grid flow="col">Content</Grid>);
    expect(container.firstChild).toHaveClass("grid-flow-col");

    rerender(<Grid flow="dense">Content</Grid>);
    expect(container.firstChild).toHaveClass("grid-flow-dense");
  });

  it("should handle all props together", () => {
    const { container } = render(
      <Grid
        cols={2}
        md={3}
        lg={4}
        gap={4}
        align="center"
        justify="between"
        rows={2}
        flow="row"
        className="custom"
      >
        Content
      </Grid>,
    );
    const grid = container.firstChild;
    expect(grid).toHaveClass("grid");
    expect(grid).toHaveClass("grid-cols-2");
    expect(grid).toHaveClass("md:grid-cols-3");
    expect(grid).toHaveClass("lg:grid-cols-4");
    expect(grid).toHaveClass("gap-md");
    expect(grid).toHaveClass("items-center");
    expect(grid).toHaveClass("justify-between");
    expect(grid).toHaveClass("grid-rows-2");
    expect(grid).toHaveClass("grid-flow-row");
    expect(grid).toHaveClass("custom");
  });

  it("should use default cols when responsive props are not provided", () => {
    const { container } = render(
      <Grid cols={3} gap={4}>
        Content
      </Grid>,
    );
    const grid = container.firstChild;
    expect(grid).toHaveClass("grid-cols-3");
    // Should not have responsive classes when md/lg/xl are not provided
    expect(grid).not.toHaveClass("md:grid-cols-");
    expect(grid).not.toHaveClass("lg:grid-cols-");
    expect(grid).not.toHaveClass("xl:grid-cols-");
  });

  it("should handle gap token mapping correctly for all values", () => {
    const gapMappings = [
      [0, "gap-0"],
      [1, "gap-xs"],
      [2, "gap-sm"],
      [3, "gap-sm"],
      [4, "gap-md"],
      [5, "gap-md"],
      [6, "gap-lg"],
      [8, "gap-xl"],
      [10, "gap-2xl"],
      [12, "gap-2xl"],
      [16, "gap-3xl"],
      [20, "gap-4xl"],
      [24, "gap-5xl"],
    ] as const;

    gapMappings.forEach(([gapValue, expectedClass]) => {
      const { container } = render(<Grid gap={gapValue}>Content</Grid>);
      expect(container.firstChild).toHaveClass(expectedClass);
    });
  });
});
