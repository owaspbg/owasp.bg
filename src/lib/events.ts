import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

type Img = { default: ImageMetadata };
const covers = import.meta.glob<Img>('/src/content/events/*/cover.{jpg,jpeg,png,webp}', { eager: true });
const photos = import.meta.glob<Img>('/src/content/events/*/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}', { eager: true });

const pick = (files: Record<string, Img>, id: string) =>
  Object.entries(files).filter(([p]) => p.split('/')[4] === id).sort(([a], [b]) => a.localeCompare(b)).map(([, m]) => m.default);

export type Event = CollectionEntry<'events'> & { title: string; gallery: ImageMetadata[]; cover?: ImageMetadata };

export const formatDate = (d: Date) =>
  d.toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export async function getEvents(): Promise<Event[]> {
  const entries = await getCollection('events');
  return entries
    .map((e) => {
      const gallery = pick(photos, e.id);
      return {
        ...e,
        title: e.data.title ?? `OWASP Sofia Meetup · ${e.data.date.toLocaleDateString('bg-BG', { month: 'long', year: 'numeric', timeZone: 'UTC' }).replace(' г.', '')}`,
        gallery,
        cover: pick(covers, e.id)[0] ?? gallery[0],
      };
    })
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
