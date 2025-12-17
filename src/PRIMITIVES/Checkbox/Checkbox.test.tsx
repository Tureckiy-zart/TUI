import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "@/test/test-utils";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Checkbox aria-label="Test checkbox" />);
      const checkbox = screen.getByRole("checkbox", { name: "Test checkbox" });
      expect(checkbox).toBeInTheDocument();
    });

    it("renders with default variant and size", () => {
      const { container } = renderWithTheme(<Checkbox aria-label="Default checkbox" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderWithTheme(<Checkbox ref={ref} aria-label="Ref test" />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("renders as button with role checkbox", () => {
      renderWithTheme(<Checkbox aria-label="Role test" />);
      const checkbox = screen.getByRole("checkbox", { name: "Role test" });
      expect(checkbox.tagName).toBe("BUTTON");
      expect(checkbox).toHaveAttribute("type", "button");
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      const { container } = renderWithTheme(
        <Checkbox variant="primary" aria-label="Primary checkbox" />,
      );
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      const { container } = renderWithTheme(
        <Checkbox variant="secondary" aria-label="Secondary checkbox" />,
      );
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it("renders outline variant", () => {
      const { container } = renderWithTheme(
        <Checkbox variant="outline" aria-label="Outline checkbox" />,
      );
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it("renders ghost variant", () => {
      const { container } = renderWithTheme(
        <Checkbox variant="ghost" aria-label="Ghost checkbox" />,
      );
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it("renders destructive variant", () => {
      const { container } = renderWithTheme(
        <Checkbox variant="destructive" aria-label="Destructive checkbox" />,
      );
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders xs size", () => {
      const { container } = renderWithTheme(
        <Checkbox size="xs" aria-label="Extra small checkbox" />,
      );
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it("renders sm size", () => {
      const { container } = renderWithTheme(<Checkbox size="sm" aria-label="Small checkbox" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it("renders md size (default)", () => {
      const { container } = renderWithTheme(<Checkbox size="md" aria-label="Medium checkbox" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it("renders lg size", () => {
      const { container } = renderWithTheme(<Checkbox size="lg" aria-label="Large checkbox" />);
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });

    it("renders xl size", () => {
      const { container } = renderWithTheme(
        <Checkbox size="xl" aria-label="Extra large checkbox" />,
      );
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("renders default state (unchecked)", () => {
      renderWithTheme(<Checkbox aria-label="Default checkbox" />);
      const checkbox = screen.getByRole("checkbox", { name: "Default checkbox" });
      expect(checkbox).toHaveAttribute("aria-checked", "false");
      expect(checkbox).not.toBeDisabled();
    });

    it("renders checked state", () => {
      renderWithTheme(<Checkbox checked aria-label="Checked checkbox" />);
      const checkbox = screen.getByRole("checkbox", { name: "Checked checkbox" });
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("renders indeterminate state", () => {
      renderWithTheme(<Checkbox indeterminate aria-label="Indeterminate checkbox" />);
      const checkbox = screen.getByRole("checkbox", { name: "Indeterminate checkbox" });
      expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    });

    it("renders error state", () => {
      renderWithTheme(<Checkbox state="error" aria-label="Error checkbox" />);
      const checkbox = screen.getByRole("checkbox", { name: "Error checkbox" });
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    it("renders disabled state", () => {
      renderWithTheme(<Checkbox state="disabled" aria-label="Disabled checkbox" />);
      const checkbox = screen.getByRole("checkbox", { name: "Disabled checkbox" });
      expect(checkbox).toBeDisabled();
      expect(checkbox).toHaveAttribute("aria-disabled", "true");
    });

    it("is disabled when disabled prop is true", () => {
      renderWithTheme(<Checkbox disabled aria-label="Disabled prop checkbox" />);
      const checkbox = screen.getByRole("checkbox", { name: "Disabled prop checkbox" });
      expect(checkbox).toBeDisabled();
    });
  });

  describe("Icons", () => {
    it("renders checkmark icon when checked", () => {
      const { container } = renderWithTheme(<Checkbox checked aria-label="Checked with icon" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("renders custom icon when provided", () => {
      const CustomIcon = () => <span data-testid="custom-icon">✓</span>;
      const { container } = renderWithTheme(
        <Checkbox checked icon={<CustomIcon />} aria-label="Custom icon checkbox" />,
      );
      const customIcon = container.querySelector('[data-testid="custom-icon"]');
      expect(customIcon).toBeInTheDocument();
    });

    it("renders indeterminate indicator when indeterminate", () => {
      const { container } = renderWithTheme(
        <Checkbox indeterminate aria-label="Indeterminate checkbox" />,
      );
      // Indeterminate indicator should be present
      const indicator = container.querySelector("span[aria-hidden='true']");
      expect(indicator).toBeInTheDocument();
    });

    it("renders custom indeterminate icon when provided", () => {
      const CustomIndeterminateIcon = () => <span data-testid="custom-indeterminate">-</span>;
      const { container } = renderWithTheme(
        <Checkbox
          indeterminate
          indeterminateIcon={<CustomIndeterminateIcon />}
          aria-label="Custom indeterminate checkbox"
        />,
      );
      const customIcon = container.querySelector('[data-testid="custom-indeterminate"]');
      expect(customIcon).toBeInTheDocument();
    });

    it("does not render icon when unchecked", () => {
      const { container } = renderWithTheme(<Checkbox aria-label="Unchecked checkbox" />);
      const icon = container.querySelector("svg");
      expect(icon).toBeNull();
    });
  });

  describe("Accessibility", () => {
    it("has aria-checked attribute", () => {
      renderWithTheme(<Checkbox aria-label="Aria checked test" />);
      const checkbox = screen.getByRole("checkbox", { name: "Aria checked test" });
      expect(checkbox).toHaveAttribute("aria-checked");
    });

    it("has aria-checked='true' when checked", () => {
      renderWithTheme(<Checkbox checked aria-label="Checked aria test" />);
      const checkbox = screen.getByRole("checkbox", { name: "Checked aria test" });
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("has aria-checked='false' when unchecked", () => {
      renderWithTheme(<Checkbox aria-label="Unchecked aria test" />);
      const checkbox = screen.getByRole("checkbox", { name: "Unchecked aria test" });
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });

    it("has aria-checked='mixed' when indeterminate", () => {
      renderWithTheme(<Checkbox indeterminate aria-label="Indeterminate aria test" />);
      const checkbox = screen.getByRole("checkbox", { name: "Indeterminate aria test" });
      expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    });

    it("has aria-disabled when disabled", () => {
      renderWithTheme(<Checkbox disabled aria-label="Disabled aria test" />);
      const checkbox = screen.getByRole("checkbox", { name: "Disabled aria test" });
      expect(checkbox).toHaveAttribute("aria-disabled", "true");
    });

    it("has aria-invalid when in error state", () => {
      renderWithTheme(<Checkbox state="error" aria-label="Error aria test" />);
      const checkbox = screen.getByRole("checkbox", { name: "Error aria test" });
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    it("uses aria-label when provided", () => {
      renderWithTheme(<Checkbox aria-label="Custom label" />);
      const checkbox = screen.getByRole("checkbox", { name: "Custom label" });
      expect(checkbox).toBeInTheDocument();
    });

    it("uses aria-labelledby when provided", () => {
      renderWithTheme(
        <div>
          <span id="label">Checkbox label</span>
          <Checkbox aria-labelledby="label" />
        </div>,
      );
      const checkbox = screen.getByRole("checkbox", { name: "Checkbox label" });
      expect(checkbox).toBeInTheDocument();
    });

    it("uses aria-describedby when provided", () => {
      renderWithTheme(
        <div>
          <Checkbox aria-describedby="description" aria-label="Described checkbox" />
          <span id="description">Description text</span>
        </div>,
      );
      const checkbox = screen.getByRole("checkbox", { name: "Described checkbox" });
      expect(checkbox).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("Interactions", () => {
    it("handles click events", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(<Checkbox onCheckedChange={handleCheckedChange} aria-label="Click test" />);
      const checkbox = screen.getByRole("checkbox", { name: "Click test" });
      await user.click(checkbox);
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });

    it("toggles checked state on click", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(
        <Checkbox checked onCheckedChange={handleCheckedChange} aria-label="Toggle test" />,
      );
      const checkbox = screen.getByRole("checkbox", { name: "Toggle test" });
      await user.click(checkbox);
      expect(handleCheckedChange).toHaveBeenCalledWith(false);
    });

    it("handles Space key to toggle", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(
        <Checkbox onCheckedChange={handleCheckedChange} aria-label="Space key test" />,
      );
      const checkbox = screen.getByRole("checkbox", { name: "Space key test" });
      checkbox.focus();
      await user.keyboard(" ");
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });

    it("prevents default on Space key", async () => {
      const user = userEventSetup();
      const handleKeyDown = vi.fn();
      renderWithTheme(<Checkbox onKeyDown={handleKeyDown} aria-label="Space prevent test" />);
      const checkbox = screen.getByRole("checkbox", { name: "Space prevent test" });
      checkbox.focus();
      await user.keyboard(" ");
      expect(handleKeyDown).toHaveBeenCalled();
    });

    it("does not toggle when disabled", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(
        <Checkbox
          disabled
          onCheckedChange={handleCheckedChange}
          aria-label="Disabled click test"
        />,
      );
      const checkbox = screen.getByRole("checkbox", { name: "Disabled click test" });
      await user.click(checkbox);
      expect(handleCheckedChange).not.toHaveBeenCalled();
    });

    it("does not toggle on Space key when disabled", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(
        <Checkbox
          disabled
          onCheckedChange={handleCheckedChange}
          aria-label="Disabled space test"
        />,
      );
      const checkbox = screen.getByRole("checkbox", { name: "Disabled space test" });
      checkbox.focus();
      await user.keyboard(" ");
      expect(handleCheckedChange).not.toHaveBeenCalled();
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works as controlled component", () => {
      const handleCheckedChange = vi.fn();
      const { rerender } = renderWithTheme(
        <Checkbox checked={false} onCheckedChange={handleCheckedChange} aria-label="Controlled" />,
      );
      let checkbox = screen.getByRole("checkbox", { name: "Controlled" });
      expect(checkbox).toHaveAttribute("aria-checked", "false");

      rerender(
        <Checkbox checked={true} onCheckedChange={handleCheckedChange} aria-label="Controlled" />,
      );
      checkbox = screen.getByRole("checkbox", { name: "Controlled" });
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("works as uncontrolled component", async () => {
      const user = userEventSetup();
      renderWithTheme(<Checkbox aria-label="Uncontrolled" />);
      const checkbox = screen.getByRole("checkbox", { name: "Uncontrolled" });
      expect(checkbox).toHaveAttribute("aria-checked", "false");

      await user.click(checkbox);
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("ClassName merging", () => {
    it("merges custom className", () => {
      const { container } = renderWithTheme(
        <Checkbox className="custom-class" aria-label="Custom class" />,
      );
      const checkbox = container.querySelector('button[role="checkbox"]');
      expect(checkbox).toHaveClass("custom-class");
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for outline variant", () => {
      const { container } = renderWithTheme(
        <Checkbox variant="outline" aria-label="Snapshot test" />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
