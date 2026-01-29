// src/__tests__/index-public-api-execution.test.ts

describe("Public API barrel execution", () => {
  it("imports root public entry without crashing", async () => {
    await expect(import("../index")).resolves.toBeDefined();
  });

  it("imports layer barrels without crashing", async () => {
    await expect(import("../PRIMITIVES")).resolves.toBeDefined();
    await expect(import("../COMPOSITION")).resolves.toBeDefined();
    await expect(import("../PATTERNS")).resolves.toBeDefined();
  });
});
