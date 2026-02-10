# Tabs — Contract (Indicator)

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Scope:** Tabs usage contract (DX)  
**Applies to:** `Tabs` (COMPOSITION)

---

## Contract

- The underline indicator is **active tab affordance**.
- It is **not** a loading/progress bar.
- The indicator is visually contained by `Tabs.List` (`position: relative` + `overflow: hidden`).

## What Tabs Is Not

- Not an async progress indicator.
- Not a loading status element.

## Anti-example (Incorrect)

```tsx
// ❌ Using Tabs as a progress indicator
<Tabs.Root defaultValue="loading">
  <Tabs.List>
    <Tabs.Trigger value="loading">Loading</Tabs.Trigger>
    <Tabs.Trigger value="ready">Ready</Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>
```

## Correct Usage

```tsx
// ✅ Tabs for navigation, indicator shows active tab only
<Tabs.Root defaultValue="music">
  <Tabs.List>
    <Tabs.Trigger value="music">Music</Tabs.Trigger>
    <Tabs.Trigger value="podcasts">Podcasts</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="music">...</Tabs.Content>
  <Tabs.Content value="podcasts">...</Tabs.Content>
</Tabs.Root>
```

## Notes

- `Tabs.List` provides the containment boundary for the indicator. Do not override or remove its layout containment.
