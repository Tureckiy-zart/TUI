import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithTheme } from "@/test/test-utils";

import { Timeline, type TimelineItem } from "./Timeline";

describe("Timeline", () => {
  const sampleItems: TimelineItem[] = [
    { id: "1", title: "Project Started", date: "2024-01-01", description: "Initial project setup" },
    {
      id: "2",
      title: "First Milestone",
      date: "2024-02-01",
      description: "Core features completed",
    },
    { id: "3", title: "Beta Release", date: "2024-03-01" },
  ];

  it("renders timeline with items", () => {
    renderWithTheme(<Timeline items={sampleItems} />);
    expect(screen.getByText("Project Started")).toBeInTheDocument();
    expect(screen.getByText("First Milestone")).toBeInTheDocument();
    expect(screen.getByText("Beta Release")).toBeInTheDocument();
  });

  it("renders item dates", () => {
    renderWithTheme(<Timeline items={sampleItems} />);
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("2024-02-01")).toBeInTheDocument();
    expect(screen.getByText("2024-03-01")).toBeInTheDocument();
  });

  it("renders item descriptions when provided", () => {
    renderWithTheme(<Timeline items={sampleItems} />);
    expect(screen.getByText("Initial project setup")).toBeInTheDocument();
    expect(screen.getByText("Core features completed")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    renderWithTheme(<Timeline items={sampleItems} />);
    const betaRelease = screen.getByText("Beta Release");
    expect(betaRelease).toBeInTheDocument();
    // Beta Release has no description, so description text should not be present
    expect(screen.queryByText(/Beta Release description/i)).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = renderWithTheme(
      <Timeline items={sampleItems} className="custom-class" />,
    );
    const timelineContainer = container.firstChild;
    expect(timelineContainer).toHaveClass("custom-class");
  });

  it("renders empty timeline without errors", () => {
    renderWithTheme(<Timeline items={[]} />);
    expect(screen.queryByText("Project Started")).not.toBeInTheDocument();
  });

  it("renders each item with unique key", () => {
    const { container } = renderWithTheme(<Timeline items={sampleItems} />);
    const items = container.querySelectorAll("li");
    expect(items).toHaveLength(3);
  });

  it("renders items in order", () => {
    renderWithTheme(<Timeline items={sampleItems} />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings[0]).toHaveTextContent("Project Started");
    expect(headings[1]).toHaveTextContent("First Milestone");
    expect(headings[2]).toHaveTextContent("Beta Release");
  });

  it("renders timeline dots for each item", () => {
    const { container } = renderWithTheme(<Timeline items={sampleItems} />);
    const dots = container.querySelectorAll('[class*="rounded-full"]');
    expect(dots.length).toBe(3);
  });

  it("renders connector lines between items", () => {
    const { container } = renderWithTheme(<Timeline items={sampleItems} />);
    // Connector lines are rendered for all items except the last one
    const connectors = container.querySelectorAll('[class*="w-px"]');
    expect(connectors.length).toBe(2); // 3 items = 2 connectors
  });

  it("does not render connector line after last item", () => {
    const singleItem: TimelineItem[] = [{ id: "1", title: "Single Event", date: "2024-01-01" }];
    const { container } = renderWithTheme(<Timeline items={singleItem} />);
    const connectors = container.querySelectorAll('[class*="w-px"]');
    expect(connectors.length).toBe(0);
  });

  it("handles items with only required fields", () => {
    const minimalItems: TimelineItem[] = [
      { id: "1", title: "Event 1", date: "2024-01-01" },
      { id: "2", title: "Event 2", date: "2024-02-01" },
    ];
    renderWithTheme(<Timeline items={minimalItems} />);
    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("Event 2")).toBeInTheDocument();
  });

  it("handles items with all fields including description", () => {
    const fullItems: TimelineItem[] = [
      {
        id: "1",
        title: "Event 1",
        date: "2024-01-01",
        description: "Full description for event 1",
      },
    ];
    renderWithTheme(<Timeline items={fullItems} />);
    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("Full description for event 1")).toBeInTheDocument();
  });

  it("uses semantic HTML (ol and li elements)", () => {
    const { container } = renderWithTheme(<Timeline items={sampleItems} />);
    const list = container.querySelector("ol");
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute("role", "list");
    const listItems = container.querySelectorAll("li");
    expect(listItems).toHaveLength(3);
  });

  it("has proper list structure for screen readers", () => {
    renderWithTheme(<Timeline items={sampleItems} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.tagName).toBe("OL");
  });

  it("hides decorative elements from screen readers", () => {
    const { container } = renderWithTheme(<Timeline items={sampleItems} />);
    const decorativeContainer = container.querySelector('[aria-hidden="true"]');
    expect(decorativeContainer).toBeInTheDocument();
  });
});
