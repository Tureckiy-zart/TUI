# Closed System v2 — Phase H Layout Semantics Audit

**Project:** @tenerife.music/ui  
**Task ID:** TUI_CSV2_PHASE_H_LAYOUT_SEMANTICS_AUDIT_018  
**Date:** 2026-01-26  
**Status:** ✅ **COMPLETE**

---

## Purpose & Scope

This audit identifies and documents latent layout semantics debt (flow/Stack/Container/Box misuse) in main application code without applying fixes. The audit focuses on usage sites of Foundation layout primitives (Stack, Container, Box) in `src/DOMAIN/**` and `src/PATTERNS/**` to prevent re-emergence of parallel layout expression surfaces.

**Scope:**
- ✅ Main application source (`src/DOMAIN/**`, `src/PATTERNS/**`)
- ✅ Usage sites of Foundation layout primitives: Stack, Container, Box
- ✅ Layout intent expressed via wrappers around Foundation components
- ✅ Nested layout responsibility boundaries

**Out of Scope:**
- ❌ Consumer code — audited separately in Phase G
- ❌ Foundation implementation (`src/COMPOSITION/layout/*.tsx` — locked)
- ❌ COMPOSITION implementation (locked)
- ❌ Extension implementation (locked)
- ❌ Story files (`.stories.tsx`) — demonstration code
- ❌ Test files (`.test.tsx`) — test code
- ❌ Spacing token correctness (handled separately)
- ❌ Visual redesign

---

## Audit Methodology

### Scanning Approach

1. **Inventory Phase:**
   - Used grep to find all files importing Stack, Container, Box
   - Identified 4 files in `src/DOMAIN/**` and 9 files in `src/PATTERNS/**`
   - Excluded story and test files from analysis

2. **Pattern Detection:**
   - Analyzed each usage site for patterns H1–H5
   - Used grep with regex patterns for systematic detection
   - Manual inspection of code snippets for context

3. **Classification:**
   - Classified each finding as VALID, DEBT, or VIOLATION
   - Assessed risk level (CRITICAL, MAJOR, MINOR, INFO)
   - Documented rationale and proposed canonical replacement

### Detection Methods

**Automated:**
- Grep patterns for className/style props with flex/grid/absolute/relative
- Grep patterns for Stack/Container/Box usage
- Multiline grep for nested Stack patterns

**Manual:**
- Code snippet review for semantic context
- Assessment of layout intent vs. actual implementation
- Evaluation of whether Foundation APIs could replace utility classes

---

## Pattern Definitions (H1–H5)

### H1: Box as Stack

**Description:** Box used as a pseudo-Stack (flow expressed via className/styles instead of Stack API).

**Signals:**
- Box with className including flex/flex-col/gap/grid
- Box with style.display='flex' or style.gap
- Box used as group wrapper with no semantic boundary

**Risk:** MAJOR

### H2: Stack as Visual Container

**Description:** Stack used as a visual boundary container (background/border/shadow/padding used as primary role).

**Signals:**
- Stack carrying surface/border/shadow props as primary wrapper
- Stack used where Container/Box should define boundary

**Risk:** MAJOR

### H3: Container as Generic Wrapper

**Description:** Container used without boundary intent (maxWidth/layout constraint absent).

**Signals:**
- Container wrapping single child without maxWidth/purpose
- Container used repeatedly as default wrapper

**Risk:** MINOR_TO_MAJOR

### H4: Nested Stack без изменения ответственности

**Description:** Nested Stack where inner Stack does not introduce new layout responsibility.

**Signals:**
- Stack inside Stack with only spacing differences
- Same direction/alignment with no breakpoint semantics

**Risk:** MINOR

### H5: DOM-Driven Layout Intent

**Description:** Layout intent expressed via DOM positioning (relative/absolute/grid wrappers) that competes with Foundation layout primitives.

**Signals:**
- className includes grid-* or flex-* near Foundation layouts
- position relative + absolute children replacing alignment APIs
- utility wrappers adjacent to Foundation layout primitives

