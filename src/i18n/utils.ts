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

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  return segment === 'en' ? 'en' : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLocalizedPath(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

/** Retrouve l'équivalent d'une URL dans l'autre langue (pour le sélecteur de langue). */
export function getAlternatePath(url: URL, target: Lang): string {
  const path = url.pathname.replace(/\/$/, '') || '/';
  for (const entry of Object.values(routes)) {
    for (const p of Object.values(entry)) {
      const normalized = p.replace(/\/$/, '') || '/';
      if (normalized === path) return entry[target];
    }
  }
  // Pages de détail (ex. /services/xxx ↔ /en/services/xxx)
  if (target === 'en' && !path.startsWith('/en')) return `/en${path}`;
  if (target === 'fr' && path.startsWith('/en')) return path.replace(/^\/en/, '') || '/';
  return routes.home[target];
}
