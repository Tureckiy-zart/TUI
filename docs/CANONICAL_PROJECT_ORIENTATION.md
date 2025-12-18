# Canonical Project Orientation & Current State — v1.1

**Date:** 2025-12-15  
**Version:** 1.1  
**Status:** ✅ Foundation LOCKED  
**Purpose:** Authoritative reference for Cursor AI, future agents, and developers returning after context loss

---

## Executive Summary

This document explains the **solved** Tailwind color system, the **critical fix** that resolved build-time issues, and the **locked architectural decisions** that must not be revisited. This prevents future infinite loops on already-solved problems.

**Foundation Status:** ✅ **COMPLETE and STABLE** — All Foundation layer components and systems are locked and immutable.

**Key Point:** The root cause was **NOT** tokens, CVA, or Button implementation. It was **PostCSS config discovery** during build time.

---

## Part 1: The Original Problem

### What Was Happening

Colors did not apply even when:
- ✅ Tokens were correctly defined in `src/tokens/colors.ts`
- ✅ Safelist was correctly configured in `tailwind.config.ts`
- ✅ Button component used correct token-based classes (`bg-primary`, etc.)
- ✅ CSS variables were correctly injected via `applyMode.ts`

### Why Previous Diagnoses Failed

Multiple investigation loops occurred because the symptoms suggested:
1. **Token system broken** → But tokens were correct
2. **CVA not working** → But CVA was correctly implemented
3. **Button component broken** → But Button was correctly using tokens
4. **Safelist not working** → But safelist was correctly defined

**None of these were the root cause.**

### The Actual Root Cause

**PostCSS could not discover Tailwind config at build time.**

- Vite/Storybook builds use PostCSS to process CSS
- PostCSS needs to find `tailwind.config.ts` to generate utility classes
- Without explicit path, PostCSS failed to resolve the config in some build scenarios
- This caused Tailwind to generate CSS **without** the safelisted classes
- Result: `bg-primary` class existed in code but was missing from generated CSS

**The fix was NOT changing tokens, CVA, or components. The fix was ensuring PostCSS can find Tailwind config.**

---

## Part 2: The Critical Fix

### Solution: `postcss.config.mjs` with Explicit Config Path

**File:** `postcss.config.mjs`  
**Status:** ✅ **LOCKED - DO NOT MODIFY**

```typescript
const config = {
  plugins: {
    tailwindcss: {
      // CRITICAL: Explicit path ensures PostCSS finds config in all build scenarios
      config: "./tailwind.config.ts",
    },
    autoprefixer: {},
  },
};
```

### Why This Works

1. **PostCSS must discover Tailwind config at build time**
   - Build tools (Vite, tsup) use PostCSS to process CSS
   - PostCSS needs explicit path to Tailwind config in some scenarios
   - Without explicit path, module resolution can fail silently

2. **Safelist must be statically available during Tailwind compilation**
   - Safelist in `tailwind.config.ts` must be defined directly in the config file
   - Importing safelist from another file can cause module resolution issues
   - Safelist is defined as `const SAFELIST` directly in `tailwind.config.ts` (lines 12-158) and referenced at line 165

3. **Storybook/Vite build differs from Next/Vite assumptions**
   - Storybook uses iframe context for stories
   - Vite dev server has different module resolution than production builds
   - Explicit config path ensures consistency across all build scenarios

### Why Previous Attempts Failed

Previous attempts were **logically correct** but failed due to build toolchain:

- ✅ Tokens were correct → But PostCSS couldn't find Tailwind config
- ✅ Safelist was correct → But Tailwind wasn't being invoked properly
- ✅ CSS variables were correct → But Tailwind utilities weren't generated
- ✅ Component code was correct → But classes didn't exist in CSS output

**The fix was infrastructure, not application code.**

---

## Part 3: Final Color Authority Architecture

### Architecture Chain

```
src/tokens/colors.ts (Single Source of Truth)
    ↓
applyMode.ts → updateCSSVariablesFromTokens() (Runtime Injection)
    ↓
document.documentElement (CSS Variables on <html>)
    ↓
Tailwind utilities (bg-primary, text-foreground, etc.)
    ↓
UI Components (Button, etc.)
```

### Single Source of Truth: `src/tokens/colors.ts`

**Status:** ✅ **LOCKED - DO NOT MODIFY STRUCTURE**

- All color definitions live here
- Mode-dependent colors: `day` and `night` variants
- Color scales: `primaryColors`, `accentColors`, `secondaryColors` (50-950)
- Semantic colors: success, error, warning, info
- Base colors: background, foreground, card, popover, border, input, ring

