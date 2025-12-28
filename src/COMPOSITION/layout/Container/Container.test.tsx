import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Container } from "./Container";

describe("Container component", () => {
  it("should render container with default props", () => {
    const { container } = render(<Container>Content</Container>);
    const containerEl = container.firstChild as HTMLElement;
    expect(containerEl).toBeInTheDocument();
    expect(containerEl).toHaveClass("tm-container");
  });

  it("should apply maxWidth using container tokens", () => {
    const { container, rerender } = render(<Container maxWidth="lg">Content</Container>);
    const containerEl = container.firstChild as HTMLElement;
    expect(containerEl).toHaveStyle({ maxWidth: "32rem" }); // lg = 32rem

    rerender(<Container maxWidth="md">Content</Container>);
    expect(containerEl).toHaveStyle({ maxWidth: "28rem" }); // md = 28rem
  });

  it("should apply horizontal padding using spacing tokens", () => {
    const { container } = render(<Container padding="md">Content</Container>);
    const containerEl = container.firstChild as HTMLElement;
    expect(containerEl).toHaveStyle({
      paddingLeft: "var(--spacing-md)",
      paddingRight: "var(--spacing-md)",
    });
  });

  it("should center container by default", () => {
    const { container } = render(<Container maxWidth="lg">Content</Container>);
    const containerEl = container.firstChild as HTMLElement;
    expect(containerEl).toHaveStyle({
      marginLeft: "auto",
      marginRight: "auto",
    });
  });

  it("should not center when center=false", () => {
    const { container } = render(
      <Container maxWidth="lg" center={false}>
        Content
      </Container>,
    );
    const containerEl = container.firstChild as HTMLElement;
    expect(containerEl).not.toHaveStyle({
      marginLeft: "auto",
      marginRight: "auto",
    });
  });

  it("should use default padding when not specified", () => {
    const { container } = render(<Container>Content</Container>);
    const containerEl = container.firstChild as HTMLElement;
    // Default is container-md
    expect(containerEl).toHaveStyle({
      paddingLeft: expect.stringContaining("var(--spacing"),
      paddingRight: expect.stringContaining("var(--spacing"),
    });
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Container ref={ref}>
        <div>Content</div>
      </Container>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.tagName).toBe("DIV");
  });

  describe("Scope limitations", () => {
    it("should NOT accept display prop", () => {
      const { container } = render(
        <Container {...({ display: "flex" } as any)}>Content</Container>,
      );
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).not.toHaveClass("flex");
    });

    it("should NOT accept flexDirection prop", () => {
      // Suppress React warning about invalid DOM prop (this is expected for this test)
      const originalError = console.error;
      const consoleError = vi.spyOn(console, "error").mockImplementation((message) => {
        // Suppress only the specific warning about flexDirection prop
        if (typeof message === "string" && message.includes("flexDirection")) {
          return;
        }
        // Allow other console.error calls to pass through
        originalError(message);
      });

      const { container } = render(
        <Container {...({ flexDirection: "row" } as any)}>Content</Container>,
      );
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).not.toHaveClass("flex-row");

      consoleError.mockRestore();
    });

    it("should NOT accept gap prop", () => {
      const { container } = render(<Container {...({ gap: "md" } as any)}>Content</Container>);
      const containerEl = container.firstChild as HTMLElement;
      // Container should not have gap style (it's not a layout composition component)
      const gapValue = containerEl.style.gap;
      expect(gapValue).toBe("");
    });

    it("should NOT accept align prop", () => {
      const { container } = render(
        <Container {...({ align: "center" } as any)}>Content</Container>,
      );
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).not.toHaveClass("items-center");
    });

    it("should NOT accept justify prop", () => {
      const { container } = render(
        <Container {...({ justify: "between" } as any)}>Content</Container>,
      );
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).not.toHaveClass("justify-between");
    });

    it("should only accept maxWidth, padding, and center props", () => {
      const { container } = render(
        <Container maxWidth="lg" padding="md" center={true}>
          Content
        </Container>,
      );
      const containerEl = container.firstChild as HTMLElement;
      expect(containerEl).toHaveClass("tm-container");
      expect(containerEl).toHaveStyle({
        maxWidth: "32rem",
        paddingLeft: "var(--spacing-md)",
        paddingRight: "var(--spacing-md)",
        marginLeft: "auto",
        marginRight: "auto",
      });
    });
  });
});
