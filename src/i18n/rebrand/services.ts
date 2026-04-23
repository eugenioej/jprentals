import type { RebrandLang } from './home';
import { rebrandServicePath } from './home';
import servicesEs from './services.es.json';
import servicesEn from './services.en.json';
import servicesIt from './services.it.json';

export type RebrandServiceDetail = (typeof servicesEs.services)[number];

const servicesByLang: Record<RebrandLang, RebrandServiceDetail[]> = {
  es: servicesEs.services,
  en: servicesEn.services,
  it: servicesIt.services,
};

export function getRebrandServices(lang: RebrandLang): RebrandServiceDetail[] {
  return servicesByLang[lang];
}

export function getRebrandServiceBySlug(slug: string, lang: RebrandLang): RebrandServiceDetail | undefined {
  return servicesByLang[lang].find((s) => s.slug === slug);
}

export { rebrandServicePath };
