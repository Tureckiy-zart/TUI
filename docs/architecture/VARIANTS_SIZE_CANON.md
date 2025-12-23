# Variants & Size Canon Authority Contract

**Status:** ✅ ACTIVE  
**Priority:** CRITICAL  
**Date Created:** 2025-12-19  
**Version:** 1.0  
**Enforcement:** TUNG_VARIANTS_CANON_AUTHORITY_01

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ ACTIVE  
**AUTHORITY DOMAIN:** Variants & Size Canon Authority

**Purpose:** This document defines the canonical unified size scale and variant naming dictionary across all UI components. It establishes architectural law for size and variant naming, ensuring consistency and preventing naming drift across the design system.

---

## Overview

This document defines the canonical Variants & Size Canon Authority contract for all UI components. It establishes:

- **Global unified size scale** - A single canonical size scale (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`) used across all components
- **Global variant naming dictionary** - Canonical variant names for interactive and surface components
- **Component declaration rules** - Requirements for components to declare supported sizes and variants
- **Token mapping rules** - How components map sizes/variants to tokens using global keys
- **Storybook requirements** - Mandatory Matrix and States stories for components with variants/sizes

**Key Principle:** All size and variant names must come from the global canonical dictionary. Components cannot invent variant or size names outside this dictionary. Components declare which subset of the global scale they support.

---

## Authority Chain

**Variants & Size Canon Authority** is the single source of truth for all size and variant naming across all UI components in the design system.

**Authority Hierarchy:**
1. **Variants & Size Canon Authority Contract** (this document) - Defines global size scale and variant dictionary
2. **Component Implementation** - Components declare supported sizes/variants from global dictionary
3. **Token System** - Component-specific tokens map to global size/variant keys
4. **Storybook Documentation** - Matrix and States stories demonstrate all combinations

---

## Global Unified Size Scale

### Canonical Size Scale

The **ONLY** allowed size values across the entire design system are:

```typescript
type GlobalSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
```

**Canonical Values:**
- `xs` - Extra small
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large
- `xl` - Extra large
- `2xl` - 2X large
- `3xl` - 3X large

**Default Value:** `md` is the global default size. Individual components may override this default if needed, but `md` should be the standard default.

### Component-Specific Subset Declarations

**Rule:** Components **MUST** declare which subset of the global size scale they support.

**Examples:**
- **Button** (interactive component) → `supportedSizes: ["sm", "md", "lg"]` (subset of global scale)
- **Typography** (text component) → `supportedSizes: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"]` (full scale)
- **Input** (interactive component) → `supportedSizes: ["sm", "md", "lg"]` (subset of global scale)
- **Popover** (overlay component) → `supportedSizes: ["sm", "md", "lg"]` (subset of global scale, overlay restriction)

**Rationale:** Different component types have different size requirements. Interactive components (Button, Input) use a restricted subset (`sm`, `md`, `lg`) for accessibility and consistency. Typography components use the full scale for text hierarchy. Surface components may use subsets based on their use case.

**Forbidden Non-GlobalSize Values (EXPLICIT LIST):**

The following values are **FORBIDDEN** in size props and violate this authority:

- ❌ `'icon'` - **FORBIDDEN** (use `iconOnly` boolean prop instead, see Icon-Only Pattern section)
- ❌ `'tiny'` - **FORBIDDEN** (use `xs` instead)
- ❌ `'huge'` - **FORBIDDEN** (use `3xl` instead)
- ❌ `'smaller'` - **FORBIDDEN** (use appropriate GlobalSize value)
- ❌ `'larger'` - **FORBIDDEN** (use appropriate GlobalSize value)
- ❌ `'small'` - **FORBIDDEN** (use `sm` instead)
- ❌ `'medium'` - **FORBIDDEN** (use `md` instead)
- ❌ `'large'` - **FORBIDDEN** (use `lg` instead)
- ❌ Numeric sizes (`'1'`, `'2'`, `'3'`, etc.) - **FORBIDDEN** (use semantic GlobalSize values)

**Critical Rule:** Size props **MUST** use only GlobalSize values (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`). Any non-GlobalSize entries are **FORBIDDEN** and violate this authority.

**Special Case - Icon-Only Pattern:**
- ❌ `size="icon"` is **FORBIDDEN** (not a GlobalSize value)
- ✅ Use `iconOnly={true}` boolean prop with a GlobalSize value (e.g., `size="md"`)
- See "Icon-Only Pattern (CRITICAL)" section below for complete guidance

---

## Global Variant Naming Dictionary

### Interactive Component Variants

Canonical variant names for **interactive components** (Button, Link, Input, Select, etc.):

```typescript
type InteractiveVariant = 
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";
```

**Canonical Values:**
- `primary` - Primary action variant (highest emphasis)
- `secondary` - Secondary action variant (medium emphasis)
- `accent` - Accent color variant (brand-specific)
- `outline` - Outlined variant (border, transparent background)
- `ghost` - Ghost variant (minimal, transparent)
- `destructive` - Destructive action variant (danger, delete, remove)
- `link` - Link variant (text link style)

### Surface Component Variants

Canonical variant names for **surface components** (Card, Modal, etc.):

**Note:** Overlay components (Popover, Tooltip) are NOT surface components. See Overlay Component Rules section.

```typescript
type SurfaceVariant = 
  | "default"
  | "elevated"
  | "outlined"
  | "filled"
  | "subtle";
```

**Canonical Values:**
- `default` - Default surface variant (standard elevation, standard background)
- `elevated` - Elevated surface variant (higher shadow, raised appearance)
- `outlined` - Outlined surface variant (border, transparent or minimal background)
- `filled` - Filled surface variant (solid background, no border)
- `subtle` - Subtle surface variant (minimal background, low contrast)

### Overlay Component Rules

**Overlay components** (Tooltip, Popover, and similar overlay components) are informational surfaces that appear above content. They are **NOT** interactive controls.

**Rule:** Overlays **MUST NOT** use InteractiveVariant dictionary.

**Default Path (Recommended):**
- **(A) No variant prop at all** - Overlays are informational surfaces, not interactive controls. Visual styling should be handled via elevation, shadow, or background tokens, not variant props.

**Alternative Path (If Visual Variation Needed):**
- **(B) SurfaceVariant only** - If overlays require visual variation, they may use SurfaceVariant dictionary (`default`, `elevated`, `outlined`, `filled`, `subtle`). However, this should be rare and carefully justified.

**Rationale:** Overlays serve different semantic roles than interactive components. They provide contextual information, not user actions. Using InteractiveVariant (primary, secondary, etc.) creates semantic confusion and breaks the variant authority system.

**Forbidden:**
```typescript
// ❌ FORBIDDEN - Overlay using InteractiveVariant
<Tooltip variant="primary">...</Tooltip>
<Popover variant="secondary">...</Popover>
```

**Correct:**
```typescript
// ✅ CORRECT - Overlay with no variant prop (default path)
<Tooltip>...</Tooltip>
<Popover>...</Popover>

// ✅ CORRECT - Overlay with SurfaceVariant if visual variation needed (alternative path)
<Popover variant="elevated">...</Popover>
```

### CRITICAL: Overlay Size Restriction Rule

**CRITICAL RULE:** If an Overlay component exposes a public `size` prop, it **MUST** restrict `supportedSizes` to `sm | md | lg` only.

**Forbidden:**
- ❌ Overlay components with `xs` size (forbidden)
- ❌ Overlay components with `xl` size (forbidden)
- ❌ Overlay components with `2xl` size (forbidden)
- ❌ Overlay components with `3xl` size (forbidden)

**Rationale:** Overlay components are informational surfaces that appear above content. They require consistent, accessible sizing that aligns with interactive component size scale (`sm`, `md`, `lg`). Extended sizes (`xs`, `xl`, `2xl`, `3xl`) are reserved for typography and layout components, not overlays.

**Correct:**
```typescript
// ✅ CORRECT - Overlay with restricted size subset
export type PopoverSize = "sm" | "md" | "lg";
// Popover supports subset: sm, md, lg (from global scale, overlay restriction)
```

**Forbidden:**
```typescript
// ❌ FORBIDDEN - Overlay with extended sizes
export type PopoverSize = "xs" | "sm" | "md" | "lg" | "xl";  // xs and xl forbidden for overlays
```

**Enforcement:** This is a **hard, non-optional rule**. Any overlay component that violates this rule must be marked as ❌ BLOCKING in inventory reports and requires migration to restrict size subset.

### Component-Specific Variant Declarations

**Rule:** Components **MUST** declare which subset of the global variant dictionary they support.

**Examples:**
- **Button** (interactive) → `supportedVariants: ["primary", "secondary", "accent", "outline", "ghost", "destructive"]`
- **Input** (interactive) → `supportedVariants: ["primary", "secondary", "outline", "ghost", "destructive"]`
- **Card** (surface) → `supportedVariants: ["default", "elevated", "outlined"]`
- **Popover** (overlay) → No variants (overlay component, no variant prop)
- **Tooltip** (overlay) → No variants (overlay component, no variant prop)

**Forbidden:**
- ❌ Components inventing variant names outside the global dictionary (e.g., `danger`, `warning`, `info`, `success`)
- ❌ Components using variant names that don't match global keys (e.g., `main` instead of `primary`, `border` instead of `outline`)
- ❌ Components encoding states as variants (e.g., `disabled`, `loading`, `active` as variant names)

---

## Component Rules

### Rule 1: Size and Variant Declaration

**Components MUST explicitly declare supported sizes and variants.**

**Declaration Methods:**

**Method 1: TypeScript Type Declaration (Preferred)**
```typescript
// Component declares supported sizes
export type ButtonSize = "sm" | "md" | "lg";

// Component declares supported variants
export type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "accent" 
  | "outline" 
  | "ghost" 
  | "destructive";

// Component props use declared types
export interface ButtonProps {
  size?: ButtonSize;  // Only sm, md, lg allowed
  variant?: ButtonVariant;  // Only declared variants allowed
}
```

**Method 2: Constant Declaration**
```typescript
// Component declares supported sizes as constant
export const BUTTON_SUPPORTED_SIZES = ["sm", "md", "lg"] as const;
export type ButtonSize = typeof BUTTON_SUPPORTED_SIZES[number];

// Component declares supported variants as constant
export const BUTTON_SUPPORTED_VARIANTS = [
  "primary",
  "secondary", 
  "accent",
  "outline",
  "ghost",
  "destructive"
] as const;
export type ButtonVariant = typeof BUTTON_SUPPORTED_VARIANTS[number];
```

**Rule:** All size and variant values **MUST** come from the global canonical dictionary. Components cannot invent names.

### Rule 2: No Invented Names

**Components MUST NOT invent variant or size names outside the global dictionary.**

**Forbidden:**
- ❌ `variant="danger"` (use `destructive` instead)
- ❌ `variant="warning"` (not in global dictionary)
- ❌ `size="tiny"` (use `xs` instead)
- ❌ `size="huge"` (use `3xl` instead)
- ❌ `variant="main"` (use `primary` instead)
- ❌ `variant="border"` (use `outline` instead)

**Rationale:** Invented names create inconsistency and break the unified naming system. All names must come from the global dictionary.

### Rule 3: States Are Not Variants

**Components MUST NOT encode states as variants.**

**Forbidden:**
- ❌ `variant="disabled"` (disabled is a state, not a variant)
- ❌ `variant="loading"` (loading is a state, not a variant)
- ❌ `variant="active"` (active is a state, not a variant)
- ❌ `variant="hover"` (hover is a state, not a variant)

**Correct Pattern:**
```typescript
// ✅ CORRECT - States as props, variants as variants
<Button variant="primary" disabled={true} loading={false} />

// ❌ FORBIDDEN - States encoded as variants
<Button variant="disabled" />
<Button variant="loading" />
```

**Rationale:** States (disabled, loading, active, hover, focus-visible) are interaction conditions, not visual style variants. Variants represent visual style choices (primary, secondary, outline, etc.). Mixing states and variants creates semantic confusion and breaks the state authority system.

**Reference:** See [State Authority Contract](./STATE_AUTHORITY.md) for canonical state definitions.

### Rule 4: Token Mapping Requirements

**Components MUST map sizes and variants to tokens using global keys.**

**Token Structure Pattern:**
```
{component}.{variant}.{size}.{property}
```

**Example:**
```typescript
// Button tokens map to global size keys
BUTTON_TOKENS = {
  variant: {
    primary: {
      sm: { padding: "...", fontSize: "..." },
      md: { padding: "...", fontSize: "..." },
      lg: { padding: "...", fontSize: "..." }
    },
    secondary: {
      sm: { padding: "...", fontSize: "..." },
      md: { padding: "...", fontSize: "..." },
      lg: { padding: "...", fontSize: "..." }
    }
  }
}
```

**Rule:** Token keys **MUST** use global size/variant names. Component-specific tokens reference global keys, not component-specific names.

---

## Token Mapping Rules

### Global Key Usage

**Component-specific tokens MUST use global size/variant keys.**

**Token Mapping Pattern:**
```typescript
// ✅ CORRECT - Uses global size keys
const BUTTON_TOKENS = {
  size: {
    sm: { height: "...", padding: "..." },  // Global "sm" key
    md: { height: "...", padding: "..." },  // Global "md" key
    lg: { height: "...", padding: "..." }   // Global "lg" key
  },
  variant: {
    primary: { bg: "...", text: "..." },    // Global "primary" key
    secondary: { bg: "...", text: "..." }    // Global "secondary" key
  }
};
```

**Forbidden:**
```typescript
// ❌ FORBIDDEN - Component-specific size names
const BUTTON_TOKENS = {
  size: {
    small: { ... },   // ❌ Use "sm" instead
    medium: { ... },  // ❌ Use "md" instead
    large: { ... }    // ❌ Use "lg" instead
  }
};
```

### Token Structure

**Component tokens follow this structure:**

```
{component}.{variant?}.{size?}.{property}
```

**Examples:**
- `button.primary.md.padding` - Button, primary variant, md size, padding property
- `button.md.padding` - Button, no variant, md size, padding property
- `input.outline.sm.height` - Input, outline variant (InteractiveVariant), sm size, height property
- `popover.lg.width` - Popover, no variant, lg size, width property

**Rule:** Token structure uses global keys. Component-specific tokens are organized by variant and size using global names.

---

## Storybook Requirements

### Strict Rules

**Storybook stories are REQUIRED based on strict component capability rules:**

1. **Matrix Story** - **REQUIRED** ONLY when component publicly supports **BOTH** size AND variant props
2. **States Story** - **REQUIRED** ONLY when component has public states/interactive behavior (disabled, loading, open, error, etc.)

**These rules are non-negotiable and strictly enforced.**

### Matrix Story Requirements

**Matrix Story MUST display:**
- All supported variants as rows
- All supported sizes as columns
- Grid layout showing all variant × size combinations
- Each cell shows the component with that variant and size combination

**Example Structure:**
```typescript
export const Matrix: Story = {
  render: () => {
    const variants = ["primary", "secondary", "accent", "outline", "ghost", "destructive"];
    const sizes = ["sm", "md", "lg"];
    
    return (
      <div className="grid grid-cols-4 gap-md">
        <div></div>
        {sizes.map(size => <div key={size}>{size}</div>)}
        {variants.map(variant => (
          <React.Fragment key={variant}>
            <div>{variant}</div>
            {sizes.map(size => (
              <Component key={`${variant}-${size}`} variant={variant} size={size} />
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  }
};
```

**STRICT RULE:** Matrix story is **REQUIRED** ONLY for components that publicly support **BOTH** size AND variant props. 

**Components with only size OR only variant:**
- Matrix story is **NOT REQUIRED** (no exception)
- Components with only size: Matrix NOT REQUIRED
- Components with only variant: Matrix NOT REQUIRED

**Rationale:** Matrix stories demonstrate all combinations of size × variant. If a component doesn't support both dimensions, a full matrix is unnecessary. This rule is strictly enforced.

### States Story Requirements

**States Story MUST display:**
- All supported variants
- All supported sizes (if applicable)
- All canonical states (default, disabled, loading, etc.)
- Each combination shown side-by-side for comparison

**Example Structure:**
```typescript
export const States: Story = {
  render: () => {
    const variants = ["primary", "secondary"];
    const sizes = ["sm", "md", "lg"];
    const states = [
      { name: "Default", props: {} },
      { name: "Disabled", props: { disabled: true } },
      { name: "Loading", props: { loading: true } }
    ];
    
    return (
      <div className="space-y-lg">
        {variants.map(variant => (
          <div key={variant}>
            <h3>{variant}</h3>
            {sizes.map(size => (
              <div key={size}>
                {states.map(state => (
                  <Component 
                    key={`${variant}-${size}-${state.name}`}
                    variant={variant}
                    size={size}
                    {...state.props}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
};
```

**STRICT RULE:** States story is **REQUIRED** ONLY for components with public states/interactive behavior (disabled, loading, open, error, etc.).

**Components that DO require States story:**
- Interactive components with state props (Button, Input, Select, etc.)
- Components with loading states (public API)
- Components with error/success states (public API)
- Components with open/closed states (if public API)

**Components that DO NOT require States story:**
- Non-interactive components (Typography, Layout)
- Overlays without interactive states (Tooltip, Popover if no public states)
- Decorative components (Icon)
- Components without public state props

**Rationale:** States stories demonstrate component behavior across different interaction states. Components without interactive states don't need this documentation. This rule is strictly enforced.

### Story Naming Convention

**Stories MUST use these exact names:**
- `Matrix` - For variant × size matrix
- `States` - For state combinations

**Forbidden:**
- ❌ `VariantsMatrix` (use `Matrix`)
- ❌ `SizeMatrix` (use `Matrix`)
- ❌ `AllStates` (use `States`)
- ❌ `StateVariations` (use `States`)

### Additional Story Types (Allowed/Required)

**Canonical Story Names:** The following story types are registered with strict canonical names and requirement rules:

1. **`Matrix`** - Variant × size matrix
   - **REQUIRED** only when component publicly supports **BOTH** size AND variant props
   - Not required for size-only or variant-only components

2. **`States`** - State combinations
   - **REQUIRED** only when component has public state props or interactive behavior (disabled, loading, error, etc.)
   - Not required for non-interactive components or components without public state props

3. **`SizesGallery`** - Size demonstration gallery
   - **REQUIRED** when component exposes a public `size` prop
   - Demonstrates all supported sizes with text content, icon content (if applicable), and multi-line content (if applicable)

4. **`LongContent`** - Long content validation story
   - **REQUIRED** for Overlay components (Tooltip, Popover, etc.), regardless of whether `size` exists
   - Validates padding and maxWidth token behavior with long text content
   - Ensures overlay does not overflow or break layout

**Reference:** See [SIZE_MAPPING_SPEC.md](./SIZE_MAPPING_SPEC.md) for mapping intent and size-specific story requirements.

---

## Forbidden Patterns

### 1. Invented Variant/Size Names

**Forbidden:**
- ❌ Creating variant names outside global dictionary (`danger`, `warning`, `info`, `success`, `main`, `border`)
- ❌ Creating size names outside global scale (`tiny`, `huge`, `smaller`, `larger`, `small`, `medium`, `large`)
- ❌ Using numeric sizes (`1`, `2`, `3`) instead of semantic names
- ❌ **Using non-GlobalSize values in size props** (e.g., `size="icon"` violates strict GlobalSize requirement)

**Rationale:** Invented names break consistency and create naming drift across the design system.

### 2. Encoding States as Variants

**Forbidden:**
- ❌ `variant="disabled"` (disabled is a state prop, not a variant)
- ❌ `variant="loading"` (loading is a state prop, not a variant)
- ❌ `variant="active"` (active is a CSS state, not a variant)
- ❌ `variant="hover"` (hover is a CSS state, not a variant)

**Rationale:** States and variants are semantically different. States represent interaction conditions, variants represent visual style choices. Mixing them creates confusion and breaks the state authority system.

### 3. Missing Matrix/States Stories

**Forbidden:**
- ❌ Components with variants/sizes missing Matrix story
- ❌ Interactive components missing States story
- ❌ Stories using non-standard names (`VariantsMatrix`, `AllStates`, etc.)

**Rationale:** Matrix and States stories are required for comprehensive component documentation and visual regression testing.

### 4. Component-Specific Size/Variant Names

**Forbidden:**
- ❌ Using component-specific names in tokens (e.g., `button.small` instead of `button.sm`)
- ❌ Using non-global keys in type definitions (e.g., `type ButtonSize = "small" | "medium"`)
- ❌ Mapping global keys to component-specific names

**Rationale:** Token keys must use global names to maintain consistency and enable cross-component token sharing.

---

## Do / Don't Examples

### ✅ DO / ❌ DON'T Patterns

1. **Size Props - Use GlobalSize Only**
   - ✅ `size="md"` (GlobalSize value)
   - ❌ `size="icon"` (non-GlobalSize, violates strict requirement)

2. **Button Icon-Only Pattern**
   - ✅ `<Button iconOnly size="md" aria-label="Search">` (iconOnly prop with GlobalSize)
   - ❌ `<Button size="icon">` (non-GlobalSize in size prop)

3. **Variants vs States**
   - ✅ `variant="primary"` (InteractiveVariant from dictionary)
   - ❌ `variant="disabled"` (state, not variant - use `disabled` prop instead)

4. **Input Variants - Use InteractiveVariant**
   - ✅ `<Input variant="outline">` (InteractiveVariant from dictionary)
   - ❌ `<Input variant="default">` (not in InteractiveVariant dictionary)

5. **Overlay Components - No InteractiveVariant**
   - ✅ `<Tooltip>` (no variant prop, overlay component)
   - ❌ `<Tooltip variant="primary">` (overlay using InteractiveVariant, forbidden)

6. **Overlay Size Restriction - sm|md|lg Only**
   - ✅ `<Popover size="md">` (overlay, size restricted to sm|md|lg per CRITICAL rule)
   - ❌ `<Popover size="xl">` (overlay size beyond sm|md|lg, forbidden per CRITICAL rule)
   - ✅ `<Popover>` (overlay, no variant prop, default path)
   - ❌ `<Popover variant="primary">` (overlay using InteractiveVariant, forbidden)

---

## Examples

### Button Component

**Supported Sizes:**
```typescript
export type ButtonSize = "sm" | "md" | "lg";
// Button supports subset: sm, md, lg (from global scale)
```

**Supported Variants:**
```typescript
export type ButtonVariant = 
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "ghost"
  | "destructive";
// Button supports subset: primary, secondary, accent, outline, ghost, destructive (from global dictionary)
```

**Icon-Only Handling:**
- ButtonSize is `sm | md | lg` (GlobalSize compliant subset)
- `iconOnly` is a separate boolean prop that enforces square dimensions via SIZE_MAPPING_SPEC rules
- `iconOnly` affects layout/shape (square dimensions), but does NOT change the GlobalSize scale
- `size="icon"` is FORBIDDEN (not a GlobalSize value)
- **Reference:** See [SIZE_MAPPING_SPEC.md](./SIZE_MAPPING_SPEC.md) for iconOnly square mapping expectations

**Token Mapping:**
```typescript
// Pseudocode - token structure
BUTTON_TOKENS = {
  variant: {
    primary: {
      sm: { padding: token("spacing.sm"), fontSize: token("typography.sm") },
      md: { padding: token("spacing.md"), fontSize: token("typography.md") },
      lg: { padding: token("spacing.lg"), fontSize: token("typography.lg") }
    },
    secondary: {
      sm: { padding: token("spacing.sm"), fontSize: token("typography.sm") },
      md: { padding: token("spacing.md"), fontSize: token("typography.md") },
      lg: { padding: token("spacing.lg"), fontSize: token("typography.lg") }
    }
    // ... other variants
  }
}
```

**Storybook:**
- ✅ `Matrix` story: All 6 variants × 3 sizes = 18 combinations
- ✅ `States` story: All variants × sizes × states (default, disabled, loading)

### Icon-Only Pattern (CRITICAL)

**Status:** ✅ **CURRENT API** - `iconOnly` boolean prop is implemented in Button component.

**CRITICAL RULE:** Icon-only rendering is **NOT** a size value. Icon-only buttons use a separate `iconOnly: boolean` prop with a GlobalSize value for the `size` prop.

#### Canonical Pattern

**Current API (Implemented):**
- Button supports `iconOnly?: boolean` prop for rendering icon-only buttons
- This prop is **Button-specific** and is **NOT** part of the global size scale
- The `size` prop continues to use only GlobalSize values (`sm`, `md`, `lg`)
- Icon-only buttons use square dimensions (equal width and height) derived from the `size` prop

**Current Usage:**
```typescript
// ✅ CORRECT - iconOnly prop with GlobalSize value (current API)
<Button iconOnly size="md" aria-label="Search">
  <SearchIcon />
</Button>
```

**FORBIDDEN:**
```typescript
// ❌ FORBIDDEN - size="icon" violates strict GlobalSize requirement
<Button size="icon" aria-label="Search">
  <SearchIcon />
</Button>
```

#### Semantics

- **Square button:** Equal width and height (derived from `size` prop)
- **Padding:** Zero padding for icon-only buttons (uses `BUTTON_TOKENS.paddingIconOnly`)
- **Size scale:** Icon-only buttons use the same size scale as regular buttons (`sm`, `md`, `lg`)
- **Accessibility:** Accessible name **required** via `aria-label` when no text content is present
- **Layout/Shape:** `iconOnly` affects layout/shape (square dimensions), but **does NOT change** the GlobalSize scale

#### Key Principles

1. **GlobalSize axis stays `sm | md | lg`** (for interactive components) or full scale (for typography)
2. **`iconOnly` is a separate boolean behavior prop**, NOT a size value
3. **`iconOnly` affects layout/shape** (square dimensions), but does NOT change GlobalSize scale
4. **`size="icon"` is FORBIDDEN** - it is not a GlobalSize value

#### Rationale

Icon-only buttons are a rendering pattern, not a size. The `iconOnly` prop explicitly communicates intent while maintaining strict GlobalSize compliance for the `size` prop. This separation ensures:
- GlobalSize scale remains consistent across all components
- Icon-only rendering is a component-specific behavior, not a global size value
- Type safety: `ButtonSize` type remains `"sm" | "md" | "lg"` only

### Input Component

**Supported Sizes:**
```typescript
export type InputSize = "sm" | "md" | "lg";
// Input supports subset: sm, md, lg (from global scale)
```

**Supported Variants:**
```typescript
export type InputVariant = 
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";
// Input supports subset: primary, secondary, outline, ghost, destructive (from InteractiveVariant dictionary)
```

**Token Mapping:**
```typescript
// Pseudocode - token structure
INPUT_TOKENS = {
  variant: {
    primary: {
      sm: { padding: token("spacing.sm"), height: token("height.sm") },
      md: { padding: token("spacing.md"), height: token("height.md") },
      lg: { padding: token("spacing.lg"), height: token("height.lg") }
    },
    secondary: {
      sm: { padding: token("spacing.sm"), height: token("height.sm") },
      md: { padding: token("spacing.md"), height: token("height.md") },
      lg: { padding: token("spacing.lg"), height: token("height.lg") }
    },
    outline: {
      sm: { padding: token("spacing.sm"), height: token("height.sm"), border: token("border.default") },
      md: { padding: token("spacing.md"), height: token("height.md"), border: token("border.default") },
      lg: { padding: token("spacing.lg"), height: token("height.lg"), border: token("border.default") }
    },
    ghost: {
      sm: { padding: token("spacing.sm"), height: token("height.sm") },
      md: { padding: token("spacing.md"), height: token("height.md") },
      lg: { padding: token("spacing.lg"), height: token("height.lg") }
    },
    destructive: {
      sm: { padding: token("spacing.sm"), height: token("height.sm") },
      md: { padding: token("spacing.md"), height: token("height.md") },
      lg: { padding: token("spacing.lg"), height: token("height.lg") }
    }
  }
}
```

**Storybook:**
- ✅ `Matrix` story: 5 variants × 3 sizes = 15 combinations
- ✅ `States` story: All variants × sizes × states (default, disabled, error)

### Popover Component

**Supported Sizes:**
```typescript
export type PopoverSize = "sm" | "md" | "lg";
// Popover supports subset: sm, md, lg (from global scale)
```

**Supported Variants:**
```typescript
// Popover has no variants - size-only component
// No variant prop needed
```

**Token Mapping:**
```typescript
// Pseudocode - token structure
POPOVER_TOKENS = {
  size: {
    sm: { width: token("width.sm"), padding: token("spacing.sm") },
    md: { width: token("width.md"), padding: token("spacing.md") },
    lg: { width: token("width.lg"), padding: token("spacing.lg") }
  }
}
```

**Storybook:**
- ⚠️ `Matrix` story: Not required (size-only component, no variant prop)
- ⚠️ `States` story: Not required (overlay component, no public interactive states)

### Modal Component

**Supported Sizes:**
```typescript
// Modal has no size prop - uses responsive width/padding instead
// Size is handled via layout tokens, not size prop
```

**Supported Variants:**
```typescript
// Modal has no variants - uses elevation/shadow tokens instead
// Visual style handled via elevation tokens, not variant prop
```

**Token Mapping:**
```typescript
// Pseudocode - token structure
MODAL_TOKENS = {
  // No size/variant mapping
  // Uses layout tokens: padding, width, maxWidth, elevation
  padding: token("spacing.lg"),
  width: token("width.full"),
  maxWidth: token("width.xl"),
  elevation: token("elevation.modal")
}
```

**Storybook:**
- ✅ No Matrix story (no variants/sizes)
- ⚠️ `States` story: Not required (no public interactive states, open/closed handled by Radix internally)

---

## Integration with Existing Authorities

### Interactive Size Scale Authority

**Relationship:** The Interactive Size Scale Authority ([INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md](./INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md)) defines that interactive components use a restricted subset of the global size scale: `sm | md | lg`.

**This Authority:** Defines the global size scale (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`) and requires components to declare which subset they support.

**Compatibility:** Interactive components (Button, Input, Select) declare `supportedSizes: ["sm", "md", "lg"]`, which aligns with Interactive Size Scale Authority requirements. The global scale includes `xs` and `xl` for non-interactive components (Typography, Layout), but interactive components correctly restrict to the subset.

**Rule:** Interactive components MUST declare `supportedSizes: ["sm", "md", "lg"]` to comply with both authorities.

### Typography Authority

**Relationship:** The Typography Authority ([TYPOGRAPHY_AUTHORITY.md](./TYPOGRAPHY_AUTHORITY.md)) defines typography-specific size tokens (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, etc.).

**This Authority:** Defines the global size scale that typography components use for their `size` prop.

**Compatibility:** Typography components declare `supportedSizes: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"]`, using the full global scale. The global size scale names align with typography size tokens.

**Rule:** Typography components MUST use global size names (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`) for their `size` prop, which matches Typography Authority token names.

### State Authority

**Relationship:** The State Authority ([STATE_AUTHORITY.md](./STATE_AUTHORITY.md)) defines canonical states (`base`, `hover`, `active`, `focus-visible`, `disabled`, `loading`).

**This Authority:** Forbids encoding states as variants.

**Compatibility:** Components use states as props (`disabled`, `loading`) and variants as style choices (`primary`, `secondary`). States and variants are kept separate, maintaining compatibility with State Authority.

**Rule:** Components MUST NOT encode states as variants. States are props, variants are style choices.

---

## Unlock Procedure

Any Variants & Size Canon Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component size/variant usage
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Variants & Size Canon Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked authority aspects **MUST** be refused with reference to the Variants & Size Canon Authority lock.

**Do not modify Variants & Size Canon Authority without explicit 'Unlock Variants & Size Canon Authority' task approval.**

**Note:** Future changes to Authority rules require either:
- New Authority version (e.g., `VARIANTS_SIZE_CANON_AUTHORITY_v2.md`) with full migration path
- Explicit unlock procedure with full audit and approval

---

## Migration Notes

### Button `size="icon"` Migration (COMPLETE)

**Status:** ✅ **MIGRATION COMPLETE** - `iconOnly` boolean prop is implemented and `size="icon"` has been removed.

**Current State:**
- ✅ Button implements `iconOnly?: boolean` prop (current API)
- ✅ ButtonSize type is `"sm" | "md" | "lg"` only (GlobalSize compliant)
- ✅ `size="icon"` has been removed from ButtonSize type
- ✅ All legacy `size="icon"` usages have been migrated to `iconOnly={true}`

**Current API:**
- **Correct:** `<Button iconOnly size="md" aria-label="Search">`
- **Forbidden:** `<Button size="icon" aria-label="Search">` (not a GlobalSize value)

**Migration History:**
1. ✅ Introduced `iconOnly: boolean` prop to Button component
2. ✅ Removed `size="icon"` from ButtonSize type
3. ✅ Migrated all legacy `size="icon"` usages to `iconOnly={true}`
4. ✅ Updated all documentation to reflect iconOnly as canonical API

**Rationale:** Icon-only buttons are a rendering pattern, not a size. The `iconOnly` prop explicitly communicates intent while maintaining strict GlobalSize compliance. Migration is complete.

---

## Related Documents

- `docs/architecture/INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md` - Interactive component size restrictions
- `docs/architecture/TYPOGRAPHY_AUTHORITY.md` - Typography size tokens
- `docs/architecture/STATE_AUTHORITY.md` - State definitions (states are not variants)
- `docs/architecture/AUTHORITY_NAVIGATION.md` - Authority navigation map
- `docs/architecture/FOUNDATION_LOCK.md` - Foundation lock status

---

**Status:** ✅ **ACTIVE**  
**Version:** 1.0  
**Date Created:** 2025-12-19  
**Last Updated:** 2025-12-22  
**Priority:** CRITICAL  
**Authority Domain:** Variants & Size Canon Authority

---

## CHANGELOG

### 2025-12-22 — Icon-Only Pattern Canonical Rule (TUI_TUNG_VARIANTS_SYNC_001)

**Changes:**
- ✅ Added explicit forbidden non-GlobalSize values list (including `'icon'` as FORBIDDEN)
- ✅ Added dedicated "Icon-Only Pattern (CRITICAL)" section documenting `iconOnly` boolean prop as current API
- ✅ Updated Button Icon-Only Pattern section from "Future API" to "Current API" (iconOnly is implemented)
- ✅ Updated Migration Notes section to reflect migration is COMPLETE
- ✅ Added explicit guidance: `iconOnly` affects layout/shape but does NOT change GlobalSize scale

**Rationale:**
- Documents must match actual component implementation (iconOnly is implemented, not future)
- Explicit forbidden list prevents confusion about non-GlobalSize values
- Clear separation: GlobalSize axis vs. iconOnly behavior prop
- Ensures consistency across all Variants/Size documentation

