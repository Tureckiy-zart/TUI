import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "./Flex";

const meta: Meta<typeof Flex> = {
  title: "Layout/Flex",
  component: Flex,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Token-driven flexbox container component with support for direction, wrap, alignment, justification, and responsive gap using CSS variables.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["row", "column", "row-reverse", "column-reverse"],
      description: "Flex direction",
    },
    wrap: {
      control: { type: "select" },
      options: ["nowrap", "wrap", "wrap-reverse"],
      description: "Flex wrap",
    },
    justify: {
      control: { type: "select" },
      options: ["start", "end", "center", "between", "around", "evenly"],
      description: "Justify content",
    },
    align: {
      control: { type: "select" },
      options: ["start", "end", "center", "baseline", "stretch"],
      description: "Align items",
    },
    gap: {
      control: { type: "text" },
      description: "Gap between flex items (uses spacing tokens)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div className="rounded-md border bg-card p-md">Item 1</div>
        <div className="rounded-md border bg-card p-md">Item 2</div>
        <div className="rounded-md border bg-card p-md">Item 3</div>
      </>
    ),
  },
};

export const WithGap: Story = {
  args: {
    gap: 4,
    children: (
      <>
        <div className="rounded-md border bg-card p-md">Item 1</div>
        <div className="rounded-md border bg-card p-md">Item 2</div>
        <div className="rounded-md border bg-card p-md">Item 3</div>
      </>
    ),
  },
};

export const Directions: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Row (default)</h3>
        <Flex direction="row" gap={4}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Flex>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Column</h3>
        <Flex direction="column" gap={4}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Flex>
      </div>
    </div>
  ),
};

export const JustifyContent: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Start</h3>
        <Flex justify="start" gap={4}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
        </Flex>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Center</h3>
        <Flex justify="center" gap={4}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
        </Flex>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Between</h3>
        <Flex justify="between" gap={4}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
        </Flex>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Evenly</h3>
        <Flex justify="evenly" gap={4}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Flex>
      </div>
    </div>
  ),
};

export const AlignItems: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Start</h3>
        <Flex align="start" gap={4} className="h-32">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="h-20 rounded-md border bg-card p-md">Tall Item</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Flex>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Center</h3>
        <Flex align="center" gap={4} className="h-32">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="h-20 rounded-md border bg-card p-md">Tall Item</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Flex>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Stretch</h3>
        <Flex align="stretch" gap={4} className="h-32">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="h-20 rounded-md border bg-card p-md">Tall Item</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Flex>
      </div>
    </div>
  ),
};

export const Wrap: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Nowrap (default)</h3>
        <Flex wrap="nowrap" gap={4}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="whitespace-nowrap rounded-md border bg-card p-md">
              Item {i + 1}
            </div>
          ))}
        </Flex>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Wrap</h3>
        <Flex wrap="wrap" gap={4}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="whitespace-nowrap rounded-md border bg-card p-md">
              Item {i + 1}
            </div>
          ))}
        </Flex>
      </div>
    </div>
  ),
};

export const TokenBasedGaps: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Gap: xs (1)</h3>
        <Flex gap={1}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Flex>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Gap: md (4)</h3>
        <Flex gap={4}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Flex>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Gap: xl (8)</h3>
        <Flex gap={8}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Flex>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Gap: semantic lg</h3>
        <Flex gap="lg">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All gaps use token-based spacing values via CSS variables",
      },
    },
  },
};

export const AllProps: Story = {
  args: {
    direction: "row",
    wrap: "wrap",
    gap: 4,
    align: "center",
    justify: "between",
    children: (
      <>
        <div className="rounded-md border bg-card p-md">Item 1</div>
        <div className="rounded-md border bg-card p-md">Item 2</div>
        <div className="rounded-md border bg-card p-md">Item 3</div>
      </>
    ),
  },
};
