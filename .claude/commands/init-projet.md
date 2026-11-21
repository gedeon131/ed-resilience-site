Initialise le projet Astro dans le dossier courant, sans écraser CLAUDE.md, docs/, src/assets/, CONTENT_TODO.md, .env.example ni .gitignore.

1. Lis CLAUDE.md et docs/brief-client.md en entier.
2. Lance `pnpm create astro@latest . --template minimal --typescript strict --install --no-git` (accepte le dossier non vide).
3. Installe Tailwind v4 (`@tailwindcss/vite`), `@astrojs/sitemap`, `@fontsource/cinzel`, `@fontsource/montserrat`, `@fontsource/cormorant-garamond`, Prettier avec `prettier-plugin-astro` et `prettier-plugin-tailwindcss`.
4. Crée `src/styles/global.css` avec les tokens du §4 de CLAUDE.md.
5. Configure l'i18n (fr par défaut, en sous /en/) dans `astro.config.mjs`.
6. Crée l'arborescence du §3 de CLAUDE.md (dossiers et fichiers vides ou minimaux).
7. Lance `pnpm build` et `pnpm astro check`, corrige les erreurs.
8. Fais un premier commit `chore: initialisation du projet Astro`.

Résume ensuite ce qui a été fait et propose l'étape suivante (§10 de CLAUDE.md).
