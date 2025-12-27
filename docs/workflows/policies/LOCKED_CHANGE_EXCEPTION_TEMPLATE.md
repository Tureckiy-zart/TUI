# Locked Change Exception Template

**Purpose:** Template for declaring exceptions when modifying LOCKED components  
**Policy Reference:** [TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md](./TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md)  
**Date Created:** 2025-12-25

---

## Usage

This template should be used in audit reports when a LOCKED component requires changes that violate the default lock policy.

**Location:** Add this section to your audit report (e.g., `docs/reports/audit/<COMPONENT>_BASELINE_REPORT.md`)

**When:** BEFORE making any code changes to the LOCKED component

---

## Template Structure

```markdown
## LOCKED CHANGE EXCEPTION

**Component:** [Component Name]  
**Lock Status:** [LOCKED / PROCESS LOCKED]  
**Exception Date:** [YYYY-MM-DD]  
**Pipeline Step:** [STEP N - Step Name]

### Reason for Exception

[Clear explanation of why exception is necessary. What issue was discovered?]

### Pipeline Step That Revealed the Issue

[Which step of pipeline 18A identified the problem? What validation rule or check failed?]

### Why Current Lock Is Insufficient

[Explanation of why the lock cannot accommodate the required change. What constraint prevents the normal change process?]

### Explicit Statement

**This change violates existing lock by necessity.**

[Additional context if needed]

### Risk Assessment

**Risks:**
- [Risk 1: Description and mitigation]
- [Risk 2: Description and mitigation]
- [Risk 3: Description and mitigation]

**Impact Analysis:**
- [Impact on consumers]
- [Impact on architecture]
- [Impact on other components]

### Rollback Strategy

[Plan for reverting changes if needed. Include steps and verification criteria.]

### Change Scope

**Minimal Delta Required:**
- [Change 1: Description]
- [Change 2: Description]
- [Change 3: Description]

**Change Type:** [Minimal quality refactor / Bug fix / Architectural violation correction]

### Validation Plan

[How will the change be validated? What tests will be run? What pipeline steps will be re-executed?]

### Lock Update Plan

[If change is accepted, how will lock documents be updated? Which documents need updates?]
```

---

## Example

```markdown
## LOCKED CHANGE EXCEPTION

**Component:** Button  
**Lock Status:** LOCKED (Foundation)  
**Exception Date:** 2025-12-25  
**Pipeline Step:** STEP 5 - Token, Size & Variant Consistency

### Reason for Exception

During STEP 5 validation, it was discovered that Button component uses a deprecated token mapping pattern that violates the Token Authority Contract. The component cannot pass pipeline validation without updating the token references.

### Pipeline Step That Revealed the Issue

STEP 5 - Token, Size & Variant Consistency check identified that Button uses `token.legacy.button.color` which is marked as deprecated in Token Authority Contract v2.0.

### Why Current Lock Is Insufficient

The lock was established before Token Authority Contract v2.0 was finalized. The lock prevents changes, but the new contract requires all components to use non-deprecated tokens. This creates a compliance conflict that cannot be resolved without modifying the LOCKED component.

### Explicit Statement

**This change violates existing lock by necessity.**

The change is required for pipeline compliance and cannot be deferred without blocking the entire Foundation layer validation.

### Risk Assessment

**Risks:**
- Low: Token mapping change is internal and does not affect public API
- Low: New token is semantically equivalent to deprecated token
- Medium: Requires verification that all consumers still work correctly

**Impact Analysis:**
- No impact on consumers (internal change only)
- Positive impact on architecture (compliance with Token Authority Contract)
- No impact on other components (isolated change)

### Rollback Strategy

1. Revert token mapping changes
2. Re-run STEP 5 validation
3. Document non-compliance in audit report
4. Create separate task for unlock procedure

### Change Scope

**Minimal Delta Required:**
- Update token reference from `token.legacy.button.color` to `token.button.color.primary`
- Update type imports if needed
- No other changes

**Change Type:** Minimal quality refactor required for pipeline compliance

### Validation Plan

1. Re-run STEP 5 validation
2. Run component tests
3. Verify Storybook stories still render correctly
4. Check that no TypeScript errors are introduced

### Lock Update Plan

If change is accepted:
- Update FOUNDATION_LOCK.md to reflect token mapping change
- Update audit report with change details
- No unlock procedure required (minimal change, no API impact)
```

---

## Notes

- **Always declare exception BEFORE making changes**
- **Keep scope minimal** - Only change what is absolutely necessary
- **Document thoroughly** - Future maintainers need to understand why exception was granted
- **Validate completely** - Re-run affected pipeline steps after changes
- **Update locks** - If change is accepted, update lock documents accordingly

## Related Documents

- [TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md](./TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md) - Main policy document
- [FOUNDATION_STEP_PIPELINE.md](../foundation/FOUNDATION_STEP_PIPELINE.md) - Pipeline 18A reference

