# Typography Foundation Contract

**Status:** ✅ ACTIVE  
**Priority:** P0  
**Date Created:** 2026-01-21  
**Version:** 1.0  
**Task:** TUI_TYPOGRAPHY_FOUNDATION_007

---

## Document Classification

**TYPE:** CONTRACT  
**MUTABILITY:** EVOLVABLE  
**RELATIONSHIP:** Complements `TYPOGRAPHY_AUTHORITY.md` (LOCKED)  
**AUTHORITY DOMAIN:** Typography Foundation Contract

**Purpose:** This document defines the typography contract for Tenerife UI, including contrast rules for text roles, vertical rhythm (baseline unit alignment), A11Y requirements, and enforcement plan. This contract complements the LOCKED TYPOGRAPHY_AUTHORITY and provides additional specifications for typography usage.

---

## Overview

This document establishes the typography foundation contract for Tenerife UI, defining:

1. **Typography Token Set** - Complete token definitions and verification
2. **Semantic Text Roles with Contrast** - Contrast requirements for each text role
3. **Vertical Rhythm** - Baseline unit alignment and line-height rules
4. **A11Y Typography Requirements** - Minimum font sizes and contrast compliance
5. **Enforcement Plan** - ESLint rules, migration strategy, and LOCK preparation

**Key Principle:** All typography must use semantic roles with defined contrast requirements, maintain vertical rhythm through baseline unit alignment, and comply with WCAG 2.1 Level AA accessibility standards.

---

## Relationship to Typography Authority

**TYPOGRAPHY_AUTHORITY.md** (LOCKED) defines:
- Canonical token scale and usage rules
- Component rules and forbidden patterns
- Token system integration

**TYPOGRAPHY_CONTRACT.md** (this document) defines:
- Contrast requirements for semantic text roles
- Vertical rhythm specifications (baseline unit alignment)
- A11Y compliance requirements
- Enforcement mechanisms

Both documents work together to ensure complete typography governance.

---

## 1. Typography Token Set

### 1.1 Token Verification

All typography tokens are defined in `src/FOUNDATION/tokens/typography.ts` and verified against TYPOGRAPHY_AUTHORITY.

**Source of Truth:** `src/FOUNDATION/tokens/typography.ts`

### 1.2 Font Families

**Canonical Values:**
- `fontFamily.sans` → Inter (primary sans-serif with fallbacks)
- `fontFamily.satoshi` → Satoshi (optional sans-serif with fallbacks)
- `fontFamily.display` → Clash Display (for headings and hero sections with fallbacks)
- `fontFamily.serif` → System serif font stack
- `fontFamily.mono` → System monospace font stack

**Verification:** ✅ All font families match TYPOGRAPHY_AUTHORITY specifications.

### 1.2.1 Font Supply Responsibility (Contract)

**Decision:** Fonts are consumer-owned. The library does **not** ship fonts and does **not** assume
display font availability at runtime.

**Rules:**
- Typography tokens must remain valid with system fallbacks.
- No `@font-face` declarations are allowed in Foundation.
- No font binaries are shipped in the repository.

**Non-goals:**
- Providing or bundling font files.
- Enforcing font installation in consuming apps.

### 1.3 Font Size Scale

**Fluid Typography Scale (using clamp()):**

