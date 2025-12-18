# Foundation Allowed HTML Props Audit

**Date:**    
**Auditor:** UI Architecture Auditor  
**Scope:** Foundation components only (Button, Link, Text, Heading, Input, Textarea, Checkbox, Radio, Label)  
**Status:** Research Only (No Code Changes)  
**Authority:** `docs/architecture/FOUNDATION_CONTRACT.md`, `docs/architecture/FOUNDATION_COMPONENT_SCOPE.md`

---

## Executive Summary

This document identifies which HTML and behavioral props **must remain allowed** for each Foundation component after Phase 3 TypeScript enforcement removes `className` and `style` props.

**Key Principle:** Foundation components are visually closed, but they must still support:
- **Behavioral props** - Control component behavior (onClick, onChange, disabled, etc.)
- **Accessibility props** - ARIA attributes, roles, labels
- **Native HTML attributes** - Required for semantic HTML and browser behavior (href, type, value, checked, name, etc.)

**Explicitly Forbidden:**
- `className` - Visual styling override (will be removed in Phase 3)
- `style` - Inline style override (will be removed in Phase 3)

---

## Component-by-Component Analysis

### 1. Button

**Component:** `src/PRIMITIVES/Button/Button.tsx`  
**Base Type:** `React.ButtonHTMLAttributes<HTMLButtonElement>`  
**Status:** ✅ **FINAL LOCK** (2025-12-15)

#### Allowed Behavioral Props

**Required for Functionality:**
- `onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void` - Click handler
- `onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void` - Focus handler
- `onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void` - Blur handler
- `onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void` - Keyboard handler
- `onKeyUp?: (event: React.KeyboardEvent<HTMLButtonElement>) => void` - Keyboard handler
- `disabled?: boolean` - Disabled state
- `type?: "button" | "submit" | "reset"` - Button type (default: "button")
- `form?: string` - Form association
- `formAction?: string` - Form action URL
- `formMethod?: "get" | "post"` - Form method
- `formNoValidate?: boolean` - Form validation
- `formTarget?: string` - Form target

**Radix Slot Support:**
- `asChild?: boolean` - Render as child component

**Custom Props:**
- `leftIcon?: React.ReactNode` - Left icon slot
- `rightIcon?: React.ReactNode` - Right icon slot

#### Allowed Accessibility Props

**ARIA Attributes:**
- `aria-label?: string` - Accessible label
- `aria-labelledby?: string` - Label reference
- `aria-describedby?: string` - Description reference
- `aria-disabled?: boolean` - Disabled state (synced with disabled prop)
- `aria-pressed?: boolean | "mixed"` - Toggle button state (if applicable)
- `aria-expanded?: boolean` - Expanded state (if applicable)
- `aria-controls?: string` - Controlled element ID
- `aria-haspopup?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog"` - Popup type
- `role?: string` - Override role (rarely needed, defaults to "button")

**Data Attributes:**
- `data-*?: string` - Any data attribute for testing/analytics

#### Allowed Native HTML Attributes

**Standard Attributes:**
- `id?: string` - Element ID
- `name?: string` - Form field name
- `tabIndex?: number` - Tab order
- `autoFocus?: boolean` - Auto-focus on mount
- `title?: string` - Tooltip text

**Event Handlers (from HTMLAttributes):**
- All standard React event handlers (onMouseEnter, onMouseLeave, onContextMenu, etc.)

#### Explicitly Forbidden Props

- ❌ `className` - Visual styling override (will be removed in Phase 3)
- ❌ `style` - Inline style override (will be removed in Phase 3)

#### Notes / Edge Cases

- Button uses Radix Slot for `asChild` pattern, which requires forwarding all props to child
- Icon slots are internal implementation details but must be preserved
- `disabled` prop is critical for form behavior and accessibility
- `type="submit"` is required for form submission behavior

---

### 2. Link

**Component:** `src/PRIMITIVES/Link/Link.tsx`  
**Base Type:** `React.AnchorHTMLAttributes<HTMLAnchorElement>`  
**Status:** ✅ **FINAL LOCK** (2025-12-18)

