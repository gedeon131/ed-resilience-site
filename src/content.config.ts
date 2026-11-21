import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    pillar: z.enum(['risk', 'resilience', 'recovery']).optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    /** Texte provisoire en attendant le contenu de la cliente (voir CONTENT_TODO.md). */
    placeholder: z.boolean().default(false),
  }),
});

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experiences' }),
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    year: z.number().optional(),
    location: z.string().optional(),
    summary: z.string(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    /** Exemple provisoire : affiché avec un badge « Exemple » tant que la cliente n'a pas fourni ses références. */
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { services, experiences };
