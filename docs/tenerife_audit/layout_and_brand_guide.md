# Tenerife Music: Layout & Brand Voice Guide

**Version 1.0** • November 2025  
**Platform:** Nightlife Intelligence Platform for Tenerife  
**Aesthetic:** Premium • Minimalistic • Modern • Sophisticated

---

## Table of Contents

### Part 1: Layout Guide

1. [Spacing Rules & Principles](#1-spacing-rules--principles)
2. [Section Construction Principles](#2-section-construction-principles)
3. [Page Layout Patterns](#3-page-layout-patterns)
4. [Grid System](#4-grid-system)
5. [Vertical Rhythm](#5-vertical-rhythm)
6. [Responsive Design Principles](#6-responsive-design-principles)
7. [Content Hierarchy](#7-content-hierarchy)
8. [Common Layout Mistakes](#8-common-layout-mistakes)

### Part 2: Brand Voice Guide

9. [Brand Essence](#9-brand-essence)
10. [Visual Mood & Aesthetic](#10-visual-mood--aesthetic)
11. [UX Character & Personality](#11-ux-character--personality)
12. [Emotional Tone](#12-emotional-tone)
13. [Content Guidelines](#13-content-guidelines)
14. [Photography & Imagery Style](#14-photography--imagery-style)
15. [Iconography Style](#15-iconography-style)
16. [Animation & Motion Personality](#16-animation--motion-personality)
17. [Accessibility as Brand Value](#17-accessibility-as-brand-value)
18. [Brand Application Examples](#18-brand-application-examples)
19. [Competitive Differentiation](#19-competitive-differentiation)
20. [Brand Evolution Guidelines](#20-brand-evolution-guidelines)

---

# PART 1: LAYOUT GUIDE

## 1. Spacing Rules & Principles

### 1.1 Vertical Spacing System

Our 8px base unit creates mathematical harmony throughout the interface.

**Spacing Scale:**

```
4px   (0.5 unit)  → xs   → Tight spacing (icon-text gaps)
8px   (1 unit)    → sm   → Compact spacing (label-input)
16px  (2 units)   → md   → Default spacing (component internal)
24px  (3 units)   → lg   → Comfortable spacing (between groups)
32px  (4 units)   → xl   → Section internal spacing
48px  (6 units)   → 2xl  → Between major sections
64px  (8 units)   → 3xl  → Section boundaries
96px  (12 units)  → 4xl  → Major section dividers
128px (16 units)  → 5xl  → Hero section padding
```

**Tailwind Classes:**

```css
/* Gap utilities */
gap-1  → 4px
gap-2  → 8px
gap-4  → 16px
gap-6  → 24px
gap-8  → 32px
gap-12 → 48px
gap-16 → 64px

/* Padding utilities */
p-2, py-2, px-2  → 8px
p-4, py-4, px-4  → 16px
p-6, py-6, px-6  → 24px
p-8, py-8, px-8  → 32px
p-12             → 48px
p-16             → 64px
```

### 1.2 Section Spacing Standards

**Hero Sections:**

- Top padding: `pt-32` (128px) on desktop, `pt-24` (96px) on mobile
- Bottom padding: `pb-24` (96px) on desktop, `pb-16` (64px) on mobile
- Internal content spacing: `gap-8` (32px)

**Content Sections:**

- Top/bottom padding: `py-16` (64px) on desktop, `py-12` (48px) on mobile
- Internal spacing: `gap-12` (48px) between major content blocks

**Footer Section:**

- Top padding: `pt-16` (64px)
- Bottom padding: `pb-8` (32px)
- Internal column gap: `gap-12` (48px)

### 1.3 Component Spacing

**Cards:**

```tsx
// Event Card
<div className="space-y-4 p-6">
  {" "}
  // 24px padding, 16px internal spacing
  <img /> // Image
  <div className="space-y-2">
    {" "}
    // 8px spacing for tight groups
    <h3 />
    <p />
  </div>
  <div className="mt-auto pt-4">
    {" "}
    // 16px top padding for CTA
    <button />
  </div>
</div>
```

**Forms:**

```tsx
// Form Field Spacing
<div className="space-y-6">
  {" "}
  // 24px between fields
  <div className="space-y-2">
    {" "}
    // 8px label-input gap
    <label />
    <input />
  </div>
</div>
```

**Navigation:**

```tsx
// Desktop Navigation
<nav className="px-8 py-4">       // 32px horizontal, 16px vertical
  <ul className="flex gap-8">     // 32px between nav items
</nav>

// Mobile Navigation
<nav className="px-4 py-4">       // 16px all around
  <ul className="space-y-4">      // 16px between stacked items
</nav>
```

### 1.4 Whitespace Philosophy

**Premium = Breathing Room**

✅ **DO:**

- Use generous whitespace to create sophistication
- Let content breathe (minimum 24px between major elements)
- Use whitespace to create visual hierarchy
- Embrace asymmetry with intentional white space

❌ **DON'T:**

- Cram content to "use all space"
- Use whitespace inconsistently
- Ignore responsive spacing needs
- Let content touch edges (always use padding)

**Examples:**

**Good - Generous Spacing:**

```tsx
<section className="px-8 py-24">
  <div className="mx-auto max-w-7xl space-y-16">
    <header className="space-y-4">
      <h2>Trending Events</h2>
      <p>Most popular this week</p>
    </header>
    <div className="grid grid-cols-3 gap-8">{/* Cards with breathing room */}</div>
  </div>
</section>
```

**Bad - Cramped:**

```tsx
<section className="px-2 py-4">
  <div className="space-y-2">
    <h2>Trending Events</h2>
    <div className="grid grid-cols-3 gap-2">{/* Too tight, feels cheap */}</div>
  </div>
</section>
```

### 1.5 Responsive Spacing

**Mobile-First Scaling:**

```tsx
// Section padding scales up
<section className="py-12 md:py-16 lg:py-24">

// Internal spacing scales
<div className="space-y-8 md:space-y-12 lg:space-y-16">

// Grid gaps scale
<div className="grid gap-4 md:gap-6 lg:gap-8">

// Container padding scales
<div className="px-4 md:px-8 lg:px-12">
```

**Principle:** More space on larger screens = more premium feel.

### 1.6 Common Spacing Patterns

**Pattern 1: Hero + Content Sections**

```tsx
<main>
  <section className="pb-24 pt-32">
    {" "}
    {/* Hero: extra top padding */}
    {/* Hero content */}
  </section>

  <section className="py-16">
    {" "}
    {/* Standard content section */}
    {/* Content */}
  </section>

  <section className="bg-midnight py-16">
    {" "}
    {/* Alternating background */}
    {/* Content */}
  </section>
</main>
```

**Pattern 2: Card Grid**

```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
  <article className="space-y-4 p-6">{/* Card content */}</article>
</div>
```

**Pattern 3: Split Layout (Image + Text)**

```tsx
<div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
  <div>
    <img />
  </div>
  <div className="space-y-6">{/* Text content */}</div>
</div>
```

---

## 2. Section Construction Principles

### 2.1 Section Anatomy

Every section follows this structure:

```tsx
<section className="// Vertical padding (responsive) // Edge protection bg-midnight-950 // Background (optional) px-4 py-16">
  <div className="// Container constraint // Center alignment // Internal spacing mx-auto max-w-7xl space-y-12">
    {/* Section content */}
  </div>
</section>
```

**Key Elements:**

1. **Outer section** → Vertical spacing + background
2. **Container** → Max-width + centering
3. **Content** → Internal spacing

### 2.2 Section Types

#### A. Hero Section - Full Height

**Use:** Homepage, major landing pages  
**Purpose:** Immediate impact, set tone

```tsx
<section className="from-midnight-950 via-midnight-900 relative flex min-h-screen items-center bg-gradient-to-br to-purple-950">
  {/* Background Image/Video */}
  <div className="absolute inset-0 z-0">
    <img src="/hero-bg.jpg" className="h-full w-full object-cover opacity-30" alt="" />
    <div className="from-midnight-950/90 absolute inset-0 bg-gradient-to-t to-transparent" />
  </div>

  {/* Content */}
  <div className="relative z-10 w-full px-4 md:px-8">
    <div className="mx-auto max-w-7xl py-32">
      <div className="max-w-3xl space-y-8">
        <h1 className="font-display text-5xl font-bold text-white md:text-7xl lg:text-8xl">
          Discover Tenerife's Best Nights
        </h1>
        <p className="text-xl text-gray-300 md:text-2xl">
          Curated nightlife experiences from local experts
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="btn-primary">Explore Events</button>
          <button className="btn-secondary">For Organizers</button>
        </div>
      </div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <ChevronDown className="h-6 w-6 text-white/60" />
  </div>
</section>
```

#### B. Hero Section - Half Height with Image

**Use:** Event detail pages, venue pages  
**Purpose:** Visual appeal without overwhelming

```tsx
<section className="relative h-[60vh] min-h-[500px]">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img src="/event-cover.jpg" className="h-full w-full object-cover" alt="Event cover" />
    <div className="from-midnight-950 via-midnight-950/60 absolute inset-0 bg-gradient-to-t to-transparent" />
  </div>

  {/* Content - Bottom Aligned */}
  <div className="relative z-10 flex h-full items-end">
    <div className="w-full px-4 pb-12 md:px-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1 text-purple-300 backdrop-blur-sm">
            Techno
          </span>
          <span className="text-gray-300">Fri, Dec 15 • 23:00</span>
        </div>
        <h1 className="font-display text-4xl font-bold text-white md:text-6xl">
          Neon Nights: Underground Session
        </h1>
        <p className="text-xl text-gray-300">Papagayo Beach Club • Playa de las Américas</p>
      </div>
    </div>
  </div>
</section>
```

#### C. Content Section - Standard

**Use:** Most content sections  
**Purpose:** Consistent, readable content blocks

```tsx
<section className="py-16 md:py-24">
  <div className="mx-auto max-w-7xl px-4 md:px-8">
    {/* Section Header */}
    <header className="mb-12 space-y-4">
      <h2 className="font-display text-3xl font-bold text-white md:text-5xl">Trending This Week</h2>
      <p className="max-w-2xl text-lg text-gray-400">
        The hottest events happening right now in Tenerife
      </p>
    </header>

    {/* Section Content */}
    <div className="space-y-8">{/* Content here */}</div>
  </div>
</section>
```

#### D. Feature Section - Alternating Layout

**Use:** Homepage features, about sections  
**Purpose:** Visual interest, break monotony

```tsx
<section className="py-24">
  <div className="mx-auto max-w-7xl space-y-32 px-4 md:px-8">
    {/* Feature 1 - Image Left */}
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
        <img src="/feature-1.jpg" className="h-full w-full object-cover" alt="" />
      </div>
      <div className="space-y-6">
        <h3 className="font-display text-3xl font-bold text-white md:text-4xl">
          Curated by Local Experts
        </h3>
        <p className="text-lg leading-relaxed text-gray-400">
          Every event is handpicked by our team of nightlife specialists who know Tenerife inside
          out.
        </p>
        <button className="btn-primary">Learn More</button>
      </div>
    </div>

    {/* Feature 2 - Image Right */}
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="space-y-6 lg:order-1">
        <h3 className="font-display text-3xl font-bold text-white md:text-4xl">
          Smart Recommendations
        </h3>
        <p className="text-lg leading-relaxed text-gray-400">
          AI-powered suggestions based on your preferences and past experiences.
        </p>
        <button className="btn-primary">Explore</button>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:order-2">
        <img src="/feature-2.jpg" className="h-full w-full object-cover" alt="" />
      </div>
    </div>
  </div>
</section>
```

#### E. CTA Section - Centered

**Use:** End of page, conversion points  
**Purpose:** Drive action

```tsx
<section className="to-midnight-950 bg-gradient-to-br from-purple-950 py-24">
  <div className="mx-auto max-w-4xl space-y-8 px-4 text-center md:px-8">
    <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
      Ready to Experience Tenerife's Nightlife?
    </h2>
    <p className="text-xl text-gray-300">Join thousands discovering the best events every week</p>
    <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <button className="btn-primary btn-lg">Get Started</button>
      <button className="btn-secondary btn-lg">Learn More</button>
    </div>
  </div>
</section>
```

#### F. Footer Section

**Use:** Bottom of every page  
**Purpose:** Navigation, legal, social

```tsx
<footer className="bg-midnight-950 border-t border-white/5">
  <div className="mx-auto max-w-7xl px-4 md:px-8">
    {/* Main Footer */}
    <div className="grid grid-cols-2 gap-8 py-16 md:grid-cols-4 lg:gap-12">
      {/* Brand Column */}
      <div className="col-span-2 space-y-4">
        <img src="/logo.svg" alt="Tenerife Music" className="h-8" />
        <p className="max-w-xs text-gray-400">Tenerife's premier nightlife intelligence platform</p>
        <div className="flex gap-4">{/* Social icons */}</div>
      </div>

      {/* Links Columns */}
      <div className="space-y-4">
        <h3 className="font-semibold text-white">Discover</h3>
        <ul className="space-y-2 text-gray-400">
          <li>
            <a href="/events" className="transition-colors hover:text-white">
              Events
            </a>
          </li>
          <li>
            <a href="/venues" className="transition-colors hover:text-white">
              Venues
            </a>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-white">Company</h3>
        <ul className="space-y-2 text-gray-400">
          <li>
            <a href="/about" className="transition-colors hover:text-white">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="transition-colors hover:text-white">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-6 text-sm text-gray-500 md:flex-row">
      <p>© 2025 Tenerife Music. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="/privacy" className="transition-colors hover:text-gray-300">
          Privacy
        </a>
        <a href="/terms" className="transition-colors hover:text-gray-300">
          Terms
        </a>
      </div>
    </div>
  </div>
</footer>
```

### 2.3 Background Treatments

**Solid Color:**

```tsx
<section className="bg-midnight-950">
```

**Gradient:**

```tsx
<section className="bg-gradient-to-br from-midnight-950 via-midnight-900 to-purple-950">
```

**Image with Overlay:**

```tsx
<section className="relative">
  <div className="absolute inset-0 z-0">
    <img src="/bg.jpg" className="h-full w-full object-cover opacity-20" alt="" />
    <div className="bg-midnight-950/80 absolute inset-0" />
  </div>
  <div className="relative z-10">{/* Content */}</div>
</section>
```

**Glass-morphism:**

```tsx
<div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
  {/* Content */}
</div>
```

### 2.4 Section Transitions

**No Divider (Seamless):**

```tsx
<section className="py-24 bg-midnight-950">
<section className="py-24 bg-midnight-900">
```

**Gradient Transition:**

```tsx
<section className="py-24 bg-gradient-to-b from-midnight-950 to-midnight-900">
```

**Overlapping Elements:**

```tsx
<section className="py-24 bg-midnight-950">
  {/* Content */}
</section>

<section className="py-24 bg-midnight-900 -mt-32">
  <div className="max-w-7xl mx-auto px-4">
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
      {/* Overlapping card */}
    </div>
  </div>
</section>
```

---

## 3. Page Layout Patterns

### 3.1 Homepage Layout

**Structure:**

1. Hero (Full-height with CTA)
2. Featured Events (3-column grid)
3. Categories (Horizontal scroll)
4. Trending This Week (4-column grid)
5. Featured Venues (Alternating layout)
6. Newsletter CTA
7. Footer

**Code Structure:**

```tsx
<main>
  {/* 1. Hero Section */}
  <section className="from-midnight-950 flex min-h-screen items-center bg-gradient-to-br to-purple-950">
    <div className="mx-auto max-w-7xl px-4 py-32">
      <div className="max-w-3xl space-y-8">
        <h1 className="font-display text-7xl font-bold">Discover Tenerife's Best Nights</h1>
        <p className="text-2xl text-gray-300">Curated nightlife experiences from local experts</p>
        <div className="flex gap-4">
          <button className="btn-primary btn-lg">Explore Events</button>
          <button className="btn-secondary btn-lg">For Organizers</button>
        </div>
      </div>
    </div>
  </section>

  {/* 2. Featured Events */}
  <section className="py-24">
    <div className="mx-auto max-w-7xl px-4">
      <header className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="font-display mb-4 text-5xl font-bold">Featured Events</h2>
          <p className="text-lg text-gray-400">Handpicked by our experts</p>
        </div>
        <a href="/events" className="btn-ghost">
          View All →
        </a>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{/* Event cards */}</div>
    </div>
  </section>

  {/* 3. Categories */}
  <section className="bg-midnight-900/50 py-24">
    <div className="mx-auto max-w-7xl px-4">
      <header className="mb-12">
        <h2 className="font-display mb-4 text-5xl font-bold">Browse by Genre</h2>
      </header>

      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">{/* Category pills */}</div>
    </div>
  </section>

  {/* 4. Trending This Week */}
  <section className="py-24">
    <div className="mx-auto max-w-7xl px-4">
      <header className="mb-12">
        <h2 className="font-display mb-4 text-5xl font-bold">Trending This Week</h2>
        <p className="text-lg text-gray-400">Most popular events right now</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{/* Compact event cards */}</div>
    </div>
  </section>

  {/* 5. Featured Venues */}
  <section className="bg-midnight-900/50 py-24">
    <div className="mx-auto max-w-7xl px-4">
      <header className="mb-12">
        <h2 className="font-display mb-4 text-5xl font-bold">Top Venues</h2>
      </header>

      <div className="space-y-32">{/* Alternating image-text layouts */}</div>
    </div>
  </section>

  {/* 6. Newsletter CTA */}
  <section className="py-24">
    <div className="mx-auto max-w-4xl px-4 text-center">
      <h2 className="font-display mb-8 text-4xl font-bold">Never Miss a Beat</h2>
      <p className="mb-8 text-xl text-gray-400">Get weekly updates on the hottest events</p>
      <form className="mx-auto flex max-w-md gap-4">
        <input type="email" placeholder="your@email.com" className="input flex-1" />
        <button className="btn-primary">Subscribe</button>
      </form>
    </div>
  </section>

  {/* 7. Footer */}
  <footer>{/* Footer content */}</footer>
</main>
```

### 3.2 Event Listing Page

**Structure:**

1. Page Header with Search
2. Filters Sidebar + Event Grid
3. Pagination
4. Footer

**Code Structure:**

```tsx
<main>
  {/* Page Header */}
  <section className="from-midnight-900 to-midnight-950 bg-gradient-to-b pb-12 pt-32">
    <div className="mx-auto max-w-7xl px-4">
      <h1 className="font-display mb-8 text-6xl font-bold">All Events</h1>

      {/* Search Bar */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search events, venues, artists..."
          className="input w-full pl-12"
        />
      </div>
    </div>
  </section>

  {/* Filters + Grid */}
  <section className="py-12">
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters Sidebar */}
        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Date Filter */}
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Date</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="date" />
                  <span className="text-gray-400">Today</span>
                </label>
                {/* More options */}
              </div>
            </div>

            {/* Genre Filter */}
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Genre</h3>
              <div className="space-y-2">{/* Checkboxes */}</div>
            </div>
          </div>
        </aside>

        {/* Event Grid */}
        <div className="space-y-8">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <p className="text-gray-400">142 events found</p>
            <select className="input w-auto">
              <option>Sort by Date</option>
              <option>Sort by Popularity</option>
            </select>
          </div>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{/* Event cards */}</div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 pt-8">
            <button className="btn-ghost px-4">← Prev</button>
            <button className="btn-ghost px-4">1</button>
            <button className="btn-primary px-4">2</button>
            <button className="btn-ghost px-4">3</button>
            <button className="btn-ghost px-4">Next →</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
```

### 3.3 Event Detail Page

**Structure:**

1. Hero Image with Key Info
2. Sticky Booking Bar
3. Event Details (Description, Lineup, Venue Info)
4. Similar Events
5. Footer

**Code Structure:**

```tsx
<main>
  {/* Hero */}
  <section className="relative h-[60vh] min-h-[500px]">
    <div className="absolute inset-0">
      <img src="/event.jpg" className="h-full w-full object-cover" alt="" />
      <div className="from-midnight-950 via-midnight-950/60 absolute inset-0 bg-gradient-to-t to-transparent" />
    </div>

    <div className="relative z-10 flex h-full items-end">
      <div className="w-full px-4 pb-12">
        <div className="mx-auto max-w-7xl space-y-4">
          <div className="flex gap-3">
            <span className="badge badge-purple">Techno</span>
            <span className="text-gray-300">Fri, Dec 15 • 23:00</span>
          </div>
          <h1 className="font-display text-6xl font-bold">Neon Nights: Underground Session</h1>
          <p className="text-xl text-gray-300">Papagayo Beach Club • Playa de las Américas</p>
        </div>
      </div>
    </div>
  </section>
  {/* Sticky Booking Bar */}
  <div className="bg-midnight-900/95 sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl">
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-white">Neon Nights</p>
          <p className="text-sm text-gray-400">Fri, Dec 15 • 23:00</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">From</p>
            <p className="text-2xl font-bold text-white">€25</p>
          </div>
          <button className="btn-primary btn-lg">Get Tickets</button>
        </div>
      </div>
    </div>
  </div>
  {/* Content */}
  rell{" "}
  <section className="py-16">
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        {/* Main Content */}
        <div className="space-y-12">
          {/* Description */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold">About This Event</h2>
            <p className="leading-relaxed text-gray-400">{/* Description text */}</p>
          </div>

          {/* Lineup */}
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold">Lineup</h2>
            <div className="space-y-4">{/* Artist cards */}</div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Venue Info Card */}
          <div className="card space-y-4 p-6">
            <h3 className="text-xl font-semibold">Venue</h3>
            {/* Venue details */}
          </div>

          {/* Map */}
          <div className="aspect-square overflow-hidden rounded-2xl">
            <img src="/map.jpg" alt="Map" className="h-full w-full object-cover" />
          </div>
        </aside>
      </div>
    </div>
  </section>
  {/* Similar Events */}
  <section className="bg-midnight-900/50 py-16">
    <div className="mx-auto max-w-7xl px-4">
      <h2 className="font-display mb-8 text-4xl font-bold">Similar Events</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{/* Event cards */}</div>
    </div>
  </section>
</main>
```

### 3.4 Venue Page

**Structure:**

1. Hero Image + Venue Name
2. Venue Info + Gallery
3. Upcoming Events
4. Past Events
5. Footer

**Wireframe:**

```
[Hero Image - 50vh]
  ↓ Venue Name, Location, Rating overlaid

[Venue Info Section]
  [Left: Description + Amenities] [Right: Gallery Grid]

[Upcoming Events]
  [Event Grid - 4 columns]

[Past Events]
  [Event Grid - 4 columns with "View More" button]
```

### 3.5 Dashboard (Organizer)

**Structure:**

- Sidebar Navigation
- Top Header with Search
- Main Content Area
- Stats Cards + Charts

**Code Structure:**

```tsx
<div className="bg-midnight-950 flex h-screen">
  {/* Sidebar */}
  <aside className="bg-midnight-900 flex w-64 flex-col border-r border-white/5">
    <div className="p-6">
      <img src="/logo.svg" alt="Tenerife Music" className="h-8" />
    </div>
    <nav className="flex-1 space-y-1 px-4">
      <a href="/dashboard" className="nav-item active">
        <LayoutDashboard className="h-5 w-5" />
        <span>Dashboard</span>
      </a>
      {/* More nav items */}
    </nav>
  </aside>

  {/* Main Content */}
  <div className="flex flex-1 flex-col overflow-hidden">
    {/* Header */}
    <header className="bg-midnight-900/50 flex h-16 items-center justify-between border-b border-white/5 px-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Search..." className="input w-full pl-10" />
      </div>
      <div className="flex items-center gap-4">
        <button className="btn-ghost p-2">
          <Bell className="h-5 w-5" />
        </button>
        <button className="btn-ghost p-2">
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>

    {/* Content Area */}
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display mb-2 text-4xl font-bold">Dashboard</h1>
            <p className="text-gray-400">Welcome back, João</p>
          </div>
          <button className="btn-primary">Create Event</button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="card space-y-2 p-6">
            <p className="text-sm text-gray-400">Total Events</p>
            <p className="text-3xl font-bold">24</p>
            <p className="text-sm text-green-400">+12% vs last month</p>
          </div>
          {/* More stat cards */}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h3 className="mb-4 text-xl font-semibold">Ticket Sales</h3>
            {/* Chart */}
          </div>
          <div className="card p-6">
            <h3 className="mb-4 text-xl font-semibold">Revenue</h3>
            {/* Chart */}
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
```

### 3.6 Profile Page

**Structure:**

1. Profile Header (Cover + Avatar)
2. Tabs (About, Events, Favorites)
3. Tab Content
4. Footer

**Wireframe:**

```
[Cover Image - 30vh]
  ↓ [Avatar overlapping] Name, Bio

[Tabs: About | Events | Favorites]

[Tab Content Area]
  If "Events": Grid of user's events
  If "Favorites": Grid of saved events
  If "About": Bio text + stats
```

---

## 4. Grid System

### 4.1 Container System

**Max-Width Containers:**

```tsx
// Small content (forms, articles)
<div className="max-w-2xl mx-auto">  {/* 672px */}

// Medium content (landing pages)
<div className="max-w-4xl mx-auto">  {/* 896px */}

// Standard content (most pages)
<div className="max-w-7xl mx-auto">  {/* 1280px */}

// Full width (dashboards, tables)
<div className="max-w-[1600px] mx-auto">
```

**Always add horizontal padding:**

```tsx
<div className="max-w-7xl mx-auto px-4 md:px-8">
```

### 4.2 Column Layouts

**2-Column (50/50):**

```tsx
<div className="grid gap-8 md:grid-cols-2">
  <div>{/* Column 1 */}</div>
  <div>{/* Column 2 */}</div>
</div>
```

**3-Column (Equal):**

```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  <div>{/* Card */}</div>
  <div>{/* Card */}</div>
  <div>{/* Card */}</div>
</div>
```

**4-Column (Compact cards):**

```tsx
<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
  <div>{/* Compact card */}</div>
</div>
```

**6-Column (Category pills, small items):**

```tsx
<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  <div>{/* Small item */}</div>
</div>
```

**Asymmetric (Sidebar + Content):**

```tsx
// Filters + Content
<div className="grid lg:grid-cols-[280px_1fr] gap-8">
  <aside>{/* Filters */}</aside>
  <main>{/* Content */}</main>
</div>

// Content + Sidebar
<div className="grid lg:grid-cols-[1fr_400px] gap-12">
  <main>{/* Content */}</main>
  <aside>{/* Sidebar */}</aside>
</div>
```

### 4.3 Grid Gaps

**Context-based gaps:**

```tsx
// Tight (related items, small cards)
gap - 4; // 16px

// Standard (most grids)
gap - 6; // 24px

// Comfortable (large cards)
gap - 8; // 32px

// Generous (feature sections)
gap - 12; // 48px
```

**Responsive gaps:**

```tsx
<div className="grid gap-4 md:gap-6 lg:gap-8">
```

### 4.4 Auto-Fit vs Auto-Fill

**Auto-Fit (Cards expand to fill space):**

```tsx
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
  {/* Cards will grow to fill available space */}
</div>
```

**Auto-Fill (Cards stay minimum size, create more columns):**

```tsx
<div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
  {/* More columns as space allows */}
</div>
```

**When to use:**

- **Auto-fit:** Event cards, venue cards (want them larger on big screens)
- **Auto-fill:** Category pills, small thumbnails (want more items visible)

### 4.5 Asymmetric Grids

**Featured + Regular (1 large + grid):**

```tsx
<div className="grid gap-8 lg:grid-cols-2">
  {/* Featured - spans 1 row but twice the height */}
  <div className="lg:row-span-2">
    <div className="card h-full">{/* Large featured content */}</div>
  </div>

  {/* Regular items fill remaining space */}
  <div className="card">{/* Item 1 */}</div>
  <div className="card">{/* Item 2 */}</div>
</div>
```

**Pinterest-style (different heights):**

```tsx
<div className="columns-2 gap-6 space-y-6 md:columns-3 lg:columns-4">
  <div className="break-inside-avoid">
    <div className="card">{/* Content with natural height */}</div>
  </div>
  {/* More items */}
</div>
```

### 4.6 Masonry Layouts

**CSS Columns (Simplest):**

```tsx
<div className="columns-2 gap-6 md:columns-3 lg:columns-4">
  <div className="mb-6 break-inside-avoid">
    <div className="card">{/* Content */}</div>
  </div>
</div>
```

**Grid with row-span (More control):**

```tsx
<div className="grid auto-rows-[200px] grid-cols-3 gap-6">
  <div className="row-span-2">{/* Tall item */}</div>
  <div className="row-span-1">{/* Short item */}</div>
  <div className="row-span-3">{/* Very tall item */}</div>
</div>
```

---

## 5. Vertical Rhythm

### 5.1 Baseline Grid

**8px System Application:**

Every element's dimensions and spacing should be divisible by 8:

```
Line heights: 16px, 24px, 32px, 40px, 48px
Padding: 8px, 16px, 24px, 32px
Margins: 8px, 16px, 24px, 32px, 48px, 64px
Component heights: 40px, 48px, 56px, 64px
```

### 5.2 Line Height Consistency

**Typography Line Heights:**

```css
/* Display headings */
.text-7xl {
  line-height: 1.1;
} /* 96px → 105.6px ≈ 104px (13×8) */
.text-6xl {
  line-height: 1.1;
} /* 72px → 79.2px ≈ 80px (10×8) */
.text-5xl {
  line-height: 1.2;
} /* 48px → 57.6px ≈ 56px (7×8) */

/* Body headings */
.text-4xl {
  line-height: 1.2;
} /* 36px → 43.2px ≈ 48px (6×8) */
.text-3xl {
  line-height: 1.3;
} /* 30px → 39px ≈ 40px (5×8) */
.text-2xl {
  line-height: 1.4;
} /* 24px → 33.6px ≈ 32px (4×8) */

/* Body text */
.text-xl {
  line-height: 1.5;
} /* 20px → 30px */
.text-lg {
  line-height: 1.5;
} /* 18px → 27px ≈ 24px (3×8) */
.text-base {
  line-height: 1.5;
} /* 16px → 24px (3×8) */
.text-sm {
  line-height: 1.5;
} /* 14px → 21px ≈ 24px (3×8) */
```

### 5.3 Section Rhythm

**Consistent vertical spacing between sections:**

```tsx
<main>
  <section className="py-24">
    {" "}
    {/* 192px (24×8) */}
    {/* Section 1 */}
  </section>

  <section className="py-24">
    {" "}
    {/* 192px (24×8) */}
    {/* Section 2 */}
  </section>

  <section className="py-24">
    {" "}
    {/* 192px (24×8) */}
    {/* Section 3 */}
  </section>
</main>
```

**Internal section rhythm:**

```tsx
<section className="py-24">
  <div className="mx-auto max-w-7xl space-y-16 px-4">
    {" "}
    {/* 128px between major blocks */}
    <header className="space-y-4">
      {" "}
      {/* 32px title-description */}
      <h2 />
      <p />
    </header>
    <div className="space-y-8">
      {" "}
      {/* 64px between content groups */}
      {/* Content */}
    </div>
  </div>
</section>
```

### 5.4 Component Rhythm

**Card internal spacing:**

```tsx
<div className="card space-y-4 p-6">
  {" "}
  {/* 24px padding, 16px internal spacing */}
  <img />
  <div className="space-y-2">
    {" "}
    {/* 8px for tight groups */}
    <h3 />
    <p />
  </div>
  <div className="pt-4">
    {" "}
    {/* 16px separator before action */}
    <button />
  </div>
</div>
```

### 5.5 Visual Rhythm Rules

✅ **DO:**

- Maintain consistent spacing between similar elements
- Use space-y-\* utilities for stacked content
- Keep rhythm even when content varies
- Use padding/margin that's divisible by 8

❌ **DON'T:**

- Use arbitrary spacing (space-y-[13px])
- Mix different spacing for similar elements
- Ignore the 8px system

**Example - Good Rhythm:**

```tsx
<article className="space-y-6">
  {" "}
  {/* Consistent 24px spacing */}
  <h2 className="text-3xl" /> {/* ~40px line height */}
  <p className="text-lg" /> {/* 24px line height */}
  <p className="text-lg" /> {/* 24px line height */}
  <button className="h-12" /> {/* 48px height */}
</article>
```

---

## 6. Responsive Design Principles

### 6.1 Mobile-First Approach

**Start with mobile, enhance for larger screens:**

```tsx
// Mobile: Full width, stacked
// Tablet: 2 columns
// Desktop: 3 columns
<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-4
  md:gap-6
  lg:gap-8
">
```

**Why Mobile-First:**

- Forces priority decisions (what's essential?)
- Easier to add features than remove
- Better performance (progressive enhancement)
- Majority of users are mobile

### 6.2 Breakpoint Strategy

**Standard Breakpoints:**

```css
sm:  640px   → Large phones (landscape)
md:  768px   → Tablets
lg:  1024px  → Small laptops
xl:  1280px  → Desktops
2xl: 1536px  → Large desktops
```

**When to Change Layouts:**

**640px (sm):**

- Switch from 1 to 2 columns for small cards
- Show horizontal flex instead of stack
- Larger touch targets

**768px (md):**

- Switch from 1 to 2 columns for content
- Show sidebar navigation
- Increase font sizes
- More generous spacing

**1024px (lg):**

- Switch to 3-4 columns
- Show full desktop navigation
- Side-by-side layouts (image + text)
- Maximum font sizes

**1280px (xl):**

- 4+ columns where appropriate
- Maximum container widths
- More whitespace

### 6.3 Component Behavior

**Typography Scaling:**

```tsx
<h1 className="
  text-4xl      // 36px mobile
  md:text-5xl   // 48px tablet
  lg:text-7xl   // 72px desktop
  font-display
  font-bold
">
```

**Spacing Scaling:**

```tsx
<section className="
  py-12        // 48px mobile
  md:py-16     // 64px tablet
  lg:py-24     // 96px desktop
">
```

**Grid Adaptation:**

```tsx
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Hide/Show Elements:**

```tsx
// Mobile menu icon
<button className="lg:hidden">
  <Menu />
</button>

// Desktop navigation
<nav className="hidden lg:flex gap-8">
```

**Stack to Row:**

```tsx
<div className="flex flex-col gap-4 md:flex-row">
  <button />
  <button />
</div>
```

### 6.4 Navigation Patterns

**Mobile Navigation:**

```tsx
<header className="bg-midnight-900/95 fixed top-0 z-50 w-full backdrop-blur-xl">
  <div className="flex items-center justify-between px-4 py-4">
    <img src="/logo.svg" className="h-8" alt="Tenerife Music" />

    {/* Mobile menu button */}
    <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
      <Menu className="h-6 w-6" />
    </button>

    {/* Desktop nav */}
    <nav className="hidden items-center gap-8 lg:flex">
      <a href="/events">Events</a>
      <a href="/venues">Venues</a>
      <button className="btn-primary">Sign In</button>
    </nav>
  </div>

  {/* Mobile drawer */}
  {menuOpen && (
    <div className="bg-midnight-950 fixed inset-0 z-50 lg:hidden">
      <div className="flex justify-between p-4">
        <img src="/logo.svg" className="h-8" alt="Tenerife Music" />
        <button onClick={() => setMenuOpen(false)}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="space-y-4 p-4">
        <a href="/events" className="block py-3 text-xl">
          Events
        </a>
        <a href="/venues" className="block py-3 text-xl">
          Venues
        </a>
        <button className="btn-primary mt-8 w-full">Sign In</button>
      </nav>
    </div>
  )}
</header>
```

**Tablet Navigation:**

```tsx
// Condensed horizontal nav with dropdowns
<nav className="hidden items-center gap-4 md:flex lg:hidden">
  <button>Events ▾</button>
  <button>Venues ▾</button>
</nav>
```

### 6.5 Image Handling

**Responsive Images:**

```tsx
<img
  src="/event-large.jpg"
  srcSet="
    /event-small.jpg 640w,
    /event-medium.jpg 1024w,
    /event-large.jpg 1920w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Event"
  className="h-full w-full object-cover"
/>
```

**Aspect Ratios:**

```tsx
// Maintain aspect ratio across screens
<div className="aspect-[16/9]">
  <img src="/event.jpg" className="w-full h-full object-cover" alt="" />
</div>

// Different ratios per breakpoint
<div className="aspect-square md:aspect-video">
  <img src="/event.jpg" className="w-full h-full object-cover" alt="" />
</div>
```

**Background Images:**

```tsx
<div
  className="h-screen bg-cover bg-center"
  style={{
    backgroundImage: `url('/hero-mobile.jpg')`,
  }}
>
  {/* Mobile background */}
</div>

// Better: Use CSS media queries for different images
<div className="hero-bg">
```

```css
.hero-bg {
  background-image: url("/hero-mobile.jpg");
}

@media (min-width: 768px) {
  .hero-bg {
    background-image: url("/hero-tablet.jpg");
  }
}

@media (min-width: 1024px) {
  .hero-bg {
    background-image: url("/hero-desktop.jpg");
  }
}
```

### 6.6 Typography Scaling

**Fluid Typography (Scales smoothly):**

```tsx
<h1 className="
  text-[clamp(2.5rem,5vw,5rem)]  // 40px → 80px fluid
  font-display
  font-bold
">
```

**Stepped Typography (Clear breakpoints):**

```tsx
<h1 className="
  text-4xl       // 36px mobile
  sm:text-5xl    // 48px large phone
  md:text-6xl    // 60px tablet
  lg:text-7xl    // 72px desktop
  xl:text-8xl    // 96px large desktop
">
```

**Body Text Scaling:**

```tsx
<p className="
  text-base      // 16px mobile
  md:text-lg     // 18px tablet+
  leading-relaxed
">
```

### 6.7 Touch Targets

**Minimum Sizes for Mobile:**

```tsx
// Buttons - minimum 44×44px
<button className="
  min-h-[44px]
  px-6
  btn-primary
">

// Icons - minimum 44×44px tap area
<button className="
  p-3           // 12px padding = 48×48px total (24px icon + padding)
  -m-3          // Negative margin to maintain visual spacing
">
  <Icon className="w-6 h-6" />
</button>

// Form inputs - minimum 44px height
<input className="
  h-12          // 48px height
  px-4
  input
">
```

**Spacing Between Touch Targets:**

```tsx
// Minimum 8px gap between tappable elements
<div className="flex gap-2">
  <button />
  <button />
</div>
```

### 6.8 Responsive Code Examples

**Complete Event Card - Mobile to Desktop:**

```tsx
<article className="card overflow-hidden transition-all hover:shadow-2xl">
  {/* Image - 16:9 on mobile, 4:3 on desktop */}
  <div className="relative aspect-video overflow-hidden md:aspect-[4/3]">
    <img
      src="/event.jpg"
      className="h-full w-full object-cover transition-transform hover:scale-105"
      alt="Event"
    />
    <div className="absolute left-4 top-4">
      <span className="badge badge-purple">Techno</span>
    </div>
  </div>

  {/* Content - scales padding and spacing */}
  <div className="// 16px → 24px padding // 12px → 16px spacing space-y-3 p-4 md:space-y-4 md:p-6">
    {/* Date */}
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <Calendar className="h-4 w-4" />
      <span>Fri, Dec 15 • 23:00</span>
    </div>

    {/* Title - scales text size */}
    <h3 className="line-clamp-2 text-lg font-semibold md:text-xl lg:text-2xl">
      Neon Nights: Underground Session
    </h3>

    {/* Location */}
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <MapPin className="h-4 w-4" />
      <span>Papagayo Beach Club</span>
    </div>

    {/* CTA - full width on mobile, auto on desktop */}
    <div className="flex gap-3 pt-4">
      <button className="btn-primary flex-1 md:flex-none">Get Tickets</button>
      <button className="btn-ghost p-3">
        <Heart className="h-5 w-5" />
      </button>
    </div>
  </div>
</article>
```

---

## 7. Content Hierarchy

### 7.1 Visual Weight

**Creating hierarchy with size, color, weight:**

**Primary (Most Important):**

```tsx
<h1 className="font-display text-7xl font-bold text-white">Main Heading</h1>
```

**Secondary:**

```tsx
<h2 className="font-display text-5xl font-bold text-white">Section Heading</h2>
```

**Tertiary:**

```tsx
<h3 className="text-3xl font-semibold text-white">Subsection</h3>
```

**Body:**

```tsx
<p className="text-lg text-gray-400">Supporting text</p>
```

**Meta (Least Important):**

```tsx
<span className="text-sm text-gray-500">Timestamp, labels</span>
```

### 7.2 F-Pattern and Z-Pattern

**F-Pattern (Content-heavy pages):**

```
[Logo]  [Navigation →→→→→→→→→]
[Large Headline →→→→→]
[Body text →→→→]
[Subheading →→]
[Body text →→→]
[Image]  [Body text →]
```

**Z-Pattern (Landing pages):**

```
[Logo] →→→→→→→→→→→ [CTA Button]
          ↘
    [Hero Image + Headline]
  ↙
[Feature 1] [Feature 2] [Feature 3]
                              ↓
                      [CTA Button]
```

**Application:**

```tsx
// F-Pattern (Blog/Article)
<article>
  <header className="mb-8">
    <h1 className="text-6xl mb-4">{/* Strong left alignment */}</h1>
    <p className="text-xl text-gray-400">{/* Left-aligned description */}</p>
  </header>
  <div className="prose">
    {/* Left-aligned body text */}
  </div>
</article>

// Z-Pattern (Landing Page)
<section>
  <header className="flex justify-between">  {/* Logo left, CTA right */}
    <Logo />
    <Button />
  </header>
  <div className="text-center">  {/* Center hero */}
    <h1 />
  </div>
  <div className="flex justify-end">  {/* CTA right */}
    <Button />
  </div>
</section>
```

### 7.3 Focal Points

**Creating emphasis:**

**Size:**

```tsx
<div className="space-y-4">
  <h2 className="text-5xl">Primary (5× larger than body)</h2>
  <p className="text-lg">Body text</p>
</div>
```

**Color:**

```tsx
<div>
  <h3 className="text-white">High contrast (important)</h3>
  <p className="text-gray-400">Lower contrast (supporting)</p>
  <span className="text-gray-600">Lowest contrast (meta)</span>
</div>
```

**Isolation (Whitespace):**

```tsx
<div className="py-24">
  {" "}
  {/* Generous whitespace around focal point */}
  <div className="space-y-8 text-center">
    <h1 className="text-7xl">Isolated = Important</h1>
  </div>
</div>
```

**Visual Treatment:**

```tsx
// Gradient text for emphasis
<h1 className="text-7xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
  Featured Event
</h1>

// Glow effect for emphasis
<button className="btn-primary shadow-[0_0_30px_rgba(168,85,247,0.4)]">
  Important CTA
</button>
```

### 7.4 Grouping

**Related content proximity:**

**Good - Clear Groups:**

```tsx
<article className="card space-y-6 p-6">
  {/* Group 1: Header */}
  <div className="space-y-2">
    <h3 className="text-2xl font-semibold">Event Title</h3>
    <p className="text-sm text-gray-400">Subtitle</p>
  </div>

  {/* Group 2: Meta info */}
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-sm">
      <Calendar /> <span>Date</span>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <MapPin /> <span>Location</span>
    </div>
  </div>

  {/* Group 3: Action */}
  <div className="border-t border-white/5 pt-4">
    <button className="btn-primary">Get Tickets</button>
  </div>
</article>
```

**Bad - No Clear Groups:**

```tsx
<article className="card space-y-3 p-6">
  <h3>Event Title</h3>
  <div>
    <Calendar /> Date
  </div>
  <p>Subtitle</p>
  <div>
    <MapPin /> Location
  </div>
  <button>Get Tickets</button>
  {/* Everything has equal spacing = no hierarchy */}
</article>
```

### 7.5 Alignment

**Consistent alignment creates order:**

**Left-Aligned (Default for content):**

```tsx
<article className="text-left">
  <h2>Heading</h2>
  <p>Body text naturally left-aligns for readability</p>
</article>
```

**Center-Aligned (Hero sections, CTAs):**

```tsx
<section className="text-center">
  <h1>Main Heading</h1>
  <p>Centered for emphasis and balance</p>
  <button>CTA</button>
</section>
```

**Right-Aligned (Rare, for effect):**

```tsx
<div className="text-right">
  <p className="text-sm text-gray-400">Meta info</p>
  <p className="text-3xl font-bold">$125</p>
</div>
```

**Grid Alignment:**

```tsx
// Items align to grid
<div className="grid grid-cols-3 gap-6">
  <div className="card">{/* Aligned to grid */}</div>
  <div className="card">{/* Aligned to grid */}</div>
  <div className="card">{/* Aligned to grid */}</div>
</div>

// Vertical alignment in flex
<div className="flex items-start">     {/* Top-aligned */}
<div className="flex items-center">   {/* Center-aligned */}
<div className="flex items-end">      {/* Bottom-aligned */}
```

---

## 8. Common Layout Mistakes

### ❌ Inconsistent Spacing

**Bad:**

```tsx
<section className="py-16">     {/* 64px top/bottom */}
  <section className="py-12">  {/* 48px - why different? */}
    <section className="py-8"> {/* 32px - inconsistent! */}
```

**Good:**

```tsx
<section className="py-24">    {/* Consistent section spacing */}
  <section className="py-24">
    <section className="py-24">
```

### ❌ Lack of Whitespace

**Bad:**

```tsx
<div className="space-y-1 p-2">
  {" "}
  {/* Cramped, feels cheap */}
  <h3 className="text-sm">Title</h3>
  <p className="text-xs">Description</p>
  <button className="text-xs">Action</button>
</div>
```

**Good:**

```tsx
<div className="space-y-4 p-6">
  {" "}
  {/* Breathing room, feels premium */}
  <h3 className="text-xl">Title</h3>
  <p className="text-base">Description</p>
  <button className="mt-2">Action</button>
</div>
```

### ❌ Poor Responsive Behavior

**Bad:**

```tsx
<div className="grid grid-cols-4">
  {" "}
  {/* 4 columns on mobile = tiny! */}
  <div>Card</div>
</div>
```

**Good:**

```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
  <div>Card</div>
</div>
```

### ❌ Misaligned Elements

**Bad:**

```tsx
<div>
  <h2 className="text-center">Heading</h2> {/* Center */}
  <p className="text-left">Body</p> {/* Left */}
  <button className="float-right">CTA</button> {/* Right - chaos! */}
</div>
```

**Good:**

```tsx
<div className="text-center">
  {" "}
  {/* Consistent center alignment */}
  <h2>Heading</h2>
  <p>Body</p>
  <button>CTA</button>
</div>
```

### ❌ Overcrowded Layouts

**Bad:**

```tsx
<section className="p-4">
  <div className="grid grid-cols-5 gap-2">
    {" "}
    {/* Too many columns, too tight */}
    {events.map((event) => (
      <div className="p-1">
        {" "}
        {/* No room to breathe */}
        <img className="w-full" />
        <h3 className="truncate text-xs">{event.title}</h3>
      </div>
    ))}
  </div>
</section>
```

**Good:**

```tsx
<section className="py-16">
  <div className="mx-auto max-w-7xl px-4">
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {" "}
      {/* Fewer, bigger, clearer */}
      {events.map((event) => (
        <article className="card p-6">
          {" "}
          {/* Generous spacing */}
          <img className="aspect-video w-full object-cover" />
          <h3 className="mt-4 text-xl">{event.title}</h3>
        </article>
      ))}
    </div>
  </div>
</section>
```

### ❌ Ignoring Container Constraints

**Bad:**

```tsx
<section className="py-16">
  <div className="px-4">
    {" "}
    {/* Content spans full width on ultra-wide screens */}
    <h2>Super long heading that stretches across a 4K monitor making it impossible to read</h2>
  </div>
</section>
```

**Good:**

```tsx
<section className="py-16">
  <div className="mx-auto max-w-7xl px-4">
    {" "}
    {/* Constrained, centered, readable */}
    <h2>Heading stays at readable width</h2>
  </div>
</section>
```

### ❌ Inconsistent Card Patterns

**Bad:**

```tsx
// Event card 1
<div className="p-6 space-y-4">
  <img />
  <h3 />
</div>

// Event card 2 (different padding/spacing!)
<div className="p-4 space-y-2">
  <img />
  <h3 />
</div>
```

**Good:**

```tsx
// Consistent card component
const EventCard = ({ event }) => (
  <article className="card space-y-4 p-6">
    {" "}
    {/* Always same spacing */}
    <img />
    <h3 />
  </article>
);
```

---

# PART 2: BRAND VOICE GUIDE

## 9. Brand Essence

### 9.1 Core Identity

**Tenerife Music is:** Tenerife's premier **nightlife intelligence platform**

Not just an event listing site. Not a ticket marketplace. But a sophisticated, curated platform that provides **intelligence** about Tenerife's nightlife scene.

**What this means:**

- Curated, not comprehensive (quality over quantity)
- Expert insights, not just event listings
- Local knowledge, not generic database
- Premium experience, not utilitarian tool

### 9.2 Brand Pillars

#### 1. Discovery

**What it means:** Helping people find their perfect night out  
**How it manifests:**

- Intelligent search and filtering
- Personalized recommendations
- "You might like" suggestions
- Discover section showcasing hidden gems
- Editorial picks from local experts

**Voice:** "Discover what others miss"

#### 2. Sophistication

**What it means:** Premium experience throughout  
**How it manifests:**

- Clean, uncluttered design
- High-quality imagery
- Smooth animations
- Attention to detail
- Professional polish

**Voice:** "Elevated, never pretentious"

#### 3. Local Expertise

**What it means:** Insider knowledge of Tenerife's scene  
**How it manifests:**

- Curated event selection
- Local team verification
- Venue insights
- Neighborhood guides
- "Local favorite" badges

**Voice:** "Your insider guide"

#### 4. Community

**What it means:** Connecting people through music and nightlife  
**How it manifests:**

- User reviews and ratings
- Friend activity feeds
- Shared experiences
- Organizer/artist profiles
- Social features

**Voice:** "Where the island comes alive"

### 9.3 Brand Promise

**"Never miss the perfect night out"**

**What we promise:**

- Every event is vetted and quality-assured
- You'll always know what's happening
- Recommendations match your taste
- Information is always accurate and up-to-date
- Booking is seamless and secure

**What we don't promise:**

- We don't list every event (curated selection)
- We're not the cheapest (premium positioning)
- We're not for everyone (nightlife focus)

---

## 10. Visual Mood & Aesthetic

### 10.1 Mood Descriptors

**Primary Moods:**

1. **Premium** - High-quality, refined, sophisticated
2. **Minimalistic** - Clean, uncluttered, focused
3. **Modern** - Contemporary, forward-thinking, fresh
4. **Sophisticated** - Elegant, tasteful, mature
5. **Energetic (but refined)** - Vibrant without being chaotic

**NOT:**

- Loud, overwhelming, chaotic
- Generic, corporate, cold
- Playful, whimsical, casual
- Technical, complex, dense

### 10.2 Visual References

**Tidal's Elegance:**

- High-quality album artwork display
- Generous whitespace
- Refined typography
- Subtle animations
- Focus on content, not UI chrome

**Apple Music's Clarity:**

- Clean information hierarchy
- Clear CTAs
- Smooth transitions
- Intuitive navigation
- Glass-morphism effects

**Spotify for Artists' Functionality:**

- Data visualization
- Dashboard clarity
- Professional tools
- Actionable insights
- Dark mode optimization

### 10.3 Nightlife Aesthetic

**How to balance sophistication with nightlife energy:**

**✅ DO:**

- Use dark backgrounds (midnight blues, deep purples)
- Add subtle neon accents (purple, electric blue)
- Use glass-morphism for depth
- Implement smooth, fluid animations
- Show high-quality event photography
- Use gradients sparingly for effect

**❌ DON'T:**

- Use harsh, bright neon everywhere
- Add flashing or pulsing animations
- Use club flyer aesthetics
- Overuse effects (glow, shadows, gradients)
- Show low-quality party photos

**Color Application:**

```tsx
// Primary background - sophisticated dark
bg-midnight-950   // #0a0a12

// Subtle highlights - refined energy
bg-purple-500/10  // Purple with 10% opacity
border-purple-500/30

// Accents - controlled energy
text-purple-400   // Electric purple for interactive elements
text-blue-400     // Electric blue for secondary accents

// Glass-morphism - modern depth
bg-white/5 backdrop-blur-xl border-white/10
```

**Example - Event Card (Sophisticated Nightlife):**

```tsx
<article className="// Subtle glass effect // Soft, modern corners // Subtle interaction // Subtle glow group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
  {/* High-quality image */}
  <div className="relative aspect-video overflow-hidden">
    <img
      src="/event.jpg"
      className="// Smooth, slow zoom h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      alt=""
    />
    {/* Subtle gradient overlay */}
    <div className="from-midnight-950/80 absolute inset-0 bg-gradient-to-t to-transparent" />

    {/* Refined badge */}
    <div className="absolute left-4 top-4">
      <span className="// Subtle background rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1 text-sm text-purple-300 backdrop-blur-md">
        Techno
      </span>
    </div>
  </div>

  <div className="p-6">{/* Clean, sophisticated typography */}</div>
</article>
```

### 10.4 What to Avoid

❌ **Harsh Colors:**

```tsx
// TOO BRIGHT
<div className="bg-red-500 text-yellow-300">
```

✅ **Refined Colors:**

```tsx
// SOPHISTICATED
<div className="bg-purple-500/10 text-purple-300">
```

❌ **Cluttered Layouts:**

```tsx
// TOO BUSY
<div className="p-2 space-y-1 border-4 shadow-2xl">
```

✅ **Clean Layouts:**

```tsx
// BREATHING ROOM
<div className="p-8 space-y-6 border border-white/10">
```

❌ **Generic Stock Photos:**

```tsx
// Generic party photo with fake models
<img src="/generic-party.jpg" />
```

✅ **Authentic Event Photography:**

```tsx
// Real event, real venue, real energy
<img src="/authentic-event.jpg" />
```

❌ **Overly Technical:**

```tsx
// Looks like a developer tool
<div className="border-2 border-blue-500 font-mono">Event ID: evt_1234567890</div>
```

✅ **User-Friendly:**

```tsx
// Clean, understandable
<div className="card">
  <h3>Neon Nights</h3>
  <p>Techno • Tonight • 11 PM</p>
</div>
```

---

## 11. UX Character & Personality

### 11.1 Tone of Voice

The interface should feel like a **knowledgeable local friend** who knows the nightlife scene inside out.

**Confident but not arrogant:**

```tsx
// ✅ Confident
<h1>The Best Events This Weekend</h1>  // Curated by experts

// ❌ Arrogant
<h1>The ONLY Events Worth Your Time</h1>  // Too aggressive
```

**Helpful but not patronizing:**

```tsx
// ✅ Helpful
<p>New to Tenerife? Start with our Top Picks →</p>

// ❌ Patronizing
<p>Don't know where to go? Let us show you how nightlife works.</p>
```

**Sophisticated but not pretentious:**

```tsx
// ✅ Sophisticated
<p>Curated experiences from Tenerife's vibrant nightlife scene</p>

// ❌ Pretentious
<p>An exquisite soirée for the discerning patron of nocturnal arts</p>
```

**Energetic but not chaotic:**

```tsx
// ✅ Energetic
<button className="btn-primary">Explore Tonight's Events</button>

// ❌ Chaotic
<button className="animate-pulse bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
  🔥 HOT EVENTS!!! CLICK NOW!!! 🎉
</button>
```

### 11.2 Interaction Style

**Smooth and Responsive:**

- All interactions have smooth transitions (300-500ms)
- Hover states are subtle but noticeable
- Loading states are elegant (shimmer, not spinners)
- Feedback is immediate

**Examples:**

```tsx
// Button interaction
<button className="
  btn-primary
  transition-all duration-300
  hover:scale-105
  hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]
  active:scale-95
">
```

```tsx
// Card interaction
<article className="
  card
  transition-all duration-500
  hover:shadow-2xl
  hover:-translate-y-1
  cursor-pointer
">
```

**Delightful Micro-Interactions:**

```tsx
// Heart favorite with animation
const [isFavorite, setIsFavorite] = useState(false);

<button
  onClick={() => setIsFavorite(!isFavorite)}
  className="transition-transform active:scale-125"
>
  <Heart
    className={`h-6 w-6 transition-all duration-300 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} `}
  />
</button>;
```

### 11.3 Error Handling

**Friendly, Clear, Solution-Oriented:**

❌ **Bad Error:**

```tsx
<div className="text-red-500">Error 404: Resource not found</div>
```

✅ **Good Error:**

```tsx
<div className="card space-y-4 p-8 text-center">
  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
    <SearchX className="h-8 w-8 text-purple-400" />
  </div>
  <h3 className="text-2xl font-semibold">Event Not Found</h3>
  <p className="text-gray-400">This event might have ended or been cancelled.</p>
  <div className="flex justify-center gap-4">
    <button className="btn-primary">Browse Events</button>
    <button className="btn-ghost">Go Home</button>
  </div>
</div>
```

**Form Validation - Helpful:**

```tsx
// ❌ Harsh
<p className="text-red-500">Invalid email!</p>

// ✅ Helpful
<p className="text-purple-400 text-sm flex items-center gap-2">
  <Info className="w-4 h-4" />
  Please enter a valid email address
</p>
```

### 11.4 Empty States

**Encouraging and Actionable:**

❌ **Bad Empty State:**

```tsx
<div>No events found</div>
```

✅ **Good Empty State:**

```tsx
<div className="space-y-6 py-16 text-center">
  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/10">
    <Calendar className="h-12 w-12 text-purple-400" />
  </div>
  <div className="space-y-2">
    <h3 className="text-2xl font-semibold">No Events Yet</h3>
    <p className="mx-auto max-w-sm text-gray-400">
      Be the first to discover what's happening. Check back soon or explore other dates.
    </p>
  </div>
  <div className="flex justify-center gap-4">
    <button className="btn-primary">Browse All Events</button>
    <button className="btn-ghost">View Past Events</button>
  </div>
</div>
```

**Search No Results:**

```tsx
<div className="space-y-6 py-16 text-center">
  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/10">
    <Search className="h-12 w-12 text-purple-400" />
  </div>
  <div className="space-y-2">
    <h3 className="text-2xl font-semibold">No Results for "{query}"</h3>
    <p className="mx-auto max-w-sm text-gray-400">Try adjusting your filters or search terms</p>
  </div>
  <div className="space-y-2">
    <p className="text-sm text-gray-500">Suggestions:</p>
    <div className="flex flex-wrap justify-center gap-2">
      <button className="badge badge-purple">Techno</button>
      <button className="badge badge-purple">House</button>
      <button className="badge badge-purple">This Weekend</button>
    </div>
  </div>
</div>
```

### 11.5 Loading States

**Premium Shimmer Effects (not spinners):**

```tsx
// Event Card Skeleton
<div className="card overflow-hidden">
  <div className="aspect-video bg-white/5 animate-pulse relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer" />
  </div>
  <div className="p-6 space-y-4">
    <div className="h-4 bg-white/5 rounded-full w-20 animate-pulse" />
    <div className="h-6 bg-white/10 rounded-full w-3/4 animate-pulse" />
    <div className="h-4 bg-white/5 rounded-full w-1/2 animate-pulse" />
  </div>
</div>

// CSS for shimmer
<style jsx>{`
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .shimmer {
    animation: shimmer 2s infinite;
  }
`}</style>
```

**Page Loading:**

```tsx
// Not: Generic spinner
<div className="flex justify-center">
  <Spinner />
</div>

// Instead: Branded loading experience
<div className="min-h-screen flex items-center justify-center">
  <div className="space-y-4 text-center">
    <img src="/logo.svg" className="h-12 mx-auto opacity-50 animate-pulse" />
    <p className="text-sm text-gray-500">Loading your nightlife...</p>
  </div>
</div>
```

### 11.6 Success States

**Celebratory but Subtle:**

```tsx
// Ticket purchase success
<div className="card space-y-6 border-2 border-green-500/20 bg-green-500/5 p-8 text-center">
  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
    <Check className="h-10 w-10 text-green-400" />
  </div>
  <div className="space-y-2">
    <h3 className="font-display text-3xl font-bold">You're In! 🎉</h3>
    <p className="text-gray-300">
      Your tickets for <strong>Neon Nights</strong> are confirmed
    </p>
  </div>
  <div className="space-y-3">
    <p className="text-sm text-gray-400">Confirmation sent to your email</p>
    <div className="flex justify-center gap-4">
      <button className="btn-primary">View Tickets</button>
      <button className="btn-ghost">Back to Events</button>
    </div>
  </div>
</div>
```

**Micro-success (form save, favorite added):**

```tsx
// Toast notification
<div className="animate-slide-up fixed bottom-4 right-4 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/20 p-4 backdrop-blur-xl">
  <Check className="h-5 w-5 text-green-400" />
  <p className="text-green-300">Added to favorites</p>
</div>
```

---

## 12. Emotional Tone

### 12.1 Primary Emotions to Evoke

**1. Excitement** (about discovering events)

- Use dynamic imagery
- Show vibrant event photos
- Highlight "trending" and "popular"
- Use phrases like "Don't miss" and "Happening now"

**2. Confidence** (in making choices)

- Provide clear information
- Show ratings and reviews
- Display venue details
- Use trust signals (verified, curated)

**3. Sophistication** (premium experience)

- Clean, spacious layouts
- High-quality visuals
- Refined typography
- Smooth interactions

**4. Belonging** (part of a community)

- Show social proof ("124 people going")
- Friend activity
- User reviews
- Shared experiences

### 12.2 User Journey Emotions

**Discovery Phase:** _Curiosity + Excitement_

```tsx
// Homepage hero
<h1 className="text-7xl font-display font-bold">
  What's Your Vibe Tonight?
</h1>
<p className="text-xl text-gray-300">
  Discover Tenerife's best-kept nightlife secrets
</p>
```

**Exploration Phase:** _Interest + Engagement_

```tsx
// Event browsing
<div className="space-y-4">
  <h2 className="font-display text-4xl">Trending This Week</h2>
  <p className="text-gray-400">The hottest events everyone's talking about</p>
</div>
```

**Decision Phase:** _Confidence + Clarity_

```tsx
// Event detail
<div className="card p-6">
  <div className="flex items-center gap-2 text-green-400">
    <Check className="h-5 w-5" />
    <span>Verified Event</span>
  </div>
  <div className="flex items-center gap-2">
    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
    <span>4.8 (234 reviews)</span>
  </div>
</div>
```

**Booking Phase:** _Ease + Trust_

```tsx
// Checkout
<div className="space-y-4">
  <h2 className="text-2xl font-semibold">Secure Checkout</h2>
  <div className="flex items-center gap-2 text-sm text-gray-400">
    <Shield className="h-4 w-4" />
    <span>Your payment is secure and encrypted</span>
  </div>
</div>
```

**Post-Booking Phase:** _Anticipation + Satisfaction_

```tsx
// Confirmation
<div className="space-y-4">
  <h2 className="font-display text-3xl">See You There! 🎉</h2>
  <p className="text-gray-300">Get ready for an unforgettable night</p>
  <button className="btn-primary">Add to Calendar</button>
</div>
```

### 12.3 Emotional Tone Matrix

| Context       | Emotion                  | Implementation                                   |
| ------------- | ------------------------ | ------------------------------------------------ |
| Homepage Hero | Excitement, Possibility  | Large imagery, dynamic copy, bold CTA            |
| Event Browse  | Curiosity, Engagement    | Rich filtering, visual cards, trending labels    |
| Event Detail  | Interest, Trust          | Detailed info, reviews, venue details, clear CTA |
| Checkout      | Confidence, Security     | Clear pricing, trust signals, simple form        |
| Confirmation  | Joy, Anticipation        | Celebratory tone, next steps, share options      |
| Error         | Understanding, Solution  | Friendly message, clear action, no blame         |
| Empty State   | Encouragement, Direction | Helpful copy, clear action, alternative paths    |

---

## 13. Content Guidelines

### 13.1 Microcopy Principles

**Clear, Concise, Helpful**

❌ **Verbose:**

```
"Click on the button below in order to proceed with viewing all of the available events"
```

✅ **Concise:**

```
"View All Events"
```

**Action-Oriented, Not Passive:**

❌ **Passive:**

```
"Events can be viewed here"
```

✅ **Active:**

```
"Browse Events"
```

**Specific, Not Generic:**

❌ **Generic:**

```
"Click here"
"Submit"
"OK"
```

✅ **Specific:**

```
"Get Tickets"
"Save Event"
"Create Account"
```

### 13.2 Button Labels

**Primary Actions (Strong verbs):**

```tsx
// ✅ Good button labels
<button>Get Tickets</button>
<button>Explore Events</button>
<button>Save to Favorites</button>
<button>Book Now</button>
<button>Create Event</button>
<button>View Details</button>

// ❌ Bad button labels
<button>Click Here</button>
<button>Submit</button>
<button>OK</button>
<button>Continue</button>  // Too generic
```

**Secondary Actions (Supporting verbs):**

```tsx
// ✅ Good secondary labels
<button>Learn More</button>
<button>View All</button>
<button>Back to Events</button>
<button>Skip for Now</button>

// ❌ Bad secondary labels
<button>Cancel</button>  // Use "Skip" or "Back" instead
<button>No Thanks</button>  // Too casual
```

### 13.3 Error Messages

**Solution-Focused, Friendly:**

❌ **Bad Error Messages:**

```
"Error 500: Internal server error"
"Invalid input"
"Authentication failed"
"Permission denied"
```

✅ **Good Error Messages:**

```tsx
// Server error
<div>
  <h3>Something Went Wrong</h3>
  <p>We're having trouble loading this page. Please try again in a moment.</p>
  <button>Retry</button>
  <button>Go Home</button>
</div>

// Form validation
<p>Please enter a valid email address (e.g., you@example.com)</p>

// Authentication
<div>
  <h3>Login Required</h3>
  <p>Sign in to save events and get personalized recommendations</p>
  <button>Sign In</button>
  <button>Create Account</button>
</div>

// Permission
<div>
  <h3>Access Restricted</h3>
  <p>This page is only available to event organizers.</p>
  <button>Become an Organizer</button>
</div>
```

### 13.4 Empty States

**Encouraging, Actionable:**

✅ **Good Empty States:**

```tsx
// No saved events
<div className="text-center py-16 space-y-4">
  <Heart className="w-16 h-16 mx-auto text-gray-600" />
  <h3 className="text-2xl font-semibold">No Favorites Yet</h3>
  <p className="text-gray-400 max-w-sm mx-auto">
    Start saving events you're interested in to find them easily later
  </p>
  <button className="btn-primary">Explore Events</button>
</div>

// No search results
<div className="text-center py-16 space-y-4">
  <Search className="w-16 h-16 mx-auto text-gray-600" />
  <h3 className="text-2xl font-semibold">No Events Match Your Search</h3>
  <p className="text-gray-400 max-w-sm mx-auto">
    Try different keywords or filters
  </p>
  <div className="space-y-2">
    <p className="text-sm text-gray-500">Popular searches:</p>
    <div className="flex gap-2 justify-center">
      <button className="badge badge-purple">Techno</button>
      <button className="badge badge-purple">This Weekend</button>
      <button className="badge badge-purple">Playa de las Américas</button>
    </div>
  </div>
</div>

// New user dashboard
<div className="text-center py-16 space-y-4">
  <Sparkles className="w-16 h-16 mx-auto text-purple-400" />
  <h3 className="text-2xl font-semibold">Welcome to Tenerife Music! 🎉</h3>
  <p className="text-gray-400 max-w-sm mx-auto">
    Let's get you started with your first event
  </p>
  <button className="btn-primary">Create Your First Event</button>
  <button className="btn-ghost">Take a Tour</button>
</div>
```

### 13.5 Placeholder Text

**Helpful Examples, Not Generic:**

❌ **Bad Placeholders:**

```tsx
<input placeholder="Enter text" />
<input placeholder="Search" />
<input placeholder="Name" />
```

✅ **Good Placeholders:**

```tsx
<input placeholder="Search events, venues, artists..." />
<input placeholder="e.g., Neon Nights, Papagayo, DJ Martinez" />
<input placeholder="Your name (e.g., María García)" />
<input placeholder="When should your event start? (e.g., 23:00)" />
<textarea placeholder="Tell people what makes your event special..." />
```

### 13.6 Confirmation Messages

**Clear and Reassuring:**

✅ **Good Confirmations:**

```tsx
// Event saved
"Added to your favorites ✓";

// Ticket purchased
"You're all set! Confirmation sent to maria@email.com";

// Profile updated
"Changes saved successfully";

// Event created
"Your event is live! 🎉 Share it with your audience";

// Review submitted
"Thanks for your feedback! Your review is now live";
```

### 13.7 Good vs. Bad Copy Examples

| Context           | ❌ Bad                    | ✅ Good                                 |
| ----------------- | ------------------------- | --------------------------------------- |
| Homepage Hero     | "Welcome to our platform" | "Discover Tenerife's Best Nights"       |
| Event List Header | "Events"                  | "Happening This Weekend"                |
| Empty Favorites   | "No items"                | "No favorites yet. Start exploring!"    |
| Loading           | "Please wait..."          | "Finding the perfect events for you..." |
| Error (404)       | "404 Not Found"           | "Oops! This page doesn't exist"         |
| Search Prompt     | "Search"                  | "What are you looking for tonight?"     |
| CTA               | "Sign Up Now"             | "Start Discovering"                     |
| Form Submit       | "Submit Form"             | "Create My Account"                     |

---

## 14. Photography & Imagery Style

### 14.1 Photo Style

**High-Quality, Authentic, Energetic but Not Chaotic**

✅ **What to Show:**

- Real events (not stock photos)
- Real venues with character
- Real people enjoying themselves
- DJs/artists performing
- Venue interiors and exteriors
- Crowd atmosphere (without faces as main focus)
- Lighting and ambiance
- Tenerife locations (palm trees, beaches, urban areas)

❌ **What to Avoid:**

- Generic stock party photos
- Overly posed models
- Blurry/low-quality images
- Overly chaotic mosh pits
- Drunk/inappropriate behavior
- Too dark/underexposed photos
- Watermarked images

### 14.2 Image Treatment

**Gradient Overlays:**

```tsx
// Hero images - dark gradient for text readability
<div className="relative">
  <img src="/hero.jpg" className="w-full h-full object-cover" alt="" />
  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/60 to-transparent" />
</div>

// Card images - subtle gradient
<div className="relative">
  <img src="/event.jpg" className="w-full h-full object-cover" alt="" />
  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 to-transparent" />
</div>
```

**Aspect Ratios (Consistency is key):**

```tsx
// Event cards - 16:9 (cinematic)
<div className="aspect-video">
  <img src="/event.jpg" className="w-full h-full object-cover" alt="" />
</div>

// Venue photos - 4:3 (standard)
<div className="aspect-[4/3]">
  <img src="/venue.jpg" className="w-full h-full object-cover" alt="" />
</div>

// Artist profiles - 1:1 (square)
<div className="aspect-square">
  <img src="/artist.jpg" className="w-full h-full object-cover rounded-full" alt="" />
</div>

// Featured content - 3:4 (portrait)
<div className="aspect-[3/4]">
  <img src="/featured.jpg" className="w-full h-full object-cover" alt="" />
</div>
```

**Hover Effects:**

```tsx
// Subtle zoom on hover
<div className="relative overflow-hidden rounded-2xl">
  <img
    src="/event.jpg"
    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
    alt=""
  />
</div>

// Brightness change on hover
<div className="relative overflow-hidden rounded-2xl group">
  <img
    src="/event.jpg"
    className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
    alt=""
  />
</div>
```

### 14.3 Image Categories

**Event Images:**

- Minimum resolution: 1920×1080px
- Aspect ratio: 16:9 preferred
- Shows: Venue atmosphere, lighting, crowd (medium distance)
- Treatment: Subtle dark gradient overlay

**Venue Images:**

- Minimum resolution: 1600×1200px
- Aspect ratio: 4:3 preferred
- Shows: Interior/exterior, ambiance, architecture
- Treatment: Natural, minimal overlay

**Artist/DJ Images:**

- Minimum resolution: 1000×1000px
- Aspect ratio: 1:1 (square)
- Shows: Artist performing or professional portrait
- Treatment: Circular crop for profiles

**Category/Genre Images:**

- Minimum resolution: 800×800px
- Aspect ratio: 1:1
- Shows: Abstract representations of genre (e.g., turntables for techno)
- Treatment: Color overlay matching genre vibe

### 14.4 Image Quality Guidelines

**Technical Requirements:**

- Format: WebP preferred, JPG fallback
- Compression: High quality (80-90%)
- Max file size: 500KB for cards, 1MB for heroes
- Always provide alt text for accessibility

**Aesthetic Requirements:**

- Good lighting (not too dark, not overexposed)
- Sharp focus (no motion blur unless intentional)
- Proper white balance
- Vibrant but natural colors
- Good composition (rule of thirds)

### 14.5 Fallback Images

**When no image is available:**

```tsx
// Gradient background with icon
<div className="to-midnight-950 flex aspect-video items-center justify-center bg-gradient-to-br from-purple-950">
  <Music className="h-16 w-16 text-purple-400/30" />
</div>;

// Category-specific gradients
const categoryGradients = {
  techno: "from-purple-950 to-midnight-950",
  house: "from-blue-950 to-midnight-950",
  reggaeton: "from-red-950 to-midnight-950",
  live: "from-green-950 to-midnight-950",
};
```

---

## 15. Iconography Style

### 15.1 Icon Library

**Lucide Icons** - Consistent, modern, clean

**Why Lucide:**

- Consistent stroke width
- Modern, minimal aesthetic
- Extensive library
- Open source
- React-friendly

```tsx
import {
  Calendar,
  MapPin,
  Music,
  Heart,
  User,
  Search,
  Filter,
  Star,
  Clock,
  Ticket,
} from "lucide-react";
```

### 15.2 Icon Usage

**Supportive, Not Decorative:**

✅ **Good Icon Usage:**

```tsx
// Icons enhance understanding
<div className="flex items-center gap-2 text-sm text-gray-400">
  <Calendar className="w-4 h-4" />
  <span>Fri, Dec 15 • 23:00</span>
</div>

<div className="flex items-center gap-2 text-sm text-gray-400">
  <MapPin className="w-4 h-4" />
  <span>Papagayo Beach Club</span>
</div>
```

❌ **Bad Icon Usage:**

```tsx
// Icons without purpose
<h1>
  <Star /> Welcome <Star /> to <Star /> Tenerife <Star />
</h1>
```

**When to Use Icons:**

- To clarify meaning (date, location, time)
- For actions (search, filter, favorite)
- To indicate status (verified, popular, sold out)
- In navigation
- For social media links

**When NOT to Use Icons:**

- As decoration
- To fill space
- When text alone is clearer
- In body paragraphs

### 15.3 Icon + Text Combination

**Always pair icons with labels for clarity:**

```tsx
// ✅ Good - Icon + Text
<button className="flex items-center gap-2">
  <Heart className="w-5 h-5" />
  <span>Save Event</span>
</button>

// ⚠️ Use sparingly - Icon only (only for very common actions)
<button className="p-2" aria-label="Save event">
  <Heart className="w-5 h-5" />
</button>
```

**Consistent positioning:**

```tsx
// Icon left (default)
<div className="flex items-center gap-2">
  <Icon className="w-4 h-4" />
  <span>Text</span>
</div>

// Icon right (for dropdown, external link)
<button className="flex items-center gap-2">
  <span>Menu</span>
  <ChevronDown className="w-4 h-4" />
</button>
```

### 15.4 Icon Sizing

**Context-based sizing:**

```tsx
// Inline text (16px/4 units)
<p className="flex items-center gap-2">
  <Calendar className="w-4 h-4" />
  <span>Date</span>
</p>

// Standard (20px/5 units)
<button className="flex items-center gap-2">
  <Heart className="w-5 h-5" />
  <span>Save</span>
</button>

// Large (24px/6 units)
<div className="flex items-center gap-3">
  <Music className="w-6 h-6" />
  <h3>Genre</h3>
</div>

// Hero/Feature (48px+/12 units+)
<div className="text-center">
  <Music className="w-12 h-12 mx-auto mb-4 text-purple-400" />
  <h2>No Events Found</h2>
</div>
```

### 15.5 Icon States

**Interactive states:**

```tsx
// Default
<Heart className="w-5 h-5 text-gray-400" />

// Hover
<Heart className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />

// Active/Selected
<Heart className="w-5 h-5 text-red-500 fill-red-500" />

// Disabled
<Heart className="w-5 h-5 text-gray-600 opacity-50 cursor-not-allowed" />
```

### 15.6 Common Icons and Their Use

| Icon         | Use Case              | Size           |
| ------------ | --------------------- | -------------- |
| Calendar     | Date/time information | 16px (w-4 h-4) |
| MapPin       | Location              | 16px (w-4 h-4) |
| Clock        | Duration, time        | 16px (w-4 h-4) |
| Music        | Genre, audio content  | 20px (w-5 h-5) |
| Heart        | Favorite/like action  | 20px (w-5 h-5) |
| User         | Profile, account      | 20px (w-5 h-5) |
| Search       | Search functionality  | 20px (w-5 h-5) |
| Filter       | Filtering options     | 20px (w-5 h-5) |
| Star         | Ratings, featured     | 16px (w-4 h-4) |
| Ticket       | Ticketing, entry      | 20px (w-5 h-5) |
| Share        | Share actions         | 20px (w-5 h-5) |
| ChevronDown  | Dropdown menus        | 16px (w-4 h-4) |
| ChevronRight | Next, forward         | 16px (w-4 h-4) |
| X            | Close, cancel         | 20px (w-5 h-5) |
| Check        | Success, confirmation | 20px (w-5 h-5) |

---

## 16. Animation & Motion Personality

### 16.1 Motion Principles

**Smooth, Purposeful, Premium**

**Core Principles:**

1. **Purposeful**: Animations should communicate or assist, not distract
2. **Smooth**: Transitions should feel natural, not robotic
3. **Fast but not rushed**: 300-500ms for most transitions
4. **Respectful**: Honor `prefers-reduced-motion`

### 16.2 Speed

**Timing Guidelines:**

```css
/* Quick interactions (hover, focus) */
transition-duration: 200ms; /* Button hover */

/* Standard transitions (most cases) */
transition-duration: 300ms; /* Default */

/* Smooth transitions (scale, complex) */
transition-duration: 500ms; /* Card hover, image zoom */

/* Dramatic transitions (page transitions) */
transition-duration: 700ms; /* Modal open, page slide */
```

**Not too fast (jarring):**

```tsx
// ❌ Too fast - feels jumpy
<div className="transition-all duration-75 hover:scale-110">
```

**Not too slow (sluggish):**

```tsx
// ❌ Too slow - feels laggy
<div className="transition-all duration-1000 hover:scale-110">
```

**Just right:**

```tsx
// ✅ Smooth and natural
<div className="transition-all duration-300 hover:scale-105">
```

### 16.3 Easing

**Custom curves for natural feel:**

```css
/* Default (ease-in-out) */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Smooth start (ease-out) - elements entering */
transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

/* Smooth end (ease-in) - elements exiting */
transition-timing-function: cubic-bezier(0.4, 0, 1, 1);

/* Bounce (playful, use sparingly) */
transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Application:**

```tsx
// Standard hover (ease-in-out)
<button className="transition-all duration-300 ease-in-out hover:scale-105">

// Element entering (ease-out - starts fast, ends slow)
<div className="transition-all duration-500 ease-out animate-fade-in">

// Element exiting (ease-in - starts slow, ends fast)
<div className="transition-all duration-300 ease-in animate-fade-out">
```

### 16.4 When to Animate

✅ **DO Animate:**

**1. Feedback (user action confirmation):**

```tsx
// Button press
<button className="transition-transform active:scale-95">
  Get Tickets
</button>

// Favorite toggle
<button onClick={toggleFavorite}>
  <Heart className={`transition-all duration-300 ${isFavorite ? 'scale-125 fill-red-500' : ''}`} />
</button>
```

**2. State Changes:**

```tsx
// Loading state
<div className="animate-pulse">Loading...</div>

// Success state
<div className="animate-slide-up">Success! ✓</div>
```

**3. Transitions (between views):**

```tsx
// Page transitions
<div className="animate-fade-in">
  {/* New page content */}
</div>

// Modal open
<div className="animate-scale-in">
  {/* Modal content */}
</div>
```

**4. Delight (subtle enhancements):**

```tsx
// Card hover
<article className="transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">

// Image zoom on hover
<img className="transition-transform duration-700 hover:scale-110" />
```

### 16.5 When NOT to Animate

❌ **DON'T Animate:**

**1. Reading Content:**

```tsx
// ❌ Never animate body text
<p className="animate-pulse">  // NO!
  This is hard to read
</p>

// ✅ Static text
<p>Easy to read</p>
```

**2. Critical Information:**

```tsx
// ❌ Don't animate error messages
<div className="animate-bounce">  // NO!
  Error: Payment failed
</div>

// ✅ Static, clear
<div>Error: Payment failed</div>
```

**3. Everything:**

```tsx
// ❌ Animation overload
<div className="animate-bounce">
  <h1 className="animate-pulse">
    <span className="animate-spin">Title</span>
  </h1>
</div>

// ✅ Selective animation
<div>
  <h1>Title</h1>
</div>
```

### 16.6 Reduced Motion

**Always respect user preferences:**

```tsx
// Using Tailwind's motion-reduce:
<div className="
  transition-all duration-500
  motion-reduce:transition-none
  hover:scale-105
  motion-reduce:hover:scale-100
">
```

```css
/* CSS media query */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 16.7 Common Animations

**Fade In:**

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 500ms ease-out;
}
```

**Slide Up:**

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 500ms ease-out;
}
```

**Scale In (Modal, Card):**

```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 300ms ease-out;
}
```

**Shimmer (Loading):**

```css
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
```

---

## 17. Accessibility as Brand Value

### 17.1 Philosophy

**Accessibility is not an afterthought—it's part of the premium experience.**

A truly sophisticated platform is one that works beautifully for everyone, regardless of ability.

### 17.2 WCAG Compliance

**Minimum Standard: WCAG 2.1 AA**

**Key Requirements:**

1. Color contrast ratio ≥ 4.5:1 for normal text
2. Color contrast ratio ≥ 3:1 for large text (18pt+)
3. All interactive elements keyboard accessible
4. All images have alt text
5. Form inputs have labels
6. Focus indicators visible
7. No content flashes more than 3 times per second

### 17.3 Keyboard Navigation

**Full keyboard support for all interactive elements:**

```tsx
// Ensure tab order is logical
<form>
  <input tabIndex={1} />
  <input tabIndex={2} />
  <button tabIndex={3}>Submit</button>
</form>

// Handle keyboard events
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Clickable div
</div>

// Skip navigation for keyboard users
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
  Skip to main content
</a>
```

### 17.4 Screen Reader Support

**Semantic HTML:**

```tsx
// ✅ Good - Semantic
<header>
  <nav>
    <ul>
      <li><a href="/events">Events</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Event Title</h1>
    <p>Description</p>
  </article>
</main>

<footer>
  <p>© 2025 Tenerife Music</p>
</footer>

// ❌ Bad - Non-semantic
<div className="header">
  <div className="nav">
    <div className="link">Events</div>
  </div>
</div>
```

**ARIA Labels:**

```tsx
// Icons need labels
<button aria-label="Add to favorites">
  <Heart className="w-5 h-5" />
</button>

// Complex components need roles
<div role="tablist">
  <button role="tab" aria-selected="true">About</button>
  <button role="tab" aria-selected="false">Events</button>
</div>

// Live regions for dynamic content
<div role="status" aria-live="polite">
  {loading ? 'Loading events...' : `${events.length} events found`}
</div>
```

**Alt Text:**

```tsx
// ✅ Descriptive alt text
<img
  src="/event.jpg"
  alt="DJ performing at Neon Nights event with purple lighting and crowd dancing"
/>

// ✅ Decorative images
<img
  src="/decoration.jpg"
  alt=""
  aria-hidden="true"
/>

// ❌ Bad alt text
<img src="/event.jpg" alt="image" />
<img src="/event.jpg" alt="event.jpg" />
```

### 17.5 Color Contrast

**Always compliant contrast:**

```tsx
// ✅ Good contrast (passes AA)
text-white on bg-midnight-950      // ∞:1 (white on near-black)
text-gray-300 on bg-midnight-950   // ~12:1
text-purple-400 on bg-midnight-950 // ~8:1

// ⚠️ Check carefully
text-gray-400 on bg-midnight-900   // Verify with contrast checker

// ❌ Bad contrast (fails AA)
text-gray-600 on bg-midnight-900   // Too low
text-purple-200 on bg-white        // Too low
```

**Tool: Use contrast checker**

- WebAIM Contrast Checker
- Browser DevTools
- Figma contrast plugins

### 17.6 Focus Indicators

**Always visible, never removed:**

```tsx
// ✅ Custom focus style (maintains visibility)
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-purple-500
  focus:ring-offset-2
  focus:ring-offset-midnight-950
">
  Button
</button>

// ✅ Default focus (browser default)
<button>Button</button>  // Has native focus ring

// ❌ NEVER do this
<button className="focus:outline-none">Button</button>  // No alternative focus indicator
```

**High visibility focus:**

```css
/* Global focus style */
*:focus-visible {
  outline: 2px solid theme("colors.purple.500");
  outline-offset: 2px;
}
```

### 17.7 Form Accessibility

**Labels and Instructions:**

```tsx
// ✅ Explicit labels
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    className="input"
    aria-describedby="email-help"
  />
  <p id="email-help" className="text-sm text-gray-400">
    We'll never share your email
  </p>
</div>

// ✅ Error messaging
<div className="space-y-2">
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
    className={hasError ? 'input input-error' : 'input'}
  />
  {hasError && (
    <p id="email-error" className="text-sm text-red-400" role="alert">
      Please enter a valid email address
    </p>
  )}
</div>
```

### 17.8 Accessibility Checklist

Before shipping any feature:

- [ ] All images have meaningful alt text (or alt="" if decorative)
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible on all focusable elements
- [ ] Form inputs have associated labels
- [ ] Error messages are announced to screen readers (role="alert" or aria-live)
- [ ] Semantic HTML is used (header, nav, main, article, footer)
- [ ] ARIA labels provided where needed
- [ ] No content flashes rapidly
- [ ] Content is readable when zoomed to 200%
- [ ] Page structure is logical (proper heading hierarchy: h1 → h2 → h3)
- [ ] Tables have proper markup (th, scope)
- [ ] Links have descriptive text (not "click here")

---

## 18. Brand Application Examples

### 18.1 Homepage Hero

**Copy + Imagery + CTA:**

```tsx
<section className="from-midnight-950 via-midnight-900 relative flex min-h-screen items-center bg-gradient-to-br to-purple-950">
  {/* Background */}
  <div className="absolute inset-0 z-0">
    <img
      src="/hero-tenerife-night.jpg" // High-quality: Tenerife nightlife skyline
      alt=""
      className="h-full w-full object-cover opacity-30"
    />
    <div className="from-midnight-950/90 absolute inset-0 bg-gradient-to-t to-transparent" />
  </div>

  {/* Content */}
  <div className="relative z-10 w-full px-4 md:px-8">
    <div className="mx-auto max-w-7xl py-32">
      <div className="max-w-3xl space-y-8">
        {/* Badge - Local expertise */}
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-purple-300" />
          <span className="text-sm text-purple-300">Curated by local experts</span>
        </div>

        {/* Headline - Exciting, aspirational */}
        <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
          Discover Tenerife's
          <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Best Nights
          </span>
        </h1>

        {/* Subheadline - Value proposition */}
        <p className="text-xl leading-relaxed text-gray-300 md:text-2xl">
          Your insider guide to the island's most unforgettable nightlife experiences
        </p>

        {/* CTAs - Clear actions */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="btn-primary btn-lg">Explore Events</button>
          <button className="btn-secondary btn-lg">For Organizers</button>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>10,000+ nightlife lovers</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>4.8 rating</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <ChevronDown className="h-6 w-6 text-white/60" />
  </div>
</section>
```

### 18.2 Event Card

**Information Hierarchy + Visual Appeal:**

```tsx
<article className="card group cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
  {/* Image - High-quality event photo */}
  <div className="relative aspect-video overflow-hidden">
    <img
      src="/neon-nights-event.jpg" // Real event photo
      alt="Neon Nights Underground Session at Papagayo Beach Club"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
    />

    {/* Gradient overlay for readability */}
    <div className="from-midnight-950/80 absolute inset-0 bg-gradient-to-t to-transparent" />

    {/* Badge - Genre */}
    <div className="absolute left-4 top-4">
      <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-300 backdrop-blur-md">
        Techno
      </span>
    </div>

    {/* Favorite button */}
    <button
      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 opacity-0 backdrop-blur-md transition-opacity duration-300 hover:bg-white/20 group-hover:opacity-100"
      aria-label="Add to favorites"
    >
      <Heart className="h-5 w-5 text-white" />
    </button>
  </div>

  {/* Content */}
  <div className="space-y-4 p-6">
    {/* Date - Clear, scannable */}
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <Calendar className="h-4 w-4" />
      <span>Friday, Dec 15 • 23:00</span>
    </div>

    {/* Title - Strong hierarchy */}
    <h3 className="line-clamp-2 text-xl font-semibold leading-snug text-white">
      Neon Nights: Underground Session
    </h3>

    {/* Location - Supporting info */}
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <MapPin className="h-4 w-4" />
      <span>Papagayo Beach Club • Playa de las Américas</span>
    </div>

    {/* Divider */}
    <div className="flex items-center justify-between border-t border-white/5 pt-4">
      {/* Price - Clear value */}
      <div>
        <p className="text-sm text-gray-400">From</p>
        <p className="text-2xl font-bold text-white">€25</p>
      </div>

      {/* CTA - Action-oriented */}
      <button className="btn-primary">Get Tickets</button>
    </div>
  </div>
</article>
```

### 18.3 Error Message

**Friendly + Helpful:**

```tsx
<div className="flex min-h-screen items-center justify-center px-4">
  <div className="w-full max-w-md space-y-8 text-center">
    {/* Icon - Visual clarity */}
    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/10">
      <SearchX className="h-12 w-12 text-purple-400" />
    </div>

    {/* Heading - Clear, not technical */}
    <div className="space-y-2">
      <h1 className="font-display text-4xl font-bold text-white">Event Not Found</h1>
      <p className="text-lg text-gray-400">This event might have ended or been cancelled</p>
    </div>

    {/* Actions - Solution-focused */}
    <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <button className="btn-primary">Browse All Events</button>
      <button className="btn-ghost">Go Home</button>
    </div>

    {/* Helpful suggestions */}
    <div className="space-y-3 pt-8">
      <p className="text-sm text-gray-500">Looking for something similar?</p>
      <div className="flex flex-wrap justify-center gap-2">
        <button className="badge badge-purple">Techno Events</button>
        <button className="badge badge-purple">This Weekend</button>
        <button className="badge badge-purple">Papagayo</button>
      </div>
    </div>
  </div>
</div>
```

### 18.4 Empty State

**Encouraging + Actionable:**

```tsx
<div className="py-24 text-center">
  <div className="mx-auto max-w-md space-y-6">
    {/* Icon - Positive visual */}
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10">
      <Heart className="h-10 w-10 text-purple-400" />
    </div>

    {/* Heading - Encouraging tone */}
    <div className="space-y-2">
      <h2 className="font-display text-3xl font-bold text-white">Your Favorites Will Live Here</h2>
      <p className="text-lg text-gray-400">
        Start saving events you're interested in to find them easily later
      </p>
    </div>

    {/* Action - Clear next step */}
    <button className="btn-primary btn-lg">Discover Events</button>

    {/* Additional context */}
    <p className="pt-4 text-sm text-gray-500">
      💡 Tip: Click the <Heart className="inline h-4 w-4" /> icon on any event to save it
    </p>
  </div>
</div>
```

### 18.5 Success Confirmation

**Celebratory + Refined:**

```tsx
<div className="mx-auto max-w-2xl space-y-8 py-16 text-center">
  {/* Success icon - Celebratory but subtle */}
  <div className="animate-scale-in mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">
    <Check className="h-12 w-12 text-green-400" />
  </div>

  {/* Heading - Exciting but sophisticated */}
  <div className="space-y-3">
    <h1 className="font-display text-5xl font-bold text-white">You're All Set! 🎉</h1>
    <p className="text-xl text-gray-300">
      Your tickets for <strong className="text-white">Neon Nights: Underground Session</strong> are
      confirmed
    </p>
  </div>

  {/* Key info - Reassuring */}
  <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20">
        <Mail className="h-5 w-5 text-purple-400" />
      </div>
      <div className="text-left">
        <p className="font-medium text-white">Confirmation Sent</p>
        <p className="text-sm text-gray-400">Check your email at maria@example.com</p>
      </div>
    </div>

    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20">
        <Smartphone className="h-5 w-5 text-purple-400" />
      </div>
      <div className="text-left">
        <p className="font-medium text-white">Add to Wallet</p>
        <p className="text-sm text-gray-400">Your tickets are ready for Apple/Google Wallet</p>
      </div>
    </div>
  </div>

  {/* Next actions - Clear path forward */}
  <div className="space-y-4">
    <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <button className="btn-primary btn-lg">View My Tickets</button>
      <button className="btn-ghost btn-lg">Add to Calendar</button>
    </div>

    <button className="btn-ghost">Share with Friends</button>
  </div>

  {/* What's next - Anticipation building */}
  <div className="space-y-2 pt-8">
    <p className="text-sm text-gray-400">What to expect</p>
    <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <span>Fri, Dec 15 • 23:00</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        <span>Papagayo Beach Club</span>
      </div>
    </div>
  </div>
</div>
```

### 18.6 Loading State

**Premium Shimmer:**

```tsx
// Event List Loading
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {[1, 2, 3].map((i) => (
    <div key={i} className="card overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-video bg-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Date */}
        <div className="h-4 bg-white/5 rounded-full w-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 bg-white/10 rounded-full w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>
          <div className="h-6 bg-white/10 rounded-full w-2/3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Location */}
        <div className="h-4 bg-white/5 rounded-full w-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  ))}
</div>

<style jsx>{`
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`}</style>
```

---

## 19. Competitive Differentiation

### 19.1 vs. Generic Event Platforms

**Generic Platforms (Eventbrite, etc.):**

- Comprehensive (list everything)
- Utilitarian design
- Global, not local
- Transactional focus

**Tenerife Music:**

- Curated (quality over quantity)
- Sophisticated, premium design
- Local expertise, insider knowledge
- Experience-focused

**Key Differentiators:**

1. **Curation** - Every event vetted by local experts
2. **Design** - Premium, nightlife-optimized aesthetic
3. **Local Knowledge** - Insider tips, neighborhood guides
4. **Specialization** - Nightlife only, not generic events

### 19.2 vs. Social Media Events

**Social Media (Facebook Events, Instagram):**

- Crowdsourced, unverified
- Mixed quality
- Poor discovery
- Cluttered interface

**Tenerife Music:**

- Verified, reliable information
- Consistent quality
- Intelligent discovery (search, filters, recommendations)
- Clean, focused interface

**Key Differentiators:**

1. **Reliability** - Verified information, no spam
2. **Discovery** - Smart search and recommendations
3. **User Experience** - Purpose-built for nightlife discovery
4. **Focus** - Events only, no social noise

### 19.3 vs. Venue Websites

**Venue Websites:**

- Fragmented (visit multiple sites)
- Inconsistent quality
- Poor mobile experience
- Limited discovery

**Tenerife Music:**

- Centralized (one place for all venues)
- Consistent, high-quality presentation
- Mobile-optimized
- Cross-venue discovery

**Key Differentiators:**

1. **Centralization** - All venues in one place
2. **Comparison** - Easy to compare events across venues
3. **User Experience** - Consistent, premium interface
4. **Discovery** - Find events you wouldn't find otherwise

### 19.4 Unique Value Proposition

**"Tenerife's Nightlife Intelligence Platform"**

**What makes us unique:**

1. **Intelligence** - Not just listings, but insights
   - Personalized recommendations
   - Trending indicators
   - Local expert curation
   - Smart search

2. **Local Expertise** - Deep Tenerife knowledge
   - Curated by locals who live the scene
   - Insider tips and hidden gems
   - Neighborhood guides
   - Venue insights

3. **Premium Experience** - Elevated design and UX
   - Sophisticated, modern aesthetic
   - Smooth, delightful interactions
   - High-quality imagery
   - Attention to detail

4. **Focus** - Nightlife specialists
   - Not generic events
   - Not trying to be everything
   - Deep expertise in nightlife
   - Purpose-built tools

---

## 20. Brand Evolution Guidelines

### 20.1 Consistency

**Maintain core identity while evolving:**

**Never Change:**

- Brand values (discovery, sophistication, local expertise, community)
- Core visual identity (midnight blue, electric purple, clean design)
- Tone of voice (confident, helpful, sophisticated, energetic)
- User-first approach

**Can Evolve:**

- Feature set (new tools, capabilities)
- Visual refinements (updated components, patterns)
- Content strategy (new content types)
- Technical implementation

### 20.2 Flexibility

**Room for seasonal themes and special events:**

**Seasonal Variations:**

```tsx
// Summer Season (June-September)
// Warmer accent colors, beach vibes
const summerTheme = {
  accent: "from-blue-400 to-cyan-400",
  bg: "bg-gradient-to-br from-midnight-950 via-blue-950/30 to-midnight-950",
};

// Winter Season (December-February)
// Cooler tones, sophisticated
const winterTheme = {
  accent: "from-purple-400 to-pink-400",
  bg: "bg-gradient-to-br from-midnight-950 via-purple-950/30 to-midnight-950",
};

// Festival Season (Carnaval)
// More vibrant, energetic
const festivalTheme = {
  accent: "from-pink-400 via-purple-400 to-blue-400",
  bg: "bg-gradient-to-br from-midnight-950 via-purple-950 to-midnight-950",
};
```

**Special Events:**

- Can use temporary themed headers
- Can feature special badges/labels
- Can use event-specific color accents
- Must maintain core design principles

### 20.3 Testing

**How to test new design directions:**

**A/B Testing:**

1. Test with small user segment
2. Measure key metrics (engagement, conversion, satisfaction)
3. Gather qualitative feedback
4. Iterate based on data
5. Roll out gradually

**User Testing:**

1. Test with representative users (tourists, locals, organizers)
2. Observe real usage patterns
3. Collect feedback
4. Identify pain points
5. Refine based on findings

**Metrics to Track:**

- User engagement (time on site, pages per session)
- Conversion rates (ticket purchases, account signups)
- User satisfaction (NPS, surveys)
- Task completion rates
- Error rates

### 20.4 Feedback

**Incorporating user feedback while maintaining brand:**

**Process:**

1. **Collect** - Multiple channels (surveys, support, analytics)
2. **Categorize** - Feature requests, bugs, UX issues, design feedback
3. **Evaluate** - Does it align with brand values?
4. **Prioritize** - Impact vs. effort
5. **Implement** - With brand guidelines in mind
6. **Measure** - Did it improve the experience?

**Guiding Questions:**

- Does this make the platform more sophisticated or less?
- Does this align with our premium positioning?
- Does this improve the nightlife discovery experience?
- Would our target audience appreciate this?
- Does this maintain our design system principles?

**When to Say No:**

- Request conflicts with brand identity
- Would add clutter/complexity
- Serves niche use case at expense of majority
- Would compromise premium feel
- Doesn't align with nightlife focus

**When to Say Yes:**

- Improves core user experience
- Aligns with brand values
- Requested by multiple user segments
- Enhances sophistication
- Improves accessibility

---

## Conclusion

This guide provides the foundation for creating consistent, high-quality experiences across the Tenerife Music platform. Remember:

**Layout Principles:**

- Use the 8px spacing system religiously
- Embrace whitespace for sophistication
- Design mobile-first, enhance for desktop
- Maintain consistent patterns and structures

**Brand Voice:**

- Sophisticated but not pretentious
- Helpful but not patronizing
- Energetic but not chaotic
- Premium throughout

**User Focus:**

- Accessibility is non-negotiable
- Clarity over cleverness
- Purpose over decoration
- Users over ego

**Quality Standards:**

- High-quality imagery always
- Smooth, purposeful animations
- Attention to detail
- Polish and refinement

---

**Questions or Clarifications?**

If anything in this guide is unclear or you need specific examples for a use case not covered, consult the design team or refer to existing implementations in the codebase.

**Keep this guide alive:**

- Update as we learn
- Document new patterns
- Share improvements
- Maintain consistency

---

**Version History:**

- v1.0 (November 2025) - Initial comprehensive guide

**Next Review:** February 2026
