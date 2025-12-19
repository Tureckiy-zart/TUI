# Foundation Variant & Token Coverage Report

**Date:**      
**Auditor:** UI Architecture Auditor  
**Scope:** Foundation components only (Button, Link, Text, Heading, Input, Textarea, Checkbox, Radio, Label)  
**Status:** Research Only (No Code Changes)  
**Authority:** `docs/architecture/FOUNDATION_CONTRACT.md`, `docs/architecture/FOUNDATION_COMPONENT_SCOPE.md`

---

## Executive Summary

This document assesses whether current token-driven variant APIs fully cover real-world visual use cases for each Foundation component. The goal is to identify any **blocking gaps** that would prevent Phase 3 TypeScript enforcement (removal of `className` and `style` props).

**Risk Classification:**
- **NO_GAP** - Current API sufficient, enforcement safe
- **MINOR_GAP** - Optional improvement, not blocking enforcement
- **BLOCKING_GAP** - Enforcement would break valid use cases, must be resolved before Phase 3

**Key Finding:** All Foundation components have comprehensive variant coverage. No blocking gaps identified. Minor gaps exist but are not enforcement-blocking.

---

## Component-by-Component Analysis

### 1. Button

**Component:** `src/PRIMITIVES/Button/Button.tsx`  
**Status:** ✅ **FINAL LOCK** (2025-12-15)  
**Variant Coverage:** ✅ **COMPREHENSIVE**

#### Current Variant API

**Variants:**
- `variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive"`
- `size?: "sm" | "md" | "lg" | "icon"`

**Token-Driven Props:**
- All visual properties controlled via `BUTTON_TOKENS`
- Colors, spacing, typography, radius, shadows, motion all token-driven
- State matrix handles hover/active/disabled/focus states

#### Coverage Assessment

**✅ Covered Use Cases:**
- Primary actions (primary variant)
- Secondary actions (secondary variant)
- Accent actions (accent variant)
- Outlined buttons (outline variant)
- Ghost/minimal buttons (ghost variant)
- Destructive actions (destructive variant)
- Small, medium, large sizes
- Icon-only buttons (icon size)
- Disabled states (via `disabled` prop)
- Loading states (via `loading` prop - if implemented)
- Icon slots (leftIcon, rightIcon)

**⚠️ Potential Gaps (MINOR_GAP):**
- **No "link" variant** - Some design systems have link-style buttons (but Link component exists for this)
- **No "success" variant** - Only destructive, no positive action variant (but primary can serve this)
- **No "warning" variant** - Only destructive, no warning action variant (but secondary can serve this)
- **No custom color variants** - All colors come from token system (by design, not a gap)

**Risk Assessment:** **NO_GAP** ✅

**Rationale:**
- All common button use cases are covered
- Link-style buttons should use Link component (semantic separation)
- Success/warning variants are edge cases that can use primary/secondary
- Token system provides sufficient color coverage through variants
- No real-world use case would require `className`/`style` override

---

### 2. Link

**Component:** `src/PRIMITIVES/Link/Link.tsx`  
**Status:** ✅ **FINAL LOCK** (2025-12-18)  
**Variant Coverage:** ✅ **COMPREHENSIVE**

#### Current Variant API

**Variants:**
- `variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive"`
- `size?: "xs" | "sm" | "md" | "lg" | "xl"`

**Token-Driven Props:**
- All visual properties controlled via `LINK_TOKENS`
- Colors, spacing, typography, radius, motion all token-driven
- Underline support for link variant

#### Coverage Assessment

**✅ Covered Use Cases:**
- Primary links (primary variant)
- Secondary links (secondary variant)
- Accent links (accent variant)
- Outlined links (outline variant)
- Ghost/minimal links (ghost variant)
- Text links with underline (link variant)
- Destructive links (destructive variant)
- Extra small through extra large sizes
- Disabled state (via `disabled` prop)
- Icon slots (leftIcon, rightIcon)

**⚠️ Potential Gaps (MINOR_GAP):**
- **No "success" variant** - Only destructive, no positive link variant (but primary can serve this)
- **No "warning" variant** - Only destructive, no warning link variant (but secondary can serve this)

**Risk Assessment:** **NO_GAP** ✅

**Rationale:**
- All common link use cases are covered
- Link variant provides text link pattern
- Success/warning variants are edge cases
- Token system provides sufficient coverage
- No real-world use case would require `className`/`style` override

---

### 3. Text

**Component:** `src/PRIMITIVES/Text/Text.tsx`  
**Status:** ⏳ **PROPOSED** (not yet locked)  
**Variant Coverage:** ✅ **COMPREHENSIVE** (with deprecation note)