#### Allowed Behavioral Props

**Required for Functionality:**
- `href?: string` - Navigation URL (required for anchor semantics)
- `target?: "_self" | "_blank" | "_parent" | "_top"` - Link target
- `rel?: string` - Link relationship (e.g., "noopener noreferrer")
- `download?: string | boolean` - Download attribute
- `onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void` - Click handler
- `onFocus?: (event: React.FocusEvent<HTMLAnchorElement>) => void` - Focus handler
- `onBlur?: (event: React.FocusEvent<HTMLAnchorElement>) => void` - Blur handler
- `disabled?: boolean` - Disabled state (custom implementation, not native)

**Radix Slot Support:**
- `asChild?: boolean` - Render as child component

**Custom Props:**
- `leftIcon?: React.ReactNode` - Left icon slot
- `rightIcon?: React.ReactNode` - Right icon slot

#### Allowed Accessibility Props

**ARIA Attributes:**
- `aria-label?: string` - Accessible label
- `aria-labelledby?: string` - Label reference
- `aria-describedby?: string` - Description reference
- `aria-disabled?: boolean` - Disabled state (synced with disabled prop)
- `aria-current?: "page" | "step" | "location" | "date" | "time" | boolean` - Current page indicator
- `role?: string` - Override role (defaults to "link")

**Data Attributes:**
- `data-*?: string` - Any data attribute for testing/analytics

#### Allowed Native HTML Attributes

**Standard Attributes:**
- `id?: string` - Element ID
- `name?: string` - Anchor name
- `tabIndex?: number` - Tab order (critical for disabled state: -1)
- `autoFocus?: boolean` - Auto-focus on mount
- `title?: string` - Tooltip text
- `lang?: string` - Language code
- `hreflang?: string` - Link language

**Event Handlers:**
- All standard React event handlers

#### Explicitly Forbidden Props

- ❌ `className` - Visual styling override (will be removed in Phase 3)
- ❌ `style` - Inline style override (will be removed in Phase 3)

#### Notes / Edge Cases

- Link implements custom `disabled` behavior (not native to `<a>` element)
- When `disabled={true}`, `tabIndex={-1}` and `aria-disabled={true}` are set
- `href` is optional in TypeScript but semantically required for navigation
- Link uses Radix Slot for `asChild` pattern

---

### 3. Text

**Component:** `src/PRIMITIVES/Text/Text.tsx`  
**Base Type:** `React.HTMLAttributes<HTMLSpanElement>`  
**Status:** ⏳ **PROPOSED** (not yet locked)

#### Allowed Behavioral Props

**Required for Functionality:**
- `onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void` - Click handler
- `onFocus?: (event: React.FocusEvent<HTMLSpanElement>) => void` - Focus handler
- `onBlur?: (event: React.FocusEvent<HTMLSpanElement>) => void` - Blur handler
- `onMouseEnter?: (event: React.MouseEvent<HTMLSpanElement>) => void` - Mouse enter
- `onMouseLeave?: (event: React.MouseEvent<HTMLSpanElement>) => void` - Mouse leave

**Custom Props:**
- `size?: "xs" | "sm" | "md" | "lg" | "xl"` - Text size (token-driven)
- `weight?: "normal" | "medium" | "semibold" | "bold"` - Font weight (token-driven)
- `muted?: boolean` - Muted text color (token-driven)
- `variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive" | "muted"` - **DEPRECATED** (use muted prop)

#### Allowed Accessibility Props

**ARIA Attributes:**
- `aria-label?: string` - Accessible label
- `aria-labelledby?: string` - Label reference
- `aria-describedby?: string` - Description reference
- `role?: string` - Override role (defaults to inline text)

**Data Attributes:**
- `data-*?: string` - Any data attribute

#### Allowed Native HTML Attributes

**Standard Attributes:**
- `id?: string` - Element ID
- `tabIndex?: number` - Tab order (if interactive)
- `title?: string` - Tooltip text
- `lang?: string` - Language code
- `dir?: "ltr" | "rtl"` - Text direction

**Event Handlers:**
- All standard React event handlers

#### Explicitly Forbidden Props

