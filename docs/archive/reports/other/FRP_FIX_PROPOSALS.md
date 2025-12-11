# Full Review Pipeline - Fix Proposals Report

**Date:** 2025-01-20  
**Branch:** audit/full-review-pipeline  
**Purpose:** Generate structured fix proposals with exact code patches based on all audit reports

---

## Executive Summary

This report consolidates all issues found in the Full Review Pipeline and provides structured fix proposals with exact code patches. Issues are organized by severity and include file paths, current code, proposed changes, and implementation steps.

**Total Issues:** 67  
**Critical Issues:** 8  
**High Priority Issues:** 16  
**Medium Priority Issues:** 35  
**Low Priority Issues:** 8

---

## 1. Critical Issues - Fix Proposals

### 1.1 SearchInput.tsx - Missing dependency in useEffect

**File:** `src/components/filters/SearchInput.tsx`  
**Line:** 49-51  
**Severity:** Critical  
**Issue:** useEffect includes `onChange` in dependencies, causing potential stale closures

**Current Code:**

```typescript
React.useEffect(() => {
  onChange(debouncedValue);
}, [debouncedValue, onChange]);
```

**Proposed Fix:**

```typescript
const onChangeRef = React.useRef(onChange);
React.useEffect(() => {
  onChangeRef.current = onChange;
}, [onChange]);

React.useEffect(() => {
  onChangeRef.current(debouncedValue);
}, [debouncedValue]);
```

**Alternative Fix (if onChange is stable):**

```typescript
React.useEffect(() => {
  onChange(debouncedValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [debouncedValue]);
```

**Recommendation:** Use ref pattern to avoid stale closures while keeping dependency array correct.

---

### 1.2 FilterBar.tsx - Excessive prop validation

**File:** `src/components/filters/FilterBar.tsx`  
**Lines:** 90-158  
**Severity:** Critical  
**Issue:** 20+ runtime error throws for prop validation

**Current Code:**

```typescript
if (!sortOptions || sortOptions.length === 0) {
  throw new Error('FilterBar: "sortOptions" prop is required and cannot be empty');
}
// ... 19 more similar checks
```

**Proposed Fix:**

```typescript
// Remove all runtime validations, use TypeScript instead
// Add default values where possible
export function FilterBar({
  className,
  showSearch = true,
  showCategory = true,
  showDateRange = true,
  showPriceRange = true,
  showSorting = true,
  categories = [],
  sortOptions, // Required by TypeScript
  searchPlaceholder = "Search...", // Default value
  filtersLabel = "Filters", // Default value
  clearAllLabel = "Clear all", // Default value
  // ... provide defaults for all labels
  onFiltersChange,
}: FilterBarProps) {
  // Remove all validation throws
  // TypeScript will enforce required props
}
```

**Additional Fix:** Update TypeScript interface to mark truly required props:

```typescript
export interface FilterBarProps {
  // ... other props
  sortOptions: Array<{ value: string; label: string }>; // Required
  searchPlaceholder?: string; // Optional with default
  // ... make most labels optional with defaults
}
```

---

### 1.3 useToast.ts - Potential memory leak

**File:** `src/hooks/useToast.ts`  
**Lines:** 43-46  
**Severity:** Critical  
**Issue:** setTimeout callback captures stale dismiss function

**Current Code:**

```typescript
if (newToast.duration && newToast.duration > 0) {
  setTimeout(() => {
    dismiss(id);
  }, newToast.duration);
}
```

**Proposed Fix:**

```typescript
const dismissRef = React.useRef(dismiss);
React.useEffect(() => {
  dismissRef.current = dismiss;
}, [dismiss]);

// In toast function:
if (newToast.duration && newToast.duration > 0) {
  setTimeout(() => {
    dismissRef.current(id);
  }, newToast.duration);
}
```

---

### 1.4 Duplicate toast hook implementations

**Files:**

- `src/hooks/useToast.ts`
- `src/hooks/use-toast.ts`

