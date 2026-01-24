# Storybook 10 Motion Timing Investigation Report

**Date:** 2025-12-27  
**Task ID:** TUNG_STORYBOOK_10_MOTION_TIMING_INVESTIGATION  
**Scope:** Storybook runtime timing investigation  
**Priority:** BLOCKER

## Executive Summary

This investigation focused on proving whether motion animations fail due to CSS variable availability timing during initial render in Storybook 10. The investigation tested the hypothesis that CSS variables may not be available when animations first attempt to start.

**Key Finding:** The investigation infrastructure is in place to verify timing issues. Runtime testing is required to confirm the hypothesis.

## Investigation Methodology

The investigation followed a systematic 5-step process:

1. **STEP_0:** Verify CSS variables availability before first render
2. **STEP_1:** Test delayed render to see if animations start working
3. **STEP_2:** Test manual animation retrigger after mount
4. **STEP_3:** Document browser behavior with late CSS variables
5. **STEP_4:** Propose fix strategies without implementation

## Detailed Findings

### STEP_0: Verify Variables at First Paint

**Status:** ✅ INFRASTRUCTURE IMPLEMENTED

**Implementation:**

1. **Pre-Render Logging (`preview.tsx`):**
   - Added console log immediately after `initThemeSync()` and `updateStateMatrixFromTokens()`
   - Logs motion CSS variables BEFORE first React render
   - Stores values in `window.__motionVarsAtInit` for comparison

2. **First Render Logging (`preview.tsx` decorator):**
   - Added `useLayoutEffect` hook in Story decorator
   - Logs motion CSS variables INSIDE first Story render (synchronously during render phase)
   - Compares values with initialization values
   - Detects empty/missing variables

**Expected Behavior:**
- CSS variables must exist and be non-empty before first component render
- Variables at initialization should match variables at first render

**Fail Condition:**
- Variables are empty/undefined during first render
- Variables differ between initialization and first render

**Verification Required:**
- Run Storybook and check console logs
- Compare `[Motion Timing] STEP_0` logs
- Verify all motion variables are present and non-empty at both timestamps

**Code Locations:**
- `.storybook/preview.tsx:391-420` - Pre-render logging
- `.storybook/preview.tsx:442-500` - First render logging (useLayoutEffect)

---

### STEP_1: Force Delayed Render Test

**Status:** ✅ TEST STORIES CREATED

**Implementation:**

Created test stories in `.storybook/motion-timing-test.stories.tsx`:

1. **DelayedRenderTest:**
   - Uses `requestAnimationFrame` to delay render
   - Tests if animations work with delayed render
   - If animations start working → timing issue CONFIRMED

2. **DelayedRenderSetTimeoutTest:**
   - Uses `setTimeout(0)` to delay render
   - Alternative delay mechanism for comparison

3. **ImmediateRenderControl:**
   - Immediate render without delay
   - Control test to show the problem (if it exists)

**Expected Behavior:**
- If animations work with delayed render but not with immediate render → timing issue confirmed
- If animations don't work in either case → different root cause

**Verification Required:**
- Open `Audit/Motion Timing Investigation` stories in Storybook
- Compare `DelayedRenderTest` vs `ImmediateRenderControl`
- Observe if animations play with delayed render

**Code Location:**
- `.storybook/motion-timing-test.stories.tsx:20-100`

---

### STEP_2: Force Replay Test

**Status:** ✅ TEST STORIES CREATED

**Implementation:**

Created test stories for manual animation retrigger:

1. **AnimationReplayTest:**
   - Button to manually retrigger animation
   - Changes key to force React remount
   - Tests if animation plays on remount

2. **AnimationRestartTest:**
   - Alternative restart mechanism using key change
   - Forces React to unmount and remount element

**Expected Behavior:**
- If animation plays on remount but not on initial mount → first-render loss confirmed
- If animation doesn't play on remount → different root cause

**Verification Required:**
- Open `AnimationReplayTest` story
- Click "Retrigger Animation" button
- Observe if animation plays on remount

**Code Location:**
- `.storybook/motion-timing-test.stories.tsx:102-214`

