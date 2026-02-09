/**
 * EmptyState Component Tests
 *
 * Tests for EmptyState component rendering and behavior.
 */

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { axeCheck, renderWithTheme } from "@/test/test-utils";

import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from ".";

describe("EmptyState", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(
        <EmptyState>
          <EmptyStateIcon>📭</EmptyStateIcon>
          <EmptyStateTitle>No items found</EmptyStateTitle>
          <EmptyStateDescription>There are no items to display.</EmptyStateDescription>
        </EmptyState>,
      );

      expect(screen.getByText("No items found")).toBeInTheDocument();
      expect(screen.getByText("There are no items to display.")).toBeInTheDocument();
    });

    it("renders with all subcomponents", () => {
      renderWithTheme(
        <EmptyState>
          <EmptyStateIcon>📭</EmptyStateIcon>
          <EmptyStateTitle>No items found</EmptyStateTitle>
          <EmptyStateDescription>Try adjusting your filters.</EmptyStateDescription>
          <EmptyStateAction>
            <button>Create Item</button>
          </EmptyStateAction>
        </EmptyState>,
      );

      expect(screen.getByText("No items found")).toBeInTheDocument();
      expect(screen.getByText("Try adjusting your filters.")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Create Item" })).toBeInTheDocument();
    });

    it("renders with custom id", () => {
      const { container } = renderWithTheme(
        <EmptyState id="custom-empty-state">
          <EmptyStateTitle>No items</EmptyStateTitle>
        </EmptyState>,
      );

      const emptyState = container.querySelector("#custom-empty-state");
      expect(emptyState).toBeInTheDocument();
    });

    it("generates id automatically if not provided", () => {
      const { container } = renderWithTheme(
        <EmptyState>
          <EmptyStateTitle>No items</EmptyStateTitle>
        </EmptyState>,
      );

      const emptyState = container.querySelector('[id^="empty-state-"]');
      expect(emptyState).toBeInTheDocument();
    });
  });

  describe("Subcomponents", () => {
    describe("EmptyStateIcon", () => {
      it("renders icon with default size", () => {
        const { container } = renderWithTheme(
          <EmptyState>
            <EmptyStateIcon>📭</EmptyStateIcon>
          </EmptyState>,
        );

        const icon = container.querySelector('[class*="size-12"]');
        expect(icon).toBeInTheDocument();
      });

      it("renders icon with sm size", () => {
        const { container } = renderWithTheme(
          <EmptyState>
            <EmptyStateIcon size="sm">📭</EmptyStateIcon>
          </EmptyState>,
        );

        const icon = container.querySelector('[class*="size-8"]');
        expect(icon).toBeInTheDocument();
      });

      it("renders icon with md size", () => {
        const { container } = renderWithTheme(
          <EmptyState>
            <EmptyStateIcon size="md">📭</EmptyStateIcon>
          </EmptyState>,
        );

        const icon = container.querySelector('[class*="size-12"]');
        expect(icon).toBeInTheDocument();
      });

      it("renders icon with lg size", () => {
        const { container } = renderWithTheme(
          <EmptyState>
            <EmptyStateIcon size="lg">📭</EmptyStateIcon>
          </EmptyState>,
        );

        const icon = container.querySelector('[class*="size-16"]');
        expect(icon).toBeInTheDocument();
      });

      it("renders custom React icon", () => {
        renderWithTheme(
          <EmptyState>
            <EmptyStateIcon>
              <svg data-testid="custom-icon" />
            </EmptyStateIcon>
          </EmptyState>,
        );

        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
      });
    });

    describe("EmptyStateTitle", () => {
      it("renders title as h3 element", () => {
        const { container } = renderWithTheme(
          <EmptyState>
            <EmptyStateTitle>No items found</EmptyStateTitle>
          </EmptyState>,
        );

        const title = container.querySelector("h3");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("No items found");
      });

      it("applies title typography tokens", () => {
        const { container } = renderWithTheme(
          <EmptyState>
            <EmptyStateTitle>Title</EmptyStateTitle>
          </EmptyState>,
        );

        const title = container.querySelector("h3");
        expect(title).toHaveClass("text-lg");
        expect(title).toHaveClass("font-semibold");
      });
    });

    describe("EmptyStateDescription", () => {
      it("renders description as p element", () => {
        const { container } = renderWithTheme(
          <EmptyState>
            <EmptyStateDescription>Description text</EmptyStateDescription>
          </EmptyState>,
        );

        const description = container.querySelector("p");
        expect(description).toBeInTheDocument();
        expect(description).toHaveTextContent("Description text");
      });

      it("applies description typography tokens", () => {
        const { container } = renderWithTheme(
          <EmptyState>
            <EmptyStateDescription>Description</EmptyStateDescription>
          </EmptyState>,
        );

        const description = container.querySelector("p");
        expect(description).toHaveClass("text-sm");
        expect(description).toHaveClass("max-w-md");
      });
    });

    describe("EmptyStateAction", () => {
      it("renders action content", () => {
        renderWithTheme(
          <EmptyState>
            <EmptyStateAction>
              <button>Create Item</button>
            </EmptyStateAction>
          </EmptyState>,
        );

        expect(screen.getByRole("button", { name: "Create Item" })).toBeInTheDocument();
      });

      it("applies action spacing tokens", () => {
        const { container } = renderWithTheme(
          <EmptyState>
            <EmptyStateAction>
              <button>Action</button>
            </EmptyStateAction>
          </EmptyState>,
        );

        const action = container.querySelector('[class*="mt-2"]');
        expect(action).toBeInTheDocument();
      });
    });
  });

  describe("Compound Component API", () => {
    it("supports EmptyState.Icon syntax", () => {
      // Type assertion needed because subcomponents are attached dynamically
      const EmptyStateWithSubcomponents = EmptyState as typeof EmptyState & {
        Icon: typeof EmptyStateIcon;
        Title: typeof EmptyStateTitle;
        Description: typeof EmptyStateDescription;
        Action: typeof EmptyStateAction;
      };

      renderWithTheme(
        <EmptyState>
          <EmptyStateWithSubcomponents.Icon>📭</EmptyStateWithSubcomponents.Icon>
          <EmptyStateWithSubcomponents.Title>Title</EmptyStateWithSubcomponents.Title>
          <EmptyStateWithSubcomponents.Description>
            Description
          </EmptyStateWithSubcomponents.Description>
          <EmptyStateWithSubcomponents.Action>
            <button>Action</button>
          </EmptyStateWithSubcomponents.Action>
        </EmptyState>,
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
    });

    it("supports direct subcomponent imports", () => {
      renderWithTheme(
        <EmptyState>
          <EmptyStateIcon>📭</EmptyStateIcon>
          <EmptyStateTitle>Title</EmptyStateTitle>
        </EmptyState>,
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has accessible id attribute", () => {
      const { container } = renderWithTheme(
        <EmptyState id="test-empty-state">
          <EmptyStateTitle>No items</EmptyStateTitle>
        </EmptyState>,
      );

      const emptyState = container.querySelector("#test-empty-state");
      expect(emptyState).toBeInTheDocument();
    });

    it("uses semantic HTML elements", () => {
      const { container } = renderWithTheme(
        <EmptyState>
          <EmptyStateTitle>Title</EmptyStateTitle>
          <EmptyStateDescription>Description</EmptyStateDescription>
        </EmptyState>,
      );

      expect(container.querySelector("h3")).toBeInTheDocument();
      expect(container.querySelector("p")).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = { current: null as HTMLDivElement | null };
      renderWithTheme(
        <EmptyState ref={ref}>
          <EmptyStateTitle>Title</EmptyStateTitle>
        </EmptyState>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("passes axe accessibility checks for basic usage", async () => {
      const { container } = renderWithTheme(
        <EmptyState>
          <EmptyStateIcon>📭</EmptyStateIcon>
          <EmptyStateTitle>No items found</EmptyStateTitle>
          <EmptyStateDescription>There are no items to display.</EmptyStateDescription>
          <EmptyStateAction>
            <button>Create Item</button>
          </EmptyStateAction>
        </EmptyState>,
      );
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });

    it("passes axe accessibility checks for custom icon", async () => {
      const { container } = renderWithTheme(
        <EmptyState>
          <EmptyStateIcon>
            <svg aria-label="info icon" />
          </EmptyStateIcon>
          <EmptyStateTitle>No data</EmptyStateTitle>
        </EmptyState>,
      );
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });

    it("passes axe accessibility checks with aria attributes", async () => {
      const { container } = renderWithTheme(
        <EmptyState id="my-empty-state" aria-labelledby="my-empty-state-title">
          <EmptyStateTitle id="my-empty-state-title">No Content</EmptyStateTitle>
        </EmptyState>,
      );
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });

    it("passes axe accessibility checks without title", async () => {
      const { container } = renderWithTheme(
        <EmptyState>
          <EmptyStateIcon>📭</EmptyStateIcon>
          <EmptyStateDescription>No items to display.</EmptyStateDescription>
        </EmptyState>,
      );
      const results = await axeCheck(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe("Edge Cases", () => {
    it("renders with only icon", () => {
      renderWithTheme(
        <EmptyState>
          <EmptyStateIcon>📭</EmptyStateIcon>
        </EmptyState>,
      );

      expect(screen.getByText("📭")).toBeInTheDocument();
    });

    it("renders with only title", () => {
      renderWithTheme(
        <EmptyState>
          <EmptyStateTitle>No items</EmptyStateTitle>
        </EmptyState>,
      );

      expect(screen.getByText("No items")).toBeInTheDocument();
    });

    it("renders with multiple actions", () => {
      renderWithTheme(
        <EmptyState>
          <EmptyStateAction>
            <div>
              <button>Action 1</button>
              <button>Action 2</button>
            </div>
          </EmptyStateAction>
        </EmptyState>,
      );

      expect(screen.getByRole("button", { name: "Action 1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Action 2" })).toBeInTheDocument();
    });

    it("handles empty children gracefully", () => {
      const { container } = renderWithTheme(<EmptyState />);

      const emptyState = container.querySelector('[id^="empty-state-"]');
      expect(emptyState).toBeInTheDocument();
    });
  });

  describe("Props Forwarding", () => {
    it("forwards HTML attributes to root element", () => {
      const { container } = renderWithTheme(
        <EmptyState data-testid="empty-state" aria-label="Empty state">
          <EmptyStateTitle>Title</EmptyStateTitle>
        </EmptyState>,
      );

      const emptyState = container.querySelector('[data-testid="empty-state"]');
      expect(emptyState).toBeInTheDocument();
      expect(emptyState).toHaveAttribute("aria-label", "Empty state");
    });

    it("forwards className to root element", () => {
      const { container } = renderWithTheme(
        <EmptyState className="custom-class">
          <EmptyStateTitle>Title</EmptyStateTitle>
        </EmptyState>,
      );

      const emptyState = container.querySelector(".custom-class");
      expect(emptyState).toBeInTheDocument();
    });
  });
});
