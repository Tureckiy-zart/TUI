🌴 Tenerife UI — Premium React Component Library
Elegant. Token-driven. Fully Typed. Built for Luxury Interfaces.

![Release](https://img.shields.io/github/v/release/Tureckiy-zart/tenerife-ui?style=for-the-badge)

<p align="center"> <img src="https://raw.githubusercontent.com/Tureckiy-zart/tenerife-ui/main/.github/banner.png" width="100%" /> </p> <p align="center"> <strong> A high-end, fully tokenized design system crafted for modern React apps.<br/> Built with Tailwind, CVA, TypeScript and a luxury-first aesthetic. </strong> </p> <p align="center"> <img src="https://img.shields.io/badge/React-18+-blue?style=for-the-badge"/> <img src="https://img.shields.io/badge/TailwindCSS-3.4-38b2ac?style=for-the-badge"/> <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge"/> <img src="https://img.shields.io/badge/Design%20Tokens-Complete-purple?style=for-the-badge"/> <img src="https://img.shields.io/badge/CVA-Variants-success?style=for-the-badge"/> </p>
🚀 Quick Start
npm install @tenerife.music/ui
# or
pnpm add @tenerife.music/ui

Use a component:

import { Button } from "@tenerife.music/ui";

export function Demo() {
return <Button variant="primary">Book Now</Button>;
}

🎨 Tenerife UI Design Philosophy

Tenerife UI создана для:

luxury проектов

продвинутых приложений

маркетплейсов

платформ с глубокой эстетикой

темных и светлых тем

брендированных интерфейсов

Это библиотека не «ещё одна коллекция кнопок».
Это — архитектурно правильная, премиальная, коммерческая дизайн-система.

🧩 Component Overview
UI Primitives

Button

Input / Textarea / Select

Label

Card

Badge

Overlays

Modal

Tooltip

Popover

Toast

Search & Filters

SearchBar

FilterBar

FilterSelect

Layout

Grid

Section

Navbar

Hero / ModeHero

Data

Table

List

Complex

VenueCard

EventCard

CTA Blocks

📦 Core System Overview (DO NOT REMOVE)

Ключевой системный блок.
Не удалять, не переносить, не изменять структуру.

🏗 Installation
npm install @tenerife.music/ui

import { ThemeProvider } from "@tenerife.music/ui";

export default function App() {
return (
<ThemeProvider>
<YourApp />
</ThemeProvider>
);
}

🎨 Design Tokens System
Цвета

100+ токенов

Полные оттеночные шкалы

surface tokens

semantic + text tokens

day/night mode

Типографика

fluid clamp scale

13 стилей

9 весов

6 line-heights

6 tracking options

Spacing

scale 0–96

semantic tokens

layout tokens

Shadows

elevation 1–5

colored shadows

glow

focus rings

Radius

none → 3xl

full-radius

Motion

easing

durations

transitions

⚙️ How Tenerife UI Works
★ Token-first architecture

Никаких raw стилей.
Всё — через токены.

★ Tailwind + CSS Variables

Цвета, spacing, shadows, radius — генерируются автоматически.

★ CVA для вариативности

Компоненты имеют единый Variant API.

★ Strict TypeScript

Идеальный DX и подсказки.

★ Theme Engine

Instant day/night mode.

🧱 Folder Structure
src/
components/
tokens/
theme/
layouts/
overlays/
search/
data/

📸 Component Preview

[![Storybook](https://img.shields.io/badge/Storybook-Open-success?style=for-the-badge)](https://Tureckiy-zart.github.io/tenerife-ui/)

(Добавить скриншоты/видео позже)

🔧 Development
pnpm install
pnpm dev
pnpm storybook

🛠 Contributing

Before contributing, please read:

TYPING_STANDARD.md

STRUCTURE_OF_WORK.md

COMPONENT_GUIDELINES.md

📜 License

MIT — Commercial-friendly.

🎤 Author’s Note

Tenerife UI — это мой личный подход к созданию коммерческой, красивой и премиальной UI-системы.
Если ты строишь интерфейсы с эстетикой “дорого, стильно и технологично” — ты дома
