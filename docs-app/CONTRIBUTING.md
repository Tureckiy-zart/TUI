# Contributing to Documentation

Thank you for contributing to Tenerife UI documentation!

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   cd docs-app
   npm install
   ```
3. Start development server:
   ```bash
   npm run docs:dev
   ```

## Adding New Pages

1. Create a new file in `app/` directory:
   - For MDX: `app/section/page.mdx`
   - For React: `app/section/page.tsx`

2. Add navigation link in `components/layout/Sidebar.tsx`

3. Update search index if needed

## Documenting Components

1. Component documentation is auto-generated from source files
2. Run `npm run docs:generate-api` to regenerate
3. Manual documentation can be added in `app/components/[component]/page.mdx`

## Writing Guidelines

- Use clear, concise language
- Include code examples with LiveExample component
- Add TypeScript types for all props
- Include accessibility notes
- Test examples in both light and dark modes

## Code Examples

Use the LiveExample component for interactive examples:

```mdx
<LiveExample>
{`import { Button } from '@tenerife.music/ui';

export default function Example() {
  return <Button>Click me</Button>;
}`}
</LiveExample

>
```

## Token Documentation

When documenting tokens:

- Show visual previews
- Include CSS variable names
- Provide usage examples
- Document default values

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Test locally
4. Run `npm run docs:validate`
5. Submit a pull request

## Questions?

Open an issue or contact the maintainers.
