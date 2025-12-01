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
        defaultValue: { summary: "1" },
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
        defaultValue: { summary: "0" },
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
          title="Jazz Night"
          date="2024-02-15"
          venueName="Blue Note"
          description="An evening of smooth jazz"
          price="€25"
          imageUrl="https://via.placeholder.com/400x300"
          featured={false}
          showImage={true}
          getTicketsLabel="Get Tickets"
          featuredBadgeText="Trending"
        />
        <EventCard
          title="Rock Concert"
          date="2024-02-20"
          venueName="Rock Arena"
          description="High energy rock performance"
          price="€45"
          imageUrl="https://via.placeholder.com/400x300"
          featured={true}
          showImage={true}
          getTicketsLabel="Get Tickets"
          featuredBadgeText="Trending"
        />
        <EventCard
          title="Classical Evening"
          date="2024-02-25"
          venueName="Symphony Hall"
          description="Elegant classical music performance"
          price="€60"
          imageUrl="https://via.placeholder.com/400x300"
          featured={false}
          showImage={true}
          getTicketsLabel="Get Tickets"
          featuredBadgeText="Trending"
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
          name="Blue Note Jazz Club"
          description="Intimate jazz venue in the heart of the city"
          location="123 Music Street, Downtown, Tenerife"
          capacity="200"
          imageUrl="https://via.placeholder.com/400x300"
          eventsCount={15}
          featured={false}
          showImage={true}
          eventsLabel="Events"
          popularBadgeText="Popular"
          capacityLabel="Capacity"
        />
        <VenueCard
          name="Rock Arena"
          description="Large venue for rock concerts and festivals"
          location="456 Rock Boulevard, Entertainment District, Tenerife"
          capacity="5000"
          imageUrl="https://via.placeholder.com/400x300"
          eventsCount={32}
          featured={true}
          showImage={true}
          eventsLabel="Events"
          popularBadgeText="Popular"
          capacityLabel="Capacity"
        />
        <VenueCard
          name="Symphony Hall"
          description="Elegant classical music venue"
          location="789 Classical Avenue, Cultural Quarter, Tenerife"
          capacity="800"
          imageUrl="https://via.placeholder.com/400x300"
          eventsCount={8}
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
