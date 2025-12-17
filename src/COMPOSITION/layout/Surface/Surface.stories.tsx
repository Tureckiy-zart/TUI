import type { Meta, StoryObj } from "@storybook/react";
import { Surface } from "./Surface";

const meta: Meta<typeof Surface> = {
  title: "Layout/Surface",
  component: Surface,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Surface is a variant component extension of Box. It provides surface elevation variants (flat, raised, sunken) with token-based styling. Uses Box internally as the base container and CVA for variant management.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["flat", "raised", "sunken"],
      description: "Surface elevation variant",
      table: {
        type: { summary: "SurfaceVariant" },
        defaultValue: { summary: "flat" },
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
    variant: "flat",
    p: "md",
    children: "Surface with flat variant (default)",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Flat</h3>
        <Surface variant="flat" p="md" radius="md">
          Flat surface - no elevation
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Raised</h3>
        <Surface variant="raised" p="md" radius="md">
          Raised surface - elevated with shadow
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Sunken</h3>
        <Surface variant="sunken" p="md" radius="md">
          Sunken surface - inset appearance
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
        <Surface variant="raised" p="md" radius="sm">
          Small radius
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: md</h3>
        <Surface variant="raised" p="md" radius="md">
          Medium radius
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: lg</h3>
        <Surface variant="raised" p="md" radius="lg">
          Large radius
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: full</h3>
        <Surface variant="raised" p="md" radius="full">
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
        <Surface variant="raised" p="sm" radius="md">
          Small padding
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: md</h3>
        <Surface variant="raised" p="md" radius="md">
          Medium padding
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: lg</h3>
        <Surface variant="raised" p="lg" radius="md">
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
        <Surface variant="raised" p="lg" radius="lg">
          <h4 className="mb-sm text-lg font-semibold">Card Title</h4>
          <p className="text-sm text-muted-foreground">Card content with raised surface variant</p>
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Panel</h3>
        <Surface variant="flat" p="md" radius="md">
          <h4 className="mb-sm text-lg font-semibold">Panel Title</h4>
          <p className="text-sm text-muted-foreground">Panel content with flat surface variant</p>
        </Surface>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Inset Area</h3>
        <Surface variant="sunken" p="md" radius="md">
          <h4 className="mb-sm text-lg font-semibold">Inset Title</h4>
          <p className="text-sm text-muted-foreground">Inset content with sunken surface variant</p>
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