**Severity:** Critical  
**Issue:** Two different toast hook implementations exist

**Proposed Fix:**

**Option 1: Keep shadcn/ui implementation (recommended)**

1. Remove `src/hooks/useToast.ts`
2. Update all imports from `useToast` to `use-toast`
3. Update component implementations if needed

**Option 2: Keep custom implementation**

1. Remove `src/hooks/use-toast.ts`
2. Ensure `useToast.ts` is exported in `index.ts`
3. Update all imports

**Recommendation:** Choose Option 1 (shadcn/ui) for consistency with the rest of the library.

---

## 2. High Priority Issues - Fix Proposals

### 2.1 LanguageSelector.tsx - Potential stale closure

**File:** `src/components/controls/LanguageSelector.tsx`  
**Lines:** 58-62  
**Severity:** High

**Current Code:**

```typescript
useEffect(() => {
  if (value !== undefined && value !== internalValue) {
    setInternalValue(value);
  }
}, [value, internalValue]);
```

**Proposed Fix:**

```typescript
const prevValueRef = React.useRef(value);
useEffect(() => {
  if (value !== undefined && value !== prevValueRef.current) {
    setInternalValue(value);
    prevValueRef.current = value;
  }
}, [value]);
```

---

### 2.2 FilterBar.tsx - Missing dependency warning

**File:** `src/components/filters/FilterBar.tsx`  
**Lines:** 176-187  
**Severity:** High

**Current Code:**

```typescript
React.useEffect(() => {
  if (onFiltersChange) {
    onFiltersChange({
      search,
      category,
      dateRange,
      priceRange,
      sortBy,
      sortOrder,
    });
  }
}, [search, category, dateRange, priceRange, sortBy, sortOrder, onFiltersChange]);
```

**Proposed Fix:**

```typescript
const onFiltersChangeRef = React.useRef(onFiltersChange);
React.useEffect(() => {
  onFiltersChangeRef.current = onFiltersChange;
}, [onFiltersChange]);

React.useEffect(() => {
  if (onFiltersChangeRef.current) {
    onFiltersChangeRef.current({
      search,
      category,
      dateRange,
      priceRange,
      sortBy,
      sortOrder,
    });
  }
}, [search, category, dateRange, priceRange, sortBy, sortOrder]);
```

**Documentation:** Add JSDoc comment explaining that `onFiltersChange` should be memoized with `useCallback` in parent component.

---

### 2.3 Alert.tsx - Missing role attribute

**File:** `src/components/feedback/Alert.tsx`  
**Line:** 27  
**Severity:** High

**Current Code:**

```typescript
<div className={cn("rounded-lg border p-4", variantClasses[variant], className)}>
```

**Proposed Fix:**

```typescript
<div
  role="alert"
  className={cn("rounded-lg border p-md", variantClasses[variant], className)}
>
```

**Changes:**

1. Add `role="alert"` for screen readers
2. Replace `p-4` with `p-md` (token-based spacing)

---

### 2.4 Alert.tsx - Missing HTML attributes pass-through

**File:** `src/components/feedback/Alert.tsx`  
**Severity:** High

**Current Code:**

```typescript
interface AlertProps {
  variant?: "success" | "error" | "warning" | "info";
  title?: string;
  description?: string;
  className?: string;
}
```

**Proposed Fix:**

```typescript
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "error" | "warning" | "info";
  title?: string;
  description?: string;
}
```

---

### 2.5 Progress.tsx - Missing HTML attributes pass-through

**File:** `src/components/feedback/Progress.tsx`  
**Severity:** High

**Current Code:**

```typescript
interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}
```

**Proposed Fix:**

```typescript
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
}
```

---

### 2.6 Typography components - Missing HTML attributes pass-through

**File:** `src/components/primitives/Typography.tsx`  
**Severity:** High

**Current Code:**

```typescript
interface HeadingProps extends TypographyProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}
```

**Proposed Fix:**

```typescript
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
}

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "default" | "muted" | "primary" | "destructive";
  className?: string;
  children: React.ReactNode;
}
```

