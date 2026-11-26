// Plain-markdown views of the site for LLMs and AI search (llms.txt, llms-full.txt, /<event>.md).
import { SITE, abs } from './site';
import { eventUrl, program, type Event } from './events';
import { fileUrl } from './media';
import { eventDescription, isOnline } from './schema';

export const dateEn = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

const link = (text: string, url?: string) => (url ? `[${text}](${url})` : text);

/** One line per event for llms.txt. */
export function eventLine(e: Event): string {
  const where = e.data.location ? `, ${e.data.location}` : '';
  const talks = e.data.sessions.map((s) => `"${s.title}" (${s.speaker})`).join('; ');
  const what = talks ? `Talks: ${talks}` : 'Speakers to be announced.';
  const reg = e.upcoming && (e.data.registration ?? e.data.meetup) ? ` Free registration: ${e.data.registration ?? e.data.meetup}` : '';
  return `- [${e.title}](${abs(eventUrl(e))}): ${e.upcoming ? 'UPCOMING, ' : ''}${dateEn(e.data.date)}${where}. ${what}${reg}`;
}

/** Full markdown for one event. */
export function eventMarkdown(e: Event): string {
  const { location, locationUrl, hosts, partners, meetup, registration, recording } = e.data;
  const out = [`# ${e.title}`, '', `> ${eventDescription(e)}`, ''];
  out.push(`- Date: ${dateEn(e.data.date)}${e.upcoming ? ' (upcoming)' : ''}`);
  if (location) out.push(`- Venue: ${link(location, locationUrl)}${isOnline(e) ? '' : ', Sofia, Bulgaria'}`);
  if (hosts.length) out.push(`- Hosted by: ${hosts.map((h) => link(h.name, h.url)).join(', ')}`);
  if (partners.length) out.push(`- Co-organized with: ${partners.map((h) => link(h.name, h.url)).join(', ')}`);
  out.push(`- Organizer: ${link(SITE.name, SITE.url)} (OWASP Foundation chapter)`, '- Entry: free; talks in Bulgarian');
  if (registration) out.push(`- Registration: ${registration}`);
  if (meetup) out.push(`- Meetup: ${meetup}`);
  if (recording) out.push(`- Recording: ${recording}`);
  out.push(`- Page: ${abs(eventUrl(e))}`, '', '## Program', '');
  if (!e.data.sessions.length) out.push('Speakers to be announced.', '');
  for (const p of program(e)) {
    const time = p.time ? `${p.time} — ` : '';
    const who = p.speaker ? ` — ${link(p.speaker, p.speakerUrl)}${p.company ? ` @ ${link(p.company, p.companyUrl)}` : ''}` : '';
    if (p.kind === 'slot') { out.push(`- ${time}${p.title}${who}`); continue; }
    out.push(`- ${time}**${p.title}**${who}`);
    if (p.abstract) out.push(`  - ${p.abstract}`);
    if (p.slides) out.push(`  - Slides: ${abs(fileUrl(p.slides))}`);
    if (p.video) out.push(`  - Video: ${p.video}`);
  }
  return out.join('\n') + '\n';
}

export const intro = () => `# ${SITE.name}

> ${SITE.descriptionEn} Website: ${SITE.url} (Bulgarian). Contact: ${SITE.email}.

OWASP Sofia (OWASP София) is the local chapter of the OWASP Foundation, the non-profit behind the OWASP Top 10, ASVS, SAMM, ZAP and Juice Shop, and the first OWASP community in Bulgaria.

Key facts:
- Meetups are free and open to everyone, held in person in Sofia (some past ones online), usually 19:00–22:00 local time, several times a year. Talks are in Bulgarian.
- Each meetup has around three talks on application security, DevSecOps, offensive security, cloud security and AI security, followed by Q&A and networking.
- Companies and universities host the meetups at their offices. Hosting enquiries: ${SITE.email}.
- Registration: Meetup (${SITE.links.meetup}) and Luma (${SITE.links.luma}).
- Call for speakers: Sessionize (${SITE.links.sessionize}).
- Slides, recordings and photos of past meetups are published on each event page at ${SITE.url}/events/.
- Community size: ${SITE.members} members on Meetup.
- Chapter leaders: ${SITE.leaders.map((l) => l.name).join(', ')}.
- Community: Discord (${SITE.links.discord}), LinkedIn (${SITE.links.linkedin}), Facebook (${SITE.links.facebook}), GitHub (${SITE.links.github}), #chapter-sofia on OWASP Slack.
- OWASP Foundation chapter page: ${SITE.links.owaspChapter}
`;
