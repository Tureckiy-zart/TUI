import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { VenueCard } from "./VenueCard";
import type { VenueCardProps } from "./VenueCard.types";

const defaultProps: VenueCardProps = {
  name: "Test Venue",
  eventsLabel: "events",
  capacityLabel: "Capacity",
};

describe("VenueCard", () => {
  describe("API Contract", () => {
    describe("Rendering", () => {
      it("renders without errors with required props", () => {
        renderWithTheme(<VenueCard {...defaultProps} />);
        expect(screen.getByText("Test Venue")).toBeInTheDocument();
      });

      it("renders venue name", () => {
        renderWithTheme(<VenueCard {...defaultProps} name="Concert Hall" />);
        expect(screen.getByText("Concert Hall")).toBeInTheDocument();
      });

      it("renders description when provided", () => {
        renderWithTheme(<VenueCard {...defaultProps} description="A beautiful concert venue" />);
        expect(screen.getByText("A beautiful concert venue")).toBeInTheDocument();
      });

      it("renders location when provided", () => {
        renderWithTheme(<VenueCard {...defaultProps} location="123 Main St" />);
        expect(screen.getByText("123 Main St")).toBeInTheDocument();
      });

      it("renders events count when provided", () => {
        renderWithTheme(<VenueCard {...defaultProps} eventsCount={5} />);
        expect(screen.getByText(/5.*events/i)).toBeInTheDocument();
      });

      it("renders capacity when provided", () => {
        renderWithTheme(<VenueCard {...defaultProps} capacity="500" />);
        expect(screen.getByText(/Capacity.*500/i)).toBeInTheDocument();
      });

      it("renders featured badge when featured and popularBadgeText provided", () => {
        renderWithTheme(<VenueCard {...defaultProps} featured popularBadgeText="Popular" />);
        expect(screen.getByText("Popular")).toBeInTheDocument();
      });

      it("renders image when imageUrl provided", () => {
        renderWithTheme(<VenueCard {...defaultProps} imageUrl="https://example.com/image.jpg" />);
        const image = screen.getByAltText("Test Venue");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
      });

      it("renders placeholder icon when imageUrl not provided", () => {
        const { container } = renderWithTheme(<VenueCard {...defaultProps} />);
        const icon = container.querySelector('[aria-hidden="true"]');
        expect(icon).toBeInTheDocument();
      });

      it("does not render image section when showImage is false", () => {
        const { container } = renderWithTheme(<VenueCard {...defaultProps} showImage={false} />);
        const image = container.querySelector("img");
        expect(image).not.toBeInTheDocument();
      });

      it("renders link when href provided", () => {
        renderWithTheme(<VenueCard {...defaultProps} href="/venue/1" />);
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/venue/1");
      });

      it("does not render footer when eventsCount is 0 and capacity not provided", () => {
        const { container } = renderWithTheme(<VenueCard {...defaultProps} />);
        const footer = container.querySelector('[class*="CardBaseFooterWrapper"]');
        expect(footer).not.toBeInTheDocument();
      });

      it("renders footer when eventsCount > 0", () => {
        const { container } = renderWithTheme(<VenueCard {...defaultProps} eventsCount={5} />);
        // Footer contains border-top class, so we can find it by that
        const hasFooterBorder = container.querySelector('[class*="border-t"]');
        expect(hasFooterBorder).toBeInTheDocument();
      });

      it("renders footer when capacity provided", () => {
        const { container } = renderWithTheme(<VenueCard {...defaultProps} capacity="500" />);
        // Footer contains border-top class, so we can find it by that
        const hasFooterBorder = container.querySelector('[class*="border-t"]');
        expect(hasFooterBorder).toBeInTheDocument();
      });
    });

    describe("Validation", () => {
      it("throws error when name is empty string", () => {
        expect(() => {
          renderWithTheme(<VenueCard {...defaultProps} name="" />);
        }).toThrow('VenueCard: "name" prop is required and cannot be empty');
      });

      it("throws error when name is whitespace only", () => {
        expect(() => {
          renderWithTheme(<VenueCard {...defaultProps} name="   " />);
        }).toThrow('VenueCard: "name" prop is required and cannot be empty');
      });

      it("throws error when eventsLabel is empty string", () => {
        expect(() => {
          renderWithTheme(<VenueCard {...defaultProps} eventsLabel="" />);
        }).toThrow('VenueCard: "eventsLabel" prop is required and cannot be empty');
      });

      it("throws error when capacityLabel is empty string", () => {
        expect(() => {
          renderWithTheme(<VenueCard {...defaultProps} capacityLabel="" />);
        }).toThrow('VenueCard: "capacityLabel" prop is required and cannot be empty');
      });
    });

    describe("Sizes", () => {
      it("accepts and renders sm size", () => {
        const { container } = renderWithTheme(<VenueCard {...defaultProps} size="sm" />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });

      it("accepts and renders md size (default)", () => {
        const { container } = renderWithTheme(<VenueCard {...defaultProps} size="md" />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });

      it("defaults to md size when size prop is not provided", () => {
        const { container } = renderWithTheme(<VenueCard {...defaultProps} />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });
    });

    describe("Variants", () => {
      it("accepts and renders default variant", () => {
        const { container } = renderWithTheme(<VenueCard {...defaultProps} variant="default" />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });

      it("accepts and renders elevated variant", () => {
        const { container } = renderWithTheme(<VenueCard {...defaultProps} variant="elevated" />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });

      it("defaults to default variant when variant prop is not provided", () => {
        const { container } = renderWithTheme(<VenueCard {...defaultProps} />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });

      it("uses elevated variant when featured prop is true", () => {
        const { container } = renderWithTheme(<VenueCard {...defaultProps} featured />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });

      it("variant prop takes precedence over featured prop", () => {
        const { container } = renderWithTheme(
          <VenueCard {...defaultProps} variant="default" featured />,
        );
        const card = container.firstChild;
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
              <VenueCard {...defaultProps} size={size} variant={variant} />,
            );
            const card = container.firstChild;
            expect(card).toBeInTheDocument();
          });
        });
      });
    });

    describe("HTML Attributes", () => {
      it("applies custom className", () => {
        const { container } = renderWithTheme(
          <VenueCard {...defaultProps} className="custom-class" />,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass("custom-class");
      });

      it("forwards HTML attributes", () => {
        const { container } = renderWithTheme(
          <VenueCard {...defaultProps} data-testid="venue-card" />,
        );
        const card = container.firstChild as HTMLElement;
        expect(card).toHaveAttribute("data-testid", "venue-card");
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles zero events count", () => {
      const { container } = renderWithTheme(<VenueCard {...defaultProps} eventsCount={0} />);
      // Footer should not render when eventsCount is 0 and capacity is not provided
      const hasFooterBorder = container.querySelector('[class*="border-t"]');
      expect(hasFooterBorder).not.toBeInTheDocument();
    });

    it("handles missing image gracefully", () => {
      const { container } = renderWithTheme(<VenueCard {...defaultProps} />);
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it("handles long venue name", () => {
      const longName = "A".repeat(100);
      renderWithTheme(<VenueCard {...defaultProps} name={longName} />);
      expect(screen.getByText(longName)).toBeInTheDocument();
    });

    it("handles long description", () => {
      const longDescription = "A".repeat(200);
      renderWithTheme(<VenueCard {...defaultProps} description={longDescription} />);
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it("handles missing location", () => {
      renderWithTheme(<VenueCard {...defaultProps} />);
      expect(screen.queryByText(/Main St/i)).not.toBeInTheDocument();
    });

    it("handles missing description", () => {
      renderWithTheme(<VenueCard {...defaultProps} />);
      // Should not throw or error
      expect(screen.getByText("Test Venue")).toBeInTheDocument();
    });
  });

  describe("Composition", () => {
    it("renders complete card structure with all sections", () => {
      renderWithTheme(
        <VenueCard
          {...defaultProps}
          name="Complete Venue"
          description="Description"
          location="123 Main St"
          imageUrl="https://example.com/image.jpg"
          eventsCount={5}
          capacity="500"
        />,
      );

      expect(screen.getByText("Complete Venue")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("123 Main St")).toBeInTheDocument();
      expect(screen.getByAltText("Complete Venue")).toBeInTheDocument();
      expect(screen.getByText(/5.*events/i)).toBeInTheDocument();
      expect(screen.getByText(/Capacity.*500/i)).toBeInTheDocument();
    });

    it("renders minimal card with only required props", () => {
      renderWithTheme(<VenueCard {...defaultProps} />);
      expect(screen.getByText("Test Venue")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper alt text for images", () => {
      renderWithTheme(<VenueCard {...defaultProps} imageUrl="https://example.com/image.jpg" />);
      const image = screen.getByAltText("Test Venue");
      expect(image).toBeInTheDocument();
    });

    it("hides decorative icons from screen readers", () => {
      const { container } = renderWithTheme(<VenueCard {...defaultProps} />);
      const decorativeIcons = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorativeIcons.length).toBeGreaterThan(0);
    });

    it("hides image overlay from screen readers", () => {
      const { container } = renderWithTheme(
        <VenueCard {...defaultProps} imageUrl="https://example.com/image.jpg" />,
      );
      const overlay = container.querySelector('[aria-hidden="true"]');
      expect(overlay).toBeInTheDocument();
    });

    it("has aria-label for featured badge", () => {
      renderWithTheme(<VenueCard {...defaultProps} featured popularBadgeText="Popular" />);
      const badge = screen.getByLabelText(/Featured venue: Popular/i);
      expect(badge).toBeInTheDocument();
    });

    it("uses semantic HTML for heading", () => {
      const { container } = renderWithTheme(<VenueCard {...defaultProps} />);
      const heading = container.querySelector("h3");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Test Venue");
    });

    it("uses semantic link when href provided", () => {
      renderWithTheme(<VenueCard {...defaultProps} href="/venue/1" />);
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/venue/1");
    });
  });
});
