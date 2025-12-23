# NextLinkAdapter Component — Baseline Snapshot Report

**Task ID:** TUI_NEXTLINKADAPTER_STEP_0  
**Pipeline:** 18A  
**Date Created:** 2025-12-23  
**Last Updated:** 2025-12-23  
**Role:** Frontend Engineer (Audit Mode)

## Legend

**Emoji Status Markers (Pipeline 18A):**
- ✅ Compliant / No issues / Completed / Verified
- ⚠️ Non-blocking issues / Warnings / Needs attention
- ❌ Blockers / Failures / Non-compliant
- 🧱 Foundation / Architecture / Lock status
- 🧪 Tests / Test coverage / Test status
- 📚 Documentation / Reports / Audit
- ♿ Accessibility / A11y compliance
- 🔒 Locked / Immutable / Protected

---

## Executive Summary

This document establishes a factual baseline snapshot of the NextLinkAdapter component following STEP 0 of the 18A pipeline process. The report records the current state of the component, its structure, dependencies, public API, and compliance with architectural constraints. This is a documentation-only step with no code changes.

**Component Classification:**
- **Layer:** EXTENSION (EXTENSIONS/next)
- **Semantic Role:** Next.js integration adapter bridging `next/link` with Foundation `Link` component
- **Location:** `src/EXTENSIONS/next/NextLinkAdapter.tsx`
- **Status:** Extension component (not locked, can be modified)

---

## 🧭 STEP 0 — Baseline Snapshot & Context Fixation

### Goal

Establish a factual baseline snapshot of the NextLinkAdapter component before any analysis or improvements. Record the current state, structure, dependencies, public API, and integration patterns.

### Findings

#### Component Location & Structure

- **Main Component File:** `src/EXTENSIONS/next/NextLinkAdapter.tsx` (57 lines)
- **Export File:** `src/EXTENSIONS/next/index.ts` (1 line)
- **Test File:** `src/EXTENSIONS/next/NextLinkAdapter.test.tsx` (64 lines)
- **Storybook Stories:** `src/EXTENSIONS/next/NextLinkAdapter.stories.tsx` (63 lines)
- **Main Library Export:** `src/index.ts` (does NOT export NextLinkAdapter - Extension component only)

#### Public API Inventory

**Exported Components:**
- `NextLinkAdapter` - React forwardRef component that wraps Next.js Link and Foundation Link

**Exported Types:**
- `NextLinkAdapterProps` - Interface extending `Omit<LinkProps, "href">` with Next.js-specific href type and props

**Component Props Summary:**

1. **NextLinkAdapterProps:**
   - Extends `Omit<LinkProps, "href">` (inherits all Foundation Link props except href)
   - Custom props:
     - `href: NextLinkProps["href"]` - Next.js-compatible href type (string | UrlObject)
     - `prefetch?: NextLinkProps["prefetch"]` - Next.js prefetch behavior
     - `replace?: NextLinkProps["replace"]` - Next.js replace navigation behavior
     - `scroll?: NextLinkProps["scroll"]` - Next.js scroll behavior
     - `shallow?: NextLinkProps["shallow"]` - Next.js shallow routing
     - `locale?: NextLinkProps["locale"]` - Next.js locale routing

**Inherited Props from Foundation Link:**
- `variant?: LinkVariant` - Link variant style (primary, secondary, accent, outline, ghost, link, destructive)
- `size?: LinkSize` - Link size (sm, md, lg)
- `leftIcon?: React.ReactNode` - Icon on the left side
- `rightIcon?: React.ReactNode` - Icon on the right side
- `disabled?: boolean` - Disabled state
- All standard anchor HTML attributes (except `href`, `className`, `style`)

**Default Props:**
- Inherited from Foundation Link: `variant="link"`, `size="md"`

**Implicit Behavior:**
- Component uses `React.forwardRef` to forward ref to the inner Foundation Link component
- Component uses NextLink with `passHref` and `legacyBehavior` flags to prevent nested `<a>` tag hydration errors
- `displayName` is set to "NextLinkAdapter"
- Component is marked with `"use client"` directive (Next.js client component)

#### Dependencies Analysis

**External Dependencies:**
- `next/link` - NextLink component and LinkProps type
- `react` - React.forwardRef and React types

**Internal Dependencies:**
- `@/PRIMITIVES/Link` - Foundation Link component and LinkProps type
  - Foundation Link is a locked Foundation component
  - Foundation Link excludes `className` and `style` from public API (Foundation Enforcement)

**Dependency Pattern:**
- NextLinkAdapter is an adapter/compatibility layer between Next.js Link and Foundation Link
- Uses composition pattern: NextLink wraps Foundation Link
- Resolves "nested <a> tag" hydration error in Next.js 13+ using `legacyBehavior` pattern

#### Export Points

**Module Exports:**
- `src/EXTENSIONS/next/index.ts` exports:
  - `NextLinkAdapter` (component)
  - `NextLinkAdapterProps` (type)

**Library Exports:**
- `src/index.ts` does NOT export NextLinkAdapter (Extension component, not part of main library API)

#### Component Implementation Details

**Structure:**
- Component is implemented as a functional component wrapped in `React.forwardRef`
- Returns JSX structure: `<NextLink><Link /></NextLink>`
- NextLink receives Next.js-specific props (href, prefetch, replace, scroll, shallow, locale)
- Foundation Link receives all other props from NextLinkAdapterProps
- Ref is forwarded to Foundation Link component

**Integration Pattern:**
- Uses NextLink's `legacyBehavior` prop to render children directly (required for Foundation Link which renders `<a>` tag)
- Uses NextLink's `passHref` prop to pass href to child component
- Foundation Link (which renders `<a>`) becomes the actual anchor element

#### Test Coverage

**Test File:** `src/EXTENSIONS/next/NextLinkAdapter.test.tsx` (64 lines)

**Test Strategy:**
- Mocks `next/link` since tests run outside Next.js environment
- Mock simulates `legacyBehavior` by rendering children directly
- Verifies Foundation Link renders correctly
- Verifies Next.js-specific props are passed to NextLink
- Verifies Foundation props are passed to inner Link component

**Test Cases:**
- Renders Foundation Link correctly
- Passes Next.js specific props to NextLink
- Passes Foundation props to inner Link

#### Storybook Coverage

**Story File:** `src/EXTENSIONS/next/NextLinkAdapter.stories.tsx` (63 lines)

**Stories:**
- Default - Basic usage example
- PrimaryVariant - Shows variant usage
- WithIcons - Shows multiple links with different variants

**Storybook Configuration:**
- Title: "Extensions/NextJS/NextLinkAdapter"
- Includes argTypes for variant, size, href controls
- Documentation describes adapter's purpose

### Outcome

No changes required in this step.

### Blocking

No

### Notes

- Component baseline established successfully
- All key files identified and documented
- Component structure and API documented
- Component is an Extension component, not Foundation
- Component serves as an adapter/compatibility layer
- Component is not exported in main library index (Extension-only usage)

### Changes

None

### Deferred

None

### Report Update Stamp

**Date:** 2025-12-23  
**Status:** ✅ Done

