# Component Roadmap: Stage 1 - Detailed Plan

**Status:** Active  
**Created:** 2025-12-25  
**Last Updated:** 2025-12-26  
**Stage:** 1 (Critical Components)  
**Timeline:** 3-4 weeks  
**Components:** 6
**Progress:** 3/6 completed (50%)

**Completed Components:**
- ✅ Slider / RangeSlider (2025-12-25) - PROCESS LOCKED
- ✅ Avatar / AvatarGroup (2025-12-26) - PROCESS LOCKED
- ✅ Separator (2025-12-25) - PROCESS LOCKED

---

## Stage Overview

### Goals
- Implement 6 critical components without which the library cannot be considered complete
- Establish robust patterns for Extension component development
- Ensure full token compliance and accessibility standards
- Create comprehensive Storybook documentation

### Timeline
- **Week 1:** Separator, Avatar/AvatarGroup, start Slider
- **Week 2:** Complete Slider, ScrollArea, start Command
- **Week 3:** Complete Command, DropdownMenu

### Success Criteria
- ✅ All 6 components fully implemented
- ✅ 100% token compliance (no raw values)
- ✅ All components pass a11y verification
- ✅ Storybook stories complete (Matrix + States + Realistic)
- ✅ Tests cover behavior and edge cases
- ✅ All components exported in `src/index.ts`

---

## Component 1: Slider / RangeSlider ✅

### Metadata
- **Priority:** HIGH
- **Complexity:** MEDIUM
- **Time Estimate:** 3-4 days (Actual: 3 days)
- **Radix:** `@radix-ui/react-slider`
- **Category:** Control
- **Directory:** `src/COMPOSITION/controls/Slider/`
- **Dependencies:** None
- **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
- **Date Completed:** 2025-12-25
- **Lock Date:** 2025-12-25
- **Audit Report:** `docs/reports/audit/SLIDER_BASELINE_REPORT.md`
- **PR:** `fix/slider-rangeslider-code-review-fixes`

### Why This Component
- Essential for numeric value control
- Common in filters (price range, date range)
- User-friendly alternative to numeric input
- Accessible by default with Radix

### Use Cases
- Price range filters (e.g., $10-$500)
- Volume/brightness controls
- Date range selection
- Numeric parameter adjustment
- Progress visualization (read-only mode)

---

### Tasks (18 subtasks) - ✅ ALL COMPLETED

#### Pre-Creation Verification (2 tasks)
- [x] **1.1.1** Authority Check
  - [x] Verify component doesn't exist in `EXTENSION_STATE.md`
  - [x] Verify component requirements
  - [x] Review `EXTENSION_AUTHORITY.md` compliance

- [x] **1.1.2** Component Classification
  - [x] Type: Control (numeric input primitive)
  - [x] Category: `control`
  - [x] Naming: `Slider`, `RangeSlider` (descriptive, not Foundation name)

#### Scaffold Generation (1 task)
- [x] **1.2.1** Generate component scaffold
  - [x] Verify files created:
    - `Slider.tsx` ✅
    - `Slider.stories.tsx` ✅
    - `Slider.test.tsx` ✅
    - `index.ts` ✅
    - `slider-variants.ts` ✅
  - [x] Verify directory: `src/COMPOSITION/controls/Slider/` ✅
  - [x] RangeSlider files created similarly ✅

#### Token Mapping (3 tasks)
- [x] **1.3.1** Map visual properties to tokens
  - [x] Track height → Tailwind classes (`h-1`, `h-1.5`, `h-2`)
  - [x] Track background → ColorToken (`bg-primary-200`, `bg-secondary-200`, `bg-border`)
  - [x] Track radius → RadiusToken (`rounded-full`)
  - [x] Thumb size → SizeToken (`h-4 w-4`, `h-5 w-5`, `h-6 w-6`)
  - [x] Thumb background → ColorToken (`bg-background`, borders via `border-primary-600`)
  - [x] Focus ring → (`focus-visible:ring-2 focus-visible:ring-offset-2`)

- [x] **1.3.2** Define size variants
  - [x] Sizes: `sm`, `md`, `lg` (from global size scale)
  - [x] Map sizes to track height and thumb size via CVA

- [x] **1.3.3** Verify no raw values
  - [x] No hardcoded pixels - all sizes via Tailwind tokens ✅
  - [x] No hardcoded colors - all colors via tokens ✅
  - [x] All visual props use token unions ✅

#### Implementation (4 tasks)
- [x] **1.4.1** Implement Slider component
  - [x] Wrap `@radix-ui/react-slider`
  - [x] Delegate all behavior to Radix (keyboard, focus, ARIA)
  - [x] Props: `value`, `onValueChange`, `min`, `max`, `step`, `size`, `variant`, `disabled`
  - [x] Support single value mode

- [x] **1.4.2** Implement RangeSlider component
  - [x] Support two-value mode (range selection)
  - [x] Props: `value: [number, number]`, `onValueChange: (value: [number, number]) => void`
  - [x] `minStepsBetweenThumbs={1}` to prevent thumb crossing

- [x] **1.4.3** Orientation support
  - [x] Horizontal (default) - implemented ✅
  - [x] Vertical - ✅ COMPLETED (2025-12-25)

- [x] **1.4.4** Marks/labels support
  - [x] ✅ COMPLETED (2025-12-25)
    - [x] Marks API with SliderMark interface
    - [x] Support for marks array (numbers or objects with labels)
    - [x] showMarkLabels prop to toggle label visibility
    - [x] Token-driven mark styling (sizes, colors, spacing)
    - [x] Support for both horizontal and vertical orientations
    - [x] Storybook stories demonstrating marks usage
    - [x] Unit tests for marks rendering and behavior

