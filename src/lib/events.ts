import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { eventSlug } from './slug';

type Img = { default: ImageMetadata };
const covers = import.meta.glob<Img>('/src/content/events/*/cover.{jpg,jpeg,png,webp}', { eager: true });
const photos = import.meta.glob<Img>('/src/content/events/*/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}', { eager: true });

const pick = (files: Record<string, Img>, id: string) =>
  Object.entries(files).filter(([p]) => p.split('/')[4] === id).sort(([a], [b]) => a.localeCompare(b)).map(([, m]) => m.default);

type Data = CollectionEntry<'events'>['data'];
export type Session = Data['sessions'][number];
export type AgendaItem = Data['agenda'][number];
export type ProgramItem = ({ kind: 'talk'; n: number } & Session) | ({ kind: 'slot' } & AgendaItem);
export type Event = CollectionEntry<'events'> & { title: string; slug: string; gallery: ImageMetadata[]; cover?: ImageMetadata };

export const formatDate = (d: Date) =>
  d.toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const eventUrl = (e: Event) => `/${e.slug}/`;

/** Talks and agenda slots in one list, ordered by start time (talks without a time keep their order). */
export function program({ data }: Event): ProgramItem[] {
  const talks = data.sessions.map((s, i) => ({ kind: 'talk' as const, n: i + 1, ...s }));
  const slots = data.agenda.map((a) => ({ kind: 'slot' as const, ...a }));
  return [...talks, ...slots].sort((a, b) => (a.time ?? '99:99').localeCompare(b.time ?? '99:99'));
}

export async function getEvents(): Promise<Event[]> {
  const entries = await getCollection('events');
  const perMonth = new Map<string, number>();
  for (const e of entries) {
    const k = e.id.slice(0, 7);
    perMonth.set(k, (perMonth.get(k) ?? 0) + 1);
  }
  const events = entries
    .map((e) => {
      const gallery = pick(photos, e.id);
      return {
        ...e,
        title: e.data.title ?? `OWASP Sofia Meetup · ${e.data.date.toLocaleDateString('bg-BG', { month: 'long', year: 'numeric', timeZone: 'UTC' }).replace(' г.', '')}`,
        slug: e.data.slug ?? eventSlug(e.data.date, perMonth.get(e.id.slice(0, 7))! > 1),
        gallery,
        cover: pick(covers, e.id)[0] ?? gallery[0],
      };
    })
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const seen = new Set<string>();
  for (const e of events) {
    if (seen.has(e.slug)) throw new Error(`Duplicate event URL /${e.slug}/ (${e.id}); set \`slug:\` in its index.md`);
    seen.add(e.slug);
  }
  return events;
}
