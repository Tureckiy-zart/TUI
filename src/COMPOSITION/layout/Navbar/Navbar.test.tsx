import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Navbar } from "./Navbar";

describe("Navbar component", () => {
  // Basic rendering tests
  it("should render navbar with default props", () => {
    const { container } = render(<Navbar>Content</Navbar>);
    const navEl = container.querySelector("nav");
    expect(navEl).toBeInTheDocument();
    expect(navEl).toHaveAttribute("aria-label", "Primary navigation");
  });

  it("should render as semantic nav element", () => {
    const { container } = render(<Navbar>Content</Navbar>);
    const navEl = container.querySelector("nav");
    expect(navEl?.tagName).toBe("NAV");
  });

  it("should render empty navbar when no zones or children provided", () => {
    const { container } = render(<Navbar />);
    const navEl = container.querySelector("nav");
    expect(navEl).toBeInTheDocument();
    expect(navEl?.textContent).toBe("");
  });

  // Zone rendering tests
  describe("Zone rendering", () => {
    it("should render navbar with left zone", () => {
      render(<Navbar left={<div>Left content</div>} />);
      expect(screen.getByText("Left content")).toBeInTheDocument();
    });

    it("should render navbar with center zone (explicit)", () => {
      render(<Navbar center={<div>Center content</div>} />);
      expect(screen.getByText("Center content")).toBeInTheDocument();
    });

    it("should render navbar with right zone", () => {
      render(<Navbar right={<div>Right content</div>} />);
      expect(screen.getByText("Right content")).toBeInTheDocument();
    });

    it("should render navbar with all zones", () => {
      render(<Navbar left={<div>Left</div>} center={<div>Center</div>} right={<div>Right</div>} />);
      expect(screen.getByText("Left")).toBeInTheDocument();
      expect(screen.getByText("Center")).toBeInTheDocument();
      expect(screen.getByText("Right")).toBeInTheDocument();
    });

    it("should render only left zone when provided", () => {
      render(<Navbar left={<div>Left only</div>} />);
      expect(screen.getByText("Left only")).toBeInTheDocument();
      expect(screen.queryByText("Center")).not.toBeInTheDocument();
      expect(screen.queryByText("Right")).not.toBeInTheDocument();
    });

    it("should render only center zone when provided", () => {
      render(<Navbar center={<div>Center only</div>} />);
      expect(screen.getByText("Center only")).toBeInTheDocument();
    });

    it("should render only right zone when provided", () => {
      render(<Navbar right={<div>Right only</div>} />);
      expect(screen.getByText("Right only")).toBeInTheDocument();
      expect(screen.queryByText("Left")).not.toBeInTheDocument();
    });
  });

  // Backward compatibility tests (children prop)
  describe("Backward compatibility (children prop)", () => {
    it("should render navbar with children as center zone", () => {
      render(<Navbar children={<div>Children content</div>} />);
      expect(screen.getByText("Children content")).toBeInTheDocument();
    });

    it("should render children as center when center is not provided", () => {
      render(
        <Navbar left={<div>Left</div>} right={<div>Right</div>}>
          <div>Children as center</div>
        </Navbar>,
      );
      expect(screen.getByText("Left")).toBeInTheDocument();
      expect(screen.getByText("Right")).toBeInTheDocument();
      expect(screen.getByText("Children as center")).toBeInTheDocument();
    });

    it("should prefer center prop over children when both are provided", () => {
      render(
        <Navbar center={<div>Center prop</div>}>
          <div>Children prop</div>
        </Navbar>,
      );
      expect(screen.getByText("Center prop")).toBeInTheDocument();
      expect(screen.queryByText("Children prop")).not.toBeInTheDocument();
    });

    it("should render only children when provided without slots", () => {
      render(<Navbar>Children only</Navbar>);
      expect(screen.getByText("Children only")).toBeInTheDocument();
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
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
  });

  // HTML attributes tests
  describe("HTML attributes", () => {
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
  });
});
