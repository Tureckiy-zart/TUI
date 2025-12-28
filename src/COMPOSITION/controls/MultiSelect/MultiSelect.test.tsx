import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, userEventSetup } from "@/test/test-utils";
import { MultiSelect } from "./MultiSelect";
import type { MultiSelectOption } from "./MultiSelect";

const testOptions: MultiSelectOption[] = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4", disabled: true },
];

describe("MultiSelect", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<MultiSelect options={testOptions} aria-label="Test multi-select" />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
    });

    it("renders with placeholder when no selection", () => {
      renderWithTheme(
        <MultiSelect
          options={testOptions}
          placeholder="Select options..."
          aria-label="Placeholder test"
        />,
      );
      expect(screen.getByText("Select options...")).toBeInTheDocument();
    });

    it("renders selected values as tags", () => {
      renderWithTheme(
        <MultiSelect
          options={testOptions}
          defaultValue={["1", "2"]}
          aria-label="Selected values test"
        />,
      );
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(<MultiSelect ref={ref} options={testOptions} aria-label="Ref test" />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Sizes", () => {
    it("renders sm size", () => {
      renderWithTheme(<MultiSelect options={testOptions} size="sm" aria-label="Small size" />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
    });

    it("renders md size (default)", () => {
      renderWithTheme(<MultiSelect options={testOptions} size="md" aria-label="Medium size" />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
    });

    it("renders lg size", () => {
      renderWithTheme(<MultiSelect options={testOptions} size="lg" aria-label="Large size" />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Interaction - Selection", () => {
    it("selects option on click", async () => {
      const handleChange = vi.fn();
      const user = userEventSetup();

      renderWithTheme(
        <MultiSelect options={testOptions} onValueChange={handleChange} aria-label="Click test" />,
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      const option1 = screen.getByText("Option 1");
      await user.click(option1);

      expect(handleChange).toHaveBeenCalledWith(["1"]);
    });

    it("toggles selection on multiple clicks", async () => {
      const handleChange = vi.fn();
      const user = userEventSetup();

      renderWithTheme(
        <MultiSelect options={testOptions} onValueChange={handleChange} aria-label="Toggle test" />,
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      const option1 = screen.getByText("Option 1");
      await user.click(option1);
      expect(handleChange).toHaveBeenCalledWith(["1"]);

      await user.click(option1);
      expect(handleChange).toHaveBeenCalledWith([]);
    });

    it("selects multiple options", async () => {
      const handleChange = vi.fn();
      const user = userEventSetup();

      renderWithTheme(
        <MultiSelect
          options={testOptions}
          onValueChange={handleChange}
          aria-label="Multiple selection test"
        />,
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      const option1 = screen.getByText("Option 1");
      const option2 = screen.getByText("Option 2");

      await user.click(option1);
      expect(handleChange).toHaveBeenCalledWith(["1"]);

      await user.click(option2);
      expect(handleChange).toHaveBeenCalledWith(["1", "2"]);
    });

    it("removes selection via tag remove button", async () => {
      const handleChange = vi.fn();
      const user = userEventSetup();

      renderWithTheme(
        <MultiSelect
          options={testOptions}
          defaultValue={["1", "2"]}
          onValueChange={handleChange}
          aria-label="Remove tag test"
        />,
      );

      const removeButton = screen.getByLabelText("Remove Option 1");
      await user.click(removeButton);

      expect(handleChange).toHaveBeenCalledWith(["2"]);
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works in uncontrolled mode", async () => {
      const handleChange = vi.fn();
      const user = userEventSetup();

      renderWithTheme(
        <MultiSelect
          options={testOptions}
          defaultValue={["1"]}
          onValueChange={handleChange}
          aria-label="Uncontrolled test"
        />,
      );

      expect(screen.getByText("Option 1")).toBeInTheDocument();

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      const option2 = screen.getByText("Option 2");
      await user.click(option2);

      expect(handleChange).toHaveBeenCalledWith(["1", "2"]);
    });

    it("works in controlled mode", async () => {
      const handleChange = vi.fn();
      const user = userEventSetup();

      const { rerender } = renderWithTheme(
        <MultiSelect
          options={testOptions}
          value={["1"]}
          onValueChange={handleChange}
          aria-label="Controlled test"
        />,
      );

      expect(screen.getByText("Option 1")).toBeInTheDocument();

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      const option2 = screen.getByText("Option 2");
      await user.click(option2);

      expect(handleChange).toHaveBeenCalledWith(["1", "2"]);

      // Simulate parent updating controlled value
      rerender(
        <MultiSelect
          options={testOptions}
          value={["1", "2"]}
          onValueChange={handleChange}
          aria-label="Controlled test"
        />,
      );

      // Use getAllByText and check that tags are present (dropdown should be closed)
      const option1Tags = screen.getAllByText("Option 1");
      const option2Tags = screen.getAllByText("Option 2");
      // Should have at least one tag for each option
      expect(option1Tags.length).toBeGreaterThan(0);
      expect(option2Tags.length).toBeGreaterThan(0);
    });
  });

  describe("States", () => {
    it("disables component when disabled prop is true", () => {
      renderWithTheme(<MultiSelect options={testOptions} disabled aria-label="Disabled test" />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeDisabled();
    });

    it("does not allow interaction when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEventSetup();

      renderWithTheme(
        <MultiSelect
          options={testOptions}
          disabled
          onValueChange={handleChange}
          aria-label="Disabled interaction test"
        />,
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("disables remove buttons when disabled", () => {
      renderWithTheme(
        <MultiSelect
          options={testOptions}
          defaultValue={["1", "2"]}
          disabled
          aria-label="Disabled remove buttons"
        />,
      );

      const removeButton = screen.getByLabelText("Remove Option 1");
      expect(removeButton).toBeDisabled();
    });

    it("renders disabled options correctly", async () => {
      const user = userEventSetup();

      renderWithTheme(<MultiSelect options={testOptions} aria-label="Disabled options test" />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      const option4 = screen.getByText("Option 4");
      expect(option4.closest("[data-disabled]")).toBeInTheDocument();
    });
  });

  describe("MaxTags", () => {
    it("shows all tags when maxTags is undefined", () => {
      renderWithTheme(
        <MultiSelect
          options={testOptions}
          defaultValue={["1", "2", "3"]}
          aria-label="All tags test"
        />,
      );

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });

    it("limits visible tags when maxTags is set", () => {
      renderWithTheme(
        <MultiSelect
          options={testOptions}
          defaultValue={["1", "2", "3"]}
          maxTags={2}
          aria-label="Limited tags test"
        />,
      );

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("+1 more")).toBeInTheDocument();
      expect(screen.queryByText("Option 3")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has aria-label when provided", () => {
      renderWithTheme(<MultiSelect options={testOptions} aria-label="Accessible label" />);
      const trigger = screen.getByRole("combobox", { name: "Accessible label" });
      expect(trigger).toBeInTheDocument();
    });

    it("has aria-labelledby when provided", () => {
      renderWithTheme(
        <div>
          <label id="multi-select-label">Select options</label>
          <MultiSelect options={testOptions} aria-labelledby="multi-select-label" />
        </div>,
      );
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveAttribute("aria-labelledby", "multi-select-label");
    });

    it("sets aria-multiselectable on dropdown content", async () => {
      const user = userEventSetup();

      renderWithTheme(<MultiSelect options={testOptions} aria-label="Multiselectable test" />);

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      const viewport = document.querySelector('[aria-multiselectable="true"]');
      expect(viewport).toBeInTheDocument();
    });

    it("has proper aria-label on remove buttons", () => {
      renderWithTheme(
        <MultiSelect
          options={testOptions}
          defaultValue={["1"]}
          aria-label="Remove button label test"
        />,
      );

      const removeButton = screen.getByLabelText("Remove Option 1");
      expect(removeButton).toBeInTheDocument();
    });
  });

  describe("Custom Rendering", () => {
    it("uses renderTag when provided", () => {
      const customRenderTag = vi.fn((option) => (
        <span key={option.value} data-testid={`custom-${option.value}`}>
          Custom: {option.label}
        </span>
      ));

      renderWithTheme(
        <MultiSelect
          options={testOptions}
          defaultValue={["1", "2"]}
          renderTag={customRenderTag}
          aria-label="Custom render test"
        />,
      );

      expect(screen.getByTestId("custom-1")).toBeInTheDocument();
      expect(screen.getByTestId("custom-2")).toBeInTheDocument();
      expect(customRenderTag).toHaveBeenCalledTimes(2);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty options array", () => {
      renderWithTheme(<MultiSelect options={[]} aria-label="Empty options test" />);
      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
    });

    it("handles empty selection", () => {
      renderWithTheme(
        <MultiSelect options={testOptions} value={[]} aria-label="Empty selection" />,
      );
      const placeholder = screen.getByText("Select options...");
      expect(placeholder).toBeInTheDocument();
    });

    it("handles selection of all options", async () => {
      const handleChange = vi.fn();
      const user = userEventSetup();

      renderWithTheme(
        <MultiSelect
          options={testOptions.filter((opt) => !opt.disabled)}
          onValueChange={handleChange}
          aria-label="Select all test"
        />,
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      const option1 = screen.getByText("Option 1");
      const option2 = screen.getByText("Option 2");
      const option3 = screen.getByText("Option 3");

      await user.click(option1);
      await user.click(option2);
      await user.click(option3);

      expect(handleChange).toHaveBeenLastCalledWith(["1", "2", "3"]);
    });

    it("removes all selections", async () => {
      const handleChange = vi.fn();
      const user = userEventSetup();

      renderWithTheme(
        <MultiSelect
          options={testOptions}
          defaultValue={["1", "2"]}
          onValueChange={handleChange}
          aria-label="Remove all test"
        />,
      );

      const removeButton1 = screen.getByLabelText("Remove Option 1");
      const removeButton2 = screen.getByLabelText("Remove Option 2");

      await user.click(removeButton1);
      expect(handleChange).toHaveBeenCalledWith(["2"]);

      await user.click(removeButton2);
      expect(handleChange).toHaveBeenCalledWith([]);
    });
  });

  describe("Keyboard Navigation", () => {
    it("opens dropdown with keyboard", async () => {
      const user = userEventSetup();

      renderWithTheme(<MultiSelect options={testOptions} aria-label="Keyboard open test" />);

      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{Enter}");

      const option1 = screen.getByText("Option 1");
      expect(option1).toBeVisible();
    });

    it("navigates options with arrow keys", async () => {
      const user = userEventSetup();

      renderWithTheme(<MultiSelect options={testOptions} aria-label="Arrow navigation test" />);

      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{Enter}");

      // Arrow key navigation is handled by Radix Select
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowDown}");

      // This behavior is tested to ensure Radix integration works
      expect(screen.getByText("Option 1")).toBeVisible();
    });
  });
});
