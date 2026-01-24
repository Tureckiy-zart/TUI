# Motion Animations Working Guide

**Date:** 2025-12-19  
**Status:** ✅ **ACTIVE**  
**Purpose:** Internal guide for developers and AI on how motion animations work in this codebase, preventing common pitfalls and ensuring animations work correctly.

---

## Critical Understanding: Transitions vs Animations

**This is the most important distinction:**

| Type | Technology | Status | Examples |
|------|------------|--------|----------|
| **CSS Transitions** | `transition` property | ✅ Always works | `hover:scale-up`, `tap:scale-down` |
| **CSS Animations** | `@keyframes` + `animation` property | ⚠️ Requires special setup | `fade-in`, `scale-in`, `slide-up-in` |

**Why this matters:** Tailwind generates `@keyframes` rules **only** when corresponding `animate-*` classes are detected in the content scan or safelist. Custom utility classes (like `.tm-motion-*`) that reference keyframes by name will **NOT** trigger keyframe generation unless the `animate-*` classes are also present.

---

## How Animations Work in This Codebase

### 1. Token Definition (`src/FOUNDATION/tokens/motion.ts`)

Motion tokens define:
- **Durations**: `motionDurations` (e.g., `normal: "250ms"`)
- **Easings**: `motionEasings` (e.g., `standard: "cubic-bezier(0.4, 0, 0.2, 1)"`)
- **Keyframes**: `motionFade`, `motionScale`, `motionSlide`, etc.
- **CSS Variables**: `motionCSSVariables` (e.g., `--tm-motion-duration-normal`)
- **Tailwind Config**: `motionTailwindConfig` (maps keyframes to Tailwind theme)

**Example:**
```typescript
export const motionScale = {
  in: {
    "0%": { opacity: "0", transform: "scale(0.95)" },
    "100%": { opacity: "1", transform: "scale(1)" },
  },
  out: {
    "0%": { opacity: "1", transform: "scale(1)" },
    "100%": { opacity: "0", transform: "scale(0.95)" },
  },
};
```

### 2. Tailwind Configuration (`tailwind.config.ts`)

**CRITICAL:** Two things must be configured:

#### A. Keyframes in Theme (`extend.keyframes`)

```typescript
keyframes: {
  ...(tailwindMotionConfig.keyframes as Record<string, any>),
  ...(motionTailwindConfig.keyframes as Record<string, any>),
},
```

This makes keyframes available to Tailwind, but **does NOT generate CSS** unless used.

#### B. Animation Utilities in Theme (`extend.animation`)

```typescript
animation: {
  ...tailwindMotionConfig.animation,
  "scale-in": "scale-in 250ms cubic-bezier(0.4, 0, 0.2, 1) both",
  "fade-in": "fade-in 250ms cubic-bezier(0.4, 0, 0.2, 1) both",
  // ... other animations
},
```

**Why `both` is required:** `animation-fill-mode: both` ensures:
- Element starts at `from` state (`opacity: 0`) **before** animation begins
- Element stays at `to` state (`opacity: 1`) **after** animation ends

Without `both`, elements may render in final state immediately, making animations invisible.

#### C. Safelist (`safelist`)

**MANDATORY:** `animate-*` classes must be in safelist:

```typescript
safelist: [
  // ... other classes
  "animate-fade-in",
  "animate-fade-out",
  "animate-scale-in",
  "animate-scale-out",
  "animate-slide-up-in",
  // ... all animation classes
],
```

**Why:** Tailwind only generates `@keyframes` CSS rules when:
1. `animate-*` classes are found in content scan, OR
2. `animate-*` classes are in safelist

**Custom utilities (`.tm-motion-*`) do NOT trigger keyframe generation.**

### 3. Custom Utilities (`src/preset.ts`)

Custom `.tm-motion-*` utilities are added via Tailwind plugin:

