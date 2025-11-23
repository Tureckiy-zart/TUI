# 📦 Примеры компонентов Tenerife UI

Примеры использования всех компонентов библиотеки Tenerife UI.

---

## Button (Кнопка)

### Все варианты

```tsx
import { Button } from "@tenerife.music/ui";

function ButtonExamples() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Primary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

### Размеры

```tsx
import { Button } from "@tenerife.music/ui";

function ButtonSizes() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🔍</Button>
    </div>
  );
}
```

### Состояния

```tsx
import { Button } from "@tenerife.music/ui";

function ButtonStates() {
  return (
    <div className="flex gap-2">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
```

### С иконками

```tsx
import { Button } from "@tenerife.music/ui";
import { Search, Plus, Trash2 } from "lucide-react";

function ButtonWithIcons() {
  return (
    <div className="flex gap-2">
      <Button>
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
      <Button variant="outline">
        <Plus className="mr-2 h-4 w-4" />
        Add
      </Button>
      <Button variant="destructive">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
}
```

**Props:**

- `variant`: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`
- `size`: `"sm" | "default" | "lg" | "icon"`
- `disabled`: `boolean`
- `asChild`: `boolean` - Использовать как Slot (Radix UI)

---

## Input (Поле ввода)

### Базовое использование

```tsx
import { Input, Label } from "@tenerife.music/ui";

function InputExample() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="example@email.com" />
    </div>
  );
}
```

### Различные типы

```tsx
import { Input, Label } from "@tenerife.music/ui";

function InputTypes() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="text">Text</Label>
        <Input id="text" type="text" placeholder="Enter text" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="email@example.com" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Password" />
      </div>
      <div>
        <Label htmlFor="number">Number</Label>
        <Input id="number" type="number" placeholder="123" />
      </div>
    </div>
  );
}
```

### С состоянием ошибки

```tsx
import { Input, Label } from "@tenerife.music/ui";

function InputWithError() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="example@email.com"
        className="border-destructive"
      />
      <p className="text-sm text-destructive">Invalid email address</p>
    </div>
  );
}
```

**Props:**

- Все стандартные HTML input props
- `type`: `"text" | "email" | "password" | "number" | ...`
- `placeholder`: `string`
- `disabled`: `boolean`

---

## Card (Карточка)

### Базовая карточка

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@tenerife.music/ui";
import { Button } from "@tenerife.music/ui";

function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  );
}
```

### EventCard

```tsx
import { EventCard } from "@tenerife.music/ui";

function EventCardExample() {
  const event = {
    name: { en: "Summer Festival" },
    start_date: "2024-07-15",
    venue_id: { name: { en: "Beach Club" } },
    price: "€25 - €50",
    image: "/event-image.jpg",
  };

  return (
    <EventCard
      event={event}
      featured={true}
      showImage={true}
      getTicketsLabel="Get Tickets"
      trendingBadgeText="Trending"
    />
  );
}
```

**Props EventCard:**

- `event`: `EventCardEvent` - Объект события
- `featured`: `boolean` - Отображать как featured
- `showImage`: `boolean` - Показывать изображение
- `getTicketsLabel`: `string` - Текст кнопки
- `trendingBadgeText`: `string` - Текст бейджа

---

## Modal (Модальное окно)

### SimpleModal

```tsx
import { SimpleModal, Button } from "@tenerife.music/ui";
import { useState } from "react";

function SimpleModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <SimpleModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
        <p>Modal content goes here</p>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </SimpleModal>
    </>
  );
}
```

### CustomDialog (Radix UI Dialog)

```tsx
import { CustomDialog, Button } from "@tenerife.music/ui";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@tenerife.music/ui";

function CustomDialogExample() {
  return (
    <CustomDialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
        <p>Dialog content goes here</p>
      </DialogContent>
    </CustomDialog>
  );
}
```

**Props SimpleModal:**

- `isOpen`: `boolean` - Открыто ли модальное окно
- `onClose`: `() => void` - Функция закрытия
- `title`: `string` - Заголовок (опционально)
- `children`: `React.ReactNode` - Содержимое

---

## Layout компоненты

### Container

```tsx
import { Container } from "@tenerife.music/ui";

function ContainerExample() {
  return (
    <Container size="xl" padding="lg">
      <h1>Container Content</h1>
      <p>This content is constrained to a maximum width</p>
    </Container>
  );
}
```

**Props:**

- `size`: `"sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full"`
- `padding`: `"none" | "sm" | "md" | "lg" | "xl"`

### Section

```tsx
import { Section } from "@tenerife.music/ui";

