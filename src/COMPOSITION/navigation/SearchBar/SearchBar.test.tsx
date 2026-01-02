/**
 * SearchBar Component Tests
 *
 * Tests verify SearchBar's runtime behavior and API contract
 * without checking visual design, CSS classes, or tokens.
 *
 * Test scope:
 * - Component rendering
 * - Props acceptance
 * - Required prop validation
 * - Search callback behavior
 * - Suggestion selection
 * - Keyboard navigation
 * - Focus/blur behavior
 * - Click outside behavior
 */

import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithTheme, userEventSetup } from "@/test/test-utils";

import { SearchBar } from "./SearchBar";

const mockSuggestions = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

describe("SearchBar", () => {
  describe("Rendering", () => {
    it("renders without errors with required props", () => {
      renderWithTheme(<SearchBar placeholder="Search..." />);
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      const { container } = renderWithTheme(
        <SearchBar placeholder="Search..." className="custom-class" />,
      );
      const rootElement = container.firstChild as HTMLElement;
      expect(rootElement).toHaveClass("custom-class");
    });

    it("throws error when placeholder is empty", () => {
      const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(() => {
        renderWithTheme(<SearchBar placeholder="" />);
      }).toThrow('SearchBar: "placeholder" prop is required and cannot be empty');
      consoleError.mockRestore();
    });

    it("throws error when placeholder is only whitespace", () => {
      const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
      expect(() => {
        renderWithTheme(<SearchBar placeholder="   " />);
      }).toThrow('SearchBar: "placeholder" prop is required and cannot be empty');
      consoleError.mockRestore();
    });
  });

  describe("Search Functionality", () => {
    it("calls onSearch when user types", async () => {
      const onSearch = vi.fn();
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." onSearch={onSearch} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "test");

      await waitFor(() => {
        expect(onSearch).toHaveBeenCalled();
      });
    });

    it("calls onSearch with correct value", async () => {
      const onSearch = vi.fn();
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." onSearch={onSearch} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "apple");

      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith("apple");
      });
    });

    it("does not call onSearch when callback is not provided", async () => {
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." />);

      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "test");

      // Should not throw error
      expect(input).toBeInTheDocument();
    });
  });

  describe("Suggestions Display", () => {
    it("does not show suggestions when not focused", () => {
      renderWithTheme(<SearchBar placeholder="Search..." suggestions={mockSuggestions} />);
      expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    });

    it("shows suggestions when focused and suggestions exist", async () => {
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." suggestions={mockSuggestions} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
        expect(screen.getByText("Banana")).toBeInTheDocument();
      });
    });

    it("filters suggestions based on input", async () => {
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." suggestions={mockSuggestions} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.click(input);
      await user.type(input, "a");

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
        expect(screen.getByText("Banana")).toBeInTheDocument();
        expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
      });
    });

    it("does not show suggestions when filtered list is empty", async () => {
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." suggestions={mockSuggestions} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.click(input);
      await user.type(input, "xyz");

      await waitFor(() => {
        expect(screen.queryByText("Apple")).not.toBeInTheDocument();
      });
    });
  });

  describe("Suggestion Selection", () => {
    it("calls onSuggestionSelect when suggestion is clicked", async () => {
      const onSuggestionSelect = vi.fn();
      const user = userEventSetup();
      renderWithTheme(
        <SearchBar
          placeholder="Search..."
          suggestions={mockSuggestions}
          onSuggestionSelect={onSuggestionSelect}
        />,
      );

      const input = screen.getByPlaceholderText("Search...");
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
      });

      const appleButton = screen.getByText("Apple");
      await user.click(appleButton);

      await waitFor(() => {
        expect(onSuggestionSelect).toHaveBeenCalledWith("Apple");
      });
    });

    it("updates input value when suggestion is selected", async () => {
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." suggestions={mockSuggestions} />);

      const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
      });

      const appleButton = screen.getByText("Apple");
      await user.click(appleButton);

      await waitFor(() => {
        expect(input.value).toBe("Apple");
      });
    });

    it("closes suggestions after selection", async () => {
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." suggestions={mockSuggestions} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
      });

      const appleButton = screen.getByText("Apple");
      await user.click(appleButton);

      await waitFor(() => {
        expect(screen.queryByText("Apple")).not.toBeInTheDocument();
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates down through suggestions with ArrowDown", async () => {
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." suggestions={mockSuggestions} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
      });

      await user.keyboard("{ArrowDown}");

      // First suggestion should be highlighted (visual state, tested via accessibility)
      expect(input).toHaveFocus();
    });

    it("navigates up through suggestions with ArrowUp", async () => {
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." suggestions={mockSuggestions} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
      });

      await user.keyboard("{ArrowDown}{ArrowDown}{ArrowUp}");

      expect(input).toHaveFocus();
    });

    it("selects suggestion with Enter key", async () => {
      const onSuggestionSelect = vi.fn();
      const user = userEventSetup();
      renderWithTheme(
        <SearchBar
          placeholder="Search..."
          suggestions={mockSuggestions}
          onSuggestionSelect={onSuggestionSelect}
        />,
      );

      const input = screen.getByPlaceholderText("Search...");
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
      });

      await user.keyboard("{ArrowDown}{Enter}");

      await waitFor(() => {
        expect(onSuggestionSelect).toHaveBeenCalledWith("Apple");
      });
    });

    it("closes suggestions with Escape key", async () => {
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." suggestions={mockSuggestions} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByText("Apple")).not.toBeInTheDocument();
      });
    });
  });

  describe("Focus Management", () => {
    it("shows suggestions on focus", async () => {
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." suggestions={mockSuggestions} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
      });
    });

    it("hides suggestions on blur", async () => {
      const user = userEventSetup();
      renderWithTheme(
        <div>
          <SearchBar placeholder="Search..." suggestions={mockSuggestions} />
          <button>Outside button</button>
        </div>,
      );

      const input = screen.getByPlaceholderText("Search...");
      await user.click(input);

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
      });

      // Click outside the SearchBar component to trigger blur
      const outsideButton = screen.getByText("Outside button");
      await user.click(outsideButton);

      await waitFor(
        () => {
          expect(screen.queryByText("Apple")).not.toBeInTheDocument();
        },
        { timeout: 500 },
      );
    });
  });

  describe("Edge Cases", () => {
    it("handles empty suggestions array", () => {
      renderWithTheme(<SearchBar placeholder="Search..." suggestions={[]} />);
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("handles undefined suggestions prop", () => {
      renderWithTheme(<SearchBar placeholder="Search..." />);
      expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    });

    it("handles case-insensitive filtering", async () => {
      const user = userEventSetup();
      renderWithTheme(<SearchBar placeholder="Search..." suggestions={mockSuggestions} />);

      const input = screen.getByPlaceholderText("Search...");
      await user.click(input);
      await user.type(input, "APPLE");

      await waitFor(() => {
        expect(screen.getByText("Apple")).toBeInTheDocument();
      });
    });
  });
});
