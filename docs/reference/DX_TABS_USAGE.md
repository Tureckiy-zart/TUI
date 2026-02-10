# DX Tabs Usage — Indicator Contract

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Scope:** DX contract for Tabs indicator  
**Applies to:** `Tabs` (COMPOSITION)

---

## Explicit Contract

- The underline indicator is **active tab affordance**.
- It is **not** a loading/progress bar.
- `Tabs.List` provides the **visual containment boundary** (`position: relative` + `overflow: hidden`).

## Anti-example (Incorrect)

```tsx
// ❌ Tabs used as a progress indicator
<Tabs.Root defaultValue="loading">
  <Tabs.List>
    <Tabs.Trigger value="loading">Loading</Tabs.Trigger>
    <Tabs.Trigger value="ready">Ready</Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>
```

## Correct Usage

```tsx
// ✅ Tabs used for navigation
<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="details">Details</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">...</Tabs.Content>
  <Tabs.Content value="details">...</Tabs.Content>
</Tabs.Root>
```

## Notes

- Do not override `Tabs.List` layout containment (positioning/overflow). It exists to keep the indicator bounded and avoid UI bleed.