---

### 2.7 FilterSelect - Change handler naming

**File:** `src/components/filters/FilterSelect.tsx`  
**Severity:** High

**Current Code:**

```typescript
export interface FilterSelectProps {
  onValueChange: (value: string) => void;
  // ...
}
```

**Proposed Fix:**

```typescript
export interface FilterSelectProps {
  onChange: (value: string) => void;
  /** @deprecated Use onChange instead */
  onValueChange?: (value: string) => void;
  // ...
}

export function FilterSelect({
  onChange,
  onValueChange, // Support deprecated prop
  // ...
}: FilterSelectProps) {
  const handleChange = onChange || onValueChange;
  // Use handleChange in component
}
```

**Note:** This is a breaking change. Provide deprecation path.

---

### 2.8 LanguageSelector - Change handler naming

**File:** `src/components/controls/LanguageSelector.tsx`  
**Severity:** High

**Current Code:**

```typescript
interface LanguageSelectorProps {
  onLanguageChange?: (language: string) => void;
  // ...
}
```

**Proposed Fix:**

```typescript
interface LanguageSelectorProps {
  onChange?: (language: string) => void;
  /** @deprecated Use onChange instead */
  onLanguageChange?: (language: string) => void;
  // ...
}
```

---

## 3. Medium Priority Issues - Fix Proposals

### 3.1 Button.tsx - Replace old shadow classes

**File:** `src/components/ui/button.tsx`  
**Lines:** 12-16  
**Severity:** Medium

**Current Code:**

```typescript
variant: {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
  outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
}
```

**Proposed Fix:**

```typescript
variant: {
  default: "bg-primary text-primary-foreground shadow-elevation-xs hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground shadow-elevation-xs hover:bg-destructive/90",
  outline: "border border-input bg-background shadow-elevation-xs hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground shadow-elevation-xs hover:bg-secondary/80",
}
```

**Note:** Verify Tailwind config maps `shadow-elevation-*` classes first.

---

### 3.2 Modal.tsx - Replace old shadow classes

**File:** `src/components/modals/Modal.tsx`  
**Line:** 39  
**Severity:** Medium

**Current Code:**

```typescript
className={cn(
  "... shadow-lg duration-200 ...",
  className,
)}
```

**Proposed Fix:**

```typescript
className={cn(
  "... shadow-elevation-xl duration-200 ...",
  className,
)}
```

---

### 3.3 LanguageSelector.tsx - Remove unnecessary useMemo

**File:** `src/components/controls/LanguageSelector.tsx`  
**Line:** 43  
**Severity:** Medium

**Current Code:**

```typescript
const options = useMemo(() => languages, [languages]);
```

**Proposed Fix:**

```typescript
// Remove useMemo, use languages directly
// useMemo is only beneficial for expensive computations
```

---

### 3.4 EventCard.tsx - Optimize with useMemo

**File:** `src/components/cards/EventCard.tsx`  
**Lines:** 40-66  
**Severity:** Medium

**Current Code:**

```typescript
const title =
  typeof event?.name === "string"
    ? event.name
    : event?.name?.en || event?.name?.es || event?.name?.ru || "";
// ... similar for description, venue, price
```

**Proposed Fix:**

```typescript
const title = React.useMemo(() => {
  return typeof event?.name === "string"
    ? event.name
    : event?.name?.en || event?.name?.es || event?.name?.ru || "";
}, [event?.name]);

const description = React.useMemo(() => {
  return typeof event?.description === "string"
    ? event.description
    : event?.description?.en || event?.description?.es || event?.description?.ru || "";
}, [event?.description]);

// ... similar for venue and price
```

---

### 3.5 ThemeSwitch.tsx - Extract logic to hook

**File:** `src/components/primitives/ThemeSwitch.tsx`  
**Lines:** 33-114  
**Severity:** Medium

**Proposed Fix:** Create `src/hooks/useThemeMode.ts`:

