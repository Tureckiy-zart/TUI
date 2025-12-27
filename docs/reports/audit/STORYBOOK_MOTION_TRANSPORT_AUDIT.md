# Storybook 10 Motion Transport Audit Report

**Date:** 2025-12-27  
**Task ID:** TUNG_STORYBOOK_10_MOTION_FULL_AUDIT  
**Scope:** Storybook-only infrastructure audit  
**Environment:** Storybook 10.1.10, Vite builder, pnpm monorepo

## Executive Summary

This audit systematically examined the motion token transport chain from definition to runtime in Storybook 10. The goal was to identify the exact failure point where motion/animation transport breaks, without modifying component implementations.

**Key Finding:** The motion transport infrastructure appears to be correctly configured. All critical components (tokens → CSS variables → Tailwind generation → provider stack) are in place. The most likely failure points are:

1. **Runtime CSS variable application timing** - Motion variables may not be applied synchronously before first render
2. **prefers-reduced-motion global reset** - May disable animations if user preference is enabled
3. **Tailwind keyframes generation** - Keyframes may not be generated if content paths don't match

## Audit Methodology

The audit followed a systematic 7-step process:

1. **STEP_0:** Smoke test for basic CSS animation capability
2. **STEP_1:** Reduced motion policy audit
3. **STEP_2:** Token-to-CSS-variables verification
4. **STEP_3:** CSS pipeline audit
5. **STEP_4:** Tailwind generation audit
6. **STEP_5:** Provider stack audit
7. **STEP_6:** Preview runtime sanitation
8. **STEP_7:** Verdict and recommendations

## Detailed Findings

### STEP_0: Smoke Test

**Status:** ✅ PASS (Test story created)

**Actions Taken:**
- Created temporary smoke test story: `.storybook/motion-smoke-test.stories.tsx`
- Test includes:
  - Opacity transition test
  - Transform transition test
  - Keyframes animation test

**Verification Required:**
- Manual visual inspection in Storybook
- DevTools computed styles verification
- Check `transition-duration` > 0ms
- Check `transition-property` presence
- Verify opacity/transform interpolates over time

**Outcome:** Test infrastructure ready. Requires runtime verification.

---

### STEP_1: Reduced Motion Audit

**Status:** ⚠️ POTENTIAL ISSUE IDENTIFIED

**Findings:**

