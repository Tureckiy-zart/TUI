# Migration Task: FilterBar.tsx Token Compliance

**Component:** `src/components/filters/FilterBar.tsx`  
**Priority:** MEDIUM  
**Violations:** 8 spacing violations  
**Status:** Pending

---

## Violations Summary

### Spacing Violations (8)

1. **Line 198:** `space-y-4` → Use: `space-y-md`
2. **Line 200:** `gap-4` → Use: `gap-md`
3. **Line 208:** `gap-2` → Use: `gap-xs`
4. **Line 213:** `gap-1` → Use: `gap-xs`
5. **Line 222:** `gap-4` → Use: `gap-md`
6. **Line 234:** `space-y-2` → Use: `space-y-xs`
7. **Line 271:** `space-y-2` → Use: `space-y-xs`
8. **Line 302:** `p-3` → Use: `p-sm`
9. **Line 303:** `mb-2` → Use: `mb-xs`
10. **Line 304:** `gap-2` → Use: `gap-xs`

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
<div className={cn("space-y-md", className)}>
<div className="flex flex-col gap-md sm:flex-row">
<div className="flex items-center gap-xs">
<div className="flex items-center gap-xs">
<div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
<div className="space-y-xs">
<div className="rounded-lg bg-muted/50 p-sm">
<div className="mb-xs text-sm font-medium">
<div className="flex flex-wrap gap-xs">
```

---

## Related Tokens

### Spacing (from `src/tokens/spacing.ts`)

- `--tm-space-xs` / `space-xs` (0.5rem / 8px)
- `--tm-space-sm` / `space-sm` (0.75rem / 12px)
- `--tm-space-md` / `space-md` (1rem / 16px)

### Tailwind Classes Available

- `space-y-xs`, `space-y-sm`, `space-y-md`
- `gap-xs`, `gap-sm`, `gap-md`
- `p-xs`, `p-sm`, `p-md`
- `mb-xs`, `mb-sm`, `mb-md`

---

## Testing Checklist

- [ ] All spacing values use tokens
- [ ] Layout spacing is consistent
- [ ] Responsive breakpoints work correctly
- [ ] Theme switching works correctly
- [ ] Storybook stories updated

---

## Notes

- Replace `space-y-*` with `space-y-*` (using semantic tokens: `xs`, `sm`, `md`, etc.)
- Replace `gap-*` with `gap-*` (using semantic tokens: `xs`, `sm`, `md`, etc.)
- Replace `p-*` with `p-*` (using semantic tokens: `xs`, `sm`, `md`, etc.)
- Replace `mb-*` with `mb-*` (using semantic tokens: `xs`, `sm`, `md`, etc.)
- Use semantic spacing tokens for consistent layout rhythm