- ❌ `className` - Visual styling override (will be removed in Phase 3)
- ❌ `style` - Inline style override (will be removed in Phase 3)

#### Notes / Edge Cases

- Text renders as `<span>` by default (inline element)
- `variant` prop is deprecated but must remain for backward compatibility until migration
- Text is primarily presentational, so behavioral props are less critical than interactive components

---

### 4. Heading

**Component:** `src/PRIMITIVES/Heading/Heading.tsx`  
**Base Type:** `React.HTMLAttributes<HTMLHeadingElement>`  
**Status:** ⏳ **PROPOSED** (not yet locked)

#### Allowed Behavioral Props

**Required for Functionality:**
- `onClick?: (event: React.MouseEvent<HTMLHeadingElement>) => void` - Click handler
- `onFocus?: (event: React.FocusEvent<HTMLHeadingElement>) => void` - Focus handler
- `onBlur?: (event: React.FocusEvent<HTMLHeadingElement>) => void` - Blur handler

**Custom Props:**
- `level?: 1 | 2 | 3 | 4 | 5 | 6` - Heading level (token-driven)
- `weight?: "normal" | "medium" | "semibold" | "bold"` - Font weight (token-driven, overrides level default)
- `muted?: boolean` - Muted text color (token-driven)
- `as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"` - Override semantic element (rarely needed)

#### Allowed Accessibility Props

**ARIA Attributes:**
- `aria-label?: string` - Accessible label
- `aria-labelledby?: string` - Label reference
- `aria-describedby?: string` - Description reference
- `aria-level?: number` - Override heading level (if `as` prop used)
- `role?: string` - Override role (defaults to heading role)

**Data Attributes:**
- `data-*?: string` - Any data attribute

#### Allowed Native HTML Attributes

**Standard Attributes:**
- `id?: string` - Element ID (critical for anchor links: `#heading-id`)
- `tabIndex?: number` - Tab order (if interactive)
- `title?: string` - Tooltip text
- `lang?: string` - Language code
- `dir?: "ltr" | "rtl"` - Text direction

**Event Handlers:**
- All standard React event handlers

#### Explicitly Forbidden Props

- ❌ `className` - Visual styling override (will be removed in Phase 3)
- ❌ `style` - Inline style override (will be removed in Phase 3)

#### Notes / Edge Cases

- Heading renders as `<h1>` through `<h6>` based on `level` prop
- `as` prop allows semantic override (e.g., `<Heading level={1} as="h2">` for visual h1, semantic h2)
- `id` is critical for anchor links to headings
- Default weight varies by level (h1-h2: bold, h3-h4: semibold, h5-h6: medium)

---

### 5. Input

**Component:** `src/PRIMITIVES/Input/Input.tsx`  
**Base Type:** `Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">`  
**Status:** ⏳ **PROPOSED** (not yet locked)

#### Allowed Behavioral Props

**Required for Functionality:**
- `type?: string` - Input type (text, email, password, number, etc.) - **CRITICAL**
- `value?: string | number | readonly string[]` - Controlled value
- `defaultValue?: string | number | readonly string[]` - Uncontrolled default value
- `onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void` - Change handler - **CRITICAL**
- `onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void` - Focus handler
- `onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void` - Blur handler
- `onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void` - Keyboard handler
- `onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void` - Keyboard handler
- `disabled?: boolean` - Disabled state
- `readOnly?: boolean` - Read-only state
- `required?: boolean` - Required field
- `placeholder?: string` - Placeholder text
- `autoFocus?: boolean` - Auto-focus on mount
- `autoComplete?: string` - Autocomplete hint
- `pattern?: string` - Validation pattern
- `min?: string | number` - Minimum value (for number/date inputs)
- `max?: string | number` - Maximum value (for number/date inputs)
- `step?: string | number` - Step value (for number inputs)
- `minLength?: number` - Minimum length
- `maxLength?: number` - Maximum length
- `name?: string` - Form field name - **CRITICAL for forms**
- `form?: string` - Form association
- `accept?: string` - File input accept types
- `multiple?: boolean` - Multiple file selection

