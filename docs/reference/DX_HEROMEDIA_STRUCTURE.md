# DX HeroMedia Structure — Contract

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Scope:** DX contract for HeroMedia structure  
**Applies to:** `HeroMedia` (COMPOSITION)

---

## Explicit Contract

- Canonical structure: `HeroMedia.Root` → `HeroMedia.Media` + `HeroMedia.Overlay`.
- Any other direct children are **undefined behavior**.
- Current policy: **DEV-only warnings**, rendering is not blocked.
- HeroMedia is **not** a free layout container.

## Anti-example (Incorrect)

```tsx
// ❌ Arbitrary children mixed into HeroMedia.Root
<HeroMedia.Root ariaLabel="Hero">
  <HeroMedia.Media type="image" src="/hero.jpg" alt="Hero" />
  <div>Random content</div>
</HeroMedia.Root>
```

## Correct Usage

```tsx
// ✅ Canonical structure
<HeroMedia.Root ariaLabel="Hero">
  <HeroMedia.Media type="image" src="/hero.jpg" alt="Hero" />
  <HeroMedia.Overlay position="bottom" align="start">
    <Heading level={2}>Title</Heading>
    <Text>Subtitle</Text>
  </HeroMedia.Overlay>
</HeroMedia.Root>
```
