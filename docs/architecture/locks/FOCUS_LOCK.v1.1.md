# 🔒 Focus System Lock

**Version:** 1.1  
**Date Created:** 2025-12-27  
**Status:** ✅ **LOCKED** - IMMUTABLE  
**Layer:** FOUNDATION / ACCESSIBILITY  
**Priority:** CRITICAL  
**Previous Version:** [FOCUS_LOCK.md](./FOCUS_LOCK.md) (v1.0, Historical)

---

## 📋 Purpose

This document **formally locks** the Focus System of `@tenerife.music/ui` at version 1.1. After this lock, all focus behavior rules, authority contracts, audit documentation, Storybook stories, and enforcement guards are **immutable** and **closed for modifications**.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Key Changes from v1.0:**
- GAP-3 (Drawer focus-visible inconsistency) **FIXED** → BUG count = 0
- Playwright enforcement **RESTORED** and operational
- Compliance rate improved to 91.7%

---

## 🔒 Locked Components

The following Focus System components are **LOCKED** and **IMMUTABLE**:

### 1. Focus Authority Contract

#### Focus Authority
- **File:** `docs/architecture/FOCUS_AUTHORITY.md`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Version:** 1.0
- **Role:** Canonical focus navigation rules (trap, restore, tab order, focus-visible)
- **Rule:** DO NOT modify without explicit unlock procedure

### 2. Focus Audit Documentation

#### Focus Audit Report v1.1
- **File:** `docs/reports/audit/FOCUS_AUDIT_REPORT.v1.1.md`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** System-level focus audit of all focus surfaces (v1.1)
- **Rule:** DO NOT modify; create new audit report if re-audit needed
- **Historical:** `docs/reports/audit/FOCUS_AUDIT_REPORT.md` (v1.0, immutable)

#### Focus GAP Classification
- **File:** `docs/reports/audit/FOCUS_GAPS.v1.1.md` (if exists)
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Focus GAP classifications (ACCEPTABLE vs BUG) for v1.1
- **Rule:** DO NOT modify; update requires unlock procedure
- **Historical:** `docs/reports/audit/FOCUS_GAPS.md` (v1.0, immutable)

### 3. Focus Storybook Stories

#### Focus Overview
- **File:** `src/COMPOSITION/focus/FocusOverview.stories.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Keyboard navigation pattern demonstration
- **Rule:** DO NOT modify, extend, or create alternatives

#### Focus Trap and Restore
- **File:** `src/COMPOSITION/focus/FocusTrapAndRestore.stories.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Modal focus trap and restore demonstration
- **Rule:** DO NOT modify, extend, or create alternatives