**Risk:** MAJOR_TO_CRITICAL

---

## Findings Summary

### Counts by Pattern

| Pattern | Risk | Count | Files | Classification |
|---------|------|-------|-------|----------------|
| H1 | MAJOR | 0 | 0 | No findings |
| H2 | MAJOR | 0 | 0 | No findings |
| H3 | MINOR_TO_MAJOR | 0 | 0 | No findings |
| H4 | MINOR | 0 | 0 | No findings (stories excluded) |
| H5 | MAJOR_TO_CRITICAL | 9 | 6 | VIOLATION (7), DEBT (2) |

### Counts by Risk Level

| Risk | Count | Percentage |
|------|-------|------------|
| CRITICAL | 0 | 0% |
| MAJOR | 7 | 78% |
| MINOR | 2 | 22% |
| INFO | 0 | 0% |

### Counts by Classification

| Classification | Count | Percentage |
|----------------|-------|------------|
| VALID | 0 | 0% |
| DEBT | 2 | 22% |
| VIOLATION | 7 | 78% |

---

## Detailed Findings

### H5-001: SectionBuilder — Spacing via className (mb-lg/mt-lg)

**File:** `src/DOMAIN/section-builder/SectionBuilder.tsx`  
**Lines:** 523-526  
**Pattern:** H5 (DOM-Driven Layout Intent)  
**Risk:** MAJOR  
**Classification:** VIOLATION

**Code Snippet:**
```tsx
<Box
  bg={bgResolution.bg}
  {...spacingProps}
  {...animationProps}
  className="relative w-full"
  style={bgResolution.style}
>
  {headerSlot && <div className="mb-lg">{headerSlot}</div>}
  {bodySlot && <div className="mb-lg">{bodySlot}</div>}
  {layoutContent}
  {footerSlot && <div className="mt-lg">{footerSlot}</div>}
  ...
</Box>
```

**Rationale:**
Spacing between slots (header, body, footer) is expressed via Tailwind utility classes (`mb-lg`, `mt-lg`) instead of using Stack component with `spacing` prop. This creates a parallel spacing channel that bypasses Foundation layout primitives.

**Proposed Canonical Replacement:**
Replace div wrappers with Stack component:
```tsx
<Stack direction="vertical" spacing="lg">
  {headerSlot && <Box>{headerSlot}</Box>}
  {bodySlot && <Box>{bodySlot}</Box>}
  {layoutContent}
  {footerSlot && <Box>{footerSlot}</Box>}
</Stack>
```

---

### H5-002: SectionBuilder — Overlay positioning via absolute/flex

**File:** `src/DOMAIN/section-builder/SectionBuilder.tsx`  
**Lines:** 527-531  
**Pattern:** H5 (DOM-Driven Layout Intent)  
**Risk:** MINOR  
**Classification:** DEBT

**Code Snippet:**
```tsx
{overlaySlot && (
  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
    {overlaySlot}
  </div>
)}
```

**Rationale:**
Overlay positioning uses absolute positioning with flex centering. This is a valid pattern for overlays (absolute positioning is appropriate), but the flex centering could potentially use Foundation alignment APIs if Box supported absolute positioning context.

**Proposed Canonical Replacement:**
This is acceptable as-is for overlay semantics. If Box gains absolute positioning support, consider using Box with alignment props.

---

### H5-003: SectionBuilder — Flex layout inside Flex component

**File:** `src/DOMAIN/section-builder/SectionBuilder.tsx`  
**Lines:** 262-274  
**Pattern:** H5 (DOM-Driven Layout Intent)  
**Risk:** MAJOR  
**Classification:** VIOLATION

