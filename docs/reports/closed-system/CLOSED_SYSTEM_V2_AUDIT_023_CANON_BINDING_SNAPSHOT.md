# Closed System v2 — Audit 023 Canon Binding Snapshot

**Version:** 1.0  
**Date:** 2026-01-27  
**Status:** BLOCK_00 output  
**Master Task:** [.cursor/tasks/master/master_tasks_TOKEN_CLEANING.json](../../../.cursor/tasks/master/master_tasks_TOKEN_CLEANING.json) — TUI_MASTER_CSV2_REPO_AUDIT_AND_FIX_023, BLOCK_00 (Canon & Lock Grounding)

---

## 1. Authority Documents

**Source:** [CLOSED_SYSTEM_V2_CANON_INDEX.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md)

**CANONICAL (HIGHEST)** — Source of truth. Precedence: HIGHEST. Mutation: FORBIDDEN. Must reference for architectural decisions.

| Document | Path |
| -------- | ----- |
| CLOSED_SYSTEM_V2_CANONICAL_PROBLEM_DEFINITION | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_CANONICAL_PROBLEM_DEFINITION.md` |
| CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md` |
| CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md` |
| CLOSED_SYSTEM_V2_PRINCIPLE_TO_MECHANISM_MAPPING | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PRINCIPLE_TO_MECHANISM_MAPPING.md` |
| CLOSED_SYSTEM_V2_READINESS_GATES | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_READINESS_GATES.md` |
| CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON.md` |
| CLOSED_SYSTEM_V2_CONTINUOUS_ENFORCEMENT | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_CONTINUOUS_ENFORCEMENT.md` |
| CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md` |
| CLOSED_SYSTEM_V2_PHASE_D_LOCK | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_D_LOCK.md` |
| CLOSED_SYSTEM_V2_PHASE_E_LOCK | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_E_LOCK.md` |
| CLOSED_SYSTEM_V2_PHASE_F_LOCK | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_F_LOCK.md` |
| CLOSED_SYSTEM_V2_PHASE_H_LOCK | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_H_LOCK.md` |
| CLOSED_SYSTEM_V2_PHASE_I_LOCK | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_I_LOCK.md` |

**SUPPORTING** — Evidence only. Not architectural authority. May reference for historical context / verification.

| Document | Path |
| -------- | ----- |
| PHASE_D_COMPLETION_REPORT | `docs/reports/closed-system/PHASE_D_COMPLETION_REPORT.md` |
| CLOSED_SYSTEM_V2_PHASE_E_COMPOSITION_MIGRATION_REPORT | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_E_COMPOSITION_MIGRATION_REPORT.md` |
| CLOSED_SYSTEM_V2_PHASE_F_EXTENSION_ADOPTION_REPORT | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_F_EXTENSION_ADOPTION_REPORT.md` |

**Conflict resolution:** CANONICAL > SUPPORTING. Do not use SUPPORTING or DEPRECATED as source of rules.

---

## 2. Locks

| Lock | Path |
| ---- | ----- |
| Phase D | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_D_LOCK.md` |
| Phase E | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_E_LOCK.md` |
| Phase F | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_F_LOCK.md` |
| Phase H | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_H_LOCK.md` |
| Phase I | `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_I_LOCK.md` |
| FOUNDATION_LOCK | `docs/architecture/FOUNDATION_LOCK.md` |
| ARCHITECTURE_LOCK | `docs/architecture/ARCHITECTURE_LOCK.md` |

---

## 3. DO NOT (Explicit Prohibitions)

Statements below are constatations from canon and lock documents. No new rules added.

**Phase D (Foundation Public API):**

- No API changes — API surfaces defined in Phase D are immutable.
- No type changes — Type system constraints defined in Phase D are immutable.
- No enforcement changes — Enforcement mechanisms defined in Phase D are immutable.
- No runtime behavior changes — Runtime behavior defined in Phase D is immutable.
- No "small fixes" or "improvements" — All changes require explicit unlock.

**Phase E (COMPOSITION Migration):**

- No changes to COMPOSITION usage — All COMPOSITION Text `tone` usages are immutable.
- No reintroduction of legacy expression paths — Legacy `tone` prop usage is forbidden.
- No type casts or suppressions as workarounds — All TypeScript errors must be resolved through sanctioned APIs.
- No indirect styling or parallel intent channels — All styling must use sanctioned Foundation APIs.

**Phase F (Extension Layer Adoption):**

- No modifications to Extension components — All Extension components are immutable.
- No new Extension adapters — New adapters require explicit architectural unlock.
- No changes to Foundation API consumption patterns — Extension must use only sanctioned Foundation APIs.
- No new expression surfaces — All visual intent must flow through sanctioned Foundation APIs.
- No styling, className, or layout logic in Extension — All styling via Foundation components only.
- No type casts or suppressions.
- No "small fixes" or "improvements".

**Phase H (Layout Semantics):**

- No modifications to Row.wrap behavior — Row.wrap API is immutable.
- No alternative layout escapes via className/style — All layout intent must use sanctioned APIs.
- No layout API extensions without new phase.
- No changes to layout semantics rules — Flow vs stack vs grid rules are locked.
- No modifications to validated Grid/Section/Surface usage patterns — Canonical patterns are immutable.
- No changes to Phase H audit conclusions.
- No "small fixes" or "improvements".

**Phase I (Product Scope Migration):**

- No className/style props on Foundation components in product — Foundation components exclude className/style from public API.
- No introduction of non-canonical presentation patterns — All patterns must use sanctioned Foundation/Composition APIs.
- No modifications to locked screens without UNLOCK_PHASE_I — All 14 screens are immutable.
- No utility-based styling in product — All styling must use token-based props.
- No raw HTML replacement in product — All layout must use Foundation/Composition components.
- No prop smuggling — All prop spreads must be explicitly typed.
- No "small fixes" or "improvements".

**Global (FOUNDATION_LOCK, ARCHITECTURE_LOCK):**

- Foundation is visually and API-closed. Foundation Enforcement LOCKED/APPLIED: `className` and `style` excluded from public API; `Omit<React.*HTMLAttributes, "className" | "style">` required.
- Consumer must not pass `className`, `style`, or untyped prop spread into Foundation.
- Any changes inside Foundation are out of scope for audit/fixes — unlock procedure only.

**Enforcement:**

- No weakening of guards. Stage 1 rules: no eslint-disable allowed.

---

## 4. ALLOWED (Permitted Actions)

- **Consumer-only fixes** — Phase D does not lock consumer; fix violations in consumer code.
- **Authorized follow-up** — Phase E (COMPOSITION migration complete), Extension adoption, release, documentation (per Phase D/E/F).
- **Proposal in backlog without implementation** — When a required token does not exist; no direct implementation.
- **Fix misuse in consumer** — Correct consumer misuse of Foundation/Composition APIs (Phase I scope).
- **Replace raw layout with canonical** — Product-level adoption: migrate to canonical layout (Stack, Row, Grid, Section, Surface, Container, Box) per Phase H "Authorized Follow-up".
- **Strengthen detection of existing violations** — Guards may be strengthened; not weakened.
- **New screens with Closed System v2 compliance** — Per Phase I "Authorized Follow-up".
- **Advisory improvements (warn-only)** — That do not violate Phase I constraints.

---

## 5. Enforcement Guards (Summary)

**Source:** [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md)

**Scope:** Consumer code only — code that imports from `@tenerife.music/ui` or `@tenerife/ui` and is not part of the UI library source. Not `src/` (Foundation, COMPOSITION, Extension). Not `*.stories.*`. Consumer guards were previously configured for `docs-app/**`; `docs-app` has been removed. Consumer guards are currently not active. If consumer code is added, reactivate via dedicated ESLint config.

**Rules and severity:**

| Category | Rules | Severity |
| -------- | ----- | -------- |
| **CRITICAL (Stage 1)** | `no-classname-on-foundation`, `no-style-on-foundation`, `no-prop-spread-into-foundation` | error. eslint-disable not allowed. |
| **MAJOR (Stage 2)** | `no-utility-classes-near-foundation` | warn. Phase G — Layout Normalization; until then, avoid new utility wrappers. |
| **Pre-existing** | `no-raw-html-when-foundation-exists` | error. |

**Use:** Interpret audit logs and classify severity when applying fixes.

---

## Input Artifacts Verified (P0)

All nine input files were verified present before this snapshot:

- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md`
- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_D_LOCK.md`
- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_E_LOCK.md`
- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_F_LOCK.md`
- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_H_LOCK.md`
- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_PHASE_I_LOCK.md`
- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md`
- `docs/architecture/FOUNDATION_LOCK.md`
- `docs/architecture/ARCHITECTURE_LOCK.md`

**BLOCK_00 status:** DONE. **BLOCK_01 (Baseline CI & logs):** GO.
