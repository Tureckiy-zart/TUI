"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { VenueCard } from "./VenueCard";
import type { VenueCardSize, VenueCardVariant } from "./VenueCard.types";

const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop";

const meta: Meta<typeof VenueCard> = {
  title: "Patterns / Cards / VenueCard",
  component: VenueCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Domain-specific venue card component that displays venue information (name, description, location, capacity, events count) using CardBase layout foundation. Supports featured variant with badge, image display, and animation support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "text" },
      description: "Venue name (required)",
    },
    description: {
      control: { type: "text" },
      description: "Venue description (optional)",
    },
    location: {
      control: { type: "text" },
      description: "Location display string (optional)",
    },
    capacity: {
      control: { type: "text" },
      description: "Capacity display string (optional)",
    },
    imageUrl: {
      control: { type: "text" },
      description: "Image URL (optional)",
    },
    href: {
      control: { type: "text" },
      description: "Link URL for venue details page (optional)",
    },
    eventsCount: {
      control: { type: "number" },
      description: "Number of associated events (optional)",
    },
    featured: {
      control: { type: "boolean" },
      description: "Whether this is a featured venue",
    },
    showImage: {
      control: { type: "boolean" },
      description: "Show image section",
    },
    eventsLabel: {
      control: { type: "text" },
      description: "Label for events count (required)",
    },
    popularBadgeText: {
      control: { type: "text" },
      description: "Badge text for popular venues (optional)",
    },
    capacityLabel: {
      control: { type: "text" },
      description: "Label for capacity (required)",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
      description: "Size variant - controls padding and gap",
      table: {
        type: { summary: "VenueCardSize" },
        defaultValue: { summary: "md" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["default", "elevated"],
      description: "Style variant - controls visual appearance",
      table: {
        type: { summary: "VenueCardVariant" },
        defaultValue: { summary: "default" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default VenueCard with all props
 */
export const Default: Story = {
  args: {
    name: "Concert Hall",
    description: "A beautiful concert venue in the heart of the city",
    location: "123 Main Street, City Center",
    capacity: "500",
    imageUrl: DEFAULT_IMAGE_URL,
    eventsCount: 12,
    eventsLabel: "events",
    capacityLabel: "Capacity",
    size: "md",
    variant: "default",
  },
};

/**
 * Matrix Story - All variants - all sizes
 * REQUIRED per VARIANTS_SIZE_CANON.md (component has both size AND variant props)
 */
export const Matrix: Story = {
  render: () => {
    const sizes: VenueCardSize[] = ["sm", "md"];
    const variants: VenueCardVariant[] = ["default", "elevated"];

    return (
      <div className="flex max-w-[1200px] flex-wrap gap-6">
        {variants.map((variant) =>
          sizes.map((size) => (
            <VenueCard
              key={`${variant}-${size}`}
              name={`${variant === "default" ? "Default" : "Elevated"} - ${size === "sm" ? "Small" : "Medium"}`}
              description="Venue description"
              location="123 Main St"
              capacity="500"
              eventsCount={5}
              eventsLabel="events"
              capacityLabel="Capacity"
              size={size}
              variant={variant}
              imageUrl={DEFAULT_IMAGE_URL}
            />
          )),
        )}
      </div>
    );
  },
};

/**
 * SizesGallery Story - All sizes demonstration
 * REQUIRED per SIZE_MAPPING_SPEC.md (component has public size prop)
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: VenueCardSize[] = ["sm", "md"];

    return (
      <div className="space-y-6">
        {sizes.map((size) => (
          <div key={size} className="space-y-2">
            <h3 className="text-lg font-semibold">Size: {size}</h3>
            <VenueCard
              name="Concert Hall"
              description="A beautiful concert venue in the heart of the city"
              location="123 Main Street"
              capacity="500"
              eventsCount={12}
              eventsLabel="events"
              capacityLabel="Capacity"
              size={size}
              imageUrl={DEFAULT_IMAGE_URL}
            />
          </div>
        ))}
      </div>
    );
  },
};

/**
 * States Story - Different component states
 * REQUIRED per VARIANTS_SIZE_CANON.md
 */
export const States: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Default State</h3>
          <VenueCard
            name="Concert Hall"
            description="A beautiful concert venue"
            location="123 Main St"
            capacity="500"
            eventsCount={5}
            eventsLabel="events"
            capacityLabel="Capacity"
            imageUrl={DEFAULT_IMAGE_URL}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Featured State</h3>
          <VenueCard
            name="Concert Hall"
            description="A beautiful concert venue"
            location="123 Main St"
            capacity="500"
            eventsCount={5}
            eventsLabel="events"
            capacityLabel="Capacity"
            featured
            popularBadgeText="Popular"
            variant="elevated"
            imageUrl={DEFAULT_IMAGE_URL}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">With Image</h3>
          <VenueCard
            name="Concert Hall"
            description="A beautiful concert venue"
            location="123 Main St"
            capacity="500"
            eventsCount={5}
            eventsLabel="events"
            capacityLabel="Capacity"
            imageUrl={DEFAULT_IMAGE_URL}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Without Image</h3>
          <VenueCard
            name="Concert Hall"
            description="A beautiful concert venue"
            location="123 Main St"
            capacity="500"
            eventsCount={5}
            eventsLabel="events"
            capacityLabel="Capacity"
            showImage={false}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">With Link</h3>
          <VenueCard
            name="Concert Hall"
            description="A beautiful concert venue"
            location="123 Main St"
            capacity="500"
            eventsCount={5}
            eventsLabel="events"
            capacityLabel="Capacity"
            href="/venue/1"
            imageUrl={DEFAULT_IMAGE_URL}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Minimal (Required Props Only)</h3>
          <VenueCard name="Concert Hall" eventsLabel="events" capacityLabel="Capacity" />
        </div>
      </div>
    );
  },
};

/**
 * Small size variant
 */
export const Small: Story = {
  args: {
    name: "Concert Hall",
    description: "A beautiful concert venue",
    location: "123 Main St",
    capacity: "500",
    eventsCount: 5,
    eventsLabel: "events",
    capacityLabel: "Capacity",
    size: "sm",
  },
};

/**
 * Elevated variant
 */
export const Elevated: Story = {
  args: {
    name: "Concert Hall",
    description: "A beautiful concert venue",
    location: "123 Main St",
    capacity: "500",
    eventsCount: 5,
    eventsLabel: "events",
    capacityLabel: "Capacity",
    variant: "elevated",
    featured: true,
    popularBadgeText: "Popular",
  },
};

/**
 * Accessibility Story - Accessibility features demonstration
 * REQUIRED per Pipeline 18A STEP 11
 */
export const Accessibility: Story = {
  render: () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Semantic HTML Structure</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            VenueCard uses semantic HTML elements (h3 for heading, img with alt text, link for
            navigation) for proper screen reader support.
          </p>
          <VenueCard
            name="Concert Hall"
            description="A beautiful concert venue"
            location="123 Main St"
            capacity="500"
            eventsCount={5}
            eventsLabel="events"
            capacityLabel="Capacity"
            imageUrl="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
            href="/venue/1"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Decorative Elements Hidden</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Decorative icons and overlays are marked with aria-hidden="true" to prevent screen
            reader announcement.
          </p>
          <VenueCard
            name="Concert Hall"
            description="A beautiful concert venue"
            location="123 Main St"
            capacity="500"
            eventsCount={5}
            eventsLabel="events"
            capacityLabel="Capacity"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Featured Badge with ARIA Label</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Featured badge includes aria-label for screen reader announcement.
          </p>
          <VenueCard
            name="Concert Hall"
            description="A beautiful concert venue"
            location="123 Main St"
            capacity="500"
            eventsCount={5}
            eventsLabel="events"
            capacityLabel="Capacity"
            featured
            popularBadgeText="Popular"
            variant="elevated"
          />
        </div>
      </div>
    );
  },
};

