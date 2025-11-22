import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Table } from "./Table";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
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

export const Default: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: "name", title: "Name" },
      { key: "email", title: "Email" },
      { key: "role", title: "Role" },
    ],
    rowKey: "id",
  },
};

export const WithCustomRender: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: "name", title: "Name" },
      { key: "email", title: "Email" },
      {
        key: "role",
        title: "Role",
        render: (value) => (
          <span
            className={`rounded px-sm py-xs text-xs ${
              value === "Admin"
                ? "bg-error/20 text-error-foreground"
                : value === "Moderator"
                  ? "bg-warning/20 text-warning-foreground"
                  : "bg-success/20 text-success-foreground"
            }`}
          >
            {value}
          </span>
        ),
      },
    ],
    rowKey: "id",
  },
};
