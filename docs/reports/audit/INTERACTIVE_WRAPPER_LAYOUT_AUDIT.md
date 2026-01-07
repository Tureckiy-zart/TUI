# Interactive Wrapper Layout Contract Audit Report

**Date Created:** 2026-01-06  
**Task ID:** TUI_INTERACTIVE_WRAPPER_LAYOUT_AUDIT  
**Status:** ✅ **COMPLETE**

---

## Executive Summary

This audit systematically reviewed all interactive components in FOUNDATION and EXTENSION layers to identify violations of the Interactive Wrapper Layout Contract. The contract requires that interactive components capable of wrapping layout content (Card, Panel, Box) must use block-level layout, not inline or inline-flex.

**Reference Fix:** Link component uses variant-based layout: `variant='text'` (default, inline) for atomic text links, `variant='link'` (block-level) for wrapper use cases. See [LINK_BASELINE_REPORT.md](./LINK_BASELINE_REPORT.md) (lines 1529-1575).

**Key Findings:**
- ✅ **1 component fixed:** Link (`variant='text'` default inline, `variant='link'` wrapper block-level)
- ⚠️ **1 potential violation identified:** Chip (uses `inline-flex`, wrapper-capable)
- ✅ **4 components safe:** NavLink, MenuItem, DropdownItem, Button (atomic)
- ✅ **2 components excluded:** NavItem, NavText (non-interactive)

**Recommendation:** Chip component requires contract clarification or future fix if wrapper usage is intended.

---

## Audited Components

### FOUNDATION Layer (PRIMITIVES)

#### 1. Link (`src/PRIMITIVES/Link/Link.tsx`)

**Status:** ✅ **FIXED**

**Layout Tokens:**
- `variant='text'` (default): Uses `layout: "inline-flex items-center justify-center whitespace-nowrap"` ([link.ts](src/FOUNDATION/tokens/components/link.ts), line 68) - atomic inline usage
- `variant='link'`: Uses `layoutBlock: "block w-full"` ([link.ts](src/FOUNDATION/tokens/components/link.ts), line 74) - wrapper block-level usage
- All other variants: Use `layout: "inline-flex items-center justify-center whitespace-nowrap"` ([link.ts](src/FOUNDATION/tokens/components/link.ts), line 68) - atomic usage

**Classification:** Wrapper-capable (can wrap Card/Panel/Box)

**Fix Applied:** 2025-12-25 (see [LINK_BASELINE_REPORT.md](./LINK_BASELINE_REPORT.md))
- Added `layoutBlock` token for `variant='link'`
- Updated CVA variants to use `layoutBlock` for `variant='link'` specifically
- All other variants continue using `inline-flex` (atomic usage)

**Refinement Applied:** 2026-01-06 (variant refinement)
- Added `variant='text'` as explicit inline variant (uses `layout` token)
- Changed default variant from `'link'` to `'text'` to prevent breaking changes
- Reserved `variant='link'` exclusively for wrapper use cases (uses `layoutBlock` token)

**Usage Context:** 
- Default Link (`variant='text'`) renders inline (inline-flex) for text and navigation links
- Link with `variant='link'` is intended to wrap Card components in grid/flex compositions. The block-level layout ensures proper width stretching and height propagation.

---

#### 2. NavLink (`src/PRIMITIVES/NavLink/NavLink.tsx`)

**Status:** ✅ **SAFE**

**Layout:** Inherits from Link component (delegates to Link)

**Classification:** Wrapper-capable (inherits wrapper capability from Link)

**Analysis:**
- NavLink is a thin wrapper around Link component
- Passes all props to Link, including `variant`
- Inherits Link's layout contract (block-level for `variant='link'`, inline-flex for default `variant='text'` and other atomic variants)
- No additional layout tokens or overrides

**Conclusion:** Safe - inherits correct layout contract from Link.

---

#### 3. Button (`src/PRIMITIVES/Button/Button.tsx`)

**Status:** ✅ **SAFE (ATOMIC)**

**Layout:** `inline-flex items-center justify-center whitespace-nowrap` ([Button.tsx](src/PRIMITIVES/Button/Button.tsx), line 161)

