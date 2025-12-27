import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { List, type ListItem } from "./List";

describe("List", () => {
  const sampleItems: ListItem[] = [
    { id: "1", title: "Event 1", description: "Description for event 1" },
    { id: "2", title: "Event 2", description: "Description for event 2" },
    { id: "3", title: "Event 3" },
  ];

  it("renders list with items", () => {
    renderWithTheme(<List items={sampleItems} />);
    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("Event 2")).toBeInTheDocument();
    expect(screen.getByText("Event 3")).toBeInTheDocument();
  });

  it("renders item descriptions when provided", () => {
    renderWithTheme(<List items={sampleItems} />);
    expect(screen.getByText("Description for event 1")).toBeInTheDocument();
    expect(screen.getByText("Description for event 2")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    renderWithTheme(<List items={sampleItems} />);
    const event3 = screen.getByText("Event 3");
    expect(event3).toBeInTheDocument();
    // Event 3 has no description, so description text should not be present
    expect(screen.queryByText(/Description for event 3/i)).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = renderWithTheme(<List items={sampleItems} className="custom-class" />);
    const listContainer = container.firstChild;
    expect(listContainer).toHaveClass("custom-class");
  });

  it("renders empty list without errors", () => {
    renderWithTheme(<List items={[]} />);
    expect(screen.queryByText("Event 1")).not.toBeInTheDocument();
  });

  it("renders each item with unique key", () => {
    const { container } = renderWithTheme(<List items={sampleItems} />);
    const items = container.querySelectorAll("li");
    expect(items).toHaveLength(3);
  });

  it("renders items in order", () => {
    renderWithTheme(<List items={sampleItems} />);
    const items = screen.getAllByRole("heading", { level: 3 });
    expect(items[0]).toHaveTextContent("Event 1");
    expect(items[1]).toHaveTextContent("Event 2");
    expect(items[2]).toHaveTextContent("Event 3");
  });

  it("uses semantic HTML (ul and li elements)", () => {
    const { container } = renderWithTheme(<List items={sampleItems} />);
    const list = container.querySelector("ul");
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute("role", "list");
    const listItems = container.querySelectorAll("li");
    expect(listItems).toHaveLength(3);
  });

  it("has proper list structure for screen readers", () => {
    renderWithTheme(<List items={sampleItems} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.tagName).toBe("UL");
  });
});
