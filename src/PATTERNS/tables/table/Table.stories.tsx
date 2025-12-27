import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Button } from "@/PRIMITIVES/Button";

import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableExpandableContent,
  TableHead,
  TableHeader,
  TableLoadingState,
  TableRow,
} from "./index";

const meta: Meta<typeof Table> = {
  title: "Legacy Patterns/Tables/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Token-driven table component with sorting, expandable rows, loading, and empty states. Uses TABLE_TOKENS for all styling.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Moderator", status: "Inactive" },
];

/**
 * Basic table
 */
export const Basic: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Sortable table
 */
export const Sortable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead sortable columnKey="name">
            Name
          </TableHead>
          <TableHead sortable columnKey="email">
            Email
          </TableHead>
          <TableHead sortable columnKey="role">
            Role
          </TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status} </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Table with cell alignment
 */
export const CellAlignment: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead align="left">Name</TableHead>
          <TableHead align="center">Email</TableHead>
          <TableHead align="right">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((user) => (
          <TableRow key={user.id}>
            <TableCell align="left">{user.name}</TableCell>
            <TableCell align="center">{user.email}</TableCell>
            <TableCell align="right">{user.role} </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Table with different cell sizes
 */
export const CellSizes: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead size="sm">Small</TableHead>
          <TableHead size="md">Medium (Default)</TableHead>
          <TableHead size="lg">Large</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((user) => (
          <TableRow key={user.id}>
            <TableCell size="sm">{user.name}</TableCell>
            <TableCell size="md">{user.email}</TableCell>
            <TableCell size="lg">{user.role} </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Table with selected rows
 */
export const SelectedRows: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((user, index) => (
          <TableRow key={user.id} selected={index === 0}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role} </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Table with expandable rows
 */
export const ExpandableRows: Story = {
  render: () => {
    const [expanded, setExpanded] = React.useState<Set<number>>(new Set());

    const toggleRow = (id: number) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    return (
      <Table expandable>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((user) => {
            const isExpanded = expanded.has(user.id);
            return (
              <React.Fragment key={user.id}>
                <TableRow expandable expanded={isExpanded} onClick={() => toggleRow(user.id)}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
                <TableRow>
                  <TableExpandableContent colSpan={3} expanded={isExpanded}>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Additional Information</p>
                      <p className="text-sm text-muted-foreground">Status: {user.status}</p>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </TableExpandableContent>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    );
  },
};

/**
 * Table with loading state
 */
export const Loading: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableLoadingState colSpan={4} rows={5} />
      </TableBody>
    </Table>
  ),
};

/**
 * Table with empty state
 */
export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty colSpan={4} message="No users found" />
      </TableBody>
    </Table>
  ),
};

/**
 * Table with sticky header
 */
export const StickyHeader: Story = {
  render: () => (
    <div className="h-96 overflow-auto">
      <Table>
        <TableHeader sticky>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 20 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>User {i + 1}</TableCell>
              <TableCell>user{i + 1}@example.com</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Active </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

/**
 * Sizes gallery - demonstrates all size variants
 */
export const SizesGallery: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">Small Size</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead size="sm">Name</TableHead>
              <TableHead size="sm">Email</TableHead>
              <TableHead size="sm">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((user) => (
              <TableRow key={user.id}>
                <TableCell size="sm">{user.name}</TableCell>
                <TableCell size="sm">{user.email}</TableCell>
                <TableCell size="sm">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium">Medium Size (Default)</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead size="md">Name</TableHead>
              <TableHead size="md">Email</TableHead>
              <TableHead size="md">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((user) => (
              <TableRow key={user.id}>
                <TableCell size="md">{user.name}</TableCell>
                <TableCell size="md">{user.email}</TableCell>
                <TableCell size="md">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-medium">Large Size</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead size="lg">Name</TableHead>
              <TableHead size="lg">Email</TableHead>
              <TableHead size="lg">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((user) => (
              <TableRow key={user.id}>
                <TableCell size="lg">{user.name}</TableCell>
                <TableCell size="lg">{user.email}</TableCell>
                <TableCell size="lg">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};

/**
 * States - demonstrates interactive states
 */
export const States: Story = {
  render: () => {
    const [expanded, setExpanded] = React.useState<Set<number>>(new Set());
    const [selectedRow, setSelectedRow] = React.useState<number | null>(null);

    const toggleRow = (id: number) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    return (
      <Table expandable>
        <TableHeader>
          <TableRow>
            <TableHead sortable columnKey="name">
              Name
            </TableHead>
            <TableHead sortable columnKey="email">
              Email
            </TableHead>
            <TableHead sortable columnKey="role">
              Role
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((user) => {
            const isExpanded = expanded.has(user.id);
            const isSelected = selectedRow === user.id;
            return (
              <React.Fragment key={user.id}>
                <TableRow
                  selected={isSelected}
                  expandable
                  expanded={isExpanded}
                  onClick={() => {
                    toggleRow(user.id);
                    setSelectedRow(isSelected ? null : user.id);
                  }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableExpandableContent colSpan={4} expanded={isExpanded}>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Additional Information</p>
                      <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
                      <p className="text-sm text-muted-foreground">Status: {user.status}</p>
                    </div>
                  </TableExpandableContent>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    );
  },
};