### Runtime Injection: `applyMode.ts`

**Status:** ✅ **LOCKED - DO NOT MODIFY INJECTION MECHANISM**

**Function:** `updateCSSVariablesFromTokens(mode: Mode)`

**Critical Rules:**
- ✅ **Synchronous ONLY** - No async operations allowed
- ✅ **Must execute before component render** - CSS variables must be available immediately
- ✅ **Sets variables on `document.documentElement`** - Not on body or other elements
- ✅ **Called at module top-level in Storybook** - Not in decorators, hooks, or effects

**Storybook Initialization:**
```typescript
// .storybook/preview.tsx (lines 15-35)
if (typeof window !== "undefined") {
  initThemeSync("day", "tm_mode"); // Synchronous, top-level call
}
```

**Why iframe-only initialization:**
- Storybook uses iframe for story content
- Manager context is irrelevant (stories run in iframe)
- CSS variables must be set in iframe's document, not manager's document

### CSS Variable Flow into Tailwind Utilities

**Tailwind Config:** `tailwind.config.ts`

```typescript
theme: {
  extend: {
    colors: {
      ...tailwindThemeColors, // From src/tokens/colors.ts
    },
  },
}
```

**Tailwind Theme Colors:**
- All colors reference CSS variables: `"hsl(var(--tm-primary))"`
- Tailwind generates utilities: `bg-primary`, `text-foreground`, etc.
- Utilities consume CSS variables set by `applyMode.ts`

**Safelist (Lines 12-158, referenced at line 165):**
- **CRITICAL:** Must be defined directly in config file (as `const SAFELIST`)
- Ensures Tailwind includes classes even if not detected in content scan
- Includes base colors, opacity variants, hover states, focus states
- Cannot be imported from another file — must be inlined in the config

### UI Components

**Example: Button Component**

**Status:** ✅ **FINAL LOCK** (2025-01-27) — Foundation primitive, validated and immutable

```typescript
// src/components/ui/button.tsx
const buttonVariants = tokenCVA({
  variants: {
    variant: {
      primary: `${BUTTON_TOKENS.variant.primary.background} ...`,
      // Uses token-based utilities: bg-primary, text-primary-foreground
    },
  },
});
```

**Token Flow:**
1. `BUTTON_TOKENS` references Tailwind utilities (`bg-primary`)
2. Tailwind utilities reference CSS variables (`hsl(var(--tm-primary))`)
3. CSS variables set by `applyMode.ts` from tokens
4. Result: Button reflects token changes immediately

**Button Lock Details:**
- Component is locked after completing audit and validation procedures
- All color logic is centralized in `BUTTON_TOKENS`
- Uses `tokenCVA` wrapper for token-based styling
- DO NOT modify, extend, or create alternatives

---

## Part 4: LOCKED Decisions (Foundation)

### ⚠️ CRITICAL: These Must NOT Be Changed

#### 1. PostCSS Configuration

**File:** `postcss.config.mjs`  
**Status:** 🔒 **FOUNDATION LOCK**

- ✅ **MUST exist** - PostCSS requires explicit config file
- ✅ **MUST specify explicit path** - `config: "./tailwind.config.ts"`
- ❌ **NEVER remove** - Build will fail without it
- ❌ **NEVER change path** - Must point to `tailwind.config.ts`

**Consequences of violation:**
- Tailwind utilities won't be generated
- Safelist won't work
- Colors won't apply
- Build will fail silently or with cryptic errors

#### 2. Tailwind Safelist

**File:** `tailwind.config.ts` (defined as `const SAFELIST` at lines 12-158, referenced at line 165)  
**Status:** 🔒 **FOUNDATION LOCK**

- ✅ **MUST be defined directly in config file** - Cannot import from another file
- ✅ **MUST be static array** - Cannot be dynamically generated
- ✅ **MUST include all token-based utilities** - Base, opacity variants, hover, focus
- ❌ **NEVER move to separate file** - Module resolution will fail
- ❌ **NEVER make dynamic** - Tailwind needs static safelist at build time

**Consequences of violation:**
- Safelisted classes won't be generated
- Token-based utilities won't work
- Components will have missing styles

#### 3. Color Authority: Single Source of Truth

**File:** `src/tokens/colors.ts`  
**Status:** 🔒 **FOUNDATION LOCK**