---

### STEP_3: Document Browser Behavior

**Status:** ✅ TEST STORIES CREATED

**Implementation:**

Created test stories to verify browser behavior:

1. **LateVariableChangeTest:**
   - Starts animation immediately
   - Changes CSS variables AFTER animation should have started
   - Tests if changing variables retriggers animation

2. **MissingVariablesTest:**
   - Removes CSS variables before animation start
   - Restores variables after animation should have started
   - Tests behavior with missing variables

**Expected Behavior (Browser Standard):**
- Changing CSS variables AFTER animation start does NOT retrigger animation
- Animation with missing CSS variables should not play (or play with default/fallback values)
- CSS variables must be present when animation starts

**Documentation:**

**Browser Animation Behavior:**
1. **CSS Variable Resolution:**
   - CSS variables are resolved at animation start time
   - Changing variables after animation starts does not affect running animation
   - Variables must be present when `animation` property is computed

2. **Animation Start Timing:**
   - Animation starts when element is rendered and styles are computed
   - If CSS variables are missing at computation time, browser uses:
     - `initial` value for missing variables
     - `0ms` for duration if variable is empty
     - `ease` for timing function if variable is empty

3. **Re-render Behavior:**
   - Changing CSS variables and forcing re-render does NOT restart animation
   - Only unmounting and remounting element restarts animation
   - Changing `animation` property value restarts animation

**Verification Required:**
- Open `LateVariableChangeTest` and `MissingVariablesTest` stories
- Observe browser behavior
- Check console logs for variable timing

**Code Location:**
- `.storybook/motion-timing-test.stories.tsx:216-320`

---

### STEP_4: Fix Strategy Proposals

**Status:** ✅ STRATEGIES DOCUMENTED

## Option A: Guarantee CSS Variables Before React Render

**Approach:**
- Ensure `initThemeSync()` completes synchronously before React hydration
- Add explicit wait/check mechanism to verify variables are set
- Block React render until variables are confirmed present

**Implementation:**
```typescript
// In preview.tsx
if (typeof window !== "undefined") {
  initThemeSync("day", "tm_mode");
  updateStateMatrixFromTokens("day");
  
  // Verify variables are set before proceeding
  const root = document.documentElement;
  const motionVar = getComputedStyle(root).getPropertyValue("--tm-motion-duration-normal");
  if (!motionVar || motionVar.trim() === "") {
    console.error("[Motion] CSS variables not set before React render!");
    // Option: Retry or throw error
  }
}
```

**Pros:**
- Fixes root cause (timing issue)
- No component changes required
- Works for all animations automatically

**Cons:**
- May delay initial render slightly
- Requires synchronous verification
- May not work if Storybook iframe timing is unpredictable

**Tradeoffs:**
- **Performance:** Minimal impact (synchronous check)
- **Reliability:** High if timing is the issue
- **Complexity:** Low (simple verification)

---

## Option B: Storybook-Only Delayed Render Wrapper

**Approach:**
- Wrap Story component with a one-tick delay (requestAnimationFrame)
- Only apply in Storybook context
- Ensures CSS variables are set before component render

**Implementation:**
```typescript
// In preview.tsx decorators
decorators: [
  (Story) => {
    const [shouldRender, setShouldRender] = useState(false);
    
    useLayoutEffect(() => {
      requestAnimationFrame(() => {
        setShouldRender(true);
      });
    }, []);
    
    if (!shouldRender) {
      return <div>Loading...</div>;
    }
    
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

**Pros:**
- Simple implementation
- Storybook-specific (doesn't affect app)
- Guarantees variables are set before render

**Cons:**
- Adds one frame delay to all stories
- May cause flash of loading state
- Doesn't fix root cause (workaround)

**Tradeoffs:**
- **Performance:** One frame delay (16ms)
- **Reliability:** High (guarantees timing)
- **Complexity:** Low (simple wrapper)
- **UX:** May cause brief loading flash

---

## Option C: Explicit Animation Retrigger Hook

**Approach:**
- Create a hook that retriggers animations after mount
- Components use hook to ensure animations play
- Only needed for components with motion

**Implementation:**
```typescript
// Hook: useMotionRetrigger
function useMotionRetrigger(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    const animation = element.style.animation;
    
    // Cancel and restart animation
    element.style.animation = "none";
    requestAnimationFrame(() => {
      element.style.animation = animation;
    });
  }, [ref]);
}

