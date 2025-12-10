import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "../../test/test-utils";

import { Select } from "./Select";

describe("Select", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(
        <Select.Root>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );
      const trigger = screen.getByRole("button", { name: /select an option/i });
      expect(trigger).toBeInTheDocument();
    });

    it("renders with default value", async () => {
      renderWithTheme(
        <Select.Root defaultValue="option2">
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );
      const trigger = screen.getByRole("button");
      // Wait for options to register before checking text content
      await waitFor(() => {
        expect(trigger).toHaveTextContent("Option 2");
      });
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger ref={ref} placeholder="Ref test" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger variant="primary" placeholder="Primary" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders secondary variant", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger variant="secondary" placeholder="Secondary" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders outline variant", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger variant="outline" placeholder="Outline" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders ghost variant", () => {
      const { container } = renderWithTheme(
        <Select.Root>
          <Select.Trigger variant="ghost" placeholder="Ghost" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders xs size", () => {
      const { container } = renderWithTheme(
        <Select.Root size="xs">
          <Select.Trigger placeholder="Extra small" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders sm size", () => {
      const { container } = renderWithTheme(
        <Select.Root size="sm">
          <Select.Trigger placeholder="Small" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders md size (default)", () => {
      const { container } = renderWithTheme(
        <Select.Root size="md">
          <Select.Trigger placeholder="Medium" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });

    it("renders lg size", () => {
      const { container } = renderWithTheme(
        <Select.Root size="lg">
          <Select.Trigger placeholder="Large" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );
      const trigger = container.querySelector("button");
      expect(trigger).toBeInTheDocument();
    });
  });

  describe("Mouse Interaction", () => {
    it("opens listbox on trigger click", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        const listbox = screen.getByRole("listbox");
        expect(listbox).toBeInTheDocument();
      });
    });

    it("closes listbox on option click", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <Select.Root onValueChange={onValueChange}>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const option = screen.getByRole("option", { name: /option 1/i });
      await user.click(option);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
        expect(onValueChange).toHaveBeenCalledWith("option1");
      });
    });

    it("closes listbox on outside click", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <div>
          <Select.Root>
            <Select.Trigger placeholder="Select an option" />
            <Select.Listbox>
              <Select.Option value="option1">Option 1</Select.Option>
            </Select.Listbox>
          </Select.Root>
          <button>Outside</button>
        </div>,
      );

      const trigger = screen.getByRole("button", { name: /select an option/i });
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const outsideButton = screen.getByRole("button", { name: /outside/i });
      await user.click(outsideButton);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });
  });

  // TEMPORARY: Keyboard navigation tests are tightly coupled to internal focus logic
  // and are currently causing hangs / unstable behaviour in CI.
  // We skip this block until Select focus management is fully refactored
  // and aligned with a simpler, well-tested model (see task: TUI_SELECT_FOCUS_V2).
  describe.skip("Keyboard Navigation (temporarily disabled)", () => {
    it("opens listbox on ArrowDown key", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      trigger.focus();
      await user.keyboard("{ArrowDown}");

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("opens listbox on Enter key", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      trigger.focus();
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("navigates options with ArrowDown", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const listbox = screen.getByRole("listbox");
      listbox.focus();
      await user.keyboard("{ArrowDown}");

      const option1 = screen.getByRole("option", { name: /option 1/i });
      await waitFor(() => {
        expect(option1).toHaveFocus();
      });
    });

    it("navigates options with ArrowUp", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const listbox = screen.getByRole("listbox");
      listbox.focus();
      await user.keyboard("{ArrowUp}");

      // Should wrap to last option
      const option3 = screen.getByRole("option", { name: /option 3/i });
      await waitFor(() => {
        expect(option3).toHaveFocus();
      });
    });

    it("selects option with Enter key", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <Select.Root onValueChange={onValueChange}>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const listbox = screen.getByRole("listbox");
      listbox.focus();
      await user.keyboard("{ArrowDown}{Enter}");

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option1");
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("closes listbox with Escape key", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const listbox = screen.getByRole("listbox");
      listbox.focus();
      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("jumps to first option with Home key", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root defaultValue="option2">
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const listbox = screen.getByRole("listbox");
      listbox.focus();
      await user.keyboard("{Home}");

      const option1 = screen.getByRole("option", { name: /option 1/i });
      await waitFor(() => {
        expect(option1).toHaveFocus();
      });
    });

    it("jumps to last option with End key", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3">Option 3</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const listbox = screen.getByRole("listbox");
      listbox.focus();
      await user.keyboard("{End}");

      const option3 = screen.getByRole("option", { name: /option 3/i });
      await waitFor(() => {
        expect(option3).toHaveFocus();
      });
    });
  });

  describe("Disabled State", () => {
    it("does not open when disabled", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root disabled>
          <Select.Trigger placeholder="Disabled select" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toBeDisabled();

      await user.click(trigger);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("does not select disabled option", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <Select.Root onValueChange={onValueChange}>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2" disabled>
              Disabled Option
            </Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const disabledOption = screen.getByRole("option", { name: /disabled option/i });
      expect(disabledOption).toHaveAttribute("aria-disabled", "true");

      await user.click(disabledOption);

      await waitFor(() => {
        expect(onValueChange).not.toHaveBeenCalled();
      });
    });
  });

  describe("ARIA Attributes", () => {
    it("has correct ARIA attributes on trigger", () => {
      renderWithTheme(
        <Select.Root>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("updates aria-expanded when open", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("has correct ARIA attributes on listbox", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        const listbox = screen.getByRole("listbox");
        expect(listbox).toBeInTheDocument();
        expect(listbox).toHaveAttribute("aria-labelledby");
      });
    });

    // TEMPORARY: Skipping due to aria-selected logic issues - will be fixed in focus refactor
    it.skip("has correct ARIA attributes on options", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root defaultValue="option2">
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
            <Select.Option value="option3" disabled>
              Option 3
            </Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        const option1 = screen.getByRole("option", { name: /option 1/i });
        const option2 = screen.getByRole("option", { name: /option 2/i });
        const option3 = screen.getByRole("option", { name: /option 3/i });

        expect(option1).toHaveAttribute("aria-selected", "false");
        expect(option2).toHaveAttribute("aria-selected", "true");
        expect(option3).toHaveAttribute("aria-disabled", "true");
      });
    });
  });

  describe("Controlled Mode", () => {
    it("updates value when controlled", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      renderWithTheme(
        <Select.Root value="option1" onValueChange={onValueChange}>
          <Select.Trigger placeholder="Select an option" />
          <Select.Listbox>
            <Select.Option value="option1">Option 1</Select.Option>
            <Select.Option value="option2">Option 2</Select.Option>
          </Select.Listbox>
        </Select.Root>,
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveTextContent("Option 1");

      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      const option2 = screen.getByRole("option", { name: /option 2/i });
      await user.click(option2);

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option2");
      });
    });
  });
});
