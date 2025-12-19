# Typography Authority Contract

**Status:** ✅ LOCKED  
**Priority:** BLOCKER  
**Date Created:** 2025-12-16  
**Version:** 1.1  
**Enforcement:** TUNG_TOKEN_AUTHORITY_EXPANSION_PLAN

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ LOCKED  
**AUTHORITY DOMAIN:** Typography Authority

**Purpose:** This document defines the canonical declarative rules for typography token usage across all UI components. It establishes architectural law that cannot be changed without explicit unlock procedure.

---

## Overview

This document defines the canonical Typography Authority contract for all UI components. It establishes the rules for typography token usage (font-size, line-height, font-weight, letter-spacing, font-family), ensuring consistent typography hierarchy and readability across the design system.

**Key Principle:** All typography values must come from the canonical typography token system. Components cannot introduce arbitrary typography values that break typography hierarchy and readability.

---

## Canonical Token Scale Table

The following table defines the canonical typography token scale with key, meaning, and example values:

| Key | Meaning | Example Value |
|-----|---------|---------------|
| `fontFamily.sans` | Primary sans-serif | Inter with fallbacks |
| `fontFamily.display` | Display font | Clash Display with fallbacks |
| `fontSize.xs` | Extra small | `clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)` |
| `fontSize.sm` | Small | `clamp(0.875rem, 0.8rem + 0.25vw, 1rem)` |
| `fontSize.base` | Base (default) | `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` |
| `fontSize.lg` | Large | `clamp(1.125rem, 1rem + 0.5vw, 1.25rem)` |
| `fontSize.xl` | Extra large | `clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)` |
| `fontSize["2xl"]` | 2XL | `clamp(1.5rem, 1.25rem + 1.25vw, 2rem)` |
| `fontWeight.normal` | Normal weight | `400` |
| `fontWeight.medium` | Medium weight | `500` |
| `fontWeight.semibold` | Semibold weight | `600` |
| `fontWeight.bold` | Bold weight | `700` |
| `lineHeight.tight` | Tight line height | `1.25` |
| `lineHeight.normal` | Normal line height | `1.5` |
| `lineHeight.relaxed` | Relaxed line height | `1.625` |
| `letterSpacing.tight` | Tight tracking | `-0.025em` |
| `letterSpacing.normal` | Normal tracking | `0em` |
| `letterSpacing.wide` | Wide tracking | `0.025em` |
| `textStyles.h1` | Heading 1 style | Display font, 5xl, bold |
| `textStyles.body` | Body text style | Sans font, base, normal, relaxed |
| `textStyles.label` | Label text style | Sans font, sm, medium, wide |

**Rule:** All typography tokens must reference values from this canonical scale. Font sizes use fluid typography with `clamp()` for responsive scaling.

---

## Authority Chain

**Typography Authority** is the single source of truth for all typography values across all UI components in the design system.

**Authority Hierarchy:**
1. **Typography Authority Contract** (this document) - Defines rules and constraints
2. **Token System** - `src/tokens/typography.ts` provides canonical token definitions
3. **Component Implementation** - Components consume typography tokens only
4. **Typography System** - Typography tokens ensure consistent hierarchy and readability

---

## Canonical Token Scale

The Typography Authority defines five categories of typography tokens:

### 1. Font Family Tokens

Font family tokens define the canonical font stacks for different use cases.

**Canonical Values:**
- `sans` → Inter (primary sans-serif font with fallbacks)
- `satoshi` → Satoshi (optional sans-serif font with fallbacks)
- `display` → Clash Display (for headings and hero sections with fallbacks)
- `serif` → System serif font stack
- `mono` → System monospace font stack

**Rule:** Font families MUST use the canonical font stacks defined in the token system. Components cannot introduce custom font families.

### 2. Font Size Tokens

Font size tokens use fluid typography with `clamp()` for responsive scaling.

