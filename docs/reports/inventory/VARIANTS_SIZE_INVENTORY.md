# Variants & Size System Inventory Report

**Date Created:** 2025-12-19  
**Last Updated:** 2025-12-22  
**Status:** ✅ COMPLETE  
**Priority:** CRITICAL  
**Reference:** [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md), [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md)

---

## Executive Summary

This report inventories all components' current size/variant implementations and compares them against the Variants & Size Canon Authority. The inventory covers **21 components** from PRIMITIVES and COMPOSITION layers, identifying alignment status and migration recommendations.

**Statistics:**
- **Total Components Analyzed:** 21
- **✅ ALIGNED:** 8 components (38%)
- **⚠️ NEEDS IMPROVEMENT:** 6 components (29%)
- **❌ BLOCKING:** 7 components (33%)

---

## Component Entry Template

Each component entry follows this strict schema:

### Required Fields
- **Location** - Component file path
- **Layer** - PRIMITIVES | COMPOSITION
- **Class** - Interactive | Surface | Overlay | Typography | Layout | Decorative
- **Size Keys** - Current size values (or "None")
- **Variant Keys** - Current variant values (or "None")
- **Alignment Status** - ✅ ALIGNED | ⚠️ NEEDS IMPROVEMENT | ❌ BLOCKING

### Optional Fields
- **Defaults** - Default size/variant values (if applicable)
- **States** - Public state props (disabled, loading, error, etc.)
- **Special Modes/Props** - Component-specific props (e.g., `iconOnly` for Button)
- **Storybook Coverage** - Matrix, States, SizesGallery, LongContent status

---

## Severity Rules

### ❌ BLOCKING
A component is **❌ BLOCKING** when it violates a hard canon rule:
- Non-GlobalSize values in size props (e.g., `size="xs"`/`xl` for interactive components)
- Using `size="icon"` or any other non-GlobalSize value
- Overlay components using InteractiveVariant dictionary (forbidden per canon)
- Overlay components with size prop that do NOT restrict to `sm | md | lg` only

### ⚠️ NEEDS IMPROVEMENT
A component is **⚠️ NEEDS IMPROVEMENT** when it:
- Has recommended alignment improvements (e.g., missing optional documentation)
- Missing non-blocking Storybook stories (SizesGallery when required, etc.)
- Variant API is undocumented (needs documentation to assess alignment)

### ✅ ALIGNED
A component is **✅ ALIGNED** when it:
- Matches canon requirements (size scale, variant dictionary, component rules)
- Has no violations of canonical authority rules
- All required Storybook stories are present

---

## Storybook Requirement Rules

**Reference:** [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) defines canonical story names and Matrix/States requirement conditions. [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md) defines SizesGallery and LongContent requirement intent.

- **Matrix Story** - REQUIRED only if component publicly supports BOTH size AND variant props
- **States Story** - REQUIRED only if component exposes public state props OR interactive behavior
- **SizesGallery Story** - REQUIRED if component exposes a public `size` prop
- **LongContent Story** - REQUIRED for Overlay components (Tooltip, Popover, etc.), regardless of whether `size` exists

---

## Component Inventory

### ✅ Button

**Location:** `src/PRIMITIVES/Button/Button.tsx`  
**Layer:** PRIMITIVES  
**Class:** Interactive  
**Size Keys:** `sm`, `md`, `lg`  
**Variant Keys:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `destructive`  
**Defaults:** `variant="primary"`, `size="md"`  
**States:** `disabled`  
**Special Modes/Props:** `iconOnly` (boolean) - Square icon-only buttons  
**Storybook Coverage:**
- Matrix: ✅ REQUIRED and present
- States: ✅ REQUIRED and present
- SizesGallery: ✅ REQUIRED and present
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ✅ ALIGNED

**Notes:** Uses GlobalSize values only. Icon-only buttons use `iconOnly` prop (boolean), not a size value. ❌ `size="icon"` is FORBIDDEN.

