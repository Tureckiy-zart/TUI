# Design Tokens Export

This document describes the design token export system for Tenerife UI, which generates design-tool consumable formats from TypeScript token files.

## Overview

The token export system converts TypeScript token definitions into two formats:

1. **JSON Format** (`tokens.json`) - Hierarchical JSON structure for general design tool consumption
2. **Figma Tokens Format** (`tokens.fig`) - Official Figma Tokens schema for direct import into Figma

Both formats are automatically generated from the source token files in `src/tokens/`, ensuring design tools stay in sync with the codebase.

## Export Formats

### JSON Format (`tokens.json`)

The JSON format provides a hierarchical structure organized by token category:

```json
{
  "colors": {
    "day": { ... },
    "night": { ... }
  },
  "spacing": { ... },
  "typography": { ... },
  "radius": { ... },
  "shadows": { ... },
  "motion": { ... }
}
```

**Token Categories:**

- **colors**: Primary, accent, secondary, semantic, surface, text, and base colors (converted to hex)
- **spacing**: Base scale, semantic tokens, and layout spacing (converted to px)
- **typography**: Font families, sizes, weights, line heights, letter spacing, and text styles
- **radius**: Border radius scale and component-specific radius values (converted to px)
- **shadows**: Elevation shadows, colored shadows, glow effects, and focus rings
- **motion**: Durations, easings, transitions, keyframes, and animations

### Figma Tokens Format (`tokens.fig`)

The Figma Tokens format follows the official [Figma Tokens schema](https://docs.tokens.studio/) and supports theme switching:

```json
{
  "$themes": [
    {
      "id": "day",
      "name": "Day",
      "selectedTokenSets": {
        "day": "enabled"
      }
    },
    {
      "id": "night",
      "name": "Night",
      "selectedTokenSets": {
        "night": "enabled"
      }
    }
  ],
  "day": { ... },
  "night": { ... }
}
```

Tokens are flattened with dot notation (e.g., `color.primary.500`) and include type information for Figma compatibility.

## Running the Export

### For Developers

To generate the token export files, run:

```bash
pnpm tokens:export
```

This command:

1. Validates that all token files compile without errors
2. Loads all token modules from `src/tokens/`
3. Converts tokens to design-tool formats:
   - HSL colors → hex format
   - rem/px values → consistent px format
   - CSS functions → extracted values
4. Generates `design-tokens/tokens.json` and `design-tokens/tokens.fig`
5. Overwrites existing files cleanly

**Note:** The export script automatically converts values to design-tool friendly formats. All conversions are derived from the source token files - no hardcoded values are used.

### When to Run

Run the export script:

- After modifying any token files in `src/tokens/`
- Before sharing tokens with the design team
- As part of the build/release process (optional)
- When setting up a new design tool integration

## Importing into Figma

### Using Figma Tokens Plugin

1. **Install the Figma Tokens plugin:**
   - Open Figma
   - Go to Plugins → Browse plugins
   - Search for "Figma Tokens" and install

2. **Import tokens:**
   - Open the Figma Tokens plugin
   - Click "Import" or "Sync"
   - Select `design-tokens/tokens.fig` file
   - Tokens will be imported with day/night theme support

3. **Use tokens in designs:**
   - Tokens appear in the Figma Tokens panel
   - Apply tokens to fills, strokes, text, and effects
   - Switch between day/night themes using the theme selector

### Manual Import

If you prefer to import tokens manually:

1. Open `design-tokens/tokens.fig` in a text editor
2. Copy the JSON content
3. In Figma Tokens plugin, use "Paste" to import
4. Tokens will be available immediately

## Token Updates and Synchronization

### How Updates Propagate

1. **Developer updates tokens** in `src/tokens/*.ts` files
2. **Run export script** (`pnpm tokens:export`)
3. **Generated files update** in `design-tokens/`
4. **Designer imports updated tokens** into Figma
5. **Designs automatically update** if using token references

### Best Practices

- **Version control**: Commit both source token files and exported files
- **Regular sync**: Run export after token changes and before design reviews
- **Communication**: Notify design team when tokens are updated
- **Documentation**: Document breaking token changes in changelog

## Token Conversion Details

### Color Conversion

- **HSL to Hex**: All HSL color values are converted to hex format
  - Input: `"210 40% 98%"` → Output: `"#f0f4f8"`
  - Supports opacity: `"210 40% 98% / 0.5"` → `"#f0f4f880"`
- **CSS Variables**: References like `hsl(var(--tm-primary))` are kept as references

### Spacing Conversion

- **rem to px**: All rem values converted to pixels (base: 16px)
  - Input: `"1rem"` → Output: `"16px"`
  - Input: `"0.5rem"` → Output: `"8px"`
- **px values**: Kept as-is with `px` suffix

### Typography Conversion

- **Font sizes**: Extracted from `clamp()` functions or converted from rem
- **Line heights**: Preserved as-is (unitless or with units)
- **Letter spacing**: Preserved as-is (em values)

### Radius Conversion

- **rem to px**: Border radius values converted to pixels
  - Input: `"0.25rem"` → Output: `"4px"`
- **Special values**: `"9999px"` (full radius) kept as-is

## Troubleshooting

### Export Fails with Validation Error

**Problem:** Script reports "Token validation failed"

**Solution:**

- Check for TypeScript errors in `src/tokens/` files
- Run `pnpm typecheck` to identify compilation issues
- Fix errors in token files before re-running export

### Colors Look Incorrect in Design Tools

**Problem:** Colors appear different than expected

**Solution:**

- Verify HSL values in source token files
- Check color conversion in generated JSON
- Ensure design tool color space settings match (sRGB)

### Figma Tokens Not Importing

**Problem:** Figma Tokens plugin can't import `tokens.fig`

**Solution:**

- Verify JSON syntax is valid (use JSON validator)
- Check that `$themes` array is present
- Ensure token structure follows Figma Tokens schema
- Try importing JSON format instead

### Tokens Out of Sync

**Problem:** Design tokens don't match codebase

**Solution:**

- Run `pnpm tokens:export` to regenerate files
- Verify source token files haven't changed
- Re-import tokens into design tools

## File Locations

- **Source tokens**: `src/tokens/*.ts`
- **Export script**: `scripts/export-tokens.ts`
- **Generated files**: `design-tokens/tokens.json`, `design-tokens/tokens.fig`
- **Documentation**: `docs/design_tokens_export.md`

## Additional Resources

- [Figma Tokens Documentation](https://docs.tokens.studio/)
- [Design Tokens Community Group](https://www.designtokens.org/)
- [Token Format Specification](https://tr.designtokens.org/format/)

## Support

For issues or questions:

1. Check this documentation
2. Review token source files in `src/tokens/`
3. Run export with verbose output for debugging
4. Open an issue in the project repository
