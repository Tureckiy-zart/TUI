# Motion Coverage Gaps

**Date:** 2025-12-27  
**Status:** ✅ **COMPLETE**  
**Purpose:** Prioritized list of motion coverage gaps and non-compliant implementations.

---

## Gap Classification

- 🔴 **Critical** - Breaks compliance, must fix immediately
- 🟡 **High** - Important for consistency, should fix soon
- 🟢 **Medium** - Nice to have, can be deferred
- 🔵 **Low** - Optional enhancement, low priority

---

## Critical Gaps (Must Fix)

### 1. Checkbox - Non-Compliant Transition

**Priority:** 🔴 **Critical**  
**Component:** `src/PRIMITIVES/Checkbox/Checkbox.tsx`  
**File:** `src/FOUNDATION/tokens/components/checkbox.ts:154`  
**Issue:** Uses raw `duration-200` instead of token  
**Current:** `transition: "transition-all duration-200 ease-in-out"`  
**Required:** `transition: MOTION_TOKENS.transitionPreset.normal` or `transition-all duration-normal ease-in-out`  
**Impact:** Breaks Motion Authority compliance  
**Fix Complexity:** Low (simple string replacement)  
**Estimated Effort:** 5 minutes  

**Fix:**
```typescript
// Before
transition: "transition-all duration-200 ease-in-out",

// After
transition: MOTION_TOKENS.transitionPreset.normal,
// OR
transition: "transition-all duration-normal ease-in-out",
```

---

### 2. Radio - Non-Compliant Transition

**Priority:** 🔴 **Critical**  
**Component:** `src/PRIMITIVES/Radio/Radio.tsx`  
**File:** `src/FOUNDATION/tokens/components/radio.ts:151`  
**Issue:** Uses raw `duration-200` instead of token  
**Current:** `transition: "transition-all duration-200 ease-in-out"`  
**Required:** `transition: MOTION_TOKENS.transitionPreset.normal` or `transition-all duration-normal ease-in-out`  
**Impact:** Breaks Motion Authority compliance  
**Fix Complexity:** Low (simple string replacement)  
**Estimated Effort:** 5 minutes  

**Fix:**
```typescript
// Before
transition: "transition-all duration-200 ease-in-out",

// After
transition: MOTION_TOKENS.transitionPreset.normal,
// OR
transition: "transition-all duration-normal ease-in-out",
```

---

## High Priority Gaps (Should Fix Soon)

### 3. Drawer - Custom Transition Names Need Verification

**Priority:** 🟡 **High**  
**Component:** `src/COMPOSITION/overlays/Drawer/Drawer.tsx`  
**File:** `src/COMPOSITION/overlays/Drawer/drawer-variants.ts:34`  
**Issue:** Uses custom transition names `"appear"` and `"disappear"`  
**Current:** `transition: "appear"` / `transition: "disappear"`  
**Required:** Verify if these are token-based or replace with token-based transitions  
**Impact:** May break compliance if custom  
**Fix Complexity:** Medium (requires investigation)  
**Estimated Effort:** 30 minutes  

**Action Required:**
1. Check if `appear`/`disappear` are defined in motion tokens
2. If not, replace with `.tm-motion-*` utilities or Radix UI animations
3. Update drawer variants to use compliant transitions

---

### 4. Cards - Animation String Values Need Verification

**Priority:** 🟡 **High**  
**Components:** VenueCard, TicketCard, PromoCard, CategoryCard, ArtistCard, EventCard  
**Files:** Multiple card component files  
**Issue:** Uses string value `"fadeInUp"` for animation prop  
**Current:** `animation: animation?.animation || "fadeInUp"`  
**Required:** Verify if `fadeInUp` is token-based or replace with `.tm-motion-*` utility  
**Impact:** May break compliance if custom  
**Fix Complexity:** Medium (requires investigation and possible refactor)  
**Estimated Effort:** 1-2 hours  

**Action Required:**
1. Check if `fadeInUp` is defined in motion tokens or TAS presets
2. If not, replace with `.tm-motion-fade-slide-up` or similar utility
3. Update all card components to use compliant animations

---

## Medium Priority Gaps (Nice to Have)

### 5. Button - Loading State Motion Not Implemented

**Priority:** 🟢 **Medium**  
**Component:** `src/PRIMITIVES/Button/Button.tsx`  
**File:** `src/FOUNDATION/tokens/components/button.ts`  
**Issue:** Loading state tokens exist but motion not fully implemented  
**Current:** Loading state defined in tokens but not active  
**Required:** Implement loading state motion (spinner animation)  
**Impact:** Missing feature, not breaking  
**Fix Complexity:** Medium (requires implementation)  
**Estimated Effort:** 1-2 hours  

**Action Required:**
1. Verify loading state tokens are correct
2. Implement loading spinner animation using motion tokens
3. Add loading state to Button component
4. Update Storybook stories to demonstrate loading state

---

### 6. Link - Missing Press/Tap Feedback

**Priority:** 🟢 **Medium**  
**Component:** `src/PRIMITIVES/Link/Link.tsx`  
**File:** `src/FOUNDATION/tokens/components/link.ts`  
**Issue:** No active/press state feedback  
**Current:** Only hover and focus states  
**Required:** Add active state transition (optional - links typically don't need press feedback)  
**Impact:** Minor UX improvement  
**Fix Complexity:** Low (add active state transition)  
**Estimated Effort:** 15 minutes  

**Action Required:**
1. Add `.tm-motion-tap-scale` or similar utility to Link component
2. Or add active state transition via tokens
3. Update Storybook stories to demonstrate active state

---

## Low Priority Gaps (Optional Enhancements)

### 7. Missing Expand/Collapse Components

**Priority:** 🔵 **Low**  
**Components:** Accordion, Collapsible  
**Issue:** Not in codebase  
**Current:** N/A  
**Required:** If needed, implement using Radix UI animations  
**Impact:** None (components don't exist)  
**Fix Complexity:** N/A  
**Estimated Effort:** N/A  

**Note:** These components are not currently in the codebase. If added in the future, they should use Radix UI animations (compliant) or `.tm-motion-*` utilities.

---

## Summary

### Gap Statistics

| Priority | Count | Total Effort |
|----------|-------|--------------|
| 🔴 Critical | 2 | ~10 minutes |
| 🟡 High | 2 | ~2-3 hours |
| 🟢 Medium | 2 | ~2-3 hours |
| 🔵 Low | 1 | N/A |
| **Total** | **7** | **~4-6 hours** |

### Compliance Impact

- **Critical Issues:** 2 (must fix before lock)
- **High Priority:** 2 (should fix before lock)
- **Medium Priority:** 2 (can fix after lock)
- **Low Priority:** 1 (optional)

### Recommended Fix Order

1. ✅ Fix Checkbox transition (Critical - 5 min)
2. ✅ Fix Radio transition (Critical - 5 min)
3. 🔍 Verify Drawer transitions (High - 30 min)
4. 🔍 Verify Card animations (High - 1-2 hours)
5. ⏳ Implement Button loading motion (Medium - 1-2 hours)
6. ⏳ Add Link press feedback (Medium - 15 min)

---

## Fix Verification Checklist

After fixing each gap, verify:

- [ ] Motion uses token CSS variables or MOTION_TOKENS references
- [ ] No raw duration/easing values in component files
- [ ] Storybook story demonstrates the motion
- [ ] Motion respects reduced motion preferences
- [ ] Motion is accessible (keyboard navigation works)

---

**Report Generated:** 2025-12-27  
**Next Steps:** Fix critical gaps, then proceed to Preset Canonicalization (STEP_3)

