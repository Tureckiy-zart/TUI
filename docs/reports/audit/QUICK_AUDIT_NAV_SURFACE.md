# Quick Audit: Navigation Overlays & Surface Containers

**Task ID:** TUI_QUICK_AUDIT_NAV_SURFACE  
**Date:** 2026-02-09  
**Mode:** DOCS (Documentation only, no refactoring)  
**Priority:** P0

---

## Executive Summary

This audit verifies and freezes correct usage boundaries between closely related components:
- **NAVIGATION_OVERLAYS:** Menu, Dropdown, ContextMenu
- **SURFACE_CONTAINERS:** Panel, Section

**Status:** ✅ **VERIFIED**  
**Outcome:** All boundaries verified, no violations found, usage matrix confirmed up-to-date
**Re-verified:** Section composition-only wording and Container note are consistent with current documentation

**Audit Type:** Re-audit (verification of previously established boundaries)

---

## Block 1: NAVIGATION_OVERLAYS

### Components Audited
- `Menu` (`src/COMPOSITION/navigation/Menu/Menu.tsx`)
- `Dropdown` (`src/COMPOSITION/overlays/Dropdown/Dropdown.tsx`)
- `ContextMenu` (`src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx`)

### Audit Results

#### ✅ Menu Component
**Status:** OK (verified)

**Findings:**
- **Current State:** Menu is correctly defined as Radix-based component for explicit user-invoked action/navigation lists with full ARIA menu semantics
- **Documentation:** Clear IS/IS NOT boundaries documented in component file
- **Code Comments:** All comments correctly reflect usage boundaries
- **Stories:** Examples demonstrate correct usage (explicit user-invoked menus only)
- **No Violations:** Component documentation and implementation align with established boundaries

**Decisions:**
- Menu is used ONLY for explicit user-invoked action/navigation lists
- Menu provides full ARIA menu semantics (`role="menuitem"`)
- Menu is NOT used for context menus (right-click) → Use `ContextMenu`
- Menu is NOT used for generic dropdowns → Use `Dropdown`

**Canonical Definition:**
> Menu is a Radix-based component for explicit user-invoked action/navigation lists with full ARIA menu semantics.

**Forbidden Use Cases:**
- Context menus (right-click / long-press) → Use `ContextMenu`
- Generic dropdown actions without menu semantics → Use `Dropdown`
- Form controls with selection semantics → Use `Select` or form controls

---

#### ✅ Dropdown Component
**Status:** OK (verified)

**Findings:**
- **Current State:** Dropdown correctly positioned as generic action container without menu semantics
- **Documentation:** Clear IS/IS NOT boundaries documented in component file
- **Code Comments:** All comments correctly reflect usage boundaries (no menu semantics, no right-click)
- **Stories:** Examples demonstrate correct usage (generic action lists without menu semantics)
- **No Violations:** Component documentation and implementation align with established boundaries

**Decisions:**
- Dropdown is used ONLY as trigger + floating list abstraction
- Dropdown does NOT replace Menu semantics (no `role="menuitem"`)
- Dropdown does NOT replace ContextMenu (no right-click behavior)

**Canonical Definition:**
> Dropdown is a semantic composition over Popover that provides subcomponents for generic action lists without menu-specific ARIA roles.

**Forbidden Use Cases:**
- Menu replacement (when menu semantics are needed) → Use `Menu`
- ContextMenu replacement (right-click behavior) → Use `ContextMenu`
- Form controls with selection semantics → Use `Select` or form controls

---

#### ✅ ContextMenu Component
**Status:** OK (verified)

**Findings:**
- **Current State:** ContextMenu correctly defined for right-click/long-press actions
- **Documentation:** Clear IS/IS NOT boundaries documented in component file
- **Code Comments:** All comments correctly reflect usage boundaries (right-click/long-press only, not generic dropdown)
- **Stories:** Examples demonstrate correct usage (right-click menus)
- **No Violations:** Component documentation and implementation align with established boundaries

**Decisions:**
- ContextMenu is used ONLY for secondary / right-click / long-press actions
- ContextMenu is NOT used as generic dropdown → Use `Dropdown`
- ContextMenu is NOT used as explicit menu → Use `Menu`