/**
 * Realistic usage example - Venue listing
 */
export const VenueListing: Story = {
  render: () => {
    const venues = [
      {
        name: "Grand Concert Hall",
        description: "Historic venue with excellent acoustics",
        location: "123 Music Street",
        capacity: "1,200",
        eventsCount: 24,
        featured: true,
      },
      {
        name: "Jazz Club",
        description: "Intimate setting for jazz performances",
        location: "456 Jazz Avenue",
        capacity: "150",
        eventsCount: 8,
        featured: false,
      },
      {
        name: "Open Air Theater",
        description: "Outdoor venue for summer concerts",
        location: "789 Park Boulevard",
        capacity: "5,000",
        eventsCount: 15,
        featured: false,
      },
    ];

    return (
      <div className="grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <VenueCard
            key={venue.name}
            name={venue.name}
            description={venue.description}
            location={venue.location}
            capacity={venue.capacity}
            eventsCount={venue.eventsCount}
            eventsLabel="events"
            capacityLabel="Capacity"
            variant={venue.featured ? "elevated" : "default"}
            featured={venue.featured}
            popularBadgeText={venue.featured ? "Popular" : undefined}
            imageUrl="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
            href={`/venue/${venue.name.toLowerCase().replace(/\s+/g, "-")}`}
          />
        ))}
      </div>
    );
  },
};