| Token | Base Size | Min (rem) | Max (rem) | Fluid Formula |
|-------|-----------|----------|-----------|---------------|
| `fontSize.xs` | 12px | 0.75 | 0.875 | `clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)` |
| `fontSize.sm` | 14px | 0.875 | 1.0 | `clamp(0.875rem, 0.8rem + 0.25vw, 1rem)` |
| `fontSize.base` | 16px | 1.0 | 1.125 | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` |
| `fontSize.lg` | 18px | 1.125 | 1.25 | `clamp(1.125rem, 1rem + 0.5vw, 1.25rem)` |
| `fontSize.xl` | 20px | 1.25 | 1.5 | `clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)` |
| `fontSize["2xl"]` | 24px | 1.5 | 2.0 | `clamp(1.5rem, 1.25rem + 1.25vw, 2rem)` |
| `fontSize["3xl"]` | 30px | 1.875 | 2.5 | `clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)` |
| `fontSize["4xl"]` | 36px | 2.25 | 3.0 | `clamp(2.25rem, 1.75rem + 2.5vw, 3rem)` |
| `fontSize["5xl"]` | 48px | 3.0 | 4.0 | `clamp(3rem, 2rem + 5vw, 4rem)` |
| `fontSize["6xl"]` | 60px | 3.75 | 5.0 | `clamp(3.75rem, 2.5rem + 6.25vw, 5rem)` |
| `fontSize["7xl"]` | 72px | 4.5 | 6.0 | `clamp(4.5rem, 3rem + 7.5vw, 6rem)` (optional) |
| `fontSize["8xl"]` | 96px | 6.0 | 8.0 | `clamp(6rem, 4rem + 10vw, 8rem)` (optional) |
| `fontSize["9xl"]` | 128px | 8.0 | 12.0 | `clamp(8rem, 5rem + 15vw, 12rem)` (optional) |

**Verification:** ✅ All font sizes match TYPOGRAPHY_AUTHORITY specifications. No ad-hoc sizes detected.

### 1.4 Font Weight Scale

**Canonical Values:**
- `fontWeight.thin` → `100`
- `fontWeight.extralight` → `200`
- `fontWeight.light` → `300`
- `fontWeight.normal` → `400`
- `fontWeight.medium` → `500`
- `fontWeight.semibold` → `600`
- `fontWeight.bold` → `700`
- `fontWeight.extrabold` → `800`
- `fontWeight.black` → `900`

**Verification:** ✅ All font weights match TYPOGRAPHY_AUTHORITY specifications.

### 1.5 Line Height Tokens

**Canonical Values:**
- `lineHeight.none` → `1` (tight, no extra spacing)
- `lineHeight.tight` → `1.25` (compact)
- `lineHeight.snug` → `1.375` (slightly compact)
- `lineHeight.normal` → `1.5` (default, balanced)
- `lineHeight.relaxed` → `1.625` (spacious)
- `lineHeight.loose` → `2` (very spacious)

**Verification:** ✅ All line heights match TYPOGRAPHY_AUTHORITY specifications.

**Note:** Vertical rhythm alignment with baseline unit is defined in Section 3.

### 1.6 Letter Spacing Tokens

**Canonical Values:**
- `letterSpacing.tighter` → `-0.05em` (tightest)
- `letterSpacing.tight` → `-0.025em` (tight)
- `letterSpacing.normal` → `0em` (default, no adjustment)
- `letterSpacing.wide` → `0.025em` (wide)
- `letterSpacing.wider` → `0.05em` (wider)
- `letterSpacing.widest` → `0.1em` (widest)

**Verification:** ✅ All letter spacing values match TYPOGRAPHY_AUTHORITY specifications.

---

## 2. Semantic Text Roles with Contrast

### 2.1 Text Role Definitions

All semantic text roles are defined in `textStyles` object in `src/FOUNDATION/tokens/typography.ts`.

**Text Roles:**
- **Display** → Hero sections (display)
- **Headings** → Structural headings (h1, h2, h3, h4, h5, h6)
- **Body** → Main content (body, body-sm, body-xs)
- **Labels** → Form labels and metadata (label, label-sm)
- **Captions** → Supporting text (caption)

### 2.2 Contrast Requirements

**WCAG 2.1 Level AA Requirements:**
- **Normal text** (default): ≥4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt+ bold): ≥3:1 contrast ratio

**Text Size Classification:**
- **Large text:** Font size ≥18pt (24px) OR font size ≥14pt (18.67px) with font-weight ≥600 (semibold/bold)
- **Normal text:** All other text

### 2.3 Contrast Requirements by Role

**Note:** Typography Color Policy v1 defines allowed text-token combinations for each role. See `docs/architecture/typography/TYPOGRAPHY_COLOR_POLICY_v1.md` for complete policy.

#### Display Role

**Style:** `textStyles.display`
- Font size: `6xl` (60px base, scales 3.75rem-5rem)
- Font weight: `bold` (700)
- **Text classification:** Large text (≥18pt)
- **Minimum contrast:** ≥3:1

**Allowed text tokens (per Typography Color Policy v1):**
- `primary`, `inverse`
- **Restriction:** `inverse` only on dark surfaces

#### Heading Roles (h1-h6)

**H1 Style:** `textStyles.h1`
- Font size: `5xl` (48px base, scales 3rem-4rem)
- Font weight: `bold` (700)
- **Text classification:** Large text (≥18pt)
- **Minimum contrast:** ≥3:1

**H2 Style:** `textStyles.h2`
- Font size: `4xl` (36px base, scales 2.25rem-3rem)
- Font weight: `bold` (700)
- **Text classification:** Large text (≥18pt)
- **Minimum contrast:** ≥3:1

**H3 Style:** `textStyles.h3`
- Font size: `3xl` (30px base, scales 1.875rem-2.5rem)
- Font weight: `semibold` (600)
- **Text classification:** Large text (≥18pt)
- **Minimum contrast:** ≥3:1

**H4 Style:** `textStyles.h4`
- Font size: `2xl` (24px base, scales 1.5rem-2rem)
- Font weight: `semibold` (600)
- **Text classification:** Large text (≥18pt)
- **Minimum contrast:** ≥3:1

**H5 Style:** `textStyles.h5`
- Font size: `xl` (20px base, scales 1.25rem-1.5rem)
- Font weight: `medium` (500)
- **Text classification:** Large text (≥18pt, bold threshold met with medium weight at 20px)
- **Minimum contrast:** ≥3:1

**H6 Style:** `textStyles.h6`
- Font size: `lg` (18px base, scales 1.125rem-1.25rem)
- Font weight: `medium` (500)
- **Text classification:** Large text (≥18pt)
- **Minimum contrast:** ≥3:1

**Allowed text tokens (per Typography Color Policy v1):**
- `primary`, `secondary`

#### Body Text Roles

**Body Style:** `textStyles.body`
- Font size: `base` (16px base, scales 1rem-1.125rem)
- Font weight: `normal` (400)
- **Text classification:** Normal text
- **Minimum contrast:** ≥4.5:1

**Body Small Style:** `textStyles["body-sm"]`
- Font size: `sm` (14px base, scales 0.875rem-1rem)
- Font weight: `normal` (400)
- **Text classification:** Normal text
- **Minimum contrast:** ≥4.5:1

**Body Extra Small Style:** `textStyles["body-xs"]`
- Font size: `xs` (12px base, scales 0.75rem-0.875rem)
- Font weight: `normal` (400)
- **Text classification:** Normal text
- **Minimum contrast:** ≥4.5:1

**Allowed text tokens (per Typography Color Policy v1):**
- `primary`, `secondary`
- **Prohibited:** `tertiary`, `muted`, `inverse` (use `secondary` or `meta` role instead)

#### Label Roles

**Label Style:** `textStyles.label`
- Font size: `sm` (14px base, scales 0.875rem-1rem)
- Font weight: `medium` (500)
- **Text classification:** Normal text (14pt with medium weight does not meet large text threshold)
- **Minimum contrast:** ≥4.5:1

**Label Small Style:** `textStyles["label-sm"]`
- Font size: `xs` (12px base, scales 0.75rem-0.875rem)
- Font weight: `medium` (500)
- **Text classification:** Normal text
- **Minimum contrast:** ≥4.5:1

**Allowed text tokens (per Typography Color Policy v1):**
- `primary`, `secondary`
- **Prohibited:** `tertiary`, `inverse`

#### Caption Role

**Caption Style:** `textStyles.caption`
- Font size: `xs` (12px base, scales 0.75rem-0.875rem)
- Font weight: `normal` (400)
- **Text classification:** Normal text
- **Minimum contrast:** ≥4.5:1

**Allowed text tokens (per Typography Color Policy v1):**
- `primary` only (most restrictive policy)
- **Prohibited:** `secondary`, `tertiary`, `muted`, `inverse`

#### Meta Role

**Meta Style:** `textStyles.meta`
- Font size: `sm` (14px base, scales 0.875rem-1rem)
- Font weight: `normal` (400)
- **Text classification:** Normal text
- **Minimum contrast:** ≥4.5:1

**Allowed text tokens (per Typography Color Policy v1):**
- `muted` only
- **Usage:** Helper text, placeholder text, metadata, subtle annotations
- **Prohibited:** `primary`, `secondary`, `tertiary`, `inverse`

#### Disabled Role

**Disabled Style:** Uses `disabledColors.disabledForeground`
- **Text classification:** Normal text
- **Minimum contrast:** inherits (follows A11Y disabled policy)

**Allowed text tokens (per Typography Color Policy v1):**
- `disabled` only
- **Source:** `disabledColors.disabledForeground`
- **Usage:** Disabled text content

### 2.4 Contrast Verification

**Automated Verification:**
- Script: `scripts/typography-contrast-check.js`
- Report: `docs/reports/typography-contrast-audit.md`

**Verification Process:**
1. For each text role, test all allowed color combinations
2. Calculate contrast ratio using WCAG 2.1 formula
3. Verify against minimum contrast requirements
4. Document any exceptions or violations

---

## 3. Vertical Rhythm

**Policy Reference:** `docs/architecture/typography/TYPOGRAPHY_RHYTHM_POLICY_v1.md`

### 3.1 Baseline Unit

**Baseline Unit:** 8px (0.5rem)

**Source:** Spacing Authority (`docs/architecture/SPACING_AUTHORITY.md`)
- Base spacing unit: 8px (0.5rem)
- All spacing values are multiples of 8px for consistent layout rhythm

**Rule:** Typography vertical rhythm should align with the 8px baseline unit where possible.

### 3.2 Line Height Alignment

**Line Height Tokens and Baseline Alignment:**

| Token | Value | Baseline Alignment | Notes |
|-------|-------|-------------------|-------|
| `lineHeight.none` | `1` | Not aligned | Acceptable for display/headings (tight spacing) |
| `lineHeight.tight` | `1.25` | Not aligned | Acceptable for headings (compact spacing) |
| `lineHeight.snug` | `1.375` | Not aligned | Acceptable for headings (slightly compact) |
| `lineHeight.normal` | `1.5` | Aligned (1.5 × baseline) | Default, balanced |
| `lineHeight.relaxed` | `1.625` | Not aligned | Acceptable for body text (spacious) |
| `lineHeight.loose` | `2` | Aligned (2 × baseline) | Very spacious |

**Rule:** Line heights should be multiples of the baseline unit (0.5rem) where possible. Exceptions are acceptable for:
- Display and heading styles (tight line-height for visual hierarchy)
- Body text (relaxed line-height for readability)

### 3.3 Font Size Line Height Alignment

**Font Size Line Heights (from fontSize[x][1].lineHeight):**

| Font Size | Line Height | Baseline Alignment | Notes |
|-----------|-------------|-------------------|-------|
| `xs` | `1rem` (16px) | Aligned (2 × baseline) | ✅ |
| `sm` | `1.25rem` (20px) | Not aligned | Acceptable (2.5 × baseline) |
| `base` | `1.5rem` (24px) | Aligned (3 × baseline) | ✅ |
| `lg` | `1.75rem` (28px) | Not aligned | Acceptable (3.5 × baseline) |
| `xl` | `1.75rem` (28px) | Not aligned | Acceptable (3.5 × baseline) |
| `2xl` | `2rem` (32px) | Aligned (4 × baseline) | ✅ |
| `3xl` | `2.25rem` (36px) | Not aligned | Acceptable (4.5 × baseline) |
| `4xl` | `2.5rem` (40px) | Aligned (5 × baseline) | ✅ |
| `5xl` | `1` (unitless) | Not applicable | Display style (tight) |
| `6xl` | `1` (unitless) | Not applicable | Display style (tight) |
| `7xl` | `1` (unitless) | Not applicable | Display style (tight) |
| `8xl` | `1` (unitless) | Not applicable | Display style (tight) |
| `9xl` | `1` (unitless) | Not applicable | Display style (tight) |

**Rule:** Font size line heights should align with baseline unit where possible. Display styles (5xl-9xl) use unitless line-height (1) for tight spacing, which is acceptable.

### 3.4 Vertical Spacing Rules

**Spacing Between Text Elements:**

1. **Headings and Body Text:**
   - Use spacing tokens that align with baseline unit
   - Recommended: `spacing[4]` (16px, 2 × baseline) or `spacing[6]` (24px, 3 × baseline)

2. **Paragraph Spacing:**
   - Use spacing tokens that align with baseline unit
   - Recommended: `spacing[4]` (16px, 2 × baseline) or `spacing[6]` (24px, 3 × baseline)

3. **List Item Spacing:**
   - Use spacing tokens that align with baseline unit
   - Recommended: `spacing[2]` (8px, 1 × baseline) or `spacing[4]` (16px, 2 × baseline)

**Rule:** Vertical spacing between text elements should use spacing tokens that align with the baseline unit (8px multiples).

---

## 4. A11Y Typography Requirements

### 4.1 Minimum Font Size

**WCAG 2.1 Recommendation:**
- Minimum font size: 12px (0.75rem)

**Tenerife UI Compliance:**
- ✅ Minimum font size: `fontSize.xs = clamp(0.75rem, ...)` (12px base)
- ✅ All font sizes meet or exceed minimum requirement

**Rule:** All typography must use font sizes ≥12px (0.75rem). The smallest font size token (`fontSize.xs`) meets this requirement.

### 4.2 Contrast Compliance

**WCAG 2.1 Level AA Requirements:**
- Normal text: ≥4.5:1 contrast ratio
- Large text: ≥3:1 contrast ratio

**Tenerife UI Compliance:**
- All text roles have defined contrast requirements (Section 2.3)
- Automated verification via `scripts/typography-contrast-check.js`
- Report: `docs/reports/typography-contrast-audit.md`

**Rule:** All typography must meet WCAG 2.1 Level AA contrast requirements. Contrast is verified for each text role against allowed color combinations.

### 4.3 Text Scaling

**Responsive Typography:**
- All font sizes use fluid typography with `clamp()` for responsive scaling
- Font sizes scale smoothly between min and max values based on viewport width

**Rule:** Typography must support text scaling up to 200% without loss of functionality or readability.

### 4.4 A11Y Exceptions

**Documented Exceptions:**
- See `docs/reports/typography-contrast-audit.md` for complete list of violations
- Most violations are expected (e.g., inverse text on light backgrounds, tertiary text on light surfaces)
- These combinations should not be used in practice

**Expected Violations (Not Actual Exceptions):**
- `inverse` text color on light backgrounds (day mode) - inverse is for dark backgrounds only
- `tertiary` text color on light surfaces - tertiary is for subtle text, may not meet contrast on all surfaces
- `secondary` text color on some elevated surfaces - may be close to threshold

**Rule:** Use appropriate text colors for backgrounds:
- Light backgrounds (day mode): Use `primary`, `secondary`, `tertiary`, or `muted` text colors
- Dark backgrounds (night mode): Use `primary`, `secondary`, `tertiary`, or `muted` text colors
- `inverse` text color should only be used on contrasting backgrounds (dark text on light bg, light text on dark bg)

**Exception Documentation Format:**
- Exception ID
- Text role and color combination
- Measured contrast ratio
- Required contrast ratio
- Justification
- Status (ACCEPTED_EXCEPTION or REQUIRES_FIX)

---

## 5. Enforcement Plan

### 5.1 ESLint Rules

**Existing Rules:**
- ✅ `no-raw-font-size-scale` - Prevents non-canonical font-size values
- ✅ `no-raw-line-height-scale` - Prevents non-canonical line-height values

**Rule Verification:**
- Both rules are active and enforced
- Rules prevent ad-hoc typography values

**Future Enhancements (Optional):**
- `prefer-text-styles` - Encourage use of semantic text styles over individual tokens
- `typography-contrast-warning` - Warn about potential contrast violations (non-blocking)

### 5.2 Automated Verification

**Contrast Verification Script:**
- Location: `scripts/typography-contrast-check.js`
- Purpose: Verify contrast compliance for all text roles
- Execution: `pnpm typography:contrast-check`
- Report Generation: Set `EXPORT_RESULTS=true` environment variable to generate report

**Verification Report:**
- Location: `docs/reports/typography-contrast-audit.md`
- Updated: On each contrast verification run
- Status: Documents pass/fail for each text role and color combination

### 5.3 Migration Strategy

**Current State:**
- Typography tokens are defined and verified
- Text roles are defined in `textStyles`
- ESLint rules prevent ad-hoc values

**Migration Requirements:**
- Audit existing code for direct font-size/line-height usage
- Migrate to semantic text roles where possible
- Document any breaking changes

**Migration Documentation:**
- Location: `docs/migrations/typography-migration.md` (if needed)
- Status: Not required if no breaking changes

### 5.4 LOCK Preparation

**Contract Status:**
- Current: ACTIVE
- Target: LOCKED (after verification and enforcement)

**LOCK Requirements:**
1. ✅ Typography tokens verified
2. ✅ Contrast requirements defined
3. ✅ Vertical rhythm rules defined
4. ✅ A11Y requirements documented
5. ✅ Enforcement mechanisms in place
6. ✅ Contrast verification script created and tested
7. ✅ Contrast audit report generated
8. ✅ ESLint rules verified

**LOCK Process:**
1. Complete all verification steps
2. Generate contrast audit report
3. Update FOUNDATION_LOCK.md (if required)
4. Change contract status to LOCKED

---

## Related Documents

- `docs/architecture/TYPOGRAPHY_AUTHORITY.md` - LOCKED Typography Authority (complementary)
- `docs/architecture/typography/TYPOGRAPHY_COLOR_POLICY_v1.md` - Typography Color Policy v1 (CANON)
- `docs/architecture/closed-system/CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON.md` - Typography Semantics Canon (semantic vs presentational usage rules)
- `docs/architecture/SPACING_AUTHORITY.md` - Spacing Authority (baseline unit source)
- `docs/architecture/A11Y_AUTHORITY.md` - A11Y Authority (accessibility rules)
- `src/FOUNDATION/tokens/typography.ts` - Typography token definitions with role policy
- `src/FOUNDATION/tokens/colors.ts` - Color token definitions (for contrast verification)
- `scripts/typography-contrast-check.js` - Contrast verification script
- `docs/reports/typography-contrast-audit.md` - Contrast audit report
- `docs/migrations/typography-color-policy-migration.md` - Migration guide

---

**Status:** ✅ **ACTIVE**  
**Version:** 1.0  
**Date Created:** 2026-01-21  
**Last Updated:** 2026-01-21  
**Priority:** P0  
**Task:** TUI_TYPOGRAPHY_FOUNDATION_007
