# 📝 Field Guide

**Last Updated:** 2025-12-11  
**Version:** 1.0

Полное руководство по использованию Field компонента в Tenerife UI.

---

## Введение

Field — это составной компонент для создания полей форм с label, control, description и error. Использует Stack для spacing и обеспечивает консистентную структуру форм.

### Основные возможности

- 🎯 **Составной компонент**: Field, FieldLabel, FieldControl, FieldDescription, FieldError
- 📐 **Token-driven spacing**: все отступы через design tokens
- ♿ **Accessible**: правильная связь label и input
- 🔗 **Composable**: работает с любыми input компонентами

---

## Базовое использование

### Простое поле

```tsx
import { Field, FieldLabel, FieldControl, Input } from "@tenerife.music/ui";

function BasicField() {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <FieldControl asChild>
        <Input id="email" type="email" placeholder="example@email.com" />
      </FieldControl>
    </Field>
  );
}
```

### С описанием

```tsx
import { Field, FieldLabel, FieldControl, FieldDescription, Input } from "@tenerife.music/ui";

function FieldWithDescription() {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <FieldControl asChild>
        <Input id="email" type="email" />
      </FieldControl>
      <FieldDescription>Мы никогда не поделимся вашим email с третьими лицами.</FieldDescription>
    </Field>
  );
}
```

### С ошибкой

```tsx
import { Field, FieldLabel, FieldControl, FieldError, Input } from "@tenerife.music/ui";

function FieldWithError() {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <FieldControl asChild>
        <Input id="email" type="email" />
      </FieldControl>
      <FieldError>Email обязателен для заполнения</FieldError>
    </Field>
  );
}
```

### Полный пример

```tsx
import {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  Input,
} from "@tenerife.music/ui";

function CompleteField() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email) {
      setError("Email обязателен");
      return false;
    }
    if (!email.includes("@")) {
      setError("Некорректный email");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <FieldControl asChild>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validate}
        />
      </FieldControl>
      <FieldDescription>Введите ваш email адрес</FieldDescription>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
```

---

## Компоненты Field

### Field

Корневой контейнер для поля формы. Использует Stack для spacing.

**Props:**

- Все стандартные HTML `div` атрибуты
- Автоматически применяет token-based spacing

### FieldLabel

Label для поля формы. Оборачивает стандартный Label компонент.

**Props:**

- `htmlFor`: `string` - Связь с input элементом (обязательно)
- Все стандартные HTML `label` атрибуты

### FieldControl

Обертка для input/textarea/select элементов.

**Props:**

- `asChild`: `boolean` - Использовать как Slot (Radix UI)
- Все стандартные HTML атрибуты

### FieldDescription

Описание поля (helper text).

**Props:**

- Все стандартные HTML атрибуты

### FieldError

Сообщение об ошибке.

**Props:**

- Все стандартные HTML атрибуты

---

## Примеры использования

### С разными типами input

```tsx
import {
  Field,
  FieldLabel,
  FieldControl,
  Input,
  Textarea,
  SelectRoot,
  SelectTrigger,
  SelectListbox,
  SelectOption,
} from "@tenerife.music/ui";

function DifferentInputs() {
  return (
    <div className="space-y-4">
      <Field>
        <FieldLabel htmlFor="text">Текст</FieldLabel>
        <FieldControl asChild>
          <Input id="text" type="text" />
        </FieldControl>
      </Field>

      <Field>
        <FieldLabel htmlFor="textarea">Сообщение</FieldLabel>
        <FieldControl asChild>
          <Textarea id="textarea" rows={4} />
        </FieldControl>
      </Field>

      <Field>
        <FieldLabel htmlFor="select">Выбор</FieldLabel>
        <FieldControl asChild>
          <SelectRoot>
            <SelectTrigger id="select" />
            <SelectListbox>
              <SelectOption value="1">Опция 1</SelectOption>
              <SelectOption value="2">Опция 2</SelectOption>
            </SelectListbox>
          </SelectRoot>
        </FieldControl>
      </Field>
    </div>
  );
}
```

### Форма с валидацией

```tsx
import {
  Field,
  FieldLabel,
  FieldControl,
  FieldError,
  Input,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@tenerife.music/ui";
import { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name) newErrors.name = "Имя обязательно";
    if (!formData.email) {
      newErrors.email = "Email обязателен";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Некорректный email";
    }
    if (!formData.message) newErrors.message = "Сообщение обязательно";

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted", formData);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Связаться с нами</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="name">Имя</FieldLabel>
            <FieldControl asChild>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </FieldControl>
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldControl asChild>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </FieldControl>
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="message">Сообщение</FieldLabel>
            <FieldControl asChild>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </FieldControl>
            {errors.message && <FieldError>{errors.message}</FieldError>}
          </Field>

          <Button type="submit">Отправить</Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### Интеграция с react-hook-form

```tsx
import { Field, FieldLabel, FieldControl, FieldError, Input, Button } from "@tenerife.music/ui";
import { useForm } from "react-hook-form";

function FormWithReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <FieldControl asChild>
          <Input
            id="email"
            {...register("email", {
              required: "Email обязателен",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Некорректный email",
              },
            })}
          />
        </FieldControl>
        {errors.email && <FieldError>{errors.email.message as string}</FieldError>}
      </Field>

      <Button type="submit">Отправить</Button>
    </form>
  );
}
```

---

## Best Practices

### 1. Всегда связывайте label с input

```tsx
// ✅ Правильно
<FieldLabel htmlFor="email">Email</FieldLabel>
<Input id="email" />

// ❌ Неправильно
<FieldLabel>Email</FieldLabel>
<Input />
```

### 2. Используйте asChild для FieldControl

```tsx
// ✅ Правильно
<FieldControl asChild>
  <Input id="email" />
</FieldControl>

// ❌ Неправильно
<FieldControl>
  <Input id="email" />
</FieldControl>
```

### 3. Показывайте ошибки условно

```tsx
// ✅ Правильно
{
  error && <FieldError>{error}</FieldError>;
}

// ❌ Неправильно
<FieldError>{error}</FieldError>; // Всегда показывается
```

### 4. Используйте FieldDescription для помощи

```tsx
// ✅ Правильно
<FieldDescription>Минимум 8 символов, включая цифры и буквы</FieldDescription>
```

---

## Accessibility

Field компонент обеспечивает правильную доступность:

- ✅ Связь label и input через `htmlFor` и `id`
- ✅ Описания через `FieldDescription`
- ✅ Ошибки через `FieldError` с правильными ARIA атрибутами
- ✅ Screen reader поддержка

---

## Следующие шаги

- [Component Examples](./COMPONENT_EXAMPLES.md) - Примеры использования форм
- [Accessibility Guidelines](./a11y_guidelines.md) - Руководство по доступности форм

---

**Версия документа:** 1.0  
**Последнее обновление:** 2025-12-11