---

### ⚠️ Input

**Location:** `src/PRIMITIVES/Input/Input.tsx`  
**Layer:** PRIMITIVES  
**Class:** Interactive  
**Size Keys:** `sm`, `md`, `lg`  
**Variant Keys:** `primary`, `secondary`, `outline`, `ghost`, `destructive`  
**Defaults:** `variant="primary"`, `size="md"`  
**States:** `disabled`, `error`, `success`  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: ❌ REQUIRED but missing
- States: ✅ REQUIRED and present
- SizesGallery: ❌ REQUIRED but missing
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ⚠️ NEEDS IMPROVEMENT

**Notes:** Missing required Matrix and SizesGallery stories.

---

### ⚠️ Link

**Location:** `src/PRIMITIVES/Link/Link.tsx`  
**Layer:** PRIMITIVES  
**Class:** Interactive  
**Size Keys:** `sm`, `md`, `lg`  
**Variant Keys:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive`  
**Defaults:** `variant="link"`, `size="md"`  
**States:** `disabled`  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: ❌ REQUIRED but missing
- States: ✅ REQUIRED and present
- SizesGallery: ❌ REQUIRED but missing
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ⚠️ NEEDS IMPROVEMENT

**Notes:** Missing required Matrix and SizesGallery stories.

---

### ✅ Text

**Location:** `src/PRIMITIVES/Text/Text.tsx`  
**Layer:** PRIMITIVES  
**Class:** Typography  
**Size Keys:** `xs`, `sm`, `md`, `lg`, `xl`  
**Variant Keys:** None  
**Defaults:** `size="md"`  
**States:** None  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (size-only component, no variant prop)
- States: 🚫 NOT REQUIRED (no public state props)
- SizesGallery: ✅ REQUIRED and present
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ✅ ALIGNED

**Notes:** No action required.

---

### ✅ Heading

**Location:** `src/PRIMITIVES/Heading/Heading.tsx`  
**Layer:** PRIMITIVES  
**Class:** Typography  
**Size Keys:** None (uses semantic HTML levels 1-6)  
**Variant Keys:** None  
**Defaults:** None  
**States:** None  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (no size/variant props)
- States: 🚫 NOT REQUIRED (no public state props)
- SizesGallery: 🚫 NOT REQUIRED (no size prop)
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ✅ ALIGNED

**Notes:** Uses semantic HTML levels (1-6) instead of size prop.

---

### ❌ Checkbox

**Location:** `src/PRIMITIVES/Checkbox/Checkbox.tsx`  
**Layer:** PRIMITIVES  
**Class:** Interactive  
**Size Keys:** `xs`, `sm`, `md`, `lg`, `xl` (❌ `xs`/`xl` forbidden)  
**Variant Keys:** `primary`, `secondary`, `outline`, `ghost`, `destructive`  
**Defaults:** `variant="primary"`, `size="md"`  
**States:** `disabled`  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: ❌ REQUIRED but missing
- States: ⚠️ Present but incorrectly named "AllStates" (should be "States")
- SizesGallery: ❌ REQUIRED but missing
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ❌ BLOCKING

**Notes:** Remove `xs`/`xl` sizes, add Matrix and SizesGallery stories, rename "AllStates" to "States".

---

### ❌ Radio

**Location:** `src/PRIMITIVES/Radio/Radio.tsx`  
**Layer:** PRIMITIVES  
**Class:** Interactive  
**Size Keys:** `xs`, `sm`, `md`, `lg`, `xl` (❌ `xs`/`xl` forbidden)  
**Variant Keys:** `primary`, `secondary`, `outline`, `ghost`, `destructive`  
**Defaults:** `variant="primary"`, `size="md"`  
**States:** `disabled`  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: ❌ REQUIRED but missing
- States: ⚠️ Present but incorrectly named "AllStates" (should be "States")
- SizesGallery: ❌ REQUIRED but missing
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ❌ BLOCKING

**Notes:** Remove `xs`/`xl` sizes, add Matrix and SizesGallery stories, rename "AllStates" to "States".

---

### ❌ Switch

**Location:** `src/PRIMITIVES/Switch/Switch.tsx`  
**Layer:** PRIMITIVES  
**Class:** Interactive  
**Size Keys:** `xs`, `sm`, `md`, `lg`, `xl` (❌ `xs`/`xl` forbidden)  
**Variant Keys:** `primary`, `secondary`, `outline`, `ghost`, `destructive`  
**Defaults:** `variant="primary"`, `size="md"`  
**States:** `disabled`  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: ❌ REQUIRED but missing
- States: ⚠️ Present but incorrectly named "AllStates" (should be "States")
- SizesGallery: ❌ REQUIRED but missing
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ❌ BLOCKING

**Notes:** Remove `xs`/`xl` sizes, add Matrix and SizesGallery stories, rename "AllStates" to "States".

---

### ❌ Textarea

**Location:** `src/PRIMITIVES/Textarea/Textarea.tsx`  
**Layer:** PRIMITIVES  
**Class:** Interactive  
**Size Keys:** `xs`, `sm`, `md`, `lg`, `xl` (❌ `xs`/`xl` forbidden)  
**Variant Keys:** `primary`, `secondary`, `outline`, `ghost`, `destructive`  
**Defaults:** `variant="primary"`, `size="md"`  
**States:** `disabled`  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: ❌ REQUIRED but missing
- States: ⚠️ Present but incorrectly named "AllStates" (should be "States")
- SizesGallery: ❌ REQUIRED but missing
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ❌ BLOCKING

**Notes:** Remove `xs`/`xl` sizes, add Matrix and SizesGallery stories, rename "AllStates" to "States".

---

### ❌ Select

**Location:** `src/COMPOSITION/controls/Select/Select.tsx`  
**Layer:** COMPOSITION  
**Class:** Interactive  
**Size Keys:** `xs`, `sm`, `md`, `lg`, `xl` (❌ `xs`/`xl` forbidden)  
**Variant Keys:** `primary`, `secondary`, `outline`, `ghost`, `destructive`  
**Defaults:** `variant="primary"`, `size="md"`  
**States:** `disabled`, `error`  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: ❌ REQUIRED but missing
- States: ❌ REQUIRED but missing
- SizesGallery: ❌ REQUIRED but missing
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ❌ BLOCKING

**Notes:** Remove `xs`/`xl` sizes, add Matrix, States, and SizesGallery stories.

---

### ✅ Badge

**Location:** `src/PRIMITIVES/Badge/Badge.tsx`  
**Layer:** PRIMITIVES  
**Class:** Surface  
**Size Keys:** None  
**Variant Keys:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive`  
**Defaults:** `variant="primary"`  
**States:** None  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (variant-only component, no size prop)
- States: 🚫 NOT REQUIRED (no public state props)
- SizesGallery: 🚫 NOT REQUIRED (no size prop)
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ✅ ALIGNED

