import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { TicketCard } from "./TicketCard";

describe("TicketCard", () => {
  describe("API Contract", () => {
    describe("Rendering", () => {
      it("renders without errors", () => {
        renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy Now" />);
        const card = screen.getByText("VIP Ticket");
        expect(card).toBeInTheDocument();
      });

      it("renders with required props only", () => {
        renderWithTheme(<TicketCard title="Standard Ticket" purchaseLabel="Purchase" />);
        expect(screen.getByText("Standard Ticket")).toBeInTheDocument();
        expect(screen.getByText("Purchase")).toBeInTheDocument();
      });

      it("forwards ref correctly", () => {
        const ref = { current: null as HTMLDivElement | null };
        renderWithTheme(<TicketCard ref={ref} title="Test Ticket" purchaseLabel="Buy" />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });

      it("applies custom className", () => {
        const { container } = renderWithTheme(
          <TicketCard title="Test Ticket" purchaseLabel="Buy" className="custom-class" />,
        );
        const card = container.querySelector(".custom-class");
        expect(card).toBeInTheDocument();
      });

      it("passes through HTML attributes", () => {
        const { container } = renderWithTheme(
          <TicketCard
            title="Test Ticket"
            purchaseLabel="Buy"
            data-testid="ticket-card"
            aria-label="Ticket card"
          />,
        );
        const card = container.querySelector('[data-testid="ticket-card"]');
        expect(card).toBeInTheDocument();
        expect(card).toHaveAttribute("aria-label", "Ticket card");
      });
    });

    describe("Sizes", () => {
      it("renders with default size", () => {
        renderWithTheme(<TicketCard title="Test Ticket" purchaseLabel="Buy" />);
        expect(screen.getByText("Test Ticket")).toBeInTheDocument();
      });

      it("renders with compact size", () => {
        renderWithTheme(<TicketCard title="Test Ticket" purchaseLabel="Buy" size="compact" />);
        expect(screen.getByText("Test Ticket")).toBeInTheDocument();
      });
    });

    describe("Variants", () => {
      it("renders with default variant", () => {
        renderWithTheme(<TicketCard title="Test Ticket" purchaseLabel="Buy" />);
        expect(screen.getByText("Test Ticket")).toBeInTheDocument();
      });

      it("renders with featured variant", () => {
        renderWithTheme(<TicketCard title="Test Ticket" purchaseLabel="Buy" variant="featured" />);
        expect(screen.getByText("Test Ticket")).toBeInTheDocument();
      });

      it("derives variant from featured prop", () => {
        renderWithTheme(<TicketCard title="Test Ticket" purchaseLabel="Buy" featured={true} />);
        expect(screen.getByText("Test Ticket")).toBeInTheDocument();
      });
    });
  });

  describe("Content Display", () => {
    it("displays title", () => {
      renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy" />);
      expect(screen.getByText("VIP Ticket")).toBeInTheDocument();
    });

    it("displays description when provided", () => {
      renderWithTheme(
        <TicketCard title="VIP Ticket" purchaseLabel="Buy" description="Premium experience" />,
      );
      expect(screen.getByText("Premium experience")).toBeInTheDocument();
    });

    it("displays date when provided", () => {
      renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy" date="2024-12-25" />);
      // Date is rendered in <time> element
      const timeElement = screen.getByText(/2024/i);
      expect(timeElement).toBeInTheDocument();
    });

    it("displays price when provided", () => {
      renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy" price="€50" />);
      expect(screen.getByText("€50")).toBeInTheDocument();
    });

    it("displays capacity when provided", () => {
      renderWithTheme(
        <TicketCard title="VIP Ticket" purchaseLabel="Buy" capacity="10 tickets left" />,
      );
      expect(screen.getByText("10 tickets left")).toBeInTheDocument();
    });

    it("displays purchase label", () => {
      renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy Now" />);
      expect(screen.getByText("Buy Now")).toBeInTheDocument();
    });
  });

  describe("Badges", () => {
    it("displays featured badge when featured and featuredBadgeText provided", () => {
      renderWithTheme(
        <TicketCard
          title="VIP Ticket"
          purchaseLabel="Buy"
          featured={true}
          featuredBadgeText="Featured"
        />,
      );
      expect(screen.getByText("Featured")).toBeInTheDocument();
    });

    it("does not display featured badge when featuredBadgeText not provided", () => {
      renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy" featured={true} />);
      expect(screen.queryByText("Featured")).not.toBeInTheDocument();
    });

    it("displays VIP badge when vipBadgeText provided", () => {
      renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy" vipBadgeText="VIP" />);
      expect(screen.getByText("VIP")).toBeInTheDocument();
    });

    it("displays discount badge when discountBadgeText provided", () => {
      renderWithTheme(
        <TicketCard title="VIP Ticket" purchaseLabel="Buy" discountBadgeText="20% OFF" />,
      );
      expect(screen.getByText("20% OFF")).toBeInTheDocument();
    });
  });

  describe("Availability States", () => {
    it("displays available state (no label)", () => {
      renderWithTheme(
        <TicketCard title="VIP Ticket" purchaseLabel="Buy" availability="available" />,
      );
      expect(screen.queryByText("Sold Out")).not.toBeInTheDocument();
      expect(screen.queryByText("Available Soon")).not.toBeInTheDocument();
    });

    it("displays sold out state with default label", () => {
      renderWithTheme(
        <TicketCard title="VIP Ticket" purchaseLabel="Buy" availability="sold_out" />,
      );
      expect(screen.getByText("Sold Out")).toBeInTheDocument();
    });

    it("displays sold out state with custom label", () => {
      renderWithTheme(
        <TicketCard
          title="VIP Ticket"
          purchaseLabel="Buy"
          availability="sold_out"
          soldOutLabel="Agotado"
        />,
      );
      expect(screen.getByText("Agotado")).toBeInTheDocument();
    });

    it("displays available soon state with default label", () => {
      renderWithTheme(
        <TicketCard title="VIP Ticket" purchaseLabel="Buy" availability="available_soon" />,
      );
      expect(screen.getByText("Available Soon")).toBeInTheDocument();
    });

    it("displays available soon state with custom label", () => {
      renderWithTheme(
        <TicketCard
          title="VIP Ticket"
          purchaseLabel="Buy"
          availability="available_soon"
          availableSoonLabel="Próximamente"
        />,
      );
      expect(screen.getByText("Próximamente")).toBeInTheDocument();
    });
  });

  describe("Image Display", () => {
    it("displays image when imageUrl provided", () => {
      renderWithTheme(
        <TicketCard
          title="VIP Ticket"
          purchaseLabel="Buy"
          imageUrl="https://example.com/image.jpg"
        />,
      );
      const img = screen.getByAltText("VIP Ticket");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
    });

    it("displays placeholder icon when imageUrl not provided", () => {
      renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy" showImage={true} />);
      // Placeholder icon should be present (aria-hidden="true")
      const icon = document.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });

    it("hides image section when showImage is false", () => {
      renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy" showImage={false} />);
      const img = screen.queryByAltText("VIP Ticket");
      expect(img).not.toBeInTheDocument();
    });
  });

  describe("Links", () => {
    it("renders title as link when href provided", () => {
      renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy" href="/tickets/1" />);
      const link = screen.getByRole("link", { name: "VIP Ticket" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/tickets/1");
    });

    it("renders purchase button as link when purchaseUrl provided and not disabled", () => {
      renderWithTheme(
        <TicketCard
          title="VIP Ticket"
          purchaseLabel="Buy Now"
          purchaseUrl="https://example.com/purchase"
          availability="available"
        />,
      );
      const link = screen.getByRole("link", { name: "Buy Now" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com/purchase");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders purchase button as div when disabled (sold out)", () => {
      renderWithTheme(
        <TicketCard
          title="VIP Ticket"
          purchaseLabel="Buy Now"
          purchaseUrl="https://example.com/purchase"
          availability="sold_out"
        />,
      );
      const link = screen.queryByRole("link", { name: "Buy Now" });
      expect(link).not.toBeInTheDocument();
      expect(screen.getByText("Buy Now")).toBeInTheDocument();
    });

    it("renders purchase button as div when disabled (available soon)", () => {
      renderWithTheme(
        <TicketCard
          title="VIP Ticket"
          purchaseLabel="Buy Now"
          purchaseUrl="https://example.com/purchase"
          availability="available_soon"
        />,
      );
      const link = screen.queryByRole("link", { name: "Buy Now" });
      expect(link).not.toBeInTheDocument();
      expect(screen.getByText("Buy Now")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty title gracefully", () => {
      renderWithTheme(<TicketCard title="" purchaseLabel="Buy" />);
      expect(screen.getByText("Buy")).toBeInTheDocument();
    });

    it("handles missing optional props gracefully", () => {
      renderWithTheme(<TicketCard title="Ticket" purchaseLabel="Buy" />);
      expect(screen.getByText("Ticket")).toBeInTheDocument();
      expect(screen.getByText("Buy")).toBeInTheDocument();
    });

    it("handles long text gracefully", () => {
      const longTitle = "A".repeat(100);
      renderWithTheme(<TicketCard title={longTitle} purchaseLabel="Buy" />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper alt text for images", () => {
      renderWithTheme(
        <TicketCard
          title="VIP Ticket"
          purchaseLabel="Buy"
          imageUrl="https://example.com/image.jpg"
        />,
      );
      const image = screen.getByAltText("VIP Ticket");
      expect(image).toBeInTheDocument();
    });

    it("hides decorative icons from screen readers", () => {
      const { container } = renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy" />);
      const decorativeIcons = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorativeIcons.length).toBeGreaterThan(0);
    });

    it("hides image overlay from screen readers", () => {
      const { container } = renderWithTheme(
        <TicketCard
          title="VIP Ticket"
          purchaseLabel="Buy"
          imageUrl="https://example.com/image.jpg"
        />,
      );
      const overlay = container.querySelector('[aria-hidden="true"]');
      expect(overlay).toBeInTheDocument();
    });

    it("has aria-label for featured badge", () => {
      renderWithTheme(
        <TicketCard
          title="VIP Ticket"
          purchaseLabel="Buy"
          featured={true}
          featuredBadgeText="Featured"
        />,
      );
      const badge = screen.getByLabelText(/Featured ticket: Featured/i);
      expect(badge).toBeInTheDocument();
    });

    it("has aria-label for VIP badge", () => {
      renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy" vipBadgeText="VIP" />);
      const badge = screen.getByLabelText(/VIP ticket: VIP/i);
      expect(badge).toBeInTheDocument();
    });

    it("has aria-label for discount badge", () => {
      renderWithTheme(
        <TicketCard title="VIP Ticket" purchaseLabel="Buy" discountBadgeText="20% OFF" />,
      );
      const badge = screen.getByLabelText(/Discount: 20% OFF/i);
      expect(badge).toBeInTheDocument();
    });

    it("uses semantic HTML for heading", () => {
      const { container } = renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy" />);
      const heading = container.querySelector("h3");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("VIP Ticket");
    });

    it("uses semantic time element for date", () => {
      const { container } = renderWithTheme(
        <TicketCard title="VIP Ticket" purchaseLabel="Buy" date="2024-12-25" />,
      );
      const timeElement = container.querySelector("time");
      expect(timeElement).toBeInTheDocument();
      expect(timeElement).toHaveAttribute("dateTime");
    });

    it("uses semantic link when href provided", () => {
      renderWithTheme(<TicketCard title="VIP Ticket" purchaseLabel="Buy" href="/tickets/1" />);
      const link = screen.getByRole("link", { name: "VIP Ticket" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/tickets/1");
    });

    it("has proper ARIA attributes for disabled purchase button", () => {
      renderWithTheme(
        <TicketCard title="VIP Ticket" purchaseLabel="Buy Now" availability="sold_out" />,
      );
      const button = screen.getByRole("button", { name: "Buy Now" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-disabled", "true");
      expect(button).toHaveAttribute("tabIndex", "-1");
    });

    it("has proper ARIA attributes for enabled purchase button", () => {
      renderWithTheme(
        <TicketCard title="VIP Ticket" purchaseLabel="Buy Now" availability="available" />,
      );
      const button = screen.getByRole("button", { name: "Buy Now" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-disabled", "false");
      expect(button).toHaveAttribute("tabIndex", "0");
    });
  });
});
