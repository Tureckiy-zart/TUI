# Unlock Policy

**Date Created:** 2025-12-25  
**Status:** ✅ **ACTIVE**  
**Purpose:** Define formal procedure for unlocking LOCKED components when changes are necessary

---

## Policy Statement

Any changes to LOCKED components require explicit Foundation Unlock procedure with new versioned pipeline. LOCKED components are immutable by default and cannot be modified without following the formal unlock process.

---

## Scope

### Applies To

- Foundation LOCKED components
- Extension LOCKED components
- Process LOCKED components

### Unlock Types

1. **Legacy Unlock** - For components that were declared LOCKED but never passed canonical pipeline
2. **Functional Unlock** - For functional, behavioral, accessibility-semantic, or public API changes
3. **Migration Unlock** - For components requiring canonical migration to Foundation standards

---

## Unlock Procedure

### Step 1: Explicit Unlock Task

**Requirement:** Create formal unlock task with:

- Task identifier (e.g., `TUNG_FOUNDATION_LEGACY_UNLOCK_01`)
- Component name and path
- Unlock reason (detailed justification)
- Migration path (if applicable)
- Constraints during unlock
- Exit criteria

### Step 2: Full Audit

**Requirement:** Complete comprehensive audit:

- Baseline snapshot (STEP 0)
- Full pipeline execution (Steps 0-13 for Foundation, Steps 0-11 for Extension)
- Impact analysis on dependent components
- Authority Contract compliance check

### Step 3: Approval

**Requirement:** Receive explicit approval:

- Architectural review
- Risk assessment approval
- Migration plan approval (if applicable)

### Step 4: Implementation

**Requirement:** Implement changes:

- Follow constraints defined in unlock task
- No public API expansion (unless explicitly approved)
- No new variants or sizes (unless explicitly approved)
- No behavior changes outside canonicalization (unless explicitly approved)
- No bypass of Authority Contracts

### Step 5: Re-lock

**Requirement:** Re-apply lock after changes:

- Complete full pipeline (Steps 0-13 or 0-11)
- Create Foundation lock report
- Lock public type surface
- Update component status to FOUNDATION · LOCKED
- Update FOUNDATION_LOCK.md or EXTENSION_STATE.md

---

## Constraints During Unlock

### Default Constraints

During unlock period, the following are **FORBIDDEN** unless explicitly approved:

- ❌ Public API expansion
- ❌ New variants or sizes
- ❌ Behavior changes outside canonicalization
- ❌ Bypass of Authority Contracts
- ❌ Breaking changes without migration path

### Legacy Unlock Constraints

For legacy unlocks (components never passed canonical pipeline):

- ✅ Canonicalization changes allowed
- ✅ Authority Contract compliance fixes allowed
- ✅ Pipeline compliance fixes allowed
- ❌ Feature additions forbidden
- ❌ API redesign forbidden

---

## Exit Criteria

Component unlock is complete when ALL of the following are met:

1. ✅ Component completes full pipeline (Steps 0-13 for Foundation, Steps 0-11 for Extension)
2. ✅ Foundation lock report exists
3. ✅ Public type surface is locked
4. ✅ Component is re-marked as FOUNDATION · LOCKED or PROCESS LOCKED
5. ✅ All Authority Contracts are compliant
6. ✅ All tests pass
7. ✅ Storybook coverage is complete

---

## Unlock Documentation

### Required Documentation

1. **Unlock Task** - Formal task with identifier and justification
2. **Unlock Date** - Date when unlock was approved
3. **Unlock Reason** - Detailed explanation of why unlock is necessary
4. **Migration Path** - Steps to achieve canonical status (if applicable)
5. **Constraints** - List of constraints during unlock period
6. **Exit Criteria** - Conditions for re-locking

### Update Locations

After unlock approval, update:

- `docs/architecture/FOUNDATION_LOCK.md` - For Foundation components
- `docs/architecture/EXTENSION_STATE.md` - For Extension components
- Component status in relevant state documents

---

## Examples

### Legacy Unlock Example

**Component:** ContextMenu  
**Status:** ✅ **PROCESS LOCKED** (Migration Complete)  
**Unlock Date:** 2025-12-19  
**Lock Date:** 2025-12-25  
**Task:** TUNG_FOUNDATION_LEGACY_UNLOCK_01  
**Pipeline:** Pipeline 18A (Steps 0-12 complete)  
**Audit Report:** `docs/reports/audit/CONTEXTMENU_BASELINE_REPORT.md`

**Unlock Reason (Historical):** ContextMenu was declared as LOCKED but was implemented using legacy patterns and never passed the canonical Foundation Step Pipeline (0–13). The current lock is declarative only and blocks required migration.

**Migration Path (Completed):** ContextMenu underwent canonical Foundation Step Pipeline (Steps 0–12) and achieved full compliance with all Authority Contracts and canonical lifecycle requirements.

**Migration Results:**
- ✅ CVA migrated from `cva` to `tokenCVA` (Decision Matrix RULE 1)
- ✅ 3 canonical stories added (Matrix, States, LongContent)
- ✅ Full Radix delegation verified (a11y, keyboard, focus)
- ✅ Size inheritance pattern via Context (DX improvement)
- ✅ 100% token compliance verified
- ✅ 380 tests + 10 Storybook stories

**Constraints During Unlock (Applied):**
- ✅ No public API expansion (respected)
- ✅ No new variants or sizes (respected)
- ✅ No behavior changes outside canonicalization (respected)
- ✅ No bypass of Authority Contracts (respected)

**Exit Criteria (Achieved):** Component completed Steps 0–12, audit report exists (`CONTEXTMENU_BASELINE_REPORT.md`), Public Type Surface locked, Component re-marked as PROCESS LOCKED

---

## Related Documents

- [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation Lock reference
- [FOUNDATION_LOCK_OPERATING_RULES.md](../../architecture/FOUNDATION_LOCK_OPERATING_RULES.md) - Operating rules for locked components
- [EXTENSION_STATE.md](../../architecture/EXTENSION_STATE.md) - Extension component state
- [FOUNDATION_STEP_PIPELINE.md](../foundation/FOUNDATION_STEP_PIPELINE.md) - Pipeline 18A reference
- [TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md](./TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md) - Locked component change guard policy

