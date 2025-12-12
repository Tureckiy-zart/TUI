import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "../../test/test-utils";

import { Select } from "./Select";

describe("Select", () => {
  describe("Rendering", () => {
    it("renders trigger element", () => {
      renderWithTheme(
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select an option" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent("Select an option");
    });

    it("renders with default value", async () => {
      renderWithTheme(
        <Select.Root defaultValue="option2">
          <Select.Trigger>
            <Select.Value placeholder="Select an option" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      const trigger = screen.getByRole("combobox");
      await waitFor(() => {
        expect(trigger).toHaveTextContent("Option 2");
      });
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger ref={ref}>
            <Select.Value placeholder="Ref test" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger variant="primary">
            <Select.Value placeholder="Primary" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger variant="secondary">
            <Select.Value placeholder="Secondary" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders outline variant", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger variant="outline">
            <Select.Value placeholder="Outline" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders ghost variant", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger variant="ghost">
            <Select.Value placeholder="Ghost" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders destructive variant", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger variant="destructive">
            <Select.Value placeholder="Destructive" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders xs size", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger size="xs">
            <Select.Value placeholder="Extra small" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content size="xs">
            <Select.Viewport>
              <Select.Item value="option1" size="xs">
                Option 1
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders sm size", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger size="sm">
            <Select.Value placeholder="Small" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content size="sm">
            <Select.Viewport>
              <Select.Item value="option1" size="sm">
                Option 1
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders md size (default)", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger size="md">
            <Select.Value placeholder="Medium" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content size="md">
            <Select.Viewport>
              <Select.Item value="option1" size="md">
                Option 1
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders lg size", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger size="lg">
            <Select.Value placeholder="Large" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content size="lg">
            <Select.Viewport>
              <Select.Item value="option1" size="lg">
                Option 1
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders xl size", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger size="xl">
            <Select.Value placeholder="Extra large" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content size="xl">
            <Select.Viewport>
              <Select.Item value="option1" size="xl">
                Option 1
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Mouse Interaction", () => {
    it("opens on trigger click", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select an option" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(
        () => {
          expect(screen.getByRole("option", { name: /option 1/i })).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it("selects item on click", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <Select.Root onValueChange={onValueChange}>
          <Select.Trigger>
            <Select.Value placeholder="Select an option" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(
        () => {
          expect(screen.getByRole("option", { name: /option 1/i })).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      const option = screen.getByRole("option", { name: /option 1/i });
      await user.click(option);

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option1");
      });
    });
  });

  // Note: Keyboard navigation (Enter, Arrow keys, Escape) is handled by Radix Select.
  // We do not test Radix behavior, only our component integration and token usage.

  describe("Disabled State", () => {
    it("does not open when disabled", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root disabled>
          <Select.Trigger>
            <Select.Value placeholder="Disabled select" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeDisabled();

      await user.click(trigger);

      await waitFor(() => {
        expect(screen.queryByRole("option", { name: /option 1/i })).not.toBeInTheDocument();
      });
    });

    it("does not select disabled option", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <Select.Root onValueChange={onValueChange}>
          <Select.Trigger>
            <Select.Value placeholder="Select an option" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2" disabled>
                Disabled Option
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(
        () => {
          expect(screen.getByRole("option", { name: /disabled option/i })).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      const disabledOption = screen.getByRole("option", { name: /disabled option/i });
      expect(disabledOption).toHaveAttribute("data-disabled");

      await user.click(disabledOption);

      await waitFor(() => {
        expect(onValueChange).not.toHaveBeenCalled();
      });
    });
  });

  describe("Accessibility", () => {
    it("renders with combobox role for screen readers", () => {
      renderWithTheme(
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select an option" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );

      // Verify basic accessibility structure
      // Radix Select handles all ARIA attributes automatically
      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Controlled Mode", () => {
    it("updates value when controlled", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <Select.Root value="option1" onValueChange={onValueChange}>
          <Select.Trigger>
            <Select.Value placeholder="Select an option" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveTextContent("Option 1");

      await user.click(trigger);

      await waitFor(
        () => {
          expect(screen.getByRole("option", { name: /option 2/i })).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      const option2 = screen.getByRole("option", { name: /option 2/i });
      await user.click(option2);

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option2");
      });
    });
  });

  describe("Items Rendering", () => {
    it("renders items correctly", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select an option" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
              <Select.Item value="option3">Option 3</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(
        () => {
          expect(screen.getByRole("option", { name: /option 1/i })).toBeInTheDocument();
          expect(screen.getByRole("option", { name: /option 2/i })).toBeInTheDocument();
          expect(screen.getByRole("option", { name: /option 3/i })).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it("renders items with groups", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select an option" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Group>
                <Select.Label>Group 1</Select.Label>
                <Select.Item value="option1">Option 1</Select.Item>
              </Select.Group>
              <Select.Separator />
              <Select.Group>
                <Select.Label>Group 2</Select.Label>
                <Select.Item value="option2">Option 2</Select.Item>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );

      const trigger = screen.getByRole("combobox");
      await user.click(trigger);

      await waitFor(
        () => {
          expect(screen.getByText("Group 1")).toBeInTheDocument();
          expect(screen.getByText("Group 2")).toBeInTheDocument();
          expect(screen.getByRole("option", { name: /option 1/i })).toBeInTheDocument();
          expect(screen.getByRole("option", { name: /option 2/i })).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });
  });
});