- ✅ **ONLY source of color definitions** - All colors defined here
- ✅ **Runtime injection via `applyMode.ts`** - No static CSS variables
- ✅ **No async color injection** - Must be synchronous
- ❌ **NEVER define colors in CSS files** - Only consume variables
- ❌ **NEVER set CSS variables outside `applyMode.ts`** - Single authority only

**Consequences of violation:**
- Theme system breaks
- Color conflicts occur
- Mode switching fails
- Brand overrides won't work

#### 4. Runtime Injection: Synchronous Only

**File:** `src/theme/applyMode.ts`  
**Status:** 🔒 **FOUNDATION LOCK**

- ✅ **MUST be synchronous** - No async operations
- ✅ **MUST execute before render** - CSS variables available immediately
- ✅ **MUST set on `document.documentElement`** - Not body or other elements
- ❌ **NEVER make async** - Components need variables at render time
- ❌ **NEVER delay execution** - Must be top-level in Storybook

**Consequences of violation:**
- Components render without colors
- Flash of unstyled content
- Theme switching breaks
- Storybook stories fail

#### 5. Storybook Initialization: Top-Level Only

**File:** `.storybook/preview.tsx`  
**Status:** 🔒 **FOUNDATION LOCK**

- ✅ **MUST call `initThemeSync()` at module top-level** - Not in decorators
- ✅ **MUST be iframe context only** - Manager context irrelevant
- ✅ **MUST be synchronous** - No delays or async operations
- ❌ **NEVER move to decorators** - Too late for initial render
- ❌ **NEVER use hooks or effects** - Components need variables immediately

**Consequences of violation:**
- Storybook stories render without colors
- Components show default/unstyled state
- Theme variables missing on first render

---

## Part 5: What Is NOT a Problem Anymore

### ✅ Resolved Issues (Do NOT Re-investigate)

#### 1. Tailwind Safelist

**Status:** ✅ **WORKING**

- Safelist is correctly configured in `tailwind.config.ts`
- All token-based utilities are included
- Classes are generated in CSS output
- **Do NOT re-investigate safelist issues**

#### 2. Token-Based Utilities on Raw Elements

**Status:** ✅ **WORKING**

- `bg-primary` works on raw `<div>` elements
- `text-foreground` works on raw `<p>` elements
- All token-based utilities function correctly
- **Do NOT re-investigate utility application**

#### 3. Button Component

**Status:** ✅ **FINAL LOCK** (2025-01-27) — Foundation primitive, validated and immutable

- Button component is locked and immutable after audit completion
- Button reflects token changes immediately
- All variants use correct token-based utilities
- CVA correctly applies token classes
- **Do NOT re-investigate Button implementation**
- **Do NOT modify Button component** — it is locked

#### 4. CSS Variable Injection

**Status:** ✅ **WORKING**

- Variables are set synchronously before render
- All critical variables are present (`--tm-primary`, `--tm-secondary`, etc.)
- Variables are accessible in iframe context
- **Do NOT re-investigate variable injection**

#### 5. PostCSS/Tailwind Config Discovery

**Status:** ✅ **WORKING**

- PostCSS correctly finds Tailwind config
- Tailwind generates utilities from safelist
- Build toolchain works in all scenarios
- **Do NOT re-investigate build configuration**

---

## Part 6: Foundation Status and Next Phase

### ✅ Foundation Phase: COMPLETE

**Status:** ✅ **COMPLETE and STABLE**

The Foundation phase is **complete** and all critical systems are **locked**:

- ✅ Color Authority Enforcement — **RESOLVED**
- ✅ Tailwind safelist issue — **ROOT CAUSE UNDERSTOOD and FIXED**
- ✅ PostCSS + Tailwind config resolution — **CANONICAL**
- ✅ Button component — **LOCKED and VALIDATED** (2025-12-15)
- ✅ Build toolchain — **WORKING** in all scenarios
- ✅ Theme system — **STABLE**

### 🔜 Next Phase: CVA Enforcement (Not Yet in Scope)

**Status:** ⏸️ **READY but NOT IN SCOPE**

The following tasks are **ready** to proceed but are **not part of the current Foundation phase**:

#### 1. Button CVA Enforcement

**Task:** `TUNG_BUTTON_CVA_ENFORCEMENT`  
**Status:** ✅ **READY** (Next Phase)

- Button already uses `tokenCVA` wrapper
- All color logic centralized in `BUTTON_TOKENS`
- Enforcement rules can be implemented in next phase

#### 2. tokenCVA Introduction

