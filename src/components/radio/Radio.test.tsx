import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "@/test/test-utils";

import { Radio, RadioGroup } from "./index";

describe("Radio", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Radio aria-label="Test radio" />);
      const radio = screen.getByRole("radio", { name: "Test radio" });
      expect(radio).toBeInTheDocument();
    });

    it("renders with default variant and size", () => {
      const { container } = renderWithTheme(<Radio aria-label="Default radio" />);
      const radio = container.querySelector('button[role="radio"]');
      expect(radio).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderWithTheme(<Radio ref={ref} aria-label="Ref test" />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("renders as button with role radio", () => {
      renderWithTheme(<Radio aria-label="Role test" />);
      const radio = screen.getByRole("radio", { name: "Role test" });
      expect(radio.tagName).toBe("BUTTON");
      expect(radio).toHaveAttribute("type", "button");
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      const { container } = renderWithTheme(<Radio variant="primary" aria-label="Primary radio" />);
      const radio = container.querySelector('button[role="radio"]');
      expect(radio).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      const { container } = renderWithTheme(
        <Radio variant="secondary" aria-label="Secondary radio" />,
      );
      const radio = container.querySelector('button[role="radio"]');
      expect(radio).toBeInTheDocument();
    });

    it("renders outline variant", () => {
      const { container } = renderWithTheme(<Radio variant="outline" aria-label="Outline radio" />);
      const radio = container.querySelector('button[role="radio"]');
      expect(radio).toBeInTheDocument();
    });

    it("renders ghost variant", () => {
      const { container } = renderWithTheme(<Radio variant="ghost" aria-label="Ghost radio" />);
      const radio = container.querySelector('button[role="radio"]');
      expect(radio).toBeInTheDocument();
    });

    it("renders destructive variant", () => {
      const { container } = renderWithTheme(
        <Radio variant="destructive" aria-label="Destructive radio" />,
      );
      const radio = container.querySelector('button[role="radio"]');
      expect(radio).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders xs size", () => {
      const { container } = renderWithTheme(<Radio size="xs" aria-label="Extra small radio" />);
      const radio = container.querySelector('button[role="radio"]');
      expect(radio).toBeInTheDocument();
    });

    it("renders sm size", () => {
      const { container } = renderWithTheme(<Radio size="sm" aria-label="Small radio" />);
      const radio = container.querySelector('button[role="radio"]');
      expect(radio).toBeInTheDocument();
    });

    it("renders md size (default)", () => {
      const { container } = renderWithTheme(<Radio size="md" aria-label="Medium radio" />);
      const radio = container.querySelector('button[role="radio"]');
      expect(radio).toBeInTheDocument();
    });

    it("renders lg size", () => {
      const { container } = renderWithTheme(<Radio size="lg" aria-label="Large radio" />);
      const radio = container.querySelector('button[role="radio"]');
      expect(radio).toBeInTheDocument();
    });

    it("renders xl size", () => {
      const { container } = renderWithTheme(<Radio size="xl" aria-label="Extra large radio" />);
      const radio = container.querySelector('button[role="radio"]');
      expect(radio).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("renders default state (unchecked)", () => {
      renderWithTheme(<Radio aria-label="Default radio" />);
      const radio = screen.getByRole("radio", { name: "Default radio" });
      expect(radio).toHaveAttribute("aria-checked", "false");
      expect(radio).not.toBeDisabled();
    });

    it("renders checked state", () => {
      renderWithTheme(<Radio checked aria-label="Checked radio" />);
      const radio = screen.getByRole("radio", { name: "Checked radio" });
      expect(radio).toHaveAttribute("aria-checked", "true");
    });

    it("renders error state", () => {
      renderWithTheme(<Radio state="error" aria-label="Error radio" />);
      const radio = screen.getByRole("radio", { name: "Error radio" });
      expect(radio).toHaveAttribute("aria-invalid", "true");
    });

    it("renders disabled state", () => {
      renderWithTheme(<Radio state="disabled" aria-label="Disabled radio" />);
      const radio = screen.getByRole("radio", { name: "Disabled radio" });
      expect(radio).toBeDisabled();
      expect(radio).toHaveAttribute("aria-disabled", "true");
    });

    it("is disabled when disabled prop is true", () => {
      renderWithTheme(<Radio disabled aria-label="Disabled prop radio" />);
      const radio = screen.getByRole("radio", { name: "Disabled prop radio" });
      expect(radio).toBeDisabled();
    });
  });

  describe("Icons", () => {
    it("renders dot when checked", () => {
      const { container } = renderWithTheme(<Radio checked aria-label="Checked with dot" />);
      const dot = container.querySelector('span[aria-hidden="true"]');
      expect(dot).toBeInTheDocument();
    });

    it("renders custom icon when provided", () => {
      const CustomIcon = () => <span data-testid="custom-icon">●</span>;
      const { container } = renderWithTheme(
        <Radio checked icon={<CustomIcon />} aria-label="Custom icon radio" />,
      );
      const customIcon = container.querySelector('[data-testid="custom-icon"]');
      expect(customIcon).toBeInTheDocument();
    });

    it("does not render dot when unchecked", () => {
      const { container } = renderWithTheme(<Radio aria-label="Unchecked radio" />);
      const dot = container.querySelector('span[aria-hidden="true"]');
      // Dot should not exist when unchecked
      expect(dot).toBeNull();
    });
  });

  describe("Accessibility", () => {
    it("has aria-checked attribute", () => {
      renderWithTheme(<Radio aria-label="Aria checked test" />);
      const radio = screen.getByRole("radio", { name: "Aria checked test" });
      expect(radio).toHaveAttribute("aria-checked");
    });

    it("has aria-checked='true' when checked", () => {
      renderWithTheme(<Radio checked aria-label="Checked aria test" />);
      const radio = screen.getByRole("radio", { name: "Checked aria test" });
      expect(radio).toHaveAttribute("aria-checked", "true");
    });

    it("has aria-checked='false' when unchecked", () => {
      renderWithTheme(<Radio aria-label="Unchecked aria test" />);
      const radio = screen.getByRole("radio", { name: "Unchecked aria test" });
      expect(radio).toHaveAttribute("aria-checked", "false");
    });

    it("has aria-disabled when disabled", () => {
      renderWithTheme(<Radio disabled aria-label="Disabled aria test" />);
      const radio = screen.getByRole("radio", { name: "Disabled aria test" });
      expect(radio).toHaveAttribute("aria-disabled", "true");
    });

    it("has aria-invalid when in error state", () => {
      renderWithTheme(<Radio state="error" aria-label="Error aria test" />);
      const radio = screen.getByRole("radio", { name: "Error aria test" });
      expect(radio).toHaveAttribute("aria-invalid", "true");
    });

    it("uses aria-label when provided", () => {
      renderWithTheme(<Radio aria-label="Custom label" />);
      const radio = screen.getByRole("radio", { name: "Custom label" });
      expect(radio).toBeInTheDocument();
    });

    it("uses aria-labelledby when provided", () => {
      renderWithTheme(
        <div>
          <span id="label">Radio label</span>
          <Radio aria-labelledby="label" />
        </div>,
      );
      const radio = screen.getByRole("radio", { name: "Radio label" });
      expect(radio).toBeInTheDocument();
    });

    it("uses aria-describedby when provided", () => {
      renderWithTheme(
        <div>
          <Radio aria-describedby="description" aria-label="Described radio" />
          <span id="description">Description text</span>
        </div>,
      );
      const radio = screen.getByRole("radio", { name: "Described radio" });
      expect(radio).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("Interactions", () => {
    it("handles click events", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(<Radio onCheckedChange={handleCheckedChange} aria-label="Click test" />);
      const radio = screen.getByRole("radio", { name: "Click test" });
      await user.click(radio);
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });

    it("handles Space key to select", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(<Radio onCheckedChange={handleCheckedChange} aria-label="Space key test" />);
      const radio = screen.getByRole("radio", { name: "Space key test" });
      radio.focus();
      await user.keyboard(" ");
      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });

    it("prevents default on Space key", async () => {
      const user = userEventSetup();
      const handleKeyDown = vi.fn();
      renderWithTheme(<Radio onKeyDown={handleKeyDown} aria-label="Space prevent test" />);
      const radio = screen.getByRole("radio", { name: "Space prevent test" });
      radio.focus();
      await user.keyboard(" ");
      expect(handleKeyDown).toHaveBeenCalled();
    });

    it("does not toggle when disabled", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(
        <Radio disabled onCheckedChange={handleCheckedChange} aria-label="Disabled click test" />,
      );
      const radio = screen.getByRole("radio", { name: "Disabled click test" });
      await user.click(radio);
      expect(handleCheckedChange).not.toHaveBeenCalled();
    });

    it("does not toggle on Space key when disabled", async () => {
      const user = userEventSetup();
      const handleCheckedChange = vi.fn();
      renderWithTheme(
        <Radio disabled onCheckedChange={handleCheckedChange} aria-label="Disabled space test" />,
      );
      const radio = screen.getByRole("radio", { name: "Disabled space test" });
      radio.focus();
      await user.keyboard(" ");
      expect(handleCheckedChange).not.toHaveBeenCalled();
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works as controlled component", () => {
      const handleCheckedChange = vi.fn();
      const { rerender } = renderWithTheme(
        <Radio checked={false} onCheckedChange={handleCheckedChange} aria-label="Controlled" />,
      );
      let radio = screen.getByRole("radio", { name: "Controlled" });
      expect(radio).toHaveAttribute("aria-checked", "false");

      rerender(
        <Radio checked={true} onCheckedChange={handleCheckedChange} aria-label="Controlled" />,
      );
      radio = screen.getByRole("radio", { name: "Controlled" });
      expect(radio).toHaveAttribute("aria-checked", "true");
    });

    it("works as uncontrolled component (standalone)", async () => {
      const user = userEventSetup();
      renderWithTheme(<Radio aria-label="Uncontrolled" />);
      const radio = screen.getByRole("radio", { name: "Uncontrolled" });
      expect(radio).toHaveAttribute("aria-checked", "false");

      await user.click(radio);
      expect(radio).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("RadioGroup Integration", () => {
    it("works within RadioGroup", () => {
      renderWithTheme(
        <RadioGroup value="option1">
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
        </RadioGroup>,
      );
      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      expect(radio1).toHaveAttribute("aria-checked", "true");
      expect(radio2).toHaveAttribute("aria-checked", "false");
    });

    it("updates group value when radio is clicked", async () => {
      const user = userEventSetup();
      const handleValueChange = vi.fn();
      renderWithTheme(
        <RadioGroup value="option1" onValueChange={handleValueChange}>
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
        </RadioGroup>,
      );
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      await user.click(radio2);
      expect(handleValueChange).toHaveBeenCalledWith("option2");
    });

    it("has roving tabindex in group (only selected is focusable)", () => {
      renderWithTheme(
        <RadioGroup value="option1">
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
        </RadioGroup>,
      );
      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      expect(radio1).toHaveAttribute("tabIndex", "0");
      expect(radio2).toHaveAttribute("tabIndex", "-1");
    });

    it("navigates with ArrowDown in vertical group", async () => {
      const user = userEventSetup();
      const handleValueChange = vi.fn();
      renderWithTheme(
        <RadioGroup value="option1" onValueChange={handleValueChange} orientation="vertical">
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
          <Radio value="option3" aria-label="Option 3" />
        </RadioGroup>,
      );
      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      radio1.focus();
      await user.keyboard("{ArrowDown}");
      expect(handleValueChange).toHaveBeenCalledWith("option2");
    });

    it("navigates with ArrowUp in vertical group", async () => {
      const user = userEventSetup();
      const handleValueChange = vi.fn();
      renderWithTheme(
        <RadioGroup value="option2" onValueChange={handleValueChange} orientation="vertical">
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
          <Radio value="option3" aria-label="Option 3" />
        </RadioGroup>,
      );
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      radio2.focus();
      await user.keyboard("{ArrowUp}");
      expect(handleValueChange).toHaveBeenCalledWith("option1");
    });

    it("wraps around at end when using ArrowDown", async () => {
      const user = userEventSetup();
      const handleValueChange = vi.fn();
      renderWithTheme(
        <RadioGroup value="option3" onValueChange={handleValueChange} orientation="vertical">
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
          <Radio value="option3" aria-label="Option 3" />
        </RadioGroup>,
      );
      const radio3 = screen.getByRole("radio", { name: "Option 3" });
      radio3.focus();
      await user.keyboard("{ArrowDown}");
      expect(handleValueChange).toHaveBeenCalledWith("option1");
    });

    it("wraps around at start when using ArrowUp", async () => {
      const user = userEventSetup();
      const handleValueChange = vi.fn();
      renderWithTheme(
        <RadioGroup value="option1" onValueChange={handleValueChange} orientation="vertical">
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
          <Radio value="option3" aria-label="Option 3" />
        </RadioGroup>,
      );
      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      radio1.focus();
      await user.keyboard("{ArrowUp}");
      expect(handleValueChange).toHaveBeenCalledWith("option3");
    });

    it("navigates with ArrowLeft/ArrowRight in horizontal group", async () => {
      const user = userEventSetup();
      const handleValueChange = vi.fn();
      renderWithTheme(
        <RadioGroup value="option1" onValueChange={handleValueChange} orientation="horizontal">
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
          <Radio value="option3" aria-label="Option 3" />
        </RadioGroup>,
      );
      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      radio1.focus();
      await user.keyboard("{ArrowRight}");
      expect(handleValueChange).toHaveBeenCalledWith("option2");
    });

    it("supports ArrowUp/ArrowDown in horizontal group", async () => {
      const user = userEventSetup();
      const handleValueChange = vi.fn();
      renderWithTheme(
        <RadioGroup value="option1" onValueChange={handleValueChange} orientation="horizontal">
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
        </RadioGroup>,
      );
      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      radio1.focus();
      await user.keyboard("{ArrowDown}");
      expect(handleValueChange).toHaveBeenCalledWith("option2");
    });
  });

  describe("RadioGroup", () => {
    it("renders RadioGroup with radiogroup role", () => {
      renderWithTheme(
        <RadioGroup>
          <Radio value="option1" aria-label="Option 1" />
        </RadioGroup>,
      );
      const group = screen.getByRole("radiogroup");
      expect(group).toBeInTheDocument();
    });

    it("supports controlled mode", () => {
      const handleValueChange = vi.fn();
      const { rerender } = renderWithTheme(
        <RadioGroup value="option1" onValueChange={handleValueChange}>
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
        </RadioGroup>,
      );
      let radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveAttribute("aria-checked", "true");

      rerender(
        <RadioGroup value="option2" onValueChange={handleValueChange}>
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
        </RadioGroup>,
      );
      radio1 = screen.getByRole("radio", { name: "Option 1" });
      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      expect(radio1).toHaveAttribute("aria-checked", "false");
      expect(radio2).toHaveAttribute("aria-checked", "true");
    });

    it("supports uncontrolled mode", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <RadioGroup defaultValue="option1">
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
        </RadioGroup>,
      );
      const radio1 = screen.getByRole("radio", { name: "Option 1" });
      expect(radio1).toHaveAttribute("aria-checked", "true");

      const radio2 = screen.getByRole("radio", { name: "Option 2" });
      await user.click(radio2);
      expect(radio2).toHaveAttribute("aria-checked", "true");
      expect(radio1).toHaveAttribute("aria-checked", "false");
    });

    it("applies size to all radios in group", () => {
      const { container } = renderWithTheme(
        <RadioGroup size="lg">
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
        </RadioGroup>,
      );
      const radios = container.querySelectorAll('button[role="radio"]');
      expect(radios.length).toBe(2);
    });

    it("supports horizontal orientation", () => {
      const { container } = renderWithTheme(
        <RadioGroup orientation="horizontal">
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
        </RadioGroup>,
      );
      const group = container.firstChild as HTMLElement;
      expect(group).toHaveClass("flex-row");
    });

    it("supports vertical orientation (default)", () => {
      const { container } = renderWithTheme(
        <RadioGroup orientation="vertical">
          <Radio value="option1" aria-label="Option 1" />
          <Radio value="option2" aria-label="Option 2" />
        </RadioGroup>,
      );
      const group = container.firstChild as HTMLElement;
      expect(group).toHaveClass("flex-col");
    });
  });

  describe("ClassName merging", () => {
    it("merges custom className", () => {
      const { container } = renderWithTheme(
        <Radio className="custom-class" aria-label="Custom class" />,
      );
      const radio = container.querySelector('button[role="radio"]');
      expect(radio).toHaveClass("custom-class");
    });
  });
});
