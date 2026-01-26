> ⚠️ **NON-CANONICAL DOCUMENT**
> 
> This document is **NOT** part of the canonical Closed System v2 documentation set.
> 
> **Status:** DEPRECATED / HISTORICAL CONTEXT ONLY  
> **Canonical Reference:** [CLOSED_SYSTEM_V2_CANON_INDEX.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md)
> 
> This document is provided for historical context only. For authoritative Closed System v2 documentation, refer to the canonical document set.

---

# Closed System v2 — D1: API Inventory

**Date:** 2026-01-26  
**Phase:** D1.1 — API Inventory  
**Status:** Complete  
**Purpose:** Инвентаризация текущих публичных API всех Foundation компонентов для анализа Expression Surface

---

## Purpose

Этот документ фиксирует текущее состояние публичных API всех Foundation компонентов перед проектированием Closed System v2 API поверхностей. Документ служит baseline для анализа Expression Surface и проектирования санкционированных поверхностей.

---

## Foundation Components Inventory

### 1. Button

**File:** `src/PRIMITIVES/Button/Button.tsx`

**Props Interface:**
```typescript
export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> {
  variant?: ButtonVariant;  // "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive"
  size?: ButtonSize;        // "sm" | "md" | "lg"
  iconOnly?: boolean;
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

**Expression Surface Analysis:**
- ✅ `variant` — единственный способ выражения стиля кнопки (token union)
- ✅ `size` — единственный способ выражения размера (token union)
- ✅ `iconOnly` — единственный способ выражения icon-only режима
- ✅ `leftIcon` / `rightIcon` — единственный способ выражения иконок
- ✅ `className` / `style` исключены (Foundation Enforcement)
- ✅ Все остальные props наследуются от `React.ButtonHTMLAttributes` (кроме className/style)

---

### 2. IconButton

**File:** `src/PRIMITIVES/IconButton/IconButton.tsx`

**Props Interface:**
```typescript
export interface IconButtonProps extends Omit<
  ButtonProps,
  "iconOnly" | "children" | "leftIcon" | "rightIcon" | "className" | "style"
> {
  icon: React.ReactNode;
  "aria-label": string;  // Required
}
```

**Expression Surface Analysis:**
- ✅ `icon` — единственный способ выражения иконки (required)
- ✅ `aria-label` — required для accessibility
- ✅ Наследует все props от Button (variant, size, etc.)
- ✅ `iconOnly`, `children`, `leftIcon`, `rightIcon` исключены (enforced at type level)
- ✅ `className` / `style` исключены (Foundation Enforcement)

---

### 3. Input

**File:** `src/PRIMITIVES/Input/Input.types.ts`

**Props Interface:**
```typescript
export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "color" | "className" | "style"
> {
  size?: InputSize;      // "sm" | "md" | "lg"
  invalid?: boolean;
}
```

**Expression Surface Analysis:**
- ✅ `size` — единственный способ выражения размера (token union)
- ✅ `invalid` — единственный способ выражения invalid состояния
- ✅ `className` / `style` исключены (Foundation Enforcement)
- ✅ `size` и `color` исключены из HTMLAttributes (конфликт с native size)

---

### 4. Textarea

**File:** `src/PRIMITIVES/Textarea/Textarea.types.ts`

**Props Interface:**
```typescript
export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "rows" | "className" | "style"
> {
  size?: TextareaSize;   // "sm" | "md" | "lg"
  invalid?: boolean;
}
```

**Expression Surface Analysis:**
- ✅ `size` — единственный способ выражения размера (token union)
- ✅ `invalid` — единственный способ выражения invalid состояния
- ✅ `className` / `style` исключены (Foundation Enforcement)
- ✅ `rows` исключен из HTMLAttributes (контролируется через size)

---

### 5. Checkbox

**File:** `src/PRIMITIVES/Checkbox/Checkbox.types.ts`

**Props Interface:**
```typescript
export interface CheckboxProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "onChange" | "className" | "style"
> {
  variant?: CheckboxVariant;      // "outline" | "filled"
  size?: CheckboxSize;            // "sm" | "md" | "lg"
  state?: CheckboxState;          // "default" | "hover" | "active" | "focus" | "disabled"
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  icon?: React.ReactNode;
  indeterminateIcon?: React.ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}
