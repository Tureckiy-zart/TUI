# D6 - Adapter Layer: Полный отчет

**Дата создания:** 2025-11-25  
**Задание:** D6 - Adapter Layer (Main Project)  
**Статус:** 📋 Готово к выполнению  
**Целевой проект:** TENERIFE_MUSIC_V_2.0 (основной проект)

---

## 📋 Содержание

1. [Обзор задания](#обзор-задания)
2. [Контекст и предпосылки](#контекст-и-предпосылки)
3. [Архитектура решения](#архитектура-решения)
4. [Структура файлов](#структура-файлов)
5. [Детальное описание адаптеров](#детальное-описание-адаптеров)
6. [Примеры кода](#примеры-кода)
7. [Инструкции по использованию](#инструкции-по-использованию)
8. [Подзадачи и чеклисты](#подзадачи-и-чеклисты)
9. [Валидация и тестирование](#валидация-и-тестирование)
10. [Связи с другими задачами](#связи-с-другими-задачами)

---

## Обзор задания

### Цель

Создать адаптерный слой в основном проекте TENERIFE_MUSIC_V_2.0 для преобразования доменных моделей в props UI компонентов. Это изолирует доменную логику от UI компонентов и обеспечивает типобезопасность.

### Зачем это нужно

После выполнения задач D2-D5, UI компоненты библиотеки принимают плоские, доменно-независимые props:

- ✅ `EventCard` принимает `EventCardProps` (flat, pre-localized)
- ✅ `VenueCard` принимает `VenueCardProps` (flat, pre-localized)
- ✅ `ArticlesSection` принимает `ArticleItem[]` (flat, pre-localized)

Но в основном проекте есть доменные модели:

- `Event` с полями `name: {en, es, ru}`, `start_date`, `venue_id`, `slug`
- `Venue` с полями `name: {en, es, ru}`, `address`, `capacity`, `slug`
- `Article` с полями `title: {en, es, ru}`, `excerpt`, `published_at`, `slug`

**Адаптерный слой** преобразует доменные модели в props UI компонентов.

---

## Контекст и предпосылки

### Что было сделано до D6

#### D2 - Domain Decoupling ✅

- Удалены вложенные доменные объекты из UI компонентов
- Компоненты принимают плоские props
- Удалены MongoDB-специфичные поля (`_id`)

#### D3 - Route Decoupling ✅

- Удалены hardcoded маршруты
- Компоненты принимают `href` prop (полный URL)
- Компоненты не знают о структуре маршрутизации

#### D4 - I18n Removal ✅

- Удалены мультиязычные паттерны (`{en, es, ru}`)
- Компоненты принимают pre-localized строки
- Локализация выполняется на стороне потребителя

#### D5 - Props Redesign ✅

- Стандартизированы имена props (`imageUrl`, `href`, `title`)
- Созданы guidelines по именованию
- Все props имеют JSDoc комментарии

### Текущее состояние

**UI Библиотека (`@tenerife.music/ui`):**

- ✅ Компоненты готовы с доменно-независимыми props
- ✅ Типы экспортированы: `EventCardProps`, `VenueCardProps`, `ArticleItem`
- ✅ Документация создана

**Основной проект (TENERIFE_MUSIC_V_2.0):**

- ⏳ Доменные модели существуют (`Event`, `Venue`, `Article`)
- ⏳ UI компоненты используются, но передают доменные модели напрямую
- ⏳ Адаптерный слой нужно создать

---

## Архитектура решения

### Принцип работы

```
┌─────────────────┐         ┌──────────────┐         ┌─────────────────┐
│  Domain Model   │         │   Adapter    │         │  UI Component   │
│                 │         │              │         │                 │
│  Event {        │   ──>   │ eventToCard  │   ──>   │  <EventCard     │
│    name: {en,   │         │ Props()      │         │   {...props}    │
│         es, ru} │         │              │         │   />            │
│    start_date   │         │              │         │                 │
│    slug         │         │              │         │                 │
│  }              │         │              │         │                 │
└─────────────────┘         └──────────────┘         └─────────────────┘
```

### Преимущества

1. **Изоляция**: UI библиотека не знает о доменных моделях
2. **Централизация**: Вся логика преобразования в одном месте
3. **Переиспользование**: Адаптеры можно использовать везде
4. **Тестируемость**: Адаптеры легко тестировать отдельно
5. **Типобезопасность**: TypeScript проверяет соответствие типов

---

## Структура файлов

### Целевая директория

```
apps/web/src/adapters/ui/
├── index.ts                    # Barrel export
├── formatters.ts              # Утилиты форматирования
├── eventToCardProps.ts        # Event → EventCardProps
├── venueToCardProps.ts        # Venue → VenueCardProps
├── articleToItemProps.ts       # Article → ArticleItem
├── tagToChipProps.ts          # Tag → Badge props
├── __tests__/
│   └── adapters.test.ts       # Тесты
└── README.md                  # Документация
```

### Зависимости

```json
{
  "dependencies": {
    "@tenerife.music/ui": "latest",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

---

## Детальное описание адаптеров

### 1. Formatters (`formatters.ts`)

Утилиты для форматирования данных в display strings.

#### `formatDate(date: Date | string, locale: string): string`

Форматирует дату/время в локализованную строку.

**Параметры:**

- `date`: Date объект или ISO 8601 строка
- `locale`: Код локали (например, 'en', 'es', 'ru')

**Возвращает:** Форматированная строка (например, "Jul 15, 2024, 7:00 PM")

**Пример:**

```typescript
formatDate(new Date("2024-07-15T19:00:00Z"), "en");
// → "Jul 15, 2024, 7:00 PM"

formatDate("2024-07-15T19:00:00Z", "es");
// → "15 jul 2024, 19:00"
```

**Реализация:**

```typescript
export function formatDate(date: Date | string, locale: string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}
```

#### `formatPrice(price: number, currency: string, locale: string): string`

Форматирует цену в локализованную валютную строку.

**Параметры:**

- `price`: Числовое значение цены
- `currency`: Код валюты (например, 'EUR', 'USD')
- `locale`: Код локали

**Возвращает:** Форматированная строка (например, "€20.00")

**Пример:**

```typescript
formatPrice(20, "EUR", "en");
// → "€20.00"

formatPrice(20, "EUR", "es");
// → "20,00 €"
```

#### `formatPriceRange(min: number, max: number, currency: string, locale: string): string`

Форматирует диапазон цен.

**Параметры:**

- `min`: Минимальная цена
- `max`: Максимальная цена
- `currency`: Код валюты
- `locale`: Код локали

**Возвращает:** Форматированная строка (например, "€20 - €50")

**Пример:**

```typescript
formatPriceRange(20, 50, "EUR", "en");
// → "€20 - €50"

formatPriceRange(20, 20, "EUR", "en");
// → "€20" (если min === max)
```

#### `formatLocation(address: string, city: string, region?: string): string`

Форматирует компоненты локации в адресную строку.

**Параметры:**

- `address`: Улица и номер
- `city`: Город
- `region`: Регион/штат (опционально)

**Возвращает:** Форматированная строка (например, "123 Main St, New York, NY")

**Пример:**

```typescript
formatLocation("123 Main St", "New York", "NY");
// → "123 Main St, New York, NY"

formatLocation("123 Main St", "New York");
// → "123 Main St, New York"
```

#### `formatCapacity(capacity: number, locale: string): string`

Форматирует число вместимости.

**Параметры:**

- `capacity`: Число вместимости
- `locale`: Код локали

**Возвращает:** Форматированная строка (например, "5,000")

**Пример:**

```typescript
formatCapacity(5000, "en");
// → "5,000"

formatCapacity(5000, "es");
// → "5000"
```

---

### 2. eventToCardProps (`eventToCardProps.ts`)

Преобразует доменную модель `Event` в `EventCardProps`.

#### Сигнатура функции

```typescript
export function eventToCardProps(
  event: Event,
  locale: string,
  options?: EventToCardPropsOptions,
): EventCardProps;
```

#### Параметры

- `event`: Доменная модель Event
- `locale`: Текущая локаль ('en', 'es', 'ru')
- `options`: Опциональные настройки
  - `basePath?: string` - Базовый путь для href (по умолчанию: '/events')
  - `currency?: string` - Код валюты (по умолчанию: 'EUR')
  - `t?: (key: string, locale: string) => string` - i18n функция для UI лейблов

#### Маппинг полей

| Domain Field                   | UI Prop             | Преобразование                                       |
| ------------------------------ | ------------------- | ---------------------------------------------------- |
| `event.name[locale]`           | `title`             | Локализация с fallback                               |
| `event.description[locale]`    | `description`       | Локализация с fallback                               |
| `event.venue_id?.name[locale]` | `venueName`         | Локализация с fallback                               |
| `event.start_date`             | `date`              | `formatDate(event.start_date, locale)`               |
| `event.price_min, price_max`   | `price`             | `formatPriceRange()` или `formatPrice()`             |
| `event.image`                  | `imageUrl`          | Прямое маппирование                                  |
| `event.slug`                   | `href`              | `\`${basePath}/${event.slug}\``                      |
| `event.ticket_url`             | `ticketUrl`         | Прямое маппирование                                  |
| `event.featured`               | `featured`          | Прямое маппирование                                  |
| -                              | `getTicketsLabel`   | `t('getTickets', locale)` или 'Get Tickets'          |
| -                              | `featuredBadgeText` | `event.featured ? t('featured', locale) : undefined` |

#### Локализация с fallback

```typescript
function localize(
  multilingual: { en?: string; es?: string; ru?: string } | undefined,
  locale: string,
): string {
  if (!multilingual) return "";
  return (
    multilingual[locale as keyof typeof multilingual] ||
    multilingual.en ||
    multilingual.es ||
    multilingual.ru ||
    ""
  );
}
```

**Fallback цепочка:** `locale → en → es → ru → ''`

#### Пример использования

```typescript
import { EventCard } from '@tenerife.music/ui';
import { eventToCardProps } from '@/adapters/ui';
import { useLocale } from '@/hooks/useLocale';

function EventList({ events }) {
  const locale = useLocale();

  return (
    <div>
      {events.map(event => (
        <EventCard
          key={event._id}
          {...eventToCardProps(event, locale)}
        />
      ))}
    </div>
  );
}
```

#### С опциями

```typescript
<EventCard
  {...eventToCardProps(event, locale, {
    basePath: '/events',
    currency: 'EUR',
    t: (key) => t(key) // i18n функция
  })}
/>
```

---

### 3. venueToCardProps (`venueToCardProps.ts`)

Преобразует доменную модель `Venue` в `VenueCardProps`.

#### Сигнатура функции

```typescript
export function venueToCardProps(
  venue: Venue,
  locale: string,
  options?: VenueToCardPropsOptions,
): VenueCardProps;
```

#### Параметры

- `venue`: Доменная модель Venue
- `locale`: Текущая локаль
- `options`: Опциональные настройки
  - `basePath?: string` - Базовый путь для href (по умолчанию: '/venues')
  - `t?: (key: string, locale: string) => string` - i18n функция

#### Маппинг полей

| Domain Field                  | UI Prop            | Преобразование                                     |
| ----------------------------- | ------------------ | -------------------------------------------------- |
| `venue.name[locale]`          | `name`             | Локализация с fallback                             |
| `venue.description[locale]`   | `description`      | Локализация с fallback                             |
| `venue.address, city, region` | `location`         | `formatLocation()`                                 |
| `venue.capacity`              | `capacity`         | `formatCapacity(venue.capacity, locale)`           |
| `venue.image`                 | `imageUrl`         | Прямое маппирование                                |
| `venue.slug`                  | `href`             | `\`${basePath}/${venue.slug}\``                    |
| `venue.events_count`          | `eventsCount`      | Прямое маппирование                                |
| `venue.featured`              | `featured`         | Прямое маппирование                                |
| -                             | `eventsLabel`      | `t('events', locale)` или 'Events'                 |
| -                             | `popularBadgeText` | `venue.popular ? t('popular', locale) : undefined` |
| -                             | `capacityLabel`    | `t('capacity', locale)` или 'Capacity'             |

#### Пример использования

```typescript
import { VenueCard } from '@tenerife.music/ui';
import { venueToCardProps } from '@/adapters/ui';

function VenueList({ venues, locale }) {
  return (
    <div>
      {venues.map(venue => (
        <VenueCard
          key={venue._id}
          {...venueToCardProps(venue, locale)}
        />
      ))}
    </div>
  );
}
```

---

### 4. articleToItemProps (`articleToItemProps.ts`)

Преобразует доменную модель `Article` в `ArticleItem`.

#### Сигнатура функции

```typescript
export function articleToItemProps(
  article: Article,
  locale: string,
  options?: ArticleToItemPropsOptions,
): ArticleItem;
```

#### Параметры

- `article`: Доменная модель Article
- `locale`: Текущая локаль
- `options`: Опциональные настройки
  - `basePath?: string` - Базовый путь для href (по умолчанию: '/news')

#### Маппинг полей

| Domain Field              | UI Prop       | Преобразование                               |
| ------------------------- | ------------- | -------------------------------------------- |
| `article.title[locale]`   | `title`       | Локализация с fallback                       |
| `article.excerpt[locale]` | `description` | Локализация с fallback                       |
| `article.published_at`    | `date`        | `formatDate(article.published_at, locale)`   |
| `article.image`           | `imageUrl`    | Прямое маппирование                          |
| `article.slug`            | `href`        | `\`${basePath}/${article.slug}\`` (required) |

**Важно:** `href` является обязательным для `ArticleItem`, поэтому адаптер всегда предоставляет значение (использует '#' как fallback, если slug отсутствует).

#### Пример использования

```typescript
import { ArticlesSection } from '@tenerife.music/ui';
import { articleToItemProps } from '@/adapters/ui';

function NewsPage({ articles, locale }) {
  const articleItems = articles.map(article =>
    articleToItemProps(article, locale, { basePath: '/blog' })
  );

  return (
    <ArticlesSection
      articles={articleItems}
      readMoreLabel="Read more"
    />
  );
}
```

---

### 5. tagToChipProps (`tagToChipProps.ts`)

Преобразует доменную модель `Tag` в props для Badge/Chip компонента.

#### Сигнатура функции

```typescript
export function tagToChipProps(tag: Tag, locale: string): TagToChipPropsResult;
```

#### Возвращаемый тип

```typescript
interface TagToChipPropsResult {
  label: string; // Локализованное имя тега
  value: string; // Slug тега
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive";
}
```

#### Маппинг полей

| Domain Field       | Result Field | Преобразование                                           |
| ------------------ | ------------ | -------------------------------------------------------- |
| `tag.name[locale]` | `label`      | Локализация с fallback                                   |
| `tag.slug`         | `value`      | Прямое маппирование                                      |
| `tag.color`        | `variant`    | Прямое маппирование (если соответствует вариантам Badge) |

#### Пример использования

```typescript
import { Badge } from '@tenerife.music/ui';
import { tagToChipProps } from '@/adapters/ui';

function TagList({ tags, locale }) {
  return (
    <div>
      {tags.map(tag => {
        const badgeProps = tagToChipProps(tag, locale);
        return (
          <Badge key={tag._id} variant={badgeProps.variant}>
            {badgeProps.label}
          </Badge>
        );
      })}
    </div>
  );
}
```

---

### 6. Barrel Export (`index.ts`)

Экспортирует все адаптеры и форматтеры из одного места.

```typescript
/**
 * UI Adapters Module
 *
 * This module provides adapter functions that convert domain models
 * to UI component props. This isolates domain logic from UI components.
 */

// Adapters
export { eventToCardProps, type EventToCardPropsOptions } from "./eventToCardProps";
export { venueToCardProps, type VenueToCardPropsOptions } from "./venueToCardProps";
export { articleToItemProps, type ArticleToItemPropsOptions } from "./articleToItemProps";
export { tagToChipProps, type TagToChipPropsResult } from "./tagToChipProps";

// Formatters
export {
  formatDate,
  formatPrice,
  formatPriceRange,
  formatLocation,
  formatCapacity,
} from "./formatters";
```

**Использование:**

```typescript
import { eventToCardProps, formatDate } from "@/adapters/ui";
```

---

## Примеры кода

### Полный пример: EventCard

```typescript
// apps/web/src/pages/events/index.tsx
import React from 'react';
import { EventCard } from '@tenerife.music/ui';
import { eventToCardProps } from '@/adapters/ui';
import { useLocale } from '@/hooks/useLocale';
import { useTranslation } from 'react-intl';
import type { Event } from '@/types/event';

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  const locale = useLocale(); // 'en', 'es', 'ru'
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map(event => {
        const cardProps = eventToCardProps(event, locale, {
          basePath: '/events',
          currency: 'EUR',
          t: (key: string) => t(key),
        });

        return (
          <EventCard
            key={event._id}
            {...cardProps}
          />
        );
      })}
    </div>
  );
}
```

### Полный пример: VenueCard

```typescript
// apps/web/src/pages/venues/index.tsx
import React from 'react';
import { VenueCard } from '@tenerife.music/ui';
import { venueToCardProps } from '@/adapters/ui';
import { useLocale } from '@/hooks/useLocale';
import type { Venue } from '@/types/venue';

interface VenueListProps {
  venues: Venue[];
}

export function VenueList({ venues }: VenueListProps) {
  const locale = useLocale();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {venues.map(venue => (
        <VenueCard
          key={venue._id}
          {...venueToCardProps(venue, locale)}
        />
      ))}
    </div>
  );
}
```

### Полный пример: ArticlesSection

```typescript
// apps/web/src/pages/news/index.tsx
import React from 'react';
import { ArticlesSection } from '@tenerife.music/ui';
import { articleToItemProps } from '@/adapters/ui';
import { useLocale } from '@/hooks/useLocale';
import type { Article } from '@/types/article';

interface NewsPageProps {
  articles: Article[];
}

export function NewsPage({ articles }: NewsPageProps) {
  const locale = useLocale();

  const articleItems = articles.map(article =>
    articleToItemProps(article, locale, { basePath: '/news' })
  );

  return (
    <div className="container mx-auto py-8">
      <h1>News</h1>
      <ArticlesSection
        articles={articleItems}
        readMoreLabel="Read more"
      />
    </div>
  );
}
```

### Next.js пример (Server Component)

```typescript
// apps/web/src/app/events/page.tsx
import { EventCard } from '@tenerife.music/ui';
import { eventToCardProps } from '@/adapters/ui';
import { getLocale } from '@/lib/i18n';
import { getEvents } from '@/lib/api/events';

export default async function EventsPage() {
  const locale = getLocale(); // Server-side locale
  const events = await getEvents();

  return (
    <div className="container mx-auto py-8">
      <h1>Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <EventCard
            key={event._id}
            {...eventToCardProps(event, locale)}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## Инструкции по использованию

### Шаг 1: Установка зависимостей

Убедитесь, что UI библиотека установлена:

```bash
npm install @tenerife.music/ui
# или
pnpm add @tenerife.music/ui
```

### Шаг 2: Создание структуры директорий

```bash
mkdir -p apps/web/src/adapters/ui/__tests__
```

### Шаг 3: Создание файлов адаптеров

Создайте файлы согласно структуре выше. Полные примеры кода доступны в `docs/adapter-layer-implementation-guide.json`.

### Шаг 4: Настройка TypeScript paths

В `tsconfig.json` добавьте:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/adapters/*": ["./src/adapters/*"]
    }
  }
}
```

### Шаг 5: Использование в компонентах

```typescript
// Импортируйте адаптер
import { eventToCardProps } from '@/adapters/ui';

// Используйте в компоненте
const cardProps = eventToCardProps(event, locale);
<EventCard {...cardProps} />
```

---

## Подзадачи и чеклисты

### D6.1: Создание структуры директорий

**Шаги:**

1. ✅ Создать `apps/web/src/adapters/` директорию
2. ✅ Создать `apps/web/src/adapters/ui/` поддиректорию
3. ✅ Создать `apps/web/src/adapters/ui/index.ts` barrel export
4. ✅ Добавить adapters директорию в tsconfig paths

**Критерии приемки:**

- [ ] Структура директорий существует
- [ ] Barrel export файл создан
- [ ] TypeScript распознает путь

---

### D6.2: Создание модуля форматтеров

**Шаги:**

1. ✅ Создать `apps/web/src/adapters/ui/formatters.ts`
2. ✅ Реализовать `formatDate()`
3. ✅ Реализовать `formatPrice()`
4. ✅ Реализовать `formatPriceRange()`
5. ✅ Реализовать `formatLocation()`
6. ✅ Реализовать `formatCapacity()`
7. ✅ Добавить JSDoc документацию
8. ✅ Экспортировать все форматтеры

**Критерии приемки:**

- [ ] Все форматтеры реализованы
- [ ] Локализация работает корректно
- [ ] JSDoc документация полная

---

### D6.3: Реализация eventToCardProps

**Шаги:**

1. ✅ Создать `apps/web/src/adapters/ui/eventToCardProps.ts`
2. ✅ Импортировать тип Event из доменных моделей
3. ✅ Импортировать EventCardProps из @tenerife.music/ui
4. ✅ Реализовать функцию `eventToCardProps()`
5. ✅ Реализовать локализацию с fallback
6. ✅ Форматировать дату
7. ✅ Форматировать цену
8. ✅ Построить href из slug
9. ✅ Маппинг всех полей
10. ✅ Добавить JSDoc документацию

**Критерии приемки:**

- [ ] Функция маппит все поля Event в EventCardProps
- [ ] Локализация работает корректно
- [ ] Дата и цена форматируются
- [ ] URL строится из slug
- [ ] TypeScript возвращаемый тип соответствует EventCardProps

---

### D6.4: Реализация venueToCardProps

**Шаги:**

1. ✅ Создать `apps/web/src/adapters/ui/venueToCardProps.ts`
2. ✅ Импортировать тип Venue из доменных моделей
3. ✅ Импортировать VenueCardProps из @tenerife.music/ui
4. ✅ Реализовать функцию `venueToCardProps()`
5. ✅ Реализовать локализацию
6. ✅ Форматировать локацию
7. ✅ Форматировать вместимость
8. ✅ Построить href из slug
9. ✅ Маппинг всех полей
10. ✅ Добавить JSDoc документацию

**Критерии приемки:**

- [ ] Функция маппит все поля Venue в VenueCardProps
- [ ] Локализация работает корректно
- [ ] Локация форматируется
- [ ] URL строится из slug
- [ ] TypeScript возвращаемый тип соответствует VenueCardProps

---

### D6.5: Реализация articleToItemProps

**Шаги:**

1. ✅ Создать `apps/web/src/adapters/ui/articleToItemProps.ts`
2. ✅ Импортировать тип Article из доменных моделей
3. ✅ Импортировать ArticleItem из @tenerife.music/ui
4. ✅ Реализовать функцию `articleToItemProps()`
5. ✅ Реализовать локализацию
6. ✅ Форматировать дату
7. ✅ Построить href из slug (обязательно!)
8. ✅ Маппинг всех полей
9. ✅ Добавить JSDoc документацию

**Критерии приемки:**

- [ ] Функция маппит все поля Article в ArticleItem
- [ ] Локализация работает корректно
- [ ] Дата форматируется
- [ ] URL строится из slug
- [ ] href всегда предоставляется (required для ArticleItem)
- [ ] TypeScript возвращаемый тип соответствует ArticleItem

---

### D6.6: Реализация tagToChipProps

**Шаги:**

1. ✅ Создать `apps/web/src/adapters/ui/tagToChipProps.ts`
2. ✅ Импортировать тип Tag из доменных моделей
3. ✅ Реализовать функцию `tagToChipProps()`
4. ✅ Маппинг label (локализованное имя)
5. ✅ Маппинг value (slug)
6. ✅ Маппинг variant (опционально, из color)
7. ✅ Добавить JSDoc документацию

**Критерии приемки:**

- [ ] Функция маппит поля Tag в chip/badge props
- [ ] Локализация работает корректно
- [ ] Соответствует другим адаптерам

---

### D6.7: Создание barrel export

**Шаги:**

1. ✅ Обновить `apps/web/src/adapters/ui/index.ts`
2. ✅ Экспортировать все адаптер функции
3. ✅ Экспортировать все типы опций
4. ✅ Экспортировать все форматтеры
5. ✅ Добавить модульную документацию

**Критерии приемки:**

- [ ] Все адаптеры экспортированы из index.ts
- [ ] Чистый импорт: `import { eventToCardProps } from '@/adapters/ui'`
- [ ] Документация полная

---

### D6.8: Написание type tests

**Шаги:**

1. ✅ Создать `apps/web/src/adapters/ui/__tests__/adapters.test.ts`
2. ✅ Тест: eventToCardProps возвращает EventCardProps тип
3. ✅ Тест: venueToCardProps возвращает VenueCardProps тип
4. ✅ Тест: articleToItemProps возвращает ArticleItem тип
5. ✅ Тест: доменные типы НЕ могут быть переданы напрямую в UI компоненты
6. ✅ Добавить type-level assertions с TypeScript
7. ✅ Запустить тесты для проверки типобезопасности

**Критерии приемки:**

- [ ] Type tests проходят
- [ ] Доменные типы не могут просочиться в UI компоненты
- [ ] Типы вывода адаптеров точно соответствуют типам props UI компонентов

**Пример type test:**

```typescript
// Type test: Domain type should not be assignable to UI prop
// @ts-expect-error - Event should not be directly assignable to EventCardProps
const badProps: EventCardProps = event;

// This should work
const goodProps: EventCardProps = eventToCardProps(event, "en");
```

---

## Валидация и тестирование

### TypeScript проверка

```bash
npm run typecheck
```

**Ожидаемый результат:** Нет ошибок типов

### Unit тесты

```bash
npm test adapters.test.ts
```

**Тестовые случаи:**

- [ ] eventToCardProps маппит Event в EventCardProps корректно
- [ ] venueToCardProps маппит Venue в VenueCardProps корректно
- [ ] articleToItemProps маппит Article в ArticleItem корректно
- [ ] Обработка отсутствующих опциональных полей
- [ ] Локализация fallback работает корректно
- [ ] Форматирование дат и цен работает корректно

### Type tests

```typescript
// Проверка, что доменные типы не могут быть переданы напрямую
// @ts-expect-error
const bad: EventCardProps = event;

// Проверка, что адаптер возвращает правильный тип
const good: EventCardProps = eventToCardProps(event, "en");
```

---

## Связи с другими задачами

### Зависимости

**D6 зависит от:**

- ✅ D5 - Props Redesign (завершено)
- ✅ D4 - I18n Removal (завершено)
- ✅ D3 - Route Decoupling (завершено)
- ✅ D2 - Domain Decoupling (завершено)

### Следующие задачи

**D6 является предпосылкой для:**

- ⏳ D7 - Frontend Integration (интеграция адаптеров во фронтенд)

### Связанные файлы в UI библиотеке

**Типы компонентов:**

- `src/components/cards/EventCard.tsx` - EventCardProps
- `src/components/cards/VenueCard.tsx` - VenueCardProps
- `src/components/sections/ArticlesSection.tsx` - ArticleItem
- `src/components/sections/TrendingSection.tsx` - TrendingItem

**Документация:**

- `docs/props-guidelines.md` - Стандарты именования props
- `docs/domain-decoupling-report.md` - Отчет по decoupling
- `docs/route-decoupling.md` - Отчет по route decoupling
- `docs/i18n-removal.md` - Отчет по i18n removal

---

## Чеклист завершения

### Перед завершением задания

- [ ] Все файлы адаптеров созданы
- [ ] Все форматтеры реализованы
- [ ] Все адаптеры реализованы
- [ ] Type tests проходят
- [ ] Unit tests проходят
- [ ] TypeScript компиляция проходит без ошибок
- [ ] Все адаптеры экспортированы из index.ts
- [ ] JSDoc документация полная
- [ ] README.md создан с примерами использования

### Валидация

- [ ] `npm run typecheck` проходит успешно
- [ ] `npm test` проходит успешно
- [ ] Нет ошибок линтера
- [ ] Все импорты корректны
- [ ] Доменные типы не просачиваются в UI компоненты

---

## Важные замечания

### Импорты доменных моделей

**Важно:** Замените примерные пути импорта (`@/types/event`) на реальные пути из вашего проекта.

**Пример:**

```typescript
// Замените это:
import type { Event } from "@/types/event";

// На реальный путь:
import type { Event } from "@/models/Event";
// или
import type { Event } from "@/domain/events/types";
```

### Интеграция с i18n

Функция `t` в options опциональна. Если не предоставлена, адаптеры используют дефолтные английские лейблы.

**С i18n:**

```typescript
eventToCardProps(event, locale, {
  t: (key) => t(key), // react-intl, next-intl, i18next
});
```

**Без i18n:**

```typescript
eventToCardProps(event, locale); // Использует дефолтные лейблы
```

### Кастомизация basePath

Все адаптеры принимают `basePath` опцию для кастомизации структуры URL.

**По умолчанию:**

- EventCard: `/events`
- VenueCard: `/venues`
- ArticleItem: `/news`

**Кастомизация:**

```typescript
eventToCardProps(event, locale, { basePath: "/concerts" });
// → href: '/concerts/summer-concert'
```

### Locale fallback

Все адаптеры реализуют fallback цепочку:

```
locale → en → es → ru → ''
```

Если запрошенная локаль отсутствует, используется английская, затем испанская, затем русская, затем пустая строка.

### Обязательные поля

**ArticleItem.href** является обязательным, поэтому `articleToItemProps` всегда предоставляет значение (использует '#' как fallback, если slug отсутствует).

---

## Резюме

### Что создается

1. **Адаптерный слой** в `apps/web/src/adapters/ui/`
2. **5 адаптерных функций:**
   - `eventToCardProps` - Event → EventCardProps
   - `venueToCardProps` - Venue → VenueCardProps
   - `articleToItemProps` - Article → ArticleItem
   - `tagToChipProps` - Tag → Badge props
3. **5 форматтеров:**
   - `formatDate` - Форматирование дат
   - `formatPrice` - Форматирование цен
   - `formatPriceRange` - Форматирование диапазонов цен
   - `formatLocation` - Форматирование адресов
   - `formatCapacity` - Форматирование вместимости
4. **Type tests** для проверки типобезопасности
5. **Документация** с примерами использования

### Преимущества

- ✅ **Изоляция**: UI библиотека не знает о доменных моделях
- ✅ **Централизация**: Вся логика преобразования в одном месте
- ✅ **Переиспользование**: Адаптеры можно использовать везде
- ✅ **Тестируемость**: Адаптеры легко тестировать отдельно
- ✅ **Типобезопасность**: TypeScript проверяет соответствие типов

### Следующие шаги

После завершения D6:

1. ⏳ D7 - Frontend Integration (интеграция адаптеров во фронтенд)
2. Обновление всех компонентов для использования адаптеров
3. Удаление прямых передач доменных моделей в UI компоненты

---

**Дата создания отчета:** 2025-11-25  
**Статус задания:** 📋 Готово к выполнению  
**Приоритет:** P0 (Critical)

---

## Дополнительные ресурсы

- **Полное руководство по реализации:** См. `docs/adapter-layer-implementation-guide.json` (если создан)
- **Типы UI компонентов:** `src/components/cards/EventCard.tsx`, `VenueCard.tsx`, и т.д.
- **Props Guidelines:** `docs/props-guidelines.md`
- **Domain Decoupling Report:** `docs/domain-decoupling-report.md`
