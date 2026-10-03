import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['Learn','Reference','Do']),
    tags: z.array(z.string()).default([]),
    updated: z.coerce.date().optional(),
    findings: z.array(z.string()).default([]),
  }),
});
export const collections = { articles };
