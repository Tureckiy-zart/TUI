# Migration Task: ConsentBanner.tsx Token Compliance

**Component:** `src/components/feedback/ConsentBanner.tsx`  
**Priority:** HIGH  
**Violations:** 1 color violation  
**Status:** Pending

---

## Violations Summary

### Color Violations (1)

1. **Line 28:** `bg-blue-500` → Use: `bg-primary` or `bg-info`

---

## Migration Steps

### Step 1: Replace Background Color

**Before:**

```typescript
<div className={cn("rounded-lg bg-blue-500 p-4 text-white", className)}>
```

**After:**

```typescript
<div className={cn("rounded-lg bg-primary p-space-md text-primary-foreground", className)}>
```

**Token Used:** `--tm-primary` / `primary` token

---

## Related Tokens

### Colors

- `--tm-primary` / `primary` token
- `--tm-primary-foreground` / `primary-foreground` token

### Spacing

- `--tm-space-md` / `space-md` token (for `p-4`)

### Radius

- `--tm-radius-lg` / `radius-lg` token (for `rounded-lg`)

---

## Testing Checklist

- [ ] Banner displays correct primary color
- [ ] Text color is readable (primary-foreground)
- [ ] Theme switching works correctly
- [ ] Storybook stories updated

---

## Notes

- Use `bg-primary` for primary actions/banners
- Use `bg-info` if this is informational content
- Remove hardcoded `text-white` - use `text-primary-foreground` for proper contrast
