# Motion — Remove v2 from Public API Names (Canonical Naming Cleanup)

**Date:** 2025-12-28  
**Status:** ✅ **COMPLETED**  
**Task ID:** TUNG_MOTION_REMOVE_V2_NAMING_V1

---

## Rationale

Motion V1 has been fully removed from the codebase. Motion 2.x is LOCKED as canonical. Public API names still included `v2` suffix unnecessarily, creating versioned naming for a system that is now the single canonical version.

**Decision:** Remove `v2` suffix from all Motion public API names to reflect canonical, versionless API.

---

## Renamed Symbols

All `motionV2*` exports have been renamed to canonical `motion*` names:

| Old Name (V2) | New Name (Canonical) |
|---------------|---------------------|
| `motionV2Durations` | `motionDurations` |
| `motionV2Easings` | `motionEasings` |
| `motionV2Transitions` | `motionTransitions` |
| `motionV2CSSVariables` | `motionCSSVariables` |
| `motionV2TailwindConfig` | `motionTailwindConfig` |
| `motionV2ReducedMotion` | `motionReducedMotion` |
| `motionV2Fade` | `motionFade` |
| `motionV2Scale` | `motionScale` |
| `motionV2Slide` | `motionSlide` |
| `motionV2Combined` | `motionCombined` |
| `motionV2TransitionProperty` | `motionTransitionProperty` |

**Type Exports:**
- `MotionV2Duration` → `MotionDuration`
- `MotionV2Easing` → `MotionEasing`
- `MotionV2Transition` → `MotionTransition`
- `MotionV2SlideDirection` → `MotionSlideDirection`
- `MotionV2CombinedType` → `MotionCombinedType`

---

## Changes Made

### 1. Source Code

- **`src/FOUNDATION/tokens/motion.ts`**
  - Removed `motionV2CSSVariables` alias export
  - All exports now use canonical names without `v2` suffix

- **`src/FOUNDATION/theme/applyMode.ts`**
  - Updated import: `motionV2CSSVariables` → `motionCSSVariables`
  - Updated usage: `motionV2CSSVariables` → `motionCSSVariables`

- **`src/FOUNDATION/tokens/css-variables.ts`**
  - Updated import: `motionV2CSSVariables` → `motionCSSVariables`
  - Updated all usages to canonical name

- **`docs-app/app/tokens/motion/page.tsx`**
  - Updated all imports: `motionV2*` → `motion*`
  - Updated all usages throughout the component

### 2. CI Guard

- **`scripts/check-motion-v1.mjs`**
  - Updated error messages to reference canonical names
  - Fixed pattern matching to not false-positive on canonical `motionCSSVariables`
  - Changed V1 detection patterns to check for old V1 names without `motion` prefix (`durations`, `easings`, `transitions`)

### 3. Documentation

- **`docs/architecture/locks/MOTION_LOCK.md`**
  - Updated exports list to canonical names
  - Removed "(V2 Only)" from section title

- **`docs/reference/API_REFERENCE.md`**
  - Updated all Motion token references to canonical names
  - Updated type exports list
  - Updated section title to remove "V2 Only"

- **`docs/reference/MOTION_ANIMATIONS_GUIDE.md`**
  - Updated all `motionV2*` references to canonical `motion*` names
  - Updated code examples throughout the guide

### 4. Changelog

- **`CHANGELOG.md`**
  - Added entry in `[Unreleased]` → `Changed` section documenting the renaming

---

## Verification

### ✅ No Behavior Changes

- All Motion token values remain identical
- All CSS variables remain identical
- All animation behavior remains identical
- No runtime changes

### ✅ No Motion V1 Patterns Reintroduced

- CI guard (`pnpm run check:motion-v1`) passes ✅
- No V1 file exists ✅
- No V1 import patterns detected ✅
- No V1 CSS variable patterns detected ✅
- No V1 export patterns detected ✅

### ✅ Motion Remains LOCKED and Canonical

- Motion tokens remain LOCKED per `docs/architecture/locks/MOTION_LOCK.md`
- All exports use canonical, versionless names
- No deprecated aliases remain
- Single source of truth maintained

### ✅ All Tests and Guards Pass

- `pnpm run check:motion-v1` passes ✅
- No TypeScript errors ✅
- No linting errors ✅

---

## Impact

**Breaking Change:** ⚠️ **YES** (import statement changes required)

**Migration Required:**
- Update import statements from `motionV2*` to `motion*`
- Update all usages of `motionV2*` symbols to canonical names

**Backward Compatibility:** ❌ **NOT PROVIDED** (by design - canonical naming cleanup)

**Severity:** LOW (naming change only, no behavior changes)

**Migration Difficulty:** LOW (simple find-and-replace)

---

## Files Modified

1. `src/FOUNDATION/tokens/motion.ts`
2. `src/FOUNDATION/theme/applyMode.ts`
3. `src/FOUNDATION/tokens/css-variables.ts`
4. `docs-app/app/tokens/motion/page.tsx`
5. `scripts/check-motion-v1.mjs`
6. `docs/architecture/locks/MOTION_LOCK.md`
7. `docs/reference/API_REFERENCE.md`
8. `docs/reference/MOTION_ANIMATIONS_GUIDE.md`
9. `CHANGELOG.md`

---

## Conclusion

✅ **Task Completed Successfully**

All `v2` suffixes have been removed from Motion public API names. Motion tokens now use canonical, versionless naming that reflects their status as the single LOCKED canonical motion system.

- ✅ No public Motion API contains `v2` in its name
- ✅ No Motion V1 patterns reintroduced
- ✅ All motion tests and guards pass
- ✅ Motion remains LOCKED and canonical

---

**Last Updated:** 2025-12-28  
**Completed By:** AI Assistant  
**Verified By:** CI Guard (`pnpm run check:motion-v1`)

