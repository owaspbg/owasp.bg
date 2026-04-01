# CLAUDE.md - Project Guidelines

## Project Overview

Static website for OWASP Sofia (Bulgarian OWASP chapter), hosted via GitHub Pages.

## Tech Stack

- Single-file static HTML (`index.html`) — no frameworks, no build tools
- CSS is inline in `<style>` tags
- Font: Roboto (Google Fonts) — same as owasp.org
- SVG icons are inlined via a hidden SVG sprite (no external icon libraries)
- No JavaScript dependencies

## Design

- Header color: `rgb(152, 175, 199)` — matches owasp.org
- Dark color: `#233040`
- Font: Roboto 300/400/500/700
- Responsive: mobile breakpoint at 768px
- All content is in Bulgarian

## Key Conventions

- The OWASP logo in the header links to the top of the page, with no text next to it
- Do not use "локална глава" (local chapter) — it doesn't make sense in Bulgarian context
- Event presentations link to PDF slides in `./assets/presentations/`
- Speaker names link to their LinkedIn profiles where available
- Leader cards use icon buttons (LinkedIn + email) instead of displaying email addresses as text
- Chapter social links: LinkedIn company page, Facebook page, Discord, OWASP Slack

## Content Sources

- Event data and leader info sourced from: https://owasp.org/www-chapter-sofia/
- Presentation slides stored in: `./assets/presentations/`
- Video recordings hosted on YouTube and Google Drive

## Links Reference

- Meetup: https://www.meetup.com/OWASP-Sofia-Chapter/
- Discord: https://discord.com/channels/849266967856414731/981867323298312223
- Sessionize: https://sessionize.com/owasp-sofia/
- LinkedIn: https://www.linkedin.com/company/107314221/
- Facebook: https://www.facebook.com/owaspbg
- OWASP Slack: https://owasp.org/slack/invite
