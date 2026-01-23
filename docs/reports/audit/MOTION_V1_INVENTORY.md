# Motion V1 Inventory Report

**Date:** 2025-12-27  
**Status:** ✅ Complete  
**Purpose:** Document all Motion V1 usage before removal in Major 2.0.0

---

## Summary

This report identifies all remaining Motion V1 references in the codebase before the complete removal as part of the 2.0.0 major release.

**Total files with V1 usage:** 11 files

---

## V1 Token File

### Primary V1 Definition

| File | Status | Action |
|------|--------|--------|
| `src/FOUNDATION/tokens/motion.ts` | V1 Source | **DELETE** |

**V1 Exports (to be removed):**
- `durations` - Duration tokens (instant, fast, normal, slow, slower, slowest, granular)
- `easings` - Easing functions (linear, ease-in, ease-out, ease-in-out, bounce, elastic, etc.)
- `transitions` - Pre-configured transitions
- `keyframes` - Keyframe animations
- `animations` - Animation presets
- `springs` - Framer Motion spring configs (not used)
- `reducedMotion` - Reduced motion support
- `motionCSSVariables` - Legacy CSS variable names (--duration-*, --ease-*, --transition-*)
- `tailwindMotionConfig` - Tailwind configuration

---

## Files Importing V1 Tokens

### 1. Build Configuration

| File | Line | Import | V2 Migration |
|------|------|--------|--------------|
| `tailwind.config.ts` | 3 | `tailwindMotionConfig` | Use `motionV2TailwindConfig` only |
| `src/preset.ts` | 5 | `tailwindMotionConfig` | Use `motionV2TailwindConfig` only |

### 2. Theme System

| File | Line | Import | V2 Migration |
|------|------|--------|--------------|
| `src/FOUNDATION/theme/applyMode.ts` | 20 | `motionCSSVariables` | Use `motionV2CSSVariables` only |

### 3. Animation System (TAS)

| File | Line | Import | V2 Migration |
|------|------|--------|--------------|
| `src/COMPOSITION/motion/animation/tas.ts` | 11-19 | `Duration`, `durations`, `Easing`, `easings`, `reducedMotion`, `Transition`, `transitions` | Migrate to V2 or inline values |
| `src/COMPOSITION/motion/animation/types.ts` | 7 | `Spring` (type) | **DELETE** (Framer Motion not used) |

### 4. Utility Functions

| File | Line | Import | V2 Migration |
|------|------|--------|--------------|
| `src/FOUNDATION/lib/responsive-props.ts` | 8 | `durations` | Use `motionV2Durations` |

### 5. Export Scripts

| File | Line | Import | V2 Migration |
|------|------|--------|--------------|
| `scripts/export-tokens.ts` | 18 | `* as motion` | Remove V1 export or keep V2 only |

### 6. CSS Variables Aggregator

| File | Line | Import | V2 Migration |
|------|------|--------|--------------|
| `src/FOUNDATION/tokens/css-variables.ts` | 9 | `motionCSSVariables` | Use `motionV2CSSVariables` |

---

## Public API Exports

### Files with V1 Re-exports

| File | Exports | Action |
|------|---------|--------|
| `src/FOUNDATION/tokens/index.ts` | `animations`, `durations`, `easings`, `keyframes`, `motionCSSVariables`, `reducedMotion`, `springs`, `tailwindMotionConfig`, `transitions` | Remove all V1 exports |
| `src/index.ts` | Same V1 exports | Remove all V1 exports |

---

## Type Definitions

### Files with V1 Type References

| File | Line | Type | V2 Migration |
|------|------|------|--------------|
| `src/FOUNDATION/tokens/types/index.ts` | 151 | `MotionDurationToken = keyof typeof durations` | Change to `keyof typeof motionV2Durations` |

---

## Documentation Files

