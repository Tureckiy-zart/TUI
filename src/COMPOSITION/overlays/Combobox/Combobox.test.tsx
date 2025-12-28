import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as React from "react";

import { Combobox, ComboboxInput, ComboboxList } from "./Combobox";
import type { ComboboxOption } from "./Combobox";

// Sample test data
const sampleOptions: ComboboxOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
];

describe("Combobox", () => {
  // ============================================================================
  // BEHAVIOR TESTS
  // ============================================================================

  describe("Rendering", () => {
    it("renders with placeholder", () => {
      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("renders all options when opened", async () => {
      const user = userEvent.setup();

      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);

      // Wait for dropdown to open
      await waitFor(() => {
        expect(input).toHaveAttribute("aria-expanded", "true");
      }, { timeout: 2000 });

      // Wait for options to be rendered
      await waitFor(() => {
        expect(screen.getByRole("option", { name: /apple/i })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: /banana/i })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: /cherry/i })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: /date/i })).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe("Single-select", () => {
    it("selects option on click", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Combobox onValueChange={handleChange}>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);

      const option = await screen.findByRole("option", { name: /apple/i });
      await user.click(option);

      expect(handleChange).toHaveBeenCalledWith("apple");
    });

    it("closes dropdown after selection", async () => {
      const user = userEvent.setup();

      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);
      expect(input).toHaveAttribute("aria-expanded", "true");

      const option = await screen.findByRole("option", { name: /apple/i });
      await user.click(option);

      await waitFor(() => {
        expect(input).toHaveAttribute("aria-expanded", "false");
      });
    });
  });

  describe("Multi-select", () => {
    it("selects multiple options", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Combobox multiple onValueChange={handleChange}>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);

      const appleOption = await screen.findByRole("option", { name: /apple/i });
      await user.click(appleOption);
      expect(handleChange).toHaveBeenCalledWith(["apple"]);

      const bananaOption = await screen.findByRole("option", { name: /banana/i });
      await user.click(bananaOption);
      expect(handleChange).toHaveBeenCalledWith(["apple", "banana"]);
    });

    it("removes option when clicked again", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Combobox multiple defaultValue={["apple"]} onValueChange={handleChange}>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);

      const appleOption = await screen.findByRole("option", { name: /apple/i });
      await user.click(appleOption);

      expect(handleChange).toHaveBeenCalledWith([]);
    });
  });

  describe("Client-side filtering", () => {
    it("filters options based on input", async () => {
      const user = userEvent.setup();

      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} filterable={true} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.type(input, "app");

      await waitFor(() => {
        expect(screen.getByRole("option", { name: /apple/i })).toBeInTheDocument();
        expect(screen.queryByRole("option", { name: /banana/i })).not.toBeInTheDocument();
      });
    });

    it("shows empty message when no matches", async () => {
      const user = userEvent.setup();

      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} emptyMessage="No results" />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.type(input, "xyz");

      await waitFor(() => {
        expect(screen.getByText("No results")).toBeInTheDocument();
      });
    });
  });

  describe("Server-side filtering", () => {
    it("calls onSearch callback", async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();

      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} onSearch={handleSearch} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.type(input, "test");

      expect(handleSearch).toHaveBeenCalledWith("test");
    });
  });

  describe("Controlled/Uncontrolled modes", () => {
    it("works in controlled mode", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { rerender } = render(
        <Combobox value="apple" onValueChange={handleChange}>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);

      const bananaOption = await screen.findByRole("option", { name: /banana/i });
      await user.click(bananaOption);

      expect(handleChange).toHaveBeenCalledWith("banana");

      // Value should not change until parent updates prop
      rerender(
        <Combobox value="apple" onValueChange={handleChange}>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );
    });

    it("works in uncontrolled mode", async () => {
      const user = userEvent.setup();

      render(
        <Combobox defaultValue="apple">
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      expect(input).toHaveValue("Apple");
    });
  });

  // ============================================================================
  // A11Y TESTS
  // ============================================================================

  describe("Accessibility", () => {
    it("has combobox role", () => {
      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("has accessible name via aria-label", () => {
      render(
        <Combobox>
          <Combobox.Input placeholder="Search..." aria-label="Search fruits" />
          <Combobox.List options={sampleOptions} />
        </Combobox>,
      );

      expect(screen.getByRole("combobox")).toHaveAccessibleName("Search fruits");
    });

    it("has aria-expanded attribute", async () => {
      const user = userEvent.setup();

      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("aria-expanded", "false");

      await user.click(input);
      expect(input).toHaveAttribute("aria-expanded", "true");
    });

    it("has aria-autocomplete attribute", () => {
      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      expect(screen.getByRole("combobox")).toHaveAttribute("aria-autocomplete", "list");
    });

    it("has aria-controls attribute", () => {
      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      expect(screen.getByRole("combobox")).toHaveAttribute("aria-controls", "combobox-list");
    });

    it("sets aria-invalid when invalid", () => {
      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" aria-invalid={true} />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
    });
  });

  // ============================================================================
  // KEYBOARD NAVIGATION TESTS
  // ============================================================================

  describe("Keyboard navigation", () => {
    it("opens dropdown on Arrow Down", async () => {
      const user = userEvent.setup();

      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      expect(input).toHaveAttribute("aria-expanded", "false");

      await user.type(input, "{ArrowDown}");
      expect(input).toHaveAttribute("aria-expanded", "true");
    });

    it("navigates options with Arrow Down/Up", async () => {
      const user = userEvent.setup();

      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);

      // Wait for dropdown to open and options to be available
      await waitFor(() => {
        expect(input).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("option", { name: /apple/i })).toBeInTheDocument();
      });

      // Wait a bit for filteredOptions to be ready
      await waitFor(() => {
        expect(screen.getByRole("option", { name: /apple/i })).toBeInTheDocument();
      }, { timeout: 1000 });

      await user.keyboard("{ArrowDown}");
      await waitFor(() => {
        expect(input).toHaveAttribute("aria-activedescendant", "combobox-option-0");
      }, { timeout: 2000 });

      await user.keyboard("{ArrowDown}");
      await waitFor(() => {
        expect(input).toHaveAttribute("aria-activedescendant", "combobox-option-1");
      }, { timeout: 2000 });

      await user.keyboard("{ArrowUp}");
      await waitFor(() => {
        expect(input).toHaveAttribute("aria-activedescendant", "combobox-option-0");
      }, { timeout: 2000 });
    });

    it("selects option with Enter", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Combobox onValueChange={handleChange}>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);

      // Wait for dropdown to open and options to be available
      await waitFor(() => {
        expect(input).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByRole("option", { name: /apple/i })).toBeInTheDocument();
      });

      // Wait a bit for filteredOptions to be ready
      await waitFor(() => {
        expect(screen.getByRole("option", { name: /apple/i })).toBeInTheDocument();
      }, { timeout: 1000 });

      await user.keyboard("{ArrowDown}");
      await waitFor(() => {
        expect(input).toHaveAttribute("aria-activedescendant", "combobox-option-0");
      }, { timeout: 2000 });

      await user.keyboard("{Enter}");
      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith("apple");
      }, { timeout: 2000 });
    });

    it("closes dropdown on Escape", async () => {
      const user = userEvent.setup();

      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);
      expect(input).toHaveAttribute("aria-expanded", "true");

      await user.type(input, "{Escape}");
      expect(input).toHaveAttribute("aria-expanded", "false");
    });
  });

  // ============================================================================
  // INPUT TESTS
  // ============================================================================

  describe("Input interactions", () => {
    it("blocks all interactions when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Combobox onValueChange={handleChange}>
          <ComboboxInput placeholder="Search..." aria-label="Search" disabled />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      expect(input).toBeDisabled();

      await user.click(input);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("supports loading state", async () => {
      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} loading={true} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await userEvent.click(input);

      await waitFor(() => {
        expect(screen.getByText("Loading...")).toBeInTheDocument();
      });
    });
  });

  // ============================================================================
  // SIZE VARIANT TESTS
  // ============================================================================

  describe("Size variants", () => {
    it("renders small size", () => {
      render(
        <Combobox size="sm">
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders medium size (default)", () => {
      render(
        <Combobox size="md">
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders large size", () => {
      render(
        <Combobox size="lg">
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={sampleOptions} />
        </Combobox>,
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });

  // ============================================================================
  // DISABLED OPTIONS TESTS
  // ============================================================================

  describe("Disabled options", () => {
    const optionsWithDisabled: ComboboxOption[] = [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana", disabled: true },
      { value: "cherry", label: "Cherry" },
    ];

    it("does not select disabled options", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Combobox onValueChange={handleChange}>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={optionsWithDisabled} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);

      const bananaOption = await screen.findByRole("option", { name: /banana/i });
      await user.click(bananaOption);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("marks disabled options with aria-disabled", async () => {
      const user = userEvent.setup();

      render(
        <Combobox>
          <ComboboxInput placeholder="Search..." aria-label="Search" />
          <ComboboxList options={optionsWithDisabled} />
        </Combobox>,
      );

      const input = screen.getByRole("combobox");
      await user.click(input);

      const bananaOption = await screen.findByRole("option", { name: /banana/i });
      expect(bananaOption).toHaveAttribute("aria-disabled", "true");
    });
  });
});