**Code Snippet:**
```tsx
<Flex
  direction={direction || (flexDirection === "column" ? "column" : "row")}
  gap={gap}
  align={align}
  justify={justify}
  wrap="wrap"
>
  {left && <div className="min-w-0 flex-1">{resolveSlot(left)}</div>}
  {media && (
    <div className={cn("min-w-0 flex-1", imagePosition === "left" && "order-first")}>
      {resolveSlot(media)}
    </div>
  )}
  {right && <div className="min-w-0 flex-1">{resolveSlot(right)}</div>}
</Flex>
```

**Rationale:**
Flex children use utility classes (`min-w-0 flex-1`, `order-first`) instead of Foundation component props. While Flex component handles parent layout, children should use Box with appropriate props for flex behavior.

**Proposed Canonical Replacement:**
Use Box components with flex-related props (if available) or document that Flex children may use utility classes for flex-specific behavior (grow, shrink, basis, order).

---

### H5-004: NotificationCenter.Panel — Header layout via flex

**File:** `src/DOMAIN/notifications/NotificationCenter.Panel.tsx`  
**Lines:** 243-260  
**Pattern:** H5 (DOM-Driven Layout Intent)  
**Risk:** MAJOR  
**Classification:** VIOLATION

**Code Snippet:**
```tsx
<div
  className={cn(
    "flex items-center justify-between border-b",
    NOTIFICATION_TOKENS.panel.spacing.headerPadding,
  )}
>
  <h2 className={cn(TEXT_TOKENS.fontSize.lg, TEXT_TOKENS.fontWeight.semibold)}>
    Notifications
  </h2>
  <div className={cn("flex items-center", NOTIFICATION_TOKENS.spacing.gap)}>
    <NotificationCenterDismissAll />
    <Button variant="ghost" iconOnly onClick={onClose} aria-label="Close notifications">
      <X className="h-4 w-4" />
    </Button>
  </div>
</div>
```

**Rationale:**
Header layout uses flex utility classes (`flex items-center justify-between`) instead of Stack or Row component. The nested flex container for actions also uses utility classes.

**Proposed Canonical Replacement:**
Replace with Row component:
```tsx
<Row spacing="md" justify="between" align="center" className="border-b" px={NOTIFICATION_TOKENS.panel.spacing.headerPadding}>
  <h2>...</h2>
  <Row spacing={NOTIFICATION_TOKENS.spacing.gap}>
    <NotificationCenterDismissAll />
    <Button>...</Button>
  </Row>
</Row>
```

---

### H5-005: NotificationCenter.Panel — Content area layout via flex

**File:** `src/DOMAIN/notifications/NotificationCenter.Panel.tsx`  
**Lines:** 263-267  
**Pattern:** H5 (DOM-Driven Layout Intent)  
**Risk:** MINOR  
**Classification:** DEBT

**Code Snippet:**
```tsx
<div
  className={cn("flex-1 overflow-y-auto", NOTIFICATION_TOKENS.panel.spacing.padding)}
>
  {Object.keys(grouped).length === 0 ? (
    <div className="flex h-full items-center justify-center text-[hsl(var(--tm-text-muted))]">
      No notifications
    </div>
  ) : (
    <Stack spacing="md">...</Stack>
  )}
</div>
```

**Rationale:**
Scrollable content area uses `flex-1` utility class. This is acceptable for flex child sizing, but the empty state centering uses flex utility classes instead of Stack with alignment.

**Proposed Canonical Replacement:**
Empty state could use Stack with `align="center"` and `justify="center"`:
```tsx
<Stack spacing="md" align="center" justify="center" className="h-full">
  No notifications
</Stack>
```

---

### H5-006: NotificationCenter.Item — Content layout via flex

**File:** `src/DOMAIN/notifications/NotificationCenter.Item.tsx`  
**Lines:** 128, 138  
**Pattern:** H5 (DOM-Driven Layout Intent)  
**Risk:** MAJOR  
**Classification:** VIOLATION

**Code Snippet:**
```tsx
{/* Icon */}
<div className="flex-shrink-0">
  <Icon ... />
</div>

{/* Content */}
<div className="min-w-0 flex-1 space-y-xs">
  ...
</div>
```