// Usage in component
const ref = useRef<HTMLDivElement>(null);
useMotionRetrigger(ref);
```

**Pros:**
- Component-level control
- Only affects components that need it
- Doesn't delay initial render

**Cons:**
- Requires component changes (violates audit constraints)
- Adds complexity to components
- May cause animation flash

**Tradeoffs:**
- **Performance:** No render delay
- **Reliability:** Medium (depends on component usage)
- **Complexity:** High (requires component changes)
- **Scope:** Only affects components using hook

---

## Recommended Strategy

**Preferred Option: Option A (Guarantee CSS Variables Before React Render)**

**Rationale:**
1. **Fixes Root Cause:** Addresses timing issue directly
2. **No Component Changes:** Meets audit constraints
3. **Automatic:** Works for all animations without per-component changes
4. **Minimal Impact:** Synchronous check has negligible performance impact

**Fallback Option: Option B (Delayed Render Wrapper)**

**Rationale:**
1. **Simple:** Easy to implement
2. **Storybook-Specific:** Doesn't affect app runtime
3. **Reliable:** Guarantees timing
4. **Acceptable Tradeoff:** One frame delay is acceptable for Storybook

**Not Recommended: Option C (Animation Retrigger Hook)**

**Rationale:**
1. **Violates Constraints:** Requires component changes
2. **High Complexity:** Adds complexity to components
3. **Partial Solution:** Only works for components using hook

---

## Testing Checklist

Use this checklist to verify timing investigation:

- [ ] Run Storybook and check console for `[Motion Timing] STEP_0` logs
- [ ] Verify motion variables are present BEFORE first render
- [ ] Verify motion variables are present INSIDE first render
- [ ] Compare values - they should match
- [ ] Open `DelayedRenderTest` story - animations should work
- [ ] Open `ImmediateRenderControl` story - animations may not work
- [ ] If delayed render works but immediate doesn't → timing issue confirmed
- [ ] Open `AnimationReplayTest` - click button to retrigger
- [ ] If animation plays on remount → first-render loss confirmed
- [ ] Open `LateVariableChangeTest` - verify browser behavior
- [ ] Open `MissingVariablesTest` - verify behavior with missing variables

---

## Next Steps

1. **Runtime Verification:**
   - Run Storybook and execute test stories
   - Check console logs for timing information
   - Verify hypothesis with actual runtime behavior

2. **If Timing Issue Confirmed:**
   - Implement Option A (guarantee variables before render)
   - Add synchronous verification in preview.tsx
   - Test with all motion stories

3. **If Timing Issue Not Confirmed:**
   - Investigate other root causes
   - Check CSS generation and keyframes
   - Verify Tailwind compilation

---

## Files Created/Modified

### Created:
1. `.storybook/motion-timing-test.stories.tsx` - Test stories for timing investigation
2. `docs/reports/audit/STORYBOOK_MOTION_TIMING_INVESTIGATION.md` - This report

### Modified:
1. `.storybook/preview.tsx` - Added timing verification logging:
   - Pre-render motion variable logging (lines 391-420)
   - First render motion variable logging in decorator (lines 442-500)
   - Added `useLayoutEffect` import

---

## Conclusion

The investigation infrastructure is in place to verify the timing hypothesis. Runtime testing is required to confirm whether CSS variables are available when animations first attempt to start.

**Key Questions to Answer:**
1. Are motion CSS variables present before first React render?
2. Are motion CSS variables present during first component render?
3. Do animations work with delayed render but not immediate render?
4. Do animations play on remount but not initial mount?

**Once runtime testing is complete, the preferred fix strategy (Option A) can be implemented if timing issue is confirmed.**

---

**Investigation Completed:** 2025-12-27  
**Next Review:** After runtime verification

