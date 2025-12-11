# 📊 DataList Guide

**Last Updated:** 2025-12-11  
**Version:** 1.0

Полное руководство по использованию DataList компонента в Tenerife UI.

---

## Введение

DataList — это mobile-first компонент для отображения пар ключ-значение. Использует семантический HTML (dl/dt/dd) и token-based spacing для консистентности.

### Основные возможности

- 📱 **Mobile-first**: адаптивный дизайн для мобильных и десктопов
- 🎯 **Token-driven**: все spacing через design tokens
- ♿ **Accessible**: семантический HTML
- 📐 **Responsive**: автоматическая адаптация layout

---

## Базовое использование

### Простой список

```tsx
import { DataListRoot, DataListItem, DataListLabel, DataListValue } from "@tenerife.music/ui";

function BasicDataList() {
  return (
    <DataListRoot>
      <DataListItem>
        <DataListLabel>Имя</DataListLabel>
        <DataListValue>John Doe</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Email</DataListLabel>
        <DataListValue>john.doe@example.com</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Роль</DataListLabel>
        <DataListValue>Администратор</DataListValue>
      </DataListItem>
    </DataListRoot>
  );
}
```

### Использование через compound component

```tsx
import { DataList } from "@tenerife.music/ui";

function CompoundDataList() {
  return (
    <DataList>
      <DataList.Item>
        <DataList.Label>Имя</DataList.Label>
        <DataList.Value>John Doe</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Email</DataList.Label>
        <DataList.Value>john.doe@example.com</DataList.Value>
      </DataList.Item>
    </DataList>
  );
}
```

---

## Responsive поведение

### Mobile (вертикальный layout)

На мобильных устройствах labels отображаются над values:

```
Имя
John Doe

Email
john.doe@example.com
```

### Desktop (горизонтальный layout)

На десктопах labels слева, values справа:

```
Имя              John Doe
Email            john.doe@example.com
```

### Настройка ширины label

```tsx
import { DataListRoot } from "@tenerife.music/ui";

function DataListWithLabelWidth() {
  return <DataListRoot labelWidth="sm">{/* Labels будут уже */}</DataListRoot>;
}
```

**Доступные значения:**

- `sm` - Маленькая ширина
- `md` - Средняя ширина (по умолчанию)
- `lg` - Большая ширина

---

## Примеры использования

### Информация о пользователе

```tsx
import {
  DataListRoot,
  DataListItem,
  DataListLabel,
  DataListValue,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@tenerife.music/ui";

function UserInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о пользователе</CardTitle>
      </CardHeader>
      <CardContent>
        <DataListRoot>
          <DataListItem>
            <DataListLabel>Полное имя</DataListLabel>
            <DataListValue>John Doe</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Email</DataListLabel>
            <DataListValue>john.doe@example.com</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Телефон</DataListLabel>
            <DataListValue>+1 (555) 123-4567</DataListValue>
          </DataListItem>
          <DataListItem>
            <DataListLabel>Роль</DataListLabel>
            <DataListValue>Администратор</DataListValue>
          </DataListItem>
        </DataListRoot>
      </CardContent>
    </Card>
  );
}
```

### Информация о продукте

```tsx
import { DataListRoot, DataListItem, DataListLabel, DataListValue } from "@tenerife.music/ui";

function ProductInfo() {
  return (
    <DataListRoot>
      <DataListItem>
        <DataListLabel>Название продукта</DataListLabel>
        <DataListValue>Premium Headphones</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>SKU</DataListLabel>
        <DataListValue>PH-2024-001</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Цена</DataListLabel>
        <DataListValue>$199.99</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Остаток</DataListLabel>
        <DataListValue>42 единицы</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Категория</DataListLabel>
        <DataListValue>Аудио оборудование</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListLabel>Описание</DataListLabel>
        <DataListValue>
          Высококачественные беспроводные наушники с шумоподавлением и премиальным звуком.
        </DataListValue>
      </DataListItem>
    </DataListRoot>
  );
}
```

### Динамический список

```tsx
import { DataListRoot, DataListItem, DataListLabel, DataListValue } from "@tenerife.music/ui";

function DynamicDataList() {
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    department: "Engineering",
  };

  return (
    <DataListRoot>
      {Object.entries(userData).map(([key, value]) => (
        <DataListItem key={key}>
          <DataListLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</DataListLabel>
          <DataListValue>{value}</DataListValue>
        </DataListItem>
      ))}
    </DataListRoot>
  );
}
```

---

## Компоненты и Props

### DataListRoot

Корневой компонент списка.

**Props:**

- `labelWidth`: `"sm" | "md" | "lg"` - Ширина label на desktop (по умолчанию: "md")
- `className`: `string` - Дополнительные CSS классы
- Все стандартные HTML `dl` атрибуты

### DataListItem

Элемент списка (обертка для Label и Value).

**Props:**

- Все стандартные HTML атрибуты

### DataListLabel

Label (ключ) элемента.

**Props:**

- Все стандартные HTML `dt` атрибуты

### DataListValue

Value (значение) элемента.

**Props:**

- Все стандартные HTML `dd` атрибуты

---

## Accessibility

DataList использует семантический HTML:

- ✅ `<dl>` - Definition list
- ✅ `<dt>` - Definition term (Label)
- ✅ `<dd>` - Definition description (Value)
- ✅ Правильная структура для screen readers

---

## Best Practices

### 1. Используйте короткие labels

```tsx
// ✅ Правильно
<DataListLabel>Email</DataListLabel>

// ❌ Неправильно
<DataListLabel>Адрес электронной почты пользователя</DataListLabel>
```

### 2. Группируйте связанные данные

```tsx
// ✅ Правильно - логическая группировка
<DataListRoot>
  <DataListItem>
    <DataListLabel>Имя</DataListLabel>
    <DataListValue>John Doe</DataListValue>
  </DataListItem>
  <DataListItem>
    <DataListLabel>Email</DataListLabel>
    <DataListValue>john@example.com</DataListValue>
  </DataListItem>
  {/* Разделитель визуальный */}
  <DataListItem>
    <DataListLabel>Роль</DataListLabel>
    <DataListValue>Admin</DataListValue>
  </DataListItem>
</DataListRoot>
```

### 3. Используйте для структурированных данных

```tsx
// ✅ Правильно - структурированные данные
<DataListRoot>
  <DataListItem>
    <DataListLabel>Дата создания</DataListLabel>
    <DataListValue>2025-12-11</DataListValue>
  </DataListItem>
</DataListRoot>

// ❌ Неправильно - для обычного текста используйте Text/Body
<DataListRoot>
  <DataListItem>
    <DataListLabel>Абзац</DataListLabel>
    <DataListValue>Длинный текст статьи...</DataListValue>
  </DataListItem>
</DataListRoot>
```

---

## Следующие шаги

- [Component Examples](./COMPONENT_EXAMPLES.md) - Примеры использования
- [Tokens Guide](./TOKENS_GUIDE.md) - Работа с data tokens

---

**Версия документа:** 1.0  
**Последнее обновление:** 2025-12-11
