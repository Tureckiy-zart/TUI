import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";
import { EventCard } from "../cards/EventCard";
import { VenueCard } from "../cards/VenueCard";

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Token-driven CSS Grid container component with support for columns, rows, gap, alignment, and responsive layout using CSS variables. All spacing uses token system via CSS variables.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6, 12, "none"],
      description: "Number of columns (base breakpoint)",
      table: {
        type: { summary: "number | 'none'" },
        defaultValue: { summary: 1 },
      },
    },
    md: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6, 12, "none"],
      description: "Number of columns for medium breakpoint (768px+)",
      table: {
        type: { summary: "number | 'none'" },
      },
    },
    lg: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6, 12, "none"],
      description: "Number of columns for large breakpoint (1024px+)",
      table: {
        type: { summary: "number | 'none'" },
      },
    },
    xl: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6, 12, "none"],
      description: "Number of columns for extra large breakpoint (1280px+)",
      table: {
        type: { summary: "number | 'none'" },
      },
    },
    gap: {
      control: { type: "text" },
      description: "Gap between grid items (uses spacing tokens via CSS variables)",
      table: {
        type: { summary: "SpacingValue | ResponsiveValue<SpacingValue>" },
        defaultValue: { summary: 0 },
      },
    },
    align: {
      control: { type: "select" },
      options: ["start", "end", "center", "baseline", "stretch"],
      description: "Vertical alignment of grid items",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "stretch" },
      },
    },
    justify: {
      control: { type: "select" },
      options: ["start", "end", "center", "between", "around", "evenly"],
      description: "Horizontal alignment of grid items",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "start" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cols: 3,
    gap: 4,
    children: (
      <>
        <div className="rounded-md border bg-card p-md">Item 1</div>
        <div className="rounded-md border bg-card p-md">Item 2</div>
        <div className="rounded-md border bg-card p-md">Item 3</div>
        <div className="rounded-md border bg-card p-md">Item 4</div>
        <div className="rounded-md border bg-card p-md">Item 5</div>
        <div className="rounded-md border bg-card p-md">Item 6</div>
      </>
    ),
  },
};

export const ResponsiveColumns: Story = {
  args: {
    cols: 1,
    md: 2,
    lg: 3,
    xl: 4,
    gap: 4,
    children: (
      <>
        <div className="rounded-md border bg-card p-md">Item 1</div>
        <div className="rounded-md border bg-card p-md">Item 2</div>
        <div className="rounded-md border bg-card p-md">Item 3</div>
        <div className="rounded-md border bg-card p-md">Item 4</div>
        <div className="rounded-md border bg-card p-md">Item 5</div>
        <div className="rounded-md border bg-card p-md">Item 6</div>
        <div className="rounded-md border bg-card p-md">Item 7</div>
        <div className="rounded-md border bg-card p-md">Item 8</div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Responsive grid that adapts from 1 column on mobile, to 2 on tablet, 3 on desktop, and 4 on large screens.",
      },
    },
  },
};

export const TokenBasedGaps: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Gap: xs (1) - uses CSS variables</h3>
        <Grid cols={3} gap={1}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Grid>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Gap: md (4) - uses CSS variables</h3>
        <Grid cols={3} gap={4}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Grid>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Gap: xl (8) - uses CSS variables</h3>
        <Grid cols={3} gap={8}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Grid>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Gap: semantic lg - uses CSS variables</h3>
        <Grid cols={3} gap="lg">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All gaps use token-based spacing values via CSS variables for consistent layout rhythm.",
      },
    },
  },
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Align: Start</h3>
        <Grid cols={3} gap={4} align="start" className="h-32">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="h-20 rounded-md border bg-card p-md">Tall Item</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Grid>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Align: Center</h3>
        <Grid cols={3} gap={4} align="center" className="h-32">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="h-20 rounded-md border bg-card p-md">Tall Item</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Grid>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Justify: Between</h3>
        <Grid cols={3} gap={4} justify="between">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Grid>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Justify: Center</h3>
        <Grid cols={3} gap={4} justify="center">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
        </Grid>
      </div>
    </div>
  ),
};