**Canonical Values:**
- `xs` → `clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)` (12px base, scales 0.75rem-0.875rem)
- `sm` → `clamp(0.875rem, 0.8rem + 0.25vw, 1rem)` (14px base, scales 0.875rem-1rem)
- `base` → `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` (16px base, scales 1rem-1.125rem)
- `lg` → `clamp(1.125rem, 1rem + 0.5vw, 1.25rem)` (18px base, scales 1.125rem-1.25rem)
- `xl` → `clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)` (20px base, scales 1.25rem-1.5rem)
- `2xl` → `clamp(1.5rem, 1.25rem + 1.25vw, 2rem)` (24px base, scales 1.5rem-2rem)
- `3xl` → `clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)` (30px base, scales 1.875rem-2.5rem)
- `4xl` → `clamp(2.25rem, 1.75rem + 2.5vw, 3rem)` (36px base, scales 2.25rem-3rem)
- `5xl` → `clamp(3rem, 2rem + 5vw, 4rem)` (48px base, scales 3rem-4rem)
- `6xl` → `clamp(3.75rem, 2.5rem + 6.25vw, 5rem)` (60px base, scales 3.75rem-5rem)
- `7xl` → `clamp(4.5rem, 3rem + 7.5vw, 6rem)` (72px base, scales 4.5rem-6rem) - optional
- `8xl` → `clamp(6rem, 4rem + 10vw, 8rem)` (96px base, scales 6rem-8rem) - optional
- `9xl` → `clamp(8rem, 5rem + 15vw, 12rem)` (128px base, scales 8rem-12rem) - optional

**Rule:** Font sizes MUST use the canonical fluid typography scale. Each size includes line-height and letter-spacing as part of the token definition.

### 3. Font Weight Tokens

Font weight tokens define the canonical font weights available in the design system.

**Canonical Values:**
- `thin` → `100`
- `extralight` → `200`
- `light` → `300`
- `normal` → `400`
- `medium` → `500`
- `semibold` → `600`
- `bold` → `700`
- `extrabold` → `800`
- `black` → `900`

**Rule:** Font weights MUST use the canonical weight tokens. Components cannot use arbitrary weight values.

### 4. Line Height Tokens

Line height tokens define the canonical line heights for vertical rhythm and readability.

**Canonical Values:**
- `none` → `1` (tight, no extra spacing)
- `tight` → `1.25` (compact)
- `snug` → `1.375` (slightly compact)
- `normal` → `1.5` (default, balanced)
- `relaxed` → `1.625` (spacious)
- `loose` → `2` (very spacious)

**Rule:** Line heights MUST use the canonical line height tokens. Components cannot use arbitrary line height values.

### 5. Letter Spacing Tokens

Letter spacing tokens define the canonical letter spacing (tracking) values.

**Canonical Values:**
- `tighter` → `-0.05em` (tightest)
- `tight` → `-0.025em` (tight)
- `normal` → `0em` (default, no adjustment)
- `wide` → `0.025em` (wide)
- `wider` → `0.05em` (wider)
- `widest` → `0.1em` (widest)

**Rule:** Letter spacing MUST use the canonical letter spacing tokens. Components cannot use arbitrary letter spacing values.

### 6. Predefined Text Styles

Predefined text styles provide complete typography combinations for common use cases.

**Canonical Text Styles:**

**Display Styles:**
- `display` → Hero sections (fontFamily: display, fontSize: 6xl, fontWeight: bold, lineHeight: none, letterSpacing: tight)

**Heading Styles:**
- `h1` → Heading 1 (fontFamily: display, fontSize: 5xl, fontWeight: bold, lineHeight: tight, letterSpacing: tight)
- `h2` → Heading 2 (fontFamily: display, fontSize: 4xl, fontWeight: bold, lineHeight: tight, letterSpacing: tight)
- `h3` → Heading 3 (fontFamily: sans, fontSize: 3xl, fontWeight: semibold, lineHeight: snug, letterSpacing: normal)
- `h4` → Heading 4 (fontFamily: sans, fontSize: 2xl, fontWeight: semibold, lineHeight: snug, letterSpacing: normal)
- `h5` → Heading 5 (fontFamily: sans, fontSize: xl, fontWeight: medium, lineHeight: normal, letterSpacing: normal)
- `h6` → Heading 6 (fontFamily: sans, fontSize: lg, fontWeight: medium, lineHeight: normal, letterSpacing: normal)

**Body Text Styles:**
- `body` → Body text (fontFamily: sans, fontSize: base, fontWeight: normal, lineHeight: relaxed, letterSpacing: normal)
- `body-sm` → Small body text (fontFamily: sans, fontSize: sm, fontWeight: normal, lineHeight: normal, letterSpacing: normal)
- `body-xs` → Extra small body text (fontFamily: sans, fontSize: xs, fontWeight: normal, lineHeight: normal, letterSpacing: wide)

**Label Styles:**
- `label` → Label text (fontFamily: sans, fontSize: sm, fontWeight: medium, lineHeight: normal, letterSpacing: wide)
- `label-sm` → Small label text (fontFamily: sans, fontSize: xs, fontWeight: medium, lineHeight: normal, letterSpacing: wider)

**Caption Styles:**
- `caption` → Caption text (fontFamily: sans, fontSize: xs, fontWeight: normal, lineHeight: normal, letterSpacing: wide)

**Rule:** Predefined text styles MUST be used when they match the semantic role. They provide complete typography combinations that ensure consistency.

