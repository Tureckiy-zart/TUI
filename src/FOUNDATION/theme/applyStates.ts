"use client";

/**
 * @deprecated
 * Legacy state runtime. DO NOT USE.
 * Use applyStateMatrix instead.
 */
export function updateStateVariablesFromTokens(): void {
  if (process.env.NODE_ENV !== "production") {
    throw new Error("applyStates is deprecated. Use applyStateMatrix.");
  }
}

/**
 * @deprecated
 * Legacy verification helper. DO NOT USE.
 * Use applyStateMatrix verification instead.
 */
export function __checkStateVars(): {
  allSet: boolean;
  missing: string[];
  values: Record<string, string>;
} {
  if (process.env.NODE_ENV !== "production") {
    throw new Error("applyStates is deprecated. Use applyStateMatrix.");
  }

  return { allSet: false, missing: [], values: {} };
}