**Notes:** No action required.

---

### ⚠️ Alert

**Location:** `src/PRIMITIVES/Alert/Alert.tsx`  
**Layer:** PRIMITIVES  
**Class:** Surface  
**Size Keys:** None  
**Variant Keys:** Unknown (needs documentation)  
**Defaults:** Unknown  
**States:** Unknown  
**Special Modes/Props:** Unknown  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (no size prop)
- States: 🚫 NOT REQUIRED (no public state props)
- SizesGallery: 🚫 NOT REQUIRED (no size prop)
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ⚠️ NEEDS IMPROVEMENT

**Notes:** Document variant API to enable alignment assessment.

---

### ⚠️ Card

**Location:** `src/COMPOSITION/layout/Card/Card.tsx`  
**Layer:** COMPOSITION  
**Class:** Surface  
**Size Keys:** `sm`, `md`, `lg`  
**Variant Keys:** None  
**Defaults:** `size="md"`  
**States:** None  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (size-only component, no variant prop)
- States: 🚫 NOT REQUIRED (no public state props)
- SizesGallery: ❌ REQUIRED but missing
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ⚠️ NEEDS IMPROVEMENT

**Notes:** Missing required SizesGallery story.

---

### ❌ Popover

**Location:** `src/COMPOSITION/overlays/Popover.tsx`  
**Layer:** COMPOSITION  
**Class:** Overlay  
**Size Keys:** `xs`, `sm`, `md`, `lg`, `xl` (❌ `xs`/`xl` forbidden for overlays)  
**Variant Keys:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive` (❌ InteractiveVariant forbidden for overlays)  
**Defaults:** Unknown  
**States:** None  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (overlay component, variant prop should be removed)
- States: 🚫 NOT REQUIRED (no public interactive states)
- SizesGallery: ❌ REQUIRED but missing
- LongContent: ❌ REQUIRED but missing

**Alignment Status:** ❌ BLOCKING

**Notes:** Remove variant prop (InteractiveVariant forbidden), restrict size to `sm`/`md`/`lg`, add SizesGallery and LongContent stories.

---

### ✅ Modal

**Location:** `src/COMPOSITION/overlays/Modal/Modal.tsx`  
**Layer:** COMPOSITION  
**Class:** Surface  
**Size Keys:** None (size handled via layout tokens)  
**Variant Keys:** None (visual style handled via elevation tokens)  
**Defaults:** None  
**States:** None  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (no size/variant props)
- States: 🚫 NOT REQUIRED (no public state props)
- SizesGallery: 🚫 NOT REQUIRED (no size prop)
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ✅ ALIGNED

**Notes:** Uses layout tokens instead of size/variant API.

---

### ❌ Tooltip

**Location:** `src/COMPOSITION/overlays/Tooltip.tsx`  
**Layer:** COMPOSITION  
**Class:** Overlay  
**Size Keys:** None  
**Variant Keys:** `primary`, `secondary`, `accent`, `outline`, `ghost`, `link`, `destructive` (❌ InteractiveVariant forbidden for overlays)  
**Defaults:** Unknown  
**States:** None  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (overlay component, variant prop should be removed)
- States: 🚫 NOT REQUIRED (no public interactive states)
- SizesGallery: 🚫 NOT REQUIRED (no size prop)
- LongContent: ❌ REQUIRED but missing

**Alignment Status:** ❌ BLOCKING

**Notes:** Remove variant prop (InteractiveVariant forbidden), add LongContent story.

---

### ⚠️ Progress

**Location:** `src/PRIMITIVES/Progress/Progress.tsx`  
**Layer:** PRIMITIVES  
**Class:** Surface  
**Size Keys:** None  
**Variant Keys:** Unknown (needs documentation)  
**Defaults:** Unknown  
**States:** Unknown  
**Special Modes/Props:** Unknown  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (no size prop)
- States: 🚫 NOT REQUIRED (no public state props)
- SizesGallery: 🚫 NOT REQUIRED (no size prop)
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ⚠️ NEEDS IMPROVEMENT

**Notes:** Document variant API to enable alignment assessment.

---

### ⚠️ Skeleton

**Location:** `src/PRIMITIVES/Skeleton/Skeleton.tsx`  
**Layer:** PRIMITIVES  
**Class:** Surface  
**Size Keys:** None  
**Variant Keys:** Unknown (needs documentation)  
**Defaults:** Unknown  
**States:** Unknown  
**Special Modes/Props:** Unknown  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (no size prop)
- States: 🚫 NOT REQUIRED (no public state props)
- SizesGallery: 🚫 NOT REQUIRED (no size prop)
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ⚠️ NEEDS IMPROVEMENT

**Notes:** Document variant API to enable alignment assessment.

---

### ✅ Icon

**Location:** `src/PRIMITIVES/Icon/Icon.tsx`  
**Layer:** PRIMITIVES  
**Class:** Decorative  
**Size Keys:** None  
**Variant Keys:** None  
**Defaults:** None  
**States:** None  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (no size/variant props)
- States: 🚫 NOT REQUIRED (no public state props)
- SizesGallery: 🚫 NOT REQUIRED (no size prop)
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ✅ ALIGNED

**Notes:** No action required.

---

### ✅ Field

**Location:** `src/PRIMITIVES/Field/Field.tsx`  
**Layer:** PRIMITIVES  
**Class:** Layout  
**Size Keys:** None  
**Variant Keys:** None  
**Defaults:** None  
**States:** None  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (no size/variant props)
- States: 🚫 NOT REQUIRED (no public state props)
- SizesGallery: 🚫 NOT REQUIRED (no size prop)
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ✅ ALIGNED

**Notes:** No action required.

---

### ✅ Label

**Location:** `src/PRIMITIVES/Label/Label.tsx`  
**Layer:** PRIMITIVES  
**Class:** Layout  
**Size Keys:** None  
**Variant Keys:** None  
**Defaults:** None  
**States:** None  
**Special Modes/Props:** None  
**Storybook Coverage:**
- Matrix: 🚫 NOT REQUIRED (no size/variant props)
- States: 🚫 NOT REQUIRED (no public state props)
- SizesGallery: 🚫 NOT REQUIRED (no size prop)
- LongContent: 🚫 NOT REQUIRED (not an overlay)

**Alignment Status:** ✅ ALIGNED

**Notes:** No action required.

---

## Next Migration Batch Suggestions

### Top 5 ❌ Blocking Issues (Highest Impact)

1. **Popover** → Remove variant prop (InteractiveVariant forbidden) and restrict size to `sm`/`md`/`lg` (CRITICAL overlay rule violations)
2. **Tooltip** → Remove variant prop (InteractiveVariant forbidden for overlays)
3. **Select** → Remove `xs`/`xl` sizes and add missing Storybook stories (multiple violations)
4. **Checkbox** → Remove `xs`/`xl` sizes and add Matrix/SizesGallery stories (affects form patterns)
5. **Radio** → Remove `xs`/`xl` sizes and add Matrix/SizesGallery stories (affects form patterns)

### Top 5 ⚠️ Needs Improvement

1. **Input** → Add Matrix and SizesGallery stories (common component, improves documentation)
2. **Link** → Add Matrix and SizesGallery stories (common component, improves documentation)
3. **Card** → Add SizesGallery story (layout component, improves documentation)
4. **Alert/Progress/Skeleton** → Document variant APIs to enable alignment assessment
5. **Button** → ✅ MIGRATION COMPLETE - `size="icon"` removed, `iconOnly` prop introduced (2025-12-22)

---

## Related Documents

- [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) - Canonical authority for size/variant naming and Storybook story requirements
- [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md) - Size-to-token mapping spec and Storybook requirements (SizesGallery, LongContent)

---

## Changelog

### 2025-12-22 — Inventory Normalization Pass (TUI_VARIANTS_INVENTORY_NORMALIZATION_GLOBAL_002)

**Changes:**
- ✅ Rewrote all component entries to strict schema template
- ✅ Defined Required vs Optional fields at top of document
- ✅ Standardized format: Location, Layer, Class, Size Keys, Variant Keys, Defaults, States, Special Modes/Props, Storybook Coverage
- ✅ Used minimal emojis: ✅ ⚠️ 🚫 only (removed excessive emoji usage)
- ✅ Ensured Button entry matches reality (sm|md|lg + iconOnly prop)
- ✅ Made inventory uniform and skimmable across all components

**Rationale:**
- Consistent structure prevents future drift
- Scan-friendly format enables quick assessment
- Required/optional field distinction clarifies expectations
- Minimal emoji usage improves readability

---

**Last Updated:** 2025-12-22  
**Next Review:** After migration completion
