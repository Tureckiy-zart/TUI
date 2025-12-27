import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { Pagination } from "../pagination";

describe("Pagination", () => {
  afterEach(() => cleanup());

  describe("Page range calculation", () => {
    it("renders single page correctly", () => {
      const onPageChange = vi.fn();
      render(<Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />);

      const page1 = screen.getByRole("button", { name: "Go to page 1" });
      expect(page1).toBeInTheDocument();
      expect(page1).toHaveAttribute("aria-current", "page");

      // Prev/next buttons should be disabled on single page
      const prevButton = screen.getByRole("button", { name: /previous page/i });
      const nextButton = screen.getByRole("button", { name: /next page/i });
      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
    });

    it("renders few pages correctly (3 pages)", () => {
      const onPageChange = vi.fn();
      render(<Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />);

      expect(screen.getByRole("button", { name: "Go to page 1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Go to page 2" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      expect(screen.getByRole("button", { name: "Go to page 3" })).toBeInTheDocument();

      // Should not have ellipsis for few pages
      expect(screen.queryByText("…")).not.toBeInTheDocument();
    });

    it("renders many pages with ellipsis correctly", () => {
      const onPageChange = vi.fn();
      render(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} />);

      // Should have first page
      expect(screen.getByRole("button", { name: "Go to page 1" })).toBeInTheDocument();
      // Should have ellipsis (aria-hidden span with ellipsis character)
      const ellipsisElements = screen.getAllByText("…");
      expect(ellipsisElements.length).toBeGreaterThan(0);
      expect(ellipsisElements[0]).toHaveAttribute("aria-hidden", "true");
      // Should have current page
      expect(screen.getByRole("button", { name: "Go to page 5" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      // Should have last page
      expect(screen.getByRole("button", { name: "Go to page 10" })).toBeInTheDocument();
    });

    it("renders first page correctly with ellipsis", () => {
      const onPageChange = vi.fn();
      render(<Pagination currentPage={1} totalPages={10} onPageChange={onPageChange} />);

      expect(screen.getByRole("button", { name: "Go to page 1" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      expect(screen.getByRole("button", { name: "Go to page 10" })).toBeInTheDocument();
      // Should have ellipsis when far from last page
      const ellipsisElements = screen.getAllByText("…");
      expect(ellipsisElements.length).toBeGreaterThan(0);
    });

    it("renders last page correctly with ellipsis", () => {
      const onPageChange = vi.fn();
      render(<Pagination currentPage={10} totalPages={10} onPageChange={onPageChange} />);

      expect(screen.getByRole("button", { name: "Go to page 1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Go to page 10" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      // Should have ellipsis when far from first page
      const ellipsisElements = screen.getAllByText("…");
      expect(ellipsisElements.length).toBeGreaterThan(0);
    });

    it("respects custom delta prop", () => {
      const onPageChange = vi.fn();
      render(<Pagination currentPage={10} totalPages={20} delta={3} onPageChange={onPageChange} />);

      // With delta=3, should show 3 pages on each side
      expect(screen.getByRole("button", { name: "Go to page 7" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Go to page 8" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Go to page 9" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Go to page 10" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      expect(screen.getByRole("button", { name: "Go to page 11" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Go to page 12" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Go to page 13" })).toBeInTheDocument();
    });
  });

  describe("onPageChange callback", () => {
    it("calls onPageChange when clicking a page number", async () => {
      const onPageChange = vi.fn();
      const user = userEvent.setup();
      render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

      const page3 = screen.getByRole("button", { name: "Go to page 3" });
      await user.click(page3);

      expect(onPageChange).toHaveBeenCalledTimes(1);
      expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it("calls onPageChange when clicking next button", async () => {
      const onPageChange = vi.fn();
      const user = userEvent.setup();
      render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

      const nextButton = screen.getByRole("button", { name: /next page/i });
      await user.click(nextButton);

      expect(onPageChange).toHaveBeenCalledTimes(1);
      expect(onPageChange).toHaveBeenCalledWith(3);
    });

    it("calls onPageChange when clicking previous button", async () => {
      const onPageChange = vi.fn();
      const user = userEvent.setup();
      render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

      const prevButton = screen.getByRole("button", { name: /previous page/i });
      await user.click(prevButton);

      expect(onPageChange).toHaveBeenCalledTimes(1);
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("clamps page numbers to valid range", () => {
      const onPageChange = vi.fn();
      // Test with invalid currentPage (too high)
      render(<Pagination currentPage={10} totalPages={5} onPageChange={onPageChange} />);

      // Should clamp to last page
      expect(screen.getByRole("button", { name: "Go to page 5" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      expect(screen.queryByRole("button", { name: "Go to page 10" })).not.toBeInTheDocument();
    });

    it("clamps page numbers to minimum 1", () => {
      const onPageChange = vi.fn();
      // Test with invalid currentPage (too low)
      render(<Pagination currentPage={0} totalPages={5} onPageChange={onPageChange} />);

      // Should clamp to first page
      expect(screen.getByRole("button", { name: "Go to page 1" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("handles zero or negative totalPages", () => {
      const onPageChange = vi.fn();
      render(<Pagination currentPage={1} totalPages={0} onPageChange={onPageChange} />);

      // Should clamp to at least 1 page
      expect(screen.getByRole("button", { name: "Go to page 1" })).toBeInTheDocument();
    });
  });

  describe("Disabled state", () => {
    it("disables previous button on first page", () => {
      const onPageChange = vi.fn();
      render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

      const prevButton = screen.getByRole("button", { name: /previous page/i });
      expect(prevButton).toBeDisabled();
      expect(prevButton).toHaveAttribute("aria-disabled", "true");
    });

    it("disables next button on last page", () => {
      const onPageChange = vi.fn();
      render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);

      const nextButton = screen.getByRole("button", { name: /next page/i });
      expect(nextButton).toBeDisabled();
      expect(nextButton).toHaveAttribute("aria-disabled", "true");
    });

    it("enables prev/next buttons on middle pages", () => {
      const onPageChange = vi.fn();
      render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

      const prevButton = screen.getByRole("button", { name: /previous page/i });
      const nextButton = screen.getByRole("button", { name: /next page/i });

      expect(prevButton).not.toBeDisabled();
      expect(nextButton).not.toBeDisabled();
    });

    it("handles disabled prop on PaginationItem", () => {
      const onPageChange = vi.fn();
      render(
        <Pagination.Root currentPage={2} totalPages={5} onPageChange={onPageChange}>
          <Pagination.Item page={99} disabled onClick={() => onPageChange(99)} />
        </Pagination.Root>,
      );

      const page99 = screen.getByRole("button", { name: "Go to page 99" });
      expect(page99).toBeDisabled();
      expect(page99).toHaveAttribute("aria-disabled", "true");
    });
  });

  describe("Custom ariaLabel", () => {
    it("uses custom ariaLabel when provided", () => {
      const onPageChange = vi.fn();
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={onPageChange}
          ariaLabel="Search results pages"
        />,
      );

      const nav = screen.getByRole("navigation", { name: /search results pages/i });
      expect(nav).toBeInTheDocument();
    });

    it("uses default ariaLabel when not provided", () => {
      const onPageChange = vi.fn();
      render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

      const nav = screen.getByRole("navigation", { name: /pagination/i });
      expect(nav).toBeInTheDocument();
    });
  });
});
