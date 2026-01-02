import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { Spacer } from "./Spacer";

describe("Spacer component", () => {
  it("should render Spacer with default props", () => {
    const { container } = render(<Spacer size="md" />);
    const spacer = container.firstChild as HTMLElement;
    expect(spacer).toBeInTheDocument();
    expect(spacer?.tagName).toBe("DIV");
  });

  it("should apply vertical spacing by default", () => {
    const { container } = render(<Spacer size="md" />);
    const spacer = container.firstChild as HTMLElement;
    expect(spacer).toHaveStyle({
      height: "var(--spacing-md)",
      width: "100%",
    });
  });

  it("should apply horizontal spacing when orientation is horizontal", () => {
    const { container } = render(<Spacer orientation="horizontal" size="lg" />);
    const spacer = container.firstChild as HTMLElement;
    expect(spacer).toHaveStyle({
      width: "var(--spacing-lg)",
      height: "100%",
    });
  });

  it("should apply vertical spacing when orientation is vertical", () => {
    const { container } = render(<Spacer orientation="vertical" size="xl" />);
    const spacer = container.firstChild as HTMLElement;
    expect(spacer).toHaveStyle({
      height: "var(--spacing-xl)",
      width: "100%",
    });
  });

  it("should apply base spacing tokens", () => {
    const { container, rerender } = render(<Spacer size={4} />);
    const spacer = container.firstChild as HTMLElement;
    expect(spacer).toHaveStyle({
      height: "var(--spacing-4)",
    });

    rerender(<Spacer size={8} />);
    expect(spacer).toHaveStyle({
      height: "var(--spacing-8)",
    });
  });

  it("should apply semantic spacing tokens", () => {
    const { container, rerender } = render(<Spacer size="xs" />);
    const spacer = container.firstChild as HTMLElement;
    expect(spacer).toHaveStyle({
      height: "var(--spacing-xs)",
    });

    rerender(<Spacer size="sm" />);
    expect(spacer).toHaveStyle({
      height: "var(--spacing-sm)",
    });

    rerender(<Spacer size="md" />);
    expect(spacer).toHaveStyle({
      height: "var(--spacing-md)",
    });

    rerender(<Spacer size="lg" />);
    expect(spacer).toHaveStyle({
      height: "var(--spacing-lg)",
    });

    rerender(<Spacer size="xl" />);
    expect(spacer).toHaveStyle({
      height: "var(--spacing-xl)",
    });
  });

  it("should apply layout spacing tokens", () => {
    const { container, rerender } = render(<Spacer size="section-md" />);
    const spacer = container.firstChild as HTMLElement;
    expect(spacer).toHaveStyle({
      height: "var(--layout-section-md)",
    });

    rerender(<Spacer size="container-lg" />);
    expect(spacer).toHaveStyle({
      height: "var(--layout-container-lg)",
    });

    rerender(<Spacer size="grid-sm" />);
    expect(spacer).toHaveStyle({
      height: "var(--layout-grid-sm)",
    });

    rerender(<Spacer size="stack-lg" />);
    expect(spacer).toHaveStyle({
      height: "var(--layout-stack-lg)",
    });

    rerender(<Spacer size="component-xl" />);
    expect(spacer).toHaveStyle({
      height: "var(--layout-component-xl)",
    });
  });

  it("should have correct accessibility attributes", () => {
    const { container } = render(<Spacer size="md" />);
    const spacer = container.firstChild as HTMLElement;
    expect(spacer).toHaveAttribute("aria-hidden", "true");
    expect(spacer).toHaveAttribute("role", "none");
  });

  it("should forward ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Spacer ref={ref} size="md" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("should apply correct styles for horizontal orientation with different sizes", () => {
    const { container, rerender } = render(<Spacer orientation="horizontal" size="sm" />);
    const spacer = container.firstChild as HTMLElement;
    expect(spacer).toHaveStyle({
      width: "var(--spacing-sm)",
      height: "100%",
    });

    rerender(<Spacer orientation="horizontal" size="section-lg" />);
    expect(spacer).toHaveStyle({
      width: "var(--layout-section-lg)",
      height: "100%",
    });
  });

  it("should handle zero spacing", () => {
    const { container } = render(<Spacer size={0} />);
    const spacer = container.firstChild as HTMLElement;
    expect(spacer).toHaveStyle({
      height: "var(--spacing-0)",
    });
  });

  it("should handle none semantic spacing", () => {
    const { container } = render(<Spacer size="none" />);
    const spacer = container.firstChild as HTMLElement;
    expect(spacer).toHaveStyle({
      height: "var(--spacing-none)",
    });
  });
});
