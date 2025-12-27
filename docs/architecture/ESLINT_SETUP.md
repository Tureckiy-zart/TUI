# ESLint Setup & Governance

**Date:** 2025-12-18  
**Status:** ✅ **CANONICAL**  
**Authority:** This document defines ESLint's role as architectural enforcement in TenerifeUI.  
**Purpose:** Establish ESLint governance rules, scope boundaries, and autofix policy as architectural invariants.

---

## Purpose

ESLint in TenerifeUI serves as **architectural enforcement**, not merely code quality linting. ESLint rules protect architectural boundaries, enforce Foundation contracts, and prevent regression into forbidden patterns.

**ESLint is part of the system governance layer**, alongside TypeScript type enforcement, CI guards, and Authority Contracts.

---

## ESLint as Architectural Enforcement

### Core Principle

> **ESLint rules enforce architectural law, not style preferences.**

ESLint rules in TenerifeUI exist to:

- **Protect Foundation contracts** - Prevent violations of Foundation component public APIs
- **Enforce layer boundaries** - Ensure rules apply only within their declared scope
- **Prevent architectural regressions** - Block reintroduction of forbidden patterns
- **Maintain Authority compliance** - Verify adherence to Authority Contracts

ESLint is **not** used for:
- Code style preferences (handled by Prettier)
- General code quality (handled by TypeScript and code review)
- Performance optimization (handled by build tools)

### Enforcement Hierarchy

ESLint operates within the enforcement hierarchy:

1. **Authority Contracts** - Define immutable architectural law
2. **Lock Documents** - Define locked components and boundaries
3. **ESLint Rules** - Enforce Authority and Lock compliance
4. **TypeScript** - Compile-time type enforcement
5. **CI Integration** - Automated verification

**Rule:** ESLint rules **MUST** align with Authority Contracts and Lock documents. Rules that contradict Authority or Locks are **misconfigured**, not architectural violations.

---

## Layer Awareness

ESLint rules are **layer-aware** and **scope-bound**. Rules apply differently to different architectural layers:

### Foundation Layer

**Status:** ✅ **LOCKED** (Immutable)

**ESLint Role:**
- Enforce Foundation component contracts (e.g., `className` and `style` exclusion)
- Prevent architectural regressions in Foundation components
- Verify Foundation Enforcement compliance

**Rule Scope:**
- Foundation components are **read-only** except for bug fixes
- ESLint rules protect Foundation contracts from modification
- Rules apply to Foundation component **public APIs**, not internal implementation

**Reference:** [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md)

### Extension Layer

**Status:** ✅ **OPEN** (Evolvable)

**ESLint Role:**
- Encourage token-driven patterns (optional enforcement)
- Prevent Foundation contract violations in Extension components
- Maintain architectural consistency

**Rule Scope:**
- Extension components have **flexibility** within Authority boundaries
- Rules are **advisory** for Extension layer (not mandatory)
- Extension components must not violate Foundation contracts

**Reference:** [EXTENSION_AUTHORITY.md](./EXTENSION_AUTHORITY.md)

### Product Layer

**Status:** ✅ **OPEN** (Consumer code)

**ESLint Role:**
- Enforce Foundation component usage contracts
- Prevent consumer-controlled styling of Foundation components
- Maintain public API compliance

**Rule Scope:**
- Product code **MUST** respect Foundation component public APIs
- Rules prevent Foundation contract violations from consumer code
- Product code cannot bypass Foundation Enforcement

**Reference:** [FOUNDATION_CONTRACT.md](./FOUNDATION_CONTRACT.md)

---

## Rule Scoping Principles

### Scope Authority

The **canonical authority** for ESLint rule scoping is:

→ [eslint_rules_scope_matrix.md](./eslint_rules_scope_matrix.md)

This document defines:
- **WHERE** each rule applies (Foundation, Extension, Product)
- **WHERE** each rule must NOT apply (exclusions)
- **WHAT** architectural problem each rule solves

**Rule:** The scope matrix is **binding**. Any ESLint rule behavior that contradicts the scope matrix is **misconfigured**, not an architectural violation.

### Scope Boundaries

ESLint rules **MUST** respect layer boundaries:

1. **Foundation rules** apply to Foundation components only
2. **Extension rules** apply to Extension components (optional)
3. **Product rules** apply to consumer code only
4. **No rule** may apply outside its declared scope

**Forbidden:**
- Rules that apply to multiple layers without explicit scope declaration
- Rules that leak across layer boundaries
- Rules that enforce patterns outside their domain

**Required:**
- Explicit scope declaration for each rule
- Clear boundaries between Foundation, Extension, and Product
- Scope verification in rule implementation

### Scope Verification

ESLint rules **MUST** verify scope before applying:

- Check file path patterns to determine layer
- Verify rule applicability to current context
- Skip rule application if outside declared scope

