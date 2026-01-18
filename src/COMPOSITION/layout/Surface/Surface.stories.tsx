import type { Meta, StoryObj } from "@storybook/react";
import { Surface } from "./Surface";

const meta: Meta<typeof Surface> = {
  title: "UI / Composition / Layout / Surface",
  component: Surface,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Surface is a variant component extension of Box. It provides surface elevation variants (default, elevated, outlined, filled, subtle) with token-based styling. Uses Box internally as the base container and tokenCVA for variant management.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "elevated", "outlined", "filled", "subtle"],
      description: "Surface elevation variant",
      table: {
        type: { summary: "SurfaceVariantType" },
        defaultValue: { summary: "default" },
      },
    },
    radius: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      description: "Border radius (token-based)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  args: {
    variant: "default",
    p: "md",
    children: "Surface with default variant",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Default</h3>
        <Surface variant="default" p="md" radius="md">
          Default surface - standard elevation
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Elevated</h3>
        <Surface variant="elevated" p="md" radius="md">
          Elevated surface - raised with shadow
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Outlined</h3>
        <Surface variant="outlined" p="md" radius="md">
          Outlined surface - border-focused variant
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Filled</h3>
        <Surface variant="filled" p="md" radius="md">
          Filled surface - solid background
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Subtle</h3>
        <Surface variant="subtle" p="md" radius="md">
          Subtle surface - minimal background
        </Surface>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All surface elevation variants",
      },
    },
  },
};

export const WithRadius: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: sm</h3>
        <Surface variant="elevated" p="md" radius="sm">
          Small radius
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: md</h3>
        <Surface variant="elevated" p="md" radius="md">
          Medium radius
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: lg</h3>
        <Surface variant="elevated" p="md" radius="lg">
          Large radius
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: full</h3>
        <Surface variant="elevated" p="md" radius="full">
          Full radius (pill)
        </Surface>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Surface with different border radius values",
      },
    },
  },
};

export const WithSpacing: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: sm</h3>
        <Surface variant="elevated" p="sm" radius="md">
          Small padding
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: md</h3>
        <Surface variant="elevated" p="md" radius="md">
          Medium padding
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: lg</h3>
        <Surface variant="elevated" p="lg" radius="md">
          Large padding
        </Surface>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Surface with different padding values (inherited from Box)",
      },
    },
  },
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Card</h3>
        <Surface variant="elevated" p="lg" radius="lg">
          <h4 className="mb-sm text-lg font-semibold">Card Title</h4>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Card content with elevated surface variant
          </p>
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Panel</h3>
        <Surface variant="default" p="md" radius="md">
          <h4 className="mb-sm text-lg font-semibold">Panel Title</h4>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Panel content with default surface variant
          </p>
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Filled Area</h3>
        <Surface variant="filled" p="md" radius="md">
          <h4 className="mb-sm text-lg font-semibold">Filled Title</h4>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Filled content with filled surface variant
          </p>
        </Surface>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Common use cases for Surface component with different variants",
      },
    },
  },
};
