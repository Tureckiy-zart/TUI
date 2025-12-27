# ESLint Autofix Policy

**Date Created:** 2025-12-25  
**Status:** ✅ **ACTIVE**  
**Purpose:** Define rules for ESLint autofix behavior to prevent unintended mutations of UI library code

---

## Core Principle

> **Autofix MUST NOT mutate UI library internal implementation.**

---

## Autofix Restrictions

### FORBIDDEN

- Autofix that modifies Foundation component implementation
- Autofix that changes Extension component internal code
- Autofix that alters UI library source files
- Autofix that bypasses Authority Contracts

### ALLOWED

- Autofix for consumer/Product code (with caution)
- Autofix for code style (Prettier-managed)
- Autofix for non-architectural violations (with verification)

---

## Autofix Scope Matrix

| Rule | Foundation | Extension | Product | Autofix Allowed |
|------|------------|-----------|---------|-----------------|
| `no-foundation-classname-style` | ❌ (API only) | ❌ | ✅ | ⚠️ Product only |
| `no-foundation-open-htmlattributes` | ✅ | ❌ | ❌ | ❌ Never |
| `no-raw-tailwind-colors` | ✅ | ⚠️ | ❌ | ❌ Never |
| `no-raw-visual-props` | ✅ | ⚠️ | ❌ | ❌ Never |

**Legend:**
- ✅ = Rule applies
- ⚠️ = Rule applies optionally
- ❌ = Rule does not apply

---

## Autofix Verification

Before enabling autofix for any rule:

1. **Verify scope** - Autofix must not affect UI library source
2. **Verify Authority compliance** - Autofix must not violate Authority Contracts
3. **Verify Lock compliance** - Autofix must not modify locked components
4. **Test impact** - Verify autofix does not break architectural boundaries

**Rule:** Autofix that mutates UI library internal implementation is **FORBIDDEN**. Autofix is **ALLOWED** only for consumer code and non-architectural violations.

---

## Relationship to Foundation Lock

### Foundation Lock Integration

ESLint rules are **integrated** with Foundation Lock:

- **Foundation Enforcement** is protected by ESLint rules (`no-foundation-classname-style`, `no-foundation-open-htmlattributes`)
- **Foundation components** are protected from regression by ESLint scope boundaries
- **Foundation contracts** are enforced at lint time, not just compile time

**Reference:** [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation Enforcement Lock Status section

### Lock Compliance

ESLint rules **MUST** comply with Lock documents:

- Rules cannot override Lock decisions
- Rules cannot bypass Foundation Enforcement
- Rules cannot modify locked components

**Rule:** ESLint rules that violate Lock documents are **misconfigured**. Lock documents override ESLint rule behavior.

### Unlock Procedure

If ESLint rule changes require Foundation Lock modifications:

1. **Explicit unlock task** - Create task with justification
2. **Full audit** - Audit all affected components and rules
3. **Approval** - Receive explicit approval for changes
4. **Implementation** - Update ESLint rules and Lock documents
5. **Re-lock** - Re-apply lock with updated documentation

**Reference:** [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Unlock Protocol section

---

## Related Documents

- [ESLINT_SETUP.md](../../architecture/ESLINT_SETUP.md) - Complete ESLint setup and governance
- [eslint_rules_scope_matrix.md](../../architecture/eslint_rules_scope_matrix.md) - Canonical authority for ESLint rule scoping
- [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) - Foundation Lock reference
- [UNLOCK_POLICY.md](./UNLOCK_POLICY.md) - Unlock procedure policy

