# Migration Task: Popover.tsx Token Compliance

**Component:** `src/components/overlays/Popover.tsx`  
**Priority:** HIGH  
**Violations:** 3 color violations  
**Status:** Pending

---

## Violations Summary

### Color Violations (3)

1. **Line 20:** `border-yellow-500/50 text-yellow-700 bg-yellow-50` (warning variant)
2. **Line 21:** `border-green-500/50 text-green-700 bg-green-50` (success variant)
3. **Line 22:** `border-blue-500/50 text-blue-700 bg-blue-50` (info variant)

---

## Migration Steps

### Step 1: Replace variantClasses Object

**Before:**

```typescript
warning: "border-yellow-500/50 text-yellow-700 bg-yellow-50",
success: "border-green-500/50 text-green-700 bg-green-50",
info: "border-blue-500/50 text-blue-700 bg-blue-50",
```

**After:**

```typescript
warning: "border-warning/50 text-warning-foreground bg-warning/10",
success: "border-success/50 text-success-foreground bg-success/10",
info: "border-info/50 text-info-foreground bg-info/10",
```

**Token Used:** Semantic color tokens with opacity modifiers

---

## Related Tokens

### Semantic Colors

- `--tm-semantic-warning` / `warning` token
- `--tm-semantic-warning-foreground` / `warning-foreground` token
- `--tm-semantic-success` / `success` token
- `--tm-semantic-success-foreground` / `success-foreground` token
- `--tm-semantic-info` / `info` token
- `--tm-semantic-info-foreground` / `info-foreground` token

---

## Testing Checklist

- [ ] Warning variant renders correctly
- [ ] Success variant renders correctly
- [ ] Info variant renders correctly
- [ ] Theme switching works correctly
- [ ] Storybook stories updated

---

## Notes

- Use opacity modifiers (`/50` for borders, `/10` for backgrounds)
- Semantic tokens automatically adapt to theme changes
