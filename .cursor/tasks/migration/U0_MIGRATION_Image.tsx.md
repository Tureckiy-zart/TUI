# Migration Task: Image.tsx Token Compliance

**Component:** `src/components/image/Image.tsx`  
**Priority:** MEDIUM  
**Violations:** 8 radius violations + 6 shadow violations  
**Status:** Pending

---

## Violations Summary

### Border Radius Violations (8)

1. **Lines 12-19:** All `rounded-*` variants should use radius tokens
   - `rounded-none` → `rounded-radius-none`
   - `rounded-sm` → `rounded-radius-sm`
   - `rounded-md` → `rounded-radius-md`
   - `rounded-lg` → `rounded-radius-lg`
   - `rounded-xl` → `rounded-radius-xl`
   - `rounded-2xl` → `rounded-radius-2xl`
   - `rounded-3xl` → `rounded-radius-3xl`
   - `rounded-full` → `rounded-radius-full`

### Shadow Violations (6)

1. **Lines 24-30:** All `shadow-*` variants should use shadow tokens
   - `shadow-none` → `shadow-elevation-none`
   - `shadow-sm` → `shadow-elevation-sm`
   - `shadow-md` → `shadow-elevation-md`
   - `shadow-lg` → `shadow-elevation-lg`
   - `shadow-xl` → `shadow-elevation-xl`
   - `shadow-2xl` → `shadow-elevation-2xl`

---

## Migration Steps

### Step 1: Replace Radius Variants

**Before:**

```typescript
const radiusVariants = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};
```

**After:**

```typescript
const radiusVariants = {
  none: "rounded-radius-none",
  sm: "rounded-radius-sm",
  md: "rounded-radius-md",
  lg: "rounded-radius-lg",
  xl: "rounded-radius-xl",
  "2xl": "rounded-radius-2xl",
  "3xl": "rounded-radius-3xl",
  full: "rounded-radius-full",
};
```

### Step 2: Replace Shadow Variants

**Before:**

```typescript
const shadowVariants = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};
```

**After:**

```typescript
const shadowVariants = {
  none: "shadow-elevation-none",
  sm: "shadow-elevation-sm",
  md: "shadow-elevation-md",
  lg: "shadow-elevation-lg",
  xl: "shadow-elevation-xl",
  "2xl": "shadow-elevation-2xl",
};
```

---

## Related Tokens

### Border Radius (from `src/tokens/radius.ts`)

- `--tm-radius-none` / `radius-none`
- `--tm-radius-sm` / `radius-sm`
- `--tm-radius-md` / `radius-md`
- `--tm-radius-lg` / `radius-lg`
- `--tm-radius-xl` / `radius-xl`
- `--tm-radius-2xl` / `radius-2xl`
- `--tm-radius-3xl` / `radius-3xl`
- `--tm-radius-full` / `radius-full`

### Shadows (from `src/tokens/shadows.ts`)

- `--tm-shadow-elevation-none` / `shadow-elevation-none`
- `--tm-shadow-elevation-sm` / `shadow-elevation-sm`
- `--tm-shadow-elevation-md` / `shadow-elevation-md`
- `--tm-shadow-elevation-lg` / `shadow-elevation-lg`
- `--tm-shadow-elevation-xl` / `shadow-elevation-xl`
- `--tm-shadow-elevation-2xl` / `shadow-elevation-2xl`

---

## Testing Checklist

- [ ] All radius variants render correctly
- [ ] All shadow variants render correctly
- [ ] Theme switching works correctly
- [ ] Storybook stories updated
- [ ] All variants accessible via props

---

## Notes

- This component defines variant objects that are used throughout the codebase
- Ensure all variants use token-based classes
- Test all combinations of radius and shadow variants
