# T04: DEV-only Warning Strategy

**Status:** ✅ DONE
**Date:** 2026-02-08
**Output:** Strategy defined (declarative only, no code changes).

## Summary

The strategy for DEV-only warnings regarding `className` usage has been defined:
1.  **No console.warn/error** in the initial phase.
2.  **Telemetry only** (see T06).
3.  **Documentation warnings** (in JSDoc and canonical docs) are sufficient for now.
4.  Future enforcement (if needed) will be based on data collected from T06/T07.

## Key Decisions

-   **Avoid Noise:** Console warnings are disruptive and often ignored.
-   **Data First:** Collect usage data before deciding on enforcement.
-   **Education:** Focus on documentation and "discouraged" status in `PUBLIC_EXPORTS_INVENTORY.md`.

## Next Steps

-   Proceed to T05 (Enforcement Decision Matrix).

## Open Questions
- Will message detail for specific components be needed in the future, or are general templates sufficient?

## Canonical References
- `docs/canon/CLASSNAME_INLINESTYLE_GOVERNANCE.md`
- `docs/canon/RUNTIME_GUARDS_CANON.md`
- `docs/canon/CANONICAL_COMPOSITION_ENFORCEMENT.md`
