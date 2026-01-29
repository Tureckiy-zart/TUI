import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";
import { EventCard } from "../../../cards/EventCard";

describe("EventCard", () => {
  describe("API Contract", () => {
    describe("Rendering", () => {
      it("renders without errors", () => {
        renderWithTheme(<EventCard title="Test Event" getTicketsLabel="Get Tickets" />);
        const card = screen.getByText("Test Event");
        expect(card).toBeInTheDocument();
      });

      it("renders with required props only", () => {
        renderWithTheme(
          <EventCard
            title="Concert"
            getTicketsLabel="Buy Tickets"
            ticketUrl="https://example.com/tickets"
          />,
        );
        expect(screen.getByText("Concert")).toBeInTheDocument();
        expect(screen.getByText("Buy Tickets")).toBeInTheDocument();
      });

      it("forwards ref correctly", () => {
        const ref = { current: null as HTMLDivElement | null };
        renderWithTheme(<EventCard ref={ref} title="Test Event" getTicketsLabel="Get Tickets" />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
      });

      it("applies custom className", () => {
        const { container } = renderWithTheme(
          <EventCard title="Test Event" getTicketsLabel="Get Tickets" className="custom-class" />,
        );
        const card = container.querySelector(".custom-class");
        expect(card).toBeInTheDocument();
      });

      it("passes through HTML attributes", () => {
        const { container } = renderWithTheme(
          <EventCard
            title="Test Event"
            getTicketsLabel="Get Tickets"
            data-testid="event-card"
            aria-label="Event card"
          />,
        );
        const card = container.querySelector('[data-testid="event-card"]');
        expect(card).toBeInTheDocument();
        expect(card).toHaveAttribute("aria-label", "Event card");
      });
    });

    describe("Sizes", () => {
      it("renders with default size", () => {
        renderWithTheme(<EventCard title="Test Event" getTicketsLabel="Get Tickets" />);
        expect(screen.getByText("Test Event")).toBeInTheDocument();
      });

      it("renders with compact size", () => {
        renderWithTheme(
          <EventCard title="Test Event" getTicketsLabel="Get Tickets" size="compact" />,
        );
        expect(screen.getByText("Test Event")).toBeInTheDocument();
      });
    });

    describe("Variants", () => {
      it("renders with default variant", () => {
        renderWithTheme(<EventCard title="Test Event" getTicketsLabel="Get Tickets" />);
        expect(screen.getByText("Test Event")).toBeInTheDocument();
      });

      it("renders with featured variant", () => {
        renderWithTheme(
          <EventCard title="Test Event" getTicketsLabel="Get Tickets" variant="featured" />,
        );
        expect(screen.getByText("Test Event")).toBeInTheDocument();
      });

      it("derives variant from featured prop", () => {
        renderWithTheme(
          <EventCard
            title="Test Event"
            getTicketsLabel="Get Tickets"
            featured={true}
            featuredBadgeText="Featured"
          />,
        );
        expect(screen.getByText("Featured")).toBeInTheDocument();
      });
    });

    describe("Content Display", () => {
      it("displays title", () => {
        renderWithTheme(<EventCard title="Concert" getTicketsLabel="Get Tickets" />);
        expect(screen.getByText("Concert")).toBeInTheDocument();
      });

      it("displays description when provided", () => {
        renderWithTheme(
          <EventCard title="Concert" description="A great concert" getTicketsLabel="Get Tickets" />,
        );
        expect(screen.getByText("A great concert")).toBeInTheDocument();
      });

      it("displays date when provided", () => {
        renderWithTheme(
          <EventCard title="Concert" date="2024-01-01" getTicketsLabel="Get Tickets" />,
        );
        expect(screen.getByText("2024-01-01")).toBeInTheDocument();
      });

      it("displays venue name when provided", () => {
        renderWithTheme(
          <EventCard title="Concert" venueName="Venue Name" getTicketsLabel="Get Tickets" />,
        );
        expect(screen.getByText("Venue Name")).toBeInTheDocument();
      });

      it("displays price when provided and no ticketUrl", () => {
        renderWithTheme(<EventCard title="Concert" price="€20" getTicketsLabel="Get Tickets" />);
        expect(screen.getByText("€20")).toBeInTheDocument();
      });

      it("displays ticket button when ticketUrl is provided", () => {
        renderWithTheme(
          <EventCard
            title="Concert"
            ticketUrl="https://example.com/tickets"
            getTicketsLabel="Get Tickets"
          />,
        );
        const link = screen.getByText("Get Tickets").closest("a");
        expect(link).toHaveAttribute("href", "https://example.com/tickets");
        expect(link).toHaveAttribute("target", "_blank");
      });
    });

    describe("Image Display", () => {
      it("shows image when imageUrl is provided", () => {
        renderWithTheme(
          <EventCard
            title="Concert"
            imageUrl="https://example.com/image.jpg"
            getTicketsLabel="Get Tickets"
          />,
        );
        const img = screen.getByAltText("Concert");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
      });

      it("shows placeholder icon when imageUrl is not provided", () => {
        const { container } = renderWithTheme(
          <EventCard title="Concert" getTicketsLabel="Get Tickets" />,
        );
        // Icon has aria-hidden="true", so we check by SVG element
        const icon = container.querySelector('svg[aria-hidden="true"]');
        expect(icon).toBeInTheDocument();
      });

      it("hides image section when showImage is false", () => {
        const { container } = renderWithTheme(
          <EventCard
            title="Concert"
            imageUrl="https://example.com/image.jpg"
            showImage={false}
            getTicketsLabel="Get Tickets"
          />,
        );
        const img = container.querySelector("img");
        expect(img).not.toBeInTheDocument();
      });
    });

    describe("Featured Badge", () => {
      it("shows featured badge when featured is true and featuredBadgeText is provided", () => {
        renderWithTheme(
          <EventCard
            title="Concert"
            featured={true}
            featuredBadgeText="Featured"
            getTicketsLabel="Get Tickets"
          />,
        );
        expect(screen.getByText("Featured")).toBeInTheDocument();
      });

      it("does not show featured badge when featured is false", () => {
        renderWithTheme(
          <EventCard
            title="Concert"
            featured={false}
            featuredBadgeText="Featured"
            getTicketsLabel="Get Tickets"
          />,
        );
        expect(screen.queryByText("Featured")).not.toBeInTheDocument();
      });

      it("does not show featured badge when featuredBadgeText is not provided", () => {
        renderWithTheme(
          <EventCard title="Concert" featured={true} getTicketsLabel="Get Tickets" />,
        );
        // Badge should not be rendered without text
        const badges = screen.queryAllByText(/Featured/i);
        expect(badges.length).toBe(0);
      });
    });

    describe("Links", () => {
      it("wraps title in Link when href is provided", () => {
        renderWithTheme(
          <EventCard title="Concert" href="/events/1" getTicketsLabel="Get Tickets" />,
        );
        const link = screen.getByText("Concert").closest("a");
        expect(link).toHaveAttribute("href", "/events/1");
      });

      it("does not wrap title in Link when href is not provided", () => {
        renderWithTheme(<EventCard title="Concert" getTicketsLabel="Get Tickets" />);
        const title = screen.getByText("Concert");
        expect(title.closest("a")).not.toBeInTheDocument();
      });
    });

    describe("Edge Cases", () => {
      it("handles empty description", () => {
        renderWithTheme(<EventCard title="Concert" getTicketsLabel="Get Tickets" />);
        expect(screen.getByText("Concert")).toBeInTheDocument();
      });

      it("handles missing optional props", () => {
        renderWithTheme(
          <EventCard
            title="Concert"
            getTicketsLabel="Get Tickets"
            ticketUrl="https://example.com/tickets"
          />,
        );
        expect(screen.getByText("Concert")).toBeInTheDocument();
        expect(screen.getByText("Get Tickets")).toBeInTheDocument();
      });

      it("handles long text content", () => {
        const longTitle = "A".repeat(100);
        renderWithTheme(<EventCard title={longTitle} getTicketsLabel="Get Tickets" />);
        expect(screen.getByText(longTitle)).toBeInTheDocument();
      });
    });

    describe("Accessibility", () => {
      it("has semantic heading for title", () => {
        renderWithTheme(<EventCard title="Concert" getTicketsLabel="Get Tickets" />);
        const heading = screen.getByRole("heading", { level: 3 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent("Concert");
      });

      it("has semantic time element for date", () => {
        renderWithTheme(
          <EventCard title="Concert" date="2024-01-01" getTicketsLabel="Get Tickets" />,
        );
        const timeElement = screen.getByText("2024-01-01");
        expect(timeElement.tagName).toBe("TIME");
        expect(timeElement).toHaveAttribute("dateTime", "2024-01-01");
      });

      it("has semantic address element for venue", () => {
        renderWithTheme(
          <EventCard title="Concert" venueName="Venue Name" getTicketsLabel="Get Tickets" />,
        );
        const addressElement = screen.getByText("Venue Name");
        expect(addressElement.tagName).toBe("ADDRESS");
      });

      it("has alt text for images", () => {
        renderWithTheme(
          <EventCard
            title="Concert"
            imageUrl="https://example.com/image.jpg"
            getTicketsLabel="Get Tickets"
          />,
        );
        const img = screen.getByAltText("Concert");
        expect(img).toBeInTheDocument();
      });

      it("hides decorative icons from screen readers", () => {
        const { container } = renderWithTheme(
          <EventCard
            title="Concert"
            date="2024-01-01"
            venueName="Venue Name"
            getTicketsLabel="Get Tickets"
          />,
        );
        const icons = container.querySelectorAll('svg[aria-hidden="true"]');
        expect(icons.length).toBeGreaterThan(0);
        icons.forEach((icon) => {
          expect(icon).toHaveAttribute("aria-hidden", "true");
        });
      });

      it("has accessible link for ticket purchase", () => {
        renderWithTheme(
          <EventCard
            title="Concert"
            ticketUrl="https://example.com/tickets"
            getTicketsLabel="Get Tickets"
          />,
        );
        const link = screen.getByRole("link", { name: "Get Tickets" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "https://example.com/tickets");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });

      it("has accessible link for event details", () => {
        renderWithTheme(
          <EventCard title="Concert" href="/events/1" getTicketsLabel="Get Tickets" />,
        );
        const link = screen.getByRole("link", { name: "Concert" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/events/1");
      });
    });
  });
});