```

**Expression Surface Analysis:**
- ✅ `variant` — единственный способ выражения стиля (token union)
- ✅ `size` — единственный способ выражения размера (token union)
- ✅ `state` — единственный способ выражения состояния (token union)
- ✅ `checked` / `indeterminate` — единственный способ выражения checked состояния
- ✅ `className` / `style` исключены (Foundation Enforcement)

---

### 6. Radio

**File:** `src/PRIMITIVES/Radio/Radio.types.ts`

**Props Interface:**
```typescript
export type RadioProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "size" | "onChange" | "className" | "style"
> &
  VariantProps<typeof radioVariants> & {
    variant?: RadioVariant;
    size?: RadioSize;
    state?: RadioState;
    checked?: boolean;
    disabled?: boolean;
    value?: string;
    onCheckedChange?: (checked: boolean) => void;
    icon?: React.ReactNode;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
  };
```

**Expression Surface Analysis:**
- ✅ `variant` — единственный способ выражения стиля (token union)
- ✅ `size` — единственный способ выражения размера (token union)
- ✅ `state` — единственный способ выражения состояния (token union)
- ✅ `checked` — единственный способ выражения checked состояния
- ✅ `className` / `style` исключены (Foundation Enforcement)
- ⚠️ Использует `VariantProps<typeof radioVariants>` — может создавать неявные зависимости

---

### 7. RadioGroup

**File:** `src/PRIMITIVES/Radio/RadioGroup.types.ts`

**Props Interface:**
```typescript
export interface RadioGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  orientation?: "horizontal" | "vertical";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}
```

**Expression Surface Analysis:**
- ✅ `value` / `defaultValue` — единственный способ выражения выбранного значения
- ✅ `orientation` — единственный способ выражения ориентации
- ✅ `size` — единственный способ выражения размера (token union)
- ✅ `className` / `style` исключены (Foundation Enforcement)

---

### 8. Switch

**File:** `src/PRIMITIVES/Switch/Switch.types.ts`

**Props Interface:**
```typescript
export interface SwitchProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "onChange" | "className" | "style"
> {
  variant?: SwitchVariant;    // "primary" | "secondary" | "outline" | "ghost" | "destructive"
  size?: SwitchSize;          // "xs" | "sm" | "md" | "lg" | "xl"
  checked?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}
```

**Expression Surface Analysis:**
- ✅ `variant` — единственный способ выражения стиля (token union)
- ✅ `size` — единственный способ выражения размера (token union)
- ✅ `checked` — единственный способ выражения checked состояния
- ✅ `invalid` — единственный способ выражения invalid состояния
- ✅ `className` / `style` исключены (Foundation Enforcement)

---

### 9. Text

**File:** `src/PRIMITIVES/Text/Text.tsx`

**Props Interface:**
```typescript
export interface TextProps<R extends TypographyRole = TypographyRole> extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "className" | "style"
> {
  as?: TextAsElement;           // "span" | "p" | "label" | "strong" | "em"
  size?: TextSize;              // "xs" | "sm" | "md" | "lg" | "xl"
  weight?: TextWeight;          // "normal" | "medium" | "semibold" | "bold"
  typographyRole?: R;           // TypographyRole
  color?: AllowedTextForRole<R>; // Token union based on typographyRole
  tone?: TextTone;              // "default" | "muted" (deprecated)
}
```

**Expression Surface Analysis:**
- ✅ `size` — единственный способ выражения размера (token union)
- ✅ `weight` — единственный способ выражения веса (token union)
- ✅ `typographyRole` + `color` — единственный способ выражения цвета (token union с role-based enforcement)
- ✅ `as` — единственный способ выражения HTML элемента
- ⚠️ `tone` — deprecated, но все еще доступен (backward compatibility)
- ✅ `className` / `style` исключены (Foundation Enforcement)

---

### 10. Heading

**File:** `src/PRIMITIVES/Heading/Heading.tsx`

**Props Interface:**
```typescript
export interface HeadingProps extends
  Omit<React.HTMLAttributes<HTMLHeadingElement>, "className" | "style" | "color">,
  VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
```

**Expression Surface Analysis:**
- ✅ `level` (from VariantProps) — единственный способ выражения уровня заголовка
- ✅ `weight` (from VariantProps) — единственный способ выражения веса
- ✅ `color` (from VariantProps) — единственный способ выражения цвета
- ✅ `as` — единственный способ выражения HTML элемента
- ⚠️ Использует `VariantProps<typeof headingVariants>` — может создавать неявные зависимости
- ✅ `className` / `style` исключены (Foundation Enforcement)

---

### 11. Link

**File:** `src/PRIMITIVES/Link/Link.tsx`

**Props Interface:**
```typescript
export interface LinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "style"
> {
  variant?: LinkVariant;
  size?: LinkSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}
