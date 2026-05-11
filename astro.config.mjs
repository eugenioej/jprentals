import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://jprentals.mx',

  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/reporte-'),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-MX',
          en: 'en-US',
          it: 'it-IT',
        },
      },
    }),
  ],

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  adapter: cloudflare()
});