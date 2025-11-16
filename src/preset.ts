import type { Config } from 'tailwindcss';
import { borderRadius } from './tokens/radius';

/**
 * Tailwind CSS preset for Tenerife.Music UI
 * 
 * This preset can be imported and used in your application's tailwind.config.ts:
 * 
 * @example
 * ```ts
 * import type { Config } from "tailwindcss";
 * import preset from "@tenerife.music/ui/preset";
 * 
 * const config: Config = {
 *   content: ["./src/**/*.{js,ts,jsx,tsx}"],
 *   presets: [preset],
 * };
 * 
 * export default config;
 * ```
 */
const preset: Config = {
  darkMode: ["class", '[data-mode="night"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        primary: {
          DEFAULT: 'hsl(var(--tm-primary))',
          foreground: 'hsl(var(--tm-primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--tm-secondary))',
          foreground: 'hsl(var(--tm-secondary-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--tm-accent))',
          foreground: 'hsl(var(--tm-accent-foreground))'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        ...borderRadius,
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: []
};

export default preset;

