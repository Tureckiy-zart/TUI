# Breaking Change Policy

**Date Created:** 2025-12-25  
**Status:** ✅ **ACTIVE**  
**Purpose:** Define what constitutes a breaking change and the procedure for handling breaking changes in LOCKED components

---

## Policy Statement

Any changes to public types, public APIs, or component behavior that affect consumers are considered breaking changes. Breaking changes in LOCKED components require explicit unlock procedure and must follow migration guidelines.

---

## What Constitutes a Breaking Change

### Public API Changes

The following changes are **ALWAYS** breaking changes:

- ❌ **Removing props** from existing interfaces
- ❌ **Changing prop types** (e.g., from optional to required, or vice versa)
- ❌ **Changing prop semantics** (e.g., prop behavior changes)
- ❌ **Removing public exports** (components, types, utilities)
- ❌ **Changing public type definitions** (union types, interfaces)
- ❌ **Changing default values** that affect behavior

### Type System Changes

The following type changes are **ALWAYS** breaking changes:

- ❌ **Changing public types** (any changes to exported types)
- ❌ **Narrowing type unions** (removing valid values)
- ❌ **Widening type unions** (if it changes behavior expectations)
- ❌ **Changing type constraints** (generic parameters, type bounds)
- ❌ **Inferring types from implementation** (public types must remain explicit)

### Behavior Changes

The following behavior changes are **ALWAYS** breaking changes:

- ❌ **Changing component semantics** (role, purpose, usage patterns)
- ❌ **Changing interaction patterns** (keyboard navigation, accessibility)
- ❌ **Changing visual behavior** (if it affects user expectations)
- ❌ **Changing state management** (controlled vs uncontrolled behavior)

---

## Breaking Change Procedure for LOCKED Components

### Step 1: Unlock Requirement

**Breaking changes in LOCKED components REQUIRE unlock procedure:**

1. Create explicit unlock task with justification
2. Follow [UNLOCK_POLICY.md](./UNLOCK_POLICY.md) procedure
3. Document breaking change rationale
4. Receive architectural approval

### Step 2: Migration Plan

**Breaking changes REQUIRE migration plan:**

1. **Document affected consumers** - Identify all code using changed API
2. **Create migration guide** - Step-by-step guide for updating code
3. **Provide migration examples** - Code examples showing before/after
4. **Define migration timeline** - Timeline for deprecation and removal

### Step 3: Versioning

**Breaking changes REQUIRE version bump:**

- **Major version bump** (e.g., v1.0.0 → v2.0.0)
- **Semantic versioning** - Follow SemVer principles
- **Changelog entry** - Document breaking changes in CHANGELOG.md

### Step 4: Deprecation Period (If Applicable)

**For gradual migrations, use deprecation period:**

1. **Deprecation notice** - Mark old API as deprecated
2. **Deprecation timeline** - Define when deprecated API will be removed
3. **Migration support** - Provide migration tools or helpers
4. **Documentation** - Update all documentation with migration guidance

---

## Non-Breaking Changes

The following changes are **NOT** breaking changes:

- ✅ **Adding new optional props** (backward compatible)
- ✅ **Adding new variants or sizes** (additive only)
- ✅ **Internal refactoring** (no public API changes)
- ✅ **Documentation improvements** (no behavior changes)
- ✅ **Bug fixes** (fixing incorrect behavior)
- ✅ **Accessibility improvements** (enhancing existing behavior)
- ✅ **Performance improvements** (no behavior changes)

---

## Foundation Lock Integration

### Type Freeze

**Foundation Lock includes Public Type Surface freeze:**

- Public types are part of Foundation architectural contract
- Changes to public types are considered breaking changes
- Public Type Surface is locked after Step 7 (TypeScript System Compliance)
- Type changes require unlock procedure

**Reference:** [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Public Type Surface section

### Breaking Change Policy Alignment

**Breaking Change Policy aligns with Foundation Lock:**

- 🔒 **Breaking Change Policy** — Any changes to public types are considered breaking changes
- 🔒 **Authority Alignment** — Type freeze aligns with Foundation Lock principles
- 🔒 **Lock Compliance** — Breaking changes require unlock procedure

---

## Examples

### Breaking Change Example

**Change:** Removing `variant` prop from Button component

**Impact:**
- All consumers using `variant` prop will break
- TypeScript compilation will fail
- Runtime behavior may change

**Procedure:**
1. Create unlock task with justification
2. Create migration guide showing how to update code
3. Provide migration examples
4. Bump major version (v1.0.0 → v2.0.0)
5. Update CHANGELOG.md with breaking change notice

### Non-Breaking Change Example

**Change:** Adding new `icon` prop to Button component

**Impact:**
- No existing consumers are affected
- New functionality is additive
- Backward compatible

**Procedure:**
1. Add prop to component interface
2. Implement functionality
3. Update documentation
4. Bump minor version (v1.0.0 → v1.1.0)
5. Update CHANGELOG.md with new feature notice

---

## Related Documents

- [UNLOCK_POLICY.md](./UNLOCK_POLICY.md) - Unlock procedure for LOCKED components
- [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation Lock reference
- [VERSIONING_ENFORCEMENT_POLICY.md](./VERSIONING_ENFORCEMENT_POLICY.md) - Versioning and enforcement policy
- [DEPRECATION_POLICY.md](./DEPRECATION_POLICY.md) - Deprecation policy