---

## Component Rules

### Rule 1: Token-Only Typography

**Components MUST use only typography tokens from the canonical token system.**

**Allowed Sources:**
- Font family tokens (`fontFamily.sans`, `fontFamily.display`, etc.)
- Font size tokens (`fontSize.xs`, `fontSize.sm`, `fontSize.base`, etc.)
- Font weight tokens (`fontWeight.normal`, `fontWeight.medium`, `fontWeight.bold`, etc.)
- Line height tokens (`lineHeight.tight`, `lineHeight.normal`, `lineHeight.relaxed`, etc.)
- Letter spacing tokens (`letterSpacing.tight`, `letterSpacing.normal`, `letterSpacing.wide`, etc.)
- Predefined text styles (`textStyles.body`, `textStyles.h1`, `textStyles.label`, etc.)

**Forbidden:**
- ❌ Arbitrary font-size values: `font-size: 13px`, `font-size: 1.1rem`
- ❌ Arbitrary font-weight values: `font-weight: 550`, `font-weight: 450`
- ❌ Arbitrary line-height values: `line-height: 1.3`, `line-height: 1.7`
- ❌ Arbitrary letter-spacing values: `letter-spacing: 0.03em`, `letter-spacing: -0.02em`
- ❌ Custom font families not in the token system
- ❌ Component-specific typography scales

### Rule 2: Semantic Role Preference

**Components SHOULD prefer predefined text styles when they match the semantic role.**

**Preference Order:**
1. Predefined text styles (when semantic role matches)
2. Individual typography tokens (when specific combination needed)

**Example:**
- ✅ **Preferred:** `textStyles.body` (complete semantic style)
- ✅ **Allowed:** `fontSize.base`, `fontWeight.normal`, `lineHeight.relaxed` (same combination, less semantic)
- ❌ **Forbidden:** `font-size: 16px`, `font-weight: 400`, `line-height: 1.625` (arbitrary values)

### Rule 3: Typography Hierarchy

**Components MUST respect typography hierarchy when using typography tokens.**

**Rule:** Typography hierarchy ensures consistent visual hierarchy across the design system. Components should use appropriate font sizes, weights, and styles that match their semantic role.

**Hierarchy Levels:**
- **Display** → Largest, most prominent (display, h1, h2)
- **Headings** → Section headings (h3, h4, h5, h6)
- **Body** → Main content (body, body-sm, body-xs)
- **Labels** → Form labels and metadata (label, label-sm)
- **Captions** → Supporting text (caption)

### Rule 4: Font Family Usage

**Components MUST use appropriate font families for their semantic role.**

**Font Family Rules:**
- **Display font** → Headings (h1, h2), hero sections, display text
- **Sans font** → Body text, labels, most UI components
- **Mono font** → Code, technical content
- **Serif font** → Special content (when needed)

**Rule:** Components should use the display font for headings and hero sections, and the sans font for most other content.

---

## Forbidden Patterns

### 1. Arbitrary Typography Values

**Forbidden:**
- ❌ `font-size: 13px`
- ❌ `font-weight: 550`
- ❌ `line-height: 1.3`
- ❌ `letter-spacing: 0.03em`
- ❌ `font-family: "Custom Font"`

**Rationale:** Arbitrary values break typography hierarchy and readability consistency.

### 2. Component-Specific Typography Scales

**Forbidden:**
- ❌ Defining new typography scales within components
- ❌ Creating component-specific typography tokens outside the token system
- ❌ Overriding canonical typography values

**Rationale:** Component-specific scales create inconsistency and break the unified design system.

### 3. Typography Hierarchy Violations

**Forbidden:**
- ❌ Using heading styles for body text
- ❌ Using body styles for headings
- ❌ Mixing typography scales inconsistently

**Rationale:** Typography hierarchy violations break visual hierarchy and readability.

### 4. Direct Value Usage

**Forbidden:**
- ❌ Using raw CSS values instead of tokens
- ❌ Hardcoding typography values in component code
- ❌ Calculating typography values at runtime

**Rationale:** Direct values bypass the token system and break consistency.

### 5. Inline Typography Styles

**Forbidden:**
- ❌ Inline `font-size`, `font-weight`, `line-height`, `letter-spacing` styles in component code
- ❌ Dynamic typography values calculated from props
- ❌ Conditional typography values based on component state

**Rationale:** Inline typography values bypass the token system and break consistency.

---

## Allowed Patterns

### 1. Token-Based Typography

