# 📚 TUI Documentation

**Last Updated:** 2026-01-27  
**Purpose:** Central documentation hub for the TUI component library

---
## 🏛️ Foundation Status

**Foundation Authorities are CLOSED and IMMUTABLE.** See [FOUNDATION_LOCK.md](./architecture/FOUNDATION_LOCK.md) for the authoritative Foundation lock status and details. Enforcement and Extension layers are **OPEN** for development.

---

## Canonical Context

`docs/ARCHITECTURE_CONTEXT.md` is the primary source of truth for:
- architecture
- design decisions
- Foundation vs Extension rules
- token system
- styling constraints
- public API rules
- future evolution

Canonical documents are listed in `docs/CANONICAL_DOCUMENTATION_INVENTORY.md`.
Authoritative decisions live in LAW documents per `docs/architecture/DOCUMENTATION_CANON_LOCK.md`.
Use other canonical documents as needed and resolve conflicts using the
document resolution order defined by project rules.

**Important:** Foundation Authorities are **CLOSED** and **IMMUTABLE**. Do not request modifications to Authority Contracts. Only Enforcement mechanisms and Extension components can be developed.

Master tasks and progress tracking exist separately and do not redefine architecture.

---

## Closed System v2 Enforcement

**Continuous Enforcement:** Closed System v2 violations are automatically detected and blocked in CI.

**Key Documents:**
- [CLOSED_SYSTEM_V2_CONTINUOUS_ENFORCEMENT.md](./architecture/closed-system/CLOSED_SYSTEM_V2_CONTINUOUS_ENFORCEMENT.md) — Enforcement mechanisms, ERROR/WARN levels, CI integration
- [CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md](./architecture/closed-system/CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md) — Canonical fix patterns (Wrapper First, Token Props)
- [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](./architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md) — ESLint guard rules

**Reference:** [CLOSED_SYSTEM_V2_CANON_INDEX.md](./architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md) — Complete canonical documentation index

---

## What NOT To Do (For AI Agents)

**CRITICAL:** The following actions are **FORBIDDEN** and will cause CI to fail:

### ❌ Foundation Component Violations

1. **NEVER** pass `className` to Foundation components
   - ❌ `<Button className="custom">` — FORBIDDEN
   - ✅ Use component props: `<Button variant="primary">`

2. **NEVER** pass `style` to Foundation components
   - ❌ `<Button style={{ color: "red" }}>` — FORBIDDEN
   - ✅ Use component props: `<Button variant="destructive">`

3. **NEVER** use untyped prop spreads into Foundation components
   - ❌ `<Button {...props}>` where props is untyped — FORBIDDEN
   - ✅ Explicitly type: `const buttonProps: ButtonProps = {...}`

### ❌ Raw HTML Violations

4. **NEVER** use raw HTML where Foundation components exist
   - ❌ `<div>`, `<p>`, `<button>`, `<section>` — FORBIDDEN
   - ✅ Use Foundation: `<Box>`, `<Text>`, `<Button>`, `<Section>`

### ❌ Utility Class Violations

5. **NEVER** use utility classes on wrappers around Foundation components
   - ❌ `<div className="p-4 bg-red-500"><Button /></div>` — FORBIDDEN
   - ✅ Use Foundation layout: `<Stack padding="lg" background="surface"><Button /></Stack>`

### ❌ Fix Pattern Violations

6. **NEVER** use forbidden fix methods:
   - ❌ CSS modules or styled-components
   - ❌ Custom wrapper components with escape hatches
   - ❌ Type assertions to bypass type checking
   - ❌ eslint-disable for Stage 1 rules (ERROR)

**Always use canonical fix patterns:**
- ✅ **Wrapper First Pattern** — Use Foundation layout components
- ✅ **Token Props Pattern** — Use token-based props

**Reference:** [CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md](./architecture/closed-system/CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md)

---

## Quick Reference

**When fixing violations:**
1. Check violation type (V1-V5)
2. Use canonical fix pattern from [CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md](./architecture/closed-system/CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md)
3. Verify fix follows Wrapper First or Token Props pattern
4. Ensure no CRITICAL/ERROR violations remain (CI will fail)

**When in doubt:**
- Reference [CLOSED_SYSTEM_V2_CONTINUOUS_ENFORCEMENT.md](./architecture/closed-system/CLOSED_SYSTEM_V2_CONTINUOUS_ENFORCEMENT.md)
- Check [CLOSED_SYSTEM_V2_CANON_INDEX.md](./architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md) for complete documentation
