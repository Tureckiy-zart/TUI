# Layout API Dispute Resolution

**Date:** 2025-12-30  
**Status:** ✅ **RESOLVED**  
**Authority:** This document resolves all disputed API decisions for layout and page-level components before implementation.  
**Priority:** CRITICAL

---

## Document Classification

**TYPE:** ARCHITECTURE RESOLUTION  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ ACTIVE  
**AUTHORITY DOMAIN:** Layout Architecture

**Purpose:** This document formally resolves all disputed API decisions for layout and page-level components (PageHeader, Section, ContentShell) before implementation. This document does NOT implement components. It only clarifies responsibilities, allowed props, forbidden props, and semantic boundaries.

---

## Scope

This document resolves API disputes for:

1. **PageHeader** - Semantic page header component
2. **Section** - Page-level block container (already exists, requires clarification)
3. **ContentShell** - Body-level layout wrapper (new component)

---

## Resolution 1: PageHeader API

### Responsibility

**PageHeader is a semantic composition component, NOT a layout primitive.**

- PageHeader provides structured page header with predefined semantic slots
- PageHeader uses Foundation components (Heading, Text, Breadcrumbs) for semantic content
- PageHeader composes layout primitives internally but does not expose layout props

### Allowed Props (Semantic Only)

```typescript
interface PageHeaderProps {
  /**
   * Main page title
   */
  title?: string | React.ReactNode;

  /**
   * Page description/subtitle
   */
  description?: string | React.ReactNode;

  /**
   * Breadcrumb items array (uses Breadcrumbs component internally)
   */
  breadcrumbs?: BreadcrumbItem[];

  /**
   * Actions (buttons, links) displayed on the right side of header
   */
  actions?: React.ReactNode;

  /**
   * HTML element to render
   * @default "header"
   */
  as?: keyof React.JSX.IntrinsicElements;

  /**
   * Accessible label for header region
   */
  ariaLabel?: string;
}
```

### Forbidden Props

- ❌ `children` - PageHeader does NOT accept arbitrary content
- ❌ `px`, `py` - Layout props forbidden (Container used internally)
- ❌ `background`, `bg` - Visual props forbidden (use Surface wrapper if needed)
- ❌ `border` - Visual props forbidden
- ❌ `left`, `center`, `right` - Slot-based API forbidden (only for Footer)
- ❌ Any layout composition props (`spacing`, `direction`, `align`, `justify`)

### Internal Structure

PageHeader composes layout primitives internally:

- Uses `Container` for width constraint and horizontal padding
- Uses `Stack` for vertical composition of title/description/breadcrumbs
- Uses `Flex` for horizontal layout with actions on the right
- All layout props are delegated to internal components

### Example Usage

```typescript
<PageHeader
  title="Page Title"
  description="Page description text"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Current" }
  ]}
  actions={<Button>Action</Button>}
/>
```

---

## Resolution 2: Footer vs PageHeader Pattern Separation

### Decision

**Footer and PageHeader use DIFFERENT API patterns with NO overlap.**

| Component | Pattern | Purpose | API Type |
|-----------|---------|---------|----------|
| **Footer** | Slot-based layout | Flexible composition of arbitrary content | `left`, `center`, `right`, `px`, `py`, `border`, `bg` |
| **PageHeader** | Semantic structure | Structured page header with predefined slots | `title`, `description`, `breadcrumbs`, `actions` |

### Rationale

- **Footer** needs flexible composition for arbitrary content (copyright, links, social media)
- **PageHeader** needs structured semantic content with predefined slots
- Different use cases = different API patterns
- No API overlap prevents confusion and maintains clear boundaries

### Rule

- Footer = layout flexibility (slot-based API)
- PageHeader = semantic structure (semantic props only)
- These patterns MUST NOT overlap

---

## Resolution 3: Section Responsibility Clarification

### Current State

Section exists and uses Stack with `spaceY` and `spacing` props.

### Clarified Responsibility

**Section is a page-level block container for vertical page rhythm.**

- Section provides vertical padding between page sections
- Section provides spacing between content blocks within a section
- Section is NOT a grid layout component
- Section is NOT a variant-driven component

### Allowed Props

```typescript
interface SectionProps {
  /**
   * Vertical padding for section (py)
   * Token-based spacing values only
   */
  spaceY?: ResponsiveSpacing;

  /**
   * Spacing between content blocks within section (gap)
   * Token-based spacing values only
   */
  spacing?: ResponsiveSpacing;

  /**
   * HTML element to render
   * @default "section"
   */
  as?: keyof React.JSX.IntrinsicElements;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}
```

### Forbidden Props

- ❌ `px`, `py` - Use `spaceY` for py, Container for px
- ❌ `padding` - Use `spaceY` instead
- ❌ `grid`, `columns` - Section does NOT provide grid layout
- ❌ `tone`, `variant` - Section does NOT have variants
- ❌ Arbitrary layout control of children - Use Stack/Grid inside Section

### Internal Structure

- Section delegates to Stack with `py={spaceY}` and `spacing={spacing}`
- Section renders as `<section>` by default

