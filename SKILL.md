# CLAUDE.md - Project Guidelines

## Project Overview

Static website for OWASP Sofia (Bulgarian OWASP chapter), hosted via GitHub Pages.

## Tech Stack

- Astro static site (see README for the page map); build with `npm run build`, test with `npm test`
- Shared CSS in `src/styles/global.css`; layout in `src/layouts/Base.astro`
- Font: Inter (Google Fonts)
- SVG icons are inlined via a hidden SVG sprite (`src/components/Sprite.astro`, no icon libraries)
- Events are content folders in `src/content/events/<YYYY-MM-DD>/` (index.md + optional cover and gallery/); each is served at `/owasp-sofia-<month>-<year>-meetup/`
- Only JS dependency is pdf.js, lazy-loaded by the slide viewer

## Design

- Dark "cosmic neon" theme: background `#10002f`, accents pink `#ff2dd6`, violet `#7b3cff`, cyan `#23d8ff`
- Font: Inter 400–900
- Responsive: mobile breakpoint at 768px
- All content is in Bulgarian

## Key Conventions

- The OWASP logo in the header links to the home page, with no text next to it
- Do not use "локална глава" (local chapter) — it doesn't make sense in Bulgarian context
- Event presentations are PDFs in `public/assets/presentations/`, referenced from the event's `index.md` as `/assets/presentations/<file>.pdf`
- Speaker names link to their LinkedIn profiles where available
- Leader cards use icon buttons (LinkedIn + email) instead of displaying email addresses as text
- Chapter social links: LinkedIn company page, Facebook page, Discord, OWASP Slack

## Content Sources

- Event data and leader info sourced from: https://owasp.org/www-chapter-sofia/
- Presentation slides stored in: `public/assets/presentations/`
- Video recordings hosted on YouTube (older ones on Google Drive); both embed on the event page

## Links Reference

- Meetup: https://www.meetup.com/OWASP-Sofia-Chapter/
- Discord: https://discord.com/channels/849266967856414731/981867323298312223
- Sessionize: https://sessionize.com/owasp-sofia/
- LinkedIn: https://www.linkedin.com/company/107314221/
- Facebook: https://www.facebook.com/owaspbg
- OWASP Slack: https://owasp.org/slack/invite