**Classification:** Atomic (not intended to wrap layout content)

**Analysis:**
- Button is semantically an atomic action trigger
- Uses `inline-flex` for inline button behavior
- Has `asChild` support, but this is for composition patterns, not layout wrapping
- Foundation component scope: Button is NOT intended for wrapping Card/Panel/Box
- Architectural lock: Button's semantic role is immutable (action trigger only)

**Conclusion:** Safe - atomic component, not wrapper-capable by design.

---

### EXTENSION Layer (COMPOSITION)

#### 4. Chip (`src/COMPOSITION/overlays/Chip/Chip.tsx`)

**Status:** ✅ **ATOMIC (contract clarified)**

**Layout:** `inline-flex items-center gap-xs` ([chip.ts](src/FOUNDATION/tokens/components/chip.ts), line 39)

**Classification:** Atomic component (not intended to wrap layout content)

**Analysis:**
- Chip accepts `children: React.ReactNode` (for text/icons only)
- Chip can be interactive (`onClick` prop)
- Uses `inline-flex` layout token (correct for atomic component)
- Component purpose: Tags, filters, selectable options
- Current usage: Primarily text content, icons, or simple content
- **Contract clarification:** Chip is documented as atomic component per Interactive Wrapper Layout Contract

**Conclusion:** 
- Chip is semantically an atomic component (similar to Button)
- Chip is NOT intended to wrap Card/Panel/Box layout content
- `inline-flex` layout is correct for atomic component usage
- No layout fix required - component complies with Interactive Wrapper Layout Contract

---

#### 5. MenuItem (`src/COMPOSITION/navigation/Menu/Menu.tsx`)

**Status:** ✅ **SAFE**

**Layout:** `flex` (not inline-flex) ([Menu.tsx](src/COMPOSITION/navigation/Menu/Menu.tsx), line 84)

**Classification:** Wrapper-capable (accepts children, interactive)

**Analysis:**
- MenuItem uses `flex` layout (block-level flex container)
- Base classes: `relative flex cursor-default select-none items-center`
- Full-width behavior: Inherits from Radix DropdownMenu.Item (block-level)
- No inline layout constraints

**Conclusion:** Safe - uses block-level `flex` layout, not `inline-flex`.

---

#### 6. DropdownItem (`src/COMPOSITION/overlays/Dropdown/Dropdown.tsx`)

**Status:** ✅ **SAFE**

**Layout:** `w-full text-left` (block-level button) ([Dropdown.tsx](src/COMPOSITION/overlays/Dropdown/Dropdown.tsx), line 179)

**Classification:** Wrapper-capable (accepts children, interactive)

**Analysis:**
- DropdownItem renders `<button>` element
- Uses `w-full` (full width) - block-level behavior
- Uses `text-left` for text alignment
- No inline layout constraints
- Button element is block-level by default in flex/grid contexts

**Conclusion:** Safe - uses block-level layout (`w-full`), not inline.

---

### Excluded Components (Non-Interactive)

#### 7. NavItem (`src/COMPOSITION/navigation/primitives/Navigation.tsx`)

**Status:** ✅ **EXCLUDED (NON-INTERACTIVE)**

**Classification:** Non-interactive wrapper (structural `<li>` element)

**Reason:** NavItem is a structural wrapper with no interactivity. It does not accept `onClick` or `href` props.

---

#### 8. NavText (`src/COMPOSITION/navigation/NavText/NavText.tsx`)

**Status:** ✅ **EXCLUDED (NON-INTERACTIVE)**

**Classification:** Non-interactive (semantic `<span>` element)

**Reason:** NavText explicitly excludes `href` and `onClick` props. It is a non-interactive semantic text component.

---

## Layout Classification

### Atomic Components (Inline Layout Allowed)

| Component | Layout | Status |
|-----------|--------|--------|
| Button | `inline-flex` | ✅ Safe (atomic) |

**Rationale:** Atomic components are not intended to wrap layout content. They represent single interactive elements (buttons, links as buttons, etc.).

---

### Wrapper-Capable Components (Block-Level Required)

