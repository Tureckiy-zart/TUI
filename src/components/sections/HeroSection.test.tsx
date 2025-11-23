import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "./HeroSection";
import { Button } from "@/components/primitives/Button";

describe("HeroSection component", () => {
  it("should render hero section with title", () => {
    render(<HeroSection title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /hero section/i })).toBeInTheDocument();
  });

  it("should render with description", () => {
    render(<HeroSection title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("should render with actions", () => {
    render(
      <HeroSection
        title="Test Title"
        actions={<Button>Click Me</Button>}
      />,
    );
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("should render with media", () => {
    render(
      <HeroSection
        title="Test Title"
        media={<div data-testid="media">Media Content</div>}
      />,
    );
    expect(screen.getByTestId("media")).toBeInTheDocument();
  });

  it("should apply full-width variant by default", () => {
    const { container } = render(<HeroSection title="Test Title" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-background");
  });

  it("should apply split variant", () => {
    const { container } = render(<HeroSection title="Test Title" variant="split" />);
    const section = container.querySelector("section");
    const innerDiv = container.querySelector(".grid");
    expect(innerDiv).toHaveClass("md:grid-cols-2");
  });

  it("should apply background variants", () => {
    const { container: container1 } = render(
      <HeroSection title="Test" background="muted" />,
    );
    expect(container1.querySelector("section")).toHaveClass("bg-muted");

    const { container: container2 } = render(
      <HeroSection title="Test" background="card" />,
    );
    expect(container2.querySelector("section")).toHaveClass("bg-card");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <HeroSection title="Test" className="custom-class" />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("should use semantic HTML", () => {
    const { container } = render(<HeroSection title="Test Title" />);
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(container.querySelector("header")).toBeInTheDocument();
    expect(container.querySelector("h1")).toBeInTheDocument();
  });

  it("should have proper ARIA label", () => {
    const { container } = render(<HeroSection title="Test Title" />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-label", "Hero section");
  });

  it("should center content in full-width variant", () => {
    const { container } = render(
      <HeroSection title="Test Title" variant="full-width" />,
    );
    const contentDiv = container.querySelector(".flex.flex-col.items-center");
    expect(contentDiv).toBeInTheDocument();
  });

  it("should handle long title text", () => {
    const longTitle = "This is a very long title that should still render correctly";
    render(<HeroSection title={longTitle} />);
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it("should handle ReactNode title", () => {
    render(
      <HeroSection
        title={
          <span>
            <strong>Bold</strong> Title
          </span>
        }
      />,
    );
    expect(screen.getByText("Bold")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("should handle ReactNode description", () => {
    render(
      <HeroSection
        title="Test"
        description={
          <span>
            Description with <em>emphasis</em>
          </span>
        }
      />,
    );
    expect(screen.getByText(/description with/i)).toBeInTheDocument();
    expect(screen.getByText("emphasis")).toBeInTheDocument();
  });

  it("should render without description", () => {
    render(<HeroSection title="Test Title" />);
    expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
  });

  it("should render without actions", () => {
    render(<HeroSection title="Test Title" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should render without media", () => {
    const { container } = render(<HeroSection title="Test Title" />);
    expect(container.querySelector('[data-testid="media"]')).not.toBeInTheDocument();
  });

  it("should apply responsive classes", () => {
    const { container } = render(
      <HeroSection title="Test" variant="full-width" />,
    );
    const heading = container.querySelector("h1");
    expect(heading).toHaveClass("text-4xl", "md:text-5xl", "lg:text-6xl");
  });

  it("should apply transition classes for theme awareness", () => {
    const { container } = render(<HeroSection title="Test" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("transition-colors");
  });
});


