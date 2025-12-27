# Policies Index

**Date Created:** 2025-12-25  
**Last Updated:** 2025-12-25  
**Status:** ✅ **ACTIVE**  
**Purpose:** Complete index of all process policies in the project

---

## Overview

This document provides a complete index of all process policies used in the Tenerife UI project. Policies define rules, procedures, and guardrails for various aspects of development, documentation, and governance.

---

## Policy Categories

### Process Policies

Policies that define how work is performed and processes are executed.

### Enforcement Policies

Policies that define how rules are enforced and violations are handled.

### Documentation Policies

Policies that define how documentation is created, maintained, and deprecated.

### Governance Policies

Policies that define how governance reviews and retention work.

---

## Complete Policy List

### 1. TUNG Locked Component Change Guard Policy

**File:** [TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md](./TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md)  
**Status:** ✅ **ACTIVE**  
**Priority:** **CRITICAL**  
**Category:** Process / Enforcement

**Purpose:** Prohibit changes to LOCKED components by default, with strict exception protocol for necessary changes.

**Key Points:**
- Default rule: Changes to LOCKED components are FORBIDDEN
- Exception protocol: LOCKED_CHANGE_EXCEPTION with mandatory prerequisites
- Enforcement: CRITICAL violations require immediate rollback

**Related:**
- [LOCKED_CHANGE_EXCEPTION_TEMPLATE.md](./LOCKED_CHANGE_EXCEPTION_TEMPLATE.md) - Exception declaration template
- [UNLOCK_POLICY.md](./UNLOCK_POLICY.md) - Unlock procedure policy

---

### 2. Locked Change Exception Template

**File:** [LOCKED_CHANGE_EXCEPTION_TEMPLATE.md](./LOCKED_CHANGE_EXCEPTION_TEMPLATE.md)  
**Status:** ✅ **ACTIVE**  
**Category:** Process

**Purpose:** Template for declaring exceptions when modifying LOCKED components.

**Key Points:**
- Must be used BEFORE making code changes
- Required fields: reason, pipeline step, risk assessment, rollback strategy
- Includes example exception declaration

**Related:**
- [TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md](./TUNG_LOCKED_COMPONENT_CHANGE_GUARD.md) - Main policy

---

### 3. No Duplication Policy

**File:** [NO_DUPLICATION_POLICY.md](./NO_DUPLICATION_POLICY.md)  
**Status:** ✅ **CANONICAL**  
**Category:** Documentation

**Purpose:** Prevent duplication of rules and content across documentation.

**Key Points:**
- Reference canonical sources instead of restating rules
- Acceptable duplication patterns defined
- Enforcement checklist provided

**Related:**
- [DOCUMENTATION_CANON_LOCK.md](../../architecture/DOCUMENTATION_CANON_LOCK.md) - Documentation structure

---

### 4. ESLint Autofix Policy

**File:** [ESLINT_AUTOFIX_POLICY.md](./ESLINT_AUTOFIX_POLICY.md)  
**Status:** ✅ **ACTIVE**  
**Category:** Enforcement

**Purpose:** Define rules for ESLint autofix behavior to prevent unintended mutations.

**Key Points:**
- Core principle: Autofix MUST NOT mutate UI library internal implementation
- Scope matrix defines autofix rules per component layer
- Verification requirements before enabling autofix