#### Storybook Stories (5 tasks)
- [x] **1.5.1** Matrix story (variants × sizes)
  - [x] Sizes: sm, md, lg (3 variants × 3 sizes = 9 combinations)
  - [x] Modes: single value (Slider), range (RangeSlider)

- [x] **1.5.2** States story
  - [x] Default state
  - [x] Disabled state
  - [x] All variants and sizes demonstrated

- [x] **1.5.3** Realistic usage examples
  - [x] Price range filter (RangeSlider)
  - [x] Volume control (Slider)
  - [x] Temperature adjustment (RangeSlider)
  - [x] Brightness control (Slider)
  - [x] Date range selection (RangeSlider)
  - [x] Age range filter (RangeSlider)

- [x] **1.5.4** Vertical orientation stories ✅ (2025-12-25)
  - [x] Vertical sliders in all sizes (sm, md, lg)
  - [x] Vertical range sliders in all sizes
  - [x] Vertical with marks and labels

- [x] **1.5.5** Marks/labels stories ✅ (2025-12-25)
  - [x] Marks without labels (visual tick marks only)
  - [x] Marks with labels (percentage values)
  - [x] Custom mark labels (text labels like "Low", "Medium", "High")
  - [x] Vertical orientation with marks
  - [x] Both Slider and RangeSlider variants

#### Tests (4 tasks)
- [x] **1.6.1** Behavior tests
  - [x] Value change on interaction (268 lines for Slider)
  - [x] Keyboard navigation (arrow keys, Home, End, PageUp, PageDown)
  - [x] Min/max bounds enforcement

- [x] **1.6.2** Vertical orientation tests ✅ (2025-12-25)
  - [x] Renders in vertical mode with correct ARIA attributes
  - [x] Defaults to horizontal orientation
  - [x] Applies correct variant classes for vertical orientation
  - [x] Keyboard navigation works correctly in vertical mode

- [x] **1.6.3** Marks tests ✅ (2025-12-25)
  - [x] Renders marks as numbers array
  - [x] Renders marks as SliderMark/RangeSliderMark objects
  - [x] Shows mark labels when showMarkLabels is true
  - [x] Hides mark labels when showMarkLabels is false
  - [x] Renders marks in vertical orientation
  - [x] Does not render marks when marks array is empty

- [x] **1.6.4** Token compliance tests
  - [x] Step increments
  - [x] Controlled/uncontrolled modes
  - [x] Edge cases (narrow range, negative values, decimal steps)

- [x] **1.6.2** Accessibility tests (439 lines for RangeSlider)
  - [x] ARIA attributes present (role, aria-valuenow, aria-valuemin, aria-valuemax)
  - [x] Keyboard navigation works
  - [x] Focus management for both thumbs
  - [x] Disabled state announcements

#### Verification & Export (3 tasks)
- [x] **1.7.1** Token compliance verification
  - [x] Code review passed - 100% token compliance ✅
  - [x] No raw values detected ✅

- [x] **1.7.2** Accessibility verification
  - [x] WCAG 2.1 AA standards met ✅
  - [x] All accessibility tests pass ✅

- [x] **1.7.3** Export component
  - [x] Add to `src/index.ts` ✅
  - [x] Export types: `SliderProps`, `RangeSliderProps`, `SliderSize`, `SliderVariant` ✅
  - [x] Update `EXTENSION_STATE.md` ✅ (lines 239-257)

---

### Token Requirements

**Required Tokens:**
- `CONTROL_TOKENS.slider.track.height: { sm, md, lg }` (may need to create)
- `CONTROL_TOKENS.slider.thumb.size: { sm, md, lg }` (may need to create)
- `ColorToken` (already exists): `muted`, `primary`, `accent`
- `RadiusToken` (already exists): `full`, `md`
- `ShadowToken` (already exists): `sm`, `md`
- `SpacingToken` (already exists): for marks/labels

**Token Creation Needed:**
- If slider-specific tokens don't exist in `CONTROL_TOKENS`, create them in `src/FOUNDATION/tokens/components/slider.ts`

---

### Technical Notes

**Radix API:**
- `Slider.Root` - container
- `Slider.Track` - track background
- `Slider.Range` - filled range
- `Slider.Thumb` - draggable thumb

**Key Features:**
- Supports controlled/uncontrolled modes
- Keyboard navigation (arrow keys, home/end, page up/down)
- ARIA attributes (role="slider", aria-valuemin/max/now)
- Orientation (horizontal/vertical)
- Multiple thumbs (for range)

**Accessibility:**
- Radix handles ARIA attributes automatically
- Keyboard navigation built-in
- Focus management handled by Radix

**Potential Gotchas:**
- Range mode requires array value: `value={[10, 50]}`
- Vertical orientation requires explicit height styling
- Custom marks require additional markup

---

### Success Criteria - ✅ ALL MET

- [x] Component fully implements Radix Slider API ✅
- [x] All visual properties use tokens (0 raw values) ✅
- [x] Single value and range modes both work ✅
- [x] Keyboard navigation works (arrow keys, home/end) ✅
- [x] ARIA attributes present and correct ✅
- [x] Storybook stories demonstrate all variants ✅
- [x] Tests cover behavior and accessibility ✅
- [x] Vertical orientation support ✅ (2025-12-25)
- [x] Marks/labels support with token-driven styling ✅ (2025-12-25)
- [x] Component exported in `src/index.ts` ✅
- [x] Documentation complete ✅
- [x] Pipeline 18A Complete (Steps 0-12) ✅ (2025-12-25)
- [x] PROCESS LOCKED ✅ (2025-12-25)

