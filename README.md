# OWASP Sofia - Bulgarian Chapter Website

Static website for the OWASP Sofia chapter, hosted via GitHub Pages at [owasp.bg](https://owasp.bg).

## About

OWASP Sofia is the first and only OWASP chapter in Bulgaria — a community of cybersecurity enthusiasts, professionals, and experts united by the mission to make the digital world safer through education, knowledge sharing, and open collaboration.

## Structure

[Astro](https://astro.build) static site. Every page shares `src/layouts/Base.astro` (nav, footer, SVG icons) and `src/styles/global.css`.

| Page | Source |
|------|--------|
| `/` — hero, latest events, about, leaders | `src/pages/index.astro` |
| `/events/` — all meetups by year | `src/pages/events/index.astro` |
| `/<month>-<year>-meetup/` — one page per event: hourly program, speakers, hosts, slides, recording, photos | `src/pages/[slug].astro` |
| `/resources/` — OWASP projects + Top 10 | `src/pages/resources.astro` |
| `/about/` — about, team, partners | `src/pages/about.astro` |
| `/contact/` — channels | `src/pages/contact.astro` |
| `/policies/` — rules and expectations | `src/pages/policies.astro` |
| `/top10.html` — interactive Top 10 history (static file) | `public/top10.html` |

Static files (slides, logos, templates) live in `public/` and are served as-is, e.g. `public/assets/presentations/x.pdf` → `/assets/presentations/x.pdf`.

## Adding or editing an event

Each event is a folder named after its date:

```
src/content/events/2026-04-30/
├── index.md      # program (required)
├── cover.jpg     # card image (optional; falls back to the first photo, then to the date)
└── gallery/      # photos (optional) — just drop .jpg/.png/.webp files here
```

`index.md`:

```markdown
---
date: 2026-04-30
title: "OWASP Sofia Meetup · април 2026"   # optional, generated from the date
slug: "april-2026-meetup"   # optional, generated from the date (see below)
location: "Progress, бул. Цариградско шосе 54Б"   # optional
locationUrl: "https://maps.app.goo.gl/..."   # optional, makes the location a map link
hosts:   # optional, the company/venue hosting the event
  - name: "Progress"
    url: "https://www.progress.com/"
meetup: "https://www.meetup.com/owasp-sofia-chapter/events/..."   # optional
recording: "https://youtu.be/..."   # optional, one video for the whole event (embedded on the page)
agenda:   # optional, non-talk slots; shown with the talks, ordered by time
  - time: "19:00"
    title: "Начало и въведение"
  - time: "21:30"
    title: "Q&A и networking"
  - time: "22:00"
    title: "Закриване"
sessions:
  - time: "19:15"   # optional, HH:MM
    title: "Talk title"
    speaker: "Name Surname"
    speakerUrl: "https://www.linkedin.com/in/..."   # optional
    company: "Company"   # optional, shown as "Speaker @ Company"
    companyUrl: "https://..."   # optional
    abstract: "One paragraph."   # optional
    slides: "/assets/presentations/202604 - Talk by Name.pdf"   # optional: a PDF in public/ or any URL
    video: "https://youtu.be/...?t=120"   # optional, per-talk video (YouTube or Google Drive)
---

Short overview of the event (Markdown), shown above the program.
```

- The page URL is named like the Meetup event: `2026-04-30` → `/april-2026-meetup/`. If a month has two events, the day is added (`/july-21-2021-meetup/`). Set `slug:` to override; the build fails on duplicates.
- The cover is the Meetup event banner, saved as `cover.jpg` in the event folder.

- PDF slides open in an in-page viewer (pdf.js, works on phones) and can be downloaded.
- YouTube links (incl. `t=` start time) and Google Drive links are embedded; other links open in a new tab.
- Photos are resized and converted to WebP at build time. Still, shrink them to ~2500px before committing to keep the repo small.
- Photos open in a lightbox (arrows, swipe, Esc).

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm test         # unit tests for the link helpers
npm run build    # static site in dist/
```

## Hosting

GitHub Pages, deployed by `.github/workflows/deploy.yml` on every push to `main`
(Settings → Pages → Source must be **GitHub Actions**). `public/CNAME` keeps the `owasp.bg` domain.
Pull requests run the tests and build without deploying.

## Links

- **Website**: https://owasp.bg
- **OWASP Chapter Page**: https://owasp.org/www-chapter-sofia/
- **Meetup**: https://www.meetup.com/OWASP-Sofia-Chapter/
- **Discord**: https://discord.com/channels/849266967856414731/981867323298312223
- **Sessionize (CFP)**: https://sessionize.com/owasp-sofia/
- **LinkedIn**: https://www.linkedin.com/company/107314221/
- **Facebook**: https://www.facebook.com/owaspbg
- **OWASP Slack**: https://owasp.org/slack/invite

## License

All OWASP materials are free and open. Website content is available under the OWASP Foundation's open license terms.
