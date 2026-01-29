/**
 * typography-color-policy (ESLint rule) execution test.
 * Imports rule and asserts meta shape.
 */

import { expect, it } from "vitest";

import rule from "../../eslint-rules/typography-color-policy";

it("validates typography color policy", () => {
  expect(rule).toBeDefined();
  expect(rule.meta).toBeDefined();
  expect(rule.meta?.type).toBe("problem");
});
