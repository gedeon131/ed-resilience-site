import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from '../i18n/utils';

type LocalizedCollection = 'services' | 'experiences';

export interface LocalizedEntry<C extends LocalizedCollection> {
  /** Identifiant commun aux deux langues (nom du fichier sans le dossier de langue). */
  slug: string;
  entry: CollectionEntry<C>;
  /** true si la traduction manque et que la version française est affichée à la place. */
  fallback: boolean;
}

/**
 * Entrées d'une collection dans la langue demandée, triées par `order`.
 * Si la traduction anglaise manque, la version française est renvoyée (CLAUDE.md §6).
 */
export async function getLocalizedEntries<C extends LocalizedCollection>(
  name: C,
  lang: Lang,
): Promise<LocalizedEntry<C>[]> {
  const entries = (await getCollection(name)) as CollectionEntry<C>[];
  const byLang = new Map<string, Map<string, CollectionEntry<C>>>();

  for (const entry of entries) {
    if (entry.data.draft) continue;
    const [entryLang, ...rest] = entry.id.split('/');
    if (!entryLang || rest.length === 0) continue;
    const slug = rest.join('/');
    if (!byLang.has(entryLang)) byLang.set(entryLang, new Map());
    byLang.get(entryLang)!.set(slug, entry);
  }

  const base = byLang.get(defaultLang) ?? new Map<string, CollectionEntry<C>>();
  const localized = byLang.get(lang) ?? new Map<string, CollectionEntry<C>>();
  const slugs = new Set([...base.keys(), ...localized.keys()]);

  return [...slugs]
    .map((slug) => {
      const own = localized.get(slug);
      const entry = own ?? base.get(slug)!;
      return { slug, entry, fallback: !own };
    })
    .sort((a, b) => a.entry.data.order - b.entry.data.order);
}
