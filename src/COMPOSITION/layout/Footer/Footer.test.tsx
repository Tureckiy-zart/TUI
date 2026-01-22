import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer component", () => {
  it("should render footer with default props", () => {
    const { container } = render(<Footer>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toBeInTheDocument();
    expect(footerEl).toHaveClass("w-full", "border-t", "border-[hsl(var(--tm-border-default))]");
  });

  it("should render footer with left slot", () => {
    render(<Footer left={<div>Left content</div>} />);
    expect(screen.getByText("Left content")).toBeInTheDocument();
  });

  it("should render footer with center slot", () => {
    render(<Footer center={<div>Center content</div>} />);
    expect(screen.getByText("Center content")).toBeInTheDocument();
  });

  it("should render footer with right slot", () => {
    render(<Footer right={<div>Right content</div>} />);
    expect(screen.getByText("Right content")).toBeInTheDocument();
  });

  it("should render footer with all slots", () => {
    render(<Footer left={<div>Left</div>} center={<div>Center</div>} right={<div>Right</div>} />);
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Center")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("should render footer with children instead of slots", () => {
    render(<Footer>Children content</Footer>);
    expect(screen.getByText("Children content")).toBeInTheDocument();
    // Slots should be ignored when children is provided
    const { container: container2 } = render(<Footer left={<div>Left</div>}>Children</Footer>);
    expect(screen.getByText("Children")).toBeInTheDocument();
    expect(container2.querySelector("footer")?.textContent).not.toContain("Left");
  });

  it("should apply horizontal padding using spacing tokens", () => {
    const { container } = render(<Footer px="md">Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveClass("px-md");
  });

  it("should apply vertical padding using spacing tokens", () => {
    const { container } = render(<Footer py="lg">Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveClass("py-lg");
  });

  it("should apply background color using color tokens", () => {
    const { container } = render(<Footer bg="muted">Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveStyle({
      backgroundColor: "var(--tm-muted)",
    });
  });

  it("should show border by default", () => {
    const { container } = render(<Footer>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveClass("border-t", "border-[hsl(var(--tm-border-default))]");
  });

  it("should hide border when border=false", () => {
    const { container } = render(<Footer border={false}>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).not.toHaveClass("border-t", "border-[hsl(var(--tm-border-default))]");
  });

  it("should apply aria-label when provided", () => {
    const { container } = render(<Footer ariaLabel="Site footer">Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveAttribute("aria-label", "Site footer");
  });

  it("should not apply aria-label when not provided", () => {
    const { container } = render(<Footer>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).not.toHaveAttribute("aria-label");
  });

  it("should render as semantic footer element", () => {
    const { container } = render(<Footer>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl?.tagName).toBe("FOOTER");
  });

  it("should forward ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Footer ref={ref}>Content</Footer>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe("FOOTER");
  });

  it("should apply custom className", () => {
    const { container } = render(<Footer className="custom-class">Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveClass("custom-class");
  });

  it("should apply default padding values", () => {
    const { container } = render(<Footer>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveClass("px-md", "py-lg");
  });

  it("should apply default background color", () => {
    const { container } = render(<Footer>Content</Footer>);
    const footerEl = container.querySelector("footer");
    expect(footerEl).toHaveStyle({
      backgroundColor: "var(--tm-surface-base)",
    });
  });

  it("should merge user style with computed styles without overriding", () => {
    const { container } = render(
      <Footer px="md" py="lg" bg="muted" style={{ color: "red" }}>
        Content
      </Footer>,
    );
    const footerEl = container.querySelector("footer");
    // Padding classes should be present
    expect(footerEl).toHaveClass("px-md", "py-lg");
    // Background color should be in inline styles
    expect(footerEl).toHaveStyle({
      backgroundColor: "var(--tm-muted)",
    });
    // User style should be merged (color should be present, browser converts "red" to rgb)
    const computedColor = window.getComputedStyle(footerEl!).color;
    expect(computedColor).toBe("rgb(255, 0, 0)");
  });

  it("should apply responsive padding classes", () => {
    const { container } = render(
      <Footer px={{ base: "sm", lg: "xl" }} py={{ base: "md", lg: "2xl" }}>
        Content
      </Footer>,
    );
    const footerEl = container.querySelector("footer");
    // Should have base classes
    expect(footerEl).toHaveClass("px-sm", "py-md");
    // Should have responsive classes
    expect(footerEl).toHaveClass("lg:px-xl", "lg:py-2xl");
  });

  it("should render social links with icons", () => {
    const { container } = render(
      <Footer
        socialLinks={[
          { icon: <div data-testid="icon-1" />, label: "Test Link 1", href: "#1" },
          { icon: <div data-testid="icon-2" />, label: "Test Link 2", href: "#2" },
        ]}
      />,
    );
    const footerEl = container.querySelector("footer");
    expect(footerEl).toBeInTheDocument();

    // Check that links are rendered
    const links = container.querySelectorAll("a[href]");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "#1");
    expect(links[0]).toHaveAttribute("aria-label", "Test Link 1");
    expect(links[1]).toHaveAttribute("href", "#2");
    expect(links[1]).toHaveAttribute("aria-label", "Test Link 2");

    // Check that icons are rendered
    expect(container.querySelector('[data-testid="icon-1"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="icon-2"]')).toBeInTheDocument();
  });

  it("should render social links without icons (text only)", () => {
    const { container } = render(
      <Footer
        socialLinks={[
          { label: "Twitter", href: "#twitter" },
          { label: "Facebook", href: "#facebook" },
        ]}
      />,
    );
    const footerEl = container.querySelector("footer");
    expect(footerEl).toBeInTheDocument();

    // Check that links are rendered with text labels
    const links = container.querySelectorAll("a[href]");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "#twitter");
    expect(links[0]).toHaveAttribute("aria-label", "Twitter");
    expect(links[0]).toHaveTextContent("Twitter");
    expect(links[1]).toHaveAttribute("href", "#facebook");
    expect(links[1]).toHaveAttribute("aria-label", "Facebook");
    expect(links[1]).toHaveTextContent("Facebook");
  });

  it("should use custom aria-label when provided in social link", () => {
    const { container } = render(
      <Footer
        socialLinks={[
          { icon: <div />, label: "Twitter", href: "#", ariaLabel: "Follow us on Twitter" },
        ]}
      />,
    );
    const link = container.querySelector('a[href="#"]');
    expect(link).toHaveAttribute("aria-label", "Follow us on Twitter");
  });

  it("should prioritize socialLinks over right prop", () => {
    const { container } = render(
      <Footer
        right={<div data-testid="right-content">Right content</div>}
        socialLinks={[{ label: "Social Link", href: "#" }]}
      />,
    );
    // socialLinks should be rendered, not right prop
    expect(container.querySelector('[data-testid="right-content"]')).not.toBeInTheDocument();
    expect(container.querySelector('a[href="#"]')).toBeInTheDocument();
    expect(container.querySelector('a[href="#"]')).toHaveTextContent("Social Link");
  });

  it("should render right prop when socialLinks is not provided", () => {
    const { container } = render(
      <Footer right={<div data-testid="right-content">Right content</div>} />,
    );
    expect(container.querySelector('[data-testid="right-content"]')).toBeInTheDocument();
  });
});