export const WithEventCards: Story = {
  args: {
    cols: 1,
    md: 2,
    lg: 3,
    gap: 6,
    children: (
      <>
        <EventCard
          event={{
            name: { en: "Jazz Night" },
            start_date: "2024-02-15",
            venue_id: { name: { en: "Blue Note" } },
            description: { en: "An evening of smooth jazz" },
            price: "25",
            image: "https://via.placeholder.com/400x300",
          }}
          featured={false}
          showImage={true}
          getTicketsLabel="Get Tickets"
          trendingBadgeText="Trending"
        />
        <EventCard
          event={{
            name: { en: "Rock Concert" },
            start_date: "2024-02-20",
            venue_id: { name: { en: "Rock Arena" } },
            description: { en: "High energy rock performance" },
            price: "45",
            image: "https://via.placeholder.com/400x300",
          }}
          featured={true}
          showImage={true}
          getTicketsLabel="Get Tickets"
          trendingBadgeText="Trending"
        />
        <EventCard
          event={{
            name: { en: "Classical Evening" },
            start_date: "2024-02-25",
            venue_id: { name: { en: "Symphony Hall" } },
            description: { en: "Elegant classical music performance" },
            price: "60",
            image: "https://via.placeholder.com/400x300",
          }}
          featured={false}
          showImage={true}
          getTicketsLabel="Get Tickets"
          trendingBadgeText="Trending"
        />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Grid layout with EventCard components. Responsive: 1 column on mobile, 2 on tablet, 3 on desktop.",
      },
    },
  },
};

export const WithVenueCards: Story = {
  args: {
    cols: 1,
    md: 2,
    lg: 3,
    gap: 6,
    children: (
      <>
        <VenueCard
          venue={{
            name: { en: "Blue Note Jazz Club" },
            description: { en: "Intimate jazz venue in the heart of the city" },
            location: "Downtown",
            address: "123 Music Street",
            city: "Tenerife",
            capacity: "200",
            image: "https://via.placeholder.com/400x300",
            events_count: 15,
          }}
          featured={false}
          showImage={true}
          eventsLabel="Events"
          popularBadgeText="Popular"
          capacityLabel="Capacity"
        />
        <VenueCard
          venue={{
            name: { en: "Rock Arena" },
            description: { en: "Large venue for rock concerts and festivals" },
            location: "Entertainment District",
            address: "456 Rock Boulevard",
            city: "Tenerife",
            capacity: "5000",
            image: "https://via.placeholder.com/400x300",
            events_count: 32,
          }}
          featured={true}
          showImage={true}
          eventsLabel="Events"
          popularBadgeText="Popular"
          capacityLabel="Capacity"
        />
        <VenueCard
          venue={{
            name: { en: "Symphony Hall" },
            description: { en: "Elegant classical music venue" },
            location: "Cultural Quarter",
            address: "789 Classical Avenue",
            city: "Tenerife",
            capacity: "800",
            image: "https://via.placeholder.com/400x300",
            events_count: 8,
          }}
          featured={false}
          showImage={true}
          eventsLabel="Events"
          popularBadgeText="Popular"
          capacityLabel="Capacity"
        />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Grid layout with VenueCard components. Responsive: 1 column on mobile, 2 on tablet, 3 on desktop.",
      },
    },
  },
};

export const MixedContent: Story = {
  args: {
    cols: 1,
    md: 2,
    lg: 4,
    gap: 4,
    children: (
      <>
        <div className="col-span-full rounded-md border bg-card p-lg">
          <h2 className="text-2xl font-bold">Featured Section</h2>
          <p className="text-muted-foreground">This spans all columns</p>
        </div>
        <div className="rounded-md border bg-card p-md">Card 1</div>
        <div className="rounded-md border bg-card p-md">Card 2</div>
        <div className="rounded-md border bg-card p-md">Card 3</div>
        <div className="rounded-md border bg-card p-md">Card 4</div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example showing how to combine Grid with manual column spanning using Tailwind classes.",
      },
    },
  },
};
