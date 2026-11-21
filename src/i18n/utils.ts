import fr from './fr.json';
import en from './en.json';

export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

const ui = { fr, en } as const;
export type UiKey = keyof typeof fr;

/**
 * Correspondance des routes entre les langues (clé = identifiant de page).
 * Voir le tableau du §3 de CLAUDE.md.
 */
export const routes = {
  home: { fr: '/', en: '/en/' },
  about: { fr: '/a-propos', en: '/en/about' },
  services: { fr: '/services', en: '/en/services' },
  experiences: { fr: '/experiences', en: '/en/experience' },
  contact: { fr: '/contact', en: '/en/contact' },
  legal: { fr: '/mentions-legales', en: '/en/legal' },
  privacy: { fr: '/confidentialite', en: '/en/privacy' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/**
 * Préfixe de déploiement (`base` d'Astro) : vide en production sur le domaine,
 * `/ed-resilience-site` sur la préversion GitHub Pages.
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Ajoute le préfixe de déploiement à un chemin interne commençant par `/`. */
export function withBase(path: string): string {
  return `${base}${path}`;
}

/** Retire le préfixe de déploiement d'un chemin d'URL. */
export function stripBase(pathname: string): string {
  if (base && (pathname === base || pathname.startsWith(`${base}/`))) {
    return pathname.slice(base.length) || '/';
  }
  return pathname;
}

const normalize = (p: string) => p.replace(/\/$/, '') || '/';
const isEnglishPath = (p: string) => /^\/en(\/|$)/.test(p);

/** Chemin de la page courante sans préfixe de déploiement ni slash final. */
export function getCurrentPath(url: URL): string {
  return normalize(stripBase(url.pathname));
}

export function getLangFromUrl(url: URL): Lang {
  return isEnglishPath(getCurrentPath(url)) ? 'en' : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Chemin de la route sans préfixe (pour comparer avec getCurrentPath). */
export function getRoutePath(key: RouteKey, lang: Lang): string {
  return normalize(routes[key][lang]);
}

/** URL de la route, préfixe de déploiement inclus (pour les `href`). */
export function getLocalizedPath(key: RouteKey, lang: Lang): string {
  return withBase(routes[key][lang]);
}

/** URL d'une page de détail sous une route (ex. un service : /services/<slug>). */
export function getDetailPath(key: RouteKey, slug: string, lang: Lang): string {
  return withBase(`${routes[key][lang].replace(/\/$/, '')}/${slug}`);
}

/** Retrouve l'équivalent d'une URL dans l'autre langue (pour le sélecteur de langue). */
export function getAlternatePath(url: URL, target: Lang): string {
  const path = getCurrentPath(url);
  for (const entry of Object.values(routes)) {
    for (const p of Object.values(entry)) {
      if (normalize(p) === path) return withBase(entry[target]);
    }
  }
  // Pages de détail (ex. /services/xxx ↔ /en/services/xxx)
  if (target === 'en' && !isEnglishPath(path)) return withBase(`/en${path}`);
  if (target === 'fr' && isEnglishPath(path)) return withBase(path.replace(/^\/en/, '') || '/');
  return withBase(routes.home[target]);
}
