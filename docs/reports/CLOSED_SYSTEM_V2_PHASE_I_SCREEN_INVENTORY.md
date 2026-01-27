# Closed System v2 — Phase I Screen Inventory

**Project:** @tenerife.music/ui  
**Task ID:** TUI_CSV2_PHASE_I_PRODUCT_MIGRATION_020  
**Date Created:** 2026-01-27  
**Status:** ✅ **COMPLETE**

---

## Purpose

This document provides a complete inventory of product screens in `src/DOMAIN/` that require migration to Closed System v2. Each screen is categorized by priority based on violation severity and complexity.

---

## Audit Summary

**Total Files Scanned:** 31  
**Total Violations:** 46

**Violation Breakdown:**
- **CRITICAL:** 1 (V1: className on Foundation)
- **MAJOR:** 43 (V3: 2, V4: 41, V5: 2)
- **MINOR:** 0
- **INFO:** 0

**Source:** `docs/reports/CLOSED_SYSTEM_V2_PHASE_I_VIOLATION_AUDIT.json`

---

## Screen Inventory

### High Priority (CRITICAL violations or simple components)

#### 1. LoginForm.tsx
- **Path:** `src/DOMAIN/auth/auth/LoginForm.tsx`
- **Violations:** 
  - V4: 1 (raw HTML `div` with `space-y-md`)
- **Complexity:** Low
- **Dependencies:** None
- **Migration Notes:** Simple form with utility-based spacing wrapper. Replace `<div className={cn("space-y-md", className)}>` with `<Stack spacing="md">`.

#### 2. RegisterForm.tsx
- **Path:** `src/DOMAIN/auth/auth/RegisterForm.tsx`
- **Violations:**
  - V4: 1 (raw HTML `div` with `space-y-md`)
- **Complexity:** Low
- **Dependencies:** None
- **Migration Notes:** Similar to LoginForm. Replace utility wrapper with Stack.

#### 3. Dashboard.tsx
- **Path:** `src/DOMAIN/admin/admin/Dashboard.tsx`
- **Violations:** 0 (no violations detected)
- **Complexity:** Low
- **Dependencies:** None
- **Migration Notes:** Uses Card component correctly. May need visual review for layout patterns.

#### 4. UserManagement.tsx
- **Path:** `src/DOMAIN/admin/admin/UserManagement.tsx`
- **Violations:** 0 (no violations detected)
- **Complexity:** Low
- **Dependencies:** None
- **Migration Notes:** Uses Card component correctly. May need visual review for layout patterns.

#### 5. EventCard.tsx
- **Path:** `src/DOMAIN/sections/EventCard/EventCard.tsx`
- **Violations:**
  - **V1 (CRITICAL):** 1 (className on Icon component)
  - **V3 (MAJOR):** 1 (utility classes on wrapper)
  - **V4 (MAJOR):** 11 (raw HTML `div` and `span` elements)
- **Complexity:** Medium
- **Dependencies:** None
- **Migration Notes:** 
  - Remove `className` from Icon (line 146)
  - Replace utility wrapper divs with Stack/Row/Box
  - Replace raw HTML with Foundation components

---

### Medium Priority (MAJOR violations, moderate complexity)

#### 6. HeroSection.tsx
- **Path:** `src/DOMAIN/sections/sections/HeroSection.tsx`
- **Violations:**
  - **V4 (MAJOR):** 5 (raw HTML `div` and `section` elements)
- **Complexity:** Medium
- **Dependencies:** None
- **Migration Notes:**
  - Replace `<section>` with `<Section>` component
  - Replace `container mx-auto px-lg` pattern with `<Container padding="lg">`
  - Replace `grid grid-cols-1 gap-lg md:grid-cols-2` with `<Grid cols={{ base: 1, md: 2 }} gap="lg">`
  - Replace flex utility wrappers with Stack/Row

#### 7. FeatureSection.tsx
- **Path:** `src/DOMAIN/sections/sections/FeatureSection.tsx`
- **Violations:**
  - **V4 (MAJOR):** 4 (raw HTML `div` and `section` elements)
- **Complexity:** Medium
- **Dependencies:** None
- **Migration Notes:**
  - Replace `<section>` with `<Section>` component
  - Replace `container mx-auto px-lg` with `<Container padding="lg">`
  - Replace `grid gap-lg` with `<Grid cols={...} gap="lg">`
  - Replace utility wrapper divs with Stack/Box

#### 8. CTASection.tsx
- **Path:** `src/DOMAIN/sections/sections/CTASection.tsx`
- **Violations:**
  - **V4 (MAJOR):** 4 (raw HTML `div` and `section` elements)
