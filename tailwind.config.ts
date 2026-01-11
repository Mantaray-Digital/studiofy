import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          DEFAULT: 'var(--color-primary)',
        },
        // Secondary Colors
        secondary: {
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          DEFAULT: 'var(--color-secondary)',
        },
        // Neutral Colors
        neutral: {
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          1000: 'var(--color-neutral-1000)',
        },
        // Semantic Colors
        success: {
          100: 'var(--color-success-100)',
          200: 'var(--color-success-200)',
          DEFAULT: 'var(--color-success)',
        },
        warning: {
          100: 'var(--color-warning-100)',
          200: 'var(--color-warning-200)',
          DEFAULT: 'var(--color-warning)',
        },
        error: {
          100: 'var(--color-error-100)',
          200: 'var(--color-error-200)',
          DEFAULT: 'var(--color-error)',
        },
        // Semantic Aliases
        background: {
          DEFAULT: 'var(--color-background)',
          subtle: 'var(--color-background-subtle)',
        },
        text: {
          main: 'var(--color-text-main)',
          muted: 'var(--color-text-muted)',
          disabled: 'var(--color-text-disabled)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
        },
      },
      fontFamily: {
        sans: ['var(--font-family-base)'],
      },
      fontSize: {
        // Headings
        'h1': ['var(--font-size-h1)', { lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-bold)' }],
        'h2': ['var(--font-size-h2)', { lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-bold)' }],
        'h3': ['var(--font-size-h3)', { lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-bold)' }],
        'h4': ['var(--font-size-h4)', { lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-bold)' }],
        'h5': ['var(--font-size-h5)', { lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-bold)' }],
        'h6': ['var(--font-size-h6)', { lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-bold)' }],
        'h7': ['var(--font-size-h7)', { lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-bold)' }],
        // Body
        'b1': ['var(--font-size-b1)', { lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-normal)' }],
        'b2': ['var(--font-size-b2)', { lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-normal)' }],
        'b3': ['var(--font-size-b3)', { lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-normal)' }],
        'b4': ['var(--font-size-b4)', { lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-normal)' }],
        'b5': ['var(--font-size-b5)', { lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-normal)' }],
      },
      fontWeight: {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
      lineHeight: {
        tight: 'var(--line-height-tight)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
      },
    },
  },
  plugins: [],
};

export default config;