function SectionExample() {
  return (
    <Section padding="lg" background="muted">
      <h2>Section Title</h2>
      <p>Section content</p>
    </Section>
  );
}
```

**Props:**

- `padding`: `"none" | "sm" | "md" | "lg" | "xl"`
- `background`: `"default" | "muted" | "card"`
- `as`: `keyof JSX.IntrinsicElements` - HTML элемент

### Grid

```tsx
import { Grid } from "@tenerife.music/ui";

function GridExample() {
  return (
    <Grid cols={3} gap={4}>
      <div className="bg-card p-4">Item 1</div>
      <div className="bg-card p-4">Item 2</div>
      <div className="bg-card p-4">Item 3</div>
    </Grid>
  );
}
```

**Props:**

- `cols`: `number` - Количество колонок
- `gap`: `number` - Отступ между элементами
- `className`: `string` - Дополнительные классы

### Flex

```tsx
import { Flex } from "@tenerife.music/ui";

function FlexExample() {
  return (
    <Flex direction="row" gap={4} align="center" justify="between">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Flex>
  );
}
```

**Props:**

- `direction`: `"row" | "column"`
- `gap`: `number` - Отступ между элементами
- `align`: `"start" | "center" | "end" | "stretch"`
- `justify`: `"start" | "center" | "end" | "between" | "around"`

---

## Skeleton (Загрузка)

### EventCardSkeleton

```tsx
import { EventCardSkeleton } from "@tenerife.music/ui";

function EventCardSkeletonExample() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
    </div>
  );
}
```

### VenueCardSkeleton

```tsx
import { VenueCardSkeleton } from "@tenerife.music/ui";

function VenueCardSkeletonExample() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <VenueCardSkeleton />
      <VenueCardSkeleton />
    </div>
  );
}
```

### Базовый Skeleton

```tsx
import { Skeleton } from "@tenerife.music/ui";

function SkeletonExample() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
```

**Props Skeleton:**

- `className`: `string` - Дополнительные классы для настройки размера и формы

---

## Комбинированные примеры

### Форма с валидацией

```tsx
import { Input, Label, Button, Card, CardHeader, CardTitle, CardContent } from "@tenerife.music/ui";
import { useState } from "react";

function FormExample() {
  const [email, setEmail] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <Button type="submit">Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### Карточка с модальным окном

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Button,
  SimpleModal,
} from "@tenerife.music/ui";
import { useState } from "react";

function CardWithModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Event Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Event description goes here</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsOpen(true)}>View Details</Button>
        </CardFooter>
      </Card>

      <SimpleModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Event Details">
        <p>Detailed event information</p>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </SimpleModal>
    </>
  );
}
```

### Список событий с скелетонами

```tsx
import { EventCard, EventCardSkeleton, Container, Section } from "@tenerife.music/ui";
import { useState, useEffect } from "react";

function EventList() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Загрузка данных
    setTimeout(() => {
      setEvents([
        { name: { en: "Event 1" }, start_date: "2024-07-15", price: "€25" },
        { name: { en: "Event 2" }, start_date: "2024-07-20", price: "€30" },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Container>
      <Section>
        <h2 className="mb-8 text-3xl font-bold">Events</h2>
        <div className="grid grid-cols-3 gap-6">
          {loading ? (
            <>
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </>
          ) : (
            events.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                featured={index === 0}
                showImage={true}
                getTicketsLabel="Get Tickets"
                trendingBadgeText="Trending"
              />
            ))
          )}
        </div>
      </Section>
    </Container>
  );
}
```

---

## Полный пример страницы

```tsx
import {
  ThemeProvider,
  Container,
  Section,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Label,
} from "@tenerife.music/ui";

