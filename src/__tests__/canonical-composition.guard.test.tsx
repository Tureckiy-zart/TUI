import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AppHeader, Box, Button, NavRoot, Popover, PopoverTrigger } from "@/index";
import { warnOnForbiddenSemanticElement } from "@/COMPOSITION/utils/runtime-guards";

function withProdEnv(run: () => void) {
  const prevEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  try {
    run();
  } finally {
    process.env.NODE_ENV = prevEnv;
  }
}

describe("canonical composition (DEV warnings)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("warns on forbidden semantic elements via Box", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(<Box as="nav" />);
    render(<Box as="header" />);
    render(<Box as="footer" />);
    render(<Box as="main" />);

    expect(warnSpy).toHaveBeenCalledWith("Use NavRoot instead of raw <nav>.");
    expect(warnSpy).toHaveBeenCalledWith("Use AppHeader instead of raw <header>.");
    expect(warnSpy).toHaveBeenCalledWith("Use Footer instead of raw <footer>.");
    expect(warnSpy).toHaveBeenCalledWith(
      "Avoid raw <main> via Box. Use composition-level layout instead.",
    );
  });

  it("warns on NavRoot asChild with <nav>", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <NavRoot aria-label="Main navigation" asChild>
        <nav />
      </NavRoot>,
    );

    expect(warnSpy).toHaveBeenCalledWith("NavRoot already renders <nav>. Do not nest raw <nav>.");
  });

  it("warns on AppHeader invalid child", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <AppHeader>
        <div />
      </AppHeader>,
    );

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("Invalid child detected"));
  });

  it("warns on PopoverTrigger asChild={false} with React element child", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <Popover>
        <PopoverTrigger asChild={false}>
          <Button>Open</Button>
        </PopoverTrigger>
      </Popover>,
    );

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("Popover.Trigger"));
  });

  it("warns using runtime string path (helper default message)", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    warnOnForbiddenSemanticElement("GuardTest", "nav", ["nav"]);

    expect(warnSpy).toHaveBeenCalledWith(
      "[GuardTest] Raw <nav> is forbidden here. Use canonical composition instead.",
    );
  });

  it("does not warn in production for runtime guards", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    withProdEnv(() => {
      warnOnForbiddenSemanticElement("GuardTestProd", "nav", ["nav"]);
    });

    expect(warnSpy).not.toHaveBeenCalled();
  });
});
