# Migration Task: EventCard.tsx Token Compliance

**Component:** `src/components/cards/EventCard.tsx`  
**Priority:** HIGH  
**Violations:** 5 color violations + 13 spacing violations + 3 shadow violations + 2 animation violations  
**Status:** Pending

---

## Violations Summary

### Color Violations (5)

1. **Line 80:** `bg-gradient-to-r from-orange-500 to-purple-600` (trending badge)
2. **Line 87:** `from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800` (image placeholder gradient)
3. **Line 97:** `text-gray-400 dark:text-gray-600` (placeholder icon)
4. **Line 132:** `text-gray-500` (metadata text)
5. **Line 145:** `text-gray-500` (metadata text)
6. **Line 165:** `border-gray-200 dark:border-gray-700` (divider border)
7. **Line 169:** `from-orange-500 to-purple-600` (button gradient)
8. **Line 169:** `hover:from-orange-600 hover:to-purple-700` (button gradient hover)
9. **Line 188:** `from-orange-500 to-purple-600` (price gradient)

### Spacing Violations (13)

1. **Line 79:** `right-3 top-3` → Use: `right-space-sm top-space-sm`
2. **Line 80:** `px-2.5 py-0.5` → Use: `px-space-xs py-space-xs`
3. **Line 115:** `p-4` → Use: `p-space-md`
4. **Line 118:** `mb-2` → Use: `mb-space-xs`
5. **Line 128:** `mb-3` → Use: `mb-space-sm`
6. **Line 131:** `mb-3 gap-2` → Use: `mb-space-sm gap-space-xs`
7. **Line 132:** `gap-2` → Use: `gap-space-xs`
8. **Line 145:** `gap-2` → Use: `gap-space-xs`
9. **Line 165:** `pt-3` → Use: `pt-space-sm`
10. **Line 169:** `px-4 py-2` → Use: `px-space-md py-space-xs`
11. **Line 174:** `ml-2` → Use: `ml-space-xs`

### Shadow Violations (3)

1. **Line 73:** `shadow-md` → Use: `shadow-elevation-md`
2. **Line 73:** `hover:shadow-xl` → Use: `hover:shadow-elevation-xl`
3. **Line 80:** `shadow-lg` → Use: `shadow-elevation-lg`
4. **Line 169:** `shadow-md` → Use: `shadow-elevation-md`
5. **Line 169:** `hover:shadow-lg` → Use: `hover:shadow-elevation-lg`

### Animation Violations (2)

1. **Line 73:** `duration-300` → Use: `duration-normal`
2. **Line 92:** `duration-500` → Use: `duration-slow`
3. **Line 111:** `duration-300` → Use: `duration-normal`
4. **Line 169:** `duration-300` → Use: `duration-normal`

---

## Migration Steps

### Step 1: Replace Color Violations

**Before (Line 80):**

```typescript
<span className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-500 to-purple-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-lg">
```

**After:**

```typescript
<span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-500 to-primary-600 px-space-xs py-space-xs text-xs font-semibold text-white shadow-elevation-lg">
```

**Before (Line 87):**

```typescript
<div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
```

**After:**

```typescript
<div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-surface-elevated1 to-surface-elevated2">
```

**Before (Line 97, 132, 145):**

```typescript
className = "h-16 w-16 text-gray-400 dark:text-gray-600";
className = "flex items-center gap-2 text-xs text-gray-500";
```

**After:**

```typescript
className = "h-16 w-16 text-muted-foreground";
className = "flex items-center gap-space-xs text-xs text-muted-foreground";
```

**Before (Line 165):**

```typescript
<div className="border-t border-gray-200 pt-3 dark:border-gray-700">
```

**After:**

```typescript
<div className="border-t border-border pt-space-sm">
```

**Before (Line 169):**

```typescript
className =
  "inline-flex w-full transform items-center justify-center bg-gradient-to-r from-orange-500 to-purple-600 px-4 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-purple-700 hover:shadow-lg";
```

**After:**

```typescript
className =
  "inline-flex w-full transform items-center justify-center bg-gradient-to-r from-accent-500 to-primary-600 px-space-md py-space-xs font-semibold text-white shadow-elevation-md transition-all duration-normal hover:scale-105 hover:from-accent-600 hover:to-primary-700 hover:shadow-elevation-lg";
```

**Before (Line 188):**

```typescript
className = "bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent";
```

**After:**

```typescript
className = "bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent";
```

### Step 2: Replace Spacing Violations

Replace all hardcoded spacing values with spacing tokens:

- `right-3 top-3` → `right-space-sm top-space-sm`
- `px-2.5 py-0.5` → `px-space-xs py-space-xs`
- `p-4` → `p-space-md`
- `mb-2` → `mb-space-xs`
- `mb-3` → `mb-space-sm`
- `gap-2` → `gap-space-xs`
- `pt-3` → `pt-space-sm`
- `px-4 py-2` → `px-space-md py-space-xs`
- `ml-2` → `ml-space-xs`

### Step 3: Replace Shadow Violations

Replace all hardcoded shadow values with elevation tokens:

- `shadow-md` → `shadow-elevation-md`
- `shadow-lg` → `shadow-elevation-lg`
- `hover:shadow-xl` → `hover:shadow-elevation-xl`

### Step 4: Replace Animation Violations

Replace all hardcoded duration values with motion tokens:

- `duration-300` → `duration-normal`
- `duration-500` → `duration-slow`

---

## Related Tokens

### Colors

- `--tm-accent-500`, `--tm-accent-600` (accent colors)
- `--tm-primary-600`, `--tm-primary-700` (primary colors)
- `--tm-surface-elevated1`, `--tm-surface-elevated2` (surface colors)
- `--tm-text-muted-foreground` (muted text)
- `--tm-border` (border color)

### Spacing

- `--tm-space-xs` (0.5rem / 8px)
- `--tm-space-sm` (0.75rem / 12px)
- `--tm-space-md` (1rem / 16px)

### Shadows

- `--tm-shadow-elevation-md`
- `--tm-shadow-elevation-lg`
- `--tm-shadow-elevation-xl`

### Motion

- `--tm-duration-normal` (300ms)
- `--tm-duration-slow` (500ms)

---

## Testing Checklist

- [ ] Trending badge displays correct gradient colors
- [ ] Image placeholder uses correct surface colors
- [ ] Metadata text uses correct muted colors
- [ ] Divider border uses correct border color
- [ ] Button gradient uses correct accent/primary colors
- [ ] All spacing values use tokens
- [ ] All shadows use elevation tokens
- [ ] All animations use motion tokens
- [ ] Theme switching works correctly
- [ ] Storybook stories updated

---

## Notes

- Replace `orange-*` with `accent-*` tokens
- Replace `purple-*` with `primary-*` tokens
- Replace `gray-*` with `surface-*` or `muted-*` tokens
- Remove all `dark:` variants - tokens handle dark mode automatically
- Use spacing tokens for all padding/margin values
- Use elevation tokens for all shadows
- Use motion tokens for all durations
