# TUNG Locked Component Change Guard Policy

**ID:** `TUNG_LOCKED_COMPONENT_CHANGE_GUARD`  
**Version:** 1.0.0  
**Type:** Policy  
**Status:** Active  
**Priority:** Critical  
**Date Created:** 2025-12-25

---

## Objective

Запретить любые изменения в LOCKED компонентах по умолчанию, при этом ввести строгую, формализованную процедуру исключения для случаев, когда новый пайплайн выявляет объективно необходимые изменения, которые невозможно выполнить без выхода за текущий lock.

---

## Scope

### Applies To

- Foundation LOCKED components
- Extension LOCKED components

### Excludes

- Unlocked components
- Components explicitly marked as UNLOCKED in audit report

---

## Default Rule

**Locked Component Change:** FORBIDDEN

**Assumption:** Any change to a LOCKED component is an architectural violation unless explicitly authorized via exception protocol.

---

## Forbidden Actions

The following actions are **FORBIDDEN** for LOCKED components without exception declaration:

- Modifying runtime behavior
- Changing public API
- Altering semantic role
- Adding or removing variants or sizes
- Refactoring internal structure
- Changing token mappings
- Editing files of LOCKED components without exception declaration

---

## Allowed Actions Without Exception

The following actions are **ALLOWED** for LOCKED components without exception declaration:

- Documentation fixes (typos only)
- Comment clarifications that do not alter meaning
- Non-functional formatting (prettier-only)
- Report updates and metadata corrections

---

## Exception Protocol

**Name:** `LOCKED_CHANGE_EXCEPTION`

### Mandatory Prerequisites

Before declaring an exception, ALL of the following must be true:

1. Component is LOCKED
2. New pipeline version is in use
3. Issue cannot be resolved without modifying the LOCKED component

### Required Declaration

**Location:** Audit report  
**Section:** `LOCKED CHANGE EXCEPTION`

**Must Include:**

1. **Reason for exception** - Clear explanation of why exception is necessary
2. **Pipeline step that revealed the issue** - Which step of the pipeline identified the problem
3. **Why current lock is insufficient** - Explanation of why the lock cannot accommodate the required change
4. **Explicit statement:** "This change violates existing lock by necessity"
5. **Risk assessment** - Analysis of risks associated with the change
6. **Rollback strategy** - Plan for reverting changes if needed

### Allowed Change Types

Exceptions are allowed ONLY for:

- Minimal quality refactor required for pipeline compliance
- Bug fix revealed by new validation rules
- Correction of previously undetected architectural violation

### Explicitly Forbidden Even With Exception

Exceptions are **NOT ALLOWED** for:

- Feature expansion
- API redesign
- DX improvements unrelated to compliance
- Aesthetic refactors
- Speculative improvements

### Process Flow

1. **Declare exception BEFORE code changes** - Exception must be documented in audit report before any code modifications
2. **Freeze scope to minimal required delta** - Only the minimal change necessary to resolve the issue
3. **Apply change** - Implement the change after exception is declared
4. **Update audit report with before/after** - Document the change in detail
5. **Re-run affected pipeline steps** - Verify the change resolves the issue
6. **Propagate lock update if and only if change is accepted** - Update lock documents only after change is validated

---

## Enforcement

### Violation Classification

| Violation Type | Severity |
|----------------|----------|
| Unauthorized change | CRITICAL |
| Missing exception declaration | CRITICAL |
| Scope exceeded | BLOCKER |

### On Violation

When a violation is detected:

1. **Immediate rollback required** - All changes must be reverted
2. **Audit report marked as INVALID** - Report cannot be used until violation is resolved
3. **Component lock status temporarily downgraded to UNSAFE** - Component cannot be considered locked until issue is resolved

---

## Documentation

### Must Reference

- [ARCHITECTURE_LOCK.md](../../architecture/ARCHITECTURE_LOCK.md)
- [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md)
- [EXTENSION_STATE.md](../../architecture/EXTENSION_STATE.md)

### Note

This policy applies retroactively to all future pipeline executions.

---

## Completion Criteria

- ✅ Policy is stored as canonical TUNG document
- ✅ Policy is referenced in pipeline documentation
- ✅ Policy is used as guardrail for all LOCKED components
- ✅ Exception protocol is documented and accessible
- ✅ Enforcement mechanisms are in place

---

## Related Documents

- [LOCKED_CHANGE_EXCEPTION_TEMPLATE.md](./LOCKED_CHANGE_EXCEPTION_TEMPLATE.md) - Template for exception declarations
- [COMPONENT_REFACTORING_PIPELINE.md](../foundation/COMPONENT_REFACTORING_PIPELINE.md) - Pipeline 18A integration
- [COMPONENT_CREATION_AND_REFACTOR_CHECKLIST.md](../../../.cursor/rules/COMPONENT_CREATION_AND_REFACTOR_CHECKLIST.mdc) - Cursor rules integration

