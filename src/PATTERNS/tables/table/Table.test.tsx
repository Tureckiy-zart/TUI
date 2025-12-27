/**
 * Table Component Tests
 *
 * Tests for Table component rendering and behavior.
 */

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

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

describe("Table", () => {
  const sampleData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  ];

  describe("Rendering", () => {
    it("renders basic table structure", () => {
      renderWithTheme(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: "Email" })).toBeInTheDocument();
      expect(screen.getByRole("cell", { name: "John Doe" })).toBeInTheDocument();
      expect(screen.getByRole("cell", { name: "john@example.com" })).toBeInTheDocument();
    });

    it("renders table with multiple rows", () => {
      renderWithTheme(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("cell", { name: "John Doe" })).toBeInTheDocument();
      expect(screen.getByRole("cell", { name: "Jane Smith" })).toBeInTheDocument();
    });

    it("renders empty state", () => {
      renderWithTheme(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableEmpty colSpan={1} message="No data available" />
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("No data available")).toBeInTheDocument();
    });

    it("renders loading state", () => {
      renderWithTheme(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableLoadingState colSpan={1} rows={3} />
          </TableBody>
        </Table>,
      );

      // Loading state renders skeleton rows
      const rows = screen.getAllByRole("row");
      // Header row + 3 skeleton rows
      expect(rows.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe("Variants", () => {
    it("renders table with different cell sizes", () => {
      renderWithTheme(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead size="sm">Small</TableHead>
              <TableHead size="md">Medium</TableHead>
              <TableHead size="lg">Large</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell size="sm">Small</TableCell>
              <TableCell size="md">Medium</TableCell>
              <TableCell size="lg">Large</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("columnheader", { name: "Small" })).toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: "Medium" })).toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: "Large" })).toBeInTheDocument();
    });

    it("renders table with different cell alignments", () => {
      renderWithTheme(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead align="left">Left</TableHead>
              <TableHead align="center">Center</TableHead>
              <TableHead align="right">Right</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell align="left">Left</TableCell>
              <TableCell align="center">Center</TableCell>
              <TableCell align="right">Right</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("columnheader", { name: "Left" })).toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: "Center" })).toBeInTheDocument();
      expect(screen.getByRole("columnheader", { name: "Right" })).toBeInTheDocument();
    });

    it("renders table with selected row", () => {
      renderWithTheme(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow selected>
              <TableCell>Selected</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Not Selected</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("cell", { name: "Selected" })).toBeInTheDocument();
      expect(screen.getByRole("cell", { name: "Not Selected" })).toBeInTheDocument();
    });
  });

  describe("Sorting", () => {
    it("toggles sort direction on click", async () => {
      const user = userEvent.setup();

      renderWithTheme(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead sortable columnKey="name">
                Name
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const header = screen.getByRole("columnheader", { name: "Name" });

      // Initially no sort
      expect(header).toHaveAttribute("aria-sort", "none");

      // First click - ascending
      await user.click(header);
      expect(header).toHaveAttribute("aria-sort", "ascending");

      // Second click - descending
      await user.click(header);
      expect(header).toHaveAttribute("aria-sort", "descending");

      // Third click - no sort
      await user.click(header);
      expect(header).toHaveAttribute("aria-sort", "none");
    });
  });

  describe("Expandable Rows", () => {
    it("renders expanded content when row is expanded", () => {
      renderWithTheme(
        <Table expandable>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow expandable expanded>
              <TableCell>John Doe</TableCell>
            </TableRow>
            <TableRow>
              <TableExpandableContent colSpan={1} expanded>
                <div>Additional Information</div>
              </TableExpandableContent>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByText("Additional Information")).toBeInTheDocument();
    });

    it("does not render expanded content when row is not expanded", () => {
      renderWithTheme(
        <Table expandable>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow expandable expanded={false}>
              <TableCell>John Doe</TableCell>
            </TableRow>
            <TableRow>
              <TableExpandableContent colSpan={1} expanded={false}>
                <div>Additional Information</div>
              </TableExpandableContent>
            </TableRow>
          </TableBody>
        </Table>,
      );

      // Content should not be visible when not expanded
      // The content is rendered but hidden via CSS (hidden class on inner div)
      const content = screen.queryByText("Additional Information");
      // Content exists in DOM but should be hidden via CSS
      expect(content).toBeInTheDocument();
      // The content is inside a div that should have 'hidden' class when collapsed
      // content -> div (with hidden class) -> td
      const contentDiv = content?.parentElement;
      expect(contentDiv).toBeInTheDocument();
      // The div wrapping the content should have 'hidden' class when collapsed
      expect(contentDiv).toHaveClass("hidden");
    });

    it("sets aria-expanded attribute on expandable rows", () => {
      renderWithTheme(
        <Table expandable>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow expandable expanded>
              <TableCell>John Doe</TableCell>
            </TableRow>
            <TableRow expandable expanded={false}>
              <TableCell>Jane Smith</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const rows = screen.getAllByRole("row");
      const expandableRows = rows.filter((row) => row.hasAttribute("aria-expanded"));

      expect(expandableRows.length).toBeGreaterThan(0);
      const expandedRow = expandableRows.find(
        (row) => row.getAttribute("aria-expanded") === "true",
      );
      const collapsedRow = expandableRows.find(
        (row) => row.getAttribute("aria-expanded") === "false",
      );

      expect(expandedRow).toBeInTheDocument();
      expect(collapsedRow).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper table role", () => {
      renderWithTheme(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Test</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("has proper columnheader role", () => {
      renderWithTheme(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Test</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("columnheader")).toBeInTheDocument();
    });

    it("has proper cell role", () => {
      renderWithTheme(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Test</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(screen.getByRole("cell")).toBeInTheDocument();
    });
  });
});