| Component | Layout | Status | Notes |
|-----------|--------|--------|-------|
| Link (`variant='text'`, default) | `inline-flex` | ✅ Safe | Atomic inline usage (default) |
| Link (`variant='link'`) | `block w-full` | ✅ Fixed | Uses `layoutBlock` token for wrapper |
| Link (other variants) | `inline-flex` | ✅ Safe | Atomic usage (button-like) |
| NavLink | Inherits Link | ✅ Safe | Delegates to Link |
| MenuItem | `flex` | ✅ Safe | Block-level flex |
| DropdownItem | `w-full` | ✅ Safe | Block-level button |
| Chip | `inline-flex` | ✅ Safe | Atomic component (contract clarified) |

---

## Detected Violations

### CRITICAL Violations

**None.** All critical violations have been addressed.

---

### RESOLVED (Contract Clarified)

#### Chip Component

**Status:** ✅ **RESOLVED** - Chip classified as atomic component per Interactive Wrapper Layout Contract

**Resolution:**
- Chip contract clarified: Component is atomic (not wrapper-capable)
- Chip is semantically similar to Button - atomic action trigger for tags/filters
- `inline-flex` layout is correct for atomic component usage
- No layout fix required - component complies with contract

**Reference:** [INTERACTIVE_WRAPPER_LAYOUT_RULE.md](../../architecture/INTERACTIVE_WRAPPER_LAYOUT_RULE.md) - Contract defines atomic components as excluded from block-level layout requirement.

---

## Safe Components

The following components are safe and do not require changes:

1. **Link** (`variant='text'`, default) - ✅ Safe (atomic inline usage)
2. **Link** (`variant='link'`) - ✅ Fixed (uses `layoutBlock` for wrapper)
3. **Link** (other variants) - ✅ Safe (atomic usage)
4. **NavLink** - ✅ Safe (inherits Link's contract)
5. **Button** - ✅ Safe (atomic component)
6. **MenuItem** - ✅ Safe (uses `flex`, not `inline-flex`)
7. **DropdownItem** - ✅ Safe (uses `w-full`, block-level)
8. **Chip** - ✅ Safe (atomic component, contract clarified)

---

## Recommendations

### Immediate Actions

1. ✅ **Link component:** Already fixed - no action required
2. ✅ **Chip component:** Contract clarified - classified as atomic component (no action required)

### Future Considerations

1. ✅ **Architectural Rule:** Interactive Wrapper Layout Contract formalized and locked (see [INTERACTIVE_WRAPPER_LAYOUT_RULE.md](../../architecture/INTERACTIVE_WRAPPER_LAYOUT_RULE.md))
2. **Component Creation Checklist:** Add layout contract validation to component creation pipeline
3. **Token System:** Consider standardizing `layoutBlock` token pattern for wrapper-capable components

### Prevention Strategy

1. **Code Review:** Check for `inline-flex` in wrapper-capable components
2. **Storybook:** Add examples demonstrating wrapper usage (if intended)
3. **Documentation:** Document layout contracts in component README files

---

## Conclusion

All violations have been resolved. The audit identified one potential violation (Chip) which has been clarified as an atomic component per Interactive Wrapper Layout Contract. All critical violations have been addressed (Link component fix). The Interactive Wrapper Layout Contract has been formalized and locked as a mandatory architectural rule.

**Resolution Summary:**
1. ✅ Chip component contract clarified - classified as atomic component (no layout fix required)
2. ✅ Interactive Wrapper Layout Contract formalized and locked (see [INTERACTIVE_WRAPPER_LAYOUT_RULE.md](../../architecture/INTERACTIVE_WRAPPER_LAYOUT_RULE.md))
3. ✅ Contract cross-referenced from Layout Authority and Architecture Lock documents
4. ✅ Audit report updated with resolved status

**Next Steps:**
1. Update component creation checklist to include layout contract validation (future enhancement)

---

**Audit Completed:** 2026-01-06  
**Auditor:** AI Assistant  
**Task Reference:** TUI_INTERACTIVE_WRAPPER_LAYOUT_AUDIT

