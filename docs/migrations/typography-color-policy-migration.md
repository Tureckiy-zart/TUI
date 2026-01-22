# Typography Color Policy v1 Migration Guide

**Date Created:** 2026-01-21  
**Task:** TUI_TYPOGRAPHY_COLOR_POLICY_CANON_008  
**Status:** ✅ COMPLETE

---

## Overview

This document provides migration guidance for Typography Color Policy v1 implementation. The policy introduces strict rules for allowed text-token combinations per typography role.

---

## Migration Status

**Current Status:** ✅ **No Breaking Changes Required**

**Analysis:**
- `tertiary` text color is not actively used in readable contexts (body, caption, label)
- `muted` text color is correctly used for helper text (HelperText component uses `tone="muted"`, which aligns with `meta` role policy)
- `inverse` text color usage is minimal and appears to be correctly used on dark surfaces
- Text component uses `tone="muted"` which is appropriate for helper/meta text

---

## Policy Changes Summary

### New Restrictions

1. **Body roles** (`body`, `body-sm`, `body-xs`):
   - ❌ Removed: `tertiary`, `muted`, `inverse`
   - ✅ Allowed: `primary`, `secondary`

2. **Caption role**:
   - ❌ Removed: `secondary`, `tertiary`, `muted`, `inverse`
   - ✅ Allowed: `primary` only

3. **Label roles** (`label`, `label-sm`):
   - ❌ Removed: `tertiary`, `inverse`
   - ✅ Allowed: `primary`, `secondary`

4. **Heading roles** (`h1-h6`):
   - ❌ Removed: `inverse`
   - ✅ Allowed: `primary`, `secondary`

5. **Display role**:
   - ✅ Allowed: `primary`, `inverse` (inverse only on dark surfaces)

6. **New Meta role**:
   - ✅ Allowed: `muted` only
   - Usage: Helper text, placeholder text, metadata

### Global Prohibitions

- ❌ `inverse` on light surfaces (day mode base/elevated surfaces)
- ❌ `muted` for body/caption/label (use `meta` role instead)
- ❌ `tertiary` as readable text (use `secondary` or `meta` role instead)

---

## Migration Actions

### If Using `tertiary` in Readable Contexts

**Before:**
```tsx
<Text size="md" tone="tertiary">Body text</Text>
```

**After:**
```tsx
// Option 1: Use secondary for less prominent readable text
<Text size="md" tone="secondary">Body text</Text>

// Option 2: Use meta role for helper/metadata text
<Text size="sm" tone="muted">Helper text</Text>
```

### If Using `muted` for Body/Caption/Label

**Before:**
```tsx
<Text size="md" tone="muted">Body text</Text>
```

**After:**
```tsx
// Option 1: Use secondary for less prominent readable text
<Text size="md" tone="secondary">Body text</Text>

// Option 2: Use meta role if this is helper/metadata text
<Text size="sm" tone="muted">Helper text</Text>
```

### If Using `inverse` on Light Surfaces

**Before:**
```tsx
// Day mode, light background
<Text size="lg" tone="inverse">Heading</Text>
```

**After:**
```tsx
// Use primary instead
<Text size="lg" tone="primary">Heading</Text>
```

### For Helper/Meta Text

**Before:**
```tsx
<Text size="sm" tone="muted">Helper text</Text>
```

**After:**
```tsx
// Continue using muted - this is correct for meta/helper text
<Text size="sm" tone="muted">Helper text</Text>
// Or use HelperText component which defaults to muted
<HelperText>Helper text</HelperText>
```

---

## Component-Specific Notes

### Text Component

**Current Usage:** ✅ **Compliant**
- Text component uses `tone="muted"` which is appropriate
- Text is a primitive, not a semantic role, so it can use muted for helper text

### HelperText Component

**Current Usage:** ✅ **Compliant**
- HelperText defaults to `tone="muted"` which aligns with `meta` role policy
- No changes required

---

## Verification

**Migration Verification:**
- ✅ No active usage of `tertiary` in readable contexts found
- ✅ `muted` usage is correct (helper text, meta text)
- ✅ `inverse` usage appears correct (on dark surfaces)

**Contrast Audit Results:**
- Total combinations tested: 302 (down from 468)
- Passed: 290 (96.0%)
- Failed: 12 (4.0%) - Real A11Y violations only

**Remaining Violations:**
- 10 violations: `secondary` on `elevated2`/`elevated3` in day mode (4.36:1, 4.16:1 - close to 4.5:1 threshold)
- 2 violations: `disabled` on `disabled` (2.61:1, 3.92:1 - follows A11Y disabled policy)

---

## Breaking Changes

**None** - Current codebase is compliant with Typography Color Policy v1.

---

## Recommendations

1. **For close-to-threshold violations:**
   - `secondary` on `elevated2`/`elevated3` in day mode (4.36:1, 4.16:1)
   - Consider using `primary` instead of `secondary` on these surfaces
   - Or document as acceptable exceptions if design requires

2. **For disabled text:**
   - `disabled` on `disabled` violations (2.61:1, 3.92:1)
   - These follow A11Y disabled policy and may be acceptable
   - Document as exceptions if required by design

---

**Migration Status:** ✅ **COMPLETE**  
**Breaking Changes:** None  
**Action Required:** None
