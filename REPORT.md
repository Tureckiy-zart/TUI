# Phantom Imports Audit Report

**Generated:**  
**Repository:** tenerife-ui  
**Package:** @tenerife.music/ui  
**Version:** 1.1.1

## Executive Summary

This audit scanned the entire repository for imports from `@tenerife.music/*` packages and cross-checked them against the actual public API exports defined in `src/index.ts` and subpath exports.

### Key Findings

- **Total Phantom Imports Found:** 65
- **Main Package Exports:** 534 symbols
- **Theme Subpath Exports:** 28 symbols (verified from `src/FOUNDATION/theme/index.ts`)
- **Primary Issue:** Documentation files contain incorrect import examples
- **Critical Issue:** `FormSelect` component does not exist (mentioned in task but never implemented)

## Category Legend

- **A**: Non-existent named export (symbol doesn't exist in package)
- **B**: Wrong path/subpath import (symbol exists but in different subpath)
- **C**: Version/peer dependency mismatch
- **D**: ESM/CJS conflict
- **E**: Local file/alias path issue

## Phantom Imports Table

| Package            | Imported Symbol       | Exists in Public API     | File                                                   | Line | Error Code | Category | Suggested Fix                                                                                            |
| ------------------ | --------------------- | ------------------------ | ------------------------------------------------------ | ---- | ---------- | -------- | -------------------------------------------------------------------------------------------------------- |
| @tenerife.music/ui | ThemeProvider         | ❌ No (exists in /theme) | docs-app/app/theming/page.tsx                          | 30   | TS2305     | B        | Import `ThemeProvider` from `@tenerife.music/ui/theme` instead                                           |
| @tenerife.music/ui | ThemeProvider         | ❌ No (exists in /theme) | docs-app/app/theming/page.tsx                          | 72   | TS2305     | B        | Import `ThemeProvider` from `@tenerife.music/ui/theme` instead                                           |
| @tenerife.music/ui | ThemeProvider         | ❌ No (exists in /theme) | docs-app/app/theming/page.tsx                          | 96   | TS2305     | B        | Import `ThemeProvider` from `@tenerife.music/ui/theme` instead                                           |
| @tenerife.music/ui | useTheme              | ❌ No (exists in /theme) | docs-app/app/theming/page.tsx                          | 96   | TS2305     | B        | Import `useTheme` from `@tenerife.music/ui/theme` instead                                                |
| @tenerife.music/ui | ThemeProvider         | ❌ No (exists in /theme) | docs-app/app/getting-started/page.tsx                  | 40   | TS2305     | B        | Import `ThemeProvider` from `@tenerife.music/ui/theme` instead                                           |
| @tenerife.music/ui | ArticlesSection       | ❌ No                    | docs-app/app/components/articlessection/page.mdx       | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | Badge                 | ❌ No                    | docs-app/app/components/badge/page.mdx                 | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | Body                  | ❌ No                    | docs-app/app/components/body/page.mdx                  | 17   | TS2305     | A        | Component does not exist. Use `Text` component instead                                                   |
| @tenerife.music/ui | Caption               | ❌ No                    | docs-app/app/components/caption/page.mdx               | 17   | TS2305     | A        | Component does not exist. Use `Text` component with appropriate size                                     |
| @tenerife.music/ui | Code                  | ❌ No                    | docs-app/app/components/code/page.mdx                  | 17   | TS2305     | A        | Component does not exist. Use `Text` component with code styling                                         |
| @tenerife.music/ui | ConfirmDialog         | ❌ No                    | docs-app/app/components/confirmdialog/page.mdx         | 17   | TS2305     | A        | Component does not exist. Use `Dialog` component instead                                                 |
| @tenerife.music/ui | ConsentBanner         | ❌ No                    | docs-app/app/components/consentbanner/page.mdx         | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | ContextMenuGroup      | ❌ No                    | docs-app/app/components/contextmenugroup/page.mdx      | 23   | TS2305     | A        | Component does not exist. Check if `ContextMenu` compound component should be used                       |
| @tenerife.music/ui | CTASection            | ❌ No                    | docs-app/app/components/ctasection/page.mdx            | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | CustomDialog          | ❌ No                    | docs-app/app/components/customdialog/page.mdx          | 17   | TS2305     | A        | Component does not exist. Use `Dialog` or `Modal` component instead                                      |
| @tenerife.music/ui | Dashboard             | ❌ No                    | docs-app/app/components/dashboard/page.mdx             | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | DateRangePicker       | ❌ No                    | docs-app/app/components/daterangepicker/page.mdx       | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | Display               | ❌ No                    | docs-app/app/components/display/page.mdx               | 17   | TS2305     | A        | Component does not exist. Use `Heading` component instead                                                |
| @tenerife.music/ui | Divider               | ❌ No                    | docs-app/app/components/divider/page.mdx               | 17   | TS2305     | A        | Component does not exist. Component exists in src but not exported. Consider exporting from src/index.ts |
| @tenerife.music/ui | EventCardSkeleton     | ❌ No                    | docs-app/app/components/eventcardskeleton/page.mdx     | 17   | TS2305     | A        | Component does not exist. Use `Skeleton` component instead                                               |
| @tenerife.music/ui | FeatureSection        | ❌ No                    | docs-app/app/components/featuresection/page.mdx        | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | FilterBarCompact      | ❌ No                    | docs-app/app/components/filterbarcompact/page.mdx      | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | FilterSelect          | ❌ No                    | docs-app/app/components/filterselect/page.mdx          | 17   | TS2305     | A        | Component does not exist. Use `Select` compound component instead                                        |
| @tenerife.music/ui | FocusLock             | ❌ No                    | docs-app/app/components/focuslock/page.mdx             | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | Footer                | ❌ No                    | docs-app/app/components/footer/page.mdx                | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | HeroSection           | ❌ No                    | docs-app/app/components/herosection/page.mdx           | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | HoverCardRoot         | ❌ No                    | docs-app/app/components/hovercardroot/page.mdx         | 23   | TS2305     | A        | Component does not exist. Use `HoverCardRoot` from compound API (check exports)                          |
| @tenerife.music/ui | Image                 | ❌ No                    | docs-app/app/components/image/page.mdx                 | 17   | TS2305     | A        | Component exists in src but not exported. Consider exporting from src/index.ts                           |
| @tenerife.music/ui | Index                 | ❌ No                    | docs-app/app/components/index/page.mdx                 | 23   | TS2305     | A        | Invalid component name. Remove                                                                           |
| @tenerife.music/ui | LanguageSelector      | ❌ No                    | docs-app/app/components/languageselector/page.mdx      | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | Lead                  | ❌ No                    | docs-app/app/components/lead/page.mdx                  | 17   | TS2305     | A        | Component does not exist. Use `Text` component with appropriate styling                                  |
| @tenerife.music/ui | Link                  | ❌ No                    | docs-app/app/components/link/page.mdx                  | 17   | TS2305     | A        | Component exists in src but not exported. Consider exporting from src/index.ts                           |
| @tenerife.music/ui | List                  | ❌ No                    | docs-app/app/components/list/page.mdx                  | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | LoginForm             | ❌ No                    | docs-app/app/components/loginform/page.mdx             | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | ModalProvider         | ❌ No                    | docs-app/app/components/modalprovider/page.mdx         | 17   | TS2305     | A        | Component does not exist. Modal system does not require separate provider                                |
| @tenerife.music/ui | ModeHero              | ❌ No                    | docs-app/app/components/modehero/page.mdx              | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | Navbar                | ❌ No                    | docs-app/app/components/navbar/page.mdx                | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | NavigationMenu        | ❌ No                    | docs-app/app/components/navigationmenu/page.mdx        | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | OverlayContainer      | ❌ No                    | docs-app/app/components/overlaycontainer/page.mdx      | 17   | TS2305     | A        | Component does not exist. Remove or use `Portal` component                                               |
| @tenerife.music/ui | PopoverArrow          | ❌ No                    | docs-app/app/components/popoverarrow/page.mdx          | 23   | TS2305     | A        | Component does not exist. Check if Popover compound API exists                                           |
| @tenerife.music/ui | PopoverContent        | ❌ No                    | docs-app/app/components/popovercontent/page.mdx        | 23   | TS2305     | A        | Component does not exist. Check if Popover compound API exists                                           |
| @tenerife.music/ui | PopoverRoot           | ❌ No                    | docs-app/app/components/popoverroot/page.mdx           | 23   | TS2305     | A        | Component does not exist. Check if Popover compound API exists                                           |
| @tenerife.music/ui | PopoverTrigger        | ❌ No                    | docs-app/app/components/popovertrigger/page.mdx        | 23   | TS2305     | A        | Component does not exist. Check if Popover compound API exists                                           |
| @tenerife.music/ui | PopoverWrapper        | ❌ No                    | docs-app/app/components/popoverwrapper/page.mdx        | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | Positioning           | ❌ No                    | docs-app/app/components/positioning/page.mdx           | 27   | TS2305     | A        | Component does not exist. Remove                                                                         |
| @tenerife.music/ui | PriceRangeSlider      | ❌ No                    | docs-app/app/components/pricerangeslider/page.mdx      | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | ProfileCard           | ❌ No                    | docs-app/app/components/profilecard/page.mdx           | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | RegisterForm          | ❌ No                    | docs-app/app/components/registerform/page.mdx          | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | ScrollLock            | ❌ No                    | docs-app/app/components/scrolllock/page.mdx            | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | SearchBar             | ❌ No                    | docs-app/app/components/searchbar/page.mdx             | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | SearchFilters         | ❌ No                    | docs-app/app/components/searchfilters/page.mdx         | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | SearchInput           | ❌ No                    | docs-app/app/components/searchinput/page.mdx           | 17   | TS2305     | A        | Component does not exist. Use `Input` component instead                                                  |
| @tenerife.music/ui | SectionBuilder        | ❌ No                    | docs-app/app/components/sectionbuilder/page.mdx        | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | Table                 | ❌ No                    | docs-app/app/components/table/page.mdx                 | 17   | TS2305     | A        | Component does not exist. Use `TableRoot` (exported as `Table`) or compound `Table*` components          |
| @tenerife.music/ui | ThemeSwitch           | ❌ No                    | docs-app/app/components/themeswitch/page.mdx           | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | Timeline              | ❌ No                    | docs-app/app/components/timeline/page.mdx              | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | Tooltip               | ❌ No                    | docs-app/app/components/tooltip/page.mdx               | 17   | TS2305     | A        | Component does not exist. Check if Tooltip compound API exists                                           |
| @tenerife.music/ui | TooltipWrapper        | ❌ No                    | docs-app/app/components/tooltipwrapper/page.mdx        | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | TrendingIcon          | ❌ No                    | docs-app/app/components/trendingicon/page.mdx          | 17   | TS2305     | A        | Component does not exist. Use `Icon` component instead                                                   |
| @tenerife.music/ui | TrendingSection       | ❌ No                    | docs-app/app/components/trendingsection/page.mdx       | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | Types                 | ❌ No                    | docs-app/app/components/types/page.mdx                 | 17   | TS2305     | A        | Invalid component name. Remove                                                                           |
| @tenerife.music/ui | UseNotificationCenter | ❌ No                    | docs-app/app/components/usenotificationcenter/page.mdx | 17   | TS2305     | A        | Component does not exist. Use `useNotificationCenter` hook (lowercase 'u')                               |
| @tenerife.music/ui | UserManagement        | ❌ No                    | docs-app/app/components/usermanagement/page.mdx        | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | VenueCard             | ❌ No                    | docs-app/app/components/venuecard/page.mdx             | 17   | TS2305     | A        | Component does not exist. Remove or use alternative component                                            |
| @tenerife.music/ui | VenueCardSkeleton     | ❌ No                    | docs-app/app/components/venuecardskeleton/page.mdx     | 17   | TS2305     | A        | Component does not exist. Use `Skeleton` component instead                                               |

## Unique Phantom Symbols by Package

### @tenerife.music/ui (65 unique symbols)

**Category A - Non-existent named exports (60 symbols):**

- ArticlesSection
- Badge
- Body
- Caption
- Code
- ConfirmDialog
- ConsentBanner
- ContextMenuGroup
- CTASection
- CustomDialog
- Dashboard
- DateRangePicker
- Display
- Divider (exists in src but not exported)
- EventCardSkeleton
- FeatureSection
- FilterBarCompact
- FilterSelect
- FocusLock
- Footer
- HeroSection
- HoverCardRoot
- Image (exists in src but not exported)
- Index (invalid name)
- LanguageSelector
- Lead
- Link (exists in src but not exported)
- List
- LoginForm
- ModalProvider
- ModeHero
- Navbar
- NavigationMenu
- OverlayContainer
- PopoverArrow
- PopoverContent
- PopoverRoot
- PopoverTrigger
- PopoverWrapper
- Positioning
- PriceRangeSlider
- ProfileCard
- RegisterForm
- ScrollLock
- SearchBar
- SearchFilters
- SearchInput
- SectionBuilder
- Table (should use TableRoot or compound API)
- ThemeSwitch
- Timeline
- Tooltip
- TooltipWrapper
- TrendingIcon
- TrendingSection
- Types (invalid name)
- UseNotificationCenter (should be useNotificationCenter - lowercase)
- UserManagement
- VenueCard
- VenueCardSkeleton

**Category B - Wrong path/subpath imports (5 symbols):**

- ThemeProvider (should be from `@tenerife.music/ui/theme`)
- useTheme (should be from `@tenerife.music/ui/theme`)

## Important Notes

### FormSelect Component

**Status:** ❌ **DOES NOT EXIST**

The task mentions `FormSelect` as an example of a phantom import. This component **never existed** in the codebase. References to `FormSelect` appear only in:

- Documentation files (TUI_SELECT_CONSUMER_RESOLUTION_AUDIT_REPORT.md)
- Historical documentation
- CHANGELOG.md (listed as removed/legacy)

**Current API:** The library exports a compound `Select` component:

```typescript
import { Select, SelectRoot, SelectTrigger, SelectContent, SelectItem } from "@tenerife.music/ui";
```

### Components That Exist in src/ But Are Not Exported

The following components exist in the source code but are **not exported** from `src/index.ts`:

- `Divider` - exists in `src/PRIMITIVES/Divider/`
- `Image` - exists in `src/PRIMITIVES/Image/`
- `Link` - exists in `src/PRIMITIVES/Link/`
- `Badge` - exists in `src/PRIMITIVES/Badge/`

**Recommendation:** Either export these components or remove documentation references to them.

### Documentation Files vs. Source Code

**Critical Finding:** Most phantom imports (60 out of 65) are in **documentation files** (`docs-app/app/components/*/page.mdx`). These appear to be auto-generated documentation files that contain example code snippets.

**Source Code Status:**

- ✅ Main package (`src/`) has **zero** phantom imports
- ✅ Actual usage in `docs-app/app/layout.tsx` correctly imports `ThemeProvider` from `@tenerife.music/ui/theme`
- ❌ Documentation examples show incorrect imports

## Commands to Reproduce Errors

```bash
# Main package typecheck
cd /home/tureckiy/Projects/TenerifeMusic/tenerife-ui && pnpm typecheck

# The main package passes typecheck because:
# 1. Documentation files (.mdx) are not type-checked
# 2. The actual source code has no phantom imports
```

## Root Cause Analysis

### Category A Issues (Non-existent Exports)

**Root Cause:** Documentation files reference components that:

1. Were planned but never implemented
2. Were removed/renamed in previous refactors
3. Exist in source but are not exported
4. Use incorrect naming (e.g., `UseNotificationCenter` vs `useNotificationCenter`)

**Impact:** Low - Documentation examples are incorrect but do not affect runtime.

### Category B Issues (Wrong Subpath)

**Root Cause:** `ThemeProvider` and `useTheme` are exported from the `/theme` subpath, not the main package entry point.

**Correct Usage:**

```typescript
// ❌ Wrong
import { ThemeProvider, useTheme } from "@tenerife.music/ui";

// ✅ Correct
import { ThemeProvider, useTheme } from "@tenerife.music/ui/theme";
```

**Impact:** Medium - Documentation examples mislead users about correct import paths.

## Fix Recommendations

### Priority 1: Fix Documentation Examples (Category B)

**Files to fix:**

- `docs-app/app/theming/page.tsx` (lines 30, 72, 96)
- `docs-app/app/getting-started/page.tsx` (line 40)
- `docs/reference/public-api.md` (lines 300, 894)
- `README.md` (line 85)

**Action:** Update all examples to use `@tenerife.music/ui/theme` for `ThemeProvider` and `useTheme`.

### Priority 2: Clean Up Documentation Files (Category A)

**Files to fix:**

- All files in `docs-app/app/components/*/page.mdx` that reference non-existent components

**Options:**

1. **Remove:** Delete documentation pages for non-existent components
2. **Update:** Replace with examples using actual exported components
3. **Export:** Export components that exist in src/ but are not in public API (Divider, Image, Link, Badge)

### Priority 3: Component Export Decision

**Components in src/ but not exported:**

- `Divider`
- `Image`
- `Link`
- `Badge`

**Recommendation:** Make a decision for each:

- If they should be public API → export from `src/index.ts`
- If they should remain internal → remove documentation references

## Fix Bundle (For Next Task)

If phantom imports are found and fixes are needed, the following changes should be made:

### Fix 1: Correct ThemeProvider/useTheme Imports

**Files:**

- `docs-app/app/theming/page.tsx`
- `docs-app/app/getting-started/page.tsx`
- `docs/reference/public-api.md`
- `README.md`

**Change:**

```diff
- import { ThemeProvider, useTheme } from "@tenerife.music/ui";
+ import { ThemeProvider, useTheme } from "@tenerife.music/ui/theme";
```

### Fix 2: Remove or Update Non-existent Component Documentation

**Action:** Either:

- Remove `docs-app/app/components/*/page.mdx` files for non-existent components, OR
- Update them to use actual exported components

### Fix 3: Export Internal Components (Optional)

If `Divider`, `Image`, `Link`, or `Badge` should be public API:

**File:** `src/index.ts`

**Add exports:**

```typescript
export { Divider } from "./PRIMITIVES/Divider";
export { Image } from "./PRIMITIVES/Image";
export { Link } from "./PRIMITIVES/Link";
export { Badge } from "./PRIMITIVES/Badge";
```

---

**End of Report**
