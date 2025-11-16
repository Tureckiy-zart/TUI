import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.test.ts']
    })
  ],
  esbuild: {
    banner: {
      js: '"use client";',
    },
    sourcemap: false // Disable esbuild sourcemaps to avoid resolution warnings
  },
  build: {
    sourcemap: false, // Disable sourcemaps to avoid resolution warnings
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        preset: resolve(__dirname, 'src/preset.ts'),
        'tokens/index': resolve(__dirname, 'src/tokens/index.ts'),
        'theme/index': resolve(__dirname, 'src/theme/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'mjs' : 'cjs';
        if (entryName === 'index') {
          return `index.${ext}`;
        }
        return `${entryName}.${ext}`;
      }
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog',
        '@radix-ui/react-navigation-menu',
        '@radix-ui/react-toast',
        '@radix-ui/react-label',
        '@radix-ui/react-slot',
        '@radix-ui/react-tooltip',
        '@radix-ui/react-popover',
        '@radix-ui/react-select',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-radio-group',
        '@radix-ui/react-switch',
        '@radix-ui/react-tabs',
        '@radix-ui/react-accordion',
        '@radix-ui/react-collapsible',
        '@radix-ui/react-separator',
        '@radix-ui/react-progress',
        '@radix-ui/react-avatar',
        '@radix-ui/react-badge',
        '@radix-ui/react-calendar',
        'class-variance-authority',
        'clsx',
        'lucide-react',
        'tailwind-merge',
        'zustand',
        'framer-motion',
        'react-hook-form',
        '@hookform/resolvers',
        'zod',
        'tailwindcss'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'styles.css';
          }
          return assetInfo.name || 'assets/[name][extname]';
        }
      }
    },
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
