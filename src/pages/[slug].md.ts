import type { APIRoute, GetStaticPaths } from 'astro';
import { getEvents, type Event } from '../lib/events';
import { eventMarkdown } from '../lib/llm';

// Markdown twin of every event page (/september-2026-meetup.md), as suggested by llmstxt.org.
export const getStaticPaths = (async () =>
  (await getEvents()).map((event) => ({ params: { slug: event.slug }, props: { event } }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ event: Event }> = ({ props }) =>
  new Response(eventMarkdown(props.event), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
