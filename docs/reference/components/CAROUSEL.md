# Carousel — Contract (Viewport-Only)

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Scope:** Carousel usage contract (DX)  
**Applies to:** `Carousel` (COMPOSITION)

---

## Contract

- Carousel is a **single active viewport** slider (one slide visible at a time).
- Carousel is **not** a layout primitive.
- Carousel does **not** support multi-item or card-mode layouts.
- Indicators are **centered by default**; alignment is not driven by content.

## What Carousel Is Not

- Not a multi-card rail.
- Not a grid or layout wrapper.
- Not a free-form scroller.

## Anti-example (Incorrect)

```tsx
// ❌ Expecting multi-card viewport inside Carousel
<Carousel.Root aria-label="Cards">
  <Carousel.Track>
    <Carousel.Slide><Card /></Carousel.Slide>
    <Carousel.Slide><Card /></Carousel.Slide>
    <Carousel.Slide><Card /></Carousel.Slide>
  </Carousel.Track>
</Carousel.Root>
```

## Correct Usage

```tsx
// ✅ Single active viewport, one slide visible at a time
<Carousel.Root aria-label="Feature slides">
  <Carousel.Track>
    <Carousel.Slide><HeroSlide /></Carousel.Slide>
    <Carousel.Slide><HeroSlide /></Carousel.Slide>
  </Carousel.Track>
  <Carousel.Indicators />
</Carousel.Root>
```

## If You Need Card Scrolling

Use a **list/grid layout** with horizontal scrolling at the container level. Carousel is not the right tool for that pattern.
