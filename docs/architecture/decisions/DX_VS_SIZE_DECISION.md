# Decision: DX vs Package Size — Tenerife UI Position

**Decision ID:** `DX_VS_SIZE_DECISION`  
**Version:** 1.0  
**Date:** 2026-02-02  
**Status:** DECIDED  
**Authority:** This decision is canonical and binding  
**Source of Truth:** This document is the single source of truth for the DX vs package size position  
**Audit Reference:** [docs/reports/TUI_PACKAGE_SIZE_AUDIT_001.md](../../reports/TUI_PACKAGE_SIZE_AUDIT_001.md)

---

## Executive Summary

Tenerife UI adopts a **DX-first** position: the current npm package size is an intentional trade-off. Full typization, token contracts, and architectural guarantees take priority over unpacked size. Runtime impact is acceptable (~109 KB gzip for minimal usage); optimizations targeting unpacked size are not required.

**Decision:** Current state accepted. No size-focused optimizations at the cost of DX.

---

## Context

Tenerife UI is a **design infrastructure** library, not an end-user UI kit. It provides:

- Token-driven primitives and composition components
- Strong architectural contracts (Foundation + Extension)
- Full TypeScript typization for tokens and components
- Internal Tenerife Music product and experienced frontend developers as primary consumers

The unpacked size (~3.63 MB) can appear large to external observers, but runtime impact and tree-shaking have been validated as correct. This decision clarifies whether size is a problem or an intentional trade-off.

---

## Facts from Audit (TUI_PACKAGE_SIZE_AUDIT_001)

| Metric | Value |
|--------|-------|
| Unpacked size | ~3.47 MB |
| DX weight (types) | ~1.37 MB (37.6%) — zero runtime impact |
| Runtime JS | ~2.14 MB (ESM + CJS dual format) |
| Runtime impact (Button + Text) | ~410 KB raw / ~109 KB gzip |
| Tree-shaking | Working |
| Sourcemaps | Not included |

Reference: [TUI_PACKAGE_SIZE_AUDIT_001.md](../../reports/TUI_PACKAGE_SIZE_AUDIT_001.md)

---

## Decision

**DX-first: current state accepted.**

The npm package size is an intentional trade-off. Optimizations aimed at reducing unpacked size at the expense of DX are not required and are to be refused unless justified by a separate architectural decision.

---

## Rationale

### DX Value (Primary)

1. **Full typization:** Token unions and component props give predictable, autocomplete-friendly APIs and catch errors at build time.
2. **Architectural contracts:** Authority and Lock documents enforce consistency and prevent drift.
3. **Predictability:** Semantic tokens and strict contracts reduce cognitive load as the project grows.
4. **Long-term protection:** Strong DX helps maintain quality and consistency over time.

### Size Cost (Accepted)

1. **Unpacked size:** ~3.47 MB includes ~37.6% type declarations with no runtime cost.
2. **Dual format:** ESM and CJS support doubles JS and type size in the tarball; each consumer uses one format.
3. **Perception:** External reviewers may question the size; internal consumers prioritize DX over npm page aesthetics.

### Runtime Reality (Confirmed)

1. **Tree-shaking:** Works as expected; minimal consumer adds ~109 KB gzip.
2. **Measured impact:** Runtime overhead is known and bounded.
3. **sideEffects:** Correctly configured; no structural issues blocking tree-shaking.
4. **CSS:** Loaded only when explicitly imported.

### Target Audience Alignment

Tenerife UI is optimized for:

- Internal Tenerife Music product
- Experienced frontend developers
- Projects that value strong DX and architectural guarantees

For this audience, DX outweighs unpacked size. "Looks small on npm" is not a primary goal when runtime impact is acceptable.

---

## Deferred Alternatives

The following options are **not** adopted but are recorded for future reference:

1. **Reduce types to shrink unpacked size:** Would degrade DX (weaker typization, fewer guarantees).
2. **Drop dual format (ESM/CJS):** Would limit compatibility; current setup serves both ecosystems.
3. **Subpath exports for heavy components:** Possible future optimization; requires separate analysis and decision.
4. **Selective DX trimming:** May be considered only with strict control and clear benefit; not in scope now.
5. **Size-first pivot:** Would require rethinking the library’s role and architectural principles; out of scope.

---

## Implications

1. **Future "optimize size" proposals:** Reference this document. Refuse optimizations that sacrifice DX unless a new architectural decision overrides this position.
2. **Questions about package size:** Use this decision as the standard response: DX-first, runtime impact acceptable, unpacked size is an intentional trade-off.
3. **Audit status:** TUI_PACKAGE_SIZE_AUDIT_001 is closed. No follow-up optimization tasks are required based on its findings.

---

## Related Documents

- [TUI_PACKAGE_SIZE_AUDIT_001.md](../../reports/TUI_PACKAGE_SIZE_AUDIT_001.md) — Package size audit report
- [ARCHITECTURE_CONTEXT.md](../ARCHITECTURE_CONTEXT.md) — Architecture and design principles
- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md) — Foundation layer constraints
