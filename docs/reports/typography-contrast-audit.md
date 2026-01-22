# Typography Contrast Audit Report

**Status:** ❌ FAIL  
**Date Created:** 2026-01-21  
**Task:** TUI_TYPOGRAPHY_COLOR_POLICY_CANON_008  
**Scope:** All semantic text roles (display, h1-h6, body, label, caption, meta, disabled) for both themes (day/night)  
**Policy:** Typography Color Policy v1 - Only allowed role × text-token combinations tested

---

## Executive Summary

This report documents the comprehensive contrast ratio validation for all semantic text roles across both day and night themes.

**WCAG 2.1 Level AA Requirements:**
- Normal text: ≥4.5:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): ≥3:1 contrast ratio

---

## Results

**Total Combinations Tested:** 302  
**Passed:** 290 (96.0%)  
**Failed:** 12 (4.0%)

---

## Violations

- `day:body` (secondary on elevated2): 4.36:1 (expected ≥4.5:1)
- `day:body` (secondary on elevated3): 4.16:1 (expected ≥4.5:1)
- `day:body-sm` (secondary on elevated2): 4.36:1 (expected ≥4.5:1)
- `day:body-sm` (secondary on elevated3): 4.16:1 (expected ≥4.5:1)
- `day:body-xs` (secondary on elevated2): 4.36:1 (expected ≥4.5:1)
- `day:body-xs` (secondary on elevated3): 4.16:1 (expected ≥4.5:1)
- `day:label` (secondary on elevated2): 4.36:1 (expected ≥4.5:1)
- `day:label` (secondary on elevated3): 4.16:1 (expected ≥4.5:1)
- `day:label-sm` (secondary on elevated2): 4.36:1 (expected ≥4.5:1)
- `day:label-sm` (secondary on elevated3): 4.16:1 (expected ≥4.5:1)
- `day:disabled` (disabled on disabled): 2.61:1 (expected ≥4.5:1)
- `night:disabled` (disabled on disabled): 3.92:1 (expected ≥4.5:1)

---

## Role Summary

### display
- **Total:** 12
- **Passed:** 12
- **Failed:** 0
- **Min Contrast:** ≥3:1
- **Allowed Text Tokens:** primary, inverse

### h1
- **Total:** 24
- **Passed:** 24
- **Failed:** 0
- **Min Contrast:** ≥3:1
- **Allowed Text Tokens:** primary, secondary

### h2
- **Total:** 24
- **Passed:** 24
- **Failed:** 0
- **Min Contrast:** ≥3:1
- **Allowed Text Tokens:** primary, secondary

### h3
- **Total:** 24
- **Passed:** 24
- **Failed:** 0
- **Min Contrast:** ≥3:1
- **Allowed Text Tokens:** primary, secondary

### h4
- **Total:** 24
- **Passed:** 24
- **Failed:** 0
- **Min Contrast:** ≥3:1
- **Allowed Text Tokens:** primary, secondary

### h5
- **Total:** 24
- **Passed:** 24
- **Failed:** 0
- **Min Contrast:** ≥3:1
- **Allowed Text Tokens:** primary, secondary

### h6
- **Total:** 24
- **Passed:** 24
- **Failed:** 0
- **Min Contrast:** ≥3:1
- **Allowed Text Tokens:** primary, secondary

### body
- **Total:** 24
- **Passed:** 22
- **Failed:** 2
- **Min Contrast:** ≥4.5:1
- **Allowed Text Tokens:** primary, secondary

### body-sm
- **Total:** 24
- **Passed:** 22
- **Failed:** 2
- **Min Contrast:** ≥4.5:1
- **Allowed Text Tokens:** primary, secondary

### body-xs
- **Total:** 24
- **Passed:** 22
- **Failed:** 2
- **Min Contrast:** ≥4.5:1
- **Allowed Text Tokens:** primary, secondary

### label
- **Total:** 24
- **Passed:** 22
- **Failed:** 2
- **Min Contrast:** ≥4.5:1
- **Allowed Text Tokens:** primary, secondary

### label-sm
- **Total:** 24
- **Passed:** 22
- **Failed:** 2
- **Min Contrast:** ≥4.5:1
- **Allowed Text Tokens:** primary, secondary

### caption
- **Total:** 12
- **Passed:** 12
- **Failed:** 0
- **Min Contrast:** ≥4.5:1
- **Allowed Text Tokens:** primary

### meta
- **Total:** 12
- **Passed:** 12
- **Failed:** 0
- **Min Contrast:** ≥4.5:1
- **Allowed Text Tokens:** muted

### disabled
- **Total:** 2
- **Passed:** 0
- **Failed:** 2
- **Min Contrast:** ≥4.5:1
- **Allowed Text Tokens:** disabled

---

## Methodology

The audit uses `scripts/typography-contrast-check.js` that:

1. Imports typography tokens and `typographyRolePolicy` from `src/FOUNDATION/tokens/typography.ts`
2. Imports color tokens from `src/FOUNDATION/tokens/colors.ts` (textColors, disabledColors)
3. Validates only allowed role × text-token combinations per Typography Color Policy v1
4. Excludes architecturally forbidden combinations (inverse on light surfaces, etc.)
5. Calculates contrast ratios using WCAG 2.1 formula
6. Validates against WCAG AA requirements (4.5:1 for normal text, 3:1 for large text)

**Policy Compliance:**
- Only combinations defined in `typographyRolePolicy` are tested
- Forbidden combinations are excluded (not false-positives)
- Report shows only real A11Y violations

---

**Report Generated:** 2026-01-21  
**Script Version:** 1.0
