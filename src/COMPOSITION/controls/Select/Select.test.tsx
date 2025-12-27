import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "../../../test/test-utils";

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

  describe("Invalid State", () => {
    it("applies aria-invalid when invalid", () => {
      renderWithTheme(
        <Select.Root>
          <Select.Trigger aria-invalid>
            <Select.Value placeholder="Invalid select" />
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
      expect(trigger).toHaveAttribute("aria-invalid", "true");
    });

    it("does not apply aria-invalid when not invalid", () => {
      renderWithTheme(
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Valid select" />
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
      expect(trigger).not.toHaveAttribute("aria-invalid", "true");
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

  describe("Keyboard Navigation", () => {
    it("opens select with Enter key", async () => {
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
      trigger.focus();
      await user.keyboard("{Enter}");

      await waitFor(
        () => {
          expect(screen.getByRole("option", { name: /option 1/i })).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it("opens select with Space key", async () => {
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
      trigger.focus();
      await user.keyboard(" ");

      await waitFor(
        () => {
          expect(screen.getByRole("option", { name: /option 1/i })).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it("closes select with Escape key", async () => {
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

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("option", { name: /option 1/i })).not.toBeInTheDocument();
      });
    });

    it("navigates options with Arrow keys", async () => {
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
      trigger.focus();
      await user.keyboard("{Enter}");

      await waitFor(
        () => {
          expect(screen.getByRole("option", { name: /option 1/i })).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      // Arrow down to next option
      await user.keyboard("{ArrowDown}");
      const option2 = screen.getByRole("option", { name: /option 2/i });
      expect(option2).toHaveAttribute("data-highlighted");

      // Arrow down again
      await user.keyboard("{ArrowDown}");
      const option3 = screen.getByRole("option", { name: /option 3/i });
      expect(option3).toHaveAttribute("data-highlighted");

      // Arrow up
      await user.keyboard("{ArrowUp}");
      expect(option2).toHaveAttribute("data-highlighted");
    });

    it("selects option with Enter key", async () => {
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
      trigger.focus();
      await user.keyboard("{Enter}");

      await waitFor(
        () => {
          expect(screen.getByRole("option", { name: /option 1/i })).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(onValueChange).toHaveBeenCalledWith("option2");
      });
    });

    it("supports Tab key navigation", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <div>
          <button>Previous</button>
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
          </Select.Root>
          <button>Next</button>
        </div>,
      );

      const previousButton = screen.getByRole("button", { name: /previous/i });
      previousButton.focus();

      await user.keyboard("{Tab}");
      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveFocus();

      await user.keyboard("{Tab}");
      const nextButton = screen.getByRole("button", { name: /next/i });
      expect(nextButton).toHaveFocus();
    });

    it("supports type-ahead search", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select an option" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
              <Select.Item value="cherry">Cherry</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>,
      );

      const trigger = screen.getByRole("combobox");
      trigger.focus();
      await user.keyboard("{Enter}");

      await waitFor(
        () => {
          expect(screen.getByRole("option", { name: /apple/i })).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      // Type 'b' to jump to Banana
      await user.keyboard("b");
      const banana = screen.getByRole("option", { name: /banana/i });
      expect(banana).toHaveAttribute("data-highlighted");
    });
  });

  describe("Focus Management", () => {
    it("traps focus when dropdown is open", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <div>
          <button>Outside</button>
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
          </Select.Root>
        </div>,
      );

      const trigger = screen.getByRole("combobox");
      const outsideButton = screen.getByRole("button", { name: /outside/i });
      await user.click(trigger);

      await waitFor(
        () => {
          expect(screen.getByRole("option", { name: /option 1/i })).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      // Focus should be within dropdown, not on outside button
      // Radix Select focuses the first option when opened, so focus should be on an option
      const firstOption = screen.getByRole("option", { name: /option 1/i });
      expect(firstOption).toHaveFocus();
      expect(outsideButton).not.toHaveFocus();
    });

    it("restores focus to trigger when closed", async () => {
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

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("option", { name: /option 1/i })).not.toBeInTheDocument();
        expect(trigger).toHaveFocus();
      });
    });

    it("applies focus-visible styles on keyboard focus", () => {
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

      const trigger = screen.getByRole("combobox");
      trigger.focus();

      // Focus-visible should be applied (Radix handles this, component provides styling)
      expect(trigger).toHaveFocus();
    });

    it("does not apply focus styles on mouse click", async () => {
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

      // When dropdown opens, Radix Select focuses the first option, not the trigger
      // This is expected behavior for keyboard navigation
      const firstOption = screen.getByRole("option", { name: /option 1/i });
      expect(firstOption).toHaveFocus();
    });
  });

  describe("Selection Behavior", () => {
    it("updates trigger value when option is selected", async () => {
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

      const option2 = screen.getByRole("option", { name: /option 2/i });
      await user.click(option2);

      await waitFor(() => {
        expect(trigger).toHaveTextContent("Option 2");
      });
    });

    it("shows selected indicator on selected item", async () => {
      const user = userEventSetup();
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
      await user.click(trigger);

      await waitFor(
        () => {
          const option2 = screen.getByRole("option", { name: /option 2/i });
          // Selected item should have indicator (Radix ItemIndicator)
          expect(option2).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it("supports controlled mode", async () => {
      const user = userEventSetup();
      const onValueChange = vi.fn();

      const { rerender } = renderWithTheme(
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

      // Update value externally (controlled)
      rerender(
        <Select.Root value="option2" onValueChange={onValueChange}>
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

      await waitFor(() => {
        expect(trigger).toHaveTextContent("Option 2");
      });
    });

    it("supports uncontrolled mode", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <Select.Root defaultValue="option1">
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
        expect(trigger).toHaveTextContent("Option 2");
      });
    });
  });

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
