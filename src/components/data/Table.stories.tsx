import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Moderator" }
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: "name", title: "Name" },
      { key: "email", title: "Email" },
      { key: "role", title: "Role" }
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
          <span className={`px-2 py-1 rounded text-xs ${
            value === 'Admin' ? 'bg-red-100 text-red-800' :
            value === 'Moderator' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {value}
          </span>
        )
      }
    ],
    rowKey: "id",
  },
};
