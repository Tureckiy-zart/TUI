# Tenerife UI Component Audit Report

## Components with Default Argument Values

### 1. ProfileCard (`src/components/auth/ProfileCard.tsx`)

**Issues:**

- **Default values**: `name = "John Doe"`, `email = "john@example.com"` (lines 14-15)
- **Raw HTML elements**: Uses `<h3>`, `<p>`, `<div>` instead of library primitives (lines 20-28)

**Recommendations:**

- Remove default values or make them empty strings (`""`)
- Replace `<h3>` with `<Heading level={3}>` from `@/components/primitives/Typography`
- Replace `<p>` with `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`
- Replace outer `<div>` with `<Card>`, `<CardContent>` from `@/components/primitives/Card`

---

### 2. FormInput (`src/components/forms/FormInput.tsx`)

**Issues:**

- **Default values**: `type = "text"` (line 24), `value = ""` (line 26)
- **Raw HTML elements**: Uses `<label>`, `<p>` instead of library primitives (lines 35, 46, 49)

**Recommendations:**

- Keep `type = "text"` default (reasonable default)
- Consider making `value` optional without default (let parent manage state)
- Replace `<label>` with `<Label>` from `@/components/primitives/Label`
- Replace `<p>` with `<Text>` from `@/components/primitives/Typography`

---

### 3. FormSelect (`src/components/forms/FormSelect.tsx`)

**Issues:**

- **Default values**: `options = []` (line 23), `value = ""` (line 24)
- **Raw HTML elements**: Uses `<label>`, `<p>`, raw `<select>`, `<option>` elements (lines 32, 34-48, 51)

**Recommendations:**

- Keep `options = []` default (reasonable default)
- Consider making `value` optional without default
- Replace `<label>` with `<Label>` from `@/components/primitives/Label`
- Replace `<p>` with `<Text>` from `@/components/primitives/Typography`
- Consider creating a `Select` primitive component if one doesn't exist

---

### 4. FormTextarea (`src/components/forms/FormTextarea.tsx`)

**Issues:**

- **Default values**: `value = ""` (line 23), `rows = 4` (line 26)
- **Raw HTML elements**: Uses `<label>`, `<p>`, raw `<textarea>` element (lines 32, 34-42, 44)

**Recommendations:**

- Keep `rows = 4` default (reasonable default)
- Consider making `value` optional without default
- Replace `<label>` with `<Label>` from `@/components/primitives/Label`
- Replace `<p>` with `<Text>` from `@/components/primitives/Typography`

---

### 5. TrendingSection (`src/components/sections/TrendingSection.tsx`)

**Issues:**

- **Default values**: `events = []` (line 14), `limit = 5` (line 15), `loading = false` (line 16)
- **Raw HTML elements**: Uses `<h2>`, `<p>` instead of library primitives (lines 24, 26, 28-29)

**Recommendations:**

- Keep `events = []` and `loading = false` (reasonable defaults)
- Consider if `limit = 5` should remain or be required
- Replace `<h2>` with `<Heading level={2}>` from `@/components/primitives/Typography`
- Replace `<p>` with `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`
- Replace outer `<div>` with `<Card>`, `<CardContent>` from `@/components/primitives/Card`

---

### 6. ArticlesSection (`src/components/sections/ArticlesSection.tsx`)

**Issues:**

- **Default values**: `readMoreLabel = "Read more"` (line 23)
- **Raw HTML elements**: Uses `<h2>`, `<p>`, `<article>` instead of library primitives (lines 34, 45, 48, 29)

**Recommendations:**

- Consider removing default or making it empty string
- Replace `<h2>` with `<Heading level={2}>` from `@/components/primitives/Typography`
- Replace `<p>` with `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`
- Consider wrapping `<article>` content with `<Card>`, `<CardContent>` from `@/components/primitives/Card`

---

### 7. SearchBar (`src/components/search/SearchBar.tsx`)

**Issues:**

- **Default values**: `placeholder = "Search artists, venues..."` (line 16), `suggestions = []` (line 19)
- **Raw HTML elements**: Uses `<button>` instead of library primitive (line 118)

**Recommendations:**

- Keep `suggestions = []` default (reasonable default)
- Consider making `placeholder` optional or removing default
- Replace `<button>` with `<Button>` from `@/components/primitives/Button`

---

### 8. EventCard (`src/components/cards/EventCard.tsx`)

**Issues:**

- **Default values**: `featured = false` (line 30), `showImage = true` (line 31)
- **Hardcoded fallback strings**: "Sample Event", "Sample event description", "2024-12-31", "Sample Venue", "€25" (lines 36-49)
- **Raw HTML elements**: Uses `<h3>`, `<p>`, `<span>` instead of library primitives (lines 86, 95, 101, 108, 126)