---

## Resolution 4: ContentShell Responsibility

### Responsibility

**ContentShell is a body-level layout wrapper, NOT document-level.**

- ContentShell provides structure for main page content
- ContentShell composes Navbar (optional) and children
- ContentShell does NOT manage document structure (html, body, head)
- ContentShell does NOT manage global providers or settings

### Allowed Props

```typescript
interface ContentShellProps {
  /**
   * Optional navigation component (Navbar)
   */
  nav?: React.ReactNode;

  /**
   * Main page content
   */
  children: React.ReactNode;

  /**
   * Padding for main content area
   * Default handled via Container
   */
  contentPadding?: ResponsiveSpacing;
}
```

### Forbidden Props

- ❌ `html`, `body`, `head` - ContentShell does NOT manage document structure
- ❌ `providers` - ContentShell does NOT manage context providers
- ❌ `i18n`, `theme` - ContentShell does NOT manage global settings
- ❌ Any layout composition props - Use Section/Container inside

### Internal Structure

- ContentShell renders `<main>` element
- ContentShell uses Container for width constraint and padding
- ContentShell uses Stack for vertical composition of nav + content

### Example Usage

```typescript
<ContentShell
  nav={<Navbar left={<Logo />} right={<UserMenu />} />}
  contentPadding="md"
>
  <Section spaceY="lg">
    <PageHeader title="Page Title" />
    <Container>Content</Container>
  </Section>
</ContentShell>
```

---

## Resolution 5: HTML Tag Coverage Rule

### Decision

**UI library does NOT aim to cover every HTML tag with a component.**

- Native semantic tags (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`) are **valid usage**
- Library provides **patterns**, not tag mirroring
- Components are created only when there is **added value** (tokens, composition, semantics)

### Rationale

- Not all HTML tags need component wrappers
- Native tags with className/styles are valid patterns
- Components must add value, not just wrap tags
- Prevents unnecessary abstraction and API bloat

### Rule

- Use native HTML tags when component adds no value
- Create components only for:
  - Token-driven styling
  - Composition patterns
  - Semantic structure
  - Domain-specific behavior

---

## Resolution 6: Global Forbidden Patterns

### Forbidden Patterns

1. **Raw numeric values in API**
   - ❌ Components exposing raw `px`/`py` numbers
   - ✅ Only token-based spacing values allowed

2. **Layout props in semantic components**
   - ❌ Layout props (`px`, `py`, `spacing`, `direction`) in semantic components (PageHeader)
   - ✅ Layout props only in layout primitives (Box, Stack, Container)

3. **Duplicated components**
   - ❌ Components differing only by naming (e.g., Header vs PageHeader)
   - ✅ One canonical component per responsibility

4. **Slot-based API in semantic components**
   - ❌ Slot-based API (`left`, `center`, `right`) in semantic components
   - ✅ Slot-based API only in layout/composition components (Footer)

### Rule Matrix

| Component Type | Layout Props | Semantic Props | Slot-Based API |
|----------------|-------------|----------------|----------------|
| **Layout Primitives** (Box, Stack, Container) | ✅ Allowed | ❌ Forbidden | ❌ Forbidden |
| **Semantic Components** (PageHeader, Card) | ❌ Forbidden | ✅ Allowed | ❌ Forbidden |
| **Composition Components** (Footer) | ✅ Allowed | ❌ Forbidden | ✅ Allowed |

---

## Resolution 7: LOCK Criteria for Layout Components

### Component is LOCKED When

- ✅ Component exists in Storybook with final API
- ✅ All props documented and tested
- ✅ Component complies with all Authority Contracts
- ✅ No open questions about API

### After LOCK

- ❌ New props cannot be added without TUNG (unlock procedure)
- ✅ Visual tweaks allowed only internally, not via API
- ✅ Bug fixes allowed within existing contract

### Lock Process

1. Component implementation complete
2. Storybook stories demonstrate all use cases
3. Tests cover all props and edge cases
4. Documentation complete
5. Authority Contract compliance verified
6. Component marked as LOCKED in `EXTENSION_STATE.md`

---

## Implementation Order

After all disputes are resolved:

1. **Section** - Clarify existing component (update props, documentation)
2. **PageHeader** - Implement new component (semantic API)
3. **ContentShell** - Implement new component (if needed)

---

## Enforcement

### Rejection Policy

Any API change requests NOT covered by this resolution document will be **REJECTED**.

### Reference Documents

- `docs/architecture/EXTENSION_AUTHORITY.md` - Extension layer boundaries
- `docs/architecture/LAYOUT_AUTHORITY.md` - Layout Authority Contract (if exists)
- `docs/architecture/EXTENSION_STATE.md` - Component state tracking

---

## Summary

This resolution document provides:

- ✅ Binary yes/no answers to all disputed API questions
- ✅ Clear responsibility boundaries for PageHeader, Section, ContentShell
- ✅ No API overlap between Footer, Navbar, PageHeader
- ✅ Clear implementation path without revisiting decisions

**All disputes are RESOLVED. Implementation may proceed.**

