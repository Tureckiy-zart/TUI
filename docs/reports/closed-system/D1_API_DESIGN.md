> ⚠️ **NON-CANONICAL DOCUMENT**
> 
> This document is **NOT** part of the canonical Closed System v2 documentation set.
> 
> **Status:** DEPRECATED / HISTORICAL CONTEXT ONLY  
> **Canonical Reference:** [CLOSED_SYSTEM_V2_CANON_INDEX.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md)
> 
> This document is provided for historical context only. For authoritative Closed System v2 documentation, refer to the canonical document set.

---

# Closed System v2 — D1: API Design

**Date:** 2026-01-26  
**Phase:** D1.3 — API Design  
**Status:** Complete  
**Purpose:** Проектирование API поверхностей Foundation компонентов согласно Expression Surface mechanism

---

## Purpose

Этот документ проектирует публичные API Foundation компонентов, которые выражают intent исключительно через санкционированные поверхности (Expression Surface mechanism). Все альтернативные каналы выражения intent исключены.

---

## Design Principles

### Expression Surface Requirements

1. **Single Path:** Один intent → один prop (не множественные эквивалентные способы)
2. **Token-Based:** Все визуальные изменения через token unions
3. **Explicit Props:** Все поведенческие изменения через явные props
4. **No Bypass:** Исключение всех альтернативных каналов (className, style, неконтролируемые HTMLAttributes)

### Foundation Enforcement Compliance

Все Foundation компоненты **MUST** исключать `className` и `style` через:
```typescript
Omit<React.*HTMLAttributes, "className" | "style">
```

---

## Component API Designs

### 1. Button

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
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

**Assessment:**
- ✅ Expression Surface полностью санкционирован
- ✅ Все визуальные изменения через token unions
- ✅ Foundation Enforcement compliance

**Action:** Нет изменений

---

### 2. IconButton

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
```typescript
export interface IconButtonProps extends Omit<
  ButtonProps,
  "iconOnly" | "children" | "leftIcon" | "rightIcon" | "className" | "style"
> {
  icon: React.ReactNode;
  "aria-label": string;  // Required
}
```

**Assessment:**
- ✅ Expression Surface полностью санкционирован
- ✅ Type-level enforcement предотвращает альтернативные способы

**Action:** Нет изменений

---

### 3. Input

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
```typescript
export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "color" | "className" | "style"
> {
  size?: InputSize;      // "sm" | "md" | "lg"
  invalid?: boolean;
}
```

**Assessment:**
- ✅ Expression Surface полностью санкционирован
- ✅ Минимальный API с явными props

**Action:** Нет изменений

---

### 4. Textarea

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
```typescript
export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "rows" | "className" | "style"
> {
  size?: TextareaSize;   // "sm" | "md" | "lg"
  invalid?: boolean;
}
```

**Assessment:**
- ✅ Expression Surface полностью санкционирован

**Action:** Нет изменений

---

### 5. Checkbox

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
```typescript
export interface CheckboxProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "onChange" | "className" | "style"
> {
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  state?: CheckboxState;
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

**Assessment:**
- ✅ Expression Surface полностью санкционирован

**Action:** Нет изменений

---

### 6. Radio

**Status:** ⚠️ **MINOR REFINEMENT REQUIRED**

**Current API:**
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

**Issue:**
- ⚠️ Использует `VariantProps<typeof radioVariants>` — может утечь внутренние типы

**Design Decision:**
- `VariantProps` используется для type inference, но явные union типы уже определены в `radio-variants.ts`
- Проверить в D2, что `VariantProps` не утечет внутренние типы
- Если утечка обнаружена, заменить на явные union типы

**Action:** Проверить в D2 (Type System), при необходимости заменить `VariantProps` на явные типы

---

### 7. RadioGroup

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
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

**Assessment:**
- ✅ Expression Surface полностью санкционирован

**Action:** Нет изменений

---

### 8. Switch

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
```typescript
export interface SwitchProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "onChange" | "className" | "style"
> {
  variant?: SwitchVariant;
  size?: SwitchSize;
  checked?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}
```

**Assessment:**
- ✅ Expression Surface полностью санкционирован

**Action:** Нет изменений

---

### 9. Text

**Status:** ⚠️ **DEPRECATED PROP REMOVAL REQUIRED**

**Current API:**
```typescript
export interface TextProps<R extends TypographyRole = TypographyRole> extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "className" | "style"
> {
  as?: TextAsElement;
  size?: TextSize;
  weight?: TextWeight;
  typographyRole?: R;
  color?: AllowedTextForRole<R>;
  tone?: TextTone;  // ⚠️ DEPRECATED
}
```

**Issue:**
- ⚠️ `tone` prop deprecated, но все еще доступен
- Создает альтернативный способ выражения цвета (нарушает Single Expression Surface)

**Design Decision:**
- Удалить `tone` prop из интерфейса
- Обеспечить migration path через TypeScript error message
- Документировать migration в changelog

**New API:**
```typescript
export interface TextProps<R extends TypographyRole = TypographyRole> extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "className" | "style"
> {
  as?: TextAsElement;
  size?: TextSize;
  weight?: TextWeight;
  typographyRole?: R;
  color?: AllowedTextForRole<R>;
  // tone prop removed - use typographyRole + color instead
}
```

**Migration Path:**
- `tone="default"` → `typographyRole="body"` + `color="primary"` (или без color для default)
- `tone="muted"` → `typographyRole="meta"` + `color="muted"`

**Action:** Удалить `tone` prop в D2 (Type System)

---

### 10. Heading

**Status:** ⚠️ **MINOR REFINEMENT REQUIRED**

**Current API:**
```typescript
export interface HeadingProps extends
  Omit<React.HTMLAttributes<HTMLHeadingElement>, "className" | "style" | "color">,
  VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