- **Complexity:** Medium
- **Dependencies:** None
- **Migration Notes:**
  - Replace `<section>` with `<Section>` component
  - Replace utility wrapper divs with Stack/Container
  - Replace flex utility classes with Row/Stack

#### 9. ArticlesSection.tsx
- **Path:** `src/DOMAIN/sections/sections/ArticlesSection.tsx`
- **Violations:**
  - **V3 (MAJOR):** 1 (utility classes on wrapper)
  - **V4 (MAJOR):** 3 (raw HTML `div` elements)
- **Complexity:** Medium
- **Dependencies:** None
- **Migration Notes:**
  - Replace utility wrapper with Stack/Container
  - Replace raw HTML divs with Foundation components

#### 10. TrendingSection.tsx
- **Path:** `src/DOMAIN/sections/sections/TrendingSection.tsx`
- **Violations:** 0 (no violations detected)
- **Complexity:** Low
- **Dependencies:** None
- **Migration Notes:** Uses Card component. May need visual review.

#### 11. ProfileCard.tsx
- **Path:** `src/DOMAIN/auth/auth/ProfileCard.tsx`
- **Violations:** 0 (no violations detected)
- **Complexity:** Low
- **Dependencies:** None
- **Migration Notes:** Uses Card component. May need visual review.

---

### Low Priority (Complex components or multiple files)

#### 12. SectionBuilder.tsx
- **Path:** `src/DOMAIN/section-builder/SectionBuilder.tsx`
- **Violations:**
  - **V4 (MAJOR):** 14 (raw HTML `div` elements)
- **Complexity:** High
- **Dependencies:** None
- **Migration Notes:**
  - Complex component with many layout patterns
  - Replace utility wrapper divs with Stack/Row/Box
  - Replace `min-w-0 flex-1` patterns with Box props (if available) or Row/Stack
  - Many divs used for layout composition - replace with Foundation layout components

#### 13. NotificationCenter.* (10 files)
- **Path:** `src/DOMAIN/notifications/notifications/`
- **Violations:**
  - **V5 (MAJOR):** 2 (prop smuggling in DismissAll.tsx and Trigger.tsx)
- **Complexity:** Medium-High
- **Dependencies:** Multiple interconnected files
- **Migration Notes:**
  - Fix prop smuggling: explicitly type props as `ButtonProps` in DismissAll.tsx and Trigger.tsx
  - Review other NotificationCenter files for layout patterns (not detected by audit but may exist)

**Files:**
- NotificationCenter.tsx
- NotificationCenter.Provider.tsx
- NotificationCenter.Trigger.tsx (V5 violation)
- NotificationCenter.Panel.tsx
- NotificationCenter.List.tsx
- NotificationCenter.Item.tsx
- NotificationCenter.GroupHeader.tsx
- NotificationCenter.DismissAll.tsx (V5 violation)
- NotificationCenter.types.ts
- NotificationCenter.utils.ts
- useNotificationCenter.tsx

#### 14. LanguageSelector.tsx
- **Path:** `src/DOMAIN/controls/LanguageSelector/LanguageSelector.tsx`
- **Violations:** 0 (no violations detected)
- **Complexity:** Low
- **Dependencies:** None
- **Migration Notes:** May need visual review for layout patterns.

---

## Migration Priority Summary

### Phase I.1 — High Priority (5 screens)
1. EventCard.tsx (CRITICAL violation)
2. LoginForm.tsx
3. RegisterForm.tsx
4. Dashboard.tsx (review)
5. UserManagement.tsx (review)

### Phase I.2 — Medium Priority (5 screens)
6. HeroSection.tsx
7. FeatureSection.tsx
8. CTASection.tsx
9. ArticlesSection.tsx
10. TrendingSection.tsx (review)

### Phase I.3 — Low Priority (2 groups)
11. SectionBuilder.tsx
12. NotificationCenter.* (10 files)
13. ProfileCard.tsx (review)
14. LanguageSelector.tsx (review)

---

## Dependencies

**No cross-screen dependencies identified.** Each screen can be migrated independently.

---

## Notes

1. **Screens with 0 violations:** Dashboard, UserManagement, TrendingSection, ProfileCard, LanguageSelector may still contain layout patterns that should use Foundation components but weren't detected by automated audit. Manual review recommended.

2. **SectionBuilder complexity:** This component has the most violations (14) and uses complex layout patterns. Consider breaking into smaller migration steps.

3. **NotificationCenter prop smuggling:** V5 violations are straightforward to fix - just need explicit typing.

4. **EventCard CRITICAL:** Must be fixed first due to CRITICAL violation (className on Foundation Icon).

---

**Last Updated:** 2026-01-27  
**Next Step:** Create violation mapping document (I2)
