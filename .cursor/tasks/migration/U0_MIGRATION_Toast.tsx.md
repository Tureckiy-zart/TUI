# Migration Task: Toast.tsx Token Compliance

**Component:** `src/components/toasts/Toast.tsx`  
**Priority:** HIGH  
**Violations:** 8 color violations  
**Status:** Pending

---

## Violations Summary

### Color Violations (8)

1. **Line 19:** `border-green-200 bg-green-50 text-green-900` (success variant)
2. **Line 19:** `dark:border-green-800 dark:bg-green-950 dark:text-green-100` (success variant dark)
3. **Line 21:** `border-red-200 bg-red-50 text-red-900` (error variant)
4. **Line 21:** `dark:border-red-800 dark:bg-red-950 dark:text-red-100` (error variant dark)
5. **Line 23:** `border-yellow-200 bg-yellow-50 text-yellow-900` (warning variant)
6. **Line 23:** `dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100` (warning variant dark)
7. **Line 24:** `border-blue-200 bg-blue-50 text-blue-900` (info variant)
8. **Line 24:** `dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100` (info variant dark)
9. **Line 37:** `text-green-600 dark:text-green-400` (success icon)
10. **Line 38:** `text-red-600 dark:text-red-400` (error icon)
11. **Line 39:** `text-yellow-600 dark:text-yellow-400` (warning icon)
12. **Line 40:** `text-blue-600 dark:text-blue-400` (info icon)

---

## Migration Steps

### Step 1: Replace Success Colors

**Before:**

```typescript
success: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
```

**After:**

```typescript
success: "border-success/20 bg-success/10 text-success-foreground",
```

**Token Used:** `--tm-semantic-success`, `--tm-semantic-success-foreground`

### Step 2: Replace Error Colors

**Before:**

```typescript
error: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
```

**After:**

```typescript
error: "border-error/20 bg-error/10 text-error-foreground",
```

**Token Used:** `--tm-semantic-error`, `--tm-semantic-error-foreground`

### Step 3: Replace Warning Colors

**Before:**

```typescript
warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
```

**After:**

```typescript
warning: "border-warning/20 bg-warning/10 text-warning-foreground",
```

**Token Used:** `--tm-semantic-warning`, `--tm-semantic-warning-foreground`

### Step 4: Replace Info Colors

**Before:**

```typescript
info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
```

**After:**

```typescript
info: "border-info/20 bg-info/10 text-info-foreground",
```

**Token Used:** `--tm-semantic-info`, `--tm-semantic-info-foreground`

### Step 5: Replace Icon Colors

**Before:**

```typescript
success: "text-green-600 dark:text-green-400",
error: "text-red-600 dark:text-red-400",
warning: "text-yellow-600 dark:text-yellow-400",
info: "text-blue-600 dark:text-blue-400",
```

**After:**

```typescript
success: "text-success",
error: "text-error",
warning: "text-warning",
info: "text-info",
```

**Token Used:** Semantic color tokens (automatically handle dark mode)

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

- `border-success/20`, `bg-success/10`, `text-success-foreground`
- `border-error/20`, `bg-error/10`, `text-error-foreground`
- `border-warning/20`, `bg-warning/10`, `text-warning-foreground`
- `border-info/20`, `bg-info/10`, `text-info-foreground`
- `text-success`, `text-error`, `text-warning`, `text-info`

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
- [ ] Icons display correct colors
- [ ] Theme switching works correctly
- [ ] Storybook stories updated

---

## Notes

- Remove all `dark:` variants - tokens handle dark mode automatically
- Use opacity modifiers (`/20`, `/10`) for subtle backgrounds and borders
- Semantic tokens automatically adapt to theme changes
