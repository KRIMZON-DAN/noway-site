import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      cover: image(),
      gallery: z.array(image()).optional(),
      liveUrl: z.string().url().nullable().optional(),
      repoUrl: z.string().url().nullable().optional(),
      videoUrl: z.string().url().nullable().optional(),
      date: z.date(),
      status: z.enum(['live', 'wip', 'dead']),
      featured: z.boolean().default(false),
    }),
});

export const collections = { projects };
