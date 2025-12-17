# 🔒 Foundation LOCK — Operating Rules

**Status:** ACTIVE  
**Classification:** Canonical Interpretation Rules  
**Authority Level:** Secondary (Derived from INTERNAL_CANONICAL_CONTEXT.md)  
**Scope:** Tenerife UI — Foundation Layer  
**Audience:** Maintainers, Cursor AI, Contributors

---

## 1. Definition

Foundation LOCK is an architectural contract indicating that a component:

- is the **sole allowed solution** in its category
- has **no internal alternatives**
- has a **fixed public contract**
- does **not evolve functionally**
- must remain **architecturally stable**

Foundation LOCK does **not** mean:
> “The code must never be touched.”

Foundation LOCK means:
> **“The contract must not be violated.”**

---

## 2. Foundation LOCKED Components

A component is considered **Foundation LOCKED** if it is:

- listed in `INTERNAL_CANONICAL_CONTEXT.md`
- listed in `FINAL_FOUNDATION_LOCK.md`
- marked as `LOCKED — Immutable`
- classified under **Foundation Layer**

At the current state, Foundation LOCKED components include:

- Modal  
- Tabs  
- Select  
- ContextMenu  
- Toast  

---

## 3. Forbidden Actions (Require UNLOCK)

The following actions are **strictly forbidden** without a formal UNLOCK procedure:

### ❌ Architecture & API
- adding new public props
- adding new variants or modes
- adding new entry points
- changing controlled / uncontrolled behavior
- introducing alternative usage patterns

### ❌ Behavior
- extending capabilities
- relaxing existing constraints
- adding optional behaviors
- increasing configurability

### ❌ Semantics
- changing the role of the component
- allowing usage outside its foundation purpose
- turning a Foundation component into an Extension component

Any of the above actions is considered **UNLOCK**.

---

## 4. Allowed Actions (LOCK-Safe)

The following actions are **explicitly allowed**, provided the public contract remains intact:

### ✅ Documentation
- clarifying purpose
- clarifying usage rules
- documenting guarantees
- documenting restrictions
- improving wording clarity

### ✅ Storybook
- removing playground stories
- defining canonical usage stories
- using Storybook as a visual standard
- removing duplicate or misleading examples

### ✅ Typing
- narrowing types
- removing `any`
- removing unused generics
- improving DX **without changing API**

### ✅ Accessibility
- fixing ARIA attributes
- improving keyboard navigation
- improving screen reader behavior

### ✅ Bug Fixes
- fixing incorrect behavior
- fixing edge cases
- provided the behavior already contradicts the documented contract

### ✅ Internal Refactor
Allowed **only if**:
- public API remains unchanged
- behavior remains unchanged
- no new variants are introduced

---

## 5. What Constitutes UNLOCK

Any of the following is **automatically considered UNLOCK**:

- public API change
- new feature introduction
- behavior expansion
- constraint relaxation
- alternative usage path
- architectural model change

UNLOCK is **not permitted** without:
- explicit architectural decision
- updated authority documents
- new lock state definition

---

## 6. Correct Task Framing

Incorrect:
> “Improve Select component”

Correct:
> “Audit and document Select Foundation behavior”

Correct task types:
- Audit
- Canonicalization
- Hardening
- Documentation finalization
- A11y verification
- Typing cleanup

---

## 7. Purpose of Foundation LOCK

Foundation LOCK exists to:

- prevent infinite base component evolution
- protect the system from variant explosion
- preserve architectural invariants
- allow Extension Layer to evolve freely
- ensure long-term system stability

Foundation LOCK represents an **architectural equilibrium point**.

---

## 8. Golden Rule

> **If there is doubt — it is UNLOCK.  
> If it is UNLOCK — it is forbidden.**

---

## 9. Cursor Enforcement

Cursor AI must:

- reject tasks that violate Foundation LOCK
- propose alternatives within allowed scope
- request UNLOCK procedure when expansion is attempted
- treat Foundation LOCK as highest-priority constraint

---

## 10. Document Status

This document:

- does not override authority contracts
- does not change lock states
- does not permit unlock
- defines **how to operate within existing locks**
- exists to prevent accidental architectural violations
