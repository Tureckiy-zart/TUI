# Architecture Decision: List Usage Exceptions

**Decision ID:** `ADR_list_usage_exceptions`  
**Version:** 1.0  
**Date:** 2026-01-01  
**Status:** ✅ **DECIDED**  
**Authority:** This decision is canonical and binding

---

## Executive Summary

This document records the architectural decision that **certain specialized patterns are exceptions** to the canonical List/ListItem component usage rule. These patterns intentionally use different rendering approaches due to specialized ARIA semantics, visual requirements, or domain-specific needs.

**Decision:** The following patterns are **explicitly excluded** from the List/ListItem enforcement rule:
- Combobox dropdown options (ARIA `listbox`/`option` pattern)
- Timeline component (visual timeline with dots and connectors)
- DataList component (definition list `<dl>/<dt>/<dd>`)
- NavList component (navigation-specific semantics)
- Stepper component (step indicators with navigation semantics)

---

## Context

During the TUNG_LIST_STRICT_USAGE_ENFORCEMENT task, we established that all vertical lists **MUST** use canonical `List` and `ListItem` components from `@/COMPOSITION/layout`. However, certain specialized patterns were identified that require different approaches due to:

1. **ARIA Semantics:** Some patterns require specific ARIA roles (e.g., `listbox`/`option` for combobox)
2. **Visual Requirements:** Some patterns have specialized visual elements (e.g., Timeline with dots and connectors)
3. **Domain Semantics:** Some patterns use different HTML semantics (e.g., `<dl>/<dt>/<dd>` for definition lists)
4. **Navigation Patterns:** Some patterns are navigation-specific with specialized semantics

This decision documents these exceptions to prevent confusion and ensure consistent enforcement.

---

## Decision

**The following patterns are EXCEPTIONS to the List/ListItem enforcement rule:**

### 1. Combobox Options (ARIA listbox/option)

**Component:** `ComboboxList` (`src/COMPOSITION/overlays/Combobox/Combobox.tsx`)

**Pattern:**
```tsx
<div role="listbox">
  {options.map((option) => (
    <div key={option.value} role="option" aria-selected={selected}>
      {option.label}
    </div>
  ))}
</div>
```

**Reason:** Combobox uses ARIA `listbox`/`option` pattern which is **required** by WAI-ARIA specification for combobox accessibility. This is a specialized interactive control pattern, not a general vertical list.

