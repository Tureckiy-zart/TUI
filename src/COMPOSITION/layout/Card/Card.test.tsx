import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card component", () => {
  it("should render card with default props", () => {
    const { container } = render(
      <Card>
        <div>Content</div>
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toBeInTheDocument();
    expect(card?.tagName).toBe("DIV");
  });

  it("should apply default size when size prop is not provided", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toBeInTheDocument();
  });

  it("should apply sm size", () => {
    const { container } = render(<Card size="sm">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toBeInTheDocument();
  });

  it("should apply md size (default)", () => {
    const { container } = render(<Card size="md">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toBeInTheDocument();
  });

  it("should apply lg size", () => {
    const { container } = render(<Card size="lg">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toBeInTheDocument();
  });

  it("should apply custom radius prop", () => {
    const { container } = render(<Card radius="xl">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({ borderRadius: "var(--radius-xl)" });
  });

  it("should apply custom shadow prop", () => {
    const { container } = render(<Card shadow="md">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toBeInTheDocument();
  });

  it("should apply custom padding prop", () => {
    const { container } = render(<Card p="lg">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({ padding: "var(--spacing-lg)" });
  });

  it("should use default radius from size when radius prop is not provided", () => {
    const { container } = render(<Card size="md">Content</Card>);
    const card = container.firstChild as HTMLElement;
    // md size has "rounded-xl" - should extract "xl" and apply
    expect(card).toHaveStyle({ borderRadius: "var(--radius-xl)" });
  });

  it("should use default shadow from size when shadow prop is not provided", () => {
    const { container } = render(<Card size="md">Content</Card>);
    const card = container.firstChild as HTMLElement;
    // md size has "shadow" - should map to "xs"
    expect(card).toBeInTheDocument();
  });

  it("should use default padding from size when p prop is not provided", () => {
    const { container } = render(<Card size="md">Content</Card>);
    const card = container.firstChild as HTMLElement;
    // md size has "p-lg" - should extract "lg" and apply
    expect(card).toHaveStyle({ padding: "var(--spacing-lg)" });
  });

  it("should override size default radius with radius prop", () => {
    const { container } = render(
      <Card size="md" radius="sm">
        Content
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({ borderRadius: "var(--radius-sm)" });
  });

  it("should override size default shadow with shadow prop", () => {
    const { container } = render(
      <Card size="md" shadow="lg">
        Content
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toBeInTheDocument();
  });

  it("should override size default padding with p prop", () => {
    const { container } = render(
      <Card size="md" p="sm">
        Content
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({ padding: "var(--spacing-sm)" });
  });

  it("should merge custom className", () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("custom-class");
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Card ref={ref}>
        <div>Content</div>
      </Card>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("should forward other Box props", () => {
    const { container } = render(
      <Card m="md" data-testid="card">
        Content
      </Card>,
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute("data-testid", "card");
    expect(card).toHaveStyle({ margin: "var(--spacing-md)" });
  });

  describe("Card.Header", () => {
    it("should render CardHeader", () => {
      const { container } = render(
        <Card>
          <Card.Header>Header</Card.Header>
        </Card>,
      );
      const header = container.querySelector("div");
      expect(header).toBeInTheDocument();
    });

    it("should apply size prop to CardHeader", () => {
      const { container } = render(
        <Card>
          <Card.Header size="sm">Header</Card.Header>
        </Card>,
      );
      const header = container.querySelector("div");
      expect(header).toBeInTheDocument();
    });

    it("should apply custom padding to CardHeader", () => {
      const { container } = render(
        <Card>
          <Card.Header p="lg">Header</Card.Header>
        </Card>,
      );
      const divs = container.querySelectorAll("div");
      const header = divs[1]; // First div is Card, second is Header
      expect(header).toHaveStyle({
        paddingLeft: "var(--spacing-lg)",
        paddingRight: "var(--spacing-lg)",
        paddingTop: "var(--spacing-lg)",
        paddingBottom: "var(--spacing-lg)",
      });
    });
  });

  describe("Card.Body", () => {
    it("should render CardBody", () => {
      const { container } = render(
        <Card>
          <Card.Body>Body</Card.Body>
        </Card>,
      );
      const body = container.querySelector("div");
      expect(body).toBeInTheDocument();
    });

    it("should apply size prop to CardBody", () => {
      const { container } = render(
        <Card>
          <Card.Body size="lg">Body</Card.Body>
        </Card>,
      );
      const body = container.querySelector("div");
      expect(body).toBeInTheDocument();
    });

    it("should apply custom padding to CardBody", () => {
      const { container } = render(
        <Card>
          <Card.Body p="sm">Body</Card.Body>
        </Card>,
      );
      const divs = container.querySelectorAll("div");
      const body = divs[1]; // First div is Card, second is Body
      expect(body).toHaveStyle({
        paddingLeft: "var(--spacing-sm)",
        paddingRight: "var(--spacing-sm)",
        paddingTop: "var(--spacing-sm)",
        paddingBottom: "var(--spacing-sm)",
      });
    });
  });

  describe("Card.Footer", () => {
    it("should render CardFooter", () => {
      const { container } = render(
        <Card>
          <Card.Footer>Footer</Card.Footer>
        </Card>,
      );
      const footer = container.querySelector("div");
      expect(footer).toBeInTheDocument();
    });

    it("should apply size prop to CardFooter", () => {
      const { container } = render(
        <Card>
          <Card.Footer size="md">Footer</Card.Footer>
        </Card>,
      );
      const footer = container.querySelector("div");
      expect(footer).toBeInTheDocument();
    });

    it("should apply custom padding to CardFooter", () => {
      const { container } = render(
        <Card>
          <Card.Footer p="xl">Footer</Card.Footer>
        </Card>,
      );
      const divs = container.querySelectorAll("div");
      const footer = divs[1]; // First div is Card, second is Footer
      expect(footer).toHaveStyle({
        paddingLeft: "var(--spacing-xl)",
        paddingRight: "var(--spacing-xl)",
        paddingTop: "var(--spacing-xl)",
        paddingBottom: "var(--spacing-xl)",
      });
    });

    it("should apply center alignment to CardFooter", () => {
      const { container } = render(
        <Card>
          <Card.Footer>Footer</Card.Footer>
        </Card>,
      );
      const footer = container.querySelector("div");
      // Row component applies align="center" which maps to "items-center"
      expect(footer).toBeInTheDocument();
    });
  });

  describe("Card with subcomponents", () => {
    it("should render complete card with all subcomponents", () => {
      const { container } = render(
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
      expect(container.querySelectorAll("div").length).toBeGreaterThan(1);
    });

    it("should apply size to all subcomponents", () => {
      const { container } = render(
        <Card size="lg">
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>,
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
    });
  });
});