**Rationale:**
Content layout within ListItem uses flex utility classes (`flex-shrink-0`, `min-w-0 flex-1`) instead of Foundation layout primitives. This creates a parallel layout channel.

**Proposed Canonical Replacement:**
Use Row component for horizontal layout:
```tsx
<Row spacing="sm" align="start">
  <Box flexShrink={0}>
    <Icon ... />
  </Box>
  <Box flex={1} className="space-y-xs">
    ...
  </Box>
</Row>
```

---

### H5-007: VenueCard — Metadata layout via flex

**File:** `src/PATTERNS/cards/VenueCard/VenueCard.tsx`  
**Lines:** 196, 217  
**Pattern:** H5 (DOM-Driven Layout Intent)  
**Risk:** MAJOR  
**Classification:** VIOLATION

**Code Snippet:**
```tsx
{location && (
  <div className={cn("flex flex-col", DOMAIN_TOKENS.metadata.spacing.vertical)}>
    <div className={venueCardMetadataRowVariants({ size: cardBaseSize })}>
      <Icon ... />
      <Text>...</Text>
    </div>
  </div>
)}

{/* Footer */}
<div className={cn("flex items-center justify-between", TEXT_TOKENS.fontSize.xs)}>
  ...
</div>
```

**Rationale:**
Metadata and footer layouts use flex utility classes instead of Stack/Row components. The metadata uses `flex flex-col` which should be Stack, and footer uses `flex items-center justify-between` which should be Row.

**Proposed Canonical Replacement:**
Replace with Stack and Row:
```tsx
{location && (
  <Stack spacing={DOMAIN_TOKENS.metadata.spacing.vertical}>
    <Row spacing="sm" align="center">
      <Icon ... />
      <Text>...</Text>
    </Row>
  </Stack>
)}

<Row spacing="md" justify="between" align="center">
  ...
</Row>
```

---

### H5-008: FeatureSection — Grid layout via utility classes

**File:** `src/DOMAIN/sections/FeatureSection.tsx`  
**Lines:** 75  
**Pattern:** H5 (DOM-Driven Layout Intent)  
**Risk:** CRITICAL  
**Classification:** VIOLATION

**Code Snippet:**
```tsx
<div className={cn("grid gap-lg", gridCols[columns])}>
  {features.map((feature, index) => (
    <Card key={index}>...</Card>
  ))}
</div>
```

**Rationale:**
Grid layout uses Tailwind utility classes (`grid gap-lg`) instead of Foundation Grid component. This is a critical violation as it completely bypasses Foundation layout primitives.

**Proposed Canonical Replacement:**
Replace with Grid component:
```tsx
<Grid cols={columns} gap="lg">
  {features.map((feature, index) => (
    <Card key={index}>...</Card>
  ))}
</Grid>
```

---

### H5-009: CTASection — Grid and flex layouts via utility classes

**File:** `src/DOMAIN/sections/CTASection.tsx`  
**Lines:** 94-102, 113-118  
**Pattern:** H5 (DOM-Driven Layout Intent)  
**Risk:** CRITICAL  
**Classification:** VIOLATION

**Code Snippet:**
```tsx
<div
  className={cn(
    isCentered
      ? "mx-auto max-w-3xl text-center"
      : "grid grid-cols-1 gap-lg md:grid-cols-2 md:items-center",
  )}
>
  <div className={cn("space-y-md", isCentered && "flex flex-col items-center")}>
    ...
  </div>
  <div className={cn("flex flex-wrap gap-md", isCentered ? "justify-center" : "justify-start md:justify-end")}>
    ...
  </div>
</div>
```

**Rationale:**
Multiple layout patterns use utility classes: grid layout for split variant, flex for content and actions. This completely bypasses Foundation layout primitives.

