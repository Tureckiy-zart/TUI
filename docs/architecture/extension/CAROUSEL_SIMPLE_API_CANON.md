# Carousel Simple API — Canonical Design Definition

**Package:** `@tenerife.music/ui`  
**Layer:** Extension / Architecture  
**Phase:** L.2 — Extension API Design  
**Status:** CANONICAL / DESIGN-LOCKED  
**Date Created:** 2026-01-30  
**Task ID:** TUNG_EXT_CAROUSEL_SIMPLE_API_001

---

## Document Classification

**TYPE:** Canonical API Design Definition  
**MUTABILITY:** Design-locked; changes only via explicit canon update  
**AUTHORITY DOMAIN:** Extension (Hero carousel capability)

**Purpose:** This document defines the Simple Public API `<Carousel />` as a sugar-wrapper over the existing compound Carousel components (`Carousel.Root`, `Carousel.Track`, `Carousel.Slide`, `Carousel.Prev`, `Carousel.Next`, `Carousel.Indicators`). It fixes the API surface, props contract, composition mapping, behavioral contract, relationship to compound API, accessibility contract, constraints, and non-goals. No implementation code; implementation MUST follow this canon without reinterpretation.

---

## Purpose & Scope

**Purpose:** The Simple API provides a convenient, declarative interface for common carousel usage patterns, improving developer experience without breaking or replacing the compound API. It internally composes the compound API, ensuring architectural consistency and preserving all compound capabilities.

**Scope:**

- Simple API wrapper component `<Carousel />` with declarative props
- Internal composition mapping to compound API components
- Behavioral contract for controls, indicators, autoplay, and loop
- Relationship preservation with compound API
- Integration patterns with HeroMedia and other Extension components
- Compliance with [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md), [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md) (Hero carousel capability), [LAYOUT_AUTHORITY.md](../LAYOUT_AUTHORITY.md), [INTERACTION_AUTHORITY.md](../INTERACTION_AUTHORITY.md), [STATE_AUTHORITY.md](../STATE_AUTHORITY.md)

**Out of Scope:**

- Modifications to compound API behavior or props
- New tokens or token domains
- Foundation or token contract changes
- Storybook changes (separate task)
- Breaking changes to existing compound API usage

---

## Architectural Role

**Simple API Component (`<Carousel />`):**

- Provides declarative, data-driven API for common carousel patterns
- Internally composes compound API components
- Owns prop-to-composition mapping logic
- MUST NOT modify compound API behavior
- MUST preserve all compound API exports

**Compound API Components:**

- Remain fully functional and unchanged
- Continue to be accessible via `Carousel.Root`, `Carousel.Track`, etc.
- Serve as escape hatch for advanced usage patterns

---

## Capability Classification (Extension)

The Simple API is an **Extension** capability. It:

- MUST be realised using existing compound Carousel components
- MUST NOT introduce new tokens or token domains
- MUST NOT accept or forward `className` or `style` props (Foundation Enforcement)
- MUST NOT bypass the token system
- MUST comply with [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md) and [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md)

---

## Public API Surface

### Component Signature

```typescript
<Carousel 
  items={React.ReactNode[]}
  orientation?: "horizontal" | "vertical"
  controls?: "none" | "inside" | "outside"
  indicators?: "none" | "bottom" | "overlay"
  loop?: boolean
  autoplay?: boolean
  autoplayDelay?: number
  ariaLabel?: string
  renderSlide?: (item: React.ReactNode, index: number) => React.ReactNode
/>
```

### Props Contract

#### `items` (required)

- **Type:** `React.ReactNode[]`
- **Description:** Array of slide content to be rendered in order
- **Validation:** MUST be a non-empty array (runtime validation recommended)
- **Usage:** Each item is wrapped in `Carousel.Slide` internally

#### `orientation` (optional)

- **Type:** `"horizontal" | "vertical"`
- **Default:** `"horizontal"`
- **Description:** Scroll axis of the carousel
- **Validation:** MUST be one of the two allowed values
- **Mapping:** Passed directly to `Carousel.Root` `orientation` prop

#### `controls` (optional)

- **Type:** `"none" | "inside" | "outside"`
- **Default:** `"inside"`
- **Description:** Visibility and placement of Prev/Next controls
- **Validation:** MUST be one of the three allowed values
- **Behavior:**
  - `"none"`: No controls rendered
  - `"inside"`: Prev/Next rendered inside Track (as Track children)
  - `"outside"`: Prev/Next rendered as siblings of Track (as Root children)

