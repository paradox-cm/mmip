import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import containerQueries from '@tailwindcss/container-queries'
import animate from 'tailwindcss-animate'

export default {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  darkMode: [
    'variant',
    ['&:where(.dark, .dark *)', '&:where([data-color-scheme="dark"], [data-color-scheme="dark"] *)'],
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
      // screens: {
      //   DEFAULT: '100%',
      //   sm: '640px',
      //   md: '768px',
      //   lg: '1024px',
      //   xl: '1280px',
      //   '2xl': '1440px',
      // },
    },
    extend: {
      screens: {
        site: '1440px',
      },
      borderColor: {
        DEFAULT: 'oklch(var(--border) / <alpha-value>)',
        strong: 'oklch(var(--border-strong) / <alpha-value>)',
        input: 'oklch(var(--border-input) / <alpha-value>)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        layer: 'var(--shadow-layer)',
      },
      colors: {
        white: 'oklch(var(--color-white) / <alpha-value>)',
        black: 'oklch(var(--color-black) / <alpha-value>)',

        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          hover: 'oklch(var(--destructive-hover) / <alpha-value>)',
          strong: 'oklch(var(--destructive-strong) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
        },
        'destructive-foreground': 'oklch(var(--destructive-foreground) / <alpha-value>)',

        // Foundation
        background: {
          DEFAULT: 'oklch(var(--background) / <alpha-value>)',
          subtle: 'oklch(var(--background-subtle) / <alpha-value>)',
          emphasis: 'oklch(var(--background-emphasis) / <alpha-value>)',
          // Already a complete color so it can carry its own alpha.
          overlay: 'var(--background-overlay)',
        },
        foreground: {
          DEFAULT: 'oklch(var(--foreground) / <alpha-value>)',
          heading: 'oklch(var(--foreground-heading) / <alpha-value>)',
          subtle: 'oklch(var(--foreground-subtle) / <alpha-value>)',
          accent: 'oklch(var(--foreground-accent) / <alpha-value>)',
          muted: 'oklch(var(--foreground-muted) / <alpha-value>)',
        },
        // Surfaces
        surface: {
          DEFAULT: 'oklch(var(--surface) / <alpha-value>)',
          hover: 'oklch(var(--surface-hover) / <alpha-value>)',
          foreground: 'oklch(var(--surface-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'oklch(var(--card) / <alpha-value>)',
          hover: 'oklch(var(--card-hover) / <alpha-value>)',
          foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
        },
        // Popovers
        popover: {
          DEFAULT: 'oklch(var(--popover) / <alpha-value>)',
          foreground: 'oklch(var(--popover-foreground) / <alpha-value>)',
        },
        // Form controls
        input: {
          DEFAULT: 'oklch(var(--input) / <alpha-value>)',
        },
        // Neutral wash for hover/press on any surface in the ladder
        overlay: {
          hover: 'oklch(var(--overlay-hover))',
          press: 'oklch(var(--overlay-press))',
        },
        // Interactive
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          hover: 'oklch(var(--primary-hover) / <alpha-value>)',
          active: 'oklch(var(--primary-active) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          hover: 'oklch(var(--secondary-hover) / <alpha-value>)',
          active: 'oklch(var(--secondary-active) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          hover: 'oklch(var(--accent-hover) / <alpha-value>)',
          active: 'oklch(var(--accent-active) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        link: {
          DEFAULT: 'oklch(var(--link) / <alpha-value>)',
          hover: 'oklch(var(--link-hover) / <alpha-value>)',
        },
        // Feedback
        success: {
          DEFAULT: 'oklch(var(--success) / <alpha-value>)',
          hover: 'oklch(var(--success-hover) / <alpha-value>)',
          foreground: 'oklch(var(--success-foreground) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'oklch(var(--warning) / <alpha-value>)',
          hover: 'oklch(var(--warning-hover) / <alpha-value>)',
          foreground: 'oklch(var(--warning-foreground) / <alpha-value>)',
        },
        error: {
          DEFAULT: 'oklch(var(--error) / <alpha-value>)',
          hover: 'oklch(var(--error-hover) / <alpha-value>)',
          foreground: 'oklch(var(--error-foreground) / <alpha-value>)',
        },
        info: {
          DEFAULT: 'oklch(var(--info) / <alpha-value>)',
          hover: 'oklch(var(--info-hover) / <alpha-value>)',
          foreground: 'oklch(var(--info-foreground) / <alpha-value>)',
        },
        // Borders
        border: {
          DEFAULT: 'oklch(var(--border) / <alpha-value>)',
          strong: 'oklch(var(--border-strong) / <alpha-value>)',
        },
        // Icons
        icon: {
          DEFAULT: 'oklch(var(--icon) / <alpha-value>)',
        },
        // Focus Rings
        ring: {
          DEFAULT: 'oklch(var(--ring-focus) / <alpha-value>)',
          focus: 'oklch(var(--ring-focus) / <alpha-value>)',
          error: 'oklch(var(--ring-error) / <alpha-value>)',
          border: 'oklch(var(--border) / <alpha-value>)',
        },
        // Primary color palette
        sand: {
          DEFAULT: 'oklch(var(--color-sand-500) / <alpha-value>)',
          50: 'oklch(var(--color-sand-50) / <alpha-value>)',
          75: 'oklch(var(--color-sand-75) / <alpha-value>)',
          100: 'oklch(var(--color-sand-100) / <alpha-value>)',
          200: 'oklch(var(--color-sand-200) / <alpha-value>)',
          300: 'oklch(var(--color-sand-300) / <alpha-value>)',
          400: 'oklch(var(--color-sand-400) / <alpha-value>)',
          500: 'oklch(var(--color-sand-500) / <alpha-value>)',
          600: 'oklch(var(--color-sand-600) / <alpha-value>)',
          700: 'oklch(var(--color-sand-700) / <alpha-value>)',
          800: 'oklch(var(--color-sand-800) / <alpha-value>)',
          900: 'oklch(var(--color-sand-900) / <alpha-value>)',
          950: 'oklch(var(--color-sand-950) / <alpha-value>)',
        },
        stone: {
          DEFAULT: 'oklch(var(--color-stone-500) / <alpha-value>)',
          50: 'oklch(var(--color-stone-50) / <alpha-value>)',
          100: 'oklch(var(--color-stone-100) / <alpha-value>)',
          200: 'oklch(var(--color-stone-200) / <alpha-value>)',
          300: 'oklch(var(--color-stone-300) / <alpha-value>)',
          400: 'oklch(var(--color-stone-400) / <alpha-value>)',
          500: 'oklch(var(--color-stone-500) / <alpha-value>)',
          600: 'oklch(var(--color-stone-600) / <alpha-value>)',
          700: 'oklch(var(--color-stone-700) / <alpha-value>)',
          800: 'oklch(var(--color-stone-800) / <alpha-value>)',
          900: 'oklch(var(--color-stone-900) / <alpha-value>)',
          950: 'oklch(var(--color-stone-950) / <alpha-value>)',
        },
        zinc: {
          DEFAULT: 'oklch(var(--color-zinc-500) / <alpha-value>)',
          50: 'oklch(var(--color-zinc-50) / <alpha-value>)',
          100: 'oklch(var(--color-zinc-100) / <alpha-value>)',
          200: 'oklch(var(--color-zinc-200) / <alpha-value>)',
          300: 'oklch(var(--color-zinc-300) / <alpha-value>)',
          400: 'oklch(var(--color-zinc-400) / <alpha-value>)',
          500: 'oklch(var(--color-zinc-500) / <alpha-value>)',
          600: 'oklch(var(--color-zinc-600) / <alpha-value>)',
          700: 'oklch(var(--color-zinc-700) / <alpha-value>)',
          800: 'oklch(var(--color-zinc-800) / <alpha-value>)',
          900: 'oklch(var(--color-zinc-900) / <alpha-value>)',
        },
        terracota: {
          DEFAULT: 'oklch(var(--color-terracota-500) / <alpha-value>)',
          50: 'oklch(var(--color-terracota-50) / <alpha-value>)',
          100: 'oklch(var(--color-terracota-100) / <alpha-value>)',
          200: 'oklch(var(--color-terracota-200) / <alpha-value>)',
          300: 'oklch(var(--color-terracota-300) / <alpha-value>)',
          400: 'oklch(var(--color-terracota-400) / <alpha-value>)',
          500: 'oklch(var(--color-terracota-500) / <alpha-value>)',
          600: 'oklch(var(--color-terracota-600) / <alpha-value>)',
          700: 'oklch(var(--color-terracota-700) / <alpha-value>)',
          800: 'oklch(var(--color-terracota-800) / <alpha-value>)',
          900: 'oklch(var(--color-terracota-900) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'oklch(var(--color-gold-500) / <alpha-value>)',
          50: 'oklch(var(--color-gold-50) / <alpha-value>)',
          100: 'oklch(var(--color-gold-100) / <alpha-value>)',
          200: 'oklch(var(--color-gold-200) / <alpha-value>)',
          300: 'oklch(var(--color-gold-300) / <alpha-value>)',
          400: 'oklch(var(--color-gold-400) / <alpha-value>)',
          500: 'oklch(var(--color-gold-500) / <alpha-value>)',
          600: 'oklch(var(--color-gold-600) / <alpha-value>)',
          700: 'oklch(var(--color-gold-700) / <alpha-value>)',
          800: 'oklch(var(--color-gold-800) / <alpha-value>)',
          900: 'oklch(var(--color-gold-900) / <alpha-value>)',
        },
        sage: {
          DEFAULT: 'oklch(var(--color-sage-500) / <alpha-value>)',
          50: 'oklch(var(--color-sage-50) / <alpha-value>)',
          100: 'oklch(var(--color-sage-100) / <alpha-value>)',
          200: 'oklch(var(--color-sage-200) / <alpha-value>)',
          300: 'oklch(var(--color-sage-300) / <alpha-value>)',
          400: 'oklch(var(--color-sage-400) / <alpha-value>)',
          500: 'oklch(var(--color-sage-500) / <alpha-value>)',
          600: 'oklch(var(--color-sage-600) / <alpha-value>)',
          700: 'oklch(var(--color-sage-700) / <alpha-value>)',
          800: 'oklch(var(--color-sage-800) / <alpha-value>)',
          900: 'oklch(var(--color-sage-900) / <alpha-value>)',
        },
        twilight: {
          DEFAULT: 'oklch(var(--color-twilight-500) / <alpha-value>)',
          50: 'oklch(var(--color-twilight-50) / <alpha-value>)',
          100: 'oklch(var(--color-twilight-100) / <alpha-value>)',
          200: 'oklch(var(--color-twilight-200) / <alpha-value>)',
          300: 'oklch(var(--color-twilight-300) / <alpha-value>)',
          400: 'oklch(var(--color-twilight-400) / <alpha-value>)',
          500: 'oklch(var(--color-twilight-500) / <alpha-value>)',
          600: 'oklch(var(--color-twilight-600) / <alpha-value>)',
          700: 'oklch(var(--color-twilight-700) / <alpha-value>)',
          800: 'oklch(var(--color-twilight-800) / <alpha-value>)',
          900: 'oklch(var(--color-twilight-900) / <alpha-value>)',
          950: 'oklch(var(--color-twilight-950) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-helvetica-now)', 'sans-serif'],
        body: ['var(--font-helvetica-now)', 'sans-serif'],
        heading: ['var(--font-real-head)', 'sans-serif'],
      },
      // Named roles over the sizes already in use. Values are unchanged:
      // display = 5xl, h1 = 4xl, h2 = 3xl, h3 = 2xl, body = lg/leading-body,
      // body-small = base, label/button = sm/base, caption = xs.
      fontSize: {
        display: ['3rem', { lineHeight: '1.125' }],
        h1: ['2.25rem', { lineHeight: '1.125' }],
        h2: ['1.875rem', { lineHeight: '1.125' }],
        h3: ['1.5rem', { lineHeight: '1.25' }],
        body: ['1.125rem', { lineHeight: '1.414' }],
        'body-small': ['1rem', { lineHeight: '1.414' }],
        label: ['0.875rem', { lineHeight: '1.25rem' }],
        caption: ['0.75rem', { lineHeight: '1rem' }],
        button: ['1rem', { lineHeight: '1.5rem' }],
      },
      lineHeight: {
        heading: '1.125',
        body: '1.414',
      },
      spacing: {
        reading: '680px',
      },
      transitionDuration: {
        fast: 'var(--motion-fast)',
        standard: 'var(--motion-standard)',
        slow: 'var(--motion-slow)',
      },
      animationDuration: {
        fast: 'var(--motion-fast)',
        standard: 'var(--motion-standard)',
        slow: 'var(--motion-slow)',
      },
      transitionTimingFunction: {
        enter: 'var(--ease-enter)',
        exit: 'var(--ease-exit)',
        standard: 'var(--ease-standard)',
      },
      animationTimingFunction: {
        enter: 'var(--ease-enter)',
        exit: 'var(--ease-exit)',
        standard: 'var(--ease-standard)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'oklch(var(--foreground))',
            '--tw-prose-headings': 'oklch(var(--foreground-heading))',
            '--tw-prose-lead': 'oklch(var(--foreground-subtle))',
            '--tw-prose-links': 'oklch(var(--link))',
            '--tw-prose-bold': 'oklch(var(--foreground-heading))',
            '--tw-prose-counters': 'oklch(var(--foreground-muted))',
            '--tw-prose-bullets': 'oklch(var(--border-strong))',
            '--tw-prose-hr': 'oklch(var(--border))',
            '--tw-prose-quotes': 'oklch(var(--foreground-heading))',
            '--tw-prose-quote-borders': 'oklch(var(--border-strong))',
            '--tw-prose-captions': 'oklch(var(--foreground-muted))',
            '--tw-prose-code': 'oklch(var(--foreground-heading))',
            '--tw-prose-pre-code': 'oklch(var(--foreground))',
            '--tw-prose-pre-bg': 'oklch(var(--background-emphasis))',
            '--tw-prose-th-borders': 'oklch(var(--border-strong))',
            '--tw-prose-td-borders': 'oklch(var(--border))',
          },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography, containerQueries, animate],
} satisfies Config
