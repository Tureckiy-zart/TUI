import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { Surface } from "./Surface";

describe("Surface component", () => {
  it("should render surface with default props", () => {
    const { container } = render(
      <Surface>
        <div>Content</div>
      </Surface>,
    );
    const surface = container.firstChild as HTMLElement;
    expect(surface).toBeInTheDocument();
    expect(surface?.tagName).toBe("DIV");
  });

  it("should apply default variant when variant prop is not provided", () => {
    const { container } = render(<Surface>Content</Surface>);
    const surface = container.firstChild as HTMLElement;
    // Default variant is "default" - should have default variant classes
    expect(surface).toBeInTheDocument();
  });

  it("should apply default variant explicitly", () => {
    const { container } = render(<Surface variant="default">Content</Surface>);
    const surface = container.firstChild as HTMLElement;
    expect(surface).toBeInTheDocument();
  });

  it("should apply elevated variant", () => {
    const { container } = render(<Surface variant="elevated">Content</Surface>);
    const surface = container.firstChild as HTMLElement;
    expect(surface).toBeInTheDocument();
  });

  it("should apply outlined variant", () => {
    const { container } = render(<Surface variant="outlined">Content</Surface>);
    const surface = container.firstChild as HTMLElement;
    expect(surface).toBeInTheDocument();
  });

  it("should apply filled variant", () => {
    const { container } = render(<Surface variant="filled">Content</Surface>);
    const surface = container.firstChild as HTMLElement;
    expect(surface).toBeInTheDocument();
  });

  it("should apply subtle variant", () => {
    const { container } = render(<Surface variant="subtle">Content</Surface>);
    const surface = container.firstChild as HTMLElement;
    expect(surface).toBeInTheDocument();
  });

  it("should apply custom padding prop", () => {
    const { container } = render(<Surface p="lg">Content</Surface>);
    const surface = container.firstChild as HTMLElement;
    expect(surface).toHaveStyle({ padding: "var(--spacing-lg)" });
  });

  it("should apply custom radius prop", () => {
    const { container } = render(<Surface radius="xl">Content</Surface>);
    const surface = container.firstChild as HTMLElement;
    expect(surface).toHaveStyle({ borderRadius: "var(--radius-xl)" });
  });

  it("should use default padding from variant when p prop is not provided", () => {
    const { container } = render(<Surface variant="default">Content</Surface>);
    const surface = container.firstChild as HTMLElement;
    // Default variant has "p-md" - should extract "md" and apply
    expect(surface).toHaveStyle({ padding: "var(--spacing-md)" });
  });

  it("should use default radius from variant when radius prop is not provided", () => {
    const { container } = render(<Surface variant="default">Content</Surface>);
    const surface = container.firstChild as HTMLElement;
    // Default variant has "rounded-md" - should extract "md" and apply
    expect(surface).toHaveStyle({ borderRadius: "var(--radius-md)" });
  });

  it("should override variant default padding with p prop", () => {
    const { container } = render(
      <Surface variant="default" p="lg">
        Content
      </Surface>,
    );
    const surface = container.firstChild as HTMLElement;
    expect(surface).toHaveStyle({ padding: "var(--spacing-lg)" });
  });

  it("should override variant default radius with radius prop", () => {
    const { container } = render(
      <Surface variant="default" radius="xl">
        Content
      </Surface>,
    );
    const surface = container.firstChild as HTMLElement;
    expect(surface).toHaveStyle({ borderRadius: "var(--radius-xl)" });
  });

  it("should merge custom className", () => {
    const { container } = render(<Surface className="custom-class">Content</Surface>);
    const surface = container.firstChild as HTMLElement;
    expect(surface).toHaveClass("custom-class");
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Surface ref={ref}>
        <div>Content</div>
      </Surface>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("should forward other Box props", () => {
    const { container } = render(
      <Surface m="md" data-testid="surface">
        Content
      </Surface>,
    );
    const surface = container.firstChild as HTMLElement;
    expect(surface).toHaveAttribute("data-testid", "surface");
    expect(surface).toHaveStyle({ margin: "var(--spacing-md)" });
  });

  it("should render all variant combinations with props", () => {
    const variants: Array<"default" | "elevated" | "outlined" | "filled" | "subtle"> = [
      "default",
      "elevated",
      "outlined",
      "filled",
      "subtle",
    ];

    variants.forEach((variant) => {
      const { container, unmount } = render(
        <Surface variant={variant} p="md" radius="md">
          {variant} variant
        </Surface>,
      );
      const surface = container.firstChild as HTMLElement;
      expect(surface).toBeInTheDocument();
      unmount();
    });
  });
});
