const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

/**
 * URL slug named like the Meetup event: 2026-09-23 → "september-2026-meetup".
 * When a month has more than one event, the day is added: "july-21-2021-meetup".
 */
export function eventSlug(date: Date, withDay = false): string {
  const month = MONTHS[date.getUTCMonth()];
  const day = withDay ? `-${date.getUTCDate()}` : '';
  return `${month}${day}-${date.getUTCFullYear()}-meetup`;
}
