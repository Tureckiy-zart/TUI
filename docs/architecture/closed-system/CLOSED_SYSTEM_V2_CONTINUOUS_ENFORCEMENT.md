# Closed System v2 — Continuous Enforcement

**Project:** @tenerife.music/ui  
**Version:** 1.0  
**Date Created:** 2026-01-27  
**Last Updated:** 2026-01-27  
**Status:** ✅ **CANONICAL**  
**Task ID:** TUI_CSV2_PHASE_J1_CONTINUOUS_ENFORCEMENT_021  
**Phase:** J.1 — Continuous Enforcement & Drift Prevention

---

## Purpose

This document defines **permanent enforcement mechanisms** for Closed System v2 architecture that prevent architectural drift and make violations impossible to merge. It establishes continuous enforcement at the tooling, CI, and canonical documentation levels.

**This document is canonical and defines the operational enforcement policy for Closed System v2.**

---

## Scope

**Enforcement applies to:**
- ✅ Consumer code (`src/DOMAIN/**` and any future consumer code)
- ✅ CI pipeline (quality checks)
- ✅ Audit scripts (`scripts/audit-consumer-violations.ts`)
- ✅ ESLint consumer guards (when consumer code exists)

**Enforcement does NOT apply to:**
- ❌ Foundation source code (`src/PRIMITIVES/**`, `src/FOUNDATION/**`)
- ❌ COMPOSITION source code (`src/COMPOSITION/**`)
- ❌ Storybook files (`*.stories.tsx`)
- ❌ Test files (`*.test.tsx`)

---

## Enforcement Mechanisms Overview

Closed System v2 uses a **multi-layered enforcement approach**:

1. **ESLint Consumer Guards** — Compile-time detection of violations
2. **Audit Scripts** — Static analysis for comprehensive violation scanning
3. **CI Compliance Gate** — Automated blocking of violations in CI pipeline
4. **Canonical Fix Patterns** — Single source of truth for violation fixes

**Reference:** For detailed ESLint guard rules, see [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](./CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md)

**Reference:** For canonical fix patterns, see [CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md](./CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md)

---

## Enforcement Levels (ERROR vs WARN)

Enforcement uses a **staged activation model** with clear severity levels:

### Stage 1 — CRITICAL (ERROR)

**Status:** ✅ **PERMANENT ERROR** — These rules are **ERROR forever** and **MUST NOT** be downgraded.

**Rules:**
- `no-classname-on-foundation` — V1 violation
- `no-style-on-foundation` — V2 violation
- `no-prop-spread-into-foundation` — V5 violation
- `no-raw-html-when-foundation-exists` — V4 violation (pre-existing, not staged)

**Policy:**
- ❌ **No eslint-disable allowed** — Silencing these rules is forbidden
- ❌ **No downgrade to WARN** — These are architectural violations that must be fixed
- ✅ **CI must fail** — Any CRITICAL violation blocks merge
- ✅ **Zero tolerance** — V1_CLASSNAME_ON_FOUNDATION = 0 is the baseline

**Rationale:** These violations directly bypass the Foundation Contract and token system. They represent architectural regressions that cannot be tolerated.

---

### Stage 2 — MAJOR (WARN)

**Status:** ⚠️ **WARN (may be upgraded to ERROR in future phases)**

**Rules:**
- `no-utility-classes-near-foundation` — V3 violation

**Policy:**
- ⚠️ **WARN only** — Does not block merge
- ⚠️ **Avoid new violations** — Do not introduce new V3 violations
- ✅ **eslint-disable allowed** — Only with TODO and migration ticket ID
- ✅ **Prefer fixing over disabling** — Always attempt to fix first

**Upgrade Conditions:**
- May be upgraded to ERROR in future phases (e.g., Phase G — Layout Normalization)
- Upgrade requires explicit phase completion and architectural decision

**Rationale:** Layout-related violations (V3) are deferred to Phase G — Layout Normalization. Until then, WARN prevents new violations while allowing existing code to remain.

---

## CI Integration

**Requirement:** CI pipeline **MUST** include a Closed System Compliance Gate.

**Implementation:**
- **Location:** `.github/workflows/ci.yml` — `quality` job
- **Command:** `pnpm audit:consumer-violations src/`
- **Failure Condition:** Any CRITICAL or ERROR severity violation
- **Output:** Summary of violations printed in CI output