**Example:** `no-foundation-classname-style` applies only to Foundation component public APIs, not internal implementation or Extension components.

---

## Autofix Policy

**Reference:** For complete Autofix Policy, see [ESLINT_AUTOFIX_POLICY.md](../../workflows/policies/ESLINT_AUTOFIX_POLICY.md).

### Core Principle

> **Autofix MUST NOT mutate UI library internal implementation.**

### Autofix Restrictions

**FORBIDDEN:**
- Autofix that modifies Foundation component implementation
- Autofix that changes Extension component internal code
- Autofix that alters UI library source files
- Autofix that bypasses Authority Contracts

**ALLOWED:**
- Autofix for consumer/Product code (with caution)
- Autofix for code style (Prettier-managed)
- Autofix for non-architectural violations (with verification)

### Autofix Scope Matrix

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

### Autofix Verification

Before enabling autofix for any rule:

1. **Verify scope** - Autofix must not affect UI library source
2. **Verify Authority compliance** - Autofix must not violate Authority Contracts
3. **Verify Lock compliance** - Autofix must not modify locked components
4. **Test impact** - Verify autofix does not break architectural boundaries

**Rule:** Autofix that mutates UI library internal implementation is **FORBIDDEN**. Autofix is **ALLOWED** only for consumer code and non-architectural violations.

---

## Relationship to FINAL LOCK

### Foundation Lock Integration

ESLint rules are **integrated** with Foundation Lock:

- **Foundation Enforcement** is protected by ESLint rules (`no-foundation-classname-style`, `no-foundation-open-htmlattributes`)
- **Foundation components** are protected from regression by ESLint scope boundaries
- **Foundation contracts** are enforced at lint time, not just compile time

**Reference:** [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md) - Foundation Enforcement Lock Status section

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

**Reference:** [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md) - Unlock Protocol section

---

## Scope Matrix Authority

### Canonical Reference

The **canonical authority** for ESLint rule scoping is:

→ [eslint_rules_scope_matrix.md](./eslint_rules_scope_matrix.md)

This document is **binding** and **authoritative** for:
- Rule applicability (where rules apply)
- Rule exclusions (where rules must NOT apply)
- Architectural problem each rule solves
- Autofix policy per rule

### Scope Matrix Compliance

ESLint rule implementations **MUST** comply with the scope matrix:

- Rules must apply only within declared scope
- Rules must NOT apply outside declared scope
- Rules must solve the architectural problem declared in the matrix

**Rule:** Any ESLint rule behavior that contradicts the scope matrix is **misconfigured**, not an architectural violation. The scope matrix is the **source of truth** for rule scoping.

### Scope Matrix Updates

If rule scoping needs to change:

1. **Update scope matrix first** - Modify canonical authority
2. **Update rule implementation** - Align rule with updated matrix
3. **Verify compliance** - Ensure rule matches matrix declaration
4. **Document changes** - Update both matrix and rule documentation

**Rule:** Scope matrix changes require explicit justification and approval. Rule implementations must follow scope matrix, not vice versa.

---

## When ESLint Appears Wrong

### Misconfiguration vs Violation

When ESLint reports an error, determine:

1. **Is the rule misconfigured?** - Does rule behavior contradict scope matrix or Authority Contracts?
2. **Is the code violating architecture?** - Does code violate Foundation contracts or Authority rules?

### Misconfiguration Indicators

ESLint rule is **misconfigured** if:

- Rule applies outside declared scope (see scope matrix)
- Rule contradicts Authority Contracts
- Rule violates Lock documents
- Rule enforces patterns not declared in scope matrix

**Action:** Report misconfiguration, do not modify code to satisfy misconfigured rule.

### Violation Indicators

Code **violates architecture** if:

- Code violates Foundation component contracts
- Code bypasses Foundation Enforcement
- Code violates Authority Contracts
- Code modifies locked components

**Action:** Fix code to comply with architecture, do not disable rule.

### Resolution Process

1. **Check scope matrix** - Verify rule applicability
2. **Check Authority Contracts** - Verify rule alignment with Authority
3. **Check Lock documents** - Verify rule compliance with Locks
4. **Determine root cause** - Misconfiguration or violation?
5. **Take appropriate action** - Fix misconfiguration or fix code

**Rule:** ESLint errors may indicate **rule misconfiguration**, not code bugs. Always verify rule compliance with scope matrix and Authority Contracts before modifying code.

---

## Governance Rules

### Rule 1: Scope-Bound Enforcement

ESLint rules **MUST** be scope-bound and respect layer boundaries.

- Rules apply only within declared scope
- Rules must NOT leak across layer boundaries
- Scope matrix is canonical authority for rule scoping

**Violation:** Rule that applies outside declared scope is **misconfigured**.

