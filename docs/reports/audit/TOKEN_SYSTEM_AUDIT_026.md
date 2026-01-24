# Token System Audit 026

**Task:** TUI_FOUNDATION_TOKEN_SYSTEM_AUDIT_026  
**Layer:** FOUNDATION  
**Status:** FACTUAL AUDIT (no changes)  
**Date:** 2026-01-21

## Summary

- Token files under `src/FOUNDATION/tokens/**`: 66
- Component token files under `src/FOUNDATION/tokens/components/**`: 50
- REQUIRED_THEME_TOKENS count: 22
- REQUIRED_THEME_TOKENS used in `src/**`: 22 (unused: 0)
- Legacy CSS var patterns in `src/**`: 0 matches
- Low-usage required tokens (<= 2 occurrences in `src/**`):
  - `--tm-border-strong` (2)

## Section A: Token Inventory (File-Level)

**Token domains present (FOUNDATION):**
- Core: `colors.ts`, `spacing.ts`, `typography.ts`, `radius.ts`, `shadows.ts`, `motion.ts`, `opacity.ts`, `gradients.ts`, `states.ts`
- System: `required-tokens.ts`, `css-variables.ts`, `theme.ts`, `state-matrix.ts`, `index.ts`
- Component tokens: `src/FOUNDATION/tokens/components/**` (50 files)

**File list source:** `rg --files src/FOUNDATION/tokens`

## Section B: REQUIRED_THEME_TOKENS Coverage

**Count:** 22

**Usage coverage:** All 22 tokens appear in `src/**` (0 missing).

**Per-token usage count (rg -c in src):**
- `--tm-accent`: 92
- `--tm-accent-foreground`: 33
- `--tm-border-default`: 230
- `--tm-border-strong`: 2
- `--tm-destructive`: 93
- `--tm-destructive-foreground`: 22
- `--tm-disabled`: 14
- `--tm-disabled-foreground`: 8
- `--tm-focus-ring`: 22
- `--tm-muted`: 195
- `--tm-muted-foreground`: 12
- `--tm-primary`: 249
- `--tm-primary-foreground`: 70
- `--tm-secondary`: 46
- `--tm-secondary-foreground`: 15
- `--tm-surface-base`: 115
- `--tm-surface-overlay`: 22
- `--tm-surface-raised`: 157
- `--tm-text-inverse`: 5
- `--tm-text-muted`: 388
- `--tm-text-primary`: 225
- `--tm-text-secondary`: 12

## Section C: Legacy/Deprecated Vars Scan (src/**)

**Patterns scanned:**
- `--background`, `--foreground`, `--card`, `--popover`
- `--muted`, `--muted-foreground`
- `--destructive`, `--destructive-foreground`
- `--surface-`, `--text-`, `--border`, `--input`, `--ring`
- `--semantic-`, `--motion-`

**Results:** 0 matches for all patterns above in `src/**`.

## Section D: Line-Height/Theme-Level Definitions (Factual)

**Theme files containing `lineHeight` entries:**
- `src/themes/minimal.ts`
- `src/themes/neon.ts`
- `src/themes/types.ts` (type definitions)
- `src/themes/brand_engine.ts` (CSS var injection)
- `src/preset.ts` (tailwind lineHeight config mapping)

**Token definitions for line-height:**
- `src/FOUNDATION/tokens/typography.ts` (lineHeight tokens and fontSize tuple lineHeight values)
- `src/FOUNDATION/tokens/components/text.ts` (lineHeight → leading-* mapping)
- `src/FOUNDATION/tokens/components/modal.ts` (lineHeight token mapping)

## Section E: Tokens Export Artifacts

**tokens.json / tokens.fig references found in:**
- `scripts/export-tokens.ts`
- `docs/reference/TOKENS_EXPORT_REFERENCE.md`
- `docs/reference/API_AND_TOKENS_AUDIT_SUMMARY.md`
- `docs/PROJECT_PROGRESS.md`
- `docs/_internal/ai/_to_GPT_project_essential/02_PROJECT_PROGRESS.md`

**No direct runtime usage of `design-tokens/tokens.json` found in src/**.

---

## Evidence: Commands Executed

- `rg --files src/FOUNDATION/tokens`
- `rg -n "export const" src/FOUNDATION/tokens -g "*.ts"`
- `rg -n "required" src/FOUNDATION/tokens -g "*.ts"`
- `rg -c -- "--tm-" src/FOUNDATION/tokens/required-tokens.ts`
- `rg -c -- "--tm-" src`
- `rg -n -- "--semantic-" src`
- `rg -n -- "--motion-" src`
- `rg -c -- "--background" src` (and other legacy patterns)
- `rg -n "tokens.json" -S .`
