# Migration Task: FilterBar.tsx Token Compliance

**Component:** `src/components/filters/FilterBar.tsx`  
**Priority:** MEDIUM  
**Violations:** 8 spacing violations  
**Status:** Pending

---

## Violations Summary

### Spacing Violations (8)

1. **Line 198:** `space-y-4` → Use: `space-y-space-md`
2. **Line 200:** `gap-4` → Use: `gap-space-md`
3. **Line 208:** `gap-2` → Use: `gap-space-xs`
4. **Line 213:** `gap-1` → Use: `gap-space-xs`
5. **Line 222:** `gap-4` → Use: `gap-space-md`
6. **Line 234:** `space-y-2` → Use: `space-y-space-xs`
7. **Line 271:** `space-y-2` → Use: `space-y-space-xs`
8. **Line 302:** `p-3` → Use: `p-space-sm`
9. **Line 303:** `mb-2` → Use: `mb-space-xs`
10. **Line 304:** `gap-2` → Use: `gap-space-xs`

---

## Migration Steps

### Step 1: Replace Spacing Values

Replace all hardcoded spacing values with spacing tokens:

**Before:**

```typescript
<div className={cn("space-y-4", className)}>
<div className="flex flex-col gap-4 sm:flex-row">
<div className="flex items-center gap-2">
<div className="flex items-center gap-1">
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
<div className="space-y-2">
<div className="rounded-lg bg-muted/50 p-3">
<div className="mb-2 text-sm font-medium">
<div className="flex flex-wrap gap-2">
```

**After:**

```typescript
<div className={cn("space-y-space-md", className)}>
<div className="flex flex-col gap-space-md sm:flex-row">
<div className="flex items-center gap-space-xs">
<div className="flex items-center gap-space-xs">
<div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
<div className="space-y-space-xs">
<div className="rounded-lg bg-muted/50 p-space-sm">
<div className="mb-space-xs text-sm font-medium">
<div className="flex flex-wrap gap-space-xs">
```

---

## Related Tokens

### Spacing (from `src/tokens/spacing.ts`)

- `--tm-space-xs` / `space-xs` (0.5rem / 8px)
- `--tm-space-sm` / `space-sm` (0.75rem / 12px)
- `--tm-space-md` / `space-md` (1rem / 16px)

### Tailwind Classes Available

- `space-y-space-xs`, `space-y-space-sm`, `space-y-space-md`
- `gap-space-xs`, `gap-space-sm`, `gap-space-md`
- `p-space-xs`, `p-space-sm`, `p-space-md`
- `mb-space-xs`, `mb-space-sm`, `mb-space-md`

---

## Testing Checklist

- [ ] All spacing values use tokens
- [ ] Layout spacing is consistent
- [ ] Responsive breakpoints work correctly
- [ ] Theme switching works correctly
- [ ] Storybook stories updated

---

## Notes

- Replace `space-y-*` with `space-y-space-*`
- Replace `gap-*` with `gap-space-*`
- Replace `p-*` with `p-space-*`
- Replace `mb-*` with `mb-space-*`
- Use semantic spacing tokens for consistent layout rhythm