**Allowed:**
- ✅ Using font family tokens: `fontFamily.sans`, `fontFamily.display`, etc.
- ✅ Using font size tokens: `fontSize.xs`, `fontSize.base`, etc.
- ✅ Using font weight tokens: `fontWeight.normal`, `fontWeight.bold`, etc.
- ✅ Using line height tokens: `lineHeight.tight`, `lineHeight.normal`, etc.
- ✅ Using letter spacing tokens: `letterSpacing.tight`, `letterSpacing.normal`, etc.
- ✅ Using predefined text styles: `textStyles.body`, `textStyles.h1`, etc.

**Rationale:** Token-based typography ensures consistency and maintainability.

### 2. Semantic Text Style Mapping

**Allowed:**
- ✅ Mapping component props to predefined text styles
- ✅ Using individual typography tokens when specific combination needed
- ✅ Preferring predefined text styles over individual tokens when semantic role matches

**Rationale:** Semantic text style mapping improves code readability and design system coherence.

### 3. Responsive Typography

**Allowed:**
- ✅ Using fluid typography tokens (font sizes use `clamp()` for responsive scaling)
- ✅ Responsive typography via token unions (when implemented)

**Rationale:** Responsive typography maintains readability and hierarchy across breakpoints.

---

## Semantic Mapping

### Typography Role Patterns

**Heading Components:**
- H1 → `textStyles.h1` (display font, 5xl, bold)
- H2 → `textStyles.h2` (display font, 4xl, bold)
- H3 → `textStyles.h3` (sans font, 3xl, semibold)
- H4 → `textStyles.h4` (sans font, 2xl, semibold)
- H5 → `textStyles.h5` (sans font, xl, medium)
- H6 → `textStyles.h6` (sans font, lg, medium)

**Body Text Components:**
- Body → `textStyles.body` (sans font, base, normal, relaxed line-height)
- Small body → `textStyles.body-sm` (sans font, sm, normal)
- Extra small body → `textStyles.body-xs` (sans font, xs, normal, wide letter-spacing)

**Label Components:**
- Label → `textStyles.label` (sans font, sm, medium, wide letter-spacing)
- Small label → `textStyles.label-sm` (sans font, xs, medium, wider letter-spacing)

**Caption Components:**
- Caption → `textStyles.caption` (sans font, xs, normal, wide letter-spacing)

**Display Components:**
- Display → `textStyles.display` (display font, 6xl, bold, tight letter-spacing)

**Rule:** Components should use predefined text styles that match their semantic role, ensuring consistent typography patterns across the design system.

---

## Token System Integration

### Source of Truth

**Canonical Token Definitions:**
- Location: `src/tokens/typography.ts`
- Exports: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `textStyles`
- Types: `FontFamily`, `FontSize`, `FontWeight`, `LineHeight`, `LetterSpacing`, `TextStyle`

**Rule:** The token system file (`src/tokens/typography.ts`) is the single source of truth for all typography values. Components MUST reference tokens from this file, never define their own typography values.

---

## Unlock Procedure

Any Typography Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component typography usage
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Typography Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked typography authority aspects **MUST** be refused with reference to the Typography Authority lock.

**Do not modify Typography Authority without explicit 'Unlock Typography Authority' task approval.**

**Note:** Future changes to Authority rules require either:
- New Authority version (e.g., `TYPOGRAPHY_AUTHORITY_CONTRACT_v2.md`) with full migration path
- Explicit unlock procedure with full audit and approval

---

## Version History

- **v1.1** (2025-12-16): Formal Lock Completion
  - Changed status from ACTIVE to LOCKED
  - Formally locked as part of Foundation layer closure
  - All rules are immutable and require unlock procedure for modifications
  - Future changes require Authority versioning (v2+) or explicit unlock procedure

- **v1.0** (2025-12-16): Initial Typography Authority Contract definition
  - Defined canonical typography token scale (font family, size, weight, line height, letter spacing)
  - Defined predefined text styles and component rules
  - Established as immutable authority

---

## Related Documents

- `docs/architecture/INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md` - Interactive size scale (separate from typography scale)
- `docs/architecture/FINAL_FOUNDATION_LOCK.md` - Foundation lock status (Typography Authority Lock Status section)
- `docs/architecture/TUI_TOKEN_SYSTEM.md` - Token system documentation

**Note:** Typography scale (`xs`, `sm`, `md`, `lg`, `xl`) is SEPARATE from interactive size scale (`sm`, `md`, `lg`). See [Interactive Size Scale Authority Contract](./INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md) for interactive component sizing rules.

---

**Status:** ✅ **LOCKED**  
**Version:** 1.1  
**Date Created:** 2025-12-16  
**Last Updated:** 2025-12-16  
**Priority:** BLOCKER  
**Authority Domain:** Typography Authority