**Custom Props:**
- `variant?: Responsive<"primary" | "secondary" | "outline" | "ghost" | "destructive">` - Visual variant (token-driven)
- `size?: Responsive<"sm" | "md" | "lg">` - Input size (token-driven)
- `state?: "default" | "disabled" | "error" | "success"` - Input state
- `fullWidth?: boolean` - Full width layout
- `iconLeft?: React.ReactNode` - Left icon slot
- `iconRight?: React.ReactNode` - Right icon slot

#### Allowed Accessibility Props

**ARIA Attributes:**
- `aria-label?: string` - Accessible label
- `aria-labelledby?: string` - Label reference (points to Label component)
- `aria-describedby?: string` - Description reference (points to error/success message)
- `aria-invalid?: boolean` - Invalid state (synced with `state="error"` or `aria-invalid={true}`)
- `aria-required?: boolean` - Required state (synced with `required` prop)
- `aria-autocomplete?: "none" | "inline" | "list" | "both"` - Autocomplete type
- `aria-expanded?: boolean` - Expanded state (for combobox inputs)
- `role?: string` - Override role (rarely needed, defaults to "textbox" or input type)

**Data Attributes:**
- `data-*?: string` - Any data attribute

#### Allowed Native HTML Attributes

**Standard Attributes:**
- `id?: string` - Element ID (critical for Label association via `htmlFor`)
- `tabIndex?: number` - Tab order
- `title?: string` - Tooltip text
- `lang?: string` - Language code
- `dir?: "ltr" | "rtl"` - Text direction
- `spellCheck?: boolean` - Spell check
- `inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search"` - Input mode hint

**Event Handlers:**
- All standard React event handlers

#### Explicitly Forbidden Props

- ❌ `className` - Visual styling override (will be removed in Phase 3)
- ❌ `style` - Inline style override (will be removed in Phase 3)
- ❌ `size` - HTML size attribute (conflicts with token-driven size prop, already omitted)

#### Notes / Edge Cases

- `size` HTML attribute is omitted from base type (conflicts with token-driven `size` prop)
- `aria-invalid` is automatically set to `true` when `state="error"` or `aria-invalid={true}`
- `aria-describedby` is automatically generated for error/success states
- `id` is critical for Label component association (`<Label htmlFor={inputId}>`)
- Input supports responsive variants and sizes via `Responsive<T>` type

---

### 6. Textarea

**Component:** `src/PRIMITIVES/Textarea/Textarea.tsx`  
**Base Type:** `React.TextareaHTMLAttributes<HTMLTextAreaElement>`  
**Status:** ⏳ **PROPOSED** (not yet locked)

#### Allowed Behavioral Props

**Required for Functionality:**
- `value?: string` - Controlled value
- `defaultValue?: string` - Uncontrolled default value
- `onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void` - Change handler - **CRITICAL**
- `onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void` - Focus handler
- `onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void` - Blur handler
- `onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void` - Keyboard handler
- `onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void` - Keyboard handler
- `disabled?: boolean` - Disabled state
- `readOnly?: boolean` - Read-only state
- `required?: boolean` - Required field
- `placeholder?: string` - Placeholder text
- `autoFocus?: boolean` - Auto-focus on mount
- `rows?: number` - Number of rows
- `cols?: number` - Number of columns
- `wrap?: "hard" | "soft" | "off"` - Text wrapping
- `minLength?: number` - Minimum length
- `maxLength?: number` - Maximum length - **Used for character counter**
- `name?: string` - Form field name - **CRITICAL for forms**

**Custom Props:**
- `variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"` - Visual variant (token-driven)
- `size?: "xs" | "sm" | "md" | "lg" | "xl"` - Textarea size (token-driven)
- `state?: "default" | "disabled" | "error" | "success"` - Textarea state
- `fullWidth?: boolean` - Full width layout
- `showCharacterCount?: boolean` - Show character counter (requires `maxLength`)

#### Allowed Accessibility Props

