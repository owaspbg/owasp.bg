import { SITE, abs } from './site';
import { eventUrl, program, type Event } from './events';
import { fileUrl } from './media';

export const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

/** Markdown → one plain-text line (links keep their text). */
export const plain = (md = '') =>
  md.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`#>]/g, '').replace(/\s+/g, ' ').trim();

/** "+02:00" / "+03:00" for a YYYY-MM-DD day in Sofia (handles daylight saving). */
export function sofiaOffset(day: string): string {
  const name = new Intl.DateTimeFormat('en', { timeZone: 'Europe/Sofia', timeZoneName: 'longOffset' })
    .formatToParts(new Date(`${day}T12:00:00Z`)).find((p) => p.type === 'timeZoneName')?.value ?? 'GMT';
  return name.replace('GMT', '') || '+00:00';
}

export const isOnline = (e: Event) => /онлайн|online/i.test(e.data.location ?? '');

export function eventDescription(e: Event): string {
  const overview = plain(e.body);
  if (overview) return overview;
  return e.data.sessions.map((s) => `${s.title} (${s.speaker})`).join(' · ');
}

export const organization = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  alternateName: [SITE.legalName, 'OWASP Bulgaria', 'OWASP България'],
  url: `${SITE.url}/`,
  logo: abs(SITE.logo),
  image: abs(SITE.image),
  email: SITE.email,
  description: SITE.descriptionEn,
  areaServed: { '@type': 'Country', name: 'Bulgaria' },
  address: { '@type': 'PostalAddress', addressLocality: 'София', addressCountry: 'BG' },
  parentOrganization: { '@type': 'NGO', name: 'OWASP Foundation', url: 'https://owasp.org/' },
  knowsAbout: ['Application security', 'OWASP Top 10', 'DevSecOps', 'Penetration testing', 'Threat modeling', 'Cybersecurity'],
  member: SITE.leaders.map((l) => ({ '@type': 'Person', name: l.name, sameAs: l.url, roleName: 'Chapter Leader' })),
  sameAs: Object.values(SITE.links).filter((u) => !u.includes('slack')),
});

export const website = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE.url}/`,
  name: SITE.name,
  inLanguage: 'bg',
  publisher: { '@id': ORG_ID },
});

export const breadcrumbs = (items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
});

export function eventSchema(e: Event, cover?: string) {
  const { date, location, meetup, registration, recording, sessions, partners } = e.data;
  const times = program(e).map((p) => p.time).filter(Boolean) as string[];
  const tz = sofiaOffset(e.id);
  const at = (t: string) => `${e.id}T${t}:00${tz}`;
  const online = isOnline(e);
  const url = abs(eventUrl(e));
  return {
    '@type': 'Event',
    '@id': `${url}#event`,
    name: e.title,
    url,
    description: eventDescription(e),
    startDate: times[0] ? at(times[0]) : date.toISOString().slice(0, 10),
    ...(times.length > 1 && { endDate: at(times.at(-1)!) }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: `https://schema.org/${online ? 'Online' : 'Offline'}EventAttendanceMode`,
    location: online
      ? { '@type': 'VirtualLocation', url: meetup ?? url }
      : {
          '@type': 'Place',
          name: location?.split(',')[0] ?? 'София',
          address: { '@type': 'PostalAddress', ...(location && { streetAddress: location }), addressLocality: 'София', addressCountry: 'BG' },
        },
    ...(cover && { image: [abs(cover)] }),
    inLanguage: 'bg',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: registration ?? meetup ?? url },
    organizer: partners.length
      ? [{ '@id': ORG_ID }, ...partners.map((p) => ({ '@type': 'Organization', name: p.name, ...(p.url && { url: p.url }) }))]
      : { '@id': ORG_ID },
    ...(e.data.hosts.length > 0 && { sponsor: e.data.hosts.map((h) => ({ '@type': 'Organization', name: h.name, ...(h.url && { url: h.url }) })) }),
    ...(sessions.length > 0 && { performer: sessions.map((s) => ({
      '@type': s.speaker.includes('&') ? 'Organization' : 'Person',
      name: s.speaker,
      ...(s.speakerUrl && { sameAs: s.speakerUrl }),
      ...(s.company && { affiliation: { '@type': 'Organization', name: s.company, ...(s.companyUrl && { url: s.companyUrl }) } }),
    })) }),
    ...(recording && { recordedIn: { '@type': 'VideoObject', name: `Запис: ${e.title}`, embedUrl: recording, uploadDate: e.id, thumbnailUrl: cover ? abs(cover) : abs(SITE.image), description: eventDescription(e) } }),
    ...(sessions.some((s) => s.slides) && { subjectOf: sessions.filter((s) => s.slides).map((s) => ({
      '@type': 'PresentationDigitalDocument',
      name: s.title,
      author: { '@type': 'Person', name: s.speaker },
      url: abs(fileUrl(s.slides!)),
    })) }),
  };
}