```

**Expression Surface Analysis:**
- ✅ `variant` — единственный способ выражения стиля (token union)
- ✅ `size` — единственный способ выражения размера (token union)
- ✅ `leftIcon` / `rightIcon` — единственный способ выражения иконок
- ✅ `disabled` — единственный способ выражения disabled состояния
- ✅ `className` / `style` исключены (Foundation Enforcement)

---

### 12. NavLink

**File:** `src/PRIMITIVES/NavLink/NavLink.tsx`

**Props Interface:**
```typescript
export interface NavLinkProps extends LinkProps {
  current?: boolean;
}
```

**Expression Surface Analysis:**
- ✅ `current` — единственный способ выражения текущей страницы
- ✅ Наследует все props от Link
- ✅ `className` / `style` исключены (через Link, Foundation Enforcement)

---

### 13. Label

**File:** `src/PRIMITIVES/Label/Label.tsx`

**Props Interface:**
```typescript
export interface LabelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
  "className" | "style"
> {
  required?: boolean;
}
```

**Expression Surface Analysis:**
- ✅ `required` — единственный способ выражения required состояния
- ✅ `className` / `style` исключены (Foundation Enforcement)

---

### 14. Field

**File:** `src/PRIMITIVES/Field/Field.tsx`

**Props Interface:**
```typescript
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}
```

**Expression Surface Analysis:**
- ⚠️ **ПРОБЛЕМА:** Принимает `className` и `style` (не соответствует Foundation Enforcement)
- ⚠️ Нет явных props для выражения intent
- ⚠️ Все изменения через HTMLAttributes (не санкционированная поверхность)

**Sub-components:**
- `FieldLabelProps` — extends `React.ComponentProps<typeof Label>`
- `FieldControlProps` — extends `React.HTMLAttributes<HTMLDivElement>` (принимает className)
- `FieldDescriptionProps` — extends `React.ComponentProps<typeof Text>`
- `FieldErrorProps` — extends `React.ComponentProps<typeof Text>`

---

### 15. FormGroup

**File:** `src/PRIMITIVES/FormGroup/FormGroup.types.ts`

**Props Interface:**
```typescript
export interface FormGroupProps extends Omit<
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
  "className" | "style"
> {
  legend?: string | React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  children: React.ReactNode;
}
```

**Expression Surface Analysis:**
- ✅ `legend` — единственный способ выражения легенды
- ✅ `description` — единственный способ выражения описания
- ✅ `error` — единственный способ выражения ошибки
- ✅ `disabled` / `required` — единственный способ выражения состояний
- ✅ `className` / `style` исключены (Foundation Enforcement)

---

### 16. ErrorText

**File:** `src/PRIMITIVES/ErrorText/ErrorText.tsx`

**Props Interface:**
```typescript
export interface ErrorTextProps extends Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "className" | "style"
> {
  children: React.ReactNode;
  id?: string;
  asChild?: boolean;
}
```

**Expression Surface Analysis:**
- ✅ `asChild` — единственный способ выражения composition pattern
- ✅ `id` — для aria-describedby linking
- ✅ `className` / `style` исключены (Foundation Enforcement)

---

### 17. HelperText

**File:** `src/PRIMITIVES/HelperText/HelperText.tsx`

**Props Interface:**
```typescript
export interface HelperTextProps extends Omit<
  TextProps,
  "className" | "style" | "size" | "tone" | "as"
