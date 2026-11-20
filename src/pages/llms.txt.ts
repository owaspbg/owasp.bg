import type { APIRoute } from 'astro';
import { getEvents, eventUrl } from '../lib/events';
import { abs } from '../lib/site';
import { eventLine, intro } from '../lib/llm';

// https://llmstxt.org — a short, link-rich summary of the site for LLMs and AI search engines.
export const GET: APIRoute = async () => {
  const events = await getEvents();
  const body = `${intro()}
## Pages

- [Home](${abs('/')}): what OWASP Sofia is, latest meetups, chapter leaders
- [Events](${abs('/events/')}): every meetup since 2019 with program, speakers, slides, recordings and photos
- [Resources](${abs('/resources/')}): key OWASP projects (ASVS, WSTG, Cheat Sheets, SAMM, ZAP, Juice Shop…) and the OWASP Top 10:2025 in Bulgarian
- [About](${abs('/about/')}): mission, chapter leaders, partner communities, FAQ
- [Contact](${abs('/contact/')}): email and community channels
- [Policies](${abs('/policies/')}): code of conduct and rules for hosts, speakers and sponsors

## Events

Each event also has a plain-markdown version at the same URL with \`.md\` instead of the trailing slash.

${events.map(eventLine).join('\n')}

## Optional

- [Full content for LLMs](${abs('/llms-full.txt')}): all events with full programs in one file
${events.map((e) => `- [${e.title} (markdown)](${abs(eventUrl(e).replace(/\/$/, '.md'))})`).join('\n')}
- [OWASP Foundation](https://owasp.org/)
- [OWASP Top 10:2025](https://owasp.org/Top10/2025/)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