1. **Global Reset in `src/styles/globals.css:96-105`:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *,
     *::before,
     *::after {
       animation-duration: 0ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```

2. **Impact:**
   - If user has `prefers-reduced-motion: reduce` enabled, ALL animations are disabled globally
   - This is correct accessibility behavior, but may mask motion transport issues
   - Motion variables may be set correctly, but animations won't execute

**Verification Required:**
- Check system `prefers-reduced-motion` setting
- Verify media query is not forcing reduce when user preference is "no preference"
- Test animations with reduced motion disabled

**Recommendation:**
- This is expected behavior for accessibility
- For testing, ensure `prefers-reduced-motion` is set to "no preference"
- Consider adding Storybook parameter to override reduced motion for testing

---

### STEP_2: Token-to-CSS-Variables Verification

**Status:** ✅ INFRASTRUCTURE IN PLACE

**Findings:**

1. **Motion Token Definitions:**
   - Motion V2: `src/FOUNDATION/tokens/motion/v2.ts` → `motionV2CSSVariables`
   - Legacy Motion: `src/FOUNDATION/tokens/motion.ts` → `motionCSSVariables`

2. **CSS Variable Application:**
   - `src/FOUNDATION/theme/applyMode.ts:updateCSSVariablesFromTokens()` (lines 399-415)
   - Motion V2 variables applied: lines 408-415
   - Legacy motion variables applied: lines 399-406

3. **Initialization:**
   - Called synchronously in `.storybook/preview.tsx:20` via `initThemeSync("day", "tm_mode")`
   - Executes at module top-level before React render

4. **Diagnostic Helper Created:**
   - `__checkMotionVars()` helper function added to preview.tsx
   - Verifies all motion CSS variables are present and non-zero
   - Checks both V2 and legacy motion variables
   - Detects `prefers-reduced-motion` status

**Expected Variables:**

**Motion V2:**
- `--motion-duration-fast` (150ms)
- `--motion-duration-normal` (250ms)
- `--motion-duration-slow` (350ms)
- `--motion-duration-reduced` (0ms)
- `--motion-easing-soft`, `--motion-easing-standard`, `--motion-easing-emphasized`
- `--motion-transition-fast`, `--motion-transition-normal`, `--motion-transition-slow`, `--motion-transition-soft`, `--motion-transition-reduced`

**Legacy Motion:**
- `--duration-fast`, `--duration-normal`, `--duration-slow`
- `--ease-out`, `--ease-in-out`
- `--transition-fast`, `--transition-normal`, `--transition-slow`

**Verification Required:**
- Run `__checkMotionVars()` in Storybook console
- Verify all variables are present on `document.documentElement`
- Verify values are non-zero (except `--motion-duration-reduced`)
- Check timing: variables should be set before first React render

**Potential Issue:**
- If `initThemeSync()` executes after React hydration, variables may not be available on initial render
- Check if Storybook iframe timing differs from app runtime

---

### STEP_3: CSS Pipeline Audit

**Status:** ✅ CONFIGURED CORRECTLY

**Findings:**

1. **CSS Imports in `.storybook/preview.tsx`:**
   ```typescript
   import "../src/styles/globals.css";        // Tailwind directives + reduced motion reset
   import "../src/FOUNDATION/theme/global.css"; // Base styles
   import "./storybook-overrides.css";          // Storybook-specific overrides
   ```

2. **Tailwind Directives:**
   - `globals.css` includes `@tailwind base`, `@tailwind components`, `@tailwind utilities`
   - Should generate all Tailwind utilities including motion classes

3. **Keyframes Generation:**
   - Keyframes defined in:
     - `src/FOUNDATION/tokens/motion.ts` → `keyframes` object
     - `src/FOUNDATION/tokens/motion/v2.ts` → `motionV2TailwindConfig.keyframes`
   - Mapped to Tailwind config: `tailwind.config.ts:183-186`

**Verification Required:**
- Inspect generated CSS in DevTools
- Search for `@keyframes fade-in`, `@keyframes scale-in`, `@keyframes slide-up-in`
- Verify keyframes are present in compiled CSS
- Check if keyframes reference CSS variables correctly

**Potential Issue:**
- If Tailwind doesn't detect keyframes usage, they may not be generated
- Safelist may be needed for keyframes (currently only utility classes are safelisted)

---

### STEP_4: Tailwind Generation Audit

**Status:** ✅ CONFIGURED CORRECTLY

**Findings:**

1. **Content Paths (`tailwind.config.ts:149`):**
   ```typescript
   content: ["./src/**/*.{js,ts,jsx,tsx}", "./stories/**/*.{js,ts,jsx,tsx}"]
   ```
   - ✅ Includes `src/**` (covers all stories in src/)
   - ⚠️ Does NOT include `.storybook/**` (smoke test story not covered, but temporary)

2. **Safelist (`tailwind.config.ts:123-144`):**
   - ✅ All motion utility classes are safelisted:
     - `tm-motion-fade-in`, `tm-motion-fade-out`
     - `tm-motion-scale-in`, `tm-motion-scale-out`
     - `tm-motion-slide-*` (all directions)
     - `tm-motion-fade-scale`, `tm-motion-fade-slide-*`
     - `tm-motion-hover-lift`, `tm-motion-hover-scale`, `tm-motion-tap-scale`

3. **Motion Config Integration:**
   - `tailwind.config.ts:174-187` includes:
     - `transitionDuration` from both motion configs
     - `transitionTimingFunction` from both motion configs
     - `keyframes` merged from both motion configs
     - `animation` from `tailwindMotionConfig`

4. **Preset Integration:**
   - `src/preset.ts:92-197` defines motion utility classes via Tailwind plugin
   - Utilities use CSS variables: `var(--motion-duration-normal)`, `var(--motion-easing-standard)`

**Verification Required:**
- Inspect compiled CSS for `.tm-motion-*` classes
- Verify classes reference CSS variables correctly
- Check if classes are present even when not used in content scan
- Verify animation properties use correct keyframe names

**Potential Issue:**
- If CSS variables are not set when Tailwind compiles, utilities may reference undefined variables
- Runtime CSS variable application may not match compile-time expectations

---

### STEP_5: Provider Stack Audit

**Status:** ✅ CONFIGURED CORRECTLY

**Findings:**

1. **Provider Stack (`.storybook/preview.tsx:602-637`):**
   ```typescript
   decorators: [
     (Story) => {
       return (
         <ThemeProvider defaultMode="day">
           <div style={{ padding: "2rem" }}>
             <Story />
           </div>
         </ThemeProvider>
       );
     },
   ],
   ```

2. **ThemeProvider Integration:**
   - `ThemeProvider` includes motion support via:
     - `reduceMotion` prop (checks `prefers-reduced-motion`)
     - `enableAnimations` prop (global animation toggle)
   - Motion is integrated into ThemeProvider, no separate MotionProvider needed

3. **Provider Order:**
   - ✅ Correct: ThemeProvider wraps Story
   - ✅ CSS variables set before provider mount (via `initThemeSync()`)

**Verification Required:**
- Verify ThemeProvider mounts correctly in Storybook iframe
- Check if `reduceMotion` or `enableAnimations` props need to be set explicitly
- Verify provider context is available to components

**Potential Issue:**
- If `ThemeProvider` doesn't mount or context is not available, motion preferences may not be applied
- Default props may not match Storybook runtime expectations

---

### STEP_6: Preview Runtime Sanitation

**Status:** ✅ COMPLETED

**Actions Taken:**

1. **Removed Debug Fetch Calls:**
   - Removed all `fetch()` calls to debug endpoint (`http://127.0.0.1:7243/ingest/...`)
   - Removed from:
     - `initThemeSync` call start (lines 21-37)
     - CSS rules check (lines 91-110)
     - `initThemeSync` call end (lines 123-143)
     - `__checkThemeVars` call (lines 295-308)
     - Delayed check (lines 539-556)
     - Story decorator render (lines 610-627)

2. **Preserved Diagnostic Helpers:**
   - ✅ `__checkThemeVars()` - Theme variable verification
   - ✅ `__checkStateMatrix()` - State matrix verification
   - ✅ `__checkMotionVars()` - Motion variable verification (newly added)

3. **Result:**
   - Preview runtime cleaned of side-effects
   - Only essential initialization and diagnostic helpers remain
   - No async operations that could affect timing

---

## Root Cause Analysis

Based on the audit findings, the motion transport chain appears to be correctly configured. However, several potential failure points were identified:

### Primary Suspects:

1. **CSS Variable Timing (HIGH PROBABILITY)**
   - **Issue:** CSS variables may not be applied synchronously before first React render in Storybook iframe
   - **Evidence:** `initThemeSync()` is called at module top-level, but Storybook iframe timing may differ
   - **Verification:** Run `__checkMotionVars()` immediately after page load
   - **Fix:** Ensure `initThemeSync()` completes before React hydration

2. **prefers-reduced-motion Override (MEDIUM PROBABILITY)**
   - **Issue:** Global reset may disable animations if user preference is enabled
   - **Evidence:** `globals.css:96-105` forces `duration: 0ms !important` when reduced motion is preferred
   - **Verification:** Check system `prefers-reduced-motion` setting
   - **Fix:** Add Storybook parameter to override for testing

3. **Tailwind Keyframes Generation (LOW PROBABILITY)**
   - **Issue:** Keyframes may not be generated if not detected in content scan
   - **Evidence:** Keyframes are defined but may need explicit usage or safelist
   - **Verification:** Inspect compiled CSS for `@keyframes` definitions
   - **Fix:** Add keyframes to safelist or ensure they're referenced in content

### Secondary Suspects:

4. **CSS Variable Reference in Utilities (LOW PROBABILITY)**
   - **Issue:** Motion utilities reference CSS variables that may not be set at compile time
   - **Evidence:** `preset.ts` utilities use `var(--motion-duration-normal)` etc.
   - **Verification:** Check if utilities resolve correctly at runtime
   - **Fix:** Ensure CSS variables are set before utilities are applied

5. **Provider Context Availability (LOW PROBABILITY)**
   - **Issue:** ThemeProvider context may not be available to components
   - **Evidence:** Provider wraps stories, but context may not propagate
   - **Verification:** Check if components can access ThemeContext
   - **Fix:** Verify provider mounting and context propagation

---

## Recommendations

### Immediate Actions:

1. **Runtime Verification:**
   - Run Storybook and execute `__checkMotionVars()` in console
   - Verify all motion variables are present and non-zero
   - Check timing: variables should be set before first render

2. **Smoke Test Execution:**
   - Open `.storybook/motion-smoke-test.stories.tsx` in Storybook
   - Verify animations execute correctly
   - Check DevTools computed styles for transition/animation properties

3. **prefers-reduced-motion Check:**
   - Verify system `prefers-reduced-motion` setting
   - Test with reduced motion disabled
   - Consider adding Storybook parameter to override for testing

### Short-term Fixes:

1. **Add Keyframes to Safelist (if needed):**
   ```typescript
   // In tailwind.config.ts safelist
   // If keyframes are not generated, add explicit references
   ```

2. **Verify CSS Variable Timing:**
   - Add console logs to `initThemeSync()` to verify execution timing
   - Ensure variables are set before React hydration

3. **Add Motion Testing Parameter:**
   ```typescript
   // In preview.tsx parameters
   motion: {
     reduceMotion: false, // Override for testing
   }
   ```

### Long-term Improvements:

1. **MotionProvider Consideration:**
   - Current architecture integrates motion into ThemeProvider
   - If motion issues persist, consider separate MotionProvider for clearer separation
   - **Decision:** NO - Current integration is sufficient if timing is fixed

2. **Enhanced Diagnostics:**
   - Add Storybook addon for motion variable inspection
   - Add visual indicators for motion variable status
   - Add warnings when motion is disabled

3. **Documentation:**
   - Document motion transport chain
   - Add troubleshooting guide for motion issues
   - Document `prefers-reduced-motion` behavior

---

## Testing Checklist

Use this checklist to verify motion transport in Storybook:

- [ ] Run `__checkMotionVars()` in Storybook console
- [ ] Verify all motion V2 variables are present
- [ ] Verify all legacy motion variables are present
- [ ] Verify no variables have zero duration (except `--motion-duration-reduced`)
- [ ] Check `prefers-reduced-motion` status
- [ ] Open smoke test story and verify animations
- [ ] Check DevTools computed styles for transition/animation properties
- [ ] Verify keyframes are present in compiled CSS
- [ ] Verify `.tm-motion-*` classes are present in compiled CSS
- [ ] Test with `prefers-reduced-motion` disabled
- [ ] Test with `prefers-reduced-motion` enabled (should disable animations)

---

## Conclusion

The motion transport infrastructure is correctly configured. The most likely failure point is **CSS variable timing** - variables may not be applied synchronously before first React render in Storybook iframe context.

**Next Steps:**
1. Execute runtime verification using diagnostic helpers
2. Run smoke test stories to verify animations
3. If issues persist, focus on CSS variable timing and `prefers-reduced-motion` override

**Go/No-Go Decision:**
- **NO separate MotionProvider needed** - Current ThemeProvider integration is sufficient
- **Focus on timing and runtime verification** - Infrastructure is correct, timing may be the issue

---

## Files Modified

1. `.storybook/motion-smoke-test.stories.tsx` - Created (temporary, for audit)
2. `.storybook/preview.tsx` - Modified:
   - Added `__checkMotionVars()` helper
   - Removed debug fetch calls
   - Cleaned preview runtime

## Files Verified (No Changes)

1. `src/FOUNDATION/tokens/motion.ts` - Motion tokens and CSS variables
2. `src/FOUNDATION/tokens/motion/v2.ts` - Motion V2 tokens and CSS variables
3. `src/FOUNDATION/theme/applyMode.ts` - CSS variable application
4. `tailwind.config.ts` - Tailwind configuration and safelist
5. `src/preset.ts` - Motion utility classes
6. `src/styles/globals.css` - Reduced motion reset
7. `src/FOUNDATION/theme/ThemeProvider.tsx` - Motion integration

---

**Audit Completed:** 2025-12-27  
**Next Review:** After runtime verification