> {
  size?: TextSize;
  tone?: TextTone;
  as?: TextAsElement;
}
```

**Expression Surface Analysis:**
- ✅ Наследует все props от Text (typographyRole, color, weight)
- ✅ `size` / `tone` / `as` — переопределения с defaults
- ✅ `className` / `style` исключены (через Text, Foundation Enforcement)

---

### 18. Icon

**File:** `src/PRIMITIVES/Icon/Icon.tsx`

**Props Interface:**
```typescript
export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "color" | "stroke"> {
  name: IconName;
  size?: IconSizeSubset;
  color?: IconColor;
  stroke?: IconStroke;
  asChild?: boolean;
}
```

**Expression Surface Analysis:**
- ✅ `name` — единственный способ выражения иконки (required)
- ✅ `size` — единственный способ выражения размера (token union)
- ✅ `color` — единственный способ выражения цвета (token union)
- ✅ `stroke` — единственный способ выражения stroke width (token union)
- ✅ `asChild` — единственный способ выражения composition pattern
- ✅ `color` и `stroke` исключены из SVGProps (конфликт с native props)

---

### 19. Alert

**File:** `src/PRIMITIVES/Alert/Alert.tsx`

**Props Interface:**
```typescript
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}
```

**Expression Surface Analysis:**
- ✅ `variant` — единственный способ выражения стиля (token union)
- ⚠️ **ПРОБЛЕМА:** Принимает `className` и `style` (не соответствует Foundation Enforcement)
- ⚠️ Все остальные изменения через HTMLAttributes (не санкционированная поверхность)

---

### 20. Badge

**File:** `src/PRIMITIVES/Badge/Badge.tsx`

**Props Interface:**
```typescript
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}
```

**Expression Surface Analysis:**
- ✅ `variant` — единственный способ выражения стиля (token union)
- ⚠️ **ПРОБЛЕМА:** Принимает `className` и `style` (не соответствует Foundation Enforcement)
- ⚠️ Все остальные изменения через HTMLAttributes (не санкционированная поверхность)

---

### 21. Progress

**File:** `src/PRIMITIVES/Progress/Progress.tsx`

**Props Interface:**
```typescript
export interface ProgressProps {
  value: number;
  max?: number;
  size?: ProgressSize;
  className?: string;  // Extension layer allows className
}
```

**Expression Surface Analysis:**
- ✅ `value` — единственный способ выражения значения (required)
- ✅ `max` — единственный способ выражения максимума
- ✅ `size` — единственный способ выражения размера (token union)
- ⚠️ **ПРОБЛЕМА:** Принимает `className` (комментарий говорит "Extension layer allows className", но это Foundation компонент)
- ⚠️ Не наследует HTMLAttributes (только явные props)

---

### 22. Skeleton

**File:** `src/PRIMITIVES/Skeleton/Skeleton.tsx`

**Props Interface:**
```typescript
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  "aria-hidden"?: boolean;
}
```

**Expression Surface Analysis:**
- ✅ `variant` — единственный способ выражения стиля (token union)
- ✅ `aria-hidden` — для accessibility
- ⚠️ **ПРОБЛЕМА:** Принимает `className` и `style` (не соответствует Foundation Enforcement)
- ⚠️ Все остальные изменения через HTMLAttributes (не санкционированная поверхность)

---

## Summary: Expression Surface Issues

### Components with Foundation Enforcement Compliance

✅ **Fully Compliant (18 components):**
- Button, IconButton, Input, Textarea, Checkbox, Radio, RadioGroup, Switch, Text, Heading, Link, NavLink, Label, FormGroup, ErrorText, HelperText, Icon

### Components with Foundation Enforcement Violations

❌ **Non-Compliant (4 components):**
1. **Field** — принимает `className` и `style` через `React.HTMLAttributes<HTMLDivElement>`
2. **Alert** — принимает `className` и `style` через `React.HTMLAttributes<HTMLDivElement>`
3. **Badge** — принимает `className` и `style` через `React.HTMLAttributes<HTMLDivElement>`
4. **Skeleton** — принимает `className` и `style` через `React.HTMLAttributes<HTMLDivElement>`
5. **Progress** — принимает `className` (явно объявлен в интерфейсе)

### Components with Implicit Dependencies

⚠️ **Uses VariantProps (2 components):**
- **Radio** — использует `VariantProps<typeof radioVariants>` (может создавать неявные зависимости)
- **Heading** — использует `VariantProps<typeof headingVariants>` (может создавать неявные зависимости)

### Components with Deprecated Props

⚠️ **Deprecated Props (1 component):**
- **Text** — `tone` prop deprecated (backward compatibility)

---

## Next Steps

1. **D1.2:** Анализ Expression Surface для каждого компонента
2. **D1.3:** Проектирование API поверхностей с устранением выявленных проблем
3. **D1.4:** Валидация спроектированных API против принципов Phase B

---

## Related Documents

- [CLOSED_SYSTEM_V2_CANONICAL_PROBLEM_DEFINITION.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_CANONICAL_PROBLEM_DEFINITION.md)
- [CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md)
- [CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md)
- [CLOSED_SYSTEM_V2_PRINCIPLE_TO_MECHANISM_MAPPING.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_PRINCIPLE_TO_MECHANISM_MAPPING.md)