#### `indicators` (optional)

- **Type:** `"none" | "bottom" | "overlay"`
- **Default:** `"bottom"`
- **Description:** Visibility and placement of slide indicators
- **Validation:** MUST be one of the three allowed values
- **Behavior:**
  - `"none"`: Indicators not rendered
  - `"bottom"`: Indicators rendered with `placement="bottom"`
  - `"overlay"`: Indicators rendered with `placement="overlay"`

#### `loop` (optional)

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Whether carousel loops from last slide to first
- **Mapping:** Passed directly to `Carousel.Root` `loop` prop
- **Behavior:** When `loop={false}`, Prev/Next buttons are disabled at boundaries

#### `autoplay` (optional)

- **Type:** `boolean`
- **Default:** `false`
- **Description:** Whether carousel auto-advances slides
- **Mapping:** Passed directly to `Carousel.Root` `autoplay` prop
- **Behavior:** When `autoplay={true}`, carousel advances automatically every `autoplayDelay` milliseconds

#### `autoplayDelay` (optional)

- **Type:** `number`
- **Default:** `5000`
- **Description:** Delay in milliseconds between autoplay transitions
- **Validation:** MUST be a positive number (minimum 1000ms recommended)
- **Mapping:** Passed directly to `Carousel.Root` `autoplayDelay` prop

#### `ariaLabel` (optional)

- **Type:** `string`
- **Description:** ARIA label for accessibility
- **Mapping:** Passed to `Carousel.Root` as `aria-label` prop
- **Accessibility:** When not provided, component MUST still be accessible (carousel role is implicit)

#### `renderSlide` (optional)

- **Type:** `(item: React.ReactNode, index: number) => React.ReactNode`
- **Description:** Optional custom slide renderer for advanced use cases
- **Usage:** If provided, called for each item: `renderSlide(item, index)`
- **Default:** Item is rendered directly inside `Carousel.Slide`

---

## Composition Mapping

The Simple API MUST internally compose the compound API as follows:

### 1. Root Setup

`Carousel.Root` receives:

- `orientation` (from `orientation` prop)
- `loop` (from `loop` prop)
- `autoplay` (from `autoplay` prop)
- `autoplayDelay` (from `autoplayDelay` prop)
- `aria-label` (from `ariaLabel` prop)
- `controls` (boolean: `controls !== "none"`)
- `indicators` (boolean: `indicators !== "none"`)

### 2. Track Setup

`Carousel.Track` wraps all slides:

- Each item from `items` array is wrapped in `Carousel.Slide`
- If `renderSlide` is provided, it is called: `renderSlide(item, index)`
- Otherwise, item is rendered directly inside `Carousel.Slide`
- If `controls === "inside"`, `Carousel.Prev` and `Carousel.Next` are added as children of Track
- If `controls === "outside"`, `Carousel.Prev` and `Carousel.Next` are siblings of Track

### 3. Controls Setup

- If `controls === "none"`: No controls rendered
- If `controls === "inside"`: `Carousel.Prev` and `Carousel.Next` are children of Track
- If `controls === "outside"`: `Carousel.Prev` and `Carousel.Next` are siblings of Track (Root children)
- Controls MUST have `aria-label="Previous slide"` and `aria-label="Next slide"`

### 4. Indicators Setup

- If `indicators === "none"`: Indicators not rendered
- If `indicators === "bottom"`: `Carousel.Indicators` rendered with `placement="bottom"` as sibling of Track
- If `indicators === "overlay"`: `Carousel.Indicators` rendered with `placement="overlay"` as sibling of Track

---

## Behavioral Contract

### Controls Behavior

- **`controls="inside"`**: Prev/Next rendered inside Track (as Track children), positioned as overlays relative to Track
- **`controls="outside"`**: Prev/Next rendered as siblings of Track (as Root children), positioned outside Track boundaries
- **`controls="none"`**: No controls rendered; keyboard navigation still available

### Indicators Behavior

- **`indicators="none"`**: Indicators not rendered
- **`indicators="bottom"`**: Indicators rendered with `placement="bottom"` (default placement, outside Track)
- **`indicators="overlay"`**: Indicators rendered with `placement="overlay"` (overlay on top of Track content)

### Autoplay Behavior