**Recommendations:**

- Keep `featured = false` and `showImage = true` (reasonable defaults)
- Remove hardcoded fallback strings - return null or empty state if required data missing
- Replace `<h3>` with `<Heading level={3}>` from `@/components/primitives/Typography`
- Replace `<p>` with `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`
- Replace `<span>` with `<Text>` from `@/components/primitives/Typography`

---

### 9. VenueCard (`src/components/cards/VenueCard.tsx`)

**Issues:**

- **Default values**: `featured = false` (line 36), `showImage = true` (line 37)
- **Hardcoded fallback strings**: "Sample Venue", "Sample venue description", "Tenerife, Spain", "500" (lines 41-48)
- **Raw HTML elements**: Uses `<h3>`, `<p>`, `<span>` instead of library primitives (lines 86, 95, 102, 108, 112, 120)

**Recommendations:**

- Keep `featured = false` and `showImage = true` (reasonable defaults)
- Remove hardcoded fallback strings - return null or empty state if required data missing
- Replace `<h3>` with `<Heading level={3}>` from `@/components/primitives/Typography`
- Replace `<p>` with `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`
- Replace `<span>` with `<Text>` from `@/components/primitives/Typography`

---

### 10. ThemeSwitch (`src/components/primitives/ThemeSwitch.tsx`)

**Issues:**

- **Default values**: `size = "md"` (line 115), `variant = "default"` (line 116)
- **Raw HTML elements**: Uses `<button>` instead of library primitive (line 148)

**Recommendations:**

- Keep defaults (reasonable defaults for size/variant)
- Replace `<button>` with `<Button>` from `@/components/primitives/Button`

---

### 11. Dashboard (`src/components/admin/Dashboard.tsx`)

**Issues:**

- **Raw HTML elements**: Uses `<h2>`, `<p>` instead of library primitives (lines 16-17)

**Recommendations:**

- Replace `<h2>` with `<Heading level={2}>` from `@/components/primitives/Typography`
- Replace `<p>` with `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`
- Replace outer `<div>` with `<Card>`, `<CardContent>` from `@/components/primitives/Card`

---

### 12. UserManagement (`src/components/admin/UserManagement.tsx`)

**Issues:**

- **Raw HTML elements**: Uses `<h2>`, `<p>` instead of library primitives (lines 16-17)

**Recommendations:**

- Replace `<h2>` with `<Heading level={2}>` from `@/components/primitives/Typography`
- Replace `<p>` with `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`
- Replace outer `<div>` with `<Card>`, `<CardContent>` from `@/components/primitives/Card`

---

### 13. ModeHero (`src/components/layout/ModeHero.tsx`)

**Issues:**

- **Default values**: `dayLabel = "Day Mode"` (line 16), `nightLabel = "Night Mode"` (line 17), `dayDescription = "Bright theme for daytime browsing"` (line 18), `nightDescription = "Dark theme for nighttime browsing"` (line 19)
- **Raw HTML elements**: Uses `<h1>`, `<p>`, `<h3>` instead of library primitives (lines 28, 31, 37, 38, 43, 44)

**Recommendations:**

- Consider removing defaults or making them empty strings
- Replace `<h1>` with `<Heading level={1}>` from `@/components/primitives/Typography`
- Replace `<h3>` with `<Heading level={3}>` from `@/components/primitives/Typography`
- Replace `<p>` with `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`

---

### 14. ConsentBanner (`src/components/feedback/ConsentBanner.tsx`)

**Issues:**

- **Raw HTML elements**: Uses `<p>` instead of library primitive (line 17)

**Recommendations:**

- Replace `<p>` with `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`

---

### 15. List (`src/components/data/List.tsx`)

**Issues:**

- **Raw HTML elements**: Uses `<h3>`, `<p>` instead of library primitives (lines 26, 28)

**Recommendations:**

- Replace `<h3>` with `<Heading level={3}>` from `@/components/primitives/Typography`
- Replace `<p>` with `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`

---

### 16. Timeline (`src/components/data/Timeline.tsx`)

**Issues:**

- **Raw HTML elements**: Uses `<h3>`, `<p>` instead of library primitives (lines 31, 32, 34)

**Recommendations:**

- Replace `<h3>` with `<Heading level={3}>` from `@/components/primitives/Typography`
- Replace `<p>` with `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`

---

### 17. Table (`src/components/data/Table.tsx`)

**Issues:**

- **Raw HTML elements**: Uses `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` (lines 25-51)

**Recommendations:**

- Note: Table elements might be acceptable as-is since table primitives may not exist
- Consider using `<Text>` or `<Heading>` for header text in `<th>` elements

---