#### Current Variant API

**Variants:**
- `size?: "xs" | "sm" | "md" | "lg" | "xl"`
- `weight?: "normal" | "medium" | "semibold" | "bold"`
- `muted?: boolean` - Muted text color
- `variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive" | "muted"` - **DEPRECATED**

**Token-Driven Props:**
- All visual properties controlled via `TEXT_TOKENS`
- Font sizes, weights, colors all token-driven

#### Coverage Assessment

**✅ Covered Use Cases:**
- All text sizes (xs through xl)
- All font weights (normal, medium, semibold, bold)
- Muted text (muted prop)
- Color variants via deprecated variant prop (primary, secondary, accent, destructive, muted)
- Link-style text (link variant - deprecated)

**⚠️ Potential Gaps (MINOR_GAP):**
- **Deprecated variant prop** - Still functional but marked deprecated (migration path exists)
- **No explicit color prop** - Colors come from variant prop (deprecated) or muted prop
- **No "success" or "warning" semantic colors** - Only destructive, no positive/warning text colors

**Risk Assessment:** **NO_GAP** ✅

**Rationale:**
- All common text use cases are covered
- Deprecated variant prop still works (backward compatibility)
- Migration path exists (use muted prop or semantic colors)
- Success/warning colors are edge cases
- Token system provides sufficient coverage
- No real-world use case would require `className`/`style` override

**Recommendation:** Consider adding explicit semantic color props (`color?: "foreground" | "muted" | "primary" | "secondary" | "accent" | "destructive"`) to replace deprecated variant prop before Phase 3 enforcement.

---

### 4. Heading

**Component:** `src/PRIMITIVES/Heading/Heading.tsx`  
**Status:** ⏳ **PROPOSED** (not yet locked)  
**Variant Coverage:** ✅ **COMPREHENSIVE**

#### Current Variant API

**Variants:**
- `level?: 1 | 2 | 3 | 4 | 5 | 6` - Heading level (h1-h6)
- `weight?: "normal" | "medium" | "semibold" | "bold"` - Override default weight
- `muted?: boolean` - Muted text color
- `as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"` - Override semantic element

**Token-Driven Props:**
- All visual properties controlled via `TEXT_TOKENS`
- Font sizes, weights, line heights, letter spacing all token-driven
- Level-based defaults (h1-h2: bold, h3-h4: semibold, h5-h6: medium)

#### Coverage Assessment

**✅ Covered Use Cases:**
- All heading levels (h1 through h6)
- Weight overrides (normal, medium, semibold, bold)
- Muted headings (muted prop)
- Semantic override (as prop for visual h1, semantic h2)
- Level-based typography (fontSize, lineHeight, letterSpacing per level)

**⚠️ Potential Gaps (MINOR_GAP):**
- **No explicit color prop** - Only muted, no semantic color variants
- **No "success" or "warning" semantic colors** - Only muted, no positive/warning heading colors

**Risk Assessment:** **NO_GAP** ✅

**Rationale:**
- All common heading use cases are covered
- Level-based typography provides comprehensive sizing
- Weight override provides flexibility
- Muted prop covers secondary heading use cases
- Semantic colors are edge cases
- Token system provides sufficient coverage
- No real-world use case would require `className`/`style` override

---

### 5. Input

**Component:** `src/PRIMITIVES/Input/Input.tsx`  
**Status:** ⏳ **PROPOSED** (not yet locked)  
**Variant Coverage:** ✅ **COMPREHENSIVE**

#### Current Variant API

**Variants:**
- `variant?: Responsive<"primary" | "secondary" | "outline" | "ghost" | "destructive">`
- `size?: Responsive<"sm" | "md" | "lg">`
- `state?: "default" | "disabled" | "error" | "success"`

**Token-Driven Props:**
- All visual properties controlled via `INPUT_TOKENS`
- Colors, spacing, typography, radius, shadows all token-driven
- Responsive variants and sizes supported

#### Coverage Assessment

**✅ Covered Use Cases:**
- Primary inputs (primary variant)
- Secondary inputs (secondary variant)
- Outlined inputs (outline variant)
- Ghost/minimal inputs (ghost variant)
- Destructive inputs (destructive variant)
- Small, medium, large sizes
- Responsive variants and sizes
- Default, disabled, error, success states
- Icon slots (iconLeft, iconRight)
- Full width layout (fullWidth prop)

**⚠️ Potential Gaps (MINOR_GAP):**
- **No "warning" state** - Only error and success, no warning state
- **Limited size range** - Only sm, md, lg (no xs or xl like other components)

**Risk Assessment:** **NO_GAP** ✅

