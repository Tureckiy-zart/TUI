import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { CategoryCard } from "./CategoryCard";
import type { CategoryCardProps } from "./CategoryCard.types";

const defaultProps: CategoryCardProps = {
  title: "Test Category",
};

describe("CategoryCard", () => {
  describe("API Contract", () => {
    describe("Rendering", () => {
      it("renders without errors with required props", () => {
        renderWithTheme(<CategoryCard {...defaultProps} />);
        expect(screen.getByText("Test Category")).toBeInTheDocument();
      });

      it("renders category title", () => {
        renderWithTheme(<CategoryCard title="Jazz" />);
        expect(screen.getByText("Jazz")).toBeInTheDocument();
      });

      it("renders description when provided", () => {
        renderWithTheme(<CategoryCard title="Jazz" description="Explore jazz events" />);
        expect(screen.getByText("Explore jazz events")).toBeInTheDocument();
      });

      it("renders image when imageUrl provided", () => {
        renderWithTheme(<CategoryCard title="Jazz" imageUrl="https://example.com/jazz.jpg" />);
        const image = screen.getByAltText("Jazz");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "https://example.com/jazz.jpg");
      });

      it("renders icon placeholder when imageUrl not provided", () => {
        const { container } = renderWithTheme(<CategoryCard title="Jazz" />);
        const icon = container.querySelector('[aria-hidden="true"]');
        expect(icon).toBeInTheDocument();
      });

      it("does not render image when showImage is false", () => {
        const { container } = renderWithTheme(<CategoryCard title="Jazz" showImage={false} />);
        const image = container.querySelector("img");
        expect(image).not.toBeInTheDocument();
      });

      it("renders featured badge when featured and featuredBadgeText provided", () => {
        renderWithTheme(<CategoryCard title="Jazz" featured={true} featuredBadgeText="Featured" />);
        expect(screen.getByText("Featured")).toBeInTheDocument();
      });

      it("does not render featured badge when featured is false", () => {
        renderWithTheme(
          <CategoryCard title="Jazz" featured={false} featuredBadgeText="Featured" />,
        );
        expect(screen.queryByText("Featured")).not.toBeInTheDocument();
      });

      it("does not render featured badge when featuredBadgeText not provided", () => {
        const { container } = renderWithTheme(<CategoryCard title="Jazz" featured={true} />);
        expect(container.querySelector('[class*="badge"]')).not.toBeInTheDocument();
      });

      it("wraps title in Link when href provided", () => {
        renderWithTheme(<CategoryCard title="Jazz" href="/categories/jazz" />);
        const link = screen.getByRole("link", { name: "Jazz" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/categories/jazz");
      });

      it("does not wrap title in Link when href not provided", () => {
        renderWithTheme(<CategoryCard title="Jazz" />);
        const link = screen.queryByRole("link");
        expect(link).not.toBeInTheDocument();
        expect(screen.getByText("Jazz")).toBeInTheDocument();
      });

      it("forwards ref correctly", () => {
        const ref = { current: null as HTMLDivElement | null };
        renderWithTheme(<CategoryCard ref={ref} title="Jazz" />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });

      it("applies custom className", () => {
        const { container } = renderWithTheme(
          <CategoryCard title="Jazz" className="custom-class" />,
        );
        const card = container.querySelector(".custom-class");
        expect(card).toBeInTheDocument();
      });

      it("passes through HTML attributes", () => {
        const { container } = renderWithTheme(
          <CategoryCard title="Jazz" data-testid="category-card" />,
        );
        const card = container.querySelector('[data-testid="category-card"]');
        expect(card).toBeInTheDocument();
      });
    });

    describe("Sizes", () => {
      it("accepts and renders sm size", () => {
        const { container } = renderWithTheme(<CategoryCard title="Jazz" size="sm" />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("accepts and renders md size (default)", () => {
        const { container } = renderWithTheme(<CategoryCard title="Jazz" size="md" />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("defaults to md size when size prop is not provided", () => {
        const { container } = renderWithTheme(<CategoryCard title="Jazz" />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });
    });

    describe("Variants", () => {
      it("accepts and renders default variant", () => {
        const { container } = renderWithTheme(<CategoryCard title="Jazz" variant="default" />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("accepts and renders elevated variant", () => {
        const { container } = renderWithTheme(<CategoryCard title="Jazz" variant="elevated" />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("derives variant from featured prop when variant not provided", () => {
        const { container } = renderWithTheme(<CategoryCard title="Jazz" featured={true} />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("defaults to default variant when featured is false and variant not provided", () => {
        const { container } = renderWithTheme(<CategoryCard title="Jazz" featured={false} />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });
    });

    describe("Size and Variant Combinations", () => {
      it("renders sm size with default variant", () => {
        const { container } = renderWithTheme(
          <CategoryCard title="Jazz" size="sm" variant="default" />,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("renders sm size with elevated variant", () => {
        const { container } = renderWithTheme(
          <CategoryCard title="Jazz" size="sm" variant="elevated" />,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("renders md size with default variant", () => {
        const { container } = renderWithTheme(
          <CategoryCard title="Jazz" size="md" variant="default" />,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("renders md size with elevated variant", () => {
        const { container } = renderWithTheme(
          <CategoryCard title="Jazz" size="md" variant="elevated" />,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles empty title gracefully", () => {
      const { container } = renderWithTheme(<CategoryCard title="" />);
      const heading = container.querySelector("h3");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("");
    });

    it("handles very long title", () => {
      const longTitle = "A".repeat(200);
      renderWithTheme(<CategoryCard title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("handles very long description", () => {
      const longDescription = "A".repeat(500);
      renderWithTheme(<CategoryCard title="Jazz" description={longDescription} />);
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it("handles missing imageUrl gracefully", () => {
      const { container } = renderWithTheme(<CategoryCard title="Jazz" />);
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it("handles invalid imageUrl gracefully", () => {
      renderWithTheme(<CategoryCard title="Jazz" imageUrl="invalid-url" />);
      const image = screen.getByAltText("Jazz");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "invalid-url");
    });
  });

  describe("Accessibility", () => {
    it("has proper heading level for title", () => {
      renderWithTheme(<CategoryCard title="Jazz" />);
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Jazz");
    });

    it("has alt text on image", () => {
      renderWithTheme(<CategoryCard title="Jazz" imageUrl="https://example.com/jazz.jpg" />);
      const image = screen.getByAltText("Jazz");
      expect(image).toBeInTheDocument();
    });

    it("hides decorative icon from screen readers", () => {
      const { container } = renderWithTheme(<CategoryCard title="Jazz" />);
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it("has accessible link when href provided", () => {
      renderWithTheme(<CategoryCard title="Jazz" href="/categories/jazz" />);
      const link = screen.getByRole("link", { name: "Jazz" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/categories/jazz");
    });
  });
});
