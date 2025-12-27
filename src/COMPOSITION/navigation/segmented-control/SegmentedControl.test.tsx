import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "../../../test/test-utils";

import { SegmentedControl } from "./SegmentedControl";

describe("SegmentedControl", () => {
  describe("Rendering", () => {
    it("renders segmented control components", () => {
      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toBeInTheDocument();

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      const option2 = screen.getByRole("radio", { name: /option 2/i });
      const option3 = screen.getByRole("radio", { name: /option 3/i });

      expect(option1).toBeInTheDocument();
      expect(option2).toBeInTheDocument();
      expect(option3).toBeInTheDocument();
    });

    it("renders with default value", () => {
      renderWithTheme(
        <SegmentedControl.Root defaultValue="option2">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option2 = screen.getByRole("radio", { name: /option 2/i });
      expect(option2).toHaveAttribute("aria-checked", "true");
      expect(option2).toHaveAttribute("tabIndex", "0");
    });

    it("forwards ref correctly to Root", () => {
      const ref = React.createRef<HTMLDivElement>();
      renderWithTheme(
        <SegmentedControl.Root ref={ref} defaultValue="option1">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref correctly to Item", () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item ref={ref} value="option1">
            Option 1
          </SegmentedControl.Item>
        </SegmentedControl.Root>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("Sizes", () => {
    it("renders sm size", () => {
      const { container } = renderWithTheme(
        <SegmentedControl.Root defaultValue="option1" size="sm">
          <SegmentedControl.Item value="option1" size="sm">
            Option 1
          </SegmentedControl.Item>
        </SegmentedControl.Root>,
      );
      const item = container.querySelector("button[role='radio']");
      expect(item).toBeInTheDocument();
    });

    it("renders md size (default)", () => {
      const { container } = renderWithTheme(
        <SegmentedControl.Root defaultValue="option1" size="md">
          <SegmentedControl.Item value="option1" size="md">
            Option 1
          </SegmentedControl.Item>
        </SegmentedControl.Root>,
      );
      const item = container.querySelector("button[role='radio']");
      expect(item).toBeInTheDocument();
    });

    it("renders lg size", () => {
      const { container } = renderWithTheme(
        <SegmentedControl.Root defaultValue="option1" size="lg">
          <SegmentedControl.Item value="option1" size="lg">
            Option 1
          </SegmentedControl.Item>
        </SegmentedControl.Root>,
      );
      const item = container.querySelector("button[role='radio']");
      expect(item).toBeInTheDocument();
    });
  });

  describe("Orientations", () => {
    it("renders horizontal orientation (default)", () => {
      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1" orientation="horizontal">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("renders vertical orientation", () => {
      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1" orientation="vertical">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveAttribute("aria-orientation", "vertical");
    });
  });

  describe("Click Interaction", () => {
    it("switches value on click", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1" onValueChange={onValueChange}>
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option2 = screen.getByRole("radio", { name: /option 2/i });
      await user.click(option2);

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option2");
      });
    });

    it("updates selected state on click", async () => {
      const user = userEventSetup();

      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      const option2 = screen.getByRole("radio", { name: /option 2/i });

      // Initial state: option1 is selected
      expect(option1).toHaveAttribute("aria-checked", "true");
      expect(option1).toHaveAttribute("tabIndex", "0");
      expect(option2).toHaveAttribute("aria-checked", "false");
      expect(option2).toHaveAttribute("tabIndex", "-1");

      // Click option2
      await user.click(option2);

      // After click: option2 is selected, option1 is not
      await waitFor(() => {
        expect(option1).toHaveAttribute("aria-checked", "false");
        expect(option1).toHaveAttribute("tabIndex", "-1");
        expect(option2).toHaveAttribute("aria-checked", "true");
        expect(option2).toHaveAttribute("tabIndex", "0");
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates with ArrowRight in horizontal mode", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1" onValueChange={onValueChange}>
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      option1.focus();

      await user.keyboard("{ArrowRight}");

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option2");
      });
    });

    it("navigates with ArrowLeft in horizontal mode", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <SegmentedControl.Root defaultValue="option2" onValueChange={onValueChange}>
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option2 = screen.getByRole("radio", { name: /option 2/i });
      option2.focus();

      await user.keyboard("{ArrowLeft}");

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option1");
      });
    });

    it("wraps around at end in horizontal mode", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <SegmentedControl.Root defaultValue="option3" onValueChange={onValueChange}>
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option3 = screen.getByRole("radio", { name: /option 3/i });
      option3.focus();

      await user.keyboard("{ArrowRight}");

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option1");
      });
    });

    it("wraps around at start in horizontal mode", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1" onValueChange={onValueChange}>
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      option1.focus();

      await user.keyboard("{ArrowLeft}");

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option3");
      });
    });

    it("navigates with ArrowDown in vertical mode", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <SegmentedControl.Root
          defaultValue="option1"
          orientation="vertical"
          onValueChange={onValueChange}
        >
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      option1.focus();

      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option2");
      });
    });

    it("navigates with ArrowUp in vertical mode", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <SegmentedControl.Root
          defaultValue="option2"
          orientation="vertical"
          onValueChange={onValueChange}
        >
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option2 = screen.getByRole("radio", { name: /option 2/i });
      option2.focus();

      await user.keyboard("{ArrowUp}");

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option1");
      });
    });
  });

  describe("Roving Tabindex", () => {
    it("only selected item is focusable", () => {
      renderWithTheme(
        <SegmentedControl.Root defaultValue="option2">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      const option2 = screen.getByRole("radio", { name: /option 2/i });
      const option3 = screen.getByRole("radio", { name: /option 3/i });

      expect(option1).toHaveAttribute("tabIndex", "-1");
      expect(option2).toHaveAttribute("tabIndex", "0");
      expect(option3).toHaveAttribute("tabIndex", "-1");
    });

    it("updates tabindex when selection changes", async () => {
      const user = userEventSetup();

      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      const option2 = screen.getByRole("radio", { name: /option 2/i });

      expect(option1).toHaveAttribute("tabIndex", "0");
      expect(option2).toHaveAttribute("tabIndex", "-1");

      await user.click(option2);

      await waitFor(() => {
        expect(option1).toHaveAttribute("tabIndex", "-1");
        expect(option2).toHaveAttribute("tabIndex", "0");
      });
    });
  });

  describe("Disabled State", () => {
    it("does not change value when disabled item is clicked", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1" onValueChange={onValueChange}>
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2" disabled>
            Option 2 (Disabled)
          </SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const disabledItem = screen.getByRole("radio", { name: /option 2.*disabled/i });
      expect(disabledItem).toBeDisabled();

      await user.click(disabledItem);

      await waitFor(() => {
        expect(onValueChange).not.toHaveBeenCalled();
      });
    });

    it("skips disabled items in keyboard navigation", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1" onValueChange={onValueChange}>
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2" disabled>
            Option 2 (Disabled)
          </SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      option1.focus();

      await user.keyboard("{ArrowRight}");

      await waitFor(() => {
        // Should skip option2 (disabled) and go to option3
        expect(onValueChange).toHaveBeenCalledWith("option3");
      });
    });
  });

  describe("Accessibility", () => {
    it("renders with correct ARIA roles", () => {
      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toBeInTheDocument();

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      expect(option1).toBeInTheDocument();
      expect(option1).toHaveAttribute("aria-checked", "true");
    });

    it("sets aria-orientation correctly", () => {
      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1" orientation="horizontal">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("updates aria-checked when selection changes", async () => {
      const user = userEventSetup();

      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      const option2 = screen.getByRole("radio", { name: /option 2/i });

      expect(option1).toHaveAttribute("aria-checked", "true");
      expect(option2).toHaveAttribute("aria-checked", "false");

      await user.click(option2);

      await waitFor(() => {
        expect(option1).toHaveAttribute("aria-checked", "false");
        expect(option2).toHaveAttribute("aria-checked", "true");
      });
    });
  });

  describe("Controlled Mode", () => {
    it("updates value when controlled", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <SegmentedControl.Root value="option1" onValueChange={onValueChange}>
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      expect(option1).toHaveAttribute("aria-checked", "true");

      const option2 = screen.getByRole("radio", { name: /option 2/i });
      await user.click(option2);

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option2");
      });
    });
  });

  describe("Uncontrolled Mode", () => {
    it("manages state internally", async () => {
      const user = userEventSetup();

      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      const option2 = screen.getByRole("radio", { name: /option 2/i });

      expect(option1).toHaveAttribute("aria-checked", "true");

      await user.click(option2);

      await waitFor(() => {
        expect(option1).toHaveAttribute("aria-checked", "false");
        expect(option2).toHaveAttribute("aria-checked", "true");
      });
    });
  });

  describe("Edge Cases", () => {
    it("handles single item", () => {
      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      expect(option1).toBeInTheDocument();
      expect(option1).toHaveAttribute("aria-checked", "true");
    });

    it("handles empty value initially", () => {
      renderWithTheme(
        <SegmentedControl.Root>
          <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1/i });
      const option2 = screen.getByRole("radio", { name: /option 2/i });

      // No item should be selected initially
      expect(option1).toHaveAttribute("aria-checked", "false");
      expect(option2).toHaveAttribute("aria-checked", "false");
    });

    it("handles all items disabled", () => {
      renderWithTheme(
        <SegmentedControl.Root defaultValue="option1">
          <SegmentedControl.Item value="option1" disabled>
            Option 1 (Disabled)
          </SegmentedControl.Item>
          <SegmentedControl.Item value="option2" disabled>
            Option 2 (Disabled)
          </SegmentedControl.Item>
        </SegmentedControl.Root>,
      );

      const option1 = screen.getByRole("radio", { name: /option 1.*disabled/i });
      const option2 = screen.getByRole("radio", { name: /option 2.*disabled/i });

      expect(option1).toBeDisabled();
      expect(option2).toBeDisabled();
    });
  });
});