function ExamplePage() {
  return (
    <ThemeProvider defaultMode="night" enableSystem={true}>
      <Container>
        <Section padding="xl">
          <h1 className="mb-8 text-5xl font-bold">Welcome to Tenerife UI</h1>

          <Grid cols={3} gap={6}>
            <Card>
              <CardHeader>
                <CardTitle>Feature 1</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Feature description</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature 2</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Feature description</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature 3</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Feature description</p>
              </CardContent>
            </Card>
          </Grid>

          <Section padding="lg" background="muted" className="mt-12">
            <h2 className="mb-4 text-3xl font-bold">Contact Us</h2>
            <div className="max-w-md space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <Button>Send Message</Button>
            </div>
          </Section>
        </Section>
      </Container>
    </ThemeProvider>
  );
}
```

---

## Premium Layout Sections (Премиум секции макета)

### HeroSection (Герой-секция)

Герой-секция для главных заголовков страниц с поддержкой различных вариантов макета.

#### Базовое использование

```tsx
import { HeroSection, Button } from "@tenerife.music/ui";

function HeroExample() {
  return (
    <HeroSection
      title="Добро пожаловать в Tenerife UI"
      description="Современная библиотека компонентов для создания красивых интерфейсов"
      actions={
        <>
          <Button variant="primary">Начать</Button>
          <Button variant="outline">Узнать больше</Button>
        </>
      }
    />
  );
}
```

#### Варианты макета

```tsx
import { HeroSection, Button } from "@tenerife.music/ui";

function HeroVariants() {
  return (
    <>
      {/* Полная ширина (по умолчанию) */}
      <HeroSection
        variant="full-width"
        title="Заголовок"
        description="Описание"
        actions={<Button>Действие</Button>}
      />

      {/* Разделенный макет */}
      <HeroSection
        variant="split"
        title="Заголовок"
        description="Описание"
        actions={<Button>Действие</Button>}
        media={<img src="/hero.jpg" alt="Hero" />}
      />
    </>
  );
}
```

#### Варианты фона

```tsx
import { HeroSection } from "@tenerife.music/ui";

function HeroBackgrounds() {
  return (
    <>
      <HeroSection title="По умолчанию" background="default" />
      <HeroSection title="Приглушенный" background="muted" />
      <HeroSection title="Карточка" background="card" />
    </>
  );
}
```

#### С медиа-контентом

```tsx
import { HeroSection, Button } from "@tenerife.music/ui";

function HeroWithMedia() {
  return (
    <HeroSection
      variant="split"
      title="Создавайте удивительные интерфейсы"
      description="Используйте наши компоненты для быстрой разработки"
      actions={<Button variant="primary">Начать</Button>}
      media={
        <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
          <span className="text-4xl">🎨</span>
        </div>
      }
    />
  );
}
```

**Props:**

- `variant`: `"full-width" | "split"` - Вариант макета
- `title`: `React.ReactNode` - Заголовок
- `description`: `React.ReactNode` - Описание (опционально)
- `actions`: `React.ReactNode` - Кнопки действий (опционально)
- `media`: `React.ReactNode` - Медиа-контент (опционально)
- `background`: `"default" | "muted" | "card"` - Вариант фона
- `className`: `string` - Дополнительные CSS классы

---

### FeatureSection (Секция функций)

Секция для отображения функций в адаптивной сетке.

#### Базовое использование

```tsx
import { FeatureSection } from "@tenerife.music/ui";

function FeatureExample() {
  const features = [
    {
      icon: "🚀",
      title: "Быстрая производительность",
      description: "Оптимизированные компоненты для скорости",
    },
    {
      icon: "🎨",
      title: "Красивый дизайн",
      description: "Современные и чистые интерфейсы",
    },
    {
      icon: "♿",
      title: "Доступность",
      description: "Соответствие стандартам WCAG AA",
    },
  ];

  return (
    <FeatureSection
      title="Функции"
      description="Все что нужно для создания современных приложений"
      features={features}
      columns={3}
    />
  );
}
```

#### Различные конфигурации колонок

```tsx
import { FeatureSection } from "@tenerife.music/ui";

function FeatureColumns() {
  const features = [
    { icon: "⭐", title: "Функция 1", description: "Описание" },
    { icon: "⭐", title: "Функция 2", description: "Описание" },
    { icon: "⭐", title: "Функция 3", description: "Описание" },
    { icon: "⭐", title: "Функция 4", description: "Описание" },
  ];

  return (
    <>
      {/* 1 колонка */}
      <FeatureSection features={features} columns={1} />

      {/* 2 колонки */}
      <FeatureSection features={features} columns={2} />

      {/* 3 колонки (по умолчанию) */}
      <FeatureSection features={features} columns={3} />

      {/* 4 колонки */}
      <FeatureSection features={features} columns={4} />
    </>
  );
}
```

#### С кастомными иконками

```tsx
import { FeatureSection } from "@tenerife.music/ui";
import { Zap, Shield, Code } from "lucide-react";

