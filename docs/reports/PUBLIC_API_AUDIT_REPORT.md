# Public API Audit Report — @tenerife.music/ui

**Task ID:** TUI_RELEASE_READINESS_AUDIT_001  
**Date:** 2026-02-05  
**Scope:** `package.json` exports + `src/index.ts`

---

## Public Entry Points

From `package.json`:

- `.` → `dist/index.{mjs,cjs}` + `dist/index.d.ts`
- `./styles` → `dist/styles.css`
- `./preset` → `dist/preset.{mjs,cjs}` + `dist/preset.d.ts`
- `./tokens` → `dist/tokens/index.{mjs,cjs}` + `dist/tokens/index.d.ts`
- `./theme` → `dist/theme/index.{mjs,cjs}` + `dist/theme/index.d.ts`
- `./extensions/next` → `dist/extensions/next/index.{mjs,cjs}` + `dist/extensions/next/index.d.ts`

**Observation:** No deep-import paths are exported. This enforces public API usage only.

---

## Index Export Surface (Summary)

- Explicit, segmented exports in `src/index.ts` (tokens, components, utilities).
- **Export count (automated scan): 784 symbols**.
- Utilities are intentionally excluded from index with explicit guard comments.

---

## Phantom Import Audit (Internal Usage)

Automated scan of repo imports vs `src/index.ts` exports:

- Total imports from `@tenerife.music/*`: **98**
- Phantom imports detected: **13**

**All phantom imports are from test fixtures or rule-source examples**:
- `eslint-rules/__tests__/*` uses deep import fixtures (negative cases)
- `eslint-rules/no-leading-tailwind.ts` includes deep-import examples
- `scripts/audit-phantom-imports.ts` contains placeholder example paths

**Production components do not use deep-import paths.**

---

## Public API Contract Status

**Status:** ✅ PASS (public surface is explicit, stable, and used correctly internally)

**Notes:**
- Deep imports are intentionally present in tests; consider marking these fixtures as allowed via test-only lint overrides to avoid confusing audit tools.
- No `@radix-ui/*` symbols are exported from `src/index.ts`.