```typescript
addUtilities({
  ".tm-motion-scale-in": {
    animation: `scale-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
  },
  // ... other utilities
});
```

**Important:** These utilities reference keyframes by name (`scale-in`), but the keyframes themselves are only generated if `animate-scale-in` is in safelist or content.

### 4. CSS Variables Application (`src/FOUNDATION/theme/applyMode.ts`)

Motion CSS variables are applied synchronously **before** React render:

```typescript
Object.entries(motionCSSVariables).forEach(([key, value]) => {
  root.style.setProperty(key, value);
});
```

This ensures variables like `--tm-motion-duration-normal` are available when components render.

---

## Common Pitfalls and Solutions

### ❌ Problem: Animations don't play on first render

**Symptoms:**
- Transitions work (hover, tap)
- Animations don't play (fade-in, scale-in)
- Elements appear instantly without animation

**Root Causes:**
1. **Missing `animate-*` in safelist** → `@keyframes` not generated
2. **Missing `both` in animation shorthand** → element starts in final state
3. **Keyframe values as numbers instead of strings** → Tailwind parsing fails

**Solution:**
1. Add `animate-*` class to safelist in `tailwind.config.ts`
2. Ensure `animation` shorthand includes `both`:
   ```typescript
   animation: `scale-in var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`
   ```
3. Use string values in keyframes:
   ```typescript
   "0%": { opacity: "0" },  // ✅ String
   "0%": { opacity: 0 },      // ❌ Number (may fail)
   ```

### ❌ Problem: Animations work after remount but not on first render

**Symptoms:**
- Animation plays when component remounts (key change)
- Animation doesn't play on initial mount

**Root Cause:** CSS variables not available when element first renders.

**Solution:** Ensure `initThemeSync()` is called **before** React render (in `preview.tsx` module top-level, not in decorators or hooks).

### ❌ Problem: Keyframes defined but CSS not generated

**Symptoms:**
- Keyframes defined in `motionTailwindConfig.keyframes`
- No `@keyframes` rules in generated CSS
- DevTools shows `animation-name: none`

**Root Cause:** Tailwind didn't detect usage of `animate-*` classes.

**Solution:** Add `animate-*` classes to safelist in `tailwind.config.ts`.

---

## Adding New Animations

### Step-by-Step Checklist

1. **Define keyframes** in `src/FOUNDATION/tokens/motion.ts`:
   ```typescript
   export const motionNewAnimation = {
     in: {
       "0%": { opacity: "0", transform: "translateY(20px)" },
       "100%": { opacity: "1", transform: "translateY(0)" },
     },
   };
   ```

2. **Add to Tailwind config keyframes** in `motionTailwindConfig`:
   ```typescript
   keyframes: {
     // ... existing
     "new-animation": motionNewAnimation.in,
   },
   ```

3. **Add to Tailwind config animation** in `tailwind.config.ts`:
   ```typescript
   animation: {
     // ... existing
     "new-animation": "new-animation 250ms cubic-bezier(0.4, 0, 0.2, 1) both",
   },
   ```

4. **Add to safelist** in `tailwind.config.ts`:
   ```typescript
   safelist: [
     // ... existing
     "animate-new-animation",
   ],
   ```

5. **Add custom utility** in `src/preset.ts` (if needed):
   ```typescript
   ".tm-motion-new-animation": {
     animation: `new-animation var(--tm-motion-duration-normal) var(--tm-motion-easing-standard) both`,
   },
   ```

6. **Add to safelist** (if using custom utility):
   ```typescript
   safelist: [
     // ... existing
     "tm-motion-new-animation",
   ],
   ```

---

## Verification Checklist

Before considering animations "working", verify:

- [ ] `@keyframes` rules exist in generated CSS (check DevTools → Sources → CSS)
- [ ] CSS variables are set on `:root` (check DevTools → Elements → `:root` → Computed)
- [ ] `animation-name` is not `none` (check DevTools → Elements → Computed styles)
- [ ] `animation-duration` is not `0s` (check DevTools → Elements → Computed styles)
- [ ] `animation-fill-mode` is `both` (check DevTools → Elements → Computed styles)
- [ ] Element starts at `from` state before animation (check initial `opacity`/`transform`)
- [ ] Animation plays on first render (not just on remount)

---

## Debugging Tools

### Browser Console Helpers

In Storybook, these helpers are available:

```javascript
// Check motion CSS variables
__checkMotionVars()

// Check if keyframes are present in stylesheets
__checkKeyframes()
```

### DevTools Inspection

1. **Check generated CSS:**
   - DevTools → Sources → CSS files
   - Search for `@keyframes fade-in` (or your animation name)

2. **Check computed styles:**
   - DevTools → Elements → Select element
   - Computed tab → Check `animation-name`, `animation-duration`, `animation-fill-mode`

3. **Check CSS variables:**
   - DevTools → Elements → Select `:root` or `html`
   - Styles tab → Check `--tm-motion-duration-normal`, `--tm-motion-easing-standard`

---

## Key Takeaways

1. **Transitions always work** - they don't require keyframes
2. **Animations require keyframes** - which Tailwind only generates if `animate-*` classes are detected
3. **Safelist is mandatory** - add all `animate-*` classes to safelist
4. **`both` fill-mode is critical** - ensures element starts at `from` state
5. **String values in keyframes** - use `"0"` not `0` for CSS properties
6. **CSS variables must be synchronous** - apply before React render

---

## Related Documents

- [Motion System Authority Contract](../architecture/MOTION_AUTHORITY.md) - Motion system authority contract
- [Token System Overview](./TOKENS_OVERVIEW.md) - Token system overview
- `src/FOUNDATION/tokens/motion.ts` - Motion token definitions
- `tailwind.config.ts` - Tailwind configuration with safelist
- `src/preset.ts` - Custom Tailwind utilities

---

**Last Updated:** 2025-12-19  
**Maintained By:** Development Team  
**For Questions:** Refer to this guide first, then consult architecture documents.

