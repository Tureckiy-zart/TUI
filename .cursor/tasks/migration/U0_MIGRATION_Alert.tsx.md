# Migration Task: Alert.tsx Token Compliance

**Component:** `src/components/feedback/Alert.tsx`  
**Priority:** HIGH  
**Violations:** 4 color violations  
**Status:** Pending

---

## Violations Summary

### Color Violations (4)

1. **Line 20:** `bg-green-50 border-green-200 text-green-800` (success variant)
2. **Line 21:** `bg-red-50 border-red-200 text-red-800` (error variant)
3. **Line 22:** `bg-yellow-50 border-yellow-200 text-yellow-800` (warning variant)
4. **Line 23:** `bg-blue-50 border-blue-200 text-blue-800` (info variant)

---

## Migration Steps

### Step 1: Replace variantClasses Object

**Before:**

```typescript
const variantClasses = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};
```

**After:**

```typescript
const variantClasses = {
  success: "bg-success/10 border-success/20 text-success-foreground",
  error: "bg-error/10 border-error/20 text-error-foreground",
  warning: "bg-warning/10 border-warning/20 text-warning-foreground",
  info: "bg-info/10 border-info/20 text-info-foreground",
};
```

**Token Used:** Semantic color tokens with opacity modifiers

---

## Related Tokens

### Semantic Colors (from `src/tokens/colors.ts`)

- `--tm-semantic-success` / `success` token
- `--tm-semantic-success-foreground` / `success-foreground` token
- `--tm-semantic-error` / `error` token
- `--tm-semantic-error-foreground` / `error-foreground` token
- `--tm-semantic-warning` / `warning` token
- `--tm-semantic-warning-foreground` / `warning-foreground` token
- `--tm-semantic-info` / `info` token
- `--tm-semantic-info-foreground` / `info-foreground` token

### Tailwind Classes Available

- `bg-success/10`, `border-success/20`, `text-success-foreground`
- `bg-error/10`, `border-error/20`, `text-error-foreground`
- `bg-warning/10`, `border-warning/20`, `text-warning-foreground`
- `bg-info/10`, `border-info/20`, `text-info-foreground`

---

## Testing Checklist

- [ ] Success variant renders correctly in day mode
- [ ] Success variant renders correctly in night mode
- [ ] Error variant renders correctly in day mode
- [ ] Error variant renders correctly in night mode
- [ ] Warning variant renders correctly in day mode
- [ ] Warning variant renders correctly in night mode
- [ ] Info variant renders correctly in day mode
- [ ] Info variant renders correctly in night mode
- [ ] Theme switching works correctly
- [ ] Storybook stories updated

---

## Notes

- Use opacity modifiers (`/10` for backgrounds, `/20` for borders) for subtle styling
- Semantic tokens automatically adapt to theme changes
- No dark mode variants needed - tokens handle this automatically
