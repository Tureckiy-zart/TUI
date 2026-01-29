# Typography Rhythm Audit 001

**Task:** TUI_FOUNDATION_TYPOGRAPHY_RHYTHM_AUDIT_001  
**Layer:** FOUNDATION  
**Status:** FACTUAL AUDIT (no changes)  
**Date:** 2026-01-21  

## Summary

- Total matches for `lineHeight` in `src/**`: 150
- Total matches for `line-height` in `src/**`: 19
- Total matches for `leading-` in `src/**`: 17
- Total matches for `leading-[` in `src/**`: 0

Initial risk classification (factual):
- P1: None observed (no inline style `lineHeight` in components)
- P2: Tailwind `leading-*` usages in PATTERNS/stories/tests (non-tokenized surface usage)
- OK: Token/theme definitions and mappings (expected for foundation/theme layer)

## Section A: Inline / CSS-in-JS line-height usages

Inline style usage scan (`style={{ lineHeight: ... }}`) returned **no matches**.

CSS-in-JS/object lineHeight literals were found in theme/token definition files (not inline component styles):
- `src/themes/minimal.ts`: lineHeight in fontSize tuples (multiple entries)
- `src/themes/neon.ts`: lineHeight in fontSize tuples (multiple entries)
- `src/FOUNDATION/tokens/typography.ts`: lineHeight in fontSize tuples
- `src/themes/types.ts`: `lineHeight` type definitions
- `src/preset.ts`: `lineHeight` config mapping

## Section B: Tailwind leading usages

`leading-*` class usages (17 total matches):
- `src/PATTERNS/filters/FilterBar.tsx:25`
- `src/PATTERNS/filters/FilterSelect.tsx:171`
- `src/PATTERNS/menus/hover-card/HoverCard.stories.tsx:30`
- `src/PATTERNS/menus/hover-card/HoverCard.stories.tsx:59`
- `src/COMPOSITION/overlays/Popover.stories.tsx:26`
- `src/COMPOSITION/overlays/Popover.stories.tsx:42`
- `src/FOUNDATION/tokens/components/text.ts:53-58` (token mapping to leading-*)
- `src/FOUNDATION/tokens/components/modal.ts:127` (token lineHeight mapping)
- `src/PRIMITIVES/Label/Label.test.tsx:126`
- `src/PRIMITIVES/Heading/Heading.tsx:174` (comment mention)
- `src/PRIMITIVES/Heading/__snapshots__/Heading.test.tsx.snap:5,13`

`leading-[...]` arbitrary values: **no matches**.

## Section C: Tokens / theme rhythm definitions

Token and theme line-height definitions and adapters:
- `src/FOUNDATION/tokens/typography.ts` (lineHeight token map; fontSize tuples with lineHeight)
- `src/FOUNDATION/tokens/components/text.ts` (leading-* mapping for lineHeight tokens)
- `src/FOUNDATION/tokens/components/modal.ts` (lineHeight token usage)
- `src/FOUNDATION/tokens/index.ts` (lineHeight export)
- `src/FOUNDATION/theme/typography.ts` (adapter export)
- `src/FOUNDATION/theme/index.ts` (re-export)
- `src/themes/types.ts` (lineHeight type optional)
- `src/themes/minimal.ts` (lineHeight in theme fontSize tuples)
- `src/themes/neon.ts` (lineHeight in theme fontSize tuples)
- `src/themes/brand_engine.ts` (line-height CSS var injection)
- `src/preset.ts` (tailwind lineHeight config)
- `src/index.ts` (lineHeight export)

## Section D: Component API leaks

Search for optional lineHeight/leading props:
- `src/themes/types.ts:56,73` contains `lineHeight?:` in theme type definitions.
- No component-level `lineHeight` or `leading` props found in `src/**` (based on `rg -n "lineHeight\?" src` and `rg -n "leading\?" src`).

## Evidence: Required Commands Executed

- `rg -n "lineHeight" src`
- `rg -n "line-height" src`
- `rg -n "leading-" src`
- `rg -n "leading-\[" src`
- `rg -n "lineHeight" src/FOUNDATION`
- `rg -n "leading" src/FOUNDATION`
- `rg -n "lineHeight\?" src`
- `rg -n "leading\?" src`

