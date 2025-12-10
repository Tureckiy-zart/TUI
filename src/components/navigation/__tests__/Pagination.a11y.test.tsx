import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { axe } from "vitest-axe";

import { Pagination } from "../Pagination";

describe("Pagination accessibility", () => {
  afterEach(() => cleanup());

  it("exposes aria metadata and passes axe checks", async () => {
    const { container } = render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={() => {}}
        ariaLabel="Results pages"
      />,
    );

    const nav = screen.getByRole("navigation", { name: /results pages/i });
    expect(nav).toBeInTheDocument();

    const currentPage = screen.getByRole("button", { name: "Go to page 2" });
    expect(currentPage).toHaveAttribute("aria-current", "page");

    const results = await axe(container);
    (expect(results) as any).toHaveNoViolations();
  });

  it("allows keyboard users to move between pages", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination currentPage={2} totalPages={4} onPageChange={onPageChange} />);

    const nextButton = screen.getByRole("button", { name: /next page/i });
    nextButton.focus();
    await user.keyboard("{Enter}");

    const prevButton = screen.getByRole("button", { name: /previous page/i });
    prevButton.focus();
    await user.keyboard(" ");

    expect(onPageChange).toHaveBeenNthCalledWith(1, 3);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 1);
  });
});