### Rule 2: Autofix Restriction

Autofix **MUST NOT** mutate UI library internal implementation.

- Autofix forbidden for Foundation component implementation
- Autofix forbidden for Extension component internal code
- Autofix allowed only for consumer code (with caution)

**Violation:** Autofix that mutates UI library source is **FORBIDDEN**.

### Rule 3: Authority Alignment

ESLint rules **MUST** align with Authority Contracts and Lock documents.

- Rules cannot override Authority decisions
- Rules cannot bypass Foundation Enforcement
- Rules cannot modify locked components

**Violation:** Rule that contradicts Authority or Lock is **misconfigured**.

### Rule 4: Misconfiguration Recognition

ESLint errors may indicate **rule misconfiguration**, not code bugs.

- Verify rule compliance with scope matrix
- Verify rule alignment with Authority Contracts
- Verify rule compliance with Lock documents

**Violation:** Treating misconfigured rule as code bug is **FORBIDDEN**.

### Rule 5: Unlock Procedure

Changing ESLint behavior affecting Foundation requires unlock procedure.

- Explicit unlock task with justification
- Full audit of affected components and rules
- Explicit approval for changes
- Re-lock with updated documentation

**Violation:** Modifying Foundation-protecting rules without unlock procedure is **FORBIDDEN**.

---

## Linting ESLint Rules

### Purpose

Custom ESLint rules are **configuration code**, not application code. They are excluded from the main project lint pipeline to prevent architectural rules from linting themselves.

### Rules Lint Pipeline

A dedicated lint pipeline exists for custom ESLint rules:

**Command:** `npm run lint:rules`

**Config:** `eslint-rules/eslint.config.mjs`

**Scope:** Only lints files in `eslint-rules/` directory

**Purpose:**
- Prevent silent regressions in rule implementation
- Ensure rule code quality without architectural rule interference
- Keep rule quality checks explicit and opt-in

### Why Rules Are Excluded from Main Lint

`eslint-rules/**` is excluded from the main ESLint pipeline because:

1. **Architectural rules should not lint themselves** - Rules enforce architecture for UI library code, not rule implementation code
2. **Rules are configuration, not source** - Rule files are tooling configuration, not application code
3. **Explicit opt-in** - Rule quality checks are separate from architectural enforcement

### When to Run `lint:rules`

Run `npm run lint:rules` when:

- Creating new custom ESLint rules
- Modifying existing rule implementation
- Verifying rule code quality before committing changes

**Rule:** `lint:rules` is **not** part of the default lint pipeline. It must be run explicitly when working on rule code.

---

## Related Documents

### Authority & Lock Documents

- [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md) - Foundation layer lock (Foundation Enforcement section)
- [FOUNDATION_CONTRACT.md](./FOUNDATION_CONTRACT.md) - Foundation component contract (FINAL/APPLIED)
- [EXTENSION_AUTHORITY.md](./EXTENSION_AUTHORITY.md) - Extension layer boundary contract
- [AUTHORITY_NAVIGATION.md](./AUTHORITY_NAVIGATION.md) - Authority navigation map

### Scope & Enforcement

- [eslint_rules_scope_matrix.md](./eslint_rules_scope_matrix.md) - **Canonical scope authority** for ESLint rules
- [ARCHITECTURE_LOCK.md](./ARCHITECTURE_LOCK.md) - Canonical architecture lock (ESLint Governance section)

### Implementation

- `eslint-rules/no-foundation-classname-style.ts` - Foundation Enforcement rule
- `eslint-rules/no-foundation-open-htmlattributes.ts` - Foundation Enforcement rule
- `eslint-rules/no-raw-tailwind-colors.ts` - Token enforcement rule
- `eslint-rules/no-raw-visual-props.ts` - Token enforcement rule
- `eslint-rules/eslint.config.mjs` - Rules lint configuration

---

## Document Status

**Status:** ✅ **CANONICAL**  
**Version:** 1.0  
**Date Created:** 2025-12-18  
**Authority:** This document is the authoritative source for ESLint governance in TenerifeUI.

**This document MUST NOT be modified without explicit justification and approval.**

---

## Final Statement

ESLint in TenerifeUI is **architectural enforcement**, not code quality linting. ESLint rules protect Foundation contracts, enforce layer boundaries, and prevent architectural regressions.

**ESLint rules are scope-bound, Authority-aligned, and Lock-compliant.**

The scope matrix (`eslint_rules_scope_matrix.md`) is the **canonical authority** for rule scoping. Any ESLint rule behavior that contradicts the scope matrix is **misconfigured**, not an architectural violation.

**ESLint errors may indicate rule misconfiguration, not code bugs.** Always verify rule compliance with scope matrix and Authority Contracts before modifying code.

---

**End of ESLint Setup & Governance Document**

