# UI Prop Contracts

This document defines required props for public UI components to enforce
a11y and test contracts at ESLint time (before runtime).

Rule: `tenerife-ui-architecture/ui-require-props-contract`

## Contracts

| Component | Required Props |
| --- | --- |
| `LanguageSelector` | `ariaLabel`, `dataTestId` |

## Notes

- Contracts apply only to consumer code (not UI library source).
- Props must be present and non-empty (`trim() !== ""`).
- Components must be imported from `@tenerife.music/ui` (public entry).