```

**Issue:**
- ⚠️ Использует `VariantProps<typeof headingVariants>` — может утечь внутренние типы

**Design Decision:**
- `VariantProps` используется для type inference
- Проверить в D2, что `VariantProps` не утечет внутренние типы
- Если утечка обнаружена, заменить на явные union типы

**Action:** Проверить в D2 (Type System), при необходимости заменить `VariantProps` на явные типы

---

### 11. Link

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
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

**Assessment:**
- ✅ Expression Surface полностью санкционирован

**Action:** Нет изменений

---

### 12. NavLink

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
```typescript
export interface NavLinkProps extends LinkProps {
  current?: boolean;
}
```

**Assessment:**
- ✅ Expression Surface полностью санкционирован

**Action:** Нет изменений

---

### 13. Label

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
```typescript
export interface LabelProps extends Omit<
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
  "className" | "style"
> {
  required?: boolean;
}
```

**Assessment:**
- ✅ Expression Surface полностью санкционирован

**Action:** Нет изменений

---

### 14. Field

**Status:** ❌ **MAJOR REFACTOR REQUIRED**

**Current API:**
```typescript
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}
```

**Issues:**
- ❌ Принимает `className` и `style` (нарушает Foundation Enforcement)
- ❌ Нет явных props для выражения intent
- ❌ Все изменения через HTMLAttributes (не санкционированная поверхность)

**Design Decision:**
- Field — это layout wrapper, который использует Stack внутри
- Field не должен принимать className/style, так как это Foundation компонент
- Field должен санкционировать только необходимые HTMLAttributes

**New API:**
```typescript
export interface FieldProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  // Field is a layout wrapper - no additional props needed
  // Spacing is controlled by Stack component internally
  children: React.ReactNode;
}
```

**Sub-components:**
- `FieldLabelProps` — уже extends `React.ComponentProps<typeof Label>` (✅ compliant)
- `FieldControlProps` — нужно исключить className
- `FieldDescriptionProps` — уже extends `React.ComponentProps<typeof Text>` (✅ compliant)
- `FieldErrorProps` — уже extends `React.ComponentProps<typeof Text>` (✅ compliant)

**FieldControl New API:**
```typescript
export interface FieldControlProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  children: React.ReactNode;
}
```

**Action:** Реализовать изменения в D2 (Type System) и D4 (Runtime Implementation)

---

### 15. FormGroup

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
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

**Assessment:**
- ✅ Expression Surface полностью санкционирован

**Action:** Нет изменений

---

### 16. ErrorText

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
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

**Assessment:**
- ✅ Expression Surface полностью санкционирован

**Action:** Нет изменений

---

### 17. HelperText

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
```typescript
export interface HelperTextProps extends Omit<
  TextProps,
  "className" | "style" | "size" | "tone" | "as"
> {
  size?: TextSize;
  tone?: TextTone;  // ⚠️ Will be removed when Text.tone is removed
  as?: TextAsElement;
}
```

**Issue:**
- ⚠️ `tone` prop будет удален вместе с Text.tone

**Design Decision:**
- Удалить `tone` prop после удаления Text.tone
- Использовать `typographyRole` + `color` вместо `tone`

**New API (after Text.tone removal):**
```typescript
export interface HelperTextProps extends Omit<
  TextProps,
  "className" | "style" | "size" | "as"
