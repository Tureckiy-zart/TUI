/**
 * FOUNDATION/theme/applyStateMatrix execution test.
 * Executes updateStateMatrixFromTokens for day and night modes.
 */

import { it } from "vitest";

import { updateStateMatrixFromTokens } from "@/FOUNDATION/theme/applyStateMatrix";

it("executes updateStateMatrixFromTokens", () => {
  updateStateMatrixFromTokens("day");
  updateStateMatrixFromTokens("night");
});