**Related:**
- [ESLINT_SETUP.md](../../architecture/ESLINT_SETUP.md) - ESLint setup reference
- [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation Lock reference

---

### 5. Unlock Policy

**File:** [UNLOCK_POLICY.md](./UNLOCK_POLICY.md)  
**Status:** ✅ **ACTIVE**  
**Category:** Process

**Purpose:** Define formal procedure for unlocking LOCKED components when changes are necessary.

**Key Points:**
- Unlock procedure: explicit task, full audit, approval, implementation, re-lock
- Constraints during unlock period
- Exit criteria for unlock completion

**Related:**
- [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation Lock reference
- [FOUNDATION_LOCK_OPERATING_RULES.md](../../architecture/FOUNDATION_LOCK_OPERATING_RULES.md) - Operating rules

---

### 6. Breaking Change Policy

**File:** [BREAKING_CHANGE_POLICY.md](./BREAKING_CHANGE_POLICY.md)  
**Status:** ✅ **ACTIVE**  
**Category:** Process / Enforcement

**Purpose:** Define what constitutes a breaking change and procedure for handling breaking changes.

**Key Points:**
- Breaking changes: public API changes, type changes, behavior changes
- Procedure: unlock requirement, migration plan, versioning, deprecation period
- Foundation Lock integration: type freeze alignment

**Related:**
- [UNLOCK_POLICY.md](./UNLOCK_POLICY.md) - Unlock procedure
- [VERSIONING_ENFORCEMENT_POLICY.md](./VERSIONING_ENFORCEMENT_POLICY.md) - Versioning policy

---

### 7. Barrel Policy

**File:** [BARREL_POLICY.md](./BARREL_POLICY.md)  
**Status:** ✅ **ACTIVE**  
**Category:** Process

**Purpose:** Define rules for barrel exports (index.ts files) to prevent internal implementation leakage.

**Key Points:**
- Public surface only: export only public components and types
- No internal leakage: hide helpers, variants, context
- Complete public API: export all public components and types

**Related:**
- [FOUNDATION_STEP_PIPELINE.md](../foundation/FOUNDATION_STEP_PIPELINE.md) - Pipeline reference

---

### 8. Storybook Controls Policy

**File:** [STORYBOOK_CONTROLS_POLICY.md](./STORYBOOK_CONTROLS_POLICY.md)  
**Status:** ✅ **ACTIVE**  
**Category:** Process

**Purpose:** Define rules for Storybook controls configuration to ensure controls reflect component's public API.

**Key Points:**
- Select controls for variants and sizes
- Boolean controls for flags
- Text controls for content
- Disabled controls for internal and non-controllable props

**Related:**
- [FOUNDATION_STEP_PIPELINE.md](../foundation/FOUNDATION_STEP_PIPELINE.md) - Pipeline Step 11 reference

---

### 9. Deprecation Policy

**File:** [DEPRECATION_POLICY.md](./DEPRECATION_POLICY.md)  
**Status:** ✅ **ACTIVE**  
**Category:** Documentation / Process

**Purpose:** Define procedure for deprecating documents, components, APIs, or features.

**Key Points:**
- Deprecation notice format
- Pointer to canonical source
- Keep for historical reference
- Update cross-references

**Related:**
- [NO_DUPLICATION_POLICY.md](./NO_DUPLICATION_POLICY.md) - No duplication policy
- [BREAKING_CHANGE_POLICY.md](./BREAKING_CHANGE_POLICY.md) - Breaking change policy

---

### 10. Legacy Component Policy

**File:** [LEGACY_COMPONENT_POLICY.md](./LEGACY_COMPONENT_POLICY.md)  
**Status:** ✅ **ACTIVE**  
**Category:** Process

**Purpose:** Define rules for handling legacy components that violate token-driven architecture.

**Key Points:**
- Export prohibition: legacy components MUST NOT be exported
- Archive location: move to `legacy/` folders
- Public documentation exclusion
- Usage prohibition

**Related:**
- [ARCHITECTURE_CONTEXT.md](../../ARCHITECTURE_CONTEXT.md) - Architecture context
- [DEPRECATION_POLICY.md](./DEPRECATION_POLICY.md) - Deprecation policy

---

### 11. Versioning and Enforcement Policy

**File:** [VERSIONING_ENFORCEMENT_POLICY.md](./VERSIONING_ENFORCEMENT_POLICY.md)  
**Status:** ✅ **ACTIVE**  
**Category:** Process / Enforcement

**Purpose:** Define versioning rules and enforcement phases for Foundation contracts and components.

**Key Points:**
- Contract versioning: version 1.0, breaking changes require approval
- Enforcement phases: Contract Definition, Targeted Research, TypeScript Enforcement, Regression Guards
- Version increment rules: major, minor, patch

**Related:**
- [FOUNDATION_CONTRACT.md](../../architecture/FOUNDATION_CONTRACT.md) - Foundation Contract reference
- [BREAKING_CHANGE_POLICY.md](./BREAKING_CHANGE_POLICY.md) - Breaking change policy

---

### 12. Retention Policy

**File:** [RETENTION_POLICY.md](./RETENTION_POLICY.md)  
**Status:** ✅ **ACTIVE**  
**Category:** Governance

**Purpose:** Define rules for retaining governance review reports and historical documentation.

**Key Points:**
- Keep all review reports indefinitely
- Use for historical comparison
- Reference in future reviews
- Archive naming convention

**Related:**
- [GOVERNANCE_REVIEW_CYCLE.md](../../governance/GOVERNANCE_REVIEW_CYCLE.md) - Governance review cycle

---

## Policy Usage Guide

### When to Reference Policies

- **Before making changes:** Check relevant policies for constraints
- **During refactoring:** Follow process policies (e.g., TUNG_LOCKED_COMPONENT_CHANGE_GUARD)
- **When documenting:** Follow documentation policies (e.g., NO_DUPLICATION_POLICY)
- **During reviews:** Reference governance policies (e.g., RETENTION_POLICY)

### Policy Integration Points

- **Pipeline 18A:** TUNG_LOCKED_COMPONENT_CHANGE_GUARD integrated in STEP 0, 8, 9
- **Cursor Rules:** TUNG_LOCKED_COMPONENT_CHANGE_GUARD integrated in REFACTOR-1
- **Documentation:** Policies referenced in relevant architecture documents

---

## Policy Maintenance

### Adding New Policies

1. Create policy document in `docs/workflows/policies/`
2. Add entry to this index
3. Update relevant integration points (pipeline, rules, etc.)
4. Update DOCUMENTATION_CANON_LOCK.md if structure changes

### Updating Policies

1. Update policy document
2. Update this index if policy status or description changes
3. Update integration points if policy changes affect them

---

## Related Documents

- [DOCUMENTATION_CANON_LOCK.md](../../architecture/DOCUMENTATION_CANON_LOCK.md) - Documentation structure
- [FOUNDATION_STEP_PIPELINE.md](../foundation/FOUNDATION_STEP_PIPELINE.md) - Pipeline 18A reference
- [COMPONENT_CREATION_AND_REFACTOR_CHECKLIST.mdc](../../../.cursor/rules/COMPONENT_CREATION_AND_REFACTOR_CHECKLIST.mdc) - Cursor rules reference