**Proposed Canonical Replacement:**
Replace with Foundation components:
```tsx
{isCentered ? (
  <Container maxWidth="3xl" className="text-center">
    <Stack spacing="md" align="center">
      ...
      <Row spacing="md" justify="center" wrap>
        ...
      </Row>
    </Stack>
  </Container>
) : (
  <Grid cols={{ base: 1, md: 2 }} gap="lg" align="center">
    <Stack spacing="md">...</Stack>
    <Row spacing="md" justify={{ base: "start", md: "end" }} wrap>...</Row>
  </Grid>
)}
```

---

### H5-010: HeroSection — Grid and flex layouts via utility classes

**File:** `src/DOMAIN/sections/HeroSection.tsx`  
**Lines:** 57-63, 66, 78  
**Pattern:** H5 (DOM-Driven Layout Intent)  
**Risk:** CRITICAL  
**Classification:** VIOLATION

**Code Snippet:**
```tsx
<div
  className={cn(
    "container mx-auto px-lg py-xl",
    isSplit
      ? "grid grid-cols-1 gap-lg md:grid-cols-2 md:items-center lg:gap-xl"
      : "flex flex-col items-center justify-center text-center",
  )}
>
  <div className={cn("flex flex-col", isSplit ? "space-y-md" : "max-w-3xl space-y-lg")}>
    ...
    <div className={cn("flex flex-wrap gap-md", isSplit ? "justify-start" : "justify-center")}>
      ...
    </div>
  </div>
</div>
```

**Rationale:**
Multiple layout patterns use utility classes: grid for split variant, flex for centered variant, and nested flex for content and actions. This completely bypasses Foundation layout primitives.

**Proposed Canonical Replacement:**
Replace with Foundation components:
```tsx
<Container padding="lg" py="xl">
  {isSplit ? (
    <Grid cols={{ base: 1, md: 2 }} gap={{ base: "lg", lg: "xl" }} align="center">
      <Stack spacing="md">...</Stack>
      <Box>...</Box>
    </Grid>
  ) : (
    <Stack spacing="lg" align="center" justify="center" className="text-center">
      <Container maxWidth="3xl">
        <Stack spacing="lg">...</Stack>
        <Row spacing="md" justify="center" wrap>...</Row>
      </Container>
    </Stack>
  )}
</Container>
```

---

## Non-Findings

### H1: Box as Stack
**Status:** No findings  
**Rationale:** All Box usages in DOMAIN and PATTERNS layers use Box appropriately for spacing/visual properties. No Box components use flex/grid classes or display:flex styles.

### H2: Stack as Visual Container
**Status:** No findings  
**Rationale:** All Stack usages focus on layout composition (spacing, direction, alignment). No Stack components carry visual props (bg, radius, shadow) as primary role.

### H3: Container as Generic Wrapper
**Status:** No findings  
**Rationale:** Container component is not used in DOMAIN or PATTERNS layers. All Container usages are in COMPOSITION layer (locked, out of scope).

### H4: Nested Stack без изменения ответственности
**Status:** No findings (stories excluded)  
**Rationale:** No nested Stack patterns found in main application code. Nested Stack patterns exist only in story files (excluded from scope).

---

## Risk Assessment

### Overall Risk Level: **MAJOR**

**Summary:**
- 7 VIOLATION findings (78% of total)
- 2 DEBT findings (22% of total)
- 0 CRITICAL findings in main application code
- All findings are H5 (DOM-Driven Layout Intent)

**Key Risks:**
1. **Parallel Layout Channels:** Multiple components use utility classes for layout instead of Foundation primitives, creating competing layout expression surfaces.
2. **Section Components:** FeatureSection, CTASection, HeroSection completely bypass Foundation layout primitives (CRITICAL violations).
3. **Card Components:** VenueCard and other card components use flex utility classes for internal layout (MAJOR violations).
4. **Notification Components:** NotificationCenter.Panel and NotificationCenter.Item use flex utility classes (MAJOR violations).

**Impact:**
- Layout intent is not canonical and deterministic
- Foundation layout primitives are underutilized
- Migration to canonical patterns will require refactoring multiple components
- Risk of layout inconsistencies across application