**CI Gate Behavior:**
1. Run audit script on `src/` directory
2. Parse JSON output for violation severity
3. **FAIL CI** if any CRITICAL/ERROR violations found
4. Print summary table in CI output
5. Allow WARN violations (Stage 2) to pass

**Example CI Output:**
```
📊 Closed System Compliance Summary:
  V1 (className on Foundation): 0 violations ✅
  V2 (style on Foundation): 0 violations ✅
  V3 (utility classes): 5 violations (WARN) ⚠️
  V4 (raw HTML): 0 violations ✅
  V5 (prop spread): 0 violations ✅

✅ No CRITICAL violations — CI passed
```

---

## Audit Script Integration

**Script:** `scripts/audit-consumer-violations.ts`

**Purpose:** Comprehensive static analysis of consumer code for Closed System v2 violations.

**Violation Classes Detected:**
- **V1:** `className` on Foundation components
- **V2:** `style` on Foundation components
- **V3:** Utility classes near Foundation components
- **V4:** Raw HTML instead of Foundation components
- **V5:** Prop smuggling via untyped spreads

**Output:**
- JSON summary report: `docs/reports/CLOSED_SYSTEM_V2_CONSUMER_VIOLATION_AUDIT_SUMMARY.json`
- Detailed findings: `docs/reports/CLOSED_SYSTEM_V2_CONSUMER_VIOLATION_AUDIT_DETAILED.json`
- Console summary with severity breakdown

**Usage:**
```bash
# Scan consumer code
pnpm audit:consumer-violations src/

# Scan specific directory
pnpm audit:consumer-violations src/DOMAIN/
```

**Exit Code:**
- `0` — No CRITICAL/ERROR violations (WARN allowed)
- `1` — CRITICAL/ERROR violations found (CI must fail)

---

## eslint-disable Policy

### Stage 1 Rules (ERROR) — FORBIDDEN

**Policy:** ❌ **No eslint-disable allowed**

**Rationale:**
- Stage 1 rules are CRITICAL architectural violations
- Silencing them via disable bypasses enforcement
- All Stage 1 violations must be fixed, not silenced

**Detection:**
- CI may add a check for Stage 1 disables in consumer code
- Any `eslint-disable` for Stage 1 rules is considered a violation

**Exception:** None. Stage 1 violations must be fixed using canonical fix patterns.

---

### Stage 2 Rules (WARN) — ALLOWED WITH RESTRICTIONS

**Policy:** ⚠️ **eslint-disable allowed with restrictions**

**Requirements:**
1. Must use `eslint-disable-next-line` (not file-level disable)
2. Must include TODO comment with migration ticket ID
3. Must prefer fixing over disabling
4. Must document why fix is not immediately possible

**Example:**
```tsx
// TODO: Fix V3 violation — migrate to Stack component (TUI-1234)
// eslint-disable-next-line tui/no-utility-classes-near-foundation
<div className="p-4">
  <Button>Click</Button>
</div>
```

**Rationale:** Stage 2 violations are WARN and may require phased migration. Disable is allowed temporarily with explicit migration plan.

---

## Enforcement Status Summary

| Rule | Stage | Severity | eslint-disable | CI Failure |
|------|-------|----------|----------------|------------|
| `no-classname-on-foundation` | 1 | ERROR | ❌ Forbidden | ✅ Blocks |
| `no-style-on-foundation` | 1 | ERROR | ❌ Forbidden | ✅ Blocks |
| `no-prop-spread-into-foundation` | 1 | ERROR | ❌ Forbidden | ✅ Blocks |
| `no-raw-html-when-foundation-exists` | — | ERROR | ❌ Forbidden | ✅ Blocks |
| `no-utility-classes-near-foundation` | 2 | WARN | ⚠️ Allowed (with TODO) | ❌ Passes |

---

## Related Documents

- [CLOSED_SYSTEM_V2_CANON_INDEX.md](./CLOSED_SYSTEM_V2_CANON_INDEX.md) — Canonical documentation index
- [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](./CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md) — ESLint guard rules
- [CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md](./CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md) — Canonical fix patterns
- [CLOSED_SYSTEM_V2_PHASE_I_LOCK.md](./CLOSED_SYSTEM_V2_PHASE_I_LOCK.md) — Phase I lock with migration patterns
- [FOUNDATION_CONTRACT.md](../FOUNDATION_CONTRACT.md) — Foundation component contract

---

**Last Updated:** 2026-01-27  
**Task ID:** TUI_CSV2_PHASE_J1_CONTINUOUS_ENFORCEMENT_021
