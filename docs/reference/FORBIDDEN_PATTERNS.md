# Forbidden Patterns - List Usage

**Last Updated:** 2026-01-01  
**Purpose:** Document forbidden patterns for list rendering to enforce canonical List/ListItem component usage.

**Architecture Decision:** See [ADR_list_usage_exceptions.md](../architecture/decisions/ADR_list_usage_exceptions.md) for documented exceptions to this rule.

## Overview

This document defines patterns that are **forbidden** when rendering vertical lists in the Tenerife UI codebase. All vertical lists **MUST** use the canonical `List` and `ListItem` components from `@/COMPOSITION/layout`.

**Exceptions:** Certain specialized patterns are explicitly excluded from this rule. See [Exceptions](#exceptions) section below and [ADR_list_usage_exceptions.md](../architecture/decisions/ADR_list_usage_exceptions.md) for complete list.

## Canonical Components

**Required components:**
- `List` - from `@/COMPOSITION/layout`
- `ListItem` - from `@/COMPOSITION/layout`

**Location:**
- `src/COMPOSITION/layout/List/List.tsx`
- `src/COMPOSITION/layout/ListItem/ListItem.tsx`

## Forbidden Patterns

### ❌ Direct `<li>` Usage

**Forbidden:**
```tsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.content}</li>
  ))}
</ul>
```

**Required:**
```tsx
<List as="ul" gap="md">
  {items.map((item) => (
    <ListItem key={item.id}>{item.content}</ListItem>
  ))}
</List>
```

---

### ❌ `role="list"` on div/Box/Stack

**Forbidden:**
```tsx
<div role="list">
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</div>
```

**Required:**
```tsx
<List as="div" gap="md">
  {items.map((item) => (
    <ListItem key={item.id} as="div">{item.content}</ListItem>
  ))}
</List>
```

---

### ❌ `role="listitem"` on div/Box

**Forbidden:**
```tsx
<div role="list">
  {items.map((item) => (
    <div key={item.id} role="listitem">{item.content}</div>
  ))}
</div>
```

**Required:**
```tsx
<List as="div" gap="md">
  {items.map((item) => (
    <ListItem key={item.id} as="div">{item.content}</ListItem>
  ))}
</List>
```

---

### ❌ Stack with `direction="vertical"` for Lists

**Forbidden:**
```tsx
<Stack direction="vertical" spacing="md" as="ul" role="list">
  {items.map((item) => (
    <li key={item.id}>{item.content}</li>
  ))}
</Stack>
```

**Required:**
```tsx
<List as="ul" gap="md">
  {items.map((item) => (
    <ListItem key={item.id}>{item.content}</ListItem>
  ))}
</List>
```

---

### ❌ Array.map() with div/Box for Lists

**Forbidden:**
```tsx
<div>
  {items.map((item) => (
    <div key={item.id} className="mb-2">{item.content}</div>
  ))}
</div>
```

**Required:**
```tsx
<List as="div" gap="sm">
  {items.map((item) => (
    <ListItem key={item.id} as="div">{item.content}</ListItem>
  ))}
</List>
```

---

## Exceptions

**Architecture Decision:** Exceptions are documented in [ADR_list_usage_exceptions.md](../architecture/decisions/ADR_list_usage_exceptions.md). This is a canonical architectural decision.

The following patterns are **allowed** as exceptions (specialized patterns):

### ✅ Combobox Options

**Allowed:**
```tsx
<div role="listbox">
  {options.map((option) => (
    <div key={option.value} role="option">
      {option.label}
    </div>
  ))}
</div>
```

**Reason:** Combobox uses ARIA `listbox`/`option` pattern which is required for combobox accessibility. This is a specialized interactive control, not a general list.

---

### ✅ Timeline Component

**Allowed:**
```tsx
<ol>
  {items.map((item) => (
    <li key={item.id}>
      {/* Timeline-specific visual elements */}
    </li>
  ))}
</ol>
```

**Reason:** Timeline is a specialized pattern with visual elements (dots, connectors) that requires custom implementation.

---

### ✅ DataList Component

**Allowed:**
```tsx
<dl>
  <dt>Label</dt>
  <dd>Value</dd>
</dl>
```

**Reason:** DataList uses `<dl>/<dt>/<dd>` semantic HTML for definition lists, not regular lists.

---

### ✅ NavList Component

**Allowed:**
```tsx
<NavList>
  <NavItem>Item</NavItem>
</NavList>
```

**Reason:** NavList is a navigation-specific component with specialized semantics.

---

## ESLint Enforcement

The `no-ad-hoc-lists` ESLint rule automatically detects and reports violations of these patterns:

- Direct `<li>` usage outside ListItem
- `role="list"` on div/Box/Stack
- `role="listitem"` on div/Box

**Rule:** `tenerife-ui-architecture/no-ad-hoc-lists`

**Configuration:** `eslint.config.mjs`

---

## Code Review Checklist

When reviewing code that renders lists, verify:

- [ ] Uses `List` component for list containers
- [ ] Uses `ListItem` component for list items
- [ ] No direct `<li>` elements (except inside ListItem)
- [ ] No `role="list"` or `role="listitem"` on div/Box/Stack
- [ ] No Stack with `direction="vertical"` used as list container
- [ ] Exceptions are documented if used

---

## Migration Guide

### Step 1: Identify List Pattern

Look for:
- Arrays mapped to JSX elements
- Vertical layouts with multiple items
- `role="list"` or `role="listitem"` attributes

### Step 2: Replace with Canonical Components

1. Replace container with `List`
   - Use `as="ul"`, `as="ol"`, or `as="div"` as appropriate
   - Use `gap` prop for spacing (token-based: `xs`, `sm`, `md`, `lg`, `xl`, etc.)

2. Replace items with `ListItem`
   - Use `as="li"` or `as="div"` as appropriate
   - Use `interactive={true}` if item is clickable
   - Use `disabled={true}` if item is disabled

### Step 3: Verify

- No functional changes
- No visual regressions
- All props and behavior preserved
- ARIA attributes maintained

---

## Examples

### Notification List

**Before:**
```tsx
<Stack as="ul" role="list" spacing="sm">
  {notifications.map((n) => (
    <li key={n.id} role="listitem">
      <NotificationItem notification={n} />
    </li>
  ))}
</Stack>
```

**After:**
```tsx
<List as="ul" gap="sm">
  {notifications.map((n) => (
    <ListItem key={n.id}>
      <NotificationItem notification={n} />
    </ListItem>
  ))}
</List>
```

### File List

**Before:**
```tsx
<div role="list" className="space-y-sm">
  {files.map((file) => (
    <div key={file.name} role="listitem">
      <FilePreview file={file} />
    </div>
  ))}
</div>
```

**After:**
```tsx
<List as="div" gap="sm">
  {files.map((file) => (
    <ListItem key={file.name} as="div">
      <FilePreview file={file} />
    </ListItem>
  ))}
</List>
```

---

## References

- **Architecture Decision:** [ADR_list_usage_exceptions.md](../architecture/decisions/ADR_list_usage_exceptions.md) - Canonical decision on exceptions
- [List Component](../../src/COMPOSITION/layout/List/List.tsx)
- [ListItem Component](../../src/COMPOSITION/layout/ListItem/ListItem.tsx)
- [List Usage Inventory Report](../reports/audit/LIST_USAGE_INVENTORY.md)
- [List Usage Classification Report](../reports/audit/LIST_USAGE_CLASSIFICATION.md)
- [List Usage Enforcement Verification](../reports/audit/LIST_USAGE_ENFORCEMENT_VERIFICATION.md)