function FeatureWithIcons() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Молниеносная скорость",
      description: "Оптимизировано для производительности",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Безопасность",
      description: "Построено с учетом лучших практик безопасности",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "TypeScript",
      description: "Полная поддержка TypeScript",
    },
  ];

  return <FeatureSection features={features} />;
}
```

**Props:**

- `features`: `FeatureItem[]` - Массив функций
  - `icon`: `React.ReactNode` - Иконка
  - `title`: `string` - Заголовок
  - `description`: `string` - Описание
- `title`: `string` - Заголовок секции (опционально)
- `description`: `string` - Описание секции (опционально)
- `columns`: `1 | 2 | 3 | 4` - Количество колонок (по умолчанию 3)
- `className`: `string` - Дополнительные CSS классы

---

### CTASection (Секция призыва к действию)

Секция для призыва к действию с гибкими кнопками действий.

#### Базовое использование

```tsx
import { CTASection } from "@tenerife.music/ui";

function CTAExample() {
  return (
    <CTASection
      headline="Готовы начать?"
      description="Присоединяйтесь к тысячам разработчиков"
      primaryAction={{
        label: "Начать",
        onClick: () => console.log("Начать"),
      }}
      secondaryAction={{
        label: "Узнать больше",
        onClick: () => console.log("Узнать больше"),
      }}
    />
  );
}
```

#### Варианты макета

```tsx
import { CTASection } from "@tenerife.music/ui";

function CTALayouts() {
  return (
    <>
      {/* Центрированный (по умолчанию) */}
      <CTASection
        layout="centered"
        headline="Центрированный CTA"
        primaryAction={{ label: "Действие", onClick: () => {} }}
      />

      {/* Разделенный */}
      <CTASection
        layout="split"
        headline="Разделенный CTA"
        description="Контент слева, действия справа"
        primaryAction={{ label: "Действие", onClick: () => {} }}
      />
    </>
  );
}
```

#### С ссылками

```tsx
import { CTASection } from "@tenerife.music/ui";

function CTAWithLinks() {
  return (
    <CTASection
      headline="Изучите наши компоненты"
      description="Просмотрите библиотеку компонентов"
      primaryAction={{
        label: "Просмотреть компоненты",
        href: "/components",
        variant: "primary",
      }}
      secondaryAction={{
        label: "Читать документацию",
        href: "/docs",
        variant: "outline",
      }}
    />
  );
}
```

#### Различные варианты кнопок

```tsx
import { CTASection } from "@tenerife.music/ui";

function CTAVariants() {
  return (
    <CTASection
      headline="Выберите свой стиль"
      description="Настройте варианты кнопок под ваш бренд"
      primaryAction={{
        label: "Основное действие",
        onClick: () => {},
        variant: "primary",
      }}
      secondaryAction={{
        label: "Акцентное действие",
        onClick: () => {},
        variant: "accent",
      }}
    />
  );
}
```

#### Только основное действие

```tsx
import { CTASection } from "@tenerife.music/ui";

function CTAPrimaryOnly() {
  return (
    <CTASection
      headline="Готовы начать?"
      description="Начните создавать удивительные приложения сегодня"
      primaryAction={{
        label: "Начать",
        onClick: () => {},
      }}
    />
  );
}
```

**Props:**

- `headline`: `React.ReactNode` - Заголовок
- `description`: `React.ReactNode` - Описание (опционально)
- `primaryAction`: `object` - Основное действие (опционально)
  - `label`: `string` - Текст кнопки
  - `onClick`: `() => void` - Обработчик клика (если используется кнопка)
  - `href`: `string` - Ссылка (если используется ссылка)
  - `variant`: `ButtonProps["variant"]` - Вариант кнопки
- `secondaryAction`: `object` - Вторичное действие (опционально)
  - Те же свойства, что и `primaryAction`
- `layout`: `"centered" | "split"` - Вариант макета
- `className`: `string` - Дополнительные CSS классы

---

## Следующие шаги

- [Руководство по использованию](./USAGE.md) - Полное руководство по использованию
- [Руководство по токенам](./TOKENS_GUIDE.md) - Работа с токенами
- [Руководство по темам](./THEME_GUIDE.md) - Настройка тем

---

**Версия документа:** 1.1  
**Последнее обновление:** 2025-01-20
