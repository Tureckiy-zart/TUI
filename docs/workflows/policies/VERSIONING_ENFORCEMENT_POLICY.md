# Versioning and Enforcement Policy

**Date Created:** 2025-12-25  
**Status:** ✅ **ACTIVE**  
**Purpose:** Define versioning rules and enforcement phases for Foundation contracts and components

---

## Policy Statement

Foundation contracts establish architectural invariants and are versioned. Breaking changes to contracts require explicit approval, impact analysis, migration documentation, and version increment. Enforcement is applied in phases.

---

## Contract Versioning

### Version Structure

**Current Version:** Foundation Contract is **version 1.0**

**Version Rules:**
- ✅ Version 1.0 establishes architectural invariant for Foundation components
- ✅ Future versions may add clarification to existing rules
- ✅ Future versions may document enforcement mechanisms
- ✅ Future versions may reference implementation examples

### Breaking Changes to Contracts

**Breaking changes to Foundation Contract require:**

1. **Explicit approval** - Architectural decision and approval process
2. **Full impact analysis** - Analysis of all affected components and consumers
3. **Migration documentation** - Complete migration guide for affected code
4. **Version increment** - Contract version must be incremented

**Forbidden:**
- ❌ Breaking changes without approval
- ❌ Breaking changes without impact analysis
- ❌ Breaking changes without migration documentation
- ❌ Breaking changes without version increment

---

## Enforcement Phases

Foundation Contract establishes the **architectural invariant**, and enforcement has been **APPLIED** in the following phases:

### Phase 1: Contract Definition ✅ COMPLETE

**Status:** ✅ **COMPLETE**

**Achievements:**
- ✅ Define Foundation contract
- ✅ Document forbidden mechanisms
- ✅ Establish architectural invariant

### Phase 2: Targeted Research ✅ COMPLETE

**Status:** ✅ **COMPLETE**

**Achievements:**
- ✅ Research enforcement mechanisms
- ✅ Analyze breaking change impact
- ✅ Design migration path

### Phase 3: TypeScript Enforcement ✅ APPLIED

**Status:** ✅ **APPLIED**

**Achievements:**
- ✅ TypeScript-level enforcement implemented
- ✅ Compile-time protection against violations
- ✅ Type system prevents forbidden patterns

### Phase 4: Foundation Regression Guards ✅ APPLIED

**Status:** ✅ **APPLIED**

**Achievements:**
- ✅ ESLint rules for Foundation enforcement
- ✅ Type-level tests for all Foundation components
- ✅ CI enforcement via `typecheck` and `lint:ci` scripts
- ✅ Technical enforcement prevents regression

---

## Enforcement Mechanisms

### TypeScript Enforcement

**Mechanism:** Compile-time type checking

**Protection:**
- ✅ Type system prevents forbidden patterns
- ✅ Public API types enforce contracts
- ✅ Type narrowing prevents violations

### ESLint Enforcement

**Mechanism:** Lint-time rule checking

**Protection:**
- ✅ `no-foundation-classname-style` - Blocks className/style props
- ✅ `no-foundation-open-htmlattributes` - Requires Omit pattern
- ✅ CI enforcement via `lint:ci` script

### Type-Level Tests

**Mechanism:** Compile-time test verification

**Protection:**
- ✅ Type tests use `@ts-expect-error` to ensure violations are rejected
- ✅ All Foundation components have type tests
- ✅ CI enforcement via `typecheck` script

---

## Version Increment Rules

### Major Version (X.0.0)

**When:** Breaking changes to contract

**Requirements:**
- Explicit approval
- Full impact analysis
- Migration documentation
- Version increment

### Minor Version (0.X.0)

**When:** Additive changes (clarifications, examples)

**Requirements:**
- No breaking changes
- Backward compatible
- Documentation updates

### Patch Version (0.0.X)

**When:** Documentation fixes, typo corrections

**Requirements:**
- No functional changes
- No breaking changes
- Documentation only

---

## Enforcement Status

### Current Enforcement Status

**Foundation Enforcement:** ✅ **FINAL/APPLIED**

**Protection Level:**
- ✅ TypeScript enforcement active
- ✅ ESLint enforcement active
- ✅ Type-level tests active
- ✅ CI enforcement active

**Regression Protection:**
- ✅ Technical enforcement prevents reintroduction of violations
- ✅ No manual review needed to catch violations
- ✅ CI will fail on any regression attempt

---

## Related Documents

- [FOUNDATION_CONTRACT.md](../../architecture/FOUNDATION_CONTRACT.md) - Foundation Contract reference
- [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation Lock reference
- [BREAKING_CHANGE_POLICY.md](./BREAKING_CHANGE_POLICY.md) - Breaking change policy
- [ESLINT_AUTOFIX_POLICY.md](./ESLINT_AUTOFIX_POLICY.md) - ESLint autofix policy

