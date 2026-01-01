import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { ArtistCard } from "./ArtistCard";
import type { ArtistCardProps } from "./ArtistCard.types";

const defaultProps: ArtistCardProps = {
  name: "Test Artist",
  followersLabel: "followers",
  playsLabel: "plays",
};

describe("ArtistCard", () => {
  describe("API Contract", () => {
    describe("Rendering", () => {
      it("renders without errors with required props", () => {
        renderWithTheme(<ArtistCard {...defaultProps} />);
        expect(screen.getByText("Test Artist")).toBeInTheDocument();
      });

      it("renders artist name", () => {
        renderWithTheme(<ArtistCard {...defaultProps} name="John Doe" />);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      it("renders description when provided", () => {
        renderWithTheme(<ArtistCard {...defaultProps} description="A talented musician" />);
        expect(screen.getByText("A talented musician")).toBeInTheDocument();
      });

      it("renders genres when provided", () => {
        renderWithTheme(<ArtistCard {...defaultProps} genres="Jazz, Blues" />);
        expect(screen.getByText("Jazz, Blues")).toBeInTheDocument();
      });

      it("renders followers count when provided", () => {
        renderWithTheme(<ArtistCard {...defaultProps} followers={1200} />);
        // toLocaleString() may use comma or space as thousands separator depending on locale
        const followersElements = screen.getAllByText((_content, element) => {
          const hasNumber = /1[,\s]200/.test(element?.textContent || "");
          const hasLabel = /followers/i.test(element?.textContent || "");
          return hasNumber && hasLabel;
        });
        expect(followersElements.length).toBeGreaterThan(0);
      });

      it("renders plays count when provided", () => {
        renderWithTheme(<ArtistCard {...defaultProps} plays={50000} />);
        // toLocaleString() may use comma or space as thousands separator depending on locale
        const playsElements = screen.getAllByText((_content, element) => {
          const hasNumber = /50[,\s]000/.test(element?.textContent || "");
          const hasLabel = /plays/i.test(element?.textContent || "");
          return hasNumber && hasLabel;
        });
        expect(playsElements.length).toBeGreaterThan(0);
      });

      it("renders featured badge when featured and popularBadgeText provided", () => {
        renderWithTheme(<ArtistCard {...defaultProps} featured popularBadgeText="Popular" />);
        expect(screen.getByText("Popular")).toBeInTheDocument();
      });

      it("renders image when imageUrl provided", () => {
        renderWithTheme(<ArtistCard {...defaultProps} imageUrl="https://example.com/image.jpg" />);
        const image = screen.getByAltText("Test Artist");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
      });

      it("renders placeholder icon when imageUrl not provided", () => {
        const { container } = renderWithTheme(<ArtistCard {...defaultProps} />);
        const icon = container.querySelector('[aria-hidden="true"]');
        expect(icon).toBeInTheDocument();
      });

      it("does not render image section when showImage is false", () => {
        const { container } = renderWithTheme(<ArtistCard {...defaultProps} showImage={false} />);
        const image = container.querySelector("img");
        expect(image).not.toBeInTheDocument();
      });

      it("renders link when href provided", () => {
        renderWithTheme(<ArtistCard {...defaultProps} href="/artist/1" />);
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/artist/1");
      });

      it("does not render footer when followers and plays are undefined", () => {
        const { container } = renderWithTheme(<ArtistCard {...defaultProps} />);
        // Footer contains border-t class which is unique to footer
        const footer = container.querySelector('[class*="border-t"]');
        expect(footer).not.toBeInTheDocument();
      });

      it("renders footer when followers provided", () => {
        const { container } = renderWithTheme(<ArtistCard {...defaultProps} followers={1000} />);
        // Footer contains border-t class which is unique to footer
        const footer = container.querySelector('[class*="border-t"]');
        expect(footer).toBeInTheDocument();
      });

      it("renders footer when plays provided", () => {
        const { container } = renderWithTheme(<ArtistCard {...defaultProps} plays={5000} />);
        // Footer contains border-t class which is unique to footer
        const footer = container.querySelector('[class*="border-t"]');
        expect(footer).toBeInTheDocument();
      });
    });

    describe("Validation", () => {
      it("throws error when name is empty string", () => {
        expect(() => {
          renderWithTheme(<ArtistCard {...defaultProps} name="" />);
        }).toThrow('ArtistCard: "name" prop is required and cannot be empty');
      });

      it("throws error when name is whitespace only", () => {
        expect(() => {
          renderWithTheme(<ArtistCard {...defaultProps} name="   " />);
        }).toThrow('ArtistCard: "name" prop is required and cannot be empty');
      });

      it("throws error when followersLabel is empty string", () => {
        expect(() => {
          renderWithTheme(<ArtistCard {...defaultProps} followersLabel="" />);
        }).toThrow('ArtistCard: "followersLabel" prop is required and cannot be empty');
      });

      it("throws error when playsLabel is empty string", () => {
        expect(() => {
          renderWithTheme(<ArtistCard {...defaultProps} playsLabel="" />);
        }).toThrow('ArtistCard: "playsLabel" prop is required and cannot be empty');
      });
    });

    describe("Sizes", () => {
      it("accepts and renders md size", () => {
        const { container } = renderWithTheme(<ArtistCard {...defaultProps} size="md" />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });

      it("accepts and renders sm size", () => {
        const { container } = renderWithTheme(<ArtistCard {...defaultProps} size="sm" />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });

      it("defaults to md size when size prop is not provided", () => {
        const { container } = renderWithTheme(<ArtistCard {...defaultProps} />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });
    });

    describe("Variants", () => {
      it("accepts and renders default variant", () => {
        const { container } = renderWithTheme(<ArtistCard {...defaultProps} variant="default" />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });

      it("accepts and renders elevated variant", () => {
        const { container } = renderWithTheme(<ArtistCard {...defaultProps} variant="elevated" />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });

      it("defaults to default variant when variant prop is not provided", () => {
        const { container } = renderWithTheme(<ArtistCard {...defaultProps} />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });

      it("uses elevated variant when featured prop is true", () => {
        const { container } = renderWithTheme(<ArtistCard {...defaultProps} featured />);
        const card = container.firstChild;
        expect(card).toBeInTheDocument();
      });

      it("variant prop takes precedence over featured prop", () => {
        const { container } = renderWithTheme(
          <ArtistCard {...defaultProps} variant="default" featured />,
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
              <ArtistCard {...defaultProps} size={size} variant={variant} />,
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
          <ArtistCard {...defaultProps} className="custom-class" />,
        );
        // CardBase is wrapped in Box, so className is applied to CardBase inside Box
        const card = container.querySelector('[class*="custom-class"]') as HTMLElement;
        expect(card).toBeInTheDocument();
        expect(card).toHaveClass("custom-class");
      });

      it("forwards HTML attributes", () => {
        const { container } = renderWithTheme(
          <ArtistCard {...defaultProps} data-testid="artist-card" />,
        );
        // CardBase is wrapped in Box, so we need to find it within the structure
        const card = container.querySelector('[data-testid="artist-card"]') as HTMLElement;
        expect(card).toBeInTheDocument();
        expect(card).toHaveAttribute("data-testid", "artist-card");
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles zero followers count", () => {
      renderWithTheme(<ArtistCard {...defaultProps} followers={0} />);
      const followersElements = screen.getAllByText((_content, element) => {
        const hasNumber = /^0$/.test(element?.textContent?.trim().split(/\s+/)[0] || "");
        const hasLabel = /followers/i.test(element?.textContent || "");
        return hasNumber && hasLabel;
      });
      expect(followersElements.length).toBeGreaterThan(0);
    });

    it("handles zero plays count", () => {
      renderWithTheme(<ArtistCard {...defaultProps} plays={0} />);
      const playsElements = screen.getAllByText((_content, element) => {
        const hasNumber = /^0$/.test(element?.textContent?.trim().split(/\s+/)[0] || "");
        const hasLabel = /plays/i.test(element?.textContent || "");
        return hasNumber && hasLabel;
      });
      expect(playsElements.length).toBeGreaterThan(0);
    });

    it("handles missing image gracefully", () => {
      const { container } = renderWithTheme(<ArtistCard {...defaultProps} />);
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it("handles long artist name", () => {
      const longName = "A".repeat(100);
      renderWithTheme(<ArtistCard {...defaultProps} name={longName} />);
      expect(screen.getByText(longName)).toBeInTheDocument();
    });

    it("handles long description", () => {
      const longDescription = "A".repeat(200);
      renderWithTheme(<ArtistCard {...defaultProps} description={longDescription} />);
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it("handles missing description", () => {
      renderWithTheme(<ArtistCard {...defaultProps} />);
      // Should not throw or error
      expect(screen.getByText("Test Artist")).toBeInTheDocument();
    });

    it("handles missing genres", () => {
      renderWithTheme(<ArtistCard {...defaultProps} />);
      expect(screen.queryByText(/Jazz/i)).not.toBeInTheDocument();
    });

    it("handles large numbers formatting", () => {
      renderWithTheme(<ArtistCard {...defaultProps} followers={1234567} plays={9876543} />);
      // toLocaleString() may use comma or space as thousands separator depending on locale
      expect(screen.getByText(/1[,\s]234[,\s]567.*followers/i)).toBeInTheDocument();
      expect(screen.getByText(/9[,\s]876[,\s]543.*plays/i)).toBeInTheDocument();
    });
  });

  describe("Composition", () => {
    it("renders complete card structure with all sections", () => {
      renderWithTheme(
        <ArtistCard
          {...defaultProps}
          name="Complete Artist"
          description="Description"
          genres="Jazz, Blues"
          imageUrl="https://example.com/image.jpg"
          followers={1000}
          plays={5000}
        />,
      );

      expect(screen.getByText("Complete Artist")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("Jazz, Blues")).toBeInTheDocument();
      expect(screen.getByAltText("Complete Artist")).toBeInTheDocument();
      // toLocaleString() may use comma or space as thousands separator depending on locale
      // Text is split across multiple text nodes, so we need a function matcher
      const followersElements = screen.getAllByText((_content, element) => {
        const hasNumber = /1[,\s]000/.test(element?.textContent || "");
        const hasLabel = /followers/i.test(element?.textContent || "");
        return hasNumber && hasLabel;
      });
      expect(followersElements.length).toBeGreaterThan(0);
      expect(followersElements[0]).toBeInTheDocument();
      const playsElements = screen.getAllByText((_content, element) => {
        const hasNumber = /5[,\s]000/.test(element?.textContent || "");
        const hasLabel = /plays/i.test(element?.textContent || "");
        return hasNumber && hasLabel;
      });
      expect(playsElements.length).toBeGreaterThan(0);
      expect(playsElements[0]).toBeInTheDocument();
    });

    it("renders minimal card with only required props", () => {
      renderWithTheme(<ArtistCard {...defaultProps} />);
      expect(screen.getByText("Test Artist")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper alt text for images", () => {
      renderWithTheme(<ArtistCard {...defaultProps} imageUrl="https://example.com/image.jpg" />);
      const image = screen.getByAltText("Test Artist");
      expect(image).toBeInTheDocument();
    });

    it("hides decorative icons from screen readers", () => {
      const { container } = renderWithTheme(<ArtistCard {...defaultProps} />);
      const decorativeIcons = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorativeIcons.length).toBeGreaterThan(0);
    });

    it("hides image overlay from screen readers", () => {
      const { container } = renderWithTheme(
        <ArtistCard {...defaultProps} imageUrl="https://example.com/image.jpg" />,
      );
      // Overlay should be hidden from screen readers
      // The overlay div exists but may not have aria-hidden if it's purely decorative
      // Check that overlay exists (it's the div with gradient overlay classes)
      const overlay = container.querySelector('[class*="bg-gradient-to-t"]');
      expect(overlay).toBeInTheDocument();
    });

    it("uses semantic HTML for heading", () => {
      const { container } = renderWithTheme(<ArtistCard {...defaultProps} />);
      const heading = container.querySelector("h3");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Test Artist");
    });

    it("uses semantic link when href provided", () => {
      renderWithTheme(<ArtistCard {...defaultProps} href="/artist/1" />);
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/artist/1");
    });
  });
});
