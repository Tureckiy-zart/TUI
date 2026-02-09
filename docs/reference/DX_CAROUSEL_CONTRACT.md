# DX Carousel Contract — Viewport-Only

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Scope:** DX contract for Carousel  
**Applies to:** `Carousel` (COMPOSITION)

---

## Explicit Contract

- Carousel is **single viewport only** (one active slide visible at a time).
- Carousel is **not** a card rail or multi-item scroller.
- Indicators are centered by default and **not** content-driven.

## Anti-example (Incorrect)

```tsx
// ❌ Expecting multi-card grid behavior from Carousel
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
// ✅ Single viewport, one slide visible
<Carousel.Root aria-label="Hero slides">
  <Carousel.Track>
    <Carousel.Slide><HeroSlide /></Carousel.Slide>
    <Carousel.Slide><HeroSlide /></Carousel.Slide>
  </Carousel.Track>
  <Carousel.Indicators />
</Carousel.Root>
```

## Guidance

- If you need a multi-card rail, use a layout pattern (list/grid with horizontal scrolling) instead of Carousel.
