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

## Part 1: Root Cause

**PostCSS could not discover Tailwind config at build time.** Without explicit path, PostCSS failed to resolve the config, causing Tailwind to generate CSS without safelisted classes. The fix was ensuring PostCSS can find Tailwind config via `postcss.config.mjs` with explicit path.

---

## Part 2: Critical Fix

**File:** `postcss.config.mjs`  
**Status:** ✅ **LOCKED - DO NOT MODIFY**

```typescript
const config = {
  plugins: {
    tailwindcss: {
      config: "./tailwind.config.ts", // CRITICAL: Explicit path required
    },
    autoprefixer: {},
  },
};
```

**Why:** PostCSS must discover Tailwind config at build time. Explicit path ensures module resolution works across all build scenarios (Vite, Storybook, production). Safelist must be defined directly in `tailwind.config.ts` (cannot be imported from another file).

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

**Example: Button Component** — ✅ **FOUNDATION LOCKED**

Token flow: `BUTTON_TOKENS` → Tailwind utilities → CSS variables → Components. See [FOUNDATION_LOCK.md](./architecture/FOUNDATION_LOCK.md) for Button lock details.

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

## Part 5: Resolved Issues

**Status:** ✅ **WORKING** — Do NOT re-investigate:
- Tailwind safelist configuration
- Token-based utilities on raw elements
- Button component (Foundation LOCKED)
- CSS variable injection
- PostCSS/Tailwind config discovery

See [FOUNDATION_LOCK.md](./architecture/FOUNDATION_LOCK.md) for Foundation component lock status.

---

## Part 6: Foundation Status

**Foundation Status:** ✅ **COMPLETE and STABLE** — All Foundation layer components and systems are locked and immutable.

See [FOUNDATION_LOCK.md](./architecture/FOUNDATION_LOCK.md) for the authoritative Foundation lock status, component lock details, and immutability rules.

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

**The Foundation phase is COMPLETE and STABLE.** Root cause identified and fixed (PostCSS config discovery). All Foundation systems are locked and immutable.

See [FOUNDATION_LOCK.md](./architecture/FOUNDATION_LOCK.md) for complete Foundation status and lock details.

**This document provides quick reference for build configuration and locked decisions. For Foundation status, see FOUNDATION_LOCK.md.**

---

### Library Maturity Growth System

**Status:** ✅ **ACTIVE** (2025-12-19)

The library now includes a comprehensive system for controlled growth:

- **Component Needs Inventory**: Tracks real component needs based on usage patterns
- **Extension Component Templates**: Standardized templates and CLI generator for consistent component creation
- **Component Analysis Tools**: Scripts to analyze codebase patterns and usage
- **Feedback Collection System**: Automated collection and analysis of usage feedback
- **Enhanced Storybook**: Improved DX with a11y testing, token display, and enhanced documentation
- **GitHub Integration**: Issue templates and automated triage workflows for component requests

**Key Documents:**
- `docs/tasks/COMPONENT_NEEDS_INVENTORY.md` - Component needs tracking
- `docs/tasks/COMPONENT_CREATION_CHECKLIST.md` - Creation checklist
- `docs/reference/COMPONENT_EXAMPLES.md` - Reference examples
- `docs/tasks/FEEDBACK_COLLECTION_PROCESS.md` - Feedback collection process
- `scripts/generate-extension-component.ts` - Component generator
- `scripts/analyze-component-needs.ts` - Pattern analysis
- `scripts/collect-usage-feedback.ts` - Feedback collection

**Version:** 1.2  
**Last Updated:** 2025-12-19  
**Next Review:** Only if architecture changes are explicitly requested

