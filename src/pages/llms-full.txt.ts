import type { APIRoute } from 'astro';
import { getEvents } from '../lib/events';
import { eventMarkdown, intro } from '../lib/llm';

export const GET: APIRoute = async () => {
  const events = await getEvents();
  const body = `${intro()}
# Events (newest first)

${events.map((e) => eventMarkdown(e).replace(/^# /, '## ').replace(/^## Program/m, '### Program')).join('\n---\n\n')}`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
