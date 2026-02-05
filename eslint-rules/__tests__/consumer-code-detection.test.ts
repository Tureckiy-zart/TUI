import path from "node:path";
import { describe, expect, it } from "vitest";
import { isConsumerCode } from "../utils/consumer-code-detection";

const repoRoot = process.cwd();
const fromRepoRoot = (...parts: string[]) => path.join(repoRoot, ...parts);

describe("isConsumerCode", () => {
  it("returns true for consumer app paths", () => {
    expect(isConsumerCode(fromRepoRoot("apps", "web", "src", "pages", "index.tsx"))).toBe(true);
    expect(isConsumerCode(fromRepoRoot("apps", "admin", "src", "features", "dashboard.ts"))).toBe(
      true,
    );
    expect(isConsumerCode(fromRepoRoot("src", "pages", "home.tsx"))).toBe(true);
    expect(isConsumerCode(fromRepoRoot("src", "FEATURES", "auth", "login.tsx"))).toBe(true);
  });

  it("returns false for excluded roots", () => {
    expect(isConsumerCode(fromRepoRoot("packages", "ui", "src", "components", "Button.tsx"))).toBe(
      false,
    );
    expect(isConsumerCode(fromRepoRoot("eslint-rules", "no-classname-on-ui-components.ts"))).toBe(
      false,
    );
    expect(isConsumerCode(fromRepoRoot("packages", "config", "eslint.config.mjs"))).toBe(false);
    expect(isConsumerCode(fromRepoRoot("node_modules", "react", "index.js"))).toBe(false);
  });

  it("handles edge cases safely", () => {
    expect(isConsumerCode("<input>")).toBe(false);
    expect(isConsumerCode("")).toBe(false);
    expect(isConsumerCode("unknown-path/file.ts")).toBe(false);
    expect(
      isConsumerCode(fromRepoRoot("packages", "ui-stories", "src", "Button.stories.tsx")),
    ).toBe(false);
  });
});
