# Event Card Canonical Layout Model

**Task:** TUI_EVENT_CARD_CANONICAL_MODEL_001  
**Last Updated:** 2026-02-02  
**Purpose:** Reference for the canonical Event Card structure and layout rules.

---

## Overview

The Event Card has a fixed structural model so that:

- All cards in a grid share the same baseline height
- CTA buttons align horizontally across cards
- Badges stay fixed regardless of text length
- Long descriptions do not break card geometry
- Layout remains stable across content variations

---

## Canonical Layers (top to bottom)

| Layer | Role | Implementation |
|-------|------|----------------|
| **Card Container** | Root; relative, flex column, min-height | **CardBase** root: `cardBaseVariants` (flex flex-col + min-height from `DOMAIN_TOKENS.spacing.card.minHeight` per size) |
| **Overlay Layer** | Badges; do not participate in content flow | Absolutely positioned; `eventCardBadgeVariants` |
| **Preview / Media** | Fixed height | `CardBaseImageWrapper` with aspect ratio (e.g. 16:9) |
| **Header Layer** | Title; clamped | Wrapper with line-clamp (e.g. 2 lines); `eventCardTitleWrapperVariants` |
| **Meta Layer** | Date, location | Fixed block; `eventCardMetadataVariants` |
| **Description Layer** | **Only flexible zone** | Single block with `flex-1 min-h-0` and line-clamp (e.g. 3 lines); `eventCardDescriptionWrapperVariants` |
| **Optional Divider** | Visual separator | Not required; can be added between content and CTA |
| **CTA Layer** | Fixed bottom | `CardBaseFooterWrapper`; stays at bottom because **CardBaseContentWrapper** has `flex-1 min-h-0` (in `cardBaseContentVariants`) |

**Note:** Flex column, min-height, and content flexible zone (`flex-1 min-h-0`) are defined in **CardBase** so that all cards using it get the same canonical layout. **All domain cards** (EventCard, VenueCard, ArtistCard, TicketCard, PromoCard, CategoryCard) use the same content structure: title clamp (`DOMAIN_TOKENS.layout.cardContent.titleClamp`), meta block(s), and description as the only flexible zone (`DOMAIN_TOKENS.layout.cardContent.descriptionWrapper`).

---

## Rules

1. **CTA** MUST always be visually aligned to the bottom edge of the card (achieved by making the content wrapper the only flexible zone).
2. **Badge elements** MUST NOT participate in content flow (absolute positioning).
3. **Card** MUST define min-height but MAY grow vertically (min-height from tokens; flex allows growth).
4. **Only one internal layer** MAY be flexible: the description layer. All other content layers are non-flex.
5. **Text** MUST NOT visually collide with card radius (padding and overflow controlled via wrappers and line-clamp).
6. **All cards in a grid** MUST align by bottom edge (same min-height + flex column + content `flex-1 min-h-0`).

---

## Tokens and CardBase

- **Min-height:** `DOMAIN_TOKENS.spacing.card.minHeight.default` | `.compact` — applied in **CardBase** root (`cardBaseVariants` size)
- **Flex column + content flexible zone:** **CardBase** root has `flex flex-col`; **CardBaseContentWrapper** has `flex-1 min-h-0` (`cardBaseContentVariants`)
- **Badge position:** `DOMAIN_TOKENS.badges.position.default` | `.compact` (EventCard)
- **Title clamp:** `eventCardTitleWrapperVariants` (line-clamp-2)
- **Description:** `eventCardDescriptionWrapperVariants` (flex-1 min-h-0 overflow-hidden line-clamp-3)

---

## Verification checklist

**Manual:**

- [ ] Short and long descriptions: cards keep same baseline height; CTA aligned at bottom
- [ ] Grid: all cards in a row align by bottom edge
- [ ] Badges: stay fixed (top-right); no overlap with title when title is long (line-clamp-2)
- [ ] Long description: does not break card geometry; line-clamp-3 applied

**Responsive:**

- [ ] Desktop breakpoint
- [ ] Tablet breakpoint
- [ ] Mobile breakpoint

**Storybook:** Use story "Canonical layout grid" (short + long description + long title) to verify CTA alignment and badge stability.

---

## Related

- **CardBase (canonical layout):** `src/PATTERNS/cards/CardBase/CardBase.tsx`, `CardBase.variants.ts` — flex flex-col, min-height, content flex-1 min-h-0
- EventCard: `src/PATTERNS/cards/EventCard/EventCard.tsx`, `EventCard.variants.ts`
- Domain tokens: `src/FOUNDATION/tokens/components/domain.ts`
- Audit reports: `docs/reports/audit/EVENTCARD_BASELINE_REPORT.md`, `docs/reports/audit/CARDBASE_BASELINE_REPORT.md` (both include LOCKED CHANGE EXCEPTION for this layout)