### 18. Alert (`src/components/feedback/Alert.tsx`)

**Issues:**

- **Default values**: `variant = 'info'` (line 12)
- **Raw HTML elements**: Uses `<h4>`, `<p>` instead of library primitives (lines 31, 34)

**Recommendations:**

- Keep `variant = 'info'` default (reasonable default)
- Replace `<h4>` with `<Heading level={4}>` from `@/components/primitives/Typography`
- Replace `<p>` with `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`

---

### 19. Typography (`src/components/primitives/Typography.tsx`)

**Issues:**

- **Default values**: `level = 1` (line 24), `size = 'base'` (line 47), `weight = 'normal'` (line 48), `color = 'default'` (line 49)
- **Status**: These are acceptable defaults for a primitive component

---

## Summary of Issues

### Default Argument Values Categories:

1. **Problematic defaults (should be removed):**
   - ProfileCard: `name = "John Doe"`, `email = "john@example.com"`
   - EventCard: Hardcoded fallback strings ("Sample Event", etc.)
   - VenueCard: Hardcoded fallback strings ("Sample Venue", etc.)
   - ModeHero: All default labels/descriptions

2. **Acceptable defaults (can keep):**
   - FormInput: `type = "text"`
   - FormSelect: `options = []`
   - EventCard/VenueCard: `featured = false`, `showImage = true`
   - ThemeSwitch: `size = "md"`, `variant = "default"`
   - TrendingSection: `events = []`, `loading = false`
   - SearchBar: `suggestions = []`

3. **Questionable defaults (review needed):**
   - FormInput: `value = ""`
   - FormSelect: `value = ""`
   - TrendingSection: `limit = 5`
   - SearchBar: `placeholder = "Search artists, venues..."`
   - ArticlesSection: `readMoreLabel = "Read more"`

### Raw HTML Elements That Should Use Primitives:

1. **Headings**: `<h1>`, `<h2>`, `<h3>` → Use `<Heading>` from `@/components/primitives/Typography`
   - ProfileCard, TrendingSection, ArticlesSection, Dashboard, UserManagement, ModeHero, List, Timeline, EventCard, VenueCard

2. **Paragraphs**: `<p>` → Use `<Text>` or `<Paragraph>` from `@/components/primitives/Typography`
   - ProfileCard, TrendingSection, ArticlesSection, Dashboard, UserManagement, ModeHero, ConsentBanner, List, Timeline, FormInput, FormTextarea, Alert

3. **Labels**: `<label>` → Use `<Label>` from `@/components/primitives/Label`
   - FormInput, FormSelect, FormTextarea

4. **Buttons**: `<button>` → Use `<Button>` from `@/components/primitives/Button`
   - SearchBar, ThemeSwitch

5. **Spans**: `<span>` → Use `<Text>` from `@/components/primitives/Typography`
   - EventCard, VenueCard, Table

6. **Cards/Containers**: `<div>` with card styling → Use `<Card>`, `<CardContent>` from `@/components/primitives/Card`
   - ProfileCard, TrendingSection, Dashboard, UserManagement

---

## Library Primitives Available

Based on the codebase review, the following primitives are available:

### Typography (`@/components/primitives/Typography`):

- `<Heading>` - with `level` prop (1-6)
- `<Text>` - with `size`, `weight`, `color` props
- `<Paragraph>` - wrapper around Text
- `<Code>`
- `<Blockquote>`

### Layout (`@/components/primitives/Card`):

- `<Card>`
- `<CardHeader>`
- `<CardTitle>`
- `<CardDescription>`
- `<CardContent>`
- `<CardFooter>`

### Form (`@/components/primitives`):

- `<Input>` - from `@/components/primitives/Input`
- `<Label>` - from `@/components/primitives/Label`
- `<Button>` - from `@/components/primitives/Button`

### Other:

- `<Link>` - from `@/components/primitives/Link`
- Layout components: `<Flex>`, `<Grid>`, `<Stack>`, `<Container>`, `<Section>`

---

## Priority Recommendations

### High Priority:

1. **ProfileCard** - Remove defaults, use Typography and Card primitives
2. **EventCard/VenueCard** - Remove hardcoded fallback strings, use Typography primitives
3. **FormInput/FormSelect/FormTextarea** - Use Label and Text primitives
4. **Alert** - Use Typography primitives

### Medium Priority:

5. **TrendingSection, Dashboard, UserManagement** - Use Card and Typography primitives
6. **ArticlesSection, List, Timeline** - Use Typography primitives
7. **ModeHero** - Remove defaults, use Typography primitives

### Low Priority:

8. **SearchBar, ThemeSwitch** - Use Button primitive
9. **ConsentBanner** - Use Text primitive
