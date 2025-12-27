import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { axeCheck, renderWithTheme } from "@/test/test-utils";

import { Table } from "./Table";

// Sample data for testing
interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
}

const sampleData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Moderator" },
];

const basicColumns = [
  { key: "name" as keyof User, title: "Name" },
  { key: "email" as keyof User, title: "Email" },
  { key: "role" as keyof User, title: "Role" },
];

describe("SimpleTable", () => {
  describe("Rendering", () => {
    it("renders table with data and columns", () => {
      renderWithTheme(<Table data={sampleData} columns={basicColumns} rowKey="id" />);

      // Check headers
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Role")).toBeInTheDocument();

      // Check data rows
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("Admin")).toBeInTheDocument();
    });

    it("renders empty table when data is empty", () => {
      renderWithTheme(<Table data={[]} columns={basicColumns} rowKey="id" />);

      // Headers should still be present
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Role")).toBeInTheDocument();

      // No data rows should be present
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });

    it("renders table with custom render function", () => {
      const columnsWithRender = [
        { key: "name" as keyof User, title: "Name" },
        {
          key: "role" as keyof User,
          title: "Role",
          render: (value: unknown) => <span data-testid="custom-role">{String(value)}</span>,
        },
      ];

      renderWithTheme(<Table data={sampleData} columns={columnsWithRender} rowKey="id" />);

      // Check custom render
      const customRoles = screen.getAllByTestId("custom-role");
      expect(customRoles).toHaveLength(3);
      expect(customRoles[0]).toHaveTextContent("Admin");
    });

    it("renders table with default size (md)", () => {
      const { container } = renderWithTheme(
        <Table data={sampleData} columns={basicColumns} rowKey="id" />,
      );

      // Check that table is rendered
      const table = container.querySelector("table");
      expect(table).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("renders with size='sm'", () => {
      const { container } = renderWithTheme(
        <Table data={sampleData} columns={basicColumns} rowKey="id" size="sm" />,
      );

      const table = container.querySelector("table");
      expect(table).toBeInTheDocument();
    });

    it("renders with size='md'", () => {
      const { container } = renderWithTheme(
        <Table data={sampleData} columns={basicColumns} rowKey="id" size="md" />,
      );

      const table = container.querySelector("table");
      expect(table).toBeInTheDocument();
    });

    it("renders with size='lg'", () => {
      const { container } = renderWithTheme(
        <Table data={sampleData} columns={basicColumns} rowKey="id" size="lg" />,
      );

      const table = container.querySelector("table");
      expect(table).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles numeric values correctly", () => {
      interface NumericData extends Record<string, unknown> {
        id: number;
        value: number;
      }

      const numericData: NumericData[] = [
        { id: 1, value: 100 },
        { id: 2, value: 200 },
      ];

      const numericColumns = [
        { key: "id" as keyof NumericData, title: "ID" },
        { key: "value" as keyof NumericData, title: "Value" },
      ];

      renderWithTheme(<Table data={numericData} columns={numericColumns} rowKey="id" />);

      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("handles boolean values correctly", () => {
      interface BooleanData extends Record<string, unknown> {
        id: number;
        active: boolean;
      }

      const booleanData: BooleanData[] = [
        { id: 1, active: true },
        { id: 2, active: false },
      ];

      const booleanColumns = [
        { key: "id" as keyof BooleanData, title: "ID" },
        { key: "active" as keyof BooleanData, title: "Active" },
      ];

      renderWithTheme(<Table data={booleanData} columns={booleanColumns} rowKey="id" />);

      expect(screen.getByText("true")).toBeInTheDocument();
      expect(screen.getByText("false")).toBeInTheDocument();
    });

    it("handles null/undefined values correctly", () => {
      interface NullableData extends Record<string, unknown> {
        id: number;
        name: string | null;
        email?: string;
      }

      const nullableData: NullableData[] = [
        { id: 1, name: "John", email: "john@example.com" },
        { id: 2, name: null },
        { id: 3, name: "Bob" },
      ];

      const nullableColumns = [
        { key: "id" as keyof NullableData, title: "ID" },
        { key: "name" as keyof NullableData, title: "Name" },
        { key: "email" as keyof NullableData, title: "Email" },
      ];

      renderWithTheme(<Table data={nullableData} columns={nullableColumns} rowKey="id" />);

      expect(screen.getByText("null")).toBeInTheDocument();
      // There are multiple "undefined" values, so use getAllByText
      const undefinedElements = screen.getAllByText("undefined");
      expect(undefinedElements.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    it("has semantic table structure", () => {
      const { container } = renderWithTheme(
        <Table data={sampleData} columns={basicColumns} rowKey="id" />,
      );

      expect(container.querySelector("table")).toBeInTheDocument();
      expect(container.querySelector("thead")).toBeInTheDocument();
      expect(container.querySelector("tbody")).toBeInTheDocument();
      expect(container.querySelectorAll("th")).toHaveLength(3);
      expect(container.querySelectorAll("td")).toHaveLength(9); // 3 columns × 3 rows
    });

    it("passes axe accessibility checks", async () => {
      const { container } = renderWithTheme(
        <Table data={sampleData} columns={basicColumns} rowKey="id" />,
      );

      await axeCheck(container);
    });
  });

  describe("Custom className", () => {
    it("applies custom className to container", () => {
      const { container } = renderWithTheme(
        <Table data={sampleData} columns={basicColumns} rowKey="id" className="custom-class" />,
      );

      const wrapper = container.querySelector("div");
      expect(wrapper).toHaveClass("custom-class");
    });
  });
});