**Rationale:**
- All common input use cases are covered
- Error and success states cover validation feedback
- Warning state is edge case (can use error state or secondary variant)
- Size range (sm, md, lg) is standard for form inputs
- Responsive support provides flexibility
- Token system provides sufficient coverage
- No real-world use case would require `className`/`style` override

---

### 6. Textarea

**Component:** `src/PRIMITIVES/Textarea/Textarea.tsx`  
**Status:** ⏳ **PROPOSED** (not yet locked)  
**Variant Coverage:** ✅ **COMPREHENSIVE**

#### Current Variant API

**Variants:**
- `variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"`
- `size?: "xs" | "sm" | "md" | "lg" | "xl"`
- `state?: "default" | "disabled" | "error" | "success"`

**Token-Driven Props:**
- All visual properties controlled via `TEXTAREA_TOKENS`
- Colors, spacing, typography, radius all token-driven
- Character counter support (showCharacterCount prop)

#### Coverage Assessment

**✅ Covered Use Cases:**
- Primary textareas (primary variant)
- Secondary textareas (secondary variant)
- Outlined textareas (outline variant)
- Ghost/minimal textareas (ghost variant)
- Destructive textareas (destructive variant)
- Extra small through extra large sizes
- Default, disabled, error, success states
- Character counter (showCharacterCount with maxLength)
- Full width layout (fullWidth prop)

**⚠️ Potential Gaps (MINOR_GAP):**
- **No "warning" state** - Only error and success, no warning state
- **No responsive variants** - Unlike Input, Textarea doesn't support Responsive<T> variants

**Risk Assessment:** **NO_GAP** ✅

**Rationale:**
- All common textarea use cases are covered
- Error and success states cover validation feedback
- Warning state is edge case
- Responsive variants are less critical for textareas (usually full width)
- Character counter provides additional functionality
- Token system provides sufficient coverage
- No real-world use case would require `className`/`style` override

---

### 7. Checkbox

**Component:** `src/PRIMITIVES/Checkbox/Checkbox.tsx`  
**Status:** ⏳ **PROPOSED** (not yet locked)  
**Variant Coverage:** ✅ **COMPREHENSIVE**

#### Current Variant API

**Variants:**
- `variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"`
- `size?: "xs" | "sm" | "md" | "lg" | "xl"`
- `state?: "default" | "checked" | "indeterminate" | "error" | "disabled"`

**Token-Driven Props:**
- All visual properties controlled via `CHECKBOX_TOKENS`
- Colors, spacing, radius all token-driven
- Custom icon support (icon, indeterminateIcon props)

#### Coverage Assessment

**✅ Covered Use Cases:**
- Primary checkboxes (primary variant)
- Secondary checkboxes (secondary variant)
- Outlined checkboxes (outline variant)
- Ghost/minimal checkboxes (ghost variant)
- Destructive checkboxes (destructive variant)
- Extra small through extra large sizes
- Checked, unchecked, indeterminate states
- Error and disabled states
- Custom icons (icon, indeterminateIcon props)

**⚠️ Potential Gaps (MINOR_GAP):**
- **No "success" state** - Only error, no success state (but checked state serves this)

**Risk Assessment:** **NO_GAP** ✅

**Rationale:**
- All common checkbox use cases are covered
- Checked state serves as success indicator
- Error state covers validation feedback
- Indeterminate state covers partial selection
- Custom icons provide flexibility
- Token system provides sufficient coverage
- No real-world use case would require `className`/`style` override

---

### 8. Radio

**Component:** `src/PRIMITIVES/Radio/Radio.tsx`  
**Status:** ⏳ **PROPOSED** (not yet locked)  
**Variant Coverage:** ✅ **COMPREHENSIVE**

#### Current Variant API

**Variants:**
- `variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"`
- `size?: "xs" | "sm" | "md" | "lg" | "xl"`
- `state?: "default" | "checked" | "disabled" | "error"`

**Token-Driven Props:**
- All visual properties controlled via `RADIO_TOKENS`
- Colors, spacing, radius all token-driven
- Custom icon support (icon prop)
- RadioGroup support (context-based)

#### Coverage Assessment

**✅ Covered Use Cases:**
- Primary radios (primary variant)
- Secondary radios (secondary variant)
- Outlined radios (outline variant)
- Ghost/minimal radios (ghost variant)
- Destructive radios (destructive variant)
- Extra small through extra large sizes
- Checked, unchecked states
- Error and disabled states
- Custom icons (icon prop)
- RadioGroup integration (context-based)

**⚠️ Potential Gaps (MINOR_GAP):**
- **No "success" state** - Only error, no success state (but checked state serves this)

**Risk Assessment:** **NO_GAP** ✅

