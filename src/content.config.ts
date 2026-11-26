import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const time = z.string().regex(/^\d{2}:\d{2}$/, 'HH:MM, e.g. 19:15');
const org = z.object({ name: z.string(), url: z.url().optional() });

const events = defineCollection({
  // One folder per event: src/content/events/<YYYY-MM-DD>/index.md (+ optional cover.* and gallery/)
  loader: glob({ pattern: '*/index.md', base: './src/content/events', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string().optional(),
    slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
    location: z.string().optional(),
    locationUrl: z.url().optional(),
    hosts: z.array(org).default([]),
    partners: z.array(org).default([]), // co-organizing communities
    meetup: z.url().optional(),
    registration: z.url().optional(), // e.g. Luma; shown as the main button while the event is upcoming
    recording: z.url().optional(),
    // Non-talk slots of the program (opening, host intro, Q&A, closing); merged with sessions by time
    agenda: z.array(z.object({
      time,
      title: z.string(),
      speaker: z.string().optional(),
      speakerUrl: z.url().optional(),
      company: z.string().optional(),
      companyUrl: z.url().optional(),
    })).default([]),
    sessions: z.array(z.object({
      time: time.optional(),
      title: z.string(),
      speaker: z.string(),
      speakerUrl: z.url().optional(),
      company: z.string().optional(),
      companyUrl: z.url().optional(),
      abstract: z.string().optional(),
      slides: z.string().optional(),
      video: z.url().optional(),
    })).default([]),
  }),
});

export const collections = { events };
