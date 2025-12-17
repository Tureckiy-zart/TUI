/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom/vitest" />
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { FeatureSection, type FeatureItem } from "./FeatureSection";

const sampleFeatures: FeatureItem[] = [
  {
    icon: "🚀",
    title: "Fast Performance",
    description: "Optimized components built for speed.",
  },
  {
    icon: "🎨",
    title: "Beautiful Design",
    description: "Modern, clean interfaces.",
  },
  {
    icon: "♿",
    title: "Accessible",
    description: "WCAG AA compliant.",
  },
];

describe("FeatureSection component", () => {
  it("should render feature section with features", () => {
    render(<FeatureSection features={sampleFeatures} />);
    expect(screen.getByText("Fast Performance")).toBeInTheDocument();
    expect(screen.getByText("Beautiful Design")).toBeInTheDocument();
    expect(screen.getByText("Accessible")).toBeInTheDocument();
  });

  it("should render with title", () => {
    render(<FeatureSection features={sampleFeatures} title="Features" />);
    expect(screen.getByText("Features")).toBeInTheDocument();
  });

  it("should render with description", () => {
    render(<FeatureSection features={sampleFeatures} description="Our key features" />);
    expect(screen.getByText("Our key features")).toBeInTheDocument();
  });

  it("should render with title and description", () => {
    render(
      <FeatureSection features={sampleFeatures} title="Features" description="Our key features" />,
    );
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Our key features")).toBeInTheDocument();
  });

  it("should render all feature items", () => {
    render(<FeatureSection features={sampleFeatures} />);
    sampleFeatures.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
    });
  });

  it("should render feature icons", () => {
    const { container } = render(<FeatureSection features={sampleFeatures} />);
    expect(container.textContent).toContain("🚀");
    expect(container.textContent).toContain("🎨");
    expect(container.textContent).toContain("♿");
  });

  it("should apply default 3 columns", () => {
    const { container } = render(<FeatureSection features={sampleFeatures} />);
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("lg:grid-cols-3");
  });

  it("should apply 1 column layout", () => {
    const { container } = render(<FeatureSection features={sampleFeatures} columns={1} />);
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).not.toHaveClass("md:grid-cols-2");
  });

  it("should apply 2 column layout", () => {
    const { container } = render(<FeatureSection features={sampleFeatures} columns={2} />);
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("md:grid-cols-2");
    expect(grid).not.toHaveClass("lg:grid-cols-3");
  });

  it("should apply 4 column layout", () => {
    const { container } = render(<FeatureSection features={sampleFeatures} columns={4} />);
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("lg:grid-cols-4");
  });

  it("should return null for empty features array", () => {
    const { container } = render(<FeatureSection features={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("should handle single feature", () => {
    const singleFeature = sampleFeatures[0];
    if (!singleFeature) throw new Error("Expected feature to exist");
    render(<FeatureSection features={[singleFeature]} />);
    expect(screen.getByText("Fast Performance")).toBeInTheDocument();
  });

  it("should handle many features", () => {
    const manyFeatures = Array.from({ length: 10 }, (_, i) => ({
      icon: `Icon ${i}`,
      title: `Feature ${i}`,
      description: `Description ${i}`,
    }));
    render(<FeatureSection features={manyFeatures} />);
    expect(screen.getByText("Feature 0")).toBeInTheDocument();
    expect(screen.getByText("Feature 9")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <FeatureSection features={sampleFeatures} className="custom-class" />,
    );
    expect(container.querySelector("section")).toHaveClass("custom-class");
  });

  it("should use semantic HTML", () => {
    const { container } = render(<FeatureSection features={sampleFeatures} title="Features" />);
    expect(container.querySelector("section")).toBeInTheDocument();
    expect(container.querySelector("header")).toBeInTheDocument();
    expect(container.querySelector("h2")).toBeInTheDocument();
    expect(container.querySelectorAll("h3").length).toBe(sampleFeatures.length);
  });

  it("should have proper ARIA label", () => {
    const { container } = render(<FeatureSection features={sampleFeatures} />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-label", "Features section");
  });

  it("should render feature cards with proper structure", () => {
    const { container } = render(<FeatureSection features={sampleFeatures} />);
    const cards = container.querySelectorAll('[class*="rounded-xl"]');
    expect(cards.length).toBe(sampleFeatures.length);
  });

  it("should apply token-based classes", () => {
    const { container } = render(<FeatureSection features={sampleFeatures} />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("py-xl");
    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("gap-lg");
  });

  it("should center header content when title/description present", () => {
    const { container } = render(<FeatureSection features={sampleFeatures} title="Features" />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("text-center");
  });

  it("should render ReactNode icons", () => {
    const featuresWithReactIcon: FeatureItem[] = [
      {
        icon: <span data-testid="custom-icon">Custom Icon</span>,
        title: "Custom Feature",
        description: "With custom icon",
      },
    ];
    render(<FeatureSection features={featuresWithReactIcon} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("should apply hover effects to cards", () => {
    const { container } = render(<FeatureSection features={sampleFeatures} />);
    const cards = container.querySelectorAll('[class*="hover:shadow-md"]');
    expect(cards.length).toBe(sampleFeatures.length);
  });

  it("should apply theme-aware icon container classes", () => {
    const { container } = render(<FeatureSection features={sampleFeatures} />);
    const iconContainers = container.querySelectorAll('[class*="bg-primary/10"]');
    expect(iconContainers.length).toBe(sampleFeatures.length);
  });
});
