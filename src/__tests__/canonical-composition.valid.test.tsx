import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AppHeader, Button, NavItem, NavList, NavRoot, Popover, PopoverTrigger } from "@/index";

describe("canonical composition (valid usage)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not warn for NavRoot canonical usage", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <NavRoot aria-label="Main navigation">
        <NavList>
          <NavItem>Home</NavItem>
        </NavList>
      </NavRoot>,
    );

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("does not warn for AppHeader canonical slots", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <AppHeader>
        <AppHeader.Brand>Brand</AppHeader.Brand>
        <AppHeader.Nav>Nav</AppHeader.Nav>
        <AppHeader.Actions>Actions</AppHeader.Actions>
      </AppHeader>,
    );

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("does not warn for PopoverTrigger with Button child", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <Popover>
        <PopoverTrigger>
          <Button>Open</Button>
        </PopoverTrigger>
      </Popover>,
    );

    expect(warnSpy).not.toHaveBeenCalled();
  });
});
