import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";

const meta: Meta<typeof Table> = {
  title: "Foundation Locked/Patterns/Tables/SimpleTable",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Moderator" },
];

const basicColumns = [
  { key: "name" as const, title: "Name" },
  { key: "email" as const, title: "Email" },
  { key: "role" as const, title: "Role" },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    rowKey: "id",
  },
};

export const WithCustomRender: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: "name" as const, title: "Name" },
      { key: "email" as const, title: "Email" },
      {
        key: "role" as const,
        title: "Role",
        render: (value: unknown) => (
          <span
            className={`rounded px-sm py-xs text-xs ${
              value === "Admin"
                ? "bg-destructive/20 text-destructive-foreground"
                : value === "Moderator"
                  ? "bg-secondary/20 text-secondary-foreground"
                  : "bg-accent/20 text-accent-foreground"
            }`}
          >
            {String(value)}
          </span>
        ),
      },
    ],
    rowKey: "id",
  },
};

/**
 * SizesGallery Story
 *
 * Demonstrates all available size variants (sm, md, lg).
 * Required per VARIANTS_SIZE_CANON.md for components with size prop.
 */
export const SizesGallery: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Small (sm)</h3>
        <Table data={sampleData} columns={basicColumns} rowKey="id" size="sm" />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Medium (md) - Default</h3>
        <Table data={sampleData} columns={basicColumns} rowKey="id" size="md" />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Large (lg)</h3>
        <Table data={sampleData} columns={basicColumns} rowKey="id" size="lg" />
      </div>
    </div>
  ),
};

/**
 * States Story
 *
 * Demonstrates interactive states (hover on rows).
 * Component uses CSS-only hover state, so this story shows the hover effect.
 */
export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Default State</h3>
        <p className="mb-2 text-sm text-muted-foreground">Hover over rows to see hover state</p>
        <Table data={sampleData} columns={basicColumns} rowKey="id" />
      </div>
    </div>
  ),
};
