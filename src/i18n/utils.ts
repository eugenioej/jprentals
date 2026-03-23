import es from './es.json';
import en from './en.json';

const translations = { es, en } as const;

export type Locale = keyof typeof translations;

export function t(locale: Locale) {
  return translations[locale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'es';
}

export function getAlternateUrl(currentUrl: URL, targetLocale: Locale): string {
  const path = currentUrl.pathname;
  if (targetLocale === 'en') {
    return path === '/' ? '/en/' : `/en${path}`;
  }
  return path.replace(/^\/en/, '') || '/';
}

// WhatsApp URL generator
const WA_NUMBER = '528116007864';

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function phoneLink(): string {
  return `tel:+${WA_NUMBER}`;
}
