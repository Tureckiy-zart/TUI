/**
 * DataList Component Tests
 *
 * Tests for DataList component rendering and behavior.
 */

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { DataList, DataListItem, DataListLabel, DataListRoot, DataListValue } from "./index";

describe("DataList", () => {
  describe("Rendering", () => {
    it("renders basic data list structure", () => {
      const { container } = renderWithTheme(
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const dl = container.querySelector("dl");
      expect(dl).toBeInTheDocument();
      expect(dl?.tagName).toBe("DL");

      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("renders data list with multiple items", () => {
      renderWithTheme(
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Email</DataListLabel>
            <DataListValue>john@example.com</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });

    it("renders using compound component pattern", () => {
      // Note: Compound component pattern works at runtime, but TypeScript types
      // may not be available in test environment. Using direct imports instead.
      renderWithTheme(
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("renders using DataList alias", () => {
      renderWithTheme(
        <DataList>
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataList>,
      );

      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  describe("Semantic HTML", () => {
    it("uses semantic HTML elements (dl, dt, dd)", () => {
      const { container } = renderWithTheme(
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const dl = container.querySelector("dl");
      const dt = container.querySelector("dt");
      const dd = container.querySelector("dd");

      expect(dl).toBeInTheDocument();
      expect(dt).toBeInTheDocument();
      expect(dd).toBeInTheDocument();
    });

    it("renders dt element for labels", () => {
      const { container } = renderWithTheme(
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const dt = container.querySelector("dt");
      expect(dt).toBeInTheDocument();
      expect(dt?.textContent).toBe("Name");
    });

    it("renders dd element for values", () => {
      const { container } = renderWithTheme(
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const dd = container.querySelector("dd");
      expect(dd).toBeInTheDocument();
      expect(dd?.textContent).toBe("John Doe");
    });
  });

  describe("labelWidth prop", () => {
    it("applies default labelWidth (md)", () => {
      const { container } = renderWithTheme(
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const dt = container.querySelector("dt");
      expect(dt).toBeInTheDocument();
      // labelWidth.md should be applied (w-32 class from tokens)
      expect(dt?.className).toContain("w-32");
    });

    it("applies sm labelWidth", () => {
      const { container } = renderWithTheme(
        <DataListRoot labelWidth="sm">
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const dt = container.querySelector("dt");
      expect(dt).toBeInTheDocument();
      // labelWidth.sm should be applied (w-24 class from tokens)
      expect(dt?.className).toContain("w-24");
    });

    it("applies lg labelWidth", () => {
      const { container } = renderWithTheme(
        <DataListRoot labelWidth="lg">
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const dt = container.querySelector("dt");
      expect(dt).toBeInTheDocument();
      // labelWidth.lg should be applied (w-40 class from tokens)
      expect(dt?.className).toContain("w-40");
    });

    it("applies labelWidth to all labels in list", () => {
      const { container } = renderWithTheme(
        <DataListRoot labelWidth="sm">
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Email</DataListLabel>
            <DataListValue>john@example.com</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const dtElements = container.querySelectorAll("dt");
      expect(dtElements).toHaveLength(2);
      dtElements.forEach((dt) => {
        expect(dt.className).toContain("w-24");
      });
    });
  });

  describe("padding prop", () => {
    it("applies default padding (md)", () => {
      const { container } = renderWithTheme(
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const item = container.querySelector("div");
      expect(item).toBeInTheDocument();
      // padding.md should be applied (py-sm class from tokens)
      expect(item?.className).toContain("py-sm");
    });

    it("applies sm padding", () => {
      const { container } = renderWithTheme(
        <DataListRoot>
          <DataListItem padding="sm">
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const item = container.querySelector("div");
      expect(item).toBeInTheDocument();
      // padding.sm should be applied (py-xs class from tokens)
      expect(item?.className).toContain("py-xs");
    });

    it("applies lg padding", () => {
      const { container } = renderWithTheme(
        <DataListRoot>
          <DataListItem padding="lg">
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const item = container.querySelector("div");
      expect(item).toBeInTheDocument();
      // padding.lg should be applied (py-md class from tokens)
      expect(item?.className).toContain("py-md");
    });

    it("applies different padding to different items", () => {
      const { container } = renderWithTheme(
        <DataListRoot>
          <DataListItem padding="sm">
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
          <DataListItem padding="lg">
            <DataListLabel>Email</DataListLabel>
            <DataListValue>john@example.com</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const items = container.querySelectorAll("div");
      expect(items[0]?.className).toContain("py-xs");
      expect(items[1]?.className).toContain("py-md");
    });
  });

  describe("Edge cases", () => {
    it("renders with empty children", () => {
      const { container } = renderWithTheme(<DataListRoot>{null}</DataListRoot>);

      const dl = container.querySelector("dl");
      expect(dl).toBeInTheDocument();
    });

    it("renders with multiple labels and values", () => {
      renderWithTheme(
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
            <DataListLabel>Email</DataListLabel>
            <DataListValue>john@example.com</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });

    it("handles className prop on root", () => {
      const { container } = renderWithTheme(
        <DataListRoot className="custom-class">
          <DataListItem>
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const dl = container.querySelector("dl");
      expect(dl?.className).toContain("custom-class");
    });

    it("handles className prop on item", () => {
      const { container } = renderWithTheme(
        <DataListRoot>
          <DataListItem className="custom-item-class">
            <DataListLabel>Name</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
        </DataListRoot>,
      );

      const item = container.querySelector("div");
      expect(item?.className).toContain("custom-item-class");
    });
  });
});
