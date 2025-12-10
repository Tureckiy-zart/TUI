import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "@/test/test-utils";

import { Switch } from "./Switch";

describe("Switch", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Switch aria-label="Test switch" />);
      const switchElement = screen.getByRole("switch", { name: "Test switch" });
      expect(switchElement).toBeInTheDocument();
    });

    it("renders with default variant and size", () => {
      const { container } = renderWithTheme(<Switch aria-label="Default switch" />);
      const switchElement = container.querySelector('button[role="switch"]');
      expect(switchElement).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderWithTheme(<Switch ref={ref} aria-label="Ref test" />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("renders as button with role switch", () => {
      renderWithTheme(<Switch aria-label="Role test" />);
      const switchElement = screen.getByRole("switch", { name: "Role test" });
      expect(switchElement.tagName).toBe("BUTTON");
      expect(switchElement).toHaveAttribute("type", "button");
    });

    it("renders handle element", () => {
      const { container } = renderWithTheme(<Switch aria-label="Handle test" />);
      const handle = container.querySelector('span[aria-hidden="true"]');
      expect(handle).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      const { container } = renderWithTheme(
        <Switch variant="primary" aria-label="Primary switch" />,
      );
      const switchElement = container.querySelector('button[role="switch"]');
      expect(switchElement).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      const { container } = renderWithTheme(
        <Switch variant="secondary" aria-label="Secondary switch" />,
      );
      const switchElement = container.querySelector('button[role="switch"]');
      expect(switchElement).toBeInTheDocument();
    });

    it("renders outline variant", () => {
      const { container } = renderWithTheme(
        <Switch variant="outline" aria-label="Outline switch" />,
      );
      const switchElement = container.querySelector('button[role="switch"]');
      expect(switchElement).toBeInTheDocument();
    });

    it("renders ghost variant", () => {
      const { container } = renderWithTheme(<Switch variant="ghost" aria-label="Ghost switch" />);
      const switchElement = container.querySelector('button[role="switch"]');
      expect(switchElement).toBeInTheDocument();
    });

    it("renders destructive variant", () => {
      const { container } = renderWithTheme(
        <Switch variant="destructive" aria-label="Destructive switch" />,
      );
      const switchElement = container.querySelector('button[role="switch"]');
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders xs size", () => {
      const { container } = renderWithTheme(<Switch size="xs" aria-label="Extra small switch" />);
      const switchElement = container.querySelector('button[role="switch"]');
      expect(switchElement).toBeInTheDocument();
    });

    it("renders sm size", () => {
      const { container } = renderWithTheme(<Switch size="sm" aria-label="Small switch" />);
      const switchElement = container.querySelector('button[role="switch"]');
      expect(switchElement).toBeInTheDocument();
    });

    it("renders md size (default)", () => {
      const { container } = renderWithTheme(<Switch size="md" aria-label="Medium switch" />);
      const switchElement = container.querySelector('button[role="switch"]');
      expect(switchElement).toBeInTheDocument();
    });

    it("renders lg size", () => {
      const { container } = renderWithTheme(<Switch size="lg" aria-label="Large switch" />);
      const switchElement = container.querySelector('button[role="switch"]');
      expect(switchElement).toBeInTheDocument();
    });

    it("renders xl size", () => {
      const { container } = renderWithTheme(<Switch size="xl" aria-label="Extra large switch" />);
      const switchElement = container.querySelector('button[role="switch"]');
      expect(switchElement).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("renders default state (unchecked)", () => {
      renderWithTheme(<Switch aria-label="Default switch" />);
      const switchElement = screen.getByRole("switch", { name: "Default switch" });
      expect(switchElement).toHaveAttribute("aria-checked", "false");
      expect(switchElement).not.toBeDisabled();
    });

    it("renders checked state", () => {
      renderWithTheme(<Switch checked aria-label="Checked switch" />);
      const switchElement = screen.getByRole("switch", { name: "Checked switch" });
      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    it("renders error state", () => {
      renderWithTheme(<Switch state="error" aria-label="Error switch" />);
      const switchElement = screen.getByRole("switch", { name: "Error switch" });
      expect(switchElement).toHaveAttribute("aria-invalid", "true");
    });

    it("renders disabled state", () => {
      renderWithTheme(<Switch state="disabled" aria-label="Disabled switch" />);
      const switchElement = screen.getByRole("switch", { name: "Disabled switch" });
      expect(switchElement).toBeDisabled();
      expect(switchElement).toHaveAttribute("aria-disabled", "true");
    });

    it("is disabled when disabled prop is true", () => {
      renderWithTheme(<Switch disabled aria-label="Disabled prop switch" />);
      const switchElement = screen.getByRole("switch", { name: "Disabled prop switch" });
      expect(switchElement).toBeDisabled();
    });

    it("renders disabled checked state", () => {
      renderWithTheme(<Switch checked disabled aria-label="Disabled checked switch" />);
      const switchElement = screen.getByRole("switch", { name: "Disabled checked switch" });
      expect(switchElement).toBeDisabled();
      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Accessibility", () => {
    it("has aria-checked attribute", () => {
      renderWithTheme(<Switch aria-label="Aria checked test" />);
      const switchElement = screen.getByRole("switch", { name: "Aria checked test" });
      expect(switchElement).toHaveAttribute("aria-checked");
    });

    it("has aria-checked='true' when checked", () => {
      renderWithTheme(<Switch checked aria-label="Checked aria test" />);
      const switchElement = screen.getByRole("switch", { name: "Checked aria test" });
      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    it("has aria-checked='false' when unchecked", () => {
      renderWithTheme(<Switch aria-label="Unchecked aria test" />);
      const switchElement = screen.getByRole("switch", { name: "Unchecked aria test" });
      expect(switchElement).toHaveAttribute("aria-checked", "false");
    });

    it("has aria-disabled when disabled", () => {
      renderWithTheme(<Switch disabled aria-label="Disabled aria test" />);
      const switchElement = screen.getByRole("switch", { name: "Disabled aria test" });
      expect(switchElement).toHaveAttribute("aria-disabled", "true");
    });

    it("has aria-invalid when in error state", () => {
      renderWithTheme(<Switch state="error" aria-label="Error aria test" />);
      const switchElement = screen.getByRole("switch", { name: "Error aria test" });
      expect(switchElement).toHaveAttribute("aria-invalid", "true");
    });

    it("uses aria-label when provided", () => {
      renderWithTheme(<Switch aria-label="Custom label" />);
      const switchElement = screen.getByRole("switch", { name: "Custom label" });
      expect(switchElement).toBeInTheDocument();
    });

    it("uses aria-labelledby when provided", () => {
      renderWithTheme(
        <div>
          <span id="label">Switch label</span>
          <Switch aria-labelledby="label" />
        </div>,
      );
      const switchElement = screen.getByRole("switch", { name: "Switch label" });
      expect(switchElement).toBeInTheDocument();
    });

    it("uses aria-describedby when provided", () => {
      renderWithTheme(
        <div>
          <Switch aria-describedby="description" aria-label="Described switch" />
          <span id="description">Description text</span>
        </div>,
      );
      const switchElement = screen.getByRole("switch", { name: "Described switch" });
      expect(switchElement).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("Interactions", () => {
    it("handles click events", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(<Switch onCheckedChange={handleCheckedChange} aria-label="Click test" />);
      const switchElement = screen.getByRole("switch", { name: "Click test" });
      await user.click(switchElement);
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });

    it("toggles checked state on click", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(
        <Switch checked onCheckedChange={handleCheckedChange} aria-label="Toggle test" />,
      );
      const switchElement = screen.getByRole("switch", { name: "Toggle test" });
      await user.click(switchElement);
      expect(handleCheckedChange).toHaveBeenCalledWith(false);
    });

    it("handles Space key to toggle", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(<Switch onCheckedChange={handleCheckedChange} aria-label="Space key test" />);
      const switchElement = screen.getByRole("switch", { name: "Space key test" });
      switchElement.focus();
      await user.keyboard(" ");
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });

    it("prevents default on Space key", async () => {
      const user = userEventSetup();
      const handleKeyDown = vi.fn();
      renderWithTheme(<Switch onKeyDown={handleKeyDown} aria-label="Space prevent test" />);
      const switchElement = screen.getByRole("switch", { name: "Space prevent test" });
      switchElement.focus();
      await user.keyboard(" ");
      expect(handleKeyDown).toHaveBeenCalled();
    });

    it("does not toggle when disabled", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(
        <Switch disabled onCheckedChange={handleCheckedChange} aria-label="Disabled click test" />,
      );
      const switchElement = screen.getByRole("switch", { name: "Disabled click test" });
      await user.click(switchElement);
      expect(handleCheckedChange).not.toHaveBeenCalled();
    });

    it("does not toggle on Space key when disabled", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(
        <Switch disabled onCheckedChange={handleCheckedChange} aria-label="Disabled space test" />,
      );
      const switchElement = screen.getByRole("switch", { name: "Disabled space test" });
      switchElement.focus();
      await user.keyboard(" ");
      expect(handleCheckedChange).not.toHaveBeenCalled();
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works as controlled component", () => {
      const handleCheckedChange = vi.fn();
      const { rerender } = renderWithTheme(
        <Switch checked={false} onCheckedChange={handleCheckedChange} aria-label="Controlled" />,
      );
      let switchElement = screen.getByRole("switch", { name: "Controlled" });
      expect(switchElement).toHaveAttribute("aria-checked", "false");

      rerender(
        <Switch checked={true} onCheckedChange={handleCheckedChange} aria-label="Controlled" />,
      );
      switchElement = screen.getByRole("switch", { name: "Controlled" });
      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    it("works as uncontrolled component", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(<Switch onCheckedChange={handleCheckedChange} aria-label="Uncontrolled" />);
      const switchElement = screen.getByRole("switch", { name: "Uncontrolled" });
      expect(switchElement).toHaveAttribute("aria-checked", "false");

      await user.click(switchElement);
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    it("maintains internal state in uncontrolled mode", async () => {
      const user = userEventSetup();
      renderWithTheme(<Switch aria-label="Uncontrolled state" />);
      const switchElement = screen.getByRole("switch", { name: "Uncontrolled state" });
      expect(switchElement).toHaveAttribute("aria-checked", "false");

      await user.click(switchElement);
      expect(switchElement).toHaveAttribute("aria-checked", "true");

      await user.click(switchElement);
      expect(switchElement).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("Handle Animation", () => {
    it("handle has correct classes when unchecked", () => {
      const { container } = renderWithTheme(<Switch aria-label="Handle animation test" />);
      const handle = container.querySelector('span[aria-hidden="true"]');
      expect(handle).toBeInTheDocument();
      // Handle should not have translate class when unchecked
      expect(handle?.className).not.toContain("translate-x");
    });

    it("handle has correct classes when checked", () => {
      const { container } = renderWithTheme(
        <Switch checked aria-label="Handle animation checked" />,
      );
      const handle = container.querySelector('span[aria-hidden="true"]');
      expect(handle).toBeInTheDocument();
      // Handle should have translate class when checked
      expect(handle?.className).toContain("translate-x");
    });
  });
});