**Task:** `TUNG: tokenCVA introduction`  
**Status:** ✅ **READY** (Next Phase)

- `tokenCVA` utility exists in `src/lib/token-cva.ts`
- Button already uses it
- Can migrate other components to use `tokenCVA` in next phase

#### 3. ESLint no-raw-color Enforcement

**Task:** ESLint rule for raw Tailwind colors  
**Status:** ✅ **READY** (Next Phase)

- ESLint rule exists: `eslint-rules/no-raw-tailwind-colors.ts`
- Can enforce token-based utilities only
- Can prevent hardcoded color classes

#### 4. Further Component Migrations

**Status:** ✅ **READY** (Next Phase)

- Can migrate components to use token-based utilities
- Can use `tokenCVA` for variant management
- Can reference component tokens

**Note:** These tasks are unblocked and ready, but they belong to the **next phase** (CVA Enforcement), not the Foundation phase. Foundation is complete.

### ⚠️ Prerequisites for Future Refactors

Before modifying any of these areas:

1. **Read this document first** - Understand locked decisions
2. **Verify PostCSS config exists** - Don't break build toolchain
3. **Respect safelist structure** - Don't move to separate file
4. **Maintain color authority** - Don't create alternative color systems
5. **Keep injection synchronous** - Don't make async

### 🚫 Warn Against Re-opening Solved Layers

**Do NOT:**
- ❌ Re-investigate Tailwind safelist configuration
- ❌ Re-investigate PostCSS config discovery
- ❌ Re-investigate CSS variable injection timing
- ❌ Re-investigate Storybook initialization
- ❌ Suggest alternative color systems
- ❌ Question locked architectural decisions

**If colors don't work:**
1. Check `postcss.config.mjs` exists and has explicit path
2. Check `tailwind.config.ts` safelist is inlined
3. Check `applyMode.ts` is called synchronously
4. Check Storybook calls `initThemeSync()` at top-level
5. **Do NOT** re-investigate tokens, CVA, or Button

---

## Part 7: Quick Reference

### Critical Files

| File | Status | Purpose |
|------|--------|---------|
| `postcss.config.mjs` | 🔒 LOCKED | PostCSS config with explicit Tailwind path |
| `tailwind.config.ts` | 🔒 LOCKED | Tailwind config with inlined safelist |
| `src/tokens/colors.ts` | 🔒 LOCKED | Single source of truth for colors |
| `src/theme/applyMode.ts` | 🔒 LOCKED | Runtime CSS variable injection |
| `.storybook/preview.tsx` | 🔒 LOCKED | Storybook theme initialization |

### Architecture Flow

```
tokens/colors.ts → applyMode.ts → CSS Variables → Tailwind Utilities → Components
```

### Build Toolchain

```
PostCSS (postcss.config.mjs) → Tailwind (tailwind.config.ts) → CSS Output
```

### Verification Commands

**Check PostCSS config:**
```bash
ls postcss.config.mjs  # Must exist
```

**Check Tailwind safelist:**
```bash
grep -A 5 "safelist:" tailwind.config.ts  # Must be inlined
```

**Check Storybook initialization:**
```bash
grep "initThemeSync" .storybook/preview.tsx  # Must be top-level
```

---

## Conclusion

**The Foundation phase is COMPLETE and STABLE.**

- ✅ Root cause identified and fixed (PostCSS config discovery)
- ✅ Architecture is stable and working
- ✅ Foundation decisions are locked
- ✅ Color Authority Enforcement is resolved
- ✅ Tailwind safelist root cause is understood and fixed
- ✅ PostCSS + Tailwind config resolution is canonical
- ✅ Button component is locked and validated
- ✅ All Foundation systems are immutable

**What is DONE:**
- Foundation architecture is complete
- Color system is solved and locked
- Build toolchain is working
- All critical fixes are in place

**What is LOCKED:**
- PostCSS configuration
- Tailwind safelist structure
- Color authority (single source of truth)
- Runtime injection mechanism
- Storybook initialization
- Button component (Foundation layer - FINAL LOCK)

**What is READY FOR NEXT PHASE:**
- CVA enforcement tasks (not in Foundation scope)
- tokenCVA migration (not in Foundation scope)
- ESLint enforcement rules (not in Foundation scope)

**This document is the canonical reference. Read it before making changes to color system, build configuration, or theme architecture.**

---

**Version:** 1.1  
**Last Updated:** 2025-12-15  
**Next Review:** Only if architecture changes are explicitly requested

