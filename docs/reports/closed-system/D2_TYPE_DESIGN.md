> ⚠️ **NON-CANONICAL DOCUMENT**
> 
> This document is **NOT** part of the canonical Closed System v2 documentation set.
> 
> **Status:** DEPRECATED / HISTORICAL CONTEXT ONLY  
> **Canonical Reference:** [CLOSED_SYSTEM_V2_CANON_INDEX.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_CANON_INDEX.md)
> 
> This document is provided for historical context only. For authoritative Closed System v2 documentation, refer to the canonical document set.

---

# Closed System v2 — D2: Type Design

**Date:** 2026-01-26  
**Phase:** D2.1 — Type Design  
**Status:** Complete  
**Purpose:** Проектирование типовых ограничений для Channel Explicitness и Boundary Enforcement

---

## Purpose

Этот документ проектирует TypeScript типы, которые ограничивают использование только санкционированными API поверхностями. Типы должны исключать невалидные состояния и обеспечивать Channel Explicitness и Boundary Enforcement.

---

## Type System Requirements

### Channel Explicitness Requirements

**Source:** [CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md)

**Purpose:** Channel Explicitness ensures that every channel that can influence render or behavior is explicit in the architectural model.

**Type System Requirements:**
- ✅ Типы должны явно перечислять все допустимые каналы влияния
- ✅ Типы должны исключать неявные каналы
- ✅ Типы должны предотвращать prop leakage

### Boundary Enforcement Requirements

**Source:** [CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md)

**Purpose:** Boundary Enforcement enforces the split between Public and Internal, and between Foundation and consumer.

**Type System Requirements:**
- ✅ Типы должны четко разделять Public vs Internal
- ✅ Типы должны предотвращать утечку внутренних типов в публичный API
- ✅ Типы должны исключать невалидные комбинации props

---

## Type Design Patterns

### Pattern 1: Explicit Union Types

**Purpose:** Явные union типы вместо широких типов для исключения невалидных значений.

**Example:**
```typescript
// ✅ Good: Explicit union type
export type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive";

// ❌ Bad: Wide type
export type ButtonVariant = string;
```

**Application:**
- Все variant props используют explicit union types
- Все size props используют explicit union types
- Все color props используют explicit union types

### Pattern 2: Omit for Foundation Enforcement

**Purpose:** Исключение className/style через Omit для Foundation Enforcement compliance.

**Example:**
```typescript
// ✅ Good: Foundation Enforcement
export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> {
  variant?: ButtonVariant;
}

// ❌ Bad: Allows className/style
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}
```

**Application:**
- Все Foundation компоненты используют `Omit<React.*HTMLAttributes, "className" | "style">`
- Исключение конфликтующих props (size, color, rows, etc.)

### Pattern 3: Conditional Types for Role-Based Enforcement

**Purpose:** Использование conditional types для role-based enforcement (например, Typography Color Policy).

**Example:**
```typescript
// ✅ Good: Role-based color enforcement
export interface TextProps<R extends TypographyRole = TypographyRole> extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "className" | "style"
> {
  typographyRole?: R;
  color?: AllowedTextForRole<R>;  // Conditional type based on role
}
```

**Application:**
- Text component использует conditional types для role-based color enforcement
- Обеспечивает type-level safety для Typography Color Policy

### Pattern 4: Explicit Props vs VariantProps

**Purpose:** Явные props вместо VariantProps для предотвращения утечки внутренних типов.

**Example:**
```typescript
// ✅ Good: Explicit props
export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> {
  variant?: ButtonVariant;  // Explicit union type
  size?: ButtonSize;        // Explicit union type
}

// ⚠️ Acceptable: VariantProps (if no type leakage)
export interface HeadingProps extends
  Omit<React.HTMLAttributes<HTMLHeadingElement>, "className" | "style" | "color">,
  VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
```

**Assessment:**
- VariantProps допустим, если не утечет внутренние типы
- Нужно проверить в D2.3, что VariantProps не утечет внутренние типы

---

## Component-by-Component Type Design

### 1. Button

**Status:** ✅ **NO CHANGES REQUIRED**