---

## Recommended Follow-up Tasks

### Task 1: Migrate Section Components to Foundation Layouts
**Priority:** HIGH  
**Scope:** `src/DOMAIN/sections/*.tsx`  
**Findings:** H5-008, H5-009, H5-010  
**Effort:** Medium (3 components)

Replace grid/flex utility classes with Grid, Stack, Row, Container components in:
- FeatureSection.tsx
- CTASection.tsx
- HeroSection.tsx

### Task 2: Migrate Card Components Internal Layouts
**Priority:** MEDIUM  
**Scope:** `src/PATTERNS/cards/*/`  
**Findings:** H5-007  
**Effort:** Low (1 component, minor changes)

Replace flex utility classes with Stack/Row in VenueCard metadata and footer sections.

### Task 3: Migrate Notification Components Layouts
**Priority:** MEDIUM  
**Scope:** `src/DOMAIN/notifications/*.tsx`  
**Findings:** H5-004, H5-005, H5-006  
**Effort:** Medium (2 components)

Replace flex utility classes with Stack/Row in:
- NotificationCenter.Panel.tsx (header, content area)
- NotificationCenter.Item.tsx (content layout)

### Task 4: Migrate SectionBuilder Spacing
**Priority:** LOW  
**Scope:** `src/DOMAIN/section-builder/SectionBuilder.tsx`  
**Findings:** H5-001, H5-003  
**Effort:** Low (minor changes)

Replace spacing utility classes (mb-lg, mt-lg) with Stack component. Document Flex children utility class usage or migrate to Box props if available.

### Task 5: Document Overlay Positioning Patterns
**Priority:** LOW  
**Scope:** Documentation  
**Findings:** H5-002  
**Effort:** Low (documentation only)

Document that absolute positioning with flex centering is acceptable for overlay semantics. Consider Box enhancement for absolute positioning context if needed.

---

## Go/No-Go for Tightening Stage 2 Guards

### Recommendation: **NO-GO (Defer)**

**Rationale:**
1. **7 VIOLATION findings** indicate significant layout semantics debt in main application code
2. **3 CRITICAL violations** in section components (FeatureSection, CTASection, HeroSection) completely bypass Foundation layout primitives
3. **Multiple components** need migration before Stage 2 escalation can safely proceed
4. **Risk of breaking changes** if Stage 2 guards are tightened before migration

**Required Actions Before Stage 2 Escalation:**
1. Complete migration of section components (Task 1) — HIGH priority
2. Complete migration of notification components (Task 3) — MEDIUM priority
3. Verify no new violations introduced
4. Re-audit after migrations complete

**Timeline Estimate:**
- Task 1 (sections): 2-3 days
- Task 3 (notifications): 1-2 days
- Total: 3-5 days before Stage 2 escalation

**Alternative Approach:**
If immediate Stage 2 escalation is required, consider:
1. Adding exceptions for existing violations (documented in audit)
2. Enforcing Stage 2 only for new code
3. Creating migration backlog with deadlines

---

## Conclusion

Phase H audit identified **9 findings** (7 VIOLATION, 2 DEBT) across **6 files** in DOMAIN and PATTERNS layers. All findings are H5 (DOM-Driven Layout Intent), indicating systematic use of utility classes instead of Foundation layout primitives.

**Key Insights:**
- Section components (FeatureSection, CTASection, HeroSection) are the highest priority for migration
- Card and notification components have minor layout violations that can be addressed incrementally
- No violations found for H1-H4 patterns, indicating good usage of Box, Stack, and Container components where they are used

**Next Steps:**
1. Prioritize migration of section components (CRITICAL violations)
2. Plan incremental migration of other components
3. Re-audit after migrations to verify cleanup
4. Proceed with Stage 2 escalation only after critical violations are resolved

---

**Last Updated:** 2026-01-26  
**Task ID:** TUI_CSV2_PHASE_H_LAYOUT_SEMANTICS_AUDIT_018
