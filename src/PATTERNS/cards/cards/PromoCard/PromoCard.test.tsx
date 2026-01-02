import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { PromoCard } from "./PromoCard";
import type { PromoCardProps } from "./PromoCard.types";

const defaultProps: PromoCardProps = {
  title: "Special Offer",
  ctaLabel: "Learn More",
};

describe("PromoCard", () => {
  describe("API Contract", () => {
    describe("Rendering", () => {
      it("renders without errors with required props", () => {
        renderWithTheme(<PromoCard {...defaultProps} />);
        expect(screen.getByText("Special Offer")).toBeInTheDocument();
      });

      it("renders title", () => {
        renderWithTheme(<PromoCard {...defaultProps} title="Summer Sale" />);
        expect(screen.getByText("Summer Sale")).toBeInTheDocument();
      });

      it("renders description when provided", () => {
        renderWithTheme(<PromoCard {...defaultProps} description="Get 20% off on all tickets" />);
        expect(screen.getByText("Get 20% off on all tickets")).toBeInTheDocument();
      });

      it("renders CTA label", () => {
        renderWithTheme(<PromoCard {...defaultProps} ctaLabel="Buy Now" />);
        expect(screen.getByText("Buy Now")).toBeInTheDocument();
      });

      it("renders featured badge when featured and featuredBadgeText provided", () => {
        renderWithTheme(<PromoCard {...defaultProps} featured featuredBadgeText="Featured" />);
        expect(screen.getByText("Featured")).toBeInTheDocument();
      });

      it("renders featured badge when variant is elevated and featuredBadgeText provided", () => {
        renderWithTheme(
          <PromoCard {...defaultProps} variant="elevated" featuredBadgeText="Featured" />,
        );
        expect(screen.getByText("Featured")).toBeInTheDocument();
      });

      it("renders image when imageUrl provided", () => {
        renderWithTheme(<PromoCard {...defaultProps} imageUrl="https://example.com/image.jpg" />);
        const image = screen.getByAltText("Special Offer");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
      });

      it("renders placeholder icon when imageUrl not provided", () => {
        const { container } = renderWithTheme(<PromoCard {...defaultProps} />);
        const icon = container.querySelector('[aria-hidden="true"]');
        expect(icon).toBeInTheDocument();
      });

      it("does not render image section when showImage is false", () => {
        const { container } = renderWithTheme(<PromoCard {...defaultProps} showImage={false} />);
        const image = container.querySelector("img");
        expect(image).not.toBeInTheDocument();
      });

      it("renders link when href provided", () => {
        renderWithTheme(<PromoCard {...defaultProps} href="/promo/1" />);
        const link = screen.getByRole("link", { name: "Special Offer" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/promo/1");
      });

      it("renders CTA link when ctaUrl provided", () => {
        renderWithTheme(<PromoCard {...defaultProps} ctaUrl="/promo/1" />);
        const link = screen.getByRole("link", { name: /Learn More/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/promo/1");
      });

      it("renders CTA as div when ctaUrl not provided", () => {
        renderWithTheme(<PromoCard {...defaultProps} />);
        const cta = screen.getByText("Learn More");
        expect(cta).toBeInTheDocument();
        expect(cta.tagName).toBe("DIV");
      });

      it("forwards ref correctly", () => {
        const ref = { current: null as HTMLDivElement | null };
        renderWithTheme(<PromoCard {...defaultProps} ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });

      it("applies custom className", () => {
        const { container } = renderWithTheme(
          <PromoCard {...defaultProps} className="custom-class" />,
        );
        const card = container.querySelector(".custom-class");
        expect(card).toBeInTheDocument();
      });

      it("passes through HTML attributes", () => {
        const { container } = renderWithTheme(
          <PromoCard {...defaultProps} data-testid="promo-card" aria-label="Promo card" />,
        );
        const card = container.querySelector('[data-testid="promo-card"]');
        expect(card).toBeInTheDocument();
        expect(card).toHaveAttribute("aria-label", "Promo card");
      });
    });

    describe("Sizes", () => {
      it("renders with default size (md)", () => {
        const { container } = renderWithTheme(<PromoCard {...defaultProps} />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("renders with sm size", () => {
        const { container } = renderWithTheme(<PromoCard {...defaultProps} size="sm" />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("renders with md size", () => {
        const { container } = renderWithTheme(<PromoCard {...defaultProps} size="md" />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });
    });

    describe("Variants", () => {
      it("renders with default variant", () => {
        const { container } = renderWithTheme(<PromoCard {...defaultProps} variant="default" />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("renders with elevated variant", () => {
        const { container } = renderWithTheme(<PromoCard {...defaultProps} variant="elevated" />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("renders with elevated variant when featured is true", () => {
        const { container } = renderWithTheme(<PromoCard {...defaultProps} featured />);
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });

      it("variant prop takes precedence over featured prop", () => {
        const { container } = renderWithTheme(
          <PromoCard {...defaultProps} variant="default" featured />,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toBeInTheDocument();
      });
    });

    describe("Size and Variant Combinations", () => {
      it("renders all size and variant combinations", () => {
        const sizes: Array<"sm" | "md"> = ["sm", "md"];
        const variants: Array<"default" | "elevated"> = ["default", "elevated"];

        sizes.forEach((size) => {
          variants.forEach((variant) => {
            const { container } = renderWithTheme(
              <PromoCard {...defaultProps} size={size} variant={variant} />,
            );
            const card = container.firstChild as HTMLElement;
            expect(card).toBeInTheDocument();
          });
        });
      });
    });
  });

  describe("Content Display", () => {
    it("renders complete card structure with all sections", () => {
      renderWithTheme(
        <PromoCard
          {...defaultProps}
          title="Complete Promo"
          description="Description"
          imageUrl="https://example.com/image.jpg"
          ctaUrl="/promo"
        />,
      );

      expect(screen.getByText("Complete Promo")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByAltText("Complete Promo")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Learn More/i })).toBeInTheDocument();
    });

    it("renders minimal card with only required props", () => {
      renderWithTheme(<PromoCard {...defaultProps} />);
      expect(screen.getByText("Special Offer")).toBeInTheDocument();
      expect(screen.getByText("Learn More")).toBeInTheDocument();
    });

    it("does not render description when not provided", () => {
      const { queryByText } = renderWithTheme(<PromoCard {...defaultProps} />);
      expect(queryByText("Description")).not.toBeInTheDocument();
    });

    it("does not render badge when featuredBadgeText not provided", () => {
      const { queryByText } = renderWithTheme(<PromoCard {...defaultProps} featured />);
      expect(queryByText("Featured")).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty title", () => {
      renderWithTheme(<PromoCard title="" ctaLabel="Learn More" />);
      expect(screen.getByText("Learn More")).toBeInTheDocument();
    });

    it("handles empty ctaLabel", () => {
      renderWithTheme(<PromoCard title="Test" ctaLabel="" />);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("handles long title text", () => {
      const longTitle = "A".repeat(200);
      renderWithTheme(<PromoCard {...defaultProps} title={longTitle} />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("handles long description text", () => {
      const longDescription = "A".repeat(500);
      renderWithTheme(<PromoCard {...defaultProps} description={longDescription} />);
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper image alt text", () => {
      renderWithTheme(<PromoCard {...defaultProps} imageUrl="https://example.com/image.jpg" />);
      const image = screen.getByAltText("Special Offer");
      expect(image).toBeInTheDocument();
    });

    it("has proper heading structure", () => {
      renderWithTheme(<PromoCard {...defaultProps} />);
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Special Offer");
    });

    it("has proper link structure when href provided", () => {
      renderWithTheme(<PromoCard {...defaultProps} href="/promo/1" />);
      const link = screen.getByRole("link", { name: "Special Offer" });
      expect(link).toBeInTheDocument();
    });

    it("has proper link structure when ctaUrl provided", () => {
      renderWithTheme(<PromoCard {...defaultProps} ctaUrl="/promo/1" />);
      const link = screen.getByRole("link", { name: /Learn More/i });
      expect(link).toBeInTheDocument();
    });

    it("hides decorative icon with aria-hidden", () => {
      const { container } = renderWithTheme(<PromoCard {...defaultProps} />);
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });
  });
});