**Code Review Results:**
- Architecture Compliance: 100% ✅
- Token System: 100% ✅ (SLIDER_TOKENS, tokenCVA migration, including marks styling)
- Test Coverage: 98% ✅ (includes vertical & marks tests)
- Accessibility: 100% ✅ (WCAG 2.1 AA compliant)
- Storybook Coverage: 100% ✅ (includes vertical & marks stories)
- Code Quality: 95% ✅
- Pipeline 18A: ✅ Complete (Steps 0-12)
- Lock Status: ✅ PROCESS LOCKED (2025-12-25)

**Files (Updated 2025-12-25):**
- Slider: 201 lines (implementation), 395 lines (stories), 336 lines (tests)
- Slider variants: 204 lines (CVA with orientation & marks)
- RangeSlider: 205 lines (implementation), 432 lines (stories), 505 lines (tests)
- RangeSlider variants: 207 lines (CVA with orientation & marks)
- Total: ~2,485 lines of production-ready code

**New Features (2025-12-25):**
- ✅ Vertical orientation support (both Slider and RangeSlider)
- ✅ Marks/labels support with token-driven styling
- ✅ 4 new Storybook stories for vertical orientation
- ✅ 10 new Storybook stories for marks/labels
- ✅ 14 new unit tests for vertical orientation and marks

---

## Component 2: Avatar / AvatarGroup ✅

### Metadata
- **Priority:** HIGH
- **Complexity:** LOW
- **Time Estimate:** 2-3 days
- **Radix:** `@radix-ui/react-avatar`
- **Category:** Primitive
- **Directory:** `src/COMPOSITION/controls/Avatar/`
- **Dependencies:** None
- **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
- **Date Completed:** 2025-12-26
- **Lock Date:** 2025-12-26

### Why This Component
- Essential for user identification
- Common in profiles, comments, chats
- Simple but highly visible component

### Use Cases
- User profiles
- Comment sections
- Team member lists
- Chat interfaces
- Activity feeds

---

### Tasks (16 subtasks) - ✅ ALL COMPLETED

#### Pre-Creation Verification (2 tasks)
- [x] **2.1.1** Authority Check
  - [x] Verify component doesn't exist ✅
  - [x] Verify component requirements ✅
  - [x] Review Extension Authority compliance ✅

- [x] **2.1.2** Component Classification
  - [x] Type: Primitive (user representation) ✅
  - [x] Category: `primitive` ✅
  - [x] Naming: `Avatar`, `AvatarGroup` ✅

#### Scaffold Generation (1 task)
- [x] **2.2.1** Generate component scaffold ✅
  ```bash
  pnpm run component:generate -- Avatar --category primitive
  ```
  **Result:** Generated in `src/COMPOSITION/controls/Avatar/`

#### Token Mapping (3 tasks)
- [x] **2.3.1** Map visual properties to tokens ✅
  - [x] Size → Tailwind classes (`h-6 w-6` to `h-16 w-16`) ✅
  - [x] Border radius → `rounded-full` (circle), `rounded-md` (square) ✅
  - [x] Border width → `border-2` ✅
  - [x] Border color → `border-background` ✅
  - [x] Background (fallback) → `bg-muted` ✅
  - [x] Status colors → `bg-semantic-success`, `bg-semantic-warning`, `bg-muted` ✅

- [x] **2.3.2** Define size variants ✅
  - [x] Sizes: xs (24px), sm (32px), md (40px), lg (48px), xl (56px), 2xl (64px) ✅
  - [x] All sizes use token-based Tailwind classes ✅

- [x] **2.3.3** Verify no raw values ✅
  - [x] 100% token compliance verified ✅

#### Implementation (4 tasks)
- [x] **2.4.1** Implement Avatar component ✅
  - [x] Wrap `@radix-ui/react-avatar` ✅
  - [x] Props: `src`, `alt`, `size`, `shape`, `fallback`, `status` ✅
  - [x] Support image loading with fallback ✅
  - [x] Automatic initials extraction from alt text ✅

- [x] **2.4.2** Implement fallback states ✅
  - [x] Image load error → show initials ✅
  - [x] Initials extraction (e.g., "John Doe" → "JD") ✅
  - [x] Custom fallback support ✅

- [x] **2.4.3** Implement AvatarGroup component ✅
  - [x] Display multiple avatars with overlap ✅
  - [x] Support max count with "+N" indicator ✅
  - [x] Props: `avatars`, `max`, `size`, `shape`, `spacing` ✅
  - [x] Border separation for grouped avatars ✅

- [x] **2.4.4** Add status indicator support ✅
  - [x] Online/offline/busy status dot ✅
  - [x] Position: bottom-right corner ✅
  - [x] Token-based colors ✅

#### Storybook Stories (2 tasks)
- [x] **2.5.1** Matrix story ✅
  - [x] All 6 sizes × 2 shapes = 12 combinations ✅
  - [x] States: loaded, fallback (initials), custom fallback ✅
  - [x] Status indicators story ✅

- [x] **2.5.2** Realistic usage examples ✅
  - [x] User profile card ✅
  - [x] Comment section ✅
  - [x] Team member grid ✅
  - [x] AvatarGroup with overflow (+N indicator) ✅
  - [x] AvatarGroup spacing variants ✅
  - [x] 10+ total stories created ✅

