# HeroMedia — Contract (Structure)

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Scope:** HeroMedia usage contract (DX)  
**Applies to:** `HeroMedia` (COMPOSITION)

---

## Contract

- **Canonical structure** is `HeroMedia.Root` → `HeroMedia.Media` + `HeroMedia.Overlay`.
- Any other direct children are **undefined behavior**.
- HeroMedia is **not** a free-form layout container.
- Current policy: **DEV-only warnings** for invalid structure; rendering is not blocked.

## What HeroMedia Is Not

- Not a general layout container.
- Not a place to mix arbitrary children with media.

## Anti-example (Incorrect)

```tsx
// ❌ Mixed arbitrary children
<HeroMedia.Root ariaLabel="Hero">
  <HeroMedia.Media type="image" src="/hero.jpg" alt="Hero" />
  <div>Arbitrary content</div>
</HeroMedia.Root>
```

## Correct Usage

```tsx
// ✅ Canonical structure
<HeroMedia.Root ariaLabel="Hero">
  <HeroMedia.Media type="image" src="/hero.jpg" alt="Hero" />
  <HeroMedia.Overlay position="bottom" align="start">
    <Heading level={2}>Title</Heading>
  </HeroMedia.Overlay>
</HeroMedia.Root>
```

## Notes

- Invalid children may render but are not supported by contract.
