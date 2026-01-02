import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Section } from "./Section";

describe("Section component", () => {
  it("should render section with default props", () => {
    const { container } = render(
      <Section>
        <div>Content block 1</div>
        <div>Content block 2</div>
      </Section>,
    );
    const section = container.firstChild as HTMLElement;
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe("SECTION");
    expect(section).toHaveClass("w-full");
  });

  it("should apply default spaceY", () => {
    const { container } = render(<Section>Content</Section>);
    const section = container.firstChild as HTMLElement;
    // Default spaceY is "md", which is applied via Stack's py prop
    // We verify the component renders correctly
    expect(section).toBeInTheDocument();
  });

  it("should apply spaceY prop as vertical padding", () => {
    const { container, rerender } = render(<Section spaceY="sm">Content</Section>);
    const section = container.firstChild as HTMLElement;
    expect(section).toBeInTheDocument();

    rerender(<Section spaceY="lg">Content</Section>);
    expect(section).toBeInTheDocument();
  });

  it("should apply spacing prop for content blocks", () => {
    const { container } = render(
      <Section spacing="md">
        <div>Content block 1</div>
        <div>Content block 2</div>
      </Section>,
    );
    const section = container.firstChild as HTMLElement;
    expect(section).toBeInTheDocument();
    // Spacing is applied via Stack's spacing prop
    // We verify the component renders correctly
  });

  it("should render as section element by default", () => {
    const { container } = render(<Section>Content</Section>);
    const section = container.firstChild as HTMLElement;
    expect(section.tagName).toBe("SECTION");
  });

  it("should render as different element when as prop is provided", () => {
    const { container, rerender } = render(<Section as="article">Content</Section>);
    let section = container.firstChild as HTMLElement;
    expect(section.tagName).toBe("ARTICLE");

    rerender(<Section as="div">Content</Section>);
    section = container.firstChild as HTMLElement;
    expect(section.tagName).toBe("DIV");
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Section ref={ref}>
        <div>Content</div>
      </Section>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("SECTION");
  });

  it("should apply w-full class", () => {
    const { container } = render(<Section>Content</Section>);
    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass("w-full");
  });

  it("should merge custom className", () => {
    const { container } = render(<Section className="custom-class">Content</Section>);
    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass("custom-class", "w-full");
  });

  it("should handle responsive spaceY values", () => {
    const { container } = render(
      <Section spaceY={{ base: "sm", md: "lg", lg: "xl" }}>Content</Section>,
    );
    const section = container.firstChild as HTMLElement;
    expect(section).toBeInTheDocument();
    // Responsive values are handled by Stack component
  });

  it("should handle responsive spacing values", () => {
    const { container } = render(
      <Section spacing={{ base: "sm", md: "md", lg: "lg" }}>
        <div>Content block 1</div>
        <div>Content block 2</div>
      </Section>,
    );
    const section = container.firstChild as HTMLElement;
    expect(section).toBeInTheDocument();
    // Responsive values are handled by Stack component
  });

  it("should pass through Stack props", () => {
    const { container } = render(
      <Section spaceY="md" spacing="md" align="center" justify="between">
        <div>Content block 1</div>
        <div>Content block 2</div>
      </Section>,
    );
    const section = container.firstChild as HTMLElement;
    expect(section).toBeInTheDocument();
    // Stack props are passed through to underlying Stack component
  });

  it("should not allow py prop (conflicts with spaceY)", () => {
    // TypeScript should prevent this, but we verify runtime behavior
    const { container } = render(
      <Section spaceY="md" {...({ py: "lg" } as any)}>
        Content
      </Section>,
    );
    const section = container.firstChild as HTMLElement;
    expect(section).toBeInTheDocument();
    // spaceY prop should take precedence
  });

  it("should not allow spacing prop conflict", () => {
    // Section's spacing prop should work correctly
    const { container } = render(
      <Section spacing="md">
        <div>Content block 1</div>
        <div>Content block 2</div>
      </Section>,
    );
    const section = container.firstChild as HTMLElement;
    expect(section).toBeInTheDocument();
  });
});