```typescript
export function useThemeMode() {
  const [mode, setMode] = React.useState<Mode>(() => getInitialMode());

  React.useEffect(() => {
    const resolvedMode = getInitialMode();
    setMode(resolvedMode);
    persistMode(resolvedMode);
  }, []);

  const toggleMode = React.useCallback(() => {
    setMode((current) => {
      const nextMode: Mode = current === "night" ? "day" : "night";
      persistMode(nextMode);
      return nextMode;
    });
  }, []);

  return { mode, toggleMode };
}
```

Then update ThemeSwitch to use the hook.

---

### 3.6 Import organization - Standardize grouping

**Files:** All component files  
**Severity:** Medium

**Proposed Fix:** Create ESLint rule configuration:

```json
{
  "plugins": ["simple-import-sort"],
  "rules": {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  }
}
```

**Import order:**

1. React imports
2. Third-party imports (lucide-react, @radix-ui, etc.)
3. Internal absolute imports (@/components, @/lib, etc.)
4. Relative imports (./, ../)
5. Type imports (import type)

---

### 3.7 Console.log statements - Wrap in development check

**File:** `src/components/primitives/ThemeSwitch.tsx`  
**Line:** 45  
**Severity:** Medium

**Current Code:**

```typescript
console.log("[theme-switch]", context, snapshot);
```

**Proposed Fix:**

```typescript
if (process.env.NODE_ENV === "development") {
  console.log("[theme-switch]", context, snapshot);
}
```

---

## 4. Low Priority Issues - Fix Proposals

### 4.1 Add React.memo to frequently rendered components

**Files:**

- `src/components/feedback/Alert.tsx`
- `src/components/primitives/Badge.tsx`
- `src/components/cards/EventCard.tsx`
- `src/components/cards/VenueCard.tsx`

**Proposed Fix:**

```typescript
export const Alert = React.memo<AlertProps>(
  ({ variant = "info", title, description, className }) => {
    // ... component code
  },
);

Alert.displayName = "Alert";
```

---

### 4.2 Add JSDoc comments

**Files:** All public components  
**Severity:** Low

**Proposed Fix Template:**

````typescript
/**
 * Alert component for displaying feedback messages
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Success" description="Operation completed" />
 * ```
 */
export const Alert: React.FC<AlertProps> = ...
````

---

## 5. Implementation Priority

### Phase 1: Critical Issues (Week 1)

1. Fix SearchInput useEffect dependency
2. Refactor FilterBar prop validation
3. Fix useToast memory leak
4. Resolve duplicate toast hooks

### Phase 2: High Priority Issues (Week 2)

1. Fix LanguageSelector stale closure
2. Add HTML attributes pass-through (Alert, Progress, Typography)
3. Standardize change handler naming (with deprecation)
4. Add role="alert" to Alert

### Phase 3: Medium Priority Issues (Week 3-4)

1. Replace old shadow classes with elevation tokens
2. Optimize EventCard with useMemo
3. Extract ThemeSwitch logic to hook
4. Standardize import organization
5. Wrap console.log in development checks

### Phase 4: Low Priority Issues (Week 5+)

1. Add React.memo to components
2. Add JSDoc comments
3. Add test files
4. Improve documentation

---

## 6. Breaking Changes

### Breaking Changes Identified

1. **FilterSelect.onValueChange → onChange** (with deprecation)
2. **LanguageSelector.onLanguageChange → onChange** (with deprecation)
3. **Removal of useToast.ts** (if choosing shadcn/ui implementation)

### Migration Guide Needed

- Document prop name changes
- Provide codemod scripts if possible
- Update all internal usages first

---

## 7. Testing Recommendations

### Tests to Add

1. Unit tests for all hooks (useDebounce, useModal, useToast)
2. Component tests for Alert, Progress, Typography
3. Integration tests for FilterBar
4. Snapshot tests for components with React.memo

---

**Report Generated:** 2025-01-20  
**Next Steps:** Proceed with Final Report (FULL_REVIEW_PIPELINE_REPORT.md)
