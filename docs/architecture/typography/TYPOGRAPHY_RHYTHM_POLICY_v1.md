# Typography Rhythm Policy v1

**Status:** ✅ CANON  
**Priority:** P0  
**Date Created:** 2026-01-21  
**Version:** 1.0  
**Task:** TUI_FOUNDATION_TYPOGRAPHY_RHYTHM_POLICY_V1_002

---

## Document Classification

**TYPE:** POLICY  
**MUTABILITY:** EVOLVABLE  
**STATUS:** ✅ CANON  
**RELATIONSHIP:** Complements `TYPOGRAPHY_AUTHORITY.md` (LOCKED) and `TYPOGRAPHY_CONTRACT.md` (ACTIVE)  
**AUTHORITY DOMAIN:** Typography Rhythm Policy

**Purpose:** This document defines the canonical Typography Rhythm Policy v1 for Tenerife UI, establishing line-height and paragraph rhythm as part of Foundation typography tokens. It forbids ad-hoc or component-level rhythm selection.

---

## 1. Core Principle (Non-Negotiable)

Typography rhythm is a **Foundation token concern**.

**Implications:**
- ❌ Theme must not define line-height or paragraph spacing.
- ❌ Components must not select or override rhythm.
- ❌ Inline/CSS-in-JS/Tailwind rhythm overrides are forbidden.
- ✅ Rhythm is a consequence of typography role.

---

## 2. Line-Height Canon

**Source of Truth:** `src/FOUNDATION/tokens/typography.ts`

**Policy:**
- Line-height values are defined only in Foundation typography tokens.
- Line-height is tied to role-based typography mapping and cannot be overridden.
- Any line-height outside token mappings is forbidden.

---

## 3. Paragraph Rhythm Canon

**Definition:** Vertical spacing between text blocks (paragraph → paragraph, heading → paragraph, paragraph → list/meta).

**Source of Truth:** Foundation typography tokens (role-based mapping).

**Policy:**
- Paragraph rhythm is defined only via typography tokens.
- Values must use semantic spacing tokens (no raw px).
- Components must not set paragraph spacing directly.

---

## 4. Application Rules

### Text / Heading Components

- Must not accept `margin`, `gap`, or `leading` props.
- Must not accept custom `lineHeight` props.
- Must not allow `style={{ lineHeight }}`.

### Container Responsibility

Paragraph rhythm is applied by container components (e.g., `TextStack`, `Article`, `Prose`) using typography role context.

---

## 5. Prohibitions (Hard Rules)

**Forbidden:**
- Inline `style={{ lineHeight }}` for text
- Inline `style={{ marginBottom }}` for text
- Tailwind `leading-*` on text components
- Tailwind `mb-*` / `mt-*` on text components
- Theme-level `lineHeight` definitions

---

## 6. Enforcement (Planned)

- ESLint: `no-raw-line-height`, `no-leading-*` (scoped to text components), `no-text-margin-spacing`
- Types: remove `lineHeight?` / `leading?` / `margin?` from text component APIs

---

## 7. Relationship to Other Documents

- `docs/architecture/TYPOGRAPHY_AUTHORITY.md`
- `docs/architecture/TYPOGRAPHY_CONTRACT.md`
- `docs/architecture/typography/TYPOGRAPHY_COLOR_POLICY_v1.md`

---

## 7.5. No Mapping File (Architectural Decision)

**Mapping Text → lineHeight intentionally not encoded in tokens.**  
This is an architectural decision to avoid semantic drift.

---

**Status:** ✅ **CANON**  
**Version:** 1.0  
**Date Created:** 2026-01-21  
**Priority:** P0