**Current Types:**
```typescript
export type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

**Assessment:**
- ✅ Explicit union types
- ✅ Foundation Enforcement (Omit className/style)
- ✅ Channel Explicitness (все каналы явны)
- ✅ Boundary Enforcement (нет утечки внутренних типов)

**Action:** Нет изменений

---

### 2. Text

**Status:** ⚠️ **DEPRECATED PROP REMOVAL REQUIRED**

**Current Types:**
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
  tone?: TextTone;  // ⚠️ DEPRECATED - must be removed
}
```

**Required Changes:**
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

**Assessment:**
- ✅ Explicit union types
- ✅ Conditional types для role-based enforcement
- ✅ Foundation Enforcement
- ⚠️ `tone` prop должен быть удален

**Action:** Удалить `tone` prop в D2.2

---

### 3. Radio

**Status:** ⚠️ **VARIANT_PROPS VERIFICATION REQUIRED**

**Current Types:**
```typescript
export type RadioVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type RadioSize = "xs" | "sm" | "md" | "lg" | "xl";
export type RadioState = "default" | "checked" | "disabled" | "error";

export type RadioProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "size" | "onChange" | "className" | "style"
> &
  VariantProps<typeof radioVariants> & {
    variant?: RadioVariant;
    size?: RadioSize;
    state?: RadioState;
    // ... other props
  };
```

**Issue:**
- ⚠️ Использует `VariantProps<typeof radioVariants>` — может утечь внутренние типы

**Design Decision:**
- `VariantProps` используется для type inference
- Явные union типы уже определены (RadioVariant, RadioSize, RadioState)
- Проверить в D2.3, что VariantProps не утечет внутренние типы
- Если утечка обнаружена, заменить на явные props

**Assessment:**
- ✅ Explicit union types определены
- ⚠️ VariantProps usage требует проверки
- ✅ Foundation Enforcement

**Action:** Проверить VariantProps в D2.3, при необходимости заменить на явные props

---

### 4. Heading

**Status:** ⚠️ **VARIANT_PROPS VERIFICATION REQUIRED**

**Current Types:**
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
- Проверить в D2.3, что VariantProps не утечет внутренние типы
- Если утечка обнаружена, заменить на явные props

**Assessment:**
- ⚠️ VariantProps usage требует проверки
- ✅ Foundation Enforcement

**Action:** Проверить VariantProps в D2.3, при необходимости заменить на явные props

---

### 5. Field

**Status:** ❌ **MAJOR TYPE CHANGES REQUIRED**

**Current Types:**
```typescript
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface FieldControlProps extends React.HTMLAttributes<HTMLDivElement> {}
```

**Required Changes:**
```typescript
export interface FieldProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  children: React.ReactNode;
}

export interface FieldControlProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  children: React.ReactNode;
}
```

**Assessment:**
- ❌ Текущие типы нарушают Foundation Enforcement
- ✅ Новые типы обеспечивают Foundation Enforcement
- ✅ Channel Explicitness (явные props)
- ✅ Boundary Enforcement (нет утечки внутренних типов)

**Action:** Реализовать изменения в D2.2

---

### 6. Alert

**Status:** ❌ **FOUNDATION ENFORCEMENT FIX REQUIRED**

**Current Types:**
```typescript
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}
```

**Required Changes:**
```typescript
export interface AlertProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  variant?: AlertVariant;
}
```

**Assessment:**
- ❌ Текущие типы нарушают Foundation Enforcement
- ✅ Новые типы обеспечивают Foundation Enforcement
- ✅ Channel Explicitness
- ✅ Boundary Enforcement

**Action:** Реализовать изменения в D2.2

---

### 7. Badge

**Status:** ❌ **FOUNDATION ENFORCEMENT FIX REQUIRED**

**Current Types:**
```typescript
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}
```

**Required Changes:**
```typescript
export interface BadgeProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  variant?: BadgeVariant;
}
```

**Assessment:**
- ❌ Текущие типы нарушают Foundation Enforcement
- ✅ Новые типы обеспечивают Foundation Enforcement
- ✅ Channel Explicitness
- ✅ Boundary Enforcement

**Action:** Реализовать изменения в D2.2

---

### 8. Progress

**Status:** ❌ **FOUNDATION ENFORCEMENT FIX REQUIRED**

**Current Types:**
```typescript
export interface ProgressProps {
  value: number;
  max?: number;
  size?: ProgressSize;
  className?: string;  // ❌ Must be removed
}
```

**Required Changes:**
```typescript
export interface ProgressProps {
  value: number;
  max?: number;
  size?: ProgressSize;
  // className removed - Foundation Enforcement compliance
}
```