**Canonical Definition:**
> ContextMenu is a Radix-based component for secondary actions triggered by right-click or long-press gestures.

**Forbidden Use Cases:**
- Generic dropdown (explicit trigger click) → Use `Dropdown`
- Explicit menu (user-invoked via button) → Use `Menu`
- Primary navigation menus → Use `Menu`

---

### Block 1 Summary

**Outcome:** ✅ **OK** (all boundaries verified)

**Violations Found:** 0  
**Violations Fixed:** 0 (previous violations already fixed)  
**Decisions Recorded:** 3 (one per component) - all verified

**Usage Matrix:** Created in `docs/reference/COMPONENT_USAGE_MATRIX.md`

---

## Block 2: SURFACE_CONTAINERS

### Components Audited
- `Panel` (`src/COMPOSITION/layout/Panel/Panel.tsx`)
- `Section` (`src/COMPOSITION/layout/Section/Section.tsx`)

### Audit Results

#### ✅ Panel Component
**Status:** OK (verified)

**Findings:**
- **Current State:** Panel correctly defined as lightweight structural surface container
- **Documentation:** Clear IS/IS NOT boundaries documented in component file, distinction from Section clarified
- **Code Comments:** All comments correctly reflect usage boundaries and nesting rules
- **Stories:** Examples demonstrate correct usage (grouping content inside page, Panel inside Section)
- **Nesting Rules:** Correctly documented (Panel inside Section allowed, Panel inside Panel forbidden)
- **No Violations:** Component documentation and implementation align with established boundaries

**Decisions:**
- Panel is used for grouping related content inside a page
- Panel does NOT introduce hierarchy stronger than Card
- Panel is allowed inside Section
- Panel is NOT allowed inside another Panel

**Canonical Definition:**
> Panel is a lightweight structural surface container for grouping related content inside a page, providing surface styling without interactivity.

**Forbidden Use Cases:**
- Page-level semantic separation → Use `Section`
- Structured content with Header/Body/Footer → Use `Card`
- Visual identity responsibility → Panel is structural, not visual identity
- Stronger hierarchy than Card → Panel is lighter than Card

**Nesting Rules:**
- ✅ Panel inside Section: **ALLOWED**
- ❌ Section inside Panel: **FORBIDDEN**
- ❌ Panel inside Panel: **FORBIDDEN**

---

#### ✅ Section Component
**Status:** OK (verified)

**Findings:**
- **Current State:** Section correctly defined as page-level block container
- **Documentation:** Clear IS/IS NOT boundaries documented in component file, distinction from Panel clarified
- **Code Comments:** All comments correctly reflect usage boundaries and nesting rules
- **Stories:** Examples demonstrate correct usage (page-level semantic separation, Section can contain Panel)
- **Nesting Rules:** Correctly documented (Panel inside Section allowed, Section inside Panel forbidden, Section inside Section allowed)
- **No Violations:** Component documentation and implementation align with established boundaries

**Decisions:**
- Section is used for page-level semantic separation
- Section does NOT carry visual identity responsibility
- Section can contain Panel components
- Section is NOT allowed inside Panel

**Canonical Definition:**
> Section is a page-level block container for vertical page rhythm and semantic separation.

**Forbidden Use Cases:**
- Content grouping inside a page → Use `Panel`
- Visual identity responsibility → Section is structural, not visual
- Grid layout → Section uses Stack internally, not Grid
- Variant-driven styling → Section is structural, not variant-driven

**Nesting Rules:**
- ✅ Panel inside Section: **ALLOWED**
- ✅ Section inside Section: **ALLOWED** (for nested page sections)
- ❌ Section inside Panel: **FORBIDDEN**

---

### Block 2 Summary

**Outcome:** ✅ **OK** (all boundaries verified)

**Violations Found:** 0  
**Documentation Enhancements:** 0 (previous enhancements already applied)  
**Decisions Recorded:** 2 (one per component) - all verified

**Usage Matrix:** Created in `docs/reference/COMPONENT_USAGE_MATRIX.md`