#### Tests (2 tasks)
- [x] **2.6.1** Behavior tests ✅
  - [x] Image loads correctly ✅
  - [x] Fallback shown on error ✅
  - [x] Initials extraction (full name, single name, multi-word) ✅
  - [x] AvatarGroup overflow works ✅
  - [x] AvatarGroup max count logic ✅
  - [x] Status indicators ✅
  - [x] Size/shape variants ✅
  - [x] Edge cases (long names, special characters, whitespace) ✅
  - [x] 60+ test cases total ✅

- [x] **2.6.2** Accessibility tests ✅
  - [x] Alt text present on images ✅
  - [x] ARIA labels on status indicators ✅
  - [x] Keyboard accessible (via Radix) ✅

#### Verification & Export (2 tasks)
- [x] **2.7.1** Verification ✅
  - [x] Token compliance check (0 raw values) ✅
  - [x] Accessibility audit passed ✅

- [x] **2.7.2** Export component ✅
  - [x] Add to `src/index.ts` ✅
  - [x] Export types (AvatarProps, AvatarGroupProps, AvatarSize, AvatarShape, AvatarStatus, AvatarGroupSpacing) ✅
  - [x] Update `EXTENSION_STATE.md` (item 21) ✅
  - [x] Update `PROJECT_PROGRESS.md` ✅
  - [x] Update `COMPONENT_ROADMAP.md` ✅

---

### Token Requirements