| File | Content | Action |
|------|---------|--------|
| `docs/architecture/MOTION_AUTHORITY.md` | V1/V2 version policy | Update to V2-only |
| `docs/architecture/locks/MOTION_LOCK.md` | V1 lock section | Remove V1 section |
| `docs/reference/API_REFERENCE.md` | V1 exports documented | Remove V1 API docs |
| `docs/reference/MOTION_ANIMATIONS_GUIDE.md` | V1 config examples | Update to V2-only |
| `docs/reports/audit/STORYBOOK_MOTION_TRANSPORT_AUDIT.md` | Legacy motion references | Update references |

---

## CSS Variables (Legacy Names)

### V1 CSS Variable Names (to be removed)

Pattern: `--duration-*`, `--ease-*`, `--transition-*`

**Durations:**
- `--duration-instant`, `--duration-fast`, `--duration-normal`, `--duration-slow`, `--duration-slower`, `--duration-slowest`
- `--duration-75`, `--duration-100`, `--duration-200`, `--duration-250`, `--duration-400`, `--duration-600`, `--duration-800`

**Easings:**
- `--ease-linear`, `--ease-in`, `--ease-out`, `--ease-in-out`
- `--ease-bounce`, `--ease-elastic`
- `--ease-out-cubic`, `--ease-in-cubic`, `--ease-in-out-cubic`

**Transitions:**
- `--transition-fast`, `--transition-normal`, `--transition-slow`, `--transition-default`
- `--transition-fast-in`, `--transition-fast-out`, `--transition-fast-in-out`
- `--transition-normal-in`, `--transition-normal-out`, `--transition-normal-in-out`
- `--transition-slow-in`, `--transition-slow-out`, `--transition-slow-in-out`
- `--transition-bounce`, `--transition-elastic`

### V2 CSS Variable Names (to keep)

Pattern: `--tm-motion-*`

**Durations:**
- `--tm-motion-duration-fast`, `--tm-motion-duration-normal`, `--tm-motion-duration-slow`, `--tm-motion-duration-reduced`

**Easings:**
- `--tm-motion-easing-soft`, `--tm-motion-easing-standard`, `--tm-motion-easing-emphasized`

**Transitions:**
- `--tm-motion-transition-fast`, `--tm-motion-transition-normal`, `--tm-motion-transition-slow`, `--tm-motion-transition-soft`, `--tm-motion-transition-reduced`

---

## Migration Plan by File

### High Priority (Blocks Build)

1. **`tailwind.config.ts`** → Remove V1 config merge
2. **`src/preset.ts`** → Remove V1 config merge
3. **`src/FOUNDATION/tokens/motion.ts`** → Delete file
4. **`src/FOUNDATION/tokens/index.ts`** → Remove V1 exports
5. **`src/index.ts`** → Remove V1 exports

### Medium Priority (Functional Changes)

6. **`src/FOUNDATION/theme/applyMode.ts`** → Remove V1 CSS vars application
7. **`src/FOUNDATION/tokens/css-variables.ts`** → Remove V1 vars from aggregation
8. **`src/COMPOSITION/motion/animation/tas.ts`** → Full migration to V2 tokens
9. **`src/FOUNDATION/lib/responsive-props.ts`** → Use V2 durations
10. **`src/FOUNDATION/tokens/types/index.ts`** → Update type definitions

### Low Priority (Cleanup)

11. **`src/COMPOSITION/motion/animation/types.ts`** → Remove unused `Spring` type
12. **`scripts/export-tokens.ts`** → Update or remove V1 export

---

## Verification Commands

After migration, run these commands to verify complete V1 removal:

```bash
# Should return 0 results
grep -r "tailwindMotionConfig" src/ --include="*.ts" --include="*.tsx"
grep -r "motionCSSVariables[^V]" src/ --include="*.ts" --include="*.tsx"
grep -r "from.*tokens/motion['\"][^/]" src/ --include="*.ts" --include="*.tsx"

# V1 file should not exist
ls src/FOUNDATION/tokens/motion.ts 2>/dev/null && echo "ERROR: V1 file exists" || echo "OK: V1 file removed"
```

---

**Report Status:** ✅ Complete  
**Next Step:** STEP 1 - Migrate all V1 imports to V2 equivalents

