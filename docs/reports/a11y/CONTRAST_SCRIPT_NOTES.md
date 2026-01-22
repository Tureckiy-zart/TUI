# Contrast Check Script Notes

**Status:** ✅ ARCHITECTURALLY LOCKED  
**Date Created:** 2025-01-20  
**Date Updated:** 2026-01-21  
**Task:** TUI_A11Y_SCRIPT_RUNTIME_ALIGNMENT → TUI_A11Y_CONTRAST_LOCK_AND_EXCEPTION  
**Scope:** Runtime token resolution alignment for a11y-contrast-check.js → Final A11Y contrast closure

---

## Executive Summary

The `a11y-contrast-check.js` script has been updated to align with runtime token architecture. The script now uses the same token resolution logic as the runtime UI, including:

- Runtime text color selection via `selectTextColorByBackground` for night mode button states
- Link hover canon compliance (no color change on hover, underline only)
- Direct state matrix values for button states

---

## Known False Positives

The following violations are documented as **KNOWN_FALSE_POSITIVES** because they represent architectural limitations or edge cases that don't reflect actual UI runtime behavior:

### 1. `night:button.secondary.base` / `night:button.secondary.hover`

**Violation:** 1.33 / 2.62 (expected ≥ 3.0)

**Reason:** Secondary button colors in night mode (`secondaryColors[600]`, `secondaryColors[700]`) have inherent contrast limitations with the selected text color. The runtime uses `selectTextColorByBackground` to choose the best available text color, but the base color values in `colors.ts` don't provide sufficient contrast for large text (3.0:1 requirement).

**Runtime Behavior:** The UI uses the same logic as the script (`selectTextColorByBackground`), so this violation reflects a real contrast issue that may need color palette adjustment in a future task.

**Status:** ⚠️ **REAL VIOLATION** (not false positive) - requires color palette adjustment

---

### 2. `night:link.destructive.base` / `night:link.destructive.hover`

**Violation:** 1.99 (expected ≥ 4.5)

**Reason:** Destructive links use `semanticColors.night.error` which has low contrast against `baseColors.night.background`. However, in runtime, links use CSS variables (`text-destructive`) which may be overridden by theme.

**Runtime Behavior:** Links use `text-destructive` CSS variable, which resolves to `semanticColors.night.error` in base theme. The violation is accurate for base theme.

**Status:** ⚠️ **REAL VIOLATION** (not false positive) - requires semantic color adjustment

---

### 3. `day:input.error`

**Violation:** 1.00 (expected ≥ 4.5)

**Reason:** Input error message uses `semanticColors.day.errorForeground` (white: `"0 0% 100%"`) on `baseColors.day.background` (white: `"0 0% 100%"`), resulting in 1.00:1 contrast.

**Runtime Behavior:** Input error messages use `text-destructive-foreground` CSS variable via `INPUT_TOKENS.message.color.error`. The violation is accurate - error messages should not use white text on white background.

**Status:** ⚠️ **REAL VIOLATION** (not false positive) - requires semantic color adjustment

---

### 4. `night:toast.success` / `day:info badge` / `night:success badge`

**Violations:** 2.32 / 2.85 / 2.32 (expected ≥ 3.0)

**Reason:** These elements use semantic colors with opacity backgrounds (`bg-success/10`, `bg-info/10`) which affect contrast calculation. The script checks foreground against solid background, but runtime uses semi-transparent backgrounds.

**Runtime Behavior:** 
- Toast success: Uses `bg-success/10 border-success/20 text-[hsl(var(--semantic-success-foreground))]` - semi-transparent background
- Badge success/info: Uses `bg-[hsl(var(--semantic-success))]` with `text-[hsl(var(--semantic-success-foreground))]` - solid background

**Status:** ⚠️ **PARTIAL FALSE POSITIVE** - Toast uses opacity backgrounds which improve contrast in runtime, but badge violations are real

---

## Script Alignment Changes

### 1. Runtime Text Selection Logic

Added `selectTextColorByBackground` function to match `states.ts` logic:

```javascript
function selectTextColorByBackground(background, foreground, inverse, mode) {
  if (isLightBackground(background)) {
    return mode === "day" ? foreground : inverse;
  } else {
    return mode === "day" ? inverse : foreground;
  }
}
```

### 2. Link Hover Canon Compliance

Links no longer change color on hover (canon compliance):
- Base and hover states use the same color
- Hover effect is underline only (visual, not color change)

### 3. Night Button States

Night mode button states now use runtime text selection from state matrix:
- `nightButtonStates.button.secondary.base.text` (already uses `selectTextColorByBackground`)
- `nightButtonStates.button.secondary.hover.text`
- `nightButtonStates.button.accent.hover.text`
- `nightButtonStates.button.accent.active.text`

---

## Final State Summary

**Status:** ✅ **ARCHITECTURALLY LOCKED**  
**Date:** 2026-01-21  
**Task:** TUI_A11Y_CONTRAST_LOCK_AND_EXCEPTION

### Resolution Summary

All WCAG 2.1 AA contrast violations have been addressed through:
1. ✅ Token system normalization (TUI_TOKEN_A11Y_CONTRAST_FINALIZATION)
2. ✅ Runtime script alignment (TUI_A11Y_SCRIPT_RUNTIME_ALIGNMENT)
3. ✅ Color palette rebalancing (TUI_COLOR_PALETTE_A11Y_REBALANCE)

### Accepted Exception

**Exception ID:** `A11Y_CONTRAST_NIGHT_DESTRUCTIVE_DISABLED`  
**Violation:** `night:button.destructive.disabled text`  
**Measured Contrast:** 4.39:1  
**Required Contrast:** 4.5:1  
**Status:** ✅ **ACCEPTED_EXCEPTION**

**Reason:** Mathematically unresolvable conflict between WCAG requirements when using a single `semanticColors.night.error` value for:
- Text color on dark background (`night:link.destructive.base/hover`)
- White text on error surface (`night:button.destructive.disabled`)

**Constraints:**
- Single `semanticColors.night.error` value must be used
- `errorForeground` is fixed as white (`"0 0% 100%"`)
- Token architecture changes are forbidden
- Only palette-level adjustments are allowed

**Resolution Options (Out of Scope):**
- Role-based error tokens (separate values for links vs buttons)
- Non-white `errorForeground` in night mode
- Separate destructive colors for links/buttons

**Current Palette State:**
- `semanticColors.night.error`: `"0 78.5% 54.00%"`
- `semanticColors.night.errorForeground`: `"0 0% 100%"`

**Mathematical Analysis:**
- Increasing `error` lightness improves contrast for links on dark background but degrades white-on-error contrast
- Decreasing `error` lightness improves white-on-error contrast but degrades link contrast
- No single value satisfies both requirements simultaneously

---

## Script Verification

The script accurately reflects runtime token resolution:
- ✅ Uses `getButtonStateMatrix` for button states
- ✅ Uses `selectTextColorByBackground` logic for night mode
- ✅ Respects link hover canon (no color change)
- ✅ Checks actual state matrix values
- ✅ Validates all accessible color combinations

**Script Status:** ✅ **ALIGNED WITH RUNTIME ARCHITECTURE**

---

## Governance

**Lock Level:** FOUNDATION  
**Change Policy:** Any future contrast changes require a new TUNG with token architecture review or semantic foreground policy revision.  
**Regression Policy:** New contrast violations are considered architectural regressions.

---

**Report Generated:** 2025-01-20  
**Final Update:** 2026-01-21  
**Script Version:** Runtime-aligned  
**A11Y Contrast Status:** ✅ **ARCHITECTURALLY CLOSED**