- When `autoplay={true}`, carousel advances automatically every `autoplayDelay` milliseconds
- Autoplay respects `loop` setting (stops at end if `loop={false}`)
- Autoplay pauses on user interaction (hover, focus, manual navigation)
- Autoplay resumes after interaction ends (implementation detail)

### Loop Behavior

- When `loop={true}`, navigation wraps from last slide to first and vice versa
- When `loop={false}`, Prev/Next buttons are disabled at boundaries (first/last slide)
- Keyboard navigation respects loop setting

### Orientation Behavior

- **`orientation="horizontal"`**: Navigation axis is X; Prev/Next placement is left/right (centered)
- **`orientation="vertical"`**: Navigation axis is Y; Prev/Next placement is top/bottom (centered)

---

## Relationship to Compound API

### Compound API Preservation

- Compound API (`Carousel.Root`, `Carousel.Track`, `Carousel.Slide`, `Carousel.Prev`, `Carousel.Next`, `Carousel.Indicators`) MUST remain fully exported
- Compound API MUST remain fully functional and unchanged
- Simple API MUST NOT hide or deprecate compound API
- Simple API MUST NOT modify compound API behavior or props

### Export Pattern

```typescript
export const Carousel = Object.assign(CarouselSimple, {
  Root: CarouselRoot,
  Track: CarouselTrack,
  Slide: CarouselSlide,
  Prev: CarouselPrev,
  Next: CarouselNext,
  Indicators: CarouselIndicators,
});
```

This pattern ensures:

- Simple API is accessible as `<Carousel />`
- Compound API remains accessible as `Carousel.Root`, `Carousel.Track`, etc.
- Both APIs coexist without conflicts

### Usage Guidelines

**Simple API (`<Carousel />`) — Recommended for:**

- Product frontend usage
- HeroMedia by default
- Common carousel patterns with standard controls and indicators
- Data-driven slide rendering

**Compound API (`Carousel.Root`, `Carousel.Track`, etc.) — Use when:**

- Custom layout or control positioning is required
- Advanced composition patterns are needed
- Fine-grained control over component structure is necessary
- Escape hatch for edge cases

---

## Type Definitions

### CarouselProps Interface

```typescript
export interface CarouselProps {
  /** Slides content */
  items: React.ReactNode[];
  /** Layout */
  orientation?: CarouselOrientation;
  /** Controls visibility & placement */
  controls?: "none" | "inside" | "outside";
  /** Indicators visibility & placement */
  indicators?: "none" | "bottom" | "overlay";
  /** Behavior */
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  /** Accessibility */
  ariaLabel?: string;
  /** Advanced escape hatch */
  renderSlide?: (item: React.ReactNode, index: number) => React.ReactNode;
}
```

### Default Values (Constants)

```typescript
export const CAROUSEL_SIMPLE_DEFAULT_ORIENTATION: CarouselOrientation = "horizontal";
export const CAROUSEL_SIMPLE_DEFAULT_CONTROLS = "inside" as const;
export const CAROUSEL_SIMPLE_DEFAULT_INDICATORS = "bottom" as const;
export const CAROUSEL_SIMPLE_DEFAULT_LOOP = false;
export const CAROUSEL_SIMPLE_DEFAULT_AUTOPLAY = false;
export const CAROUSEL_SIMPLE_DEFAULT_AUTOPLAY_DELAY = 5000;
```

---

## Accessibility Contract

### ARIA Requirements

- `ariaLabel` prop maps to `aria-label` on `Carousel.Root`
- When `ariaLabel` is not provided, component MUST still be accessible (carousel role is implicit via `role="region"` and `aria-roledescription="carousel"`)
- Controls MUST have `aria-label="Previous slide"` and `aria-label="Next slide"` (handled by `Carousel.Prev` and `Carousel.Next`)
- Indicators MUST have proper `role="tablist"` and `role="tab"` semantics (handled by `Carousel.Indicators`)
- Keyboard navigation MUST be supported (Arrow keys for horizontal, Arrow Up/Down for vertical)

### Keyboard Navigation

- **Horizontal orientation:**
  - `ArrowLeft`: Previous slide
  - `ArrowRight`: Next slide
- **Vertical orientation:**
  - `ArrowUp`: Previous slide
  - `ArrowDown`: Next slide
- Keyboard navigation respects `loop` setting

---

## Integration with HeroMedia

