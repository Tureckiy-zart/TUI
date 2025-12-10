import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { CTASection } from "./CTASection";

describe("CTASection component", () => {
  it("should render CTA section with headline", () => {
    render(<CTASection headline="Get Started" />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /call to action section/i })).toBeInTheDocument();
  });

  it("should render with description", () => {
    render(<CTASection headline="Get Started" description="Join us today" />);
    expect(screen.getByText("Join us today")).toBeInTheDocument();
  });

  it("should render with primary action button", () => {
    const handleClick = vi.fn();
    render(
      <CTASection
        headline="Get Started"
        primaryAction={{ label: "Sign Up", onClick: handleClick }}
      />,
    );
    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeInTheDocument();
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render with secondary action button", () => {
    const handleClick = vi.fn();
    render(
      <CTASection
        headline="Get Started"
        secondaryAction={{ label: "Learn More", onClick: handleClick }}
      />,
    );
    const button = screen.getByRole("button", { name: /learn more/i });
    expect(button).toBeInTheDocument();
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render with both primary and secondary actions", () => {
    render(
      <CTASection
        headline="Get Started"
        primaryAction={{ label: "Sign Up", onClick: () => {} }}
        secondaryAction={{ label: "Learn More", onClick: () => {} }}
      />,
    );
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /learn more/i })).toBeInTheDocument();
  });

  it("should render primary action as link when href provided", () => {
    render(
      <CTASection headline="Get Started" primaryAction={{ label: "Sign Up", href: "/signup" }} />,
    );
    const link = screen.getByRole("link", { name: /sign up/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/signup");
  });

  it("should render secondary action as link when href provided", () => {
    render(
      <CTASection
        headline="Get Started"
        secondaryAction={{ label: "Learn More", href: "/learn" }}
      />,
    );
    const link = screen.getByRole("link", { name: /learn more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/learn");
  });

  it("should apply centered layout by default", () => {
    const { container } = render(<CTASection headline="Get Started" />);
    const contentDiv = container.querySelector(".mx-auto.max-w-3xl.text-center");
    expect(contentDiv).toBeInTheDocument();
  });

  it("should apply split layout", () => {
    const { container } = render(<CTASection headline="Get Started" layout="split" />);
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("md:grid-cols-2");
  });

  it("should apply custom className", () => {
    const { container } = render(<CTASection headline="Get Started" className="custom-class" />);
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("should use semantic HTML", () => {
    const { container } = render(<CTASection headline="Get Started" />);
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(container.querySelector("h2")).toBeInTheDocument();
  });

  it("should have proper ARIA label", () => {
    const { container } = render(<CTASection headline="Get Started" />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-label", "Call to action section");
  });

  it("should apply default primary variant to primary action", () => {
    render(
      <CTASection headline="Get Started" primaryAction={{ label: "Sign Up", onClick: () => {} }} />,
    );
    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toHaveClass("bg-primary");
  });

  it("should apply custom variant to primary action", () => {
    render(
      <CTASection
        headline="Get Started"
        primaryAction={{
          label: "Sign Up",
          onClick: () => {},
          variant: "accent",
        }}
      />,
    );
    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toHaveClass("bg-accent");
  });

  it("should apply default outline variant to secondary action", () => {
    render(
      <CTASection
        headline="Get Started"
        secondaryAction={{ label: "Learn More", onClick: () => {} }}
      />,
    );
    const button = screen.getByRole("button", { name: /learn more/i });
    expect(button).toHaveClass("border");
  });

  it("should apply custom variant to secondary action", () => {
    render(
      <CTASection
        headline="Get Started"
        secondaryAction={{
          label: "Learn More",
          onClick: () => {},
          variant: "ghost",
        }}
      />,
    );
    const button = screen.getByRole("button", { name: /learn more/i });
    expect(button).toHaveClass("hover:bg-accent");
  });

  it("should handle ReactNode headline", () => {
    render(
      <CTASection
        headline={
          <span>
            <strong>Bold</strong> Headline
          </span>
        }
      />,
    );
    expect(screen.getByText("Bold")).toBeInTheDocument();
    expect(screen.getByText("Headline")).toBeInTheDocument();
  });

  it("should handle ReactNode description", () => {
    render(
      <CTASection
        headline="Get Started"
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
    render(<CTASection headline="Get Started" />);
    expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
  });

  it("should render without actions", () => {
    render(<CTASection headline="Get Started" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("should center actions in centered layout", () => {
    const { container } = render(
      <CTASection
        headline="Get Started"
        primaryAction={{ label: "Sign Up", onClick: () => {} }}
        layout="centered"
      />,
    );
    const actionsDiv = container.querySelector(".justify-center");
    expect(actionsDiv).toBeInTheDocument();
  });

  it("should align actions to end in split layout", () => {
    const { container } = render(
      <CTASection
        headline="Get Started"
        primaryAction={{ label: "Sign Up", onClick: () => {} }}
        layout="split"
      />,
    );
    const actionsDiv = container.querySelector(".md\\:justify-end");
    expect(actionsDiv).toBeInTheDocument();
  });

  it("should apply token-based background", () => {
    const { container } = render(<CTASection headline="Get Started" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-muted");
  });

  it("should apply token-based spacing", () => {
    const { container } = render(<CTASection headline="Get Started" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("py-xl");
  });

  it("should apply transition classes for theme awareness", () => {
    const { container } = render(<CTASection headline="Get Started" />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("transition-colors");
  });

  it("should handle long headline text", () => {
    const longHeadline = "This is a very long headline that should still render correctly";
    render(<CTASection headline={longHeadline} />);
    expect(screen.getByText(longHeadline)).toBeInTheDocument();
  });
});
