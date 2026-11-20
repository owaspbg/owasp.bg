import type { APIRoute } from 'astro';
import { getEvents, eventUrl } from '../lib/events';
import { abs } from '../lib/site';

export const GET: APIRoute = async () => {
  const events = await getEvents();
  const latest = events[0]?.id;
  const urls: { loc: string; lastmod?: string; priority: string }[] = [
    { loc: '/', lastmod: latest, priority: '1.0' },
    { loc: '/events/', lastmod: latest, priority: '0.9' },
    ...events.map((e) => ({ loc: eventUrl(e), lastmod: e.id, priority: '0.8' })),
    { loc: '/resources/', priority: '0.7' },
    { loc: '/about/', priority: '0.6' },
    { loc: '/contact/', priority: '0.6' },
    { loc: '/policies/', priority: '0.4' },
    { loc: '/top10.html', priority: '0.5' },
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${abs(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