### HeroMedia Integration Pattern

- HeroMedia.Media accepts `Carousel.Root` as children when `type="carousel"`
- Simple API `<Carousel />` CAN be used inside HeroMedia.Media (it renders `Carousel.Root` internally)
- HeroMedia layering contract is preserved:
  - **Layer 0 — Media:** Carousel Track (slides)
  - **Layer 1 — Overlay:** HeroMedia.Overlay content
  - **Layer 2 — Controls:** Carousel controls (Prev/Next, Indicators)

### Usage Example

```tsx
<HeroMedia.Root>
  <HeroMedia.Media type="carousel">
    <Carousel 
      items={slides}
      autoplay={true}
      loop={true}
      indicators="overlay"
    />
  </HeroMedia.Media>
  <HeroMedia.Overlay position="center">
    {overlayContent}
  </HeroMedia.Overlay>
</HeroMedia.Root>
```

---

## Constraints & Prohibitions

### MUST NOT

- Modify compound API behavior or props
- Introduce new tokens or token domains
- Accept `className` or `style` props (Foundation Enforcement)
- Change Foundation or token contracts
- Break existing compound API usage
- Hide or deprecate compound API
- Add props that bypass architectural constraints

### MUST

- Compose compound API internally
- Preserve all compound API exports
- Follow Extension Authority constraints
- Maintain architectural invariants
- Respect Foundation Enforcement (no `className`/`style`)
- Use existing tokens only
- Maintain backward compatibility with compound API

---

## Usage Examples

### Simple Usage

```tsx
<Carousel 
  items={[<Slide1 />, <Slide2 />, <Slide3 />]}
  ariaLabel="Product slides"
/>
```

### With Autoplay

```tsx
<Carousel 
  items={slides}
  autoplay={true}
  autoplayDelay={3000}
  loop={true}
  indicators="overlay"
/>
```

### Vertical Carousel

```tsx
<Carousel 
  items={items}
  orientation="vertical"
  controls="inside"
/>
```

### Custom Slide Rendering

```tsx
<Carousel 
  items={data}
  renderSlide={(item, index) => (
    <CustomSlideWrapper>
      {item}
      <SlideNumber>{index + 1}</SlideNumber>
    </CustomSlideWrapper>
  )}
/>
```

### No Controls, Indicators Only

```tsx
<Carousel 
  items={slides}
  controls="none"
  indicators="bottom"
/>
```

### Outside Controls

```tsx
<Carousel 
  items={slides}
  controls="outside"
  indicators="overlay"
/>
```

---

## Non-Goals

The Simple API explicitly does NOT:

- Replace or deprecate compound API
- Add visual props (variant, size, theme)
- Introduce new token domains or scales
- Support custom control positioning beyond "inside"/"outside"
- Support custom indicator positioning beyond "bottom"/"overlay"
- Accept `className` or `style` props
- Modify Foundation or token contracts
- Break architectural invariants

---

## Change Policy & Lock Conditions

- This document is **design-locked**. Any change to the API surface, props contract, composition mapping, behavioral contract, or invariants MUST be made by explicit update to this canon.
- The invariants listed in this document are **LOCK candidates** for future propagation to [ARCHITECTURE_LOCK.md](../ARCHITECTURE_LOCK.md) or equivalent.
- Implementation MUST NOT precede or deviate from this document; implementation MUST be traceable to this canon without reinterpretation.
- This canon is eligible for API LOCK (next step: CAROUSEL_SIMPLE_API_LOCK).

---

## Related Documents

- [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md) — Extension boundary contract
- [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md) — Hero carousel capability
- [HEROMEDIA_CANON.md](HEROMEDIA_CANON.md) — HeroMedia canonical capability (integration pattern)
- [LAYOUT_AUTHORITY.md](../LAYOUT_AUTHORITY.md) — Layout rules
- [INTERACTION_AUTHORITY.md](../INTERACTION_AUTHORITY.md) — Interaction rules
- [STATE_AUTHORITY.md](../STATE_AUTHORITY.md) — State rules
- [DOCUMENTATION_CANON_LOCK.md](../DOCUMENTATION_CANON_LOCK.md) — Documentation structure (extension/ placement)

---

**Last Updated:** 2026-01-30  
**Task ID:** TUNG_EXT_CAROUSEL_SIMPLE_API_001  
**Status:** CANONICAL / DESIGN-LOCKED
