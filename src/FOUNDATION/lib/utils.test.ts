import { cn } from "./utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("class1", "class2");
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });

  it("should handle conditional classes", () => {
    const result = cn("base", true && "conditional", false && "hidden");
    expect(result).toContain("base");
    expect(result).toContain("conditional");
    expect(result).not.toContain("hidden");
  });

  it("should handle undefined and null values", () => {
    const result = cn("base", undefined, null, "valid");
    expect(result).toContain("base");
    expect(result).toContain("valid");
  });
});