**Required Tokens:**
- `SizeToken` (already exists): `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- `RadiusToken` (already exists): `full`, `md`
- `SpacingToken` (already exists): `1`, `2` (for borders)
- `ColorToken` (already exists): `border`, `muted`, `accent`, `primary`

**Token Creation Needed:** None (all tokens already exist)

---

### Technical Notes

**Radix API:**
- `Avatar.Root` - container
- `Avatar.Image` - image element
- `Avatar.Fallback` - fallback content

**Key Features:**
- Automatic fallback on image load error
- Supports custom fallback content (initials, icon)
- Controlled loading state

**Accessibility:**
- Image requires `alt` attribute
- Fallback should have accessible text

**Potential Gotchas:**
- AvatarGroup overlap requires negative margin
- Status indicator requires absolute positioning
- Max count logic requires array slicing

---

### Success Criteria

- [ ] Avatar displays images correctly
- [ ] Fallback works on error
- [ ] All sizes work (xs to 2xl)
- [ ] Circle and square shapes supported
- [ ] AvatarGroup displays with overlap
- [ ] Max count overflow works
- [ ] All visual properties use tokens
- [ ] Accessibility verified
- [ ] Exported in `src/index.ts`

---

## Component 3: Separator ✅

### Metadata
- **Priority:** HIGH
- **Complexity:** VERY LOW
- **Time Estimate:** 1 day
- **Radix:** `@radix-ui/react-separator`
- **Category:** Layout Support Primitive
- **Directory:** `src/COMPOSITION/controls/Separator/`
- **Dependencies:** None
- **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25)
- **Date Completed:** 2025-12-25
- **Lock Date:** 2025-12-25
- **Audit Report:** `docs/reports/audit/SEPARATOR_BASELINE_REPORT.md`
- **Token Compliance:** ✅ 100%

### Why This Component
- Essential for visual content separation
- Extremely common in UI layouts
- Simple but critical for structure

### Use Cases
- Section dividers
- Menu separators
- List item separators
- Content blocks
- Form sections

---

### Tasks (12 subtasks) - ✅ COMPLETE (Pipeline 18A)

#### Pre-Creation Verification (2 tasks)
- [x] **3.1.1** Authority & Lock Check
  - [x] Verified component doesn't exist (Divider was RESTRICTED, created Separator)
  - [x] Extension Authority compliant
  - [x] Status: ALLOWED → PROCESS LOCKED (Pipeline 18A Complete)

- [x] **3.1.2** Component Classification
  - [x] Type: Layout Support Primitive (Extension)
  - [x] Category: `control`
  - [x] Naming: `Separator` (Radix convention)

#### Token Mapping (2 tasks)
- [x] **3.2.1** Map visual properties to tokens
  - [x] Width/Height → `SEPARATOR_TOKENS` (w-full, h-full via tokens)
  - [x] Thickness → `SEPARATOR_TOKENS.thickness` (1px → h-px, 2px → h-[2px])
  - [x] Color → Color tokens (border, muted, primary, secondary, accent)

- [x] **3.2.2** Define orientation tokens
  - [x] `horizontal` (default)
  - [x] `vertical`
  - [x] 100% token compliance verified

#### Implementation (2 tasks)
- [x] **3.3.1** Implement Separator component
  - [x] Radix `SeparatorPrimitive.Root` wrapper
  - [x] Props: `orientation`, `decorative`, `color`, `thickness`
  - [x] All styling via tokenCVA + SEPARATOR_TOKENS

- [x] **3.3.2** Create separatorVariants with tokenCVA
  - [x] Orientation-specific classes
  - [x] Thickness variants (via SEPARATOR_TOKENS)
  - [x] Color support
  - [x] Type constraints (`satisfies Record<Type, string>`)

#### Storybook Stories (1 task)
- [x] **3.4.1** Create stories
  - [x] Orientation story (horizontal and vertical)
  - [x] Color and thickness story (all colors, both thicknesses)
  - [x] Realistic examples (FormSections, MenuItems, ContentBlocks, Toolbar)

#### Tests & Verification (2 tasks)
- [x] **3.5.1** Tests
  - [x] Orientation rendering (24 tests total)
  - [x] Color variants
  - [x] Thickness variants
  - [x] ARIA attributes (role="none" when decorative, role="separator" when semantic)

- [x] **3.5.2** Verification & Export
  - [x] Token compliance check (100% verified)
  - [x] Accessibility audit (WCAG 2.1 AA compliant)
  - [x] Exported from `src/index.ts`
  - [x] Types exported: `SeparatorProps`, `SeparatorColor`, `SeparatorThickness`

---

### Token Requirements

**Required Tokens:**
- `ColorToken` (already exists): `border`, `muted`, `primary`
- `SpacingToken` (already exists): `1`, `2` (thickness), `sm`, `md`, `lg` (margin)

**Token Creation Needed:** None

---

### Technical Notes

**Radix API:**
- `Separator` - single component
- Props: `orientation` (horizontal/vertical), `decorative` (boolean)

**Key Features:**
- Simple horizontal/vertical line
- Semantic HTML with proper ARIA role
- Decorative mode (no semantic meaning)

**Accessibility:**
- Uses `role="separator"` for semantic separators
- Uses `role="none"` for decorative separators
- Orientation communicated via ARIA

**Potential Gotchas:**
- Vertical separator requires container with explicit height
- Decorative vs semantic distinction important for a11y

---

### Success Criteria - ✅ ALL MET

- [x] Separator component fully functional ✅
- [x] Horizontal and vertical orientations work ✅
- [x] All visual properties use tokens (100% token compliance) ✅
- [x] ARIA attributes correct (Radix delegation) ✅
- [x] Token compliance 100% (tokenCVA, SEPARATOR_TOKENS) ✅
- [x] Storybook stories complete (Matrix, States, 4 realistic examples) ✅
- [x] Tests pass (24/24 passing) ✅
- [x] Exported from `src/index.ts` ✅
- [x] Pipeline 18A Complete (Steps 0-12) ✅
- [x] PROCESS LOCKED (2025-12-25) ✅

---

## Component 4: ScrollArea

### Metadata
- **Priority:** HIGH
- **Complexity:** MEDIUM
- **Time Estimate:** 2-3 days
- **Radix:** `@radix-ui/react-scroll-area`
- **Category:** Layout
- **Directory:** `src/COMPOSITION/layout/ScrollArea/`
- **Dependencies:** None

### Why This Component
- Custom scrollbars for cross-browser consistency
- Better UX than native scrollbars
- Common in sidebars, menus, long lists

### Use Cases
- Sidebar navigation
- Dropdown menus
- Long content lists
- Chat messages
- Code editors

---

### Tasks (17 subtasks)

#### Pre-Creation Verification (2 tasks)
- [ ] **4.1.1** Authority Check
- [ ] **4.1.2** Component Classification (Layout utility)

#### Scaffold Generation (1 task)
- [ ] **4.2.1** Generate scaffold
  ```bash
  pnpm run component:generate -- ScrollArea --category layout
  ```

#### Token Mapping (3 tasks)
- [ ] **4.3.1** Map visual properties
  - [ ] Scrollbar width → `SpacingToken` (e.g., `2`, `sm`)
  - [ ] Scrollbar thumb color → `ColorToken` (e.g., `muted`, `primary`)
  - [ ] Scrollbar track color → `ColorToken` (e.g., `background`, `muted`)
  - [ ] Scrollbar radius → `RadiusToken` (e.g., `sm`, `md`)

- [ ] **4.3.2** Define size variants
  - [ ] Scrollbar sizes: `sm`, `md`, `lg`

- [ ] **4.3.3** Verify no raw values

#### Implementation (4 tasks)
- [ ] **4.4.1** Implement ScrollArea component
  - [ ] Wrap `@radix-ui/react-scroll-area`
  - [ ] Props: `width`, `height`, `scrollbarSize`, `orientation`
  - [ ] Delegate scrollbar behavior to Radix

- [ ] **4.4.2** Style scrollbars with tokens
  - [ ] Custom scrollbar styling
  - [ ] Thumb and track styling

- [ ] **4.4.3** Add orientation support
  - [ ] Vertical (default)
  - [ ] Horizontal
  - [ ] Both

- [ ] **4.4.4** Add scroll shadow indicators (optional)
  - [ ] Top/bottom shadows when scrollable
  - [ ] Left/right shadows for horizontal

#### Storybook Stories (2 tasks)
- [ ] **4.5.1** Matrix story
  - [ ] Scrollbar sizes: sm, md, lg
  - [ ] Orientations: vertical, horizontal, both

- [ ] **4.5.2** Realistic examples
  - [ ] Sidebar navigation
  - [ ] Long content list
  - [ ] Chat messages

#### Tests (2 tasks)
- [ ] **4.6.1** Behavior tests
  - [ ] Scrolling works
  - [ ] Custom scrollbar renders

- [ ] **4.6.2** Accessibility tests
  - [ ] Keyboard navigation (arrow keys, page up/down)
  - [ ] Screen reader support

#### Verification & Export (3 tasks)
- [ ] **4.7.1** Token compliance
- [ ] **4.7.2** Accessibility audit
- [ ] **4.7.3** Export component

---

### Token Requirements

**Required Tokens:**
- `SpacingToken` (already exists): `2`, `sm`, `md` (scrollbar width)
- `ColorToken` (already exists): `muted`, `primary`, `background`
- `RadiusToken` (already exists): `sm`, `md`

**Token Creation Needed:** None

---

### Technical Notes

**Radix API:**
- `ScrollArea.Root` - container
- `ScrollArea.Viewport` - scrollable content
- `ScrollArea.Scrollbar` - scrollbar (vertical/horizontal)
- `ScrollArea.Thumb` - draggable thumb
- `ScrollArea.Corner` - corner element (when both scrollbars visible)

**Key Features:**
- Cross-browser consistent scrollbars
- Customizable styling
- Native scrolling behavior
- Supports touch devices

**Accessibility:**
- Native scrolling semantics preserved
- Keyboard navigation works
- Screen reader compatible

**Potential Gotchas:**
- Requires explicit width/height on container
- Scrollbar visibility controlled by content overflow
- Corner element needed for both scrollbars

---

### Success Criteria

- [ ] ScrollArea renders custom scrollbars
- [ ] Scrolling works smoothly
- [ ] All orientations supported
- [ ] All visual properties use tokens
- [ ] Keyboard navigation works
- [ ] Accessibility verified
- [ ] Exported in `src/index.ts`

---

## Component 5: Command / CommandPalette

### Metadata
- **Priority:** HIGH
- **Complexity:** HIGH
- **Time Estimate:** 5-7 days
- **Radix:** Custom implementation (Dialog + custom search)
- **Category:** Composite
- **Directory:** `src/COMPOSITION/overlays/Command/`
- **Dependencies:** Modal (Foundation), Input, ScrollArea

### Why This Component
- Modern UX pattern (VS Code, Notion, Linear)
- Quick access to actions
- Better than traditional menus for power users

### Use Cases
- Global command search
- Quick navigation
- Action palette
- Keyboard shortcuts interface

---

### Tasks (25 subtasks)

#### Pre-Creation Verification (2 tasks)
- [ ] **5.1.1** Authority Check
- [ ] **5.1.2** Component Classification (Composite overlay)

#### Scaffold Generation (1 task)
- [ ] **5.2.1** Generate scaffold
  ```bash
  pnpm run component:generate -- Command --category composite
  ```

#### Token Mapping (4 tasks)
- [ ] **5.3.1** Map overlay properties
  - [ ] Backdrop → `OVERLAY_TOKENS.backdrop`
  - [ ] Content background → `ColorToken`
  - [ ] Content shadow → `ShadowToken`
  - [ ] Content radius → `RadiusToken`

- [ ] **5.3.2** Map input properties
  - [ ] Input height → `INPUT_TOKENS.height`
  - [ ] Input padding → `INPUT_TOKENS.padding`

- [ ] **5.3.3** Map list properties
  - [ ] Item height → `MENU_TOKENS.item.height`
  - [ ] Item padding → `MENU_TOKENS.item.padding`
  - [ ] Item hover background → `ColorToken`

- [ ] **5.3.4** Verify no raw values

#### Implementation (8 tasks)
- [ ] **5.4.1** Implement CommandRoot component
  - [ ] Wrap Modal (Foundation) for overlay
  - [ ] Props: `open`, `onOpenChange`, `trigger`

- [ ] **5.4.2** Implement CommandInput component
  - [ ] Search input with icon
  - [ ] Props: `value`, `onValueChange`, `placeholder`
  - [ ] Auto-focus on open

- [ ] **5.4.3** Implement CommandList component
  - [ ] Scrollable list of items
  - [ ] Use ScrollArea internally

- [ ] **5.4.4** Implement CommandItem component
  - [ ] Individual command item
  - [ ] Props: `onSelect`, `disabled`, `icon`, `shortcut`
  - [ ] Keyboard navigation

- [ ] **5.4.5** Implement CommandGroup component
  - [ ] Group items with label
  - [ ] Props: `heading`

- [ ] **5.4.6** Implement CommandSeparator component
  - [ ] Visual separator between groups
  - [ ] Use Separator internally

- [ ] **5.4.7** Implement search/filter logic
  - [ ] Fuzzy search support
  - [ ] Filter items based on input
  - [ ] Highlight matching text

- [ ] **5.4.8** Implement keyboard navigation
  - [ ] Arrow up/down to navigate
  - [ ] Enter to select
  - [ ] Escape to close
  - [ ] Cmd+K / Ctrl+K to open (global)

#### Storybook Stories (3 tasks)
- [ ] **5.5.1** Basic command palette
  - [ ] Simple list of commands

- [ ] **5.5.2** Grouped commands
  - [ ] Commands organized in groups

- [ ] **5.5.3** Realistic example
  - [ ] VS Code-like command palette
  - [ ] With icons, shortcuts, groups

#### Tests (4 tasks)
- [ ] **5.6.1** Search/filter tests
  - [ ] Filtering works correctly
  - [ ] Fuzzy search works

- [ ] **5.6.2** Keyboard navigation tests
  - [ ] Arrow keys navigate
  - [ ] Enter selects
  - [ ] Escape closes

- [ ] **5.6.3** Selection tests
  - [ ] onSelect callback fires
  - [ ] Palette closes on select

- [ ] **5.6.4** Accessibility tests
  - [ ] ARIA attributes correct
  - [ ] Screen reader support

#### Verification & Export (3 tasks)
- [ ] **5.7.1** Token compliance
- [ ] **5.7.2** Accessibility audit
- [ ] **5.7.3** Export component
  - [ ] Export: `Command`, `CommandInput`, `CommandList`, `CommandItem`, `CommandGroup`, `CommandSeparator`

---

### Token Requirements

**Required Tokens:**
- `OVERLAY_TOKENS` (already exists)
- `INPUT_TOKENS` (already exists)
- `MENU_TOKENS` (already exists)
- `ColorToken`, `ShadowToken`, `RadiusToken`, `SpacingToken` (all exist)

**Token Creation Needed:** None (reuse existing overlay/menu/input tokens)

---

### Technical Notes

**Implementation Strategy:**
- Use Modal (Foundation) for overlay
- Use Input for search field
- Use ScrollArea for list
- Custom keyboard navigation logic
- Optional: fuzzy search library (e.g., `fuse.js`)

**Key Features:**
- Global keyboard shortcut (Cmd+K / Ctrl+K)
- Fuzzy search
- Grouped commands
- Icons and keyboard shortcuts display
- Fast keyboard navigation

**Accessibility:**
- ARIA combobox pattern
- Keyboard navigation
- Screen reader announcements
- Focus management

**Potential Gotchas:**
- Global keyboard shortcut requires event listener setup
- Fuzzy search may require library
- Keyboard navigation state management complex
- Performance with large command lists

---

### Success Criteria

- [ ] Command palette opens/closes correctly
- [ ] Search/filter works (fuzzy search)
- [ ] Keyboard navigation works (arrows, enter, escape)
- [ ] Global keyboard shortcut works (Cmd+K)
- [ ] Groups and separators display correctly
- [ ] Icons and shortcuts display correctly
- [ ] All visual properties use tokens
- [ ] Accessibility verified (ARIA combobox)
- [ ] Exported in `src/index.ts`
- [ ] Realistic example in Storybook

---

## Component 6: Dropdown (DropdownMenu v2)

### Metadata
- **Priority:** HIGH
- **Complexity:** MEDIUM
- **Time Estimate:** 3-4 days
- **Radix:** `@radix-ui/react-dropdown-menu`
- **Category:** Composite
- **Directory:** `src/COMPOSITION/overlays/DropdownMenu/`
- **Dependencies:** None
- **Special Note:** Old DropdownMenu was removed (MIGRATION_12C), this is a fresh implementation

### Why This Component
- Essential for action menus
- Common pattern in all applications
- Replaces removed DropdownMenu

### Use Cases
- User account menus
- Action menus (edit, delete, share)
- Settings menus
- Context-specific options
- Table row actions

---

### Tasks (20 subtasks)

#### Pre-Creation Verification (2 tasks)
- [ ] **6.1.1** Authority Check
  - [ ] Confirm old DropdownMenu removed (MIGRATION_12C)
  - [ ] Verify no conflicts with existing components

- [ ] **6.1.2** Component Classification (Composite menu)

#### Scaffold Generation (1 task)
- [ ] **6.2.1** Generate scaffold
  ```bash
  pnpm run component:generate -- DropdownMenu --category composite
  ```

#### Token Mapping (3 tasks)
- [ ] **6.3.1** Map menu properties
  - [ ] Content background → `ColorToken`
  - [ ] Content shadow → `MENU_TOKENS.content.shadow`
  - [ ] Content radius → `MENU_TOKENS.content.radius`
  - [ ] Content padding → `MENU_TOKENS.content.padding`
  - [ ] Content min-width → `MENU_TOKENS.content.minWidth`

- [ ] **6.3.2** Map item properties
  - [ ] Item height → `MENU_TOKENS.item.height`
  - [ ] Item padding → `MENU_TOKENS.item.padding`
  - [ ] Item radius → `MENU_TOKENS.item.radius`
  - [ ] Item hover background → `ColorToken`

- [ ] **6.3.3** Verify no raw values

#### Implementation (6 tasks)
- [ ] **6.4.1** Implement DropdownMenuRoot component
  - [ ] Wrap `@radix-ui/react-dropdown-menu`
  - [ ] Props: `open`, `onOpenChange`, `modal`

- [ ] **6.4.2** Implement DropdownMenuTrigger component
  - [ ] Button trigger
  - [ ] Props: standard button props

- [ ] **6.4.3** Implement DropdownMenuContent component
  - [ ] Menu content container
  - [ ] Props: `side`, `align`, `sideOffset`, `alignOffset`
  - [ ] Portal rendering

- [ ] **6.4.4** Implement DropdownMenuItem component
  - [ ] Menu item
  - [ ] Props: `onSelect`, `disabled`, `icon`, `shortcut`, `destructive`

- [ ] **6.4.5** Implement supporting components
  - [ ] DropdownMenuLabel - section label
  - [ ] DropdownMenuSeparator - separator
  - [ ] DropdownMenuCheckboxItem - checkbox item
  - [ ] DropdownMenuRadioGroup - radio group
  - [ ] DropdownMenuRadioItem - radio item
  - [ ] DropdownMenuSub - sub-menu

- [ ] **6.4.6** Implement keyboard navigation
  - [ ] Arrow keys navigate
  - [ ] Enter selects
  - [ ] Escape closes
  - [ ] Type-ahead search

#### Storybook Stories (3 tasks)
- [ ] **6.5.1** Basic dropdown
  - [ ] Simple menu with items

- [ ] **6.5.2** Advanced features
  - [ ] With icons
  - [ ] With shortcuts
  - [ ] With checkboxes
  - [ ] With radio items
  - [ ] With sub-menus

- [ ] **6.5.3** Realistic examples
  - [ ] User account menu
  - [ ] Table row actions
  - [ ] Settings menu

#### Tests (2 tasks)
- [ ] **6.6.1** Behavior tests
  - [ ] Opens/closes correctly
  - [ ] Keyboard navigation works
  - [ ] Selection works
  - [ ] Sub-menus work

- [ ] **6.6.2** Accessibility tests
  - [ ] ARIA attributes correct
  - [ ] Keyboard navigation complete
  - [ ] Focus management works

#### Verification & Export (3 tasks)
- [ ] **6.7.1** Token compliance
- [ ] **6.7.2** Accessibility audit
- [ ] **6.7.3** Export component
  - [ ] Export all subcomponents
  - [ ] Export types
  - [ ] Update `EXTENSION_STATE.md`

---

### Token Requirements

**Required Tokens:**
- `MENU_TOKENS` (already exists)
- `ColorToken`, `ShadowToken`, `RadiusToken`, `SpacingToken` (all exist)

**Token Creation Needed:** None

---

### Technical Notes

**Radix API:**
- `DropdownMenu.Root` - root container
- `DropdownMenu.Trigger` - trigger button
- `DropdownMenu.Content` - menu content (portaled)
- `DropdownMenu.Item` - menu item
- `DropdownMenu.Label` - section label
- `DropdownMenu.Separator` - separator
- `DropdownMenu.CheckboxItem` - checkbox item
- `DropdownMenu.RadioGroup` - radio group
- `DropdownMenu.RadioItem` - radio item
- `DropdownMenu.Sub` - sub-menu
- `DropdownMenu.SubTrigger` - sub-menu trigger
- `DropdownMenu.SubContent` - sub-menu content

**Key Features:**
- Automatic positioning (collision detection)
- Keyboard navigation
- Type-ahead search
- Nested sub-menus
- Checkbox and radio items
- Portal rendering

**Accessibility:**
- ARIA menu pattern
- Keyboard navigation (arrows, enter, escape)
- Focus management
- Screen reader support

**Potential Gotchas:**
- Portal rendering requires proper stacking context
- Sub-menu positioning can be complex
- Type-ahead search requires careful state management

---

### Success Criteria

- [ ] Dropdown opens/closes correctly
- [ ] All menu items work
- [ ] Keyboard navigation complete
- [ ] Sub-menus work
- [ ] Checkbox/radio items work
- [ ] All visual properties use tokens
- [ ] Accessibility verified
- [ ] Exported in `src/index.ts`
- [ ] Realistic examples in Storybook

---

## Timeline Summary

### Week 1
**Day 1:** Separator (1 day)
- Unblock from RESTRICTED
- Migrate/rewrite with tokens
- Export

**Day 2-3:** Avatar / AvatarGroup (2 days)
- Scaffold
- Implementation
- AvatarGroup with overlap

**Day 4-5:** Start Slider (2 days)
- Scaffold
- Token mapping
- Basic implementation

### Week 2
**Day 1-2:** Complete Slider (2 days)
- RangeSlider mode
- Storybook stories
- Tests and export

**Day 3-5:** ScrollArea (3 days)
- Scaffold
- Implementation
- Custom scrollbar styling
- Export

### Week 3
**Day 1-4:** Command / CommandPalette (4 days)
- Scaffold
- Modal wrapper
- Search/filter logic
- Keyboard navigation
- Groups and separators

**Day 5:** Complete Command (1 day)
- Tests
- Storybook stories
- Export

### Week 3-4
**Day 1-4:** DropdownMenu (4 days)
- Scaffold
- All subcomponents
- Sub-menu support
- Checkbox/radio items
- Tests and export

---

## Resources

### Documentation
- **Component Creation Checklist:** `docs/workflows/tasks/COMPONENT_CREATION_CHECKLIST.md`
- **Extension Authority:** `docs/architecture/EXTENSION_AUTHORITY.md`
- **Token System:** `docs/architecture/TOKEN_AUTHORITY.md`
- **Radix UI Docs:** https://www.radix-ui.com/primitives/docs/overview/introduction

### CLI Commands
```bash
# Generate component scaffold
pnpm run component:generate -- <ComponentName> --category <category>

