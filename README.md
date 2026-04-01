# OWASP Sofia - Bulgarian Chapter Website

Static website for the OWASP Sofia chapter, hosted via GitHub Pages at [owasp.bg](https://owasp.bg).

## About

OWASP Sofia is the first and only OWASP chapter in Bulgaria — a community of cybersecurity enthusiasts, professionals, and experts united by the mission to make the digital world safer through education, knowledge sharing, and open collaboration.

## Structure

Single-page static HTML website (no build tools, no dependencies):

- **Header** — sticky navigation with OWASP logo
- **Hero** — chapter introduction with key stats
- **About** — what is OWASP + Sofia chapter mission
- **Events** — full archive of past presentations with links to slides, video recordings, and speaker LinkedIn profiles
- **Resources** — key OWASP projects (Top 10, ASVS, Testing Guide, Cheat Sheets, SAMM, ZAP), some translated to Bulgarian
- **Team** — current chapter leaders with LinkedIn/email, acknowledgment of past leaders
- **Contact** — Meetup, Discord, Sessionize, LinkedIn, Facebook
- **Footer** — social icons (LinkedIn, Facebook, Discord, Slack), policies

## Development

No build step required. Open `index.html` in a browser or serve with any static server:

```bash
python3 -m http.server 8000
```

## Hosting

Deployed via GitHub Pages. The site is served from the `main` branch root.

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
