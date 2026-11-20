import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const events = defineCollection({
  // One folder per event: src/content/events/<YYYY-MM-DD>/index.md (+ optional cover.* and gallery/)
  loader: glob({ pattern: '*/index.md', base: './src/content/events', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string().optional(),
    location: z.string().optional(),
    meetup: z.url().optional(),
    recording: z.url().optional(),
    sessions: z.array(z.object({
      title: z.string(),
      speaker: z.string(),
      speakerUrl: z.url().optional(),
      abstract: z.string().optional(),
      slides: z.string().optional(),
      video: z.url().optional(),
    })).default([]),
  }),
});

export const collections = { events };