**ARIA Attributes:**
- `aria-label?: string` - Accessible label
- `aria-labelledby?: string` - Label reference (points to Label component)
- `aria-describedby?: string` - Description reference (points to error/success message or character counter)
- `aria-invalid?: boolean` - Invalid state (synced with `state="error"` or `aria-invalid={true}`)
- `aria-required?: boolean` - Required state (synced with `required` prop)
- `role?: string` - Override role (rarely needed, defaults to "textbox")

**Data Attributes:**
- `data-*?: string` - Any data attribute

#### Allowed Native HTML Attributes

**Standard Attributes:**
- `id?: string` - Element ID (critical for Label association via `htmlFor`)
- `tabIndex?: number` - Tab order
- `title?: string` - Tooltip text
- `lang?: string` - Language code
- `dir?: "ltr" | "rtl"` - Text direction
- `spellCheck?: boolean` - Spell check

**Event Handlers:**
- All standard React event handlers

#### Explicitly Forbidden Props

- ❌ `className` - Visual styling override (will be removed in Phase 3)
- ❌ `style` - Inline style override (will be removed in Phase 3)

#### Notes / Edge Cases

- `aria-describedby` is automatically generated for error/success states and character counter
- Character counter requires both `showCharacterCount={true}` and `maxLength` prop
- `id` is critical for Label component association
- Textarea supports character counter UI (rendered as overlay)

---

### 7. Checkbox

**Component:** `src/PRIMITIVES/Checkbox/Checkbox.tsx`  
**Base Type:** `Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "onChange">`  
**Status:** ⏳ **PROPOSED** (not yet locked)

#### Allowed Behavioral Props

**Required for Functionality:**
- `checked?: boolean` - Checked state (controlled)
- `indeterminate?: boolean` - Indeterminate state (visual override)
- `disabled?: boolean` - Disabled state
- `onCheckedChange?: (checked: boolean) => void` - Change handler - **CRITICAL** (custom, not native onChange)
- `onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void` - Click handler
- `onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void` - Keyboard handler (Space key toggles)
- `onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void` - Focus handler
- `onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void` - Blur handler
- `type?: "button"` - Button type (fixed to "button", not "checkbox")

**Custom Props:**
- `variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"` - Visual variant (token-driven)
- `size?: "xs" | "sm" | "md" | "lg" | "xl"` - Checkbox size (token-driven)
- `state?: "default" | "checked" | "indeterminate" | "error" | "disabled"` - Checkbox state
- `icon?: React.ReactNode` - Custom checked icon
- `indeterminateIcon?: React.ReactNode` - Custom indeterminate icon

#### Allowed Accessibility Props

**ARIA Attributes:**
- `aria-label?: string` - Accessible label - **REQUIRED if no visible label**
- `aria-labelledby?: string` - Label reference (points to Label component)
- `aria-describedby?: string` - Description reference (points to error message)
- `aria-checked?: "true" | "false" | "mixed"` - Checked state (synced with checked/indeterminate)
- `aria-disabled?: boolean` - Disabled state (synced with disabled prop)
- `aria-invalid?: boolean` - Invalid state (synced with `state="error"`)
- `role?: "checkbox"` - Role (fixed to "checkbox", not native input)

**Data Attributes:**
- `data-*?: string` - Any data attribute

#### Allowed Native HTML Attributes

**Standard Attributes:**
- `id?: string` - Element ID
- `tabIndex?: number` - Tab order
- `title?: string` - Tooltip text
- `name?: string` - Form field name (for form submission, though button-based)

**Event Handlers:**
- All standard React event handlers

#### Explicitly Forbidden Props

- ❌ `className` - Visual styling override (will be removed in Phase 3)
- ❌ `style` - Inline style override (will be removed in Phase 3)
- ❌ `size` - HTML size attribute (conflicts with token-driven size prop, already omitted)
- ❌ `onChange` - Native onChange (conflicts with custom `onCheckedChange`, already omitted)

#### Notes / Edge Cases

- Checkbox uses `<button role="checkbox">` pattern (not native `<input type="checkbox">`)
- `onCheckedChange` is custom handler (not native `onChange`)
- `aria-checked` is automatically set to "mixed" when `indeterminate={true}`
- `aria-label` is required for accessibility if no visible Label is present
- Checkbox supports uncontrolled mode (internal state management)