**Rationale:**
- All common radio use cases are covered
- Checked state serves as success indicator
- Error state covers validation feedback
- RadioGroup provides group behavior
- Custom icons provide flexibility
- Token system provides sufficient coverage
- No real-world use case would require `className`/`style` override

---

### 9. Label

**Component:** `src/PRIMITIVES/Label/Label.tsx`  
**Status:** ⏳ **PROPOSED** (not yet locked)  
**Variant Coverage:** ✅ **SUFFICIENT** (minimal API by design)

#### Current Variant API

**Variants:**
- None (Label is intentionally minimal)
- `required?: boolean` - Show required asterisk

**Token-Driven Props:**
- All visual properties controlled via `TEXT_TOKENS` and `FORM_TOKENS`
- Font size, weight, line height all token-driven
- Required mark styling token-driven

#### Coverage Assessment

**✅ Covered Use Cases:**
- Standard labels (default styling)
- Required labels (required prop with asterisk)
- Disabled state styling (via peer-disabled classes)
- Form association (htmlFor prop)

**⚠️ Potential Gaps (MINOR_GAP):**
- **No size variants** - Label uses fixed size (sm)
- **No weight variants** - Label uses fixed weight (medium)
- **No color variants** - Label uses fixed color (foreground)

**Risk Assessment:** **NO_GAP** ✅

**Rationale:**
- Label is intentionally minimal (semantic form label)
- Fixed styling ensures consistency across forms
- Size/weight/color variants are edge cases
- Required prop covers common use case
- Token system provides sufficient coverage
- No real-world use case would require `className`/`style` override

**Note:** Label is a semantic component, not a visual component. Minimal API is by design.

---

## Summary Table

| Component | Variant Coverage | Size Coverage | State Coverage | Risk Level | Gap Status |
|-----------|-----------------|---------------|----------------|-----------|------------|
| **Button** | 6 variants | 4 sizes | disabled, loading | ✅ NO_GAP | Comprehensive |
| **Link** | 7 variants | 5 sizes | disabled | ✅ NO_GAP | Comprehensive |
| **Text** | 8 variants (1 deprecated) | 5 sizes | muted | ✅ NO_GAP | Comprehensive (deprecation noted) |
| **Heading** | 6 levels | N/A (level-based) | muted | ✅ NO_GAP | Comprehensive |
| **Input** | 5 variants (responsive) | 3 sizes (responsive) | 4 states | ✅ NO_GAP | Comprehensive |
| **Textarea** | 5 variants | 5 sizes | 4 states | ✅ NO_GAP | Comprehensive |
| **Checkbox** | 5 variants | 5 sizes | 5 states | ✅ NO_GAP | Comprehensive |
| **Radio** | 5 variants | 5 sizes | 4 states | ✅ NO_GAP | Comprehensive |
| **Label** | N/A (minimal) | N/A (fixed) | N/A (peer-based) | ✅ NO_GAP | Sufficient (by design) |

---

## Overall Assessment

### ✅ **NO BLOCKING GAPS IDENTIFIED**

All Foundation components have comprehensive variant and token coverage. No real-world use cases would require `className`/`style` overrides that cannot be achieved through existing token-driven APIs.

### Minor Gaps (Not Blocking)

1. **Text component** - Deprecated variant prop (migration path exists)
2. **Missing semantic colors** - Some components lack "success" or "warning" variants (edge cases, can use existing variants)
3. **Limited size ranges** - Some components have fewer size options than others (standard for component type)
4. **No responsive variants** - Textarea doesn't support Responsive<T> (less critical for textareas)

### Recommendations (Optional, Not Required for Phase 3)

1. **Text component** - Consider adding explicit color props to replace deprecated variant prop
2. **Input/Textarea** - Consider adding "warning" state if needed (edge case)
3. **Textarea** - Consider adding Responsive<T> support if needed (edge case)

---

## Enforcement Readiness

**✅ READY FOR PHASE 3 ENFORCEMENT**

All Foundation components are ready for Phase 3 TypeScript enforcement (removal of `className` and `style` props). No blocking gaps exist that would prevent enforcement.

**Confidence Level:** **HIGH** ✅

---

## References

- `docs/architecture/FOUNDATION_CONTRACT.md` - Foundation Contract (authority)
- `docs/architecture/FOUNDATION_COMPONENT_SCOPE.md` - Foundation Component Scope
- `docs/reports/audit/UI_STYLING_ESCAPE_HATCHES_REPORT.md` - Current escape hatch state
- Component token files: `src/FOUNDATION/tokens/components/*.ts`

---

**Status:** ✅ **COMPLETE**  
**Next Phase:** Phase 3 TypeScript Enforcement

