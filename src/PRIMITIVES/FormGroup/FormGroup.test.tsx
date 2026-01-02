import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { Input } from "@/PRIMITIVES/Input";
import { Text } from "@/PRIMITIVES/Text";
import { renderWithTheme } from "@/test/test-utils";

import { FormGroup } from "./FormGroup";

describe("FormGroup", () => {
  describe("Rendering", () => {
    it("renders fieldset element", () => {
      renderWithTheme(
        <FormGroup>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const fieldset = screen.getByRole("group");
      expect(fieldset).toBeInTheDocument();
      expect(fieldset.tagName).toBe("FIELDSET");
    });

    it("renders legend when provided", () => {
      renderWithTheme(
        <FormGroup legend="Test Legend">
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const legend = screen.getByText("Test Legend");
      expect(legend).toBeInTheDocument();
      expect(legend.tagName).toBe("LEGEND");
    });

    it("does not render legend when not provided", () => {
      renderWithTheme(
        <FormGroup>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const fieldset = screen.getByRole("group");
      const legend = fieldset.querySelector("legend");
      expect(legend).not.toBeInTheDocument();
    });

    it("renders children without additional wrappers", () => {
      renderWithTheme(
        <FormGroup>
          <div data-testid="child-wrapper">
            <Input placeholder="Test input" />
          </div>
        </FormGroup>,
      );
      const fieldset = screen.getByRole("group");
      const childWrapper = screen.getByTestId("child-wrapper");
      // Child should be direct child of fieldset (no extra wrapper)
      expect(fieldset.contains(childWrapper)).toBe(true);
      // Check that Stack is not rendered when there's no description/error
      // Stack uses flex-col class, check for direct children of fieldset with flex-col
      const fieldsetChildren = Array.from(fieldset.children);
      const stackElements = fieldsetChildren.filter((child) =>
        child.className.includes("flex-col"),
      );
      // Stack should only exist if description/error are present
      expect(stackElements.length).toBe(0);
    });

    it("renders description when provided", () => {
      renderWithTheme(
        <FormGroup description={<Text size="sm">Test description</Text>}>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const description = screen.getByText("Test description");
      expect(description).toBeInTheDocument();
    });

    it("renders error when provided", () => {
      renderWithTheme(
        <FormGroup error={<Text size="sm">Test error</Text>}>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const error = screen.getByText("Test error");
      expect(error).toBeInTheDocument();
    });

    it("renders both description and error when provided", () => {
      renderWithTheme(
        <FormGroup
          description={<Text size="sm">Test description</Text>}
          error={<Text size="sm">Test error</Text>}
        >
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      expect(screen.getByText("Test description")).toBeInTheDocument();
      expect(screen.getByText("Test error")).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLFieldSetElement>();
      renderWithTheme(
        <FormGroup ref={ref}>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      expect(ref.current).toBeInstanceOf(HTMLFieldSetElement);
      expect(ref.current).toBe(screen.getByRole("group"));
    });
  });

  describe("Accessibility", () => {
    it("generates unique ID for description", () => {
      renderWithTheme(
        <FormGroup description={<Text size="sm">Description 1</Text>}>
          <Input placeholder="Test" />
        </FormGroup>,
      );
      const description = screen.getByText("Description 1");
      const descriptionId = description.getAttribute("id");
      expect(descriptionId).toBeTruthy();
      expect(descriptionId).toMatch(/^formgroup-.*-description$/);
    });

    it("generates unique ID for error", () => {
      renderWithTheme(
        <FormGroup error={<Text size="sm">Error 1</Text>}>
          <Input placeholder="Test" />
        </FormGroup>,
      );
      const error = screen.getByText("Error 1");
      const errorId = error.getAttribute("id");
      expect(errorId).toBeTruthy();
      expect(errorId).toMatch(/^formgroup-.*-error$/);
    });

    it("generates different IDs for multiple FormGroups", () => {
      renderWithTheme(
        <>
          <FormGroup description={<Text size="sm">Description 1</Text>}>
            <Input placeholder="Test 1" />
          </FormGroup>
          <FormGroup description={<Text size="sm">Description 2</Text>}>
            <Input placeholder="Test 2" />
          </FormGroup>
        </>,
      );
      const desc1 = screen.getByText("Description 1");
      const desc2 = screen.getByText("Description 2");
      expect(desc1.getAttribute("id")).not.toBe(desc2.getAttribute("id"));
    });

    it("applies aria-required when required is true", () => {
      renderWithTheme(
        <FormGroup required>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const fieldset = screen.getByRole("group");
      expect(fieldset).toHaveAttribute("aria-required", "true");
    });

    it("does not apply aria-required when required is false", () => {
      renderWithTheme(
        <FormGroup required={false}>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const fieldset = screen.getByRole("group");
      expect(fieldset).not.toHaveAttribute("aria-required", "true");
    });

    it("applies disabled attribute to fieldset", () => {
      renderWithTheme(
        <FormGroup disabled>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const fieldset = screen.getByRole("group");
      expect(fieldset).toBeDisabled();
    });

    it("legend is accessible to screen readers", () => {
      renderWithTheme(
        <FormGroup legend="Accessible Legend">
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const legend = screen.getByText("Accessible Legend");
      expect(legend.tagName).toBe("LEGEND");
      // Legend should be child of fieldset
      const fieldset = screen.getByRole("group");
      expect(fieldset.contains(legend)).toBe(true);
    });

    it("description has aria-describedby pointing to itself", () => {
      renderWithTheme(
        <FormGroup description={<Text size="sm">Test description</Text>}>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const description = screen.getByText("Test description");
      const descriptionId = description.getAttribute("id");
      expect(description).toHaveAttribute("aria-describedby", descriptionId);
    });

    it("error has aria-describedby pointing to itself", () => {
      renderWithTheme(
        <FormGroup error={<Text size="sm">Test error</Text>}>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const error = screen.getByText("Test error");
      const errorId = error.getAttribute("id");
      expect(error).toHaveAttribute("aria-describedby", errorId);
    });
  });

  describe("Layout", () => {
    it("does not wrap children in Stack", () => {
      renderWithTheme(
        <FormGroup>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </FormGroup>,
      );
      const fieldset = screen.getByRole("group");
      const child1 = screen.getByTestId("child-1");
      const child2 = screen.getByTestId("child-2");
      // Children should be direct children of fieldset
      expect(fieldset.contains(child1)).toBe(true);
      expect(fieldset.contains(child2)).toBe(true);
      // No Stack wrapper around children - check for flex-col direct children of fieldset
      const fieldsetChildren = Array.from(fieldset.children);
      const stackElements = fieldsetChildren.filter((child) =>
        child.className.includes("flex-col"),
      );
      expect(stackElements.length).toBe(0);
    });

    it("uses Stack only for description and error", () => {
      const { container } = renderWithTheme(
        <FormGroup
          description={<Text size="sm">Description</Text>}
          error={<Text size="sm">Error</Text>}
        >
          <Input placeholder="Test" />
        </FormGroup>,
      );
      const fieldset = screen.getByRole("group");
      // Description and error should be inside Stack
      const description = screen.getByText("Description");
      const error = screen.getByText("Error");
      // Both should be wrapped in the same Stack container
      const stackParent = description.parentElement;
      expect(stackParent).toBe(error.parentElement);
      // Stack should be a direct child of fieldset
      expect(fieldset.contains(stackParent)).toBe(true);
      // Stack should have flex-col class
      expect(stackParent?.className).toContain("flex-col");
    });

    it("maintains layout transparency for user-provided children", () => {
      const { container } = renderWithTheme(
        <FormGroup>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <Input placeholder="Grid 1" />
            <Input placeholder="Grid 2" />
          </div>
        </FormGroup>,
      );
      const fieldset = screen.getByRole("group");
      const gridContainer = fieldset.querySelector('[style*="grid"]');
      expect(gridContainer).toBeInTheDocument();
      // Grid layout should be preserved
      expect(gridContainer).toHaveStyle({ display: "grid" });
    });
  });

  describe("Edge Cases", () => {
    it("works without legend", () => {
      renderWithTheme(
        <FormGroup>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const fieldset = screen.getByRole("group");
      expect(fieldset).toBeInTheDocument();
      const legend = fieldset.querySelector("legend");
      expect(legend).not.toBeInTheDocument();
    });

    it("works without description and error", () => {
      const { container } = renderWithTheme(
        <FormGroup>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const fieldset = screen.getByRole("group");
      expect(fieldset).toBeInTheDocument();
      // No Stack should be rendered - check for flex-col direct children of fieldset
      const fieldsetChildren = Array.from(fieldset.children);
      const stackElements = fieldsetChildren.filter((child) =>
        child.className.includes("flex-col"),
      );
      expect(stackElements.length).toBe(0);
    });

    it("works with only description", () => {
      renderWithTheme(
        <FormGroup description={<Text size="sm">Only description</Text>}>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      expect(screen.getByText("Only description")).toBeInTheDocument();
      const fieldset = screen.getByRole("group");
      expect(fieldset).toBeInTheDocument();
    });

    it("works with only error", () => {
      renderWithTheme(
        <FormGroup error={<Text size="sm">Only error</Text>}>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      expect(screen.getByText("Only error")).toBeInTheDocument();
      const fieldset = screen.getByRole("group");
      expect(fieldset).toBeInTheDocument();
    });

    it("handles ReactNode legend", () => {
      renderWithTheme(
        <FormGroup legend={<span>ReactNode Legend</span>}>
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const legend = screen.getByText("ReactNode Legend");
      expect(legend).toBeInTheDocument();
      expect(legend.tagName).toBe("SPAN");
    });

    it("handles empty children", () => {
      renderWithTheme(<FormGroup>{null}</FormGroup>);
      const fieldset = screen.getByRole("group");
      expect(fieldset).toBeInTheDocument();
    });

    it("forwards native fieldset HTML attributes", () => {
      renderWithTheme(
        <FormGroup name="test-group" form="test-form">
          <Input placeholder="Test input" />
        </FormGroup>,
      );
      const fieldset = screen.getByRole("group");
      expect(fieldset).toHaveAttribute("name", "test-group");
      expect(fieldset).toHaveAttribute("form", "test-form");
    });
  });
});