---

### 8. Radio

**Component:** `src/PRIMITIVES/Radio/Radio.tsx`  
**Base Type:** `Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size" | "onChange">`  
**Status:** ⏳ **PROPOSED** (not yet locked)

#### Allowed Behavioral Props

**Required for Functionality:**
- `checked?: boolean` - Checked state (controlled)
- `disabled?: boolean` - Disabled state
- `value?: string` - Radio value - **REQUIRED when used in RadioGroup**
- `onCheckedChange?: (checked: boolean) => void` - Change handler - **CRITICAL** (custom, not native onChange)
- `onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void` - Click handler
- `onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void` - Keyboard handler (Space/Arrow keys)
- `onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void` - Focus handler
- `onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void` - Blur handler
- `type?: "button"` - Button type (fixed to "button", not "radio")
- `name?: string` - Radio group name (from RadioGroup context)

**Custom Props:**
- `variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"` - Visual variant (token-driven)
- `size?: "xs" | "sm" | "md" | "lg" | "xl"` - Radio size (token-driven)
- `state?: "default" | "checked" | "disabled" | "error"` - Radio state
- `icon?: React.ReactNode` - Custom checked icon (filled circle dot)

#### Allowed Accessibility Props

**ARIA Attributes:**
- `aria-label?: string` - Accessible label - **REQUIRED if no visible label**
- `aria-labelledby?: string` - Label reference (points to Label component)
- `aria-describedby?: string` - Description reference (points to error message)
- `aria-checked?: boolean` - Checked state (synced with checked prop)
- `aria-disabled?: boolean` - Disabled state (synced with disabled prop)
- `aria-invalid?: boolean` - Invalid state (synced with `state="error"`)
- `role?: "radio"` - Role (fixed to "radio", not native input)

**Data Attributes:**
- `data-*?: string` - Any data attribute
- `data-value?: string` - Radio value (for RadioGroup keyboard navigation)

#### Allowed Native HTML Attributes

**Standard Attributes:**
- `id?: string` - Element ID
- `tabIndex?: number` - Tab order (roving tabindex in RadioGroup: only selected radio is 0, others -1)
- `title?: string` - Tooltip text
- `name?: string` - Radio group name (from RadioGroup context)

**Event Handlers:**
- All standard React event handlers

#### Explicitly Forbidden Props

- ❌ `className` - Visual styling override (will be removed in Phase 3)
- ❌ `style` - Inline style override (will be removed in Phase 3)
- ❌ `size` - HTML size attribute (conflicts with token-driven size prop, already omitted)
- ❌ `onChange` - Native onChange (conflicts with custom `onCheckedChange`, already omitted)

#### Notes / Edge Cases

- Radio uses `<button role="radio">` pattern (not native `<input type="radio">`)
- `onCheckedChange` is custom handler (not native `onChange`)
- Radio supports standalone mode and RadioGroup mode (context-based)
- Roving tabindex: only selected radio in group is focusable (`tabIndex={0}`), others are `-1`
- Arrow key navigation is implemented in RadioGroup mode
- `value` prop is required when used within RadioGroup
- `name` is inherited from RadioGroup context

---

### 9. Label

**Component:** `src/PRIMITIVES/Label/Label.tsx`  
**Base Type:** `React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>` (Radix Label)  
**Status:** ⏳ **PROPOSED** (not yet locked)

#### Allowed Behavioral Props

**Required for Functionality:**
- `onClick?: (event: React.MouseEvent<HTMLLabelElement>) => void` - Click handler
- `onFocus?: (event: React.FocusEvent<HTMLLabelElement>) => void` - Focus handler
- `onBlur?: (event: React.FocusEvent<HTMLLabelElement>) => void` - Blur handler

**Custom Props:**
- `required?: boolean` - Show required asterisk (*)

#### Allowed Accessibility Props

**ARIA Attributes:**
- `aria-label?: string` - Accessible label (rarely needed, label text is visible)
- `aria-labelledby?: string` - Label reference
- `aria-describedby?: string` - Description reference
- `role?: string` - Override role (defaults to "label")

