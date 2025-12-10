# Tenerife UI Documentation

Complete documentation system for Tenerife UI component library built with Next.js 15, MDX, and Sandpack.

## Features

- 📚 Complete component documentation with auto-generated API tables
- 🎨 Interactive token explorer (colors, typography, spacing, shadows, radius, motion)
- 💻 Live code playgrounds with Sandpack
- 🔍 Full-text search across documentation
- 🌓 Dark/light mode support
- 📱 Responsive design
- ♿ Accessibility guide

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build for production
npm run docs:build

# Start production server
npm run docs:start
```

## Generate API Documentation

```bash
# Generate API docs for all components
npm run docs:generate-api

# Validate documentation
npm run docs:validate
```

## Structure

```
docs-app/
├── app/                    # Next.js app directory
│   ├── tokens/            # Token explorer pages
│   ├── components/         # Component documentation
│   ├── theming/           # Theming guide
│   ├── architecture/      # Architecture guide
│   └── ...
├── components/            # React components
│   ├── docs/              # Documentation components
│   └── layout/            # Layout components
├── lib/                   # Utilities
│   ├── autodocs/         # API documentation generator
│   └── search/           # Search functionality
└── scripts/               # Build scripts
```

## Deployment

The documentation is configured for deployment on Vercel. See `vercel.json` for configuration.

## License

MIT