**Assessment:**
- ❌ Текущие типы нарушают Foundation Enforcement
- ✅ Новые типы обеспечивают Foundation Enforcement
- ✅ Channel Explicitness (явные props)
- ✅ Boundary Enforcement

**Action:** Реализовать изменения в D2.2

---

### 9. Skeleton

**Status:** ❌ **FOUNDATION ENFORCEMENT FIX REQUIRED**

**Current Types:**
```typescript
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  "aria-hidden"?: boolean;
}
```

**Required Changes:**
```typescript
export interface SkeletonProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "style"
> {
  variant?: SkeletonVariant;
  "aria-hidden"?: boolean;
}
```

**Assessment:**
- ❌ Текущие типы нарушают Foundation Enforcement
- ✅ Новые типы обеспечивают Foundation Enforcement
- ✅ Channel Explicitness
- ✅ Boundary Enforcement

**Action:** Реализовать изменения в D2.2

---

### 10. HelperText

**Status:** ⚠️ **DEPRECATED PROP REMOVAL REQUIRED**

**Current Types:**
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

**Required Changes (after Text.tone removal):**
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

**Assessment:**
- ✅ Foundation Enforcement (через TextProps)
- ⚠️ `tone` prop должен быть удален после удаления Text.tone

**Action:** Удалить `tone` prop в D2.2 после удаления Text.tone

---

## Summary: Type Design Changes

### ✅ No Changes Required (12 components)

Button, IconButton, Input, Textarea, Checkbox, RadioGroup, Switch, Link, NavLink, Label, FormGroup, ErrorText, Icon

### ⚠️ Verification Required (2 components)

1. **Radio** — проверить VariantProps usage на утечку типов
2. **Heading** — проверить VariantProps usage на утечку типов

### ❌ Type Changes Required (7 components)

1. **Text** — удалить `tone` prop
2. **Field** — исключить className/style
3. **FieldControl** — исключить className/style
4. **Alert** — исключить className/style
5. **Badge** — исключить className/style
6. **Progress** — удалить className prop
7. **Skeleton** — исключить className/style
8. **HelperText** — удалить `tone` prop после удаления Text.tone

---

## Type System Patterns Summary

### Pattern 1: Explicit Union Types
- ✅ Все variant props используют explicit union types
- ✅ Все size props используют explicit union types
- ✅ Все color props используют explicit union types

### Pattern 2: Omit for Foundation Enforcement
- ✅ Все Foundation компоненты используют `Omit<React.*HTMLAttributes, "className" | "style">`
- ✅ Исключение конфликтующих props (size, color, rows, etc.)

### Pattern 3: Conditional Types
- ✅ Text component использует conditional types для role-based enforcement
- ✅ Обеспечивает type-level safety для Typography Color Policy

### Pattern 4: VariantProps Usage
- ⚠️ Radio и Heading используют VariantProps (требует проверки на утечку типов)
- ✅ Если утечка не обнаружена, VariantProps допустим

---

## Implementation Plan for D2.2

### Step 1: Foundation Enforcement Fixes

1. **Field:** Изменить `FieldProps` и `FieldControlProps`
2. **Alert:** Изменить `AlertProps`
3. **Badge:** Изменить `BadgeProps`
4. **Progress:** Удалить `className` prop
5. **Skeleton:** Изменить `SkeletonProps`

### Step 2: Deprecated Prop Removal

1. **Text:** Удалить `tone` prop
2. **HelperText:** Удалить `tone` prop

### Step 3: VariantProps Verification

1. **Radio:** Проверить VariantProps usage
2. **Heading:** Проверить VariantProps usage

---

## Validation Checklist for D2.3

- ✅ Нет type-level escape paths
- ✅ Типы enforce только declared intent surfaces
- ✅ Нет утечки внутренних типов в публичный API
- ✅ Все Foundation компоненты имеют валидные типы
- ✅ Type-tests проходят для всех компонентов

---

## Next Steps

1. **D2.2:** Реализация типовых ограничений в .types.ts файлах
2. **D2.3:** Валидация типовых ограничений через type-tests

---

## Related Documents

- [D1_API_DESIGN.md](./D1_API_DESIGN.md) — API Design с изменениями
- [CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_MECHANISM_CATEGORIES.md) — Channel Explicitness и Boundary Enforcement mechanisms