**Data Attributes:**
- `data-*?: string` - Any data attribute

#### Allowed Native HTML Attributes

**Standard Attributes:**
- `id?: string` - Element ID
- `htmlFor?: string` - Associated input ID - **CRITICAL for form association**
- `tabIndex?: number` - Tab order
- `title?: string` - Tooltip text
- `lang?: string` - Language code

**Event Handlers:**
- All standard React event handlers

#### Explicitly Forbidden Props

- ❌ `className` - Visual styling override (will be removed in Phase 3)
- ❌ `style` - Inline style override (will be removed in Phase 3)

#### Notes / Edge Cases

- Label uses Radix Label primitive (`LabelPrimitive.Root`)
- `htmlFor` is critical for associating label with input/textarea/checkbox/radio
- `required` prop shows asterisk (*) for required fields
- Label automatically applies `peer-disabled:cursor-not-allowed peer-disabled:opacity-70` for disabled inputs

---

## Summary Table

| Component | Behavioral Props | Accessibility Props | Native HTML Props | Forbidden Props |
|-----------|-----------------|-------------------|------------------|----------------|
| **Button** | onClick, disabled, type, form*, asChild, leftIcon, rightIcon | aria-*, role, data-* | id, name, tabIndex, title, autoFocus | className, style |
| **Link** | href, target, rel, onClick, disabled, asChild, leftIcon, rightIcon | aria-*, role, data-* | id, name, tabIndex, title, lang, hreflang | className, style |
| **Text** | onClick, onFocus, onBlur, onMouseEnter, onMouseLeave | aria-*, role, data-* | id, tabIndex, title, lang, dir | className, style |
| **Heading** | onClick, onFocus, onBlur | aria-*, role, data-* | id, tabIndex, title, lang, dir | className, style |
| **Input** | type, value, onChange, disabled, required, name, placeholder, autoComplete, pattern, min, max, step, minLength, maxLength, iconLeft, iconRight | aria-*, role, data-* | id, tabIndex, title, lang, dir, spellCheck, inputMode | className, style, size (HTML) |
| **Textarea** | value, onChange, disabled, required, name, placeholder, rows, cols, wrap, minLength, maxLength, showCharacterCount | aria-*, role, data-* | id, tabIndex, title, lang, dir, spellCheck | className, style |
| **Checkbox** | checked, indeterminate, disabled, onCheckedChange, onClick, onKeyDown, icon, indeterminateIcon | aria-*, role="checkbox", data-* | id, tabIndex, title, name | className, style, size (HTML), onChange |
| **Radio** | checked, disabled, value, onCheckedChange, onClick, onKeyDown, name (from context), icon | aria-*, role="radio", data-* | id, tabIndex, title, name | className, style, size (HTML), onChange |
| **Label** | onClick, onFocus, onBlur, required | aria-*, role, data-* | id, htmlFor, tabIndex, title, lang | className, style |

---

## Enforcement Strategy

### Phase 3 TypeScript Enforcement

After removing `className` and `style`, Foundation component prop interfaces should:

1. **Extend base HTML attributes** with `Omit<..., "className" | "style">`
2. **Preserve all behavioral props** listed above
3. **Preserve all accessibility props** listed above
4. **Preserve all native HTML attributes** listed above (except explicitly forbidden)

### Example Enforcement Pattern

```typescript
// Current (allows escape)
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Phase 3 (blocks escape)
export interface ButtonProps 
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // All behavioral, accessibility, and native HTML props remain via Omit extension
}
```

---

## References

- `docs/architecture/FOUNDATION_CONTRACT.md` - Foundation Contract (authority)
- `docs/architecture/FOUNDATION_COMPONENT_SCOPE.md` - Foundation Component Scope
- `docs/audit/UI_STYLING_ESCAPE_HATCHES_REPORT.md` - Current escape hatch state
- React TypeScript definitions for `HTMLAttributes`, `ButtonHTMLAttributes`, `InputHTMLAttributes`, etc.

---

**Status:** ✅ **COMPLETE**  
**Next Phase:** Phase 3 TypeScript Enforcement

