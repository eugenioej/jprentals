import homeEsData from './home.es.json';
import homeEnData from './home.en.json';
import homeItData from './home.it.json';

export type RebrandLang = 'es' | 'en' | 'it';
export type RebrandHomeCopy = typeof homeEsData;

const byLang: Record<RebrandLang, RebrandHomeCopy> = {
  es: homeEsData,
  en: homeEnData,
  it: homeItData,
};

export function getRebrandHomeCopy(lang: RebrandLang): RebrandHomeCopy {
  return byLang[lang];
}

/** Href map for inner site (industry pages, sin foco en grúas en la URL pública). */
export const rebrandHomeLinks: Record<
  RebrandLang,
  { legacyHome: string; industryPage: string; privacidad: string }
> = {
  es: {
    legacyHome: '/inicio-legacy/',
    industryPage: '/industrias/manufactura',
    privacidad: '/privacidad',
  },
  en: {
    legacyHome: '/en/inicio-legacy/',
    industryPage: '/en/industries/manufacturing',
    privacidad: '/en/privacy',
  },
  it: {
    legacyHome: '/inicio-legacy/',
    industryPage: '/industrias/manufactura',
    privacidad: '/en/privacy',
  },
};

export function rebrandHomePath(lang: RebrandLang): string {
  if (lang === 'es') return '/';
  if (lang === 'en') return '/en/';
  return '/it/';
}

export function rebrandHomeAbsoluteUrl(
  siteOrigin: string | undefined,
  lang: RebrandLang
): string {
  const base = (siteOrigin ?? 'https://jprentals.mx').replace(/\/$/, '');
  const p = rebrandHomePath(lang);
  return p === '/' ? `${base}/` : `${base}${p}`;
}

export type RebrandSuccessCase = RebrandHomeCopy['successCases']['items'][number];

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getSuccessCaseSlug(item: RebrandSuccessCase): string {
  const withId = item as RebrandSuccessCase & { id?: string };
  if (typeof withId.id === 'string' && withId.id.length > 0) return withId.id;
  return slugify(`${item.year}-${item.client}-${item.title}`);
}

export function rebrandProjectPath(id: string, lang: RebrandLang): string {
  if (lang === 'es') return `/proyectos/${id}/`;
  if (lang === 'en') return `/en/projects/${id}/`;
  return `/it/progetti/${id}/`;
}

export function getSuccessCasePath(item: RebrandSuccessCase, lang: RebrandLang): string {
  return rebrandProjectPath(getSuccessCaseSlug(item), lang);
}

export function getSuccessCaseBySlug(slug: string, lang: RebrandLang): RebrandSuccessCase | undefined {
  return getRebrandHomeCopy(lang).successCases.items.find((item) => getSuccessCaseSlug(item) === slug);
}

export function rebrandServicePath(slug: string, lang: RebrandLang): string {
  if (lang === 'es') return `/servicios/${slug}/`;
  if (lang === 'en') return `/en/services/${slug}/`;
  return `/it/servizi/${slug}/`;
}

/** Detect locale from URL path (leading slash). */
export function rebrandLocaleFromPath(pathname: string): RebrandLang {
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (p === '/en' || p.startsWith('/en/')) return 'en';
  if (p === '/it' || p.startsWith('/it/')) return 'it';
  return 'es';
}

/** Map current path to equivalent in target language (rebrand home, services, projects). */
export function rebrandSwitchPath(pathname: string, target: RebrandLang): string {
  const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const s = normalized.split('/').filter(Boolean);

  if (s[0] === 'servicios' && s.length >= 2) {
    return rebrandServicePath(s[1], target);
  }
  if (s[0] === 'en' && s[1] === 'services' && s.length >= 3) {
    return rebrandServicePath(s[2], target);
  }
  if (s[0] === 'it' && s[1] === 'servizi' && s.length >= 3) {
    return rebrandServicePath(s[2], target);
  }

  if (s[0] === 'proyectos' && s.length >= 2) {
    return rebrandProjectPath(s[1], target);
  }
  if (s[0] === 'en' && s[1] === 'projects' && s.length >= 3) {
    return rebrandProjectPath(s[2], target);
  }
  if (s[0] === 'it' && s[1] === 'progetti' && s.length >= 3) {
    return rebrandProjectPath(s[2], target);
  }

  return rebrandHomePath(target);
}