# Run tests
pnpm test <ComponentName>

# Run Storybook
pnpm storybook

# Token compliance check
pnpm run check:tokens
```

### Authority Contracts
- **Spacing Authority:** `docs/architecture/SPACING_AUTHORITY.md`
- **Typography Authority:** `docs/architecture/TYPOGRAPHY_AUTHORITY.md`
- **Motion Authority:** `docs/architecture/MOTION_AUTHORITY.md`
- **State Authority:** `docs/architecture/STATE_AUTHORITY.md`

---

## Progress Tracking

| Component | Status | Progress | Blockers |
|-----------|--------|----------|----------|
| **1. Slider** | ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25) | 18/18 tasks (100%) | None |
| **2. Avatar** | ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26) | 16/16 tasks (100%) | None |
| **3. Separator** | ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25) | 12/12 tasks (100%) | None |
| **4. ScrollArea** | 🔴 Not Started | 0/17 tasks (0%) | None |
| **5. Command** | 🔴 Not Started | 0/25 tasks (0%) | None |
| **6. DropdownMenu** | 🔴 Not Started | 0/20 tasks (0%) | None |
| **TOTAL** | 🟡 In Progress | **46/108 tasks (43%)** | - |

---

## Notes

### General Guidelines
- Always use token unions for visual properties
- Delegate behavior to Radix UI (where applicable)
- Follow Pipeline 18A for accessibility verification (STEP 10)
- Create comprehensive Storybook stories (Matrix + States + Realistic)
- Write tests for behavior and accessibility
- Update `EXTENSION_STATE.md` after completion

### Token Compliance
- Run token compliance checks before export
- Fix any violations immediately
- Document any new tokens needed

### Accessibility
- Run aXe/Lighthouse audits
- Test keyboard navigation manually
- Verify screen reader support
- Document any accessibility considerations

---

**Next Steps:**
1. Review and approve this detailed plan
2. Start with Component 1 (Slider) or Component 3 (Separator) if simpler
3. Follow task checklist for each component
4. Track progress in this document
5. Update EXTENSION_STATE.md after each completion

