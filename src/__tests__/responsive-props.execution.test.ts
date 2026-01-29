/**
 * responsive-props execution test.
 * Executes getBaseValue and isResponsiveValue.
 */

import { it } from "vitest";

import { getBaseValue, isResponsiveValue } from "@/FOUNDATION/lib/responsive-props";

it("resolves responsive props", () => {
  getBaseValue(1);
  getBaseValue({ base: 2 });
  getBaseValue({ sm: 1, md: 2 });
  isResponsiveValue({ sm: 1 });
  isResponsiveValue(1);
});