---

## Usage Matrix

**Location:** `docs/reference/COMPONENT_USAGE_MATRIX.md`

The usage matrix provides:
- One-sentence definition per component
- Explicit allowed usage scenarios
- Explicit forbidden usage scenarios
- Canonical examples for each component
- Decision matrix for common scenarios
- Nesting rules for Panel and Section

---

## Verification Results

### Code Comments Verified

All component files verified to have correct documentation:
1. **Menu.tsx** - ✅ Clear IS/IS NOT boundaries, correct usage examples
2. **Menu.stories.tsx** - ✅ Correct description (explicit user-invoked lists only)
3. **Dropdown.tsx** - ✅ Reference to usage matrix, clear IS/IS NOT documentation
4. **ContextMenu.tsx** - ✅ Clear IS/IS NOT boundaries, reference to usage matrix
5. **Panel.tsx** - ✅ Distinction from Section, nesting rules, reference to usage matrix
6. **Section.tsx** - ✅ Distinction from Panel, nesting rules, reference to usage matrix

### Documentation Verified

1. **COMPONENT_USAGE_MATRIX.md** - ✅ Complete usage matrix with allowed/forbidden scenarios, canonical examples, and decision matrix
2. **QUICK_AUDIT_NAV_SURFACE.md** - ✅ Audit report up-to-date with verification results

### Real Usage Verification

- **Stories:** All stories demonstrate correct usage patterns
- **Tests:** No violations found in test files
- **Nesting:** No violations of nesting rules found in codebase

---

## Freeze Statement

**Status:** 🔒 **FROZEN**

No semantic overlap is allowed between these components without explicit audit. Any new component that might overlap with these boundaries must:

1. Undergo semantic boundary audit
2. Document explicit differences from existing components
3. Update `docs/reference/COMPONENT_USAGE_MATRIX.md` with new boundaries
4. Reference audit report in component documentation

**Boundaries Frozen:**
- Menu vs Dropdown vs ContextMenu (NAVIGATION_OVERLAYS)
- Panel vs Section (SURFACE_CONTAINERS)

**Last Audit:** 2026-02-09  
**Next Audit Required:** When new overlapping components are proposed

---

## Acceptance Criteria

- ✅ Each component has a single, non-overlapping responsibility
- ✅ No ambiguous usage remains
- ✅ Decisions are documented and referenceable
- ✅ No future component can bypass these rules without audit

---

## References

- **Usage Matrix:** `docs/reference/COMPONENT_USAGE_MATRIX.md`
- **Menu Component:** `src/COMPOSITION/navigation/Menu/Menu.tsx`
- **Dropdown Component:** `src/COMPOSITION/overlays/Dropdown/Dropdown.tsx`
- **ContextMenu Component:** `src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx`
- **Panel Component:** `src/COMPOSITION/layout/Panel/Panel.tsx`
- **Section Component:** `src/COMPOSITION/layout/Section/Section.tsx`

---

## Audit Completion

**Date:** 2026-02-09  
**Status:** ✅ **VERIFIED**  
**Mode:** DOCS (Documentation verification, no refactoring)  
**Audit Type:** Re-audit (verification of previously established boundaries)  
**Violations Found:** 0  
**Violations Fixed:** 0 (previous violations already fixed)  
**Documentation Verified:** 2 files  
**Code Comments Verified:** 6 files

**Verification Summary:**
- ✅ All component boundaries verified and correct
- ✅ All documentation up-to-date
- ✅ No violations found in codebase
- ✅ Usage matrix confirmed accurate
- ✅ Nesting rules correctly documented and followed
 - ✅ Section composition-only wording verified in `docs/reference/LAYOUT_USAGE_GUIDE.md` and `src/COMPOSITION/layout/Section/Section.tsx`
 - ✅ Container sizing note verified in `docs/reference/COMPONENT_USAGE_MATRIX.md` and `docs/canon/CLASSNAME_INLINESTYLE_GOVERNANCE.md`

**Next Steps:** None - boundaries are frozen, verified, and documented. No further action required until new overlapping components are proposed.
