# T05 Enforcement Decision Matrix — className & inline style

## 1. Current State Recap (from T01–T04)
- DEV-only warnings defined (T04).
- DEV-only warnings defined (T04).
- Canonical runtime-safety and canonical composition enforcement closed (T01).

## T05: Enforcement Decision Matrix

**Status:** ✅ DONE
**Date:** 2026-02-08
**Output:** Decision matrix documented.

## Summary

A decision matrix for potential future enforcement has been created to guide future governance decisions.

## Decision Matrix

| Condition | Action | Rationale |
| :--- | :--- | :--- |
| **High abuse rate (>20%)** in Foundation components | Consider lint rule (warn) | Foundation semantics integrity risks. |
| **Moderate abuse (5-20%)** | Analyze use cases | Might indicate missing features in Foundation. |
| **Low abuse (<5%)** in Composition layer | **No Action** (Current) | Acceptable flexibility for composition. |
| **Critical breakage** due to className | Hotfix + Post-mortem | Isolate specific case. |

## Current Stance

-   **Current State:** "Low abuse / No data" (Assumed).
-   **Action:** Collect data (T06/T07) to verify.
-   **Default:** No enforcement.

## Next Steps

-   Proceed to T06 (DEV Visibility & Telemetry).

## 2. Enforcement Axes (zone × environment × mechanism)
Decision matrix is built along the axes:
- **Zone:** Foundation / Composition / Domain
- **Environment:** DEV / CI / PROD
- **Mechanism:** warn / lint / runtime / never

This is a **decision matrix**. It fixes the permissibility/prohibition of mechanisms without implementation.

## 3. Allowed Enforcement Types (warn / lint / runtime / never)
- **warn:** allowed **DEV-only** and only at control points.
- **lint:** allowed **future-only** and only by separate owner decision.
- **runtime:** **forbidden** outside already closed canons; new runtime-guards are not allowed.
- **never:** fixed where enforcement is permanently unacceptable.

## 4. Zone-by-Zone Decision Table
### Foundation
- PROD: runtime/lint forbidden.

### Composition
- DEV: warn allowed at control points.
- CI: lint only future-only, by separate owner decision.
- PROD: runtime/lint forbidden.

### Domain
- DEV: warn forbidden (guidance-only, no-op).
- CI: lint forbidden.
- PROD: runtime/lint forbidden.

## 5. DEV / CI / PROD Matrix
- **DEV:** warn possible only at control points.
- **CI:** lint possible only future-only by separate owner decision.
- **PROD:** enforcement forbidden (no-op).

## 6. Opt-in and Staged Strategies
- **opt-in:** allowed only as future-only and only by separate owner decision.
- **staged:** allowed only within documentation/planning, without implementation.

## 7. Explicit Non-Goals
- No code changes.
- No ESLint rules.
- No new runtime-guards.
- No PROD behavior changes.
- No API changes.

## 8. Open Questions (owner decision required)
1. What conditions are sufficient for lint → runtime transition when unlocking canon?
2. Are opt-in enforcement rules needed for Foundation, and if so — when?

## 9. Status & Next Step
- **status:** DONE
- **next_step:** TBD (by owner decision)
