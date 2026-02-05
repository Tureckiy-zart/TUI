import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppHeader } from "./AppHeader";

describe("AppHeader", () => {
  it("renders slots correctly", () => {
    render(
      <AppHeader>
        <AppHeader.Brand>Brand</AppHeader.Brand>
        <AppHeader.Nav>Nav</AppHeader.Nav>
        <AppHeader.Actions>Actions</AppHeader.Actions>
      </AppHeader>,
    );
    expect(screen.getByText("Brand")).toBeTruthy();
    expect(screen.getByText("Nav")).toBeTruthy();
    expect(screen.getByText("Actions")).toBeTruthy();
  });

  it("ignores invalid children", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <AppHeader>
        <AppHeader.Brand>Brand</AppHeader.Brand>
        <div>Invalid Child</div>
      </AppHeader>,
    );
    expect(screen.queryByText("Invalid Child")).toBeNull();
    spy.mockRestore();
  });

  it("renders sticky position", () => {
    const { container } = render(
      <AppHeader position="sticky">
        <AppHeader.Brand>Brand</AppHeader.Brand>
      </AppHeader>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders static position by default", () => {
    const { container } = render(
      <AppHeader>
        <AppHeader.Brand>Brand</AppHeader.Brand>
      </AppHeader>,
    );
    // Static header structure
    expect(container.querySelector("nav")).toBeTruthy();
  });
});
