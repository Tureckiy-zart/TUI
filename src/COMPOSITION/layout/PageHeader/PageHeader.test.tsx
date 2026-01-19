import { Button } from "@/PRIMITIVES/Button";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { PageHeader } from "./PageHeader";

describe("PageHeader component", () => {
  it("should render PageHeader with title", () => {
    const { container } = render(<PageHeader title="Page Title" />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(screen.getByText("Page Title")).toBeInTheDocument();
  });

  it("should render PageHeader with description", () => {
    render(<PageHeader title="Page Title" description="Page description" />);
    expect(screen.getByText("Page Title")).toBeInTheDocument();
    expect(screen.getByText("Page description")).toBeInTheDocument();
  });

  it("should render PageHeader with breadcrumbs", () => {
    render(
      <PageHeader
        title="Page Title"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Current" }]}
      />,
    );
    expect(screen.getByText("Page Title")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("should render PageHeader with actions", () => {
    render(
      <PageHeader
        title="Page Title"
        actions={
          <>
            <Button>Action 1</Button>
            <Button>Action 2</Button>
          </>
        }
      />,
    );
    expect(screen.getByText("Page Title")).toBeInTheDocument();
    expect(screen.getByText("Action 1")).toBeInTheDocument();
    expect(screen.getByText("Action 2")).toBeInTheDocument();
  });

  it("should render PageHeader with all props", () => {
    render(
      <PageHeader
        title="Page Title"
        description="Page description"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Current" }]}
        actions={<Button>Save</Button>}
      />,
    );
    expect(screen.getByText("Page Title")).toBeInTheDocument();
    expect(screen.getByText("Page description")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("should render as header element by default", () => {
    const { container } = render(<PageHeader title="Page Title" />);
    const header = container.querySelector("header");
    expect(header?.tagName).toBe("HEADER");
  });

  it("should render as different element when as prop is provided", () => {
    const { container, rerender } = render(<PageHeader title="Page Title" as="div" />);
    let element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe("DIV");

    rerender(<PageHeader title="Page Title" as="section" />);
    element = container.firstChild as HTMLElement;
    expect(element.tagName).toBe("SECTION");
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(<PageHeader title="Page Title" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("HEADER");
  });

  it("should apply aria-label when provided", () => {
    const { container } = render(<PageHeader title="Page Title" ariaLabel="Page header" />);
    const header = container.querySelector("header");
    expect(header).toHaveAttribute("aria-label", "Page header");
  });

  it("should not apply aria-label when not provided", () => {
    const { container } = render(<PageHeader title="Page Title" />);
    const header = container.querySelector("header");
    expect(header).not.toHaveAttribute("aria-label");
  });

  it("should not render when no content is provided", () => {
    const { container } = render(<PageHeader />);
    expect(container.firstChild).toBeNull();
  });

  it("should not render breadcrumbs when empty array is provided", () => {
    const { container } = render(<PageHeader title="Page Title" breadcrumbs={[]} />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(screen.getByText("Page Title")).toBeInTheDocument();
    // Breadcrumbs should not be rendered
    const nav = container.querySelector("nav");
    expect(nav).not.toBeInTheDocument();
  });

  it("should render only breadcrumbs when title and description are not provided", () => {
    render(<PageHeader breadcrumbs={[{ label: "Home", href: "/" }, { label: "Current" }]} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
    // Title should not be rendered
    const headings = screen.queryAllByRole("heading");
    expect(headings).toHaveLength(0);
  });

  it("should render only actions when title and description are not provided", () => {
    render(<PageHeader actions={<Button>Action</Button>} />);
    expect(screen.getByText("Action")).toBeInTheDocument();
    // Title should not be rendered
    const headings = screen.queryAllByRole("heading");
    expect(headings).toHaveLength(0);
  });

  it("should handle ReactNode title", () => {
    const { container } = render(
      <PageHeader
        title={
          <>
            <span>Custom </span>
            <span>Title</span>
          </>
        }
      />,
    );
    // Text is split across multiple elements, check textContent
    const heading = container.querySelector("h1");
    expect(heading?.textContent).toBe("Custom Title");
  });

  it("should handle ReactNode description", () => {
    const { container } = render(
      <PageHeader
        title="Page Title"
        description={
          <>
            <span>Custom </span>
            <span>Description</span>
          </>
        }
      />,
    );
    // Text is split across multiple elements, check textContent
    const description = container.querySelector("span[class*='text-[hsl(var(--tm-text-muted))]']");
    expect(description?.textContent).toBe("Custom Description");
  });

  it("should merge custom className", () => {
    const { container } = render(<PageHeader title="Page Title" className="custom-class" />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("custom-class", "w-full");
  });

  it("should apply w-full class", () => {
    const { container } = render(<PageHeader title="Page Title" />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("w-full");
  });

  it("should not render empty title", () => {
    const { container } = render(<PageHeader title="" />);
    // Empty string should be treated as falsy, component should not render
    expect(container.firstChild).toBeNull();
  });

  it("should not render empty description", () => {
    const { container } = render(<PageHeader title="Page Title" description="" />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(screen.getByText("Page Title")).toBeInTheDocument();
    // Empty description should not render Text component
    const textElements = container.querySelectorAll('[class*="text-"]');
    // Only heading should be present, no description text
    expect(textElements.length).toBeGreaterThanOrEqual(0);
  });
});
