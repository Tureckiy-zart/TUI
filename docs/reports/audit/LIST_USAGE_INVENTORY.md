# List Usage Inventory Report

**Date:** 2026-01-01  
**Task:** TUNG_LIST_STRICT_USAGE_ENFORCEMENT  
**Purpose:** Complete audit of list rendering patterns in codebase to identify all places where vertical lists are rendered without using canonical List/ListItem components.

## Executive Summary

This report documents all findings of list-like rendering patterns across `src/DOMAIN`, `src/COMPOSITION`, and `src/PATTERNS` directories. The goal is to identify all vertical lists that should be migrated to canonical `List` and `ListItem` components.

## Scan Methodology

**Scanned directories:**
- `src/DOMAIN`
- `src/COMPOSITION`
- `src/PATTERNS`

**Patterns searched:**
- `array.map(() => <div`
- `array.map(() => <Box`
- `array.map(() => <Stack`
- `array.map(() => <li`
- Direct `<li>` usage outside ListItem
- `Stack` with `direction="vertical"` used for lists
- Components with names `*Item.tsx`, `*Row.tsx`, `*Entry.tsx`

## Findings

### 1. NotificationCenterList

**File:** `src/DOMAIN/notifications/NotificationCenter.List.tsx`  
**Lines:** 32-48  
**Pattern:** Uses `Stack` directly instead of canonical `List`  
**Context:** Vertical list container for notifications

```tsx
export const NotificationCenterList = React.forwardRef<
  HTMLUListElement,
  NotificationCenterListProps
>(({ children, className, "aria-label": ariaLabel, ...props }, ref) => {
  return (
    <Stack
      ref={ref as any}
      as="ul"
      role="list"
      aria-label={ariaLabel || "Notifications"}
      className={cn("list-none", NOTIFICATION_TOKENS.spacing.gap, className)}
      {...(props as any)}
    >
      {children}
    </Stack>
  );
});
```

**Issue:** This is a vertical list container that should use canonical `List` component instead of `Stack`.

---

### 2. NotificationCenterItem

**File:** `src/DOMAIN/notifications/NotificationCenter.Item.tsx`  
**Lines:** 107-172  
**Pattern:** Uses direct `<li>` element instead of canonical `ListItem`  
**Context:** Individual notification item in a list

```tsx
return (
  <li
    ref={ref}
    role="listitem"
    aria-labelledby={notification.title ? titleId : undefined}
    aria-describedby={notification.description ? descriptionId : undefined}
    className={cn(
      "group relative flex items-start gap-sm rounded-md border transition-colors",
      NOTIFICATION_TOKENS.item.padding,
      NOTIFICATION_TOKENS.item.radius,
      NOTIFICATION_TOKENS.shadow.item,
      NOTIFICATION_TOKENS.surface[variant],
      !isRead && "ring-1 ring-primary/20",
      onClick && "cursor-pointer hover:bg-accent/50",
      className,
    )}
    onClick={handleClick}
    {...props}
  >
    {/* ... content ... */}
  </li>
);
```

**Issue:** This is a list item that should use canonical `ListItem` component instead of direct `<li>` element.

---

### 3. FileUpload File List

**File:** `src/COMPOSITION/overlays/FileUpload/FileUpload.tsx`  
**Lines:** 441-454  
**Pattern:** Uses `div` with `role="list"` and `role="listitem"`  
**Context:** File preview list in FileUpload component

```tsx
{files.length > 0 && (
  <div className="mt-md space-y-sm" role="list" aria-live="polite">
    {files.map((file, index) => (
      <div key={`${file.name}-${index}`} role="listitem">
        <FilePreviewItem
          file={file}
          size={size}
          onRemove={() => handleRemove(file)}
          disabled={disabled}
        />
      </div>
    ))}
  </div>
)}
```

**Issue:** This is a vertical list of file previews that should use canonical `List` and `ListItem` components.

---

### 4. ComboboxList Options

**File:** `src/COMPOSITION/overlays/Combobox/Combobox.tsx`  
**Lines:** 566-615  
**Pattern:** Uses `div` with `role="listbox"` and `role="option"`  
**Context:** Dropdown options list in Combobox component

```tsx
<div id="combobox-list" role="listbox" className="max-h-[300px] overflow-y-auto p-1">
  {filteredOptions.map((option, index) => (
    <div
      key={option.value}
      id={`combobox-option-${index}`}
      role="option"
      aria-selected={selected}
      aria-disabled={option.disabled}
      className={cn(/* ... */)}
      onClick={() => !option.disabled && handleSelect(option.value)}
      onMouseEnter={() => setHighlightedIndex(index)}
    >
      {/* ... content ... */}
    </div>
  ))}
</div>
```

**Issue:** This uses `role="listbox"` and `role="option"` which are ARIA patterns for combobox dropdowns. This is a specialized pattern and may be an exception.

---

## Components Checked (Not Lists)

### Timeline
**File:** `src/PATTERNS/lists/Timeline/Timeline.tsx`  
**Status:** Exception (confirmed)  
**Reason:** Specific pattern with visual elements (dots, connectors). Uses `<ol>` and `<li>` directly with custom styling.

### DataList
**File:** `src/PATTERNS/lists/DataList/DataList.tsx`  
**Status:** Out of scope  
**Reason:** Pattern for `<dl>/<dt>/<dd>` (definition list), not a regular vertical list.

### NavList
**File:** `src/COMPOSITION/navigation/nav-list/NavList.tsx`  
**Status:** Out of scope  
**Reason:** Navigation-specific list with specialized semantics.

### Row
**File:** `src/COMPOSITION/layout/Row/Row.tsx`  
**Status:** Out of scope  
**Reason:** Horizontal Stack alias, not a vertical list.

### TableRow
**File:** `src/PATTERNS/tables/table/TableRow.tsx`  
**Status:** Out of scope  
**Reason:** Table component, not a list.

---

## Summary Statistics

- **Total findings:** 4
- **Must migrate (Class A):** 3 (NotificationCenterList, NotificationCenterItem, FileUpload)
- **Needs classification:** 1 (ComboboxList - may be exception)
- **Exceptions confirmed:** 1 (Timeline)
- **Out of scope:** 4 (DataList, NavList, Row, TableRow)

---

## Next Steps

1. **STEP 2:** Classify each finding as A (MUST migrate), B (Single-item), C (Table/Grid), or D (Exception)
2. **STEP 3:** Refactor all Class A findings to use canonical List/ListItem
3. **STEP 4:** Establish guardrails to prevent future violations
4. **STEP 5:** Final verification

---

## Notes

- Legacy List component from `src/PATTERNS/lists/List/` has been removed (only tests/stories remain)
- Canonical List/ListItem components are located at:
  - `src/COMPOSITION/layout/List/List.tsx`
  - `src/COMPOSITION/layout/ListItem/ListItem.tsx`
- All findings are in DOMAIN and COMPOSITION layers (no findings in PATTERNS except exceptions)

