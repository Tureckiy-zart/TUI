# DOM Boundary Components — Closed System v2

**Project:** @tenerife.music/ui  
**Version:** 1.0  
**Date Created:** 2026-01-27  
**Last Updated:** 2026-01-27  
**Status:** ✅ **CANONICAL**  
**Authority:** CLOSED SYSTEM V2 — CANON  
**Mutability:** IMMUTABLE (changes require Phase I unlock)

---

## Section 1 — Definition

DOM-boundary components are a fixed, explicitly declared subset of components that are allowed to:

- render native HTML elements directly
- forward native DOM attributes
- expose ref to DOM nodes

All other components MUST interact with DOM exclusively through Foundation abstractions.

---

## Section 2 — Why this exists

Closed System v2 forbids hidden rendering channels.

Native DOM access is not compositional.

Uncontrolled DOM access breaks:

- token enforcement
- layout semantics
- accessibility guarantees

---

## Section 3 — Canonical DOM-boundary list (FIXED)

### Canonical DOM-boundary components

The following components are explicitly allowed to cross the DOM boundary:

- Field
- SearchInput
- Combobox
- Dialog
- NextLinkAdapter
- NavLink
- HelperText

This list is CLOSED.
Adding or removing items requires Phase I canon update.

---

## Section 4 — Explicit non-boundary rule

Any component not listed above:

- MUST NOT render native HTML elements directly
- MUST NOT forward arbitrary DOM props
- MUST NOT expose ref to DOM nodes

---

## Section 5 — Relation to enforcement

Violations of this rule are detected under:

- V5_PROP_SMUGGLING

as defined in [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](./CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md)

---

## Cross-References

- Canon index: [CLOSED_SYSTEM_V2_CANON_INDEX.md](./CLOSED_SYSTEM_V2_CANON_INDEX.md)
- Enforcement guards (V5): [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](./CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md)
- Foundation lock: [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md)
