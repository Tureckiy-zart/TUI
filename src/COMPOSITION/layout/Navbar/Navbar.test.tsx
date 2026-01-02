import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Navbar } from "./Navbar";

describe("Navbar component", () => {
  it("should render navbar with default props", () => {
    const { container } = render(<Navbar>Content</Navbar>);
    const navEl = container.querySelector("nav");
    expect(navEl).toBeInTheDocument();
    expect(navEl).toHaveAttribute("aria-label", "Primary navigation");
  });

  it("should render navbar with left slot", () => {
    render(<Navbar left={<div>Left content</div>} />);
    expect(screen.getByText("Left content")).toBeInTheDocument();
  });

  it("should render navbar with right slot", () => {
    render(<Navbar right={<div>Right content</div>} />);
    expect(screen.getByText("Right content")).toBeInTheDocument();
  });

  it("should render navbar with children slot", () => {
    render(<Navbar children={<div>Children content</div>} />);
    expect(screen.getByText("Children content")).toBeInTheDocument();
  });

  it("should render navbar with all slots", () => {
    render(<Navbar left={<div>Left</div>} right={<div>Right</div>} children={<div>Center</div>} />);
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
    expect(screen.getByText("Center")).toBeInTheDocument();
  });

  it("should render navbar with children and slots together", () => {
    render(
      <Navbar left={<div>Left</div>} right={<div>Right</div>}>
        <div>Children</div>
      </Navbar>,
    );
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
    expect(screen.getByText("Children")).toBeInTheDocument();
  });

  it("should apply custom aria-label when provided", () => {
    const { container } = render(<Navbar ariaLabel="Main navigation">Content</Navbar>);
    const navEl = container.querySelector("nav");
    expect(navEl).toHaveAttribute("aria-label", "Main navigation");
  });

  it("should apply default aria-label when not provided", () => {
    const { container } = render(<Navbar>Content</Navbar>);
    const navEl = container.querySelector("nav");
    expect(navEl).toHaveAttribute("aria-label", "Primary navigation");
  });

  it("should render as semantic nav element", () => {
    const { container } = render(<Navbar>Content</Navbar>);
    const navEl = container.querySelector("nav");
    expect(navEl?.tagName).toBe("NAV");
  });

  it("should forward HTML attributes", () => {
    const { container } = render(
      <Navbar data-testid="navbar" id="main-nav">
        Content
      </Navbar>,
    );
    const navEl = container.querySelector("nav");
    expect(navEl).toHaveAttribute("data-testid", "navbar");
    expect(navEl).toHaveAttribute("id", "main-nav");
  });

  it("should apply custom className", () => {
    const { container } = render(<Navbar className="custom-class">Content</Navbar>);
    const navEl = container.querySelector("nav");
    expect(navEl).toHaveClass("custom-class");
  });

  it("should render empty navbar when no slots or children provided", () => {
    const { container } = render(<Navbar />);
    const navEl = container.querySelector("nav");
    expect(navEl).toBeInTheDocument();
    expect(navEl?.textContent).toBe("");
  });

  it("should render only left slot when provided", () => {
    render(<Navbar left={<div>Left only</div>} />);
    expect(screen.getByText("Left only")).toBeInTheDocument();
    expect(screen.queryByText("Right")).not.toBeInTheDocument();
  });

  it("should render only right slot when provided", () => {
    render(<Navbar right={<div>Right only</div>} />);
    expect(screen.getByText("Right only")).toBeInTheDocument();
    expect(screen.queryByText("Left")).not.toBeInTheDocument();
  });

  it("should render only children when provided without slots", () => {
    render(<Navbar>Children only</Navbar>);
    expect(screen.getByText("Children only")).toBeInTheDocument();
  });
});
