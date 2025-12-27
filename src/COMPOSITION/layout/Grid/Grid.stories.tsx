import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const meta: Meta<typeof Grid> = {
  title: "Foundation Locked/Composition/Layout/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grid is a CSS Grid container extension of Box. It provides full control over grid layout properties (columns, rows, gap, flow, alignment). Uses Box internally as the base container. Use Grid for two-dimensional layouts that require precise control over both rows and columns.",
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