**ARIA Specification:** [WAI-ARIA Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

**Enforcement:** ESLint rule `no-ad-hoc-lists` excludes Combobox patterns automatically.

---

### 2. Timeline Component

**Component:** `Timeline` (`src/PATTERNS/lists/Timeline/Timeline.tsx`)

**Pattern:**
```tsx
<ol>
  {items.map((item, index) => (
    <li key={item.id} className="relative flex">
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div className="timeline-dot" />
        {index < items.length - 1 && <div className="timeline-connector" />}
      </div>
      {/* Timeline content */}
      <div className="flex-1">
        <Heading>{item.title}</Heading>
        <Text>{item.description}</Text>
      </div>
    </li>
  ))}
</ol>
```

**Reason:** Timeline is a specialized pattern with visual elements (dots, connectors) that requires custom implementation. The visual timeline indicators are integral to the component and cannot be abstracted into List/ListItem.

**Visual Requirements:**
- Timeline dots (visual indicators)
- Timeline connectors (lines between items)
- Custom positioning and spacing

**Enforcement:** Explicitly documented exception in `FORBIDDEN_PATTERNS.md`.

---

### 3. DataList Component

**Component:** `DataList` (`src/PATTERNS/lists/DataList/DataList.tsx`)

**Pattern:**
```tsx
<dl>
  <DataList.Item>
    <DataList.Label>Name</DataList.Label>
    <DataList.Value>John Doe</DataList.Value>
  </DataList.Item>
</dl>
```

**Reason:** DataList uses semantic HTML `<dl>/<dt>/<dd>` for definition lists, which is different from regular lists (`<ul>/<ol>`). This is a specialized pattern for key-value pairs, not a general vertical list.

**HTML Semantics:** Definition lists use `<dl>` (definition list), `<dt>` (definition term), and `<dd>` (definition description), which are semantically different from `<ul>/<ol>` and `<li>`.

**Enforcement:** Explicitly documented as out of scope in `FORBIDDEN_PATTERNS.md`.

---

### 4. NavList Component

**Component:** `NavList` (`src/COMPOSITION/navigation/nav-list/NavList.tsx`)

**Pattern:**
```tsx
<NavList as="ol">
  <NavItem>Home</NavItem>
  <NavItem>About</NavItem>
</NavList>
```

**Reason:** NavList is a navigation-specific component with specialized semantics for navigation patterns. It provides navigation-specific behavior and structure that differs from general lists.

**Navigation Semantics:** Navigation lists have specific ARIA patterns and keyboard navigation requirements that are navigation-specific.

**Enforcement:** Explicitly documented as out of scope in `FORBIDDEN_PATTERNS.md`.

---

### 5. Stepper Component

**Component:** `Stepper` (`src/COMPOSITION/navigation/stepper/Stepper.tsx`)

**Pattern:**
```tsx
<ol role="list">
  {steps.map((step, index) => (
    <li key={step.id} role="listitem">
      {/* Step indicator and content */}
    </li>
  ))}
</ol>
```

**Reason:** Stepper is a navigation-specific component for step indicators with specialized semantics. It uses `role="listitem"` for step indicators, which is part of the navigation pattern.

**Navigation Semantics:** Step indicators are part of navigation flow and have specialized ARIA patterns for step navigation.

**Enforcement:** Explicitly documented as out of scope in `FORBIDDEN_PATTERNS.md`.

---

## Rationale

### Why These Are Exceptions

1. **ARIA Compliance:**
   - Combobox requires `listbox`/`option` roles for accessibility
   - These roles are part of WAI-ARIA specification and cannot be replaced with generic list roles

2. **Visual Requirements:**
   - Timeline requires custom visual elements (dots, connectors)
   - These cannot be abstracted into generic List/ListItem components

3. **HTML Semantics:**
   - DataList uses `<dl>/<dt>/<dd>` which is semantically different from `<ul>/<ol>/<li>`
   - These are definition lists, not regular lists

4. **Domain-Specific Patterns:**
   - NavList and Stepper are navigation-specific components
   - They have specialized semantics and behavior for navigation patterns

### Why NOT Force List/ListItem

1. **ARIA Violations:**
   - Forcing List/ListItem on Combobox would violate WAI-ARIA specification
   - This would break accessibility for screen readers

2. **Visual Limitations:**
   - Timeline visual elements cannot be implemented with generic List/ListItem
   - Custom implementation is required for visual timeline indicators

3. **Semantic Incorrectness:**
   - DataList uses definition list semantics, not regular list semantics
   - Forcing regular list semantics would be semantically incorrect

4. **Pattern Mismatch:**
   - Navigation patterns have specialized requirements
   - Generic List/ListItem cannot provide navigation-specific behavior

---

## Decision Rule for Future Patterns

**When determining if a pattern is an exception to List/ListItem enforcement:**

1. ✅ **IS an exception if:**
   - Pattern requires specific ARIA roles (e.g., `listbox`, `option`, `navigation`)
   - Pattern has specialized visual elements that cannot be abstracted
   - Pattern uses different HTML semantics (e.g., `<dl>`, `<nav>`)
   - Pattern is domain-specific (navigation, forms, etc.) with specialized behavior

2. ❌ **IS NOT an exception if:**
   - Pattern is a general vertical list of items
   - Pattern can use generic `<ul>/<ol>` or `<div>` with `role="list"`
   - Pattern does not require specialized ARIA roles
   - Pattern does not have specialized visual requirements

**Process for Adding Exceptions:**

1. Document the exception in this ADR
2. Update `FORBIDDEN_PATTERNS.md` with the exception
3. Update ESLint rule exclusions if needed
4. Add to code review checklist

---

## Examples

### ✅ Correct: Combobox Exception

```tsx
// ✅ Correct: Combobox uses listbox/option pattern
<div role="listbox">
  {options.map((option) => (
    <div key={option.value} role="option" aria-selected={selected}>
      {option.label}
    </div>
  ))}
</div>
```

### ✅ Correct: Timeline Exception

```tsx
// ✅ Correct: Timeline uses custom visual elements
<ol>
  {items.map((item, index) => (
    <li key={item.id}>
      <div className="timeline-dot" />
      {index < items.length - 1 && <div className="timeline-connector" />}
      <div>{item.content}</div>
    </li>
  ))}
</ol>
```

### ❌ Incorrect: General List Without Exception

```tsx
// ❌ Incorrect: This should use List/ListItem
<div role="list">
  {items.map((item) => (
    <div key={item.id} role="listitem">{item.content}</div>
  ))}
</div>

// ✅ Correct: Use canonical components
<List as="div" gap="md">
  {items.map((item) => (
    <ListItem key={item.id} as="div">{item.content}</ListItem>
  ))}
</List>
```

---

## Consequences

### Positive

1. **Clear Exceptions:**
   - Developers know which patterns are exceptions
   - No confusion about when to use List/ListItem vs exceptions

2. **ARIA Compliance:**
   - Combobox maintains proper ARIA semantics
   - Accessibility is preserved for specialized patterns

3. **Visual Flexibility:**
   - Timeline can implement custom visual elements
   - Specialized patterns can meet their requirements

4. **Semantic Correctness:**
   - DataList uses correct HTML semantics
   - Navigation patterns use appropriate semantics

### Negative

1. **Learning Curve:**
   - Developers must understand exception rules
   - This is mitigated by clear documentation

2. **Enforcement Complexity:**
   - ESLint rule must exclude exceptions
   - This is handled by pattern matching in the rule

---

## References

- **List Usage Inventory:** `docs/reports/audit/LIST_USAGE_INVENTORY.md`
- **List Usage Classification:** `docs/reports/audit/LIST_USAGE_CLASSIFICATION.md`
- **Forbidden Patterns:** `docs/reference/FORBIDDEN_PATTERNS.md`
- **List Component:** `src/COMPOSITION/layout/List/List.tsx`
- **ListItem Component:** `src/COMPOSITION/layout/ListItem/ListItem.tsx`
- **Combobox Component:** `src/COMPOSITION/overlays/Combobox/Combobox.tsx`
- **Timeline Component:** `src/PATTERNS/lists/Timeline/Timeline.tsx`
- **DataList Component:** `src/PATTERNS/lists/DataList/DataList.tsx`
- **NavList Component:** `src/COMPOSITION/navigation/nav-list/NavList.tsx`
- **Stepper Component:** `src/COMPOSITION/navigation/stepper/Stepper.tsx`
- **WAI-ARIA Combobox Pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

---

## Status

✅ **DECIDED** - This decision is canonical and binding. The listed patterns are exceptions to the List/ListItem enforcement rule.

**Last Updated:** 2026-01-01