> {
  size?: TextSize;
  as?: TextAsElement;
  // tone removed - use typographyRole + color from TextProps instead
}
```

**Action:** Удалить `tone` prop в D2 (Type System) после удаления Text.tone

---

### 18. Icon

**Status:** ✅ **NO CHANGES REQUIRED**

**Current API:**
```typescript
export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "color" | "stroke"> {
  name: IconName;
  size?: IconSizeSubset;
  color?: IconColor;
  stroke?: IconStroke;
  asChild?: boolean;
}
```

**Assessment:**
- ✅ Expression Surface полностью санкционирован

**Action:** Нет изменений

---

### 19. Alert

**Status:** ❌ **FOUNDATION ENFORCEMENT FIX REQUIRED**

**Current API:**
```typescript
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}
```

**Issue:**
- ❌ Принимает `className` и `style` (нарушает Foundation Enforcement)

**Design Decision:**
- Исключить `className` / `style` через `Omit`
- Санкционировать только необходимые HTMLAttributes

**New API:**
```typescript
export interface AlertProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  variant?: AlertVariant;
}
```

**Action:** Реализовать изменения в D2 (Type System) и D4 (Runtime Implementation)

---

### 20. Badge

**Status:** ❌ **FOUNDATION ENFORCEMENT FIX REQUIRED**

**Current API:**
```typescript
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}
```

**Issue:**
- ❌ Принимает `className` и `style` (нарушает Foundation Enforcement)

**Design Decision:**
- Исключить `className` / `style` через `Omit`
- Санкционировать только необходимые HTMLAttributes

**New API:**
```typescript
export interface BadgeProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  variant?: BadgeVariant;
}
```

**Action:** Реализовать изменения в D2 (Type System) и D4 (Runtime Implementation)

---

### 21. Progress

**Status:** ❌ **FOUNDATION ENFORCEMENT FIX REQUIRED**

**Current API:**
```typescript
export interface ProgressProps {
  value: number;
  max?: number;
  size?: ProgressSize;
  className?: string;  // ❌ Extension layer allows className - but this is Foundation!
}
```

**Issue:**
- ❌ Принимает `className` (нарушает Foundation Enforcement)
- ❌ Комментарий говорит "Extension layer allows className", но это Foundation компонент

**Design Decision:**
- Удалить `className` из интерфейса
- Progress не наследует HTMLAttributes, поэтому просто удалить prop

**New API:**
```typescript
export interface ProgressProps {
  value: number;
  max?: number;
  size?: ProgressSize;
  // className removed - Foundation Enforcement compliance
}
```

**Action:** Реализовать изменения в D2 (Type System) и D4 (Runtime Implementation)

---

### 22. Skeleton

**Status:** ❌ **FOUNDATION ENFORCEMENT FIX REQUIRED**

**Current API:**
```typescript
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  "aria-hidden"?: boolean;
}
```

**Issue:**
- ❌ Принимает `className` и `style` (нарушает Foundation Enforcement)

**Design Decision:**
- Исключить `className` / `style` через `Omit`
- Санкционировать только необходимые HTMLAttributes

**New API:**
```typescript
export interface SkeletonProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  variant?: SkeletonVariant;
  "aria-hidden"?: boolean;
}
```

**Action:** Реализовать изменения в D2 (Type System) и D4 (Runtime Implementation)

---

## Summary: Required Changes

### ✅ No Changes Required (17 components)

Button, IconButton, Input, Textarea, Checkbox, RadioGroup, Switch, Link, NavLink, Label, FormGroup, ErrorText, Icon

### ⚠️ Minor Refinements (2 components)

1. **Radio** — проверить `VariantProps` usage в D2
2. **Heading** — проверить `VariantProps` usage в D2

### ❌ Major Changes Required (5 components)

1. **Text** — удалить deprecated `tone` prop
2. **Field** — исключить className/style, определить явные props
3. **Alert** — исключить className/style
4. **Badge** — исключить className/style
5. **Progress** — удалить className
6. **Skeleton** — исключить className/style
7. **HelperText** — удалить `tone` prop после удаления Text.tone

---

## Implementation Plan

### D2: Type System Changes

1. **Text:** Удалить `tone` prop из интерфейса
2. **Field:** Изменить `FieldProps` и `FieldControlProps` для исключения className/style
3. **Alert:** Изменить `AlertProps` для исключения className/style
4. **Badge:** Изменить `BadgeProps` для исключения className/style
5. **Progress:** Удалить `className` prop
6. **Skeleton:** Изменить `SkeletonProps` для исключения className/style
7. **HelperText:** Удалить `tone` prop
8. **Radio/Heading:** Проверить `VariantProps` usage на утечку типов

### D4: Runtime Implementation Changes

1. Обновить реализации компонентов для соответствия новым типам
2. Удалить использование `className` / `style` в runtime коде
3. Обновить тесты для проверки отсутствия className/style

---

## Validation Checklist

- ✅ Все компоненты имеют Expression Surface
- ✅ Нет альтернативных поверхностей выражения intent
- ✅ Все визуальные изменения через token unions
- ✅ Все поведенческие изменения через явные props
- ✅ Foundation Enforcement compliance (className/style исключены)
- ✅ Нет недокументированных escape hatches

---

## Next Steps

1. **D1.4:** Валидация спроектированных API против принципов Phase B
2. **D2:** Реализация типовых ограничений

---

## Related Documents

- [D1_API_INVENTORY.md](./D1_API_INVENTORY.md) — Baseline инвентаризация
- [D1_EXPRESSION_SURFACE_ANALYSIS.md](./D1_EXPRESSION_SURFACE_ANALYSIS.md) — Expression Surface analysis
- [CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md) — Expression Surface mechanism