#### Focus Order Playground
- **File:** `src/COMPOSITION/focus/FocusOrderPlayground.stories.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Tab order exploration and testing
- **Rule:** DO NOT modify, extend, or create alternatives

#### Focus GAP Gallery
- **File:** `src/COMPOSITION/focus/FocusGAPGallery.stories.tsx`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Intentional Focus GAP demonstration
- **Rule:** DO NOT modify, extend, or create alternatives

### 4. Focus ESLint Rules

#### no-interactive-without-keyboard
- **File:** `eslint-rules/no-interactive-without-keyboard.ts`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Forbids interactive div/span without keyboard parity
- **Rule:** DO NOT modify without explicit unlock procedure

#### require-focus-visible
- **File:** `eslint-rules/require-focus-visible.ts`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Forbids :focus without :focus-visible
- **Rule:** DO NOT modify without explicit unlock procedure

### 5. Focus Playwright Tests

#### Focus Navigation Tests
- **File:** `playwright/focus-navigation.spec.ts`
- **Status:** ✅ **LOCKED**
- **Lock Date:** 2025-12-27
- **Role:** Runtime focus behavior verification
- **Rule:** DO NOT modify without explicit unlock procedure
- **Enforcement:** ✅ **OPERATIONAL** (restored in v1.1)
- **Command:** `pnpm test:focus`

---

## 🔒 Locked Architecture

### Focus Authority Contract
- **Canonical Terminology:** focusable, tabbable, focus-visible, focus-trap, focus-restore, focus-gap
- **Tab Order Rules:** DOM order = navigation order, no positive tabindex, roving tabindex for composites
- **Focus Trap Rules:** Mandatory for modal overlays (Modal, Dialog, Drawer, AlertDialog)
- **Focus Restore Rules:** Mandatory for modal overlays on close
- **Focus GAP Contract:** Explicit documentation required for intentional breaks

### ESLint Enforcement
- `tenerife-architecture/no-interactive-without-keyboard` — **Blocking**
- `tenerife-architecture/require-focus-visible` — **Blocking**

### Playwright Enforcement
- Tab order verification — **Blocking**
- Focus trap cycling verification — **Blocking**
- Focus restore on close verification — **Blocking**
- Escape key behavior verification — **Blocking**
- ARIA attribute verification — **Blocking**

**Enforcement Status:** ✅ **ALL GUARDS BLOCKING**

---

## ✅ Allowed Focus GAPs (Whitelist)

The following Focus GAPs are explicitly allowed per FOCUS_AUTHORITY Rule F-GAP-1:

| GAP ID | Component | Description | Classification |
|--------|-----------|-------------|----------------|
| GAP-1 | Popover | Focus can leave popover (non-modal) | ✅ ACCEPTABLE |
| GAP-2 | Toast | Toast appears in tab order | ✅ ACCEPTABLE |
| GAP-4 | Stepper | Steps not keyboard-navigable | ✅ ACCEPTABLE |

**GAP-3 (Drawer focus-visible)** was **FIXED** in v1.1 and is no longer a GAP or BUG.

**BUG Count:** **0** (all known bugs fixed)

---

## 🚫 Forbidden Actions (LOCKED)

After this lock, the following actions are **FORBIDDEN**:

### Token & Architecture
- ❌ Creating new focus management utilities outside Radix
- ❌ Modifying Focus Authority Contract rules
- ❌ Removing or modifying allowed Focus GAPs
- ❌ Adding new Focus GAPs without unlock procedure

### Code
- ❌ Using positive tabindex (`tabindex > 0`)
- ❌ Using `:focus` without `:focus-visible` for focus rings
- ❌ Creating interactive elements without keyboard parity
- ❌ Implementing modal overlays without focus trap
- ❌ Closing overlays without focus restore

### Documentation
- ❌ Modifying audit reports without re-audit
- ❌ Changing GAP classifications without unlock

### Tests & Stories
- ❌ Removing or modifying locked Storybook stories
- ❌ Removing or weakening Playwright tests
- ❌ Disabling ESLint focus rules
- ❌ Removing or disabling `pnpm test:focus` command

---

## ✅ Allowed Actions (LOCKED)

The following actions remain **ALLOWED**:

### Code
- ✅ Using Radix primitives for focus management (internal)
- ✅ Using `useFocusLock` hook for non-Radix components
- ✅ Implementing roving tabindex for composite controls
- ✅ Adding focus-visible styling to new components

### Documentation
- ✅ Adding new components to audit scope (via new audit)
- ✅ Creating new audit reports for new components

### Tests
- ✅ Adding new test cases to existing test files
- ✅ Adding new Storybook stories for new components

---

## 🔓 Unlock Procedure

Any modification to locked Focus System components requires:

1. **Create Unlock Request**
   - Document what needs to change
   - Justify why the change is architecturally necessary
   - Identify which locked files will be affected

2. **Approval Required**
   - Explicit approval from architecture authority
   - Impact analysis of proposed changes

3. **Execute Changes**
   - Modify only explicitly approved files
   - Update all related documentation

4. **Re-Lock**
   - Update this lock document
   - Increment version number
   - Update lock date

5. **Verify**
   - Run full focus test suite (`pnpm test:focus`)
   - Verify Storybook stories still pass
   - Verify ESLint rules still pass
   - Verify Playwright tests execute successfully

---

## 📊 Required Storybook Stories

The following Storybook stories are **required** for Focus System observability:

| Story | File | Purpose |
|-------|------|---------|
| Tab Order | `FocusOverview.stories.tsx` | DOM order navigation |
| Focus Visible | `FocusOverview.stories.tsx` | Keyboard-only focus rings |
| Roving Tabindex | `FocusOverview.stories.tsx` | Composite control navigation |
| Keyboard Parity | `FocusOverview.stories.tsx` | Interactive element requirements |
| Complete Navigation | `FocusOverview.stories.tsx` | Full page focus flow |
| Modal Focus Trap | `FocusTrapAndRestore.stories.tsx` | Modal focus containment |
| Focus Restore | `FocusTrapAndRestore.stories.tsx` | Focus return on close |
| Dialog Focus | `FocusTrapAndRestore.stories.tsx` | Dialog focus behavior |
| Drawer Focus | `FocusTrapAndRestore.stories.tsx` | Drawer focus behavior |
| Popover No Trap | `FocusTrapAndRestore.stories.tsx` | Non-modal focus behavior |
| Escape Key | `FocusTrapAndRestore.stories.tsx` | Escape close behavior |
| Focus Tracker | `FocusOrderPlayground.stories.tsx` | Focus order visualization |
| Visual vs DOM Order | `FocusOrderPlayground.stories.tsx` | CSS order warning |
| Composite Controls | `FocusOrderPlayground.stories.tsx` | Tabs keyboard navigation |
| Disabled Elements | `FocusOrderPlayground.stories.tsx` | Skip disabled in tab order |
| Tabindex Values | `FocusOrderPlayground.stories.tsx` | Allowed tabindex values |
| GAP-1 Popover | `FocusGAPGallery.stories.tsx` | Popover non-modal GAP |
| GAP-2 Toast | `FocusGAPGallery.stories.tsx` | Toast tab order GAP |
| GAP-4 Stepper | `FocusGAPGallery.stories.tsx` | Stepper read-only GAP |

---

## 🛡️ CI Guards

The following CI guards **MUST** be blocking:

### ESLint Rules (Static)
- `tenerife-architecture/no-interactive-without-keyboard` — **Blocking**
- `tenerife-architecture/require-focus-visible` — **Blocking**

### Playwright Tests (Runtime)
- `playwright/focus-navigation.spec.ts` — **Blocking**
- **Command:** `pnpm test:focus`
- **Configuration:** `playwright/playwright.config.ts`
- **Status:** ✅ **OPERATIONAL** (restored in v1.1)

**CI Configuration:**
- These guards MUST block PR merge on failure
- No exceptions without explicit unlock procedure
- Playwright tests MUST run automatically via `pnpm test:focus`

---

## 📎 Related Documents

- [FOCUS_AUTHORITY.md](../FOCUS_AUTHORITY.md) — Canonical focus rules
- [FOCUS_AUDIT_REPORT.v1.1.md](../../reports/audit/FOCUS_AUDIT_REPORT.v1.1.md) — System audit v1.1
- [FOCUS_AUDIT_REPORT.md](../../reports/audit/FOCUS_AUDIT_REPORT.md) — System audit v1.0 (Historical)
- [FOCUS_GAPS.md](../../reports/audit/FOCUS_GAPS.md) — GAP classifications (Historical)
- [GAP3_verification_log_v1.1.md](../../reports/focus/GAP3_verification_log_v1.1.md) — Enforcement restoration log
- [INTERACTION_AUTHORITY.md](../INTERACTION_AUTHORITY.md) — Focus-visible styling
- [MOTION_LOCK.md](./MOTION_LOCK.md) — Lock document format reference
- [FOCUS_LOCK.md](./FOCUS_LOCK.md) — Previous version (v1.0, Historical)

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2025-12-27 | GAP-3 fixed, Playwright enforcement restored, BUG=0 (same-day patch) |
| 1.0 | 2025-12-27 | Initial Focus System Lock |

**Note:** v1.0 and v1.1 were released on the same calendar day. v1.1 is a same-day patch that fixed GAP-3 and restored Playwright enforcement.

---

## 🎯 Compliance Status

**Compliance Rate:** 91.7% (44/48 applicable aspects)

**BUG Count:** **0** (all known bugs fixed)

**Enforcement Status:** ✅ **ALL GUARDS BLOCKING**

- ESLint rules: ✅ Blocking
- Playwright tests: ✅ Blocking (operational)
- Storybook stories: ✅ Required

---

**Focus System v1.1 is now LOCKED.**

Any modification requires explicit unlock procedure.
