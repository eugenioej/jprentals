/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#0a0a0a',
          white: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        accent: {
          DEFAULT: '#003B71',
          light: '#e8f0fa',
          dark: '#002a52',
          50: '#f0f6fc',
          100: '#dceaf7',
          600: '#003B71',
          700: '#002a52',
        },
        jpr2: {
          navy: '#1F2D4E',
          'navy-deep': '#141D33',
          /** Azul casi negro, mismo tono que navy; ancla bandas oscuras */
          midnight: '#0A0F1E',
          'midnight-soft': '#0F182C',
          mist: '#E6EAF3',
          coral: '#C8433A',
          mustard: '#E8B33E',
          crema: '#F2EFEA',
          ink: '#2B2B2B',
          muted: '#5C6478',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          md: '3rem',
        },
        screens: {
          lg: '1200px',
        },
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};
